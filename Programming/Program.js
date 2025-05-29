//Per activar el logo mobile
const toggle = document.getElementById('LogoMobile');
const menu = document.getElementById('Menu');
const logomobilecontainer = document.getElementById('HeaderMobile');

toggle.addEventListener('click', function () {
  const isHidden = menu.style.display === 'none' || menu.style.display === '';

  if (isHidden) {
    menu.style.display = 'flex';
    logomobilecontainer.style.display = 'flex';
  } else {
    menu.style.display = 'none';
    logomobilecontainer.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.fa-xmark').addEventListener('click', function () {
    document.getElementById('Menu').style.display = 'none';
  });
});

//Per canviar idioma
document
  .getElementById('LanguageSelect')
  .addEventListener('change', function () {
    const selectedLang = this.value;
    loadLanguage(selectedLang);
    localStorage.setItem('language', selectedLang);
  });

function loadLanguage(lang) {
  fetch('Programming/lang.json').then(res => res.json()).then(data => {
    const t = data[lang];

    document.title = t.title;

    document.querySelector('[data-i18n="menu_home"]').textContent =
      t.menu_home;
    document.querySelector('[data-i18n="menu_projects"]').textContent =
      t.menu_projects;
    document.querySelector('[data-i18n="menu_skills"]').textContent =
      t.menu_skills;
    document.querySelector('[data-i18n="menu_about"]').textContent =
      t.menu_about;
    document.querySelector('[data-i18n="button_contact"]').textContent =
      t.button_contact;
    document.querySelector('[data-i18n="main_title"]').textContent =
      t.main_title;
    document.querySelector('[data-i18n="main_subtitle"]').textContent =
      t.main_subtitle;
    document.querySelector('[data-i18n="main_tags"]').innerHTML = t.main_tags;
    document.querySelector('[data-i18n="see_cv"]').textContent = t.see_cv;
    document.querySelector(
      '[data-i18n="copyright"]'
    ).innerHTML = `&#169; ${t.copyright}`;
    document.querySelector('[data-i18n="TextAppBlender"]').textContent =
      t.TextAppBlender;
    document.querySelector('[data-i18n="TextAppPhotoshop"]').textContent =
      t.TextAppPhotoshop;
    document.querySelector('[data-i18n="TextAppSubstancePainter"]').textContent =
      t.TextAppSubstancePainter;
    document.querySelector('[data-i18n="TextAppVisualStudioCode"]').textContent =
      t.TextAppVisualStudioCode;
    document.querySelector('[data-i18n="DaVinciResolve"]').textContent =
      t.DaVinciResolve;
    document.querySelector('[data-i18n="textaboutme"]').textContent =
      t.textaboutme;
    document.querySelector('[data-i18n="Contact_TitleForm"]').textContent =
      t.Contact_TitleForm;
    document.querySelector('[data-i18n="Name_SurnameForm"]').textContent =
      t.Name_SurnameForm;
    document.querySelector('[data-i18n="EmailForm"]').textContent =
      t.EmailForm;
    document.querySelector('[data-i18n="ServicesForm"]').textContent =
      t.ServicesForm;
    document.querySelector('[data-i18n="OptionHiddenSelectForm"]').textContent =
      t.OptionHiddenSelectForm;
    document.querySelector('[data-i18n="OptionSelectMod3dForm"]').textContent =
      t.OptionSelectMod3dForm;
    document.querySelector('[data-i18n="OptionSelectDissWebForm"]').textContent =
      t.OptionSelectDissWebForm;
    document.querySelector('[data-i18n="OptionSelectText3DForm"]').textContent =
      t.OptionSelectText3DForm;
    document.querySelector('[data-i18n="OptionSelectDevGame2D3DForm"]').textContent =
      t.OptionSelectDevGame2D3DForm;
    document.querySelector('[data-i18n="OptionSelectEditImagVidForm"]').textContent =
      t.OptionSelectEditImagVidForm;
    document.querySelector('[data-i18n="CommentsForm"]').textContent =
      t.CommentsForm;
  });
}

function loadLanguage(lang) {
  fetch("Programming/lang.json")
    .then(res => res.json())
    .then(data => {
      const t = data[lang];

      for (const key in t) {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) {
          if (key === "main_tags" || key === "copyright") {
            el.innerHTML = t[key];
          } else {
            el.textContent = t[key];
          }
        }
      }

      document.title = t.title;
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem('language') || 'ca';
  document.getElementById('LanguageSelect').value = defaultLang;
  loadLanguage(defaultLang);
});
