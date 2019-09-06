sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/odata/ODataModel"
	//	"sap/ui/Device",
	//	"sapui5/holiday/App/Holiday/OData/Holiday/App/OData/model/models"
], function (UIComponent, ODataModel) {
	"use strict";

	return UIComponent.extend("sapui5.holiday.App.Holiday.OData.Holiday.App.OData.Component", {

		metadata: {
			manifest: "json",
			"config": {
				"serviceUrl": "../xsodata/Holiday.xsodata"
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			var oModel = new ODataModel(
				this.getMetadata().getConfig().serviceUrl);
			this.setModel(oModel);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			//			this.setModel(models.createDeviceModel(), "device");
		}
	});
});