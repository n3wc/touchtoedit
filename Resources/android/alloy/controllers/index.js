function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#efefef",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "40",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "pinch",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.demoTextBox = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoTextBox",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoTextBox.setParent($.__views.__alloyId0);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "doubletap",
        id: "__alloyId3"
    });
    $.__views.__alloyId0.add($.__views.__alloyId3);
    $.__views.demoTextArea = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoTextArea",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoTextArea.setParent($.__views.__alloyId0);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "swipe (switch)",
        id: "__alloyId4"
    });
    $.__views.__alloyId0.add($.__views.__alloyId4);
    $.__views.demoSwitch = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoSwitch",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoSwitch.setParent($.__views.__alloyId0);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "longpress (slider)",
        id: "__alloyId5"
    });
    $.__views.__alloyId0.add($.__views.__alloyId5);
    $.__views.demoSlider = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoSlider",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoSlider.setParent($.__views.__alloyId0);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "twofingertap",
        id: "__alloyId6"
    });
    $.__views.__alloyId0.add($.__views.__alloyId6);
    $.__views.demoTextBoxtwofingertap = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoTextBoxtwofingertap",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoTextBoxtwofingertap.setParent($.__views.__alloyId0);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "singletap",
        id: "__alloyId7"
    });
    $.__views.__alloyId0.add($.__views.__alloyId7);
    $.__views.demoTextBoxsingletap = Alloy.createWidget("com.n3wc.touchtoedit", "widget", {
        id: "demoTextBoxsingletap",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.demoTextBoxsingletap.setParent($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var demoTextBoxConfig = {
        eventType: "pinch",
        inputType: "textbox",
        value: "I'll become a text box",
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#666"
        },
        input: {
            returnKeyType: Ti.UI.RETURNKEY_DONE,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699"
        },
        parentWindow: $.index
    };
    $.demoTextBox.init(demoTextBoxConfig);
    $.demoTextBox.addEventListener("blur", function() {
        Ti.API.info("demoTextBox blur new value::: " + $.demoTextBox.value());
    });
    var demoTextAreaConfig = {
        eventType: "doubletap",
        inputType: "textarea",
        value: "I'll become a text area",
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#666"
        },
        input: {
            borderWidth: 2,
            borderColor: "#bbb",
            borderRadius: 5,
            height: 50,
            width: 250
        },
        parentWindow: $.index
    };
    $.demoTextArea.init(demoTextAreaConfig);
    var demoSwitchConfig = {
        eventType: "swipe",
        inputType: "switch",
        value: 1,
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#666",
            display: "bool"
        },
        input: {
            switchContainer: null
        },
        parentWindow: $.index
    };
    $.demoSwitch.init(demoSwitchConfig);
    var demoSliderConfig = {
        eventType: "longpress",
        inputType: "slider",
        value: 30,
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#999"
        },
        input: {
            min: 0,
            max: 50,
            toFixed: 2,
            width: 80,
            switchContainer: null
        },
        parentWindow: $.index
    };
    $.demoSlider.init(demoSliderConfig);
    var demoTextBoxtwofingertapConfig = {
        eventType: "twofingertap",
        inputType: "textbox",
        value: "I'll become a text box",
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#666"
        },
        input: {
            returnKeyType: Ti.UI.RETURNKEY_DONE,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699"
        },
        parentWindow: $.index
    };
    $.demoTextBoxtwofingertap.init(demoTextBoxtwofingertapConfig);
    var demoTextBoxsingletapConfig = {
        eventType: "singletap",
        inputType: "textbox",
        value: "I'll become a text box",
        container: {
            width: Ti.UI.FILL,
            height: 50,
            backgroundColor: "#CCC"
        },
        label: {
            color: "#666"
        },
        input: {
            returnKeyType: Ti.UI.RETURNKEY_DONE,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699"
        },
        parentWindow: $.index
    };
    $.demoTextBoxsingletap.init(demoTextBoxsingletapConfig);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;