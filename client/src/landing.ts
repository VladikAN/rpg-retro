import { createRoom } from "./api";

function parseJoinInput(raw: string): string | null {
  const t = raw.trim();
  if (!t) {
    return null;
  }
  try {
    if (t.includes("://")) {
      const u = new URL(t);
      const g = /^\/g\/([^/]+)/.exec(u.pathname);
      const j = /^\/join\/([^/]+)/.exec(u.pathname);
      const fromUrl = g?.[1] ?? j?.[1];
      if (fromUrl) {
        return decodeURIComponent(fromUrl);
      }
    }
  } catch {
    // ignore invalid URL
  }
  const path = t.startsWith("/") ? t : `/${t}`;
  const g = /^\/g\/([^/]+)/.exec(path);
  const j = /^\/join\/([^/]+)/.exec(path);
  if (g?.[1]) {
    return decodeURIComponent(g[1]);
  }
  if (j?.[1]) {
    return decodeURIComponent(j[1]);
  }
  if (/^[A-Za-z0-9_-]+$/.test(t)) {
    return t;
  }
  return null;
}

export function renderLanding(
  root: HTMLElement,
  navigate: (path: string) => void,
): void {
  root.innerHTML = `
    <main class="shell landing">
      <h1>rpg-retro</h1>
      <p class="muted">Create a group or join with an invite code.</p>
      <div class="actions">
        <button type="button" class="btn primary" id="create-room">Create group</button>
      </div>
      <form class="join-form" id="join-form" autocomplete="off">
        <label class="field">
          <span class="label">Join with code or link</span>
          <input type="text" name="code" id="join-code" placeholder="Invite code or /g/…" spellcheck="false" />
        </label>
        <button type="submit" class="btn secondary" id="join-submit">Join</button>
      </form>
      <p class="err" id="landing-err" hidden></p>
    </main>
  `;

  const errEl = root.querySelector<HTMLElement>("#landing-err");
  const setErr = (msg: string | null) => {
    if (!errEl) {
      return;
    }
    if (msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
    } else {
      errEl.textContent = "";
      errEl.hidden = true;
    }
  };

  root.querySelector("#create-room")?.addEventListener("click", () => {
    void (async () => {
      setErr(null);
      const btn = root.querySelector<HTMLButtonElement>("#create-room");
      if (btn) {
        btn.disabled = true;
      }
      try {
        const room = await createRoom();
        navigate(room.paths.g);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Could not create group");
      } finally {
        if (btn) {
          btn.disabled = false;
        }
      }
    })();
  });

  root.querySelector("#join-form")?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const input = root.querySelector<HTMLInputElement>("#join-code");
    const code = parseJoinInput(input?.value ?? "");
    if (!code) {
      setErr("Enter a valid invite code or paste a /g/… or /join/… link.");
      return;
    }
    setErr(null);
    navigate(`/g/${encodeURIComponent(code)}`);
  });
}
