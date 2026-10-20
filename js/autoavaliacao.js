// Quiz de autoavaliação que monta a mensagem para o WhatsApp

// Self-assessment quiz
(function(){
  var overlay = document.getElementById('quizOverlay');
  var body = document.getElementById('quizBody');
  var progressBar = document.getElementById('quizProgressBar');
  var startBtn = document.getElementById('startQuizBtn');
  var closeBtn = document.getElementById('quizClose');
  if (!overlay || !body || !startBtn) return;

  var steps = [
    {
      id: 'motivo',
      title: 'O que trouxe você até aqui?',
      subtitle: 'O que você busca neste momento?',
      type: 'single',
      options: [
        { label: 'Estou sentindo dor', value: 'dor' },
        { label: 'Tive uma lesão', value: 'lesao' },
        { label: 'Estou me recuperando de uma cirurgia', value: 'cirurgia' },
        { label: 'Quero melhorar minha mobilidade/força', value: 'mobilidade' },
        { label: 'Quero praticar Pilates', value: 'pilates' },
        { label: 'Quero prevenir dores e lesões', value: 'prevencao' },
        { label: 'Estou grávida ou no pós-parto', value: 'gestante' }
      ]
    },
    {
      id: 'tempo',
      title: 'Há quanto tempo?',
      subtitle: 'Há quanto tempo você sente isso?',
      type: 'single',
      condition: function (a) { return a.motivo !== 'pilates' && a.motivo !== 'gestante' && a.motivo !== 'cirurgia' && a.motivo !== 'mobilidade' && a.motivo !== 'prevencao'; },
      options: [
        { label: 'Há alguns dias', value: 'dias' },
        { label: 'Mais de 3 meses', value: 'mais3m' },
        { label: 'Cerca de 6 meses', value: 'seis_meses' },
        { label: '1 ano ou mais', value: 'ano' }
      ]
    },
    {
      id: 'tempo_gest',
      title: 'Em que fase você está?',
      subtitle: 'Conte para nós o momento da gestação ou do pós-parto',
      type: 'single',
      condition: function (a) { return a.motivo === 'gestante'; },
      options: [
        { label: 'Menos de 12 semanas', value: 'g_menos12' },
        { label: 'Mais de 12 semanas', value: 'g_mais12' },
        { label: '1 semana de vida do bebê', value: 'p_1sem' },
        { label: '+3 meses de vida do bebê', value: 'p_3m' }
      ]
    },
    {
      id: 'gest_pre',
      title: 'Preparação para o parto',
      subtitle: 'O que é mais importante para você agora?',
      type: 'single',
      condition: function (a) { return a.motivo === 'gestante' && (a.tempo_gest === 'g_menos12' || a.tempo_gest === 'g_mais12'); },
      options: [
        { label: 'Prevenir complicações no parto', value: 'pre_pelvica' },
        { label: 'Manter bom condicionamento durante a gestação', value: 'pre_pilates' }
      ]
    },
    {
      id: 'gest_pos',
      title: 'Cuidados no pós-parto',
      subtitle: 'O que você mais gostaria de cuidar agora?',
      type: 'single',
      condition: function (a) { return a.motivo === 'gestante' && (a.tempo_gest === 'p_1sem' || a.tempo_gest === 'p_3m'); },
      options: [
        { label: 'Prevenir complicações pós-parto', value: 'pos_pelvica' },
        { label: 'Manter bom condicionamento depois', value: 'pos_pilates' },
        { label: 'Avaliar diástase abdominal', value: 'pos_diastase' },
        { label: 'Melhorar a amamentação', value: 'pos_amamenta' }
      ]
    },
    {
      id: 'gest_obs',
      title: 'Quer nos contar mais?',
      subtitle: 'Tem alguma queixa ou dúvida que queira compartilhar com a equipe? (opcional)',
      type: 'text',
      placeholder: 'Ex.: dor lombar, inchaço, dúvida sobre o parto, desconforto na amamentação…',
      condition: function (a) { return a.motivo === 'gestante'; },
      options: []
    },
    {
      id: 'tempo_cir',
      title: 'Quando foi a sua cirurgia?',
      subtitle: 'Há quanto tempo você fez a cirurgia?',
      type: 'single',
      condition: function (a) { return a.motivo === 'cirurgia'; },
      options: [
        { label: 'Há alguns dias', value: 'c_dias' },
        { label: 'Até 3 meses', value: 'c_ate3m' },
        { label: 'Mais de 3 meses', value: 'c_mais3m' }
      ]
    },
    {
      id: 'mob_regiao',
      title: 'Você tem alguma dificuldade no corpo?',
      subtitle: 'Toque no boneco ou escolha abaixo onde sente o problema. Se não houver, é só continuar.',
      type: 'body',
      confirm: true,
      obsId: 'mob_obs',
      obsLabel: 'Quer descrever sua dificuldade? (opcional)',
      obsPlaceholder: 'Ex.: rigidez nas costas, dificuldade para agachar, falta de equilíbrio…',
      condition: function (a) { return a.motivo === 'mobilidade'; },
      options: [
        { label: 'Rosto', value: 'rosto' },
        { label: 'Pescoço', value: 'pescoco' },
        { label: 'Ombro', value: 'ombro' },
        { label: 'Coluna', value: 'coluna' },
        { label: 'Quadril/Pélvico', value: 'quadril' },
        { label: 'Joelho', value: 'joelho' },
        { label: 'Tornozelo/Pé', value: 'tornozelo' },
        { label: 'Outra região', value: 'outra' },
        { label: 'Não tenho nenhuma dificuldade específica', value: 'nenhuma' }
      ]
    },
    {
      id: 'prev_regiao',
      title: 'Onde você quer prevenir dores?',
      subtitle: 'Toque no boneco ou escolha abaixo a região que você quer cuidar.',
      type: 'body',
      confirm: true,
      obsId: 'prev_obs',
      obsLabel: 'Quer nos contar mais? (opcional)',
      obsPlaceholder: 'Ex.: passo muito tempo sentado, treino pesado, já tive dor antes…',
      condition: function (a) { return a.motivo === 'prevencao'; },
      options: [
        { label: 'Rosto', value: 'rosto' },
        { label: 'Pescoço', value: 'pescoco' },
        { label: 'Ombro', value: 'ombro' },
        { label: 'Coluna', value: 'coluna' },
        { label: 'Quadril/Pélvico', value: 'quadril' },
        { label: 'Joelho', value: 'joelho' },
        { label: 'Tornozelo/Pé', value: 'tornozelo' },
        { label: 'Outra região', value: 'outra' },
        { label: 'Corpo todo / prevenção geral', value: 'geral' }
      ]
    },
    {
      id: 'prev_ativ',
      title: 'Você pratica atividade física?',
      subtitle: 'Isso nos ajuda a entender o seu perfil',
      type: 'single',
      condition: function (a) { return a.motivo === 'prevencao'; },
      options: [
        { label: 'Não pratico no momento', value: 'nao' },
        { label: 'Caminhada/corrida', value: 'corrida' },
        { label: 'Musculação/academia', value: 'musculacao' },
        { label: 'Esporte/competição', value: 'esporte' },
        { label: 'Pilates/outras atividades', value: 'outras' }
      ]
    },
    {
      id: 'prev_fator',
      title: 'O que mais pesa no seu dia a dia?',
      subtitle: 'Pode marcar mais de uma (opcional)',
      type: 'multi',
      condition: function (a) { return a.motivo === 'prevencao'; },
      options: [
        { label: 'Muito tempo sentado', value: 'sentado' },
        { label: 'Trabalho com esforço físico', value: 'esforco' },
        { label: 'Treino intenso', value: 'treino' },
        { label: 'Já tive dor ou lesão nessa região', value: 'antes' },
        { label: 'Histórico de lesões na família', value: 'familia' }
      ]
    },
    {
      id: 'regiao',
      title: 'Onde está o problema?',
      subtitle: 'Onde você sente o desconforto?',
      type: 'body',
      condition: function (a) { return a.motivo === 'dor' || a.motivo === 'lesao'; },
      options: [
        { label: 'Rosto', value: 'rosto' },
        { label: 'Pescoço', value: 'pescoco' },
        { label: 'Ombro', value: 'ombro' },
        { label: 'Coluna', value: 'coluna' },
        { label: 'Quadril/Pélvico', value: 'quadril' },
        { label: 'Joelho', value: 'joelho' },
        { label: 'Tornozelo/Pé', value: 'tornozelo' },
        { label: 'Outra região', value: 'outra' }
      ]
    },
    {
      id: 'pilates_foco',
      title: 'O que você procura no Pilates?',
      subtitle: 'Escolha o que mais combina com você',
      type: 'single',
      condition: function (a) { return a.motivo === 'pilates'; },
      options: [
        { label: 'Fortalecimento', value: 'fortalecimento' },
        { label: 'Mobilidade/flexibilidade', value: 'mobilidade' },
        { label: 'Melhorar postura', value: 'postura' },
        { label: 'Prevenção de dores', value: 'prevencao' },
        { label: 'Condicionamento físico', value: 'condicionamento' },
        { label: 'Qualidade de vida', value: 'qualidade' },
        { label: 'Já faço Pilates e quero continuar', value: 'continuar' }
      ]
    },
    {
      id: 'interferencia',
      title: 'Como isso interfere na sua rotina?',
      subtitle: 'Essa condição está atrapalhando alguma atividade? (Pode marcar mais de uma)',
      type: 'multi',
      condition: function (a) { return a.motivo !== 'pilates' && a.motivo !== 'gestante' && a.motivo !== 'cirurgia' && a.motivo !== 'mobilidade' && a.motivo !== 'prevencao'; },
      options: [
        { label: 'Trabalho/estudo', value: 'trabalho' },
        { label: 'Dormir', value: 'dormir' },
        { label: 'Caminhar', value: 'caminhar' },
        { label: 'Treinar/praticar esporte', value: 'esporte' },
        { label: 'Atividades domésticas', value: 'domesticas' },
        { label: 'Não está atrapalhando muito', value: 'pouco' },
        { label: 'Outro', value: 'outro' }
      ]
    },
    {
      id: 'objetivo',
      title: 'Qual é o seu objetivo?',
      subtitle: 'O que você gostaria de conseguir?',
      type: 'single',
      condition: function (a) { return a.motivo !== 'pilates' && a.motivo !== 'gestante' && a.motivo !== 'cirurgia' && a.motivo !== 'mobilidade' && a.motivo !== 'prevencao'; },
      options: [
        { label: 'Voltar a treinar', value: 'treinar' },
        { label: 'Voltar às minhas atividades normalmente', value: 'atividades' },
        { label: 'Reduzir minhas limitações', value: 'limitacoes' },
        { label: 'Melhorar minha força', value: 'forca' },
        { label: 'Melhorar minha mobilidade', value: 'mobilidade_obj' },
        { label: 'Ter mais qualidade de vida', value: 'qualidade' },
        { label: 'Começar Pilates', value: 'pilates_obj' }
      ]
    }
  ];

  var bodyHotspots = [
    { value: 'rosto', cx: 100, cy: 30, r: 15 },
    { value: 'pescoco', cx: 100, cy: 62, r: 12 },
    { value: 'ombro', cx: 62, cy: 92, r: 12 },
    { value: 'ombro', cx: 138, cy: 92, r: 12 },
    { value: 'coluna', cx: 100, cy: 150, r: 14 },
    { value: 'quadril', cx: 100, cy: 208, r: 13 },
    { value: 'joelho', cx: 82, cy: 300, r: 12 },
    { value: 'joelho', cx: 118, cy: 300, r: 12 },
    { value: 'tornozelo', cx: 80, cy: 380, r: 11 },
    { value: 'tornozelo', cx: 120, cy: 380, r: 11 }
  ];

  var answers = {};
  var index = 0;

  function visibleSteps() {
    return steps.filter(function (s) { return !s.condition || s.condition(answers); });
  }

  function labelFor(stepId, value) {
    var step = steps.filter(function (s) { return s.id === stepId; })[0];
    if (!step) return value;
    var opt = step.options.filter(function (o) { return o.value === value; })[0];
    return opt ? opt.label : value;
  }

  function openQuiz() {
    answers = {};
    index = 0;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render();
  }

  function closeQuiz() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateProgress(stepPos, total) {
    var pct = Math.round((stepPos / total) * 100);
    progressBar.style.width = pct + '%';
  }

  function goNext() {
    index++;
    render();
  }

  function goBack() {
    if (index > 0) {
      index--;
      render();
    } else {
      closeQuiz();
    }
  }

  function selectSingle(step, value) {
    if (step.id === 'motivo' && answers.motivo !== value) answers = {};
    answers[step.id] = value;
    setTimeout(goNext, 180);
  }

  function toggleMulti(step, value) {
    if (!answers[step.id]) answers[step.id] = [];
    var arr = answers[step.id];
    var pos = arr.indexOf(value);
    if (pos === -1) arr.push(value); else arr.splice(pos, 1);
    renderStepContent(step, visibleSteps().indexOf(step));
  }

  function selectBody(step, value) {
    answers[step.id] = value;
    if (step.confirm) { renderStepContent(step, visibleSteps().indexOf(step)); return; }
    if (value === 'outra') {
      renderStepContent(step, visibleSteps().indexOf(step));
      var di = document.getElementById('quizRegionDetail');
      if (di) { di.focus({ preventScroll: true }); var rc = document.getElementById('quizRegionContinue'); if (rc) rc.scrollIntoView({ block: 'end', behavior: 'smooth' }); }
      return;
    }
    delete answers.regiao_detalhe;
    setTimeout(goNext, 180);
  }

  function buildBodySVG(step) {
    var selected = answers[step.id];
    var circles = bodyHotspots.map(function (h, i) {
      var cls = 'body-hotspot' + (selected === h.value ? ' selected' : '');
      return '<circle class="' + cls + '" data-value="' + h.value + '" cx="' + h.cx + '" cy="' + h.cy + '" r="' + h.r + '"><title>' + labelFor('regiao', h.value) + '</title></circle>';
    }).join('');
    return '<svg viewBox="0 0 200 420" aria-hidden="false" role="img">' +
      '<g fill="none" stroke="var(--line)" stroke-width="10" stroke-linecap="round">' +
      '<circle cx="100" cy="34" r="26" fill="var(--bone)" stroke="var(--line)" stroke-width="6"/>' +
      '<path d="M100 60 L100 160"/>' +
      '<path d="M100 78 L58 130"/>' +
      '<path d="M100 78 L142 130"/>' +
      '<path d="M100 160 L82 300"/>' +
      '<path d="M100 160 L118 300"/>' +
      '<path d="M82 300 L80 382"/>' +
      '<path d="M118 300 L120 382"/>' +
      '</g>' +
      circles +
      '</svg>';
  }

  function renderStepContent(step, stepPos) {
    var total = visibleSteps().length;
    if (answers.motivo === 'gestante') total = 4;
    updateProgress(stepPos + 1, total + 1);

    var html = '<div class="quiz-step">';
    html += '<span class="quiz-kicker">Pergunta ' + (stepPos + 1) + ' de ' + total + '</span>';
    html += '<h3 class="quiz-title">' + step.title + '</h3>';
    html += '<p class="quiz-subtitle">' + step.subtitle + '</p>';

    if (step.type === 'body') {
      html += '<div class="quiz-body-figure">' + buildBodySVG(step) + '</div>';
    }

    if (step.type === 'text') {
      html += '<div class="quiz-name-field"><textarea id="quizTextArea" rows="4" maxlength="400" placeholder="' + step.placeholder + '">' + (answers[step.id] || '').replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea></div>';
    } else if (step.type === 'multi') {
      html += '<div class="quiz-options" id="quizOptionsWrap">';
      step.options.forEach(function (opt) {
        var isSel = (answers[step.id] || []).indexOf(opt.value) !== -1;
        html += '<button type="button" class="quiz-option' + (isSel ? ' selected' : '') + '" data-value="' + opt.value + '"><span class="dot"></span>' + opt.label + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div class="quiz-options" id="quizOptionsWrap">';
      step.options.forEach(function (opt) {
        var isSel = answers[step.id] === opt.value;
        html += '<button type="button" class="quiz-option' + (isSel ? ' selected' : '') + '" data-value="' + opt.value + '"><span class="dot"></span>' + opt.label + '</button>';
      });
      html += '</div>';
    }

    if (step.type === 'body' && step.confirm) {
      html += '<div class="quiz-name-field quiz-region-detail"><label for="quizObsArea">' + step.obsLabel + '</label>';
      html += '<textarea id="quizObsArea" rows="3" maxlength="300" placeholder="' + step.obsPlaceholder + '">' + (answers[step.obsId] || '').replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea></div>';
    }
    if (step.type === 'body' && !step.confirm && answers[step.id] === 'outra') {
      html += '<div class="quiz-name-field quiz-region-detail"><label for="quizRegionDetail">Conte onde exatamente é (opcional)</label>';
      html += '<input type="text" id="quizRegionDetail" maxlength="120" placeholder="Ex.: mão, cotovelo, costelas, virilha…" value="' + (answers.regiao_detalhe || '').replace(/"/g, '&quot;') + '" /></div>';
    }
    html += '<div class="quiz-footer">';
    html += '<button type="button" class="quiz-back" id="quizBackBtn">← Voltar</button>';
    if (step.type === 'body' && step.confirm) {
      html += '<button type="button" class="quiz-continue" id="quizConfirmBtn">Continuar →</button>';
    }
    if (step.type === 'body' && !step.confirm && answers[step.id] === 'outra') {
      html += '<button type="button" class="quiz-continue" id="quizRegionContinue">Continuar →</button>';
    }
    if (step.type === 'multi' || step.type === 'text') {
      html += '<button type="button" class="quiz-continue" id="quizContinueBtn">Continuar →</button>';
    }
    html += '</div>';
    html += '</div>';

    body.innerHTML = html;

    document.getElementById('quizBackBtn').addEventListener('click', goBack);

    var confBtn = document.getElementById('quizConfirmBtn');
    if (confBtn) {
      var obsEl = document.getElementById('quizObsArea');
      obsEl.addEventListener('input', function () { var v = obsEl.value.trim(); if (v) answers[step.obsId] = v; else delete answers[step.obsId]; });
      confBtn.addEventListener('click', function () { var v = obsEl.value.trim(); if (v) answers[step.obsId] = v; else delete answers[step.obsId]; goNext(); });
    }
    var regCont = document.getElementById('quizRegionContinue');
    if (regCont) {
      var regIn = document.getElementById('quizRegionDetail');
      regIn.addEventListener('input', function () { answers.regiao_detalhe = regIn.value.trim(); });
      regIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { answers.regiao_detalhe = regIn.value.trim(); goNext(); } });
      regCont.addEventListener('click', function () { answers.regiao_detalhe = regIn.value.trim(); goNext(); });
    }
    if (step.type === 'text') {
      var ta = document.getElementById('quizTextArea');
      document.getElementById('quizContinueBtn').addEventListener('click', function () {
        var v = ta.value.trim();
        if (v) answers[step.id] = v; else delete answers[step.id];
        goNext();
      });
    } else if (step.type === 'body') {
      body.querySelectorAll('.body-hotspot').forEach(function (el) {
        el.addEventListener('click', function () { selectBody(step, el.getAttribute('data-value')); });
      });
      body.querySelectorAll('.quiz-option').forEach(function (el) {
        el.addEventListener('click', function () { selectBody(step, el.getAttribute('data-value')); });
      });
    } else if (step.type === 'multi') {
      body.querySelectorAll('.quiz-option').forEach(function (el) {
        el.addEventListener('click', function () { toggleMulti(step, el.getAttribute('data-value')); });
      });
      var contBtn = document.getElementById('quizContinueBtn');
      if (contBtn) contBtn.addEventListener('click', goNext);
    } else {
      body.querySelectorAll('.quiz-option').forEach(function (el) {
        el.addEventListener('click', function () { selectSingle(step, el.getAttribute('data-value')); });
      });
    }
  }

  function computeService() {
    var motivo = answers.motivo, tempo = answers.tempo, objetivo = answers.objetivo;
    var gPre = (answers.tempo_gest === 'g_menos12' || answers.tempo_gest === 'g_mais12');
    if (motivo === 'gestante' && (gPre ? answers.gest_pre : answers.gest_pos)) {
      var g = gPre ? answers.gest_pre : answers.gest_pos;
      if (g === 'pre_pelvica') return { name: 'Avaliação de Fisioterapia Pélvica', explain: 'A fisioterapeuta conversa com você e avalia a musculatura do assoalho pélvico (a região que sustenta o bebê), a postura e a respiração, e ensina exercícios e posições que ajudam no parto. É um atendimento tranquilo, sem desconforto, respeitando o seu ritmo e o do bebê.', anchor: '#servicos', blurb: 'Preparar o corpo para o parto ajuda a prevenir complicações e a tornar a experiência mais segura e confortável.' };
      if (g === 'pre_pilates') return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates adaptadas à gestação, acompanhadas por fisioterapeuta, com exercícios leves e seguros para cada fase. O objetivo é manter o condicionamento, aliviar dores e preparar o corpo para o parto.', anchor: '#servicos', blurb: 'O Pilates é um ótimo aliado para se manter ativa e bem durante toda a gestação.' };
      if (g === 'pos_pelvica') return { name: 'Avaliação de Fisioterapia Pélvica', explain: 'A fisioterapeuta avalia a recuperação do assoalho pélvico e da região abdominal depois do parto, conversa sobre suas queixas e orienta os exercícios certos para cada fase. É um atendimento acolhedor, respeitando o seu tempo de recuperação.', anchor: '#servicos', blurb: 'Cuidar do pós-parto cedo ajuda a prevenir complicações e a recuperar a força e a confiança no corpo.' };
      if (g === 'pos_pilates') return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates acompanhadas por fisioterapeuta, com exercícios adequados ao pós-parto. O objetivo é recuperar força, postura e condicionamento aos poucos, com segurança.', anchor: '#servicos', blurb: 'Voltar a se exercitar no seu ritmo, com orientação, faz toda a diferença na recuperação.' };
      if (g === 'pos_diastase') return { name: 'Avaliação de Fisioterapia Pélvica', explain: 'A fisioterapeuta avalia a abertura entre os músculos do abdômen (diástase) com um exame simples, feito com as mãos, e indica os exercícios e cuidados para fechá-la. Não é invasivo nem dolorido.', anchor: '#servicos', blurb: 'A avaliação da diástase abdominal mostra o melhor caminho para recuperar o centro do corpo depois da gestação.' };
      return { name: 'Consultoria de Amamentação / Laser', explain: 'Uma conversa com orientação sobre posição, pega e dúvidas da amamentação. Quando indicado, usamos o laser terapêutico, indolor, para ajudar em dores e fissuras nos mamilos. O objetivo é deixar esse momento mais leve para você e o bebê.', anchor: '#servicos', blurb: 'Apoio profissional para a amamentação ser mais tranquila e confortável.' };
    }
    if (motivo === 'cirurgia') {
      var tc = answers.tempo_cir;
      if (tc === 'c_dias') return { name: 'Plano de SOS (presencial ou online)', explain: 'É um atendimento rápido e cuidadoso para o pós-operatório recente: a fisioterapeuta entende a sua cirurgia, orienta o que pode e o que evitar e ajuda a controlar dor e inchaço. O objetivo é começar a recuperação com segurança.', anchor: '#servicos', blurb: 'No pós-operatório recente, um acompanhamento próximo ajuda a recuperação a começar bem.' };
      if (tc === 'c_ate3m') return { name: 'Plano de Tratamento — Reabilitação Interdisciplinar', explain: 'Depois de uma avaliação completa, montamos um plano com sessões regulares para recuperar movimento, força e confiança, respeitando a liberação do seu médico. A evolução é acompanhada de perto.', anchor: '#servicos', blurb: 'Nesta fase, a reabilitação contínua é o que mais faz diferença para o resultado da cirurgia.' };
      return { name: 'Consulta Avaliativa — Fisioterapia', explain: 'É uma conversa com exame físico: a fisioterapeuta avalia como está a sua recuperação, o que ainda limita você e indica os próximos passos. É tranquila e sem procedimentos invasivos.', anchor: '#servicos', blurb: 'Uma avaliação completa mostra o que ainda pode melhorar depois da cirurgia.' };
    }
    if (motivo === 'prevencao') {
      return { name: 'Consulta Avaliativa — Fisioterapia', explain: 'É uma conversa com exame físico: a fisioterapeuta avalia sua postura, mobilidade e força na região que você quer proteger e indica exercícios e hábitos para evitar dores e lesões. Não precisa estar com dor, é um cuidado para o futuro.', anchor: '#servicos', blurb: 'Prevenir é mais simples que tratar: uma avaliação mostra onde agir antes que a dor apareça.' + (answers.prev_ativ === 'nao' ? ' E, para começar a se movimentar com segurança, o Pilates também pode ser um ótimo aliado.' : '') };
    }
    if (motivo === 'mobilidade') {
      return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates acompanhadas por fisioterapeuta, em estúdio ou online, com exercícios adaptados às suas dificuldades. O objetivo é ganhar mobilidade e força com segurança, respeitando o seu corpo.', anchor: '#servicos', blurb: 'O Pilates é um ótimo caminho para ganhar mobilidade e força, com orientação para o que você precisa.' };
    }
    if (motivo === 'gestante') {
      return { name: 'Atendimento Gestacional', explain: 'A fisioterapeuta avalia sua postura, respiração e queixas da gestação (dores nas costas, inchaço, preparo para o parto) e orienta exercícios leves e seguros para cada fase. É um atendimento tranquilo, pensado para o seu conforto e o do bebê.', anchor: '#servicos', blurb: 'Cuidado especializado para a gestação e o pós-parto, respeitando cada fase do seu corpo.' };
    }
    if (motivo === 'pilates') {
      if (answers.pilates_foco === 'continuar') {
        return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates acompanhadas por fisioterapeuta, em estúdio ou online, com exercícios adaptados ao seu corpo. O objetivo é fortalecer, melhorar a postura e a mobilidade e prevenir dores — sem exigir experiência prévia.', anchor: '#servicos', blurb: 'Que bom te ter com a gente! Vamos dar continuidade ao seu acompanhamento.' };
      }
      return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates acompanhadas por fisioterapeuta, em estúdio ou online, com exercícios adaptados ao seu corpo. O objetivo é fortalecer, melhorar a postura e a mobilidade e prevenir dores — sem exigir experiência prévia.', anchor: '#servicos', blurb: 'Pilates pode ser uma boa opção para o seu objetivo. Na Fisio Connect, podemos entender seu objetivo e seu momento atual para orientar a melhor forma de começar.' };
    }
    if (objetivo === 'pilates_obj') {
      return { name: 'Plano Mensal de Pilates (presencial ou online)', explain: 'São aulas de Pilates acompanhadas por fisioterapeuta, em estúdio ou online, com exercícios adaptados ao seu corpo. O objetivo é fortalecer, melhorar a postura e a mobilidade e prevenir dores — sem exigir experiência prévia.', anchor: '#servicos', blurb: 'Fortalecimento, consciência corporal e prevenção de lesões — um ótimo caminho para o seu objetivo.' };
    }
    if (motivo === 'dor' && tempo === 'dias') {
      return { name: 'Plano de SOS (presencial ou online)', explain: 'É um atendimento rápido para uma dor recente: a fisioterapeuta entende o que aconteceu, aplica técnicas para aliviar e orienta o que fazer nos próximos dias. O objetivo é aliviar logo e evitar que o quadro piore.', anchor: '#servicos', blurb: 'Para uma dor aguda (recente), um atendimento rápido ajuda a evitar que o quadro piore.' };
    }
    if (motivo === 'cirurgia' || motivo === 'lesao' || (motivo !== 'mobilidade' && motivo !== 'prevencao' && (tempo === 'ano' || tempo === 'seis_meses' || tempo === 'mais3m'))) {
      return { name: 'Plano de Tratamento — Reabilitação Interdisciplinar', explain: 'Após uma avaliação completa, montamos um plano com sessões regulares, combinando fisioterapia e Pilates conforme a sua necessidade. A evolução é acompanhada de perto para você recuperar função, força e segurança no dia a dia.', anchor: '#servicos', blurb: 'Um plano combinado, com acompanhamento contínuo, é o mais indicado para o seu momento atual.' };
    }
    if (motivo === 'dor') {
      return { name: 'Consulta Avaliativa — Fisioterapia', explain: 'É uma conversa com exame físico: a fisioterapeuta investiga a origem da dor, testa movimentos e explica o diagnóstico funcional. Você sai com um plano claro do que fazer — é tranquila e, normalmente, sem sustos.', anchor: '#servicos', blurb: 'Tratamento de dores com técnicas manuais e exercícios personalizados, a partir de uma avaliação completa.' };
    }
    if (motivo === 'mobilidade' || motivo === 'prevencao') {
      return { name: 'Consulta de Orientação', explain: 'Um encontro para tirar dúvidas e receber orientações práticas (exercícios, hábitos, postura) sobre o seu objetivo. Não é um tratamento: serve para mostrar o melhor caminho antes de decidir os próximos passos.', anchor: '#servicos', blurb: 'Uma conversa com orientação profissional para traçar o melhor caminho para o seu objetivo.' };
    }
    return { name: 'Consulta Avaliativa', explain: 'É o primeiro contato com a fisioterapeuta: ela ouve sua história, avalia seu corpo e indica o que faz mais sentido para você. É simples, sem compromisso e sem procedimentos invasivos.', anchor: '#equipe', blurb: 'O melhor jeito de descobrir seu caminho ideal é conversar com uma de nossas fisioterapeutas.' };
  }

  var CONVENIOS = ["AFEB", "Allianz", "Bacen", "Caesan", "Capesesp", "Casembrapa", "Codevasf", "e-Vida", "Embratel/Claro/Telos", "Fascal", "Fusex", "GamaSaúde", "INAS (GDF Saúde)", "NotreDame/Intermédica", "Omint", "Plan Assiste (MPDFT, MPF, MPM e MPT)", "Portal Saúde", "Proasa", "SAMP/AGMP", "Saúde Petrobras", "Serpro", "STF-Med", "STM-Plas/JMU", "TJDFT", "TRE", "TRF Pró-Social", "TRT"];

  function buildWhatsAppMessage(service, name, convenio) {
    var isReturning = answers.pilates_foco === 'continuar';
    var greeting = name ? ('Olá! Meu nome é ' + name + '. ') : 'Olá! ';
    var msg = greeting + 'Fiz a autoavaliação no site da Fisio Connect e recebi a sugestão de: ' + service.name + '.\n\n';
    msg += 'Resumo das minhas respostas:\n';
    msg += '- Motivo: ' + labelFor('motivo', answers.motivo) + '\n';
    if (answers.pilates_foco) msg += '- Foco no Pilates: ' + labelFor('pilates_foco', answers.pilates_foco) + '\n';
    if (answers.tempo_gest) msg += '- Fase: ' + labelFor('tempo_gest', answers.tempo_gest) + '\n';
    if (answers.motivo === 'gestante' && answers.gest_pre && (answers.tempo_gest === 'g_menos12' || answers.tempo_gest === 'g_mais12')) msg += '- Objetivo: ' + labelFor('gest_pre', answers.gest_pre) + '\n';
    if (answers.motivo === 'gestante' && answers.gest_pos && (answers.tempo_gest === 'p_1sem' || answers.tempo_gest === 'p_3m')) msg += '- Objetivo: ' + labelFor('gest_pos', answers.gest_pos) + '\n';
    if (answers.motivo === 'gestante' && answers.gest_obs) msg += '- Queixa/dúvida: ' + answers.gest_obs + '\n';
    if (answers.motivo === 'prevencao' && answers.prev_regiao) msg += '- Quer prevenir em: ' + labelFor('prev_regiao', answers.prev_regiao) + '\n';
    if (answers.motivo === 'prevencao' && answers.prev_ativ) msg += '- Atividade física: ' + labelFor('prev_ativ', answers.prev_ativ) + '\n';
    if (answers.motivo === 'prevencao' && answers.prev_fator && answers.prev_fator.length) msg += '- No dia a dia: ' + answers.prev_fator.map(function (v) { return labelFor('prev_fator', v); }).join(', ') + '\n';
    if (answers.motivo === 'prevencao' && answers.prev_obs) msg += '- Observação: ' + answers.prev_obs + '\n';
    if (answers.tempo_cir) msg += '- Cirurgia feita: ' + labelFor('tempo_cir', answers.tempo_cir) + '\n';
    if (answers.motivo === 'mobilidade' && answers.mob_regiao) msg += '- Dificuldade em: ' + labelFor('mob_regiao', answers.mob_regiao) + '\n';
    if (answers.motivo === 'mobilidade' && answers.mob_obs) msg += '- Descrição: ' + answers.mob_obs + '\n';
    if (answers.tempo) msg += '- Tempo: ' + labelFor('tempo', answers.tempo) + ((answers.motivo === 'mobilidade' || answers.motivo === 'prevencao') ? '' : (answers.tempo === 'dias' ? ' (dor aguda)' : ' (dor crônica)')) + '\n';
    if (answers.regiao) msg += '- Região: ' + labelFor('regiao', answers.regiao) + (answers.regiao === 'outra' && answers.regiao_detalhe ? ' — ' + answers.regiao_detalhe : '') + '\n';
    if (answers.interferencia && answers.interferencia.length) {
      msg += '- Interfere em: ' + answers.interferencia.map(function (v) { return labelFor('interferencia', v); }).join(', ') + '\n';
    }
    if (answers.objetivo) msg += '- Objetivo: ' + labelFor('objetivo', answers.objetivo) + '\n';
    if (convenio) msg += '- Convênio: ' + convenio + '\n';
    msg += '\n' + (isReturning ? 'Gostaria de continuar meu acompanhamento.' : 'Gostaria de agendar uma avaliação inicial.');
    return encodeURIComponent(msg);
  }

  function renderResult() {
    updateProgress(1, 1);
    var service = computeService();
    var html = '<div class="quiz-step quiz-result">';
    html += '<span class="quiz-kicker">Seu resultado</span>';
    html += '<div class="quiz-result-icon">✨</div>';
    html += '<p>Esse pode ser o seu melhor primeiro passo:</p>';
    html += '<div class="service-name">' + service.name + '</div>';
    html += '<p>' + service.blurb + '</p>';
    html += '<div class="service-explain"><strong>Como funciona</strong>' + service.explain + '</div>';
    html += '<div class="quiz-name-field">';
    html += '<label for="quizNameInput">Como podemos te chamar? (opcional)</label>';
    html += '<input type="text" id="quizNameInput" placeholder="Seu nome" autocomplete="name" />';
    html += '</div>';
    html += '<div class="quiz-name-field">';
    html += '<label for="quizConvSelect">Você tem convênio? (opcional)</label>';
    html += '<select id="quizConvSelect"><option value="">Selecione seu convênio</option><option value="Particular (sem convênio)">Particular (sem convênio)</option>';
    CONVENIOS.forEach(function (c) { html += '<option value="' + c + '">' + c + '</option>'; });
    html += '<option value="__outro">Outro</option></select>';
    html += '<input type="text" id="quizConvOther" placeholder="Qual é o seu convênio?" autocomplete="off" />';
    html += '</div>';
    html += '<div class="quiz-result-actions">';
    html += '<button type="button" class="btn-whatsapp" id="quizWhatsBtn">';
    html += '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.42 5.83c0 4.55-3.7 8.24-8.26 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/></svg>';
    html += 'Falar com a equipe no WhatsApp</button>';
    html += '<button type="button" class="quiz-restart" id="quizRestartBtn">Refazer avaliação</button>';
    html += '</div></div>';
    body.innerHTML = html;
    document.getElementById('quizRestartBtn').addEventListener('click', function () { answers = {}; index = 0; render(); });
    var convSel = document.getElementById('quizConvSelect');
    var convOther = document.getElementById('quizConvOther');
    convSel.addEventListener('change', function () {
      convOther.classList.toggle('show', convSel.value === '__outro');
      if (convSel.value === '__outro') convOther.focus();
    });
    document.getElementById('quizWhatsBtn').addEventListener('click', function () {
      var nameInput = document.getElementById('quizNameInput');
      var nameVal = nameInput ? nameInput.value.trim() : '';
      var convVal = convSel.value === '__outro' ? convOther.value.trim() : convSel.value;
      if (convSel.value === '__outro' && !convVal) convVal = 'Outro (não informado)';
      var waLink = 'https://wa.me/5561991624072?text=' + buildWhatsAppMessage(service, nameVal, convVal);
      window.open(waLink, '_blank', 'noopener');
    });
  }

  function render() {
    var visible = visibleSteps();
    if (index >= visible.length) {
      renderResult();
      return;
    }
    renderStepContent(visible[index], index);
  }

  startBtn.addEventListener('click', openQuiz);
  closeBtn.addEventListener('click', closeQuiz);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeQuiz(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) closeQuiz(); });
})();
