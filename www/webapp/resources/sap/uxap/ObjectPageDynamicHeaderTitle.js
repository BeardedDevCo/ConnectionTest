/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/uxap/ObjectPageDynamicHeaderContent',"./ObjectPageDynamicHeaderTitleRenderer","sap/base/Log"],function(l,O,a,L){"use strict";try{sap.ui.getCore().loadLibrary("sap.f");}catch(e){L.error("The control 'sap.uxap.ObjectPageDynamicHeaderTitle' needs library 'sap.f'.");throw(e);}var D=sap.ui.requireSync("sap/f/DynamicPageTitle");var b=D.extend("sap.uxap.ObjectPageDynamicHeaderTitle",{metadata:{interfaces:["sap.uxap.IHeaderTitle"],library:"sap.uxap"}});b.prototype.isDynamic=function(){return true;};b.prototype.getCompatibleHeaderContentClass=function(){return O;};b.prototype.supportsToggleHeaderOnTitleClick=function(){return true;};b.prototype.supportsTitleInHeaderContent=function(){return false;};b.prototype.supportsAdaptLayoutForDomElement=function(){return false;};b.prototype.supportsBackgroundDesign=function(){return true;};b.KNOWN_HEADING_CONTROL_CLASS_NAMES=["sap.m.Title","sap.m.Text","sap.m.FormattedText","sap.m.Label"];b.prototype.getTitleText=function(){var h=this.getHeading(),c=h&&h.getMetadata().getName();if(b.KNOWN_HEADING_CONTROL_CLASS_NAMES.indexOf(c)>-1){return h.getText();}};b.prototype.getHeaderDesign=function(){return l.ObjectPageHeaderDesign.Light;};b.prototype.snap=function(u){this._toggleState(false,u);this._updateARIAState(false);};b.prototype.unSnap=function(u){this._toggleState(true,u);this._updateARIAState(true);};b.prototype._adaptLayoutForDomElement=function($,E){};return b;});
