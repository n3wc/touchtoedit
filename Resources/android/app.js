var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

getTime = Date.now || function() {
    return new Date().getTime();
};

_.throttle = function(func, wait, options) {
    var context, args, result, timeout, previous, later;
    timeout = null;
    previous = 0;
    options = options || {};
    later = function() {
        previous = false === options.leading ? 0 : getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
    };
    return function() {
        var now, remaining;
        now = getTime();
        previous || false !== options.leading || (previous = now);
        remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (0 >= remaining) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
        } else timeout || false === options.trailing || (timeout = setTimeout(later, remaining));
        return result;
    };
};

_.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result, later = function() {
        var last = getTime() - timestamp;
        if (wait > last) timeout = setTimeout(later, wait - last); else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    };
    return function() {
        var callNow = immediate && !timeout;
        context = this;
        args = arguments;
        timestamp = getTime();
        timeout || (timeout = setTimeout(later, wait));
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};

Alloy.createController("index");