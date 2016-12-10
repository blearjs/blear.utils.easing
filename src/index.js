'use strict';

var bezier = require('blear.shims.bezier');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var access = require('blear.utils.access');
var array = require('blear.utils.array');

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


var makeEasing = function (easing) {
    var args;

    if (typeis.Array(easing)) {
        args = easing;
    } else {
        args = cssEasingMap[easing];

        if (!args) {
            return easing;
        }
    }

    var argString = args.join(',');

    // transition-timing-function: ease
    // transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1)
    // transition-timing-function: step-start
    // transition-timing-function: step-end
    // transition-timing-function: steps(4, start)
    // transition-timing-function: steps(4, end)
    // transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1)
    // transition-timing-function: inherit
    if (args.length === 2) {
        return 'steps(' + argString + ')';
    }

    return 'cubic-bezier(' + argString + ')';
};


/**
 * timing function
 * @param easing {string|Array} easing 名称、坐标
 * @returns {string}
 */
exports.timingFunction = function (easing) {
    var args = access.args(arguments);
    var timingFunctionList = [];

    if (args.length === 1 && typeis.Array(args[0])) {
        var guessIs2DimensionArray = false;
        var lastTypeis;

        array.each(args[0], function (index, item) {
            // steps(Number, end) || cubic-bezier(0.1, 0.7, 1.0, 0.1)
            if (typeis.String(item) && lastTypeis !== 'number' || typeis.Array(item)) {
                guessIs2DimensionArray = true;
                return false;
            }

            lastTypeis = typeis(item);
        });

        if (guessIs2DimensionArray) {
            args = args[0];
        }
    }

    array.each(args, function (index, arg) {
        timingFunctionList.push(makeEasing(arg));
    });

    return timingFunctionList.join(',');
};