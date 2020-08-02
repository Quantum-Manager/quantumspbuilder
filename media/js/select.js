document.addEventListener('DOMContentLoaded' ,function () {
    let QuantummanagerSpbuilder = window.parent.QuantummanagerSpbuilder,
        pathFile = '';

    setTimeout(function () {
        let fm = window.QuantummanagerLists[0];
        fm.Quantumtoolbar.buttonAdd('insertFileEditor', 'center', 'file-actions', 'btn-insert btn-primary btn-hide', QuantumwindowLang.buttonInsert, 'quantummanager-icon-insert-inverse', {}, function (ev) {

            jQuery.get(QuantumUtils.getFullUrl("/administrator/index.php?option=com_quantummanager&task=quantumviewfiles.getParsePath&path=" + encodeURIComponent(pathFile)
                + '&scope=' + fm.data.scope + '&v=' + QuantumUtils.randomInteger(111111, 999999)))
                .done(function (response) {
                    response = JSON.parse(response);
                    QuantummanagerSpbuilder.browse.click();

                    let loadFolder = function(folder) {
                        let listFiles =  QuantummanagerSpbuilder.modal.querySelector('.sp-pagebuilder-media');
                        let folders = listFiles.querySelectorAll('.sp-pagebuilder-media-folder');
                        let findFolder = false;

                        for (let i=0;i<folders.length;i++) {
                            if(folders[i].querySelector('.sp-pagebuilder-media-title').innerHTML === folder) {
                                QuantumUtils.triggerElementEvent('dblclick', folders[i]);
                                let startTime = new Date().getTime();
                                while (true) {

                                    if((new Date().getTime()) - startTime > 3000) {
                                        break;
                                    }

                                    if(listFiles.querySelectorAll('.sp-pagebuilder-media-folder').length > 0) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }

                    response.path = response.path.replace('images/', '');

                    let path_split = response.path.split('/');
                    let file = path_split[path_split.length-1];
                    let count = path_split.length-1;
                    let current = 0;

                    while (true) {
                        if(current >= count) {

                            let listFiles =  QuantummanagerSpbuilder.modal.querySelector('.sp-pagebuilder-media');
                            let files = listFiles.querySelectorAll('.sp-pagebuilder-media-item');
                            for (let i=0;i<files.length;i++) {
                                if(files[i].querySelector('span').getAttribute('title') === file) {
                                    files[i].click();
                                    QuantummanagerSpbuilder.modal.querySelector('#sp-pagebuilder-media-tools .sp-pagebuilder-btn-success').click();
                                    break;
                                }
                            }

                            break;
                        }

                        loadFolder(path_split[current]);
                        current++;
                    }


                });

            ev.preventDefault();
        });
    }, 50);



    QuantumEventsDispatcher.add('clickObject', function (fm) {
        let file = fm.Quantumviewfiles.objectSelect;

        if(file === undefined) {
            fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.add('btn-hide');
            return;
        }
    });

    QuantumEventsDispatcher.add('clickFile', function (fm) {
        let file = fm.Quantumviewfiles.file;
        if(file === undefined) {
            fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.add('btn-hide');
            return;
        }

        let name = file.querySelector('.file-name').innerHTML;
        pathFile = fm.data.path + '/' + name;
        fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.remove('btn-hide');
    });

    QuantumEventsDispatcher.add('dblclickFile', function (fm, n, el) {
        let name = el.querySelector('.file-name').innerHTML;
        pathFile = fm.data.path + '/' + name;

        fm.Quantumtoolbar.buttonsList['insertFileEditor'].click();
    });

    QuantumEventsDispatcher.add('reloadPaths', function (fm) {
        fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.add('btn-hide');
    });

    QuantumEventsDispatcher.add('updatePath', function (fm) {
        fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.add('btn-hide');
    });

    QuantumEventsDispatcher.add('uploadComplete', function (fm) {

        if(fm.Qantumupload.filesLists.length === 0) {
            return
        }

        let name = fm.Qantumupload.filesLists[0];
        pathFile = fm.data.path + '/' + fm.Qantumupload.filesLists[0];
        fm.Quantumtoolbar.buttonsList['insertFileEditor'].classList.remove('btn-hide');
    });



});