/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/f/cards/BindingResolver"],function(M,L,B){"use strict";var A={};function _(s){if(s&&typeof s==="object"){return s.name;}return s;}function a(i,C){if(!i.actions){this._fireActionReady(C);return;}var o=i.actions[0];if(o&&o.type==="Navigation"){this._attachNavigationAction(i,C||this);}else{this._fireActionReady(C);}}function b(o){var t=this;var e=M.bindingParser("{path:''}");e.formatter=function(v){var h=this.getBindingContext(),m=this.getModel(),p;if(h){p=h.getPath();}var P=B.resolveValue(o.parameters,m,p);if(v.__resolved){if(v.__enabled){return"Navigation";}else{return"Inactive";}}if(!v.__promise){v.__promise=true;t._oServiceManager.getService(_(o.service)).then(function(n){if(n){n.enabled({parameters:P}).then(function(E){v.__resolved=true;v.__enabled=E;t.getModel().checkUpdate(true);}).catch(function(){v.__resolved=true;v.__enabled=false;});}else{v.__resolved=true;v.__enabled=false;}});}return"Inactive";};this._oItemTemplate.bindProperty("type",e);}function c(i){var o=i.actions[0],e=this.getBindingContext(),p=o.parameters,m=this.getModel(),P;if(e){P=e.getPath();}p=B.resolveValue(o.parameters,m,P);return new Promise(function(r){this._oServiceManager.getService(_(o.service)).then(function(n){if(n){n.enabled({parameters:p}).then(function(E){r(E);}).catch(function(){r(false);});}else{r(false);}}).catch(function(){r(false);});}.bind(this));}function d(o){var e;if(typeof o.enabled==="string"){e=M.bindingParser(o.enabled);e.formatter=function(v){if(v&&(typeof v==="string")){return"Navigation";}else{return"Inactive";}};}if(e){this._oItemTemplate.bindProperty("type",e);}else{var E=o.enabled!==false?true:false;var t=E?"Navigation":"Inactive";this._oItemTemplate.setProperty("type",t);}}function f(){this.addStyleClass("sapFCardClickable");}A._fireAction=function(s,o,m,p){this.fireEvent("action",{type:"Navigation",actionSource:s,manifestParameters:B.resolveValue(o,m,p)});};A.openUrl=function(u,o){window.open(u,o.target||"_blank");};A._attachNavigationAction=function(i,C){var o=i.actions[0];var h;var j=true;var k=function(){C.attachPress(h.bind(this));if(this._addHeaderClasses){this._addHeaderClasses();}}.bind(this);if(o.service){if(this._setItemTypeFormatter){this._setItemTypeFormatter(o);}h=function(E){var s=E.getSource(),l=s.getBindingContext(),m=s.getModel(),p;if(l){p=l.getPath();}this._oServiceManager.getService(_(o.service)).then(function(n){if(n){n.navigate({parameters:B.resolveValue(o.parameters,m,p)});}}).catch(function(e){L.error("Navigation service unavailable",e);}).finally(function(){A._fireAction.call(this,E.getSource(),o.parameters,m,p);}.bind(this));}.bind(this);j=false;}else{if(this._setActionEnabledState){this._setActionEnabledState(o);j=false;}if(o.url){h=function(e){var s=e.getSource(),l=s.getBindingContext(),m=s.getModel(),p,u;if(l){p=l.getPath();}u=B.resolveValue(o.url,m,p);A.openUrl(u,o);A._fireAction.call(this,e.getSource(),o.parameters,m,p);}.bind(this);}else{h=function(e){var s=e.getSource(),l=s.getBindingContext(),m=s.getModel(),p;if(l){p=l.getPath();}A._fireAction.call(this,e.getSource(),o.parameters,m,p);}.bind(this);}}if((C.isA("sap.f.cards.IHeader")||C.isA("sap.f.cards.AnalyticalContent")||C.isA("sap.f.cards.ObjectContent"))&&o.service){this._setHeaderActionEnabledState(i).then(function(e){if(e){k();}this._fireActionReady(C);}.bind(this));return;}else{if(j){if(o.enabled!==false){k();}}else{k();}this._fireActionReady(C);}};function g(C){if(C&&C.isA("sap.f.cards.IHeader")){this.fireEvent("_actionHeaderReady");}else{this.fireEvent("_actionContentReady");}}A.enrich=function(C){C.prototype._attachActions=a;C.prototype._attachNavigationAction=this._attachNavigationAction;C.prototype._fireActionReady=g;if(C.prototype.isA("sap.f.cards.ListContent")||C.prototype.isA("sap.f.cards.TableContent")){C.prototype._setItemTypeFormatter=b;C.prototype._setActionEnabledState=d;}if(C.prototype.isA("sap.f.cards.IHeader")||C.prototype.isA("sap.f.cards.AnalyticalContent")||C.prototype.isA("sap.f.cards.ObjectContent")){C.prototype._addHeaderClasses=f;C.prototype._setHeaderActionEnabledState=c;}};return A;});
