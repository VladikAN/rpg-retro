import { navigate } from "./router";

let bootId = 0;
let teardown: (() => void) | null = null;

function clearPhaserOnly(): void {
  if (teardown) {
    teardown();
    teardown = null;
  }
}

export function disposeArena(): void {
  bootId += 1;
  clearPhaserOnly();
}

export function renderArena(root: HTMLElement, inviteCode: string): void {
  bootId += 1;
  clearPhaserOnly();
  const generation = bootId;

  root.innerHTML = `
    <div class="arena">
      <header class="arena-bar">
        <button type="button" class="btn ghost" id="arena-back" aria-label="Back to home">← Home</button>
        <div class="arena-title">
          <span class="label">Invite code</span>
          <code class="code" id="arena-code"></code>
        </div>
      </header>
      <div class="phaser-host" id="phaser-host"></div>
      <p class="muted footnote">Event log and WebSocket join will follow in later milestones.</p>
    </div>
  `;

  const codeEl = root.querySelector("#arena-code");
  if (codeEl) {
    codeEl.textContent = inviteCode;
  }

  root.querySelector("#arena-back")?.addEventListener("click", () => {
    navigate("/");
  });

  const host = root.querySelector<HTMLElement>("#phaser-host");
  if (!host) {
    return;
  }

  void (async () => {
    const mod = await import("./arenaPhaser");
    if (generation !== bootId) {
      return;
    }
    const stop = mod.bootArena(host);
    if (generation !== bootId) {
      stop();
      return;
    }
    teardown = stop;
  })();
}
