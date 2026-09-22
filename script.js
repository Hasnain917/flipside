/**
 * FLIPSIDE AMERICA INC — CLIENT INTERACTIONS & LOGIC
 * Mobile-First, Accessible, Performant Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
  initScrollTop();
  initRevealAnimations();
  initHeroVideo();
  initHlsVideoReviews();
  initEnhancedSmoothScrolling();
  initGoldLinesAnimation();
});

/**
 * 1. Sticky Header Background Transition on Scroll
 */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Hamburger Menu & Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('hamburgerToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  if (!drawer || !overlay) return;

  const openMenu = () => {
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  overlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 3. FAQ Accordion Interaction
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close all other accordions for clean single-view
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isCurrentlyActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 4. Contact Form Validation & Submission Handling
 */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const alertBox = document.getElementById('formAlert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = form.querySelector('#firstName')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const submitBtn = form.querySelector('#submitBtn');

    // Validation
    if (!firstName || !email || !phone || !message) {
      showAlert('error', 'Please provide your name, contact details, and a brief message so our advisory desk can respond.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('error', 'Please enter a valid executive email address.');
      return;
    }

    // Submit Simulation (Loading & Success)
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Securing Consultation...</span>
      `;
    }

    setTimeout(() => {
      showAlert('success', 'Thank you, ' + firstName + '. Your confidential inquiry has been routed to our Philadelphia partners. An executive advisor will connect with you shortly.');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.originalText;
      }
    }, 900);
  });

  function showAlert(type, message) {
    alertBox.className = `form-alert ${type}`;
    alertBox.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' 
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
      </svg>
      <span>${message}</span>
    `;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * 5. Smooth Scrolling for Navigation Links (Fallback if Lenis not loaded)
 */
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') return;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. Scroll To Top Button Visibility & Trigger
 */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (typeof Lenis === 'undefined') {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * 7. Comprehensive "Coming Effect" & Motions on Images and Text
 */
function initRevealAnimations() {
  if (!('IntersectionObserver' in window)) return;

  // Text elements to animate with coming effect
  const textElements = document.querySelectorAll(
    '.section-header, .faq-item, .contact-content, .contact-form-wrapper, .diff-card, .stat-item, .service-card, .review-card, .about-narrative-card'
  );

  // Image & Visual elements to animate with smooth coming effect
  const visualElements = document.querySelectorAll(
    '.gallery-item, .luxury-video-card, .hero-video-container, .about-photo-card'
  );

  textElements.forEach((el, index) => {
    el.classList.add('reveal-init');
    const delay = (index % 4) * 0.07;
    el.style.transitionDelay = `${delay}s`;
  });

  visualElements.forEach((el, index) => {
    el.classList.add('reveal-img-init');
    const delay = (index % 3) * 0.12;
    el.style.transitionDelay = `${delay}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-init, .reveal-img-init').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Lenis Luxury Smooth Scrolling Engine (Awwwards 60fps Butter-Smooth Standard)
 */
function initEnhancedSmoothScrolling() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor navigation integrated with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.25 });
        }
      });
    });

    // Scroll to top button integrated with Lenis
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1.3 });
      });
    }

    window.lenis = lenis;
  } else {
    // Fallback native smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

/**
 * 7b. Hero Section HLS Video Stream Initialization
 */
function initHeroVideo() {
  const heroVideo = document.getElementById('heroVideoMedia');
  if (!heroVideo) return;

  heroVideo.removeAttribute('poster');

  const hlsSrc = heroVideo.getAttribute('data-hls-src');
  if (!hlsSrc) return;

  // Handle seamless loop on stream completion
  heroVideo.addEventListener('ended', () => {
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});
  });

  if (window.Hls && Hls.isSupported()) {
    const hls = new Hls({
      autoStartLoad: true,
      startLevel: -1,
      capLevelToPlayerSize: true
    });
    hls.loadSource(hlsSrc);
    hls.attachMedia(heroVideo);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      heroVideo.play().catch(err => {
        console.warn('Hero video autoplay deferred:', err);
      });
    });
    heroVideo.hlsInstance = hls;
  } else if (heroVideo.canPlayType('application/vnd.apple.mpegurl')) {
    // Native Apple HLS (Safari on iOS / macOS)
    heroVideo.src = hlsSrc;
    heroVideo.addEventListener('loadedmetadata', () => {
      heroVideo.play().catch(err => {
        console.warn('Hero video autoplay deferred:', err);
      });
    });
  }
}

/**
 * 8. Ultra-Luxury HLS Video Reviews & Carousel Interaction
 */
function initHlsVideoReviews() {
  const videoCards = document.querySelectorAll('.luxury-video-card');
  const carousel = document.getElementById('videoCarousel');
  const prevBtn = document.getElementById('prevVideoBtn');
  const nextBtn = document.getElementById('nextVideoBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  // Theater Modal Elements
  const theaterModal = document.getElementById('theaterModal');
  const theaterCloseBtn = document.getElementById('theaterCloseBtn');
  const theaterVideo = document.getElementById('theaterVideoElement');
  const theaterTitle = document.getElementById('theaterModalTitle');
  const theaterRole = document.getElementById('theaterModalRole');
  const theaterQuote = document.getElementById('theaterModalQuote');

  let activePlayingCard = null;
  let theaterHls = null;

  if (!videoCards.length) return;

  // Initialize HLS for each card video
  videoCards.forEach((card, index) => {
    const video = card.querySelector('.review-video-element');
    const playTrigger = card.querySelector('.play-trigger-overlay');
    const soundToggle = card.querySelector('.sound-toggle-btn');
    const theaterBtn = card.querySelector('.theater-btn');
    const playSvg = card.querySelector('.play-svg');
    const pauseSvg = card.querySelector('.pause-svg');
    const soundOffSvg = card.querySelector('.sound-icon-off');
    const soundOnSvg = card.querySelector('.sound-icon-on');
    
    if (!video) return;

    const hlsSrc = video.getAttribute('data-hls-src');

    // Attach HLS stream
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true
      });
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      video.hlsInstance = hls;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS (Safari)
      video.src = hlsSrc;
    }

    // Toggle Play/Pause on trigger click
    const togglePlayPause = () => {
      if (video.paused) {
        // Pause any other playing video
        pauseAllVideos(card);

        video.play().then(() => {
          card.classList.add('is-playing');
          if (playSvg) playSvg.style.display = 'none';
          if (pauseSvg) pauseSvg.style.display = 'block';
          activePlayingCard = card;
        }).catch(err => {
          console.warn('Playback deferred:', err);
        });
      } else {
        video.pause();
        card.classList.remove('is-playing');
        if (playSvg) playSvg.style.display = 'block';
        if (pauseSvg) pauseSvg.style.display = 'none';
        if (activePlayingCard === card) activePlayingCard = null;
      }
    };

    if (playTrigger) {
      playTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
      });
    }

    // Clicking the video itself also toggles play/pause
    video.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlayPause();
    });

    // Sound Mute/Unmute Toggle
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          if (soundOffSvg) soundOffSvg.style.display = 'block';
          if (soundOnSvg) soundOnSvg.style.display = 'none';
        } else {
          if (soundOffSvg) soundOffSvg.style.display = 'none';
          if (soundOnSvg) soundOnSvg.style.display = 'block';
        }
      });
    }

    // Theater Mode Trigger
    if (theaterBtn && theaterModal && theaterVideo) {
      theaterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Pause card video
        video.pause();
        card.classList.remove('is-playing');
        if (playSvg) playSvg.style.display = 'block';
        if (pauseSvg) pauseSvg.style.display = 'none';

        // Open theater modal with this card's metadata
        const name = card.getAttribute('data-name') || 'Executive Client';
        const role = card.getAttribute('data-role') || 'Verified Principal';
        const quote = card.getAttribute('data-quote') || '';

        if (theaterTitle) theaterTitle.textContent = name;
        if (theaterRole) theaterRole.textContent = role;
        if (theaterQuote) theaterQuote.textContent = `"${quote}"`;

        // Load into theater player
        if (theaterHls) {
          theaterHls.destroy();
          theaterHls = null;
        }

        if (window.Hls && Hls.isSupported()) {
          theaterHls = new Hls();
          theaterHls.loadSource(hlsSrc);
          theaterHls.attachMedia(theaterVideo);
          theaterHls.on(Hls.Events.MANIFEST_PARSED, () => {
            theaterVideo.currentTime = video.currentTime;
            theaterVideo.play().catch(() => {});
          });
        } else if (theaterVideo.canPlayType('application/vnd.apple.mpegurl')) {
          theaterVideo.src = hlsSrc;
          theaterVideo.currentTime = video.currentTime;
          theaterVideo.play().catch(() => {});
        }

        theaterModal.classList.add('active');
        theaterModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    }

    // Reset icons when video ends
    video.addEventListener('ended', () => {
      card.classList.remove('is-playing');
      if (playSvg) playSvg.style.display = 'block';
      if (pauseSvg) pauseSvg.style.display = 'none';
    });
  });

  function pauseAllVideos(exceptCard = null) {
    videoCards.forEach(c => {
      if (c !== exceptCard) {
        const v = c.querySelector('.review-video-element');
        const playSvg = c.querySelector('.play-svg');
        const pauseSvg = c.querySelector('.pause-svg');
        if (v && !v.paused) {
          v.pause();
        }
        c.classList.remove('is-playing');
        if (playSvg) playSvg.style.display = 'block';
        if (pauseSvg) pauseSvg.style.display = 'none';
      }
    });
  }

  // Close Theater Modal
  const closeTheater = () => {
    if (!theaterModal) return;
    if (theaterVideo) {
      theaterVideo.pause();
      theaterVideo.src = '';
    }
    if (theaterHls) {
      theaterHls.destroy();
      theaterHls = null;
    }
    theaterModal.classList.remove('active');
    theaterModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (theaterCloseBtn) {
    theaterCloseBtn.addEventListener('click', closeTheater);
  }

  if (theaterModal) {
    theaterModal.addEventListener('click', (e) => {
      if (e.target === theaterModal) {
        closeTheater();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && theaterModal && theaterModal.classList.contains('active')) {
      closeTheater();
    }
  });

  // Carousel Navigation Buttons (Scroll by 1 Card)
  const getCardScrollStep = () => {
    const firstCard = videoCards[0];
    if (!firstCard) return 300;
    return firstCard.offsetWidth + 24; // width + gap
  };

  if (prevBtn && carousel) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -getCardScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn && carousel) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: getCardScrollStep(), behavior: 'smooth' });
    });
  }

  // Pagination Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    videoCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to testimonial video ${i + 1}`);
      dot.addEventListener('click', () => {
        const step = getCardScrollStep();
        carousel.scrollTo({ left: i * step, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    });

    // Update active dot on carousel scroll
    carousel.addEventListener('scroll', () => {
      const step = getCardScrollStep();
      const activeIndex = Math.round(carousel.scrollLeft / step);
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }, { passive: true });
  }
}

/**
 * 11. Luxury Animated Gold Lines Background System
 * Renders smooth flowing golden streamlines, architectural diagonal beams,
 * traveling light pulses, pulsing nodes, and drifting stardust.
 */
function initGoldLinesAnimation() {
  const canvas = document.getElementById('goldLinesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isTabActive = true;

  // Interaction coordinates
  const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, isHovered: false };
  let scrollY = window.scrollY || 0;
  let targetScrollY = scrollY;

  // Geometry holders
  let diagonalLines = [];
  let flowingWaves = [];
  let constellationNodes = [];
  let dustParticles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    initGeometry();
  }

  function initGeometry() {
    const isMobile = width < 768;

    // 1. Architectural Diagonal Lines (Luxury 34-degree gold laser beams)
    diagonalLines = [];
    const diagCount = isMobile ? 6 : 10;
    const spacing = width / (diagCount - 1);
    
    for (let i = 0; i < diagCount; i++) {
      const startX = -width * 0.25 + i * spacing * 1.35;
      const startY = -120;
      const angle = 34 * (Math.PI / 180);
      const length = Math.sqrt(width * width + height * height) * 1.25;
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      const pulses = [];
      const pulseCount = isMobile ? 1 : (i % 2 === 0 ? 2 : 1);
      for (let p = 0; p < pulseCount; p++) {
        pulses.push({
          progress: Math.random(),
          speed: (0.0007 + Math.random() * 0.001) * (isMobile ? 1.15 : 1),
          length: isMobile ? 70 + Math.random() * 60 : 100 + Math.random() * 120,
          size: 2.2 + Math.random() * 1.3,
          color: Math.random() > 0.4 ? '#dfc288' : '#fff3db'
        });
      }

      diagonalLines.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        length,
        baseAlpha: isMobile ? 0.22 : 0.26,
        lineWidth: isMobile ? 1 : 1.1,
        pulses
      });
    }

    // 2-3 counter-diagonal accent lines for intersection dynamics
    const counterCount = isMobile ? 2 : 3;
    for (let j = 0; j < counterCount; j++) {
      const startX = width * 1.2 - j * (width / counterCount);
      const startY = -80;
      const angle = 146 * (Math.PI / 180);
      const length = Math.sqrt(width * width + height * height) * 1.1;
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      const pulses = [{
        progress: Math.random(),
        speed: 0.0008 + Math.random() * 0.0008,
        length: 70 + Math.random() * 80,
        size: 2,
        color: '#f5e6c8'
      }];

      diagonalLines.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        length,
        baseAlpha: 0.16,
        lineWidth: 0.9,
        pulses
      });
    }

    // 2. Flowing Golden Wave Beziers (Harmonic silk curves across background)
    flowingWaves = [];
    const waveCount = isMobile ? 3 : 4;
    const waveYRatio = isMobile ? [0.22, 0.52, 0.82] : [0.18, 0.42, 0.68, 0.90];

    for (let w = 0; w < waveCount; w++) {
      const amp = (isMobile ? 30 : 60) + Math.random() * 20;
      const freq = (0.0012 + Math.random() * 0.0008) * (isMobile ? 1.4 : 1);
      const speed = 0.0006 + Math.random() * 0.0006;
      const phase = Math.random() * Math.PI * 2;

      const wavePulses = [];
      const wavePulseCount = isMobile ? 1 : 2;
      for (let wp = 0; wp < wavePulseCount; wp++) {
        wavePulses.push({
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.001,
          radius: 2.8,
          trailLen: isMobile ? 45 : 65
        });
      }

      flowingWaves.push({
        baseYRatio: waveYRatio[w],
        amplitude: amp,
        frequency: freq,
        speed,
        phase,
        lineWidth: isMobile ? 1.2 : 1.4,
        alpha: isMobile ? 0.38 : 0.36,
        pulses: wavePulses
      });
    }

    // 3. Constellation Intersection Nodes (Breathing gold stars)
    constellationNodes = [];
    const nodeCount = isMobile ? 12 : 20;
    for (let n = 0; n < nodeCount; n++) {
      constellationNodes.push({
        xRatio: 0.05 + Math.random() * 0.9,
        yRatio: 0.08 + Math.random() * 0.84,
        baseR: 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 1.6 + Math.random() * 1.4
      });
    }

    // 4. Drifting Golden Dust Sparkles
    dustParticles = [];
    const dustCount = isMobile ? 18 : 32;
    for (let d = 0; d < dustCount; d++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35,
        radius: 0.8 + Math.random() * 1.3,
        alpha: 0.25 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Pointer & Scroll Event Handlers
  const handlePointerMove = (clientX, clientY) => {
    mouse.targetX = clientX;
    mouse.targetY = clientY;
    mouse.isHovered = true;
  };

  window.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY || 0;
  }, { passive: true });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (isTabActive && !animationFrameId) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Render Engine
  let lastTime = performance.now();
  let totalTime = 0;

  function render(now) {
    if (!isTabActive) {
      animationFrameId = null;
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    totalTime += dt;

    if (mouse.isHovered) {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
    } else {
      mouse.x += (-1000 - mouse.x) * 0.05;
      mouse.y += (-1000 - mouse.y) * 0.05;
    }
    scrollY += (targetScrollY - scrollY) * 0.08;

    ctx.clearRect(0, 0, width, height);

    const parallaxY = (scrollY * 0.12) % height;

    // --- 1. ARCHITECTURAL DIAGONAL LINES & TRAVELING LIGHT PACKETS ---
    for (let i = 0; i < diagonalLines.length; i++) {
      const line = diagonalLines[i];
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;

      // Base line gradient stroke
      const grad = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
      grad.addColorStop(0, 'rgba(223, 194, 136, 0.02)');
      grad.addColorStop(0.2, `rgba(223, 194, 136, ${line.baseAlpha})`);
      grad.addColorStop(0.7, `rgba(245, 230, 200, ${line.baseAlpha * 1.25})`);
      grad.addColorStop(1, 'rgba(182, 143, 68, 0.02)');

      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = line.lineWidth;
      ctx.stroke();

      // Traveling light pulses
      for (let p = 0; p < line.pulses.length; p++) {
        const pulse = line.pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
        }

        const curX = line.x1 + dx * pulse.progress;
        const curY = line.y1 + dy * pulse.progress;

        const tailProgress = Math.max(0, pulse.progress - (pulse.length / line.length));
        const tailX = line.x1 + dx * tailProgress;
        const tailY = line.y1 + dy * tailProgress;

        const pulseGrad = ctx.createLinearGradient(tailX, tailY, curX, curY);
        pulseGrad.addColorStop(0, 'rgba(223, 194, 136, 0)');
        pulseGrad.addColorStop(0.65, 'rgba(223, 194, 136, 0.65)');
        pulseGrad.addColorStop(1, pulse.color);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = line.lineWidth + 1.2;
        ctx.shadowColor = 'rgba(223, 194, 136, 0.88)';
        ctx.shadowBlur = 9;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(curX, curY, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#dfc288';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }

    // --- 2. FLOWING GOLDEN WAVES ---
    for (let w = 0; w < flowingWaves.length; w++) {
      const wave = flowingWaves[w];
      const baseY = wave.baseYRatio * height + Math.sin(totalTime * 0.4 + w) * 15;

      ctx.save();
      ctx.beginPath();

      const step = 8;
      const points = [];

      for (let x = 0; x <= width + step; x += step) {
        let y = baseY + 
          Math.sin(x * wave.frequency + totalTime * wave.speed * 60 + wave.phase) * wave.amplitude +
          Math.cos(x * (wave.frequency * 1.8) - totalTime * (wave.speed * 40)) * (wave.amplitude * 0.35);

        if (mouse.isHovered) {
          const distX = x - mouse.x;
          const distY = y - mouse.y;
          const dist = Math.sqrt(distX * distX + distY * distY);
          if (dist < 140) {
            const factor = (1 - dist / 140) * 20;
            y += (distY > 0 ? factor : -factor);
          }
        }

        points.push({ x, y });
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const waveGrad = ctx.createLinearGradient(0, 0, width, 0);
      waveGrad.addColorStop(0, 'rgba(223, 194, 136, 0.04)');
      waveGrad.addColorStop(0.3, `rgba(245, 230, 200, ${wave.alpha})`);
      waveGrad.addColorStop(0.7, `rgba(223, 194, 136, ${wave.alpha * 1.3})`);
      waveGrad.addColorStop(1, 'rgba(182, 143, 68, 0.04)');

      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = wave.lineWidth;
      ctx.stroke();

      for (let wp = 0; wp < wave.pulses.length; wp++) {
        const pulse = wave.pulses[wp];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
        }

        const pointIndex = Math.floor(pulse.progress * (points.length - 1));
        const pt = points[pointIndex];
        if (pt) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pulse.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#fff4db';
          ctx.shadowColor = 'rgba(223, 194, 136, 0.95)';
          ctx.shadowBlur = 10;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pulse.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(223, 194, 136, 0.22)';
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // --- 3. CONSTELLATION INTERSECTION NODES ---
    for (let n = 0; n < constellationNodes.length; n++) {
      const node = constellationNodes[n];
      const nx = node.xRatio * width;
      const ny = (node.yRatio * height + parallaxY) % height;
      const pulseVal = Math.sin(totalTime * node.speed + node.phase);
      const r = Math.max(0.5, node.baseR + pulseVal * 1.0);
      const glowAlpha = 0.45 + pulseVal * 0.35;

      ctx.save();
      ctx.beginPath();
      ctx.arc(nx, ny, r * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(223, 194, 136, ${glowAlpha * 0.28})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nx, ny, r, 0, Math.PI * 2);
      ctx.fillStyle = pulseVal > 0.25 ? '#fff5e0' : '#dfc288';
      ctx.shadowColor = 'rgba(245, 230, 200, 0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    // --- 4. DRIFTING GOLD STARDUST ---
    ctx.save();
    for (let d = 0; d < dustParticles.length; d++) {
      const p = dustParticles[d];
      p.x += p.vx + Math.sin(totalTime * 0.8 + p.phase) * 0.15;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const shimmer = 0.5 + Math.sin(totalTime * 2 + p.phase) * 0.5;
      const currentAlpha = p.alpha * (0.4 + shimmer * 0.6);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 230, 200, ${currentAlpha})`;
      ctx.fill();
    }
    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  resize();
  animationFrameId = requestAnimationFrame(render);
}


