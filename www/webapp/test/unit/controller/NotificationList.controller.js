/*global QUnit*/

sap.ui.define([
	"com/bp/MyNotifications/controller/NotificationList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("NotificationList Controller");

	QUnit.test("I should test the NotificationList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});