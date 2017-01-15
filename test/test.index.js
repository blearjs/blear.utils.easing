/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var easing = require('../src/index.js');

describe('index.js', function () {
    it('.linear', function (done) {
        var checker = function (x) {
            return x;
        };
        var index = 0;
        var linear = easing.linear;

        while (true) {
            index += 0.1;
            expect(linear(index)).toEqual(checker(index));
            if (index >= 0.9) {
                break;
            }
        }

        done();
    });

    it('.create', function (done) {
        var checker = function (x) {
            return x;
        };
        var index = 0;
        var linear = easing.create(0, 0, 1, 1);

        while (true) {
            index += 0.1;
            expect(linear(index)).toEqual(checker(index));
            if (index >= 0.9) {
                break;
            }
        }

        done();
    });

    it('.timingFunction 字符串', function () {
        var ret1 = easing.timingFunction('linear');
        var ret2 = easing.timingFunction('linear2');
        var ret3 = easing.timingFunction('step-start');

        expect(ret1).toEqual('cubic-bezier(0,0,1,1)');
        expect(ret2).toEqual('linear2');
        expect(ret3).toEqual('step-start');
    });

    it('.timingFunction 数组', function () {
        var ret1 = easing.timingFunction([0.3, 0.6, 0.2, 0.1]);
        var ret2 = easing.timingFunction([[0.3, 0.6, 0.2, 0.1]]);

        expect(ret1).toEqual('cubic-bezier(0.3,0.6,0.2,0.1)');
        expect(ret2).toEqual('cubic-bezier(0.3,0.6,0.2,0.1)');
    });

    it('.timingFunction 多个参数', function () {
        var ret1 = easing.timingFunction('linear', 'step-start', [0, 0, 0.2, 0.3], [4, 'end']);

        expect(ret1).toEqual('cubic-bezier(0,0,1,1),step-start,cubic-bezier(0,0,0.2,0.3),steps(4,end)');
    });

    it('.timingFunction 2维数组', function () {
        var ret1 = easing.timingFunction(['linear', 'step-start', [0, 0, 0.2, 0.3], [4, 'end']]);

        expect(ret1).toEqual('cubic-bezier(0,0,1,1),step-start,cubic-bezier(0,0,0.2,0.3),steps(4,end)');
    });
});
