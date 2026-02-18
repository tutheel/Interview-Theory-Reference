"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LegacyMath;
(function (LegacyMath) {
    LegacyMath.PI = 3.14159;
    function areaOfCircle(radius) {
        return LegacyMath.PI * radius * radius;
    }
    LegacyMath.areaOfCircle = areaOfCircle;
})(LegacyMath || (LegacyMath = {}));
const ModernMath = {
    add(a, b) {
        return a + b;
    },
    multiply(a, b) {
        return a * b;
    }
};
console.log("Namespace area:", LegacyMath.areaOfCircle(3));
console.log("Object module add:", ModernMath.add(10, 5));
console.log("Object module multiply:", ModernMath.multiply(4, 6));
