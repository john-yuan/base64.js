# Base64 for multi-byte string in JavaScript

[![Build Status](https://travis-ci.org/john-yuan/base64.js.svg?branch=master)](https://travis-ci.org/john-yuan/base64.js)

A base 64 util for multi-byte string in JavaScript. It can be used to encode multi-byte string, like Chinese or string containing emoji, to base 64 format string or decode the base 64 encoded string to the original one. It also supports [base 64 encoding with URL and filename safe alphabet][base64url].

[base64url]: https://tools.ietf.org/html/rfc4648#section-5

API:

* [base64.encodeBase64(str)](#base64encodebase64str)
* [base64.encodeBase64UrlSafe(str, [withPadding])](#base64encodebase64urlsafestr-withpadding)
* [base64.decodeBase64(b64Str)](#base64decodebase64b64str) (decode the normal or URL-safe base 64 encoded string)
* [base64.str2bytes(str)](#base64str2bytesstr)
* [base64.bytes2str(bytes)](#base64bytes2strbytes)
* [base64.basicEncodeBase64(str, alphabet, pad)](#base64basicencodebase64str-alphabet-pad)
* [base64.basicDecodeBase64(b64Str, alphabet, pad)](#base64basicdecodebase64b64str-alphabet-pad)

This library can be used both in the browser and the Node.js environment. [Click here to try it online.][base64online]

[base64online]: https://john-yuan.github.io/base64.js/web/index.html

## Demo

```js
var str = '🍎 is 苹果 in Chinese.';
var b64Str = base64.encodeBase64(str);
var b64StrUrlSafe = base64.encodeBase64UrlSafe(str);
var b64StrUrlSafeWithPadding = base64.encodeBase64UrlSafe(str, true);
var str1 = base64.decodeBase64(b64Str);
var str2 = base64.decodeBase64(b64StrUrlSafe);
var str3 = base64.decodeBase64(b64StrUrlSafeWithPadding);

// 8J+NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4=
console.log(b64Str);
// 8J-NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4
console.log(b64StrUrlSafe);
// 8J-NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4=
console.log(b64StrUrlSafeWithPadding);

// true
console.log(str === str1);
// true
console.log(str === str2);
// true
console.log(str === str3);
```

## API

### base64.encodeBase64(str)

This method is used to encode the given string to base 64 string.

* `str` {string} the string to be encoded to base 64
* Returns: {string} the base 64 encoded string

### base64.encodeBase64UrlSafe(str, [withPadding])

This method is used to encode the given string to base 64 URL and filename safe string.

* `str` {string} the string to be encoded to base 64 URL and filename safe string
* `withPadding` {boolean} whether to use the padding char '=' when needed, the default value is false (no padding is added).
* Returns: {string} the base 64 URL and filename safe encoded string

### base64.decodeBase64(b64Str)

This method is used to decode the base 64 encoded string to the original string. It can decode both the normal and the URL-safe base 64 encoded string. Notice that an error ([URIError][urierror]) may be thrown if `b64Str` is not a valid base 64 encoded string.

* `b64Str` {string} the base 64 string to be decoded
* Returns: {string} the decoded string
* Throws: {URIError}

[urierror]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError

### base64.str2bytes(str)

This method is used to convert multi-byte string to byte array.

* `str` {string} the string to be converted to byte array
* Returns: {number[]} the byte array of the given string

### base64.bytes2str(bytes)

This method is used to convert byte array to multi-byte string.

* `bytes` {number[]} the byte array to be converted to string
* Returns: {string} the string of the given byte array

### base64.basicEncodeBase64(str, alphabet, pad)

With this medthod, you can specify the alphabet and the padding char to encode the string. [See the section Customize the alphabet and padding char](#customize-the-alphabet-and-padding-char).

* `str` {string} the string to be encoded
* `alphabet` {string} the alphabet to use (a string with 64 unique chars)
* `pad` {string} the padding char to use (an empty string or one char only)
* Returns: {string} the encoded string

### base64.basicDecodeBase64(b64Str, alphabet, pad)

With this method, you can specify the alphabet and the padding char to decode the base 64 encoded string. An error may be thrown if `b64Str` is not a valid encoded string. [See the section Customize the alphabet and padding char](#customize-the-alphabet-and-padding-char).

* `b64Str` {string} the string to be decoded, which is encoded with the given alphabet before
* `alphabet` {string} the alphabet to use (a string with 64 unique chars)
* `pad` {string} the padding char to use (an empty string or one char only)
* Returns: {string} the decoded string
* Throws: {URIError}

## Customize the alphabet and padding char

You can specify the alphabet and padding char to use when encode the string or decode the encoded string. 

Example:

```js
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._';
var pad = '-';

var Y64UrlSafeEncode = function (str) {
    return base64.basicEncodeBase64(str, alphabet, pad);
};

var Y64UrlSafeDecode = function (b64Str) {
    return base64.basicDecodeBase64(b64Str, alphabet, pad);
};

var str1 = '🍎 is good for health 👌';
var b64Str = Y64UrlSafeEncode(str1);
var str2 = Y64UrlSafeDecode(b64Str);

// 8J.NjiBpcyBnb29kIGZvciBoZWFsdGgg8J.RjA--
console.log(b64Str);
// true
console.log(str1 === str2);
```

## Links

* [Base 64 Encoding - RFC 4648](https://tools.ietf.org/html/rfc4648#section-4)
* [Base64 - Wikipedia](https://en.wikipedia.org/wiki/Base64)
