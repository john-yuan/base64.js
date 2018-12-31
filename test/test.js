var fs = require('fs');
var path = require('path');
var filename = path.resolve(__dirname, 'sample.json');
var sample = JSON.parse(fs.readFileSync(filename).toString());
var assert = require('assert');
var base64 = require('../base64.node');

console.log('The sample we use for testing:');
console.log(JSON.stringify(sample, null, 2));

describe('base64', function () {
    describe('#encodeBase64', function () {
        var count = 0;
        sample.forEach(item => {
            var str = item.str;
            var b64str = item.b64str;

            count += 1;

            it("sample #" + count, function () {
                var b64 = base64.encodeBase64(str);
                assert.strictEqual(b64, b64str);
            });
        });
    });

    describe('#encodeBase64UrlSafe', function () {
        var count = 0;

        sample.forEach(item => {
            var str = item.str;
            var b64strUrlSafe = item.b64strUrlSafe;

            count += 1;
            
            it('sample #' + count, function () {
                var b64 = base64.encodeBase64UrlSafe(str);
                assert.strictEqual(b64, b64strUrlSafe);
            });
        });
    });

    describe('#decodeBase64', function () {
        var count = 0;

        sample.forEach(item => {
            var str = item.str;
            var b64str = item.b64str;
            
            count += 1;

            it('sample #' + count, function () {
                var str1 = base64.decodeBase64(b64str);
                assert.strictEqual(str, str1);
            });
        });
    });

    describe('#decodeBase64(URL-Safe)', function () {
        var count = 0;

        sample.forEach(item => {
            var str = item.str;
            var b64strUrlSafe = item.b64strUrlSafe;

            count += 1;

            it('sample #' + count, function () {
                var str1 = base64.decodeBase64(b64strUrlSafe);
                assert.strictEqual(str, str1);
            });
        });
    });
});