/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Button','./Dialog','./List','./SearchField','./library','sap/ui/core/Control','sap/ui/Device','sap/ui/base/ManagedObject','sap/m/Toolbar','sap/m/Label','sap/m/BusyIndicator','sap/m/Bar','sap/m/Title','sap/ui/core/theming/Parameters','./SelectDialogRenderer'],function(B,D,L,S,l,C,a,M,T,b,c,d,e,P,f){"use strict";var g=l.ListMode;var h=C.extend("sap.m.SelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:null},growing:{type:"boolean",group:"Behavior",defaultValue:true},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showClearButton:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",forwarding:{idSuffix:"-list",aggregation:"items",forwardBinding:true}},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"object[]"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}}});h.prototype.init=function(){var t=this,i=0,r=null,j=null;r=function(){t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._oDialog.detachAfterClose(r);t._fireConfirmAndUpdateSelection();};this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=new L(this.getId()+"-list",{growing:t.getGrowing(),growingScrollToLoad:t.getGrowing(),mode:g.SingleSelectMaster,sticky:[l.Sticky.InfoToolbar],infoToolbar:new T({visible:false,active:false,content:[new b({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:function(E){if(t._oDialog){if(!t.getMultiSelect()){t._oDialog.attachAfterClose(r);t._oDialog.close();}else{t._updateSelectionIndicator();}}}});this._oList.getInfoToolbar().addEventDelegate({onAfterRendering:function(){t._oList.getInfoToolbar().$().attr('aria-live','polite');}});this._list=this._oList;this._oList.attachUpdateStarted(this._updateStarted,this);this._oList.attachUpdateFinished(this._updateFinished,this);this._oBusyIndicator=new c(this.getId()+"-busyIndicator").addStyleClass("sapMSelectDialogBusyIndicator",true);this._oSearchField=new S(this.getId()+"-searchField",{width:"100%",liveChange:function(E){var v=E.getSource().getValue(),k=(v?300:0);clearTimeout(i);if(k){i=setTimeout(function(){t._executeSearch(v,"liveChange");},k);}else{t._executeSearch(v,"liveChange");}},search:function(E){t._executeSearch(E.getSource().getValue(),"search");}});this._searchField=this._oSearchField;this._oSubHeader=new d(this.getId()+"-subHeader",{contentMiddle:[this._oSearchField]});var o=new d(this.getId()+"-dialog-header",{contentMiddle:[new e(this.getId()+"-dialog-title",{level:"H2"})]});this._oDialog=new D(this.getId()+"-dialog",{customHeader:o,stretch:a.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oList],leftButton:this._getCancelButton(),initialFocus:(a.system.desktop?this._oSearchField:null)}).addStyleClass("sapMSelectDialog",true);this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);j=this._oDialog.onsapescape;this._oDialog.onsapescape=function(E){if(j){j.call(t._oDialog,E);}t._onCancel();};this._oDialog._iVMargin=8*(parseInt(P.get("sapUiFontSize"))||16);this._sSearchFieldValue="";this._bFirstRequest=true;this._bLiveChange=false;this._iListUpdateRequested=0;};h.prototype.setGrowing=function(v){this._oList.setGrowing(v);this._oList.setGrowingScrollToLoad(v);this.setProperty("growing",v,true);return this;};h.prototype.setBusy=function(){this._oDialog.setBusy.apply(this._oDialog,arguments);return this;};h.prototype.getBusy=function(){return this._oDialog.getBusy.apply(this._oDialog,arguments);};h.prototype.setBusyIndicatorDelay=function(v){this._oList.setBusyIndicatorDelay(v);this._oDialog.setBusyIndicatorDelay(v);this.setProperty("busyIndicatorDelay",v,true);return this;};h.prototype.exit=function(){this._oList=null;this._oSearchField=null;this._oSubHeader=null;this._oClearButton=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iListUpdateRequested=0;this._bFirstRequest=false;this._bInitBusy=false;this._bFirstRender=false;this._bFirstRequest=false;if(this._bAppendedToUIArea){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.removeContent(this,true);}if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null;}this._oSelectedItem=null;this._aSelectedItems=null;this._list=null;this._searchField=null;this._dialog=null;};h.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false;}return this;};h.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments);}else{C.prototype.invalidate.apply(this,arguments);}return this;};h.prototype.open=function(s){if((!this.getParent()||!this.getUIArea())&&!this._bAppendedToUIArea){var o=sap.ui.getCore().getStaticAreaRef();o=sap.ui.getCore().getUIArea(o);o.addContent(this,true);this._bAppendedToUIArea=true;}this._bFirstRequest=true;this._oSearchField.setValue(s);this._oDialog.open();if(this._bInitBusy){this._setBusy(true);}this._updateSelectionIndicator();this._aInitiallySelectedContextPaths=this._oList.getSelectedContextPaths();return this;};h.prototype.setGrowingThreshold=function(v){this._oList.setGrowingThreshold(v);this.setProperty("growingThreshold",v,true);return this;};h.prototype.setMultiSelect=function(m){this.setProperty("multiSelect",m,true);if(m){this._oList.setMode(g.MultiSelect);this._oList.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton());}else{this._oList.setMode(g.SingleSelectMaster);this._oDialog.setBeginButton(this._getCancelButton());}return this;};h.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.getCustomHeader().getAggregation("contentMiddle")[0].setText(t);return this;};h.prototype.setNoDataText=function(n){this._oList.setNoDataText(n);return this;};h.prototype.getNoDataText=function(){return this._oList.getNoDataText();};h.prototype.getContentWidth=function(){return this._oDialog.getContentWidth();};h.prototype.setContentWidth=function(w){this._oDialog.setContentWidth(w);return this;};h.prototype.getContentHeight=function(){return this._oDialog.getContentHeight();};h.prototype.setShowClearButton=function(v){this.setProperty("showClearButton",v,true);if(v){var o=this._oDialog.getCustomHeader();o.addContentRight(this._getClearButton());}if(this._oClearButton){this._oClearButton.setVisible(v);}return this;};h.prototype.setContentHeight=function(H){this._oDialog.setContentHeight(H);return this;};h.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this;};h.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this;};h.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this;};h.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments);};h.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments);}else{return null;}};h.prototype._setModel=h.prototype.setModel;h.prototype.setModel=function(m,s){var A=Array.prototype.slice.call(arguments);this._setBusy(false);this._bInitBusy=false;this._iListUpdateRequested+=1;this._oList.setModel(m,s);h.prototype._setModel.apply(this,A);this._updateSelectionIndicator();return this;};h.prototype._setBindingContext=h.prototype.setBindingContext;h.prototype.setBindingContext=function(o,m){var i=Array.prototype.slice.call(arguments);this._oList.setBindingContext(o,m);h.prototype._setBindingContext.apply(this,i);return this;};h.prototype._executeSearch=function(v,E){var o=this._oList,i=(o?o.getBinding("items"):undefined),s=(this._sSearchFieldValue!==v);if(E==="liveChange"){this._bLiveChange=true;}if(this._oDialog.isOpen()&&((s&&E==="liveChange")||E==="search")){this._sSearchFieldValue=v;if(i){this._iListUpdateRequested+=1;if(E==="search"){this.fireSearch({value:v,itemsBinding:i});}else if(E==="liveChange"){this.fireLiveChange({value:v,itemsBinding:i});}}else{if(E==="search"){this.fireSearch({value:v});}else if(E==="liveChange"){this.fireLiveChange({value:v});}}}return this;};h.prototype._setBusy=function(i){if(this._iListUpdateRequested){if(i){this._oList.addStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','inline-block');}else{this._oList.removeStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','none');}}};h.prototype._updateStarted=function(E){if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){if(this._oDialog.isOpen()&&this._iListUpdateRequested){this._setBusy(true);}else{this._bInitBusy=true;}}};h.prototype._updateFinished=function(E){this._updateSelectionIndicator();if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){this._setBusy(false);this._bInitBusy=false;}if(a.system.desktop){if(this._oList.getItems()[0]){this._oDialog.setInitialFocus(this._oList.getItems()[0]);}else{this._oDialog.setInitialFocus(this._oSearchField);}if(this._bFirstRequest&&!this._bLiveChange){var F=this._oList.getItems()[0];if(!F){F=this._oSearchField;}if(F.getFocusDomRef()){F.getFocusDomRef().focus();}}}this._bFirstRequest=false;this._iListUpdateRequested=0;};h.prototype._getOkButton=function(){var t=this,o=null;o=function(){t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._oDialog.detachAfterClose(o);t._fireConfirmAndUpdateSelection();};if(!this._oOkButton){this._oOkButton=new B(this.getId()+"-ok",{text:this._oRb.getText("MSGBOX_OK"),press:function(){t._oDialog.attachAfterClose(o);t._oDialog.close();}});}return this._oOkButton;};h.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new B(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(E){t._onCancel();}});}return this._oCancelButton;};h.prototype._getClearButton=function(){if(!this._oClearButton){this._oClearButton=new B(this.getId()+"-clear",{text:this._oRb.getText("SELECTDIALOG_CLEARBUTTON"),press:function(){this._removeSelection();this._updateSelectionIndicator();this._oDialog.focus();}.bind(this)});}return this._oClearButton;};h.prototype._onCancel=function(E){var t=this,A=null;A=function(){t._oSelectedItem=null;t._aSelectedItems=[];t._sSearchFieldValue=null;t._oDialog.detachAfterClose(A);t._resetSelection();t.fireCancel();};this._oDialog.attachAfterClose(A);this._oDialog.close();};h.prototype._updateSelectionIndicator=function(){var s=this._oList.getSelectedContextPaths(true).length,i=this._oList.getInfoToolbar();if(this.getShowClearButton()&&this._oClearButton){this._oClearButton.setEnabled(s>0);}i.setVisible(!!s&&this.getMultiSelect());i.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[s]));};h.prototype._fireConfirmAndUpdateSelection=function(){var p={selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems};Object.defineProperty(p,"selectedContexts",{get:this._oList.getSelectedContexts.bind(this._oList,true)});this.fireConfirm(p);this._updateSelection();};h.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._removeSelection();}};h.prototype._removeSelection=function(){this._oList.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems;};h.prototype._resetSelection=function(){if(!this.bIsDestroyed){this._oList.removeSelections(true);this._oList.setSelectedContextPaths(this._aInitiallySelectedContextPaths);this._oList.getItems().forEach(function(i){var p=i.getBindingContextPath();if(p&&this._aInitiallySelectedContextPaths.indexOf(p)>-1){i.setSelected(true);}},this);}};return h;});
