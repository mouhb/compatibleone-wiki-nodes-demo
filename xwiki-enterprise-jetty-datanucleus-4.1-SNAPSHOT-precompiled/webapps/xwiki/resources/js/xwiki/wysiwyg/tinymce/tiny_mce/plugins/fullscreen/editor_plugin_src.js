tinyMCE.importPluginLanguagePack("fullscreen","en,tr,sv,cs,fr_ca,zh_cn,da,he,nb,de,hu,ru,ru_KOI8-R,ru_UTF-8,nn,es,cy,is,pl,nl,fr,pt_br");
var TinyMCE_FullScreenPlugin={getInfo:function(){return{longname:"Fullscreen",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_fullscreen.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"fullscreen":return tinyMCE.getButtonHTML(a,"lang_fullscreen_desc","{$pluginurl}/images/fullscreen.gif","mceFullScreen")
}return""
},execCommand:function(g,a,f,h,b){switch(f){case"mceFullScreen":if(tinyMCE.getParam("fullscreen_is_enabled")){window.opener.tinyMCE.execInstanceCommand(tinyMCE.getParam("fullscreen_editor_id"),"mceSetContent",false,tinyMCE.getContent(g));
top.close()
}else{tinyMCE.setWindowArg("editor_id",g);
var d=window.open(tinyMCE.baseURL+"/plugins/fullscreen/fullscreen.htm","mceFullScreenPopup","fullscreen=yes,menubar=no,toolbar=no,scrollbars=no,resizable=yes,left=0,top=0,width="+screen.availWidth+",height="+screen.availHeight);
try{d.resizeTo(screen.availWidth,screen.availHeight)
}catch(c){}}return true
}return false
},handleNodeChange:function(f,d,e,c,a,b){if(tinyMCE.getParam("fullscreen_is_enabled")){tinyMCE.switchClass(f+"_fullscreen","mceButtonSelected")
}return true
}};
tinyMCE.addPlugin("fullscreen",TinyMCE_FullScreenPlugin);