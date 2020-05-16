sap.ui.define([
    "sap/ui/base/ManagedObject",
    "tmp_demo/model/DbManager"
], function (ManagedObject, DbManager) {
    "use strict";

    var BaseDb = ManagedObject.extend("tmp_demo.model.BaseDb", {
        metadata: {
            properties: {},
            events: {}
        }
    });

    BaseDb.callServer = function (method, apiUrl, payload, async) {
        return DbManager.callServer(method, apiUrl, payload, async);
    };

    return BaseDb;
});