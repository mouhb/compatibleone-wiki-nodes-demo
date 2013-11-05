function init(){var g=tinyMCE.getWindowArg("text").toString();
var b=tinyMCE.getWindowArg("href").toString();
var e=tinyMCE.getWindowArg("target").toString();
document.forms[0].wiki_text.value=g;
document.forms[0].web_text.value=g;
document.forms[0].file_text.value=g;
document.forms[0].attach_text.value=g;
document.forms[0].email_text.value=g;
document.forms[0].wiki_page.value=g;
if(linkPopupHasTab("wiki_tab")){document.getElementById("wiki_tab").className="current";
document.getElementById("wiki_panel").className="current"
}else{if(linkPopupHasTab("web_tab")){document.getElementById("web_tab").className="current";
document.getElementById("web_panel").className="current"
}else{if(linkPopupHasTab("attachments_tab")){document.getElementById("attachments_tab").className="current";
document.getElementById("attachments_panel").className="current"
}else{if(linkPopupHasTab("file_tab")){document.getElementById("file_tab").className="current";
document.getElementById("file_panel").className="current"
}else{if(linkPopupHasTab("email_tab")){document.getElementById("email_tab").className="current";
document.getElementById("email_panel").className="current"
}}}}}if((b!=null)&&(b!="")){if(b.search(/(https?|ftp):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/gi)>-1){if(linkPopupHasTab("web_tab")){mcTabs.displayTab("web_tab","web_panel");
document.forms[0].web_page.value=b;
document.forms[0].web_target.value=e
}}else{if(b.search(/wikiattachment:-:(.*?)/gi)>-1){if(linkPopupHasTab("attachments_tab")){mcTabs.displayTab("attachments_tab","attachments_panel");
document.forms[0].attach_file.value=b.replace(/wikiattachment:-:/gi,"").replace(/%20/gi," ")
}}else{if(b.search(/mailto:(.*?)/gi)>-1){if(linkPopupHasTab("email_tab")){mcTabs.displayTab("email_tab","email_panel");
document.forms[0].email.value=b.replace(/mailto:/gi,"")
}}else{if(b.search(/file:(\/\/\/\/\/)(.*?)/gi)>-1){if(linkPopupHasTab("file_tab")){mcTabs.displayTab("file_tab","file_panel")
}}else{if(b.search(/file:(\/\/)(.*?)/gi)>-1){if(linkPopupHasTab("file_tab")){mcTabs.displayTab("file_tab","file_panel")
}}else{if(linkPopupHasTab("wiki_tab")){mcTabs.displayTab("wiki_tab","wiki_panel");
var d="",a=b;
if(b.indexOf(".")>-1){d=b.substring(0,b.indexOf("."));
a=b.substring(b.indexOf(".")+1,b.length)
}document.forms[0].wiki_space.value=d;
document.forms[0].wiki_page.value=a;
document.forms[0].wiki_target.value=e
}}}}}}}document.forms[0].insert.value=tinyMCE.getLang("lang_"+tinyMCE.getWindowArg("action"),"Insert",true);
var c=tinyMCE.getWindowArg("className");
var f=tinyMCE.getWindowArg("editor_id")
}function insertLink(){var i=document.getElementById("wiki_tab");
var n=document.getElementById("web_tab");
var b=document.getElementById("file_tab");
var c=document.getElementById("attachments_tab");
var g=document.getElementById("email_tab");
var f;
tinyMCEPopup.restoreSelection();
if(i!=null&&i.className=="current"){var d=document.forms[0].wiki_page.value;
var a=document.forms[0].wiki_space.value;
var e=document.forms[0].wiki_text.value;
var h=document.forms[0].wiki_target.value;
tinyMCE.themes.wikieditor.insertLink(d,h,e,a,"",f,"")
}else{if(n!=null&&n.className=="current"){var m=document.forms[0].web_text.value;
var d=document.forms[0].web_page.value;
var h=document.forms[0].web_target.value;
tinyMCE.themes.wikieditor.insertLink(d,h,m,"","",f,"")
}else{if(c!=null&&c.className=="current"){var d=document.forms[0].attach_file.value;
var l=document.forms[0].attach_text.value;
tinyMCE.themes.wikieditor.insertLink("wikiattachment:-:"+d,"",l,"","",f,"")
}else{if(b!=null&&b.className=="current"){var l=document.forms[0].file_text.value;
var d=document.forms[0].filepaths.value;
var k="";
if(":"==d.charAt(d.indexOf("\\")-1)){k="file://"+d.replace(/\\/gi,"/")
}else{if(d.substring(0,2)=="\\\\"){k="file:///"+d.replace(/\\/gi,"/")
}}tinyMCE.themes.wikieditor.insertLink(k,"",l,"","",f,"")
}else{if(g!=null&&g.className=="current"){var l=document.forms[0].email_text.value;
var j=document.forms[0].email.value;
d="mailto:"+j;
tinyMCE.themes.wikieditor.insertLink(d,"",l,"","",f,"")
}}}}}tinyMCEPopup.close()
}function cancelAction(){tinyMCEPopup.close()
}function populateWikiForm(a){document.forms[0].href.value=a
}function updateAttachName(b){b.xredirect.value=location;
var c=b.filepath.value;
if(c==""){return false
}var a=c.lastIndexOf("\\");
if(a==-1){a=c.lastIndexOf("/")
}c=c.substring(a+1);
if(b.filename.value==c){return true
}if(b.filename.value==""){b.filename.value=c
}return true
}function linkPopupHasTab(h){var g=tinyMCE.getParam("use_linkeditor_tabs");
if(g==null||g==""){g="wiki_tab"
}var a=g.split(",");
var c=false;
for(var b=0;
b<a.length;
b++){var e=/(\S+(\s+\S+)*)+/i;
var f=e.exec(a[b]);
var d=(f&&f[1])?f[1]:"";
if(d==h){c=true
}}return c
};