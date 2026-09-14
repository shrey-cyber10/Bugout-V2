// BUGOUT full-screen cyber loader + V3 safety layout patch
(()=>{
  const style=document.createElement('style');
  style.id='bugout-v3-safety-css';
  style.textContent=`
    body.bugout-v3 .v3page{display:none;padding-top:84px;min-height:100vh;background:#050608;color:#f6f8ff}
    body.bugout-v3 .v3page.active{display:block}
    body.bugout-v3:not(.v3-legacy-view)> .page{display:none!important}
    body.bugout-v3.v3-legacy-view .v3-nav,body.bugout-v3.v3-legacy-view .v3page{display:none!important}
    body.bugout-v3.v3-legacy-view nav.legacy-nav-hidden{display:flex!important}
    body.bugout-v3.v3-legacy-view> .page.active{display:block!important}
    #v3LegacyBack{display:none;position:fixed;left:18px;bottom:18px;z-index:20000;padding:11px 15px;border:1px solid rgba(0,231,255,.38);border-radius:5px;background:rgba(4,7,10,.94);color:#fff;font:700 10px 'JetBrains Mono',monospace;letter-spacing:.08em;cursor:pointer;box-shadow:0 0 24px rgba(0,231,255,.13)}
    body.bugout-v3.v3-legacy-view #v3LegacyBack{display:block}
    @media(max-width:720px){body.bugout-v3 .v3page{padding-top:72px}}
  `;
  document.head.appendChild(style);
})();

class LoadingScreen{
  constructor(){this.active=false;this.started=Date.now();this.duration=this.getDuration();this.mount();this.animate();this.schedule()}
  getDuration(){try{const seen=sessionStorage.getItem('bugout_loader_v3');sessionStorage.setItem('bugout_loader_v3','1');return seen?1450:2750}catch{return 2200}}
  mount(){document.getElementById('loadingScreen')?.remove();const el=document.createElement('div');el.id='loadingScreen';el.className='loading-screen v3-loader';el.innerHTML=`<div class="loader-logo-layer"></div><div class="loader-grid"></div><div class="loader-rgb rgb-a"></div><div class="loader-rgb rgb-b"></div><div class="loader-scan"></div><div class="loader-noise"></div><div class="loader-ui"><span>BUGOUT // STUDENT NETWORK</span><span id="loaderBoot">CONNECTING NETWORK...</span></div><div class="loader-progress"><i></i></div><div class="loader-corner a">BG//V3</div><div class="loader-corner b">MIND FORGERS</div>`;document.body.appendChild(el);this.el=el;this.active=true}
  animate(){const lines=['CONNECTING NETWORK...','COMMUNITY // ONLINE','CODEVERSE // READY','RESOURCE VAULT // SYNCED','OPPORTUNITIES // LINKED','BUGOUT // READY'];let i=0;this.boot=setInterval(()=>{const b=document.getElementById('loaderBoot');if(b)b.textContent=lines[Math.min(++i,lines.length-1)]},390);this.glitch=setInterval(()=>{if(!this.el)return;this.el.classList.add('loader-hard-glitch');setTimeout(()=>this.el?.classList.remove('loader-hard-glitch'),95)},610)}
  schedule(){setTimeout(()=>this.hide(),Math.max(0,this.duration-(Date.now()-this.started)))}
  hide(){if(!this.active)return;clearInterval(this.boot);clearInterval(this.glitch);this.el?.classList.add('hide');setTimeout(()=>{this.el?.remove();this.active=false},620)}
  forceHide(){this.hide()}
  show(){if(this.active)return;this.started=Date.now();this.duration=1400;this.mount();this.animate();this.schedule()}
}
let loadingScreen;
document.addEventListener('DOMContentLoaded',()=>{loadingScreen=new LoadingScreen();document.addEventListener('keydown',e=>{if(e.key==='Escape')loadingScreen?.forceHide()})});
window.showLoadingScreen=()=>loadingScreen?.show();window.hideLoadingScreen=()=>loadingScreen?.forceHide();