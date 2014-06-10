/*
 * Written by jesse newcomer @n3wc
 * please feel free to send pull requests!
 * https://github.com/n3wc/touchtoedit
 */
var args = arguments[0] || {};
var eventType ='longpress';
var value;
var input;
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
if(OS_ANDROID){
	var parentWindow;//to catch back button
	var eventAdded = false;	
}


var handlers = {};
handlers.blur = function(r){};
exports.addEventListener = function(listenerName, listenerFunction){
	switch(listenerName){
		case 'blur' : 
			handlers.blur = listenerFunction;
			break;
	}
};

exports.init = function(args){
	inputTypeSetting=typeof(args.inputType) !== "undefined"?args.inputType.toLowerCase():'textfield';//TextField, TextArea, Switch, Slider
	focusSetting=typeof(args.focus) !== "undefined"?args.focus:true;
	value = args.value;
	eventType = typeof(args.eventType) !== "undefined"?args.eventType.toLowerCase():'longpress';
	containerSettings = args.container;
	labelSettings = args.label;
	inputSettings = args.input;
	inputDoneSettings = args.inputDone;
	inputLabelSettings = args.inputLabel;
	if(typeof(containerSettings) !== "undefined"){
		editContainer = Ti.UI.createView(containerSettings);	
	}else{
		editContainer = Ti.UI.createView({width:Ti.UI.SIZE,height:Ti.UI.SIZE});
	}
	$.core.add(editContainer);
	if(OS_ANDROID){
		parentWindow = args.parentWindow;
	}
	if(_.contains(['click','dblclick','doubletap','longclick','longpress','pinch','singletap','swipe','twofingertap'],eventType)){
		editContainer.addEventListener(eventType,switchToInput);
	}else{
		throw { 
		    name:        "Invalid Event", 
		    message:     "Unsupported event passed", 
		};
	}
	setLabel(value);
};

exports.destroy = function() {
	if(OS_ANDROID && eventAdded){
		parentWindow.removeEventListener('android:back',  backToText);
		eventAdded=false;
	}
	if(editContainer){
		editContainer.removeAllChildren();
	}
	newInput = null;
	parentWindow=null;
	editContainer=null;
};

function setLabel(textValue){
	if(editContainer){
		editContainer.removeAllChildren();
		var label = Ti.UI.createLabel(labelSettings);
		label.touchEnabled=false;
		editContainer.add(label);
		$.value(textValue);
	}
	
}
function getInput(){
	switch(inputTypeSetting){
		case 'textfield':
			var textField =  Ti.UI.createTextField(inputSettings);
			return textField;
		case 'textarea':
			var textField =  Ti.UI.createTextArea(inputSettings);
			return textField;
		case 'switch':
			focusSetting=false;
			var switchContainer;
			if(typeof(inputSettings) !== "undefined" && typeof(inputSettings.switchContainer) !== "undefined" && inputSettings.switchContainer){
				switchContainer = Ti.UI.createView(inputSettings.switchContainer);
			}else{
				switchContainer = Ti.UI.createView({layout:'horizontal',width:Ti.UI.SIZE,height:Ti.UI.SIZE});
			}
			if(typeof(inputSettings) === "undefined"){
				inputSettings ={value:value?true:false};
			}else if(typeof(inputSettings.value) === "undefined"){
				inputSettings.value=value?true:false;
			}else{
				inputSettings.value=value?true:false;
			}
			var switchInput =  Ti.UI.createSwitch(inputSettings);
			if(typeof(inputDoneSettings) === "undefined"){
				inputDoneSettings ={title:'OK'};
			}
			var doneButton = Ti.UI.createButton(inputDoneSettings,doneButton);
			doneButton.addEventListener('click',backToText);
			switchContainer.add(switchInput);
			switchContainer.add(doneButton);
			return switchContainer;
		case 'slider':
			focusSetting=false;
			var switchContainer;
			if(typeof(inputSettings) !== "undefined" && typeof(inputSettings.switchContainer) !== "undefined" && inputSettings.switchContainer){
				switchContainer = Ti.UI.createView(inputSettings.switchContainer);
			}else{
				switchContainer = Ti.UI.createView({layout:'horizontal',width:Ti.UI.SIZE,height:Ti.UI.SIZE});
			}
			if(typeof(inputSettings) === "undefined"){
				inputSettings ={min:0,max:50,value:value};
			}else if(typeof(inputSettings.value) === "undefined"){
				inputSettings.value=value;
			}else{
				inputSettings.value=value;
			}
			if(typeof(inputDoneSettings) === "undefined"){
				inputDoneSettings ={title:'OK'};
			}
			var switchInput =  Ti.UI.createSlider(inputSettings);
			var sliderDisplay = Ti.UI.createLabel(inputLabelSettings);
			var doneButton = Ti.UI.createButton(inputDoneSettings);
			sliderDisplay.text=value;
			switchInput.addEventListener('change',function(e) {
			    sliderDisplay.text = e.value.toFixed(inputSettings.toFixed?inputSettings.toFixed:0);
			});
			doneButton.addEventListener('click',backToText);
			switchContainer.add(sliderDisplay);
			switchContainer.add(switchInput);
			switchContainer.add(doneButton);
			return switchContainer;
		default:
			return Ti.UI.createTextField(inputSettings);
			
	}
}

var switchToInput = _.debounce(switchToInputFunc, 100, true); 

function switchToInputFunc(){
	if(editMode){
		return;
	}
	editContainer.removeAllChildren();
	newInput = getInput();
	newInput.value=value;
	if(inputTypeSetting!=='switch' && inputTypeSetting!=='slider'){
		newInput.addEventListener('blur',backToText);	
	}
	if(OS_IOS && inputTypeSetting!=='switch' && inputTypeSetting!=='slider'){
		var doneButton = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.DONE});
		doneButton.addEventListener('click',backToText);
		var keyboard_btns = [Titanium.UI.createButton({systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE}),doneButton];
		newInput.keyboardToolbar=keyboard_btns;
	}
	editContainer.add(newInput);
	if(focusSetting){
		setTimeout(function(){newInput.focus();},100);
	}
	editMode=true;
	if(OS_ANDROID && typeof(parentWindow) !== "undefined" && parentWindow){
		parentWindow.addEventListener('android:back',  backToText);
		eventAdded=true;
	}
}


function backToText(e){
	if(editMode){
		editMode=false;
		if(OS_ANDROID && eventAdded){
			parentWindow.removeEventListener('android:back',  backToText);	
			eventAdded=false;
		}
		switch(inputTypeSetting){
			case 'switch':
				setLabel(newInput.getChildren()[0].value);
				break;
			case 'slider':
				setLabel(newInput.getChildren()[0].text);
				break;
			default:
				if(newInput){
					setLabel(newInput.value);
				}
				break;
		}
		handlers.blur();
	}
}


$.value = function(val){
	if(typeof(val) !== "undefined"){
		editContainer.getChildren()[0].value = editContainer.getChildren()[0].text = editContainer.text = value = val;
		if(inputTypeSetting==='switch' && typeof(labelSettings.display) !== "undefined"){
			if(labelSettings.display === 'bool'){
				editContainer.getChildren()[0].text =  value?'true':'false';
			}else{
				editContainer.getChildren()[0].text =  value?1:0;
			}
		}
		return value;
	}else{
		return value;
	}
	
};