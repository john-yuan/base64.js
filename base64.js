var base64 = (function () {
    'use strict';
    
    var base64 = {};
    var b64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64UrlSafeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    /**
     * convert unicode string to byte stream
     *
     * @param {string} str the string to be converted
     * @returns {number[]} the byte stream
     */
    var str2bytes = function (str) {
        var i = 0;
        var ch = null;
        var hex = null;
        var encoded = encodeURIComponent(str);
        var length = encoded.length;
        var bytes = [];
    
        while (i < length) {
            ch = encoded.charAt(i++);
            if (ch === '%') {
                hex = encoded.charAt(i++)
                hex += encoded.charAt(i++);
                bytes.push(parseInt(hex, 16));
            } else {
                bytes.push(ch.charCodeAt(0));
            }
        }
    
        return bytes;
    };
    
    /**
     * convert byte stream to unicode string
     *
     * @param {number[]} bytes the byte stream to be converted
     * @returns {string} the unicode string
     */
    var bytes2str = function (bytes) {
        var i = 0;
        var hex = null;
        var byte = 0;
        var hexArray = [];
        var length = bytes.length;
    
        while (i < length) {
            byte = bytes[i++];
            hex = byte.toString(16);
            hex = hex.length < 2 ? ('%0' + hex) : ('%' + hex);
            hexArray.push(hex);
        }
    
        return decodeURIComponent(hexArray.join(''));
    };
    
    /**
     * encode the unicode string to base64 string
     *
     * @param {string} str the unicode string to be encoded
     * @param {string} alphabet the base64 char alphabet to use
     * @param {string} pad the base64 padding char to use
     * @returns {string} the encoded string
     */
    var basicEncodeBase64 = function (str, alphabet, pad) {
        var bytes = str2bytes(str);
        var i = 0, l = bytes.length, chars = [];
        var mod = l % 3, b8 = 0, b6 = 0, need = 6;
    
        while (i < l) {
            b8 = bytes[i++];
            if (need === 6) {
                chars.push( alphabet.charAt( b8 >> 2 ) );
                // 0x03: 0000 0011
                b6 = ( 0x03 & b8 ) << 4;
                need = 4;
            } else if (need === 4) {
                chars.push( alphabet.charAt( b6 | (b8 >> 4) ) );
                // 0x0f: 0000 1111
                b6 = ( 0x0f & b8 ) << 2;
                need = 2;
            } else if (need === 2) {
                chars.push( alphabet.charAt( b6 | (b8 >> 6) ) );
                // 0x3f: 0011 1111
                chars.push( alphabet.charAt( 0x3f & b8 ) );
                b6 = 0;
                need = 6;
            }
        }
    
        if (need !== 6) {
            chars.push( alphabet.charAt(b6) );
        }
    
        chars = chars.join('');
    
        if (pad) {
            if (mod === 1) {
                chars = chars + pad + pad;
            } else if (mod === 2) {
                chars += pad;
            }
        }
    
        return chars;
    };
    
    /**
     * decode base64 string to unicode string
     *
     * @param {string} b64Str the base64 string to decoded
     * @param {string} alphabet the base64 char alphabet to use
     * @param {string} pad the base64 padding char to use
     * @returns {string} the decoded string
     * @throws {URIError}
     */
    var basicDecodeBase64 = function (b64Str, alphabet, pad) {
        var ch, b6, b8 = 0, need = 8, bytes = [], i = 0, l = b64Str.length;
    
        while (i < l) {
            ch = b64Str.charAt(i++);
            if (ch !== pad) {
                b6 = alphabet.indexOf(ch);
                if (need === 8) {
                    b8 = b6 << 2;
                    need = 2;
                } else if (need === 2) {
                    bytes.push( b8 | ( b6 >> 4 ) );
                    // 0x0f: 0000 1111
                    b8 = ( b6 & 0x0f ) << 4;
                    need = 4;
                } else if (need === 4) {
                    bytes.push( b8 | ( b6 >> 2) );
                    // 0x03: 0000 0011
                    b8 = ( b6 & 0x03 ) << 6;
                    need = 6;
                } else if (need === 6) {
                    bytes.push( b8 | b6 );
                    b8 = 0;
                    need = 8;
                }
            }
        }
    
        b8 && bytes.push( b8 );
    
        return bytes2str(bytes);
    };
    
    /**
     * @see str2bytes
     */
    base64.str2bytes = str2bytes;
    
    /**
     * @see bytes2str
     */
    base64.bytes2str = bytes2str;

    /**
     * @see basicEncodeBase64
     */
    base64.basicEncodeBase64 = basicEncodeBase64;

    /**
     * @see basicDecodeBase64
     */
    base64.basicDecodeBase64 = basicDecodeBase64;
    
    /**
     * encode unicode string to base64 string
     *
     * @see encodeBase64
     * @param {string} str the unicode to be base64 encoded
     * @returns {string} the base64 encoded string
     */
    base64.encodeBase64 = function (str) {
        return basicEncodeBase64(str, b64Alphabet, '=');
    };
    
    /**
     * encode unicode string to base64 url safe string
     *
     * @see encodeBase64
     * @param {string} str the unicode string to be base64 url safe encoded
     * @param {boolean} [withPadding=false] whether to use the padding char '=' when needed
     * @returns {string} the base64 url safe encoded string
     */
    base64.encodeBase64UrlSafe = function (str, withPadding) {
        return basicEncodeBase64(str, b64UrlSafeAlphabet, withPadding ? '=' : '');
    };
    
    /**
     * decode the base64 encoded string to unicode string
     *
     * @see decodeBase64
     * @see base64.encodeBase64
     * @param {string} b64Str the base64 string to be decoded
     * @returns {string} the decoded string
     * @throws {URIError}
     */
    base64.decodeBase64 = function (b64Str) {
        if (b64Str.indexOf('-') > -1 || b64Str.indexOf('_') > -1) {
            return basicDecodeBase64(b64Str, b64UrlSafeAlphabet, '=');
        } else {
            return basicDecodeBase64(b64Str, b64Alphabet, '=');
        }
    };

    return base64;
})();
