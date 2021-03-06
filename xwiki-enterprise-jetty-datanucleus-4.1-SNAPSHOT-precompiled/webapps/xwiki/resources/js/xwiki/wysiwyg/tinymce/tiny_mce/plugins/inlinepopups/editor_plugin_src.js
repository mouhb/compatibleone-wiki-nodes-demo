var TinyMCE_InlinePopupsPlugin={getInfo:function(){return{longname:"Inline Popups",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_inlinepopups.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
}};
tinyMCE.addPlugin("inlinepopups",TinyMCE_InlinePopupsPlugin);
TinyMCE_Engine.prototype.orgOpenWindow=TinyMCE_Engine.prototype.openWindow;
TinyMCE_Engine.prototype.openWindow=function(e,c){if(c.inline!="yes"||tinyMCE.isOpera||tinyMCE.getParam("plugins").indexOf("inlinepopups")==-1){mcWindows.selectedWindow=null;
c.mce_inside_iframe=false;
this.orgOpenWindow(e,c);
return
}var b,d,f;
c.mce_inside_iframe=true;
tinyMCE.windowArgs=c;
if(e.file.charAt(0)!="/"&&e.file.indexOf("://")==-1){b=tinyMCE.baseURL+"/themes/"+tinyMCE.getParam("theme")+"/"+e.file
}else{b=e.file
}if(!(width=parseInt(e.width))){width=320
}if(!(height=parseInt(e.height))){height=200
}d=(c&&c.resizable)?c.resizable:"no";
f=(c&&c.scrollbars)?c.scrollbars:"no";
height+=18;
for(var a in c){if(typeof(c[a])=="function"){continue
}b=tinyMCE.replaceVar(b,a,escape(c[a]))
}var h=document.getElementById(this.selectedInstance.editorId+"_parent");
var g=tinyMCE.getAbsPosition(h);
g.absLeft+=Math.round((h.firstChild.clientWidth/2)-(width/2));
g.absTop+=Math.round((h.firstChild.clientHeight/2)-(height/2));
mcWindows.open(b,mcWindows.idCounter++,"modal=yes,width="+width+",height="+height+",resizable="+d+",scrollbars="+f+",statusbar="+d+",left="+g.absLeft+",top="+g.absTop)
};
TinyMCE_Engine.prototype.orgCloseWindow=TinyMCE_Engine.prototype.closeWindow;
TinyMCE_Engine.prototype.closeWindow=function(a){if(mcWindows.selectedWindow!=null){mcWindows.selectedWindow.close()
}else{this.orgCloseWindow(a)
}};
TinyMCE_Engine.prototype.setWindowTitle=function(c,b){for(var d in mcWindows.windows){var a=mcWindows.windows[d];
if(typeof(a)=="function"){continue
}if(c.name==a.id+"_iframe"){window.frames[a.id+"_iframe"].document.getElementById(a.id+"_title").innerHTML=b
}}};
function TinyMCE_Windows(){this.settings=new Array();
this.windows=new Array();
this.isMSIE=(navigator.appName=="Microsoft Internet Explorer");
this.isGecko=navigator.userAgent.indexOf("Gecko")!=-1;
this.isSafari=navigator.userAgent.indexOf("Safari")!=-1;
this.isMac=navigator.userAgent.indexOf("Mac")!=-1;
this.isMSIE5_0=this.isMSIE&&(navigator.userAgent.indexOf("MSIE 5.0")!=-1);
this.action="none";
this.selectedWindow=null;
this.lastSelectedWindow=null;
this.zindex=100;
this.mouseDownScreenX=0;
this.mouseDownScreenY=0;
this.mouseDownLayerX=0;
this.mouseDownLayerY=0;
this.mouseDownWidth=0;
this.mouseDownHeight=0;
this.idCounter=0
}TinyMCE_Windows.prototype.init=function(a){this.settings=a;
if(this.isMSIE){this.addEvent(document,"mousemove",mcWindows.eventDispatcher)
}else{this.addEvent(window,"mousemove",mcWindows.eventDispatcher)
}this.addEvent(document,"mouseup",mcWindows.eventDispatcher);
this.doc=document
};
TinyMCE_Windows.prototype.getParam=function(b,a){var c=null;
c=(typeof(this.settings[b])=="undefined")?a:this.settings[b];
if(c=="true"||c=="false"){return(c=="true")
}return c
};
TinyMCE_Windows.prototype.eventDispatcher=function(b){b=typeof(b)=="undefined"?window.event:b;
if(mcWindows.selectedWindow==null){return
}if(mcWindows.isGecko&&b.type=="mousedown"){var d=b.currentTarget;
for(var c in mcWindows.windows){var a=mcWindows.windows[c];
if(a.headElement==d||a.resizeElement==d){a.focus();
break
}}}switch(b.type){case"mousemove":mcWindows.selectedWindow.onMouseMove(b);
break;
case"mouseup":mcWindows.selectedWindow.onMouseUp(b);
break;
case"mousedown":mcWindows.selectedWindow.onMouseDown(b);
break;
case"focus":mcWindows.selectedWindow.onFocus(b);
break
}};
TinyMCE_Windows.prototype.addEvent=function(c,a,b){if(this.isMSIE){c.attachEvent("on"+a,b)
}else{c.addEventListener(a,b,true)
}};
TinyMCE_Windows.prototype.cancelEvent=function(a){if(this.isMSIE){a.returnValue=false;
a.cancelBubble=true
}else{a.preventDefault()
}};
TinyMCE_Windows.prototype.parseFeatures=function(c){c=c.toLowerCase();
c=c.replace(/;/g,",");
c=c.replace(/[^0-9a-z=,]/g,"");
var e=c.split(",");
var a=new Array();
a.left="10";
a.top="10";
a.width="300";
a.height="300";
a.resizable="yes";
a.minimizable="yes";
a.maximizable="yes";
a.close="yes";
a.movable="yes";
a.statusbar="yes";
a.scrollbars="auto";
a.modal="no";
if(c==""){return a
}for(var b=0;
b<e.length;
b++){var d=e[b].split("=");
if(d.length==2){a[d[0]]=d[1]
}}a.left=parseInt(a.left);
a.top=parseInt(a.top);
a.width=parseInt(a.width);
a.height=parseInt(a.height);
return a
};
TinyMCE_Windows.prototype.open=function(c,b,e){this.lastSelectedWindow=this.selectedWindow;
var f=new TinyMCE_Window();
var a,d="",h;
var g=this.getParam("images_path");
e=this.parseFeatures(e);
h="mcWindow_"+b;
f.deltaHeight=18;
if(e.statusbar=="yes"){f.deltaHeight+=13;
if(this.isMSIE){f.deltaHeight+=1
}}width=parseInt(e.width);
height=parseInt(e.height)-f.deltaHeight;
if(this.isMSIE){width-=2
}f.id=h;
f.url=c;
f.name=b;
f.features=e;
this.windows[b]=f;
iframeWidth=width;
iframeHeight=height;
d+='<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">';
d+="<html>";
d+="<head>";
d+="<title>Wrapper iframe</title>";
d+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
d+='<link href="'+this.getParam("css_file")+'" rel="stylesheet" type="text/css" />';
d+="</head>";
d+="<body onload=\"parent.mcWindows.onLoad('"+b+"');\">";
d+='<div id="'+h+'_container" class="mceWindow">';
d+='<div id="'+h+'_head" class="mceWindowHead" onmousedown="parent.mcWindows.windows[\''+b+"'].focus();\">";
d+='  <div id="'+h+'_title" class="mceWindowTitle"';
d+='  onselectstart="return false;" unselectable="on" style="-moz-user-select: none !important;"></div>';
d+='    <div class="mceWindowHeadTools">';
d+="      <a href=\"javascript:parent.mcWindows.windows['"+b+'\'].close();" target="_self" onmousedown="return false;" class="mceWindowClose"><img border="0" src="'+g+'/window_close.gif" /></a>';
d+="    </div>";
d+='</div><div id="'+h+'_body" class="mceWindowBody" style="width: '+width+"px; height: "+height+'px;">';
d+='<iframe id="'+h+'_iframe" name="'+h+'_iframe" frameborder="0" width="'+iframeWidth+'" height="'+iframeHeight+'" src="'+c+'" class="mceWindowBodyIframe" scrolling="'+e.scrollbars+'"></iframe></div>';
if(e.statusbar=="yes"){d+='<div id="'+h+'_statusbar" class="mceWindowStatusbar" onmousedown="parent.mcWindows.windows[\''+b+"'].focus();\">";
if(e.resizable=="yes"){if(this.isGecko){d+='<div id="'+h+'_resize" class="mceWindowResize"><div style="background-image: url(\''+g+"/window_resize.gif'); width: 12px; height: 12px;\"></div></div>"
}else{d+='<div id="'+h+'_resize" class="mceWindowResize"><img onmousedown="parent.mcWindows.windows[\''+b+'\'].focus();" border="0" src="'+g+'/window_resize.gif" /></div>'
}}d+="</div>"
}d+="</div>";
d+="</body>";
d+="</html>";
this.createFloatingIFrame(h,e.left,e.top,e.width,e.height,d)
};
TinyMCE_Windows.prototype.setDocumentLock=function(c){if(c){var e=document.getElementById("mcWindowEventBlocker");
if(e==null){e=document.createElement("div");
e.id="mcWindowEventBlocker";
e.style.position="absolute";
e.style.left="0";
e.style.top="0";
document.body.appendChild(e)
}e.style.display="none";
var d=this.getParam("images_path");
var b=document.body.clientWidth;
var a=document.body.clientHeight;
e.style.width=b;
e.style.height=a;
e.innerHTML='<img src="'+d+'/spacer.gif" width="'+b+'" height="'+a+'" />';
e.style.zIndex=mcWindows.zindex-1;
e.style.display="block"
}else{var e=document.getElementById("mcWindowEventBlocker");
if(mcWindows.windows.length==0){e.parentNode.removeChild(e)
}else{e.style.zIndex=mcWindows.zindex-1
}}};
TinyMCE_Windows.prototype.onLoad=function(name){var win=mcWindows.windows[name];
var id="mcWindow_"+name;
var wrapperIframe=window.frames[id+"_iframe"].frames[0];
var wrapperDoc=window.frames[id+"_iframe"].document;
var doc=window.frames[id+"_iframe"].document;
var winDiv=document.getElementById("mcWindow_"+name+"_div");
var realIframe=window.frames[id+"_iframe"].frames[0];
win.id="mcWindow_"+name;
win.winElement=winDiv;
win.bodyElement=doc.getElementById(id+"_body");
win.iframeElement=doc.getElementById(id+"_iframe");
win.headElement=doc.getElementById(id+"_head");
win.titleElement=doc.getElementById(id+"_title");
win.resizeElement=doc.getElementById(id+"_resize");
win.containerElement=doc.getElementById(id+"_container");
win.left=win.features.left;
win.top=win.features.top;
win.frame=window.frames[id+"_iframe"].frames[0];
win.wrapperFrame=window.frames[id+"_iframe"];
win.wrapperIFrameElement=document.getElementById(id+"_iframe");
mcWindows.addEvent(win.headElement,"mousedown",mcWindows.eventDispatcher);
if(win.resizeElement!=null){mcWindows.addEvent(win.resizeElement,"mousedown",mcWindows.eventDispatcher)
}if(mcWindows.isMSIE){mcWindows.addEvent(realIframe.document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(realIframe.document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(realIframe,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(realIframe,"mouseup",mcWindows.eventDispatcher);
mcWindows.addEvent(realIframe,"focus",mcWindows.eventDispatcher)
}for(var i=0;
i<window.frames.length;
i++){if(!window.frames[i]._hasMouseHandlers){if(mcWindows.isMSIE){mcWindows.addEvent(window.frames[i].document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(window.frames[i].document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(window.frames[i],"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(window.frames[i],"mouseup",mcWindows.eventDispatcher)
}window.frames[i]._hasMouseHandlers=true
}}if(mcWindows.isMSIE){mcWindows.addEvent(win.frame.document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(win.frame.document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(win.frame,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(win.frame,"mouseup",mcWindows.eventDispatcher);
mcWindows.addEvent(win.frame,"focus",mcWindows.eventDispatcher)
}var func=this.getParam("on_open_window","");
if(func!=""){eval(func+"(win);")
}win.focus();
if(win.features.modal=="yes"){mcWindows.setDocumentLock(true)
}};
TinyMCE_Windows.prototype.createFloatingIFrame=function(b,g,f,e,a,c){var d=document.createElement("iframe");
var h=document.createElement("div");
e=parseInt(e);
a=parseInt(a)+1;
h.setAttribute("id",b+"_div");
h.setAttribute("width",e);
h.setAttribute("height",(a));
h.style.position="absolute";
h.style.left=g+"px";
h.style.top=f+"px";
h.style.width=e+"px";
h.style.height=(a)+"px";
h.style.backgroundColor="white";
h.style.display="none";
if(this.isGecko){iframeWidth=e+2;
iframeHeight=a+2
}else{iframeWidth=e;
iframeHeight=a+1
}d.setAttribute("id",b+"_iframe");
d.setAttribute("name",b+"_iframe");
d.setAttribute("border","0");
d.setAttribute("frameBorder","0");
d.setAttribute("marginWidth","0");
d.setAttribute("marginHeight","0");
d.setAttribute("leftMargin","0");
d.setAttribute("topMargin","0");
d.setAttribute("width",iframeWidth);
d.setAttribute("height",iframeHeight);
d.setAttribute("scrolling","no");
d.style.width=iframeWidth+"px";
d.style.height=iframeHeight+"px";
d.style.backgroundColor="white";
h.appendChild(d);
document.body.appendChild(h);
h.innerHTML=h.innerHTML;
if(this.isSafari){window.setTimeout(function(){doc=window.frames[b+"_iframe"].document;
doc.open();
doc.write(c);
doc.close()
},10)
}else{doc=window.frames[b+"_iframe"].window.document;
doc.open();
doc.write(c);
doc.close()
}h.style.display="block";
return h
};
function TinyMCE_Window(){}TinyMCE_Window.prototype.focus=function(){if(this!=mcWindows.selectedWindow){this.winElement.style.zIndex=++mcWindows.zindex;
mcWindows.lastSelectedWindow=mcWindows.selectedWindow;
mcWindows.selectedWindow=this
}};
TinyMCE_Window.prototype.minimize=function(){};
TinyMCE_Window.prototype.maximize=function(){};
TinyMCE_Window.prototype.startResize=function(){mcWindows.action="resize"
};
TinyMCE_Window.prototype.startMove=function(a){mcWindows.action="move"
};
TinyMCE_Window.prototype.close=function(){if(this.frame&&this.frame.tinyMCEPopup){this.frame.tinyMCEPopup.restoreSelection()
}if(mcWindows.lastSelectedWindow!=null){mcWindows.lastSelectedWindow.focus()
}var a=new Array();
for(var d in mcWindows.windows){var c=mcWindows.windows[d];
if(typeof(c)=="function"){continue
}if(c.name!=this.name){a[d]=c
}}mcWindows.windows=a;
var b=mcWindows.doc.getElementById(this.id+"_iframe");
b.parentNode.removeChild(b);
var b=mcWindows.doc.getElementById(this.id+"_div");
b.parentNode.removeChild(b);
mcWindows.setDocumentLock(false)
};
TinyMCE_Window.prototype.onMouseMove=function(d){var f=0;
var c=0;
var b=d.screenX-mcWindows.mouseDownScreenX;
var a=d.screenY-mcWindows.mouseDownScreenY;
switch(mcWindows.action){case"resize":width=mcWindows.mouseDownWidth+(d.screenX-mcWindows.mouseDownScreenX);
height=mcWindows.mouseDownHeight+(d.screenY-mcWindows.mouseDownScreenY);
width=width<100?100:width;
height=height<100?100:height;
this.wrapperIFrameElement.style.width=width+2;
this.wrapperIFrameElement.style.height=height+2;
this.wrapperIFrameElement.width=width+2;
this.wrapperIFrameElement.height=height+2;
this.winElement.style.width=width;
this.winElement.style.height=height;
height=height-this.deltaHeight;
this.containerElement.style.width=width;
this.iframeElement.style.width=width;
this.iframeElement.style.height=height;
this.bodyElement.style.width=width;
this.bodyElement.style.height=height;
this.headElement.style.width=width;
mcWindows.cancelEvent(d);
break;
case"move":this.left=mcWindows.mouseDownLayerX+(d.screenX-mcWindows.mouseDownScreenX);
this.top=mcWindows.mouseDownLayerY+(d.screenY-mcWindows.mouseDownScreenY);
this.winElement.style.left=this.left+"px";
this.winElement.style.top=this.top+"px";
mcWindows.cancelEvent(d);
break
}};
function debug(a){document.getElementById("debug").value+=a+"\n"
}TinyMCE_Window.prototype.onMouseUp=function(a){mcWindows.action="none"
};
TinyMCE_Window.prototype.onFocus=function(b){var c=b.currentTarget;
for(var d in mcWindows.windows){var a=mcWindows.windows[d];
if(typeof(a)=="function"){continue
}if(c.name==a.id+"_iframe"){a.focus();
return
}}};
TinyMCE_Window.prototype.onMouseDown=function(b){var d=mcWindows.isMSIE?this.wrapperFrame.event.srcElement:b.target;
var c=0;
var a=0;
mcWindows.mouseDownScreenX=b.screenX;
mcWindows.mouseDownScreenY=b.screenY;
mcWindows.mouseDownLayerX=this.left;
mcWindows.mouseDownLayerY=this.top;
mcWindows.mouseDownWidth=parseInt(this.winElement.style.width);
mcWindows.mouseDownHeight=parseInt(this.winElement.style.height);
if(this.resizeElement!=null&&d==this.resizeElement.firstChild){this.startResize(b)
}else{this.startMove(b)
}mcWindows.cancelEvent(b)
};
var mcWindows=new TinyMCE_Windows();
mcWindows.init({images_path:tinyMCE.baseURL+"/plugins/inlinepopups/images",css_file:tinyMCE.baseURL+"/plugins/inlinepopups/css/inlinepopup.css"});