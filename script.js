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

// Hero fade-in effect on scroll AND fade out when scrolling down
window.addEventListener('scroll', () => {
  const heroTitle = document.querySelector('.hero__title');
  if (!heroTitle) return;
  // Fade in when reaches viewport, fade out as you scroll
  const rect = heroTitle.getBoundingClientRect();
  const scrollY = window.scrollY;
  const fadeEnd = 200;
  let opacity = 1;
  if (scrollY > 0) {
    opacity = Math.max(0, 1 - scrollY / fadeEnd);
  }
  heroTitle.style.opacity = opacity;
  // Keep fade-in class if you want an initial animation
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