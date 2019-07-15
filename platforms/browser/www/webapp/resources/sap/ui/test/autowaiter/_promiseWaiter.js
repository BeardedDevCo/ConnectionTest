/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/test/_ParameterValidator","sap/ui/test/autowaiter/_utils","sap/ui/thirdparty/jquery"],function(_,a,b,q){"use strict";var l=_.getLogger("sap.ui.test.autowaiter._promiseWaiter");var h=_.getLogger("sap.ui.test.autowaiter._promiseWaiter#hasPending");var c=new a({errorPrefix:"sap.ui.test.autowaiter._promiseCounter#extendConfig"});var d=1000;var e={maxDelay:d};var p=[];function w(o){var O=Promise[o];Promise[o]=function(){var t=false;var P={func:o,args:b.argumentsToString(arguments),stack:b.resolveStackTrace()};var s=f(P);var T=setTimeout(function(){t=true;p.splice(p.indexOf(P),1);l.trace("Long-running promise is ignored:"+s);},e.maxDelay,'TIMEOUT_WAITER_IGNORE');var C=function(){if(t){return;}p.splice(p.indexOf(P),1);l.trace("Promise complete:"+s);clearTimeout(T);};var i=O.apply(this,arguments);p.push(P);l.trace("New pending promise:"+s);i.then(C,C);return i;};}w("resolve");w("all");w("race");w("reject");function f(P){return"\nPromise: Function: "+P.func+" Args: "+P.args+" Stack: "+P.stack;}function g(){var L="There are "+p.length+" pending promises\n";p.forEach(function(P){L+=f(P);});h.debug(L);}return{hasPending:function(){var H=p.length>0;if(H){g();}return H;},extendConfig:function(C){var i=C&&C.timeoutWaiter&&C.timeoutWaiter.maxDelay;C={maxDelay:i||d};c.validate({inputToValidate:C,validationInfo:{maxDelay:"numeric"}});q.extend(e,C);}};},true);
