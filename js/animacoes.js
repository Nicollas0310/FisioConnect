// Animações de entrada ao rolar a página

// Reveal-on-scroll animations
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal, .reveal-stagger');
  // Rede de segurança: se o navegador não suportar, se o JS falhar
  // ou se a detecção de rolagem não disparar (visualizadores embutidos,
  // iframes, etc.), o conteúdo aparece assim mesmo.
  var revealAll = function(){
    targets.forEach(function(el){ el.classList.add('is-visible'); });
  };
  setTimeout(revealAll, 1200);
  window.addEventListener('load', function(){ setTimeout(revealAll, 400); });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function(el){ observer.observe(el); });
})();
