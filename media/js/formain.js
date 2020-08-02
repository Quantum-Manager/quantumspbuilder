document.addEventListener('DOMContentLoaded' ,function () {
    let container = document.querySelector('#j-main-container');
    let sidebar = document.querySelector('#sp-pagebuilder-media-types');
    let li = document.createElement('li');
    let a = document.createElement('a');
    let iframeQuantum = document.createElement('iframe');

    iframeQuantum.setAttribute('src', 'index.php?option=com_quantummanager&layout=modal&tmpl=component');
    iframeQuantum.setAttribute('class', 'quantummanagersp');
    iframeQuantum.style.display = 'none';

    a.setAttribute('class', 'sp-pagebuilder-browse-media sp-pagebuilder-browse-quantummanager');
    a.innerHTML = '<i class="fa fa-folder-open-o fa-fw"></i> Quantum Manager';

    sidebar.addEventListener('click', function (ev) {
        if(ev.target.tagName === 'A') {
            if(ev.target.classList.contains('sp-pagebuilder-browse-quantummanager')) {
                iframeQuantum.style.display = 'block';
            } else {
                iframeQuantum.style.display = 'none';
            }
        }
    });

    li.appendChild(a);
    sidebar.appendChild(li);
    container.appendChild(iframeQuantum);

});