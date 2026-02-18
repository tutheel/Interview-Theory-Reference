"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringTools;
(function (StringTools) {
    function shout(value) {
        return value.toUpperCase();
    }
    StringTools.shout = shout;
})(StringTools || (StringTools = {}));
console.log("Namespace output:", StringTools.shout("typescript"));
