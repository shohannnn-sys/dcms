import { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { create } from "zustand";

type AppInfo = Awaited<ReturnType<Window["dcms"]["getAppInfo"]>>;
type DbInfo = Awaited<ReturnType<Window["dcms"]["getDatabaseStatus"]>>;

type ShellState = {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
};

const useShellStore = create<ShellState>((set) => ({
  collapsed: localStorage.getItem("dcms.sidebar.collapsed") === "1",
  toggle: () => set((state) => {
    const next = !state.collapsed;
    localStorage.setItem("dcms.sidebar.collapsed", next ? "1" : "0");
    return { collapsed: next };
  }),
  setCollapsed: (collapsed) => {
    localStorage.setItem("dcms.sidebar.collapsed", collapsed ? "1" : "0");
    set({ collapsed });
  }
}));

const navGroups = [
  { title: "Practice", items: [["Dashboard", "/"], ["Patients", "/patients"], ["Appointments", "/appointments"], ["Queue", "/queue"]] },
  { title: "Clinical", items: [["Treatments", "/treatments"], ["Prescriptions", "/prescriptions"]] },
  { title: "Billing", items: [["Invoice", "/invoice"], ["Payments", "/payments"], ["Inventory", "/inventory"], ["Accounting", "/accounting"]] },
  { title: "Administration", items: [["Staff & Users", "/staff"], ["Backup & Restore", "/backup"], ["Settings", "/settings"], ["About", "/about"]] }
] as const;

function App() {
  const { collapsed, toggle } = useShellStore();
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [dbInfo, setDbInfo] = useState<DbInfo | null>(null);
  const location = useLocation();

  useEffect(() => {
    void Promise.all([window.dcms.getAppInfo(), window.dcms.getDatabaseStatus()]).then(([app, db]) => {
      setAppInfo(app);
      setDbInfo(db);
    });
  }, []);

  const currentTitle = useMemo(() => {
    const match = navGroups.flatMap((group) => group.items).find(([, href]) => href === location.pathname);
    return match?.[0] ?? "DCMS Pro";
  }, [location.pathname]);

  return (
    <div className={collapsed ? "app-shell collapsed" : "app-shell"}>
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"><DentalMark /></div>
          {!collapsed && <div><strong>DCMS Pro</strong><span>Dental Clinic OS</span></div>}
        </div>
        <nav className="nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              {!collapsed && <div className="nav-label">{group.title}</div>}
              {group.items.map(([label, href]) => (
                <NavLink key={href} to={href} end={href === "/"} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} title={collapsed ? label : undefined}>
                  <NavIcon label={label} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <button className="sidebar-toggle" onClick={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <span>{collapsed ? "→" : "←"}</span>{!collapsed && "Collapse"}
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <div className="breadcrumbs"><span>DCMS Pro</span><b>/</b><strong>{currentTitle}</strong></div>
          </div>
          <div className="topbar-right">
            <button className="search-trigger" aria-label="Global search">⌕ <span>Search</span><kbd>Ctrl K</kbd></button>
            <button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button>
            <div className="user-chip"><div className="avatar">A</div><div><strong>Admin</strong><span>Owner / Admin</span></div></div>
            <button className="icon-button" aria-label="Lock session">▣</button>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard appInfo={appInfo} dbInfo={dbInfo} />} />
            <Route path="*" element={<PhaseScreen title={currentTitle} />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}

function Dashboard({ appInfo, dbInfo }: { appInfo: AppInfo | null; dbInfo: DbInfo | null }) {
  const cards = [
    ["Architecture", "Electron + React + TypeScript", "Production scaffold"],
    ["Database", dbInfo?.ok ? "SQLite ready" : "Checking…", dbInfo ? `Schema v${dbInfo.schemaVersion}` : "Initializing"],
    ["Runtime", appInfo?.environment === "development" ? "Development" : "Production", appInfo?.version ? `Build ${appInfo.version}` : "Loading"],
    ["Security", "Renderer isolated", "No remote content"],
    ["Locale", "Bangladesh", "Asia/Dhaka • BDT ৳"],
    ["Phase", "1 / 10", "Scaffold & shell"]
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">Practice overview</p><h1>Good morning.</h1><p className="subheading">The production shell is ready for clinical modules.</p></div>
        <div className="heading-actions"><button className="secondary-button">System status</button></div>
      </div>
      <section className="metric-grid">
        {cards.map(([label, value, detail]) => <article className="metric-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>)}
      </section>
      <section className="panel hero-panel">
        <div className="panel-icon"><DentalMark /></div>
        <div><p className="eyebrow">DCMS Pro foundation</p><h2>Offline by architecture.</h2><p>The renderer communicates only through a narrow preload bridge. Runtime network requests are blocked outside the local development server.</p></div>
      </section>
    </div>
  );
}

function PhaseScreen({ title }: { title: string }) {
  return <div className="page"><div className="page-heading"><div><p className="eyebrow">DCMS Pro</p><h1>{title}</h1><p className="subheading">This route is reserved for its implementation phase.</p></div></div><section className="panel phase-panel"><div className="phase-badge">Scaffold</div><h2>Navigation contract established</h2><p>The final screen specification is defined in Phase 0. This Phase 1 build exposes the route without pretending the feature is implemented.</p></section></div>;
}

function DentalMark() {
  return <svg viewBox="0 0 64 64" role="img" aria-label="DCMS Pro dental mark"><defs><linearGradient id="dm-gradient" x1="0" x2="1"><stop offset="0" stopColor="#0F766E"/><stop offset="1" stopColor="#2563EB"/></linearGradient></defs><path fill="url(#dm-gradient)" d="M32 5c-8.8 0-18.2 4.9-20.8 14.1-2.5 8.8 1.2 14.7 2.9 20.3C16 47 17.1 57 23.1 59c5.2 1.7 6.1-10.4 8.9-15.1 2.8 4.7 3.7 16.8 8.9 15.1 6-2 7.1-12 8.9-19.6 1.7-5.6 5.4-11.5 2.9-20.3C50.2 9.9 40.8 5 32 5Z"/><path fill="#fff" d="M32 17l3.3 6.7 7.4 1.1-5.4 5.2 1.3 7.4-6.6-3.5-6.6 3.5 1.3-7.4-5.4-5.2 7.4-1.1L32 17Z"/></svg>;
}

function NavIcon({ label }: { label: string }) {
  const glyphs: Record<string, string> = { Dashboard:"⌂", Patients:"◉", Appointments:"◷", Queue:"≡", Treatments:"✚", Prescriptions:"✎", Invoice:"▤", Payments:"৳", Inventory:"□", Accounting:"∑", "Staff & Users":"♙", "Backup & Restore":"↺", Settings:"⚙", About:"i" };
  return <span className="nav-icon" aria-hidden="true">{glyphs[label] ?? "•"}</span>;
}

export default App;
