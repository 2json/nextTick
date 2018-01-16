(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.nextTick = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined';
var UA = isBrowser && window.navigator.userAgent.toLowerCase();
var isIOS = UA && /iphone|ipod|ipad|ios/.test(UA);

function isNative(constructor) {
    return /native code/.test(constructor.toString())
}

var nextTick = function () {
    var callbacks = [];
    var pending = false;
    var timerFunc;

    function nextTickHandler() {
        pending = false;
        var copies = callbacks.slice(0);
        callbacks.length = 0;
        copies.map(function (copy) { return copy(); });
    }

    if(typeof Promise !== 'undefined' && isNative(Promise)) {
        var p = Promise.resolve();
        var logError = function (error) { return console.error(error); };
        timerFunc = function () {
            p.then(nextTickHandler).catch(logError);
            if(isIOS) { setTimeout(function () {}); }
        };
    }else if(typeof MutationObserver !== 'undefined' && isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]') {
        var counter = 1;
        var observer = new MutationObserver(nextTickHandler);
        var textNode = document.createElementText(String(counter));

        observer.observe(textNode, {
            characterData: true
        });

        timerFunc = function () {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
        };
    }else {
        timerFunc = function () {
            setTimeout(nextTickHandler);
        };
    }
    return function (cb, ctx) {
        var _resolve;
        callbacks.push(function () {
            if(cb) { cb.call(ctx); }
            if(_resolve) { _resolve(ctx); }
        });
        if(!pending) {
            pending = true;
            timerFunc();
        }
        if(!cb && typeof Promise !== 'undefined') {
            return new Promise(function (resolve) { return _resolve = resolve; })
        }
    }
};

var nextTick$1 = nextTick();

return nextTick$1;

})));
