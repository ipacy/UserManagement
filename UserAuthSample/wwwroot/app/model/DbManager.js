sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
    function (JSONModel) {
        "use strict";
        return {

            callServer: function (method, apiUrl, payload, async) {

                var oPromise = new Promise(function (fnResolve, fnReject) {

                    if (async !== false)
                        async = true;

                    if (payload === undefined)
                        payload = {};

                    if (method === undefined)
                        method = "GET";

                    jQuery.ajax({
                        url: apiUrl,
                        contentType: "application/json",
                        dataType: "json",
                        type: method,
                        data: JSON.stringify(payload),
                        async: async,
                        cache: true,

                        beforeSend: function (xhr) {

                        },

                        success: function (oResponse) {
                            fnResolve(oResponse);
                        },

                        error: function (err) {
                            fnReject(err);
                        }
                    });
                });

                return oPromise;
            }

        };
    });
