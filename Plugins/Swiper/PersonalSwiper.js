var swiper = new Swiper(".mySwiper", {
    spaceBetween: 2,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: false,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 20,
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
    thumbs: {
        swiper: swiper,
    },
});