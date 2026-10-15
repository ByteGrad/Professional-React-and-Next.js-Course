const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../petsoft/final-code/src');

function load(file, mocks, env = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const exports = {};
  const context = vm.createContext({ exports, Response, Request, console, process: { env },
    require(name) { if (Object.hasOwn(mocks, name)) return mocks[name]; throw new Error(`Unexpected import ${name}`); },
  });
  vm.runInContext(code, context, { filename: file });
  return exports;
}
const defaultExport = value => ({ __esModule: true, default: value });

function authHelper(session, user) {
  return load('lib/server-utils.ts', {
    'server-only': {},
    'next/navigation': { redirect: url => { throw new Error(`redirect:${url}`); } },
    './auth-no-edge': { auth: async () => session },
    './db': defaultExport({ user: { findUnique: async ({ where }) => { assert.equal(where.id, session.user.id); return user; } } }),
  });
}

test('server authorization rejects anonymous sessions and deleted accounts', async () => {
  await assert.rejects(authHelper(null, null).checkAuth(), /redirect:\/login/);
  await assert.rejects(authHelper({ user: { id: 'removed' } }, null).checkAuth(), /redirect:\/login/);
});
test('a stale paid JWT cannot bypass current database entitlement', async () => {
  const helper = authHelper({ user: { id: 'a', hasAccess: true } }, { id: 'a', hasAccess: false });
  await assert.rejects(helper.checkAuth(), /redirect:\/payment/);
  const checkoutSession = await helper.checkAuth({ requireAccess: false });
  assert.equal(checkoutSession.user.hasAccess, false);
});
test('server authorization accepts a current paid account', async () => {
  const result = await authHelper({ user: { id: 'a', hasAccess: false } }, { id: 'a', hasAccess: true }).checkAuth();
  assert.equal(result.user.hasAccess, true);
});

function webhook(checkout, price = 'price_expected') {
  const writes = [];
  const module = load('app/api/stripe/route.ts', {
    '@/lib/db': defaultExport({ user: { update: async data => { writes.push(data); } } }),
    '@/lib/stripe': { getStripe: () => ({
      webhooks: { constructEvent: () => ({ type: 'checkout.session.completed', data: { object: checkout } }) },
      checkout: { sessions: { listLineItems: async () => ({ data: [{ price: { id: price }, quantity: 1 }], has_more: false }) } },
    }) },
  }, { STRIPE_SECRET_KEY: 'fixture-only', STRIPE_WEBHOOK_SECRET: 'fixture-only', STRIPE_PRICE_ID: 'price_expected' });
  return { writes, post: signed => module.POST(new Request('http://localhost/api/stripe', {
    method: 'POST', body: '{}', headers: signed ? { 'stripe-signature': 'fixture-signature' } : {},
  })) };
}
test('unsigned and unpaid webhook requests do not grant access', async () => {
  const unsigned = webhook({}); assert.equal((await unsigned.post(false)).status, 400); assert.equal(unsigned.writes.length, 0);
  const unpaid = webhook({ id: 'cs_fixture', mode: 'payment', payment_status: 'unpaid', client_reference_id: 'a' });
  await unpaid.post(true); assert.equal(unpaid.writes.length, 0);
});
test('only the expected paid price grants access to the server-bound user id', async () => {
  const checkout = { id: 'cs_fixture', mode: 'payment', payment_status: 'paid', client_reference_id: 'a', customer_email: 'other@example.com' };
  const wrong = webhook(checkout, 'price_other'); await wrong.post(true); assert.equal(wrong.writes.length, 0);
  const right = webhook(checkout); await right.post(true); assert.equal(right.writes.length, 1); assert.equal(right.writes[0].where.id, 'a');
  assert.equal(right.writes[0].data.hasAccess, true);
});
