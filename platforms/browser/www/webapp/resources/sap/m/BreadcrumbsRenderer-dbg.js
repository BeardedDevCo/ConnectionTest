/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.m.Breadcrumbs
sap.ui.define(["sap/m/Text"], function (Text) {
	"use strict";

	/**
	 * Breadcrumbs renderer.
	 * @namespace
	 */
	var BreadcrumbsRenderer = {};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.m.Breadcrumbs} oControl An object representation of the control that should be rendered
	 */
	BreadcrumbsRenderer.render = function (oRm, oControl) {
		var aControls = oControl._getControlsForBreadcrumbTrail(),
			oSelect = oControl._getSelect();

		oRm.write("<ul");
		oRm.writeControlData(oControl);
		oRm.addClass("sapMBreadcrumbs");
		oRm.writeClasses();
		oRm.writeAttribute("role", "navigation");
		oRm.writeAttributeEscaped("aria-label", BreadcrumbsRenderer._getResourceBundleText("BREADCRUMB_LABEL"));
		oRm.write(">");

		if (oSelect.getVisible()) {
			this._renderControlInListItem(oRm, oSelect, false, "sapMBreadcrumbsSelectItem");
		}

		aControls.forEach(function (oChildControl) {
			this._renderControlInListItem(oRm, oChildControl, oChildControl instanceof Text);
		}, this);

		oRm.write("</ul>");
	};

	BreadcrumbsRenderer._renderControlInListItem = function (oRm, oControl, bSkipSeparator, sAdditionalItemClass) {
		oRm.write("<li");
		oRm.writeAttribute("role", "presentation");
		oRm.addClass("sapMBreadcrumbsItem");
		oRm.addClass(sAdditionalItemClass);
		oRm.writeClasses();
		oRm.write(">");
		oRm.renderControl(oControl);
		if (!bSkipSeparator) {
			oRm.write("<span");
			oRm.addClass("sapMBreadcrumbsSeparator");
			oRm.writeClasses();
			oRm.write(">/</span>");
		}
		oRm.write("</li>");
	};

	BreadcrumbsRenderer._getResourceBundleText = function (sText) {
		return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(sText);
	};

	return BreadcrumbsRenderer;

}, /* bExport= */ true);
