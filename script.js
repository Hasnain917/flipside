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
 * 11. Minimal Luxury Background System
 * Clean, subtle architectural vertical lines across the background
 * with soft golden particles gliding smoothly from top to bottom.
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

  // Mouse tracking for subtle proximity response
  const mouse = { x: -1000, y: -1000, active: false };

  // Data structures
  let lines = [];
  let particles = [];

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

    initSystem();
  }

  function initSystem() {
    const isMobile = width < 768;
    lines = [];
    particles = [];

    // 1. Vertical architectural lines evenly spaced
    const desiredSpacing = isMobile ? 65 : 120;
    const count = Math.max(3, Math.floor(width / desiredSpacing));
    const step = width / count;

    for (let i = 0; i <= count; i++) {
      lines.push({
        x: Math.round(i * step),
        baseAlpha: isMobile ? 0.04 : 0.05
      });
    }

    // 2. Soft particles traveling down the lines
    // Restrained count for a calm, ultra-luxurious feel
    const particleCount = isMobile
      ? Math.floor(lines.length * 1.2)
      : Math.floor(lines.length * 1.8);

    for (let p = 0; p < particleCount; p++) {
      const lineIdx = Math.floor(Math.random() * lines.length);
      particles.push({
        lineIdx,
        x: lines[lineIdx].x,
        y: Math.random() * height,
        vy: 0.35 + Math.random() * 0.65, // Gentle downward speed
        radius: 1.0 + Math.random() * 1.2, // Tiny delicate beads
        trailLen: 18 + Math.random() * 24, // Subtle light trail
        alpha: 0.35 + Math.random() * 0.35, // Soft opacity
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.5 + Math.random() * 1.5
      });
    }
  }

  // Pointer events for soft proximity interaction
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
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

  // Render Loop
  let lastTime = performance.now();
  let elapsed = 0;

  function render(now) {
    if (!isTabActive) {
      animationFrameId = null;
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    elapsed += dt;

    ctx.clearRect(0, 0, width, height);

    // --- 1. RENDER FAINT VERTICAL LINES ---
    // Pre-create vertical fade gradient
    const lineGrad = ctx.createLinearGradient(0, 0, 0, height);
    lineGrad.addColorStop(0, 'rgba(223, 194, 136, 0.00)');
    lineGrad.addColorStop(0.12, 'rgba(223, 194, 136, 0.045)');
    lineGrad.addColorStop(0.5, 'rgba(223, 194, 136, 0.055)');
    lineGrad.addColorStop(0.88, 'rgba(223, 194, 136, 0.045)');
    lineGrad.addColorStop(1, 'rgba(223, 194, 136, 0.00)');

    ctx.lineWidth = 1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Subtle mouse glow near vertical line
      let extraAlpha = 0;
      if (mouse.active) {
        const dist = Math.abs(mouse.x - line.x);
        if (dist < 80) {
          extraAlpha = (1 - dist / 80) * 0.04;
        }
      }

      ctx.beginPath();
      ctx.moveTo(line.x + 0.5, 0);
      ctx.lineTo(line.x + 0.5, height);

      if (extraAlpha > 0) {
        ctx.strokeStyle = `rgba(223, 194, 136, ${0.05 + extraAlpha})`;
      } else {
        ctx.strokeStyle = lineGrad;
      }
      ctx.stroke();
    }

    // --- 2. RENDER SOFT PARTICLES MOVING TOP TO BOTTOM ---
    for (let p = 0; p < particles.length; p++) {
      const pt = particles[p];

      // Move particle straight down
      pt.y += pt.vy * (dt * 60);

      // Keep aligned to line if window resized
      if (lines[pt.lineIdx]) {
        pt.x = lines[pt.lineIdx].x + 0.5;
      }

      // Edge fading (soft entry at top, soft fadeout at bottom)
      let edgeFade = 1;
      const topFadeDist = height * 0.12;
      const botFadeDist = height * 0.12;

      if (pt.y < topFadeDist) {
        edgeFade = Math.max(0, pt.y / topFadeDist);
      } else if (pt.y > height - botFadeDist) {
        edgeFade = Math.max(0, (height - pt.y) / botFadeDist);
      }

      // Subtle breathing pulse
      const pulse = 0.85 + Math.sin(elapsed * pt.pulseSpeed + pt.pulsePhase) * 0.15;

      // Mouse proximity brightness
      let mouseBoost = 1;
      if (mouse.active) {
        const dx = pt.x - mouse.x;
        const dy = pt.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          mouseBoost = 1 + (1 - dist / 100) * 0.6;
        }
      }

      const currentAlpha = Math.min(1, pt.alpha * edgeFade * pulse * mouseBoost);

      if (currentAlpha > 0.01) {
        // Subtle tail gliding above particle
        const tailY = pt.y - pt.trailLen;
        const trailGrad = ctx.createLinearGradient(pt.x, tailY, pt.x, pt.y);
        trailGrad.addColorStop(0, 'rgba(223, 194, 136, 0)');
        trailGrad.addColorStop(1, `rgba(223, 194, 136, ${currentAlpha * 0.45})`);

        ctx.beginPath();
        ctx.moveTo(pt.x, tailY);
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Soft outer aura
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 194, 136, ${currentAlpha * 0.22})`;
        ctx.fill();

        // Bright delicate center bead
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 224, ${currentAlpha})`;
        ctx.fill();
      }

      // Reset when reaching bottom
      if (pt.y > height + 20) {
        pt.y = -10 - Math.random() * 60;
        pt.lineIdx = Math.floor(Math.random() * lines.length);
        if (lines[pt.lineIdx]) {
          pt.x = lines[pt.lineIdx].x + 0.5;
        }
        pt.vy = 0.35 + Math.random() * 0.65;
        pt.radius = 1.0 + Math.random() * 1.2;
        pt.alpha = 0.35 + Math.random() * 0.35;
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  resize();
  animationFrameId = requestAnimationFrame(render);
}



