document.addEventListener('DOMContentLoaded' ,function () {

    window.QuantummanagerSpbuilder = {
        fieldWrap: false
    };

    document.querySelector('body').addEventListener('click', function (ev) {
        let search = ev.target;
        let searchMaxNode = 20;
        let currentNode = 0;
        let find = false;

        while (true) {

            if(find)
            {
                break;
            }

            if(currentNode > searchMaxNode) {
                break;
            }

            if(search === null || search === undefined) {
                break;
            }

            if(search.classList.contains('sp-pagebuilder-form-group'))
            {
                let formGroup = search;
                let startTime = new Date().getTime();
                let waitMediaModal = setInterval(function () {
                    if((new Date().getTime()) - startTime > 1000) {
                        clearInterval(waitMediaModal);
                    }

                    if(formGroup.querySelector('#sp-pagebuilder-media-modal') !== null)
                    {
                        find = true;
                        clearInterval(waitMediaModal);
                        QuantummanagerSpbuilder.fieldWrap = formGroup;
                        openModal();
                    }


                }, 100);
            }

            if(search.classList.contains('media-action-button')) {
                QuantummanagerSpbuilder.fieldWrap = search.closest('.sp-pagebuilder-form-group');
                setTimeout(function () {
                    openModal();
                }, 100);
                break;
            } else {

                search = search.parentNode;
                currentNode++;

            }

        }

    });


    function openModal() {
        let modal = QuantummanagerSpbuilder.fieldWrap.querySelector('#sp-pagebuilder-media-modal');

        if(modal === null) {
            return;
        }

        if(QuantummanagerSpbuilder.fieldWrap.querySelector('.quantumsbuilder') !== null) {
            return;
        }

        //переключаем на просмотр файлов
        let browseAll = modal.querySelectorAll('.sp-pagebuilder-browse-media'),
            browse = browseAll[browseAll.length-1];

        QuantummanagerSpbuilder.browse = browse;
        QuantummanagerSpbuilder.modal = modal;
        QuantummanagerSpbuilder.modalClose = modal.querySelector('.sp-pagebuilder-btn-close-modal');

        let quantumdiv = document.createElement('div');

        quantumdiv.classList.add('quantumsbuilder');
        quantumdiv.appendChild(QuantummanagerSpbuilder.modalClose);
        quantumdiv.innerHTML += '<iframe src="/administrator/index.php?option=com_ajax&plugin=quantumspbuilder&group=system&format=html&tmpl=component" style="width: 100%;height: 100%">';

        QuantummanagerSpbuilder.modal.appendChild(quantumdiv);
        QuantummanagerSpbuilder.modal.classList.add('quantumsbuilder-wrap');


    }


});