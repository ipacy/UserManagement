sap.ui.define([
    "tmp_demo/model/BaseDb"
], function (BaseDb) {
    "use strict";

    var LoginDB = BaseDb.extend("tmp_demo.model.db.LoginDB", {});

    LoginDB.checkUser = function (user) {
        return BaseDb.callServer("POST", "/api/login", user);
    };

    LoginDB.getUserByName = function (user) {
        return BaseDb.callServer("GET", "/api/user/" + user);
    };

    LoginDB.logout = function (user) {
        return BaseDb.callServer("PUT", "/api/login/0", user);
    };

    LoginDB.getUser = function (user) {
        return BaseDb.callServer("GET", "/api/login", user);
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
    return LoginDB;
});
