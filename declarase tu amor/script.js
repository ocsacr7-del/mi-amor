function moverAleatoriamente(btn) {
    btn.style.position = "absolute";
    btn.style.fontWeight = "bolder";
    btn.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    btn.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

document.addEventListener("DOMContentLoaded", function () {
    const btnNo = document.querySelector("#btn-random");
    if (btnNo) {
        btnNo.addEventListener("mouseenter", function (e) {
            moverAleatoriamente(e.target);
        });
    }
});
