var XWiki=(function(c){var a=c.viewers=c.viewers||{};
a.Comments=Class.create({xcommentSelector:".xwikicomment",initialize:function(){if($("commentscontent")){this.startup()
}if($("Commentstab")){this.container=$("Commentspane");
this.generatorTemplate="commentsinline.vm"
}else{if($$(".main.layoutsubsection").size()>0&&$$(".main.layoutsubsection").first().down("#commentscontent")){this.container=$$(".main.layoutsubsection").first();
this.generatorTemplate="comments.vm"
}}this.addTabLoadListener()
},startup:function(){if($("commentform")){this.form=$("commentform").up("form")
}else{this.form=undefined
}this.loadIDs();
this.addDeleteListener();
this.addReplyListener();
this.addPermalinkListener();
this.addSubmitListener(this.form);
this.addCancelListener();
this.addEditListener();
this.addPreview(this.form)
},loadIDs:function(){$$(this.xcommentSelector).each(function(e){var d=e.id;
e._x_number=d.substring(d.lastIndexOf("_")+1)-0
})
},addDeleteListener:function(){$$(this.xcommentSelector).each(function(d){d=d.down("a.delete");
if(!d){return
}d.observe("click",function(e){d.blur();
e.stop();
if(d.disabled){return
}else{new c.widgets.ConfirmedAjaxRequest(d.readAttribute("href")+(Prototype.Browser.Opera?"":"&ajax=1"),{onCreate:function(){d.disabled=true
},onSuccess:function(){var f=d.up(this.xcommentSelector);
if(this.form&&this.form.descendantOf(f.next(".commentthread"))){this.resetForm()
}f.replace(this.createNotification("$msg.get('core.viewers.comments.commentDeleted')"));
this.updateCount();
if(f.hasClassName("annotation")){document.fire("xwiki:annotation:tab:deleted")
}}.bind(this),onComplete:function(){d.disabled=false
}},{confirmationText:"$msg.get('core.viewers.comments.delete.confirm')",progressMessageText:"$msg.get('core.viewers.comments.delete.inProgress')",successMessageText:"$msg.get('core.viewers.comments.delete.done')",failureMessageText:"$msg.get('core.viewers.comments.delete.failed')"})
}}.bindAsEventListener(this))
}.bind(this))
},addEditListener:function(){$$(this.xcommentSelector).each(function(d){d=d.down("a.edit");
if(!d){return
}d.observe("click",function(e){d.blur();
e.stop();
if(d.disabled){return
}else{if(d._x_editForm){var f=d.up(this.xcommentSelector);
f.hide();
d._x_editForm.show()
}else{new Ajax.Request(d.readAttribute("href").replace("viewer=comments","xpage=xpart&vm=commentsinline.vm"),{onCreate:function(){d.disabled=true;
d._x_notification=new c.widgets.Notification("$msg.get('core.viewers.comments.editForm.fetch.inProgress')","inprogress")
},onSuccess:function(g){if(this.editing){this.cancelEdit(false,this.editing)
}var h=d.up(this.xcommentSelector);
h.insert({before:g.responseText});
d._x_editForm=h.previous();
this.addSubmitListener(d._x_editForm);
this.addPreview(d._x_editForm);
d._x_editForm.down("a.cancel").observe("click",this.cancelEdit.bindAsEventListener(this,d));
h.hide();
d._x_notification.hide();
this.editing=d
}.bind(this),onFailure:function(g){var h=g.statusText;
if(g.statusText==""||g.status==12031){h="Server not responding"
}d._x_notification.replace(new c.widgets.Notification("$msg.get('core.viewers.comments.editForm.fetch.failed')"+h,"error"))
}.bind(this),on0:function(g){g.request.options.onFailure(g)
},onComplete:function(){d.disabled=false
}})
}}}.bindAsEventListener(this))
}.bind(this))
},cancelEdit:function(e,d){if(e){e.stop()
}var f=d.up(this.xcommentSelector);
d._x_editForm.hide();
f.show();
this.cancelPreview(d._x_editForm);
this.editing=false
},addReplyListener:function(){if(this.form){$$(this.xcommentSelector).each(function(d){this.addReplyListenerToComment(d)
}.bind(this))
}else{$$(this.xcommentSelector+" a.commentreply").each(function(d){d.hide()
})
}},addReplyListenerToComment:function(d){d=d.down("a.commentreply");
if(!d){return
}d.observe("click",function(e){d.blur();
e.stop();
if(this.form.up(".commentthread")){this.form.up(".commentthread").previous(this.xcommentSelector).down("a.commentreply").show()
}d.up(this.xcommentSelector).next(".commentthread").insert({top:this.form});
this.form["XWiki.XWikiComments_replyto"].value=d.up(this.xcommentSelector)._x_number;
this.form["XWiki.XWikiComments_comment"].value="";
this.form["XWiki.XWikiComments_comment"].focus();
d.hide()
}.bindAsEventListener(this))
},addPermalinkListener:function(){$$(this.xcommentSelector+" a.permalink").each(function(d){d.observe("click",function(f){d.blur();
f.stop();
var e=new c.widgets.ConfirmationBox({onYes:function(){window.location=d.href
}},{confirmationText:"$msg.get('core.viewers.comments.permalink'): <input type='text' class='full' value='"+d.href+"'/>",yesButtonText:"$msg.get('core.viewers.comments.permalink.goto')",noButtonText:"$msg.get('core.viewers.comments.permalink.hide')"});
e.dialog.addClassName("permalinkBox");
e.dialog.down('input[type="text"]').select()
})
})
},addSubmitListener:function(d){if(d){d.down("input[type='submit']").observe("click",function(f){f.stop();
if(d.down("textarea").value!=""){var g=new Hash(d.serialize(true));
g.set("xredirect",window.docgeturl+"?xpage=xpart&vm="+this.generatorTemplate);
g.set("xpage","xpart");
g.set("vm",this.generatorTemplate);
var e=d.action.replace(/\?.*/,"");
g.unset("action_cancel");
d._x_notification=new c.widgets.Notification("$msg.get('core.viewers.comments.add.inProgress')","inprogress");
d.disable();
this.restartNeeded=false;
new Ajax.Request(e,{method:"post",parameters:g,onSuccess:function(){this.restartNeeded=true;
this.editing=false;
d._x_notification.replace(new c.widgets.Notification("$msg.get('core.viewers.comments.add.done')","done"))
}.bind(this),onFailure:function(h){var i=h.statusText;
if(h.statusText==""||h.status==12031){i="Server not responding"
}d._x_notification.replace(new c.widgets.Notification("$msg.get('core.viewers.comments.add.failed')"+i,"error"))
}.bind(this),on0:function(h){h.request.options.onFailure(h)
},onComplete:function(h){if(this.restartNeeded){this.container.update(h.responseText);
document.fire("xwiki:docextra:loaded",{id:"Comments",element:this.container});
this.updateCount()
}else{d.enable()
}}.bind(this)})
}}.bindAsEventListener(this))
}},addCancelListener:function(){if(this.form){this.initialLocation=new Element("span",{className:"hidden"});
$("_comments").insert(this.initialLocation);
this.form.down("a.cancel").observe("click",this.resetForm.bindAsEventListener(this))
}},addPreview:function(f){if(!f||!c.hasEdit){return
}var d="$xwiki.getURL('__space__.__page__', 'preview')".replace("__space__",encodeURIComponent($$("meta[name=space]")[0].content)).replace("__page__",encodeURIComponent($$("meta[name=page]")[0].content));
f.commentElt=f.down("textarea");
var e=f.down("input[type=submit]").up("div");
f.previewButton=new Element("span",{"class":"buttonwrapper"}).update(new Element("input",{type:"button","class":"button",value:"$msg.get('core.viewers.comments.preview.button.preview')"}));
f.previewButton._x_modePreview=false;
f.previewContent=new Element("div",{"class":"commentcontent commentPreview"});
f.commentElt.insert({before:f.previewContent});
f.previewContent.hide();
e.insert({top:f.previewButton});
f.previewButton.observe("click",function(){if(!f.previewButton._x_modePreview&&!f.previewButton.disabled){f.previewButton.disabled=true;
var g=new c.widgets.Notification("$msg.get('core.viewers.comments.preview.inProgress')","inprogress");
new Ajax.Request(d,{method:"post",parameters:{xpage:"plain",sheet:"",content:f.commentElt.value},onSuccess:function(h){this.doPreview(h.responseText,f);
g.hide()
}.bind(this),on400:function(h){this.doPreview("&nbsp;",f);
g.hide()
}.bind(this),onFailure:function(h){var i=h.statusText;
if(h.statusText==""||h.status==12031){i="Server not responding"
}g.replace(new c.widgets.Notification("$msg.get('core.viewers.comments.preview.failed')"+i,"error"))
},on0:function(h){h.request.options.onFailure(h)
},onComplete:function(h){f.previewButton.disabled=false
}.bind(this)})
}else{this.cancelPreview(f)
}}.bindAsEventListener(this))
},doPreview:function(e,d){d.previewButton._x_modePreview=true;
d.previewContent.update(e);
d.previewContent.show();
d.commentElt.hide();
d.previewButton.down("input").value="$msg.get('core.viewers.comments.preview.button.back')"
},cancelPreview:function(d){d.previewButton._x_modePreview=false;
d.previewContent.hide();
d.previewContent.update("");
d.commentElt.show();
d.previewButton.down("input").value="$msg.get('core.viewers.comments.preview.button.preview')"
},resetForm:function(d){if(d){d.stop()
}if(this.form.up(".commentthread")){this.form.up(".commentthread").previous(this.xcommentSelector).down("a.commentreply").show();
this.initialLocation.insert({after:this.form})
}this.form["XWiki.XWikiComments_replyto"].value="";
this.form["XWiki.XWikiComments_comment"].value="";
this.cancelPreview(this.form)
},updateCount:function(){if($("Commentstab")&&$("Commentstab").down(".itemCount")){$("Commentstab").down(".itemCount").update("$msg.get('docextra.extranb', ['__number__'])".replace("__number__",$$(this.xcommentSelector).size()))
}if($("commentsshortcut")&&$("commentsshortcut").down(".itemCount")){$("commentsshortcut").down(".itemCount").update("$msg.get('docextra.extranb', ['__number__'])".replace("__number__",$$(this.xcommentSelector).size()))
}},addTabLoadListener:function(d){var e=function(f){if(f.memo.id=="Comments"){this.startup()
}}.bindAsEventListener(this);
document.observe("xwiki:docextra:loaded",e)
},createNotification:function(d){var e=new Element("div",{"class":"notification"});
e.update(d);
return e
}});
function b(){return new a.Comments()
}(c.domIsLoaded&&b())||document.observe("xwiki:dom:loaded",b);
return c
}(XWiki||{}));