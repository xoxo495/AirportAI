import Sidebar from "./Navbar/sidebar";

export default function Parent({ children }) {
  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden relative">{children}</main>
    </div>
  );
}
