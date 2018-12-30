# Base64 for multi-byte string in JavaScript

[![Build Status](https://travis-ci.org/john-yuan/base64.js.svg?branch=master)](https://travis-ci.org/john-yuan/base64.js)

A base 64 util for multi-byte string in JavaScript. It can be used to encode multi-byte string, like Chinese or string containing emoji, to base 64 format string or decode base 64 encoded string to the original one. It also supports base 64 URL-safe encoding/decoding. 

[Click here to try it online.][baseb4onlie]

API:

* [base64.encodeBase64(str)](#base64encodebase64str)
* [base64.encodeBase64UrlSafe(str)](#base64encodebase64urlsafestr)
* [base64.decodeBase64(b64Str)](#base64decodebase64b64str)
* [base64.decodeBase64UrlSafe(b64StrUrlSafe)](#base64decodebase64urlsafeb64strurlsafe)
* [base64.str2bytes(str)](#base64str2bytesstr)
* [base64.bytes2str(bytes)](#base64bytes2strbytes)

[baseb4onlie]: https://john-yuan.github.io/base64.js/web/index.html

## Demo

```js
var str = '🍎 is 苹果 in Chinese.';
var b64Str = base64.encodeBase64(str);
var b64StrUrlSafe = base64.encodeBase64UrlSafe(str);
var str1 = base64.decodeBase64(b64Str);
var str2 = base64.decodeBase64UrlSafe(b64StrUrlSafe);

// 8J+NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4=
console.log(b64Str);
// 8J-NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4
console.log(b64StrUrlSafe);
// true
console.log(str === str1);
// true
console.log(str === str2);
```

## API

### base64.encodeBase64(str)

This method is used to encode the given string to base 64 string.

* `str` {string} the string to be encoded to base 64
* Returns: {string} the base 64 encoded string

### base64.encodeBase64UrlSafe(str)

This method is used to encode the given string to base 64 URL-safe string.

* `str` {string} the string to be encoded to base 64 URL-safe
* Returns: {string} the base 64 URL-safe encoded string

### base64.decodeBase64(b64Str)

This method is used to decode the base 64 string to the original string.

* `b64Str ` {string} the base 64 string to ne decoded
* Returns: {string} the decoded string

### base64.decodeBase64UrlSafe(b64StrUrlSafe)

This method is used to decode the base 64 URL-safe string to the original string.

* `b64StrUrlSafe ` {string} the base 64 URL-safe string to be decoded
* Returns: {string} the decoded string

### base64.str2bytes(str)

This method is used to convert multi-byte string to byte array.

* `str` {string} the string to be converted to byte array
* Returns: {number[]} the byte array of the given string

### base64.bytes2str(bytes)

This method is used to convert byte array to multi-byte string.

* `bytes` {number[]} the byte array to be converted to string
* Returns: {string} the string of the given byte array
