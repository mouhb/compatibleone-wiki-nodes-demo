function getColorPickerHTML(d,c){var a="";
a+='<a id="'+d+'_link" href="javascript:void(0);" onkeydown="pickColor(event,\''+c+"');\" onmousedown=\"pickColor(event,'"+c+"');return false;\">";
a+='<img id="'+d+'" src="../../themes/'+tinyMCE.getParam("theme")+'/images/color.gif"';
a+=" onmouseover=\"this.className='mceButtonOver'\"";
a+=" onmouseout=\"this.className='mceButtonNormal'\"";
a+=" onmousedown=\"this.className='mceButtonDown'\"";
a+=' width="20" height="16" border="0" title="'+tinyMCE.getLang("lang_browse")+'"';
a+=' class="mceButtonNormal" alt="'+tinyMCE.getLang("lang_browse")+'" /></a>';
return a
}function pickColor(c,a){if((c.keyCode==32||c.keyCode==13)||c.type=="mousedown"){tinyMCEPopup.pickColor(c,a)
}}function updateColor(c,a){document.getElementById(c).style.backgroundColor=document.forms[0].elements[a].value
}function setBrowserDisabled(e,c){var a=document.getElementById(e);
var d=document.getElementById(e+"_link");
if(d){if(c){d.setAttribute("realhref",d.getAttribute("href"));
d.removeAttribute("href");
tinyMCE.switchClass(a,"mceButtonDisabled",true)
}else{d.setAttribute("href",d.getAttribute("realhref"));
tinyMCE.switchClass(a,"mceButtonNormal",false)
}}}function getBrowserHTML(i,f,e,h){var d=h+"_"+e+"_browser_callback";
var a=tinyMCE.getParam(d,tinyMCE.getParam("file_browser_callback"));
if(a==null){return""
}var c="";
c+='<a id="'+i+'_link" href="javascript:openBrower(\''+i+"','"+f+"', '"+e+"','"+d+'\');" onmousedown="return false;">';
c+='<img id="'+i+'" src="../../themes/'+tinyMCE.getParam("theme")+'/images/browse.gif"';
c+=" onmouseover=\"this.className='mceButtonOver';\"";
c+=" onmouseout=\"this.className='mceButtonNormal';\"";
c+=" onmousedown=\"this.className='mceButtonDown';\"";
c+=' width="20" height="18" border="0" title="'+tinyMCE.getLang("lang_browse")+'"';
c+=' class="mceButtonNormal" alt="'+tinyMCE.getLang("lang_browse")+'" /></a>';
return c
}function openBrower(c,f,e,d){var a=document.getElementById(c);
if(a.className!="mceButtonDisabled"){tinyMCEPopup.openBrowser(f,e,d)
}}function selectByValue(a,d,j,h,k){if(!a||!a.elements[d]){return
}var c=a.elements[d];
var l=false;
for(var e=0;
e<c.options.length;
e++){var f=c.options[e];
if(f.value==j||(k&&f.value.toLowerCase()==j.toLowerCase())){f.selected=true;
l=true
}else{f.selected=false
}}if(!l&&h&&j!=""){var f=new Option(j,j);
f.selected=true;
c.options[c.options.length]=f;
c.selectedIndex=c.options.length-1
}return l
}function getSelectValue(a,c){var d=a.elements[c];
if(d==null||d.options==null){return""
}return d.options[d.selectedIndex].value
}function addSelectValue(a,e,c,f){var d=a.elements[e];
var h=new Option(c,f);
d.options[d.options.length]=h
}function addClassesToList(d,c){var f=document.getElementById(d);
var k=tinyMCE.getParam("theme_advanced_styles",false);
k=tinyMCE.getParam(c,k);
if(k){var l=k.split(";");
for(var e=0;
e<l.length;
e++){if(l!=""){var j,h;
j=l[e].split("=")[0];
h=l[e].split("=")[1];
f.options[f.length]=new Option(j,h)
}}}else{var a=tinyMCE.getCSSClasses(tinyMCE.getWindowArg("editor_id"));
for(var e=0;
e<a.length;
e++){f.options[f.length]=new Option(a[e],a[e])
}}}function isVisible(a){var c=document.getElementById(a);
return c&&c.style.display!="none"
}function convertRGBToHex(c){var d=new RegExp("rgb\\s*\\(\\s*([0-9]+).*,\\s*([0-9]+).*,\\s*([0-9]+).*\\)","gi");
var a=c.replace(d,"$1,$2,$3").split(",");
if(a.length==3){r=parseInt(a[0]).toString(16);
g=parseInt(a[1]).toString(16);
b=parseInt(a[2]).toString(16);
r=r.length==1?"0"+r:r;
g=g.length==1?"0"+g:g;
b=b.length==1?"0"+b:b;
return"#"+r+g+b
}return c
}function convertHexToRGB(a){if(a.indexOf("#")!=-1){a=a.replace(new RegExp("[^0-9A-F]","gi"),"");
r=parseInt(a.substring(0,2),16);
g=parseInt(a.substring(2,4),16);
b=parseInt(a.substring(4,6),16);
return"rgb("+r+","+g+","+b+")"
}return a
}function trimSize(a){return a.replace(new RegExp("[^0-9%]","gi"),"")
}function getCSSSize(a){a=trimSize(a);
if(a==""){return""
}return a.indexOf("%")!=-1?a:a+"px"
}function getStyle(elm,attrib,style){var val=tinyMCE.getAttrib(elm,attrib);
if(val!=""){return""+val
}if(typeof(style)=="undefined"){style=attrib
}val=eval("elm.style."+style);
return val==null?"":""+val
};