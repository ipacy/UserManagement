sap.ui.define([
    "tmp_demo/controller/BaseController",
    "sap/m/MessageBox",
    'tmp_demo/utils/Formatter'
], function (BaseController, MessageBox, Formatter) {
    "use strict";

    return BaseController.extend("tmp_demo.controller.App", {

        onInit: function () {
            BaseController.prototype.onInit.apply(this, arguments);
            this.getRouter().attachTitleChanged(this.onTitleChanged.bind(this));
        },
        onTitleChanged: function (oEvent) {
            var oTitle = oEvent.getParameter("title");
            if (oTitle)
                this.setHeaderTitle(oTitle);
        },

        handleMenu: function (oEvent) {
            var sKey = oEvent.getParameter('item').getKey(),
                oCurrentPackage = this.getModel("globalModel").getProperty("/currentPackage");

            switch (sKey) {
                case "Logout":
                    this.logout();
                    break;
                case "groups":
                    this.getRouter().navTo(sKey,
                        {
                            "packageId": oCurrentPackage.Id
                        },
                        true);
                    break;
                default:
                    this.getRouter().navTo(sKey);
                    break;

            }

        },

        logout: function () {
            window.location.replace(window.location.origin + "/AzureAd/Account/SignOut");
        },

        onNavHome: function () {
            this.getRouter().navTo('home',
                {
                    "packageId": ""
                },
                true);
        },

        getCurrentPackageId: function (oPackage) {
            if (oPackage) return oPackage.Id;
            return undefined;
        },

        onNotificationButtonPress: function (oEvent) {
            if (!this._oNotificationPopover) {
                this._oNotificationPopover = sap.ui.xmlfragment("tmp_demo.fragments.notifications.UserNotification", this);
                this.getView().addDependent(this._oNotificationPopover);
            }

            this._oNotificationPopover.openBy(oEvent.getSource());
        },

        onNotificationClose: function (oEvent) {
            this._oNotificationPopover.close();
        }
    });
});
