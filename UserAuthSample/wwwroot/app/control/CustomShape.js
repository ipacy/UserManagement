sap.ui.define([
    "sap/gantt/simple/BasePath", "sap/gantt/simple/RenderUtils", "sap/gantt/simple/BaseText"
], function (BasePath, RenderUtils, BaseText) {
    "use strict";

    var CustomShape = BasePath.extend("tmp_demo.CustomShape", {
        metadata: {
            properties: {
                type: {type: "int", defaultValue: 1},
                title: {type: "string", defaultValue: ""},
                showTitle: {type: "boolean", defaultValue: true},
            }
        }
    });

    var mAttributes = ["d", "fill", "stroke-dasharray", "transform", "style"];
    CustomShape.prototype.getD = function () {
        if (this.getType() === 1) {
            return this._getType1D();
        } else {
            return this._getType2D();
        }
    };

    CustomShape.prototype._getType1D = function () {
        var iYCenter = this.getRowYCenter(),
            iXCenter = this.getXByTime(this.getTime()),
            iHeight = this._iBaseRowHeight - 10,
            iBottom = iYCenter + iHeight / 2,
            iTop = iYCenter;

        return "M " + iXCenter + " " + iBottom + " L " + (iXCenter + 5) + " " + iTop + " L " + (iXCenter - 5) + " " +
            iTop + " Z";
    };

    CustomShape.prototype._getType2D = function () {
        var iYCenter = this.getRowYCenter(),
            iXStart = this.getXByTime(this.getTime()),
            iXEnd = this.getXByTime(this.getEndTime()),
            iHeight = this._iBaseRowHeight - 10,
            iBottom = iYCenter + iHeight / 2,
            iTop = iYCenter - iHeight / 2;

        return "M " + iXStart + " " + iBottom + " Q " + (iXStart - 10) + " " + iYCenter + " " + iXStart + " " + iTop +
            " L " + iXEnd + " " + iTop + " Q " + (iXEnd + 10) + " " + iYCenter + " " + iXEnd + " " + iBottom + " Z";
    };

    CustomShape.prototype.renderElement = function(oRm, oElement) {
        oRm.write("<path");
        this.writeElementData(oRm);
        oRm.writeClasses(this);
        RenderUtils.renderAttributes(oRm, oElement, mAttributes);
        oRm.writeAttribute("shape-rendering", "crispedges");
        oRm.write(">");
        RenderUtils.renderTooltip(oRm, oElement);
        oRm.write("</path>");

        if (oElement.getShowTitle == null || !oElement.getShowTitle()) { return; }

        var sTitle = oElement.getTitle();
        if (sTitle) {
            var iHead = 0, iEllipseWidth = 3;

            var iLeftPaddingPixel = 2 + iHead,
                iDefaultFontSize  = 12;

            var mTextSettings = {
                x: oElement.getXByTime(oElement.getTime()) + iLeftPaddingPixel,
                // x: 400,
                y: oElement.getRowYCenter() + iDefaultFontSize / 2,
                // y: 20,
                text: sTitle,
                fill: "#000",
                showEllipsis: true,
                // truncateWidth: iEllipseWidth
            };

            var oTitle = new BaseText(mTextSettings).addStyleClass("sapGanttTextNoPointerEvents");
            oTitle.setProperty("childElement", true, true);
            oTitle.renderElement(oRm, oTitle);
        }
    };


    return CustomShape;
});
