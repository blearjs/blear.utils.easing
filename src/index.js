'use strict';

var bezier = require('blear.shims.bezier');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');

// css3 内置的缓冲类型
var cssEasingMap = require('./easing.json', 'json');

object.each(cssEasingMap, function (key, args) {
    /**
     * @method ease
     * @method in
     * @method in-back
     * @method in-circ
     * @method in-cubic
     * @method in-expo
     * @method in-out
     * @method in-out-back
     * @method in-out-circ
     * @method in-out-expo
     * @method in-out-quart
     * @method in-out-quint
     * @method in-out-sine
     * @method in-quad
     * @method in-quart
     * @method in-quint
     * @method in-sine
     * @method linear
     * @method out
     * @method out-back
     * @method out-circ
     * @method out-cubic
     * @method out-expo
     * @method out-quad
     * @method out-quart
     * @method out-quint
     * @method out-sine
     * @method snap
     * @param {Number} t
     * @returns {Number}
     */
    exports[key] = bezier.create.apply(bezier, args);
});


/**
 * timing function
 * @param easing {string|Array} easing 名称、坐标
 * @returns {string}
 */
exports.timingFunction = function (easing) {
    var timingFunctionArray;

    if (typeis.Array(easing)) {
        timingFunctionArray = easing;
    } else {
        timingFunctionArray = cssEasingMap[easing];
    }

    if (!timingFunctionArray) {
        timingFunctionArray = cssEasingMap.linear;
    }

    return 'cubic-bezier(' + timingFunctionArray.join(',') + ')';
};