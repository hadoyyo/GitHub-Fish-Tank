(function() {
  'use strict';

  function init() {
    if (typeof window.FISH_SHAPES === 'undefined') {
      setTimeout(init, 50);
      return;
    }

    const container = document.createElement('div');
    container.id = 'bg-fish-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.prepend(container);

    const allShapeKeys = Object.keys(window.FISH_SHAPES);
    
    const PALETTE = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', 
      '#E67E22', '#2ECC71', '#F1C40F', '#E74C3C',
      '#1ABC9C', '#E056FD', '#686DE0', '#30336B',
      '#00B894', '#0984E3', '#FD79A8', '#6C5CE7'
    ];

    function getColorForShape(shapeKey) {
      if (window.LANGUAGE_SHAPES && window.LANGUAGE_COLORS) {
        for (const [lang, s] of Object.entries(window.LANGUAGE_SHAPES)) {
          if (s === shapeKey && window.LANGUAGE_COLORS[lang]) {
            return window.LANGUAGE_COLORS[lang];
          }
        }
      }
      return PALETTE[Math.floor(Math.random() * PALETTE.length)];
    }

    let shapeQueue = [];
    function getNextShape() {
      if (shapeQueue.length === 0) {
        shapeQueue = [...allShapeKeys].sort(() => Math.random() - 0.5);
      }
      return shapeQueue.pop();
    }

    function getDesiredFishCount() {
      const w = window.innerWidth;
      if (w > 1400) return 22;
      if (w > 1000) return 17;
      if (w > 600)  return 13;
      return 9;
    }

    const fishList = [];

    class BackgroundFish {
      constructor(initialSpawn = false) {
        this.el = document.createElement('div');
        this.el.className = 'bg-fish';
        container.appendChild(this.el);

        this.reset(initialSpawn);
      }

      reset(initialSpawn = false) {
        this.shapeName = getNextShape();
        this.color = getColorForShape(this.shapeName);

        this.direction = Math.random() > 0.48 ? 1 : -1;

        const isMobile = (window.innerWidth || 1200) <= 768;

        const depthTier = Math.random();
        if (depthTier < 0.35) {
          this.baseScale = (0.55 + Math.random() * 0.2) * (isMobile ? 1.15 : 1.0);
          this.opacity = isMobile ? (0.60 + Math.random() * 0.12) : (0.55 + Math.random() * 0.12);
          this.speed = (0.90 + Math.random() * 0.45) * 60; // px/sec
        } else if (depthTier < 0.75) {
          this.baseScale = (0.80 + Math.random() * 0.25) * (isMobile ? 1.15 : 1.0);
          this.opacity = isMobile ? (0.78 + Math.random() * 0.12) : (0.74 + Math.random() * 0.12);
          this.speed = (1.20 + Math.random() * 0.55) * 60;
        } else {
          this.baseScale = (1.10 + Math.random() * 0.30) * (isMobile ? 1.18 : 1.0);
          this.opacity = isMobile ? 0.96 : (0.90 + Math.random() * 0.08);
          this.speed = (1.55 + Math.random() * 0.70) * 60;
        }

        const winW = window.innerWidth || 1200;
        const winH = window.innerHeight || 800;

        const margin = 140;
        if (initialSpawn) {
          this.x = Math.random() * (winW + margin * 2) - margin;
        } else {
          this.x = this.direction === 1 ? -margin : winW + margin;
        }

        this.baseY = Math.random() * (winH - 120) + 60;

        this.waveAmp = 20 + Math.random() * 22; // 20px - 42px (clear, expressive vertical motion)
        this.waveFreq = 0.0007 + Math.random() * 0.00035; // 0.0007 - 0.00105 rad/ms
        this.wavePhase = Math.random() * Math.PI * 2;

        // Generate SVG markup
        const svgContent = window.getFishShape(this.shapeName, this.color);
        this.el.innerHTML = `
          <svg viewBox="-50 -35 100 70" width="70" height="49" style="overflow: visible;">
            <g class="fish-flutter">
              ${svgContent}
            </g>
          </svg>
        `;

        this.el.style.opacity = this.opacity.toFixed(2);
      }

      update(dt, now) {
        this.x += this.speed * this.direction * dt;

        const waveAngle = now * this.waveFreq + this.wavePhase;
        const yOffset = Math.sin(waveAngle) * this.waveAmp;
        const currentY = this.baseY + yOffset;

        const vy = Math.cos(waveAngle) * this.waveAmp * this.waveFreq * 1000;
        const tilt = Math.atan2(vy, this.speed) * (180 / Math.PI);

        const sx = this.direction * this.baseScale;
        const sy = this.baseScale;

        this.el.style.transform = `translate3d(${this.x.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) scale(${sx.toFixed(3)}, ${sy.toFixed(3)}) rotate(${tilt.toFixed(1)}deg)`;

        const winW = window.innerWidth || 1200;
        const margin = 150;
        if (this.direction === 1 && this.x > winW + margin) {
          this.reset(false);
        } else if (this.direction === -1 && this.x < -margin) {
          this.reset(false);
        }
      }

      destroy() {
        if (this.el && this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
      }
    }

    function adjustFishCount() {
      const desired = getDesiredFishCount();
      while (fishList.length < desired) {
        fishList.push(new BackgroundFish(true));
      }
      while (fishList.length > desired) {
        const fish = fishList.pop();
        if (fish) fish.destroy();
      }
    }

    adjustFishCount();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjustFishCount, 200);
    });

    let lastTime = performance.now();
    let isTabActive = true;

    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
      }
    });

    function loop(currentTime) {
      if (isTabActive) {
        const dt = Math.min((currentTime - lastTime) / 1000, 0.1); // cap max dt
        for (let i = 0; i < fishList.length; i++) {
          fishList[i].update(dt, currentTime);
        }
      }
      lastTime = currentTime;
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
