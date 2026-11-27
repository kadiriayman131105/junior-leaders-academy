const themeBoot = `(function(){try{var s=localStorage.getItem("jla-theme");var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootNotFound() {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <style>{`
          :root { color-scheme: light; --page: #FFF8F4; --ink: #232E40; --ember: #C24E02; }
          html.dark { color-scheme: dark; --page: #0C0F14; --ink: #F6EFE8; --ember: #FFA85C; }
          body { margin: 0; font-family: Arial, sans-serif; background: var(--page); color: var(--ink); }
        `}</style>
      </head>
      <body>
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
          <p style={{ color: "var(--ember)", fontWeight: 800 }}>404</p>
          <h1 style={{ fontSize: "clamp(1.75rem, 6vw, 2.25rem)", lineHeight: 1.15 }}>Page introuvable</h1>
          <p>Cette page n&apos;existe pas.</p>
          <a href="/fr" style={{ display: "inline-block", marginTop: 24, background: "#FC6703", color: "#232E40", fontWeight: 800, textDecoration: "none", borderRadius: 999, padding: "12px 20px" }}>
            Retour à l&apos;accueil
          </a>
        </main>
      </body>
    </html>
  );
}
