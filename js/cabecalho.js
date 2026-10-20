// Esconde o cabeçalho ao rolar para baixo e mostra ao subir

// Hide header on scroll down, show on scroll up
(function(){
  var header = document.querySelector('header');
  var mobileMenu = document.getElementById('mobileMenu');
  var lastY = window.scrollY;
  var ticking = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function onScroll(){
    var currentY = window.scrollY;
    var menuOpen = mobileMenu && mobileMenu.classList.contains('open');
    if (!menuOpen) {
      if (currentY > lastY && currentY > 90) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }
    lastY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();
