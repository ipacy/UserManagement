sap.ui.define([
        "tmp_demo/controller/BaseController",
],

    function (BaseController) {
        "use strict";
        return BaseController.extend("tmp_demo.controller.SplitView", {

            onInit: function () {
                BaseController.prototype.onInit.apply(this, arguments);
            }

        });
    });
