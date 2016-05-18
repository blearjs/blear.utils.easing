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

        while (true) {
            index += 0.1;
            expect(easing.linear(index)).toEqual(checker(index));
            if (index >= 0.9) {
                break;
            }
        }

        done();
    });

    it('.timingFunction:string', function () {
        var ret1 = easing.timingFunction('linear');
        var ret2 = easing.timingFunction('linear2');

        expect(ret1).toEqual('cubic-bezier(0,0,1,1)');
        expect(ret2).toEqual('cubic-bezier(0,0,1,1)');
    });

    it('.timingFunction:array', function () {
        var ret = easing.timingFunction([0.3, 0.6, 0.2, 0.1]);

        expect(ret).toEqual('cubic-bezier(0.3,0.6,0.2,0.1)');
    });
});
