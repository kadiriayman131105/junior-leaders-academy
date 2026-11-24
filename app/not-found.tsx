export default function RootNotFound() {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#FFF8F4", color: "#232E40" }}>
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
          <p style={{ color: "#C24E02", fontWeight: 800 }}>404</p>
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
