/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','./PlanningCalendarHeader','./SegmentedButtonItem',"./SinglePlanningCalendarWeekView",'./SinglePlanningCalendarGrid','./SinglePlanningCalendarRenderer','sap/base/Log','sap/ui/core/Control','sap/ui/core/Locale','sap/ui/core/LocaleData','sap/ui/core/InvisibleText','sap/ui/core/ResizeHandler','sap/ui/core/date/UniversalDate','sap/ui/core/format/DateFormat','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/DateRange','sap/ui/base/ManagedObjectObserver'],function(l,P,S,a,b,c,L,C,d,e,I,R,U,D,f,g,h,M){"use strict";var j=l.PlanningCalendarStickyMode;var H="_sHeaderResizeHandlerId";var k=4;var m=C.extend("sap.m.SinglePlanningCalendar",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},stickyMode:{type:"sap.m.PlanningCalendarStickyMode",group:"Behavior",defaultValue:j.None},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsResize:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsCreate:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action",forwarding:{getter:"_getHeader",aggregation:"actions"}},appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment",forwarding:{getter:"_getGrid",aggregation:"appointments"}},views:{type:"sap.m.SinglePlanningCalendarView",multiple:true,singularName:"view"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate",forwarding:{getter:"_getGrid",aggregation:"specialDates"}},_header:{type:"sap.m.PlanningCalendarHeader",multiple:false,visibility:"hidden"},_grid:{type:"sap.m.SinglePlanningCalendarGrid",multiple:false,visibility:"hidden"}},associations:{selectedView:{type:"sap.m.SinglePlanningCalendarView",multiple:false},legend:{type:"sap.m.PlanningCalendarLegend",multiple:false}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"}}},appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},copy:{type:"boolean"}}},appointmentResize:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}},appointmentCreate:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},headerDateSelect:{parameters:{date:{type:"object"}}},startDateChange:{parameters:{date:{type:"object"}}},cellPress:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}}}}});m.prototype.init=function(){var o=this.getId();this._oRB=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oDefaultView=new a({key:"DEFAULT_INNER_WEEK_VIEW_CREATED_FROM_CONTROL",title:""});this.setAssociation("selectedView",this._oDefaultView);this.setAggregation("_header",this._createHeader());this.setAggregation("_grid",new b(o+"-Grid"));this._attachHeaderEvents();this._attachGridEvents();this._attachDelegates();this.setStartDate(new Date());};m.prototype.onBeforeRendering=function(){this._toggleStickyClasses();};m.prototype.onAfterRendering=function(){var o=this._getHeader();this._adjustColumnHeadersTopOffset();this.toggleStyleClass("sapMSinglePCActionsHidden",!o._getActionsToolbar().getVisible());this._registerResizeHandler(H,o,this._onHeaderResize.bind(this));};m.prototype.exit=function(){if(this._oDefaultView){this._oDefaultView.destroy();this._oDefaultView=null;}if(this._afterRenderFocusCell){this.removeDelegate(this._afterRenderFocusCell);this._afterRenderFocusCell=null;}this._deRegisterResizeHandler(H);};m.prototype._onHeaderResize=function(E){if(E.oldSize.height===E.size.height){return this;}this.toggleStyleClass("sapMSinglePCActionsHidden",!this._getHeader()._getActionsToolbar().getVisible());this._adjustColumnHeadersTopOffset();return this;};m.prototype.setTitle=function(t){this._getHeader().setTitle(t);return this.setProperty("title",t,true);};m.prototype.setStartDate=function(o){this.setProperty("startDate",o,true);this._alignColumns();return this;};m.prototype.setEnableAppointmentsDragAndDrop=function(E){this._getGrid().setEnableAppointmentsDragAndDrop(E);return this.setProperty("enableAppointmentsDragAndDrop",E,true);};m.prototype.setEnableAppointmentsResize=function(E){this._getGrid().setEnableAppointmentsResize(E);return this.setProperty("enableAppointmentsResize",E,true);};m.prototype.setEnableAppointmentsCreate=function(E){this._getGrid().setEnableAppointmentsCreate(E);return this.setProperty("enableAppointmentsCreate",E,true);};m.prototype._toggleStickyClasses=function(){var s=this.getStickyMode();this.toggleStyleClass("sapMSinglePCStickyAll",s===j.All);this.toggleStyleClass("sapMSinglePCStickyNavBarAndColHeaders",s===j.NavBarAndColHeaders);return this;};m.prototype._adjustColumnHeadersTopOffset=function(){var s=this.getStickyMode(),G=this._getGrid(),o=G&&G._getColumnHeaders(),t;if(!o||!o.getDomRef()){return this;}switch(s){case j.All:t=this._getHeader().$().outerHeight();break;case j.NavBarAndColHeaders:t=this._getHeader()._getNavigationToolbar().$().outerHeight();break;default:t="auto";break;}o.$().css("top",t);o._setTopPosition(t);return this;};m.prototype.addView=function(v){var V,o=this._getHeader();if(!v){return this;}if(this._isViewKeyExisting(v.getKey())){L.error("There is an existing view with the same key.",this);return this;}this.addAggregation("views",v);V=o._getOrCreateViewSwitch();V.addItem(new S({key:v.getKey(),text:v.getTitle()}));if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",v);}this._alignView();if(this.getViews().length>k){o._convertViewSwitchToSelect();}return this;};m.prototype.insertView=function(v,p){var V,o=this._getHeader();if(!v){return this;}if(this._isViewKeyExisting(v.getKey())){L.error("There is an existing view with the same key.",this);return this;}this.insertAggregation("views",v,p);V=o._getOrCreateViewSwitch();V.insertItem(new S({key:v.getKey(),text:v.getTitle()}),p);if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",v);}this._alignView();if(this.getViews().length>k){o._convertViewSwitchToSelect();}return this;};m.prototype.removeView=function(v){if(!v){return this;}var o=this._getHeader(),V=o._getOrCreateViewSwitch(),n=V.getItems(),p=this._getSelectedView(),q=v.getKey(),r,i;for(i=0;i<n.length;i++){r=n[i];if(r.getKey()===q){V.removeItem(r);break;}}this.removeAggregation("views",v);if(q===p.getKey()){this.setAssociation("selectedView",this.getViews()[0]||this._oDefaultView);}this._alignView();if(this.getViews().length<=k){o._convertViewSwitchToSegmentedButton();}return this;};m.prototype.removeAllViews=function(){var v=this._getHeader()._getOrCreateViewSwitch();v.removeAllItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.removeAllAggregation("views");};m.prototype.destroyViews=function(){var v=this._getHeader()._getOrCreateViewSwitch();v.destroyItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.destroyAggregation("views");};m.prototype.getSelectedAppointments=function(){return this._getGrid().getSelectedAppointments();};m.prototype.setLegend=function(v){var o,i;this.setAssociation("legend",v);this._getGrid().setAssociation("legend",v);if(this.getLegend()){this._getGrid()._sLegendId=this.getLegend();i=sap.ui.getCore().byId(this.getLegend());}if(i){o=new M(function(n){this.invalidate();}.bind(this));o.observe(i,{destroy:true});}return this;};m.prototype._alignView=function(){this._switchViewButtonVisibility();this._alignColumns();return this;};m.prototype._createHeader=function(){var o=new P(this.getId()+"-Header");o.getAggregation("_actionsToolbar").addAriaLabelledBy(I.getStaticId("sap.m","SPC_ACTIONS_TOOLBAR"));o.getAggregation("_navigationToolbar").addAriaLabelledBy(I.getStaticId("sap.m","SPC_NAVIGATION_TOOLBAR"));return o;};m.prototype._isViewKeyExisting=function(K){return this.getViews().some(function(v){return v.getKey()===K;});};m.prototype._getSelectedView=function(){var s,v=this.getViews(),n=sap.ui.getCore().byId(this.getAssociation("selectedView")).getKey();for(var i=0;i<v.length;i++){if(n===v[i].getKey()){s=v[i];break;}}return s||this._oDefaultView;};m.prototype._switchViewButtonVisibility=function(){var s=this._getHeader()._getOrCreateViewSwitch(),v=s.getItems().length>1;s.setProperty("visible",v);return this;};m.prototype._attachHeaderEvents=function(){var o=this._getHeader();o.attachEvent("pressPrevious",this._handlePressArrow,this);o.attachEvent("pressToday",this._handlePressToday,this);o.attachEvent("pressNext",this._handlePressArrow,this);o.attachEvent("dateSelect",this._handleCalendarPickerDateSelect,this);o._getOrCreateViewSwitch().attachEvent("selectionChange",this._handleViewSwitchChange,this);return this;};m.prototype._attachDelegates=function(){this._afterRenderFocusCell={onAfterRendering:function(){if(this._sGridCellFocusSelector){jQuery(this._sGridCellFocusSelector).focus();this._sGridCellFocusSelector=null;}}.bind(this)};this._getGrid().addDelegate(this._afterRenderFocusCell);};m.prototype._attachGridEvents=function(){var G=this._getGrid();G._getColumnHeaders().attachEvent("select",function(E){this.fireHeaderDateSelect({date:E.getSource().getDate()});},this);G.attachEvent("appointmentSelect",function(E){this.fireAppointmentSelect({appointment:E.getParameter("appointment"),appointments:E.getParameter("appointments")});},this);G.attachEvent("appointmentDrop",function(E){this.fireAppointmentDrop({appointment:E.getParameter("appointment"),startDate:E.getParameter("startDate"),endDate:E.getParameter("endDate"),copy:E.getParameter("copy")});},this);G.attachEvent("appointmentResize",function(E){this.fireAppointmentResize({appointment:E.getParameter("appointment"),startDate:E.getParameter("startDate"),endDate:E.getParameter("endDate")});},this);G.attachEvent("appointmentCreate",function(E){this.fireAppointmentCreate({startDate:E.getParameter("startDate"),endDate:E.getParameter("endDate")});},this);G.attachEvent("cellPress",function(E){this.fireEvent("cellPress",{startDate:E.getParameter("startDate"),endDate:E.getParameter("endDate")});},this);G.attachEvent("borderReached",function(E){var G=this._getGrid(),F=G._getDateFormatter(),n=this._getSelectedView().getScrollEntityCount()-G._getColumns()+1,o=new Date(E.getParameter("startDate")),i=E.getParameter("fullDay"),N=this.getStartDate();if(E.getParameter("next")){o.setDate(o.getDate()+n);N=new Date(N.setDate(N.getDate()+this._getSelectedView().getScrollEntityCount()));this.setStartDate(N);}else{o.setDate(o.getDate()-n);N=new Date(N.setDate(N.getDate()-this._getSelectedView().getScrollEntityCount()));this.setStartDate(N);}this._sGridCellFocusSelector=i?"[data-sap-start-date='"+F.format(o)+"'].sapMSinglePCBlockersColumn":"[data-sap-start-date='"+F.format(o)+"'].sapMSinglePCRow";},this);return this;};m.prototype._handlePressArrow=function(E){this._applyArrowsLogic(E.getId()==="pressPrevious");this._adjustColumnHeadersTopOffset();};m.prototype._handlePressToday=function(){var s=this._getSelectedView().calculateStartDate(new Date());this.setStartDate(s);this.fireStartDateChange({date:s});this._adjustColumnHeadersTopOffset();};m.prototype._handleViewSwitchChange=function(E){this.setAssociation("selectedView",E.getParameter("item"));this._alignColumns();this._adjustColumnHeadersTopOffset();};m.prototype._handleCalendarPickerDateSelect=function(){var s=this._getHeader().getStartDate();s=this._getSelectedView().calculateStartDate(new Date(s.getTime()));this.setStartDate(s);this.fireStartDateChange({date:s});this._adjustColumnHeadersTopOffset();};m.prototype._updateCalendarPickerSelection=function(){var r=this._getFirstAndLastRangeDate(),s;s=new h({startDate:r.oStartDate.toLocalJSDate(),endDate:r.oEndDate.toLocalJSDate()});this._getHeader().getAggregation("_calendarPicker").removeAllSelectedDates();this._getHeader().getAggregation("_calendarPicker").addSelectedDate(s);};m.prototype._formatPickerText=function(){var r=this._getFirstAndLastRangeDate(),s=r.oStartDate.toLocalJSDate(),E=r.oEndDate.toLocalJSDate(),o=D.getDateInstance({style:"long"}),i=o.format(s);if(s.getTime()!==E.getTime()){i+=" - "+o.format(E);}return i;};m.prototype._applyArrowsLogic=function(B){var o=f.fromLocalJSDate(this.getStartDate()||new Date()),n=this._getSelectedView().getScrollEntityCount(),s;if(B){n*=-1;}o.setDate(o.getDate()+n);s=o.toLocalJSDate();this.setStartDate(s);this.fireStartDateChange({date:s});};m.prototype._getFirstAndLastRangeDate=function(){var s=this._getSelectedView(),o=this._getHeader().getStartDate()||new Date(),i=s.getEntityCount()-1,n,p;n=f.fromLocalJSDate(s.calculateStartDate(new Date(o.getTime())));p=new f(n);p.setDate(n.getDate()+i);return{oStartDate:n,oEndDate:p};};m.prototype._alignColumns=function(){var o=this._getHeader(),G=this._getGrid(),v=this._getSelectedView(),i=this.getStartDate()||new Date(),V=v.calculateStartDate(new Date(i.getTime())),n=f.fromLocalJSDate(V);o.setStartDate(V);o.setPickerText(this._formatPickerText(n));this._updateCalendarPickerSelection();G.setStartDate(V);G._setColumns(v.getEntityCount());this._setColumnHeaderVisibility();};m.prototype._setColumnHeaderVisibility=function(){var v=!this._getSelectedView().isA("sap.m.SinglePlanningCalendarDayView");this._getGrid()._getColumnHeaders().setVisible(v);this.toggleStyleClass("sapMSinglePCHiddenColHeaders",!v);};m.prototype._getHeader=function(){return this.getAggregation("_header");};m.prototype._getGrid=function(){return this.getAggregation("_grid");};m.prototype._registerResizeHandler=function(s,o,i){if(!this[s]){this[s]=R.register(o,i);}return this;};m.prototype._deRegisterResizeHandler=function(s){if(this[s]){R.deregister(this[s]);this[s]=null;}return this;};return m;});