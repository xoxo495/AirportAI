import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Login() {
  const fullText = "AI Airport Intelligence Systems";
  const [displayedText, setDisplayedText] = useState("");
  const [btnStyle, setBtnStyle] = useState({});
  const timerRef = useRef(null);

  const formRef = useRef(null);
  const logoRef = useRef(null);
  const rightSectionRef = useRef(null);

  const handleHover = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 120) - 60;
    const randomScale = (Math.random() * (0.6 - 0.3) + 0.3).toFixed(2);
    const randomRotate = Math.floor(Math.random() * 360);
    setBtnStyle({
      transform: `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`,
    });

    timerRef.current = setTimeout(() => {
      setBtnStyle({
        transform: "translate(0px, 0px) scale(1) rotate(0deg)",
      });
    }, 1500);
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

          <form ref={formRef} className="space-y-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-300"
                style={{ color: "#404041" }}
              >
                Email / Username
              </label>
              <input
                type="text"
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
                type="password"
                placeholder="Masukkan kata sandi anda..."
                className="w-full rounded-full border border-slate-700 bg-slate-800/50 p-3 text-sm placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div className="relative pt-2">
              <button
                type="submit"
                onMouseEnter={handleHover}
                style={btnStyle}
                className="w-full rounded-full bg-blue-900 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-out"
              >
                Masuk
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
