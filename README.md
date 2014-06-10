com.n3wc.touchtoedit
====================================

Alloy Titanium widget to toggle a label into inputs (textbox/area, switch & slider) from touch events.

![image](http://i.imgur.com/2y8cS7S.gif)

Note: This uses underscore's debounce which will throw an error on android unless you use the work around found here: https://github.com/n3wc/TiProtoBootstrap/blob/master/app/alloy.js


### Cross Platform

Tested on **iOS 7+** and **Android**


## Installation

#### Via Gittio

```
gittio install com.n3wc.touchtoedit
```

#### Via Github

```
git clone git@github.com:n3wc/com.n3wc.touchtoedit.git app/widgets/com.n3wc.touchtoedit
```

And add in your *config.json*, under `dependencies`:

```
"dependencies": {
    "com.n3wc.touchtoedit": "*"
}
```

#### Usage
View XML
```xml
<Require type="widget" src="com.n3wc.touchtoedit" id="demo"/>
```
controller JS
```javascript
var config = {
	eventType:'',//'click','dblclick','doubletap','longclick','longpress','pinch','singletap','swipe','twofingertap'
	inputType:'',//TextField, TextArea, Switch, Slider defaults to TextField
	focus:''//bool to focus textbox/area on toggle
	value:'',//initial value; slider: numeric, switch: bool, textbox/area: string
	container:{},//object that is directly passed to root container createView() default is {width:Ti.UI.SIZE,height:Ti.UI.SIZE}
	label:{},//object that is directly passed to label createLabel() default is {} text value is set after createLabel()
	input:{},//object that is directly passed to input type you are creating createTextField()/createTextArea()/createSwitch()/createSlider() default is {}
	inputDone:{},//object that is directly passed to button createButton() on switch/slider default is {title:'OK'}
	parentWindow:{}//ANDROID ONLY this is needed to override the back button to toggle inputs back into labels
}
$.demo.init(config);

//there is also a blur event that is fired when the edit controls toggle back to a label
$.demo.addEventListener('blur',function(){
	Ti.API.info('demo blur new value::: ' + $.demo.value());
});
```

#### Options
""switch**
the label object in config adds an additional paramerter 'display' which if passed 'bool' will display the text 'true' or 'false' else 1 or 0
label:{display:'bool'}
