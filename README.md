# Fisio Connect

Site da **Fisio Connect — Fisioterapia e Pilates** em Brasília/DF (Buritis).

Página única com os serviços, a equipe, depoimentos em vídeo, convênios, uma autoavaliação que encaminha o paciente para o WhatsApp e o aviso de privacidade (LGPD).

É um site estático: HTML, CSS e JavaScript puros, sem build nem dependências.

## Estrutura

```
index.html              o site completo (código, estilos e scripts)
assets/                 fotos da equipe, do espaço e vídeos de depoimentos
favicon.svg             ícone da aba
icon-192.png            ícone para celular
apple-touch-icon.png    ícone para iPhone
og-image.jpg            imagem de prévia ao compartilhar o link
robots.txt, sitemap.xml ajudam o Google a encontrar o site
definir-dominio.py      troca SEUDOMINIO.com.br pelo domínio real (não precisa subir)
```

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
   python definir-dominio.py meudominio.com.br
   ```

   Ou troque `SEUDOMINIO.com.br` pelo domínio à mão em `index.html`, `robots.txt` e `sitemap.xml`.

2. **Suba os arquivos**
   - hPanel → Sites → gerencie o site com o domínio.
   - Gerenciador de Arquivos → `public_html` → apague os arquivos de exemplo.
   - Envie todo o conteúdo desta pasta. O `index.html` fica direto dentro de `public_html`. Dica: envie um `.zip` e use "Extrair".
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
