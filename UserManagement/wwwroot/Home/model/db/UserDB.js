sap.ui.define([
    "tmp_demo/model/BaseDb"
], function (BaseDb) {
    "use strict";

        let UserDB = BaseDb.extend("tmp_demo.model.db.UserDB", {});

        UserDB.getUserList = function () {
        return BaseDb.callServer("GET", "/api/user");
    };

        UserDB.getUserById = function (sId) {
        return BaseDb.callServer("GET", "/api/user/" + sId);
    };
    
        UserDB.addUser = function (ostate) {
        return BaseDb.callServer("POST", "/api/user/", ostate);
    };

        UserDB.updateUserState = function (sId, ostate) {
        return BaseDb.callServer("PUT", "/api/user/" + sId, ostate);
    };

        UserDB.deleteUser = function (sId) {
        return BaseDb.callServer("DELETE", "/api/user/" + sId);
    };

        return UserDB;
});
