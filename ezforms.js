/**
 * Created by robbackus on 12/29/16.
 */

var path = "/ezforms/";
var pageScripts = document.getElementsByTagName('script');
var coreAppFound = false;

for(var i = 0; i < pageScripts.length; i++){
    if(pageScripts[i].outerHTML.indexOf('/core.app.js') > -1){
        coreAppFound = true;
    }
}

if(!coreAppFound){
    var polyfills = document.createElement('script');
    polyfills.type = 'text/javascript';
    polyfills.src = path + 'js/core.polyfills.js';

    document.getElementsByTagName('body')[0].appendChild(polyfills);
    polyfills.onload = initVendor;

    function initVendor(){
        var vendor = document.createElement('script');
        vendor.type = 'text/javascript';
        vendor.src = path + 'js/core.vendor.js';

        document.getElementsByTagName('body')[0].appendChild(vendor);
        vendor.onload = initApp
    }

    function initApp(){
        setTimeout(function(){
            var app = document.createElement('script');
            app.type = 'text/javascript';
            app.src = path + 'js/core.app.js';

            document.getElementsByTagName('body')[0].appendChild(app);
        },50)
    }
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var session = getParameterByName('session');
var formID = getParameterByName('formid');
var appID = getParameterByName('appid');
var mode = getParameterByName('mode');
var options = null;
if(getParameterByName('options')){
    options = JSON.parse(decodeURI(getParameterByName('options')));
}
var ref = null;
if(getParameterByName('ref')){
    ref = decodeURI(getParameterByName('ref'))
}

var exec;

function nav() {
    if(ref){
        location.href = ref;
    } else {
        window.history.back();
    }
}

function executeMode(){
    if (session && formID) {
        Ezforms.useSession(session)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render()
                    });
                Ezforms.events.subscribe('renderDestroy', nav);
                Ezforms.events.subscribe('formDestroy', nav);
                Ezforms.events.subscribe('formSubmit', nav);
            });

    } else if (window.self !== window.top) {

        var iframeOptions = {
            allowSave: parseInt(getParameterByName('allowSave')),
            allowPageChange: parseInt(getParameterByName('allowPageChange')),
            showTopMenu: parseInt(getParameterByName('showTopMenu')),
            showBottomMenu: parseInt(getParameterByName('showBottomMenu')),
            allowPageImages: parseInt(getParameterByName('allowPageImages')),
            allowRowImages: parseInt(getParameterByName('allowRowImages')),
            allowPageNotes: parseInt(getParameterByName('allowPageNotes')),
            allowRowNotes: parseInt(getParameterByName('allowRowNotes'))
        };


        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render(iframeOptions)
                    })
            });

    } else if (formID && appID) {


        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render()
                    })
            });
    }
}

function previewMode(){
    if (session && formID) {
        Ezforms.useSession(session)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;

                        exec.render()
                    });
                Ezforms.events.subscribe('renderDestroy', nav);
                Ezforms.events.subscribe('formDestroy', nav);
                Ezforms.events.subscribe('formSubmit', nav);
            });

    } else if (window.self !== window.top) {

        var iframeOptions = {
            allowSave: parseInt(getParameterByName('allowSave')),
            allowPageChange: parseInt(getParameterByName('allowPageChange')),
            showTopMenu: parseInt(getParameterByName('showTopMenu')),
            showBottomMenu: parseInt(getParameterByName('showBottomMenu')),
            allowPageImages: parseInt(getParameterByName('allowPageImages')),
            allowRowImages: parseInt(getParameterByName('allowRowImages')),
            allowPageNotes: parseInt(getParameterByName('allowPageNotes')),
            allowRowNotes: parseInt(getParameterByName('allowRowNotes'))
        };


        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render(iframeOptions)
                    })
            });

    } else if (formID && appID) {


        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.exec(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render()
                    })
            });
    }
}


function completedMode(){
    if (session && formID) {
        Ezforms.useSession(session)
            .then(function () {
                Ezforms.form.completed(formID)
                    .then(function (form) {
                        exec = form;
                        if(options){
                            exec.render(options)
                        } else {
                            exec.render({showTopMenu:true})
                        }
                    });
                Ezforms.events.subscribe('renderDestroy', nav);
                Ezforms.events.subscribe('formDestroy', nav);
            });

    } else {
        throw "Form id is not found of not a valid Completed Form."
    }
}

function resumeMode(){
    if (session && formID) {
        Ezforms.useSession(session)
            .then(function () {
                Ezforms.form.resume(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render()
                    });
                Ezforms.events.subscribe('renderDestroy', nav);
                Ezforms.events.subscribe('formDestroy', nav);
                Ezforms.events.subscribe('formSubmit', nav);
            });

    } else if (window.self !== window.top) {

        var iframeOptions = {
            allowSave: parseInt(getParameterByName('allowSave')),
            allowPageChange: parseInt(getParameterByName('allowPageChange')),
            showTopMenu: parseInt(getParameterByName('showTopMenu')),
            showBottomMenu: parseInt(getParameterByName('showBottomMenu')),
            allowPageImages: parseInt(getParameterByName('allowPageImages')),
            allowRowImages: parseInt(getParameterByName('allowRowImages')),
            allowPageNotes: parseInt(getParameterByName('allowPageNotes')),
            allowRowNotes: parseInt(getParameterByName('allowRowNotes'))
        };

        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.resume(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render(iframeOptions)
                    })
            });

    } else if (formID && appID) {
        Ezforms.publicSession(appID, formID)
            .then(function () {
                Ezforms.form.resume(formID)
                    .then(function (form) {
                        exec = form;
                        exec.render()
                    })
            });
    }
}

function checkSDKReady() {
    if (typeof Ezforms != 'undefined') {

        switch (mode){
            case 'execute':
                executeMode();
                break;
            case 'completed':
                completedMode();
                break;
            case 'resume':
                resumeMode();
                break;
            case 'preview':
                previewMode();
                break;
            default:
                break;
        }

    } else {
        setTimeout(function () {
            checkSDKReady();
        }, 10)
    }
}
checkSDKReady();