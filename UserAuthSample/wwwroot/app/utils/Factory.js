sap.ui.define([
        "sap/m/MessageBox",
        "tmp_demo/utils/Constants",
        "sap/ui/model/json/JSONModel",
        "tmp_demo/utils/Formatter",
        "sap/m/MessageToast",
        "sap/m/Button",
        "sap/m/Text",
        "sap/ui/core/Locale",
        "sap/ui/core/LocaleData",
        "sap/ui/model/type/Currency",
        "sap/m/ObjectAttribute"
    ],
    function (MessageBox, Constants, JSONModel, Formatter, MessageToast, Button, Text,
              Locale, LocaleData, Currency, ObjectAttribute) {
        "use strict";
        return {
            that:{},
            formatMail: function(sFirstName, sLastName) {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                return mobileLibrary.URLHelper.normalizeEmail(
                    sFirstName + "." + sLastName + "@example.com",
                    oBundle.getText("mailSubject", [sFirstName]),
                    oBundle.getText("mailBody"));
            },

            formatStockValue : function(fUnitPrice, iStockLevel, sCurrCode) {
                var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
                var oLocale = new Locale(sBrowserLocale);
                var oLocaleData = new LocaleData(oLocale);
                var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
                return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
            },

            onItemSelected : function(oEvent, controller) {
                this.that = controller;
                var oSelectedItem = oEvent.getSource();
                var oContext = oSelectedItem.getBindingContext("products");
                var sPath = oContext.getPath();
                var oProductDetailPanel = controller.byId("productDetailsPanel");
                oProductDetailPanel.bindElement({ path: sPath, model: "products" });
            },

            productListFactory : function(sId, oContext) {
                var oUIControl;

                // Decide based on the data which dependant to clone
                if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
                    // The item is discontinued, so use a StandardListItem
                    oUIControl = sap.ui.getCore().byId('__component0---template1--productSimple').clone(sId);
                } else {
                    // The item is available, so we will create an ObjectListItem
                    oUIControl = sap.ui.getCore().byId('__component0---template1--productExtended').clone(sId);

                    // The item is temporarily out of stock, so we will add a status
                    if (oContext.getProperty("UnitsInStock") < 1) {
                        oUIControl.addAttribute(new ObjectAttribute({
                            text : {
                                path: "i18n>outOfStock"
                            }
                        }));
                    }
                }

                return oUIControl;
            }
        };
    });
