// BUGOUT Student Help Experience
// Keeps the proven backend/features, but presents a much simpler student-first product.
class StudentHelpExperience {
    constructor() {
        this.init();
    }

    init() {
        document.body.classList.add('student-help-product');
        this.updateBranding();
        this.simplifyNavigation();
        this.buildDashboard();
        this.simplifyTutor();
        this.simplifyCoding();
        this.simplifyCommunity();
        this.watchUserState();
        this.bindKeyboardShortcuts();
    }

    updateBranding() {
        document.title = 'BUGOUT — Student Help, All in One Place';
        const subtitle = document.querySelector('.logo-subtitle');
        if (subtitle) subtitle.textContent = 'student help network';
        const logoText = document.querySelector('.logo-text');
        if (logoText) logoText.classList.add('bugout-glitch-logo');
    }

    simplifyNavigation() {
        this.renameNav('homeNavBtn', 'Home', 'home');
        this.renameNav('teacherNavBtn', 'AI Tutor', 'tutor');
        this.renameNav('arenaNavBtn', 'Coding', 'coding');

        ['missionsNavBtn', 'careerNavBtn', 'dashboardNavBtn', 'mentorNavBtn', 'analyzerNavBtn', 'collabNavBtn', 'bookmarkNavBtn']
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

        const nav = document.querySelector('.nav-center');
        if (nav && !document.getElementById('communityNavBtn')) {
            const community = document.createElement('button');
            community.className = 'nav-btn os-nav-btn student-community-nav';
            community.id = 'communityNavBtn';
            community.textContent = 'Community';
            community.addEventListener('click', () => this.openCommunity());
            nav.appendChild(community);
        }

        const postBtn = document.getElementById('postBtn');
        if (postBtn) postBtn.textContent = 'Ask Community';

        const leaderboardButton = [...document.querySelectorAll('.nav-right .btn')]
            .find(button => /leaderboard/i.test(button.textContent || ''));
        if (leaderboardButton) {
            leaderboardButton.textContent = 'Top Helpers';
            leaderboardButton.classList.add('top-helpers-btn');
        }
    }

    renameNav(id, text, mode) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = text;
        el.removeAttribute('data-pillar');
        el.dataset.studentMode = mode;
    }

    buildDashboard() {
        const home = document.getElementById('homePage');
        const root = home?.querySelector('.bugout-os');
        if (!root || document.getElementById('studentHelpDashboard')) return;

        root.querySelectorAll(':scope > .mc-hero, :scope > .os-pillars, :scope > .mc-grid, :scope > .xp-dimensions')
            .forEach(section => section.classList.add('legacy-os-hidden'));

        const community = root.querySelector('.community-exchange');
        const dashboard = document.createElement('section');
        dashboard.id = 'studentHelpDashboard';
        dashboard.className = 'student-help-dashboard';
        dashboard.innerHTML = `
            <div class="student-cyber-orb orb-a" aria-hidden="true"></div>
            <div class="student-cyber-orb orb-b" aria-hidden="true"></div>

            <section class="student-help-hero">
                <div class="student-help-kicker">
                    <span>BUGOUT // STUDENT HELP NETWORK</span>
                    <span class="student-ai-status"><i></i> AI ONLINE</span>
                </div>
                <div class="student-help-hero-grid">
                    <div class="student-help-copy">
                        <p class="student-greeting" id="studentGreeting">HEY, STUDENT.</p>
                        <h1>What are you <span>stuck</span> on?</h1>
                        <p class="student-help-lead">Studies, coding, assignments, exams or college life — ask once and let BUGOUT help you move forward.</p>
                    </div>
                    <div class="student-signal-card" aria-hidden="true">
                        <span class="signal-label">HELP SIGNAL</span>
                        <div class="signal-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        <strong>READY</strong>
                        <small>AI + COMMUNITY</small>
                    </div>
                </div>

                <div class="student-ask-shell">
                    <div class="student-ask-topline">
                        <span>ASK BUGOUT</span>
                        <kbd>CTRL + K</kbd>
                    </div>
                    <textarea id="studentHelpAskInput" rows="2" placeholder="Ask anything — explain a topic, solve a doubt, fix code, prepare for an exam..."></textarea>
                    <div class="student-ask-actions">
                        <div class="student-input-tools">
                            <button type="button" onclick="studentHelpUpload()" title="Upload notes or image">＋ Upload</button>
                            <button type="button" onclick="studentHelpCode()" title="Open coding help">&lt;/&gt; Code</button>
                            <button type="button" onclick="studentHelpVoice()" title="Use voice input">◉ Voice</button>
                        </div>
                        <button type="button" class="student-primary-ask" onclick="studentHelpAsk()">Ask BUGOUT <span>↗</span></button>
                    </div>
                </div>

                <div class="student-quick-grid" aria-label="Quick student help actions">
                    <button class="student-quick-card tutor" onclick="studentHelpTutor()">
                        <span class="student-card-index">01</span><b>AI Tutor</b><small>Understand anything, step by step.</small><em>Start learning ↗</em>
                    </button>
                    <button class="student-quick-card code" onclick="studentHelpCode()">
                        <span class="student-card-index">02</span><b>Coding Help</b><small>Debug, explain and practice code.</small><em>Open code lab ↗</em>
                    </button>
                    <button class="student-quick-card exam" onclick="studentHelpPreset('I have an exam coming up. Help me revise efficiently. Start by asking me the subject and syllabus.')">
                        <span class="student-card-index">03</span><b>Exam Prep</b><small>Revision, notes and quick quizzes.</small><em>Prepare now ↗</em>
                    </button>
                    <button class="student-quick-card assignment" onclick="studentHelpPreset('Help me with an assignment. Guide me to understand and complete it properly without blindly doing the work for me.')">
                        <span class="student-card-index">04</span><b>Assignment Help</b><small>Understand, plan and improve your work.</small><em>Get guidance ↗</em>
                    </button>
                    <button class="student-quick-card community" onclick="studentHelpCommunity()">
                        <span class="student-card-index">05</span><b>Community</b><small>Ask real students and help others.</small><em>See questions ↘</em>
                    </button>
                </div>
            </section>

            <section class="student-dashboard-grid">
                <article class="student-panel continue-panel">
                    <div class="student-panel-head"><span>CONTINUE</span><i>SYNCED</i></div>
                    <h2 id="studentContinueTitle">Your AI Tutor is ready.</h2>
                    <p id="studentContinueCopy">Continue your latest topic or start a fresh doubt without setting up a complicated learning system.</p>
                    <button onclick="studentHelpTutor()">Continue with AI Tutor <span>→</span></button>
                </article>
                <article class="student-panel activity-panel">
                    <div class="student-panel-head"><span>YOUR ACTIVITY</span><i>LIVE</i></div>
                    <div class="student-mini-stats">
                        <div><strong id="studentStatQuestions">—</strong><span>Questions</span></div>
                        <div><strong id="studentStatAnswers">—</strong><span>Answers</span></div>
                        <div><strong id="studentStatPoints">0</strong><span>Help Points</span></div>
                    </div>
                </article>
                <article class="student-panel tip-panel">
                    <div class="student-panel-head"><span>QUICK TIP</span><i>BUGOUT</i></div>
                    <p id="studentQuickTip">Upload your notes or a screenshot directly to AI Tutor when a topic is hard to explain in words.</p>
                    <button onclick="studentHelpUpload()">Upload study material</button>
                </article>
            </section>
        `;

        if (community) root.insertBefore(dashboard, community);
        else root.prepend(dashboard);

        this.refreshDashboardStats();
    }

    simplifyTutor() {
        const tutor = document.getElementById('teacherPage');
        if (!tutor) return;
        tutor.classList.add('student-tutor-page');

        const label = tutor.querySelector('#teacherEntryScreen .teacher-system-label');
        if (label) label.textContent = 'BUGOUT AI TUTOR';
        const title = tutor.querySelector('#teacherEntryScreen h2');
        if (title) title.textContent = 'What do you want help with?';
        const copy = tutor.querySelector('#teacherEntryScreen .teacher-entry-copy p');
        if (copy) copy.textContent = 'Ask a doubt, paste a topic, or upload study material. BUGOUT will explain it in the simplest useful way.';
        const input = document.getElementById('teacherStruggleInput');
        if (input) input.placeholder = 'Type a topic or question — e.g. recursion, differentiation, DBMS joins...';
        const start = document.getElementById('teacherStartBtn');
        if (start) start.textContent = 'Get help';

        const examples = document.querySelectorAll('#teacherExampleRow button');
        const presets = [
            ['Teach me from zero', 'Teach me this topic from zero, using simple language and examples.'],
            ['Explain simply', 'Explain this topic in very simple words with one clear example.'],
            ['Exam revision', 'Help me revise this topic for an exam with key points and likely questions.'],
            ['Quiz me', 'Quiz me on this topic one question at a time and explain my mistakes.'],
            ['Check my answer', 'I will give you my answer. Check it, explain mistakes, and show how to improve it.']
        ];
        examples.forEach((button, index) => {
            if (!presets[index]) return;
            button.textContent = presets[index][0];
            button.onclick = () => this.prefillTutor(presets[index][1]);
        });

        const diagnosticLabel = tutor.querySelector('#teacherDiagnosticScreen .teacher-system-label');
        if (diagnosticLabel) diagnosticLabel.textContent = 'QUICK CHECK';
        const diagnosticTitle = document.getElementById('teacherDiagnosticTitle');
        if (diagnosticTitle) diagnosticTitle.textContent = 'A few quick questions so I can explain it better';

        tutor.querySelectorAll('.teacher-agent-stack, .teacher-intelligence-rail').forEach(el => el.classList.add('student-complexity-hidden'));
        const boss = [...tutor.querySelectorAll('.teacher-session-actions button')].find(btn => /boss battle/i.test(btn.textContent || ''));
        if (boss) boss.style.display = 'none';
    }

    simplifyCoding() {
        const arena = document.getElementById('arenaPage');
        if (arena) {
            arena.classList.add('student-code-page');
            const kicker = arena.querySelector('.os-kicker');
            if (kicker) kicker.textContent = 'BUGOUT // CODING HELP';
            const title = arena.querySelector('.arena-head h2');
            if (title) title.textContent = 'Code Lab';
            const copy = arena.querySelector('.arena-head p');
            if (copy) copy.textContent = 'Debug code, understand errors, and practice with focused problems — without the noise.';
            const buttons = arena.querySelectorAll('.pillar-capability-strip button');
            if (buttons[0]) buttons[0].textContent = 'Debug / Analyze Code';
            if (buttons[1]) buttons[1].textContent = 'Ask AI Tutor';
            if (buttons[2]) buttons[2].style.display = 'none';
            const boardTitle = arena.querySelector('.arena-board h3');
            if (boardTitle) boardTitle.textContent = 'Practice Leaderboard';
        }

        const analyzer = document.getElementById('analyzerPage');
        if (analyzer) {
            analyzer.classList.add('student-code-page');
            const title = analyzer.querySelector('h2');
            if (title) title.textContent = 'Code Debugger';
            const copy = analyzer.querySelector('h2 + p');
            if (copy) copy.textContent = 'Paste your code. BUGOUT will find the problem, explain it clearly, and show you how to fix it.';
        }
    }

    simplifyCommunity() {
        const community = document.getElementById('communityExchange');
        if (!community) return;
        community.classList.add('student-community-exchange');
        const kicker = community.querySelector('.os-kicker');
        if (kicker) kicker.textContent = 'STUDENT COMMUNITY';
        const heading = community.querySelector('.community-head h2');
        if (heading) heading.textContent = 'Ask students. Share answers. Get unstuck together.';
        const copy = community.querySelector('.community-head p');
        if (copy) copy.textContent = 'Post a question when you want a human perspective, or help someone else with something you already understand.';
        const button = community.querySelector('.community-head .btn');
        if (button) button.textContent = 'Ask Community';

        const postPage = document.getElementById('postPage');
        const postTitle = postPage?.querySelector('h2');
        if (postTitle) postTitle.textContent = 'Ask the Community';
        const bugTitle = document.getElementById('bugTitle');
        if (bugTitle) bugTitle.placeholder = 'What do you need help with?';
        const bugDesc = document.getElementById('bugDesc');
        if (bugDesc) bugDesc.placeholder = 'Explain the problem clearly. Add context, what you tried, and where you got stuck...';
    }

    watchUserState() {
        const observer = new MutationObserver(() => this.refreshDashboardStats());
        ['userName', 'userXP', 'statBugs', 'statSolutions'].forEach(id => {
            const node = document.getElementById(id);
            if (node) observer.observe(node, { childList: true, subtree: true, characterData: true });
        });
        setTimeout(() => this.refreshDashboardStats(), 900);
        setTimeout(() => this.refreshDashboardStats(), 2200);
    }

    refreshDashboardStats() {
        const userName = (document.getElementById('userName')?.textContent || '').trim();
        const greeting = document.getElementById('studentGreeting');
        if (greeting) greeting.textContent = userName ? `HEY, ${userName.toUpperCase()}.` : 'HEY, STUDENT.';

        const bugCount = document.getElementById('statBugs')?.textContent || '—';
        const solutionCount = document.getElementById('statSolutions')?.textContent || '—';
        const xpText = document.getElementById('userXP')?.textContent || '0 XP';
        const xp = (xpText.match(/\d[\d,]*/) || ['0'])[0];
        this.setText('studentStatQuestions', bugCount);
        this.setText('studentStatAnswers', solutionCount);
        this.setText('studentStatPoints', xp);
    }

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', event => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                if (typeof window.goHome === 'function') window.goHome();
                setTimeout(() => document.getElementById('studentHelpAskInput')?.focus(), 80);
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && document.activeElement?.id === 'studentHelpAskInput') {
                window.studentHelpAsk();
            }
        });
    }

    openTutor() {
        if (typeof window.goTeacher === 'function') window.goTeacher();
    }

    prefillTutor(text) {
        this.openTutor();
        setTimeout(() => {
            const entry = document.getElementById('teacherStruggleInput');
            const doubt = document.getElementById('teacherDoubtInput');
            if (entry && !entry.closest('[hidden]')) {
                entry.value = text;
                entry.focus();
                entry.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (doubt) {
                doubt.value = text;
                doubt.focus();
                doubt.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }, 100);
    }

    openCommunity() {
        if (typeof window.goHome === 'function') window.goHome();
        setTimeout(() => {
            document.getElementById('communityExchange')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.studentHelpExperience = new StudentHelpExperience();
});

window.studentHelpAsk = () => {
    const input = document.getElementById('studentHelpAskInput');
    const text = (input?.value || '').trim();
    if (!text) {
        input?.focus();
        input?.classList.add('student-input-nudge');
        setTimeout(() => input?.classList.remove('student-input-nudge'), 450);
        return;
    }
    window.studentHelpExperience?.prefillTutor(text);
};

window.studentHelpTutor = () => window.studentHelpExperience?.openTutor();
window.studentHelpCommunity = () => window.studentHelpExperience?.openCommunity();
window.studentHelpPreset = text => window.studentHelpExperience?.prefillTutor(text);

window.studentHelpCode = () => {
    if (typeof window.goArena === 'function') window.goArena();
};

window.studentHelpUpload = () => {
    window.studentHelpExperience?.openTutor();
    setTimeout(() => {
        const picker = document.getElementById('teacherMaterialInput');
        if (picker) picker.click();
        else if (typeof window.openTeacherMaterialPicker === 'function') window.openTeacherMaterialPicker();
    }, 150);
};

window.studentHelpVoice = () => {
    window.studentHelpExperience?.openTutor();
    setTimeout(() => {
        if (typeof window.startTeacherVoiceInput === 'function') window.startTeacherVoiceInput();
        else document.getElementById('teacherDoubtInput')?.focus();
    }, 150);
};
