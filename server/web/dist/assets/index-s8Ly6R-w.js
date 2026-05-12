(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&a(t)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const S="modulepreload",C=function(e){return"/"+e},p={},P=function(o,s,a){let n=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),r=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));n=Promise.allSettled(s.map(c=>{if(c=C(c),c in p)return;p[c]=!0;const u=c.endsWith(".css"),w=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${w}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":S,u||(l.as="script"),l.crossOrigin="",l.href=c,r&&l.setAttribute("nonce",r),document.head.appendChild(l),u)return new Promise((E,L)=>{l.addEventListener("load",E),l.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(t){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t}return n.then(t=>{for(const r of t||[])r.status==="rejected"&&i(r.reason);return o().catch(i)})};function m(e){const o=e.replace(/\/+$/,"")||"/",s=/^\/g\/([^/]+)$/.exec(o);if(s!=null&&s[1])return{name:"arena",inviteCode:decodeURIComponent(s[1])};const a=/^\/join\/([^/]+)$/.exec(o);return a!=null&&a[1]?{name:"arena",inviteCode:decodeURIComponent(a[1])}:{name:"landing"}}function v(e){history.pushState(null,"",e),window.dispatchEvent(new Event("rpg-route"))}function R(e){return window.addEventListener("popstate",e),window.addEventListener("rpg-route",e),()=>{window.removeEventListener("popstate",e),window.removeEventListener("rpg-route",e)}}let d=0,f=null;function y(){f&&(f(),f=null)}function q(){d+=1,y()}function I(e,o){var i;d+=1,y();const s=d;e.innerHTML=`
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
  `;const a=e.querySelector("#arena-code");a&&(a.textContent=o),(i=e.querySelector("#arena-back"))==null||i.addEventListener("click",()=>{v("/")});const n=e.querySelector("#phaser-host");n&&(async()=>{const t=await P(()=>import("./arenaPhaser-BKSQNLtX.js"),[]);if(s!==d)return;const r=t.bootArena(n);if(s!==d){r();return}f=r})()}async function j(){const e=await fetch("/api/v1/rooms",{method:"POST"});if(!e.ok)throw new Error(`create room failed: ${e.status}`);return await e.json()}function U(e){const o=e.trim();if(!o)return null;try{if(o.includes("://")){const i=new URL(o),t=/^\/g\/([^/]+)/.exec(i.pathname),r=/^\/join\/([^/]+)/.exec(i.pathname),c=(t==null?void 0:t[1])??(r==null?void 0:r[1]);if(c)return decodeURIComponent(c)}}catch{}const s=o.startsWith("/")?o:`/${o}`,a=/^\/g\/([^/]+)/.exec(s),n=/^\/join\/([^/]+)/.exec(s);return a!=null&&a[1]?decodeURIComponent(a[1]):n!=null&&n[1]?decodeURIComponent(n[1]):/^[A-Za-z0-9_-]+$/.test(o)?o:null}function x(e,o){var n,i;e.innerHTML=`
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
  `;const s=e.querySelector("#landing-err"),a=t=>{s&&(t?(s.textContent=t,s.hidden=!1):(s.textContent="",s.hidden=!0))};(n=e.querySelector("#create-room"))==null||n.addEventListener("click",()=>{(async()=>{a(null);const t=e.querySelector("#create-room");t&&(t.disabled=!0);try{const r=await j();o(r.paths.g)}catch(r){a(r instanceof Error?r.message:"Could not create group")}finally{t&&(t.disabled=!1)}})()}),(i=e.querySelector("#join-form"))==null||i.addEventListener("submit",t=>{t.preventDefault();const r=e.querySelector("#join-code"),c=U((r==null?void 0:r.value)??"");if(!c){a("Enter a valid invite code or paste a /g/… or /join/… link.");return}a(null),o(`/g/${encodeURIComponent(c)}`)})}const b=document.querySelector("#app");if(!(b instanceof HTMLElement))throw new Error("#app container not found");const h=b;function g(){const e=location.pathname;let o=m(e);if(o.name==="landing"&&e!=="/"&&e!==""&&(history.replaceState(null,"","/"),o=m("/")),q(),o.name==="landing"){x(h,v);return}I(h,o.inviteCode)}R(g);g();
//# sourceMappingURL=index-s8Ly6R-w.js.map
