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
        return BaseController.extend("tmp_demo.controller.User.User", {

            onInit: function () {
                BaseController.prototype.onInit.apply(this, arguments);
                this.getRouter().getRoute('user')
                    .attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function () {
                this.getAllXData();
            },

            getAllData: function () {
                var that = this;
               // that.setViewBusy(true);
                UserDB.getUserList().then(function (oData) {
                    var oModel = new JSONModel({ 'Data': oData });
                    that.getView().setModel(oModel, 'mainModel');
                  //  that.setViewBusy(false);
                }.bind(that), function (oError) {
                   //that.setViewBusy(false);
                }.bind(that));
            },

            onStatesUpdate: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
                var that = this;
/*
                var oData = {
                    name: oContext.name,
                    isComplete: oEvent.getParameter('state'),
                    id: oContext.id.toString()
                };*/
                oContext.isComplete = oEvent.getParameter('state');
                that.setViewBusy(true);
                UserDB.updateUserState(oContext.id, oContext).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                }.bind(that), function (oError) {
                    that.setViewBusy(false);
                }.bind(that));
            },

            onEditPress: function (oEvent) {
                this.playShowHide(oEvent);
            
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
            },

            onDeletePress: function (oEvent) {
                var that = this;
                that.setViewBusy(true);
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
                UserDB.deleteUser(oContext.id).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                }.bind(that), function (oError) {
                    that.setViewBusy(false);
                }.bind(that));
            },

            onSavePress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
                var that = this;
                oContext.isComplete = oEvent.getParameter('state');
                that.setViewBusy(true);
                that.playShowHide(oEvent);
                UserDB.updateUserState(oContext.id, oContext).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                   
                }.bind(that), function (oError) {
                    that.setViewBusy(false);
                }.bind(that));
            }, 
            addUserPress: function () {
                var that = this;
                that.setViewBusy(true);
                var oData = {
                    name: this.getView().byId('userInp').getValue(),
                    isComplete: false
                };
                UserDB.addUser(oData).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                }.bind(that), function (oError) {
                    that.setViewBusy(false);
                }.bind(that));
            },

            refreshDatePress: function () {
                this.getAllXData();
            },
            getAllXData: function () {
                var that = this;
                that.setViewBusy(true);
                UserDB.getUserList().then(function (oData) {
                    var oModel = new JSONModel({ 'Data': oData });
                    that.getView().setModel(oModel, 'mainModel');
                    that.setViewBusy(false);
                }.bind(that), function (oError) {
                    that.setViewBusy(false);
                }.bind(that));
            },

            onCancel: function (oEvent) {
                this.playShowHide(oEvent);
            },

            playShowHide: function (oEvent) {
                var firstElement = oEvent.getSource().getParent().getParent().getCells()[1].getItems()[0]
                var secondElement = oEvent.getSource().getParent().getParent().getCells()[1].getItems()[1]
                var fVis = secondElement.getVisible();
                var sVis = firstElement.getVisible();

                var editButton = oEvent.getSource().getParent().getItems()[0];
                var deleteButton = oEvent.getSource().getParent().getItems()[2];
                var cancelButton = oEvent.getSource().getParent().getItems()[3];

                firstElement.setVisible(fVis);
                secondElement.setVisible(sVis);
                editButton.setVisible(fVis);
                deleteButton.setVisible(sVis);
                cancelButton.setVisible(sVis);
            }

        })
    });
