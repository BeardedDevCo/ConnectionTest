/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/Device','sap/ui/base/DataType','sap/ui/core/library','sap/ui/core/delegate/ItemNavigation','./Button','./Dialog','./library','./ColorPaletteRenderer',"sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(C,D,a,c,I,B,b,l,d,e,K,q){"use strict";var f=c.CSSColor;var g;var h;var i=l.ButtonType;var j=a.getType("boolean");var k="sapMColorPaletteSquare";var S=5;var M=2;var m=15;var L=sap.ui.getCore().getLibraryResourceBundle("sap.m");var n=C.extend("sap.m.ColorPalette",{metadata:{library:"sap.m",properties:{colors:{type:"sap.ui.core.CSSColor[]",group:"Appearance",defaultValue:["gold","darkorange","indianred","darkmagenta","cornflowerblue","deepskyblue","darkcyan","olivedrab","darkslategray","azure","white","lightgray","darkgray","dimgray","black"]}},aggregations:{_defaultColorButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_moreColorsButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{colorSelect:{parameters:{"value":{type:"sap.ui.core.CSSColor"},"defaultAction":{type:"boolean"}}}}}});n.prototype.init=function(){this._oDefaultColor=null;this._bShowDefaultColorButton=false;this._bShowMoreColorsButton=false;this._oMoreColorsDialog=null;this._oItemNavigation=null;};n.prototype.exit=function(){if(this._oMoreColorsDialog){this._oMoreColorsDialog.destroy();delete this._oMoreColorsDialog;}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};n.prototype.setColors=function(p){p=this.validateProperty("colors",p);if(p.length<M||p.length>m){throw new Error("Cannot set property 'colors' - array must has minimum 2 and maximum 15 elements");}return this.setProperty("colors",p);};n.prototype.ontap=function(E){var t=q(E.target),s,$;$=t.closest("."+k);if(!$.length){return;}s=$.attr("data-sap-ui-color");this._fireColorSelect(s,false,E);};n.prototype.onsaptabnext=n.prototype.onsaptabprevious=function(E){var p=this._getElementInfo(E.target);if(p.bIsMoreColorsButton){this.fireEvent("_colorNotSelected",{_originalEvent:E});return;}if(p.bIsDefaultColorButton){this._fireColorSelect(this._getDefaultColor(),true,E);return;}n.prototype.ontap.apply(this,arguments);};n.prototype.onsapenter=n.prototype.ontap;n.prototype.onsapspace=function(E){E.preventDefault();};n.prototype.onkeyup=function(E){if(E.which===K.SPACE){E.preventDefault();n.prototype.ontap.apply(this,arguments);}};n.prototype.onsaphome=n.prototype.onsapend=function(E){var p=this._getElementInfo(E.target);if(p.bIsDefaultColorButton||p.bIsMoreColorsButton){E.preventDefault();E.stopImmediatePropagation(true);}};n.prototype.onAfterRendering=function(){this._ensureItemNavigation();};n.prototype._createDefaultColorButton=function(){return new B(this.getId()+"-btnDefaultColor",{width:"100%",type:i.Transparent,text:L.getText("COLOR_PALETTE_DEFAULT_COLOR"),visible:this._getShowDefaultColorButton(),press:function(E){this._fireColorSelect(this._getDefaultColor(),true,E);}.bind(this)});};n.prototype._getDefaultColor=function(){return this._oDefaultColor;};n.prototype._setDefaultColor=function(p){if(!f.isValid(p)){throw new Error("Cannot set internal property '_defaultColor' - invalid value: "+p);}this._oDefaultColor=p;return this;};n.prototype._getShowDefaultColorButton=function(){return this._bShowDefaultColorButton;};n.prototype._setShowDefaultColorButton=function(v){if(!j.isValid(v)){throw new Error("Cannot set internal property 'showDefaultColorButton' - invalid value: "+v);}this._bShowDefaultColorButton=v;if(v&&!this._getDefaultColorButton()){this.setAggregation("_defaultColorButton",this._createDefaultColorButton());}if(this._getDefaultColorButton()){this._getDefaultColorButton().setVisible(v);}return this;};n.prototype._getDefaultColorButton=function(){return this.getAggregation("_defaultColorButton");};n.prototype._createMoreColorsButton=function(){return new B(this.getId()+"-btnMoreColors",{width:"100%",type:i.Transparent,text:L.getText("COLOR_PALETTE_MORE_COLORS"),visible:this._getShowMoreColorsButton(),press:this._openColorPicker.bind(this)});};n.prototype._getShowMoreColorsButton=function(){return this._bShowMoreColorsButton;};n.prototype._setShowMoreColorsButton=function(v){if(!j.isValid(v)){throw new Error("Cannot set internal property 'showMoreColorsButton' - invalid value: "+v);}this._bShowMoreColorsButton=v;if(v&&!this._getMoreColorsButton()){this.setAggregation("_moreColorsButton",this._createMoreColorsButton());}if(this._getMoreColorsButton()){this._getMoreColorsButton().setVisible(v);}return this;};n.prototype._getMoreColorsButton=function(){return this.getAggregation("_moreColorsButton");};n.prototype._openColorPicker=function(){this.fireEvent("_beforeOpenColorPicker");this._ensureMoreColorsDialog().open();};n.prototype._ensureMoreColorsDialog=function(){if(!this._oMoreColorsDialog){this._oMoreColorsDialog=this._createMoreColorsDialog();}return this._oMoreColorsDialog;};n.prototype._createMoreColorsDialog=function(){var p=new b(this.getId()+"-moreColorsDialog",{stretch:!!D.system.phone,title:L.getText("COLOR_PALETTE_MORE_COLORS_TITLE")}).addStyleClass("CPDialog");this._ensureUnifiedLibrary();p.addContent(p._oColorPicker=new g({mode:h.HSL}));p.setBeginButton(new B({text:L.getText("COLOR_PALETTE_MORE_COLORS_CONFIRM"),press:function(E){p.close();if(p._oColorPicker.getColorString()){this._fireColorSelect(p._oColorPicker.getColorString(),false,E);}}.bind(this)}));p.setEndButton(new B({text:L.getText("COLOR_PALETTE_MORE_COLORS_CANCEL"),press:function(){p.close();}}));return p;};n.prototype._ensureUnifiedLibrary=function(){var u;if(!g){sap.ui.getCore().loadLibrary("sap.ui.unified");u=sap.ui.require("sap/ui/unified/library");g=sap.ui.requireSync("sap/ui/unified/ColorPicker");h=u.ColorPickerMode;}};n.prototype._focusFirstElement=function(){var F=this._getShowDefaultColorButton()?this._getDefaultColorButton().getDomRef():this._getAllSwatches()[0];F.focus();};n.prototype._fireColorSelect=function(p,r,O){this.fireColorSelect({value:p,defaultAction:r,_originalEvent:O});};n.prototype._ensureItemNavigation=function(){var p=[];if(!this._oItemNavigation){this._oItemNavigation=new o(this);this._oItemNavigation.setColumns(S);this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(I.Events.BorderReached,this._onSwatchContainerBorderReached,this);}p=p.concat(this._getAllSwatches());this._oItemNavigation.setRootDomRef(this.getDomRef("swatchCont"));this._oItemNavigation.setItemDomRefs(p);};n.prototype._onSwatchContainerBorderReached=function(E){var N,s,H=["saphome","sapend"].indexOf(E.getParameter("event").type)>-1;if(E.getParameter(o.BorderReachedDirection)===o.BorderReachedDirectionForward){if(this._getShowMoreColorsButton()){N=this._getMoreColorsButton();}else if(!H&&this._getShowDefaultColorButton()){N=this._getDefaultColorButton();}else if(!H){N=this._getAllSwatches()[0];}}else{if(this._getShowDefaultColorButton()){N=this._getDefaultColorButton();}else if(!H&&this._getShowMoreColorsButton()){N=this._getMoreColorsButton();}else if(!H&&!this._getShowDefaultColorButton()){s=this._getAllSwatches();N=s[s.length-1];}else if(!H){s=this._getAllSwatches();N=s[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()];}}if(N){N.focus();}return N;};n.prototype.onsapnext=function(E){var N,p=this._getElementInfo(E.target);if(!(p.bIsDefaultColorButton||p.bIsMoreColorsButton)){return;}E.preventDefault();E.stopImmediatePropagation(true);if(p.bIsDefaultColorButton){N=this._getAllSwatches()[0];}else{N=this._getShowDefaultColorButton()?this._getDefaultColorButton():this._getAllSwatches()[0];}N.focus();};n.prototype.onsapprevious=function(E){var N,F=this._getElementInfo(E.target),A;if(!(F.bIsDefaultColorButton||F.bIsMoreColorsButton)){return;}E.preventDefault();E.stopImmediatePropagation(true);A=this._getAllSwatches();if(F.bIsMoreColorsButton){N=E.keyCode===K.ARROW_UP?A[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()]:A[A.length-1];}else{N=this._getShowMoreColorsButton()?this._getMoreColorsButton():A[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()];}N.focus();};n.prototype._getAllSwatches=function(){return this.$().find("."+k).get();};n.prototype._getElementInfo=function(E){var p=this._getShowDefaultColorButton()&&e(E,this._getDefaultColorButton().getDomRef()),r=!p&&this._getShowMoreColorsButton()&&e(E,this._getMoreColorsButton().getDomRef()),s=!r&&!p&&q(E).hasClass(k);return{bIsDefaultColorButton:p,bIsMoreColorsButton:r,bIsASwatch:s};};var o=I.extend("sap.m.ItemNavigationHomeEnd",{constructor:function(){I.apply(this,arguments);this.setHomeEndColumnMode(true);this.fireEvent=function(N,E){var s;if(N===I.Events.BorderReached){s=o.BorderReachedDirectionBackward;if(["sapnext","sapend"].indexOf(E.event.type)>-1){s=o.BorderReachedDirectionForward;}E[o.BorderReachedDirection]=s;}I.prototype.fireEvent.apply(this,arguments);};}});o.BorderReachedDirection="direction";o.BorderReachedDirectionForward="BorderReachedDirectionForward";o.BorderReachedDirectionBackward="BorderReachedDirectionBackward";o.prototype.getColumns=function(){return this.iColumns;};o.prototype.onsapprevious=function(E){var p=e(this.getRootDomRef(),E.target),A=E.keyCode===K.ARROW_UP&&this.getFocusedIndex()===0;if(!p){return;}if(!A){I.prototype.onsapprevious.apply(this,arguments);return;}E.preventDefault();this.fireEvent(I.Events.BorderReached,{index:0,event:E});};o.prototype.onsapnext=function(E){var p=e(this.getRootDomRef(),E.target),r,s,t;if(!p){return;}if(E.keyCode!==K.ARROW_DOWN){I.prototype.onsapnext.apply(this,arguments);return;}s=this.getFocusedIndex();t=this._getItemInfo(s);if(t.bIsLastItem&&t.bIsInTheLastColumn){E.preventDefault();this.fireEvent(I.Events.BorderReached,{index:s,event:E});return;}if(t.bNextRowExists&&!t.bItemSameColumnNextRowExists){E.preventDefault();r=this.getItemDomRefs();r[r.length-1].focus();return;}I.prototype.onsapnext.apply(this,arguments);};o.prototype.onsaphome=function(E){var p=e(this.getRootDomRef(),E.target),r;if(!p){return;}r=this._getItemInfo(this.getFocusedIndex());if(!r.bIsInTheFirstColumn){I.prototype.onsaphome.apply(this,arguments);return;}E.preventDefault();if(r.bIsFirstItem){this.fireEvent(I.Events.BorderReached,{index:0,event:E});}else{this.getItemDomRefs()[0].focus();}};o.prototype.onsapend=function(E){var p=e(this.getRootDomRef(),E.target),r;if(!p){return;}r=this._getItemInfo(this.getFocusedIndex());if(!(r.bIsLastItem||r.bIsInTheLastColumn)){I.prototype.onsapend.apply(this,arguments);return;}E.preventDefault();if(r.bIsLastItem){this.fireEvent(I.Events.BorderReached,{index:this.getItemDomRefs().length-1,event:E});}else{this.getItemDomRefs()[this.getItemDomRefs().length-1].focus();}};o.prototype._getItemInfo=function(p){var r=this.getItemDomRefs().length,s=p===(r-1),t=r>this.getColumns()?this.getColumns():r,u=p%this.getColumns()===0,v=(p+1)%t===0,w=Math.floor(p/this.getColumns())+1,N,x;N=w*this.getColumns()<r;x=N&&(p+this.getColumns())<r;return{bIsFirstItem:p===0,bIsLastItem:s,bIsInTheLastColumn:v,bIsInTheFirstColumn:u,bNextRowExists:N,bItemSameColumnNextRowExists:x};};o.prototype._getIndexOfTheFirstItemInLastRow=function(){return Math.floor((this.getItemDomRefs().length-1)/this.getColumns())*this.getColumns();};n.prototype._ItemNavigation=o;n.prototype._ColorsHelper={RGB_TO_NAMED_COLORS_MAP:{"#FFB200":"gold","#FF8C00":"darkorange","#CD5C5C":"indianred","#8B008B":"darkmagenta","#6495ED":"cornflowerblue","#00BFFF":"deepskyblue","#008B8B":"darkcyan","#6B8E23":"olivedrab","#2F4F4F":"darkslategray","#F0FFFF":"azure","#FFFFFF":"white","#D3D3D3":"lightgray","#A9A9A9":"darkgray","#696969":"dimgray","#000000":"black"},NAME_COLORS_TO_RGB_MAP:{"gold":"#FFB200","darkorange":"#FF8C00","indianred":"#CD5C5C","darkmagenta":"#8B008B","cornflowerblue":"#6495ED","deepskyblue":"#00BFFF","darkcyan":"#008B8B","olivedrab":"#6B8E23","darkslategray":"#2F4F4F","azure":"#F0FFFF","white":"#FFFFFF","lightgray":"#D3D3D3","darkgray":"#A9A9A9","dimgray":"#696969","black":"#000000"},getNamedColor:function(s){var H="";if(!s||s.toLowerCase().indexOf("hsl")!==-1){return undefined;}if(s.indexOf("#")===-1){return this.NAME_COLORS_TO_RGB_MAP[s.toLowerCase()]?s.toLowerCase():undefined;}if(s.length===4){H=["#",s[1],s[1],s[2],s[2],s[3],s[3]].join("");}else{H=s;}H=H.toUpperCase();return this.RGB_TO_NAMED_COLORS_MAP[H];}};return n;});
