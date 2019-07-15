/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObjectObserver",'sap/ui/core/ResizeHandler',"sap/ui/core/delegate/ItemNavigation","sap/f/GridContainerRenderer","sap/ui/Device","sap/ui/layout/cssgrid/VirtualGrid","sap/f/GridContainerSettings"],function(C,M,R,I,G,D,V,a){"use strict";var E=16;function b(){return!D.browser.msie&&!(D.browser.edge&&D.browser.version<E);}function g(i){var l=i.getLayoutData();return l?l.getColumns():1;}function c(i){var l=i.getLayoutData();return l?l.getActualRows():1;}function h(i){var l=i.getLayoutData();return l?l.hasAutoHeight():true;}var d=C.extend("sap.f.GridContainer",{metadata:{library:"sap.f",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},snapToRow:{type:"boolean",group:"Appearance",defaultValue:false},allowDenseFill:{type:"boolean",group:"Appearance",defaultValue:false},inlineBlockLayout:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Control",multiple:true,singularName:"item",dnd:true},layout:{type:"sap.f.GridContainerSettings",multiple:false},layoutS:{type:"sap.f.GridContainerSettings",multiple:false},layoutM:{type:"sap.f.GridContainerSettings",multiple:false},layoutL:{type:"sap.f.GridContainerSettings",multiple:false},layoutXL:{type:"sap.f.GridContainerSettings",multiple:false},_defaultLayout:{type:"sap.f.GridContainerSettings",multiple:false,visibility:"hidden"}},events:{layoutChange:{parameters:{layout:{type:"string"}}}},dnd:{draggable:false,droppable:true}}});d.prototype.getActiveLayoutSettings=function(){return this.getAggregation(this._sActiveLayout)||this.getAggregation("layout")||this.getAggregation("_defaultLayout");};d.prototype._onBeforeItemRendering=function(){var e=this.getParent(),r=e._resizeListeners[this.getId()];if(r){R.deregister(r);}delete e._resizeListeners[this.getId()];};d.prototype._onAfterItemRendering=function(){var e=this.getParent();e._resizeListeners[this.getId()]=R.register(this,e._resizeItemHandler);e._setItemNavigationItems();if(!b()){e._scheduleIEPolyfill();return;}e._applyItemAutoRows(this);};d.prototype._onItemChange=function(e){if(e.name!=="items"||!e.child){return;}if(e.mutation==="insert"){e.child.addEventDelegate(this._itemDelegate,e.child);}else if(e.mutation==="remove"){e.child.removeEventDelegate(this._itemDelegate,e.child);}};d.prototype._deregisterResizeListeners=function(){var k,i;for(k in this._resizeListeners){i=this._resizeListeners[k];R.deregister(i);}delete this._resizeListeners;};d.prototype._setItemNavigationItems=function(){if(!this._isRenderingFinished){return;}};d.prototype._detectActiveLayout=function(){var w=(this.getContainerQuery()&&this.getDomRef())?this.$().outerWidth():window.innerWidth,r=D.media.getCurrentRange("StdExt",w),l=r?d.mSizeLayouts[r.name]:"layout",o=this.getActiveLayoutSettings(),s=false;if(this._sActiveLayout!==l){this._sActiveLayout=l;s=o!==this.getActiveLayoutSettings();}return s;};d.prototype._getActiveGridStyles=function(){var s=this.getActiveLayoutSettings(),e=s.getColumns()||"auto-fill",S={"grid-template-columns":"repeat("+e+", "+s.getColumnSize()+")","grid-gap":s.getGap()};if(this.getInlineBlockLayout()){S["grid-auto-rows"]="min-content";}else{S["grid-auto-rows"]=s.getRowSize();}return S;};d.prototype.init=function(){this.setAggregation("_defaultLayout",new a());this._resizeListeners={};this._itemDelegate={onBeforeRendering:this._onBeforeItemRendering,onAfterRendering:this._onAfterItemRendering};this._itemsObserver=new M(this._onItemChange.bind(this));this._itemsObserver.observe(this,{aggregations:["items"]});this._resizeHandler=this._resize.bind(this);this._resizeItemHandler=this._resizeItem.bind(this);this._itemNavigation=new I().setCycling(false);this._itemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addDelegate(this._itemNavigation);};d.prototype.onBeforeRendering=function(){this._detectActiveLayout();var r=this._resizeListeners[this.getId()];if(r){R.deregister(r);}this._isRenderingFinished=false;};d.prototype.onAfterRendering=function(){this._resizeListeners[this.getId()]=R.register(this.getDomRef(),this._resizeHandler);this._isRenderingFinished=true;this._setItemNavigationItems();this._applyLayout(true);};d.prototype.exit=function(){this._deregisterResizeListeners();if(this._itemsObserver){this._itemsObserver.disconnect();delete this._itemsObserver;}if(this._itemNavigation){this.removeDelegate(this._itemNavigation);this._itemNavigation.destroy();delete this._itemNavigation;}};d.prototype._resize=function(){var s=this._detectActiveLayout();this._applyLayout(s);if(s){this.fireLayoutChange({layout:this._sActiveLayout});}};d.prototype._resizeItem=function(e){if(!b()){this._scheduleIEPolyfill();return;}this._applyItemAutoRows(e.control);};d.prototype._applyLayout=function(s){if(!this._isRenderingFinished){return;}if(!b()){this._scheduleIEPolyfill(s);return;}if(s){this.$().css(this._getActiveGridStyles());this.getItems().forEach(this._applyItemAutoRows.bind(this));}this._enforceMaxColumns();};d.prototype._applyItemAutoRows=function(i){if(!this._isRenderingFinished){return;}if(this.getInlineBlockLayout()){return;}if(h(i)){var $=i.$(),s=this.getActiveLayoutSettings(),r=s.calculateRowsForItem($.height());if(!r){return;}$.parent().css({'grid-row':'span '+Math.max(r,c(i))});}};d.prototype._enforceMaxColumns=function(){var s=this.getActiveLayoutSettings(),m=s.getComputedColumnsCount(this.$().innerWidth());if(!m){return;}this.getItems().forEach(function(i){i.$().parent().css("grid-column","span "+Math.min(g(i),m));});};d.prototype._scheduleIEPolyfill=function(i){if(this._iPolyfillCallId){clearTimeout(this._iPolyfillCallId);}if(i){this._applyIEPolyfillLayout();return;}this._iPolyfillCallId=setTimeout(this._applyIEPolyfillLayout.bind(this),0);};d.prototype._applyIEPolyfillLayout=function(){if(!this._isRenderingFinished){return;}var $=this.$(),s=this.getActiveLayoutSettings(),e=s.getColumnSizeInPx(),r=s.getRowSizeInPx(),f=s.getGapInPx(),j=s.getComputedColumnsCount($.innerWidth()),t=parseInt($.css("padding-top").replace("px","")),l=parseInt($.css("padding-left").replace("px","")),k=this.getItems();if(!k.length){return;}var v=new V();v.init({numberOfCols:Math.max(1,j),cellWidth:e,cellHeight:r,unitOfMeasure:"px",gapSize:f,topOffset:t?t:0,leftOffset:l?l:0,allowDenseFill:this.getAllowDenseFill()});var i,m,n,o,p;for(i=0;i<k.length;i++){m=k[i];o=g(m);if(h(m)){p=s.calculateRowsForItem(m.$().height());}else{p=c(m);}v.fitElement(i+'',o,p);}v.calculatePositions();for(i=0;i<k.length;i++){m=k[i];n=v.getItems()[i];m.$().parent().css({position:'absolute',top:n.top,left:n.left,width:n.width,height:n.height});}$.css("height",v.getHeight()+"px");};d.mSizeLayouts={"Phone":"layoutS","Tablet":"layoutM","Desktop":"layoutL","LargeDesktop":"layoutXL"};return d;});
