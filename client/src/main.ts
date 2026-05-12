import "./style.css";
import { disposeArena, renderArena } from "./arena";
import { renderLanding } from "./landing";
import { installRouteListener, navigate, parseRoute } from "./router";

const appElement = document.querySelector("#app");
if (!(appElement instanceof HTMLElement)) {
  throw new Error("#app container not found");
}
const app = appElement;

function render(): void {
  const pathname = location.pathname;
  let route = parseRoute(pathname);
  if (route.name === "landing" && pathname !== "/" && pathname !== "") {
    history.replaceState(null, "", "/");
    route = parseRoute("/");
  }
  disposeArena();

  if (route.name === "landing") {
    renderLanding(app, navigate);
    return;
  }

  renderArena(app, route.inviteCode);
}

installRouteListener(render);
render();
