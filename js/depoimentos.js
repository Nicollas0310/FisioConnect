// Faixa de depoimentos em loop contínuo

// Testimonial marquee: duplicate cards once for a seamless infinite loop
(function(){
  var track = document.getElementById('testimonialTrack');
  if (!track) return;
  var originalCards = Array.prototype.slice.call(track.children);
  originalCards.forEach(function(card){
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();
