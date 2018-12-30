# Base64 for multi-byte string in JavaScript

A base 64 util for multi-byte string in JavaScript. It can be used to encode multi-byte string, like Chinese or string containing emoji, to base64 format string or decode base 64 encoded string to the original one. It also supports base 64 URL safe encoding/decoding. 

API:

* [base64.encodeBase64(str)](#base64encodebase64str)
* [base64.encodeBase64UrlSafe(str)](#base64encodebase64urlsafestr)
* [base64.decodeBase64(b64str)](#base64decodebase64b64str)
* [base64.decodeBase64UrlSafe(b64strUrlSafe)](#base64decodebase64urlsafeb64strurlsafe)
* [base64.str2bytes(str)](#base64str2bytesstr)
* [base64.bytes2str(bytes)](#base64bytes2strbytes)

## Demo

```js
var str = '🍎 is 苹果 in Chinese.';
var b64str = base64.encodeBase64(str);
var b64strUrlSafe = base64.encodeBase64UrlSafe(str);
var str1 = base64.decodeBase64(b64str);
var str2 = base64.decodeBase64UrlSafe(b64strUrlSafe);

// 8J+NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4=
console.log(b64str);
// 8J-NjiBpcyDoi7nmnpwgaW4gQ2hpbmVzZS4
console.log(b64strUrlSafe);
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

This method is used to encode the given string to base 64 url safe string.

* `str` {string} the string to be encoded to base 64 url safe
* Returns: {string} the base 64 url safe encoded string

### base64.decodeBase64(b64str)

This method is used to decode the base 64 string to the original string.

* `b64str ` {string} the base 64 string to ne decoded
* Returns: {string} the decoded string

### base64.decodeBase64UrlSafe(b64strUrlSafe)

This method is used to decode the base 64 url safe string to the original string.

* `b64strUrlSafe ` {string} the base 64 url safe string to be decoded
* Returns: {string} the decoded string

### base64.str2bytes(str)

This method is used to convert multi-byte string to byte array.

* `str` {string} the string to be converted to byte array
* Returns: {number[]} the byte array of the given string

### base64.bytes2str(bytes)

This method is used to convert byte array to multi-byte string.

* `bytes` {number[]} the byte array to be converted to string
* Returns: {string} the string of the given byte array
