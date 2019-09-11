sap.ui.define([
	"sap/ui/core/UIComponent",
	// "sap/ui/model/odata/v2/ODataModel",
	"sap/ui/Device",
	"sapui5/holiday/App/Holiday/OData/Holiday/App/OData/model/models"
	// ], function (UIComponent, ODataModel, Device, models) {
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("sapui5.holiday.App.Holiday.OData.Holiday.App.OData.Component", {

		metadata: {
			manifest: "json"
				// "config": {
				// 	"serviceUrl": "../xsodata/Holiday.xsodata"
				//}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

			jQuery.sap.require("sap.m.MessageBox");
			jQuery.sap.require("sap.m.MessageToast");

			this.setModel(models.createDeviceModel(), "device");

			sap.ui.core.UIComponent.prototype.init.apply(
				this, arguments);

			// call the base component's init function
			// UIComponent.prototype.init.apply(this, arguments);

			var oModel = this.getModel("HolidayModel");
			// var oModel = new ODataModel(
			// 	this.getMetadata().getConfig().serviceUrl);
			this.setModel(oModel);

			// // SAPUI5 OData V2
			// oModel.attachMetadataLoaded(null, function () {
			// 	var oMetadata = oModel.getServiceMetadata();
			// 	sap.m.MessageToast.show("Data Ready!");
			// 	// console.log(oMetadata);
			// }, null);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			//			this.setModel(models.createDeviceModel(), "device");
		}
	});
});