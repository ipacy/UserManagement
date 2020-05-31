sap.ui.define([
    "tmp_demo/controller/BaseController",
    "tmp_demo/model/DbManager",
    "tmp_demo/utils/MessageHelper",
    "sap/m/MessageBox",
    "tmp_demo/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "tmp_demo/model/db/UserDB",
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
    function (BaseController, DbManager, MessageHelper, MessageBox, Constants, JSONModel, UserDB, LoginDB, Formatter, Format, MessageToast, Utility,
        Button, Dialog, List, StandardListItem, Controller, ButtonType) {
        "use strict";
        return BaseController.extend("tmp_demo.controller.User.User", {

            onInit: function () {
                BaseController.prototype.onInit.apply(this, arguments);
                this.getRouter().getRoute('user')
                    .attachPatternMatched(this._onRouteMatched, this);

                var oModel = new JSONModel({ 'delete': true });
                this.getView().setModel(oModel, 'props');
            },

            _onRouteMatched: function () {
                this.getUserData();
                this.getAllXData();
            },

            onLogout: function () {
                this.doLogout();
            },

            getUserData: function () {
                var that = this;
                LoginDB.getUser().then(function (oData) {
                    that.getOwnerComponent().setModel(new JSONModel(oData), 'rootModel')
                    //that.getView().getModel('props').setProperty('/delete', (oData.role == "Admin"));
                }.bind(that), function (oError) {
                    MessageToast.show('User data unavailable');
                }.bind(that));
            },

            getAllData: function () {
                var that = this;
                // that.setViewBusy(true);
                UserDB.getUserList().then(function (oData) {
                    var oModel = new JSONModel({ 'Data': oData });
                    that.getView().setModel(oModel, 'mainModel');
                    //  that.setViewBusy(false);
                }.bind(that), function (oError) {
                    MessageToast.show('Records unavailable');
                }.bind(that));
            },

            onStatesUpdate: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
                var that = this;
                oContext.IsActive = true;
                oContext.IsAdmin = oEvent.getParameter('state');
                that.setViewBusy(true);
                var omData = {
                    'isAdmin': oEvent.getParameter('state'),
                    'isActive': true,
                    'id': oContext.id,
                    'role': (oEvent.getParameter('state')) ? "Admin" : "User",
                    'email': oContext.email,
                    'name': oContext.name
                };
                UserDB.updateUserState(oContext.id, omData).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                }.bind(that), function (oError) {
                    if (oError.status == 401 || oError.status == 403) {
                        MessageToast.show('Unauthorized to perform this action');
                        return;
                    }
                    that.getAllData();
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
                    if (oError.status == 401 || oError.status == 403) {
                        MessageToast.show('Unauthorized to perform this action');
                        return;
                    }
                    that.setViewBusy(false);
                }.bind(that));
            },

            onSavePress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext('mainModel').getObject();
                var that = this;
                oContext.isComplete = oEvent.getParameter('state');
                that.setViewBusy(true);
                that.playShowHide(oEvent);
                var omData = {
                    'isAdmin': oContext.isAdmin,
                    'isActive': true,
                    'id': oContext.id,
                    'role': (oContext.isAdmin) ? "Admin" : "User",
                    'email': oContext.email,
                    'name': oContext.name
                };
                UserDB.updateUserState(oContext.id, omData).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);

                }.bind(that), function (oError) {
                    if (oError.status == 401 || oError.status == 403) {
                        MessageToast.show('Unauthorized to perform this action');
                        return;
                    }
                    that.getAllData();
                    that.setViewBusy(false);
                }.bind(that));
            },
            addUserPress: function () {
                var that = this;
                that.setViewBusy(true);
                var oData = {
                    'isAdmin': false,
                    'isActive': true,
                    'role': "User",
                    'email': this.getView().byId('userInp').getValue() + "@email.com",
                    'name': this.getView().byId('userInp').getValue()
                };

                UserDB.addUser(oData).then(function (oData) {
                    that.getAllData();
                    that.setViewBusy(false);
                    that.getView().byId('userInp').setValue("");
                }.bind(that), function (oError) {
                    if (oError.status == 401) {
                        that.getRouter().navTo('home');
                        return;
                    }
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
                    if (oError.status == 401) {
                        that.getRouter().navTo('home');
                    }
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
