function interceptData() {
    let importJs = document.createElement("script");
    importJs.setAttribute("type", "text/javascript");
    importJs.setAttribute("src", "https://s3.forcloudcdn.com/files/e/1d/e1de50db_jquery2.1.4.min.js");
    let importBxJs = document.createElement("script");
    importBxJs.setAttribute("type", "text/javascript");
    importBxJs.setAttribute("src", "https://s3.forcloudcdn.com/files/f/f9/ff9c0ad1_beixian_fordeal_im_plugin_contentScript.js");
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






