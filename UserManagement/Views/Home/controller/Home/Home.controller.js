sap.ui.define([
    "tmp_demo/controller/BaseController",
    "tmp_demo/model/DbManager",
    "tmp_demo/utils/MessageHelper",
    "sap/m/MessageBox",
    "tmp_demo/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "tmp_demo/model/db/UserDB",
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
    function (BaseController, DbManager, MessageHelper, MessageBox, Constants, JSONModel, UserDB, Formatter, Format, MessageToast, Utility,
        Button, Dialog, List, StandardListItem, Controller, ButtonType) {
        "use strict";
        return BaseController.extend("tmp_demo.controller.Home.Home", {

            onInit: function () {
                BaseController.prototype.onInit.apply(this, arguments);
                //this.getRouter().getRoute('home').attachPatternMatched(this._onRouteMatched, this);
            },

            onUserNav: function () {
                this.getRouter().navTo('user');
            }

        })
    });
