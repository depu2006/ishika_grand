/* ==========================================
   Ishika Grand - Interactive JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  function createFallbackImage(label = 'Image unavailable') {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#1f1b15" offset="0%" />
            <stop stop-color="#0c0b09" offset="100%" />
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
            <stop stop-color="#cda45e" offset="0%" />
            <stop stop-color="#ffe59c" offset="100%" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#bg)" />
        <rect x="80" y="80" width="1040" height="640" rx="28" fill="#14120e" stroke="rgba(205,164,94,0.25)" />
        <circle cx="600" cy="310" r="90" fill="url(#accent)" opacity="0.08" />
        <path d="M520 300h160M600 220v160" stroke="url(#accent)" stroke-width="16" stroke-linecap="round" opacity="0.65" />
        <rect x="345" y="455" width="510" height="26" rx="13" fill="#2a241b" />
        <rect x="420" y="500" width="360" height="18" rx="9" fill="#2a241b" />
        <text x="600" y="585" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="700" fill="#f4efe6">${label}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function attachFallbackImages() {
    document.querySelectorAll('img').forEach(img => {
      const label = img.getAttribute('data-fallback-label') || img.alt || 'Image unavailable';
      img.addEventListener('error', () => {
        if (!img.dataset.fallbackApplied) {
          img.dataset.fallbackApplied = 'true';
          img.src = createFallbackImage(label);
          img.classList.add('img-fallback');
        }
      });
    });
  }

  attachFallbackImages();

  /* ------------------------------------------
     1. Header scroll effect & Progress Bar
  ------------------------------------------ */
  const header = document.querySelector('.header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
    
    if (progressBar) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percentage = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = percentage + '%';
      }
    }
  });

  /* ------------------------------------------
     2. Active nav link on scroll
  ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ------------------------------------------
     3. Mobile drawer
  ------------------------------------------ */
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.close-drawer-btn');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ------------------------------------------
     4. Booking Modal
  ------------------------------------------ */
  const bookingModal = document.getElementById('booking-modal');
  const enquiryModal = document.getElementById('enquiry-modal');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (modal === bookingModal) {
        resetBookingWizard();
      }
    }
  }

  document.querySelectorAll('.open-booking-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const room = btn.dataset.room || 'deluxe';
      const roomSelect = document.getElementById('book-room');
      if (roomSelect) {
        const opt = roomSelect.querySelector(`option[value="${room}"]`);
        if (opt) opt.selected = true;
        updatePriceCalc();
      }
      openModal(bookingModal);
    });
  });

  document.querySelectorAll('.open-enquiry-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(enquiryModal));
  });

  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(bookingModal);
      closeModal(enquiryModal);
    });
  });

  [bookingModal, enquiryModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  /* ------------------------------------------
     5. Live price calculator in booking modal
  ------------------------------------------ */
  const roomPrices = { deluxe: 2499, executive: 3999, family: 5499 };
  const roomNames = { deluxe: 'Deluxe Room', executive: 'Executive Suite', family: 'Grand Family Suite' };

  function updatePriceCalc() {
    const roomSel = document.getElementById('book-room');
    const checkinEl = document.getElementById('book-checkin');
    const checkoutEl = document.getElementById('book-checkout');
    if (!roomSel || !checkinEl || !checkoutEl) return;

    const room = roomSel.value;
    const price = roomPrices[room] || 2499;
    const checkin = checkinEl.value ? new Date(checkinEl.value) : null;
    const checkout = checkoutEl.value ? new Date(checkoutEl.value) : null;
    let nights = 1;

    if (checkin && checkout && checkout > checkin) {
      nights = Math.round((checkout - checkin) / (1000 * 60 * 60 * 24));
    }

    const base = price * nights;
    const tax = Math.round(base * 0.12);
    const total = base + tax;

    const fmt = n => '₹' + n.toLocaleString('en-IN');
    const nameEl = document.getElementById('calc-room-name');
    const daysEl = document.getElementById('calc-days');
    const baseEl = document.getElementById('calc-base-price');
    const taxEl = document.getElementById('calc-tax-price');
    const totEl = document.getElementById('calc-total-price');

    if (nameEl) nameEl.textContent = roomNames[room] || 'Deluxe Room';
    if (daysEl) daysEl.textContent = nights;
    if (baseEl) baseEl.textContent = fmt(base);
    if (taxEl) taxEl.textContent = fmt(tax);
    if (totEl) totEl.textContent = fmt(total);
  }

  ['book-room', 'book-checkin', 'book-checkout'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updatePriceCalc);
  });
  updatePriceCalc();

  /* ------------------------------------------
     6. Set minimum date for date inputs to today
  ------------------------------------------ */
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(inp => {
    inp.setAttribute('min', today);
  });

  /* ------------------------------------------
     7. Hero quick-book form
  ------------------------------------------ */
  const heroForm = document.getElementById('hero-quick-book-form');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      const checkin = document.getElementById('quick-check-in').value;
      const checkout = document.getElementById('quick-check-out').value;
      if (checkin && checkout) {
        const bookCheckin = document.getElementById('book-checkin');
        const bookCheckout = document.getElementById('book-checkout');
        if (bookCheckin) { bookCheckin.value = checkin; }
        if (bookCheckout) { bookCheckout.value = checkout; }
        updatePriceCalc();
      }
      openModal(bookingModal);
    });
  }

  /* ------------------------------------------
     8. Booking form submit
  ------------------------------------------ */
  /* ------------------------------------------
     8. Booking Form Submit & Payment Wizard
  ------------------------------------------ */
  let upiTimerInterval = null;
  let bookingData = {};

  function startUpiTimer() {
    let timeLeft = 300; // 5 minutes in seconds
    const timerSlot = document.getElementById('upi-timer');
    if (!timerSlot) return;

    if (upiTimerInterval) clearInterval(upiTimerInterval);

    upiTimerInterval = setInterval(() => {
      timeLeft--;
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      timerSlot.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      if (timeLeft <= 0) {
        clearInterval(upiTimerInterval);
        timerSlot.textContent = "Expired";
        showToast("Payment Expired", "The UPI session expired. Please restart your booking.");
        closeModal(bookingModal);
      }
    }, 1000);
  }

  window.resetBookingWizard = function() {
    const loader = document.getElementById('booking-loading');
    if (loader) loader.classList.remove('active');

    // Reset panes
    const s1 = document.getElementById('booking-step-1');
    const s2 = document.getElementById('booking-step-2');
    const s3 = document.getElementById('booking-step-3');
    if (s1) s1.classList.add('active');
    if (s2) s2.classList.remove('active');
    if (s3) s3.classList.remove('active');

    // Reset indicators
    const d1 = document.getElementById('dot-step-1');
    const d2 = document.getElementById('dot-step-2');
    const d3 = document.getElementById('dot-step-3');
    const l1 = document.getElementById('line-step-1');
    const l2 = document.getElementById('line-step-2');
    if (d1) d1.classList.add('active');
    if (d2) d2.classList.remove('active');
    if (d3) d3.classList.remove('active');
    if (l1) l1.classList.remove('active');
    if (l2) l2.classList.remove('active');

    if (upiTimerInterval) {
      clearInterval(upiTimerInterval);
      upiTimerInterval = null;
    }

    const f1 = document.getElementById('modal-booking-form');
    const f2 = document.getElementById('upi-payment-form');
    const f3 = document.getElementById('card-payment-form');
    if (f1) f1.reset();
    if (f2) f2.reset();
    if (f3) f3.reset();

    const brandSlot = document.getElementById('card-brand-icon-slot');
    if (brandSlot) brandSlot.innerHTML = '<i class="fa-regular fa-credit-card"></i>';

    updatePriceCalc();
  };

  // Handle Step 1 form submission
  const modalBookingForm = document.getElementById('modal-booking-form');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Store details
      const adultsVal = document.getElementById('book-adults').value;
      const childrenVal = document.getElementById('book-children').value;
      bookingData = {
        name: document.getElementById('book-name').value,
        phone: document.getElementById('book-phone').value,
        email: document.getElementById('book-email').value,
        checkin: document.getElementById('book-checkin').value,
        checkout: document.getElementById('book-checkout').value,
        guests: `${adultsVal} Adult${adultsVal !== '1' ? 's' : ''}, ${childrenVal} Child${childrenVal !== '1' ? 'ren' : ''}`,
        roomVal: document.getElementById('book-room').value,
        totalText: document.getElementById('calc-total-price').textContent
      };

      // Set values on Step 2 & 3
      document.querySelectorAll('.payment-total-amount').forEach(el => {
        el.textContent = bookingData.totalText;
      });

      // Switch to Step 2
      document.getElementById('booking-step-1').classList.remove('active');
      document.getElementById('booking-step-2').classList.add('active');

      // Update indicators
      document.getElementById('dot-step-2').classList.add('active');
      document.getElementById('line-step-1').classList.add('active');

      // Start timer
      startUpiTimer();
    });
  }

  // Back button from Step 2 to Step 1
  document.querySelectorAll('.back-to-step1').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('booking-step-2').classList.remove('active');
      document.getElementById('booking-step-1').classList.add('active');

      document.getElementById('dot-step-2').classList.remove('active');
      document.getElementById('line-step-1').classList.remove('active');

      if (upiTimerInterval) {
        clearInterval(upiTimerInterval);
        upiTimerInterval = null;
      }
    });
  });

  // Payment tab switches
  const tabUpi = document.getElementById('tab-pay-upi');
  const tabCard = document.getElementById('tab-pay-card');
  const paneUpi = document.getElementById('pay-pane-upi');
  const paneCard = document.getElementById('pay-pane-card');

  if (tabUpi && tabCard && paneUpi && paneCard) {
    tabUpi.addEventListener('click', () => {
      tabUpi.classList.add('active');
      tabCard.classList.remove('active');
      paneUpi.classList.add('active');
      paneCard.classList.remove('active');
    });

    tabCard.addEventListener('click', () => {
      tabCard.classList.add('active');
      tabUpi.classList.remove('active');
      paneCard.classList.add('active');
      paneUpi.classList.remove('active');
    });
  }

  // Card input masking & brand detection
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
      }
      e.target.value = formatted;

      // Brand detection
      const brandSlot = document.getElementById('card-brand-icon-slot');
      if (brandSlot) {
        if (val.startsWith('4')) {
          brandSlot.innerHTML = '<i class="fa-brands fa-cc-visa" style="color: #58a6ff;"></i>';
        } else if (val.startsWith('5')) {
          brandSlot.innerHTML = '<i class="fa-brands fa-cc-mastercard" style="color: #ff9f1c;"></i>';
        } else if (val.startsWith('3')) {
          brandSlot.innerHTML = '<i class="fa-brands fa-cc-amex" style="color: #00a699;"></i>';
        } else {
          brandSlot.innerHTML = '<i class="fa-regular fa-credit-card"></i>';
        }
      }
    });
  }

  // Card Expiry auto-format (MM/YY)
  const expiryInput = document.getElementById('card-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length >= 2) {
        e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
      } else {
        e.target.value = val;
      }
    });
  }

  // Process secure payment animation
  function processPayment(successCallback) {
    const loader = document.getElementById('booking-loading');
    if (loader) loader.classList.add('active');

    setTimeout(() => {
      if (loader) loader.classList.remove('active');
      successCallback();
    }, 2800); // 2.8 seconds realistic transaction delay
  }

  // Complete booking success page routing
  function finalizeBooking() {
    // Generate simulated Booking ID
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    const bookingId = `IG-2026-${randomHex}`;

    // Fill success receipt info
    document.getElementById('receipt-booking-id').textContent = bookingId;
    document.getElementById('receipt-guest-name').textContent = bookingData.name;
    document.getElementById('receipt-guests').textContent = bookingData.guests;
    
    const roomLabels = { deluxe: 'Deluxe Room', executive: 'Executive Suite', family: 'Grand Family Suite' };
    document.getElementById('receipt-room-class').textContent = roomLabels[bookingData.roomVal] || 'Deluxe Room';

    // Format dates nicely
    const fmtDate = str => {
      const d = new Date(str);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    document.getElementById('receipt-dates').textContent = `${fmtDate(bookingData.checkin)} - ${fmtDate(bookingData.checkout)}`;
    document.getElementById('receipt-total-amount').textContent = bookingData.totalText;

    // Shift to Step 3
    document.getElementById('booking-step-2').classList.remove('active');
    document.getElementById('booking-step-3').classList.add('active');

    // Update indicators
    document.getElementById('dot-step-3').classList.add('active');
    document.getElementById('line-step-2').classList.add('active');

    // Cancel timer
    if (upiTimerInterval) {
      clearInterval(upiTimerInterval);
      upiTimerInterval = null;
    }

    showToast('Booking Successful!', `Your room has been reserved under ID: ${bookingId}`);
  }

  // UPI Form Submit
  const upiForm = document.getElementById('upi-payment-form');
  if (upiForm) {
    upiForm.addEventListener('submit', e => {
      e.preventDefault();
      processPayment(finalizeBooking);
    });
  }

  // Card Form Submit
  const cardForm = document.getElementById('card-payment-form');
  if (cardForm) {
    cardForm.addEventListener('submit', e => {
      e.preventDefault();
      processPayment(finalizeBooking);
    });
  }

  // Close booking done button
  document.querySelectorAll('.close-booking-done-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(bookingModal);
    });
  });

  // Print / PDF download trigger
  const btnPrint = document.getElementById('btn-print-receipt');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  /* ------------------------------------------
     9. Enquiry form submit
  ------------------------------------------ */
  const modalEnquiryForm = document.getElementById('modal-enquiry-form');
  if (modalEnquiryForm) {
    modalEnquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      closeModal(enquiryModal);
      showToast('Enquiry Received!', 'Our banquet team will contact you within 24 hours.');
      modalEnquiryForm.reset();
    });
  }

  /* ------------------------------------------
     10. Contact form submit
  ------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Message Sent!', 'We have received your message and will respond shortly.');
      contactForm.reset();
    });
  }

  /* ------------------------------------------
     11. Menu tabs (Dining section)
  ------------------------------------------ */
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ------------------------------------------
     12. Gallery lightbox
  ------------------------------------------ */
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const cap = item.querySelector('.gallery-overlay span')?.textContent || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCap) lightboxCap.textContent = cap;
      if (lightbox) lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
      closeModal(enquiryModal);
      closeLightbox();
      closeDrawer();
    }
  });

  /* ------------------------------------------
     13. Toast notification
  ------------------------------------------ */
  function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  /* ------------------------------------------
     14. Scroll reveal animations
  ------------------------------------------ */
  const revealEls = document.querySelectorAll(
    '.fade-in-up, .reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------
     15. Hero fade-in on load
  ------------------------------------------ */
  document.querySelectorAll('.hero-content, .quick-booking-bar').forEach(el => {
    setTimeout(() => el.classList.add('active'), 200);
  });

  /* ------------------------------------------
     16. Smooth scroll for all anchor links
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  /* ------------------------------------------
   17. Check-in / Check-out validation
------------------------------------------ */
  const checkinInputs = document.querySelectorAll(
    '#quick-check-in, #book-checkin'
  );

  checkinInputs.forEach(input => {
    input.addEventListener('change', function () {

      const checkoutId =
        this.id === 'quick-check-in'
          ? 'quick-check-out'
          : 'book-checkout';

      const checkout = document.getElementById(checkoutId);

      if (checkout) {
        checkout.min = this.value;

        if (
          checkout.value &&
          checkout.value <= this.value
        ) {
          const nextDay = new Date(this.value);
          nextDay.setDate(nextDay.getDate() + 1);

          checkout.value =
            nextDay.toISOString().split('T')[0];
        }
      }

      updatePriceCalc();
    });
  });

  /* ------------------------------------------
     18. Set default dates
  ------------------------------------------ */
  function setDefaultDates() {

    const todayDate = new Date();

    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    const todayStr =
      todayDate.toISOString().split('T')[0];

    const tomorrowStr =
      tomorrowDate.toISOString().split('T')[0];

    ['quick-check-in', 'book-checkin'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value) {
        el.value = todayStr;
      }
    });

    ['quick-check-out', 'book-checkout'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value) {
        el.value = tomorrowStr;
      }
    });

    updatePriceCalc();
  }

  setDefaultDates();

  /* ------------------------------------------
     19. Initialize active menu
  ------------------------------------------ */
  updateActiveNavLink();

  /* ------------------------------------------
     20. Glowing Gold Particles System (3D WebGL / 2D Fallback)
  ------------------------------------------ */
  const canvas = document.getElementById('gold-particles');
  if (canvas) {
    if (window.THREE) {
      // Initialize Three.js 3D Constellation
      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particles geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 180; // moderate count for elegant, luxury feel

        const positions = new Float32Array(count * 3);
        const randomSpeeds = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
          // spread in a cylindrical/spherical volume
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
          randomSpeeds[i] = Math.random() * 0.05 + 0.02;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create a custom soft radial gradient particle texture using HTML canvas
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 16;
        pCanvas.height = 16;
        const pCtx = pCanvas.getContext('2d');
        const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 244, 208, 1)'); // bright gold core
        grad.addColorStop(0.3, 'rgba(205, 164, 94, 0.7)'); // champagne gold glow
        grad.addColorStop(1, 'rgba(7, 6, 5, 0)');
        pCtx.fillStyle = grad;
        pCtx.beginPath();
        pCtx.arc(8, 8, 8, 0, Math.PI * 2);
        pCtx.fill();
        const pTexture = new THREE.CanvasTexture(pCanvas);

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.12,
          sizeAttenuation: true,
          map: pTexture,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(points);

        camera.position.z = 4;

        // Mouse interaction for responsive camera tilt (innovative parallax)
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
        });

        // Touch orientation support for mobile tilt
        window.addEventListener('deviceorientation', (e) => {
          if (e.beta && e.gamma) {
            mouseX = (e.gamma / 45) * 0.2; // tilt horizontally
            mouseY = ((e.beta - 45) / 45) * 0.2; // tilt vertically
          }
        });

        // Scroll responsive speed rotation
        let scrollY = 0;
        window.addEventListener('scroll', () => {
          scrollY = window.pageYOffset || document.documentElement.scrollTop;
        });

        function resizeCanvas() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', resizeCanvas);

        const clock = new THREE.Clock();

        function animate() {
          const elapsedTime = clock.getElapsedTime();

          // slow rotation that speeds up slightly when scrolling
          points.rotation.y = elapsedTime * 0.04 + (scrollY * 0.0003);
          points.rotation.x = elapsedTime * 0.02;

          // smooth lerp mouse movement (Lagrange-interpolation style)
          targetX += (mouseX - targetX) * 0.05;
          targetY += (mouseY - targetY) * 0.05;

          camera.position.x = targetX * 1.5;
          camera.position.y = -targetY * 1.5;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        animate();
      } catch (e) {
        console.warn("Three.js initialization failed. Falling back to 2D canvas particles.", e);
        init2DCanvasParticles(canvas);
      }
    } else {
      init2DCanvasParticles(canvas);
    }
  }

  // Fallback 2D canvas animation for robustness
  function init2DCanvasParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.fadeSpeed = Math.random() * 0.004 + 0.002;
        this.maxOpacity = this.opacity;
        this.opacityState = 'in';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
        if (this.opacityState === 'in') {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) this.opacityState = 'out';
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.05) this.opacityState = 'in';
        }
      }

      draw() {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        grad.addColorStop(0, `rgba(235, 209, 161, ${this.opacity})`);
        grad.addColorStop(0.4, `rgba(205, 164, 94, ${this.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(7, 6, 5, 0)');
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

});
