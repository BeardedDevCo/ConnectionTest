/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Core','./Template','./TemplateControl','sap/ui/thirdparty/handlebars','sap/ui/base/ManagedObject','sap/base/util/ObjectPath',"sap/base/security/encodeXML","sap/ui/thirdparty/jquery"],function(C,T,a,H,M,O,e,q){"use strict";var b=T.extend("sap.ui.core.tmpl.HandlebarsTemplate",{constructor:function(i,s){T.apply(this,arguments);}});T.registerType("text/x-handlebars-template","sap.ui.core.tmpl.HandlebarsTemplate");function d(h){for(var k in h){h[k]=h[k].replace("&gt;",">").replace("&lt;","<").replace("&quot;","\"").replace("&amp;","&");}}function c(p,P){var r=/^((\w+)>)?(.*)/,f=r.exec(p),s=f[2],g=r.exec(P),h=g[2];var f=r.exec(p);if(P&&s==h){return P+f[3];}else{return p;}}b.RENDER_HELPERS=(function(){var E=H.helpers["each"],w=H.helpers["with"],I=H.helpers["if"],u=H.helpers["unless"],r=sap.ui.getCore().createRenderManager();r.renderControl=function(o){this.writeControlData(o);this.writeClasses(o);this.writeStyles(o);};var h={"each":function(f,o){o=o||f;if(!o.hash.path){return E.apply(this,arguments);}else{d(o.hash);var R=o.data.renderManager,g=o.data.rootControl,p=o.data.path,P=o.data.parentControl,s=c(o.hash.path,p),i=g.bindList(s),j=[],k;if(o.data){k=H.createFrame(o.data);}if(i){for(var K in i){if(k){k.renderManager=R;k.rootControl=g;k.path=s+"/"+K+"/";k.parentControl=P;}j.push(o.fn({},{data:k}));}}if(!P){return new H.SafeString(j.join(""));}}},"with":function(f,o){o=o||f;if(!o.hash.path){return w.apply(this,arguments);}},"if":function(f,o){o=o||f;if(!o.hash.path){return I.apply(this,arguments);}else{d(o.hash);var R=o.data.rootControl,p=o.data.path,P=c(o.hash.path,p);if(P){var v=R.bindProp(P);if(v){return o.fn(this);}else{return o.inverse(this);}}}},"unless":function(f,o){o=o||f;if(!o.hash.path){return u.apply(this,arguments);}else{d(o.hash);var R=o.data.rootControl,p=o.data.path,P=c(o.hash.path,p);if(P){var v=R.bindProp(P);if(!v){return o.fn(this);}else{return o.inverse(this);}}}},"text":function(f,o){o=o||f;d(o.hash);var R=o.data.rootControl,p=o.data.path,P=c(o.hash.path,p);if(P){var v=R.bindProp(P);return v&&new H.SafeString(e(v));}else{throw new Error("The expression \"text\" requires the option \"path\"!");}},"element":function(f,o){o=o||f;d(o.hash);var R=o.data.renderManager,g=o.data.rootControl,i=g.createDOMElement(o.hash,o.data.path),p=o.data.parentElement;if(o.fn){o.fn({},{data:{renderManager:R,rootControl:g,parentElement:i}});}if(p){p.addElement(i);return;}return new H.SafeString(R.getHTML(i));},"control":function(f,o){o=o||f;d(o.hash);var R=o.data.renderManager,g=o.data.control;if(g){return new H.SafeString(R.getHTML(g));}var j=o.data.rootControl,p=o.data.path,P=o.data.children,t=o.hash["sap-ui-type"],k=O.get(t||""),m=k&&k.getMetadata(),D=o.hash["sap-ui-default-aggregation"]||m&&m.getDefaultAggregationName(),v=o.data.view;if(!k){throw new Error("Control of type "+t+" cannot be found.");}var n={};if(o.fn){o.fn({},{data:{rootControl:j,path:p,children:n,defaultAggregation:D,view:v}});}var s=q.extend({},o.hash),S;for(var K in s){if(K==="sap-ui-class"&&typeof s[K]==="string"){S=s["sap-ui-class"]&&s["sap-ui-class"].split(" ");delete s[K];}else if(n[K]){delete s[K];}}var N=j.createControl(s,o.data.path,!!P,v);if(S&&S.length>0){S.forEach(N.addStyleClass.bind(N));}if(!q.isEmptyObject(n)){s=o.hash;var A=m.getAllAggregations();for(var x in n){var y=n[x];for(var i=0,l=y.length;i<l;i++){var z=y[i],B=A[x],F=B&&B.multiple;if(typeof s[x]==="string"){var G=M.bindingParser(s[x],v&&v.getController());G.template=z;N.bindAggregation(x,G);}else{if(F){N.addAggregation(x,z);}else{N.setAggregation(x,z);}}}}}if(P){var x=o.hash["sap-ui-aggregation"]||o.data.defaultAggregation;P[x]=P[x]||[];P[x].push(N);return;}return new H.SafeString(R.getHTML(N));},"property":function(f,o){o=o||f;d(o.hash);var R=o.data.rootControl,m=R.getMetadata(),p=o.hash.name,g=m.getProperty(p)._sGetter;return R[g]();},"aggregation":function(f,o){o=o||f;d(o.hash);if(o.data.children){var A=o.hash.name;if(o.fn){var D=q.extend({},o.data,{defaultAggregation:A});o.fn({},{data:D});}}else{var R=o.data.renderManager,g=o.data.rootControl,m=g.getMetadata(),A=o.hash.name,G=m.getAggregation(A)._sGetter,j=[];var k=g[G]();if(k){for(var i=0,l=k.length;i<l;i++){if(o.fn){j.push(o.fn({},{data:{renderManager:R,rootControl:g,control:k[i]}}));}else{j.push(R.getHTML(k[i]));}}}return new H.SafeString(j.join(""));}},"event":function(f,o){o=o||f;},"controlData":function(f,o){o=o||f;var R=o.data.rootControl;return new H.SafeString(r.getHTML(R));}};return h;}());b.prototype.createMetadata=function(){var t=this.getContent(),f=this._fnTemplate=this._fnTemplate||H.compile(t);var m={},j=a.getMetadata().getAllSettings(),p=a.getMetadata().getAllPrivateAggregations();var h={"property":function(g,o){o=o||g;d(o.hash);var n=o.hash.name;if(n&&n!=="id"&&!j[n]){m.properties=m.properties||{};m.properties[n]=q.extend({},{type:"string"},o.hash);}else{throw new Error("The property name \""+n+"\" is reserved.");}},"aggregation":function(g,o){o=o||g;d(o.hash);var n=o.hash.name;if(n&&!j[n]&&!p[n]){o.hash.multiple=o.hash.multiple=="true";m.aggregations=m.aggregations||{};m.aggregations[n]=q.extend({},o.hash);}else{throw new Error("The aggregation name \""+n+"\" is reserved.");}},"event":function(g,o){o=o||g;},"controlData":function(g,o){o=o||g;m._hasControlData=true;}};["each","if","unless","with"].forEach(function(v){h[v]=function(){};});f({},{helpers:h});return m;};b.prototype.createRenderer=function(v){var t=this.getContent(),f=this._fnTemplate=this._fnTemplate||H.compile(t);var r=function(g,o){var h=f(o.getContext()||{},{data:{renderManager:g,rootControl:o,view:v},helpers:b.RENDER_HELPERS});g.write(h);};return r;};return b;});