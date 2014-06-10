
var demoTextBoxConfig={
		eventType:'pinch',
		inputType:'textbox',
		value:'I\'ll become a text box',
		container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
		label:{
			color:'#666'
			},
		input:{
			returnKeyType : Ti.UI.RETURNKEY_DONE, 
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color: '#336699'
			},
		parentWindow: OS_ANDROID?$.index:null
	};
 
$.demoTextBox.init(demoTextBoxConfig);

$.demoTextBox.addEventListener('blur',function(){
	Ti.API.info('demoTextBox blur new value::: ' + $.demoTextBox.value());
});


var demoTextAreaConfig ={
	eventType:'doubletap',
	inputType:'textarea',
	value:'I\'ll become a text area',
	container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
	label:{
		color:'#666'
		},
	input:{
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		height:50,
		width:250,
		},
	parentWindow: OS_ANDROID?$.index:null
	}; 
$.demoTextArea.init(demoTextAreaConfig);


var demoSwitchConfig ={
	eventType:'swipe',
	inputType:'switch',
	value:1,
	container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
	label:{
		color:'#666',
		display:'bool'
	},
	input:{
		switchContainer:null
	},
	parentWindow: OS_ANDROID?$.index:null
	};
$.demoSwitch.init(demoSwitchConfig);


var demoSliderConfig ={
	eventType:'longpress',
	inputType:'slider',
	value:30,
	container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
	label:{color:'#999'},
	input:{
		min:0,
		max:50,
		toFixed:2,
		width:80,
		switchContainer:null
	},
	parentWindow: OS_ANDROID?$.index:null
	};
$.demoSlider.init(demoSliderConfig);

var demoTextBoxtwofingertapConfig={
		eventType:'twofingertap',
		inputType:'textbox',
		value:'I\'ll become a text box',
		container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
		label:{
			color:'#666'
			},
		input:{
			returnKeyType : Ti.UI.RETURNKEY_DONE, 
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color: '#336699'
			},
		parentWindow: OS_ANDROID?$.index:null
	};
 
$.demoTextBoxtwofingertap.init(demoTextBoxtwofingertapConfig);

var demoTextBoxsingletapConfig={
		eventType:'singletap',
		inputType:'textbox',
		value:'I\'ll become a text box',
		container:{
			width:Ti.UI.FILL,
			height:50,
			backgroundColor:'#CCC'
		},
		label:{
			color:'#666'
			},
		input:{
			returnKeyType : Ti.UI.RETURNKEY_DONE, 
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color: '#336699'
			},
		parentWindow: OS_ANDROID?$.index:null
	};
 
$.demoTextBoxsingletap.init(demoTextBoxsingletapConfig);

$.index.open();


		
		