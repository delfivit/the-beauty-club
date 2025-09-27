// Carrusel de inspiración (scroll automático)
const carousel = document.querySelector('.inspiracion__carousel');
if (carousel) {
  let scrollAmount = 0;
  setInterval(() => {
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
      carousel.scrollLeft = 0;
      scrollAmount = 0;
    } else {
      scrollAmount += 200;
      carousel.scrollLeft = scrollAmount;
    }
  }, 2500);
}

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

// Hero fade-in effect and disappear on scroll
window.addEventListener('scroll', () => {
  const heroTitle = document.querySelector('.hero__title');
  if (!heroTitle) return;
  const rect = heroTitle.getBoundingClientRect();
  if (rect.top < 60) {
    heroTitle.classList.add('hide-on-scroll');
  } else {
    heroTitle.classList.remove('hide-on-scroll');
  }
  if (rect.top < window.innerHeight - 100) {
    heroTitle.classList.add('visible');
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    setTimeout(() => heroTitle.classList.add('visible'), 400);
  }
});