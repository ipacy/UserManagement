sap.ui.define([
    "tmp_demo/controller/BaseController",
    "tmp_demo/model/DbManager",
    "tmp_demo/utils/MessageHelper",
    "sap/m/MessageBox",
    "tmp_demo/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "tmp_demo/model/db/LoginDB",
    "tmp_demo/utils/Formatter",
    "sap/gantt/misc/Format",
    "sap/m/MessageToast",
    "sap/gantt/misc/Utility",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/List',
    'sap/m/StandardListItem',
    'sap/ui/core/mvc/Controller',
    'sap/m/ButtonType'
],
    function (BaseController, DbManager, MessageHelper, MessageBox, Constants, JSONModel,
        LoginDB, Formatter, Format, MessageToast, Utility,
        Button, Dialog, List, StandardListItem, Controller, ButtonType) {
        "use strict";
        return BaseController.extend("tmp_demo.controller.Home.Home", {

            onInit: function () {
                /* BaseController.prototype.onInit.apply(this, arguments);
                 this.getRouter().getRoute('user')
                     .attachPatternMatched(this._onRouteMatched, this);*/
                this.getRouter().attachRoutePatternMatched(this._handleRouteMatched, this);
            },

            onUserNav: function () {
                this.checkLogin();
            },

            _handleRouteMatched: function () {
              
            },

            checkLogin: function () {
                var that = this;
                LoginDB.checkUser({ "Name": this.getView().byId('userName').getValue()}).then(function (oData) {
                    if (oData.isActive) {
                        that.getOwnerComponent().setModel(new JSONModel(oData), 'rootModel')
                        that.getRouter().navTo('user');
                    } else {
                        MessageToast.show('Invalid Credentials');
                    }
                }.bind(that), function (oError) {
                    //that.setViewBusy(false);
                }.bind(that));
            }

        })
    });
