function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.n3wc.touchtoedit/" + s : s.substring(0, index) + "/com.n3wc.touchtoedit/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function setLabel(textValue) {
        if (editContainer) {
            editContainer.removeAllChildren();
            var label = Ti.UI.createLabel(labelSettings);
            label.touchEnabled = false;
            editContainer.add(label);
            $.value(textValue);
        }
    }
    function getInput() {
        switch (inputTypeSetting) {
          case "textfield":
            var textField = Ti.UI.createTextField(inputSettings);
            return textField;

          case "textarea":
            var textField = Ti.UI.createTextArea(inputSettings);
            return textField;

          case "switch":
            focusSetting = false;
            var switchContainer;
            switchContainer = "undefined" != typeof inputSettings && "undefined" != typeof inputSettings.switchContainer && inputSettings.switchContainer ? Ti.UI.createView(inputSettings.switchContainer) : Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            "undefined" == typeof inputSettings ? inputSettings = {
                value: value ? true : false
            } : inputSettings.value = "undefined" == typeof inputSettings.value ? value ? true : false : value ? true : false;
            var switchInput = Ti.UI.createSwitch(inputSettings);
            "undefined" == typeof inputDoneSettings && (inputDoneSettings = {
                title: "OK"
            });
            var doneButton = Ti.UI.createButton(inputDoneSettings, doneButton);
            doneButton.addEventListener("click", backToText);
            switchContainer.add(switchInput);
            switchContainer.add(doneButton);
            return switchContainer;

          case "slider":
            focusSetting = false;
            var switchContainer;
            switchContainer = "undefined" != typeof inputSettings && "undefined" != typeof inputSettings.switchContainer && inputSettings.switchContainer ? Ti.UI.createView(inputSettings.switchContainer) : Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            "undefined" == typeof inputSettings ? inputSettings = {
                min: 0,
                max: 50,
                value: value
            } : inputSettings.value = "undefined" == typeof inputSettings.value ? value : value;
            "undefined" == typeof inputDoneSettings && (inputDoneSettings = {
                title: "OK"
            });
            var switchInput = Ti.UI.createSlider(inputSettings);
            var sliderDisplay = Ti.UI.createLabel(inputLabelSettings);
            var doneButton = Ti.UI.createButton(inputDoneSettings);
            sliderDisplay.text = value;
            switchInput.addEventListener("change", function(e) {
                sliderDisplay.text = e.value.toFixed(inputSettings.toFixed ? inputSettings.toFixed : 0);
            });
            doneButton.addEventListener("click", backToText);
            switchContainer.add(sliderDisplay);
            switchContainer.add(switchInput);
            switchContainer.add(doneButton);
            return switchContainer;

          default:
            return Ti.UI.createTextField(inputSettings);
        }
    }
    function switchToInputFunc() {
        if (editMode) return;
        editContainer.removeAllChildren();
        newInput = getInput();
        newInput.value = value;
        "switch" !== inputTypeSetting && "slider" !== inputTypeSetting && newInput.addEventListener("blur", backToText);
        editContainer.add(newInput);
        focusSetting && setTimeout(function() {
            newInput.focus();
        }, 100);
        editMode = true;
        Ti.API.info("typeof(parentWindow):: " + typeof parentWindow);
        Ti.API.info("(parentWindow):: " + (parentWindow ? "true" : "false"));
        if (true && "undefined" != typeof parentWindow && parentWindow) {
            parentWindow.addEventListener("android:back", backToText);
            eventAdded = true;
            Ti.API.info("adding back event");
        }
    }
    function backToText() {
        if (editMode) {
            editMode = false;
            if (true && eventAdded) {
                parentWindow.removeEventListener("android:back", backToText);
                Ti.API.info("removing back event");
                eventAdded = false;
            }
            switch (inputTypeSetting) {
              case "switch":
                setLabel(newInput.getChildren()[0].value);
                break;

              case "slider":
                setLabel(newInput.getChildren()[0].text);
                break;

              default:
                newInput && setLabel(newInput.value);
            }
            handlers.blur();
        }
    }
    new (require("alloy/widget"))("com.n3wc.touchtoedit");
    this.__widgetId = "com.n3wc.touchtoedit";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.core = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "core"
    });
    $.__views.core && $.addTopLevelView($.__views.core);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var eventType = "longpress";
    var value;
    var newInput;
    var inputTypeSetting;
    var editMode = false;
    var focusSetting;
    var containerSettings;
    var labelSettings;
    var inputSettings;
    var inputDoneSettings;
    var inputLabelSettings;
    var editContainer;
    var parentWindow;
    var eventAdded = false;
    var handlers = {};
    handlers.blur = function() {};
    exports.addEventListener = function(listenerName, listenerFunction) {
        switch (listenerName) {
          case "blur":
            handlers.blur = listenerFunction;
        }
    };
    exports.init = function(args) {
        Ti.API.info("args::: " + JSON.stringify(args));
        inputTypeSetting = "undefined" != typeof args.inputType ? args.inputType.toLowerCase() : "textfield";
        focusSetting = "undefined" != typeof args.focus ? args.focus : true;
        value = args.value;
        eventType = "undefined" != typeof args.eventType ? args.eventType.toLowerCase() : "longpress";
        containerSettings = args.container;
        labelSettings = args.label;
        inputSettings = args.input;
        inputDoneSettings = args.inputDone;
        inputLabelSettings = args.inputLabel;
        editContainer = "undefined" != typeof containerSettings ? Ti.UI.createView(containerSettings) : Ti.UI.createView({
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        $.core.add(editContainer);
        parentWindow = args.parentWindow;
        if (!_.contains([ "click", "dblclick", "doubletap", "longclick", "longpress", "pinch", "singletap", "swipe", "twofingertap" ], eventType)) throw {
            name: "Invalid Event",
            message: "Unsupported event passed"
        };
        editContainer.addEventListener(eventType, switchToInput);
        setLabel(value);
    };
    exports.destroy = function() {
        if (true && eventAdded) {
            parentWindow.removeEventListener("android:back", backToText);
            Ti.API.info("remov back event");
            eventAdded = false;
        }
        editContainer && editContainer.removeAllChildren();
        newInput = null;
        parentWindow = null;
        editContainer = null;
    };
    var switchToInput = _.debounce(switchToInputFunc, 100, true);
    $.value = function(val) {
        if ("undefined" != typeof val) {
            editContainer.getChildren()[0].value = editContainer.getChildren()[0].text = editContainer.text = value = val;
            "switch" === inputTypeSetting && "undefined" != typeof labelSettings.display && (editContainer.getChildren()[0].text = "bool" === labelSettings.display ? value ? "true" : "false" : value ? 1 : 0);
            return value;
        }
        return value;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;