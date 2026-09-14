// BUGOUT full-screen cyber loader
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