$('.FormCar').parsley();

$(function () {
    $('.FormCar').parsley();

    // S'envia el formulari
    $('.FormCar').on('submit', function (e) {
        e.preventDefault();

        if ($('.FormCar').parsley().isValid()) {
            Swal.fire({
                color: "white",
                position: "center",
                icon: "success",
                iconColor: "#28a745",
                title: "El teu missatge s'ha enviat!",
                background: "#000000",
                showConfirmButton: false,
                timer: 2500
            });

            $('.modal').iziModal('close');
        }
    });
});

$('.FormContact').parsley();

$(function () {
    $('.FormContact').parsley();

    // S'envia el formulari
    $('.FormContact').on('submit', function (e) {
        e.preventDefault();

        if ($('.FormContact').parsley().isValid()) {
            Swal.fire({
                color: "white",
                position: "center",
                icon: "success",
                iconColor: "#28a745",
                title: "El teu missatge s'ha enviat!",
                background: "#000000",
                showConfirmButton: false,
                timer: 2500
            });

            $('.modal').iziModal('close');
        }
    });
});