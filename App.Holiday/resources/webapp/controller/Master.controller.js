sap.ui.define([
		"sap/ui/core/mvc/Controller", "sap/ui/model/Filter",
		"sap/ui/model/json/JSONModel",
		"sapui5/libraryApp/commons/formatter",
		"sapui5/libraryApp/commons/types",
		"sapui5/libraryApp/commons/Validator",
		"sap/ui/core/ValueState",
		"sapui5/libraryApp/commons/SystemInfo"
	],
	function (Controller, Filter, JSONModel, formatter, types, Validator, ValueState, SystemInfo) {
		"use strict";

		return Controller.extend("sapui5.holiday.App.Holiday.controller.Master", {

			formatter: formatter,
			types: types,

			onInit: function () {

				// Global variable	
				window.oJSView = this.getView();

				// Attaches validation handlers
				sap.ui.getCore().attachValidationError(
					function (oEvent) {
						oEvent.getParameter("element").setValueState(ValueState.Error);
					});
				sap.ui.getCore().attachValidationSuccess(
					function (oEvent) {
						oEvent.getParameter("element").setValueState(ValueState.None);
					});

				// Holidays JSON Query
				var oModel_Holidays = new sap.ui.model.json.JSONModel();
				oModel_Holidays.loadData(
					"../xsjs/Holiday_md.xsjs", "GET", false);

				// provinces JSON Query
				var oModel_Provinces = new sap.ui.model.json.JSONModel();
				oModel_Provinces.loadData(
					"../xsjs/Province_md.xsjs", "GET", false);

				this.oHolidayCombo = new sap.m.ComboBox("myHolidayCombo");
				this.oHolidayCombo.setModel(oModel_Holidays); // lookup_tables
				this.oHolidayCombo.bindAggregation("items", {
					path: "/Holidays",
					template: new sap.ui.core.ListItem({
						key: "{HOLIDAY_ID}",
						text: "{HOLIDAY_TXT}"
					})
				});
				this.oHolidayCombo.attachChange(this.onCheckComboBox, this);

				// Province ComboBox
				this.oProvincescombo = new sap.m.ComboBox("myProvinceCombo", {});
				this.oProvincescombo.setModel(oModel_Provinces); // lookup_tables
				this.oProvincescombo.bindAggregation("items", {
					path: "/Province",
					template: new sap.ui.core.ListItem({
						key: "{REGION}",
						text: "{TXTSH}"
					})
				});
				this.oProvincescombo.attachChange(this.onCheckComboBox, this);

				// validation
				// JSON dummy data
				var oDataVal = {
					text: null,
					number: 500,
					myDate: new Date()
				};
				this.oModelVal = new JSONModel();
				this.oModelVal.setData(oDataVal);
				sap.ui.getCore().setModel(this.oModelVal);

				// Date
				this.oInputDate = new sap.m.DatePicker("myDateInput", {
					displayFormat: "MMM-dd-YYYY",
					valueFormat: "yyyy-MM-dd",
					required: true
				});

				this.oInputDate.setModel(this.oModelVal);
				this.oInputDate.bindProperty("value", {
					path: "/myDate",
					type: new control.tables.myDate
				});

				// user section
				var oModel_User = new sap.ui.model.json.JSONModel();
				oModel_User.loadData(
					"../xsjs/user_session.xsjs", "GET", false);

				// System Info
				this.mySystemInfo = new SystemInfo(); // declare
			},

			onListPress: function (oEvent) {
				// general get selected Item - to be used maybe latter

				var oItem = oEvent.getSource();
				if (oItem.getId() === "mySearchCombo") {

					var oListBinding = sap.ui.getCore().byId("mytable").getBinding("items");
					oListBinding.aSorters = null;
					oListBinding.aFilters = null;
					sap.ui.getCore().byId("mytable").getModel().refresh(true);

				}

			},

			onLiveSearch: function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {} else {
					//						window.oJSView.getController().mySystemInfo.CheckConnection();
					var tpmla = oEvent.getParameter("newValue");
					var filters = new Array();
					var sSearchID = oSearchCombo.getSelectedKey();
					switch (sSearchID) {
					case "1":
						var oFilter = new sap.ui.model.Filter("DATE",
							sap.ui.model.FilterOperator.Contains, tpmla);
						break;
					case "2":
						var oFilter = new sap.ui.model.Filter("PROVINCE",
							sap.ui.model.FilterOperator.Contains, tpmla);
						break;
					case "3":
						var oFilter = new sap.ui.model.Filter("HOLIDAY_ID",
							sap.ui.model.FilterOperator.Contains, tpmla);
						break;

					}
					filters.push(oFilter);

					// get list created in view
					this.oTable = sap.ui.getCore().byId("mytable");
					this.oTable.getBinding("items").filter(filters);
				}
			},

			onSearch: function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					window.location.reload();
				}
			},

			onValidate: function (myForm) {
				// Create new validator instance
				var validator = new Validator();
				validator.validate(sap.ui.getCore().byId(myForm));
				return validator.isValid();

			},

			onCheckComboBox: function (oEvent) {
				var newval = oEvent.getParameter("newValue");
				var key = oEvent.getSource().getSelectedItem();

				if (key === null) {
					oEvent.getSource().setValue("");
					oEvent.getSource().setValueState("Error");
				} else {
					oEvent.getSource().setValueState("None");
				}
			}

		});
	});