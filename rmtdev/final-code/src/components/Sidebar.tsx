export default function Sidebar({ children }: { children: React.ReactNode }) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}
