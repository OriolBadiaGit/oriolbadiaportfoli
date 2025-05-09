var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: "3",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4000,
  },
  loop: true,
});