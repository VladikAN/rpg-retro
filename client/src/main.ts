import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
    <main class="shell">
      <h1>rpg-retro</h1>
      <p class="muted">v0.1 scaffold — landing and arena to follow in later tickets.</p>
    </main>
  `;
}

// Phaser and arena scene are loaded lazily on the arena route (see docs/adr/0003).
