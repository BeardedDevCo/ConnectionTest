/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/Device','./NotificationListBase','sap/ui/core/InvisibleText','sap/ui/core/IconPool','sap/ui/core/ResizeHandler','sap/m/Button','sap/m/Text','./NotificationListItemRenderer'],function(l,D,N,I,a,R,B,T,b){'use strict';var c=l.ButtonType;var d=N.extend('sap.m.NotificationListItem',{metadata:{library:'sap.m',properties:{description:{type:'string',group:'Appearance',defaultValue:''},truncate:{type:'boolean',group:'Appearance',defaultValue:true},hideShowMoreButton:{type:'boolean',group:'Appearance',defaultValue:false}},aggregations:{processingMessage:{type:'sap.m.MessageStrip',multiple:false},_bodyText:{type:'sap.m.Text',multiple:false,visibility:"hidden"}}}});d.prototype.init=function(){N.prototype.init.call(this);var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');this._expandText=r.getText('NOTIFICATION_LIST_ITEM_SHOW_MORE');this._collapseText=r.getText('NOTIFICATION_LIST_ITEM_SHOW_LESS');this._closeText=r.getText('NOTIFICATION_LIST_BASE_CLOSE');this.setType('Active');var _=new B(this.getId()+'-closeButton',{type:c.Transparent,icon:a.getIconURI('decline'),tooltip:this._closeText,press:function(){this.close();}.bind(this)});this.setAggregation("_closeButton",_,true);var e=new B({type:c.Transparent,text:this.getTruncate()?this._expandText:this._collapseText,id:this.getId()+'-expandCollapseButton',press:function(){this._deregisterResize();this.setProperty("truncate",!this.getTruncate(),true);e.setText(this.getTruncate()?this._expandText:this._collapseText);this.$().find('.sapMNLI-Header').toggleClass('sapMNLI-TitleWrapper--is-expanded');this.$().find('.sapMNLI-TextWrapper').toggleClass('sapMNLI-TextWrapper--is-expanded',this.getDescription());this._registerResize();}.bind(this)});e.addEventDelegate({onfocusin:function(){this.getDomRef().setAttribute("aria-hidden",true);},onfocusout:function(){this.getDomRef().setAttribute("aria-hidden",false);}},this);this.setAggregation("_collapseButton",e,true);this._ariaDetailsText=new I({id:this.getId()+'-info'}).toStatic();};d.prototype.setDescription=function(e){var r=this.setProperty('description',e);this._getDescriptionText().setText(e);return r;};d.prototype.setDatetime=function(e){var r=N.prototype.setDatetime.call(this,e);this._updateAriaAdditionalInfo();return r;};d.prototype.setUnread=function(u){var r=this.setProperty('unread',u,true);var t=this.getAggregation('_headerTitle');if(t){t.toggleStyleClass('sapMNLI-Unread',this.getUnread());}return r;};d.prototype.setPriority=function(p,s){var r=this.setProperty('priority',p,s);this._updateAriaAdditionalInfo();return r;};d.prototype.setAuthorPicture=function(e,s){var r=this.setProperty('authorPicture',e,s);this._getAuthorImage().setSrc(e);return r;};d.prototype.onBeforeRendering=function(){this._updateAriaAdditionalInfo();this._deregisterResize();};d.prototype.onAfterRendering=function(){this._registerResize();};d.prototype.onfocusin=function(e){N.prototype.onfocusin.apply(this,arguments);if(!D.browser.msie){return;}var t=e.target;if(t!==this.getDomRef()&&!t.classList.contains('sapMBtn')){e.preventDefault();e.stopImmediatePropagation();this.focus();}};d.prototype.exit=function(){this._deregisterResize();if(this._ariaDetailsText){this._ariaDetailsText.destroy();this._ariaDetailsText=null;}};d.prototype._getDescriptionText=function(){var e=this.getAggregation('_bodyText');if(!e){e=new T({id:this.getId()+'-body',text:this.getDescription(),maxLines:2}).addStyleClass('sapMNLI-Text');this.setAggregation("_bodyText",e,true);}return e;};d.prototype._activeHandling=function(){this.$().toggleClass("sapMNLIActive",this._active);};d.prototype._updateAriaAdditionalInfo=function(){var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');var e=this.getUnread()?r.getText('NOTIFICATION_LIST_ITEM_UNREAD'):r.getText('NOTIFICATION_LIST_ITEM_READ');var f=r.getText('NOTIFICATION_LIST_ITEM_DATETIME_PRIORITY',[this.getDatetime(),this.getPriority()]);var g=this.getAuthorName();var h=e+' ';if(g){h+=r.getText('NOTIFICATION_LIST_ITEM_CREATED_BY')+' '+this.getAuthorName()+' ';}h+=f;this._ariaDetailsText.setText(h);};d.prototype._canTruncate=function(){var t=this.getDomRef('title-inner').scrollHeight,i=this.$('title').parent().height();if(t>i){return true;}if(this.getDomRef('body-inner')){var e=this.getDomRef('body-inner').scrollHeight,f=this.$('body').parent().height();if(e>f){return true;}}return false;};d.prototype._showHideTruncateButton=function(){var n=this.getDomRef(),C=sap.ui.getCore(),h,t,o;if(!n){return;}h=n.querySelector('.sapMNLI-Header');t=n.querySelector('.sapMNLI-TextWrapper');o=this.getDomRef('expandCollapseButton');if(this._canTruncate()&&(!this.getHideShowMoreButton())){if(o){o.classList.remove('sapMNLI-CollapseButtonHide');}if(this.getTruncate()){this.getAggregation('_collapseButton').setText(this._expandText);if(h){h.classList.remove('sapMNLI-TitleWrapper--is-expanded');}if(this.getDescription()&&t){t.classList.remove('sapMNLI-TextWrapper--is-expanded');}}else{this.getAggregation('_collapseButton').setText(this._collapseText);this.$().find('.sapMNLI-TextWrapper').toggleClass('sapMNLI-TextWrapper--is-expanded',this.getDescription());if(h){h.classList.add('sapMNLI-TitleWrapper--is-expanded');}}}else if(o){o.classList.add('sapMNLI-CollapseButtonHide');}if(this.getDescription()&&t){t.classList.remove('sapMNLI-TextWrapper--initial-overwrite');}if(this.getTitle()&&h){h.classList.remove('sapMNLI-TitleWrapper--initial-overwrite');}C.detachThemeChanged(this._showHideTruncateButton,this);};d.prototype._deregisterResize=function(){if(this._sNotificationResizeHandler){R.deregister(this._sNotificationResizeHandler);this._sNotificationResizeHandler=null;}};d.prototype._registerResize=function(){var t=this;var n=this.getDomRef();if(!n){return;}t._resizeNotification();this._sNotificationResizeHandler=R.register(n,function(){t._resizeNotification();});};d.prototype._resizeNotification=function(){var n=this.getDomRef(),o=n.querySelector('.sapMNLI-TextWrapper'),h=n.querySelector('.sapMNLI-Header'),e=sap.ui.getCore();if(n.offsetWidth>=640){n.classList.add('sapMNLI-LSize');}else{n.classList.remove('sapMNLI-LSize');}if(o){o.classList.remove('sapMNLI-TextWrapper--is-expanded');o.classList.add('sapMNLI-TextWrapper--initial-overwrite');}h.classList.remove('sapMNLI-TitleWrapper--is-expanded');h.classList.add('sapMNLI-TitleWrapper--initial-overwrite');if(e.isThemeApplied()){this._showHideTruncateButton();}else{e.attachThemeChanged(this._showHideTruncateButton,this);}};return d;});
