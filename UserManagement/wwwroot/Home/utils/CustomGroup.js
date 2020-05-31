sap.ui.define([
    "sap/gantt/simple/BaseGroup"
], function (BaseGroup) {
    "use strict";

    var CustomGroup = BaseGroup.extend("tmp_demo.CustomGroup", {
        metadata: {
            aggregations: {
                rectangles: {type: "sap.gantt.simple.BaseShape", multiple: true, singularName: "rectangle", sapGanttOrder: 0},
                texts: {type: "sap.gantt.simple.BaseShape", multiple: true, singularName: "text", sapGanttOrder: 1}
            },

        }
    });

    return CustomGroup;
});
