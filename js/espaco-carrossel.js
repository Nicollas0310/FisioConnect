// Fotos e carrossel "Nosso espaço"

var spaceImages = [
  { src: 'assets/img/espaco/espaco-01.jpg', alt: 'Detalhe da parede orgânica que compõe a identidade visual da clínica' },
  { src: 'assets/img/espaco/espaco-02.jpg', alt: 'Ambiente interno com iluminação natural e plantas' },
  { src: 'assets/img/espaco/espaco-03.jpg', alt: 'Equipamento de Pilates Cadillac na sala de práticas' },
  { src: 'assets/img/espaco/espaco-04.jpg', alt: 'Sala de Pilates com equipamentos e parede decorada' },
  { src: 'assets/img/espaco/espaco-05.jpg', alt: 'Sala de trabalho com materiais de fisioterapia organizados' },
  { src: 'assets/img/espaco/espaco-06.jpg', alt: 'Detalhe do estofamento do equipamento de Pilates' },
  { src: 'assets/img/espaco/espaco-07.jpg', alt: 'Detalhe do acabamento em madeira dos equipamentos' },
  { src: 'assets/img/espaco/espaco-08.jpg', alt: 'Sala de Pilates com ladder barrel e parede decorada' },
  { src: 'assets/img/espaco/espaco-09.jpg', alt: 'Cadeira de Pilates (Wunda Chair)' },
  { src: 'assets/img/espaco/espaco-10.jpg', alt: 'Detalhe da barra do trapézio com apoio acolchoado' },
  { src: 'assets/img/espaco/espaco-11.jpg', alt: 'Detalhe do apoio de lã do equipamento de Pilates' },
  { src: 'assets/img/espaco/espaco-12.jpg', alt: 'Atendimento e conversa entre fisioterapeuta e paciente' },
  { src: 'assets/img/espaco/espaco-13.jpg', alt: 'Registro de avaliação durante atendimento gestacional' },
  { src: 'assets/img/espaco/espaco-14.jpg', alt: 'Consulta de acompanhamento gestacional' },
  { src: 'assets/img/espaco/espaco-15.jpg', alt: 'Avaliação com equipamento tecnológico de análise postural' },
];

// Space carousel (Conheça nosso espaço)
(function(){
  var track = document.getElementById('carouselTrack');
  if (!track || typeof spaceImages === 'undefined' || !spaceImages.length) return;

  var centerEl = document.getElementById('carouselCenter');
  var prevEl = document.getElementById('carouselSidePrev');
  var nextEl = document.getElementById('carouselSideNext');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  var total = spaceImages.length;
  var current = 0;
  var timer = null;

  function setSlide(el, idx) {
    var img = el.querySelector('img');
    var data = spaceImages[idx];
    img.src = data.src;
    img.alt = data.alt;
  }

  function render() {
    var prevIdx = (current - 1 + total) % total;
    var nextIdx = (current + 1) % total;
    setSlide(prevEl, prevIdx);
    setSlide(centerEl, current);
    setSlide(nextEl, nextIdx);
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    render();
  }

  function next() { goTo(current + 1); resetTimer(); }
  function prev() { goTo(current - 1); resetTimer(); }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 4200);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  prevEl.addEventListener('click', prev);
  nextEl.addEventListener('click', next);

  render();
  resetTimer();

  var viewport = document.querySelector('.carousel-viewport');
  viewport.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
  viewport.addEventListener('mouseleave', resetTimer);
})();
