/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/ui/core/Element","./ScrollContainerRenderer","sap/ui/dom/denormalizeScrollBeginRTL"],function(l,C,S,E,a,d){"use strict";var b=C.extend("sap.m.ScrollContainer",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'auto'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'auto'},horizontal:{type:"boolean",group:"Behavior",defaultValue:true},vertical:{type:"boolean",group:"Behavior",defaultValue:false},focusable:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/ScrollContainer.designtime"}});b.prototype.init=function(){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:true,vertical:false});};b.prototype.onBeforeRendering=function(){this._oScroller.setHorizontal(this.getHorizontal());this._oScroller.setVertical(this.getVertical());};b.prototype.exit=function(){if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}};b.prototype.getScrollDelegate=function(){return this._oScroller;};b.prototype.scrollTo=function(x,y,t){if(this._oScroller){var D=this.getDomRef();if(D){if(sap.ui.getCore().getConfiguration().getRTL()){x=d(x,D);}this._oScroller.scrollTo(x,y,t);}else{this._oScroller._scrollX=x;this._oScroller._scrollY=y;}}return this;};b.prototype.scrollToElement=function(e,t){if(e instanceof E){e=e.getDomRef();}if(this._oScroller){this._oScroller.scrollToElement(e,t);}return this;};b.prototype.setHorizontal=function(h){this._oScroller.setHorizontal(h);return this.setProperty("horizontal",h,true);};b.prototype.setVertical=function(v){this._oScroller.setVertical(v);return this.setProperty("vertical",v,true);};return b;});
