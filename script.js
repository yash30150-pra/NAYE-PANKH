// NayePankh Foundation – Interaction Script

document.addEventListener('DOMContentLoaded', function () {
  // ---------- Dark Mode Toggle ----------
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  toggleBtn.addEventListener('click', function () {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // ---------- Smooth Scrolling for Nav Links ----------
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Fade‑in on Scroll using IntersectionObserver ----------
  const faders = document.querySelectorAll('[data-fade]');
  const observerOptions = { threshold: 0.1 };
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

    faders.forEach(el => fadeObserver.observe(el));

  // ---------- Animated Counters ----------
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200; // Adjust speed
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    // Start animation when counter becomes visible
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(counter);
  });

  // ---------- Lightbox Functionality ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  let currentImgIndex = 0;

  const openLightbox = (index) => {
    currentImgIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('visible');
  };

  const closeLightbox = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('visible');
  };

  const showPrev = () => {
    currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImgIndex].src;
    lightboxImg.alt = galleryImages[currentImgIndex].alt;
  };

  const showNext = () => {
    currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImgIndex].src;
    lightboxImg.alt = galleryImages[currentImgIndex].alt;
  };

  galleryImages.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
  lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);

  // Close on overlay click or Escape key
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('visible')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    }
  });
});
