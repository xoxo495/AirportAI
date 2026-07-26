export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Selamat Datang</h2>
          <p className="text-sm text-slate-400 mt-1">
            Silakan masuk ke akun Anda
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Email / Username
            </label>
            <input
              type="text"
              placeholder="nama@email.com"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Kata Sandi
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi anda..."
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-blue shadow-md transition-colors hover:bg-sky-500 active:bg-sky-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
