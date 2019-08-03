// @see https://nodejs.org/api/assert.html
const assert = require('assert');
// @see http://sinonjs.org/releases/v6.1.3/mocks/
// @see https://sinonjs.org/releases/index.html
const sinon = require('sinon');

const model = require('../models/database/backend_user');

describe('database/backend_user.js', () => {

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

    it('insert', () => {
        // insertのテスト
    });

});