(function() {
  'use strict';

  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }, { passive: true });
  }

  const faders = document.querySelectorAll('.fade');
  if (faders.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    faders.forEach(el => observer.observe(el));
  }

  document.querySelectorAll('.gallery .item').forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:20px;';
      const clone = img.cloneNode();
      clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,0.6);object-fit:contain;';
      overlay.appendChild(clone);
      overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
      document.body.appendChild(overlay);
      document.addEventListener('keydown', function(e) { if (e.key === 'Escape') overlay.remove(); });
    });
  });
})();