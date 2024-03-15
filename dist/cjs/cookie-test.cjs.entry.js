/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const _commonjsHelpers = require('./_commonjsHelpers-480c2e77.js');

const _nodeResolve_empty = {};

const _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': _nodeResolve_empty
});

const require$$0 = /*@__PURE__*/_commonjsHelpers.getAugmentedNamespace(_nodeResolve_empty$1);

var core = _commonjsHelpers.createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory();
	}
}(_commonjsHelpers.commonjsGlobal, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined$1) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native crypto in web worker (Browser)
	    if (typeof self !== 'undefined' && self.crypto) {
	        crypto = self.crypto;
	    }

	    // Native crypto from worker
	    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
	        crypto = globalThis.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof _commonjsHelpers.commonjsGlobal !== 'undefined' && _commonjsHelpers.commonjsGlobal.crypto) {
	        crypto = _commonjsHelpers.commonjsGlobal.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && typeof _commonjsHelpers.commonjsRequire === 'function') {
	        try {
	            crypto = require$$0;
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined$1) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
});

var sha256 = _commonjsHelpers.createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(core);
	}
}(_commonjsHelpers.commonjsGlobal, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
});

var encHex = _commonjsHelpers.createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(core);
	}
}(_commonjsHelpers.commonjsGlobal, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));
});

function shouldDisableTracking(options = {}) {
    const { disabled, portal } = options;
    if (disabled || (portal === null || portal === void 0 ? void 0 : portal.eueiEnabled) === false) {
        return true;
    }
    if (!portal || hasEueiEnabledAndIsMemberOfOrg(portal) || isRegisteredUserWithoutOrgInUSA(portal) || isAnonymousUserInUSA(portal)) {
        return false;
    }
    return true;
}
function hasEueiEnabledAndIsMemberOfOrg(portal) {
    return portal.eueiEnabled && portal.user && portal.user.orgId === portal.id;
}
function isRegisteredUserWithoutOrgInUSA(portal) {
    return portal.user && !portal.user.orgId && portal.ipCntryCode === 'US';
}
function isAnonymousUserInUSA(portal) {
    return !portal.user && portal.ipCntryCode === 'US';
}

const storage = {
    storage: {},
    memory: true,
    get(key) {
        let stored;
        try {
            stored =
                (window.localStorage && window.localStorage.getItem(key)) ||
                    this.storage[key];
        }
        catch (e) {
            stored = this.storage[key];
        }
        if (stored) {
            try {
                return JSON.parse(stored);
            }
            catch (e) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    },
    set(key, value) {
        // handle Safari private mode (setItem is not allowed)
        const valueToString = JSON.stringify(value);
        try {
            window.localStorage.setItem(key, valueToString);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            this.storage[key] = value;
        }
    },
    delete(key) {
        try {
            window.localStorage.removeItem(key);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            delete this.storage[key];
        }
    },
};

const ESRI_TELEMETRY_DATA_ATTRIBUTE = 'esri-telemetry';
function injectScriptElementAsync(attributes) {
    const onloadPromise = new Promise((resolve, reject) => {
        attributes.onload = resolve;
        attributes.onerror = reject;
        const script = injectScriptElement(attributes);
        if (!script || attributes.body) {
            // this is for the case where the script is already loaded or it has a body instead of a src
            resolve();
        }
    });
    return onloadPromise;
}
function scriptExists(attributes) {
    const { id, dataAttribute } = attributes;
    return !!document.getElementById(id) || !!document.querySelector(`[data-${ESRI_TELEMETRY_DATA_ATTRIBUTE}="${dataAttribute}"]`);
}
function injectScriptElement(attributes) {
    const { body, src, id, dataAttribute, section = 'body', type = 'text/javascript', async = false, defer = false, onload, onerror } = attributes;
    if (typeof window === 'undefined') {
        throw new WindowUndefinedError('Window is undefined: Cannot add script element.');
    }
    if (scriptExists(attributes)) {
        console.log(`script (${id || dataAttribute}) is already present, skipping`);
        return;
    }
    const scriptElement = createScriptElementWithAttributes({
        id,
        dataAttribute,
        type,
        async,
        defer,
        body,
        src,
        onload,
        onerror
    });
    return section === 'body'
        ? document.body.appendChild(scriptElement)
        : document.head.appendChild(scriptElement);
}
class WindowUndefinedError extends Error {
}
function createScriptElementWithAttributes({ id, dataAttribute, type, async, defer, body, src, onload, onerror }) {
    const scriptElement = document.createElement('script');
    if (id) {
        scriptElement.id = id;
    }
    if (dataAttribute) {
        scriptElement.setAttribute(`data-${ESRI_TELEMETRY_DATA_ATTRIBUTE}`, dataAttribute);
    }
    src && (scriptElement.src = src);
    body && (scriptElement.innerText = body);
    scriptElement.type = type;
    scriptElement.async = async;
    scriptElement.defer = defer;
    onload && (scriptElement.onload = onload);
    onerror && (scriptElement.onerror = onerror);
    return scriptElement;
}

function createScriptTags(scripts) {
    return scripts.map(scriptObj => {
        const attrs = [];
        ['src', 'id', 'dataAttribute', 'type'].forEach(attr => {
            let attrName = attr;
            if (attr === 'dataAttribute') {
                attrName = 'data-esri-telemetry';
            }
            if (scriptObj[attr]) {
                attrs.push(`${attrName}="${scriptObj[attr]}"`);
            }
        });
        ['async', 'defer'].forEach(attr => {
            if (scriptObj[attr]) {
                attrs.push(`${attr}`);
            }
        });
        return `<script ${attrs.join(' ')}>${scriptObj.body ? scriptObj.body : ''}</script>`;
    }).join('');
}

const INTERNAL_ORGS = [
    'esri.com',
    'esriuk.com',
    'esri.de',
    'esri.ca',
    'esrifrance.fr',
    'esri.nl',
    'esri-portugal.pt',
    'esribulgaria.com',
    'esri.fi',
    'esri.kr',
    'esrimalaysia.com.my',
    'esri.es',
    'esriaustralia.com.au',
    'esri-southafrica.com',
    'esri.cl',
    'esrichina.com.cn',
    'esri.co',
    'esriturkey.com.tr',
    'geodata.no',
    'esriitalia.it',
    'esri.pl',
];
/**
 * Telemetry class
 */
class Telemetry {
    constructor(options) {
        var _a, _b, _c;
        this.trackers = [];
        this.options = options;
        this.debug = options.debug;
        this.suppressDisabledWarnings = options.suppressDisabledWarnings;
        this.disabled = shouldDisableTracking(options);
        this.logger = options.logger || console;
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Telemetry Disabled');
        }
        const user = ((_a = options.portal) === null || _a === void 0 ? void 0 : _a.user) || options.user;
        if (user) {
            this.setUser(user, (_c = (_b = options.portal) === null || _b === void 0 ? void 0 : _b.subscriptionInfo) === null || _c === void 0 ? void 0 : _c.type);
        }
        if (!this.disabled) {
            this.initializeTrackers();
        }
    }
    initializeTrackers() {
        if (this.options.plugins) {
            this.trackers.push(...this.options.plugins);
        }
        if (!this.trackers.length) {
            this.logger.error(new Error('No trackers configured'));
        }
    }
    getScriptTags() {
        return this.trackers.map((tracker) => {
            return tracker.getScriptTags && tracker.getScriptTags();
        }).join('');
    }
    async init() {
        const promises = this.trackers.map((tracker) => {
            return tracker.init();
        });
        await Promise.all(promises);
    }
    setUser(user = {}, orgType = 'Public') {
        user = typeof user === 'string' ? { username: user } : user;
        this.user = user;
        this.user.accountType = orgType;
        let internalDomain;
        if (user.email && user.email.split) {
            const domain = user.email.split('@')[1];
            internalDomain =
                INTERNAL_ORGS.filter((org) => {
                    return domain === org;
                }).length > 0;
        }
        if (internalDomain ||
            ['In House', 'Demo and Marketing'].indexOf(orgType) > -1) {
            this.user.internalUser = true;
        }
    }
    logPageView(page, event = {}, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Page view was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.warn('Page view was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const attributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking page view', JSON.stringify(attributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logPageView(page, attributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logEvent(event, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Event was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.warn('Event was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const eventAttributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking event', JSON.stringify(eventAttributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logEvent(eventAttributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logError(event = {}) {
        event = Object.assign({ eventType: 'error' }, event);
        this.logEvent(event);
    }
    startWorkflow(name, attributes = {}) {
        const workflow = {
            name,
            start: Date.now(),
            steps: [],
            workflowId: Math.floor((1 + Math.random()) * 0x100000000000).toString(16),
        };
        this.saveWorkflow(workflow);
        const workflowObj = Object.assign({ name, step: 'start' }, attributes);
        this.logWorkflow(workflowObj);
        return workflow;
    }
    stepWorkflow(name, step, attributes = {}) {
        //TODO: check if the check for attributes being a string is useful or can be removed
        const details = typeof attributes === 'string' ? attributes : attributes.details;
        const workflowObj = Object.assign({ name, step, details }, attributes);
        this.logWorkflow(workflowObj);
    }
    endWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'finish' }, attributes);
        this.logWorkflow(workflowObj);
    }
    cancelWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'cancel' }, attributes);
        this.logWorkflow(workflowObj);
    }
    getWorkflow(name) {
        const workflow = storage.get(`TELEMETRY-WORKFLOW:${name}`);
        // do not let old workflows be returned
        if (workflow) {
            const workflowAge = Date.now() - workflow.start;
            const timeout = 30 * 60 * 1000;
            if (workflowAge < timeout) {
                return workflow;
            }
            else {
                this.deleteWorkflow(workflow);
            }
        }
    }
    saveWorkflow(workflow) {
        storage.set(`TELEMETRY-WORKFLOW:${workflow.name}`, workflow);
    }
    deleteWorkflow(workflow) {
        storage.delete(`TELEMETRY-WORKFLOW:${workflow.name}`);
    }
    logWorkflow(options = {}) {
        /*
        const workflow = {
          name: 'add layer to map',
          step: 'start',
          details: 'some details about the step'
        }
        */
        options = this.preProcess(options);
        let workflow = this.getWorkflow(options.name);
        if (!workflow) {
            this.startWorkflow(options.name);
            workflow = this.getWorkflow(options.name);
        }
        workflow.steps.push(options.step);
        workflow.duration = (Date.now() - workflow.start) / 1000;
        if (['cancel', 'finish'].indexOf(options.step) > -1) {
            this.deleteWorkflow(workflow);
        }
        else {
            this.saveWorkflow(workflow);
        }
        const track = Object.assign(options, {
            eventType: 'workflow',
            category: options.name,
            action: options.step,
            label: options.details,
            duration: workflow.duration,
            workflowId: workflow.workflowId,
        });
        this.logEvent(track);
    }
    preProcess(event = {}, options = {}) {
        let userMetadata = {};
        if (this.user) {
            userMetadata = {
                user: anonymize(this.user.username),
                org: anonymize(this.user.orgId),
                lastLogin: this.user.lastLogin,
                userSince: this.user.created,
                internalUser: this.user.internalUser || false,
                accountType: this.user.accountType,
            };
        }
        return Object.entries(Object.assign(Object.assign({}, event), userMetadata)).reduce(makeEventPayload(options.omitComplexData, this.logger), {});
    }
    disableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = true;
            (_a = tracker.disable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
    enableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = false;
            (_a = tracker.enable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
}
function anonymize(user) {
    if (!user)
        return;
    return sha256(user).toString(encHex);
}
function makeEventPayload(omitComplexData, logger) {
    return function (acc, [key, val]) {
        if (isPrimitive(val)) {
            acc[key] = val;
        }
        else if (!omitComplexData) {
            logger.warn(`You are trying to log a non-primitive value, ${key}:${JSON.stringify(val)}. This will get logged as [object Object]`);
            acc[key] = val;
        }
        return acc;
    };
}
function isPrimitive(val) {
    const primitives = ['string', 'number', 'boolean', 'undefined'];
    return (primitives.includes(typeof val) ||
        (val && typeof val.valueOf() === 'string'));
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Class supporting Google Analytics 4
 */
class GoogleAnalytics {
    constructor(options) {
        var _a;
        this.name = 'googleAnalytics';
        this.dimensions = {};
        this.metrics = {};
        if (typeof window !== 'undefined' && !((_a = options === null || options === void 0 ? void 0 : options.measurementIds) === null || _a === void 0 ? void 0 : _a.length)) {
            // browser environment
            throw new Error('at least one measurementId needs to be provided in your configuration');
        }
        Object.assign(this, options);
    }
    _getScripts() {
        const measurementId = this.measurementIds ? this.measurementIds[0] : '';
        return [
            {
                dataAttribute: 'google-analytics',
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
            },
        ];
    }
    getScriptTags() {
        return createScriptTags(this._getScripts());
    }
    async init() {
        // for use in a broswer environment
        if (typeof window === 'undefined') {
            throw new WindowUndefinedError('Window is undefined: Cannot add script element.');
        }
        // calls _getScripts() and then iterates over the array and adds dom nodes for each and resolves once all have loaded.
        // injectScriptElementAsync will check if a script with the specified id already exists and, if so, do nothing
        await Promise.all(this._getScripts().map(scriptObj => {
            return injectScriptElementAsync(scriptObj);
        }));
        // runs second script
        this.injectConfig();
    }
    // we log page views manually, even though ga4 can do so automatically for pages now
    logPageView(page, options = {}) {
        const cleanedOptions = this.buildCustomParams(options);
        const pageViewOptionsObject = Object.assign({ page_title: page || window.location.pathname }, cleanedOptions);
        window.gtag('event', 'page_view', pageViewOptionsObject);
        return true;
    }
    logEvent(event) {
        // eventType is name of our event
        let { action } = event, customParams = __rest(event, ["action"]);
        const eventType = action || 'other';
        // if using telemetry wrapper, custom metrics/dimensions in customParams; if not, in options
        const eventParams = this.buildCustomParams(customParams);
        // should have custom metric & dimension data that looks like
        // metric_name: metric_value
        // dimension_name: dimension_value
        window.gtag('event', eventType, eventParams);
        return true;
    }
    disable() {
        if (this.measurementIds) {
            this.measurementIds.forEach(id => {
                window[`ga-disable-${id}`] = true;
            });
        }
    }
    enable() {
        if (this.measurementIds) {
            this.measurementIds.forEach(id => {
                window[`ga-disable-${id}`] = undefined;
            });
        }
    }
    // injects configs for each measurement id 
    injectConfig() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        const configOptions = {
            'custom_map': this.createDimensionsAndMetricsCustomMap(this.dimensions, this.metrics),
            'send_page_view': false,
            'anonymize_ip': true // anonymize ip for each event/page view tracked
        };
        this.measurementIds.forEach(measurementId => {
            window.gtag('config', measurementId, configOptions);
        });
    }
    buildCustomParams(eventParams) {
        let cleanedEventParams;
        let { category, label } = eventParams;
        // verify that all are valid custom metrics/dimensions
        cleanedEventParams = this.verifyCustomDimensionAndMetrics(eventParams);
        // ga3 syntax uses category/action/label, which have been changed
        // to event_category, event_action, and event_label in ga4
        if (category) {
            cleanedEventParams = Object.assign(Object.assign({}, cleanedEventParams), { event_category: category });
        }
        if (label) {
            cleanedEventParams = Object.assign(Object.assign({}, cleanedEventParams), { event_label: label });
        }
        return cleanedEventParams;
    }
    verifyCustomDimensionAndMetrics(eventParams) {
        // all valid metric names and dimension names
        // since we store metrics/dimensions as dimension<index>: dimension_name, we want values
        const metricAndDimensionsMap = this.createDimensionsAndMetricsCustomMap(this.dimensions, this.metrics);
        const metricAndDimensionNames = Object.values(metricAndDimensionsMap);
        // get all keys (name of metric/dimension), 
        // filter out any keys not in valid names, 
        // and then recreate new object with filtered keys and values only
        const cleanedEventParams = Object.keys(eventParams)
            .filter(key => metricAndDimensionNames.includes(key))
            .reduce((cur, key) => { return Object.assign(cur, { [key]: eventParams[key] }); }, {});
        return cleanedEventParams;
    }
    createDimensionsAndMetricsCustomMap(dimensions = {}, metrics = {}) {
        const metricsMap = this.createMetricCustomMap(metrics);
        const dimensionsMap = this.createDimensionCustomMap(dimensions);
        return Object.assign(Object.assign({}, metricsMap), dimensionsMap);
    }
    // under the assumption that our metrics come like { timeMetric: 1, otherMetric: 3} where metric_name: index
    createMetricCustomMap(metrics = {}) {
        return Object.keys(metrics)
            .map(function (key) {
            return {
                // format of metric<Index>: metric_name
                key: `metric${metrics[key]}`,
                value: key
            };
        })
            .filter((val) => val)
            .reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    // under the assumption that our dimensions come like { someAttribute: 7, datasetId: 6} where dimension_name: index
    createDimensionCustomMap(dimensions = {}) {
        return Object.keys(dimensions)
            .map(function (key) {
            return {
                // format of dimension<Index>: dimension_name
                key: `dimension${dimensions[key]}`,
                value: key
            };
        })
            .filter((val) => val)
            .reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});
    }
}

const cookieTestCss = ":host{display:block}#cookie-policy.epjs_cookiepolicy{position:fixed;display:block;z-index:5000;bottom:0;left:0;width:100%;height:auto;margin:0;padding:5px 0 0 0;font-family:Helvetica, Arial, sans-serif;text-align:center;letter-spacing:normal;white-space:normal;color:inherit}#cookie-policy.epjs_cookiepolicy .cookie-consent-popup-container{position:relative;display:block;bottom:0;left:0;width:100%;margin:0;padding:20px 0 10px 0;transform:translate(0, 110%);transition:transform 0.5s ease-out 0s;background-color:rgba(51, 51, 51, 0.95);color:#fff}#cookie-policy.epjs_cookiepolicy .cookie-consent-popup-container .epjs_text{position:static;display:block;margin:0;padding:0 10px 14px 10px;font-weight:lighter;color:inherit;-webkit-font-smoothing:auto}#cookie-policy.epjs_cookiepolicy .cookie-consent-popup-container .epjs_buttons{position:static;margin:0;padding:0;text-align:center;letter-spacing:-0.3em;color:inherit;display:flex;justify-content:center;flex-wrap:wrap}";

const CookieTest = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this._loaded = false;
        this.measurementIds = ["G-ZSDDNE856F"];
        this.portal = undefined;
    }
    async getInstance() {
        await this._init();
        return this._loaded ? this._telemetryInstance : undefined;
    }
    render() {
        console.log("cookie-test-render");
        return (index.h(index.Host, null, index.h("section", { class: "epjs_cookiepolicy epjs_displayed", id: "cookie-policy" }, index.h("div", { class: "cookie-consent-popup-container" }, index.h("div", { class: "epjs_text", id: "cookie-policy-description-top", tabindex: "-1" }, index.h("p", null, "Dear visitor,"), index.h("p", null, "We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.")), index.h("div", { class: "epjs_buttons" }, index.h("button", { class: "epjs_agree", type: "button" }, index.h("span", null, "I refuse analytics cookies")), index.h("button", { class: "epjs_agree", type: "button" }, index.h("span", null, "I accept analytics cookies"))), index.h("div", { class: "epjs_text", id: "cookie-policy-description-bottom" }, index.h("p", null, "For any information on the other cookies and server logs we use, we invite you to read our", index.h("a", { class: "cc-link-default", href: "https://www.europarl.europa.eu/privacy-policy/en/data-protection", rel: "noopener noreferrer", style: {
                "text-decoration": "underline",
                "color": "inherit"
            }, target: "_blank" }, "data protection policy"), " , our", index.h("a", { class: "cc-link-default", href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-policy", rel: "noopener noreferrer", style: {
                "text-decoration": "underline",
                "color": "inherit"
            }, target: "_blank" }, "cookies policy"), "and our", index.h("a", { class: "cc-link-default", href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-inventory", rel: "noopener noreferrer", style: {
                "text-decoration": "underline",
                "color": "inherit"
            }, target: "_blank" }, "cookies inventory.")))))));
    }
    async _init() {
        var _a;
        if (!this._loaded && ((_a = this.measurementIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.portal) {
            const googleAnalyticsTracker = new GoogleAnalytics({
                measurementIds: this.measurementIds
            });
            this._telemetryInstance = new Telemetry({
                plugins: [googleAnalyticsTracker],
                portal: this.portal,
                debug: true,
                test: true
            });
            await this._telemetryInstance.init();
            this._loaded = true;
        }
    }
};
CookieTest.style = cookieTestCss;

exports.cookie_test = CookieTest;
