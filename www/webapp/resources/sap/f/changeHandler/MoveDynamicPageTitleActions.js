/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(F){"use strict";var M={};var A="actions";M.applyChange=function(c,C,p){var m=p.modifier,v=p.view,a=p.appComponent,o=c.getDefinition().content.movedElements[0];var b=m.bySelector(o.selector,a,v),t=o.targetIndex;m.getAggregation(C,A).forEach(function(B){if(m.getId(B)===m.getId(b)){m.removeAggregation(C,A,B);m.insertAggregation(C,"dependents",B,undefined,v);}});m.insertAggregation(C,A,b,t,v);return true;};M.revertChange=function(c,C,p){var m=p.modifier,v=p.view,a=p.appComponent,o=c.getDefinition().content.movedElements[0];var b=m.bySelector(o.selector,a,v),t=o.targetIndex,s=o.sourceIndex;m.removeAggregation(C,A,b,t,v);m.insertAggregation(C,A,b,s,v);return true;};M.completeChangeContent=function(c,s,p){var m=p.modifier,a=p.appComponent,C=c.getDefinition();C.content={movedElements:[]};s.movedElements.forEach(function(e){var E=e.element||m.bySelector(e.id,a);C.content.movedElements.push({selector:m.getSelector(E,a),sourceIndex:e.sourceIndex,targetIndex:e.targetIndex});});};return M;},true);
