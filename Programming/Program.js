const toggle = document.getElementById ('LogoMobile');
const menu = document.getElementById ('Menu');
const logomobilecontainer = document.getElementById ('HeaderMobile');

toggle.addEventListener ('click', function () {
  const isHidden = menu.style.display === 'none' || menu.style.display === '';

  if (isHidden) {
    menu.style.display = 'flex';
    logomobilecontainer.style.display = 'flex';
  } else {
    menu.style.display = 'none';
    logomobilecontainer.style.display = 'none';
  }
});

document.addEventListener ('DOMContentLoaded', function () {
  document.querySelector ('.fa-xmark').addEventListener ('click', function () {
    document.getElementById ('Menu').style.display = 'none';
  });
});

//Per canviar idioma
document
  .getElementById ('LanguageSelect')
  .addEventListener ('change', function () {
    const selectedLang = this.value;
    loadLanguage (selectedLang);
    localStorage.setItem ('language', selectedLang);
  });

function loadLanguage (lang) {
  fetch ('Programming/lang.json').then (res => res.json ()).then (data => {
    const t = data[lang];

    document.title = t.title;

    document.querySelector ('[data-i18n="menu_home"]').textContent =
      t.menu_home;
    document.querySelector ('[data-i18n="menu_projects"]').textContent =
      t.menu_projects;
    document.querySelector ('[data-i18n="menu_skills"]').textContent =
      t.menu_skills;
    document.querySelector ('[data-i18n="menu_about"]').textContent =
      t.menu_about;
    document.querySelector ('[data-i18n="button_contact"]').textContent =
      t.button_contact;
    document.querySelector ('[data-i18n="main_title"]').textContent =
      t.main_title;
    document.querySelector ('[data-i18n="main_subtitle"]').textContent =
      t.main_subtitle;
    document.querySelector ('[data-i18n="main_tags"]').innerHTML = t.main_tags;
    document.querySelector ('[data-i18n="see_cv"]').textContent = t.see_cv;
    document.querySelector (
      '[data-i18n="copyright"]'
    ).innerHTML = `&#169; ${t.copyright}`;
    document.querySelector ('[data-i18n="textaboutme"]').textContent =
      t.textaboutme;
  });
}

function loadLanguage(lang) {
  fetch("Programming/lang.json")
    .then(res => res.json())
    .then(data => {
      const t = data[lang];

      // Recorre totes les claus del JSON i aplica el text si l'element existeix
      for (const key in t) {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) {
          // Si és un camp amb HTML, fem servir innerHTML
          if (key === "main_tags" || key === "copyright") {
            el.innerHTML = t[key];
          } else {
            el.textContent = t[key];
          }
        }
      }

      // També pots actualitzar el <title> per separat
      document.title = t.title;
    });
}

window.addEventListener ('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem ('language') || 'ca';
  document.getElementById ('LanguageSelect').value = defaultLang;
  loadLanguage (defaultLang);
});
