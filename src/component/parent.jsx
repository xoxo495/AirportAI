import Sidebar from "./Navbar/sidebar";

export default function Parent({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
