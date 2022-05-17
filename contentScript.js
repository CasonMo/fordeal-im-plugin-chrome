function interceptData() {
    let importJs = document.createElement("script");
    importJs.setAttribute("type", "text/javascript");
    let jquerySrc = localStorage.getItem("jquerySrc");
    if (jquerySrc) {
        console.log("cache loading：" + jquerySrc);
        importJs.setAttribute("src", jquerySrc);
    } else {
        importJs.setAttribute("src", "https://casonmo.github.io/fordeal-im-plugin/jquery2.1.4.min.js");
    }
    let importBxJs = document.createElement("script");
    importBxJs.setAttribute("type", "text/javascript");
    let contentScriptSrc = localStorage.getItem("contentScriptSrc");
    if (contentScriptSrc) {
        console.log("cache loading：" + contentScriptSrc);
        importBxJs.setAttribute("src", contentScriptSrc);
    } else {
        importBxJs.setAttribute("src", "https://casonmo.github.io/fordeal-im-plugin/beixian_fordeal_im_plugin_contentScript.js");
    }

    let xhrOverrideScript = document.createElement('script');
    xhrOverrideScript.type = 'text/javascript';
    xhrOverrideScript.innerHTML = `
   
    var sh=setInterval(function(){
        console.log('execBxContent starting...')
        try{
        let flag=execBxContent();
        if(flag == true){
            console.log('execBxContent started....')
            console.log('enjoy it....')
            clearTimeout(sh);
            return;
        }
        }catch(e){
            console.log('from fordeal-im-plugin :'+e)
        }
    },1000);
        
  `;
    let style = document.createElement('style');
    style.setAttribute("type", "text/css");
    style.innerHTML = `
         .bx_added:link{color: #45c704 !important;}
         .bx_added:visited{color: #f505d6 !important;}
         .bx_added:hover{color:red !important;}
         .bx_added:active{color:gray !important;}
    `;
    (document.head || document.documentElement).prepend(style);
    (document.head || document.documentElement).prepend(xhrOverrideScript);
    (document.head || document.documentElement).prepend(importBxJs);
    (document.head || document.documentElement).prepend(importJs);

}

function checkForDOM() {
    if (document.head || document.documentElement) {
        interceptData();
        console.log('interceptData');
    } else {
        requestIdleCallback(checkForDOM);
    }
}

if (window.location.href.includes("duolainc.com/im") || window.location.href.includes("im.duolainc.com")) {
    checkForDOM();
}






