sap.ui.define([],
    function () {
        "use strict";
        return {
            format: function (text) {
                return text+" + Formatted Text";
            },

            validateInputValues: function(pr) {
                var that = this;
                var v = this.getView();
                var canContinue = true;
                var requiredGroups={};
                $.each(v.findElements('Input'), function (i, ele) {

                    if (ele instanceof sap.m.Input || ele instanceof sap.m.DatePicker || ele instanceof sap.m.DateTimeInput || ele instanceof sap.m.TextArea) {

                        if (!ele.data().requiredGroup) {
                            if (ele.data().required == "true" && !ele.getValue()) {
                                ele.setValueState("Error");
                                that.errorStr.push(ele.data().fieldName||ele.getPlaceholder());//fieldName used if placeholder is not meaningful to show in the message
                                canContinue=false
                            }
                            else if (ele.data().validationRequired == "true" && ele.getValueState() == "Error") {
                                that.errorStr.push("\n"+ele.getValueStateText()+"\n");
                                canContinue = false
                            }else{
                                ele.setValueState("Success");
                            }
                        }
                        else{ // else is handling rquired group
                            ele.setValueState("Success");
                            var valueEl=(ele.getValue())?ele:false
                            if(requiredGroups[ele.data().requiredGroup])
                            {
                                requiredGroups[ele.data().requiredGroup].elms.push(ele);
                                if(!requiredGroups[ele.data().requiredGroup].valueEl)
                                    requiredGroups[ele.data().requiredGroup].valueEl=valueEl;

                            }
                            else
                            {
                                requiredGroups[ele.data().requiredGroup]={elms:[ele],valueEl:valueEl};

                            }
                        }
                    }
                });

                return canContinue;
            }
        };
    });
