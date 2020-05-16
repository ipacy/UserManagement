sap.ui.define([
    "tmp_demo/model/BaseDb"
], function (BaseDb) {
    "use strict";

    var ProjectsDB = BaseDb.extend("tmp_demo.model.db.ProjectsDB", {});

    ProjectsDB.getAllProjects = function () {
        return BaseDb.callServer("GET", "/api/Projects");
    };

  /*  FoodDB.getSelectedFood = function (ch) {
        return BaseDb.callServer("GET", "/s/" + ch);
    };

    FoodDB.SelectedAns = function (level, ans) {
        return BaseDb.callServer("GET", "/SelectedAns/" + level + "/" + ans);
    };

    FoodDB.createUser = function (oUser) {
        return BaseDb.callServer("POST", "/db/Users", oUser);
    };

    FoodDB.updateUser = function (sId, oUser) {
        return BaseDb.callServer("PUT", "/db/Users/" + sId, oUser);
    };

    FoodDB.deleteUser = function (sId) {
        return BaseDb.callServer("DELETE", "/db/Users/" + sId);
    };*/
    return ProjectsDB;
});
