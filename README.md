# Fisio Connect

Site da **Fisio Connect — Fisioterapia e Pilates** em Brasília/DF (Buritis).

Página única com os serviços, a equipe, depoimentos em vídeo, convênios, uma autoavaliação que encaminha o paciente para o WhatsApp e o aviso de privacidade (LGPD).

É um site estático: HTML, CSS e JavaScript puros, sem build nem dependências.

## Estrutura

```
index.html                  estrutura da página (HTML)
css/                        estilos, um arquivo por parte do site
  01-base.css                 cores (tema claro/escuro), reset e tipografia
  02-cabecalho.css            menu, botão de tema e menu mobile
  03-hero-botoes.css          topo da página e botões
  04-botoes-flutuantes.css    WhatsApp, Instagram e YouTube flutuantes
  05-animacoes.css            animações ao rolar a página
  06-hero-rede.css            rede animada do topo
  07-secoes.css               estilo comum das seções
  08-autoavaliacao.css        chamada para a autoavaliação
  09-espaco-carrossel.css     carrossel "Nosso espaço"
  10-quiz.css                 janela do quiz
  11-servicos.css             serviços e especialidades
  12-convenios.css            convênios
  13-equipe.css               equipe
  14-processo.css             como funciona
  15-depoimentos.css          depoimentos em texto e vídeo
  16-localizacao.css          localização e mapa
  17-cta-final.css            chamada final
  18-rodape.css               rodapé e privacidade (LGPD)
js/                         comportamento (JavaScript)
  animacoes.js                animações ao rolar a página
  cabecalho.js                esconde/mostra o cabeçalho ao rolar
  menu-mobile.js              menu hambúrguer no celular
  depoimentos.js              faixa de depoimentos em loop
  tema.js                     tema claro/escuro
  autoavaliacao.js            quiz que monta a mensagem para o WhatsApp
  espaco-carrossel.js         fotos e carrossel "Nosso espaço"
assets/
  img/                        autoavaliação e imagem de prévia (og-image)
    equipe/                   fotos da equipe
    espaco/                   fotos do espaço
  video/                      vídeos de depoimentos e suas capas
  icons/                      favicon e ícones para celular
scripts/
  definir-dominio.py          troca SEUDOMINIO.com.br pelo domínio (não precisa subir)
robots.txt, sitemap.xml     ajudam o Google a encontrar o site (ficam na raiz)
```

Os arquivos de CSS são numerados porque **a ordem importa**: o `index.html` carrega na sequência 01 → 18, e regras de um arquivo posterior podem sobrescrever as de um anterior. Ao criar um arquivo novo, adicione o `<link>` dele no `index.html`.

## Rodar no computador

Abra um terminal nesta pasta e use um dos comandos:

```bash
npx serve .                 # com Node.js
python -m http.server 8080  # com Python
```

Depois acesse http://localhost:8080 (ou o endereço que o `serve` mostrar).

## Publicar na Hostinger

1. **Coloque o domínio** (antes de subir):

   ```bash
   python scripts/definir-dominio.py meudominio.com.br
   ```

   Ou troque `SEUDOMINIO.com.br` pelo domínio à mão em `index.html`, `robots.txt` e `sitemap.xml`.

2. **Suba os arquivos**
   - hPanel → Sites → gerencie o site com o domínio.
   - Gerenciador de Arquivos → `public_html` → apague os arquivos de exemplo.
   - Envie `index.html`, `robots.txt`, `sitemap.xml` e as pastas `css/`, `js/` e `assets/`. O `index.html` fica direto dentro de `public_html`. Dica: envie um `.zip` e use "Extrair".
   - Segurança → SSL: ative o SSL gratuito e "Forçar HTTPS".
   - Faça o `www` redirecionar para o endereço principal.

3. **Confira**
   - Abra no celular e no computador.
   - Faça a autoavaliação até o fim e clique no botão do WhatsApp.
   - Toque nos vídeos de depoimentos e nos ícones do YouTube e do Instagram.
   - Cole o link no WhatsApp e veja se a imagem de prévia aparece.

## Depois de publicar

- Cadastre o site no Google Meu Negócio e no Search Console (envie o `sitemap.xml`).
- O texto de privacidade (LGPD) fica no rodapé. Recomenda-se que a clínica o revise com seu responsável jurídico.

## Contato

WhatsApp: [(61) 99162-4072](https://wa.me/5561991624072) · E-mail: connectfisioterapia@gmail.com
