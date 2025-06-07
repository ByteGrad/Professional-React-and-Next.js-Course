export default function Header({ children }: { children: React.ReactNode }) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: { children: React.ReactNode }) {
  return <div className="header__top">{children}</div>;
}
