var TinyMCE_wikipluginPlugin={getInfo:function(){return{longname:"Wiki Plugin"}
},initInstance:function(a){},execCommand:function(d,a,c,e,b){return false
},handleNodeChange:function(f,d,e,c,a,b){return true
},setupContent:function(c,a,b){},onChange:function(a){},handleEvent:function(a){top.status="wiki plugin event: "+a.type;
return true
},cleanup:function(a,b,c){switch(a){case"get_from_editor":b=wikiEditor.convertInternal(b);
break;
case"insert_to_editor":b=wikiEditor.convertExternal(b);
break;
case"get_from_editor_dom":b=wikiEditor.tagListInternal(b);
break;
case"insert_to_editor_dom":break
}return b
}};
tinyMCE.addPlugin("wikiplugin",TinyMCE_wikipluginPlugin);