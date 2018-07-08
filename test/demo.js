// @see https://nodejs.org/api/assert.html
const assert = require('assert');
// @see http://sinonjs.org/releases/v6.1.3/mocks/
// @see https://sinonjs.org/releases/index.html
const sinon = require('sinon');

const model = require('../models/demo');

describe('demo.js', () => {

    before(() => {
        // describeの最初に実行
        console.log('start');
    });

    after(() => {
        // describeの最後に実行
        console.log('end');
    });

    beforeEach(() => {
        // 各itの最初に実行
    });

    afterEach(() => {
        // 各itの最後に実行
        sinon.reset();// sinonクリア
    });

    // 同期のテスト例
    it('helloWorld 同期のテスト', () => {
        const spy = sinon.spy(model, 'helloWorld');// spyを登録
        assert.strictEqual(model.helloWorld('NODE mocha'), 'Hello World NODE mocha');

        assert.strictEqual(spy.callCount, 1);// 呼ばれた回数
        assert.strictEqual(spy.withArgs('NODE mocha').callCount, 1);// 指定の引数で呼ばれた回数

        assert.doesNotThrow(model.helloWorld, Error);

        spy.restore();// spyクリア
    });

    // 非同期のテスト例 doneを使用する
    it('asyncHelloWorld 非同期のテスト', function (done) {

        const spy = sinon.spy(model, 'asyncHelloWorld');// spyを登録

        model.asyncHelloWorld('NODE mocha', function (argument) {
            assert.strictEqual(argument, 'Hello World NODE mocha');

            assert.strictEqual(spy.callCount, 1);// 呼ばれた回数

            done();
        });

        spy.restore();// spyクリア
    });

    it('throwTypeError TypeErrorのテスト', () => {
        const spy = sinon.spy(model, 'throwTypeError');// spyを登録

        assert.throws(model.throwTypeError, TypeError);

        assert.strictEqual(spy.calledOnce, true);// 呼ばれた回数

        spy.restore();// spyクリア
    });

    it('throwSyntaxError SyntaxErrorのテスト', () => {
        const spy = sinon.spy(model, 'throwSyntaxError');// spyを登録

        assert.throws(model.throwSyntaxError, SyntaxError);

        assert.strictEqual(spy.calledOnce, true);// 呼ばれた回数

        spy.restore();// spyクリア
    });

    it('stubのテスト', () => {
        // stubとspyとmockは同じオブジェクトに同時に設定できない
        // TypeError: Attempted to wrap <method> which is already wrapped
        const stub = sinon.stub(model, 'throwSyntaxError');
        stub.onCall(0).throws(TypeError);
        stub.onCall(1).throws(SyntaxError);
        stub.withArgs('argument').returns('stub 2');
        stub.onCall(3).returns('stub 3');

        assert.throws(model.throwSyntaxError, TypeError);
        assert.throws(model.throwSyntaxError, SyntaxError);
        assert.strictEqual(model.throwSyntaxError('argument'), 'stub 2');
        assert.strictEqual(model.throwSyntaxError(), 'stub 3');

        stub.restore();// stubクリア
    });

});