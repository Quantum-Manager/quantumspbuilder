document.addEventListener('DOMContentLoaded' ,function () {

    window.QuantummanagerSpbuilder = {
        fieldWrap: false,
        wrapClick: null
    };

    document.querySelector('body').addEventListener('click', function (ev) {
        let search = ev.target;
        let searchMaxNode = 20;
        let currentNode = 0;

        while (true) {

            if(currentNode > searchMaxNode) {
                break;
            }

            if(search.classList.contains('media-action-button')) {
                QuantummanagerSpbuilder.wrapClick = search.closets('.sp-pagebuilder-form-group');
                setTimeout(function () {
                    openModal();
                }, 300);
                break;
            } else {

                search = search.parentNode;
                currentNode++;

            }

        }

    });


    function openModal() {
        let modal = document.querySelector('#sp-pagebuilder-media-modal');
        if(modal === null) {
            return;
        }

        modal.innerHTML = '<iframe src="index.php?option=com_ajax&plugin=quantumspbuilder&group=system&format=html&tmpl=component" style="width: 100%;height: 100%">';
    }


});