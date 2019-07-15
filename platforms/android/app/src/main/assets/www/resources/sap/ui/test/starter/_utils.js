/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(m){"use strict";function g(a){var t=document.querySelector("["+a+"]");return t?t.getAttribute(a):null;}function w(){return new Promise(function(r){function o(){document.removeEventListener("DOMContentLoaded",o,false);r();}if(document.readyState==='loading'){document.addEventListener("DOMContentLoaded",o,false);}else{r();}});}function c(r){var l=document.createElement("link");l.rel="stylesheet";l.href=sap.ui.require.toUrl(r);document.head.appendChild(l);}function e(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;");}var D={name:null,beforeBootstrap:null,module:"./{name}.qunit",page:"resources/sap/ui/test/starter/Test.qunit.html?testsuite={suite}&test={name}",title:"QUnit tests '{name}' of suite '{suite}'",qunit:{version:"edge"},sinon:{version:"edge",qunitBridge:true,useFakeTimers:false,useFakeServer:false},coverage:{only:null,never:null,branchTracking:false},ui5:{bindingSyntax:'complex',noConflict:true,libs:[],theme:"sap_belize"},bootCore:true,autostart:true};function n(t){if(t&&typeof t==="object"){if(t.qunit===null||t.qunit===false){t.qunit={version:null};}else if(typeof t.qunit==="number"||t.qunit==="edge"){t.qunit={version:t.qunit};}else if(typeof t.qunit!=="object"){t.qunit={};}if(t.sinon===null||t.sinon===false){t.sinon={version:null};}else if(typeof t.sinon==="number"||t.sinon==="edge"){t.sinon={version:t.sinon};}else if(typeof t.sinon!=="object"){t.sinon={};}}else{t=null;}return t;}function d(s,t){function r(a,b){return a==null?a:a.replace(/\{suite\}/g,t).replace(/\{name\}/g,b);}var M=t.slice(0,t.lastIndexOf('/')+1);function h(a){return a==null?a:a.replace(/^\.\//,M);}var S=m({},D,n(s.defaults));Object.keys(s.tests).forEach(function(a){var T=n(s.tests[a]),o={name:a};T=m({},S,o,T);if(Array.isArray(T.module)){T.module=T.module.map(function(b){return h(r(b,a));});}else{T.module=h(r(T.module,a));}T.beforeBootstrap=h(r(T.beforeBootstrap,a));T.page=r(T.page,a);T.title=r(T.title,a);s.tests[a]=T;});s.sortedTests=Object.keys(s.tests).sort(function(a,b){var i=s.tests[a].group||"";var j=s.tests[b].group||"";if(i!==j){return i<j?-1:1;}a=a.toUpperCase();b=b.toUpperCase();if(a===b){return 0;}return a<b?-1:1;}).map(function(a){return s.tests[a];});return s;}var V=/^test-resources\/([a-zA-Z_$\-][a-zA-Z_$0-9\-]*\/)*testsuite(?:\.[a-z][a-z0-9]*)*\.qunit$/;function f(t){return new Promise(function(r,a){if(!t){throw new TypeError("No test suite specified");}if(!V.test(t)){throw new TypeError("Invalid test suite name");}sap.ui.require([t],function(s){r(d(s,t));},function(E){a(E);});});}sap.ui.loader.config({paths:{'test-resources':sap.ui.require.toUrl("")+"/../test-resources/"}});return{defaultConfig:D,addStylesheet:c,encode:e,getAttribute:g,getSuiteConfig:f,whenDOMReady:w};});
