var noOverwrite=false;
var alertText;
var clientPC=navigator.userAgent.toLowerCase();
var is_gecko=((clientPC.indexOf("gecko")!=-1)&&(clientPC.indexOf("spoofer")==-1)&&(clientPC.indexOf("khtml")==-1)&&(clientPC.indexOf("netscape/7.0")==-1));
var is_safari=((clientPC.indexOf("AppleWebKit")!=-1)&&(clientPC.indexOf("spoofer")==-1));
function addButton(f,a,c,b,e){a=escapeQuotes(a);
c=escapeQuotes(c);
b=escapeQuotes(b);
e=escapeQuotes(e);
var g="";
if(!document.selection&&!is_gecko){var d=new RegExp("\\\\n","g");
c=c.replace(d,"");
b=b.replace(d,"");
g="onMouseover=\"if(!noOverwrite){document.infoform.infobox.value='"+c+e+b+"'};\""
}document.write('<a href="javascript:insertTags');
document.write("('"+c+"','"+b+"','"+e+"');\">");
document.write('<img src="'+f+'" border="0" ALT="'+a+'" TITLE="'+a+'"'+g+">");
document.write("</a>");
return
}function escapeQuotes(b){var a=new RegExp("'","g");
b=b.replace(a,"\\'");
a=new RegExp('"',"g");
b=b.replace(a,"&quot;");
a=new RegExp("\\n","g");
b=b.replace(a,"\\n");
return b
}function insertTags(i,a,b){var k=document.forms.edit.content;
if(!k){k=document.getElementById("content")
}if(document.selection&&!is_gecko){var l=document.selection.createRange().text;
if(!l){l=b
}k.focus();
if(l.charAt(l.length-1)==" "){l=l.substring(0,l.length-1);
document.selection.createRange().text=i+l+a+" "
}else{document.selection.createRange().text=i+l+a
}}else{if(k.selectionStart||k.selectionStart=="0"){var j=k.selectionStart;
var c=k.selectionEnd;
var e=k.scrollTop;
var d=(k.value).substring(j,c);
if(!d){d=b
}if(d.charAt(d.length-1)==" "){subst=i+d.substring(0,(d.length-1))+a+" "
}else{subst=i+d+a
}k.value=k.value.substring(0,j)+subst+k.value.substring(c,k.value.length);
k.focus();
var n=j+(i.length+d.length+a.length);
k.selectionStart=n;
k.selectionEnd=n;
k.scrollTop=e
}else{var h=alertText;
var g=new RegExp("\\$1","g");
var f=new RegExp("\\$2","g");
h=h.replace(g,b);
h=h.replace(f,i+b+a);
var m;
if(b){m=prompt(h)
}else{m=""
}if(!m){m=b
}m=i+m+a;
document.infoform.infobox.value=m;
if(!is_safari){k.focus()
}noOverwrite=true
}}if(k.createTextRange){k.caretPos=document.selection.createRange().duplicate()
}};