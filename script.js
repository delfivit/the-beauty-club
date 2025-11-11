// Carrusel autoplay infinito (sin botones)
// Espera a que las imágenes carguen para medir correctamente.
(function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  // duplicar contenido para poder hacer loop infinito
  track.innerHTML = track.innerHTML + track.innerHTML;
  let slides = Array.from(track.children);
  let index = 0;
  let slideWidth = 0;
  let autoSlide;

  function getSlideWidth() {
    const s = slides[0];
    const style = window.getComputedStyle(s);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    return s.getBoundingClientRect().width + marginLeft + marginRight;
  }

  function setInitialPosition() {
    // poner en 0 (primer slide original)
    track.style.transition = 'none';
    track.style.transform = `translateX(0px)`;
    index = 0;
    // forzar reflow
    void track.offsetWidth;
  }

  function moveNext() {
    // si estamos justo al final de la mitad, hacemos un reinicio invisible antes de avanzar
    if (index >= slides.length / 2) {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(0px)`;
      void track.offsetWidth; // reflow
    }

    index++;
    track.style.transition = 'transform 0.6s ease-in-out';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // si acabamos de avanzar al límite de la mitad, al terminar la transición reseteamos a 0
    if (index >= slides.length / 2) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = 0;
        track.style.transform = `translateX(0px)`;
        void track.offsetWidth;
      }, 610); // un poco más que la transición (600ms) para asegurar
    }
  }

  function startAuto() {
    stopAuto();
    autoSlide = setInterval(moveNext, 2500);
  }

  function stopAuto() {
    if (autoSlide) clearInterval(autoSlide);
  }

  // inicializar cuando todas las imágenes estén cargadas
  const imgs = Array.from(track.querySelectorAll('img'));
  let loaded = 0;
  imgs.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === imgs.length) initCarousel();
      });
      img.addEventListener('error', () => {
        loaded++;
        if (loaded === imgs.length) initCarousel();
      });
    }
  });

  // si todas ya estaban completas
  if (loaded === imgs.length) initCarousel();

  function initCarousel() {
    slides = Array.from(track.children);
    slideWidth = getSlideWidth();
    setInitialPosition();
    startAuto();
  }

  // recalcular al redimensionar
  window.addEventListener('resize', () => {
    // detener para recalcular sin animaciones
    track.style.transition = 'none';
    slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    void track.offsetWidth;
  });

  // opción: pausar al pasar el mouse (si querés descomentar)
  /*
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  */
})();


// Booksy widget loader
function showWidget(divId, widgetUrl) {
  ['bilbao-widget','cadiz-widget','malaga-widget'].forEach(id => {
    if (id !== divId) {
      const wd = document.getElementById(id);
      if (wd) wd.innerHTML = '';
    }
  });
  const container = document.getElementById(divId);
  if (container && !container.hasChildNodes()) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = widgetUrl;
    container.innerHTML = '';
    container.appendChild(script);
  }
}

// Hero fade-in effect on scroll AND fade out when scrolling down
window.addEventListener('scroll', () => {
  const heroLogo = document.querySelector('.hero__logo');
  if (!heroLogo) return;
  // Fade in when reaches viewport, fade out as you scroll
  const rect = heroLogo.getBoundingClientRect();
  const scrollY = window.scrollY;
  const fadeEnd = 200;
  let opacity = 1;
  if (scrollY > 0) {
    opacity = Math.max(0, 1 - scrollY / fadeEnd);
  }
  heroLogo.style.opacity = opacity;
  // Keep fade-in class if you want an initial animation
  if (rect.top < window.innerHeight - 100) {
    heroLogo.classList.add('visible');
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const heroLogo = document.querySelector('.hero__logo');
  if (heroLogo) {
    setTimeout(() => heroLogo.classList.add('visible'), 400);
  }
});
// Menú hamburguesa móvil
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.header__menu-toggle');
  const body = document.body;
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      body.classList.toggle('menu-open');
    });
  }
  // Cierra menú si se hace click fuera
  document.addEventListener('click', function(e) {
    const mobileMenu = document.querySelector('.header__menu-mobile');
    if (
      body.classList.contains('menu-open') &&
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      body.classList.remove('menu-open');
    }
  });
});