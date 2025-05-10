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