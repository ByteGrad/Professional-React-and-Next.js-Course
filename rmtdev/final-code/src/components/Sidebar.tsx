type SidebarProps = {
  children: React.ReactNode;
  // top?: React.ReactNode;
  top?: React.ReactElement;
};

export default function Sidebar({ children, top }: SidebarProps) {
  return (
    <div className="sidebar">
      {/* {top && <div className="sidebar__top">{top}</div>} */}
      {children}
    </div>
  );
}

export function SidebarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}
