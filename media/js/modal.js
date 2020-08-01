document.addEventListener('DOMContentLoaded' ,function () {

    window.QuantummanagerSpbuilder = {
        fieldWrap: false,
        wrapClick: null
    };

    document.querySelector('body').addEventListener('click', function (ev) {
        QuantummanagerSpbuilder.wrapClick = ev.target;
    });


});