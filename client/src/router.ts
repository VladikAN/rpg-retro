export type Route =
  | { name: "landing" }
  | { name: "arena"; inviteCode: string };

export function parseRoute(pathname: string): Route {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const g = /^\/g\/([^/]+)$/.exec(normalized);
  if (g?.[1]) {
    return { name: "arena", inviteCode: decodeURIComponent(g[1]) };
  }
  const j = /^\/join\/([^/]+)$/.exec(normalized);
  if (j?.[1]) {
    return { name: "arena", inviteCode: decodeURIComponent(j[1]) };
  }
  return { name: "landing" };
}

export function navigate(path: string): void {
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("rpg-route"));
}

export function installRouteListener(handler: () => void): () => void {
  window.addEventListener("popstate", handler);
  window.addEventListener("rpg-route", handler);
  return () => {
    window.removeEventListener("popstate", handler);
    window.removeEventListener("rpg-route", handler);
  };
}
