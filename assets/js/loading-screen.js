// BUGOUT cyber-glitch loading screen
class LoadingScreen {
    constructor() {
        this.isLoading = false;
        this.startTime = Date.now();
        this.minLoadTime = this.getLoadDuration();
        this.init();
    }

    getLoadDuration() {
        try {
            const seen = sessionStorage.getItem('bugout_seen_loader');
            sessionStorage.setItem('bugout_seen_loader', '1');
            return seen ? 1450 : 2600;
        } catch (_) {
            return 2200;
        }
    }

    init() {
        this.createLoadingScreen();
        this.startAnimations();
        this.scheduleHide();
    }

    createLoadingScreen() {
        const old = document.getElementById('loadingScreen');
        if (old) old.remove();

        const screen = document.createElement('div');
        screen.className = 'loading-screen cyber-loader';
        screen.id = 'loadingScreen';
        screen.innerHTML = `
            <div class="cyber-loader-bg" aria-hidden="true"></div>
            <div class="cyber-grid" aria-hidden="true"></div>
            <div class="cyber-noise" aria-hidden="true"></div>
            <div class="cyber-scanline" aria-hidden="true"></div>
            <div class="cyber-slices" id="cyberSlices" aria-hidden="true"></div>

            <main class="cyber-loader-core" aria-label="BUGOUT loading">
                <div class="cyber-status-row">
                    <span>STUDENT HELP NETWORK</span>
                    <span class="cyber-online"><i></i> LINK ACTIVE</span>
                </div>

                <div class="bugout-script-wrap">
                    <div class="bugout-script" data-text="BUGOUT">BUGOUT</div>
                    <div class="bugout-script-shadow" aria-hidden="true">BUGOUT</div>
                </div>

                <div class="cyber-loader-tagline">GET UNSTUCK. LEARN BETTER.</div>

                <div class="cyber-boot" aria-live="polite">
                    <span id="cyberBootLine">INITIALIZING STUDENT HELP...</span>
                </div>

                <div class="cyber-progress" aria-hidden="true">
                    <span id="progressBar"></span>
                </div>
            </main>

            <div class="cyber-corner cyber-corner-a">BG//01</div>
            <div class="cyber-corner cyber-corner-b">MIND FORGERS</div>
        `;

        document.body.appendChild(screen);
        this.isLoading = true;
        this.screen = screen;
        this.createSlices();
    }

    createSlices() {
        const host = document.getElementById('cyberSlices');
        if (!host) return;
        for (let i = 0; i < 12; i++) {
            const slice = document.createElement('span');
            slice.style.top = `${Math.random() * 100}%`;
            slice.style.width = `${10 + Math.random() * 55}%`;
            slice.style.left = `${Math.random() * 75}%`;
            slice.style.animationDelay = `${Math.random() * 1.2}s`;
            host.appendChild(slice);
        }
    }

    startAnimations() {
        const bootLines = [
            'INITIALIZING STUDENT HELP...',
            'AI TUTOR // ONLINE',
            'CODE HELPER // READY',
            'COMMUNITY LINK // READY',
            'BUGOUT // READY'
        ];
        let index = 0;
        const boot = document.getElementById('cyberBootLine');
        this.bootInterval = setInterval(() => {
            index = Math.min(index + 1, bootLines.length - 1);
            if (boot) {
                boot.classList.remove('swap');
                void boot.offsetWidth;
                boot.textContent = bootLines[index];
                boot.classList.add('swap');
            }
        }, 430);

        this.glitchInterval = setInterval(() => {
            if (!this.screen) return;
            this.screen.classList.add('hard-glitch');
            setTimeout(() => this.screen?.classList.remove('hard-glitch'), 110);
        }, 720);
    }

    scheduleHide() {
        const elapsed = Date.now() - this.startTime;
        setTimeout(() => this.hide(), Math.max(0, this.minLoadTime - elapsed));
    }

    hide() {
        const screen = document.getElementById('loadingScreen');
        if (!screen || !this.isLoading) return;
        clearInterval(this.bootInterval);
        clearInterval(this.glitchInterval);
        screen.classList.add('hide');
        setTimeout(() => {
            screen.remove();
            this.isLoading = false;
        }, 620);
    }

    show() {
        if (this.isLoading) return;
        this.startTime = Date.now();
        this.minLoadTime = 1350;
        this.init();
    }

    forceHide() {
        this.minLoadTime = 0;
        this.hide();
    }
}

let loadingScreen;
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen = new LoadingScreen();
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && loadingScreen?.isLoading) loadingScreen.forceHide();
    });
});

window.showLoadingScreen = () => loadingScreen?.show();
window.hideLoadingScreen = () => loadingScreen?.forceHide();
