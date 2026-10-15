# Security and maintenance

These are educational examples. A dependency audit is not a production security assessment.

## Before use

- Use a currently supported Node.js 22 or 24 LTS runtime that satisfies the project's `engines.node` field. Prefer Node.js 24 LTS.
- Run `npm ci` in the specific example directory to use its recorded lockfile. Run `npm audit` for development and runtime dependencies, review advisories and test updates. Do not blindly run `npm audit fix --force`.
- Keep development servers bound to localhost. Do not expose Vite/Next development servers publicly.
- Independently review authentication, authorization and record ownership, input validation, secrets, data protection, upload/usage limits and third-party services before deployment.
- Use your own restricted test credentials and assets you are entitled to use. Never commit real secrets or connect tutorial fixtures to production data.

## Reporting an issue

Report a suspected vulnerability privately to support@bytegrad.com with the example path, commit/version and a clear description. Do not post credentials, personal data or exploit details in public issues. Existing course support arrangements still apply.

## Maintenance status

The 15 October 2026 security update deliberately changes some recorded versions and behavior. See [SECURITY-UPDATES.md](SECURITY-UPDATES.md). This is a dated review, not a guarantee that no vulnerability exists or will be discovered. Check advisories when you use the examples; historical commits and third-party forks may still contain older code. Automated checks and update pull requests assist review but do not replace it.
