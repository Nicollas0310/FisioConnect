// Alternância entre tema claro e escuro

// Dark mode / light mode toggle
(function(){
  var toggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('fisioconnect-theme'); } catch (e) {}
  // Always defaults to light mode; only switches to dark if the person explicitly chose it before.
  var theme = stored === 'dark' ? 'dark' : 'light';
  if (theme === 'dark') { root.setAttribute('data-theme', 'dark'); }

  if (toggle){
    toggle.addEventListener('click', function(){
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        try { localStorage.setItem('fisioconnect-theme', 'light'); } catch (e) {}
      } else {
        root.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('fisioconnect-theme', 'dark'); } catch (e) {}
      }
    });
  }
})();
