import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { gsap } from "gsap";
import { supabase } from "../../supabase";

export default function Login() {
  const fullText = "AI Airport Intelligence Systems";
  const [displayedText, setDisplayedText] = useState("");
  const [btnStyle, setBtnStyle] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const rightSectionRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMSG("");

    try {
      const { data: authData } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authData?.user) {
        localStorage.setItem("userRole", "admin");
        navigate("/dashboard");
        return;
      }

      const { data: karyawanData } = await supabase
        .from("karyawan")
        .select("*")
        .eq("email", email)
        .eq("kode_akses", password)
        .maybeSingle();

      if (karyawanData) {
        localStorage.setItem("userRole", "karyawan");
        localStorage.setItem("userData", JSON.stringify(karyawanData));
        navigate("/chat");
        return;
      }

      const { data: userData } = await supabase
        .from("user_umum")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();

      if (userData) {
        localStorage.setItem("userRole", "user_umum");
        navigate("/chat");
        return;
      }

      setErrorMSG("Kredensial tidak ditemukan. Pastikan huruf besar/kecil sesuai!");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMSG("Terjadi kesalahan sistem. Cek koneksi internetmu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let index = displayedText.length;
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1));
      }, 70);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedText("");
      }, 10000);
      return () => clearTimeout(resetTimer);
    }
  }, [displayedText]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(rightSectionRef.current, {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-900 lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 relative z-20">
        <div className="w-full max-w-md space-y-6">
          <div
            ref={logoRef}
            className="flex justify-center items-center w-full my-4"
          >
            <img
              src="/Logo/AAILogo.png"
              alt="Logo AAI"
              className="mx-auto h-auto max-w-[150px] object-contain"
            />
          </div>

          <form ref={formRef} className="space-y-4" onSubmit={handleLogin}>

            {errorMSG && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/50">
                {errorMSG}
              </div>
            )}

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-300"
                style={{ color: "#404041" }}
              >
                Email / Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full rounded-full border-2 border-sky-500 bg-transparent p-3 text-sm text-slate-800 placeholder-slate-400 transition focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                style={{ color: "#404041" }}
              >
                Kata Sandi
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi anda..."
                className="w-full rounded-full border border-slate-700 bg-slate-800/50 p-3 text-sm placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle state
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    // Ikon Mata Terbuka
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    // Ikon Mata Tercoret
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
            </div>
            <div className="relative pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-blue-900 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memeriksa..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        ref={rightSectionRef}
        className="relative hidden items-center justify-center lg:flex overflow-hidden"
      >
        <img
          src="/Background/1307317.jpg"
          alt="Latar Belakang Teknologi"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, #1D2250 0%, rgba(4, 176, 192, 0.26) 100%)",
          }}
        />
        <div className="relative z-10 text-right text-white max-w-lg p-4 space-y-1">
          <h1 className="text-5xl font-semibold">Selamat Datang Di</h1>
          <h1 className="text-6xl font-bold text-slate-900">{displayedText}</h1>
          <p className="text-base text-2xl">
            Asisten AI untuk pelayanan bandara
          </p>
        </div>
      </div>
    </div>
  );
}
