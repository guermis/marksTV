import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Tv, Smartphone, Laptop, Gamepad2, MonitorPlay,
  Zap, Trophy, ImageIcon, Wallet, Rocket, Check,
  ChevronDown, MessageCircle, Star, Play, Flame, Goal,
} from "lucide-react";
import heroDevices from "@/assets/hero-devices.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import familyWatching from "@/assets/family-watching.jpg";
import sportsFootball from "@/assets/sports-football.jpg";
import coupleMovie from "@/assets/couple-movie.jpg";
import friendsSports from "@/assets/friends-sports.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Marks IPTV — O Melhor IPTV do Brasil | +17.000 Canais, Filmes e Séries" },
      { name: "description", content: "Assista onde e quando quiser. Mais de 17.000 conteúdos em SD, HD, FullHD e 4K. Teste grátis por 6 horas. Liberação imediata." },
      { property: "og:title", content: "Marks IPTV — O Melhor IPTV do Brasil" },
      { property: "og:description", content: "+17.000 canais, filmes e séries. Teste grátis por 6 horas. Cancele quando quiser." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" },
    ],
  }),
});

const WHATSAPP_URL = "https://wa.me/5512991860629?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre o IPTV.");

/* ---------------- Custom Cursor ---------------- */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label, summary')) {
        ringRef.current?.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label, summary')) {
        ringRef.current?.classList.remove("is-hover");
      }
    };
    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp = () => ringRef.current?.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ---------------- Reveal on scroll ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CTAButton({ children, variant = "primary", className = "" }: { children: React.ReactNode; variant?: "primary" | "outline" | "ghost"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold text-base transition-all duration-300 whitespace-nowrap";
  const styles = {
    primary: "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.04] hover:brightness-110",
    outline: "glass text-foreground hover:bg-primary/15 hover:border-primary/60",
    ghost: "bg-card text-foreground hover:bg-secondary",
  };
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Header />
      <Hero />
      <Devices />
      <Sports />
      <Lifestyle />
      <Benefits />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Play className="w-4 h-4 text-primary-foreground fill-current" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Marks IPTV</span>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground hover:brightness-110 transition">
          <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="container mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-[90px] relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Liberação imediata após pagamento
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              O MELHOR<br />
              <span className="text-gradient">IPTV DO BRASIL</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Assista onde e quando quiser. <span className="text-foreground font-medium">Cancele quando quiser.</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <CTAButton variant="primary" className="text-lg px-8 py-5">
                <Zap className="w-5 h-5" /> TESTE GRÁTIS POR 6 HORAS
              </CTAButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <Stat value="+17.000" label="Conteúdos" />
              <Stat value="4K" label="Qualidade" />
              <Stat value="24/7" label="Suporte" />
            </div>
          </div>
          <div className="relative reveal animate-float">
            <div className="absolute -inset-8 bg-primary/30 blur-3xl rounded-full" />
            <img
              src={heroDevices}
              alt="Marks IPTV exibido em Smart TV e celular"
              width={1536}
              height={1024}
              className="relative rounded-2xl shadow-card w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-2xl text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Devices() {
  const devices = [
    { icon: Tv, label: "Smart TV" },
    { icon: MonitorPlay, label: "TV Box" },
    { icon: Smartphone, label: "Celular" },
    { icon: Laptop, label: "Notebook" },
    { icon: Gamepad2, label: "Xbox One" },
  ];
  const platforms = [
    "Netflix", "HBO Max", "Disney+", "Star+", "Amazon Prime Video",
    "Apple TV+", "Globoplay", "Paramount+", "Hulu", "AMC+",
  ];
  return (
    <section className="py-20 md:py-[90px] border-t border-white/5">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            O que você vai <span className="text-gradient">acessar também</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">+17.000 canais, filmes e séries em todas as suas telas</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 reveal">
          {devices.map(({ icon: Icon, label }) => (
            <div key={label} className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
              <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <span className="font-semibold text-sm">{label}</span>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 reveal">
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-5">Plataformas incluídas</p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <span key={p} className="px-5 py-2 rounded-full glass-strong font-semibold text-sm hover:scale-105 transition">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sports() {
  const channels = [
    "Premiere", "SporTV", "ESPN 1", "ESPN 2", "ESPN 3", "ESPN 4",
    "DAZN", "UFC", "F1", "NBA", "Eurosport", "Combate",
  ];
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={sportsFootball}
          alt="Estádio de futebol"
          width={1280}
          height={896}
          loading="lazy"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="container mx-auto px-5 relative">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-primary text-xs font-bold text-primary-foreground mb-6 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> Lâmina esportes
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02]">
            NÃO PERCA <span className="text-gradient">NENHUM GOL</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos os jogos do seu time, ao vivo e em alta definição. Brasileirão, Libertadores, Champions, NBA, UFC, Fórmula 1 e muito mais — tudo no mesmo lugar.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto reveal">
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <Goal className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl">Canais inclusos</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full glass text-sm font-semibold hover:bg-primary/20 hover:border-primary/50 transition">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              + dezenas de outros canais esportivos nacionais e internacionais.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-card border border-white/10 group">
            <img
              src={friendsSports}
              alt="Amigos comemorando gol no sofá"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-display font-bold text-2xl md:text-3xl mb-2">
                A galera reunida. <span className="text-gradient">O jogo na sua casa.</span>
              </p>
              <CTAButton variant="primary" className="mt-3">
                <Trophy className="w-5 h-5" /> Quero ver os jogos
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lifestyle() {
  return (
    <section className="py-20 md:py-[90px]">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14 max-w-2xl mx-auto reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Momentos que importam</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Cinema, sofá e <span className="text-gradient">o pessoal que você ama</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden group reveal border border-white/10 shadow-card">
            <img
              src={familyWatching}
              alt="Família reunida assistindo TV"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="font-display font-bold text-2xl mb-1">Noite em família</h3>
              <p className="text-muted-foreground">Desenhos, filmes e séries pra todas as idades, num só lugar.</p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden group reveal border border-white/10 shadow-card">
            <img
              src={coupleMovie}
              alt="Casal assistindo filme no sofá"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="font-display font-bold text-2xl mb-1">Sessão a dois</h3>
              <p className="text-muted-foreground">Os lançamentos do cinema, sem sair de casa, sempre que quiser.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Wallet, title: "Economia de verdade", desc: "Chega de pedir senha emprestada ou pagar várias assinaturas. Tudo num lugar só, com preço que cabe no bolso." },
    { icon: Trophy, title: "Todos os jogos, sem perder o gol", desc: "Assista o seu time quando quiser, sem depender da programação aberta." },
    { icon: ImageIcon, title: "Qualidade de imagem premium", desc: "SD, HD, FullHD e 4K. Funciona muito bem mesmo com internet modesta." },
    { icon: Rocket, title: "Liberação imediata", desc: "Pagou, liberou. Comece a assistir na mesma hora, sem burocracia." },
    { icon: Tv, title: "TV aberta e fechada", desc: "Todos os canais, incluindo os fechados estilo Sky, sem limitação." },
    { icon: Zap, title: "Suporte humano 24/7", desc: "Atendimento direto pelo WhatsApp sempre que precisar." },
  ];
  return (
    <section className="py-20 md:py-[90px]">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14 max-w-2xl mx-auto reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Por que escolher</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Tudo em um só app, <span className="text-gradient">sem complicação</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-7 hover:border-primary/40 hover:-translate-y-1.5 hover:bg-card/50 transition-all duration-500 reveal">
              <div className="w-12 h-12 rounded-xl glass-primary grid place-items-center mb-5">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <CTAButton variant="primary">QUERO CONHECER</CTAButton>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Mensal", price: "35", period: "/mês", screens: "1 tela de acesso", highlight: false, badge: null },
    { name: "Anual", price: "299", period: "/ano", screens: "2 telas de acesso", highlight: true, badge: "MAIS POPULAR" },
    { name: "Trimestral", price: "90", period: "/trimestre", screens: "1 tela de acesso", highlight: false, badge: null },
  ];
  const features = ["+17 mil conteúdos", "Filmes e séries em SD, HD, FullHD e 4K", "Liberação imediata", "Suporte via WhatsApp"];

  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Nossos planos</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Escolha o plano <span className="text-gradient">ideal pra você</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto md:items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`reveal relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.highlight
                  ? "glass-primary border border-primary/60 shadow-glow md:scale-105 md:py-12 hover:shadow-[0_30px_80px_-20px_oklch(0.65_0.24_27_/_0.7)]"
                  : "glass hover:border-primary/50 hover:shadow-glow"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold tracking-wider">
                  {plan.badge}
                </div>
              )}
              <h3 className={`font-display font-bold text-2xl ${plan.highlight ? "text-primary-foreground" : ""}`}>{plan.name}</h3>
              <p className={`text-sm mt-1 ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.screens}</p>
              <div className="my-6 flex items-baseline gap-1">
                <span className={`text-sm font-semibold ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>R$</span>
                <span className={`font-display font-extrabold text-5xl ${plan.highlight ? "text-primary-foreground" : ""}`}>{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={plan.highlight ? "text-primary-foreground" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center w-full rounded-full px-6 py-3.5 font-semibold transition ${
                  plan.highlight
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-gradient-primary text-primary-foreground hover:brightness-110"
                }`}
              >
                Escolher
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const images = [testimonial1, testimonial2, testimonial3];
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14 reveal">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Veja o que <span className="text-gradient">nossos clientes falam</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {images.map((src, i) => (
            <div key={i} className="reveal rounded-2xl overflow-hidden glass shadow-card hover:-translate-y-2 hover:shadow-glow transition-all duration-500">
              <img src={src} alt={`Depoimento de cliente ${i + 1}`} loading="lazy" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Como vou receber?", a: "Os dados de acesso serão enviados automaticamente via WhatsApp logo após a confirmação do pagamento." },
    { q: "Qual a velocidade de internet eu preciso ter?", a: "Você não precisa se preocupar com isso. Nossos planos funcionam perfeitamente em qualquer velocidade." },
    { q: "Posso assistir em qualquer modelo de TV?", a: "Sim, você pode acessar filmes, séries e canais em qualquer TV que conecte a uma TV Box, além de Smart TVs, celulares, notebooks e Xbox One." },
    { q: "E se eu não gostar?", a: "É só entrar em contato com a gente. Damos todo o suporte e fazemos o seu reembolso sem burocracia." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-5 max-w-3xl">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="glass rounded-2xl overflow-hidden reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-lg">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="faq-content overflow-hidden"
                  data-state={isOpen ? "open" : "closed"}
                >
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10 reveal">
          <CTAButton variant="primary">MAIS INFORMAÇÕES</CTAButton>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl glass-primary p-10 md:p-16 text-center shadow-glow reveal">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground">
              Pronto pra assistir tudo?
            </h2>
            <p className="mt-3 text-primary-foreground/90 text-lg max-w-xl mx-auto">
              Teste grátis por 6 horas. Sem cartão, sem compromisso.
            </p>
            <div className="mt-7">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-bold text-lg hover:scale-[1.04] transition">
                <MessageCircle className="w-5 h-5" /> Começar agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container mx-auto px-5 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-gradient-primary grid place-items-center">
            <Play className="w-3 h-3 text-primary-foreground fill-current" />
          </div>
          <span className="font-display font-bold text-foreground">Marks IPTV</span>
        </div>
        <p>TV 2024 — Todos os direitos reservados a Marks IPTV.</p>
        <p className="mt-2">
          Desenvolvimento e Hospedagem:{" "}
          <a
            href="https://instagram.com/guermi.s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            @guermi.s
          </a>
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full grid place-items-center bg-success text-success-foreground shadow-glow hover:scale-110 transition"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
