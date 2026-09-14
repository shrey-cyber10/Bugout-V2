/* BUGOUT Home v4 — presentation-only override. Core app features remain in app.js. */
window.renderHome = async function renderHome(){
  const app=document.querySelector('#app');
  const safe=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let q=0,r=0,o=0,p=0,problems=[];
  try{
    const results=await Promise.all([
      db.from('community_questions').select('*',{count:'exact',head:true}),
      db.from('student_resources').select('*',{count:'exact',head:true}),
      db.from('student_opportunities').select('*',{count:'exact',head:true}),
      db.from('student_profiles').select('*',{count:'exact',head:true}),
      db.from('codeverse_problems').select('*').order('sort_order').limit(24)
    ]);
    q=results[0].count||0;r=results[1].count||0;o=results[2].count||0;p=results[3].count||0;problems=results[4].data||[];
  }catch(e){console.warn('BUGOUT home stats unavailable',e)}
  const daily=problems.length?problems[(new Date().getDate()-1)%problems.length]:null;
  const userName=S.user?(S.profile?.display_name||S.profile?.username||S.user.email?.split('@')[0]||'Student'):'Guest';
  app.innerHTML=`
  <div class="home-view jarvis-home">
    <section class="jarvis-hero" id="jarvisHero">
      <div class="jarvis-ambient"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="jarvis-intro">
        <div class="jarvis-status"><span class="live-dot"></span><span>BUGOUT NETWORK</span><strong>ONLINE</strong><span>// ${safe(userName.toUpperCase())}</span></div>
        <div class="eyebrow">ONE PLACE FOR STUDENT LIFE</div>
        <h1>Your student network, <em>connected.</em></h1>
        <p class="lead"><strong>BUGOUT brings the platforms students keep switching between into one connected space.</strong> Ask the community, practice programming, collect study resources, discover opportunities and build a profile that proves what you actually do.</p>
        <div class="jarvis-actions">
          <button class="btn primary" data-go="community">EXPLORE THE NETWORK ↗</button>
          <button class="btn ghost" data-go="codeverse">OPEN CODEVERSE →</button>
        </div>
        <div class="jarvis-brief">
          <div><b>${q}</b><small>community questions</small></div>
          <div><b>${problems.length}</b><small>coding challenges</small></div>
          <div><b>${p}</b><small>student identities</small></div>
        </div>
      </div>

      <div class="jarvis-console" aria-label="BUGOUT network map">
        <div class="hud-stage" id="hudStage">
          <div class="hud-glow"></div>
          <div class="hud-ticks"></div>
          <div class="hud-ring r1"></div><div class="hud-ring r2"></div><div class="hud-ring r3"></div>
          <div class="hud-scan"></div>
          <div class="hud-core"><span class="core-pulse"></span><div><b>BUGOUT</b><small>STUDENT NETWORK<br>ALL SYSTEMS CONNECTED</small></div></div>
          <button class="hud-node community" data-go="community"><span class="node-signal"></span><strong>01 / COMMUNITY</strong><small>Ask questions. Share answers. Build reputation.</small></button>
          <button class="hud-node codeverse" data-go="codeverse"><span class="node-signal"></span><strong>02 / CODEVERSE</strong><small>Write, run and solve programs across languages.</small></button>
          <button class="hud-node resources" data-go="resources"><span class="node-signal"></span><strong>03 / RESOURCE VAULT</strong><small>Notes, PDFs, PYQs, cheat sheets and links.</small></button>
          <button class="hud-node opportunities" data-go="opportunities"><span class="node-signal"></span><strong>04 / OPPORTUNITIES</strong><small>Internships, hackathons, scholarships and events.</small></button>
          <button class="hud-node identity" data-go="profile"><span class="node-signal"></span><strong>05 / IDENTITY</strong><small>Your profile, projects, skills and proof of work.</small></button>
          <div class="hud-readout a">signal // 98.7%<br>nodes // 05 active<br>latency // 24 ms</div>
          <div class="hud-readout b">network // synced<br>identity // ready<br>access // student</div>
        </div>
      </div>
    </section>

    <section class="system-strip" aria-label="BUGOUT live network status">
      <div class="system-stat"><b class="online">ONLINE</b><span>network status</span></div>
      <div class="system-stat"><b>${q}</b><span>questions in network</span></div>
      <div class="system-stat"><b>${problems.length}</b><span>Codeverse problems</span></div>
      <div class="system-stat"><b>${r}</b><span>shared resources</span></div>
      <div class="system-stat"><b>${o}</b><span>live opportunities</span></div>
    </section>

    <section class="intro-section">
      <div class="intro-grid">
        <div class="intro-sticky">
          <div class="eyebrow">WHAT IS BUGOUT?</div>
          <h2>A digital campus built around what students actually need.</h2>
          <p>Students already use different websites for questions, coding practice, notes, internships and networking. <strong>BUGOUT connects those jobs instead of making you maintain five separate student lives.</strong></p>
          <p>Your activity connects too: helping someone in Community, solving Codeverse problems, sharing resources and adding projects all become part of the same student identity.</p>
        </div>
        <div class="platform-flow">
          <article class="flow-card" data-go="community"><span class="num">01</span><span class="flow-line"></span><h3>Ask the network.</h3><p>A student-first discussion space inspired by the usefulness of Q&A communities — questions, answers, voting, accepted solutions, tags and real people.</p></article>
          <article class="flow-card" data-go="codeverse"><span class="num">02</span><span class="flow-line"></span><h3>Practice inside Codeverse.</h3><p>Open a problem or a blank playground, choose your language, write code, run it in a sandbox and build up a real coding history from beginner to expert.</p></article>
          <article class="flow-card" data-go="resources"><span class="num">03</span><span class="flow-line"></span><h3>Keep useful knowledge findable.</h3><p>Store and discover notes, PDFs, previous-year questions, cheat sheets and useful links without digging through old chats and random folders.</p></article>
          <article class="flow-card" data-go="opportunities"><span class="num">04</span><span class="flow-line"></span><h3>Find the next move.</h3><p>Internships, hackathons, scholarships, competitions and student events live in a dedicated feed instead of disappearing across dozens of portals.</p></article>
          <article class="flow-card" data-go="profile"><span class="num">05</span><h3>Turn activity into identity.</h3><p>Build a deeply customizable profile with your photo, cover, bio, interests, skills, projects, links, Codeverse stats and community contribution — your student internet identity.</p></article>
        </div>
      </div>
    </section>

    <section class="home-command">
      <div class="command-shell">
        <div class="command-top"><span>BUGOUT // ACTIVE SESSION</span><span>CORE SERVICES <b>READY</b></span></div>
        <div class="command-body">
          <div class="command-copy">
            <div class="eyebrow">START ANYWHERE</div>
            <h2>You don't need to learn BUGOUT before using it.</h2>
            <p>Have a doubt? Open Community. Want to code? Enter Codeverse. Need notes? Search the Vault. Looking for an internship or hackathon? Check Opportunities. Everything shares the same account and profile.</p>
            <div class="command-actions"><button class="btn primary" data-go="community">ASK SOMETHING ↗</button><button class="btn" data-go="codeverse">START CODING →</button><button class="btn ghost" data-go="profile">BUILD PROFILE</button></div>
          </div>
          <aside class="command-panel">
            <div class="command-item"><span>COMMUNITY</span><span class="ready">READY</span></div>
            <div class="command-item"><span>CODEVERSE TODAY</span><span>${safe(daily?.title||'CHALLENGE READY')}</span></div>
            <div class="command-item"><span>RESOURCE VAULT</span><span>${r} ITEMS</span></div>
            <div class="command-item"><span>OPPORTUNITY FEED</span><span>${o} LIVE</span></div>
            <div class="command-item"><span>STUDENT PROFILES</span><span>${p} CONNECTED</span></div>
          </aside>
        </div>
      </div>
    </section>
  </div>`;

  app.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>nav(el.dataset.go)));
  const stage=app.querySelector('#hudStage');
  const hero=app.querySelector('#jarvisHero');
  if(stage&&hero&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      stage.style.transform=`rotateX(${(-y*3.5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translate3d(${(x*5).toFixed(1)}px,${(y*4).toFixed(1)}px,0)`;
    });
    hero.addEventListener('pointerleave',()=>stage.style.transform='');
  }
};
