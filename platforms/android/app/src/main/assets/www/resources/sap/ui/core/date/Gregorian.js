/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./UniversalDate','../CalendarType'],function(U,C){"use strict";var G=U.extend("sap.ui.core.date.Gregorian",{constructor:function(){this.oDate=this.createDate(Date,arguments);this.sCalendarType=C.Gregorian;}});G.UTC=function(){return Date.UTC.apply(Date,arguments);};G.now=function(){return Date.now();};return G;});
