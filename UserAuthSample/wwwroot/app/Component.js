sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "tmp_demo/model/models",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
    "use strict";

    return UIComponent.extend("tmp_demo.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            this.setModel(models.createDeviceModel(), "device");

            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        },


        destroy: function () {
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        getContentDensityClass: function () {
            if (this._sContentDensityClass === undefined) {
                if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
                    this._sContentDensityClass = "";
                } else if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});
