"use strict";
var global = this || window || {};
require('es6-promise').polyfill();
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.urltm=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(require,module,exports){(function(Buffer){/**
	* @license Copyright 2017, Ably
	*
	* Ably JavaScript Library v1.0.3
	* https://github.com/ably/ably-js
	*
	* Ably Realtime Messaging
	* https://www.ably.io
	*
	* Released under the Apache Licence v2.0
	*/var Ably={};/**
	* CryptoJS core components.
	*/var CryptoJS=CryptoJS||function(Math,undefined){/**
		* CryptoJS namespace.
		*/var C={};/**
		* Library namespace.
		*/var C_lib=C.lib={};/**
		* Base object for prototypal inheritance.
		*/var Base=C_lib.Base=function(){function F(){}return{/**
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
				*/extend:function extend(overrides){// Spawn
   F.prototype=this;var subtype=new F();// Augment
   if(overrides){subtype.mixIn(overrides);}// Create default initializer
   if(!subtype.hasOwnProperty('init')){subtype.init=function(){subtype.$super.init.apply(this,arguments);};}// Initializer's prototype is the subtype object
   subtype.init.prototype=subtype;// Reference supertype
   subtype.$super=this;return subtype;},/**
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
				*/create:function create(){var instance=this.extend();instance.init.apply(instance,arguments);return instance;},/**
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
				*/init:function init(){},/**
				* Copies properties into this object.
				*
				* @param {Object} properties The properties to mix in.
				*
				* @example
				*
				*     MyType.mixIn({
				*         field: 'value'
				*     });
				*/mixIn:function mixIn(properties){for(var propertyName in properties){if(properties.hasOwnProperty(propertyName)){this[propertyName]=properties[propertyName];}}// IE won't copy toString using the loop above
   if(properties.hasOwnProperty('toString')){this.toString=properties.toString;}},/**
				* Creates a copy of this object.
				*
				* @return {Object} The clone.
				*
				* @example
				*
				*     var clone = instance.clone();
				*/clone:function clone(){return this.init.prototype.extend(this);}};}();/**
		* An array of 32-bit words.
		*
		* @property {Array} words The array of 32-bit words.
		* @property {number} sigBytes The number of significant bytes in this word array.
		*/var WordArray=C_lib.WordArray=Base.extend({/**
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
			*/init:function init(words,sigBytes){words=this.words=words||[];if(sigBytes!=undefined){this.sigBytes=sigBytes;}else{this.sigBytes=words.length*4;}},/**
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
			*/toString:function toString(encoder){return(encoder||Hex).stringify(this);},/**
			* Concatenates a word array to this word array.
			*
			* @param {WordArray} wordArray The word array to append.
			*
			* @return {WordArray} This word array.
			*
			* @example
			*
			*     wordArray1.concat(wordArray2);
			*/concat:function concat(wordArray){// Shortcuts
   var thisWords=this.words;var thatWords=wordArray.words;var thisSigBytes=this.sigBytes;var thatSigBytes=wordArray.sigBytes;// Clamp excess bits
   this.clamp();// Concat
   if(thisSigBytes%4){// Copy one byte at a time
   for(var i=0;i<thatSigBytes;i++){var thatByte=thatWords[i>>>2]>>>24-i%4*8&0xff;thisWords[thisSigBytes+i>>>2]|=thatByte<<24-(thisSigBytes+i)%4*8;}}else if(thatWords.length>0xffff){// Copy one word at a time
   for(var i=0;i<thatSigBytes;i+=4){thisWords[thisSigBytes+i>>>2]=thatWords[i>>>2];}}else{// Copy all words at once
   thisWords.push.apply(thisWords,thatWords);}this.sigBytes+=thatSigBytes;// Chainable
   return this;},/**
			* Removes insignificant bits.
			*
			* @example
			*
			*     wordArray.clamp();
			*/clamp:function clamp(){// Shortcuts
   var words=this.words;var sigBytes=this.sigBytes;// Clamp
   words[sigBytes>>>2]&=0xffffffff<<32-sigBytes%4*8;words.length=Math.ceil(sigBytes/4);},/**
			* Creates a copy of this word array.
			*
			* @return {WordArray} The clone.
			*
			* @example
			*
			*     var clone = wordArray.clone();
			*/clone:function clone(){var clone=Base.clone.call(this);clone.words=this.words.slice(0);return clone;},/**
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
			*/random:function random(nBytes){var words=[];var r=function r(m_w){var m_w=m_w;var m_z=0x3ade68b1;var mask=0xffffffff;return function(){m_z=0x9069*(m_z&0xFFFF)+(m_z>>0x10)&mask;m_w=0x4650*(m_w&0xFFFF)+(m_w>>0x10)&mask;var result=(m_z<<0x10)+m_w&mask;result/=0x100000000;result+=0.5;return result*(Math.random()>.5?1:-1);};};for(var i=0,rcache;i<nBytes;i+=4){var _r=r((rcache||Math.random())*0x100000000);rcache=_r()*0x3ade67b7;words.push(_r()*0x100000000|0);}return new WordArray.init(words,nBytes);}});/**
		* Encoder namespace.
		*/var C_enc=C.enc={};/**
		* Hex encoding strategy.
		*/var Hex=C_enc.Hex={/**
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
			*/stringify:function stringify(wordArray){// Shortcuts
   var words=wordArray.words;var sigBytes=wordArray.sigBytes;// Convert
   var hexChars=[];for(var i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&0xff;hexChars.push((bite>>>4).toString(16));hexChars.push((bite&0x0f).toString(16));}return hexChars.join('');},/**
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
			*/parse:function parse(hexStr){// Shortcut
   var hexStrLength=hexStr.length;// Convert
   var words=[];for(var i=0;i<hexStrLength;i+=2){words[i>>>3]|=parseInt(hexStr.substr(i,2),16)<<24-i%8*4;}return new WordArray.init(words,hexStrLength/2);}};/**
		* Latin1 encoding strategy.
		*/var Latin1=C_enc.Latin1={/**
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
			*/stringify:function stringify(wordArray){// Shortcuts
   var words=wordArray.words;var sigBytes=wordArray.sigBytes;// Convert
   var latin1Chars=[];for(var i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&0xff;latin1Chars.push(String.fromCharCode(bite));}return latin1Chars.join('');},/**
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
			*/parse:function parse(latin1Str){// Shortcut
   var latin1StrLength=latin1Str.length;// Convert
   var words=[];for(var i=0;i<latin1StrLength;i++){words[i>>>2]|=(latin1Str.charCodeAt(i)&0xff)<<24-i%4*8;}return new WordArray.init(words,latin1StrLength);}};/**
		* UTF-8 encoding strategy.
		*/var Utf8=C_enc.Utf8={/**
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
			*/stringify:function stringify(wordArray){try{return decodeURIComponent(escape(Latin1.stringify(wordArray)));}catch(e){throw new Error('Malformed UTF-8 data');}},/**
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
			*/parse:function parse(utf8Str){return Latin1.parse(unescape(encodeURIComponent(utf8Str)));}};/**
		* Abstract buffered block algorithm template.
		*
		* The property blockSize must be implemented in a concrete subtype.
		*
		* @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		*/var BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm=Base.extend({/**
			* Resets this block algorithm's data buffer to its initial state.
			*
			* @example
			*
			*     bufferedBlockAlgorithm.reset();
			*/reset:function reset(){// Initial values
   this._data=new WordArray.init();this._nDataBytes=0;},/**
			* Adds new data to this block algorithm's buffer.
			*
			* @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
			*
			* @example
			*
			*     bufferedBlockAlgorithm._append('data');
			*     bufferedBlockAlgorithm._append(wordArray);
			*/_append:function _append(data){// Convert string to WordArray, else assume WordArray already
   if(typeof data=='string'){data=Utf8.parse(data);}// Append
   this._data.concat(data);this._nDataBytes+=data.sigBytes;},/**
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
			*/_process:function _process(doFlush){// Shortcuts
   var data=this._data;var dataWords=data.words;var dataSigBytes=data.sigBytes;var blockSize=this.blockSize;var blockSizeBytes=blockSize*4;// Count blocks ready
   var nBlocksReady=dataSigBytes/blockSizeBytes;if(doFlush){// Round up to include partial blocks
   nBlocksReady=Math.ceil(nBlocksReady);}else{// Round down to include only full blocks,
   // less the number of blocks that must remain in the buffer
   nBlocksReady=Math.max((nBlocksReady|0)-this._minBufferSize,0);}// Count words ready
   var nWordsReady=nBlocksReady*blockSize;// Count bytes ready
   var nBytesReady=Math.min(nWordsReady*4,dataSigBytes);// Process blocks
   if(nWordsReady){for(var offset=0;offset<nWordsReady;offset+=blockSize){// Perform concrete-algorithm logic
   this._doProcessBlock(dataWords,offset);}// Remove processed words
   var processedWords=dataWords.splice(0,nWordsReady);data.sigBytes-=nBytesReady;}// Return processed words
   return new WordArray.init(processedWords,nBytesReady);},/**
			* Creates a copy of this object.
			*
			* @return {Object} The clone.
			*
			* @example
			*
			*     var clone = bufferedBlockAlgorithm.clone();
			*/clone:function clone(){var clone=Base.clone.call(this);clone._data=this._data.clone();return clone;},_minBufferSize:0});/**
		* Abstract hasher template.
		*
		* @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		*/var Hasher=C_lib.Hasher=BufferedBlockAlgorithm.extend({/**
			* Configuration options.
			*/cfg:Base.extend(),/**
			* Initializes a newly created hasher.
			*
			* @param {Object} cfg (Optional) The configuration options to use for this hash computation.
			*
			* @example
			*
			*     var hasher = CryptoJS.algo.SHA256.create();
			*/init:function init(cfg){// Apply config defaults
   this.cfg=this.cfg.extend(cfg);// Set initial values
   this.reset();},/**
			* Resets this hasher to its initial state.
			*
			* @example
			*
			*     hasher.reset();
			*/reset:function reset(){// Reset data buffer
   BufferedBlockAlgorithm.reset.call(this);// Perform concrete-hasher logic
   this._doReset();},/**
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
			*/update:function update(messageUpdate){// Append
   this._append(messageUpdate);// Update the hash
   this._process();// Chainable
   return this;},/**
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
			*/finalize:function finalize(messageUpdate){// Final message update
   if(messageUpdate){this._append(messageUpdate);}// Perform concrete-hasher logic
   var hash=this._doFinalize();return hash;},blockSize:512/32,/**
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
			*/_createHelper:function _createHelper(hasher){return function(message,cfg){return new hasher.init(cfg).finalize(message);};},/**
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
			*/_createHmacHelper:function _createHmacHelper(hasher){return function(message,key){return new C_algo.HMAC.init(hasher,key).finalize(message);};}});/**
		* Algorithm namespace.
		*/var C_algo=C.algo={};return C;}(Math);(function(Math){// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;// Initialization and round constants tables
   var H=[];var K=[];// Compute constants
   (function(){function isPrime(n){var sqrtN=Math.sqrt(n);for(var factor=2;factor<=sqrtN;factor++){if(!(n%factor)){return false;}}return true;}function getFractionalBits(n){return(n-(n|0))*0x100000000|0;}var n=2;var nPrime=0;while(nPrime<64){if(isPrime(n)){if(nPrime<8){H[nPrime]=getFractionalBits(Math.pow(n,1/2));}K[nPrime]=getFractionalBits(Math.pow(n,1/3));nPrime++;}n++;}})();// Reusable object
   var W=[];/**
		* SHA-256 hash algorithm.
		*/var SHA256=C_algo.SHA256=Hasher.extend({_doReset:function _doReset(){this._hash=new WordArray.init(H.slice(0));},_doProcessBlock:function _doProcessBlock(M,offset){// Shortcut
   var H=this._hash.words;// Working variables
   var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];var f=H[5];var g=H[6];var h=H[7];// Computation
   for(var i=0;i<64;i++){if(i<16){W[i]=M[offset+i]|0;}else{var gamma0x=W[i-15];var gamma0=(gamma0x<<25|gamma0x>>>7)^(gamma0x<<14|gamma0x>>>18)^gamma0x>>>3;var gamma1x=W[i-2];var gamma1=(gamma1x<<15|gamma1x>>>17)^(gamma1x<<13|gamma1x>>>19)^gamma1x>>>10;W[i]=gamma0+W[i-7]+gamma1+W[i-16];}var ch=e&f^~e&g;var maj=a&b^a&c^b&c;var sigma0=(a<<30|a>>>2)^(a<<19|a>>>13)^(a<<10|a>>>22);var sigma1=(e<<26|e>>>6)^(e<<21|e>>>11)^(e<<7|e>>>25);var t1=h+sigma1+ch+K[i]+W[i];var t2=sigma0+maj;h=g;g=f;f=e;e=d+t1|0;d=c;c=b;b=a;a=t1+t2|0;}// Intermediate hash value
   H[0]=H[0]+a|0;H[1]=H[1]+b|0;H[2]=H[2]+c|0;H[3]=H[3]+d|0;H[4]=H[4]+e|0;H[5]=H[5]+f|0;H[6]=H[6]+g|0;H[7]=H[7]+h|0;},_doFinalize:function _doFinalize(){// Shortcuts
   var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;// Add padding
   dataWords[nBitsLeft>>>5]|=0x80<<24-nBitsLeft%32;dataWords[(nBitsLeft+64>>>9<<4)+14]=Math.floor(nBitsTotal/0x100000000);dataWords[(nBitsLeft+64>>>9<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;// Hash final blocks
   this._process();// Return final computed hash
   return this._hash;},clone:function clone(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;}});/**
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
		*/C.SHA256=Hasher._createHelper(SHA256);/**
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
		*/C.HmacSHA256=Hasher._createHmacHelper(SHA256);})(Math);(function(){// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var C_enc=C.enc;var Utf8=C_enc.Utf8;var C_algo=C.algo;/**
		* HMAC algorithm.
		*/var HMAC=C_algo.HMAC=Base.extend({/**
			* Initializes a newly created HMAC.
			*
			* @param {Hasher} hasher The hash algorithm to use.
			* @param {WordArray|string} key The secret key.
			*
			* @example
			*
			*     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
			*/init:function init(hasher,key){// Init hasher
   hasher=this._hasher=new hasher.init();// Convert string to WordArray, else assume WordArray already
   if(typeof key=='string'){key=Utf8.parse(key);}// Shortcuts
   var hasherBlockSize=hasher.blockSize;var hasherBlockSizeBytes=hasherBlockSize*4;// Allow arbitrary length keys
   if(key.sigBytes>hasherBlockSizeBytes){key=hasher.finalize(key);}// Clamp excess bits
   key.clamp();// Clone key for inner and outer pads
   var oKey=this._oKey=key.clone();var iKey=this._iKey=key.clone();// Shortcuts
   var oKeyWords=oKey.words;var iKeyWords=iKey.words;// XOR keys with pad constants
   for(var i=0;i<hasherBlockSize;i++){oKeyWords[i]^=0x5c5c5c5c;iKeyWords[i]^=0x36363636;}oKey.sigBytes=iKey.sigBytes=hasherBlockSizeBytes;// Set initial values
   this.reset();},/**
			* Resets this HMAC to its initial state.
			*
			* @example
			*
			*     hmacHasher.reset();
			*/reset:function reset(){// Shortcut
   var hasher=this._hasher;// Reset
   hasher.reset();hasher.update(this._iKey);},/**
			* Updates this HMAC with a message.
			*
			* @param {WordArray|string} messageUpdate The message to append.
			*
			* @return {HMAC} This HMAC instance.
			*
			* @example
			*
			*     hmacHasher.update('message');
			*     hmacHasher.update(wordArray);
			*/update:function update(messageUpdate){this._hasher.update(messageUpdate);// Chainable
   return this;},/**
			* Finalizes the HMAC computation.
			* Note that the finalize operation is effectively a destructive, read-once operation.
			*
			* @param {WordArray|string} messageUpdate (Optional) A final message update.
			*
			* @return {WordArray} The HMAC.
			*
			* @example
			*
			*     var hmac = hmacHasher.finalize();
			*     var hmac = hmacHasher.finalize('message');
			*     var hmac = hmacHasher.finalize(wordArray);
			*/finalize:function finalize(messageUpdate){// Shortcut
   var hasher=this._hasher;// Compute HMAC
   var innerHash=hasher.finalize(messageUpdate);hasher.reset();var hmac=hasher.finalize(this._oKey.clone().concat(innerHash));return hmac;}});})();(function(){// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;/**
		* Base64 encoding strategy.
		*/var Base64=C_enc.Base64={/**
			* Converts a word array to a Base64 string.
			*
			* @param {WordArray} wordArray The word array.
			*
			* @return {string} The Base64 string.
			*
			* @static
			*
			* @example
			*
			*     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
			*/stringify:function stringify(wordArray){// Shortcuts
   var words=wordArray.words;var sigBytes=wordArray.sigBytes;var map=this._map;// Clamp excess bits
   wordArray.clamp();// Convert
   var base64Chars=[];for(var i=0;i<sigBytes;i+=3){var byte1=words[i>>>2]>>>24-i%4*8&0xff;var byte2=words[i+1>>>2]>>>24-(i+1)%4*8&0xff;var byte3=words[i+2>>>2]>>>24-(i+2)%4*8&0xff;var triplet=byte1<<16|byte2<<8|byte3;for(var j=0;j<4&&i+j*0.75<sigBytes;j++){base64Chars.push(map.charAt(triplet>>>6*(3-j)&0x3f));}}// Add padding
   var paddingChar=map.charAt(64);if(paddingChar){while(base64Chars.length%4){base64Chars.push(paddingChar);}}return base64Chars.join('');},/**
			* Converts a Base64 string to a word array.
			*
			* @param {string} base64Str The Base64 string.
			*
			* @return {WordArray} The word array.
			*
			* @static
			*
			* @example
			*
			*     var wordArray = CryptoJS.enc.Base64.parse(base64String);
			*/parse:function parse(base64Str){// Shortcuts
   var base64StrLength=base64Str.length;var map=this._map;// Ignore padding
   var paddingChar=map.charAt(64);if(paddingChar){var paddingIndex=base64Str.indexOf(paddingChar);if(paddingIndex!=-1){base64StrLength=paddingIndex;}}// Convert
   var words=[];var nBytes=0;for(var i=0;i<base64StrLength;i++){if(i%4){var bits1=map.indexOf(base64Str.charAt(i-1))<<i%4*2;var bits2=map.indexOf(base64Str.charAt(i))>>>6-i%4*2;words[nBytes>>>2]|=(bits1|bits2)<<24-nBytes%4*8;nBytes++;}}return WordArray.create(words,nBytes);},_map:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='};})();/**
	* Cipher core components.
	*/CryptoJS.lib.Cipher||function(undefined){// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var WordArray=C_lib.WordArray;var BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm;var C_enc=C.enc;var Utf8=C_enc.Utf8;var Base64=C_enc.Base64;var C_algo=C.algo;var EvpKDF=C_algo.EvpKDF;/**
		* Abstract base cipher template.
		*
		* @property {number} keySize This cipher's key size. Default: 4 (128 bits)
		* @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
		* @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
		* @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
		*/var Cipher=C_lib.Cipher=BufferedBlockAlgorithm.extend({/**
			* Configuration options.
			*
			* @property {WordArray} iv The IV to use for this operation.
			*/cfg:Base.extend(),/**
			* Creates this cipher in encryption mode.
			*
			* @param {WordArray} key The key.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {Cipher} A cipher instance.
			*
			* @static
			*
			* @example
			*
			*     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
			*/createEncryptor:function createEncryptor(key,cfg){return this.create(this._ENC_XFORM_MODE,key,cfg);},/**
			* Creates this cipher in decryption mode.
			*
			* @param {WordArray} key The key.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {Cipher} A cipher instance.
			*
			* @static
			*
			* @example
			*
			*     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
			*/createDecryptor:function createDecryptor(key,cfg){return this.create(this._DEC_XFORM_MODE,key,cfg);},/**
			* Initializes a newly created cipher.
			*
			* @param {number} xformMode Either the encryption or decryption transormation mode constant.
			* @param {WordArray} key The key.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @example
			*
			*     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
			*/init:function init(xformMode,key,cfg){// Apply config defaults
   this.cfg=this.cfg.extend(cfg);// Store transform mode and key
   this._xformMode=xformMode;this._key=key;// Set initial values
   this.reset();},/**
			* Resets this cipher to its initial state.
			*
			* @example
			*
			*     cipher.reset();
			*/reset:function reset(){// Reset data buffer
   BufferedBlockAlgorithm.reset.call(this);// Perform concrete-cipher logic
   this._doReset();},/**
			* Adds data to be encrypted or decrypted.
			*
			* @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
			*
			* @return {WordArray} The data after processing.
			*
			* @example
			*
			*     var encrypted = cipher.process('data');
			*     var encrypted = cipher.process(wordArray);
			*/process:function process(dataUpdate){// Append
   this._append(dataUpdate);// Process available blocks
   return this._process();},/**
			* Finalizes the encryption or decryption process.
			* Note that the finalize operation is effectively a destructive, read-once operation.
			*
			* @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
			*
			* @return {WordArray} The data after final processing.
			*
			* @example
			*
			*     var encrypted = cipher.finalize();
			*     var encrypted = cipher.finalize('data');
			*     var encrypted = cipher.finalize(wordArray);
			*/finalize:function finalize(dataUpdate){// Final data update
   if(dataUpdate){this._append(dataUpdate);}// Perform concrete-cipher logic
   var finalProcessedData=this._doFinalize();return finalProcessedData;},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,/**
			* Creates shortcut functions to a cipher's object interface.
			*
			* @param {Cipher} cipher The cipher to create a helper for.
			*
			* @return {Object} An object with encrypt and decrypt shortcut functions.
			*
			* @static
			*
			* @example
			*
			*     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
			*/_createHelper:function(){function selectCipherStrategy(key){if(typeof key=='string'){return PasswordBasedCipher;}else{return SerializableCipher;}}return function(cipher){return{encrypt:function encrypt(message,key,cfg){return selectCipherStrategy(key).encrypt(cipher,message,key,cfg);},decrypt:function decrypt(ciphertext,key,cfg){return selectCipherStrategy(key).decrypt(cipher,ciphertext,key,cfg);}};};}()});/**
		* Abstract base stream cipher template.
		*
		* @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
		*/var StreamCipher=C_lib.StreamCipher=Cipher.extend({_doFinalize:function _doFinalize(){// Process partial blocks
   var finalProcessedBlocks=this._process(!!'flush');return finalProcessedBlocks;},blockSize:1});/**
		* Mode namespace.
		*/var C_mode=C.mode={};/**
		* Abstract base block cipher mode template.
		*/var BlockCipherMode=C_lib.BlockCipherMode=Base.extend({/**
			* Creates this mode for encryption.
			*
			* @param {Cipher} cipher A block cipher instance.
			* @param {Array} iv The IV words.
			*
			* @static
			*
			* @example
			*
			*     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
			*/createEncryptor:function createEncryptor(cipher,iv){return this.Encryptor.create(cipher,iv);},/**
			* Creates this mode for decryption.
			*
			* @param {Cipher} cipher A block cipher instance.
			* @param {Array} iv The IV words.
			*
			* @static
			*
			* @example
			*
			*     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
			*/createDecryptor:function createDecryptor(cipher,iv){return this.Decryptor.create(cipher,iv);},/**
			* Initializes a newly created mode.
			*
			* @param {Cipher} cipher A block cipher instance.
			* @param {Array} iv The IV words.
			*
			* @example
			*
			*     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
			*/init:function init(cipher,iv){this._cipher=cipher;this._iv=iv;}});/**
		* Cipher Block Chaining mode.
		*/var CBC=C_mode.CBC=function(){/**
			* Abstract base CBC mode.
			*/var CBC=BlockCipherMode.extend();/**
			* CBC encryptor.
			*/CBC.Encryptor=CBC.extend({/**
				* Processes the data block at offset.
				*
				* @param {Array} words The data words to operate on.
				* @param {number} offset The offset where the block starts.
				*
				* @example
				*
				*     mode.processBlock(data.words, offset);
				*/processBlock:function processBlock(words,offset){// Shortcuts
   var cipher=this._cipher;var blockSize=cipher.blockSize;// XOR and encrypt
   xorBlock.call(this,words,offset,blockSize);cipher.encryptBlock(words,offset);// Remember this block to use with next block
   this._prevBlock=words.slice(offset,offset+blockSize);}});/**
			* CBC decryptor.
			*/CBC.Decryptor=CBC.extend({/**
				* Processes the data block at offset.
				*
				* @param {Array} words The data words to operate on.
				* @param {number} offset The offset where the block starts.
				*
				* @example
				*
				*     mode.processBlock(data.words, offset);
				*/processBlock:function processBlock(words,offset){// Shortcuts
   var cipher=this._cipher;var blockSize=cipher.blockSize;// Remember this block to use with next block
   var thisBlock=words.slice(offset,offset+blockSize);// Decrypt and XOR
   cipher.decryptBlock(words,offset);xorBlock.call(this,words,offset,blockSize);// This block becomes the previous block
   this._prevBlock=thisBlock;}});function xorBlock(words,offset,blockSize){// Shortcut
   var iv=this._iv;// Choose mixing block
   if(iv){var block=iv;// Remove IV for subsequent blocks
   this._iv=undefined;}else{var block=this._prevBlock;}// XOR blocks
   for(var i=0;i<blockSize;i++){words[offset+i]^=block[i];}}return CBC;}();/**
		* Padding namespace.
		*/var C_pad=C.pad={};/**
		* PKCS #5/7 padding strategy.
		*/var Pkcs7=C_pad.Pkcs7={/**
			* Pads data using the algorithm defined in PKCS #5/7.
			*
			* @param {WordArray} data The data to pad.
			* @param {number} blockSize The multiple that the data should be padded to.
			*
			* @static
			*
			* @example
			*
			*     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
			*/pad:function pad(data,blockSize){// Shortcut
   var blockSizeBytes=blockSize*4;// Count padding bytes
   var nPaddingBytes=blockSizeBytes-data.sigBytes%blockSizeBytes;// Create padding word
   var paddingWord=nPaddingBytes<<24|nPaddingBytes<<16|nPaddingBytes<<8|nPaddingBytes;// Create padding
   var paddingWords=[];for(var i=0;i<nPaddingBytes;i+=4){paddingWords.push(paddingWord);}var padding=WordArray.create(paddingWords,nPaddingBytes);// Add padding
   data.concat(padding);},/**
			* Unpads data that had been padded using the algorithm defined in PKCS #5/7.
			*
			* @param {WordArray} data The data to unpad.
			*
			* @static
			*
			* @example
			*
			*     CryptoJS.pad.Pkcs7.unpad(wordArray);
			*/unpad:function unpad(data){// Get number of padding bytes from last byte
   var nPaddingBytes=data.words[data.sigBytes-1>>>2]&0xff;// Remove padding
   data.sigBytes-=nPaddingBytes;}};/**
		* Abstract base block cipher template.
		*
		* @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
		*/var BlockCipher=C_lib.BlockCipher=Cipher.extend({/**
			* Configuration options.
			*
			* @property {Mode} mode The block mode to use. Default: CBC
			* @property {Padding} padding The padding strategy to use. Default: Pkcs7
			*/cfg:Cipher.cfg.extend({mode:CBC,padding:Pkcs7}),reset:function reset(){// Reset cipher
   Cipher.reset.call(this);// Shortcuts
   var cfg=this.cfg;var iv=cfg.iv;var mode=cfg.mode;// Reset block mode
   if(this._xformMode==this._ENC_XFORM_MODE){var modeCreator=mode.createEncryptor;}else/* if (this._xformMode == this._DEC_XFORM_MODE) */{var modeCreator=mode.createDecryptor;// Keep at least one block in the buffer for unpadding
   this._minBufferSize=1;}this._mode=modeCreator.call(mode,this,iv&&iv.words);},_doProcessBlock:function _doProcessBlock(words,offset){this._mode.processBlock(words,offset);},_doFinalize:function _doFinalize(){// Shortcut
   var padding=this.cfg.padding;// Finalize
   if(this._xformMode==this._ENC_XFORM_MODE){// Pad data
   padding.pad(this._data,this.blockSize);// Process final blocks
   var finalProcessedBlocks=this._process(!!'flush');}else/* if (this._xformMode == this._DEC_XFORM_MODE) */{// Process final blocks
   var finalProcessedBlocks=this._process(!!'flush');// Unpad data
   padding.unpad(finalProcessedBlocks);}return finalProcessedBlocks;},blockSize:128/32});/**
		* A collection of cipher parameters.
		*
		* @property {WordArray} ciphertext The raw ciphertext.
		* @property {WordArray} key The key to this ciphertext.
		* @property {WordArray} iv The IV used in the ciphering operation.
		* @property {WordArray} salt The salt used with a key derivation function.
		* @property {Cipher} algorithm The cipher algorithm.
		* @property {Mode} mode The block mode used in the ciphering operation.
		* @property {Padding} padding The padding scheme used in the ciphering operation.
		* @property {number} blockSize The block size of the cipher.
		* @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
		*/var CipherParams=C_lib.CipherParams=Base.extend({/**
			* Initializes a newly created cipher params object.
			*
			* @param {Object} cipherParams An object with any of the possible cipher parameters.
			*
			* @example
			*
			*     var cipherParams = CryptoJS.lib.CipherParams.create({
			*         ciphertext: ciphertextWordArray,
			*         key: keyWordArray,
			*         iv: ivWordArray,
			*         salt: saltWordArray,
			*         algorithm: CryptoJS.algo.AES,
			*         mode: CryptoJS.mode.CBC,
			*         padding: CryptoJS.pad.PKCS7,
			*         blockSize: 4,
			*         formatter: CryptoJS.format.OpenSSL
			*     });
			*/init:function init(cipherParams){this.mixIn(cipherParams);},/**
			* Converts this cipher params object to a string.
			*
			* @param {Format} formatter (Optional) The formatting strategy to use.
			*
			* @return {string} The stringified cipher params.
			*
			* @throws Error If neither the formatter nor the default formatter is set.
			*
			* @example
			*
			*     var string = cipherParams + '';
			*     var string = cipherParams.toString();
			*     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
			*/toString:function toString(formatter){return(formatter||this.formatter).stringify(this);}});/**
		* Format namespace.
		*/var C_format=C.format={};/**
		* OpenSSL formatting strategy.
		*/var OpenSSLFormatter=C_format.OpenSSL={/**
			* Converts a cipher params object to an OpenSSL-compatible string.
			*
			* @param {CipherParams} cipherParams The cipher params object.
			*
			* @return {string} The OpenSSL-compatible string.
			*
			* @static
			*
			* @example
			*
			*     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
			*/stringify:function stringify(cipherParams){// Shortcuts
   var ciphertext=cipherParams.ciphertext;var salt=cipherParams.salt;// Format
   if(salt){var wordArray=WordArray.create([0x53616c74,0x65645f5f]).concat(salt).concat(ciphertext);}else{var wordArray=ciphertext;}return wordArray.toString(Base64);},/**
			* Converts an OpenSSL-compatible string to a cipher params object.
			*
			* @param {string} openSSLStr The OpenSSL-compatible string.
			*
			* @return {CipherParams} The cipher params object.
			*
			* @static
			*
			* @example
			*
			*     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
			*/parse:function parse(openSSLStr){// Parse base64
   var ciphertext=Base64.parse(openSSLStr);// Shortcut
   var ciphertextWords=ciphertext.words;// Test for salt
   if(ciphertextWords[0]==0x53616c74&&ciphertextWords[1]==0x65645f5f){// Extract salt
   var salt=WordArray.create(ciphertextWords.slice(2,4));// Remove salt from ciphertext
   ciphertextWords.splice(0,4);ciphertext.sigBytes-=16;}return CipherParams.create({ciphertext:ciphertext,salt:salt});}};/**
		* A cipher wrapper that returns ciphertext as a serializable cipher params object.
		*/var SerializableCipher=C_lib.SerializableCipher=Base.extend({/**
			* Configuration options.
			*
			* @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
			*/cfg:Base.extend({format:OpenSSLFormatter}),/**
			* Encrypts a message.
			*
			* @param {Cipher} cipher The cipher algorithm to use.
			* @param {WordArray|string} message The message to encrypt.
			* @param {WordArray} key The key.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {CipherParams} A cipher params object.
			*
			* @static
			*
			* @example
			*
			*     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
			*     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
			*     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			*/encrypt:function encrypt(cipher,message,key,cfg){// Apply config defaults
   cfg=this.cfg.extend(cfg);// Encrypt
   var encryptor=cipher.createEncryptor(key,cfg);var ciphertext=encryptor.finalize(message);// Shortcut
   var cipherCfg=encryptor.cfg;// Create and return serializable cipher params
   return CipherParams.create({ciphertext:ciphertext,key:key,iv:cipherCfg.iv,algorithm:cipher,mode:cipherCfg.mode,padding:cipherCfg.padding,blockSize:cipher.blockSize,formatter:cfg.format});},/**
			* Decrypts serialized ciphertext.
			*
			* @param {Cipher} cipher The cipher algorithm to use.
			* @param {CipherParams|string} ciphertext The ciphertext to decrypt.
			* @param {WordArray} key The key.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {WordArray} The plaintext.
			*
			* @static
			*
			* @example
			*
			*     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			*     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			*/decrypt:function decrypt(cipher,ciphertext,key,cfg){// Apply config defaults
   cfg=this.cfg.extend(cfg);// Convert string to CipherParams
   ciphertext=this._parse(ciphertext,cfg.format);// Decrypt
   var plaintext=cipher.createDecryptor(key,cfg).finalize(ciphertext.ciphertext);return plaintext;},/**
			* Converts serialized ciphertext to CipherParams,
			* else assumed CipherParams already and returns ciphertext unchanged.
			*
			* @param {CipherParams|string} ciphertext The ciphertext.
			* @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
			*
			* @return {CipherParams} The unserialized ciphertext.
			*
			* @static
			*
			* @example
			*
			*     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
			*/_parse:function _parse(ciphertext,format){if(typeof ciphertext=='string'){return format.parse(ciphertext,this);}else{return ciphertext;}}});/**
		* Key derivation function namespace.
		*/var C_kdf=C.kdf={};/**
		* OpenSSL key derivation function.
		*/var OpenSSLKdf=C_kdf.OpenSSL={/**
			* Derives a key and IV from a password.
			*
			* @param {string} password The password to derive from.
			* @param {number} keySize The size in words of the key to generate.
			* @param {number} ivSize The size in words of the IV to generate.
			* @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
			*
			* @return {CipherParams} A cipher params object with the key, IV, and salt.
			*
			* @static
			*
			* @example
			*
			*     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
			*     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
			*/execute:function execute(password,keySize,ivSize,salt){// Generate random salt
   if(!salt){salt=WordArray.random(64/8);}// Derive key and IV
   var key=EvpKDF.create({keySize:keySize+ivSize}).compute(password,salt);// Separate key and IV
   var iv=WordArray.create(key.words.slice(keySize),ivSize*4);key.sigBytes=keySize*4;// Return params
   return CipherParams.create({key:key,iv:iv,salt:salt});}};/**
		* A serializable cipher wrapper that derives the key from a password,
		* and returns ciphertext as a serializable cipher params object.
		*/var PasswordBasedCipher=C_lib.PasswordBasedCipher=SerializableCipher.extend({/**
			* Configuration options.
			*
			* @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
			*/cfg:SerializableCipher.cfg.extend({kdf:OpenSSLKdf}),/**
			* Encrypts a message using a password.
			*
			* @param {Cipher} cipher The cipher algorithm to use.
			* @param {WordArray|string} message The message to encrypt.
			* @param {string} password The password.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {CipherParams} A cipher params object.
			*
			* @static
			*
			* @example
			*
			*     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
			*     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
			*/encrypt:function encrypt(cipher,message,password,cfg){// Apply config defaults
   cfg=this.cfg.extend(cfg);// Derive key and other params
   var derivedParams=cfg.kdf.execute(password,cipher.keySize,cipher.ivSize);// Add IV to config
   cfg.iv=derivedParams.iv;// Encrypt
   var ciphertext=SerializableCipher.encrypt.call(this,cipher,message,derivedParams.key,cfg);// Mix in derived params
   ciphertext.mixIn(derivedParams);return ciphertext;},/**
			* Decrypts serialized ciphertext using a password.
			*
			* @param {Cipher} cipher The cipher algorithm to use.
			* @param {CipherParams|string} ciphertext The ciphertext to decrypt.
			* @param {string} password The password.
			* @param {Object} cfg (Optional) The configuration options to use for this operation.
			*
			* @return {WordArray} The plaintext.
			*
			* @static
			*
			* @example
			*
			*     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
			*     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
			*/decrypt:function decrypt(cipher,ciphertext,password,cfg){// Apply config defaults
   cfg=this.cfg.extend(cfg);// Convert string to CipherParams
   ciphertext=this._parse(ciphertext,cfg.format);// Derive key and other params
   var derivedParams=cfg.kdf.execute(password,cipher.keySize,cipher.ivSize,ciphertext.salt);// Add IV to config
   cfg.iv=derivedParams.iv;// Decrypt
   var plaintext=SerializableCipher.decrypt.call(this,cipher,ciphertext,derivedParams.key,cfg);return plaintext;}});}();(function(){// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var BlockCipher=C_lib.BlockCipher;var C_algo=C.algo;// Lookup tables
   var SBOX=[];var INV_SBOX=[];var SUB_MIX_0=[];var SUB_MIX_1=[];var SUB_MIX_2=[];var SUB_MIX_3=[];var INV_SUB_MIX_0=[];var INV_SUB_MIX_1=[];var INV_SUB_MIX_2=[];var INV_SUB_MIX_3=[];// Compute lookup tables
   (function(){// Compute double table
   var d=[];for(var i=0;i<256;i++){if(i<128){d[i]=i<<1;}else{d[i]=i<<1^0x11b;}}// Walk GF(2^8)
   var x=0;var xi=0;for(var i=0;i<256;i++){// Compute sbox
   var sx=xi^xi<<1^xi<<2^xi<<3^xi<<4;sx=sx>>>8^sx&0xff^0x63;SBOX[x]=sx;INV_SBOX[sx]=x;// Compute multiplication
   var x2=d[x];var x4=d[x2];var x8=d[x4];// Compute sub bytes, mix columns tables
   var t=d[sx]*0x101^sx*0x1010100;SUB_MIX_0[x]=t<<24|t>>>8;SUB_MIX_1[x]=t<<16|t>>>16;SUB_MIX_2[x]=t<<8|t>>>24;SUB_MIX_3[x]=t;// Compute inv sub bytes, inv mix columns tables
   var t=x8*0x1010101^x4*0x10001^x2*0x101^x*0x1010100;INV_SUB_MIX_0[sx]=t<<24|t>>>8;INV_SUB_MIX_1[sx]=t<<16|t>>>16;INV_SUB_MIX_2[sx]=t<<8|t>>>24;INV_SUB_MIX_3[sx]=t;// Compute next counter
   if(!x){x=xi=1;}else{x=x2^d[d[d[x8^x2]]];xi^=d[d[xi]];}}})();// Precomputed Rcon lookup
   var RCON=[0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1b,0x36];/**
		* AES block cipher algorithm.
		*/var AES=C_algo.AES=BlockCipher.extend({_doReset:function _doReset(){// Shortcuts
   var key=this._key;var keyWords=key.words;var keySize=key.sigBytes/4;// Compute number of rounds
   var nRounds=this._nRounds=keySize+6;// Compute number of key schedule rows
   var ksRows=(nRounds+1)*4;// Compute key schedule
   var keySchedule=this._keySchedule=[];for(var ksRow=0;ksRow<ksRows;ksRow++){if(ksRow<keySize){keySchedule[ksRow]=keyWords[ksRow];}else{var t=keySchedule[ksRow-1];if(!(ksRow%keySize)){// Rot word
   t=t<<8|t>>>24;// Sub word
   t=SBOX[t>>>24]<<24|SBOX[t>>>16&0xff]<<16|SBOX[t>>>8&0xff]<<8|SBOX[t&0xff];// Mix Rcon
   t^=RCON[ksRow/keySize|0]<<24;}else if(keySize>6&&ksRow%keySize==4){// Sub word
   t=SBOX[t>>>24]<<24|SBOX[t>>>16&0xff]<<16|SBOX[t>>>8&0xff]<<8|SBOX[t&0xff];}keySchedule[ksRow]=keySchedule[ksRow-keySize]^t;}}// Compute inv key schedule
   var invKeySchedule=this._invKeySchedule=[];for(var invKsRow=0;invKsRow<ksRows;invKsRow++){var ksRow=ksRows-invKsRow;if(invKsRow%4){var t=keySchedule[ksRow];}else{var t=keySchedule[ksRow-4];}if(invKsRow<4||ksRow<=4){invKeySchedule[invKsRow]=t;}else{invKeySchedule[invKsRow]=INV_SUB_MIX_0[SBOX[t>>>24]]^INV_SUB_MIX_1[SBOX[t>>>16&0xff]]^INV_SUB_MIX_2[SBOX[t>>>8&0xff]]^INV_SUB_MIX_3[SBOX[t&0xff]];}}},encryptBlock:function encryptBlock(M,offset){this._doCryptBlock(M,offset,this._keySchedule,SUB_MIX_0,SUB_MIX_1,SUB_MIX_2,SUB_MIX_3,SBOX);},decryptBlock:function decryptBlock(M,offset){// Swap 2nd and 4th rows
   var t=M[offset+1];M[offset+1]=M[offset+3];M[offset+3]=t;this._doCryptBlock(M,offset,this._invKeySchedule,INV_SUB_MIX_0,INV_SUB_MIX_1,INV_SUB_MIX_2,INV_SUB_MIX_3,INV_SBOX);// Inv swap 2nd and 4th rows
   var t=M[offset+1];M[offset+1]=M[offset+3];M[offset+3]=t;},_doCryptBlock:function _doCryptBlock(M,offset,keySchedule,SUB_MIX_0,SUB_MIX_1,SUB_MIX_2,SUB_MIX_3,SBOX){// Shortcut
   var nRounds=this._nRounds;// Get input, add round key
   var s0=M[offset]^keySchedule[0];var s1=M[offset+1]^keySchedule[1];var s2=M[offset+2]^keySchedule[2];var s3=M[offset+3]^keySchedule[3];// Key schedule row counter
   var ksRow=4;// Rounds
   for(var round=1;round<nRounds;round++){// Shift rows, sub bytes, mix columns, add round key
   var t0=SUB_MIX_0[s0>>>24]^SUB_MIX_1[s1>>>16&0xff]^SUB_MIX_2[s2>>>8&0xff]^SUB_MIX_3[s3&0xff]^keySchedule[ksRow++];var t1=SUB_MIX_0[s1>>>24]^SUB_MIX_1[s2>>>16&0xff]^SUB_MIX_2[s3>>>8&0xff]^SUB_MIX_3[s0&0xff]^keySchedule[ksRow++];var t2=SUB_MIX_0[s2>>>24]^SUB_MIX_1[s3>>>16&0xff]^SUB_MIX_2[s0>>>8&0xff]^SUB_MIX_3[s1&0xff]^keySchedule[ksRow++];var t3=SUB_MIX_0[s3>>>24]^SUB_MIX_1[s0>>>16&0xff]^SUB_MIX_2[s1>>>8&0xff]^SUB_MIX_3[s2&0xff]^keySchedule[ksRow++];// Update state
   s0=t0;s1=t1;s2=t2;s3=t3;}// Shift rows, sub bytes, add round key
   var t0=(SBOX[s0>>>24]<<24|SBOX[s1>>>16&0xff]<<16|SBOX[s2>>>8&0xff]<<8|SBOX[s3&0xff])^keySchedule[ksRow++];var t1=(SBOX[s1>>>24]<<24|SBOX[s2>>>16&0xff]<<16|SBOX[s3>>>8&0xff]<<8|SBOX[s0&0xff])^keySchedule[ksRow++];var t2=(SBOX[s2>>>24]<<24|SBOX[s3>>>16&0xff]<<16|SBOX[s0>>>8&0xff]<<8|SBOX[s1&0xff])^keySchedule[ksRow++];var t3=(SBOX[s3>>>24]<<24|SBOX[s0>>>16&0xff]<<16|SBOX[s1>>>8&0xff]<<8|SBOX[s2&0xff])^keySchedule[ksRow++];// Set output
   M[offset]=t0;M[offset+1]=t1;M[offset+2]=t2;M[offset+3]=t3;},keySize:256/32});/**
		* Shortcut functions to the cipher's object interface.
		*
		* @example
		*
		*     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
		*     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
		*/C.AES=BlockCipher._createHelper(AES);})();(function(){// Check if typed arrays are supported
   if(typeof ArrayBuffer==='undefined'){return;}// Shortcuts
   var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;// Reference original init
   var superInit=WordArray.init;// Augment WordArray.init to handle typed arrays
   var subInit=WordArray.init=function(typedArray){// Convert buffers to uint8
   if(typedArray instanceof ArrayBuffer){typedArray=new Uint8Array(typedArray);}// Convert other array views to uint8
   else if(typedArray instanceof Int8Array||typeof Uint8ClampedArray!=='undefined'&&typedArray instanceof Uint8ClampedArray||typedArray instanceof Int16Array||typedArray instanceof Uint16Array||typedArray instanceof Int32Array||typedArray instanceof Uint32Array||typeof Float32Array!=='undefined'&&typedArray instanceof Float32Array||typeof Float64Array!=='undefined'&&typedArray instanceof Float64Array){typedArray=new Uint8Array(typedArray.buffer,typedArray.byteOffset,typedArray.byteLength);}// Handle Uint8Array
   if(typedArray instanceof Uint8Array){// Shortcut
   var typedArrayByteLength=typedArray.byteLength;// Extract bytes
   var words=[];for(var i=0;i<typedArrayByteLength;i++){words[i>>>2]|=typedArray[i]<<24-i%4*8;}// Initialize this word array
   superInit.call(this,words,typedArrayByteLength);}else{// Else call normal init
   superInit.apply(this,arguments);}};subInit.prototype=WordArray;})();var DomEvent=function(){function DomEvent(){}DomEvent.addListener=function(target,event,listener){if(target.addEventListener){target.addEventListener(event,listener,false);}else{target.attachEvent('on'+event,function(){listener.apply(target,arguments);});}};DomEvent.removeListener=function(target,event,listener){if(target.removeEventListener){target.removeEventListener(event,listener,false);}else{target.detachEvent('on'+event,function(){listener.apply(target,arguments);});}};DomEvent.addMessageListener=function(target,listener){DomEvent.addListener(target,'message',listener);};DomEvent.removeMessageListener=function(target,listener){DomEvent.removeListener(target,'message',listener);};DomEvent.addUnloadListener=function(listener){DomEvent.addListener(window,'unload',listener);};return DomEvent;}();var msgpack=function(){"use strict";var exports={};exports.inspect=inspect;function inspect(buffer){if(buffer===undefined)return"undefined";var view;var type;if(buffer instanceof ArrayBuffer){type="ArrayBuffer";view=new DataView(buffer);}else if(buffer instanceof DataView){type="DataView";view=buffer;}if(!view)return JSON.stringify(buffer);var bytes=[];for(var i=0;i<buffer.byteLength;i++){if(i>20){bytes.push("...");break;}var byte_=view.getUint8(i).toString(16);if(byte_.length===1)byte_="0"+byte_;bytes.push(byte_);}return"<"+type+" "+bytes.join(" ")+">";}// Encode string as utf8 into dataview at offset
   exports.utf8Write=utf8Write;function utf8Write(view,offset,string){var byteLength=view.byteLength;for(var i=0,l=string.length;i<l;i++){var codePoint=string.charCodeAt(i);// One byte of UTF-8
   if(codePoint<0x80){view.setUint8(offset++,codePoint>>>0&0x7f|0x00);continue;}// Two bytes of UTF-8
   if(codePoint<0x800){view.setUint8(offset++,codePoint>>>6&0x1f|0xc0);view.setUint8(offset++,codePoint>>>0&0x3f|0x80);continue;}// Three bytes of UTF-8.
   if(codePoint<0x10000){view.setUint8(offset++,codePoint>>>12&0x0f|0xe0);view.setUint8(offset++,codePoint>>>6&0x3f|0x80);view.setUint8(offset++,codePoint>>>0&0x3f|0x80);continue;}// Four bytes of UTF-8
   if(codePoint<0x110000){view.setUint8(offset++,codePoint>>>18&0x07|0xf0);view.setUint8(offset++,codePoint>>>12&0x3f|0x80);view.setUint8(offset++,codePoint>>>6&0x3f|0x80);view.setUint8(offset++,codePoint>>>0&0x3f|0x80);continue;}throw new Error("bad codepoint "+codePoint);}}exports.utf8Read=utf8Read;function utf8Read(view,offset,length){var string="";for(var i=offset,end=offset+length;i<end;i++){var byte_=view.getUint8(i);// One byte character
   if((byte_&0x80)===0x00){string+=String.fromCharCode(byte_);continue;}// Two byte character
   if((byte_&0xe0)===0xc0){string+=String.fromCharCode((byte_&0x0f)<<6|view.getUint8(++i)&0x3f);continue;}// Three byte character
   if((byte_&0xf0)===0xe0){string+=String.fromCharCode((byte_&0x0f)<<12|(view.getUint8(++i)&0x3f)<<6|(view.getUint8(++i)&0x3f)<<0);continue;}// Four byte character
   if((byte_&0xf8)===0xf0){string+=String.fromCharCode((byte_&0x07)<<18|(view.getUint8(++i)&0x3f)<<12|(view.getUint8(++i)&0x3f)<<6|(view.getUint8(++i)&0x3f)<<0);continue;}throw new Error("Invalid byte "+byte_.toString(16));}return string;}exports.utf8ByteCount=utf8ByteCount;function utf8ByteCount(string){var count=0;for(var i=0,l=string.length;i<l;i++){var codePoint=string.charCodeAt(i);if(codePoint<0x80){count+=1;continue;}if(codePoint<0x800){count+=2;continue;}if(codePoint<0x10000){count+=3;continue;}if(codePoint<0x110000){count+=4;continue;}throw new Error("bad codepoint "+codePoint);}return count;}exports.encode=function(value,sparse){var size=sizeof(value,sparse);if(size==0)return undefined;var buffer=new ArrayBuffer(size);var view=new DataView(buffer);encode(value,view,0,sparse);return buffer;};exports.decode=decode;var SH_L_32=(1<<16)*(1<<16),SH_R_32=1/SH_L_32;function getInt64(view,offset){offset=offset||0;return view.getInt32(offset)*SH_L_32+view.getUint32(offset+4);}function getUint64(view,offset){offset=offset||0;return view.getUint32(offset)*SH_L_32+view.getUint32(offset+4);}function setInt64(view,offset,val){if(val<0x8000000000000000){view.setInt32(offset,Math.floor(val*SH_R_32));view.setInt32(offset+4,val&-1);}else{view.setUint32(offset,0x7fffffff);view.setUint32(offset+4,0x7fffffff);}}function setUint64(view,offset,val){if(val<0x10000000000000000){view.setUint32(offset,Math.floor(val*SH_R_32));view.setInt32(offset+4,val&-1);}else{view.setUint32(offset,0xffffffff);view.setUint32(offset+4,0xffffffff);}}// https://gist.github.com/frsyuki/5432559 - v5 spec
   //
   // I've used one extension point from `fixext 1` to store `undefined`. On the wire this
   // should translate to exactly 0xd40000
   //
   // +--------+--------+--------+
   // |  0xd4  |  0x00  |  0x00  |
   // +--------+--------+--------+
   //    ^ fixext |        ^ value part unused (fixed to be 0)
   //             ^ indicates undefined value
   //
   function Decoder(view,offset){this.offset=offset||0;this.view=view;}Decoder.prototype.map=function(length){var value={};for(var i=0;i<length;i++){var key=this.parse();value[key]=this.parse();}return value;};Decoder.prototype.bin=Decoder.prototype.buf=function(length){var value=new ArrayBuffer(length);new Uint8Array(value).set(new Uint8Array(this.view.buffer,this.offset,length),0);this.offset+=length;return value;};Decoder.prototype.str=function(length){var value=utf8Read(this.view,this.offset,length);this.offset+=length;return value;};Decoder.prototype.array=function(length){var value=new Array(length);for(var i=0;i<length;i++){value[i]=this.parse();}return value;};Decoder.prototype.ext=function(length){var value={};// Get the type byte
   value['type']=this.view.getInt8(this.offset);this.offset++;// Get the data array (length)
   value['data']=this.buf(length);this.offset+=length;return value;};Decoder.prototype.parse=function(){var type=this.view.getUint8(this.offset);var value,length;// Positive FixInt - 0xxxxxxx
   if((type&0x80)===0x00){this.offset++;return type;}// FixMap - 1000xxxx
   if((type&0xf0)===0x80){length=type&0x0f;this.offset++;return this.map(length);}// FixArray - 1001xxxx
   if((type&0xf0)===0x90){length=type&0x0f;this.offset++;return this.array(length);}// FixStr - 101xxxxx
   if((type&0xe0)===0xa0){length=type&0x1f;this.offset++;return this.str(length);}// Negative FixInt - 111xxxxx
   if((type&0xe0)===0xe0){value=this.view.getInt8(this.offset);this.offset++;return value;}switch(type){// nil
   case 0xc0:this.offset++;return null;// 0xc1 never used - use for undefined (NON-STANDARD)
   case 0xc1:this.offset++;return undefined;// false
   case 0xc2:this.offset++;return false;// true
   case 0xc3:this.offset++;return true;// bin 8
   case 0xc4:length=this.view.getUint8(this.offset+1);this.offset+=2;return this.bin(length);// bin 16
   case 0xc5:length=this.view.getUint16(this.offset+1);this.offset+=3;return this.bin(length);// bin 32
   case 0xc6:length=this.view.getUint32(this.offset+1);this.offset+=5;return this.bin(length);// ext 8
   case 0xc7:length=this.view.getUint8(this.offset+1);this.offset+=2;return this.ext(length);// ext 16
   case 0xc8:length=this.view.getUint16(this.offset+1);this.offset+=3;return this.ext(length);// ext 32
   case 0xc9:length=this.view.getUint32(this.offset+1);this.offset+=5;return this.ext(length);// float 32
   case 0xca:value=this.view.getFloat32(this.offset+1);this.offset+=5;return value;// float 64
   case 0xcb:value=this.view.getFloat64(this.offset+1);this.offset+=9;return value;// uint8
   case 0xcc:value=this.view.getUint8(this.offset+1);this.offset+=2;return value;// uint 16
   case 0xcd:value=this.view.getUint16(this.offset+1);this.offset+=3;return value;// uint 32
   case 0xce:value=this.view.getUint32(this.offset+1);this.offset+=5;return value;// uint 64
   case 0xcf:value=getUint64(this.view,this.offset+1);this.offset+=9;return value;// int 8
   case 0xd0:value=this.view.getInt8(this.offset+1);this.offset+=2;return value;// int 16
   case 0xd1:value=this.view.getInt16(this.offset+1);this.offset+=3;return value;// int 32
   case 0xd2:value=this.view.getInt32(this.offset+1);this.offset+=5;return value;// int 64
   case 0xd3:value=getInt64(this.view,this.offset+1);this.offset+=9;return value;// fixext 1
   case 0xd4:length=1;this.offset++;return this.ext(length);// fixext 2
   case 0xd5:length=2;this.offset++;return this.ext(length);// fixext 4
   case 0xd6:length=4;this.offset++;return this.ext(length);// fixext 8
   case 0xd7:length=8;this.offset++;return this.ext(length);// fixext 16
   case 0xd8:length=16;this.offset++;return this.ext(length);// str8
   case 0xd9:length=this.view.getUint8(this.offset+1);this.offset+=2;return this.str(length);// str 16
   case 0xda:length=this.view.getUint16(this.offset+1);this.offset+=3;return this.str(length);// str 32
   case 0xdb:length=this.view.getUint32(this.offset+1);this.offset+=5;return this.str(length);// array 16
   case 0xdc:length=this.view.getUint16(this.offset+1);this.offset+=3;return this.array(length);// array 32
   case 0xdd:length=this.view.getUint32(this.offset+1);this.offset+=5;return this.array(length);// map 16
   case 0xde:length=this.view.getUint16(this.offset+1);this.offset+=3;return this.map(length);// map 32
   case 0xdf:length=this.view.getUint32(this.offset+1);this.offset+=5;return this.map(length);}throw new Error("Unknown type 0x"+type.toString(16));};function decode(buffer){var view=new DataView(buffer);var decoder=new Decoder(view);var value=decoder.parse();if(decoder.offset!==buffer.byteLength)throw new Error(buffer.byteLength-decoder.offset+" trailing bytes");return value;}function encodeableKeys(value,sparse){return Utils.keysArray(value,true).filter(function(e){var val=value[e],type=typeof val==="undefined"?"undefined":_typeof(val);return(!sparse||val!==undefined&&val!==null)&&('function'!==type||!!val.toJSON);});}function encode(value,view,offset,sparse){var type=typeof value==="undefined"?"undefined":_typeof(value);// Strings Bytes
   // There are four string types: fixstr/str8/str16/str32
   if(type==="string"){var length=utf8ByteCount(value);// fixstr
   if(length<0x20){view.setUint8(offset,length|0xa0);utf8Write(view,offset+1,value);return 1+length;}// str8
   if(length<0x100){view.setUint8(offset,0xd9);view.setUint8(offset+1,length);utf8Write(view,offset+2,value);return 2+length;}// str16
   if(length<0x10000){view.setUint8(offset,0xda);view.setUint16(offset+1,length);utf8Write(view,offset+3,value);return 3+length;}// str32
   if(length<0x100000000){view.setUint8(offset,0xdb);view.setUint32(offset+1,length);utf8Write(view,offset+5,value);return 5+length;}}// There are three bin types: bin8/bin16/bin32
   if(value instanceof ArrayBuffer){var length=value.byteLength;// bin8
   if(length<0x100){view.setUint8(offset,0xc4);view.setUint8(offset+1,length);new Uint8Array(view.buffer).set(new Uint8Array(value),offset+2);return 2+length;}// bin16
   if(length<0x10000){view.setUint8(offset,0xc5);view.setUint16(offset+1,length);new Uint8Array(view.buffer).set(new Uint8Array(value),offset+3);return 3+length;}// bin 32
   if(length<0x100000000){view.setUint8(offset,0xc6);view.setUint32(offset+1,length);new Uint8Array(view.buffer).set(new Uint8Array(value),offset+5);return 5+length;}}if(type==="number"){// Floating Point
   // NOTE: We're always using float64
   if(Math.floor(value)!==value){view.setUint8(offset,0xcb);view.setFloat64(offset+1,value);return 9;}// Integers
   if(value>=0){// positive fixnum
   if(value<0x80){view.setUint8(offset,value);return 1;}// uint 8
   if(value<0x100){view.setUint8(offset,0xcc);view.setUint8(offset+1,value);return 2;}// uint 16
   if(value<0x10000){view.setUint8(offset,0xcd);view.setUint16(offset+1,value);return 3;}// uint 32
   if(value<0x100000000){view.setUint8(offset,0xce);view.setUint32(offset+1,value);return 5;}// uint 64
   if(value<0x10000000000000000){view.setUint8(offset,0xcf);setUint64(view,offset+1,value);return 9;}throw new Error("Number too big 0x"+value.toString(16));}// negative fixnum
   if(value>=-0x20){view.setInt8(offset,value);return 1;}// int 8
   if(value>=-0x80){view.setUint8(offset,0xd0);view.setInt8(offset+1,value);return 2;}// int 16
   if(value>=-0x8000){view.setUint8(offset,0xd1);view.setInt16(offset+1,value);return 3;}// int 32
   if(value>=-0x80000000){view.setUint8(offset,0xd2);view.setInt32(offset+1,value);return 5;}// int 64
   if(value>=-0x8000000000000000){view.setUint8(offset,0xd3);setInt64(view,offset+1,value);return 9;}throw new Error("Number too small -0x"+(-value).toString(16).substr(1));}// undefined - use d4 (NON-STANDARD)
   if(type==="undefined"){if(sparse)return 0;view.setUint8(offset,0xd4);view.setUint8(offset+1,0x00);view.setUint8(offset+2,0x00);return 3;}// null
   if(value===null){if(sparse)return 0;view.setUint8(offset,0xc0);return 1;}// Boolean
   if(type==="boolean"){view.setUint8(offset,value?0xc3:0xc2);return 1;}if('function'===typeof value.toJSON)return encode(value.toJSON(),view,offset,sparse);// Container Types
   if(type==="object"){var length,size=0;var isArray=Array.isArray(value);if(isArray){length=value.length;}else{var keys=encodeableKeys(value,sparse);length=keys.length;}var size;if(length<0x10){view.setUint8(offset,length|(isArray?0x90:0x80));size=1;}else if(length<0x10000){view.setUint8(offset,isArray?0xdc:0xde);view.setUint16(offset+1,length);size=3;}else if(length<0x100000000){view.setUint8(offset,isArray?0xdd:0xdf);view.setUint32(offset+1,length);size=5;}if(isArray){for(var i=0;i<length;i++){size+=encode(value[i],view,offset+size,sparse);}}else{for(var i=0;i<length;i++){var key=keys[i];size+=encode(key,view,offset+size);size+=encode(value[key],view,offset+size,sparse);}}return size;}if(type==="function")return 0;throw new Error("Unknown type "+type);}function sizeof(value,sparse){var type=typeof value==="undefined"?"undefined":_typeof(value);// fixstr or str8 or str16 or str32
   if(type==="string"){var length=utf8ByteCount(value);if(length<0x20){return 1+length;}if(length<0x100){return 2+length;}if(length<0x10000){return 3+length;}if(length<0x100000000){return 5+length;}}// bin8 or bin16 or bin32
   if(value instanceof ArrayBuffer){var length=value.byteLength;if(length<0x100){return 2+length;}if(length<0x10000){return 3+length;}if(length<0x100000000){return 5+length;}}if(type==="number"){// Floating Point (32 bits)
   // double
   if(Math.floor(value)!==value)return 9;// Integers
   if(value>=0){// positive fixint
   if(value<0x80)return 1;// uint 8
   if(value<0x100)return 2;// uint 16
   if(value<0x10000)return 3;// uint 32
   if(value<0x100000000)return 5;// uint 64
   if(value<0x10000000000000000)return 9;// Too big
   throw new Error("Number too big 0x"+value.toString(16));}// negative fixint
   if(value>=-0x20)return 1;// int 8
   if(value>=-0x80)return 2;// int 16
   if(value>=-0x8000)return 3;// int 32
   if(value>=-0x80000000)return 5;// int 64
   if(value>=-0x8000000000000000)return 9;// Too small
   throw new Error("Number too small -0x"+value.toString(16).substr(1));}// Boolean
   if(type==="boolean")return 1;// undefined, null
   if(value===null)return sparse?0:1;if(value===undefined)return sparse?0:3;if('function'===typeof value.toJSON)return sizeof(value.toJSON(),sparse);// Container Types
   if(type==="object"){var length,size=0;if(Array.isArray(value)){length=value.length;for(var i=0;i<length;i++){size+=sizeof(value[i],sparse);}}else{var keys=encodeableKeys(value,sparse);length=keys.length;for(var i=0;i<length;i++){var key=keys[i];size+=sizeof(key)+sizeof(value[key],sparse);}}if(length<0x10){return 1+size;}if(length<0x10000){return 3+size;}if(length<0x100000000){return 5+size;}throw new Error("Array or object too long 0x"+length.toString(16));}if(type==="function")return 0;throw new Error("Unknown type "+type);}return exports;}();if((typeof window==="undefined"?"undefined":_typeof(window))!=='object'){console.log("Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm");}var Platform={libver:'js-web-',noUpgrade:navigator&&navigator.userAgent.toString().match(/MSIE\s8\.0/),binaryType:'arraybuffer',WebSocket:window.WebSocket||window.MozWebSocket,xhrSupported:window.XMLHttpRequest&&'withCredentials'in new XMLHttpRequest(),streamingSupported:true,useProtocolHeartbeats:true,createHmac:null,msgpack:msgpack,supportsBinary:!!window.TextDecoder,preferBinary:false,ArrayBuffer:window.ArrayBuffer,atob:window.atob,nextTick:function nextTick(f){setTimeout(f,0);},addEventListener:window.addEventListener,inspect:JSON.stringify,getRandomValues:function(crypto){return function(arr,callback){crypto.getRandomValues(arr);callback(null);};}(window.crypto||window.msCrypto)// mscrypto for IE11
   };var Crypto=function(){var DEFAULT_ALGORITHM='aes';var DEFAULT_KEYLENGTH=256;// bits
   var DEFAULT_MODE='cbc';var DEFAULT_BLOCKLENGTH=16;// bytes
   var DEFAULT_BLOCKLENGTH_WORDS=4;// 32-bit words
   var UINT32_SUP=0x100000000;var INT32_SUP=0x80000000;var WordArray=CryptoJS.lib.WordArray;/**
		* Internal: generate an array of secure random words corresponding to the given length of bytes
		* @param bytes
		* @param callback
		*/var generateRandom;if(typeof Uint32Array!=='undefined'&&Platform.getRandomValues){var blockRandomArray=new Uint32Array(DEFAULT_BLOCKLENGTH_WORDS);generateRandom=function generateRandom(bytes,callback){var words=bytes/4,nativeArray=words==DEFAULT_BLOCKLENGTH_WORDS?blockRandomArray:new Uint32Array(words);Platform.getRandomValues(nativeArray,function(err){callback(err,BufferUtils.toWordArray(nativeArray));});};}else{generateRandom=function generateRandom(bytes,callback){Logger.logAction(Logger.LOG_MAJOR,'Ably.Crypto.generateRandom()','Warning: the browser you are using does not support secure cryptographically secure randomness generation; falling back to insecure Math.random()');var words=bytes/4,array=new Array(words);for(var i=0;i<words;i++){/* cryptojs wordarrays use signed ints. When WordArray.create is fed a
				   * Uint32Array unsigned are converted to signed automatically, but when
				   * fed a normal array they aren't, so need to do so ourselves by
				   * subtracting INT32_SUP */array[i]=Math.floor(Math.random()*UINT32_SUP)-INT32_SUP;}callback(null,WordArray.create(array));};}/**
		* Internal: calculate the padded length of a given plaintext
		* using PKCS5.
		* @param plaintextLength
		* @return
		*/function getPaddedLength(plaintextLength){return plaintextLength+DEFAULT_BLOCKLENGTH&-DEFAULT_BLOCKLENGTH;}/**
		* Internal: checks that the cipherParams are a valid combination. Currently
		* just checks that the calculated keyLength is a valid one for aes-cbc
		*/function validateCipherParams(params){if(params.algorithm==='aes'&&params.mode==='cbc'){if(params.keyLength===128||params.keyLength===256){return;}throw new Error('Unsupported key length '+params.keyLength+' for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)');}}function normaliseBase64(string){/* url-safe base64 strings use _ and - instread of / and + */return string.replace('_','/').replace('-','+');}/**
		* Internal: a block containing zeros
		*/var emptyBlock=WordArray.create([0,0,0,0]);/**
		* Internal: obtain the pkcs5 padding string for a given padded length;
		*/var pkcs5Padding=[WordArray.create([0x10101010,0x10101010,0x10101010,0x10101010],16),WordArray.create([0x01000000],1),WordArray.create([0x02020000],2),WordArray.create([0x03030300],3),WordArray.create([0x04040404],4),WordArray.create([0x05050505,0x05000000],5),WordArray.create([0x06060606,0x06060000],6),WordArray.create([0x07070707,0x07070700],7),WordArray.create([0x08080808,0x08080808],8),WordArray.create([0x09090909,0x09090909,0x09000000],9),WordArray.create([0x0a0a0a0a,0x0a0a0a0a,0x0a0a0000],10),WordArray.create([0x0b0b0b0b,0x0b0b0b0b,0x0b0b0b00],11),WordArray.create([0x0c0c0c0c,0x0c0c0c0c,0x0c0c0c0c],12),WordArray.create([0x0d0d0d0d,0x0d0d0d0d,0x0d0d0d0d,0x0d000000],13),WordArray.create([0x0e0e0e0e,0x0e0e0e0e,0x0e0e0e0e,0x0e0e0000],14),WordArray.create([0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f],15),WordArray.create([0x10101010,0x10101010,0x10101010,0x10101010],16)];/**
		* Utility classes and interfaces for message payload encryption.
		*
		* This class supports AES/CBC/PKCS5 with a default keylength of 128 bits
		* but supporting other keylengths. Other algorithms and chaining modes are
		* not supported directly, but supportable by extending/implementing the base
		* classes and interfaces here.
		*
		* Secure random data for creation of Initialization Vectors (IVs) and keys
		* is obtained from window.crypto.getRandomValues if available, or from
		* Math.random() if not. Clients who do not want to depend on Math.random()
		* should polyfill window.crypto.getRandomValues with a library that seeds
		* a PRNG with real entropy.
		*
		* Each message payload is encrypted with an IV in CBC mode, and the IV is
		* concatenated with the resulting raw ciphertext to construct the "ciphertext"
		* data passed to the recipient.
		*/function Crypto(){}/**
		* A class encapsulating the client-specifiable parameters for
		* the cipher.
		*
		* algorithm is the name of the algorithm in the default system provider,
		* or the lower-cased version of it; eg "aes" or "AES".
		*
		* Clients are recommended to not call this directly, but instead to use the
		* Crypto.getDefaultParams helper, which will fill in any fields not supplied
		* with default values and validation the result.
		*/function CipherParams(){this.algorithm=null;this.keyLength=null;this.mode=null;this.key=null;}Crypto.CipherParams=CipherParams;/**
		* Obtain a complete CipherParams instance from the provided params, filling
		* in any not provided with default values, calculating a keyLength from
		* the supplied key, and validating the result.
		* @param params an object containing at a minimum a `key` key with value the
		* key, as either a binary (ArrayBuffer, Array, WordArray) or a
		* base64-encoded string. May optionally also contain: algorithm (defaults to
		* AES), mode (defaults to 'cbc')
		*/Crypto.getDefaultParams=function(params){var key;/* Backward compatibility */if(typeof params==='function'||typeof params==='string'){Logger.deprecated('Crypto.getDefaultParams(key, callback)','Crypto.getDefaultParams({key: key})');if(typeof params==='function'){Crypto.generateRandomKey(function(key){params(null,Crypto.getDefaultParams({key:key}));});}else if(typeof arguments[1]==='function'){arguments[1](null,Crypto.getDefaultParams({key:params}));}else{throw new Error('Invalid arguments for Crypto.getDefaultParams');}return;}if(!params.key){throw new Error('Crypto.getDefaultParams: a key is required');}if(typeof params.key==='string'){key=CryptoJS.enc.Base64.parse(normaliseBase64(params.key));}else{key=BufferUtils.toWordArray(params.key);// Expect key to be an Array, ArrayBuffer, or WordArray at this point
   }var cipherParams=new CipherParams();cipherParams.key=key;cipherParams.algorithm=params.algorithm||DEFAULT_ALGORITHM;cipherParams.keyLength=key.words.length*(4*8);cipherParams.mode=params.mode||DEFAULT_MODE;if(params.keyLength&&params.keyLength!==cipherParams.keyLength){throw new Error('Crypto.getDefaultParams: a keyLength of '+params.keyLength+' was specified, but the key actually has length '+cipherParams.keyLength);}validateCipherParams(cipherParams);return cipherParams;};/**
		* Generate a random encryption key from the supplied keylength (or the
		* default keyLength if none supplied) as a CryptoJS WordArray
		* @param keyLength (optional) the required keyLength in bits
		* @param callback (err, key)
		*/Crypto.generateRandomKey=function(keyLength,callback){if(arguments.length==1&&typeof keyLength=='function'){callback=keyLength;keyLength=undefined;}generateRandom((keyLength||DEFAULT_KEYLENGTH)/8,callback);};/**
		* Internal; get a ChannelCipher instance based on the given cipherParams
		* @param params either a CipherParams instance or some subset of its
		* fields that includes a key
		*/Crypto.getCipher=function(params){var cipherParams=params instanceof CipherParams?params:Crypto.getDefaultParams(params);return{cipherParams:cipherParams,cipher:new CBCCipher(cipherParams,DEFAULT_BLOCKLENGTH_WORDS,params.iv)};};function CBCCipher(params,blockLengthWords,iv){this.algorithm=params.algorithm+'-'+String(params.keyLength)+'-'+params.mode;this.cjsAlgorithm=params.algorithm.toUpperCase().replace(/-\d+$/,'');this.key=BufferUtils.toWordArray(params.key);if(iv){this.iv=BufferUtils.toWordArray(iv).clone();}this.blockLengthWords=blockLengthWords;}CBCCipher.prototype.encrypt=function(plaintext,callback){Logger.logAction(Logger.LOG_MICRO,'CBCCipher.encrypt()','');plaintext=BufferUtils.toWordArray(plaintext);//console.log('encrypt: plaintext:');
   //console.log(CryptoJS.enc.Hex.stringify(plaintext));
   var plaintextLength=plaintext.sigBytes,paddedLength=getPaddedLength(plaintextLength),self=this;var then=function then(){self.getIv(function(err,iv){if(err){callback(err);return;}var cipherOut=self.encryptCipher.process(plaintext.concat(pkcs5Padding[paddedLength-plaintextLength]));var ciphertext=iv.concat(cipherOut);//console.log('encrypt: ciphertext:');
   //console.log(CryptoJS.enc.Hex.stringify(ciphertext));
   callback(null,ciphertext);});};if(!this.encryptCipher){if(this.iv){this.encryptCipher=CryptoJS.algo[this.cjsAlgorithm].createEncryptor(this.key,{iv:this.iv});then();}else{generateRandom(DEFAULT_BLOCKLENGTH,function(err,iv){if(err){callback(err);return;}self.encryptCipher=CryptoJS.algo[self.cjsAlgorithm].createEncryptor(self.key,{iv:iv});self.iv=iv;then();});}}else{then();}};CBCCipher.prototype.decrypt=function(ciphertext){Logger.logAction(Logger.LOG_MICRO,'CBCCipher.decrypt()','');ciphertext=BufferUtils.toWordArray(ciphertext);//console.log('decrypt: ciphertext:');
   //console.log(CryptoJS.enc.Hex.stringify(ciphertext));
   var blockLengthWords=this.blockLengthWords,ciphertextWords=ciphertext.words,iv=WordArray.create(ciphertextWords.slice(0,blockLengthWords)),ciphertextBody=WordArray.create(ciphertextWords.slice(blockLengthWords));var decryptCipher=CryptoJS.algo[this.cjsAlgorithm].createDecryptor(this.key,{iv:iv});var plaintext=decryptCipher.process(ciphertextBody);var epilogue=decryptCipher.finalize();decryptCipher.reset();if(epilogue&&epilogue.sigBytes)plaintext.concat(epilogue);//console.log('decrypt: plaintext:');
   //console.log(CryptoJS.enc.Hex.stringify(plaintext));
   return plaintext;};CBCCipher.prototype.getIv=function(callback){if(this.iv){var iv=this.iv;this.iv=null;callback(null,iv);return;}/* Since the iv for a new block is the ciphertext of the last, this
		   * sets a new iv (= aes(randomBlock XOR lastCipherText)) as well as
		   * returning it */var self=this;generateRandom(DEFAULT_BLOCKLENGTH,function(err,randomBlock){if(err){callback(err);return;}callback(null,self.encryptCipher.process(randomBlock));});};return Crypto;}();var WebStorage=function(){var sessionSupported,localSupported,test='ablyjs-storage-test';/* Even just accessing the session/localStorage object can throw a
		* security exception in some circumstances with some browsers. In
		* others, calling setItem will throw. So have to check in this
		* somewhat roundabout way. (If unsupported or no window object,
		* will throw on accessing a property of undefined) */try{window.sessionStorage.setItem(test,test);window.sessionStorage.removeItem(test);sessionSupported=true;}catch(e){sessionSupported=false;}try{window.localStorage.setItem(test,test);window.localStorage.removeItem(test);localSupported=true;}catch(e){localSupported=false;}function WebStorage(){}function storageInterface(session){return session?window.sessionStorage:window.localStorage;}function set(name,value,ttl,session){var wrappedValue={value:value};if(ttl){wrappedValue.expires=Utils.now()+ttl;}return storageInterface(session).setItem(name,JSON.stringify(wrappedValue));}function get(name,session){var rawItem=storageInterface(session).getItem(name);if(!rawItem)return null;var wrappedValue=JSON.parse(rawItem);if(wrappedValue.expires&&wrappedValue.expires<Utils.now()){storageInterface(session).removeItem(name);return null;}return wrappedValue.value;}function remove(name,session){return storageInterface(session).removeItem(name);}if(localSupported){WebStorage.set=function(name,value,ttl){return set(name,value,ttl,false);};WebStorage.get=function(name){return get(name,false);};WebStorage.remove=function(name){return remove(name,false);};}if(sessionSupported){WebStorage.setSession=function(name,value,ttl){return set(name,value,ttl,true);};WebStorage.getSession=function(name){return get(name,true);};WebStorage.removeSession=function(name){return remove(name,true);};}return WebStorage;}();var Defaults={internetUpUrl:'https://internet-up.ably-realtime.com/is-the-internet-up.txt',jsonpInternetUpUrl:'https://internet-up.ably-realtime.com/is-the-internet-up-0-9.js',/* Order matters here: the base transport is the leftmost one in the
		* intersection of baseTransportOrder and the transports clientOption that's
		* supported.  This is not quite the same as the preference order -- e.g.
		* xhr_polling is preferred to jsonp, but for browsers that support it we want
		* the base transport to be xhr_polling, not jsonp */defaultTransports:['xhr_polling','xhr_streaming','jsonp','web_socket'],baseTransportOrder:['xhr_polling','xhr_streaming','jsonp','web_socket'],transportPreferenceOrder:['jsonp','xhr_polling','xhr_streaming','web_socket'],upgradeTransports:['xhr_streaming','web_socket'],minified:!function _(){}.name};/* If using IE8, don't attempt to upgrade from xhr_polling to xhr_streaming -
   * while it can do streaming, the low max http-connections-per-host limit means
   * that the polling transport is crippled during the upgrade process. So just
   * leave it at the base transport */if(Platform.noUpgrade){Defaults.upgradeTransports=[];}var BufferUtils=function(){var WordArray=CryptoJS.lib.WordArray;var ArrayBuffer=Platform.ArrayBuffer;var atob=Platform.atob;function isWordArray(ob){return ob!==null&&ob!==undefined&&ob.sigBytes!==undefined;}function isArrayBuffer(ob){return ob!==null&&ob!==undefined&&ob.constructor===ArrayBuffer;}// https://gist.githubusercontent.com/jonleighton/958841/raw/f200e30dfe95212c0165ccf1ae000ca51e9de803/gistfile1.js
   function arrayBufferToBase64(ArrayBuffer){var base64='';var encodings='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var bytes=new Uint8Array(ArrayBuffer);var byteLength=bytes.byteLength;var byteRemainder=byteLength%3;var mainLength=byteLength-byteRemainder;var a,b,c,d;var chunk;// Main loop deals with bytes in chunks of 3
   for(var i=0;i<mainLength;i=i+3){// Combine the three bytes into a single integer
   chunk=bytes[i]<<16|bytes[i+1]<<8|bytes[i+2];// Use bitmasks to extract 6-bit segments from the triplet
   a=(chunk&16515072)>>18;// 16515072 = (2^6 - 1) << 18
   b=(chunk&258048)>>12;// 258048   = (2^6 - 1) << 12
   c=(chunk&4032)>>6;// 4032     = (2^6 - 1) << 6
   d=chunk&63;// 63       = 2^6 - 1
   // Convert the raw binary segments to the appropriate ASCII encoding
   base64+=encodings[a]+encodings[b]+encodings[c]+encodings[d];}// Deal with the remaining bytes and padding
   if(byteRemainder==1){chunk=bytes[mainLength];a=(chunk&252)>>2;// 252 = (2^6 - 1) << 2
   // Set the 4 least significant bits to zero
   b=(chunk&3)<<4;// 3   = 2^2 - 1
   base64+=encodings[a]+encodings[b]+'==';}else if(byteRemainder==2){chunk=bytes[mainLength]<<8|bytes[mainLength+1];a=(chunk&64512)>>10;// 64512 = (2^6 - 1) << 10
   b=(chunk&1008)>>4;// 1008  = (2^6 - 1) << 4
   // Set the 2 least significant bits to zero
   c=(chunk&15)<<2;// 15    = 2^4 - 1
   base64+=encodings[a]+encodings[b]+encodings[c]+'=';}return base64;}function base64ToArrayBuffer(base64){var binary_string=atob(base64);var len=binary_string.length;var bytes=new Uint8Array(len);for(var i=0;i<len;i++){var ascii=binary_string.charCodeAt(i);bytes[i]=ascii;}return bytes.buffer;}function BufferUtils(){}BufferUtils.isBuffer=function(buf){return isArrayBuffer(buf)||isWordArray(buf);};BufferUtils.toArrayBuffer=function(buf){if(!ArrayBuffer)throw new Error("Can't convert to ArrayBuffer: ArrayBuffer not supported");if(isArrayBuffer(buf))return buf;if(isWordArray(buf)){/* Backported from unreleased CryptoJS
			   * https://code.google.com/p/crypto-js/source/browse/branches/3.x/src/lib-typedarrays.js?r=661 */var arrayBuffer=new ArrayBuffer(buf.sigBytes);var uint8View=new Uint8Array(arrayBuffer);for(var i=0;i<buf.sigBytes;i++){uint8View[i]=buf.words[i>>>2]>>>24-i%4*8&0xff;}return arrayBuffer;};throw new Error("BufferUtils.toArrayBuffer expected a buffer");};BufferUtils.toWordArray=function(buf){return isWordArray(buf)?buf:WordArray.create(buf);};BufferUtils.base64Encode=function(buf){if(isArrayBuffer(buf))return arrayBufferToBase64(buf);if(isWordArray(buf))return CryptoJS.enc.Base64.stringify(buf);};BufferUtils.base64Decode=function(str){if(ArrayBuffer&&atob)return base64ToArrayBuffer(str);return CryptoJS.enc.Base64.parse(str);};BufferUtils.hexEncode=function(buf){if(isArrayBuffer(buf))buf=WordArray.create(buf);return CryptoJS.enc.Hex.stringify(buf);};BufferUtils.utf8Encode=function(string){return CryptoJS.enc.Utf8.parse(string);};BufferUtils.utf8Decode=function(buf){if(isArrayBuffer(buf))buf=BufferUtils.toWordArray(buf);// CryptoJS only works with WordArrays
   if(isWordArray(buf))return CryptoJS.enc.Utf8.stringify(buf);throw new Error("Expected input of utf8Decode to be a buffer or CryptoJS WordArray");};BufferUtils.bufferCompare=function(buf1,buf2){if(!buf1)return-1;if(!buf2)return 1;buf1=BufferUtils.toWordArray(buf1);buf2=BufferUtils.toWordArray(buf2);buf1.clamp();buf2.clamp();var cmp=buf1.sigBytes-buf2.sigBytes;if(cmp!=0)return cmp;buf1=buf1.words;buf2=buf2.words;for(var i=0;i<buf1.length;i++){cmp=buf1[i]-buf2[i];if(cmp!=0)return cmp;}return 0;};return BufferUtils;}();var Http=function(){var noop=function noop(){};function Http(){}function shouldFallback(err){var statusCode=err.statusCode;/* 400 + no code = a generic xhr onerror. Browser doesn't give us enough
			* detail to know whether it's fallback-fixable, but it may be (eg if a
			* network issue), so try just in case */return statusCode===408&&!err.code||statusCode===400&&!err.code||statusCode>=500&&statusCode<=504;}/**
		* Perform an HTTP GET request for a given path against prime and fallback Ably hosts
		* @param rest
		* @param path the full path of the POST request
		* @param headers optional hash of headers
		* @param params optional hash of params
		* @param callback (err, response)
		*/Http.get=function(rest,path,headers,params,callback){callback=callback||noop;var uri=typeof path=='function'?path:function(host){return rest.baseUri(host)+path;};var binary=headers&&headers.accept!='application/json';var hosts,connection=rest.connection;if(connection&&connection.state=='connected')hosts=[connection.connectionManager.host];else hosts=Defaults.getHosts(rest.options);/* if there is only one host do it */if(hosts.length==1){Http.getUri(rest,uri(hosts[0]),headers,params,callback);return;}/* so host is an array with preferred host plus at least one fallback */var tryAHost=function tryAHost(candidateHosts){Http.getUri(rest,uri(candidateHosts.shift()),headers,params,function(err){if(err&&shouldFallback(err)&&candidateHosts.length){/* use a fallback host if available */tryAHost(candidateHosts);return;}callback.apply(null,arguments);});};tryAHost(hosts);};/**
		* Perform an HTTP GET request for a given resolved URI
		* @param rest
		* @param the full path of the POST request
		* @param headers optional hash of headers
		* @param params optional hash of params
		* @param callback (err, response)
		*/Http.getUri=function(rest,uri,headers,params,callback){Http.Request(rest,uri,headers,params,null,callback||noop);};/**
		* Perform an HTTP POST request
		* @param rest
		* @param the full path of the POST request
		* @param headers optional hash of headers
		* @param body object or buffer containing request body
		* @param params optional hash of params
		* @param callback (err, response)
		*/Http.post=function(rest,path,headers,body,params,callback){callback=callback||noop;var uri=typeof path=='function'?path:function(host){return rest.baseUri(host)+path;};var binary=headers&&headers.accept!='application/json';var hosts,connection=rest.connection;if(connection&&connection.state=='connected')hosts=[connection.connectionManager.host];else hosts=Defaults.getHosts(rest.options);/* if there is only one host do it */if(hosts.length==1){Http.postUri(rest,uri(hosts[0]),headers,body,params,callback);return;}/* hosts is an array with preferred host plus at least one fallback */var tryAHost=function tryAHost(candidateHosts){Http.postUri(rest,uri(candidateHosts.shift()),headers,body,params,function(err){if(err&&shouldFallback(err)&&candidateHosts.length){tryAHost(candidateHosts);return;}callback.apply(null,arguments);});};tryAHost(hosts);};/**
		* Perform an HTTP POST request for a given resolved URI
		* @param rest
		* @param the full path of the POST request
		* @param headers optional hash of headers
		* @param body object or buffer containing request body
		* @param params optional hash of params
		* @param callback (err, response)
		*/Http.postUri=function(rest,uri,headers,body,params,callback){Http.Request(rest,uri,headers,params,body,callback||noop);};Http.supportsAuthHeaders=false;Http.supportsLinkHeaders=false;return Http;}();/*
	Copyright (c) 2008 Fred Palmer fred.palmer_at_gmail.com
   
	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:
   
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
   
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	*/var Base64=function(){function StringBuffer(){this.buffer=[];}StringBuffer.prototype.append=function append(string){this.buffer.push(string);return this;};StringBuffer.prototype.toString=function toString(){return this.buffer.join("");};var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function encode(input){var output=new StringBuffer();var codex=Base64.codex;var enumerator=new Utf8EncodeEnumerator(input);while(enumerator.moveNext()){var chr1=enumerator.current;enumerator.moveNext();var chr2=enumerator.current;enumerator.moveNext();var chr3=enumerator.current;var enc1=chr1>>2;var enc2=(chr1&3)<<4|chr2>>4;var enc3=(chr2&15)<<2|chr3>>6;var enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output.append(codex.charAt(enc1)+codex.charAt(enc2)+codex.charAt(enc3)+codex.charAt(enc4));}return output.toString();},decode:function decode(input){var output=new StringBuffer();var enumerator=new Base64DecodeEnumerator(input);while(enumerator.moveNext()){var charCode=enumerator.current;if(charCode<128)output.append(String.fromCharCode(charCode));else if(charCode>191&&charCode<224){enumerator.moveNext();var charCode2=enumerator.current;output.append(String.fromCharCode((charCode&31)<<6|charCode2&63));}else{enumerator.moveNext();var charCode2=enumerator.current;enumerator.moveNext();var charCode3=enumerator.current;output.append(String.fromCharCode((charCode&15)<<12|(charCode2&63)<<6|charCode3&63));}}return output.toString();}};function Utf8EncodeEnumerator(input){this._input=input;this._index=-1;this._buffer=[];}Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function moveNext(){if(this._buffer.length>0){this.current=this._buffer.shift();return true;}else if(this._index>=this._input.length-1){this.current=Number.NaN;return false;}else{var charCode=this._input.charCodeAt(++this._index);// "\r\n" -> "\n"
   //
   if(charCode==13&&this._input.charCodeAt(this._index+1)==10){charCode=10;this._index+=2;}if(charCode<128){this.current=charCode;}else if(charCode>127&&charCode<2048){this.current=charCode>>6|192;this._buffer.push(charCode&63|128);}else{this.current=charCode>>12|224;this._buffer.push(charCode>>6&63|128);this._buffer.push(charCode&63|128);}return true;}}};function Base64DecodeEnumerator(input){this._input=input;this._index=-1;this._buffer=[];}Base64DecodeEnumerator.prototype={current:64,moveNext:function moveNext(){if(this._buffer.length>0){this.current=this._buffer.shift();return true;}else if(this._index>=this._input.length-1){this.current=64;return false;}else{var enc1=Base64.codex.indexOf(this._input.charAt(++this._index));var enc2=Base64.codex.indexOf(this._input.charAt(++this._index));var enc3=Base64.codex.indexOf(this._input.charAt(++this._index));var enc4=Base64.codex.indexOf(this._input.charAt(++this._index));var chr1=enc1<<2|enc2>>4;var chr2=(enc2&15)<<4|enc3>>2;var chr3=(enc3&3)<<6|enc4;this.current=chr1;if(enc3!=64)this._buffer.push(chr2);if(enc4!=64)this._buffer.push(chr3);return true;}}};return Base64;}();Defaults.protocolVersion=1;Defaults.ENVIRONMENT='';Defaults.REST_HOST='rest.ably.io';Defaults.REALTIME_HOST='realtime.ably.io';Defaults.FALLBACK_HOSTS=['A.ably-realtime.com','B.ably-realtime.com','C.ably-realtime.com','D.ably-realtime.com','E.ably-realtime.com'];Defaults.PORT=80;Defaults.TLS_PORT=443;Defaults.TIMEOUTS={/* Documented as options params: */disconnectedRetryTimeout:15000,suspendedRetryTimeout:30000,httpRequestTimeout:15000,channelRetryTimeout:15000,/* Not documented: */connectionStateTtl:120000,realtimeRequestTimeout:10000,recvTimeout:90000,preferenceConnectTimeout:6000,parallelUpgradeDelay:4000};Defaults.httpMaxRetryCount=3;Defaults.version='1.0.3';Defaults.libstring=Platform.libver+Defaults.version;Defaults.apiVersion='1.0';Defaults.getHost=function(options,host,ws){if(ws)host=host==options.restHost&&options.realtimeHost||host||options.realtimeHost;else host=host||options.restHost;return host;};Defaults.getPort=function(options,tls){return tls||options.tls?options.tlsPort:options.port;};Defaults.getHttpScheme=function(options){return options.tls?'https://':'http://';};Defaults.getHosts=function(options){var hosts=[options.restHost],fallbackHosts=options.fallbackHosts,httpMaxRetryCount=typeof options.httpMaxRetryCount!=='undefined'?options.httpMaxRetryCount:Defaults.httpMaxRetryCount;if(fallbackHosts){hosts=hosts.concat(Utils.arrChooseN(fallbackHosts,httpMaxRetryCount));}return hosts;};Defaults.normaliseOptions=function(options){/* Deprecated options */if(options.host){Logger.deprecated('host','restHost');options.restHost=options.host;}if(options.wsHost){Logger.deprecated('wsHost','realtimeHost');options.realtimeHost=options.wsHost;}if(options.queueEvents){Logger.deprecated('queueEvents','queueMessages');options.queueMessages=options.queueEvents;}if(options.recover===true){Logger.deprecated('{recover: true}','{recover: function(lastConnectionDetails, cb) { cb(true); }}');options.recover=function(lastConnectionDetails,cb){cb(true);};}if(typeof options.recover==='function'&&options.closeOnUnload===true){Logger.logAction(LOG_ERROR,'Defaults.normaliseOptions','closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter');options.recover=null;}if(options.transports&&Utils.arrIn(options.transports,'xhr')){Logger.deprecated('transports: ["xhr"]','transports: ["xhr_streaming"]');Utils.arrDeleteValue(options.transports,'xhr');options.transports.push('xhr_streaming');}if(!('queueMessages'in options))options.queueMessages=true;var production=false;if(options.restHost){options.realtimeHost=options.realtimeHost||options.restHost;}else{var environment=options.environment&&String(options.environment).toLowerCase()||Defaults.ENVIRONMENT;production=!environment||environment==='production';options.restHost=production?Defaults.REST_HOST:environment+'-'+Defaults.REST_HOST;options.realtimeHost=production?Defaults.REALTIME_HOST:environment+'-'+Defaults.REALTIME_HOST;}options.fallbackHosts=production||options.fallbackHostsUseDefault?Defaults.FALLBACK_HOSTS:options.fallbackHosts;options.port=options.port||Defaults.PORT;options.tlsPort=options.tlsPort||Defaults.TLS_PORT;if(!('tls'in options))options.tls=true;/* Allow values passed in options to override default timeouts */options.timeouts={};for(var prop in Defaults.TIMEOUTS){options.timeouts[prop]=options[prop]||Defaults.TIMEOUTS[prop];};if('useBinaryProtocol'in options){options.useBinaryProtocol=Platform.supportsBinary&&options.useBinaryProtocol;}else{options.useBinaryProtocol=Platform.preferBinary;}return options;};var EventEmitter=function(){/* public constructor */function EventEmitter(){this.any=[];this.events={};this.anyOnce=[];this.eventsOnce={};}/* Call the listener, catch any exceptions and log, but continue operation*/function callListener(eventThis,listener,args){try{listener.apply(eventThis,args);}catch(e){Logger.logAction(Logger.LOG_ERROR,'EventEmitter.emit()','Unexpected listener exception: '+e+'; stack = '+e.stack);}}/**
		* Remove listeners that match listener
		* @param targetListeners is an array of listener arrays or event objects with arrays of listeners
		* @param listener the listener callback to remove
		* @param eventFilter (optional) event name instructing the function to only remove listeners for the specified event
		*/function removeListener(targetListeners,listener,eventFilter){var listeners,idx,eventName,targetListenersIndex;for(targetListenersIndex=0;targetListenersIndex<targetListeners.length;targetListenersIndex++){listeners=targetListeners[targetListenersIndex];if(eventFilter){listeners=listeners[eventFilter];}if(Utils.isArray(listeners)){while((idx=Utils.arrIndexOf(listeners,listener))!==-1){listeners.splice(idx,1);}/* If events object has an event name key with no listeners then
					  remove the key to stop the list growing indefinitely */if(eventFilter&&listeners.length===0){delete targetListeners[targetListenersIndex][eventFilter];}}else if(Utils.isObject(listeners)){/* events */for(eventName in listeners){if(listeners.hasOwnProperty(eventName)&&Utils.isArray(listeners[eventName])){removeListener([listeners],listener,eventName);}}}}}/**
		* Add an event listener
		* @param event (optional) the name of the event to listen to
		*        if not supplied, all events trigger a call to the listener
		* @param listener the listener to be called
		*/EventEmitter.prototype.on=function(event,listener){if(arguments.length==1&&typeof event=='function'){this.any.push(event);}else if(Utils.isEmptyArg(event)){this.any.push(listener);}else if(Utils.isArray(event)){var self=this;Utils.arrForEach(event,function(ev){self.on(ev,listener);});}else{var listeners=this.events[event]||(this.events[event]=[]);listeners.push(listener);}};/**
		* Remove one or more event listeners
		* @param event (optional) the name of the event whose listener
		*        is to be removed. If not supplied, the listener is
		*        treated as an 'any' listener
		* @param listener (optional) the listener to remove. If not
		*        supplied, all listeners are removed.
		*/EventEmitter.prototype.off=function(event,listener){if(arguments.length==0||Utils.isEmptyArg(event)&&Utils.isEmptyArg(listener)){this.any=[];this.events={};this.anyOnce=[];this.eventsOnce={};return;}if(arguments.length==1){if(typeof event=='function'){/* we take this to be the listener and treat the event as "any" .. */listener=event;event=null;}/* ... or we take event to be the actual event name and listener to be all */}if(listener&&Utils.isEmptyArg(event)){removeListener([this.any,this.events,this.anyOnce,this.eventsOnce],listener);return;}if(Utils.isArray(event)){var self=this;Utils.arrForEach(event,function(ev){self.off(ev,listener);});}/* "normal" case where event is an actual event */if(listener){removeListener([this.events,this.eventsOnce],listener,event);}else{delete this.events[event];delete this.eventsOnce[event];}};/**
		* Get the array of listeners for a given event; excludes once events
		* @param event (optional) the name of the event, or none for 'any'
		* @return array of events, or null if none
		*/EventEmitter.prototype.listeners=function(event){if(event){var listeners=this.events[event]||[];if(this.eventsOnce[event])Array.prototype.push.apply(listeners,this.eventsOnce[event]);return listeners.length?listeners:null;}return this.any.length?this.any:null;};/**
		* Emit an event
		* @param event the event name
		* @param args the arguments to pass to the listener
		*/EventEmitter.prototype.emit=function(event/* , args... */){var args=Array.prototype.slice.call(arguments,1);var eventThis={event:event};var listeners=[];if(this.anyOnce.length){Array.prototype.push.apply(listeners,this.anyOnce);this.anyOnce=[];}if(this.any.length){Array.prototype.push.apply(listeners,this.any);}var eventsOnceListeners=this.eventsOnce[event];if(eventsOnceListeners){Array.prototype.push.apply(listeners,eventsOnceListeners);delete this.eventsOnce[event];}var eventsListeners=this.events[event];if(eventsListeners){Array.prototype.push.apply(listeners,eventsListeners);}Utils.arrForEach(listeners,function(listener){callListener(eventThis,listener,args);});};/**
		* Listen for a single occurrence of an event
		* @param event the name of the event to listen to
		* @param listener the listener to be called
		*/EventEmitter.prototype.once=function(event,listener){if(arguments.length==1&&typeof event=='function'){this.anyOnce.push(event);}else if(Utils.isEmptyArg(event)){this.anyOnce.push(listener);}else if(Utils.isArray(event)){throw"Arrays of events can only be used with on(), not once()";}else{var listeners=this.eventsOnce[event]||(this.eventsOnce[event]=[]);listeners.push(listener);}};/**
		* Private API
		*
		* Listen for a single occurrence of a state event and fire immediately if currentState matches targetState
		* @param targetState the name of the state event to listen to
		* @param currentState the name of the current state of this object
		* @param listener the listener to be called
		*/EventEmitter.prototype.whenState=function(targetState,currentState,listener/* ...listenerArgs */){var eventThis={event:targetState},listenerArgs=Array.prototype.slice.call(arguments,3);if(typeof targetState!=='string'||typeof currentState!=='string')throw"whenState requires a valid event String argument";if(typeof listener!=='function')throw"whenState requires a valid listener argument";if(targetState===currentState){callListener(eventThis,listener,listenerArgs);}else{this.once(targetState,listener);}};return EventEmitter;}();var Logger=function(){var consoleLogger;/* Can't just check for console && console.log; fails in IE <=9 */if(typeof window==='undefined'||/* node */window.console&&window.console.log&&typeof window.console.log.apply==='function'/* sensible browsers */){consoleLogger=function consoleLogger(){console.log.apply(console,arguments);};}else if(window.console&&window.console.log){/* IE <= 9 with the console open -- console.log does not
			* inherit from Function, so has no apply method */consoleLogger=function consoleLogger(){Function.prototype.apply.call(console.log,console,arguments);};}else{/* IE <= 9 when dev tools are closed - window.console not even defined */consoleLogger=function consoleLogger(){};}var LOG_NONE=0,LOG_ERROR=1,LOG_MAJOR=2,LOG_MINOR=3,LOG_MICRO=4;var LOG_DEFAULT=LOG_ERROR,LOG_DEBUG=LOG_MICRO;var logLevel=LOG_DEFAULT;var logHandler=consoleLogger;/* public constructor */function Logger(args){}/* public constants */Logger.LOG_NONE=LOG_NONE,Logger.LOG_ERROR=LOG_ERROR,Logger.LOG_MAJOR=LOG_MAJOR,Logger.LOG_MINOR=LOG_MINOR,Logger.LOG_MICRO=LOG_MICRO;Logger.LOG_DEFAULT=LOG_DEFAULT,Logger.LOG_DEBUG=LOG_DEBUG;/* public static functions */Logger.logAction=function(level,action,message){if(Logger.shouldLog(level)){logHandler('Ably: '+action+': '+message);}};Logger.deprecated=function(original,replacement){if(Logger.shouldLog(LOG_ERROR)){logHandler("Ably: Deprecation warning - '"+original+"' is deprecated and will be removed from a future version. Please use '"+replacement+"' instead.");}};/* Where a logging operation is expensive, such as serialisation of data, use shouldLog will prevent
		  the object being serialised if the log level will not output the message */Logger.shouldLog=function(level){return level<=logLevel;};Logger.setLog=function(level,handler){if(level!==undefined)logLevel=level;if(handler!==undefined)logHandler=handler;};return Logger;}();var Utils=function(){function Utils(){}/*
		* Add a set of properties to a target object
		* target: the target object
		* props:  an object whose enumerable properties are
		*         added, by reference only
		*/Utils.mixin=function(target,src){if(src){var hasOwnProperty=src.hasOwnProperty;for(var key in src){if(!hasOwnProperty||hasOwnProperty.call(src,key)){target[key]=src[key];}}}return target;};/*
		* Add a set of properties to a target object
		* target: the target object
		* props:  an object whose enumerable properties are
		*         added, by reference only
		*/Utils.copy=function(src){return Utils.mixin({},src);};/*
		* Determine whether or not a given object is
		* an array.
		*/Utils.isArray=Array.isArray||function(ob){return Object.prototype.toString.call(ob)=='[object Array]';};/*
		* Ensures that an Array object is always returned
		* returning the original Array of obj is an Array
		* else wrapping the obj in a single element Array
		*/Utils.ensureArray=function(obj){if(Utils.isEmptyArg(obj)){return[];}if(Utils.isArray(obj)){return obj;}return[obj];};/* ...Or an Object (in the narrow sense) */Utils.isObject=function(ob){return Object.prototype.toString.call(ob)=='[object Object]';};/*
		* Determine whether or not an object contains
		* any enumerable properties.
		* ob: the object
		*/Utils.isEmpty=function(ob){for(var prop in ob){return false;}return true;};Utils.isOnlyPropIn=function(ob,property){for(var prop in ob){if(prop!==property){return false;}}return true;};/*
		* Determine whether or not an argument to an overloaded function is
		* undefined (missing) or null.
		* This method is useful when constructing functions such as (WebIDL terminology):
		*   off([TreatUndefinedAs=Null] DOMString? event)
		* as you can then confirm the argument using:
		*   Utils.isEmptyArg(event)
		*/Utils.isEmptyArg=function(arg){return arg===null||arg===undefined;};/*
		* Perform a simple shallow clone of an object.
		* Result is an object irrespective of whether
		* the input is an object or array. All
		* enumerable properties are copied.
		* ob: the object
		*/Utils.shallowClone=function(ob){var result=new Object();for(var prop in ob){result[prop]=ob[prop];}return result;};/*
		* Clone an object by creating a new object with the
		* given object as its prototype. Optionally
		* a set of additional own properties can be
		* supplied to be added to the newly created clone.
		* ob:            the object to be cloned
		* ownProperties: optional object with additional
		*                properties to add
		*/Utils.prototypicalClone=function(ob,ownProperties){function F(){}F.prototype=ob;var result=new F();if(ownProperties)Utils.mixin(result,ownProperties);return result;};/*
		* Declare a constructor to represent a subclass
		* of another constructor
		* If platform has a built-in version we use that from Platform, else we
		* define here (so can make use of other Utils fns)
		* See node.js util.inherits
		*/Utils.inherits=Platform.inherits||function(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Utils.prototypicalClone(superCtor.prototype,{constructor:ctor});};/*
		* Determine whether or not an object has an enumerable
		* property whose value equals a given value.
		* ob:  the object
		* val: the value to find
		*/Utils.containsValue=function(ob,val){for(var i in ob){if(ob[i]==val)return true;}return false;};Utils.intersect=function(arr,ob){return Utils.isArray(ob)?Utils.arrIntersect(arr,ob):Utils.arrIntersectOb(arr,ob);};Utils.arrIntersect=function(arr1,arr2){var result=[];for(var i=0;i<arr1.length;i++){var member=arr1[i];if(Utils.arrIndexOf(arr2,member)!=-1)result.push(member);}return result;};Utils.arrIntersectOb=function(arr,ob){var result=[];for(var i=0;i<arr.length;i++){var member=arr[i];if(member in ob)result.push(member);}return result;};Utils.arrSubtract=function(arr1,arr2){var result=[];for(var i=0;i<arr1.length;i++){var element=arr1[i];if(Utils.arrIndexOf(arr2,element)==-1)result.push(element);}return result;};Utils.arrIndexOf=Array.prototype.indexOf?function(arr,elem,fromIndex){return arr.indexOf(elem,fromIndex);}:function(arr,elem,fromIndex){fromIndex=fromIndex||0;var len=arr.length;for(;fromIndex<len;fromIndex++){if(arr[fromIndex]===elem){return fromIndex;}}return-1;};Utils.arrIn=function(arr,val){return Utils.arrIndexOf(arr,val)!==-1;};Utils.arrDeleteValue=function(arr,val){var idx=Utils.arrIndexOf(arr,val);var res=idx!=-1;if(res)arr.splice(idx,1);return res;};Utils.arrWithoutValue=function(arr,val){var newArr=arr.slice();Utils.arrDeleteValue(newArr,val);return newArr;};/*
		* Construct an array of the keys of the enumerable
		* properties of a given object, optionally limited
		* to only the own properties.
		* ob:      the object
		* ownOnly: boolean, get own properties only
		*/Utils.keysArray=function(ob,ownOnly){var result=[];for(var prop in ob){if(ownOnly&&!ob.hasOwnProperty(prop))continue;result.push(prop);}return result;};/*
		* Construct an array of the values of the enumerable
		* properties of a given object, optionally limited
		* to only the own properties.
		* ob:      the object
		* ownOnly: boolean, get own properties only
		*/Utils.valuesArray=function(ob,ownOnly){var result=[];for(var prop in ob){if(ownOnly&&!ob.hasOwnProperty(prop))continue;result.push(ob[prop]);}return result;};Utils.arrForEach=Array.prototype.forEach?function(arr,fn){arr.forEach(fn);}:function(arr,fn){var len=arr.length;for(var i=0;i<len;i++){fn(arr[i],i,arr);}};/* Useful when the function may mutate the array */Utils.safeArrForEach=function(arr,fn){return Utils.arrForEach(arr.slice(),fn);};Utils.arrMap=Array.prototype.map?function(arr,fn){return arr.map(fn);}:function(arr,fn){var result=[],len=arr.length;for(var i=0;i<len;i++){result.push(fn(arr[i],i,arr));}return result;};Utils.arrFilter=Array.prototype.filter?function(arr,fn){return arr.filter(fn);}:function(arr,fn){var result=[],len=arr.length;for(var i=0;i<len;i++){if(fn(arr[i])){result.push(arr[i]);}}return result;};Utils.arrEvery=Array.prototype.every?function(arr,fn){return arr.every(fn);}:function(arr,fn){var len=arr.length;for(var i=0;i<len;i++){if(!fn(arr[i],i,arr)){return false;};}return true;};Utils.nextTick=Platform.nextTick;var contentTypes={json:'application/json',jsonp:'application/javascript',xml:'application/xml',html:'text/html',msgpack:'application/x-msgpack'};Utils.defaultGetHeaders=function(format){format=format||'json';var accept=format==='json'?contentTypes.json:contentTypes[format]+','+contentTypes.json;return{accept:accept,'X-Ably-Version':Defaults.apiVersion,'X-Ably-Lib':Defaults.libstring};};Utils.defaultPostHeaders=function(format){format=format||'json';var accept=format==='json'?contentTypes.json:contentTypes[format]+','+contentTypes.json,contentType=format==='json'?contentTypes.json:contentTypes[format];return{accept:accept,'content-type':contentType,'X-Ably-Version':Defaults.apiVersion,'X-Ably-Lib':Defaults.libstring};};Utils.arrPopRandomElement=function(arr){return arr.splice(Math.floor(Math.random()*arr.length),1)[0];};Utils.toQueryString=function(params){var parts=[];if(params){for(var key in params){parts.push(encodeURIComponent(key)+'='+encodeURIComponent(params[key]));}}return parts.length?'?'+parts.join('&'):'';};Utils.parseQueryString=function(query){var match,search=/([^?&=]+)=?([^&]*)/g,result={};while(match=search.exec(query)){result[decodeURIComponent(match[1])]=decodeURIComponent(match[2]);}return result;};Utils.now=Date.now||function(){/* IE 8 */return new Date().getTime();};Utils.inspect=Platform.inspect;Utils.inspectError=function(x){return x&&(x.constructor.name=='ErrorInfo'||x.constructor.name=='Error')?x.toString():Utils.inspect(x);};Utils.randStr=function(){return String(Math.random()).substr(2);};/* Pick n elements at random without replacement from an array */Utils.arrChooseN=function(arr,n){var numItems=Math.min(n,arr.length),mutableArr=arr.slice(),result=[];for(var i=0;i<numItems;i++){result.push(Utils.arrPopRandomElement(mutableArr));}return result;};Utils.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');};return Utils;}();var Multicaster=function(){function Multicaster(members){members=members||[];var handler=function handler(){for(var i=0;i<members.length;i++){var member=members[i];if(member){try{member.apply(null,arguments);}catch(e){Logger.logAction(Logger.LOG_ERROR,'Multicaster multiple callback handler','Unexpected exception: '+e+'; stack = '+e.stack);}}}};handler.push=function(){Array.prototype.push.apply(members,arguments);};return handler;}return Multicaster;}();var ErrorInfo=function(){function ErrorInfo(message,code,statusCode){this.message=message;this.code=code;this.statusCode=statusCode;}ErrorInfo.prototype.toString=function(){var result='['+this.constructor.name;if(this.message)result+=': '+this.message;if(this.statusCode)result+='; statusCode='+this.statusCode;if(this.code)result+='; code='+this.code;result+=']';return result;};ErrorInfo.fromValues=function(values){var result=Utils.mixin(new ErrorInfo(),values);if(values instanceof Error){/* Error.message is not enumerable, so mixin loses the message */result.message=values.message;}return result;};return ErrorInfo;}();var Message=function(){var msgpack=Platform.msgpack;function Message(){this.name=undefined;this.id=undefined;this.timestamp=undefined;this.clientId=undefined;this.connectionId=undefined;this.connectionKey=undefined;this.data=undefined;this.encoding=undefined;this.extras=undefined;}/**
		* Overload toJSON() to intercept JSON.stringify()
		* @return {*}
		*/Message.prototype.toJSON=function(){var result={name:this.name,clientId:this.clientId,connectionId:this.connectionId,connectionKey:this.connectionKey,encoding:this.encoding,extras:this.extras};/* encode data to base64 if present and we're returning real JSON;
			* although msgpack calls toJSON(), we know it is a stringify()
			* call if it has a non-empty arguments list */var data=this.data;if(data&&BufferUtils.isBuffer(data)){if(arguments.length>0){/* stringify call */var encoding=this.encoding;result.encoding=encoding?encoding+'/base64':'base64';data=BufferUtils.base64Encode(data);}else{/* Called by msgpack. Need to feed it an ArrayBuffer, msgpack doesn't
				   * understand WordArrays */data=BufferUtils.toArrayBuffer(data);}}result.data=data;return result;};Message.prototype.toString=function(){var result='[Message';if(this.name)result+='; name='+this.name;if(this.id)result+='; id='+this.id;if(this.timestamp)result+='; timestamp='+this.timestamp;if(this.clientId)result+='; clientId='+this.clientId;if(this.connectionId)result+='; connectionId='+this.connectionId;if(this.encoding)result+='; encoding='+this.encoding;if(this.extras)result+='; extras ='+JSON.stringify(this.extras);if(this.data){if(typeof data=='string')result+='; data='+this.data;else if(BufferUtils.isBuffer(this.data))result+='; data (buffer)='+BufferUtils.base64Encode(this.data);else result+='; data (json)='+JSON.stringify(this.data);}result+=']';return result;};Message.encrypt=function(msg,options,callback){var data=msg.data,encoding=msg.encoding,cipher=options.channelCipher;encoding=encoding?encoding+'/':'';if(!BufferUtils.isBuffer(data)){data=BufferUtils.utf8Encode(String(data));encoding=encoding+'utf-8/';}cipher.encrypt(data,function(err,data){if(err){callback(err);return;}msg.data=data;msg.encoding=encoding+'cipher+'+cipher.algorithm;callback(null,msg);});};Message.encode=function(msg,options,callback){var data=msg.data,encoding,nativeDataType=typeof data=='string'||BufferUtils.isBuffer(data)||data===null||data===undefined;if(!nativeDataType){if(Utils.isObject(data)||Utils.isArray(data)){msg.data=JSON.stringify(data);msg.encoding=(encoding=msg.encoding)?encoding+'/json':'json';}else{throw new ErrorInfo('Data type is unsupported',40013,400);}}if(options!=null&&options.cipher){Message.encrypt(msg,options,callback);}else{callback(null,msg);}};Message.encodeArray=function(messages,options,callback){var processed=0;for(var i=0;i<messages.length;i++){Message.encode(messages[i],options,function(err,msg){if(err){callback(err);return;}processed++;if(processed==messages.length){callback(null,messages);}});}};Message.toRequestBody=function(messages,options,format,callback){Message.encodeArray(messages,options,function(err){if(err){callback(err);return;}callback(null,format=='msgpack'?msgpack.encode(messages,true):JSON.stringify(messages));});};Message.decode=function(message,options){var encoding=message.encoding;if(encoding){var xforms=encoding.split('/'),i,j=xforms.length,data=message.data;try{while((i=j)>0){var match=xforms[--j].match(/([\-\w]+)(\+([\w\-]+))?/);if(!match)break;var xform=match[1];switch(xform){case'base64':data=BufferUtils.base64Decode(String(data));continue;case'utf-8':data=BufferUtils.utf8Decode(data);continue;case'json':data=JSON.parse(data);continue;case'cipher':if(options!=null&&options.cipher){var xformAlgorithm=match[3],cipher=options.channelCipher;/* don't attempt to decrypt unless the cipher params are compatible */if(xformAlgorithm!=cipher.algorithm){throw new Error('Unable to decrypt message with given cipher; incompatible cipher params');}data=cipher.decrypt(data);continue;}else{throw new Error('Unable to decrypt message; not an encrypted channel');}default:throw new Error("Unknown encoding");}break;}}catch(e){throw new ErrorInfo('Error processing the '+xform+' encoding, decoder returned ‘'+e.message+'’',40013,400);}finally{message.encoding=i<=0?null:xforms.slice(0,i).join('/');message.data=data;}}};Message.fromResponseBody=function(body,options,format){if(format)body=format=='msgpack'?msgpack.decode(body):JSON.parse(String(body));for(var i=0;i<body.length;i++){var msg=body[i]=Message.fromValues(body[i]);try{Message.decode(msg,options);}catch(e){Logger.logAction(Logger.LOG_ERROR,'Message.fromResponseBody()',e.toString());}}return body;};Message.fromValues=function(values){return Utils.mixin(new Message(),values);};Message.fromValuesArray=function(values){var count=values.length,result=new Array(count);for(var i=0;i<count;i++){result[i]=Message.fromValues(values[i]);}return result;};Message.fromEncoded=function(encoded,options){var msg=Message.fromValues(encoded);/* if decoding fails at any point, catch and return the message decoded to
			* the fullest extent possible */try{Message.decode(msg,options);}catch(e){Logger.logAction(Logger.LOG_ERROR,'Message.fromEncoded()',e.toString());}return msg;};Message.fromEncodedArray=function(encodedArray,options){return Utils.arrMap(encodedArray,function(encoded){return Message.fromEncoded(encoded,options);});};return Message;}();var PresenceMessage=function(){var msgpack=Platform.msgpack;function toActionValue(actionString){return Utils.arrIndexOf(PresenceMessage.Actions,actionString);}function PresenceMessage(){this.action=undefined;this.id=undefined;this.timestamp=undefined;this.clientId=undefined;this.connectionId=undefined;this.data=undefined;this.encoding=undefined;}PresenceMessage.Actions=['absent','present','enter','leave','update'];/* Returns whether this presenceMessage is synthesized, i.e. was not actually
		* sent by the connection (usually means a leave event sent 15s after a
		* disconnection). This is useful because synthesized messages cannot be
		* compared for newness by id lexicographically - RTP2b1
		*/PresenceMessage.prototype.isSynthesized=function(){return this.id.substring(this.connectionId.length,0)!==this.connectionId;};/* RTP2b2 */PresenceMessage.prototype.parseId=function(){var parts=this.id.split(':');return{connectionId:parts[0],msgSerial:parseInt(parts[1],10),index:parseInt(parts[2],10)};};/**
		* Overload toJSON() to intercept JSON.stringify()
		* @return {*}
		*/PresenceMessage.prototype.toJSON=function(){var result={clientId:this.clientId,/* Convert presence action back to an int for sending to Ably */action:toActionValue(this.action),encoding:this.encoding};/* encode data to base64 if present and we're returning real JSON;
			* although msgpack calls toJSON(), we know it is a stringify()
			* call if it has a non-empty arguments list */var data=this.data;if(data&&BufferUtils.isBuffer(data)){if(arguments.length>0){/* stringify call */var encoding=this.encoding;result.encoding=encoding?encoding+'/base64':'base64';data=BufferUtils.base64Encode(data);}else{/* Called by msgpack. Need to feed it an ArrayBuffer, msgpack doesn't
				   * understand WordArrays */data=BufferUtils.toArrayBuffer(data);}}result.data=data;return result;};PresenceMessage.prototype.toString=function(){var result='[PresenceMessage';result+='; action='+this.action;if(this.id)result+='; id='+this.id;if(this.timestamp)result+='; timestamp='+this.timestamp;if(this.clientId)result+='; clientId='+this.clientId;if(this.connectionId)result+='; connectionId='+this.connectionId;if(this.encoding)result+='; encoding='+this.encoding;if(this.data){if(typeof this.data=='string')result+='; data='+this.data;else if(BufferUtils.isBuffer(this.data))result+='; data (buffer)='+BufferUtils.base64Encode(this.data);else result+='; data (json)='+JSON.stringify(this.data);}result+=']';return result;};PresenceMessage.encode=Message.encode;PresenceMessage.decode=Message.decode;PresenceMessage.fromResponseBody=function(body,options,format){if(format)body=format=='msgpack'?msgpack.decode(body):JSON.parse(String(body));for(var i=0;i<body.length;i++){var msg=body[i]=PresenceMessage.fromValues(body[i],true);try{PresenceMessage.decode(msg,options);}catch(e){Logger.logAction(Logger.LOG_ERROR,'PresenceMessage.fromResponseBody()',e.toString());}}return body;};/* Creates a PresenceMessage from specified values, with a string presence action */PresenceMessage.fromValues=function(values,stringifyAction){if(stringifyAction){values.action=PresenceMessage.Actions[values.action];}return Utils.mixin(new PresenceMessage(),values);};PresenceMessage.fromValuesArray=function(values){var count=values.length,result=new Array(count);for(var i=0;i<count;i++){result[i]=PresenceMessage.fromValues(values[i]);}return result;};PresenceMessage.fromEncoded=function(encoded,options){var msg=PresenceMessage.fromValues(encoded,true);/* if decoding fails at any point, catch and return the message decoded to
			* the fullest extent possible */try{PresenceMessage.decode(msg,options);}catch(e){Logger.logAction(Logger.LOG_ERROR,'PresenceMessage.fromEncoded()',e.toString());}return msg;};PresenceMessage.fromEncodedArray=function(encodedArray,options){return Utils.arrMap(encodedArray,function(encoded){return PresenceMessage.fromEncoded(encoded,options);});};return PresenceMessage;}();var ProtocolMessage=function(){var msgpack=Platform.msgpack;function ProtocolMessage(){this.action=undefined;this.flags=undefined;this.id=undefined;this.timestamp=undefined;this.count=undefined;this.error=undefined;this.connectionId=undefined;this.connectionKey=undefined;this.connectionSerial=undefined;this.channel=undefined;this.channelSerial=undefined;this.msgSerial=undefined;this.messages=undefined;this.presence=undefined;this.auth=undefined;}ProtocolMessage.Action={'HEARTBEAT':0,'ACK':1,'NACK':2,'CONNECT':3,'CONNECTED':4,'DISCONNECT':5,'DISCONNECTED':6,'CLOSE':7,'CLOSED':8,'ERROR':9,'ATTACH':10,'ATTACHED':11,'DETACH':12,'DETACHED':13,'PRESENCE':14,'MESSAGE':15,'SYNC':16,'AUTH':17};ProtocolMessage.ActionName=[];Utils.arrForEach(Utils.keysArray(ProtocolMessage.Action,true),function(name){ProtocolMessage.ActionName[ProtocolMessage.Action[name]]=name;});var flags={/* Channel attach state flags */'HAS_PRESENCE':1<<0,'HAS_BACKLOG':1<<1,'RESUMED':1<<2,'HAS_LOCAL_PRESENCE':1<<3,'TRANSIENT':1<<4,/* Channel mode flags */'PRESENCE':1<<16,'PUBLISH':1<<17,'SUBSCRIBE':1<<18,'PRESENCE_SUBSCRIBE':1<<19};var flagNames=Utils.keysArray(flags);flags.MODE_ALL=flags.PRESENCE|flags.PUBLISH|flags.SUBSCRIBE|flags.PRESENCE_SUBSCRIBE;ProtocolMessage.prototype.hasFlag=function(flag){return(this.flags&flags[flag])>0;};ProtocolMessage.prototype.setFlag=function(flag){return this.flags=this.flags|flags[flag];};ProtocolMessage.prototype.getMode=function(){return this.flags&&this.flags&flags.MODE_ALL;};ProtocolMessage.serialize=function(msg,format){return format=='msgpack'?msgpack.encode(msg,true):JSON.stringify(msg);};ProtocolMessage.deserialize=function(serialized,format){var deserialized=format=='msgpack'?msgpack.decode(serialized):JSON.parse(String(serialized));return ProtocolMessage.fromDeserialized(deserialized);};ProtocolMessage.fromDeserialized=function(deserialized){var error=deserialized.error;if(error)deserialized.error=ErrorInfo.fromValues(error);var messages=deserialized.messages;if(messages)for(var i=0;i<messages.length;i++){messages[i]=Message.fromValues(messages[i]);}var presence=deserialized.presence;if(presence)for(var i=0;i<presence.length;i++){presence[i]=PresenceMessage.fromValues(presence[i],true);}return Utils.mixin(new ProtocolMessage(),deserialized);};ProtocolMessage.fromValues=function(values){return Utils.mixin(new ProtocolMessage(),values);};function toStringArray(array){var result=[];if(array){for(var i=0;i<array.length;i++){result.push(array[i].toString());}}return'[ '+result.join(', ')+' ]';}var simpleAttributes='id channel channelSerial connectionId connectionKey connectionSerial count msgSerial timestamp'.split(' ');ProtocolMessage.stringify=function(msg){var result='[ProtocolMessage';if(msg.action!==undefined)result+='; action='+ProtocolMessage.ActionName[msg.action]||msg.action;var attribute;for(var attribIndex=0;attribIndex<simpleAttributes.length;attribIndex++){attribute=simpleAttributes[attribIndex];if(msg[attribute]!==undefined)result+='; '+attribute+'='+msg[attribute];}if(msg.messages)result+='; messages='+toStringArray(Message.fromValuesArray(msg.messages));if(msg.presence)result+='; presence='+toStringArray(PresenceMessage.fromValuesArray(msg.presence));if(msg.error)result+='; error='+ErrorInfo.fromValues(msg.error).toString();if(msg.auth&&msg.auth.accessToken)result+='; token='+msg.auth.accessToken;if(msg.flags)result+='; flags='+Utils.arrFilter(flagNames,function(flag){return msg.hasFlag(flag);}).join(',');result+=']';return result;};return ProtocolMessage;}();var Stats=function(){function MessageCount(values){this.count=values&&values.count||0;this.data=values&&values.data||0;this.failed=values&&values.failed||0;this.refused=values&&values.refused||0;}function ResourceCount(values){this.peak=values&&values.peak||0;this.min=values&&values.min||0;this.mean=values&&values.mean||0;this.opened=values&&values.opened||0;this.refused=values&&values.refused||0;}function RequestCount(values){this.succeeded=values&&values.succeeded||0;this.failed=values&&values.failed||0;this.refused=values&&values.refused||0;}function ConnectionTypes(values){this.plain=new ResourceCount(values&&values.plain);this.tls=new ResourceCount(values&&values.tls);this.all=new ResourceCount(values&&values.all);}function MessageTypes(values){this.messages=new MessageCount(values&&values.messages);this.presence=new MessageCount(values&&values.presence);this.all=new MessageCount(values&&values.all);}function MessageTraffic(values){this.realtime=new MessageTypes(values&&values.realtime);this.rest=new MessageTypes(values&&values.rest);this.webhook=new MessageTypes(values&&values.webhook);this.push=new MessageTypes(values&&values.push);this.sharedQueue=new MessageTypes(values&&values.sharedQueue);this.externalQueue=new MessageTypes(values&&values.externalQueue);this.all=new MessageTypes(values&&values.all);}function Stats(values){this.all=new MessageTypes(values&&values.all);this.inbound=new MessageTraffic(values&&values.inbound);this.outbound=new MessageTraffic(values&&values.outbound);this.persisted=new MessageTypes(values&&values.persisted);this.connections=new ConnectionTypes(values&&values.connections);this.channels=new ResourceCount(values&&values.channels);this.apiRequests=new RequestCount(values&&values.apiRequests);this.tokenRequests=new RequestCount(values&&values.tokenRequests);this.inProgress=values&&values.inProgress||undefined;this.unit=values&&values.unit||undefined;this.intervalId=values&&values.intervalId||undefined;}Stats.fromValues=function(values){return new Stats(values);};return Stats;}();var ConnectionError={disconnected:ErrorInfo.fromValues({statusCode:400,code:80003,message:'Connection to server temporarily unavailable'}),suspended:ErrorInfo.fromValues({statusCode:400,code:80002,message:'Connection to server unavailable'}),failed:ErrorInfo.fromValues({statusCode:400,code:80000,message:'Connection failed or disconnected by server'}),closing:ErrorInfo.fromValues({statusCode:400,code:80017,message:'Connection closing'}),closed:ErrorInfo.fromValues({statusCode:400,code:80017,message:'Connection closed'}),unknownConnectionErr:ErrorInfo.fromValues({statusCode:500,code:50002,message:'Internal connection error'}),unknownChannelErr:ErrorInfo.fromValues({statusCode:500,code:50001,message:'Internal channel error'})};var MessageQueue=function(){function MessageQueue(){EventEmitter.call(this);this.messages=[];}Utils.inherits(MessageQueue,EventEmitter);MessageQueue.prototype.count=function(){return this.messages.length;};MessageQueue.prototype.push=function(message){this.messages.push(message);};MessageQueue.prototype.shift=function(){return this.messages.shift();};MessageQueue.prototype.last=function(){return this.messages[this.messages.length-1];};MessageQueue.prototype.copyAll=function(){return this.messages.slice();};MessageQueue.prototype.append=function(messages){this.messages.push.apply(this.messages,messages);};MessageQueue.prototype.prepend=function(messages){this.messages.unshift.apply(this.messages,messages);};MessageQueue.prototype.completeMessages=function(serial,count,err){Logger.logAction(Logger.LOG_MICRO,'MessageQueue.completeMessages()','serial = '+serial+'; count = '+count);err=err||null;var messages=this.messages;var first=messages[0];if(first){var startSerial=first.message.msgSerial;var endSerial=serial+count;/* the serial of the first message that is *not* the subject of this call */if(endSerial>startSerial){var completeMessages=messages.splice(0,endSerial-startSerial);for(var i=0;i<completeMessages.length;i++){completeMessages[i].callback(err);}}if(messages.length==0)this.emit('idle');}};MessageQueue.prototype.completeAllMessages=function(err){this.completeMessages(0,Number.MAX_SAFE_INTEGER||Number.MAX_VALUE,err);};MessageQueue.prototype.clear=function(){Logger.logAction(Logger.LOG_MICRO,'MessageQueue.clear()','clearing '+this.messages.length+' messages');this.messages=[];this.emit('idle');};return MessageQueue;}();var Protocol=function(){var actions=ProtocolMessage.Action;function Protocol(transport){EventEmitter.call(this);this.transport=transport;this.messageQueue=new MessageQueue();var self=this;transport.on('ack',function(serial,count){self.onAck(serial,count);});transport.on('nack',function(serial,count,err){self.onNack(serial,count,err);});}Utils.inherits(Protocol,EventEmitter);Protocol.prototype.onAck=function(serial,count){Logger.logAction(Logger.LOG_MICRO,'Protocol.onAck()','serial = '+serial+'; count = '+count);this.messageQueue.completeMessages(serial,count);};Protocol.prototype.onNack=function(serial,count,err){Logger.logAction(Logger.LOG_ERROR,'Protocol.onNack()','serial = '+serial+'; count = '+count+'; err = '+Utils.inspectError(err));if(!err){err=new ErrorInfo('Unable to send message; channel not responding',50001,500);}this.messageQueue.completeMessages(serial,count,err);};Protocol.prototype.onceIdle=function(listener){var messageQueue=this.messageQueue;if(messageQueue.count()===0){listener();return;}messageQueue.once('idle',listener);};Protocol.prototype.send=function(pendingMessage){if(pendingMessage.ackRequired){this.messageQueue.push(pendingMessage);}if(Logger.shouldLog(Logger.LOG_MICRO)){Logger.logAction(Logger.LOG_MICRO,'Protocol.send()','sending msg; '+ProtocolMessage.stringify(pendingMessage.message));}pendingMessage.sendAttempted=true;this.transport.send(pendingMessage.message);};Protocol.prototype.getTransport=function(){return this.transport;};Protocol.prototype.getPendingMessages=function(){return this.messageQueue.copyAll();};Protocol.prototype.clearPendingMessages=function(){return this.messageQueue.clear();};Protocol.prototype.finish=function(){var transport=this.transport;this.onceIdle(function(){transport.disconnect();});};function PendingMessage(message,callback){this.message=message;this.callback=callback;this.merged=false;var action=message.action;this.sendAttempted=false;this.ackRequired=action==actions.MESSAGE||action==actions.PRESENCE;}Protocol.PendingMessage=PendingMessage;return Protocol;}();var ConnectionManager=function(){var haveWebStorage=!!(typeof WebStorage!=='undefined'&&WebStorage.get);var haveSessionStorage=!!(typeof WebStorage!=='undefined'&&WebStorage.getSession);var actions=ProtocolMessage.Action;var PendingMessage=Protocol.PendingMessage;var noop=function noop(){};var transportPreferenceOrder=Defaults.transportPreferenceOrder;var optimalTransport=transportPreferenceOrder[transportPreferenceOrder.length-1];var transportPreferenceName='ably-transport-preference';var sessionRecoveryName='ably-connection-recovery';function getSessionRecoverData(){return haveSessionStorage&&WebStorage.getSession(sessionRecoveryName);}function setSessionRecoverData(value){return haveSessionStorage&&WebStorage.setSession(sessionRecoveryName,value);}function clearSessionRecoverData(){return haveSessionStorage&&WebStorage.removeSession(sessionRecoveryName);}function betterTransportThan(a,b){return Utils.arrIndexOf(transportPreferenceOrder,a.shortName)>Utils.arrIndexOf(transportPreferenceOrder,b.shortName);}function TransportParams(options,host,mode,connectionKey,connectionSerial){this.options=options;this.host=host;this.mode=mode;this.connectionKey=connectionKey;this.connectionSerial=connectionSerial;this.format=options.useBinaryProtocol?'msgpack':'json';}TransportParams.prototype.getConnectParams=function(authParams){var params=authParams?Utils.copy(authParams):{};var options=this.options;switch(this.mode){case'upgrade':params.upgrade=this.connectionKey;break;case'resume':params.resume=this.connectionKey;if(this.connectionSerial!==undefined)params.connection_serial=this.connectionSerial;break;case'recover':var match=options.recover.split(':');if(match){params.recover=match[0];params.connection_serial=match[1];}break;default:}if(options.clientId!==undefined)params.clientId=options.clientId;if(options.echoMessages===false)params.echo='false';if(this.format!==undefined)params.format=this.format;if(this.stream!==undefined)params.stream=this.stream;if(this.heartbeats!==undefined)params.heartbeats=this.heartbeats;if(options.transportParams!==undefined){Utils.mixin(params,options.transportParams);}params.v=Defaults.apiVersion;params.lib=Defaults.libstring;return params;};/* public constructor */function ConnectionManager(realtime,options){EventEmitter.call(this);this.realtime=realtime;this.options=options;var timeouts=options.timeouts;var self=this;/* connectingTimeout: leave preferenceConnectTimeout (~6s) to try the
			* preference transport, then realtimeRequestTimeout (~10s) to establish
			* the base transport in case that fails */var connectingTimeout=timeouts.preferenceConnectTimeout+timeouts.realtimeRequestTimeout;this.states={initialized:{state:'initialized',terminal:false,queueEvents:true,sendEvents:false,failState:'disconnected'},connecting:{state:'connecting',terminal:false,queueEvents:true,sendEvents:false,retryDelay:connectingTimeout,failState:'disconnected'},connected:{state:'connected',terminal:false,queueEvents:false,sendEvents:true,failState:'disconnected'},synchronizing:{state:'connected',terminal:false,queueEvents:true,sendEvents:false,forceQueueEvents:true,failState:'disconnected'},disconnected:{state:'disconnected',terminal:false,queueEvents:true,sendEvents:false,retryDelay:timeouts.disconnectedRetryTimeout,failState:'disconnected'},suspended:{state:'suspended',terminal:false,queueEvents:false,sendEvents:false,retryDelay:timeouts.suspendedRetryTimeout,failState:'suspended'},closing:{state:'closing',terminal:false,queueEvents:false,sendEvents:false,retryDelay:timeouts.realtimeRequestTimeout,failState:'closed'},closed:{state:'closed',terminal:true,queueEvents:false,sendEvents:false,failState:'closed'},failed:{state:'failed',terminal:true,queueEvents:false,sendEvents:false,failState:'failed'}};this.state=this.states.initialized;this.errorReason=null;this.queuedMessages=new MessageQueue();this.msgSerial=0;this.connectionId=undefined;this.connectionKey=undefined;this.connectionSerial=undefined;this.connectionStateTtl=timeouts.connectionStateTtl;this.maxIdleInterval=null;this.transports=Utils.intersect(options.transports||Defaults.defaultTransports,ConnectionManager.supportedTransports);/* baseTransports selects the leftmost transport in the Defaults.baseTransportOrder list
		   * that's both requested and supported. Normally this will be xhr_polling;
		   * if xhr isn't supported it will be jsonp. If the user has forced a
		   * transport, it'll just be that one. */this.baseTransport=Utils.intersect(Defaults.baseTransportOrder,this.transports)[0];this.upgradeTransports=Utils.intersect(this.transports,Defaults.upgradeTransports);/* Map of hosts to an array of transports to not be tried for that host */this.transportHostBlacklist={};this.transportPreference=null;this.httpHosts=Defaults.getHosts(options);this.activeProtocol=null;this.proposedTransports=[];this.pendingTransports=[];this.host=null;this.lastAutoReconnectAttempt=null;this.lastActivity=null;Logger.logAction(Logger.LOG_MINOR,'Realtime.ConnectionManager()','started');Logger.logAction(Logger.LOG_MICRO,'Realtime.ConnectionManager()','requested transports = ['+(options.transports||Defaults.defaultTransports)+']');Logger.logAction(Logger.LOG_MICRO,'Realtime.ConnectionManager()','available transports = ['+this.transports+']');Logger.logAction(Logger.LOG_MICRO,'Realtime.ConnectionManager()','http hosts = ['+this.httpHosts+']');if(!this.transports.length){var msg='no requested transports available';Logger.logAction(Logger.LOG_ERROR,'realtime.ConnectionManager()',msg);throw new Error(msg);}var addEventListener=Platform.addEventListener;if(addEventListener){/* intercept close event in browser to persist connection id if requested */if(haveSessionStorage&&typeof options.recover==='function'){/* Usually can't use bind as not supported in IE8, but IE doesn't support sessionStorage, so... */addEventListener('beforeunload',this.persistConnection.bind(this));}if(options.closeOnUnload===true){addEventListener('beforeunload',function(){self.requestState({state:'closing'});});}/* Listen for online and offline events */addEventListener('online',function(){if(self.state==self.states.disconnected||self.state==self.states.suspended){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager caught browser ‘online’ event','reattempting connection');self.requestState({state:'connecting'});}});addEventListener('offline',function(){if(self.state==self.states.connected){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager caught browser ‘offline’ event','disconnecting active transport');// Not sufficient to just go to the 'disconnected' state, want to
   // force all transports to reattempt the connection. Will immediately
   // retry.
   self.disconnectAllTransports();}});}}Utils.inherits(ConnectionManager,EventEmitter);/*********************
		* transport management
		*********************/ConnectionManager.supportedTransports={};ConnectionManager.prototype.getTransportParams=function(callback){var self=this;function decideMode(modeCb){if(self.connectionKey){modeCb('resume');return;}if(typeof self.options.recover==='string'){modeCb('recover');return;}var recoverFn=self.options.recover,lastSessionData=getSessionRecoverData();if(lastSessionData&&typeof recoverFn==='function'){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.getTransportParams()','Calling clientOptions-provided recover function with last session data');recoverFn(lastSessionData,function(shouldRecover){if(shouldRecover){self.options.recover=lastSessionData.recoveryKey;modeCb('recover');}else{modeCb('clean');}});return;}modeCb('clean');}decideMode(function(mode){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.getTransportParams()','Transport recovery mode = '+mode+(mode=='clean'?'':'; connectionKey = '+self.connectionKey+'; connectionSerial = '+self.connectionSerial));callback(new TransportParams(self.options,null,mode,self.connectionKey,self.connectionSerial));});};/**
		* Attempt to connect using a given transport
		* @param transportParams
		* @param candidate, the transport to try
		* @param callback
		*/ConnectionManager.prototype.tryATransport=function(transportParams,candidate,callback){var self=this,host=transportParams.host;Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.tryATransport()','trying '+candidate);if(host in this.transportHostBlacklist&&Utils.arrIn(this.transportHostBlacklist[host],candidate)){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.tryATransport()',candidate+' transport is blacklisted for host '+transportParams.host);return;}ConnectionManager.supportedTransports[candidate].tryConnect(this,this.realtime.auth,transportParams,function(wrappedErr,transport){var state=self.state;if(state==self.states.closing||state==self.states.closed||state==self.states.failed){if(transport){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.tryATransport()','connection '+state.state+' while we were attempting the transport; closing '+transport);transport.close();}callback(true);return;}if(wrappedErr){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.tryATransport()','transport '+candidate+' '+wrappedErr.event+', err: '+wrappedErr.error.toString());/* Comet transport onconnect token errors can be dealt with here.
				   * Websocket ones only happen after the transport claims to be viable,
				   * so are dealt with as non-onconnect token errors */if(Auth.isTokenErr(wrappedErr.error)){/* re-get a token and try again */self.realtime.auth._forceNewToken(null,null,function(err){if(err){self.actOnErrorFromAuthorize(err);return;}self.tryATransport(transportParams,candidate,callback);});}else if(wrappedErr.event==='failed'){/* Error that's fatal to the connection */self.notifyState({state:'failed',error:wrappedErr.error});callback(true);}else if(wrappedErr.event==='disconnected'){/* Error with that transport only */callback(false);}return;}Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.chooseTransportForHost()','viable transport '+candidate+'; setting pending');self.setTransportPending(transport,transportParams);callback(null,transport);});};/**
		* Called when a transport is indicated to be viable, and the connectionmanager
		* expects to activate this transport as soon as it is connected.
		* @param host
		* @param transportParams
		*/ConnectionManager.prototype.setTransportPending=function(transport,transportParams){var mode=transportParams.mode;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.setTransportPending()','transport = '+transport+'; mode = '+mode);Utils.arrDeleteValue(this.proposedTransports,transport);this.pendingTransports.push(transport);var self=this;transport.once('connected',function(error,connectionKey,connectionSerial,connectionId,connectionDetails){if(mode=='upgrade'&&self.activeProtocol){/*  if ws and xhrs are connecting in parallel, delay xhrs activation to let ws go ahead */if(transport.shortName!==optimalTransport&&Utils.arrIn(self.getUpgradePossibilities(),optimalTransport)){setTimeout(function(){self.scheduleTransportActivation(error,transport,connectionKey,connectionSerial,connectionId,connectionDetails);},self.options.timeouts.parallelUpgradeDelay);}else{self.scheduleTransportActivation(error,transport,connectionKey,connectionSerial,connectionId,connectionDetails);}}else{self.activateTransport(error,transport,connectionKey,connectionSerial,connectionId,connectionDetails);/* allow connectImpl to start the upgrade process if needed, but allow
					* other event handlers, including activating the transport, to run first */Utils.nextTick(function(){self.connectImpl(transportParams);});}if(mode==='recover'&&self.options.recover){/* After a successful recovery, we unpersist, as a recovery key cannot
				   * be used more than once */self.options.recover=null;self.unpersistConnection();}});transport.on(['disconnected','closed','failed'],function(error){self.deactivateTransport(transport,this.event,error);});this.emit('transport.pending',transport);};/**
		* Called when an upgrade transport is connected,
		* to schedule the activation of that transport.
		* @param transport, the transport instance
		* @param connectionKey
		*/ConnectionManager.prototype.scheduleTransportActivation=function(error,transport,connectionKey,connectionSerial,connectionId,connectionDetails){var self=this,currentTransport=this.activeProtocol&&this.activeProtocol.getTransport(),abandon=function abandon(){transport.disconnect();Utils.arrDeleteValue(self.pendingTransports,transport);};if(this.state!==this.states.connected&&this.state!==this.states.connecting){/* This is most likely to happen for the delayed xhrs, when xhrs and ws are scheduled in parallel*/Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Current connection state ('+this.state.state+(this.state===this.states.synchronizing?', but with an upgrade already in progress':'')+') is not valid to upgrade in; abandoning upgrade to '+transport.shortName);abandon();return;}if(currentTransport&&!betterTransportThan(transport,currentTransport)){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Proposed transport '+transport.shortName+' is no better than current active transport '+currentTransport.shortName+' - abandoning upgrade');abandon();return;}Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Scheduling transport upgrade; transport = '+transport);this.realtime.channels.onceNopending(function(err){var oldProtocol;if(err){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.scheduleTransportActivation()','Unable to activate transport; transport = '+transport+'; err = '+err);return;}if(!transport.isConnected){/* This is only possible if the xhr streaming transport was disconnected during the parallelUpgradeDelay */Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Proposed transport '+transport.shortName+'is no longer connected; abandoning upgrade');abandon();return;}if(self.state===self.states.connected){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.scheduleTransportActivation()','Currently connected, so temporarily pausing events until the upgrade is complete');self.state=self.states.synchronizing;oldProtocol=self.activeProtocol;}else if(self.state!==self.states.connecting){/* Note: upgrading from the connecting state is valid if the old active
				   * transport was deactivated after the upgrade transport first connected;
				   * see logic in deactivateTransport */Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Current connection state ('+self.state.state+(self.state===self.states.synchronizing?', but with an upgrade already in progress':'')+') is not valid to upgrade in; abandoning upgrade to '+transport.shortName);abandon();return;}/* If the connectionId has changed, the upgrade hasn't worked. But as
			   * it's still an upgrade, realtime still expects a sync - it just needs to
			   * be a sync with the new connectionSerial (which will be -1). (And it
			   * needs to be set in the library, which is done by activateTransport). */var connectionReset=connectionId!==self.connectionId,newConnectionSerial=connectionReset?connectionSerial:self.connectionSerial;if(connectionReset){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.scheduleTransportActivation()','Upgrade resulted in new connectionId; resetting library connectionSerial from '+self.connectionSerial+' to '+newConnectionSerial+'; upgrade error was '+error);}Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Syncing transport; transport = '+transport);self.sync(transport,function(syncErr,newConnectionSerial,connectionId){/* If there's been some problem with syncing (and the connection hasn't
					* closed or something in the meantime), we have a problem -- we can't
					* just fall back on the old transport, as we don't know whether
					* realtime got the sync -- if it did, the old transport is no longer
					* valid. To be safe, we disconnect both and start again from scratch. */if(syncErr){if(self.state===self.states.synchronizing){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.scheduleTransportActivation()','Unexpected error attempting to sync transport; transport = '+transport+'; err = '+syncErr);self.disconnectAllTransports();}return;}var finishUpgrade=function finishUpgrade(){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Activating transport; transport = '+transport);self.activateTransport(error,transport,connectionKey,newConnectionSerial,connectionId,connectionDetails);/* Restore pre-sync state. If state has changed in the meantime,
						* don't touch it -- since the websocket transport waits a tick before
						* disposing itself, it's possible for it to have happily synced
						* without err while, unknown to it, the connection has closed in the
						* meantime and the ws transport is scheduled for death */if(self.state===self.states.synchronizing){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.scheduleTransportActivation()','Pre-upgrade protocol idle, sending queued messages on upgraded transport; transport = '+transport);self.state=self.states.connected;}else{Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.scheduleTransportActivation()','Pre-upgrade protocol idle, but state is now '+self.state.state+', so leaving unchanged');}if(self.state.sendEvents){self.sendQueuedMessages();}};/* Wait until sync is done and old transport is idle before activating new transport. This
					* guarantees that messages arrive at realtime in the same order they are sent.
					*
					* If a message times out on the old transport, since it's still the active transport the
					* message will be requeued. deactivateTransport will see the pending transport and notify
					* the `connecting` state without starting a new connection, so the new transport can take
					* over once deactivateTransport clears the old protocol's queue.
					*
					* If there is no old protocol, that meant that we weren't in the connected state at the
					* beginning of the sync - likely the base transport died just before the sync. So can just
					* finish the upgrade. If we're actually in closing/failed rather than connecting, that's
					* fine, activatetransport will deal with that. */if(oldProtocol){/* Most of the time this will be already true: the new-transport sync will have given
					* enough time for in-flight messages on the old transport to complete. */oldProtocol.onceIdle(finishUpgrade);}else{finishUpgrade();}});});};/**
		* Called when a transport is connected, and the connectionmanager decides that
		* it will now be the active transport. Returns whether or not it activated
		* the transport (if the connection is closing/closed it will choose not to).
		* @param transport the transport instance
		* @param connectionKey the key of the new active connection
		* @param connectionSerial the current connectionSerial
		* @param connectionId the id of the new active connection
		*/ConnectionManager.prototype.activateTransport=function(error,transport,connectionKey,connectionSerial,connectionId,connectionDetails){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.activateTransport()','transport = '+transport);if(error){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.activateTransport()','error = '+error);}if(connectionKey)Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.activateTransport()','connectionKey =  '+connectionKey);if(connectionSerial!==undefined)Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.activateTransport()','connectionSerial =  '+connectionSerial);if(connectionId)Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.activateTransport()','connectionId =  '+connectionId);if(connectionDetails)Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.activateTransport()','connectionDetails =  '+JSON.stringify(connectionDetails));this.persistTransportPreference(transport);/* if the connectionmanager moved to the closing/closed state before this
			* connection event, then we won't activate this transport */var existingState=this.state,connectedState=this.states.connected.state;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.activateTransport()','current state = '+existingState.state);if(existingState.state==this.states.closing.state||existingState.state==this.states.closed.state||existingState.state==this.states.failed.state){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.activateTransport()','Disconnecting transport and abandoning');transport.disconnect();return false;}/* remove this transport from pending transports */Utils.arrDeleteValue(this.pendingTransports,transport);/* if the transport is not connected (eg because it failed during a
			* scheduleTransportActivation#onceNoPending wait) then don't activate it */if(!transport.isConnected){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.activateTransport()','Declining to activate transport '+transport+' since it appears to no longer be connected');return false;}/* the given transport is connected; this will immediately
			* take over as the active transport */var existingActiveProtocol=this.activeProtocol;this.activeProtocol=new Protocol(transport);this.host=transport.params.host;if(connectionKey&&this.connectionKey!=connectionKey){this.setConnection(connectionId,connectionKey,connectionSerial);}/* Rebroadcast any new connectionDetails from the active transport, which
			* can come at any time (eg following a reauth), and emit an RTN24 UPDATE
			* event. (Listener added on nextTick because we're in a transport.on('connected')
			* callback at the moment; if we add it now we'll be adding it to the end
			* of the listeners array and it'll be called immediately) */this.onConnectionDetailsUpdate(connectionDetails,transport);var self=this;Utils.nextTick(function(){transport.on('connected',function(connectedErr,_connectionKey,_connectionSerial,_connectionId,connectionDetails){self.onConnectionDetailsUpdate(connectionDetails,transport);self.emit('update',new ConnectionStateChange(connectedState,connectedState,null,connectedErr));});});/* If previously not connected, notify the state change (including any
			* error). */if(existingState.state===this.states.connected.state){if(error){/* if upgrading without error, leave any existing errorReason alone */this.errorReason=this.realtime.connection.errorReason=error;/* Only bother emitting an upgrade if there's an error; otherwise it's
					* just a transport upgrade, so auth details won't have changed */this.emit('update',new ConnectionStateChange(connectedState,connectedState,null,error));}}else{this.notifyState({state:'connected',error:error});this.errorReason=this.realtime.connection.errorReason=error||null;}/* Send after the connection state update, as Channels hooks into this to
			* resend attaches on a new transport if necessary */this.emit('transport.active',transport,connectionKey,transport.params);/* Gracefully terminate existing protocol */if(existingActiveProtocol){if(existingActiveProtocol.messageQueue.count()>0){/* We could just requeue pending messages on the new transport, but
					* actually this should never happen: transports should only take over
					* from other active transports when upgrading, and upgrading waits for
					* the old transport to be idle. So log an error. */Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.activateTransport()','Previous active protocol (for transport '+existingActiveProtocol.transport.shortName+', new one is '+transport.shortName+') finishing with '+existingActiveProtocol.messageQueue.count()+' messages still pending');}existingActiveProtocol.finish();}/* Terminate any other pending transport(s), and
			* abort any not-yet-pending transport attempts */Utils.safeArrForEach(this.pendingTransports,function(transport){transport.disconnect();});Utils.safeArrForEach(this.proposedTransports,function(transport){transport.dispose();});return true;};/**
		* Called when a transport is no longer the active transport. This can occur
		* in any transport connection state.
		* @param transport
		*/ConnectionManager.prototype.deactivateTransport=function(transport,state,error){var currentProtocol=this.activeProtocol,wasActive=currentProtocol&&currentProtocol.getTransport()===transport,wasPending=Utils.arrDeleteValue(this.pendingTransports,transport),wasProposed=Utils.arrDeleteValue(this.proposedTransports,transport),noTransportsScheduledForActivation=this.noTransportsScheduledForActivation();Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.deactivateTransport()','transport = '+transport);Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.deactivateTransport()','state = '+state+(wasActive?'; was active':wasPending?'; was pending':wasProposed?'; was proposed':'')+(noTransportsScheduledForActivation?'':'; another transport is scheduled for activation'));if(error&&error.message)Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.deactivateTransport()','reason =  '+error.message);if(wasActive){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.deactivateTransport()','Getting, clearing, and requeuing '+this.activeProtocol.messageQueue.count()+' pending messages');this.queuePendingMessages(currentProtocol.getPendingMessages());/* Clear any messages we requeue to allow the protocol to become idle.
				* In case of an upgrade, this will trigger an immediate activation of
				* the upgrade transport, so delay a tick so this transport can finish
				* deactivating */Utils.nextTick(function(){currentProtocol.clearPendingMessages();});this.activeProtocol=this.host=null;}this.emit('transport.inactive',transport);/* this transport state change is a state change for the connectionmanager if
			* - the transport was the active transport and there are no transports
			*   which are connected and scheduled for activation, just waiting for the
			*   active transport to finish what its doing; or
			* - the transport was the active transport and the error was fatal (so
			*   unhealable by another transport); or
			* - there is no active transport, and this is the last remaining
			*   pending transport (so we were in the connecting state)
			*/if(wasActive&&noTransportsScheduledForActivation||wasActive&&state==='failed'||state==='closed'||currentProtocol===null&&wasPending&&this.pendingTransports.length===0){/* TODO remove below line once realtime sends token errors as DISCONNECTEDs */if(state==='failed'&&Auth.isTokenErr(error)){state='disconnected';}this.notifyState({state:state,error:error});}else if(wasActive&&state==='disconnected'){/* If we were active but there is another transport scheduled for
			   * activation, go into to the connecting state until that transport
			   * activates and sets us back to connected. (manually starting the
			   * transition timers in case that never happens) */Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.deactivateTransport()','wasActive but another transport is connected and scheduled for activation, so going into the connecting state until it activates');this.startSuspendTimer();this.startTransitionTimer(this.states.connecting);this.notifyState({state:'connecting',error:error});}};/* Helper that returns true if there are no transports which are pending,
	   * have been connected, and are just waiting for onceNoPending to fire before
	   * being activated */ConnectionManager.prototype.noTransportsScheduledForActivation=function(){return Utils.isEmpty(this.pendingTransports)||this.pendingTransports.every(function(transport){return!transport.isConnected;});};/**
		* Called when activating a new transport, to ensure message delivery
		* on the new transport synchronises with the messages already received
		*/ConnectionManager.prototype.sync=function(transport,callback){var timeout=setTimeout(function(){transport.off('sync');callback(new ErrorInfo('Timeout waiting for sync response',50000,500));},this.options.timeouts.realtimeRequestTimeout);/* send sync request */var syncMessage=ProtocolMessage.fromValues({action:actions.SYNC,connectionKey:this.connectionKey,connectionSerial:this.connectionSerial});transport.send(syncMessage);transport.once('sync',function(connectionSerial,connectionId){clearTimeout(timeout);callback(null,connectionSerial,connectionId);});};ConnectionManager.prototype.setConnection=function(connectionId,connectionKey,connectionSerial){/* if connectionKey changes but connectionId stays the same, then just a
			* transport change on the same connection. If connectionId changes, we're
			* on a new connection, with implications for msgSerial and channel state */var self=this;connectionSerial=connectionSerial===undefined?-1:connectionSerial;/* Note that this is also run on clean connections; the msgSerial is a
			* noop, but the channel reattach is needed for channels that were
			* previously in the attached state even though the connection mode was
			* 'clean' due to a freshness check - see https://github.com/ably/ably-js/issues/394 */if(this.connectionId!==connectionId){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.setConnection()','New connectionId; resetting msgSerial and reattaching any attached channels');this.msgSerial=0;/* Wait till next tick before reattaching channels, so that connection
				* state will be updated and so that it will be applied after
				* Channels#onTransportUpdate, else channels will not have an ATTACHED
				* sent twice (once from this and once from that). */Utils.nextTick(function(){self.realtime.channels.reattach();});}else{/* don't allow the connectionSerial in the CONNECTED to lower the stored
				* connectionSerial, because messages can arrive on the upgrade transport
				* (validly incrementing the stored connectionSerial) after it's been
				* synced but before it gets activated */connectionSerial=this.connectionSerial===undefined?connectionSerial:Math.max(connectionSerial,this.connectionSerial);}this.realtime.connection.id=this.connectionId=connectionId;this.realtime.connection.key=this.connectionKey=connectionKey;this.realtime.connection.serial=this.connectionSerial=connectionSerial;this.realtime.connection.recoveryKey=connectionKey+':'+this.connectionSerial;};ConnectionManager.prototype.clearConnection=function(){this.realtime.connection.id=this.connectionId=undefined;this.realtime.connection.key=this.connectionKey=undefined;this.realtime.connection.serial=this.connectionSerial=undefined;this.realtime.connection.recoveryKey=null;this.msgSerial=0;this.unpersistConnection();};ConnectionManager.prototype.checkConnectionStateFreshness=function(){if(!this.lastActivity||!this.connectionId){return;}var sinceLast=Utils.now()-this.lastActivity;if(sinceLast>this.connectionStateTtl+this.maxIdleInterval){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.checkConnectionStateFreshness()','Last known activity from realtime was '+sinceLast+'ms ago; discarding connection state');this.clearConnection();this.states.connecting.failState='suspended';this.states.connecting.queueEvents=false;}};/**
		* Called when the connectionmanager wants to persist transport
		* state for later recovery. Only applicable in the browser context.
		*/ConnectionManager.prototype.persistConnection=function(){if(haveSessionStorage&&this.connectionKey&&this.connectionSerial!==undefined){setSessionRecoverData({recoveryKey:this.connectionKey+':'+this.connectionSerial,disconnectedAt:Utils.now(),location:window.location,clientId:this.realtime.auth.clientId},this.connectionStateTtl);}};/**
		* Called when the connectionmanager wants to persist transport
		* state for later recovery. Only applicable in the browser context.
		*/ConnectionManager.prototype.unpersistConnection=function(){clearSessionRecoverData();};/*********************
		* state management
		*********************/ConnectionManager.prototype.getStateError=function(){return ConnectionError[this.state.state];};ConnectionManager.prototype.activeState=function(){return this.state.queueEvents||this.state.sendEvents;};ConnectionManager.prototype.enactStateChange=function(stateChange){var logLevel=stateChange.current==='failed'?Logger.LOG_ERROR:Logger.LOG_MAJOR;Logger.logAction(logLevel,'Connection state',stateChange.current+(stateChange.reason?'; reason: '+stateChange.reason.message+', code: '+stateChange.reason.code:''));Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.enactStateChange','setting new state: '+stateChange.current+'; reason = '+(stateChange.reason&&stateChange.reason.message));var newState=this.state=this.states[stateChange.current];if(stateChange.reason){this.errorReason=stateChange.reason;this.realtime.connection.errorReason=stateChange.reason;}if(newState.terminal||newState.state==='suspended'){/* suspended is nonterminal, but once in the suspended state, realtime
				* will have discarded our connection state, so futher connection
				* attempts should start from scratch */this.clearConnection();}this.emit('connectionstate',stateChange);};/****************************************
		* ConnectionManager connection lifecycle
		****************************************/ConnectionManager.prototype.startTransitionTimer=function(transitionState){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.startTransitionTimer()','transitionState: '+transitionState.state);if(this.transitionTimer){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.startTransitionTimer()','clearing already-running timer');clearTimeout(this.transitionTimer);}var self=this;this.transitionTimer=setTimeout(function(){if(self.transitionTimer){self.transitionTimer=null;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager '+transitionState.state+' timer expired','requesting new state: '+transitionState.failState);self.notifyState({state:transitionState.failState});}},transitionState.retryDelay);};ConnectionManager.prototype.cancelTransitionTimer=function(){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.cancelTransitionTimer()','');if(this.transitionTimer){clearTimeout(this.transitionTimer);this.transitionTimer=null;}};ConnectionManager.prototype.startSuspendTimer=function(){var self=this;if(this.suspendTimer)return;this.suspendTimer=setTimeout(function(){if(self.suspendTimer){self.suspendTimer=null;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager suspend timer expired','requesting new state: suspended');self.states.connecting.failState='suspended';self.states.connecting.queueEvents=false;self.notifyState({state:'suspended'});}},this.connectionStateTtl);};ConnectionManager.prototype.checkSuspendTimer=function(state){if(state!=='disconnected'&&state!=='suspended'&&state!=='connecting')this.cancelSuspendTimer();};ConnectionManager.prototype.cancelSuspendTimer=function(){this.states.connecting.failState='disconnected';this.states.connecting.queueEvents=true;if(this.suspendTimer){clearTimeout(this.suspendTimer);this.suspendTimer=null;}};ConnectionManager.prototype.startRetryTimer=function(interval){var self=this;this.retryTimer=setTimeout(function(){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager retry timer expired','retrying');self.retryTimer=null;self.requestState({state:'connecting'});},interval);};ConnectionManager.prototype.cancelRetryTimer=function(){if(this.retryTimer){clearTimeout(this.retryTimer);this.retryTimer=null;}};ConnectionManager.prototype.notifyState=function(indicated){var state=indicated.state,self=this;/* We retry immediately if:
			* - something disconnects us while we're connected, or
			* - a viable (but not yet active) transport fails due to a token error (so
			*   this.errorReason will be set, and startConnect will do a forced authorize) */var retryImmediately=state==='disconnected'&&(this.state===this.states.connected||this.state===this.states.synchronizing||this.state===this.states.connecting&&indicated.error&&Auth.isTokenErr(indicated.error));Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.notifyState()','new state: '+state+(retryImmediately?'; will retry connection immediately':''));/* do nothing if we're already in the indicated state */if(state==this.state.state)return;/* kill timers (possibly excepting suspend timer depending on the notified
		   * state), as these are superseded by this notification */this.cancelTransitionTimer();this.cancelRetryTimer();this.checkSuspendTimer(indicated.state);/* do nothing if we're unable to move from the current state */if(this.state.terminal)return;/* process new state */var newState=this.states[indicated.state],change=new ConnectionStateChange(this.state.state,newState.state,newState.retryDelay,indicated.error||ConnectionError[newState.state]);if(retryImmediately){var autoReconnect=function autoReconnect(){if(self.state===self.states.disconnected){self.lastAutoReconnectAttempt=Utils.now();self.requestState({state:'connecting'});}};var sinceLast=this.lastAutoReconnectAttempt&&Utils.now()-this.lastAutoReconnectAttempt+1;if(sinceLast&&sinceLast<1000){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.notifyState()','Last reconnect attempt was only '+sinceLast+'ms ago, waiting another '+(1000-sinceLast)+'ms before trying again');setTimeout(autoReconnect,1000-sinceLast);}else{Utils.nextTick(autoReconnect);}}else if(state==='disconnected'||state==='suspended'){this.startRetryTimer(newState.retryDelay);}/* If going into disconnect/suspended (and not retrying immediately), or a
			   * terminal state, ensure there are no orphaned transports hanging around. */if(state==='disconnected'&&!retryImmediately||state==='suspended'||newState.terminal){/* Wait till the next tick so the connection state change is enacted,
					* so aborting transports doesn't trigger redundant state changes */Utils.nextTick(function(){self.disconnectAllTransports();});}if(state=='connected'&&!this.activeProtocol){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.notifyState()','Broken invariant: attempted to go into connected state, but there is no active protocol');}/* implement the change and notify */this.enactStateChange(change);if(this.state.sendEvents){this.sendQueuedMessages();}else if(!this.state.queueEvents){this.realtime.channels.propogateConnectionInterruption(state,change.reason);this.failQueuedMessages(change.reason);// RTN7c
   }};ConnectionManager.prototype.requestState=function(request){var state=request.state,self=this;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.requestState()','requested state: '+state+'; current state: '+this.state.state);if(state==this.state.state)return;/* silently do nothing *//* kill running timers, as this request supersedes them */this.cancelTransitionTimer();this.cancelRetryTimer();/* for suspend timer check rather than cancel -- eg requesting a connecting
		   * state should not reset the suspend timer */this.checkSuspendTimer(state);if(state=='connecting'&&this.state.state=='connected')return;if(state=='closing'&&this.state.state=='closed')return;var newState=this.states[state],change=new ConnectionStateChange(this.state.state,newState.state,null,request.error||ConnectionError[newState.state]);this.enactStateChange(change);if(state=='connecting'){Utils.nextTick(function(){self.startConnect();});}if(state=='closing'){this.closeImpl();}};ConnectionManager.prototype.startConnect=function(){if(this.state!==this.states.connecting){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.startConnect()','Must be in connecting state to connect, but was '+this.state.state);return;}var auth=this.realtime.auth,self=this;var connect=function connect(){self.checkConnectionStateFreshness();self.getTransportParams(function(transportParams){self.connectImpl(transportParams);});};Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.startConnect()','starting connection');this.startSuspendTimer();this.startTransitionTimer(this.states.connecting);if(auth.method==='basic'){connect();}else{var authCb=function authCb(err){if(err){self.actOnErrorFromAuthorize(err);}else{connect();}};if(this.errorReason&&Auth.isTokenErr(this.errorReason)){/* Force a refetch of a new token */auth._forceNewToken(null,null,authCb);}else{auth._ensureValidAuthCredentials(authCb);}}};/**
		* There are three stages in connecting:
		* - preference: if there is a cached transport preference, we try to connect
		*   on that. If that fails or times out we abort the attempt, remove the
		*   preference and fall back to base. If it succeeds, we try upgrading it if
		*   needed (will only be in the case where the preference is xhrs and the
		*   browser supports ws).
		* - base: we try to connect with the best transport that we think will
		*   never fail for this browser (usually this is xhr_polling; for very old
		*   browsers will be jsonp, for node will be comet). If it doesn't work, we
		*   try fallback hosts.
		* - upgrade: given a connected transport, we see if there are any better
		*   ones, and if so, try to upgrade to them.
		*
		* connectImpl works out what stage you're at (which is purely a function of
		* the current connection state and whether there are any stored preferences),
		* and dispatches accordingly. After a transport has been set pending,
		* tryATransport calls connectImpl to see if there's another stage to be done.
		* */ConnectionManager.prototype.connectImpl=function(transportParams){var state=this.state.state;if(state!==this.states.connecting.state&&state!==this.states.connected.state){/* Only keep trying as long as in the 'connecting' state (or 'connected'
				* for upgrading). Any operation can put us into 'disconnected' to cancel
				* connection attempts and wait before retrying, or 'failed' to fail. */Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.connectImpl()','Must be in connecting state to connect (or connected to upgrade), but was '+state);}else if(this.pendingTransports.length){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.connectImpl()','Transports '+this.pendingTransports[0].toString()+' currently pending; taking no action');}else if(state==this.states.connected.state){this.upgradeIfNeeded(transportParams);}else if(this.transports.length>1&&this.getTransportPreference()){this.connectPreference(transportParams);}else{this.connectBase(transportParams);}};ConnectionManager.prototype.connectPreference=function(transportParams){var preference=this.getTransportPreference(),self=this,preferenceTimeoutExpired=false;if(!Utils.arrIn(this.transports,preference)){this.unpersistTransportPreference();this.connectImpl(transportParams);}Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.connectPreference()','Trying to connect with stored transport preference '+preference);var preferenceTimeout=setTimeout(function(){preferenceTimeoutExpired=true;if(!(self.state.state===self.states.connected.state)){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.connectPreference()','Shortcircuit connection attempt with '+preference+' failed; clearing preference and trying from scratch');/* Abort all connection attempts. (This also disconnects the active
					* protocol, but none exists if we're not in the connected state) */self.disconnectAllTransports();/* Be quite agressive about clearing the stored preference if ever it doesn't work */self.unpersistTransportPreference();}self.connectImpl(transportParams);},this.options.timeouts.preferenceConnectTimeout);/* For connectPreference, just use the main host. If host fallback is needed, do it in connectBase.
			* The wstransport it will substitute the httphost for an appropriate wshost */transportParams.host=self.httpHosts[0];self.tryATransport(transportParams,preference,function(fatal,transport){clearTimeout(preferenceTimeout);if(preferenceTimeoutExpired&&transport){/* Viable, but too late - connectImpl() will already be trying
				   * connectBase, and we weren't in upgrade mode. Just remove the
				   * onconnected listener and get rid of it */transport.off();transport.disconnect();Utils.arrDeleteValue(this.pendingTransports,transport);}else if(!transport&&!fatal){/* Preference failed in a transport-specific way. Try more */self.unpersistTransportPreference();self.connectImpl(transportParams);}/* If suceeded, or failed fatally, nothing to do */});};/**
		* Try to establish a transport on the base transport (the best transport
		* such that if it doesn't work, nothing will work) as determined through
		* static feature detection, checking for network connectivity and trying
		* fallback hosts if applicable.
		* @param transportParams
		*/ConnectionManager.prototype.connectBase=function(transportParams){var self=this,giveUp=function giveUp(err){self.notifyState({state:self.states.connecting.failState,error:err});},candidateHosts=this.httpHosts.slice(),hostAttemptCb=function hostAttemptCb(fatal,transport){if(!transport&&!fatal){tryFallbackHosts();}};Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.connectBase()','Trying to connect with base transport '+this.baseTransport);/* first try to establish a connection with the priority host with http transport */var host=candidateHosts.shift();if(!host){giveUp(new ErrorInfo('Unable to connect (no available host)',80000,404));return;}transportParams.host=host;/* this is what we'll be doing if the attempt for the main host fails */function tryFallbackHosts(){/* if there aren't any fallback hosts, fail */if(!candidateHosts.length){giveUp(new ErrorInfo('Unable to connect (and no more fallback hosts to try)',80000,404));return;}/* before trying any fallback (or any remaining fallback) we decide if
				* there is a problem with the ably host, or there is a general connectivity
				* problem */Http.checkConnectivity(function(err,connectivity){/* we know err won't happen but handle it here anyway */if(err){giveUp(err);return;}if(!connectivity){/* the internet isn't reachable, so don't try the fallback hosts */giveUp(new ErrorInfo('Unable to connect (network unreachable)',80000,404));return;}/* the network is there, so there's a problem with the main host, or
					* its dns. Try the fallback hosts. We could try them simultaneously but
					* that would potentially cause a huge spike in load on the load balancer */transportParams.host=Utils.arrPopRandomElement(candidateHosts);self.tryATransport(transportParams,self.baseTransport,hostAttemptCb);});}this.tryATransport(transportParams,this.baseTransport,hostAttemptCb);};ConnectionManager.prototype.getUpgradePossibilities=function(){/* returns the subset of upgradeTransports to the right of the current
			* transport in upgradeTransports (if it's in there - if not, currentPosition
			* will be -1, so return upgradeTransports.slice(0) == upgradeTransports */var current=this.activeProtocol.getTransport().shortName;var currentPosition=Utils.arrIndexOf(this.upgradeTransports,current);return this.upgradeTransports.slice(currentPosition+1);};ConnectionManager.prototype.upgradeIfNeeded=function(transportParams){var upgradePossibilities=this.getUpgradePossibilities(),self=this;Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.upgradeIfNeeded()','upgrade possibilities: '+Utils.inspect(upgradePossibilities));if(!upgradePossibilities.length){return;}Utils.arrForEach(upgradePossibilities,function(upgradeTransport){/* Note: the transport may mutate the params, so give each transport a fresh one */var upgradeTransportParams=new TransportParams(self.options,transportParams.host,'upgrade',self.connectionKey);self.tryATransport(upgradeTransportParams,upgradeTransport,noop);});};ConnectionManager.prototype.closeImpl=function(){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.closeImpl()','closing connection');this.cancelSuspendTimer();this.startTransitionTimer(this.states.closing);Utils.safeArrForEach(this.pendingTransports,function(transport){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.closeImpl()','Closing pending transport: '+transport);if(transport)transport.close();});Utils.safeArrForEach(this.proposedTransports,function(transport){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.closeImpl()','Disposing of proposed transport: '+transport);if(transport)transport.dispose();});if(this.activeProtocol){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.closeImpl()','Closing active transport: '+this.activeProtocol.getTransport());this.activeProtocol.getTransport().close();}/* If there was an active transport, this will probably be
			* preempted by the notifyState call in deactivateTransport */this.notifyState({state:'closed'});};ConnectionManager.prototype.onAuthUpdated=function(tokenDetails,callback){var self=this;switch(this.state.state){case'connected':Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.onAuthUpdated()','Sending AUTH message on active transport');/* If there are any proposed/pending transports (eg an upgrade that
					* isn't yet scheduled for activation) that hasn't yet started syncing,
					* just to get rid of them & restart the upgrade with the new token, to
					* avoid a race condition. (If it has started syncing, the AUTH will be
					* queued until the upgrade is complete, so everything's fine) */if((this.pendingTransports.length||this.proposedTransports.length)&&self.state!==self.states.synchronizing){this.disconnectAllTransports(/* exceptActive: */true);var transportParams=this.activeProtocol.getTransport().params;Utils.nextTick(function(){if(self.state.state==='connected'){self.upgradeIfNeeded(transportParams);}});}/* Do any transport-specific new-token action */this.activeProtocol.getTransport().onAuthUpdated(tokenDetails);var authMsg=ProtocolMessage.fromValues({action:actions.AUTH,auth:{accessToken:tokenDetails.token}});this.send(authMsg);/* The answer will come back as either a connectiondetails event
					* (realtime sends a CONNECTED to asknowledge the reauth) or a
					* statechange to failed */var successListener=function successListener(){self.off(failureListener);callback(null,tokenDetails);};var failureListener=function failureListener(stateChange){if(stateChange.current==='failed'){self.off(successListener);self.off(failureListener);callback(stateChange.reason||self.getStateError());}};this.once('connectiondetails',successListener);this.on('connectionstate',failureListener);break;case'connecting':Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.onAuthUpdated()','Aborting current connection attempts in order to start again with the new auth details');this.disconnectAllTransports();/* fallthrough to add statechange listener */default:Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.onAuthUpdated()','Connection state is '+this.state.state+'; waiting until either connected or failed');var listener=function listener(stateChange){switch(stateChange.current){case'connected':self.off(listener);callback(null,tokenDetails);break;case'failed':case'closed':case'suspended':self.off(listener);callback(stateChange.reason||self.getStateError());break;default:/* ignore till we get either connected or failed */break;}};self.on('connectionstate',listener);if(this.state.state==='connecting'){/* can happen if in the connecting state but no transport was pending
						* yet, so disconnectAllTransports did not trigger a disconnected state */self.startConnect();}else{self.requestState({state:'connecting'});}}};ConnectionManager.prototype.disconnectAllTransports=function(exceptActive){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.disconnectAllTransports()','Disconnecting all transports'+(exceptActive?' except the active transport':''));Utils.safeArrForEach(this.pendingTransports,function(transport){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.disconnectAllTransports()','Disconnecting pending transport: '+transport);if(transport)transport.disconnect();});this.pendingTransports=[];Utils.safeArrForEach(this.proposedTransports,function(transport){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.disconnectAllTransports()','Disposing of proposed transport: '+transport);if(transport)transport.dispose();});this.proposedTransports=[];if(this.activeProtocol&&!exceptActive){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.disconnectAllTransports()','Disconnecting active transport: '+this.activeProtocol.getTransport());this.activeProtocol.getTransport().disconnect();}/* No need to notify state disconnected; disconnecting the active transport
			* will have that effect */};/******************
		* event queueing
		******************/ConnectionManager.prototype.send=function(msg,queueEvent,callback){callback=callback||noop;var state=this.state;if(state.sendEvents){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.send()','sending event');this.sendImpl(new PendingMessage(msg,callback));return;}var shouldQueue=queueEvent&&state.queueEvents||state.forceQueueEvents;if(!shouldQueue){var err='rejecting event, queueEvent was '+queueEvent+', state was '+state.state;Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.send()',err);callback(this.errorReason||new ErrorInfo(err,90000,400));return;}if(Logger.shouldLog(Logger.LOG_MICRO)){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.send()','queueing msg; '+ProtocolMessage.stringify(msg));}this.queue(msg,callback);};ConnectionManager.prototype.sendImpl=function(pendingMessage){var msg=pendingMessage.message;/* If have already attempted to send this, resend with the same msgSerial,
			* so Ably can dedup if the previous send succeeded */if(pendingMessage.ackRequired&&!pendingMessage.sendAttempted){msg.msgSerial=this.msgSerial++;}try{this.activeProtocol.send(pendingMessage);}catch(e){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.sendImpl()','Unexpected exception in transport.send(): '+e.stack);}};ConnectionManager.prototype.queue=function(msg,callback){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.queue()','queueing event');var lastQueued=this.queuedMessages.last();/* If have already attempted to send a message, don't merge more messages
			* into it, as if the previous send actually succeeded and realtime ignores
			* the dup, they'll be lost */if(lastQueued&&!lastQueued.sendAttempted&&RealtimeChannel.mergeTo(lastQueued.message,msg)){if(!lastQueued.merged){lastQueued.callback=Multicaster([lastQueued.callback]);lastQueued.merged=true;}lastQueued.callback.push(callback);}else{this.queuedMessages.push(new PendingMessage(msg,callback));}};ConnectionManager.prototype.sendQueuedMessages=function(){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.sendQueuedMessages()','sending '+this.queuedMessages.count()+' queued messages');var pendingMessage;while(pendingMessage=this.queuedMessages.shift()){this.sendImpl(pendingMessage);}};ConnectionManager.prototype.queuePendingMessages=function(pendingMessages){if(pendingMessages&&pendingMessages.length){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.queuePendingMessages()','queueing '+pendingMessages.length+' pending messages');this.queuedMessages.prepend(pendingMessages);}};ConnectionManager.prototype.failQueuedMessages=function(err){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.failQueuedMessages()','failing '+this.queuedMessages.count()+' queued messages');this.queuedMessages.completeAllMessages(err);};ConnectionManager.prototype.onChannelMessage=function(message,transport){var onActiveTransport=this.activeProtocol&&transport===this.activeProtocol.getTransport(),onUpgradeTransport=Utils.arrIn(this.pendingTransports,transport)&&this.state==this.states.synchronizing;/* As the lib now has a period where the upgrade transport is synced but
			* before it's become active (while waiting for the old one to become
			* idle), message can validly arrive on it even though it isn't active */if(onActiveTransport||onUpgradeTransport){var connectionSerial=message.connectionSerial;if(connectionSerial<=this.connectionSerial){Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.onChannelMessage() received message with connectionSerial '+connectionSerial+', but current connectionSerial is '+this.connectionSerial+'; assuming message is a duplicate and discarding it');return;}if(connectionSerial!==undefined){this.realtime.connection.serial=this.connectionSerial=connectionSerial;this.realtime.connection.recoveryKey=this.connectionKey+':'+connectionSerial;}this.realtime.channels.onChannelMessage(message);}else{// Message came in on a defunct transport. Allow only acks, nacks, & errors for outstanding
   // messages,  no new messages (as sync has been sent on new transport so new messages will
   // be resent there, or connection has been closed so don't want new messages)
   if(Utils.arrIndexOf([actions.ACK,actions.NACK,actions.ERROR],message.action)>-1){this.realtime.channels.onChannelMessage(message);}else{Logger.logAction(Logger.LOG_MICRO,'ConnectionManager.onChannelMessage()','received message '+JSON.stringify(message)+'on defunct transport; discarding');}}};ConnectionManager.prototype.ping=function(transport,callback){/* if transport is specified, try that */if(transport){Logger.logAction(Logger.LOG_MINOR,'ConnectionManager.ping()','transport = '+transport);var onTimeout=function onTimeout(){transport.off('heartbeat',onHeartbeat);callback(new ErrorInfo('Timeout waiting for heartbeat response',50000,500));};var pingStart=Utils.now(),id=Utils.randStr();var onHeartbeat=function onHeartbeat(responseId){if(responseId===id){clearTimeout(timer);var responseTime=Utils.now()-pingStart;callback(null,responseTime);}};var timer=setTimeout(onTimeout,this.options.timeouts.realtimeRequestTimeout);transport.once('heartbeat',onHeartbeat);transport.ping(id);return;}/* if we're not connected, don't attempt */if(this.state.state!=='connected'){callback(new ErrorInfo('Unable to ping service; not connected',40000,400));return;}/* no transport was specified, so use the current (connected) one
			* but ensure that we retry if the transport is superseded before we complete */var completed=false,self=this;var onPingComplete=function onPingComplete(err,responseTime){self.off('transport.active',onTransportActive);if(!completed){completed=true;callback(err,responseTime);}};var onTransportActive=function onTransportActive(){if(!completed){/* ensure that no callback happens for the currently outstanding operation */completed=true;/* repeat but picking up the new transport */Utils.nextTick(function(){self.ping(null,callback);});}};this.on('transport.active',onTransportActive);this.ping(this.activeProtocol.getTransport(),onPingComplete);};ConnectionManager.prototype.abort=function(error){this.activeProtocol.getTransport().fail(error);};ConnectionManager.prototype.registerProposedTransport=function(transport){this.proposedTransports.push(transport);};ConnectionManager.prototype.getTransportPreference=function(){return this.transportPreference||haveWebStorage&&WebStorage.get(transportPreferenceName);};ConnectionManager.prototype.persistTransportPreference=function(transport){if(Utils.arrIn(Defaults.upgradeTransports,transport.shortName)){this.transportPreference=transport.shortName;if(haveWebStorage){WebStorage.set(transportPreferenceName,transport.shortName);}}};ConnectionManager.prototype.unpersistTransportPreference=function(){this.transportPreference=null;if(haveWebStorage){WebStorage.remove(transportPreferenceName);}};ConnectionManager.prototype.actOnErrorFromAuthorize=function(err){if(err.code===40170){/* Special-case problems with the client auth callback - unlike other
				* auth errors these may be nonfatal. (RSA4c) */err.code=80019;this.notifyState({state:this.state.failState,error:err});}else{this.notifyState({state:'failed',error:err});}};ConnectionManager.prototype.onConnectionDetailsUpdate=function(connectionDetails,transport){if(!connectionDetails){return;}var clientId=connectionDetails.clientId;if(clientId){var err=this.realtime.auth._uncheckedSetClientId(clientId);if(err){Logger.logAction(Logger.LOG_ERROR,'ConnectionManager.onConnectionDetailsUpdate()',err.message);/* Errors setting the clientId are fatal to the connection */transport.fail(err);return;}}var connectionStateTtl=connectionDetails.connectionStateTtl;if(connectionStateTtl){this.connectionStateTtl=connectionStateTtl;}this.maxIdleInterval=connectionDetails.maxIdleInterval;this.emit('connectiondetails',connectionDetails);};return ConnectionManager;}();var Transport=function(){var actions=ProtocolMessage.Action;var closeMessage=ProtocolMessage.fromValues({action:actions.CLOSE});var disconnectMessage=ProtocolMessage.fromValues({action:actions.DISCONNECT});var noop=function noop(){};/*
		* EventEmitter, generates the following events:
		*
		* event name       data
		* closed           error
		* failed           error
		* disposed
		* connected        null error, connectionKey
		* event            channel message object
		*//* public constructor */function Transport(connectionManager,auth,params){EventEmitter.call(this);this.connectionManager=connectionManager;connectionManager.registerProposedTransport(this);this.auth=auth;this.params=params;this.timeouts=params.options.timeouts;this.format=params.format;this.isConnected=false;this.isFinished=false;this.maxIdleInterval=null;this.idleTimer=null;this.lastActivity=null;}Utils.inherits(Transport,EventEmitter);Transport.prototype.connect=function(){};Transport.prototype.close=function(){if(this.isConnected){this.requestClose();}this.finish('closed',ConnectionError.closed);};Transport.prototype.disconnect=function(err){/* Used for network/transport issues that need to result in the transport
			* being disconnected, but should not affect the connection */if(this.isConnected){this.requestDisconnect();}this.finish('disconnected',err||ConnectionError.disconnected);};Transport.prototype.fail=function(err){/* Used for client-side-detected fatal connection issues */if(this.isConnected){this.requestDisconnect();}this.finish('failed',err||ConnectionError.failed);};Transport.prototype.finish=function(event,err){if(this.isFinished){return;}this.isFinished=true;this.isConnected=false;this.maxIdleInterval=null;clearTimeout(this.idleTimer);this.idleTimer=null;this.emit(event,err);this.dispose();};Transport.prototype.onProtocolMessage=function(message){if(Logger.shouldLog(Logger.LOG_MICRO)){Logger.logAction(Logger.LOG_MICRO,'Transport.onProtocolMessage()','received on '+this.shortName+': '+ProtocolMessage.stringify(message));}this.lastActivity=this.connectionManager.lastActivity=Utils.now();if(this.maxIdleInterval){this.setIdleTimer();}switch(message.action){case actions.HEARTBEAT:Logger.logAction(Logger.LOG_MICRO,'Transport.onProtocolMessage()',this.shortName+' heartbeat; connectionKey = '+this.connectionManager.connectionKey);this.emit('heartbeat',message.id);break;case actions.CONNECTED:this.onConnect(message);this.emit('connected',message.error,message.connectionDetails?message.connectionDetails.connectionKey:message.connectionKey,message.connectionSerial,message.connectionId,message.connectionDetails);break;case actions.CLOSED:this.onClose(message);break;case actions.DISCONNECTED:this.onDisconnect(message);break;case actions.ACK:this.emit('ack',message.msgSerial,message.count);break;case actions.NACK:this.emit('nack',message.msgSerial,message.count,message.error);break;case actions.SYNC:if(message.connectionId!==undefined){/* a transport SYNC */this.emit('sync',message.connectionSerial,message.connectionId);break;}/* otherwise it's a channel SYNC, so handle it in the channel */this.connectionManager.onChannelMessage(message,this);break;case actions.AUTH:this.auth.authorize(function(err){if(err){Logger.logAction(Logger.LOG_ERROR,'Transport.onProtocolMessage()','Ably requested re-authentication, but unable to obtain a new token: '+Utils.inspectError(err));}});break;case actions.ERROR:Logger.logAction(Logger.LOG_MINOR,'Transport.onProtocolMessage()','received error action; connectionKey = '+this.connectionManager.connectionKey+'; err = '+Utils.inspect(message.error)+(message.channel?', channel: '+message.channel:''));if(message.channel===undefined){this.onFatalError(message);break;}/* otherwise it's a channel-specific error, so handle it in the channel */this.connectionManager.onChannelMessage(message,this);break;default:/* all other actions are channel-specific */this.connectionManager.onChannelMessage(message,this);}};Transport.prototype.onConnect=function(message){this.isConnected=true;var maxPromisedIdle=message.connectionDetails.maxIdleInterval;if(maxPromisedIdle){this.maxIdleInterval=maxPromisedIdle+this.timeouts.realtimeRequestTimeout;this.setIdleTimer();}/* else Realtime declines to guarantee any maximum idle interval - CD2h */};Transport.prototype.onDisconnect=function(message){/* Used for when the server has disconnected the client (usually with a
			* DISCONNECTED action) */var err=message&&message.error;Logger.logAction(Logger.LOG_MINOR,'Transport.onDisconnect()','err = '+Utils.inspectError(err));this.finish('disconnected',err);};Transport.prototype.onFatalError=function(message){/* On receipt of a fatal connection error, we can assume that the server
			* will close the connection and the transport, and do not need to request
			* a disconnection - RTN15i */var err=message&&message.error;Logger.logAction(Logger.LOG_MINOR,'Transport.onFatalError()','err = '+Utils.inspectError(err));this.finish('failed',err);};Transport.prototype.onClose=function(message){var err=message&&message.error;Logger.logAction(Logger.LOG_MINOR,'Transport.onClose()','err = '+Utils.inspectError(err));this.finish('closed',err);};Transport.prototype.requestClose=function(){Logger.logAction(Logger.LOG_MINOR,'Transport.requestClose()','');this.send(closeMessage);};Transport.prototype.requestDisconnect=function(){Logger.logAction(Logger.LOG_MINOR,'Transport.requestDisconnect()','');this.send(disconnectMessage);};Transport.prototype.ping=function(id){var msg={action:ProtocolMessage.Action.HEARTBEAT};if(id)msg.id=id;this.send(ProtocolMessage.fromValues(msg));};Transport.prototype.dispose=function(){Logger.logAction(Logger.LOG_MINOR,'Transport.dispose()','');this.off();};Transport.prototype.setIdleTimer=function(timeout){var self=this;if(!this.idleTimer){this.idleTimer=setTimeout(function(){self.onIdleTimerExpire();},timeout||this.maxIdleInterval);}};Transport.prototype.onIdleTimerExpire=function(){this.idleTimer=null;var sinceLast=Utils.now()-this.lastActivity,timeRemaining=this.maxIdleInterval-sinceLast;if(timeRemaining<=0){var msg='No activity seen from realtime in '+sinceLast+'ms; assuming connection has dropped';Logger.logAction(Logger.LOG_ERROR,'Transport.onIdleTimerExpire()',msg);this.disconnect(new ErrorInfo(msg,80003,408));}else{this.setIdleTimer(timeRemaining+10);}};Transport.prototype.onAuthUpdated=function(){};return Transport;}();var WebSocketTransport=function(){var WebSocket=Platform.WebSocket;var shortName='web_socket';/* public constructor */function WebSocketTransport(connectionManager,auth,params){this.shortName=shortName;/* If is a browser, can't detect pings, so request protocol heartbeats */params.heartbeats=Platform.useProtocolHeartbeats;Transport.call(this,connectionManager,auth,params);this.wsHost=Defaults.getHost(params.options,params.host,true);}Utils.inherits(WebSocketTransport,Transport);WebSocketTransport.isAvailable=function(){return!!WebSocket;};if(WebSocketTransport.isAvailable())ConnectionManager.supportedTransports[shortName]=WebSocketTransport;WebSocketTransport.tryConnect=function(connectionManager,auth,params,callback){var transport=new WebSocketTransport(connectionManager,auth,params);var errorCb=function errorCb(err){callback({event:this.event,error:err});};transport.on(['failed','disconnected'],errorCb);transport.on('wsopen',function(){Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.tryConnect()','viable transport '+transport);transport.off(['failed','disconnected'],errorCb);callback(null,transport);});transport.connect();};WebSocketTransport.prototype.createWebSocket=function(uri,connectParams){var paramCount=0;if(connectParams){for(var key in connectParams){uri+=(paramCount++?'&':'?')+key+'='+connectParams[key];}}this.uri=uri;return new WebSocket(uri);};WebSocketTransport.prototype.toString=function(){return'WebSocketTransport; uri='+this.uri;};WebSocketTransport.prototype.connect=function(){Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.connect()','starting');Transport.prototype.connect.call(this);var self=this,params=this.params,options=params.options;var wsScheme=options.tls?'wss://':'ws://';var wsUri=wsScheme+this.wsHost+':'+Defaults.getPort(options)+'/';Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.connect()','uri: '+wsUri);this.auth.getAuthParams(function(err,authParams){var paramStr='';for(var param in authParams){paramStr+=' '+param+': '+authParams[param]+';';}Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.connect()','authParams:'+paramStr+' err: '+err);if(err){self.disconnect(err);return;}var connectParams=params.getConnectParams(authParams);try{var wsConnection=self.wsConnection=self.createWebSocket(wsUri,connectParams);wsConnection.binaryType=Platform.binaryType;wsConnection.onopen=function(){self.onWsOpen();};wsConnection.onclose=function(ev){self.onWsClose(ev);};wsConnection.onmessage=function(ev){self.onWsData(ev.data);};wsConnection.onerror=function(ev){self.onWsError(ev);};if(wsConnection.on){/* node; browsers currently don't have a general eventemitter and can't detect
						* pings. Also, no need to reply with a pong explicitly, ws lib handles that */wsConnection.on('ping',function(){self.setIdleTimer();});}}catch(e){Logger.logAction(Logger.LOG_ERROR,'WebSocketTransport.connect()','Unexpected exception creating websocket: err = '+(e.stack||e.message));self.disconnect(e);}});};WebSocketTransport.prototype.send=function(message){var wsConnection=this.wsConnection;if(!wsConnection){Logger.logAction(Logger.LOG_ERROR,'WebSocketTransport.send()','No socket connection');return;}wsConnection.send(ProtocolMessage.serialize(message,this.params.format));};WebSocketTransport.prototype.onWsData=function(data){Logger.logAction(Logger.LOG_MICRO,'WebSocketTransport.onWsData()','data received; length = '+data.length+'; type = '+(typeof data==="undefined"?"undefined":_typeof(data)));try{this.onProtocolMessage(ProtocolMessage.deserialize(data,this.format));}catch(e){Logger.logAction(Logger.LOG_ERROR,'WebSocketTransport.onWsData()','Unexpected exception handing channel message: '+e.stack);}};WebSocketTransport.prototype.onWsOpen=function(){Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.onWsOpen()','opened WebSocket');this.emit('wsopen');};WebSocketTransport.prototype.onWsClose=function(ev){var wasClean,code,reason;if((typeof ev==="undefined"?"undefined":_typeof(ev))=='object'){/* W3C spec-compatible */wasClean=ev.wasClean;code=ev.code;}else/*if(typeof(ev) == 'number')*/{/* ws in node */code=ev;wasClean=code==1000;}delete this.wsConnection;if(wasClean){Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.onWsClose()','Cleanly closed WebSocket');var err=new ErrorInfo('Websocket closed',80003,400);this.finish('disconnected',err);}else{var msg='Unclean disconnection of WebSocket ; code = '+code,err=new ErrorInfo(msg,80003,400);Logger.logAction(Logger.LOG_ERROR,'WebSocketTransport.onWsClose()',msg);this.finish('disconnected',err);}this.emit('disposed');};WebSocketTransport.prototype.onWsError=function(err){Logger.logAction(Logger.LOG_ERROR,'WebSocketTransport.onError()','Unexpected error from WebSocket: '+err.message);/* Wait a tick before aborting: if the websocket was connected, this event
			* will be immediately followed by an onclose event with a close code. Allow
			* that to close it (so we see the close code) rather than anticipating it */var self=this;Utils.nextTick(function(){self.disconnect(err);});};WebSocketTransport.prototype.dispose=function(){Logger.logAction(Logger.LOG_MINOR,'WebSocketTransport.dispose()','');var wsConnection=this.wsConnection;if(wsConnection){/* Ignore any messages that come through after dispose() is called but before
				* websocket is actually closed. (mostly would be harmless, but if it's a
				* CONNECTED, it'll re-tick isConnected and cause all sorts of havoc) */wsConnection.onmessage=function(){};delete this.wsConnection;/* defer until the next event loop cycle before closing the socket,
				* giving some implementations the opportunity to send any outstanding close message */Utils.nextTick(function(){Logger.logAction(Logger.LOG_MICRO,'WebSocketTransport.dispose()','closing websocket');wsConnection.close();});}};return WebSocketTransport;}();var CometTransport=function(){var REQ_SEND=0,REQ_RECV=1,REQ_RECV_POLL=2,REQ_RECV_STREAM=3;function actOnConnectHeaders(headers,host,connectionManager){if(headers&&headers.server&&headers.server.indexOf('cloudflare')>-1){/* Cloudflare doesn't support xhr streaming */var blacklist=connectionManager.transportHostBlacklist[host];if(!blacklist){connectionManager.transportHostBlacklist[host]=['xhr_streaming'];return;}if(!Utils.arrIn(blacklist,'xhr_streaming')){blacklist.push('xhr_streaming');}}}/* TODO: can remove once realtime sends protocol message responses for comet errors */function shouldBeErrorAction(err){var UNRESOLVABLE_ERROR_CODES=[80015,80017,80030];if(err.code){if(Auth.isTokenErr(err))return false;if(Utils.arrIn(UNRESOLVABLE_ERROR_CODES,err.code))return true;return err.code>=40000&&err.code<50000;}else{/* Likely a network or transport error of some kind. Certainly not fatal to the connection */return false;}}function protocolMessageFromRawError(err){/* err will be either a legacy (non-protocolmessage) comet error response
			* (which will have an err.code), or a xhr/network error (which won't). */if(shouldBeErrorAction(err)){return[ProtocolMessage.fromValues({action:ProtocolMessage.Action.ERROR,error:err})];}else{return[ProtocolMessage.fromValues({action:ProtocolMessage.Action.DISCONNECTED,error:err})];}}/*
		* A base comet transport class
		*/function CometTransport(connectionManager,auth,params){/* binary not supported for comet, so just fall back to default */params.format=undefined;params.heartbeats=true;Transport.call(this,connectionManager,auth,params);/* streaming defaults to true */this.stream='stream'in params?params.stream:true;this.sendRequest=null;this.recvRequest=null;this.pendingCallback=null;this.pendingItems=null;this.disposed=false;}Utils.inherits(CometTransport,Transport);CometTransport.REQ_SEND=REQ_SEND;CometTransport.REQ_RECV=REQ_RECV;CometTransport.REQ_RECV_POLL=REQ_RECV_POLL;CometTransport.REQ_RECV_STREAM=REQ_RECV_STREAM;/* public instance methods */CometTransport.prototype.connect=function(){Logger.logAction(Logger.LOG_MINOR,'CometTransport.connect()','starting');Transport.prototype.connect.call(this);var self=this,params=this.params,options=params.options;var host=Defaults.getHost(options,params.host);var port=Defaults.getPort(options);var cometScheme=options.tls?'https://':'http://';this.baseUri=cometScheme+host+':'+port+'/comet/';var connectUri=this.baseUri+'connect';Logger.logAction(Logger.LOG_MINOR,'CometTransport.connect()','uri: '+connectUri);this.auth.getAuthParams(function(err,authParams){if(err){self.disconnect(err);return;}self.authParams=authParams;var connectParams=self.params.getConnectParams(authParams);if('stream'in connectParams)self.stream=connectParams.stream;Logger.logAction(Logger.LOG_MINOR,'CometTransport.connect()','connectParams:'+Utils.toQueryString(connectParams));/* this will be the 'recvRequest' so this connection can stream messages */var preconnected=false,connectRequest=self.recvRequest=self.createRequest(connectUri,null,connectParams,null,self.stream?REQ_RECV_STREAM:REQ_RECV);connectRequest.on('data',function(data){if(!self.recvRequest){/* the transport was disposed before we connected */return;}if(!preconnected){preconnected=true;self.emit('preconnect');}self.onData(data);});connectRequest.on('complete',function(err,_body,headers){actOnConnectHeaders(headers,host,self.connectionManager);if(!self.recvRequest){/* the transport was disposed before we connected */err=err||new ErrorInfo('Request cancelled',80000,400);}self.recvRequest=null;if(this.maxIdleInterval){this.setIdleTimer();}if(err){if(err.code){/* A protocol error received from realtime. TODO: once realtime
							* consistendly sends errors wrapped in protocol messages, should be
							* able to remove this */self.onData(protocolMessageFromRawError(err));}else{/* A network/xhr error. Don't bother wrapping in a protocol message,
							* just disconnect the transport */self.disconnect(err);}return;}Utils.nextTick(function(){self.recv();});});connectRequest.exec();});};CometTransport.prototype.requestClose=function(){Logger.logAction(Logger.LOG_MINOR,'CometTransport.requestClose()');this._requestCloseOrDisconnect(true);};CometTransport.prototype.requestDisconnect=function(){Logger.logAction(Logger.LOG_MINOR,'CometTransport.requestDisconnect()');this._requestCloseOrDisconnect(false);};CometTransport.prototype._requestCloseOrDisconnect=function(closing){var closeOrDisconnectUri=closing?this.closeUri:this.disconnectUri;if(closeOrDisconnectUri){var self=this,request=this.createRequest(closeOrDisconnectUri,null,this.authParams,null,REQ_SEND);request.on('complete',function(err){if(err){Logger.logAction(Logger.LOG_ERROR,'CometTransport.request'+(closing?'Close()':'Disconnect()'),'request returned err = '+err);self.finish('disconnected',err);}});request.exec();}};CometTransport.prototype.dispose=function(){Logger.logAction(Logger.LOG_MINOR,'CometTransport.dispose()','');if(!this.disposed){this.disposed=true;if(this.recvRequest){Logger.logAction(Logger.LOG_MINOR,'CometTransport.dispose()','aborting recv request');this.recvRequest.abort();this.recvRequest=null;}/* In almost all cases the transport will be finished before it's
				* disposed. Finish here just to make sure. */this.finish('disconnected',ConnectionError.disconnected);var self=this;Utils.nextTick(function(){self.emit('disposed');});}};CometTransport.prototype.onConnect=function(message){/* if this transport has been disposed whilst awaiting connection, do nothing */if(this.disposed)return;/* the connectionKey in a comet connected response is really
			* <instId>-<connectionKey> */var connectionStr=message.connectionKey;Transport.prototype.onConnect.call(this,message);var baseConnectionUri=this.baseUri+connectionStr;Logger.logAction(Logger.LOG_MICRO,'CometTransport.onConnect()','baseUri = '+baseConnectionUri+'; connectionKey = '+message.connectionKey);this.sendUri=baseConnectionUri+'/send';this.recvUri=baseConnectionUri+'/recv';this.closeUri=baseConnectionUri+'/close';this.disconnectUri=baseConnectionUri+'/disconnect';};CometTransport.prototype.send=function(message){if(this.sendRequest){/* there is a pending send, so queue this message */this.pendingItems=this.pendingItems||[];this.pendingItems.push(message);return;}/* send this, plus any pending, now */var pendingItems=this.pendingItems||[];pendingItems.push(message);this.pendingItems=null;this.sendItems(pendingItems);};CometTransport.prototype.sendAnyPending=function(){var pendingItems=this.pendingItems;if(!pendingItems){return;}this.pendingItems=null;this.sendItems(pendingItems);};CometTransport.prototype.sendItems=function(items){var self=this,sendRequest=this.sendRequest=self.createRequest(self.sendUri,null,self.authParams,this.encodeRequest(items),REQ_SEND);sendRequest.on('complete',function(err,data){if(err)Logger.logAction(Logger.LOG_ERROR,'CometTransport.sendItems()','on complete: err = '+JSON.stringify(err));self.sendRequest=null;/* the results of the request usually get handled as protocol responses instead of send errors */if(data){self.onData(data);}else if(err&&err.code){/* A protocol error received from realtime. TODO: once realtime
					* consistendly sends errors wrapped in protocol messages, should be
					* able to remove this */self.onData(protocolMessageFromRawError(err));}else{/* A network/xhr error. Don't bother wrapping in a protocol message,
					* just disconnect the transport */self.disconnect(err);}if(self.pendingItems){Utils.nextTick(function(){/* If there's a new send request by now, any pending items will have
						* been picked up by that; any new ones added since then will be
						* picked up after that one completes */if(!self.sendRequest){self.sendAnyPending();}});}});sendRequest.exec();};CometTransport.prototype.recv=function(){/* do nothing if there is an active request, which might be streaming */if(this.recvRequest)return;/* If we're no longer connected, do nothing */if(!this.isConnected)return;var self=this,recvRequest=this.recvRequest=this.createRequest(this.recvUri,null,this.authParams,null,self.stream?REQ_RECV_STREAM:REQ_RECV_POLL);recvRequest.on('data',function(data){self.onData(data);});recvRequest.on('complete',function(err){self.recvRequest=null;if(this.maxIdleInterval){/* A request completing must be considered activity, as realtime sends
					* heartbeats every 15s since a request began, not every 15s absolutely */this.setIdleTimer();}if(err){if(err.code){/* A protocol error received from realtime. TODO: once realtime
						* consistendly sends errors wrapped in protocol messages, should be
						* able to remove this */self.onData(protocolMessageFromRawError(err));}else{/* A network/xhr error. Don't bother wrapping in a protocol message,
						* just disconnect the transport */self.disconnect(err);}return;}Utils.nextTick(function(){self.recv();});});recvRequest.exec();};CometTransport.prototype.onData=function(responseData){try{var items=this.decodeResponse(responseData);if(items&&items.length)for(var i=0;i<items.length;i++){this.onProtocolMessage(ProtocolMessage.fromDeserialized(items[i]));}}catch(e){Logger.logAction(Logger.LOG_ERROR,'CometTransport.onData()','Unexpected exception handing channel event: '+e.stack);}};CometTransport.prototype.encodeRequest=function(requestItems){return JSON.stringify(requestItems);};CometTransport.prototype.decodeResponse=function(responseData){if(typeof responseData=='string')responseData=JSON.parse(responseData);return responseData;};/* For comet, we could do the auth update by aborting the current recv and
		* starting a new one with the new token, that'd be sufficient for realtime.
		* Problem is JSONP - you can't cancel truly abort a recv once started. So
		* we need to send an AUTH for jsonp. In which case it's simpler to keep all
		* comet transports the same and do it for all of them. So we send the AUTH
		* instead, and don't need to abort the recv */CometTransport.prototype.onAuthUpdated=function(tokenDetails){this.authParams={access_token:tokenDetails.token};};return CometTransport;}();var Presence=function(){function noop(){}function Presence(channel){this.channel=channel;this.basePath=channel.basePath+'/presence';}Utils.inherits(Presence,EventEmitter);Presence.prototype.get=function(params,callback){Logger.logAction(Logger.LOG_MICRO,'Presence.get()','channel = '+this.channel.name);/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}var rest=this.channel.rest,format=rest.options.useBinaryProtocol?'msgpack':'json',envelope=Http.supportsLinkHeaders?undefined:format,headers=Utils.copy(Utils.defaultGetHeaders(format));if(rest.options.headers)Utils.mixin(headers,rest.options.headers);var options=this.channel.channelOptions;new PaginatedResource(rest,this.basePath,headers,envelope,function(body,headers,unpacked){return PresenceMessage.fromResponseBody(body,options,!unpacked&&format);}).get(params,callback);};Presence.prototype.history=function(params,callback){Logger.logAction(Logger.LOG_MICRO,'Presence.history()','channel = '+this.channel.name);this._history(params,callback);};Presence.prototype._history=function(params,callback){/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}var rest=this.channel.rest,format=rest.options.useBinaryProtocol?'msgpack':'json',envelope=Http.supportsLinkHeaders?undefined:format,headers=Utils.copy(Utils.defaultGetHeaders(format)),channel=this.channel;if(rest.options.headers)Utils.mixin(headers,rest.options.headers);var options=this.channel.channelOptions;new PaginatedResource(rest,this.basePath+'/history',headers,envelope,function(body,headers,unpacked){return PresenceMessage.fromResponseBody(body,options,!unpacked&&format);}).get(params,callback);};return Presence;}();var Resource=function(){var msgpack=Platform.msgpack;function Resource(){}function withAuthDetails(rest,headers,params,errCallback,opCallback){if(Http.supportsAuthHeaders){rest.auth.getAuthHeaders(function(err,authHeaders){if(err)errCallback(err);else opCallback(Utils.mixin(authHeaders,headers),params);});}else{rest.auth.getAuthParams(function(err,authParams){if(err)errCallback(err);else opCallback(headers,Utils.mixin(authParams,params));});}}function unenvelope(callback,format){return function(err,body,headers,unpacked,statusCode){if(err){callback(err);return;}if(!unpacked){try{body=format=='msgpack'?msgpack.decode(body):JSON.parse(body);}catch(e){callback(e);return;}}if(body.statusCode===undefined){/* Envelope already unwrapped by the transport */callback(err,body,headers,true,statusCode);return;}var statusCode=body.statusCode,response=body.response,headers=body.headers;if(statusCode<200||statusCode>=300){/* handle wrapped errors */var err=response&&response.error;if(!err){err=new Error(String(res));err.statusCode=statusCode;}callback(err);return;}callback(null,response,headers,true,statusCode);};}function paramString(params){var paramPairs=[];if(params){for(var needle in params){paramPairs.push(needle+'='+params[needle]);}}return paramPairs.join('&');}function urlFromPathAndParams(path,params){return path+(params?'?':'')+paramString(params);}function logResponseHandler(callback,verb,path,params){return function(err,body,headers,unpacked,statusCode){if(err){Logger.logAction(Logger.LOG_MICRO,'Resource.'+verb+'()','Received Error; '+urlFromPathAndParams(path,params)+'; Error: '+JSON.stringify(err));}else{Logger.logAction(Logger.LOG_MICRO,'Resource.'+verb+'()','Received; '+urlFromPathAndParams(path,params)+'; Headers: '+paramString(headers)+'; StatusCode: '+statusCode+'; Body: '+(BufferUtils.isBuffer(body)?body.toString():body));}if(callback){callback(err,body,headers,unpacked,statusCode);}};}Resource.get=function(rest,path,origheaders,origparams,envelope,callback){if(Logger.shouldLog(Logger.LOG_MICRO)){callback=logResponseHandler(callback,'get',path,origparams);}if(envelope){callback=callback&&unenvelope(callback,envelope);(origparams=origparams||{})['envelope']=envelope;}function doGet(headers,params){if(Logger.shouldLog(Logger.LOG_MICRO)){Logger.logAction(Logger.LOG_MICRO,'Resource.get()','Sending; '+urlFromPathAndParams(path,params));}Http.get(rest,path,headers,params,function(err,res,headers,unpacked,statusCode){if(err&&Auth.isTokenErr(err)){/* token has expired, so get a new one */rest.auth.authorize(null,null,function(err){if(err){callback(err);return;}/* retry ... */withAuthDetails(rest,origheaders,origparams,callback,doGet);});return;}callback(err,res,headers,unpacked,statusCode);});}withAuthDetails(rest,origheaders,origparams,callback,doGet);};Resource.post=function(rest,path,body,origheaders,origparams,envelope,callback){if(Logger.shouldLog(Logger.LOG_MICRO)){callback=logResponseHandler(callback,'post',path,origparams);}if(envelope){callback=unenvelope(callback,envelope);origparams['envelope']=envelope;}function doPost(headers,params){if(Logger.shouldLog(Logger.LOG_MICRO)){var decodedBody=body;if((headers['content-type']||'').indexOf('msgpack')>0){try{body=msgpack.decode(body);}catch(decodeErr){Logger.logAction(Logger.LOG_MICRO,'Resource.post()','Sending MsgPack Decoding Error: '+JSON.stringify(decodeErr));}}Logger.logAction(Logger.LOG_MICRO,'Resource.post()','Sending; '+urlFromPathAndParams(path,params)+'; Body: '+decodedBody);}Http.post(rest,path,headers,body,params,function(err,res,headers,unpacked,statusCode){if(err&&Auth.isTokenErr(err)){/* token has expired, so get a new one */rest.auth.authorize(null,null,function(err){if(err){callback(err);return;}/* retry ... */withAuthDetails(rest,origheaders,origparams,callback,doPost);});return;}callback(err,res,headers,unpacked,statusCode);});}withAuthDetails(rest,origheaders,origparams,callback,doPost);};return Resource;}();var PaginatedResource=function(){function getRelParams(linkUrl){var urlMatch=linkUrl.match(/^\.\/(\w+)\?(.*)$/);return urlMatch&&Utils.parseQueryString(urlMatch[2]);}function parseRelLinks(linkHeader){if(typeof linkHeader=='string')linkHeader=linkHeader.split(',');var relParams={};for(var i=0;i<linkHeader.length;i++){var linkMatch=linkHeader[i].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);if(linkMatch){var params=getRelParams(linkMatch[1]);if(params)relParams[linkMatch[2]]=params;}}return relParams;}function PaginatedResource(rest,path,headers,envelope,bodyHandler,useHttpPaginatedResponse){this.rest=rest;this.path=path;this.headers=headers;this.envelope=envelope;this.bodyHandler=bodyHandler;this.useHttpPaginatedResponse=useHttpPaginatedResponse||false;}PaginatedResource.prototype.get=function(params,callback){var self=this;Resource.get(self.rest,self.path,self.headers,params,self.envelope,function(err,body,headers,unpacked,statusCode){self.handlePage(err,body,headers,unpacked,statusCode,callback);});};PaginatedResource.prototype.post=function(params,body,callback){var self=this;Resource.post(self.rest,self.path,body,self.headers,params,self.envelope,function(err,resbody,headers,unpacked,statusCode){if(callback)self.handlePage(err,resbody,headers,unpacked,statusCode,callback);});};PaginatedResource.prototype.handlePage=function(err,body,headers,unpacked,statusCode,callback){if(err){Logger.logAction(Logger.LOG_ERROR,'PaginatedResource.handlePage()','Unexpected error getting resource: err = '+JSON.stringify(err));callback(err);return;}var items,linkHeader,relParams;try{items=this.bodyHandler(body,headers,unpacked);}catch(e){callback(e);return;}if(headers&&(linkHeader=headers['Link']||headers['link'])){relParams=parseRelLinks(linkHeader);}if(this.useHttpPaginatedResponse){callback(null,new HttpPaginatedResponse(this,items,headers,statusCode,relParams));}else{callback(null,new PaginatedResult(this,items,relParams));}};function PaginatedResult(resource,items,relParams){this.resource=resource;this.items=items;if(relParams){var self=this;if('first'in relParams)this.first=function(cb){self.get(relParams.first,cb);};if('current'in relParams)this.current=function(cb){self.get(relParams.current,cb);};this.next=function(cb){if('next'in relParams)self.get(relParams.next,cb);else cb(null,null);};this.hasNext=function(){return'next'in relParams;};this.isLast=function(){return!this.hasNext();};}}/* We assume that only the initial request can be a POST, and that accessing
		* the rest of a multipage set of results can always be done with GET */PaginatedResult.prototype.get=function(params,callback){var res=this.resource;Resource.get(res.rest,res.path,res.headers,params,res.envelope,function(err,body,headers,unpacked,statusCode){res.handlePage(err,body,headers,unpacked,statusCode,callback);});};function HttpPaginatedResponse(resource,items,headers,statusCode,relParams){PaginatedResult.call(this,resource,items,relParams);this.statusCode=statusCode;this.success=statusCode<300&&statusCode>=200;this.headers=headers;/* Note: we don't populate errorCode or errorMessage: for consistency with
			* the way the rest of the js library works, error data is passed as
			* ErrorInfos to the err argument of the callback; an  HttpPaginatedResponse
			* is only ever passed to the callback if there was no error */}Utils.inherits(HttpPaginatedResponse,PaginatedResult);return PaginatedResource;}();var Auth=function(){var msgpack=Platform.msgpack;var MAX_TOKENOBJECT_LENGTH=Math.pow(2,17);var MAX_TOKENSTRING_LENGTH=384;function noop(){}function random(){return('000000'+Math.floor(Math.random()*1E16)).slice(-16);}var hmac,toBase64;if(Platform.createHmac){toBase64=function toBase64(str){return new Buffer(str,'ascii').toString('base64');};hmac=function hmac(text,key){var inst=Platform.createHmac('SHA256',key);inst.update(text);return inst.digest('base64');};}else{toBase64=Base64.encode;hmac=function hmac(text,key){return CryptoJS.HmacSHA256(text,key).toString(CryptoJS.enc.Base64);};}function c14n(capability){if(!capability)return'';if(typeof capability=='string')capability=JSON.parse(capability);var c14nCapability={};var keys=Utils.keysArray(capability,true);if(!keys)return'';keys.sort();for(var i=0;i<keys.length;i++){c14nCapability[keys[i]]=capability[keys[i]].sort();}return JSON.stringify(c14nCapability);}function logAndValidateTokenAuthMethod(authOptions){if(authOptions.authCallback){Logger.logAction(Logger.LOG_MINOR,'Auth()','using token auth with authCallback');}else if(authOptions.authUrl){Logger.logAction(Logger.LOG_MINOR,'Auth()','using token auth with authUrl');}else if(authOptions.key){Logger.logAction(Logger.LOG_MINOR,'Auth()','using token auth with client-side signing');}else if(authOptions.tokenDetails){Logger.logAction(Logger.LOG_MINOR,'Auth()','using token auth with supplied token only');}else{var msg='authOptions must include valid authentication parameters';Logger.logAction(Logger.LOG_ERROR,'Auth()',msg);throw new Error(msg);}}function basicAuthForced(options){return'useTokenAuth'in options&&!options.useTokenAuth;}/* RSA4 */function useTokenAuth(options){return options.useTokenAuth||!basicAuthForced(options)&&(options.clientId||options.authCallback||options.authUrl||options.token||options.tokenDetails);}function Auth(client,options){this.client=client;this.tokenParams=options.defaultTokenParams||{};if(useTokenAuth(options)){/* Token auth */if(options.key&&!hmac){var msg='client-side token request signing not supported';Logger.logAction(Logger.LOG_ERROR,'Auth()',msg);throw new Error(msg);}this._saveTokenOptions(options.defaultTokenParams,options);logAndValidateTokenAuthMethod(this.authOptions);}else{/* Basic auth */if(options.clientId||!options.key){var msg='Cannot authenticate with basic auth'+(options.clientId?' as a clientId implies token auth':!options.key?' as no key was given':'');Logger.logAction(Logger.LOG_ERROR,'Auth()',msg);throw new Error(msg);}Logger.logAction(Logger.LOG_MINOR,'Auth()','anonymous, using basic auth');this._saveBasicOptions(options);}}/**
		* Instructs the library to get a token immediately and ensures Token Auth
		* is used for all future requests, storing the tokenParams and authOptions
		* given as the new defaults for subsequent use.
		*
		* @param tokenParams
		* an object containing the parameters for the requested token:
		*
		* - ttl:        (optional) the requested life of any new token in ms. If none
		*               is specified a default of 1 hour is provided. The maximum lifetime
		*               is 24hours; any request exceeeding that lifetime will be rejected
		*               with an error.
		*
		* - capability: (optional) the capability to associate with the access token.
		*               If none is specified, a token will be requested with all of the
		*               capabilities of the specified key.
		*
		* - clientId:   (optional) a client Id to associate with the token
		*
		* - timestamp:  (optional) the time in ms since the epoch. If none is specified,
		*               the system will be queried for a time value to use.
		*
		* @param authOptions
		* an object containing auth options relevant to token auth:
		*
		* - queryTime   (optional) boolean indicating that the Ably system should be
		*               queried for the current time when none is specified explicitly.
		*
		* - tokenDetails: (optional) object: An authenticated TokenDetails object.
		*
		* - token:        (optional) string: the `token` property of a tokenDetails object
		*
		* - authCallback:  (optional) a javascript callback to be called to get auth information.
		*                  authCallback should be a function of (tokenParams, callback) that calls
		*                  the callback with (err, result), where result is any of:
		*                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
		*                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
		*                  - a token string
		*
		* - authUrl:       (optional) a URL to be used to GET or POST a set of token request
		*                  params, to obtain a signed token request.
		*
		* - authHeaders:   (optional) a set of application-specific headers to be added to any request
		*                  made to the authUrl.
		*
		* - authParams:    (optional) a set of application-specific query params to be added to any
		*                  request made to the authUrl.
		*
		*
		* - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
		*                  requestToken request
		*
		* @param callback (err, tokenDetails)
		*/Auth.prototype.authorize=function(tokenParams,authOptions,callback){/* shuffle and normalise arguments as necessary */if(typeof tokenParams=='function'&&!callback){callback=tokenParams;authOptions=tokenParams=null;}else if(typeof authOptions=='function'&&!callback){callback=authOptions;authOptions=null;}callback=callback||noop;var self=this;/* RSA10a: authorize() call implies token auth. If a key is passed it, we
			* just check if it doesn't clash and assume we're generating a token from it */if(authOptions&&authOptions.key&&this.key!==authOptions.key){throw new ErrorInfo('Unable to update auth options with incompatible key',40102,401);}if(authOptions&&'force'in authOptions){Logger.logAction(Logger.LOG_ERROR,'Auth.authorize','Deprecation warning: specifying {force: true} in authOptions is no longer necessary, authorize() now always gets a new token. Please remove this, as in version 1.0 and later, having a non-null authOptions will overwrite stored library authOptions, which may not be what you want');/* Emulate the old behaviour: if 'force' was the only member of authOptions,
				* set it to null so it doesn't overwrite stored. TODO: remove in version 1.0 */if(Utils.isOnlyPropIn(authOptions,'force')){authOptions=null;}}this._forceNewToken(tokenParams,authOptions,function(err,tokenDetails){if(err){callback(err);return;}/* RTC8
				* - When authorize called by an end user and have a realtime connection,
				* don't call back till new token has taken effect.
				* - Use self.client.connection as a proxy for (self.client instanceof Realtime),
				* which doesn't work in node as Realtime isn't part of the vm context for Rest clients */if(self.client.connection){self.client.connection.connectionManager.onAuthUpdated(tokenDetails,callback);}else{callback(null,tokenDetails);}});};Auth.prototype.authorise=function(){Logger.deprecated('Auth.authorise','Auth.authorize');this.authorize.apply(this,arguments);};/* For internal use, eg by connectionManager - useful when want to call back
		* as soon as we have the new token, rather than waiting for it to take
		* effect on the connection as #authorize does */Auth.prototype._forceNewToken=function(tokenParams,authOptions,callback){var self=this;/* get rid of current token even if still valid */this.tokenDetails=null;/* _save normalises the tokenParams and authOptions and updates the auth
			* object. All subsequent operations should use the values on `this`,
			* not the passed in ones. */this._saveTokenOptions(tokenParams,authOptions);logAndValidateTokenAuthMethod(this.authOptions);this._ensureValidAuthCredentials(function(err,tokenDetails){/* RSA10g */delete self.tokenParams.timestamp;delete self.authOptions.queryTime;callback(err,tokenDetails);});};/**
		* Request an access token
		* @param authOptions
		* an object containing the request options:
		* - key:           the key to use.
		*
		* - authCallback:  (optional) a javascript callback to be called to get auth information.
		*                  authCallback should be a function of (tokenParams, callback) that calls
		*                  the callback with (err, result), where result is any of:
		*                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
		*                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
		*                  - a token string
		*
		* - authUrl:       (optional) a URL to be used to GET or POST a set of token request
		*                  params, to obtain a signed token request.
		*
		* - authHeaders:   (optional) a set of application-specific headers to be added to any request
		*                  made to the authUrl.
		*
		* - authParams:    (optional) a set of application-specific query params to be added to any
		*                  request made to the authUrl.
		*
		* - queryTime      (optional) boolean indicating that the ably system should be
		*                  queried for the current time when none is specified explicitly
		*
		* - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
		*                  requestToken request
		*
		* @param tokenParams
		* an object containing the parameters for the requested token:
		* - ttl:          (optional) the requested life of the token in milliseconds. If none is specified
		*                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
		*                  exceeeding that lifetime will be rejected with an error.
		*
		* - capability:    (optional) the capability to associate with the access token.
		*                  If none is specified, a token will be requested with all of the
		*                  capabilities of the specified key.
		*
		* - clientId:      (optional) a client Id to associate with the token; if not
		*                  specified, a clientId passed in constructing the Rest interface will be used
		*
		* - timestamp:     (optional) the time in ms since the epoch. If none is specified,
		*                  the system will be queried for a time value to use.
		*
		* @param callback (err, tokenDetails)
		*/Auth.prototype.requestToken=function(tokenParams,authOptions,callback){/* shuffle and normalise arguments as necessary */if(typeof tokenParams=='function'&&!callback){callback=tokenParams;authOptions=tokenParams=null;}else if(typeof authOptions=='function'&&!callback){callback=authOptions;authOptions=null;}/* RSA8e: if authOptions passed in, they're used instead of stored, don't merge them */authOptions=authOptions||this.authOptions;tokenParams=tokenParams||Utils.copy(this.tokenParams);callback=callback||noop;var format=authOptions.format||'json';/* first set up whatever callback will be used to get signed
			* token requests */var tokenRequestCallback,client=this.client;if(authOptions.authCallback){Logger.logAction(Logger.LOG_MINOR,'Auth.requestToken()','using token auth with authCallback');tokenRequestCallback=authOptions.authCallback;}else if(authOptions.authUrl){Logger.logAction(Logger.LOG_MINOR,'Auth.requestToken()','using token auth with authUrl');/* if no authParams given, check if they were given in the URL */if(!authOptions.authParams){var queryIdx=authOptions.authUrl.indexOf('?');if(queryIdx>-1){authOptions.authParams=Utils.parseQueryString(authOptions.authUrl.slice(queryIdx));authOptions.authUrl=authOptions.authUrl.slice(0,queryIdx);}}tokenRequestCallback=function tokenRequestCallback(params,cb){var authHeaders=Utils.mixin({accept:'application/json, text/plain'},authOptions.authHeaders),authParams=Utils.mixin(params,authOptions.authParams);var authUrlRequestCallback=function authUrlRequestCallback(err,body,headers,unpacked){if(err){Logger.logAction(Logger.LOG_MICRO,'Auth.requestToken().tokenRequestCallback','Received Error; '+JSON.stringify(err));}else{Logger.logAction(Logger.LOG_MICRO,'Auth.requestToken().tokenRequestCallback','Received; body: '+(BufferUtils.isBuffer(body)?body.toString():body));}if(err||unpacked)return cb(err,body);if(BufferUtils.isBuffer(body))body=body.toString();var contentType=headers['content-type'];if(!contentType){cb(new ErrorInfo('authUrl response is missing a content-type header',40170,401));return;}var json=contentType.indexOf('application/json')>-1,text=contentType.indexOf('text/plain')>-1;if(!json&&!text){cb(new ErrorInfo('authUrl responded with unacceptable content-type '+contentType+', should be either text/plain or application/json',40170,401));return;}if(json){if(body.length>MAX_TOKENOBJECT_LENGTH){cb(new ErrorInfo('authUrl response exceeded max permitted length',40170,401));return;}try{body=JSON.parse(body);}catch(e){cb(new ErrorInfo('Unexpected error processing authURL response; err = '+e.message,40170,401));return;}}cb(null,body);};Logger.logAction(Logger.LOG_MICRO,'Auth.requestToken().tokenRequestCallback','Sending; '+authOptions.authUrl+'; Params: '+JSON.stringify(authParams));if(authOptions.authMethod&&authOptions.authMethod.toLowerCase()==='post'){/* send body form-encoded */var headers=authHeaders||{};headers['content-type']='application/x-www-form-urlencoded';var body=Utils.toQueryString(authParams).slice(1);/* slice is to remove the initial '?' */Http.postUri(client,authOptions.authUrl,headers,body,{},authUrlRequestCallback);}else{Http.getUri(client,authOptions.authUrl,authHeaders||{},authParams,authUrlRequestCallback);}};}else if(authOptions.key){var self=this;Logger.logAction(Logger.LOG_MINOR,'Auth.requestToken()','using token auth with client-side signing');tokenRequestCallback=function tokenRequestCallback(params,cb){self.createTokenRequest(params,authOptions,cb);};}else{var msg="Need a new token, but authOptions does not include any way to request one";Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()',msg);callback(new ErrorInfo(msg,40101,401));return;}/* normalise token params */if('capability'in tokenParams)tokenParams.capability=c14n(tokenParams.capability);var client=this.client;var tokenRequest=function tokenRequest(signedTokenParams,tokenCb){var keyName=signedTokenParams.keyName,tokenUri=function tokenUri(host){return client.baseUri(host)+'/keys/'+keyName+'/requestToken';};var requestHeaders=Utils.defaultPostHeaders(format);if(authOptions.requestHeaders)Utils.mixin(requestHeaders,authOptions.requestHeaders);Logger.logAction(Logger.LOG_MICRO,'Auth.requestToken().requestToken','Sending POST; '+tokenUri+'; Token params: '+JSON.stringify(signedTokenParams));signedTokenParams=format=='msgpack'?msgpack.encode(signedTokenParams,true):JSON.stringify(signedTokenParams);Http.post(client,tokenUri,requestHeaders,signedTokenParams,null,tokenCb);};var tokenRequestCallbackTimeoutExpired=false,timeoutLength=this.client.options.timeouts.realtimeRequestTimeout,tokenRequestCallbackTimeout=setTimeout(function(){tokenRequestCallbackTimeoutExpired=true;var msg='Token request callback timed out after '+timeoutLength/1000+' seconds';Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()',msg);callback(new ErrorInfo(msg,40170,401));},timeoutLength);tokenRequestCallback(tokenParams,function(err,tokenRequestOrDetails){if(tokenRequestCallbackTimeoutExpired)return;clearTimeout(tokenRequestCallbackTimeout);if(err){Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()','token request signing call returned error; err = '+Utils.inspectError(err));if(!(err&&err.code)){/* network errors don't have an error code, so assign them
						* 40170 so they'll by connectionManager as nonfatal */err=new ErrorInfo(Utils.inspectError(err),40170,401);}callback(err);return;}/* the response from the callback might be a token string, a signed request or a token details */if(typeof tokenRequestOrDetails==='string'){if(tokenRequestOrDetails.length>MAX_TOKENSTRING_LENGTH){callback(new ErrorInfo('Token string exceeded max permitted length (was '+tokenRequestOrDetails.length+' bytes)',40170,401));}else{callback(null,{token:tokenRequestOrDetails});}return;}if((typeof tokenRequestOrDetails==="undefined"?"undefined":_typeof(tokenRequestOrDetails))!=='object'){var msg='Expected token request callback to call back with a token string or token request/details object, but got a '+(typeof tokenRequestOrDetails==="undefined"?"undefined":_typeof(tokenRequestOrDetails));Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()',msg);callback(new ErrorInfo(msg,40170,401));return;}var objectSize=JSON.stringify(tokenRequestOrDetails).length;if(objectSize>MAX_TOKENOBJECT_LENGTH){callback(new ErrorInfo('Token request/details object exceeded max permitted stringified size (was '+objectSize+' bytes)',40170,401));return;}if('issued'in tokenRequestOrDetails){/* a tokenDetails object */callback(null,tokenRequestOrDetails);return;}if(!('keyName'in tokenRequestOrDetails)){var msg='Expected token request callback to call back with a token string, token request object, or token details object';Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()',msg);callback(new ErrorInfo(msg,40170,401));return;}/* it's a token request, so make the request */tokenRequest(tokenRequestOrDetails,function(err,tokenResponse,headers,unpacked){if(err){Logger.logAction(Logger.LOG_ERROR,'Auth.requestToken()','token request API call returned error; err = '+Utils.inspectError(err));callback(err);return;}if(!unpacked)tokenResponse=format=='msgpack'?msgpack.decode(tokenResponse):JSON.parse(tokenResponse);Logger.logAction(Logger.LOG_MINOR,'Auth.getToken()','token received');callback(null,tokenResponse);});});};/**
		* Create and sign a token request based on the given options.
		* NOTE this can only be used when the key value is available locally.
		* Otherwise, signed token requests must be obtained from the key
		* owner (either using the token request callback or url).
		*
		* @param authOptions
		* an object containing the request options:
		* - key:           the key to use. If not specified, a key passed in constructing
		*                  the Rest interface will be used
		*
		* - queryTime      (optional) boolean indicating that the ably system should be
		*                  queried for the current time when none is specified explicitly
		*
		* - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
		*                  requestToken request
		*
		* @param tokenParams
		* an object containing the parameters for the requested token:
		* - ttl:       (optional) the requested life of the token in ms. If none is specified
		*                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
		*                  exceeeding that lifetime will be rejected with an error.
		*
		* - capability:    (optional) the capability to associate with the access token.
		*                  If none is specified, a token will be requested with all of the
		*                  capabilities of the specified key.
		*
		* - clientId:      (optional) a client Id to associate with the token; if not
		*                  specified, a clientId passed in constructing the Rest interface will be used
		*
		* - timestamp:     (optional) the time in ms since the epoch. If none is specified,
		*                  the system will be queried for a time value to use.
		*
		*/Auth.prototype.createTokenRequest=function(tokenParams,authOptions,callback){/* shuffle and normalise arguments as necessary */if(typeof tokenParams=='function'&&!callback){callback=tokenParams;authOptions=tokenParams=null;}else if(typeof authOptions=='function'&&!callback){callback=authOptions;authOptions=null;}/* RSA9h: if authOptions passed in, they're used instead of stored, don't merge them */authOptions=authOptions||this.authOptions;tokenParams=tokenParams||Utils.copy(this.tokenParams);var key=authOptions.key;if(!key){callback(new Error('No key specified'));return;}var keyParts=key.split(':'),keyName=keyParts[0],keySecret=keyParts[1];if(!keySecret){callback(new Error('Invalid key specified'));return;}if(tokenParams.clientId===''){callback(new ErrorInfo('clientId can’t be an empty string',40012,400));return;}tokenParams.capability=c14n(tokenParams.capability);var request=Utils.mixin({keyName:keyName},tokenParams),clientId=tokenParams.clientId||'',ttl=tokenParams.ttl||'',capability=tokenParams.capability,self=this;(function(authoriseCb){if(request.timestamp){authoriseCb();return;};self.getTimestamp(authOptions&&authOptions.queryTime,function(err,time){if(err){callback(err);return;}request.timestamp=time;authoriseCb();});})(function(){/* nonce *//* NOTE: there is no expectation that the client
				* specifies the nonce; this is done by the library
				* However, this can be overridden by the client
				* simply for testing purposes. */var nonce=request.nonce||(request.nonce=random()),timestamp=request.timestamp;var signText=request.keyName+'\n'+ttl+'\n'+capability+'\n'+clientId+'\n'+timestamp+'\n'+nonce+'\n';/* mac *//* NOTE: there is no expectation that the client
				* specifies the mac; this is done by the library
				* However, this can be overridden by the client
				* simply for testing purposes. */request.mac=request.mac||hmac(signText,keySecret);Logger.logAction(Logger.LOG_MINOR,'Auth.getTokenRequest()','generated signed request');callback(null,request);});};/**
		* Get the auth query params to use for a websocket connection,
		* based on the current auth parameters
		*/Auth.prototype.getAuthParams=function(callback){if(this.method=='basic')callback(null,{key:this.key});else this._ensureValidAuthCredentials(function(err,tokenDetails){if(err){callback(err);return;}callback(null,{access_token:tokenDetails.token});});};/**
		* Get the authorization header to use for a REST or comet request,
		* based on the current auth parameters
		*/Auth.prototype.getAuthHeaders=function(callback){if(this.method=='basic'){callback(null,{authorization:'Basic '+this.basicKey});}else{this._ensureValidAuthCredentials(function(err,tokenDetails){if(err){callback(err);return;}callback(null,{authorization:'Bearer '+toBase64(tokenDetails.token)});});}};/**
		* Get the current time based on the local clock,
		* or if the option queryTime is true, return the server time.
		* The server time offset from the local time is stored so that
		* only one request to the server to get the time is ever needed
		*/Auth.prototype.getTimestamp=function(queryTime,callback){var offsetSet=!isNaN(parseInt(this.client.serverTimeOffset));if(!offsetSet&&(queryTime||this.authOptions.queryTime)){this.client.time(function(err,time){if(err){callback(err);return;}callback(null,time);});}else{callback(null,Utils.now()+(this.client.serverTimeOffset||0));}};Auth.prototype._saveBasicOptions=function(authOptions){this.method='basic';this.key=authOptions.key;this.basicKey=toBase64(authOptions.key);this.authOptions=authOptions||{};if('clientId'in authOptions){this._userSetClientId(authOptions.clientId);}};Auth.prototype._saveTokenOptions=function(tokenParams,authOptions){this.method='token';if(tokenParams){/* We temporarily persist tokenParams.timestamp in case a new token needs
				* to be requested, then null it out in the callback of
				* _ensureValidAuthCredentials for RSA10g compliance */this.tokenParams=tokenParams;}if(authOptions){/* normalise */if(authOptions.token){/* options.token may contain a token string or, for convenience, a TokenDetails */authOptions.tokenDetails=typeof authOptions.token==='string'?{token:authOptions.token}:authOptions.token;}if(authOptions.tokenDetails){this.tokenDetails=authOptions.tokenDetails;}if('clientId'in authOptions){this._userSetClientId(authOptions.clientId);}this.authOptions=authOptions;}};Auth.prototype._ensureValidAuthCredentials=function(callback){var self=this,token=this.tokenDetails;var requestToken=function requestToken(){self.requestToken(self.tokenParams,self.authOptions,function(err,tokenResponse){if(err){callback(err);return;}callback(null,self.tokenDetails=tokenResponse);});};if(token){if(this._tokenClientIdMismatch(token.clientId)){callback(new ErrorInfo('Mismatch between clientId in token ('+token.clientId+') and current clientId ('+this.clientId+')',40102,401));return;}this.getTimestamp(self.authOptions&&self.authOptions.queryTime,function(err,time){if(err)callback(err);if(token.expires===undefined||token.expires>=time){Logger.logAction(Logger.LOG_MINOR,'Auth.getToken()','using cached token; expires = '+token.expires);callback(null,token);return;}else{/* expired, so remove */Logger.logAction(Logger.LOG_MINOR,'Auth.getToken()','deleting expired token');self.tokenDetails=null;}requestToken();});}else{requestToken();}};/* User-set: check types, '*' is disallowed, throw any errors */Auth.prototype._userSetClientId=function(clientId){if(!(typeof clientId==='string'||clientId===null)){throw new ErrorInfo('clientId must be either a string or null',40012,400);}else if(clientId==='*'){throw new ErrorInfo('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)',40012,400);}else{var err=this._uncheckedSetClientId(clientId);if(err)throw err;}};/* Ably-set: no typechecking, '*' is allowed but not set on this.clientId), return errors to the caller */Auth.prototype._uncheckedSetClientId=function(clientId){if(this._tokenClientIdMismatch(clientId)){/* Should never happen in normal circumstances as realtime should
				* recognise mismatch and return an error */var msg='Unexpected clientId mismatch: client has '+this.clientId+', requested '+clientId;var err=new ErrorInfo(msg,40102,401);Logger.logAction(Logger.LOG_ERROR,'Auth._uncheckedSetClientId()',msg);return err;}else if(clientId==='*'){this.tokenParams.clientId=clientId;}else{/* RSA7a4: if options.clientId is provided and is not
				* null, it overrides defaultTokenParams.clientId */this.clientId=this.tokenParams.clientId=clientId;return null;}};Auth.prototype._tokenClientIdMismatch=function(tokenClientId){return this.clientId&&tokenClientId&&tokenClientId!=='*'&&this.clientId!==tokenClientId;};Auth.isTokenErr=function(error){return error.code&&error.code>=40140&&error.code<40150;};return Auth;}();var Rest=function(){var noop=function noop(){};function Rest(options){if(!(this instanceof Rest)){return new Rest(options);}/* normalise options */if(!options){var msg='no options provided';Logger.logAction(Logger.LOG_ERROR,'Rest()',msg);throw new Error(msg);}if(typeof options=='string'){options=options.indexOf(':')==-1?{token:options}:{key:options};}this.options=Defaults.normaliseOptions(options);/* process options */if(options.key){var keyMatch=options.key.match(/^([^:\s]+):([^:.\s]+)$/);if(!keyMatch){var msg='invalid key parameter';Logger.logAction(Logger.LOG_ERROR,'Rest()',msg);throw new Error(msg);}options.keyName=keyMatch[1];options.keySecret=keyMatch[2];}if('clientId'in options){if(!(typeof options.clientId==='string'||options.clientId===null))throw new ErrorInfo('clientId must be either a string or null',40012,400);else if(options.clientId==='*')throw new ErrorInfo('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})',40012,400);}if(options.log)Logger.setLog(options.log.level,options.log.handler);Logger.logAction(Logger.LOG_MINOR,'Rest()','started');this.baseUri=this.authority=function(host){return Defaults.getHttpScheme(options)+host+':'+Defaults.getPort(options,false);};this.serverTimeOffset=null;this.auth=new Auth(this,options);this.channels=new Channels(this);}Rest.prototype.stats=function(params,callback){/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}var headers=Utils.copy(Utils.defaultGetHeaders()),envelope=Http.supportsLinkHeaders?undefined:'json';if(this.options.headers)Utils.mixin(headers,this.options.headers);new PaginatedResource(this,'/stats',headers,envelope,function(body,headers,unpacked){var statsValues=unpacked?body:JSON.parse(body);for(var i=0;i<statsValues.length;i++){statsValues[i]=Stats.fromValues(statsValues[i]);}return statsValues;}).get(params,callback);};Rest.prototype.time=function(params,callback){/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}var headers=Utils.copy(Utils.defaultGetHeaders());if(this.options.headers)Utils.mixin(headers,this.options.headers);var self=this;var timeUri=function timeUri(host){return self.authority(host)+'/time';};Http.get(this,timeUri,headers,params,function(err,res,headers,unpacked){if(err){callback(err);return;}if(!unpacked)res=JSON.parse(res);var time=res[0];if(!time){err=new Error('Internal error (unexpected result type from GET /time)');err.statusCode=500;callback(err);return;}/* calculate time offset only once for this device by adding to the prototype */self.serverTimeOffset=time-Utils.now();callback(null,time);});};Rest.prototype.request=function(method,path,params,body,customHeaders,callback){var format=this.options.useBinaryProtocol?'msgpack':'json',method=method.toLowerCase(),envelope=Http.supportsLinkHeaders?undefined:'json',params=params||{},headers=Utils.copy(method=='get'?Utils.defaultGetHeaders():Utils.defaultPostHeaders(format));if(typeof body!=='string'){body=JSON.stringify(body);}if(this.options.headers){Utils.mixin(headers,this.options.headers);}if(customHeaders){Utils.mixin(headers,customHeaders);}var paginatedResource=new PaginatedResource(this,path,headers,envelope,function(resbody,headers,unpacked){return Utils.ensureArray(unpacked?resbody:JSON.parse(resbody));},/* useHttpPaginatedResponse: */true);switch(method){case'get':paginatedResource.get(params,callback);break;case'post':paginatedResource.post(params,body,callback);break;default:throw new ErrorInfo('Currently only GET and POST methods are supported',40500,405);}};function Channels(rest){this.rest=rest;this.attached={};}Channels.prototype.get=function(name,channelOptions){name=String(name);var channel=this.attached[name];if(!channel){this.attached[name]=channel=new Channel(this.rest,name,channelOptions);}else if(channelOptions){channel.setOptions(channelOptions);}return channel;};return Rest;}();var Realtime=function(){function Realtime(options){if(!(this instanceof Realtime)){return new Realtime(options);}Logger.logAction(Logger.LOG_MINOR,'Realtime()','');Rest.call(this,options);this.connection=new Connection(this,this.options);this.channels=new Channels(this);if(options.autoConnect!==false)this.connect();}Utils.inherits(Realtime,Rest);Realtime.prototype.connect=function(){Logger.logAction(Logger.LOG_MINOR,'Realtime.connect()','');this.connection.connect();};Realtime.prototype.close=function(){Logger.logAction(Logger.LOG_MINOR,'Realtime.close()','');this.connection.close();};function Channels(realtime){EventEmitter.call(this);this.realtime=realtime;this.all={};this.inProgress={};realtime.connection.connectionManager.on('transport.active',this.onTransportActive.bind(this));}Utils.inherits(Channels,EventEmitter);Channels.prototype.onChannelMessage=function(msg){var channelName=msg.channel;if(channelName===undefined){Logger.logAction(Logger.LOG_ERROR,'Channels.onChannelMessage()','received event unspecified channel, action = '+msg.action);return;}var channel=this.all[channelName];if(!channel){Logger.logAction(Logger.LOG_ERROR,'Channels.onChannelMessage()','received event for non-existent channel: '+channelName);return;}channel.onMessage(msg);};/* called when a transport becomes connected; reattempt attach/detach
		* for channels that are attaching or detaching.
		* Note that this does not use inProgress as inProgress is only channels which have already made
	   * at least one attempt to attach/detach */Channels.prototype.onTransportActive=function(){for(var channelName in this.all){var channel=this.all[channelName];if(channel.state==='attaching'||channel.state==='detaching'){channel.checkPendingState();}else if(channel.state==='suspended'){channel.autonomousAttach();}}};Channels.prototype.reattach=function(reason){for(var channelId in this.all){var channel=this.all[channelId];/* NB this should not trigger for merely attaching channels, as they will
				* be reattached anyway through the onTransportActive checkPendingState */if(channel.state==='attached'){channel.requestState('attaching',reason);}}};/* Connection interruptions (ie when the connection will no longer queue
		* events) imply connection state changes for any channel which is either
		* attached, pending, or will attempt to become attached in the future */Channels.prototype.propogateConnectionInterruption=function(connectionState,reason){var connectionStateToChannelState={'closing':'detached','closed':'detached','failed':'failed','suspended':'suspended'};var fromChannelStates=['attaching','attached','detaching','suspended'];var toChannelState=connectionStateToChannelState[connectionState];for(var channelId in this.all){var channel=this.all[channelId];if(Utils.arrIn(fromChannelStates,channel.state)){channel.notifyState(toChannelState,reason);}}};Channels.prototype.get=function(name,channelOptions){name=String(name);var channel=this.all[name];if(!channel){channel=this.all[name]=new RealtimeChannel(this.realtime,name,channelOptions);}else if(channelOptions){channel.setOptions(channelOptions);}return channel;};Channels.prototype.release=function(name){var channel=this.all[name];if(channel){delete this.all[name];}};/* Records operations currently pending on a transport; used by connectionManager to decide when
		* it's safe to upgrade. Note that a channel might be in the attaching state without any pending
		* operations (eg if attached while the connection state is connecting) - such a channel must not
		* hold up an upgrade, so is not considered inProgress.
		* Operation is currently one of either 'statechange' or 'sync' */Channels.prototype.setInProgress=function(channel,operation,inProgress){this.inProgress[channel.name]=this.inProgress[channel.name]||{};this.inProgress[channel.name][operation]=inProgress;if(!inProgress&&this.hasNopending()){this.emit('nopending');}};Channels.prototype.onceNopending=function(listener){if(this.hasNopending()){listener();return;}this.once('nopending',listener);};Channels.prototype.hasNopending=function(){return Utils.arrEvery(Utils.valuesArray(this.inProgress,true),function(operations){return!Utils.containsValue(operations,true);});};return Realtime;}();var ConnectionStateChange=function(){/* public constructor */function ConnectionStateChange(previous,current,retryIn,reason){this.previous=previous;this.current=current;if(retryIn)this.retryIn=retryIn;if(reason)this.reason=reason;}return ConnectionStateChange;}();var ChannelStateChange=function(){/* public constructor */function ChannelStateChange(previous,current,resumed,reason){this.previous=previous;this.current=current;if(current==='attached')this.resumed=resumed;if(reason)this.reason=reason;}return ChannelStateChange;}();var Connection=function(){/* public constructor */function Connection(ably,options){EventEmitter.call(this);this.ably=ably;this.connectionManager=new ConnectionManager(ably,options);this.state=this.connectionManager.state.state;this.key=undefined;this.id=undefined;this.serial=undefined;this.recoveryKey=undefined;this.errorReason=null;var self=this;this.connectionManager.on('connectionstate',function(stateChange){var state=self.state=stateChange.current;Utils.nextTick(function(){self.emit(state,stateChange);});});this.connectionManager.on('update',function(stateChange){Utils.nextTick(function(){self.emit('update',stateChange);});});}Utils.inherits(Connection,EventEmitter);Connection.prototype.whenState=function(state,listener){EventEmitter.prototype.whenState.call(this,state,this.state,listener,new ConnectionStateChange(undefined,state));};Connection.prototype.connect=function(){Logger.logAction(Logger.LOG_MINOR,'Connection.connect()','');this.connectionManager.requestState({state:'connecting'});};Connection.prototype.ping=function(callback){Logger.logAction(Logger.LOG_MINOR,'Connection.ping()','');callback=callback||function(){};this.connectionManager.ping(null,callback);};Connection.prototype.close=function(){Logger.logAction(Logger.LOG_MINOR,'Connection.close()','connectionKey = '+this.key);this.connectionManager.requestState({state:'closing'});};return Connection;}();var Channel=function(){function noop(){}/* public constructor */function Channel(rest,name,channelOptions){Logger.logAction(Logger.LOG_MINOR,'Channel()','started; name = '+name);EventEmitter.call(this);this.rest=rest;this.name=name;this.basePath='/channels/'+encodeURIComponent(name);this.presence=new Presence(this);this.setOptions(channelOptions);}Utils.inherits(Channel,EventEmitter);Channel.prototype.setOptions=function(options){this.channelOptions=options=options||{};if(options.cipher){if(!Crypto)throw new Error('Encryption not enabled; use ably.encryption.js instead');var cipher=Crypto.getCipher(options.cipher);options.cipher=cipher.cipherParams;options.channelCipher=cipher.cipher;}else if('cipher'in options){/* Don't deactivate an existing cipher unless options
				* has a 'cipher' key that's falsey */options.cipher=null;options.channelCipher=null;}};Channel.prototype.history=function(params,callback){Logger.logAction(Logger.LOG_MICRO,'Channel.history()','channel = '+this.name);/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}this._history(params,callback);};Channel.prototype._history=function(params,callback){var rest=this.rest,format=rest.options.useBinaryProtocol?'msgpack':'json',envelope=Http.supportsLinkHeaders?undefined:format,headers=Utils.copy(Utils.defaultGetHeaders(format)),channel=this;if(rest.options.headers)Utils.mixin(headers,rest.options.headers);var options=this.channelOptions;new PaginatedResource(rest,this.basePath+'/messages',headers,envelope,function(body,headers,unpacked){return Message.fromResponseBody(body,options,!unpacked&&format);}).get(params,callback);};Channel.prototype.publish=function(){var argCount=arguments.length,messages=arguments[0],callback=arguments[argCount-1],self=this;if(typeof callback!=='function'){callback=noop;++argCount;}if(argCount==2){if(Utils.isObject(messages))messages=[Message.fromValues(messages)];else if(Utils.isArray(messages))messages=Message.fromValuesArray(messages);else throw new ErrorInfo('The single-argument form of publish() expects a message object or an array of message objects',40013,400);}else{messages=[Message.fromValues({name:arguments[0],data:arguments[1]})];}var rest=this.rest,format=rest.options.useBinaryProtocol?'msgpack':'json',headers=Utils.copy(Utils.defaultPostHeaders(format));if(rest.options.headers)Utils.mixin(headers,rest.options.headers);Message.toRequestBody(messages,this.channelOptions,format,function(err,requestBody){if(err){callback(err);return;}self._publish(requestBody,headers,callback);});};Channel.prototype._publish=function(requestBody,headers,callback){Resource.post(this.rest,this.basePath+'/messages',requestBody,headers,null,false,callback);};return Channel;}();var RealtimeChannel=function(){var actions=ProtocolMessage.Action;var noop=function noop(){};var statechangeOp='statechange';var syncOp='sync';/* public constructor */function RealtimeChannel(realtime,name,options){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel()','started; name = '+name);Channel.call(this,realtime,name,options);this.realtime=realtime;this.presence=new RealtimePresence(this,realtime.options);this.connectionManager=realtime.connection.connectionManager;this.state='initialized';this.subscriptions=new EventEmitter();this.pendingEvents=[];this.syncChannelSerial=undefined;this.attachSerial=undefined;this.setOptions(options);this.errorReason=null;this._requestedFlags=null;this._mode=null;}Utils.inherits(RealtimeChannel,Channel);RealtimeChannel.invalidStateError=function(state){return{statusCode:400,code:90001,message:'Channel operation failed as channel state is '+state};};RealtimeChannel.progressOps={statechange:statechangeOp,sync:syncOp};RealtimeChannel.processListenerArgs=function(args){/* [event], listener, [callback] */if(typeof args[0]=='function')return[null,args[0],args[1]||noop];else return[args[0],args[1],args[2]||noop];};RealtimeChannel.prototype.publish=function(){var argCount=arguments.length,messages=arguments[0],callback=arguments[argCount-1];if(typeof callback!=='function'){callback=noop;++argCount;}if(!this.connectionManager.activeState()){callback(this.connectionManager.getStateError());return;}if(argCount==2){if(Utils.isObject(messages))messages=[Message.fromValues(messages)];else if(Utils.isArray(messages))messages=Message.fromValuesArray(messages);else throw new ErrorInfo('The single-argument form of publish() expects a message object or an array of message objects',40013,400);}else{messages=[Message.fromValues({name:arguments[0],data:arguments[1]})];}var options=this.channelOptions;var self=this;Message.encodeArray(messages,options,function(err){if(err){callback(err);return;}self._publish(messages,callback);});};RealtimeChannel.prototype._publish=function(messages,callback){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.publish()','message count = '+messages.length);switch(this.state){case'failed':callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));break;case'attached':Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.publish()','sending message');var msg=new ProtocolMessage();msg.action=actions.MESSAGE;msg.channel=this.name;msg.messages=messages;this.sendMessage(msg,callback);break;default:this.autonomousAttach();case'attaching':if(this.realtime.options.queueMessages){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.publish()','queueing message');this.pendingEvents.push({messages:messages,callback:callback});}else{var msg='Cannot publish messages while channel is attaching as queueMessages was disabled';Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.publish()',msg);callback(new ErrorInfo(msg,90001,409));}break;}};RealtimeChannel.prototype.onEvent=function(messages){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.onEvent()','received message');var subscriptions=this.subscriptions;for(var i=0;i<messages.length;i++){var message=messages[i];subscriptions.emit(message.name,message);}};RealtimeChannel.prototype.attach=function(flags,callback){if(typeof flags==='function'){callback=flags;flags=null;}callback=callback||noop;if(flags){this._requestedFlags=flags;}var connectionManager=this.connectionManager;if(!connectionManager.activeState()){callback(connectionManager.getStateError());return;}switch(this.state){case'attached':/* If flags requested, always do a re-attach. TODO only do this if if
				   * current mode differs from requested mode */if(!flags){callback();break;}/* else fallthrough */default:this.requestState('attaching');case'attaching':this.once(function(stateChange){switch(this.event){case'attached':callback();break;case'detached':case'suspended':case'failed':callback(stateChange.reason||connectionManager.getStateError());}});}};RealtimeChannel.prototype.attachImpl=function(){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.attachImpl()','sending ATTACH message');this.setInProgress(statechangeOp,true);var attachMsg=ProtocolMessage.fromValues({action:actions.ATTACH,channel:this.name});if(this._requestedFlags){Utils.arrForEach(this._requestedFlags,function(flag){attachMsg.setFlag(flag);});}this.sendMessage(attachMsg,noop);};RealtimeChannel.prototype.detach=function(callback){callback=callback||noop;var connectionManager=this.connectionManager;if(!connectionManager.activeState()){callback(connectionManager.getStateError());return;}switch(this.state){case'detached':case'failed':callback();break;default:this.requestState('detaching');case'detaching':this.once(function(stateChange){switch(this.event){case'detached':callback();break;case'failed':case'attached':callback(stateChange.reason||connectionManager.getStateError());break;default:/* this shouldn't happen ... */callback(ConnectionError.unknownChannelErr);break;}});}};RealtimeChannel.prototype.autonomousAttach=function(){var self=this;this.attach(function(err){if(err){var msg='Channel auto-attach failed: '+err.toString();Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.autonomousAttach()',msg);}});};RealtimeChannel.prototype.detachImpl=function(callback){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.detach()','sending DETACH message');this.setInProgress(statechangeOp,true);var msg=ProtocolMessage.fromValues({action:actions.DETACH,channel:this.name});this.sendMessage(msg,callback||noop);};RealtimeChannel.prototype.subscribe=function()/* [event], listener, [callback] */{var args=RealtimeChannel.processListenerArgs(arguments);var event=args[0];var listener=args[1];var callback=args[2];var subscriptions=this.subscriptions;var events;if(this.state==='failed'){callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));return;}subscriptions.on(event,listener);if(callback){this.attach(callback);}else{this.autonomousAttach();}};RealtimeChannel.prototype.unsubscribe=function()/* [event], listener, [callback] */{var args=RealtimeChannel.processListenerArgs(arguments);var event=args[0];var listener=args[1];var callback=args[2];var subscriptions=this.subscriptions;var events;if(this.state==='failed'){callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));return;}subscriptions.off(event,listener);};RealtimeChannel.prototype.sync=function(){/* check preconditions */switch(this.state){case'initialized':case'detaching':case'detached':throw new ErrorInfo("Unable to sync to channel; not attached",40000);default:}var connectionManager=this.connectionManager;if(!connectionManager.activeState()){throw connectionManager.getStateError();}/* send sync request */var syncMessage=ProtocolMessage.fromValues({action:actions.SYNC,channel:this.name});if(this.syncChannelSerial){syncMessage.channelSerial=this.syncChannelSerial;}connectionManager.send(syncMessage);};RealtimeChannel.prototype.sendMessage=function(msg,callback){this.connectionManager.send(msg,this.realtime.options.queueMessages,callback);};RealtimeChannel.prototype.sendPresence=function(presence,callback){var msg=ProtocolMessage.fromValues({action:actions.PRESENCE,channel:this.name,presence:Utils.isArray(presence)?PresenceMessage.fromValuesArray(presence):[PresenceMessage.fromValues(presence)]});this.sendMessage(msg,callback);};RealtimeChannel.prototype.onMessage=function(message){var syncChannelSerial,isSync=false;switch(message.action){case actions.ATTACHED:this.attachSerial=message.channelSerial;this._mode=message.getMode();if(this.state==='attached'){if(!message.hasFlag('RESUMED')){/* On a loss of continuity, the presence set needs to be re-synced */this.presence.onAttached(message.hasFlag('HAS_PRESENCE'));var change=new ChannelStateChange(this.state,this.state,false,message.error);this.emit('update',change);}}else{this.notifyState('attached',message.error,message.hasFlag('RESUMED'),message.hasFlag('HAS_PRESENCE'));}break;case actions.DETACHED:var err=message.error?ErrorInfo.fromValues(message.error):new ErrorInfo('Channel detached',90001,404);if(this.state==='detaching'){this.notifyState('detached',err);}else if(this.state==='attaching'){/* Only retry immediately if we were previously attached. If we were
					* attaching, go into suspended, fail messages, and wait a few seconds
					* before retrying */this.notifyState('suspended',err);}else{this.requestState('attaching',err);}break;case actions.SYNC:/* syncs can have channelSerials, but might not if the sync is one page long */isSync=true;syncChannelSerial=this.syncChannelSerial=message.channelSerial;/* syncs can happen on channels with no presence data as part of connection
				* resuming, in which case protocol message has no presence property */if(!message.presence)break;case actions.PRESENCE:var presence=message.presence,id=message.id,connectionId=message.connectionId,timestamp=message.timestamp;var options=this.channelOptions;for(var i=0;i<presence.length;i++){try{var presenceMsg=presence[i];PresenceMessage.decode(presenceMsg,options);}catch(e){Logger.logAction(Logger.LOG_ERROR,'RealtimeChannel.onMessage()',e.toString());}if(!presenceMsg.connectionId)presenceMsg.connectionId=connectionId;if(!presenceMsg.timestamp)presenceMsg.timestamp=timestamp;if(!presenceMsg.id)presenceMsg.id=id+':'+i;}this.presence.setPresence(presence,isSync,syncChannelSerial);break;case actions.MESSAGE:var messages=message.messages,id=message.id,connectionId=message.connectionId,timestamp=message.timestamp;var options=this.channelOptions;for(var i=0;i<messages.length;i++){try{var msg=messages[i];Message.decode(msg,options);}catch(e){/* decrypt failed .. the most likely cause is that we have the wrong key */Logger.logAction(Logger.LOG_ERROR,'RealtimeChannel.onMessage()',e.toString());}if(!msg.connectionId)msg.connectionId=connectionId;if(!msg.timestamp)msg.timestamp=timestamp;if(!msg.id)msg.id=id+':'+i;}this.onEvent(messages);break;case actions.ERROR:/* there was a channel-specific error */var err=message.error;if(err&&err.code==80016){/* attach/detach operation attempted on superseded transport handle */this.checkPendingState();}else{this.notifyState('failed',ErrorInfo.fromValues(err));}break;default:Logger.logAction(Logger.LOG_ERROR,'RealtimeChannel.onMessage()','Fatal protocol error: unrecognised action ('+message.action+')');this.connectionManager.abort(ConnectionError.unknownChannelErr);}};RealtimeChannel.mergeTo=function(dest,src){var result=false;var action;if(dest.channel==src.channel){if((action=dest.action)==src.action){switch(action){case actions.MESSAGE:for(var i=0;i<src.messages.length;i++){dest.messages.push(src.messages[i]);}result=true;break;case actions.PRESENCE:for(var i=0;i<src.presence.length;i++){dest.presence.push(src.presence[i]);}result=true;break;default:}}}return result;};RealtimeChannel.prototype.onAttached=function(){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.onAttached','activating channel; name = '+this.name);var pendingEvents=this.pendingEvents,pendingCount=pendingEvents.length;if(pendingCount){this.pendingEvents=[];var msg=ProtocolMessage.fromValues({action:actions.MESSAGE,channel:this.name,messages:[]});var multicaster=Multicaster();Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.setAttached','sending '+pendingCount+' queued messages');for(var i=0;i<pendingCount;i++){var event=pendingEvents[i];Array.prototype.push.apply(msg.messages,event.messages);multicaster.push(event.callback);}this.sendMessage(msg,multicaster);}};RealtimeChannel.prototype.notifyState=function(state,reason,resumed,hasPresence){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.notifyState','name = '+this.name+', current state = '+this.state+', notifying state '+state);this.clearStateTimer();if(state===this.state){return;}this.presence.actOnChannelState(state,hasPresence,reason);if(state!=='attached'&&state!=='attaching'){this.failPendingMessages(reason||RealtimeChannel.invalidStateError(state));}if(state==='suspended'&&this.connectionManager.state.sendEvents){this.startRetryTimer();}else{this.cancelRetryTimer();}if(reason){this.errorReason=reason;}var change=new ChannelStateChange(this.state,state,resumed,reason);var logLevel=state==='failed'?Logger.LOG_ERROR:Logger.LOG_MAJOR;Logger.logAction(logLevel,'Channel state for channel "'+this.name+'"',state+(reason?'; reason: '+reason.toString():''));/* Note: we don't set inProgress for pending states until the request is actually in progress */if(state==='attached'){this.onAttached();this.setInProgress(syncOp,hasPresence);this.setInProgress(statechangeOp,false);}else if(state==='detached'||state==='failed'||state==='suspended'){this.setInProgress(statechangeOp,false);this.setInProgress(syncOp,false);}this.state=state;this.emit(state,change);};RealtimeChannel.prototype.requestState=function(state,reason){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.requestState','name = '+this.name+', state = '+state);this.notifyState(state,reason);/* send the event and await response */this.checkPendingState();};RealtimeChannel.prototype.checkPendingState=function(){/* if can't send events, do nothing */var cmState=this.connectionManager.state;/* Allow attach messages to queue up when synchronizing, since this will be
			* the state we'll be in when upgrade transport.active triggers a checkpendingstate */if(!(cmState.sendEvents||cmState.forceQueueEvents)){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.checkPendingState','sendEvents is false; state is '+this.connectionManager.state.state);return;}Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.checkPendingState','name = '+this.name+', state = '+this.state);/* Only start the state timer running when actually sending the event */switch(this.state){case'attaching':this.startStateTimerIfNotRunning();this.attachImpl();break;case'detaching':this.startStateTimerIfNotRunning();this.detachImpl();break;case'attached':/* resume any sync operation that was in progress */this.sync();default:break;}};RealtimeChannel.prototype.timeoutPendingState=function(){switch(this.state){case'attaching':var err=new ErrorInfo('Channel attach timed out',90007,408);this.notifyState('suspended',err);break;case'detaching':var err=new ErrorInfo('Channel detach timed out',90007,408);this.notifyState('attached',err);break;default:this.checkPendingState();break;}};RealtimeChannel.prototype.startStateTimerIfNotRunning=function(){var self=this;if(!this.stateTimer){this.stateTimer=setTimeout(function(){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.startStateTimerIfNotRunning','timer expired');self.stateTimer=null;self.timeoutPendingState();},this.realtime.options.timeouts.realtimeRequestTimeout);}};RealtimeChannel.prototype.clearStateTimer=function(){var stateTimer=this.stateTimer;if(stateTimer){clearTimeout(stateTimer);this.stateTimer=null;}};RealtimeChannel.prototype.startRetryTimer=function(){var self=this;if(this.retryTimer)return;this.retryTimer=setTimeout(function(){/* If connection is not connected, just leave in suspended, a reattach
				* will be triggered once it connects again */if(self.state==='suspended'&&self.connectionManager.state.sendEvents){self.retryTimer=null;Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel retry timer expired','attempting a new attach');self.requestState('attaching');}},this.realtime.options.timeouts.channelRetryTimeout);};RealtimeChannel.prototype.cancelRetryTimer=function(){if(this.retryTimer){clearTimeout(this.retryTimer);this.suspendTimer=null;}};RealtimeChannel.prototype.setInProgress=function(operation,value){this.rest.channels.setInProgress(this,operation,value);};RealtimeChannel.prototype.failPendingMessages=function(err){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.failPendingMessages','channel; name = '+this.name+', err = '+Utils.inspectError(err));for(var i=0;i<this.pendingEvents.length;i++){try{this.pendingEvents[i].callback(err);}catch(e){}}this.pendingEvents=[];};RealtimeChannel.prototype.history=function(params,callback){Logger.logAction(Logger.LOG_MICRO,'RealtimeChannel.history()','channel = '+this.name);/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}if(params&&params.untilAttach){if(this.state!=='attached'){callback(new ErrorInfo("option untilAttach requires the channel to be attached",40000,400));return;}if(!this.attachSerial){callback(new ErrorInfo("untilAttach was specified and channel is attached, but attachSerial is not defined",40000,400));return;}delete params.untilAttach;params.from_serial=this.attachSerial;}Channel.prototype._history.call(this,params,callback);};RealtimeChannel.prototype.whenState=function(state,listener){EventEmitter.prototype.whenState.call(this,state,this.state,listener);};return RealtimeChannel;}();var RealtimePresence=function(){var noop=function noop(){};function memberKey(item){return item.clientId+':'+item.connectionId;}function getClientId(realtimePresence){return realtimePresence.channel.realtime.auth.clientId;}function isAnonymous(realtimePresence){var realtime=realtimePresence.channel.realtime;/* If not currently connected, we can't assume that we're an anonymous
			* client, as realtime may inform us of our clientId in the CONNECTED
			* message. So assume we're not anonymous and leave it to realtime to
			* return an error if we are */return!realtime.auth.clientId&&realtime.connection.state==='connected';}function waitAttached(channel,callback,action){switch(channel.state){case'attached':case'suspended':action();break;case'initialized':case'detached':case'detaching':case'attaching':channel.attach(function(err){if(err)callback(err);else action();});break;default:callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError(channel.state)));}}function RealtimePresence(channel,options){Presence.call(this,channel);this.members=new PresenceMap(this);this._myMembers=new PresenceMap(this);this.subscriptions=new EventEmitter();this.pendingPresence=[];}Utils.inherits(RealtimePresence,Presence);RealtimePresence.prototype.enter=function(data,callback){if(isAnonymous(this))throw new ErrorInfo('clientId must be specified to enter a presence channel',40012,400);this._enterOrUpdateClient(undefined,data,callback,'enter');};RealtimePresence.prototype.update=function(data,callback){if(isAnonymous(this))throw new ErrorInfo('clientId must be specified to update presence data',40012,400);this._enterOrUpdateClient(undefined,data,callback,'update');};RealtimePresence.prototype.enterClient=function(clientId,data,callback){this._enterOrUpdateClient(clientId,data,callback,'enter');};RealtimePresence.prototype.updateClient=function(clientId,data,callback){this._enterOrUpdateClient(clientId,data,callback,'update');};RealtimePresence.prototype._enterOrUpdateClient=function(clientId,data,callback,action){if(!callback){if(typeof data==='function'){callback=data;data=null;}else{callback=noop;}}var channel=this.channel;if(!channel.connectionManager.activeState()){callback(channel.connectionManager.getStateError());return;}Logger.logAction(Logger.LOG_MICRO,'RealtimePresence.'+action+'Client()',action+'ing; channel = '+channel.name+', client = '+clientId||'(implicit) '+getClientId(this));var presence=PresenceMessage.fromValues({action:action,data:data});if(clientId){presence.clientId=clientId;}var self=this;PresenceMessage.encode(presence,channel.channelOptions,function(err){if(err){callback(err);return;}switch(channel.state){case'attached':channel.sendPresence(presence,callback);break;case'initialized':case'detached':channel.autonomousAttach();case'attaching':self.pendingPresence.push({presence:presence,callback:callback});break;default:var err=new ErrorInfo('Unable to '+action+' presence channel (incompatible state)',90001);err.code=90001;callback(err);}});};RealtimePresence.prototype.leave=function(data,callback){if(isAnonymous(this))throw new ErrorInfo('clientId must have been specified to enter or leave a presence channel',40012,400);this.leaveClient(undefined,data,callback);};RealtimePresence.prototype.leaveClient=function(clientId,data,callback){if(!callback){if(typeof data==='function'){callback=data;data=null;}else{callback=noop;}}var channel=this.channel;if(!channel.connectionManager.activeState()){callback(channel.connectionManager.getStateError());return;}Logger.logAction(Logger.LOG_MICRO,'RealtimePresence.leaveClient()','leaving; channel = '+this.channel.name+', client = '+clientId);var presence=PresenceMessage.fromValues({action:'leave',data:data});if(clientId){presence.clientId=clientId;}switch(channel.state){case'attached':channel.sendPresence(presence,callback);break;case'attaching':this.pendingPresence.push({presence:presence,callback:callback});break;case'initialized':case'failed':/* we're not attached; therefore we let any entered status
					* timeout by itself instead of attaching just in order to leave */var err=new ErrorInfo('Unable to leave presence channel (incompatible state)',90001);callback(err);break;default:/* there is no connection; therefore we let
					* any entered status timeout by itself */callback(ConnectionError.failed);}};RealtimePresence.prototype.get=function()/* params, callback */{var args=Array.prototype.slice.call(arguments);if(args.length==1&&typeof args[0]=='function')args.unshift(null);var params=args[0],callback=args[1]||noop,waitForSync=!params||('waitForSync'in params?params.waitForSync:true);function returnMembers(members){callback(null,params?members.list(params):members.values());}/* Special-case the suspended state: can still get (stale) presence set if waitForSync is false */if(this.channel.state==='suspended'){if(waitForSync){callback(ErrorInfo.fromValues({statusCode:400,code:91005,message:'Presence state is out of sync due to channel being in the SUSPENDED state'}));}else{returnMembers(this.members);}return;}var self=this;waitAttached(this.channel,callback,function(){var members=self.members;if(waitForSync){members.waitSync(function(){returnMembers(members);});}else{returnMembers(members);}});};RealtimePresence.prototype.history=function(params,callback){Logger.logAction(Logger.LOG_MICRO,'RealtimePresence.history()','channel = '+this.name);/* params and callback are optional; see if params contains the callback */if(callback===undefined){if(typeof params=='function'){callback=params;params=null;}else{callback=noop;}}if(params&&params.untilAttach){if(this.channel.state==='attached'){delete params.untilAttach;params.from_serial=this.channel.attachSerial;}else{callback(new ErrorInfo("option untilAttach requires the channel to be attached, was: "+this.channel.state,40000,400));}}Presence.prototype._history.call(this,params,callback);};RealtimePresence.prototype.setPresence=function(presenceSet,isSync,syncChannelSerial){Logger.logAction(Logger.LOG_MICRO,'RealtimePresence.setPresence()','received presence for '+presenceSet.length+' participants; syncChannelSerial = '+syncChannelSerial);var syncCursor,match,members=this.members,myMembers=this._myMembers,broadcastMessages=[],connId=this.channel.connectionManager.connectionId;if(isSync){this.members.startSync();if(syncChannelSerial&&(match=syncChannelSerial.match(/^[\w\-]+:(.*)$/))){syncCursor=match[1];}}for(var i=0;i<presenceSet.length;i++){var presence=PresenceMessage.fromValues(presenceSet[i]);switch(presence.action){case'leave':if(members.remove(presence)){broadcastMessages.push(presence);}if(presence.connectionId===connId&&!presence.isSynthesized){myMembers.remove(presence);}break;case'enter':case'present':case'update':if(members.put(presence)){broadcastMessages.push(presence);}if(presence.connectionId===connId){myMembers.put(presence);}break;}}/* if this is the last (or only) message in a sequence of sync updates, end the sync */if(isSync&&!syncCursor){members.endSync();/* RTP5c2: re-enter our own members if they haven't shown up in the sync */this._ensureMyMembersPresent();this.channel.setInProgress(RealtimeChannel.progressOps.sync,false);this.channel.syncChannelSerial=null;}/* broadcast to listeners */for(var i=0;i<broadcastMessages.length;i++){var presence=broadcastMessages[i];this.subscriptions.emit(presence.action,presence);}};RealtimePresence.prototype.onAttached=function(hasPresence){Logger.logAction(Logger.LOG_MINOR,'RealtimePresence.onAttached()','channel = '+this.channel.name+', hasPresence = '+hasPresence);if(hasPresence){this.members.startSync();}else{this._synthesizeLeaves(this.members.values());this.members.clear();this._ensureMyMembersPresent();}/* NB this must be after the _ensureMyMembersPresent call, which may add items to pendingPresence */var pendingPresence=this.pendingPresence,pendingPresCount=pendingPresence.length;if(pendingPresCount){this.pendingPresence=[];var presenceArray=[];var multicaster=Multicaster();Logger.logAction(Logger.LOG_MICRO,'RealtimePresence.onAttached','sending '+pendingPresCount+' queued presence messages');for(var i=0;i<pendingPresCount;i++){var event=pendingPresence[i];presenceArray.push(event.presence);multicaster.push(event.callback);}this.channel.sendPresence(presenceArray,multicaster);}};RealtimePresence.prototype.actOnChannelState=function(state,hasPresence,err){switch(state){case'attached':this.onAttached(hasPresence);break;case'detached':case'failed':this._clearMyMembers();this.members.clear();/* falls through */case'suspended':this.failPendingPresence(err);break;}};RealtimePresence.prototype.failPendingPresence=function(err){if(this.pendingPresence.length){Logger.logAction(Logger.LOG_MINOR,'RealtimeChannel.failPendingPresence','channel; name = '+this.channel.name+', err = '+Utils.inspectError(err));for(var i=0;i<this.pendingPresence.length;i++){try{this.pendingPresence[i].callback(err);}catch(e){}}this.pendingPresence=[];}};RealtimePresence.prototype._clearMyMembers=function(){this._myMembers.clear();};RealtimePresence.prototype._ensureMyMembersPresent=function(){var self=this,members=this.members,myMembers=this._myMembers,reenterCb=function reenterCb(err){if(err){var msg='Presence auto-re-enter failed: '+err.toString();var wrappedErr=new ErrorInfo(msg,91004,400);Logger.logAction(Logger.LOG_ERROR,'RealtimePresence._ensureMyMembersPresent()',msg);var change=new ChannelStateChange(self.channel.state,self.channel.state,true,wrappedErr);self.channel.emit('update',change);}};for(var memberKey in myMembers.map){if(!(memberKey in members.map)){var entry=myMembers.map[memberKey];Logger.logAction(Logger.LOG_MICRO,'RealtimePresence._ensureMyMembersPresent()','Auto-reentering clientId "'+entry.clientId+'" into the presence set');this._enterOrUpdateClient(entry.clientId,entry.data,reenterCb,'enter');delete myMembers.map[memberKey];}}};RealtimePresence.prototype._synthesizeLeaves=function(items){var subscriptions=this.subscriptions;Utils.arrForEach(items,function(item){var presence=PresenceMessage.fromValues({action:'leave',connectionId:item.connectionId,clientId:item.clientId,data:item.data,encoding:item.encoding,timestamp:Utils.now()});subscriptions.emit('leave',presence);});};/* Deprecated */RealtimePresence.prototype.on=function(){Logger.deprecated('presence.on','presence.subscribe');this.subscribe.apply(this,arguments);};/* Deprecated */RealtimePresence.prototype.off=function(){Logger.deprecated('presence.off','presence.unsubscribe');this.unsubscribe.apply(this,arguments);};RealtimePresence.prototype.subscribe=function()/* [event], listener, [callback] */{var args=RealtimeChannel.processListenerArgs(arguments);var event=args[0];var listener=args[1];var callback=args[2];var self=this;waitAttached(this.channel,callback,function(){self.subscriptions.on(event,listener);});};RealtimePresence.prototype.unsubscribe=function()/* [event], listener, [callback] */{var args=RealtimeChannel.processListenerArgs(arguments);var event=args[0];var listener=args[1];var callback=args[2];if(this.channel.state==='failed')callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));this.subscriptions.off(event,listener);};RealtimePresence.prototype.syncComplete=function(){return!this.members.syncInProgress;};function PresenceMap(presence){EventEmitter.call(this);this.presence=presence;this.map={};this.syncInProgress=false;this.residualMembers=null;}Utils.inherits(PresenceMap,EventEmitter);PresenceMap.prototype.get=function(key){return this.map[key];};PresenceMap.prototype.getClient=function(clientId){var map=this.map,result=[];for(var key in map){var item=map[key];if(item.clientId==clientId&&item.action!='absent')result.push(item);}return result;};PresenceMap.prototype.list=function(params){var map=this.map,clientId=params&&params.clientId,connectionId=params&&params.connectionId,result=[];for(var key in map){var item=map[key];if(item.action==='absent')continue;if(clientId&&clientId!=item.clientId)continue;if(connectionId&&connectionId!=item.connectionId)continue;result.push(item);}return result;};function newerThan(item,existing){/* RTP2b1: if either is synthesised, compare by timestamp */if(item.isSynthesized()||existing.isSynthesized()){return item.timestamp>existing.timestamp;}/* RTP2b2 */var itemOrderings=item.parseId(),existingOrderings=existing.parseId();if(itemOrderings.msgSerial===existingOrderings.msgSerial){return itemOrderings.index>existingOrderings.index;}else{return itemOrderings.msgSerial>existingOrderings.msgSerial;}}PresenceMap.prototype.put=function(item){if(item.action==='enter'||item.action==='update'){item=PresenceMessage.fromValues(item);item.action='present';}var map=this.map,key=memberKey(item);/* we've seen this member, so do not remove it at the end of sync */if(this.residualMembers)delete this.residualMembers[key];/* compare the timestamp of the new item with any existing member (or ABSENT witness) */var existingItem=map[key];if(existingItem&&!newerThan(item,existingItem)){return false;}map[key]=item;return true;};PresenceMap.prototype.values=function(){var map=this.map,result=[];for(var key in map){var item=map[key];if(item.action!='absent')result.push(item);}return result;};PresenceMap.prototype.remove=function(item){var map=this.map,key=memberKey(item);var existingItem=map[key];if(existingItem&&!newerThan(item,existingItem)){return false;}/* RTP2f */if(this.syncInProgress){item=PresenceMessage.fromValues(item);item.action='absent';map[key]=item;}else{delete map[key];}return true;};PresenceMap.prototype.startSync=function(){var map=this.map,syncInProgress=this.syncInProgress;Logger.logAction(Logger.LOG_MINOR,'PresenceMap.startSync()','channel = '+this.presence.channel.name+'; syncInProgress = '+syncInProgress);/* we might be called multiple times while a sync is in progress */if(!this.syncInProgress){this.residualMembers=Utils.copy(map);this.syncInProgress=true;}};PresenceMap.prototype.endSync=function(){var map=this.map,syncInProgress=this.syncInProgress;Logger.logAction(Logger.LOG_MINOR,'PresenceMap.endSync()','channel = '+this.presence.channel.name+'; syncInProgress = '+syncInProgress);if(syncInProgress){/* we can now strip out the ABSENT members, as we have
				* received all of the out-of-order sync messages */for(var memberKey in map){var entry=map[memberKey];if(entry.action==='absent'){delete map[memberKey];}}/* any members that were present at the start of the sync,
				* and have not been seen in sync, can be removed, and leave events emitted */this.presence._synthesizeLeaves(Utils.valuesArray(this.residualMembers));for(var memberKey in this.residualMembers){delete map[memberKey];}this.residualMembers=null;/* finish, notifying any waiters */this.syncInProgress=false;}this.emit('sync');};PresenceMap.prototype.waitSync=function(callback){var syncInProgress=this.syncInProgress;Logger.logAction(Logger.LOG_MINOR,'PresenceMap.waitSync()','channel = '+this.presence.channel.name+'; syncInProgress = '+syncInProgress);if(!syncInProgress){callback();return;}this.once('sync',callback);};PresenceMap.prototype.clear=function(callback){this.map={};this.syncInProgress=false;this.residualMembers=null;};return RealtimePresence;}();var XHRRequest=function(){var noop=function noop(){};var idCounter=0;var pendingRequests={};var REQ_SEND=0,REQ_RECV=1,REQ_RECV_POLL=2,REQ_RECV_STREAM=3;function clearPendingRequests(){for(var id in pendingRequests){pendingRequests[id].dispose();}}var isIE=typeof window!=='undefined'&&window.XDomainRequest;function ieVersion(){var match=navigator.userAgent.toString().match(/MSIE\s([\d.]+)/);return match&&Number(match[1]);}function needJsonEnvelope(){/* IE 10 xhr bug: http://stackoverflow.com/a/16320339 */var version;return isIE&&(version=ieVersion())&&version===10;}function getHeader(xhr,header){return xhr.getResponseHeader&&xhr.getResponseHeader(header);}/* Safari mysteriously returns 'Identity' for transfer-encoding
		* when in fact it is 'chunked'. So instead, decide that it is
		* chunked when transfer-encoding is present, content-length is absent */function isEncodingChunked(xhr){return xhr.getResponseHeader&&xhr.getResponseHeader('transfer-encoding')&&!xhr.getResponseHeader('content-length');}function getHeadersAsObject(xhr){var headerPairs=Utils.trim(xhr.getAllResponseHeaders()).split('\r\n'),headers={};for(var i=0;i<headerPairs.length;i++){var parts=Utils.arrMap(headerPairs[i].split(':'),Utils.trim);headers[parts[0].toLowerCase()]=parts[1];}return headers;}function XHRRequest(uri,headers,params,body,requestMode,timeouts){EventEmitter.call(this);params=params||{};params.rnd=Utils.randStr();if(needJsonEnvelope()&&!params.envelope)params.envelope='json';this.uri=uri+Utils.toQueryString(params);this.headers=headers||{};this.body=body;this.requestMode=requestMode;this.timeouts=timeouts;this.timedOut=false;this.requestComplete=false;pendingRequests[this.id=String(++idCounter)]=this;}Utils.inherits(XHRRequest,EventEmitter);var createRequest=XHRRequest.createRequest=function(uri,headers,params,body,requestMode,timeouts){/* XHR requests are used either with the context being a realtime
			* transport, or with timeouts passed in (for when used by a rest client),
			* or completely standalone.  Use the appropriate timeouts in each case */timeouts=this&&this.timeouts||timeouts||Defaults.TIMEOUTS;return new XHRRequest(uri,headers,Utils.copy(params),body,requestMode,timeouts);};XHRRequest.prototype.complete=function(err,body,headers,unpacked,statusCode){if(!this.requestComplete){this.requestComplete=true;if(body)this.emit('data',body);this.emit('complete',err,body,headers,unpacked,statusCode);this.dispose();}};XHRRequest.prototype.abort=function(){this.dispose();};XHRRequest.prototype.exec=function(){var timeout=this.requestMode==REQ_SEND?this.timeouts.httpRequestTimeout:this.timeouts.recvTimeout,self=this,timer=this.timer=setTimeout(function(){self.timedOut=true;xhr.abort();},timeout),body=this.body,method=body?'POST':'GET',headers=this.headers,xhr=this.xhr=new XMLHttpRequest(),accept=headers['accept'],responseType='text';if(!accept){headers['accept']='application/json';}else if(accept.indexOf('application/json')===-1){responseType='arraybuffer';}if(body){var contentType=headers['content-type']||(headers['content-type']='application/json');if(contentType.indexOf('application/json')>-1&&typeof body!='string')body=JSON.stringify(body);}xhr.open(method,this.uri,true);xhr.responseType=responseType;if('authorization'in headers){xhr.withCredentials='true';}for(var h in headers){xhr.setRequestHeader(h,headers[h]);}var errorHandler=function errorHandler(errorEvent,message,code,statusCode){var errorMessage=message+' (event type: '+errorEvent.type+')'+(self.xhr.statusText?', current statusText is '+self.xhr.statusText:'');Logger.logAction(Logger.LOG_ERROR,'Request.on'+errorEvent.type+'()',errorMessage);self.complete(new ErrorInfo(errorMessage,code,statusCode));};xhr.onerror=function(errorEvent){errorHandler(errorEvent,'XHR error occurred',null,400);};xhr.onabort=function(errorEvent){if(self.timedOut){errorHandler(errorEvent,'Request aborted due to request timeout expiring',null,408);}else{errorHandler(errorEvent,'Request cancelled',null,400);}};xhr.ontimeout=function(errorEvent){errorHandler(errorEvent,'Request timed out',null,408);};var streaming,statusCode,responseBody,contentType,successResponse,streamPos=0,unpacked=false;function onResponse(){clearTimeout(timer);successResponse=statusCode<400;if(statusCode==204){self.complete(null,null,null,null,statusCode);return;}streaming=self.requestMode==REQ_RECV_STREAM&&successResponse&&isEncodingChunked(xhr);}function onEnd(){try{var contentType=getHeader(xhr,'content-type'),headers,server,json=contentType?contentType.indexOf('application/json')>=0:xhr.responseType=='text';responseBody=json?xhr.responseText:xhr.response;if(json){responseBody=String(responseBody);if(responseBody.length){responseBody=JSON.parse(responseBody);}unpacked=true;}if(responseBody.response!==undefined){/* unwrap JSON envelope */statusCode=responseBody.statusCode;successResponse=statusCode<400;headers=responseBody.headers;responseBody=responseBody.response;}else{headers=getHeadersAsObject(xhr);}}catch(e){self.complete(new ErrorInfo('Malformed response body from server: '+e.message,null,400));return;}/* If response is an array, it's an array of protocol messages -- even if
				* is contains an error action (hence the nonsuccess statuscode), we can
				* consider the request to have succeeded, just pass it on to
				* onProtocolMessage to decide what to do */if(successResponse||Utils.isArray(responseBody)){self.complete(null,responseBody,headers,unpacked,statusCode);return;}var err=responseBody.error;if(!err){err=new ErrorInfo('Error response received from server: '+statusCode+' body was: '+Utils.inspect(responseBody),null,statusCode);}self.complete(err);}function onProgress(){responseBody=xhr.responseText;var bodyEnd=responseBody.length-1,idx,chunk;while(streamPos<bodyEnd&&(idx=responseBody.indexOf('\n',streamPos))>-1){chunk=responseBody.slice(streamPos,idx);streamPos=idx+1;onChunk(chunk);}}function onChunk(chunk){try{chunk=JSON.parse(chunk);}catch(e){self.complete(new ErrorInfo('Malformed response body from server: '+e.message,null,400));return;}self.emit('data',chunk);}function onStreamEnd(){onProgress();self.streamComplete=true;Utils.nextTick(function(){self.complete();});}xhr.onreadystatechange=function(){var readyState=xhr.readyState;if(readyState<3)return;if(xhr.status!==0){if(statusCode===undefined){statusCode=xhr.status;/* IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450 */if(statusCode===1223)statusCode=204;onResponse();}if(readyState==3&&streaming){onProgress();}else if(readyState==4){if(streaming)onStreamEnd();else onEnd();}}};xhr.send(body);};XHRRequest.prototype.dispose=function(){var xhr=this.xhr;if(xhr){xhr.onreadystatechange=xhr.onerror=xhr.onabort=xhr.ontimeout=noop;this.xhr=null;var timer=this.timer;if(timer){clearTimeout(timer);this.timer=null;}if(!this.requestComplete)xhr.abort();}delete pendingRequests[this.id];};if(Platform.xhrSupported){if((typeof DomEvent==="undefined"?"undefined":_typeof(DomEvent))==='object'){DomEvent.addUnloadListener(clearPendingRequests);}if(typeof Http!=='undefined'){Http.supportsAuthHeaders=true;Http.Request=function(rest,uri,headers,params,body,callback){var req=createRequest(uri,headers,params,body,REQ_SEND,rest&&rest.options.timeouts);req.once('complete',callback);req.exec();return req;};Http.checkConnectivity=function(callback){var upUrl=Defaults.internetUpUrl;Logger.logAction(Logger.LOG_MICRO,'(XHRRequest)Http.checkConnectivity()','Sending; '+upUrl);Http.Request(null,upUrl,null,null,null,function(err,responseText){var result=!err&&responseText.replace(/\n/,'')=='yes';Logger.logAction(Logger.LOG_MICRO,'(XHRRequest)Http.checkConnectivity()','Result: '+result);callback(null,result);});};}}return XHRRequest;}();var XHRStreamingTransport=function(){var shortName='xhr_streaming';/* public constructor */function XHRStreamingTransport(connectionManager,auth,params){CometTransport.call(this,connectionManager,auth,params);this.shortName=shortName;}Utils.inherits(XHRStreamingTransport,CometTransport);XHRStreamingTransport.isAvailable=function(){return Platform.xhrSupported&&Platform.streamingSupported;};XHRStreamingTransport.tryConnect=function(connectionManager,auth,params,callback){var transport=new XHRStreamingTransport(connectionManager,auth,params);var errorCb=function errorCb(err){callback({event:this.event,error:err});};transport.on(['failed','disconnected'],errorCb);transport.on('preconnect',function(){Logger.logAction(Logger.LOG_MINOR,'XHRStreamingTransport.tryConnect()','viable transport '+transport);transport.off(['failed','disconnected'],errorCb);callback(null,transport);});transport.connect();};XHRStreamingTransport.prototype.toString=function(){return'XHRStreamingTransport; uri='+this.baseUri+'; isConnected='+this.isConnected;};XHRStreamingTransport.prototype.createRequest=XHRRequest.createRequest;if(typeof ConnectionManager!=='undefined'&&XHRStreamingTransport.isAvailable()){ConnectionManager.supportedTransports[shortName]=XHRStreamingTransport;}return XHRStreamingTransport;}();var XHRPollingTransport=function(){var shortName='xhr_polling';function XHRPollingTransport(connectionManager,auth,params){params.stream=false;CometTransport.call(this,connectionManager,auth,params);this.shortName=shortName;}Utils.inherits(XHRPollingTransport,CometTransport);XHRPollingTransport.isAvailable=function(){return Platform.xhrSupported;};XHRPollingTransport.tryConnect=function(connectionManager,auth,params,callback){var transport=new XHRPollingTransport(connectionManager,auth,params);var errorCb=function errorCb(err){callback({event:this.event,error:err});};transport.on(['failed','disconnected'],errorCb);transport.on('preconnect',function(){Logger.logAction(Logger.LOG_MINOR,'XHRPollingTransport.tryConnect()','viable transport '+transport);transport.off(['failed','disconnected'],errorCb);callback(null,transport);});transport.connect();};XHRPollingTransport.prototype.toString=function(){return'XHRPollingTransport; uri='+this.baseUri+'; isConnected='+this.isConnected;};XHRPollingTransport.prototype.createRequest=XHRRequest.createRequest;if(typeof ConnectionManager!=='undefined'&&XHRPollingTransport.isAvailable()){ConnectionManager.supportedTransports[shortName]=XHRPollingTransport;}return XHRPollingTransport;}();var JSONPTransport=function(){var noop=function noop(){};/* Can't just use windows.Ably, as that won't exist if using the commonjs version. */var _=window._ablyjs_jsonp={};/* express strips out parantheses from the callback!
		* Kludge to still alow its responses to work, while not keeping the
		* function form for normal use and not cluttering window.Ably
		* https://github.com/strongloop/express/blob/master/lib/response.js#L305
		*/_._=function(id){return _['_'+id]||noop;};var idCounter=1;var isSupported=typeof document!=='undefined';var head=isSupported?document.getElementsByTagName('head')[0]:null;var shortName='jsonp';/* public constructor */function JSONPTransport(connectionManager,auth,params){params.stream=false;CometTransport.call(this,connectionManager,auth,params);this.shortName=shortName;}Utils.inherits(JSONPTransport,CometTransport);JSONPTransport.isAvailable=function(){return isSupported;};if(isSupported){ConnectionManager.supportedTransports[shortName]=JSONPTransport;}/* connectivity check; since this has a hard-coded callback id,
		* we just make sure that we handle concurrent requests (but the
		* connectionmanager should ensure this doesn't happen anyway */var checksInProgress=null;window.JSONPTransport=JSONPTransport;JSONPTransport.tryConnect=function(connectionManager,auth,params,callback){var transport=new JSONPTransport(connectionManager,auth,params);var errorCb=function errorCb(err){callback({event:this.event,error:err});};transport.on(['failed','disconnected'],errorCb);transport.on('preconnect',function(){Logger.logAction(Logger.LOG_MINOR,'JSONPTransport.tryConnect()','viable transport '+transport);transport.off(['failed','disconnected'],errorCb);callback(null,transport);});transport.connect();};JSONPTransport.prototype.toString=function(){return'JSONPTransport; uri='+this.baseUri+'; isConnected='+this.isConnected;};var createRequest=JSONPTransport.prototype.createRequest=function(uri,headers,params,body,requestMode,timeouts){/* JSONP requests are used either with the context being a realtime
			* transport, or with timeouts passed in (for when used by a rest client),
			* or completely standalone.  Use the appropriate timeouts in each case */timeouts=this&&this.timeouts||timeouts||Defaults.TIMEOUTS;return new Request(undefined,uri,headers,Utils.copy(params),body,requestMode,timeouts);};function Request(id,uri,headers,params,body,requestMode,timeouts){EventEmitter.call(this);if(id===undefined)id=idCounter++;this.id=id;this.uri=uri;this.params=params||{};this.params.rnd=Utils.randStr();if(headers){/* JSONP doesn't allow headers. Cherry-pick a couple to turn into qs params */if(headers['X-Ably-Version'])this.params.v=headers['X-Ably-Version'];if(headers['X-Ably-Lib'])this.params.lib=headers['X-Ably-Lib'];}this.body=body;this.requestMode=requestMode;this.timeouts=timeouts;this.requestComplete=false;}Utils.inherits(Request,EventEmitter);Request.prototype.exec=function(){var id=this.id,body=this.body,uri=this.uri,params=this.params,self=this;params.callback='_ablyjs_jsonp._('+id+')';params.envelope='jsonp';if(body)params.body=body;var script=this.script=document.createElement('script');var src=uri+Utils.toQueryString(params);script.src=src;if(script.src.split('/').slice(-1)[0]!==src.split('/').slice(-1)[0]){/* The src has been truncated. Can't abort, but can at least emit an
				* error so the user knows what's gone wrong. (Can't compare strings
				* directly as src may have a port, script.src won't) */Logger.logAction(Logger.LOG_ERROR,'JSONP Request.exec()','Warning: the browser appears to have truncated the script URI. This will likely result in the request failing due to an unparseable body param');}script.async=true;script.type='text/javascript';script.charset='UTF-8';script.onerror=function(err){self.complete(new ErrorInfo('JSONP script error (event: '+Utils.inspect(err)+')',null,400));};_['_'+id]=function(message){if(message.statusCode){/* Handle as enveloped jsonp, as all jsonp transport uses should be */var response=message.response;if(message.statusCode==204){self.complete(null,null,null,message.statusCode);}else if(!response){self.complete(new ErrorInfo('Invalid server response: no envelope detected',null,500));}else if(message.statusCode<400||Utils.isArray(response)){/* If response is an array, it's an array of protocol messages -- even if
						* it contains an error action (hence the nonsuccess statuscode), we can
						* consider the request to have succeeded, just pass it on to
						* onProtocolMessage to decide what to do */self.complete(null,response,message.headers,message.statusCode);}else{var err=response.error||new ErrorInfo('Error response received from server',null,message.statusCode);self.complete(err);}}else{/* Handle as non-enveloped -- as will be eg from a customer's authUrl server */self.complete(null,message);}};var timeout=this.requestMode==CometTransport.REQ_SEND?this.timeouts.httpRequestTimeout:this.timeouts.recvTimeout;this.timer=setTimeout(function(){self.abort();},timeout);head.insertBefore(script,head.firstChild);};Request.prototype.complete=function(err,body,headers,statusCode){headers=headers||{};if(!this.requestComplete){this.requestComplete=true;var contentType;if(body){contentType=typeof body=='string'?'text/plain':'application/json';headers['content-type']=contentType;this.emit('data',body);}this.emit('complete',err,body,headers,/* unpacked: */true,statusCode);this.dispose();}};Request.prototype.abort=function(){this.dispose();};Request.prototype.dispose=function(){var timer=this.timer;if(timer){clearTimeout(timer);this.timer=null;}var script=this.script;if(script.parentNode)script.parentNode.removeChild(script);delete _[this.id];this.emit('disposed');};if(!Http.Request){Http.Request=function(rest,uri,headers,params,body,callback){var req=createRequest(uri,headers,params,body,CometTransport.REQ_SEND,rest&&rest.options.timeouts);req.once('complete',callback);Utils.nextTick(function(){req.exec();});return req;};Http.checkConnectivity=function(callback){var upUrl=Defaults.jsonpInternetUpUrl;if(checksInProgress){checksInProgress.push(callback);return;}checksInProgress=[callback];Logger.logAction(Logger.LOG_MICRO,'(JSONP)Http.checkConnectivity()','Sending; '+upUrl);var req=new Request('isTheInternetUp',upUrl,null,null,null,CometTransport.REQ_SEND,Defaults.TIMEOUTS);req.once('complete',function(err,response){var result=!err&&response;Logger.logAction(Logger.LOG_MICRO,'(JSONP)Http.checkConnectivity()','Result: '+result);for(var i=0;i<checksInProgress.length;i++){checksInProgress[i](null,result);}checksInProgress=null;});Utils.nextTick(function(){req.exec();});};}return JSONPTransport;}();Ably.msgpack=msgpack;Ably.Rest=Rest;Ably.Realtime=Realtime;Realtime.ConnectionManager=ConnectionManager;Realtime.BufferUtils=Rest.BufferUtils=BufferUtils;if(typeof Crypto!=='undefined')Realtime.Crypto=Rest.Crypto=Crypto;Realtime.Defaults=Rest.Defaults=Defaults;Realtime.Http=Rest.Http=Http;Realtime.Utils=Rest.Utils=Utils;Realtime.Http=Rest.Http=Http;Realtime.Message=Rest.Message=Message;Realtime.PresenceMessage=Rest.PresenceMessage=PresenceMessage;Realtime.ProtocolMessage=Rest.ProtocolMessage=ProtocolMessage;module.exports=Ably;/* SystemJS support for default exports to be added to the root of the module
	  https://github.com/frankwallis/plugin-typescript/issues/185 */module.exports.__esModule=true;}).call(this,require("buffer").Buffer);},{"buffer":3}],2:[function(require,module,exports){},{}],3:[function(require,module,exports){(function(global){/*!
	* The buffer module from node.js, for the browser.
	*
	* @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	* @license  MIT
	*//* eslint-disable no-proto */'use strict';var base64=require('base64-js');var ieee754=require('ieee754');var isArray=require('isarray');exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;/**
	* If `Buffer.TYPED_ARRAY_SUPPORT`:
	*   === true    Use Uint8Array implementation (fastest)
	*   === false   Use Object implementation (most compatible, even IE6)
	*
	* Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	* Opera 11.6+, iOS 4.2+.
	*
	* Due to various browser bugs, sometimes the Object implementation will be used even
	* when the browser supports typed arrays.
	*
	* Note:
	*
	*   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	*     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	*
	*   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	*
	*   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	*     incorrect length in some situations.
   
	* We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	* get the Object implementation, which is slower but behaves correctly.
	*/Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?global.TYPED_ARRAY_SUPPORT:typedArraySupport();/*
	* Export kMaxLength after typed array support is determined.
	*/exports.kMaxLength=kMaxLength();function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function foo(){return 42;}};return arr.foo()===42&&// typed array instances can be augmented
   typeof arr.subarray==='function'&&// chrome 9-10 lack `subarray`
   arr.subarray(1,1).byteLength===0;// ie10 has broken `subarray`
   }catch(e){return false;}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?0x7fffffff:0x3fffffff;}function createBuffer(that,length){if(kMaxLength()<length){throw new RangeError('Invalid typed array length');}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
   that=new Uint8Array(length);that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
   if(that===null){that=new Buffer(length);}that.length=length;}return that;}/**
	* The Buffer constructor returns instances of `Uint8Array` that have their
	* prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	* `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	* and the `Uint8Array` methods. Square bracket notation works as expected -- it
	* returns a single octet.
	*
	* The `Uint8Array` prototype remains unmodified.
	*/function Buffer(arg,encodingOrOffset,length){if(!Buffer.TYPED_ARRAY_SUPPORT&&!(this instanceof Buffer)){return new Buffer(arg,encodingOrOffset,length);}// Common case.
   if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new Error('If encoding is specified then the first argument must be a string');}return allocUnsafe(this,arg);}return from(this,arg,encodingOrOffset,length);}Buffer.poolSize=8192;// not used by this implementation
   // TODO: Legacy, not needed anymore. Remove in next major version.
   Buffer._augment=function(arr){arr.__proto__=Buffer.prototype;return arr;};function from(that,value,encodingOrOffset,length){if(typeof value==='number'){throw new TypeError('"value" argument must not be a number');}if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){return fromArrayBuffer(that,value,encodingOrOffset,length);}if(typeof value==='string'){return fromString(that,value,encodingOrOffset);}return fromObject(that,value);}/**
	* Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	* if value is a number.
	* Buffer.from(str[, encoding])
	* Buffer.from(array)
	* Buffer.from(buffer)
	* Buffer.from(arrayBuffer[, byteOffset[, length]])
	**/Buffer.from=function(value,encodingOrOffset,length){return from(null,value,encodingOrOffset,length);};if(Buffer.TYPED_ARRAY_SUPPORT){Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;if(typeof Symbol!=='undefined'&&Symbol.species&&Buffer[Symbol.species]===Buffer){// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
   Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true});}}function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be a number');}else if(size<0){throw new RangeError('"size" argument must not be negative');}}function alloc(that,size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(that,size);}if(fill!==undefined){// Only pay attention to encoding if it's a string. This
   // prevents accidentally sending in a number that would
   // be interpretted as a start offset.
   return typeof encoding==='string'?createBuffer(that,size).fill(fill,encoding):createBuffer(that,size).fill(fill);}return createBuffer(that,size);}/**
	* Creates a new filled Buffer instance.
	* alloc(size[, fill[, encoding]])
	**/Buffer.alloc=function(size,fill,encoding){return alloc(null,size,fill,encoding);};function allocUnsafe(that,size){assertSize(size);that=createBuffer(that,size<0?0:checked(size)|0);if(!Buffer.TYPED_ARRAY_SUPPORT){for(var i=0;i<size;++i){that[i]=0;}}return that;}/**
	* Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	* */Buffer.allocUnsafe=function(size){return allocUnsafe(null,size);};/**
	* Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	*/Buffer.allocUnsafeSlow=function(size){return allocUnsafe(null,size);};function fromString(that,string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8';}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding');}var length=byteLength(string,encoding)|0;that=createBuffer(that,length);var actual=that.write(string,encoding);if(actual!==length){// Writing a hex string, for example, that contains invalid characters will
   // cause everything after the first invalid character to be ignored. (e.g.
   // 'abxxcd' will be treated as 'ab')
   that=that.slice(0,actual);}return that;}function fromArrayLike(that,array){var length=array.length<0?0:checked(array.length)|0;that=createBuffer(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255;}return that;}function fromArrayBuffer(that,array,byteOffset,length){array.byteLength;// this throws if `array` is not a valid ArrayBuffer
   if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('\'offset\' is out of bounds');}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('\'length\' is out of bounds');}if(byteOffset===undefined&&length===undefined){array=new Uint8Array(array);}else if(length===undefined){array=new Uint8Array(array,byteOffset);}else{array=new Uint8Array(array,byteOffset,length);}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
   that=array;that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
   that=fromArrayLike(that,array);}return that;}function fromObject(that,obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;that=createBuffer(that,len);if(that.length===0){return that;}obj.copy(that,0,0,len);return that;}if(obj){if(typeof ArrayBuffer!=='undefined'&&obj.buffer instanceof ArrayBuffer||'length'in obj){if(typeof obj.length!=='number'||isnan(obj.length)){return createBuffer(that,0);}return fromArrayLike(that,obj);}if(obj.type==='Buffer'&&isArray(obj.data)){return fromArrayLike(that,obj.data);}}throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');}function checked(length){// Note: cannot use `length < kMaxLength()` here because that fails when
   // length is NaN (which is otherwise coerced to zero.)
   if(length>=kMaxLength()){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+kMaxLength().toString(16)+' bytes');}return length|0;}function SlowBuffer(length){if(+length!=length){// eslint-disable-line eqeqeq
   length=0;}return Buffer.alloc(+length);}Buffer.isBuffer=function isBuffer(b){return!!(b!=null&&b._isBuffer);};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('Arguments must be Buffers');}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'latin1':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return true;default:return false;}};Buffer.concat=function concat(list,length){if(!isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers');}if(list.length===0){return Buffer.alloc(0);}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer,pos);pos+=buf.length;}return buffer;};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length;}if(typeof ArrayBuffer!=='undefined'&&typeof ArrayBuffer.isView==='function'&&(ArrayBuffer.isView(string)||string instanceof ArrayBuffer)){return string.byteLength;}if(typeof string!=='string'){string=''+string;}var len=string.length;if(len===0)return 0;// Use a for loop to avoid recursion
   var loweredCase=false;for(;;){switch(encoding){case'ascii':case'latin1':case'binary':return len;case'utf8':case'utf-8':case undefined:return utf8ToBytes(string).length;case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return len*2;case'hex':return len>>>1;case'base64':return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;// assume utf8
   encoding=(''+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
   // property of a typed array.
   // This behaves neither like String nor Uint8Array in that we set start/end
   // to their upper/lower bounds if the value passed is out of range.
   // undefined is handled specially as per ECMA-262 6th Edition,
   // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
   if(start===undefined||start<0){start=0;}// Return early if start > this.length. Done here to prevent potential uint32
   // coercion fail below.
   if(start>this.length){return'';}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return'';}// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
   end>>>=0;start>>>=0;if(end<=start){return'';}if(!encoding)encoding='utf8';while(true){switch(encoding){case'hex':return hexSlice(this,start,end);case'utf8':case'utf-8':return utf8Slice(this,start,end);case'ascii':return asciiSlice(this,start,end);case'latin1':case'binary':return latin1Slice(this,start,end);case'base64':return base64Slice(this,start,end);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(encoding+'').toLowerCase();loweredCase=true;}}}// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
   // Buffer instances.
   Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits');}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this;};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits');}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this;};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits');}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this;};Buffer.prototype.toString=function toString(){var length=this.length|0;if(length===0)return'';if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments);};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');if(this===b)return true;return Buffer.compare(this,b)===0;};Buffer.prototype.inspect=function inspect(){var str='';var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString('hex',0,max).match(/.{2}/g).join(' ');if(this.length>max)str+=' ... ';}return'<Buffer '+str+'>';};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError('Argument must be a Buffer');}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index');}if(thisStart>=thisEnd&&start>=end){return 0;}if(thisStart>=thisEnd){return-1;}if(start>=end){return 1;}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
   // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
   //
   // Arguments:
   // - buffer - a Buffer to search
   // - val - a string, Buffer, or number
   // - byteOffset - an index into `buffer`; will be clamped to an int32
   // - encoding - an optional encoding, relevant is val is a string
   // - dir - true for indexOf, false for lastIndexOf
   function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){// Empty buffer means no match
   if(buffer.length===0)return-1;// Normalize byteOffset
   if(typeof byteOffset==='string'){encoding=byteOffset;byteOffset=0;}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff;}else if(byteOffset<-0x80000000){byteOffset=-0x80000000;}byteOffset=+byteOffset;// Coerce to Number.
   if(isNaN(byteOffset)){// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
   byteOffset=dir?0:buffer.length-1;}// Normalize byteOffset: negative offsets start from the end of the buffer
   if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return-1;}// Normalize val
   if(typeof val==='string'){val=Buffer.from(val,encoding);}// Finally, search either indexOf (if dir is true) or lastIndexOf
   if(Buffer.isBuffer(val)){// Special case: looking for empty string/buffer always fails
   if(val.length===0){return-1;}return arrayIndexOf(buffer,val,byteOffset,encoding,dir);}else if(typeof val==='number'){val=val&0xFF;// Search for a byte value [0-255]
   if(Buffer.TYPED_ARRAY_SUPPORT&&typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);}throw new TypeError('val must be string, number or Buffer');}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1;}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i];}else{return buf.readUInt16BE(i*indexSize);}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize;}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break;}}if(found)return i;}}return-1;}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1;};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true);};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false);};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else{length=Number(length);if(length>remaining){length=remaining;}}// must be an even number of digits
   var strLen=string.length;if(strLen%2!==0)throw new TypeError('Invalid hex string');if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(isNaN(parsed))return i;buf[offset+i]=parsed;}return i;}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length);}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length);}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length);}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);}Buffer.prototype.write=function write(string,offset,length,encoding){// Buffer#write(string)
   if(offset===undefined){encoding='utf8';length=this.length;offset=0;// Buffer#write(string, encoding)
   }else if(length===undefined&&typeof offset==='string'){encoding=offset;length=this.length;offset=0;// Buffer#write(string, offset[, length][, encoding])
   }else if(isFinite(offset)){offset=offset|0;if(isFinite(length)){length=length|0;if(encoding===undefined)encoding='utf8';}else{encoding=length;length=undefined;}// legacy write(string, encoding, offset, length) - remove in v0.13
   }else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds');}if(!encoding)encoding='utf8';var loweredCase=false;for(;;){switch(encoding){case'hex':return hexWrite(this,string,offset,length);case'utf8':case'utf-8':return utf8Write(this,string,offset,length);case'ascii':return asciiWrite(this,string,offset,length);case'latin1':case'binary':return latin1Write(this,string,offset,length);case'base64':// Warning: maxLength not taken into account in base64Write
   return base64Write(this,string,offset,length);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(''+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)};};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf);}else{return base64.fromByteArray(buf.slice(start,end));}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>0xEF?4:firstByte>0xDF?3:firstByte>0xBF?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;if(tempCodePoint>0x7F){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint;}}}}if(codePoint===null){// we did not generate a valid codePoint so insert a
   // replacement char (U+FFFD) and advance only 1 byte
   codePoint=0xFFFD;bytesPerSequence=1;}else if(codePoint>0xFFFF){// encode to utf16 (surrogate pair dance)
   codePoint-=0x10000;res.push(codePoint>>>10&0x3FF|0xD800);codePoint=0xDC00|codePoint&0x3FF;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res);}// Based on http://stackoverflow.com/a/22747272/680742, the browser with
   // the lowest limit is Chrome, with 0x10000 args.
   // We go 1 magnitude less, for safety
   var MAX_ARGUMENTS_LENGTH=0x1000;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints);// avoid extra slice()
   }// Decode in chunks to avoid "call stack size exceeded".
   var res='';var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F);}return ret;}function latin1Slice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out='';for(var i=start;i<end;++i){out+=toHex(buf[i]);}return out;}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res='';for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res;}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT){newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;}else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,undefined);for(var i=0;i<sliceLen;++i){newBuf[i]=this[i+start];}}return newBuf;};/*
	* Need to make sure that buffer isn't trying to write out of bounds.
	*/function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}return val;};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=0x100)){val+=this[offset+--byteLength]*mul;}return val;};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);return this[offset];};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8;};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1];};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*0x1000000;};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*0x1000000+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3]);};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=0x100)){val+=this[offset+--i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readInt8=function readInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&0x80))return this[offset];return(0xff-this[offset]+1)*-1;};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24;};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3];};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4);};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4);};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8);};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8);};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError('Index out of range');}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0xff,0);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);this[offset]=value&0xff;return offset+1;};function objectWriteUInt16(buf,value,offset,littleEndian){if(value<0)value=0xffff+value+1;for(var i=0,j=Math.min(buf.length-offset,2);i<j;++i){buf[offset+i]=(value&0xff<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8;}}Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};function objectWriteUInt32(buf,value,offset,littleEndian){if(value<0)value=0xffffffff+value+1;for(var i=0,j=Math.min(buf.length-offset,4);i<j;++i){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&0xff;}}Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&0xff;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);if(value<0)value=0xff+value+1;this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(value<0)value=0xffffffff+value+1;if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range');if(offset<0)throw new RangeError('Index out of range');}function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4;}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert);};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert);};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8;}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert);};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert);};// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
   Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;// Copy 0 bytes; we're done
   if(end===start)return 0;if(target.length===0||this.length===0)return 0;// Fatal error conditions
   if(targetStart<0){throw new RangeError('targetStart out of bounds');}if(start<0||start>=this.length)throw new RangeError('sourceStart out of bounds');if(end<0)throw new RangeError('sourceEnd out of bounds');// Are we oob?
   if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){// descending copy from end
   for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else if(len<1000||!Buffer.TYPED_ARRAY_SUPPORT){// ascending copy from start
   for(i=0;i<len;++i){target[i+targetStart]=this[i+start];}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart);}return len;};// Usage:
   //    buffer.fill(number[, offset[, end]])
   //    buffer.fill(buffer[, offset[, end]])
   //    buffer.fill(string[, offset[, end]][, encoding])
   Buffer.prototype.fill=function fill(val,start,end,encoding){// Handle string cases:
   if(typeof val==='string'){if(typeof start==='string'){encoding=start;start=0;end=this.length;}else if(typeof end==='string'){encoding=end;end=this.length;}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code;}}if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string');}if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}}else if(typeof val==='number'){val=val&255;}// Invalid ranges are not set to a default, so can range check early.
   if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index');}if(end<=start){return this;}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val;}}else{var bytes=Buffer.isBuffer(val)?val:utf8ToBytes(new Buffer(val,encoding).toString());var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this;};// HELPER FUNCTIONS
   // ================
   var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(str){// Node strips out invalid characters like \n and \t from the string, base64-js does not
   str=stringtrim(str).replace(INVALID_BASE64_RE,'');// Node converts strings with length < 2 to ''
   if(str.length<2)return'';// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
   while(str.length%4!==0){str=str+'=';}return str;}function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,'');}function toHex(n){if(n<16)return'0'+n.toString(16);return n.toString(16);}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);// is surrogate component
   if(codePoint>0xD7FF&&codePoint<0xE000){// last char was a lead
   if(!leadSurrogate){// no lead yet
   if(codePoint>0xDBFF){// unexpected trail
   if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}else if(i+1===length){// unpaired lead
   if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}// valid lead
   leadSurrogate=codePoint;continue;}// 2 leads in a row
   if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);leadSurrogate=codePoint;continue;}// valid surrogate pair
   codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;}else if(leadSurrogate){// valid bmp char, but last char was a lead
   if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);}leadSurrogate=null;// encode utf8
   if(codePoint<0x80){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<0x800){if((units-=2)<0)break;bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80);}else if(codePoint<0x10000){if((units-=3)<0)break;bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else if(codePoint<0x110000){if((units-=4)<0)break;bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else{throw new Error('Invalid code point');}}return bytes;}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){// Node's code seems to be doing this and not & 0x7F..
   byteArray.push(str.charCodeAt(i)&0xFF);}return byteArray;}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str){return base64.toByteArray(base64clean(str));}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i;}function isnan(val){return val!==val;// eslint-disable-line no-self-compare
   }}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"base64-js":4,"ieee754":5,"isarray":6}],4:[function(require,module,exports){'use strict';exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}revLookup['-'.charCodeAt(0)]=62;revLookup['_'.charCodeAt(0)]=63;function placeHoldersCount(b64){var len=b64.length;if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4');}// the number of equal signs (place holders)
   // if there are two placeholders, than the two characters before it
   // represent one byte
   // if there is only one, then the three characters before it represent 2 bytes
   // this is just a cheap hack to not do indexOf twice
   return b64[len-2]==='='?2:b64[len-1]==='='?1:0;}function byteLength(b64){// base64 is 4/3 + up to two characters of the original data
   return b64.length*3/4-placeHoldersCount(b64);}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;placeHolders=placeHoldersCount(b64);arr=new Arr(len*3/4-placeHolders);// if there are placeholders, only get up to the last complete 4 chars
   l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&0xFF;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&0xFF;}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}return arr;}function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp));}return output.join('');}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;// if we have 1 byte left, pad 2 bytes
   var output='';var parts=[];var maxChunkLength=16383;// must be multiple of 3
   // go through the array every three bytes, we'll deal with trailing stuff later
   for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}// pad the end with zeros, but make sure to not forget the extra bytes
   if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&0x3F];output+='==';}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&0x3F];output+=lookup[tmp<<2&0x3F];output+='=';}parts.push(output);return parts.join('');}},{}],5:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity;}else{m=m+Math.pow(2,mLen);e=e-eBias;}return(s?-1:1)*m*Math.pow(2,e-mLen);};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else{value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};},{}],6:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]';};},{}],7:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
   //
   // Permission is hereby granted, free of charge, to any person obtaining a
   // copy of this software and associated documentation files (the
   // "Software"), to deal in the Software without restriction, including
   // without limitation the rights to use, copy, modify, merge, publish,
   // distribute, sublicense, and/or sell copies of the Software, and to permit
   // persons to whom the Software is furnished to do so, subject to the
   // following conditions:
   //
   // The above copyright notice and this permission notice shall be included
   // in all copies or substantial portions of the Software.
   //
   // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
   // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
   // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
   // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
   // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
   // USE OR OTHER DEALINGS IN THE SOFTWARE.
   function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined;}module.exports=EventEmitter;// Backwards-compat with node 0.10.x
   EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;// By default EventEmitters will print a warning if more than 10 listeners are
   // added to it. This is a useful default which helps finding memory leaks.
   EventEmitter.defaultMaxListeners=10;// Obviously not all Emitters should be limited to 10. This function allows
   // that to be increased. Set to zero for unlimited.
   EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError('n must be a positive number');this._maxListeners=n;return this;};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};// If there is no 'error' event listener then throw.
   if(type==='error'){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er;// Unhandled 'error' event
   }else{// At least give some kind of context to the user
   var err=new Error('Uncaught, unspecified "error" event. ('+er+')');err.context=er;throw err;}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){// fast cases
   case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;// slower
   default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args);}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++){listeners[i].apply(this,args);}}return true;};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events)this._events={};// To avoid recursion in the case that type === "newListener"! Before
   // adding it to the listeners, first emit "newListener".
   if(this._events.newListener)this.emit('newListener',type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])// Optimize the case of one listener. Don't need the extra array object.
   this._events[type]=listener;else if(isObject(this._events[type]))// If we've already got an array, just append.
   this._events[type].push(listener);else// Adding the second element, need to change to array.
   this._events[type]=[this._events[type],listener];// Check for listener leak
   if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners;}else{m=EventEmitter.defaultMaxListeners;}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error('(node) warning: possible EventEmitter memory '+'leak detected. %d listeners added. '+'Use emitter.setMaxListeners() to increase limit.',this._events[type].length);if(typeof console.trace==='function'){// not supported in IE 10
   console.trace();}}}return this;};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError('listener must be a function');var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments);}}g.listener=listener;this.on(type,g);return this;};// emits a 'removeListener' event iff the listener was removed
   EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit('removeListener',type,listener);}else if(isObject(list)){for(i=length;i-->0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break;}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type];}else{list.splice(position,1);}if(this._events.removeListener)this.emit('removeListener',type,listener);}return this;};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;// not listening for removeListener, no need to emit
   if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this;}// emit removeListener for all listeners on all events
   if(arguments.length===0){for(key in this._events){if(key==='removeListener')continue;this.removeAllListeners(key);}this.removeAllListeners('removeListener');this._events={};return this;}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners);}else if(listeners){// LIFO order
   while(listeners.length){this.removeListener(type,listeners[listeners.length-1]);}}delete this._events[type];return this;};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret;};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length;}return 0;};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type);};function isFunction(arg){return typeof arg==='function';}function isNumber(arg){return typeof arg==='number';}function isObject(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&arg!==null;}function isUndefined(arg){return arg===void 0;}},{}],8:[function(require,module,exports){// shim for using process in browser
   var process=module.exports={};// cached from whatever global is present so that test runners that stub it
   // don't break things.  But we need to wrap it in a try catch in case it is
   // wrapped in strict mode code which doesn't define any globals.  It's inside a
   // function because try/catches deoptimize in certain engines.
   var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
   return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
   if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
   return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
   return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
   return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
   return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
   if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
   return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
   return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
   // Some versions of I.E. have different rules for clearTimeout vs setTimeout
   return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
   function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
   process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],9:[function(require,module,exports){!function(e,t){"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))&&"object"==(typeof module==="undefined"?"undefined":_typeof(module))?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?exports.PubNub=t():e.PubNub=t();}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports;}var n={};return t.m=e,t.c=n,t.p="",t(0);}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=(typeof t==="undefined"?"undefined":_typeof(t))&&"function"!=typeof t?e:t;}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(typeof t==="undefined"?"undefined":_typeof(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}function a(e){if(!navigator||!navigator.sendBeacon)return!1;navigator.sendBeacon(e);}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),c=r(u),l=n(40),h=r(l),f=n(41),d=r(f),p=n(42),g=(n(8),function(e){function t(e){i(this,t);var n=e.listenToBrowserNetworkEvents,r=void 0===n||n;e.db=d.default,e.sdkFamily="Web",e.networking=new h.default({get:p.get,post:p.post,sendBeacon:a});var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r&&(window.addEventListener("offline",function(){s.networkDownDetected();}),window.addEventListener("online",function(){s.networkUpDetected();})),s;}return s(t,e),t;}(c.default));t.default=g,e.exports=t.default;},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e){Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);}return t.default=e,t;}function i(e){return e&&e.__esModule?e:{default:e};}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),a=n(2),u=i(a),c=n(7),l=i(c),h=n(9),f=i(h),d=n(11),p=i(d),g=n(12),y=i(g),v=n(18),b=i(v),_=n(19),m=r(_),k=n(20),P=r(k),S=n(21),O=r(S),w=n(22),T=r(w),C=n(23),M=r(C),x=n(24),E=r(x),N=n(25),R=r(N),K=n(26),A=r(K),j=n(27),D=r(j),G=n(28),U=r(G),B=n(29),I=r(B),H=n(30),L=r(H),q=n(31),F=r(q),z=n(32),X=r(z),W=n(33),V=r(W),J=n(34),$=r(J),Q=n(35),Y=r(Q),Z=n(36),ee=r(Z),te=n(37),ne=r(te),re=n(38),ie=r(re),oe=n(15),se=r(oe),ae=n(39),ue=r(ae),ce=n(16),le=i(ce),he=n(13),fe=i(he),de=(n(8),function(){function e(t){var n=this;o(this,e);var r=t.db,i=t.networking,s=this._config=new l.default({setup:t,db:r}),a=new f.default({config:s});i.init(s);var u={config:s,networking:i,crypto:a},c=b.default.bind(this,u,se),h=b.default.bind(this,u,U),d=b.default.bind(this,u,L),g=b.default.bind(this,u,X),v=b.default.bind(this,u,ue),_=this._listenerManager=new y.default(),k=new p.default({timeEndpoint:c,leaveEndpoint:h,heartbeatEndpoint:d,setStateEndpoint:g,subscribeEndpoint:v,crypto:u.crypto,config:u.config,listenerManager:_});this.addListener=_.addListener.bind(_),this.removeListener=_.removeListener.bind(_),this.removeAllListeners=_.removeAllListeners.bind(_),this.channelGroups={listGroups:b.default.bind(this,u,T),listChannels:b.default.bind(this,u,M),addChannels:b.default.bind(this,u,m),removeChannels:b.default.bind(this,u,P),deleteGroup:b.default.bind(this,u,O)},this.push={addChannels:b.default.bind(this,u,E),removeChannels:b.default.bind(this,u,R),deleteDevice:b.default.bind(this,u,D),listChannels:b.default.bind(this,u,A)},this.hereNow=b.default.bind(this,u,V),this.whereNow=b.default.bind(this,u,I),this.getState=b.default.bind(this,u,F),this.setState=k.adaptStateChange.bind(k),this.grant=b.default.bind(this,u,Y),this.audit=b.default.bind(this,u,$),this.publish=b.default.bind(this,u,ee),this.fire=function(e,t){e.replicate=!1,e.storeInHistory=!1,n.publish(e,t);},this.history=b.default.bind(this,u,ne),this.fetchMessages=b.default.bind(this,u,ie),this.time=c,this.subscribe=k.adaptSubscribeChange.bind(k),this.unsubscribe=k.adaptUnsubscribeChange.bind(k),this.disconnect=k.disconnect.bind(k),this.reconnect=k.reconnect.bind(k),this.destroy=function(e){k.unsubscribeAll(e),k.disconnect();},this.stop=this.destroy,this.unsubscribeAll=k.unsubscribeAll.bind(k),this.getSubscribedChannels=k.getSubscribedChannels.bind(k),this.getSubscribedChannelGroups=k.getSubscribedChannelGroups.bind(k),this.encrypt=a.encrypt.bind(a),this.decrypt=a.decrypt.bind(a),this.getAuthKey=u.config.getAuthKey.bind(u.config),this.setAuthKey=u.config.setAuthKey.bind(u.config),this.setCipherKey=u.config.setCipherKey.bind(u.config),this.getUUID=u.config.getUUID.bind(u.config),this.setUUID=u.config.setUUID.bind(u.config),this.getFilterExpression=u.config.getFilterExpression.bind(u.config),this.setFilterExpression=u.config.setFilterExpression.bind(u.config);}return s(e,[{key:"getVersion",value:function value(){return this._config.getVersion();}},{key:"networkDownDetected",value:function value(){this._listenerManager.announceNetworkDown(),this._config.restore?this.disconnect():this.destroy(!0);}},{key:"networkUpDetected",value:function value(){this._listenerManager.announceNetworkUp(),this.reconnect();}}],[{key:"generateUUID",value:function value(){return u.default.v4();}}]),e;}());de.OPERATIONS=le.default,de.CATEGORIES=fe.default,t.default=de,e.exports=t.default;},function(e,t,n){var r=n(3),i=n(6),o=i;o.v1=r,o.v4=i,e.exports=o;},function(e,t,n){function r(e,t,n){var r=t&&n||0,i=t||[];e=e||{};var s=void 0!==e.clockseq?e.clockseq:u,h=void 0!==e.msecs?e.msecs:new Date().getTime(),f=void 0!==e.nsecs?e.nsecs:l+1,d=h-c+(f-l)/1e4;if(d<0&&void 0===e.clockseq&&(s=s+1&16383),(d<0||h>c)&&void 0===e.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=h,l=f,u=s,h+=122192928e5;var p=(1e4*(268435455&h)+f)%4294967296;i[r++]=p>>>24&255,i[r++]=p>>>16&255,i[r++]=p>>>8&255,i[r++]=255&p;var g=h/4294967296*1e4&268435455;i[r++]=g>>>8&255,i[r++]=255&g,i[r++]=g>>>24&15|16,i[r++]=g>>>16&255,i[r++]=s>>>8|128,i[r++]=255&s;for(var y=e.node||a,v=0;v<6;++v){i[r+v]=y[v];}return t?t:o(i);}var i=n(4),o=n(5),s=i(),a=[1|s[0],s[1],s[2],s[3],s[4],s[5]],u=16383&(s[6]<<8|s[7]),c=0,l=0;e.exports=r;},function(e,t){(function(t){var n,r=t ? t.crypto||t.msCrypto : window.crypto;if(r&&r.getRandomValues){var i=new Uint8Array(16);n=function n(){return r.getRandomValues(i),i;};}if(!n){var o=new Array(16);n=function n(){for(var e,t=0;t<16;t++){0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;}return o;};}e.exports=n;}).call(t,function(){return this;}());},function(e,t){function n(e,t){var n=t||0,i=r;return i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]];}for(var r=[],i=0;i<256;++i){r[i]=(i+256).toString(16).substr(1);}e.exports=n;},function(e,t,n){function r(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var s=e.random||(e.rng||i)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t)for(var a=0;a<16;++a){t[r+a]=s[a];}return t||o(s);}var i=n(4),o=n(5);e.exports=r;},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),o=n(2),s=function(e){return e&&e.__esModule?e:{default:e};}(o),a=(n(8),function(){function e(t){var n=t.setup,i=t.db;r(this,e),this._db=i,this.instanceId="pn-"+s.default.v4(),this.secretKey=n.secretKey||n.secret_key,this.subscribeKey=n.subscribeKey||n.subscribe_key,this.publishKey=n.publishKey||n.publish_key,this.sdkFamily=n.sdkFamily,this.partnerId=n.partnerId,this.setAuthKey(n.authKey),this.setCipherKey(n.cipherKey),this.setFilterExpression(n.filterExpression),this.origin=n.origin||"pubsub.pubnub.com",this.secure=n.ssl||!1,this.restore=n.restore||!1,this.proxy=n.proxy,this.keepAlive=n.keepAlive,this.keepAliveSettings=n.keepAliveSettings,"undefined"!=typeof location&&"https:"===location.protocol&&(this.secure=!0),this.logVerbosity=n.logVerbosity||!1,this.suppressLeaveEvents=n.suppressLeaveEvents||!1,this.announceFailedHeartbeats=n.announceFailedHeartbeats||!0,this.announceSuccessfulHeartbeats=n.announceSuccessfulHeartbeats||!1,this.useInstanceId=n.useInstanceId||!1,this.useRequestId=n.useRequestId||!1,this.requestMessageCountThreshold=n.requestMessageCountThreshold,this.setTransactionTimeout(n.transactionalRequestTimeout||15e3),this.setSubscribeTimeout(n.subscribeRequestTimeout||31e4),this.setSendBeaconConfig(n.useSendBeacon||!0),this.setPresenceTimeout(n.presenceTimeout||300),n.heartbeatInterval&&this.setHeartbeatInterval(n.heartbeatInterval),this.setUUID(this._decideUUID(n.uuid));}return i(e,[{key:"getAuthKey",value:function value(){return this.authKey;}},{key:"setAuthKey",value:function value(e){return this.authKey=e,this;}},{key:"setCipherKey",value:function value(e){return this.cipherKey=e,this;}},{key:"getUUID",value:function value(){return this.UUID;}},{key:"setUUID",value:function value(e){return this._db&&this._db.set&&this._db.set(this.subscribeKey+"uuid",e),this.UUID=e,this;}},{key:"getFilterExpression",value:function value(){return this.filterExpression;}},{key:"setFilterExpression",value:function value(e){return this.filterExpression=e,this;}},{key:"getPresenceTimeout",value:function value(){return this._presenceTimeout;}},{key:"setPresenceTimeout",value:function value(e){return this._presenceTimeout=e,this.setHeartbeatInterval(this._presenceTimeout/2-1),this;}},{key:"getHeartbeatInterval",value:function value(){return this._heartbeatInterval;}},{key:"setHeartbeatInterval",value:function value(e){return this._heartbeatInterval=e,this;}},{key:"getSubscribeTimeout",value:function value(){return this._subscribeRequestTimeout;}},{key:"setSubscribeTimeout",value:function value(e){return this._subscribeRequestTimeout=e,this;}},{key:"getTransactionTimeout",value:function value(){return this._transactionalRequestTimeout;}},{key:"setTransactionTimeout",value:function value(e){return this._transactionalRequestTimeout=e,this;}},{key:"isSendBeaconEnabled",value:function value(){return this._useSendBeacon;}},{key:"setSendBeaconConfig",value:function value(e){return this._useSendBeacon=e,this;}},{key:"getVersion",value:function value(){return"4.8.0";}},{key:"_decideUUID",value:function value(e){return e?e:this._db&&this._db.get&&this._db.get(this.subscribeKey+"uuid")?this._db.get(this.subscribeKey+"uuid"):"pn-"+s.default.v4();}}]),e;}());t.default=a,e.exports=t.default;},function(e,t){"use strict";e.exports={};},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),s=n(7),a=(r(s),n(10)),u=r(a),c=function(){function e(t){var n=t.config;i(this,e),this._config=n,this._iv="0123456789012345",this._allowedKeyEncodings=["hex","utf8","base64","binary"],this._allowedKeyLengths=[128,256],this._allowedModes=["ecb","cbc"],this._defaultOptions={encryptKey:!0,keyEncoding:"utf8",keyLength:256,mode:"cbc"};}return o(e,[{key:"HMACSHA256",value:function value(e){return u.default.HmacSHA256(e,this._config.secretKey).toString(u.default.enc.Base64);}},{key:"SHA256",value:function value(e){return u.default.SHA256(e).toString(u.default.enc.Hex);}},{key:"_parseOptions",value:function value(e){var t=e||{};return t.hasOwnProperty("encryptKey")||(t.encryptKey=this._defaultOptions.encryptKey),t.hasOwnProperty("keyEncoding")||(t.keyEncoding=this._defaultOptions.keyEncoding),t.hasOwnProperty("keyLength")||(t.keyLength=this._defaultOptions.keyLength),t.hasOwnProperty("mode")||(t.mode=this._defaultOptions.mode),this._allowedKeyEncodings.indexOf(t.keyEncoding.toLowerCase())===-1&&(t.keyEncoding=this._defaultOptions.keyEncoding),this._allowedKeyLengths.indexOf(parseInt(t.keyLength,10))===-1&&(t.keyLength=this._defaultOptions.keyLength),this._allowedModes.indexOf(t.mode.toLowerCase())===-1&&(t.mode=this._defaultOptions.mode),t;}},{key:"_decodeKey",value:function value(e,t){return"base64"===t.keyEncoding?u.default.enc.Base64.parse(e):"hex"===t.keyEncoding?u.default.enc.Hex.parse(e):e;}},{key:"_getPaddedKey",value:function value(e,t){return e=this._decodeKey(e,t),t.encryptKey?u.default.enc.Utf8.parse(this.SHA256(e).slice(0,32)):e;}},{key:"_getMode",value:function value(e){return"ecb"===e.mode?u.default.mode.ECB:u.default.mode.CBC;}},{key:"_getIV",value:function value(e){return"cbc"===e.mode?u.default.enc.Utf8.parse(this._iv):null;}},{key:"encrypt",value:function value(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),o=this._getPaddedKey(t||this._config.cipherKey,n);return u.default.AES.encrypt(e,o,{iv:r,mode:i}).ciphertext.toString(u.default.enc.Base64)||e;}},{key:"decrypt",value:function value(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),o=this._getPaddedKey(t||this._config.cipherKey,n);try{var s=u.default.enc.Base64.parse(e),a=u.default.AES.decrypt({ciphertext:s},o,{iv:r,mode:i}).toString(u.default.enc.Utf8);return JSON.parse(a);}catch(e){return null;}}}]),e;}();t.default=c,e.exports=t.default;},function(e,t){"use strict";var n=n||function(e,t){var n={},r=n.lib={},i=function i(){},o=r.Base={extend:function extend(e){i.prototype=this;var t=new i();return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments);}),t.init.prototype=t,t.$super=this,t;},create:function create(){var e=this.extend();return e.init.apply(e,arguments),e;},init:function init(){},mixIn:function mixIn(e){for(var t in e){e.hasOwnProperty(t)&&(this[t]=e[t]);}e.hasOwnProperty("toString")&&(this.toString=e.toString);},clone:function clone(){return this.init.prototype.extend(this);}},s=r.WordArray=o.extend({init:function init(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:4*e.length;},toString:function toString(e){return(e||u).stringify(this);},concat:function concat(e){var t=this.words,n=e.words,r=this.sigBytes;if(e=e.sigBytes,this.clamp(),r%4)for(var i=0;i<e;i++){t[r+i>>>2]|=(n[i>>>2]>>>24-i%4*8&255)<<24-(r+i)%4*8;}else if(65535<n.length)for(i=0;i<e;i+=4){t[r+i>>>2]=n[i>>>2];}else t.push.apply(t,n);return this.sigBytes+=e,this;},clamp:function clamp(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4);},clone:function clone(){var e=o.clone.call(this);return e.words=this.words.slice(0),e;},random:function random(t){for(var n=[],r=0;r<t;r+=4){n.push(4294967296*e.random()|0);}return new s.init(n,t);}}),a=n.enc={},u=a.Hex={stringify:function stringify(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++){var i=t[r>>>2]>>>24-r%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16));}return n.join("");},parse:function parse(e){for(var t=e.length,n=[],r=0;r<t;r+=2){n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;}return new s.init(n,t/2);}},c=a.Latin1={stringify:function stringify(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++){n.push(String.fromCharCode(t[r>>>2]>>>24-r%4*8&255));}return n.join("");},parse:function parse(e){for(var t=e.length,n=[],r=0;r<t;r++){n[r>>>2]|=(255&e.charCodeAt(r))<<24-r%4*8;}return new s.init(n,t);}},l=a.Utf8={stringify:function stringify(e){try{return decodeURIComponent(escape(c.stringify(e)));}catch(e){throw Error("Malformed UTF-8 data");}},parse:function parse(e){return c.parse(unescape(encodeURIComponent(e)));}},h=r.BufferedBlockAlgorithm=o.extend({reset:function reset(){this._data=new s.init(),this._nDataBytes=0;},_append:function _append(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes;},_process:function _process(t){var n=this._data,r=n.words,i=n.sigBytes,o=this.blockSize,a=i/(4*o),a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0);if(t=a*o,i=e.min(4*t,i),t){for(var u=0;u<t;u+=o){this._doProcessBlock(r,u);}u=r.splice(0,t),n.sigBytes-=i;}return new s.init(u,i);},clone:function clone(){var e=o.clone.call(this);return e._data=this._data.clone(),e;},_minBufferSize:0});r.Hasher=h.extend({cfg:o.extend(),init:function init(e){this.cfg=this.cfg.extend(e),this.reset();},reset:function reset(){h.reset.call(this),this._doReset();},update:function update(e){return this._append(e),this._process(),this;},finalize:function finalize(e){return e&&this._append(e),this._doFinalize();},blockSize:16,_createHelper:function _createHelper(e){return function(t,n){return new e.init(n).finalize(t);};},_createHmacHelper:function _createHmacHelper(e){return function(t,n){return new f.HMAC.init(e,n).finalize(t);};}});var f=n.algo={};return n;}(Math);!function(e){for(var t=n,r=t.lib,i=r.WordArray,o=r.Hasher,r=t.algo,s=[],a=[],u=function u(e){return 4294967296*(e-(0|e))|0;},c=2,l=0;64>l;){var h;e:{h=c;for(var f=e.sqrt(h),d=2;d<=f;d++){if(!(h%d)){h=!1;break e;}}h=!0;}h&&(8>l&&(s[l]=u(e.pow(c,.5))),a[l]=u(e.pow(c,1/3)),l++),c++;}var p=[],r=r.SHA256=o.extend({_doReset:function _doReset(){this._hash=new i.init(s.slice(0));},_doProcessBlock:function _doProcessBlock(e,t){for(var n=this._hash.words,r=n[0],i=n[1],o=n[2],s=n[3],u=n[4],c=n[5],l=n[6],h=n[7],f=0;64>f;f++){if(16>f)p[f]=0|e[t+f];else{var d=p[f-15],g=p[f-2];p[f]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+p[f-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+p[f-16];}d=h+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&c^~u&l)+a[f]+p[f],g=((r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22))+(r&i^r&o^i&o),h=l,l=c,c=u,u=s+d|0,s=o,o=i,i=r,r=d+g|0;}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+o|0,n[3]=n[3]+s|0,n[4]=n[4]+u|0,n[5]=n[5]+c|0,n[6]=n[6]+l|0,n[7]=n[7]+h|0;},_doFinalize:function _doFinalize(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return n[i>>>5]|=128<<24-i%32,n[14+(i+64>>>9<<4)]=e.floor(r/4294967296),n[15+(i+64>>>9<<4)]=r,t.sigBytes=4*n.length,this._process(),this._hash;},clone:function clone(){var e=o.clone.call(this);return e._hash=this._hash.clone(),e;}});t.SHA256=o._createHelper(r),t.HmacSHA256=o._createHmacHelper(r);}(Math),function(){var e=n,t=e.enc.Utf8;e.algo.HMAC=e.lib.Base.extend({init:function init(e,n){e=this._hasher=new e.init(),"string"==typeof n&&(n=t.parse(n));var r=e.blockSize,i=4*r;n.sigBytes>i&&(n=e.finalize(n)),n.clamp();for(var o=this._oKey=n.clone(),s=this._iKey=n.clone(),a=o.words,u=s.words,c=0;c<r;c++){a[c]^=1549556828,u[c]^=909522486;}o.sigBytes=s.sigBytes=i,this.reset();},reset:function reset(){var e=this._hasher;e.reset(),e.update(this._iKey);},update:function update(e){return this._hasher.update(e),this;},finalize:function finalize(e){var t=this._hasher;return e=t.finalize(e),t.reset(),t.finalize(this._oKey.clone().concat(e));}});}(),function(){var e=n,t=e.lib.WordArray;e.enc.Base64={stringify:function stringify(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp(),e=[];for(var i=0;i<n;i+=3){for(var o=(t[i>>>2]>>>24-i%4*8&255)<<16|(t[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|t[i+2>>>2]>>>24-(i+2)%4*8&255,s=0;4>s&&i+.75*s<n;s++){e.push(r.charAt(o>>>6*(3-s)&63));}}if(t=r.charAt(64))for(;e.length%4;){e.push(t);}return e.join("");},parse:function parse(e){var n=e.length,r=this._map,i=r.charAt(64);i&&-1!=(i=e.indexOf(i))&&(n=i);for(var i=[],o=0,s=0;s<n;s++){if(s%4){var a=r.indexOf(e.charAt(s-1))<<s%4*2,u=r.indexOf(e.charAt(s))>>>6-s%4*2;i[o>>>2]|=(a|u)<<24-o%4*8,o++;}}return t.create(i,o);},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};}(),function(e){function t(e,t,n,r,i,o,s){return((e=e+(t&n|~t&r)+i+s)<<o|e>>>32-o)+t;}function r(e,t,n,r,i,o,s){return((e=e+(t&r|n&~r)+i+s)<<o|e>>>32-o)+t;}function i(e,t,n,r,i,o,s){return((e=e+(t^n^r)+i+s)<<o|e>>>32-o)+t;}function o(e,t,n,r,i,o,s){return((e=e+(n^(t|~r))+i+s)<<o|e>>>32-o)+t;}for(var s=n,a=s.lib,u=a.WordArray,c=a.Hasher,a=s.algo,l=[],h=0;64>h;h++){l[h]=4294967296*e.abs(e.sin(h+1))|0;}a=a.MD5=c.extend({_doReset:function _doReset(){this._hash=new u.init([1732584193,4023233417,2562383102,271733878]);},_doProcessBlock:function _doProcessBlock(e,n){for(var s=0;16>s;s++){var a=n+s,u=e[a];e[a]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8);}var s=this._hash.words,a=e[n+0],u=e[n+1],c=e[n+2],h=e[n+3],f=e[n+4],d=e[n+5],p=e[n+6],g=e[n+7],y=e[n+8],v=e[n+9],b=e[n+10],_=e[n+11],m=e[n+12],k=e[n+13],P=e[n+14],S=e[n+15],O=s[0],w=s[1],T=s[2],C=s[3],O=t(O,w,T,C,a,7,l[0]),C=t(C,O,w,T,u,12,l[1]),T=t(T,C,O,w,c,17,l[2]),w=t(w,T,C,O,h,22,l[3]),O=t(O,w,T,C,f,7,l[4]),C=t(C,O,w,T,d,12,l[5]),T=t(T,C,O,w,p,17,l[6]),w=t(w,T,C,O,g,22,l[7]),O=t(O,w,T,C,y,7,l[8]),C=t(C,O,w,T,v,12,l[9]),T=t(T,C,O,w,b,17,l[10]),w=t(w,T,C,O,_,22,l[11]),O=t(O,w,T,C,m,7,l[12]),C=t(C,O,w,T,k,12,l[13]),T=t(T,C,O,w,P,17,l[14]),w=t(w,T,C,O,S,22,l[15]),O=r(O,w,T,C,u,5,l[16]),C=r(C,O,w,T,p,9,l[17]),T=r(T,C,O,w,_,14,l[18]),w=r(w,T,C,O,a,20,l[19]),O=r(O,w,T,C,d,5,l[20]),C=r(C,O,w,T,b,9,l[21]),T=r(T,C,O,w,S,14,l[22]),w=r(w,T,C,O,f,20,l[23]),O=r(O,w,T,C,v,5,l[24]),C=r(C,O,w,T,P,9,l[25]),T=r(T,C,O,w,h,14,l[26]),w=r(w,T,C,O,y,20,l[27]),O=r(O,w,T,C,k,5,l[28]),C=r(C,O,w,T,c,9,l[29]),T=r(T,C,O,w,g,14,l[30]),w=r(w,T,C,O,m,20,l[31]),O=i(O,w,T,C,d,4,l[32]),C=i(C,O,w,T,y,11,l[33]),T=i(T,C,O,w,_,16,l[34]),w=i(w,T,C,O,P,23,l[35]),O=i(O,w,T,C,u,4,l[36]),C=i(C,O,w,T,f,11,l[37]),T=i(T,C,O,w,g,16,l[38]),w=i(w,T,C,O,b,23,l[39]),O=i(O,w,T,C,k,4,l[40]),C=i(C,O,w,T,a,11,l[41]),T=i(T,C,O,w,h,16,l[42]),w=i(w,T,C,O,p,23,l[43]),O=i(O,w,T,C,v,4,l[44]),C=i(C,O,w,T,m,11,l[45]),T=i(T,C,O,w,S,16,l[46]),w=i(w,T,C,O,c,23,l[47]),O=o(O,w,T,C,a,6,l[48]),C=o(C,O,w,T,g,10,l[49]),T=o(T,C,O,w,P,15,l[50]),w=o(w,T,C,O,d,21,l[51]),O=o(O,w,T,C,m,6,l[52]),C=o(C,O,w,T,h,10,l[53]),T=o(T,C,O,w,b,15,l[54]),w=o(w,T,C,O,u,21,l[55]),O=o(O,w,T,C,y,6,l[56]),C=o(C,O,w,T,S,10,l[57]),T=o(T,C,O,w,p,15,l[58]),w=o(w,T,C,O,k,21,l[59]),O=o(O,w,T,C,f,6,l[60]),C=o(C,O,w,T,_,10,l[61]),T=o(T,C,O,w,c,15,l[62]),w=o(w,T,C,O,v,21,l[63]);s[0]=s[0]+O|0,s[1]=s[1]+w|0,s[2]=s[2]+T|0,s[3]=s[3]+C|0;},_doFinalize:function _doFinalize(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;n[i>>>5]|=128<<24-i%32;var o=e.floor(r/4294967296);for(n[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n[14+(i+64>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(n.length+1),this._process(),t=this._hash,n=t.words,r=0;4>r;r++){i=n[r],n[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);}return t;},clone:function clone(){var e=c.clone.call(this);return e._hash=this._hash.clone(),e;}}),s.MD5=c._createHelper(a),s.HmacMD5=c._createHmacHelper(a);}(Math),function(){var e=n,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,o=t.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function init(e){this.cfg=this.cfg.extend(e);},compute:function compute(e,t){for(var n=this.cfg,r=n.hasher.create(),o=i.create(),s=o.words,a=n.keySize,n=n.iterations;s.length<a;){u&&r.update(u);var u=r.update(e).finalize(t);r.reset();for(var c=1;c<n;c++){u=r.finalize(u),r.reset();}o.concat(u);}return o.sigBytes=4*a,o;}});e.EvpKDF=function(e,t,n){return o.create(n).compute(e,t);};}(),n.lib.Cipher||function(e){var t=n,r=t.lib,i=r.Base,o=r.WordArray,s=r.BufferedBlockAlgorithm,a=t.enc.Base64,u=t.algo.EvpKDF,c=r.Cipher=s.extend({cfg:i.extend(),createEncryptor:function createEncryptor(e,t){return this.create(this._ENC_XFORM_MODE,e,t);},createDecryptor:function createDecryptor(e,t){return this.create(this._DEC_XFORM_MODE,e,t);},init:function init(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset();},reset:function reset(){s.reset.call(this),this._doReset();},process:function process(e){return this._append(e),this._process();},finalize:function finalize(e){return e&&this._append(e),this._doFinalize();},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function _createHelper(e){return{encrypt:function encrypt(t,n,r){return("string"==typeof n?g:p).encrypt(e,t,n,r);},decrypt:function decrypt(t,n,r){return("string"==typeof n?g:p).decrypt(e,t,n,r);}};}});r.StreamCipher=c.extend({_doFinalize:function _doFinalize(){return this._process(!0);},blockSize:1});var l=t.mode={},h=function h(e,t,n){var r=this._iv;r?this._iv=void 0:r=this._prevBlock;for(var i=0;i<n;i++){e[t+i]^=r[i];}},f=(r.BlockCipherMode=i.extend({createEncryptor:function createEncryptor(e,t){return this.Encryptor.create(e,t);},createDecryptor:function createDecryptor(e,t){return this.Decryptor.create(e,t);},init:function init(e,t){this._cipher=e,this._iv=t;}})).extend();f.Encryptor=f.extend({processBlock:function processBlock(e,t){var n=this._cipher,r=n.blockSize;h.call(this,e,t,r),n.encryptBlock(e,t),this._prevBlock=e.slice(t,t+r);}}),f.Decryptor=f.extend({processBlock:function processBlock(e,t){var n=this._cipher,r=n.blockSize,i=e.slice(t,t+r);n.decryptBlock(e,t),h.call(this,e,t,r),this._prevBlock=i;}}),l=l.CBC=f,f=(t.pad={}).Pkcs7={pad:function pad(e,t){for(var n=4*t,n=n-e.sigBytes%n,r=n<<24|n<<16|n<<8|n,i=[],s=0;s<n;s+=4){i.push(r);}n=o.create(i,n),e.concat(n);},unpad:function unpad(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2];}},r.BlockCipher=c.extend({cfg:c.cfg.extend({mode:l,padding:f}),reset:function reset(){c.reset.call(this);var e=this.cfg,t=e.iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=e.createEncryptor;else n=e.createDecryptor,this._minBufferSize=1;this._mode=n.call(e,this,t&&t.words);},_doProcessBlock:function _doProcessBlock(e,t){this._mode.processBlock(e,t);},_doFinalize:function _doFinalize(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0);}else t=this._process(!0),e.unpad(t);return t;},blockSize:4});var d=r.CipherParams=i.extend({init:function init(e){this.mixIn(e);},toString:function toString(e){return(e||this.formatter).stringify(this);}}),l=(t.format={}).OpenSSL={stringify:function stringify(e){var t=e.ciphertext;return e=e.salt,(e?o.create([1398893684,1701076831]).concat(e).concat(t):t).toString(a);},parse:function parse(e){e=a.parse(e);var t=e.words;if(1398893684==t[0]&&1701076831==t[1]){var n=o.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16;}return d.create({ciphertext:e,salt:n});}},p=r.SerializableCipher=i.extend({cfg:i.extend({format:l}),encrypt:function encrypt(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r);return t=i.finalize(t),i=i.cfg,d.create({ciphertext:t,key:n,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:r.format});},decrypt:function decrypt(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext);},_parse:function _parse(e,t){return"string"==typeof e?t.parse(e,this):e;}}),t=(t.kdf={}).OpenSSL={execute:function execute(e,t,n,r){return r||(r=o.random(8)),e=u.create({keySize:t+n}).compute(e,r),n=o.create(e.words.slice(t),4*n),e.sigBytes=4*t,d.create({key:e,iv:n,salt:r});}},g=r.PasswordBasedCipher=p.extend({cfg:p.cfg.extend({kdf:t}),encrypt:function encrypt(e,t,n,r){return r=this.cfg.extend(r),n=r.kdf.execute(n,e.keySize,e.ivSize),r.iv=n.iv,e=p.encrypt.call(this,e,t,n.key,r),e.mixIn(n),e;},decrypt:function decrypt(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),n=r.kdf.execute(n,e.keySize,e.ivSize,t.salt),r.iv=n.iv,p.decrypt.call(this,e,t,n.key,r);}});}(),function(){for(var e=n,t=e.lib.BlockCipher,r=e.algo,i=[],o=[],s=[],a=[],u=[],c=[],l=[],h=[],f=[],d=[],p=[],g=0;256>g;g++){p[g]=128>g?g<<1:g<<1^283;}for(var y=0,v=0,g=0;256>g;g++){var b=v^v<<1^v<<2^v<<3^v<<4,b=b>>>8^255&b^99;i[y]=b,o[b]=y;var _=p[y],m=p[_],k=p[m],P=257*p[b]^16843008*b;s[y]=P<<24|P>>>8,a[y]=P<<16|P>>>16,u[y]=P<<8|P>>>24,c[y]=P,P=16843009*k^65537*m^257*_^16843008*y,l[b]=P<<24|P>>>8,h[b]=P<<16|P>>>16,f[b]=P<<8|P>>>24,d[b]=P,y?(y=_^p[p[p[k^_]]],v^=p[p[v]]):y=v=1;}var S=[0,1,2,4,8,16,32,64,128,27,54],r=r.AES=t.extend({_doReset:function _doReset(){for(var e=this._key,t=e.words,n=e.sigBytes/4,e=4*((this._nRounds=n+6)+1),r=this._keySchedule=[],o=0;o<e;o++){if(o<n)r[o]=t[o];else{var s=r[o-1];o%n?6<n&&4==o%n&&(s=i[s>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s]):(s=s<<8|s>>>24,s=i[s>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s],s^=S[o/n|0]<<24),r[o]=r[o-n]^s;}}for(t=this._invKeySchedule=[],n=0;n<e;n++){o=e-n,s=n%4?r[o]:r[o-4],t[n]=4>n||4>=o?s:l[i[s>>>24]]^h[i[s>>>16&255]]^f[i[s>>>8&255]]^d[i[255&s]];}},encryptBlock:function encryptBlock(e,t){this._doCryptBlock(e,t,this._keySchedule,s,a,u,c,i);},decryptBlock:function decryptBlock(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,l,h,f,d,o),n=e[t+1],e[t+1]=e[t+3],e[t+3]=n;},_doCryptBlock:function _doCryptBlock(e,t,n,r,i,o,s,a){for(var u=this._nRounds,c=e[t]^n[0],l=e[t+1]^n[1],h=e[t+2]^n[2],f=e[t+3]^n[3],d=4,p=1;p<u;p++){var g=r[c>>>24]^i[l>>>16&255]^o[h>>>8&255]^s[255&f]^n[d++],y=r[l>>>24]^i[h>>>16&255]^o[f>>>8&255]^s[255&c]^n[d++],v=r[h>>>24]^i[f>>>16&255]^o[c>>>8&255]^s[255&l]^n[d++],f=r[f>>>24]^i[c>>>16&255]^o[l>>>8&255]^s[255&h]^n[d++],c=g,l=y,h=v;}g=(a[c>>>24]<<24|a[l>>>16&255]<<16|a[h>>>8&255]<<8|a[255&f])^n[d++],y=(a[l>>>24]<<24|a[h>>>16&255]<<16|a[f>>>8&255]<<8|a[255&c])^n[d++],v=(a[h>>>24]<<24|a[f>>>16&255]<<16|a[c>>>8&255]<<8|a[255&l])^n[d++],f=(a[f>>>24]<<24|a[c>>>16&255]<<16|a[l>>>8&255]<<8|a[255&h])^n[d++],e[t]=g,e[t+1]=y,e[t+2]=v,e[t+3]=f;},keySize:8});e.AES=t._createHelper(r);}(),n.mode.ECB=function(){var e=n.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function processBlock(e,t){this._cipher.encryptBlock(e,t);}}),e.Decryptor=e.extend({processBlock:function processBlock(e,t){this._cipher.decryptBlock(e,t);}}),e;}(),e.exports=n;},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),s=n(9),a=(r(s),n(7)),u=(r(a),n(12)),c=(r(u),n(14)),l=r(c),h=n(17),f=r(h),d=(n(8),n(13)),p=r(d),g=function(){function e(t){var n=t.subscribeEndpoint,r=t.leaveEndpoint,o=t.heartbeatEndpoint,s=t.setStateEndpoint,a=t.timeEndpoint,u=t.config,c=t.crypto,h=t.listenerManager;i(this,e),this._listenerManager=h,this._config=u,this._leaveEndpoint=r,this._heartbeatEndpoint=o,this._setStateEndpoint=s,this._subscribeEndpoint=n,this._crypto=c,this._channels={},this._presenceChannels={},this._channelGroups={},this._presenceChannelGroups={},this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[],this._currentTimetoken=0,this._lastTimetoken=0,this._subscriptionStatusAnnounced=!1,this._reconnectionManager=new l.default({timeEndpoint:a});}return o(e,[{key:"adaptStateChange",value:function value(e,t){var n=this,r=e.state,i=e.channels,o=void 0===i?[]:i,s=e.channelGroups,a=void 0===s?[]:s;return o.forEach(function(e){e in n._channels&&(n._channels[e].state=r);}),a.forEach(function(e){e in n._channelGroups&&(n._channelGroups[e].state=r);}),this._setStateEndpoint({state:r,channels:o,channelGroups:a},t);}},{key:"adaptSubscribeChange",value:function value(e){var t=this,n=e.timetoken,r=e.channels,i=void 0===r?[]:r,o=e.channelGroups,s=void 0===o?[]:o,a=e.withPresence,u=void 0!==a&&a;if(!this._config.subscribeKey||""===this._config.subscribeKey)return void(console&&console.log&&console.log("subscribe key missing; aborting subscribe"));n&&(this._lastTimetoken=this._currentTimetoken,this._currentTimetoken=n),i.forEach(function(e){t._channels[e]={state:{}},u&&(t._presenceChannels[e]={}),t._pendingChannelSubscriptions.push(e);}),s.forEach(function(e){t._channelGroups[e]={state:{}},u&&(t._presenceChannelGroups[e]={}),t._pendingChannelGroupSubscriptions.push(e);}),this._subscriptionStatusAnnounced=!1,this.reconnect();}},{key:"adaptUnsubscribeChange",value:function value(e,t){var n=this,r=e.channels,i=void 0===r?[]:r,o=e.channelGroups,s=void 0===o?[]:o;i.forEach(function(e){e in n._channels&&delete n._channels[e],e in n._presenceChannels&&delete n._presenceChannels[e];}),s.forEach(function(e){e in n._channelGroups&&delete n._channelGroups[e],e in n._presenceChannelGroups&&delete n._channelGroups[e];}),this._config.suppressLeaveEvents!==!1||t||this._leaveEndpoint({channels:i,channelGroups:s},function(e){e.affectedChannels=i,e.affectedChannelGroups=s,e.currentTimetoken=n._currentTimetoken,e.lastTimetoken=n._lastTimetoken,n._listenerManager.announceStatus(e);}),0===Object.keys(this._channels).length&&0===Object.keys(this._presenceChannels).length&&0===Object.keys(this._channelGroups).length&&0===Object.keys(this._presenceChannelGroups).length&&(this._lastTimetoken=0,this._currentTimetoken=0,this._region=null,this._reconnectionManager.stopPolling()),this.reconnect();}},{key:"unsubscribeAll",value:function value(e){this.adaptUnsubscribeChange({channels:this.getSubscribedChannels(),channelGroups:this.getSubscribedChannelGroups()},e);}},{key:"getSubscribedChannels",value:function value(){return Object.keys(this._channels);}},{key:"getSubscribedChannelGroups",value:function value(){return Object.keys(this._channelGroups);}},{key:"reconnect",value:function value(){this._startSubscribeLoop(),this._registerHeartbeatTimer();}},{key:"disconnect",value:function value(){this._stopSubscribeLoop(),this._stopHeartbeatTimer(),this._reconnectionManager.stopPolling();}},{key:"_registerHeartbeatTimer",value:function value(){this._stopHeartbeatTimer(),this._performHeartbeatLoop(),this._heartbeatTimer=setInterval(this._performHeartbeatLoop.bind(this),1e3*this._config.getHeartbeatInterval());}},{key:"_stopHeartbeatTimer",value:function value(){this._heartbeatTimer&&(clearInterval(this._heartbeatTimer),this._heartbeatTimer=null);}},{key:"_performHeartbeatLoop",value:function value(){var e=this,t=Object.keys(this._channels),n=Object.keys(this._channelGroups),r={};if(0!==t.length||0!==n.length){t.forEach(function(t){var n=e._channels[t].state;Object.keys(n).length&&(r[t]=n);}),n.forEach(function(t){var n=e._channelGroups[t].state;Object.keys(n).length&&(r[t]=n);});var i=function i(t){t.error&&e._config.announceFailedHeartbeats&&e._listenerManager.announceStatus(t),!t.error&&e._config.announceSuccessfulHeartbeats&&e._listenerManager.announceStatus(t);};this._heartbeatEndpoint({channels:t,channelGroups:n,state:r},i.bind(this));}}},{key:"_startSubscribeLoop",value:function value(){this._stopSubscribeLoop();var e=[],t=[];if(Object.keys(this._channels).forEach(function(t){return e.push(t);}),Object.keys(this._presenceChannels).forEach(function(t){return e.push(t+"-pnpres");}),Object.keys(this._channelGroups).forEach(function(e){return t.push(e);}),Object.keys(this._presenceChannelGroups).forEach(function(e){return t.push(e+"-pnpres");}),0!==e.length||0!==t.length){var n={channels:e,channelGroups:t,timetoken:this._currentTimetoken,filterExpression:this._config.filterExpression,region:this._region};this._subscribeCall=this._subscribeEndpoint(n,this._processSubscribeResponse.bind(this));}}},{key:"_processSubscribeResponse",value:function value(e,t){var n=this;if(e.error)return void(e.category===p.default.PNTimeoutCategory?this._startSubscribeLoop():e.category===p.default.PNNetworkIssuesCategory?(this.disconnect(),this._reconnectionManager.onReconnection(function(){n.reconnect(),n._subscriptionStatusAnnounced=!0;var t={category:p.default.PNReconnectedCategory,operation:e.operation,lastTimetoken:n._lastTimetoken,currentTimetoken:n._currentTimetoken};n._listenerManager.announceStatus(t);}),this._reconnectionManager.startPolling(),this._listenerManager.announceStatus(e)):this._listenerManager.announceStatus(e));if(this._lastTimetoken=this._currentTimetoken,this._currentTimetoken=t.metadata.timetoken,!this._subscriptionStatusAnnounced){var r={};r.category=p.default.PNConnectedCategory,r.operation=e.operation,r.affectedChannels=this._pendingChannelSubscriptions,r.affectedChannelGroups=this._pendingChannelGroupSubscriptions,r.lastTimetoken=this._lastTimetoken,r.currentTimetoken=this._currentTimetoken,this._subscriptionStatusAnnounced=!0,this._listenerManager.announceStatus(r),this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[];}var i=t.messages||[],o=this._config.requestMessageCountThreshold;if(o&&i.length>=o){var s={};s.category=p.default.PNRequestMessageCountExceededCategory,s.operation=e.operation,this._listenerManager.announceStatus(s);}i.forEach(function(e){var t=e.channel,r=e.subscriptionMatch,i=e.publishMetaData;if(t===r&&(r=null),f.default.endsWith(e.channel,"-pnpres")){var o={};o.channel=null,o.subscription=null,o.actualChannel=null!=r?t:null,o.subscribedChannel=null!=r?r:t,t&&(o.channel=t.substring(0,t.lastIndexOf("-pnpres"))),r&&(o.subscription=r.substring(0,r.lastIndexOf("-pnpres"))),o.action=e.payload.action,o.state=e.payload.data,o.timetoken=i.publishTimetoken,o.occupancy=e.payload.occupancy,o.uuid=e.payload.uuid,o.timestamp=e.payload.timestamp,e.payload.join&&(o.join=e.payload.join),e.payload.leave&&(o.leave=e.payload.leave),e.payload.timeout&&(o.timeout=e.payload.timeout),n._listenerManager.announcePresence(o);}else{var s={};s.channel=null,s.subscription=null,s.actualChannel=null!=r?t:null,s.subscribedChannel=null!=r?r:t,s.channel=t,s.subscription=r,s.timetoken=i.publishTimetoken,s.publisher=e.issuingClientId,n._config.cipherKey?s.message=n._crypto.decrypt(e.payload):s.message=e.payload,n._listenerManager.announceMessage(s);}}),this._region=t.metadata.region,this._startSubscribeLoop();}},{key:"_stopSubscribeLoop",value:function value(){this._subscribeCall&&(this._subscribeCall.abort(),this._subscribeCall=null);}}]),e;}();t.default=g,e.exports=t.default;},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),o=(n(8),n(13)),s=function(e){return e&&e.__esModule?e:{default:e};}(o),a=function(){function e(){r(this,e),this._listeners=[];}return i(e,[{key:"addListener",value:function value(e){this._listeners.push(e);}},{key:"removeListener",value:function value(e){var t=[];this._listeners.forEach(function(n){n!==e&&t.push(n);}),this._listeners=t;}},{key:"removeAllListeners",value:function value(){this._listeners=[];}},{key:"announcePresence",value:function value(e){this._listeners.forEach(function(t){t.presence&&t.presence(e);});}},{key:"announceStatus",value:function value(e){this._listeners.forEach(function(t){t.status&&t.status(e);});}},{key:"announceMessage",value:function value(e){this._listeners.forEach(function(t){t.message&&t.message(e);});}},{key:"announceNetworkUp",value:function value(){var e={};e.category=s.default.PNNetworkUpCategory,this.announceStatus(e);}},{key:"announceNetworkDown",value:function value(){var e={};e.category=s.default.PNNetworkDownCategory,this.announceStatus(e);}}]),e;}();t.default=a,e.exports=t.default;},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNNetworkUpCategory:"PNNetworkUpCategory",PNNetworkDownCategory:"PNNetworkDownCategory",PNNetworkIssuesCategory:"PNNetworkIssuesCategory",PNTimeoutCategory:"PNTimeoutCategory",PNBadRequestCategory:"PNBadRequestCategory",PNAccessDeniedCategory:"PNAccessDeniedCategory",PNUnknownCategory:"PNUnknownCategory",PNReconnectedCategory:"PNReconnectedCategory",PNConnectedCategory:"PNConnectedCategory",PNRequestMessageCountExceededCategory:"PNRequestMessageCountExceededCategory"},e.exports=t.default;},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),o=n(15),s=(function(e){e&&e.__esModule?e:{default:e};}(o),n(8),function(){function e(t){var n=t.timeEndpoint;r(this,e),this._timeEndpoint=n;}return i(e,[{key:"onReconnection",value:function value(e){this._reconnectionCallback=e;}},{key:"startPolling",value:function value(){this._timeTimer=setInterval(this._performTimeLoop.bind(this),3e3);}},{key:"stopPolling",value:function value(){clearInterval(this._timeTimer);}},{key:"_performTimeLoop",value:function value(){var e=this;this._timeEndpoint(function(t){t.error||(clearInterval(e._timeTimer),e._reconnectionCallback());});}}]),e;}());t.default=s,e.exports=t.default;},function(e,t,n){"use strict";function r(){return h.default.PNTimeOperation;}function i(){return"/time/0";}function o(e){return e.config.getTransactionTimeout();}function s(){return{};}function a(){return!1;}function u(e,t){return{timetoken:t[0]};}function c(){}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.getURL=i,t.getRequestTimeout=o,t.prepareParams=s,t.isAuthSupported=a,t.handleResponse=u,t.validateParams=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNTimeOperation:"PNTimeOperation",PNHistoryOperation:"PNHistoryOperation",PNFetchMessagesOperation:"PNFetchMessagesOperation",PNSubscribeOperation:"PNSubscribeOperation",PNUnsubscribeOperation:"PNUnsubscribeOperation",PNPublishOperation:"PNPublishOperation",PNPushNotificationEnabledChannelsOperation:"PNPushNotificationEnabledChannelsOperation",PNRemoveAllPushNotificationsOperation:"PNRemoveAllPushNotificationsOperation",PNWhereNowOperation:"PNWhereNowOperation",PNSetStateOperation:"PNSetStateOperation",PNHereNowOperation:"PNHereNowOperation",PNGetStateOperation:"PNGetStateOperation",PNHeartbeatOperation:"PNHeartbeatOperation",PNChannelGroupsOperation:"PNChannelGroupsOperation",PNRemoveGroupOperation:"PNRemoveGroupOperation",PNChannelsForGroupOperation:"PNChannelsForGroupOperation",PNAddChannelsToGroupOperation:"PNAddChannelsToGroupOperation",PNRemoveChannelsFromGroupOperation:"PNRemoveChannelsFromGroupOperation",PNAccessManagerGrant:"PNAccessManagerGrant",PNAccessManagerAudit:"PNAccessManagerAudit"},e.exports=t.default;},function(e,t){"use strict";function n(e){var t=[];return Object.keys(e).forEach(function(e){return t.push(e);}),t;}function r(e){return encodeURIComponent(e).replace(/[!~*'()]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase();});}function i(e){return n(e).sort();}function o(e){return i(e).map(function(t){return t+"="+r(e[t]);}).join("&");}function s(e,t){return e.indexOf(t,this.length-t.length)!==-1;}function a(){var e=void 0,t=void 0;return{promise:new Promise(function(n,r){e=n,t=r;}),reject:t,fulfill:e};}e.exports={signPamFromParams:o,endsWith:s,createPromise:a,encodeString:r};},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=(typeof t==="undefined"?"undefined":_typeof(t))&&"function"!=typeof t?e:t;}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(typeof t==="undefined"?"undefined":_typeof(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}function a(e,t){return e.type=t,e.error=!0,e;}function u(e){return a({message:e},"validationError");}function c(e,t,n){return e.usePost&&e.usePost(t,n)?e.postURL(t,n):e.getURL(t,n);}function l(e){var t="PubNub-JS-"+e.sdkFamily;return e.partnerId&&(t+="-"+e.partnerId),t+="/"+e.getVersion();}function h(e,t,n){var r=e.config,i=e.crypto;n.timestamp=Math.floor(new Date().getTime()/1e3);var o=r.subscribeKey+"\n"+r.publishKey+"\n"+t+"\n";o+=g.default.signPamFromParams(n);var s=i.HMACSHA256(o);s=s.replace(/\+/g,"-"),s=s.replace(/\//g,"_"),n.signature=s;}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.networking,r=e.config,i=null,o=null,s={};t.getOperation()===b.default.PNTimeOperation||t.getOperation()===b.default.PNChannelGroupsOperation?i=arguments.length<=2?void 0:arguments[2]:(s=arguments.length<=2?void 0:arguments[2],i=arguments.length<=3?void 0:arguments[3]),"undefined"==typeof Promise||i||(o=g.default.createPromise());var a=t.validateParams(e,s);if(!a){var f=t.prepareParams(e,s),p=c(t,e,s),y=void 0,v={url:p,operation:t.getOperation(),timeout:t.getRequestTimeout(e)};f.uuid=r.UUID,f.pnsdk=l(r),r.useInstanceId&&(f.instanceid=r.instanceId),r.useRequestId&&(f.requestid=d.default.v4()),t.isAuthSupported()&&r.getAuthKey()&&(f.auth=r.getAuthKey()),r.secretKey&&h(e,p,f);var m=function m(n,r){if(n.error)return void(i?i(n):o&&o.reject(new _("PubNub call failed, check status for details",n)));var a=t.handleResponse(e,r,s);i?i(n,a):o&&o.fulfill(a);};if(t.usePost&&t.usePost(e,s)){var k=t.postPayload(e,s);y=n.POST(f,k,v,m);}else y=n.GET(f,v,m);return t.getOperation()===b.default.PNSubscribeOperation?y:o?o.promise:void 0;}return i?i(u(a)):o?(o.reject(new _("Validation failed, check status for details",u(a))),o.promise):void 0;};var f=n(2),d=r(f),p=(n(8),n(17)),g=r(p),y=n(7),v=(r(y),n(16)),b=r(v),_=function(e){function t(e,n){i(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.name=r.constructor.name,r.status=n,r.message=e,r;}return s(t,e),t;}(Error);e.exports=t.default;},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNAddChannelsToGroupOperation;}function o(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group";}function s(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n);}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.channels;return{add:(void 0===n?[]:n).join(",")};}function l(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNRemoveChannelsFromGroupOperation;}function o(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group";}function s(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n);}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.channels;return{remove:(void 0===n?[]:n).join(",")};}function l(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNRemoveGroupOperation;}function o(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group";}function s(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n)+"/remove";}function a(){return!0;}function u(e){return e.config.getTransactionTimeout();}function c(){return{};}function l(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(){return h.default.PNChannelGroupsOperation;}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function o(e){return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group";}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(){return{};}function c(e,t){return{groups:t.payload.groups};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNChannelsForGroupOperation;}function o(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group";}function s(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n);}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(){return{};}function l(e,t){return{channels:t.payload.channels};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation;}function i(e,t){var n=t.device,r=t.pushGateway,i=t.channels,o=e.config;return n?r?i&&0!==i.length?o.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)";}function o(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n;}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(e,t){var n=t.pushGateway,r=t.channels;return{type:n,add:(void 0===r?[]:r).join(",")};}function c(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation;}function i(e,t){var n=t.device,r=t.pushGateway,i=t.channels,o=e.config;return n?r?i&&0!==i.length?o.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)";}function o(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n;}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(e,t){var n=t.pushGateway,r=t.channels;return{type:n,remove:(void 0===r?[]:r).join(",")};}function c(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation;}function i(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)";}function o(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n;}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(e,t){return{type:t.pushGateway};}function c(e,t){return{channels:t};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(){return h.default.PNRemoveAllPushNotificationsOperation;}function i(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)";}function o(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n+"/remove";}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(e,t){return{type:t.pushGateway};}function c(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNUnsubscribeOperation;}function o(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(o)+"/leave";}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i;}function l(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(){return h.default.PNWhereNowOperation;}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function o(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r;return"/v2/presence/sub-key/"+n.subscribeKey+"/uuid/"+i;}function s(e){return e.config.getTransactionTimeout();}function a(){return!0;}function u(){return{};}function c(e,t){return{channels:t.payload.channels};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNHeartbeatOperation;}function o(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(o)+"/heartbeat";}function a(){return!0;}function u(e){return e.config.getTransactionTimeout();}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.state,o=void 0===i?{}:i,s=e.config,a={};return r.length>0&&(a["channel-group"]=r.join(",")),a.state=JSON.stringify(o),a.heartbeat=s.getPresenceTimeout(),a;}function l(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNGetStateOperation;}function o(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function s(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r,o=t.channels,s=void 0===o?[]:o,a=s.length>0?s.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(a)+"/uuid/"+i;}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i;}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,o=n.channelGroups,s=void 0===o?[]:o,a={};return 1===i.length&&0===s.length?a[i[0]]=t.payload:a=t.payload,{channels:a};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNSetStateOperation;}function o(e,t){var n=e.config,r=t.state,i=t.channels,o=void 0===i?[]:i,s=t.channelGroups,a=void 0===s?[]:s;return r?n.subscribeKey?0===o.length&&0===a.length?"Please provide a list of channels and/or channel-groups":void 0:"Missing Subscribe Key":"Missing State";}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(o)+"/uuid/"+n.UUID+"/data";}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.state,r=t.channelGroups,i=void 0===r?[]:r,o={};return o.state=JSON.stringify(n),i.length>0&&(o["channel-group"]=i.join(",")),o;}function l(e,t){return{state:t.payload};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNHereNowOperation;}function o(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=t.channelGroups,s=void 0===o?[]:o,a="/v2/presence/sub-key/"+n.subscribeKey;if(i.length>0||s.length>0){var u=i.length>0?i.join(","):",";a+="/channel/"+p.default.encodeString(u);}return a;}function a(e){return e.config.getTransactionTimeout();}function u(){return!0;}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.includeUUIDs,o=void 0===i||i,s=t.includeState,a=void 0!==s&&s,u={};return o||(u.disable_uuids=1),a&&(u.state=1),r.length>0&&(u["channel-group"]=r.join(",")),u;}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,o=n.channelGroups,s=void 0===o?[]:o,a=n.includeUUIDs,u=void 0===a||a,c=n.includeState,l=void 0!==c&&c;return i.length>1||s.length>0||0===s.length&&0===i.length?function(){var e={};return e.totalChannels=t.payload.total_channels,e.totalOccupancy=t.payload.total_occupancy,e.channels={},Object.keys(t.payload.channels).forEach(function(n){var r=t.payload.channels[n],i=[];return e.channels[n]={occupants:i,name:n,occupancy:r.occupancy},u&&r.uuids.forEach(function(e){l?i.push({state:e.state,uuid:e.uuid}):i.push({state:null,uuid:e});}),e;}),e;}():function(){var e={},n=[];return e.totalChannels=1,e.totalOccupancy=t.occupancy,e.channels={},e.channels[i[0]]={occupants:n,name:i[0],occupancy:t.occupancy},u&&t.uuids.forEach(function(e){l?n.push({state:e.state,uuid:e.uuid}):n.push({state:null,uuid:e});}),e;}();}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(){return h.default.PNAccessManagerAudit;}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function o(e){return"/v2/auth/audit/sub-key/"+e.config.subscribeKey;}function s(e){return e.config.getTransactionTimeout();}function a(){return!1;}function u(e,t){var n=t.channel,r=t.channelGroup,i=t.authKeys,o=void 0===i?[]:i,s={};return n&&(s.channel=n),r&&(s["channel-group"]=r),o.length>0&&(s.auth=o.join(",")),s;}function c(e,t){return t.payload;}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(){return h.default.PNAccessManagerGrant;}function i(e){var t=e.config;return t.subscribeKey?t.publishKey?t.secretKey?void 0:"Missing Secret Key":"Missing Publish Key":"Missing Subscribe Key";}function o(e){return"/v2/auth/grant/sub-key/"+e.config.subscribeKey;}function s(e){return e.config.getTransactionTimeout();}function a(){return!1;}function u(e,t){var n=t.channels,r=void 0===n?[]:n,i=t.channelGroups,o=void 0===i?[]:i,s=t.ttl,a=t.read,u=void 0!==a&&a,c=t.write,l=void 0!==c&&c,h=t.manage,f=void 0!==h&&h,d=t.authKeys,p=void 0===d?[]:d,g={};return g.r=u?"1":"0",g.w=l?"1":"0",g.m=f?"1":"0",r.length>0&&(g.channel=r.join(",")),o.length>0&&(g["channel-group"]=o.join(",")),p.length>0&&(g.auth=p.join(",")),(s||0===s)&&(g.ttl=s),g;}function c(){return{};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=o,t.getRequestTimeout=s,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(8),n(16)),h=function(e){return e&&e.__esModule?e:{default:e};}(l);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){var n=e.crypto,r=e.config,i=JSON.stringify(t);return r.cipherKey&&(i=n.encrypt(i),i=JSON.stringify(i)),i;}function o(){return v.default.PNPublishOperation;}function s(e,t){var n=e.config,r=t.message;return t.channel?r?n.subscribeKey?void 0:"Missing Subscribe Key":"Missing Message":"Missing Channel";}function a(e,t){var n=t.sendByPost;return void 0!==n&&n;}function u(e,t){var n=e.config,r=t.channel,o=t.message,s=i(e,o);return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+_.default.encodeString(r)+"/0/"+_.default.encodeString(s);}function c(e,t){var n=e.config,r=t.channel;return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+_.default.encodeString(r)+"/0";}function l(e){return e.config.getTransactionTimeout();}function h(){return!0;}function f(e,t){return i(e,t.message);}function d(e,t){var n=t.meta,r=t.replicate,i=void 0===r||r,o=t.storeInHistory,s=t.ttl,a={};return null!=o&&(a.store=o?"1":"0"),s&&(a.ttl=s),i===!1&&(a.norep="true"),n&&"object"===(void 0===n?"undefined":g(n))&&(a.meta=JSON.stringify(n)),a;}function p(e,t){return{timetoken:t[2]};}Object.defineProperty(t,"__esModule",{value:!0});var g="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(e){return typeof e==="undefined"?"undefined":_typeof(e);}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e==="undefined"?"undefined":_typeof(e);};t.getOperation=o,t.validateParams=s,t.usePost=a,t.getURL=u,t.postURL=c,t.getRequestTimeout=l,t.isAuthSupported=h,t.postPayload=f,t.prepareParams=d,t.handleResponse=p;var y=(n(8),n(16)),v=r(y),b=n(17),_=r(b);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){var n=e.config,r=e.crypto;if(!n.cipherKey)return t;try{return r.decrypt(t);}catch(e){return t;}}function o(){return d.default.PNHistoryOperation;}function s(e,t){var n=t.channel,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channel";}function a(e,t){var n=t.channel;return"/v2/history/sub-key/"+e.config.subscribeKey+"/channel/"+g.default.encodeString(n);}function u(e){return e.config.getTransactionTimeout();}function c(){return!0;}function l(e,t){var n=t.start,r=t.end,i=t.reverse,o=t.count,s=void 0===o?100:o,a=t.stringifiedTimeToken,u=void 0!==a&&a,c={include_token:"true"};return c.count=s,n&&(c.start=n),r&&(c.end=r),u&&(c.string_message_token="true"),null!=i&&(c.reverse=i.toString()),c;}function h(e,t){var n={messages:[],startTimeToken:t[1],endTimeToken:t[2]};return t[0].forEach(function(t){var r={timetoken:t.timetoken,entry:i(e,t.message)};n.messages.push(r);}),n;}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=o,t.validateParams=s,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(8),n(16)),d=r(f),p=n(17),g=r(p);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){var n=e.config,r=e.crypto;if(!n.cipherKey)return t;try{return r.decrypt(t);}catch(e){return t;}}function o(){return d.default.PNFetchMessagesOperation;}function s(e,t){var n=t.channels,r=e.config;return n&&0!==n.length?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channels";}function a(e,t){var n=t.channels,r=void 0===n?[]:n,i=e.config,o=r.length>0?r.join(","):",";return"/v3/history/sub-key/"+i.subscribeKey+"/channel/"+g.default.encodeString(o);}function u(e){return e.config.getTransactionTimeout();}function c(){return!0;}function l(e,t){var n=t.start,r=t.end,i=t.count,o={};return i&&(o.max=i),n&&(o.start=n),r&&(o.end=r),o;}function h(e,t){var n={channels:{}};return Object.keys(t.channels||{}).forEach(function(r){n.channels[r]=[],(t.channels[r]||[]).forEach(function(t){var o={};o.channel=r,o.subscription=null,o.timetoken=t.timetoken,o.message=i(e,t.message),n.channels[r].push(o);});}),n;}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=o,t.validateParams=s,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(8),n(16)),d=r(f),p=n(17),g=r(p);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(){return f.default.PNSubscribeOperation;}function o(e){if(!e.config.subscribeKey)return"Missing Subscribe Key";}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/subscribe/"+n.subscribeKey+"/"+p.default.encodeString(o)+"/0";}function a(e){return e.config.getSubscribeTimeout();}function u(){return!0;}function c(e,t){var n=e.config,r=t.channelGroups,i=void 0===r?[]:r,o=t.timetoken,s=t.filterExpression,a=t.region,u={heartbeat:n.getPresenceTimeout()};return i.length>0&&(u["channel-group"]=i.join(",")),s&&s.length>0&&(u["filter-expr"]=s),o&&(u.tt=o),a&&(u.tr=a),u;}function l(e,t){var n=[];t.m.forEach(function(e){var t={publishTimetoken:e.p.t,region:e.p.r},r={shard:parseInt(e.a,10),subscriptionMatch:e.b,channel:e.c,payload:e.d,flags:e.f,issuingClientId:e.i,subscribeKey:e.k,originationTimetoken:e.o,publishMetaData:t};n.push(r);});var r={timetoken:t.t.t,region:t.t.r};return{messages:n,metadata:r};}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(8),n(16)),f=r(h),d=n(17),p=r(d);},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e};}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),s=n(7),a=(r(s),n(13)),u=r(a),c=(n(8),function(){function e(t){var n=this;i(this,e),this._modules={},Object.keys(t).forEach(function(e){n._modules[e]=t[e].bind(n);});}return o(e,[{key:"init",value:function value(e){this._config=e,this._maxSubDomain=20,this._currentSubDomain=Math.floor(Math.random()*this._maxSubDomain),this._providedFQDN=(this._config.secure?"https://":"http://")+this._config.origin,this._coreParams={},this.shiftStandardOrigin();}},{key:"nextOrigin",value:function value(){if(this._providedFQDN.indexOf("pubsub.")===-1)return this._providedFQDN;var e=void 0;return this._currentSubDomain=this._currentSubDomain+1,this._currentSubDomain>=this._maxSubDomain&&(this._currentSubDomain=1),e=this._currentSubDomain.toString(),this._providedFQDN.replace("pubsub","ps"+e);}},{key:"shiftStandardOrigin",value:function value(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._standardOrigin=this.nextOrigin(e),this._standardOrigin;}},{key:"getStandardOrigin",value:function value(){return this._standardOrigin;}},{key:"POST",value:function value(e,t,n,r){return this._modules.post(e,t,n,r);}},{key:"GET",value:function value(e,t,n){return this._modules.get(e,t,n);}},{key:"_detectErrorCategory",value:function value(e){if("ENOTFOUND"===e.code)return u.default.PNNetworkIssuesCategory;if("ECONNREFUSED"===e.code)return u.default.PNNetworkIssuesCategory;if("ECONNRESET"===e.code)return u.default.PNNetworkIssuesCategory;if("EAI_AGAIN"===e.code)return u.default.PNNetworkIssuesCategory;if(0===e.status||e.hasOwnProperty("status")&&void 0===e.status)return u.default.PNNetworkIssuesCategory;if(e.timeout)return u.default.PNTimeoutCategory;if(e.response){if(e.response.badRequest)return u.default.PNBadRequestCategory;if(e.response.forbidden)return u.default.PNAccessDeniedCategory;}return u.default.PNUnknownCategory;}}]),e;}());t.default=c,e.exports=t.default;},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={get:function get(e){try{return localStorage.getItem(e);}catch(e){return null;}},set:function set(e,t){try{return localStorage.setItem(e,t);}catch(e){return null;}}},e.exports=t.default;},function(e,t,n){"use strict";function r(e){var t=new Date().getTime(),n=new Date().toISOString(),r=function(){return console&&console.log?console:window&&window.console&&window.console.log?window.console:console;}();r.log("<<<<<"),r.log("["+n+"]","\n",e.url,"\n",e.qs),r.log("-----"),e.on("response",function(n){var i=new Date().getTime(),o=i-t,s=new Date().toISOString();r.log(">>>>>>"),r.log("["+s+" / "+o+"]","\n",e.url,"\n",e.qs,"\n",n.text),r.log("-----");});}function i(e,t,n){var i=this;return this._config.logVerbosity&&(e=e.use(r)),this._config.proxy&&this._modules.proxy&&(e=this._modules.proxy.call(this,e)),this._config.keepAlive&&this._modules.keepAlive&&(e=this._module.keepAlive(e)),e.timeout(t.timeout).end(function(e,r){var o={};if(o.error=null!==e,o.operation=t.operation,r&&r.status&&(o.statusCode=r.status),e)return o.errorData=e,o.category=i._detectErrorCategory(e),n(o,null);var s=JSON.parse(r.text);return n(o,s);});}function o(e,t,n){var r=u.default.get(this.getStandardOrigin()+t.url).query(e);return i.call(this,r,t,n);}function s(e,t,n,r){var o=u.default.post(this.getStandardOrigin()+n.url).query(e).send(t);return i.call(this,o,n,r);}Object.defineProperty(t,"__esModule",{value:!0}),t.get=o,t.post=s;var a=n(43),u=function(e){return e&&e.__esModule?e:{default:e};}(a);n(8);},function(e,t,n){function r(){}function i(e){if(!v(e))return e;var t=[];for(var n in e){o(t,n,e[n]);}return t.join("&");}function o(e,t,n){if(null!=n){if(Array.isArray(n))n.forEach(function(n){o(e,t,n);});else if(v(n))for(var r in n){o(e,t+"["+r+"]",n[r]);}else e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));}else null===n&&e.push(encodeURIComponent(t));}function s(e){for(var t,n,r={},i=e.split("&"),o=0,s=i.length;o<s;++o){t=i[o],n=t.indexOf("="),n==-1?r[decodeURIComponent(t)]="":r[decodeURIComponent(t.slice(0,n))]=decodeURIComponent(t.slice(n+1));}return r;}function a(e){var t,n,r,i,o=e.split(/\r?\n/),s={};o.pop();for(var a=0,u=o.length;a<u;++a){n=o[a],t=n.indexOf(":"),r=n.slice(0,t).toLowerCase(),i=_(n.slice(t+1)),s[r]=i;}return s;}function u(e){return /[\/+]json\b/.test(e);}function c(e){return e.split(/ *; */).shift();}function l(e){return e.split(/ *; */).reduce(function(e,t){var n=t.split(/ *= */),r=n.shift(),i=n.shift();return r&&i&&(e[r]=i),e;},{});}function h(e,t){t=t||{},this.req=e,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this._setStatusProperties(this.xhr.status),this.header=this.headers=a(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null;}function f(e,t){var n=this;this._query=this._query||[],this.method=e,this.url=t,this.header={},this._header={},this.on("end",function(){var e=null,t=null;try{t=new h(n);}catch(t){return e=new Error("Parser is unable to parse the response"),e.parse=!0,e.original=t,e.rawResponse=n.xhr&&n.xhr.responseText?n.xhr.responseText:null,e.statusCode=n.xhr&&n.xhr.status?n.xhr.status:null,n.callback(e);}n.emit("response",t);var r;try{(t.status<200||t.status>=300)&&(r=new Error(t.statusText||"Unsuccessful HTTP response"),r.original=e,r.response=t,r.status=t.status);}catch(e){r=e;}r?n.callback(r,t):n.callback(null,t);});}function d(e,t){var n=b("DELETE",e);return t&&n.end(t),n;}var p;"undefined"!=typeof window?p=window:"undefined"!=typeof self?p=self:(console.warn("Using browser-only version of superagent in non-browser environment"),p=this);var g=n(44),y=n(45),v=n(46),b=e.exports=n(47).bind(null,f);b.getXHR=function(){if(!(!p.XMLHttpRequest||p.location&&"file:"==p.location.protocol&&p.ActiveXObject))return new XMLHttpRequest();try{return new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(e){}throw Error("Browser-only verison of superagent could not find XHR");};var _="".trim?function(e){return e.trim();}:function(e){return e.replace(/(^\s*|\s*$)/g,"");};b.serializeObject=i,b.parseString=s,b.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},b.serialize={"application/x-www-form-urlencoded":i,"application/json":JSON.stringify},b.parse={"application/x-www-form-urlencoded":s,"application/json":JSON.parse},h.prototype.get=function(e){return this.header[e.toLowerCase()];},h.prototype._setHeaderProperties=function(e){var t=this.header["content-type"]||"";this.type=c(t);var n=l(t);for(var r in n){this[r]=n[r];}},h.prototype._parseBody=function(e){var t=b.parse[this.type];return!t&&u(this.type)&&(t=b.parse["application/json"]),t&&e&&(e.length||e instanceof Object)?t(e):null;},h.prototype._setStatusProperties=function(e){1223===e&&(e=204);var t=e/100|0;this.status=this.statusCode=e,this.statusType=t,this.info=1==t,this.ok=2==t,this.clientError=4==t,this.serverError=5==t,this.error=(4==t||5==t)&&this.toError(),this.accepted=202==e,this.noContent=204==e,this.badRequest=400==e,this.unauthorized=401==e,this.notAcceptable=406==e,this.notFound=404==e,this.forbidden=403==e;},h.prototype.toError=function(){var e=this.req,t=e.method,n=e.url,r="cannot "+t+" "+n+" ("+this.status+")",i=new Error(r);return i.status=this.status,i.method=t,i.url=n,i;},b.Response=h,g(f.prototype);for(var m in y){f.prototype[m]=y[m];}f.prototype.type=function(e){return this.set("Content-Type",b.types[e]||e),this;},f.prototype.responseType=function(e){return this._responseType=e,this;},f.prototype.accept=function(e){return this.set("Accept",b.types[e]||e),this;},f.prototype.auth=function(e,t,n){switch(n||(n={type:"basic"}),n.type){case"basic":var r=btoa(e+":"+t);this.set("Authorization","Basic "+r);break;case"auto":this.username=e,this.password=t;}return this;},f.prototype.query=function(e){return"string"!=typeof e&&(e=i(e)),e&&this._query.push(e),this;},f.prototype.attach=function(e,t,n){return this._getFormData().append(e,t,n||t.name),this;},f.prototype._getFormData=function(){return this._formData||(this._formData=new p.FormData()),this._formData;},f.prototype.callback=function(e,t){var n=this._callback;this.clearTimeout(),n(e,t);},f.prototype.crossDomainError=function(){var e=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");e.crossDomain=!0,e.status=this.status,e.method=this.method,e.url=this.url,this.callback(e);},f.prototype._timeoutError=function(){var e=this._timeout,t=new Error("timeout of "+e+"ms exceeded");t.timeout=e,this.callback(t);},f.prototype._appendQueryString=function(){var e=this._query.join("&");e&&(this.url+=~this.url.indexOf("?")?"&"+e:"?"+e);},f.prototype.end=function(e){var t=this,n=this.xhr=b.getXHR(),i=this._timeout,o=this._formData||this._data;this._callback=e||r,n.onreadystatechange=function(){if(4==n.readyState){var e;try{e=n.status;}catch(t){e=0;}if(0==e){if(t.timedout)return t._timeoutError();if(t._aborted)return;return t.crossDomainError();}t.emit("end");}};var s=function s(e,n){n.total>0&&(n.percent=n.loaded/n.total*100),n.direction=e,t.emit("progress",n);};if(this.hasListeners("progress"))try{n.onprogress=s.bind(null,"download"),n.upload&&(n.upload.onprogress=s.bind(null,"upload"));}catch(e){}if(i&&!this._timer&&(this._timer=setTimeout(function(){t.timedout=!0,t.abort();},i)),this._appendQueryString(),this.username&&this.password?n.open(this.method,this.url,!0,this.username,this.password):n.open(this.method,this.url,!0),this._withCredentials&&(n.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof o&&!this._isHost(o)){var a=this._header["content-type"],c=this._serializer||b.serialize[a?a.split(";")[0]:""];!c&&u(a)&&(c=b.serialize["application/json"]),c&&(o=c(o));}for(var l in this.header){null!=this.header[l]&&n.setRequestHeader(l,this.header[l]);}return this._responseType&&(n.responseType=this._responseType),this.emit("request",this),n.send(void 0!==o?o:null),this;},b.Request=f,b.get=function(e,t,n){var r=b("GET",e);return"function"==typeof t&&(n=t,t=null),t&&r.query(t),n&&r.end(n),r;},b.head=function(e,t,n){var r=b("HEAD",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r;},b.options=function(e,t,n){var r=b("OPTIONS",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r;},b.del=d,b.delete=d,b.patch=function(e,t,n){var r=b("PATCH",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r;},b.post=function(e,t,n){var r=b("POST",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r;},b.put=function(e,t,n){var r=b("PUT",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r;};},function(e,t,n){function r(e){if(e)return i(e);}function i(e){for(var t in r.prototype){e[t]=r.prototype[t];}return e;}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this;},r.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments);}return n.fn=t,this.on(e,n),this;},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var r,i=0;i<n.length;i++){if((r=n[i])===t||r.fn===t){n.splice(i,1);break;}}return this;},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks["$"+e];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r){n[r].apply(this,t);}}return this;},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[];},r.prototype.hasListeners=function(e){return!!this.listeners(e).length;};},function(e,t,n){var r=n(46);t.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this;},t.parse=function(e){return this._parser=e,this;},t.serialize=function(e){return this._serializer=e,this;},t.timeout=function(e){return this._timeout=e,this;},t.then=function(e,t){if(!this._fullfilledPromise){var n=this;this._fullfilledPromise=new Promise(function(e,t){n.end(function(n,r){n?t(n):e(r);});});}return this._fullfilledPromise.then(e,t);},t.catch=function(e){return this.then(void 0,e);},t.use=function(e){return e(this),this;},t.get=function(e){return this._header[e.toLowerCase()];},t.getHeader=t.get,t.set=function(e,t){if(r(e)){for(var n in e){this.set(n,e[n]);}return this;}return this._header[e.toLowerCase()]=t,this.header[e]=t,this;},t.unset=function(e){return delete this._header[e.toLowerCase()],delete this.header[e],this;},t.field=function(e,t){if(null===e||void 0===e)throw new Error(".field(name, val) name can not be empty");if(r(e)){for(var n in e){this.field(n,e[n]);}return this;}if(null===t||void 0===t)throw new Error(".field(name, val) val can not be empty");return this._getFormData().append(e,t),this;},t.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this);},t.withCredentials=function(){return this._withCredentials=!0,this;},t.redirects=function(e){return this._maxRedirects=e,this;},t.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header};},t._isHost=function(e){switch({}.toString.call(e)){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1;}},t.send=function(e){var t=r(e),n=this._header["content-type"];if(t&&r(this._data))for(var i in e){this._data[i]=e[i];}else"string"==typeof e?(n||this.type("form"),n=this._header["content-type"],this._data="application/x-www-form-urlencoded"==n?this._data?this._data+"&"+e:e:(this._data||"")+e):this._data=e;return!t||this._isHost(e)?this:(n||this.type("json"),this);};},function(e,t){function n(e){return null!==e&&"object"==(typeof e==="undefined"?"undefined":_typeof(e));}e.exports=n;},function(e,t){function n(e,t,n){return"function"==typeof n?new e("GET",t).end(n):2==arguments.length?new e("GET",t):new e(t,n);}e.exports=n;}]);});},{}],10:[function(require,module,exports){/**
	* Module dependencies.
	*/var url=require('./url');var parser=require('socket.io-parser');var Manager=require('./manager');var debug=require('debug')('socket.io-client');/**
	* Module exports.
	*/module.exports=exports=lookup;/**
	* Managers cache.
	*/var cache=exports.managers={};/**
	* Looks up an existing `Manager` for multiplexing.
	* If the user summons:
	*
	*   `io('http://localhost/a');`
	*   `io('http://localhost/b');`
	*
	* We reuse the existing instance based on same scheme/port/host,
	* and we initialize sockets for each namespace.
	*
	* @api public
	*/function lookup(uri,opts){if((typeof uri==="undefined"?"undefined":_typeof(uri))==='object'){opts=uri;uri=undefined;}opts=opts||{};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var path=parsed.path;var sameNamespace=cache[id]&&path in cache[id].nsps;var newConnection=opts.forceNew||opts['force new connection']||false===opts.multiplex||sameNamespace;var io;if(newConnection){debug('ignoring socket cache for %s',source);io=Manager(source,opts);}else{if(!cache[id]){debug('new io instance for %s',source);cache[id]=Manager(source,opts);}io=cache[id];}if(parsed.query&&!opts.query){opts.query=parsed.query;}else if(opts&&'object'===_typeof(opts.query)){opts.query=encodeQueryString(opts.query);}return io.socket(parsed.path,opts);}/**
	*  Helper method to parse query objects to string.
	* @param {object} query
	* @returns {string}
	*/function encodeQueryString(obj){var str=[];for(var p in obj){if(obj.hasOwnProperty(p)){str.push(encodeURIComponent(p)+'='+encodeURIComponent(obj[p]));}}return str.join('&');}/**
	* Protocol version.
	*
	* @api public
	*/exports.protocol=parser.protocol;/**
	* `connect`.
	*
	* @param {String} uri
	* @api public
	*/exports.connect=lookup;/**
	* Expose constructors for standalone build.
	*
	* @api public
	*/exports.Manager=require('./manager');exports.Socket=require('./socket');},{"./manager":11,"./socket":13,"./url":14,"debug":18,"socket.io-parser":48}],11:[function(require,module,exports){/**
	* Module dependencies.
	*/var eio=require('engine.io-client');var Socket=require('./socket');var Emitter=require('component-emitter');var parser=require('socket.io-parser');var on=require('./on');var bind=require('component-bind');var debug=require('debug')('socket.io-client:manager');var indexOf=require('indexof');var Backoff=require('backo2');/**
	* IE6+ hasOwnProperty
	*/var has=Object.prototype.hasOwnProperty;/**
	* Module exports
	*/module.exports=Manager;/**
	* `Manager` constructor.
	*
	* @param {String} engine instance or engine uri/opts
	* @param {Object} options
	* @api public
	*/function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri&&'object'===(typeof uri==="undefined"?"undefined":_typeof(uri))){opts=uri;uri=undefined;}opts=opts||{};opts.path=opts.path||'/socket.io';this.nsps={};this.subs=[];this.opts=opts;this.reconnection(opts.reconnection!==false);this.reconnectionAttempts(opts.reconnectionAttempts||Infinity);this.reconnectionDelay(opts.reconnectionDelay||1000);this.reconnectionDelayMax(opts.reconnectionDelayMax||5000);this.randomizationFactor(opts.randomizationFactor||0.5);this.backoff=new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==opts.timeout?20000:opts.timeout);this.readyState='closed';this.uri=uri;this.connecting=[];this.lastPing=null;this.encoding=false;this.packetBuffer=[];this.encoder=new parser.Encoder();this.decoder=new parser.Decoder();this.autoConnect=opts.autoConnect!==false;if(this.autoConnect)this.open();}/**
	* Propagate given event to sockets and emit on `this`
	*
	* @api private
	*/Manager.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].emit.apply(this.nsps[nsp],arguments);}}};/**
	* Update `socket.id` of all sockets
	*
	* @api private
	*/Manager.prototype.updateSocketIds=function(){for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].id=this.engine.id;}}};/**
	* Mix in `Emitter`.
	*/Emitter(Manager.prototype);/**
	* Sets the `reconnection` config.
	*
	* @param {Boolean} true/false if it should automatically reconnect
	* @return {Manager} self or value
	* @api public
	*/Manager.prototype.reconnection=function(v){if(!arguments.length)return this._reconnection;this._reconnection=!!v;return this;};/**
	* Sets the reconnection attempts config.
	*
	* @param {Number} max reconnection attempts before giving up
	* @return {Manager} self or value
	* @api public
	*/Manager.prototype.reconnectionAttempts=function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts=v;return this;};/**
	* Sets the delay between reconnections.
	*
	* @param {Number} delay
	* @return {Manager} self or value
	* @api public
	*/Manager.prototype.reconnectionDelay=function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay=v;this.backoff&&this.backoff.setMin(v);return this;};Manager.prototype.randomizationFactor=function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor=v;this.backoff&&this.backoff.setJitter(v);return this;};/**
	* Sets the maximum delay between reconnections.
	*
	* @param {Number} delay
	* @return {Manager} self or value
	* @api public
	*/Manager.prototype.reconnectionDelayMax=function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax=v;this.backoff&&this.backoff.setMax(v);return this;};/**
	* Sets the connection timeout. `false` to disable
	*
	* @return {Manager} self or value
	* @api public
	*/Manager.prototype.timeout=function(v){if(!arguments.length)return this._timeout;this._timeout=v;return this;};/**
	* Starts trying to reconnect if reconnection is enabled and we have not
	* started reconnecting yet
	*
	* @api private
	*/Manager.prototype.maybeReconnectOnOpen=function(){// Only try to reconnect if it's the first time we're connecting
   if(!this.reconnecting&&this._reconnection&&this.backoff.attempts===0){// keeps reconnection from firing twice for the same reconnection loop
   this.reconnect();}};/**
	* Sets the current transport `socket`.
	*
	* @param {Function} optional, callback
	* @return {Manager} self
	* @api public
	*/Manager.prototype.open=Manager.prototype.connect=function(fn,opts){debug('readyState %s',this.readyState);if(~this.readyState.indexOf('open'))return this;debug('opening %s',this.uri);this.engine=eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState='opening';this.skipReconnect=false;// emit `open`
   var openSub=on(socket,'open',function(){self.onopen();fn&&fn();});// emit `connect_error`
   var errorSub=on(socket,'error',function(data){debug('connect_error');self.cleanup();self.readyState='closed';self.emitAll('connect_error',data);if(fn){var err=new Error('Connection error');err.data=data;fn(err);}else{// Only do this if there is no fn to handle the error
   self.maybeReconnectOnOpen();}});// emit `connect_timeout`
   if(false!==this._timeout){var timeout=this._timeout;debug('connect attempt will timeout after %d',timeout);// set timer
   var timer=setTimeout(function(){debug('connect attempt timed out after %d',timeout);openSub.destroy();socket.close();socket.emit('error','timeout');self.emitAll('connect_timeout',timeout);},timeout);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}this.subs.push(openSub);this.subs.push(errorSub);return this;};/**
	* Called upon transport open.
	*
	* @api private
	*/Manager.prototype.onopen=function(){debug('open');// clear old subs
   this.cleanup();// mark as open
   this.readyState='open';this.emit('open');// add new subs
   var socket=this.engine;this.subs.push(on(socket,'data',bind(this,'ondata')));this.subs.push(on(socket,'ping',bind(this,'onping')));this.subs.push(on(socket,'pong',bind(this,'onpong')));this.subs.push(on(socket,'error',bind(this,'onerror')));this.subs.push(on(socket,'close',bind(this,'onclose')));this.subs.push(on(this.decoder,'decoded',bind(this,'ondecoded')));};/**
	* Called upon a ping.
	*
	* @api private
	*/Manager.prototype.onping=function(){this.lastPing=new Date();this.emitAll('ping');};/**
	* Called upon a packet.
	*
	* @api private
	*/Manager.prototype.onpong=function(){this.emitAll('pong',new Date()-this.lastPing);};/**
	* Called with data.
	*
	* @api private
	*/Manager.prototype.ondata=function(data){this.decoder.add(data);};/**
	* Called when parser fully decodes a packet.
	*
	* @api private
	*/Manager.prototype.ondecoded=function(packet){this.emit('packet',packet);};/**
	* Called upon socket error.
	*
	* @api private
	*/Manager.prototype.onerror=function(err){debug('error',err);this.emitAll('error',err);};/**
	* Creates a new socket for the given `nsp`.
	*
	* @return {Socket}
	* @api public
	*/Manager.prototype.socket=function(nsp,opts){var socket=this.nsps[nsp];if(!socket){socket=new Socket(this,nsp,opts);this.nsps[nsp]=socket;var self=this;socket.on('connecting',onConnecting);socket.on('connect',function(){socket.id=self.engine.id;});if(this.autoConnect){// manually call here since connecting evnet is fired before listening
   onConnecting();}}function onConnecting(){if(!~indexOf(self.connecting,socket)){self.connecting.push(socket);}}return socket;};/**
	* Called upon a socket close.
	*
	* @param {Socket} socket
	*/Manager.prototype.destroy=function(socket){var index=indexOf(this.connecting,socket);if(~index)this.connecting.splice(index,1);if(this.connecting.length)return;this.close();};/**
	* Writes a packet.
	*
	* @param {Object} packet
	* @api private
	*/Manager.prototype.packet=function(packet){debug('writing packet %j',packet);var self=this;if(packet.query&&packet.type===0)packet.nsp+='?'+packet.query;if(!self.encoding){// encode, then write to engine with result
   self.encoding=true;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i<encodedPackets.length;i++){self.engine.write(encodedPackets[i],packet.options);}self.encoding=false;self.processPacketQueue();});}else{// add packet to the queue
   self.packetBuffer.push(packet);}};/**
	* If packet buffer is non-empty, begins encoding the
	* next packet in line.
	*
	* @api private
	*/Manager.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var pack=this.packetBuffer.shift();this.packet(pack);}};/**
	* Clean up transport subscriptions and packet buffer.
	*
	* @api private
	*/Manager.prototype.cleanup=function(){debug('cleanup');var subsLength=this.subs.length;for(var i=0;i<subsLength;i++){var sub=this.subs.shift();sub.destroy();}this.packetBuffer=[];this.encoding=false;this.lastPing=null;this.decoder.destroy();};/**
	* Close the current socket.
	*
	* @api private
	*/Manager.prototype.close=Manager.prototype.disconnect=function(){debug('disconnect');this.skipReconnect=true;this.reconnecting=false;if('opening'===this.readyState){// `onclose` will not fire because
   // an open event never happened
   this.cleanup();}this.backoff.reset();this.readyState='closed';if(this.engine)this.engine.close();};/**
	* Called upon engine close.
	*
	* @api private
	*/Manager.prototype.onclose=function(reason){debug('onclose');this.cleanup();this.backoff.reset();this.readyState='closed';this.emit('close',reason);if(this._reconnection&&!this.skipReconnect){this.reconnect();}};/**
	* Attempt a reconnection.
	*
	* @api private
	*/Manager.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var self=this;if(this.backoff.attempts>=this._reconnectionAttempts){debug('reconnect failed');this.backoff.reset();this.emitAll('reconnect_failed');this.reconnecting=false;}else{var delay=this.backoff.duration();debug('will wait %dms before reconnect attempt',delay);this.reconnecting=true;var timer=setTimeout(function(){if(self.skipReconnect)return;debug('attempting reconnect');self.emitAll('reconnect_attempt',self.backoff.attempts);self.emitAll('reconnecting',self.backoff.attempts);// check again for the case socket closed in above events
   if(self.skipReconnect)return;self.open(function(err){if(err){debug('reconnect attempt error');self.reconnecting=false;self.reconnect();self.emitAll('reconnect_error',err.data);}else{debug('reconnect success');self.onreconnect();}});},delay);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}};/**
	* Called upon successful reconnect.
	*
	* @api private
	*/Manager.prototype.onreconnect=function(){var attempt=this.backoff.attempts;this.reconnecting=false;this.backoff.reset();this.updateSocketIds();this.emitAll('reconnect',attempt);};},{"./on":12,"./socket":13,"backo2":15,"component-bind":16,"component-emitter":17,"debug":18,"engine.io-client":21,"indexof":45,"socket.io-parser":48}],12:[function(require,module,exports){/**
	* Module exports.
	*/module.exports=on;/**
	* Helper for subscriptions.
	*
	* @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	* @param {String} event name
	* @param {Function} callback
	* @api public
	*/function on(obj,ev,fn){obj.on(ev,fn);return{destroy:function destroy(){obj.removeListener(ev,fn);}};}},{}],13:[function(require,module,exports){/**
	* Module dependencies.
	*/var parser=require('socket.io-parser');var Emitter=require('component-emitter');var toArray=require('to-array');var on=require('./on');var bind=require('component-bind');var debug=require('debug')('socket.io-client:socket');var hasBin=require('has-binary');/**
	* Module exports.
	*/module.exports=exports=Socket;/**
	* Internal events (blacklisted).
	* These events can't be emitted by the user.
	*
	* @api private
	*/var events={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1};/**
	* Shortcut to `Emitter#emit`.
	*/var emit=Emitter.prototype.emit;/**
	* `Socket` constructor.
	*
	* @api public
	*/function Socket(io,nsp,opts){this.io=io;this.nsp=nsp;this.json=this;// compat
   this.ids=0;this.acks={};this.receiveBuffer=[];this.sendBuffer=[];this.connected=false;this.disconnected=true;if(opts&&opts.query){this.query=opts.query;}if(this.io.autoConnect)this.open();}/**
	* Mix in `Emitter`.
	*/Emitter(Socket.prototype);/**
	* Subscribe to open, close and packet events
	*
	* @api private
	*/Socket.prototype.subEvents=function(){if(this.subs)return;var io=this.io;this.subs=[on(io,'open',bind(this,'onopen')),on(io,'packet',bind(this,'onpacket')),on(io,'close',bind(this,'onclose'))];};/**
	* "Opens" the socket.
	*
	* @api public
	*/Socket.prototype.open=Socket.prototype.connect=function(){if(this.connected)return this;this.subEvents();this.io.open();// ensure open
   if('open'===this.io.readyState)this.onopen();this.emit('connecting');return this;};/**
	* Sends a `message` event.
	*
	* @return {Socket} self
	* @api public
	*/Socket.prototype.send=function(){var args=toArray(arguments);args.unshift('message');this.emit.apply(this,args);return this;};/**
	* Override `emit`.
	* If the event is in `events`, it's emitted normally.
	*
	* @param {String} event name
	* @return {Socket} self
	* @api public
	*/Socket.prototype.emit=function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this;}var args=toArray(arguments);var parserType=parser.EVENT;// default
   if(hasBin(args)){parserType=parser.BINARY_EVENT;}// binary
   var packet={type:parserType,data:args};packet.options={};packet.options.compress=!this.flags||false!==this.flags.compress;// event ack callback
   if('function'===typeof args[args.length-1]){debug('emitting packet with ack id %d',this.ids);this.acks[this.ids]=args.pop();packet.id=this.ids++;}if(this.connected){this.packet(packet);}else{this.sendBuffer.push(packet);}delete this.flags;return this;};/**
	* Sends a packet.
	*
	* @param {Object} packet
	* @api private
	*/Socket.prototype.packet=function(packet){packet.nsp=this.nsp;this.io.packet(packet);};/**
	* Called upon engine `open`.
	*
	* @api private
	*/Socket.prototype.onopen=function(){debug('transport is open - connecting');// write connect packet if necessary
   if('/'!==this.nsp){if(this.query){this.packet({type:parser.CONNECT,query:this.query});}else{this.packet({type:parser.CONNECT});}}};/**
	* Called upon engine `close`.
	*
	* @param {String} reason
	* @api private
	*/Socket.prototype.onclose=function(reason){debug('close (%s)',reason);this.connected=false;this.disconnected=true;delete this.id;this.emit('disconnect',reason);};/**
	* Called with socket packet.
	*
	* @param {Object} packet
	* @api private
	*/Socket.prototype.onpacket=function(packet){if(packet.nsp!==this.nsp)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit('error',packet.data);break;}};/**
	* Called upon a server event.
	*
	* @param {Object} packet
	* @api private
	*/Socket.prototype.onevent=function(packet){var args=packet.data||[];debug('emitting event %j',args);if(null!=packet.id){debug('attaching ack callback to event');args.push(this.ack(packet.id));}if(this.connected){emit.apply(this,args);}else{this.receiveBuffer.push(args);}};/**
	* Produces an ack callback to emit with an event.
	*
	* @api private
	*/Socket.prototype.ack=function(id){var self=this;var sent=false;return function(){// prevent double callbacks
   if(sent)return;sent=true;var args=toArray(arguments);debug('sending ack %j',args);var type=hasBin(args)?parser.BINARY_ACK:parser.ACK;self.packet({type:type,id:id,data:args});};};/**
	* Called upon a server acknowlegement.
	*
	* @param {Object} packet
	* @api private
	*/Socket.prototype.onack=function(packet){var ack=this.acks[packet.id];if('function'===typeof ack){debug('calling ack %s with %j',packet.id,packet.data);ack.apply(this,packet.data);delete this.acks[packet.id];}else{debug('bad ack %s',packet.id);}};/**
	* Called upon server connect.
	*
	* @api private
	*/Socket.prototype.onconnect=function(){this.connected=true;this.disconnected=false;this.emit('connect');this.emitBuffered();};/**
	* Emit buffered events (received and emitted).
	*
	* @api private
	*/Socket.prototype.emitBuffered=function(){var i;for(i=0;i<this.receiveBuffer.length;i++){emit.apply(this,this.receiveBuffer[i]);}this.receiveBuffer=[];for(i=0;i<this.sendBuffer.length;i++){this.packet(this.sendBuffer[i]);}this.sendBuffer=[];};/**
	* Called upon server disconnect.
	*
	* @api private
	*/Socket.prototype.ondisconnect=function(){debug('server disconnect (%s)',this.nsp);this.destroy();this.onclose('io server disconnect');};/**
	* Called upon forced client/server side disconnections,
	* this method ensures the manager stops tracking us and
	* that reconnections don't get triggered for this.
	*
	* @api private.
	*/Socket.prototype.destroy=function(){if(this.subs){// clean subscriptions to avoid reconnections
   for(var i=0;i<this.subs.length;i++){this.subs[i].destroy();}this.subs=null;}this.io.destroy(this);};/**
	* Disconnects the socket manually.
	*
	* @return {Socket} self
	* @api public
	*/Socket.prototype.close=Socket.prototype.disconnect=function(){if(this.connected){debug('performing disconnect (%s)',this.nsp);this.packet({type:parser.DISCONNECT});}// remove socket from pool
   this.destroy();if(this.connected){// fire events
   this.onclose('io client disconnect');}return this;};/**
	* Sets the compress flag.
	*
	* @param {Boolean} if `true`, compresses the sending data
	* @return {Socket} self
	* @api public
	*/Socket.prototype.compress=function(compress){this.flags=this.flags||{};this.flags.compress=compress;return this;};},{"./on":12,"component-bind":16,"component-emitter":17,"debug":18,"has-binary":43,"socket.io-parser":48,"to-array":56}],14:[function(require,module,exports){(function(global){/**
	* Module dependencies.
	*/var parseuri=require('parseuri');var debug=require('debug')('socket.io-client:url');/**
	* Module exports.
	*/module.exports=url;/**
	* URL parser.
	*
	* @param {String} url
	* @param {Object} An object meant to mimic window.location.
	*                 Defaults to window.location.
	* @api public
	*/function url(uri,loc){var obj=uri;// default to window.location
   loc=loc||global.location;if(null==uri)uri=loc.protocol+'//'+loc.host;// relative path support
   if('string'===typeof uri){if('/'===uri.charAt(0)){if('/'===uri.charAt(1)){uri=loc.protocol+uri;}else{uri=loc.host+uri;}}if(!/^(https?|wss?):\/\//.test(uri)){debug('protocol-less url %s',uri);if('undefined'!==typeof loc){uri=loc.protocol+'//'+uri;}else{uri='https://'+uri;}}// parse
   debug('parse %s',uri);obj=parseuri(uri);}// make sure we treat `localhost:80` and `localhost` equally
   if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port='80';}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port='443';}}obj.path=obj.path||'/';var ipv6=obj.host.indexOf(':')!==-1;var host=ipv6?'['+obj.host+']':obj.host;// define unique id
   obj.id=obj.protocol+'://'+host+':'+obj.port;// define href
   obj.href=obj.protocol+'://'+host+(loc&&loc.port===obj.port?'':':'+obj.port);return obj;}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"debug":18,"parseuri":46}],15:[function(require,module,exports){/**
	* Expose `Backoff`.
	*/module.exports=Backoff;/**
	* Initialize backoff timer with `opts`.
	*
	* - `min` initial timeout in milliseconds [100]
	* - `max` max timeout [10000]
	* - `jitter` [0]
	* - `factor` [2]
	*
	* @param {Object} opts
	* @api public
	*/function Backoff(opts){opts=opts||{};this.ms=opts.min||100;this.max=opts.max||10000;this.factor=opts.factor||2;this.jitter=opts.jitter>0&&opts.jitter<=1?opts.jitter:0;this.attempts=0;}/**
	* Return the backoff duration.
	*
	* @return {Number}
	* @api public
	*/Backoff.prototype.duration=function(){var ms=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand*this.jitter*ms);ms=(Math.floor(rand*10)&1)==0?ms-deviation:ms+deviation;}return Math.min(ms,this.max)|0;};/**
	* Reset the number of attempts.
	*
	* @api public
	*/Backoff.prototype.reset=function(){this.attempts=0;};/**
	* Set the minimum duration
	*
	* @api public
	*/Backoff.prototype.setMin=function(min){this.ms=min;};/**
	* Set the maximum duration
	*
	* @api public
	*/Backoff.prototype.setMax=function(max){this.max=max;};/**
	* Set the jitter
	*
	* @api public
	*/Backoff.prototype.setJitter=function(jitter){this.jitter=jitter;};},{}],16:[function(require,module,exports){/**
	* Slice reference.
	*/var slice=[].slice;/**
	* Bind `obj` to `fn`.
	*
	* @param {Object} obj
	* @param {Function|String} fn or string
	* @return {Function}
	* @api public
	*/module.exports=function(obj,fn){if('string'==typeof fn)fn=obj[fn];if('function'!=typeof fn)throw new Error('bind() requires a function');var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)));};};},{}],17:[function(require,module,exports){/**
	* Expose `Emitter`.
	*/if(typeof module!=='undefined'){module.exports=Emitter;}/**
	* Initialize a new `Emitter`.
	*
	* @api public
	*/function Emitter(obj){if(obj)return mixin(obj);};/**
	* Mixin the emitter properties.
	*
	* @param {Object} obj
	* @return {Object}
	* @api private
	*/function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;}/**
	* Listen on the given `event` with `fn`.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).push(fn);return this;};/**
	* Adds an `event` listener that will be invoked a single
	* time then automatically removed.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.once=function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;};/**
	* Remove the given callback for `event` or all
	* registered callbacks.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};// all
   if(0==arguments.length){this._callbacks={};return this;}// specific event
   var callbacks=this._callbacks['$'+event];if(!callbacks)return this;// remove all handlers
   if(1==arguments.length){delete this._callbacks['$'+event];return this;}// remove specific handler
   var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;};/**
	* Emit `event` with the given args.
	*
	* @param {String} event
	* @param {Mixed} ...
	* @return {Emitter}
	*/Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$'+event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;};/**
	* Return array of callbacks for `event`.
	*
	* @param {String} event
	* @return {Array}
	* @api public
	*/Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks['$'+event]||[];};/**
	* Check if this emitter has `event` handlers.
	*
	* @param {String} event
	* @return {Boolean}
	* @api public
	*/Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length;};},{}],18:[function(require,module,exports){(function(process){/**
	* This is the web browser implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/exports=module.exports=require('./debug');exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();/**
	* Colors.
	*/exports.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'];/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/function useColors(){// is webkit? http://stackoverflow.com/a/16459606/376773
   // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
   return typeof document!=='undefined'&&'WebkitAppearance'in document.documentElement.style||// is firebug? http://stackoverflow.com/a/398120/376773
   window.console&&(console.firebug||console.exception&&console.table)||// is firefox >= v31?
   // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
   navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31;}/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/exports.formatters.j=function(v){try{return JSON.stringify(v);}catch(err){return'[UnexpectedJSONParseError]: '+err.message;}};/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/function formatArgs(){var args=arguments;var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return args;var c='color: '+this.color;args=[args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1));// the final "%c" is somewhat tricky, because there could be other
   // arguments passed either before or after the %c, so we need to
   // figure out the correct index to insert the CSS into
   var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){// we only are interested in the *last* %c
   // (the user may have provided their own)
   lastC=index;}});args.splice(lastC,0,c);return args;}/**
	* Invokes `console.log()` when available.
	* No-op when `console.log` is not a "function".
	*
	* @api public
	*/function log(){// this hackery is required for IE8/9, where
   // the `console.log` function doesn't have 'apply'
   return'object'===(typeof console==="undefined"?"undefined":_typeof(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments);}/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug');}else{exports.storage.debug=namespaces;}}catch(e){}}/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/function load(){var r;try{return exports.storage.debug;}catch(e){}// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
   if(typeof process!=='undefined'&&'env'in process){return process.env.DEBUG;}}/**
	* Enable namespaces listed in `localStorage.debug` initially.
	*/exports.enable(load());/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/function localstorage(){try{return window.localStorage;}catch(e){}}}).call(this,require('_process'));},{"./debug":19,"_process":8}],19:[function(require,module,exports){/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*
	* Expose `debug()` as the module.
	*/exports=module.exports=debug.debug=debug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=require('ms');/**
	* The currently active debug mode names, and names to skip.
	*/exports.names=[];exports.skips=[];/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lowercased letter, i.e. "n".
	*/exports.formatters={};/**
	* Previously assigned color.
	*/var prevColor=0;/**
	* Previous log timestamp.
	*/var prevTime;/**
	* Select a color.
	*
	* @return {Number}
	* @api private
	*/function selectColor(){return exports.colors[prevColor++%exports.colors.length];}/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/function debug(namespace){// define the `disabled` version
   function disabled(){}disabled.enabled=false;// define the `enabled` version
   function enabled(){var self=enabled;// set `diff` timestamp
   var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;// add the `color` if not set
   if(null==self.useColors)self.useColors=exports.useColors();if(null==self.color&&self.useColors)self.color=selectColor();var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){// anything else let's inspect with %o
   args=['%o'].concat(args);}// apply any `formatters` transformations
   var index=0;args[0]=args[0].replace(/%([a-z%])/g,function(match,format){// if we encounter an escaped % then don't increase the array index
   if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);// now we need to remove `args[index]` since it's inlined in the `format`
   args.splice(index,1);index--;}return match;});// apply env-specific formatting
   args=exports.formatArgs.apply(self,args);var logFn=enabled.log||exports.log||console.log.bind(console);logFn.apply(self,args);}enabled.enabled=true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace=namespace;return fn;}/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/function enable(namespaces){exports.save(namespaces);var split=(namespaces||'').split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;// ignore empty strings
   namespaces=split[i].replace(/[\\^$+?.()|[\]{}]/g,'\\$&').replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'));}else{exports.names.push(new RegExp('^'+namespaces+'$'));}}}/**
	* Disable debug output.
	*
	* @api public
	*/function disable(){exports.enable('');}/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false;}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true;}}return false;}/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/function coerce(val){if(val instanceof Error)return val.stack||val.message;return val;}},{"ms":20}],20:[function(require,module,exports){/**
	* Helpers.
	*/var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} options
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/module.exports=function(val,options){options=options||{};var type=typeof val==="undefined"?"undefined":_typeof(val);if(type==='string'&&val.length>0){return parse(val);}else if(type==='number'&&isNaN(val)===false){return options.long?fmtLong(val):fmtShort(val);}throw new Error('val is not a non-empty string or a valid number. val='+JSON.stringify(val));};/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/function parse(str){str=String(str);if(str.length>10000){return;}var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return;}var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case'years':case'year':case'yrs':case'yr':case'y':return n*y;case'days':case'day':case'd':return n*d;case'hours':case'hour':case'hrs':case'hr':case'h':return n*h;case'minutes':case'minute':case'mins':case'min':case'm':return n*m;case'seconds':case'second':case'secs':case'sec':case's':return n*s;case'milliseconds':case'millisecond':case'msecs':case'msec':case'ms':return n;default:return undefined;}}/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+'d';}if(ms>=h){return Math.round(ms/h)+'h';}if(ms>=m){return Math.round(ms/m)+'m';}if(ms>=s){return Math.round(ms/s)+'s';}return ms+'ms';}/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/function fmtLong(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms';}/**
	* Pluralization helper.
	*/function plural(ms,n,name){if(ms<n){return;}if(ms<n*1.5){return Math.floor(ms/n)+' '+name;}return Math.ceil(ms/n)+' '+name+'s';}},{}],21:[function(require,module,exports){module.exports=require('./lib/index');},{"./lib/index":22}],22:[function(require,module,exports){module.exports=require('./socket');/**
	* Exports parser
	*
	* @api public
	*
	*/module.exports.parser=require('engine.io-parser');},{"./socket":23,"engine.io-parser":32}],23:[function(require,module,exports){(function(global){/**
	* Module dependencies.
	*/var transports=require('./transports/index');var Emitter=require('component-emitter');var debug=require('debug')('engine.io-client:socket');var index=require('indexof');var parser=require('engine.io-parser');var parseuri=require('parseuri');var parsejson=require('parsejson');var parseqs=require('parseqs');/**
	* Module exports.
	*/module.exports=Socket;/**
	* Socket constructor.
	*
	* @param {String|Object} uri or options
	* @param {Object} options
	* @api public
	*/function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts=opts||{};if(uri&&'object'===(typeof uri==="undefined"?"undefined":_typeof(uri))){opts=uri;uri=null;}if(uri){uri=parseuri(uri);opts.hostname=uri.host;opts.secure=uri.protocol==='https'||uri.protocol==='wss';opts.port=uri.port;if(uri.query)opts.query=uri.query;}else if(opts.host){opts.hostname=parseuri(opts.host).host;}this.secure=null!=opts.secure?opts.secure:global.location&&'https:'===location.protocol;if(opts.hostname&&!opts.port){// if no port is specified manually, use the protocol default
   opts.port=this.secure?'443':'80';}this.agent=opts.agent||false;this.hostname=opts.hostname||(global.location?location.hostname:'localhost');this.port=opts.port||(global.location&&location.port?location.port:this.secure?443:80);this.query=opts.query||{};if('string'===typeof this.query)this.query=parseqs.decode(this.query);this.upgrade=false!==opts.upgrade;this.path=(opts.path||'/engine.io').replace(/\/$/,'')+'/';this.forceJSONP=!!opts.forceJSONP;this.jsonp=false!==opts.jsonp;this.forceBase64=!!opts.forceBase64;this.enablesXDR=!!opts.enablesXDR;this.timestampParam=opts.timestampParam||'t';this.timestampRequests=opts.timestampRequests;this.transports=opts.transports||['polling','websocket'];this.readyState='';this.writeBuffer=[];this.prevBufferLen=0;this.policyPort=opts.policyPort||843;this.rememberUpgrade=opts.rememberUpgrade||false;this.binaryType=null;this.onlyBinaryUpgrades=opts.onlyBinaryUpgrades;this.perMessageDeflate=false!==opts.perMessageDeflate?opts.perMessageDeflate||{}:false;if(true===this.perMessageDeflate)this.perMessageDeflate={};if(this.perMessageDeflate&&null==this.perMessageDeflate.threshold){this.perMessageDeflate.threshold=1024;}// SSL options for Node.js client
   this.pfx=opts.pfx||null;this.key=opts.key||null;this.passphrase=opts.passphrase||null;this.cert=opts.cert||null;this.ca=opts.ca||null;this.ciphers=opts.ciphers||null;this.rejectUnauthorized=opts.rejectUnauthorized===undefined?null:opts.rejectUnauthorized;this.forceNode=!!opts.forceNode;// other options for Node.js client
   var freeGlobal=(typeof global==="undefined"?"undefined":_typeof(global))==='object'&&global;if(freeGlobal.global===freeGlobal){if(opts.extraHeaders&&Object.keys(opts.extraHeaders).length>0){this.extraHeaders=opts.extraHeaders;}if(opts.localAddress){this.localAddress=opts.localAddress;}}// set on handshake
   this.id=null;this.upgrades=null;this.pingInterval=null;this.pingTimeout=null;// set on heartbeat
   this.pingIntervalTimer=null;this.pingTimeoutTimer=null;this.open();}Socket.priorWebsocketSuccess=false;/**
	* Mix in `Emitter`.
	*/Emitter(Socket.prototype);/**
	* Protocol version.
	*
	* @api public
	*/Socket.protocol=parser.protocol;// this is an int
   /**
	* Expose deps for legacy compatibility
	* and standalone browser access.
	*/Socket.Socket=Socket;Socket.Transport=require('./transport');Socket.transports=require('./transports/index');Socket.parser=require('engine.io-parser');/**
	* Creates transport of the given type.
	*
	* @param {String} transport name
	* @return {Transport}
	* @api private
	*/Socket.prototype.createTransport=function(name){debug('creating transport "%s"',name);var query=clone(this.query);// append engine.io protocol identifier
   query.EIO=parser.protocol;// transport name
   query.transport=name;// session id if we already have one
   if(this.id)query.sid=this.id;var transport=new transports[name]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:query,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders,forceNode:this.forceNode,localAddress:this.localAddress});return transport;};function clone(obj){var o={};for(var i in obj){if(obj.hasOwnProperty(i)){o[i]=obj[i];}}return o;}/**
	* Initializes transport to use and starts probe.
	*
	* @api private
	*/Socket.prototype.open=function(){var transport;if(this.rememberUpgrade&&Socket.priorWebsocketSuccess&&this.transports.indexOf('websocket')!==-1){transport='websocket';}else if(0===this.transports.length){// Emit error on next tick so it can be listened to
   var self=this;setTimeout(function(){self.emit('error','No transports available');},0);return;}else{transport=this.transports[0];}this.readyState='opening';// Retry with the next transport if the transport is disabled (jsonp: false)
   try{transport=this.createTransport(transport);}catch(e){this.transports.shift();this.open();return;}transport.open();this.setTransport(transport);};/**
	* Sets the current transport. Disables the existing one (if any).
	*
	* @api private
	*/Socket.prototype.setTransport=function(transport){debug('setting transport %s',transport.name);var self=this;if(this.transport){debug('clearing existing transport %s',this.transport.name);this.transport.removeAllListeners();}// set up transport
   this.transport=transport;// set up transport listeners
   transport.on('drain',function(){self.onDrain();}).on('packet',function(packet){self.onPacket(packet);}).on('error',function(e){self.onError(e);}).on('close',function(){self.onClose('transport close');});};/**
	* Probes a transport.
	*
	* @param {String} transport name
	* @api private
	*/Socket.prototype.probe=function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1});var failed=false;var self=this;Socket.priorWebsocketSuccess=false;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary&&self.transport.supportsBinary;failed=failed||upgradeLosesBinary;}if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:'ping',data:'probe'}]);transport.once('packet',function(msg){if(failed)return;if('pong'===msg.type&&'probe'===msg.data){debug('probe transport "%s" pong',name);self.upgrading=true;self.emit('upgrading',transport);if(!transport)return;Socket.priorWebsocketSuccess='websocket'===transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if('closed'===self.readyState)return;debug('changing transport and sending upgrade packet');cleanup();self.setTransport(transport);transport.send([{type:'upgrade'}]);self.emit('upgrade',transport);transport=null;self.upgrading=false;self.flush();});}else{debug('probe transport "%s" failed',name);var err=new Error('probe error');err.transport=transport.name;self.emit('upgradeError',err);}});}function freezeTransport(){if(failed)return;// Any callback called by transport should be ignored since now
   failed=true;cleanup();transport.close();transport=null;}// Handle any error that happens while probing
   function onerror(err){var error=new Error('probe error: '+err);error.transport=transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit('upgradeError',error);}function onTransportClose(){onerror('transport closed');}// When the socket is closed while we're probing
   function onclose(){onerror('socket closed');}// When the socket is upgraded while we're probing
   function onupgrade(to){if(transport&&to.name!==transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport();}}// Remove all listeners on the transport and on self
   function cleanup(){transport.removeListener('open',onTransportOpen);transport.removeListener('error',onerror);transport.removeListener('close',onTransportClose);self.removeListener('close',onclose);self.removeListener('upgrading',onupgrade);}transport.once('open',onTransportOpen);transport.once('error',onerror);transport.once('close',onTransportClose);this.once('close',onclose);this.once('upgrading',onupgrade);transport.open();};/**
	* Called when connection is deemed open.
	*
	* @api public
	*/Socket.prototype.onOpen=function(){debug('socket open');this.readyState='open';Socket.priorWebsocketSuccess='websocket'===this.transport.name;this.emit('open');this.flush();// we check for `readyState` in case an `open`
   // listener already closed the socket
   if('open'===this.readyState&&this.upgrade&&this.transport.pause){debug('starting upgrade probes');for(var i=0,l=this.upgrades.length;i<l;i++){this.probe(this.upgrades[i]);}}};/**
	* Handles a packet.
	*
	* @api private
	*/Socket.prototype.onPacket=function(packet){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit('packet',packet);// Socket is live - any packet counts
   this.emit('heartbeat');switch(packet.type){case'open':this.onHandshake(parsejson(packet.data));break;case'pong':this.setPing();this.emit('pong');break;case'error':var err=new Error('server error');err.code=packet.data;this.onError(err);break;case'message':this.emit('data',packet.data);this.emit('message',packet.data);break;}}else{debug('packet received with socket readyState "%s"',this.readyState);}};/**
	* Called upon handshake completion.
	*
	* @param {Object} handshake obj
	* @api private
	*/Socket.prototype.onHandshake=function(data){this.emit('handshake',data);this.id=data.sid;this.transport.query.sid=data.sid;this.upgrades=this.filterUpgrades(data.upgrades);this.pingInterval=data.pingInterval;this.pingTimeout=data.pingTimeout;this.onOpen();// In case open handler closes socket
   if('closed'===this.readyState)return;this.setPing();// Prolong liveness of socket on heartbeat
   this.removeListener('heartbeat',this.onHeartbeat);this.on('heartbeat',this.onHeartbeat);};/**
	* Resets ping timeout.
	*
	* @api private
	*/Socket.prototype.onHeartbeat=function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer=setTimeout(function(){if('closed'===self.readyState)return;self.onClose('ping timeout');},timeout||self.pingInterval+self.pingTimeout);};/**
	* Pings server every `this.pingInterval` and expects response
	* within `this.pingTimeout` or closes connection.
	*
	* @api private
	*/Socket.prototype.setPing=function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer=setTimeout(function(){debug('writing ping packet - expecting pong within %sms',self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout);},self.pingInterval);};/**
   * Sends a ping packet.
   *
   * @api private
   */Socket.prototype.ping=function(){var self=this;this.sendPacket('ping',function(){self.emit('ping');});};/**
	* Called on `drain` event
	*
	* @api private
	*/Socket.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen);// setting prevBufferLen = 0 is very important
   // for example, when upgrading, upgrade packet is sent over,
   // and a nonzero prevBufferLen could cause problems on `drain`
   this.prevBufferLen=0;if(0===this.writeBuffer.length){this.emit('drain');}else{this.flush();}};/**
	* Flush write buffers.
	*
	* @api private
	*/Socket.prototype.flush=function(){if('closed'!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){debug('flushing %d packets in socket',this.writeBuffer.length);this.transport.send(this.writeBuffer);// keep track of current length of writeBuffer
   // splice writeBuffer and callbackBuffer on `drain`
   this.prevBufferLen=this.writeBuffer.length;this.emit('flush');}};/**
	* Sends a message.
	*
	* @param {String} message.
	* @param {Function} callback function.
	* @param {Object} options.
	* @return {Socket} for chaining.
	* @api public
	*/Socket.prototype.write=Socket.prototype.send=function(msg,options,fn){this.sendPacket('message',msg,options,fn);return this;};/**
	* Sends a packet.
	*
	* @param {String} packet type.
	* @param {String} data.
	* @param {Object} options.
	* @param {Function} callback function.
	* @api private
	*/Socket.prototype.sendPacket=function(type,data,options,fn){if('function'===typeof data){fn=data;data=undefined;}if('function'===typeof options){fn=options;options=null;}if('closing'===this.readyState||'closed'===this.readyState){return;}options=options||{};options.compress=false!==options.compress;var packet={type:type,data:data,options:options};this.emit('packetCreate',packet);this.writeBuffer.push(packet);if(fn)this.once('flush',fn);this.flush();};/**
	* Closes the connection.
	*
	* @api private
	*/Socket.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.readyState='closing';var self=this;if(this.writeBuffer.length){this.once('drain',function(){if(this.upgrading){waitForUpgrade();}else{close();}});}else if(this.upgrading){waitForUpgrade();}else{close();}}function close(){self.onClose('forced close');debug('socket closing - telling transport to close');self.transport.close();}function cleanupAndClose(){self.removeListener('upgrade',cleanupAndClose);self.removeListener('upgradeError',cleanupAndClose);close();}function waitForUpgrade(){// wait for upgrade to finish since we can't send packets while pausing a transport
   self.once('upgrade',cleanupAndClose);self.once('upgradeError',cleanupAndClose);}return this;};/**
	* Called upon transport error
	*
	* @api private
	*/Socket.prototype.onError=function(err){debug('socket error %j',err);Socket.priorWebsocketSuccess=false;this.emit('error',err);this.onClose('transport error',err);};/**
	* Called upon transport close.
	*
	* @api private
	*/Socket.prototype.onClose=function(reason,desc){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket close with reason: "%s"',reason);var self=this;// clear timers
   clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer);// stop event from firing again for transport
   this.transport.removeAllListeners('close');// ensure transport won't stay open
   this.transport.close();// ignore further transport communication
   this.transport.removeAllListeners();// set ready state
   this.readyState='closed';// clear session id
   this.id=null;// emit close event
   this.emit('close',reason,desc);// clean buffers after, so users can still
   // grab the buffers on `close` event
   self.writeBuffer=[];self.prevBufferLen=0;}};/**
	* Filters upgrades, returning only those matching client transports.
	*
	* @param {Array} server upgrades
	* @api private
	*
	*/Socket.prototype.filterUpgrades=function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i<j;i++){if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i]);}return filteredUpgrades;};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./transport":24,"./transports/index":25,"component-emitter":17,"debug":18,"engine.io-parser":32,"indexof":45,"parsejson":40,"parseqs":41,"parseuri":46}],24:[function(require,module,exports){/**
	* Module dependencies.
	*/var parser=require('engine.io-parser');var Emitter=require('component-emitter');/**
	* Module exports.
	*/module.exports=Transport;/**
	* Transport abstract constructor.
	*
	* @param {Object} options.
	* @api private
	*/function Transport(opts){this.path=opts.path;this.hostname=opts.hostname;this.port=opts.port;this.secure=opts.secure;this.query=opts.query;this.timestampParam=opts.timestampParam;this.timestampRequests=opts.timestampRequests;this.readyState='';this.agent=opts.agent||false;this.socket=opts.socket;this.enablesXDR=opts.enablesXDR;// SSL options for Node.js client
   this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;this.forceNode=opts.forceNode;// other options for Node.js client
   this.extraHeaders=opts.extraHeaders;this.localAddress=opts.localAddress;}/**
	* Mix in `Emitter`.
	*/Emitter(Transport.prototype);/**
	* Emits an error.
	*
	* @param {String} str
	* @return {Transport} for chaining
	* @api public
	*/Transport.prototype.onError=function(msg,desc){var err=new Error(msg);err.type='TransportError';err.description=desc;this.emit('error',err);return this;};/**
	* Opens the transport.
	*
	* @api public
	*/Transport.prototype.open=function(){if('closed'===this.readyState||''===this.readyState){this.readyState='opening';this.doOpen();}return this;};/**
	* Closes the transport.
	*
	* @api private
	*/Transport.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.doClose();this.onClose();}return this;};/**
	* Sends multiple packets.
	*
	* @param {Array} packets
	* @api private
	*/Transport.prototype.send=function(packets){if('open'===this.readyState){this.write(packets);}else{throw new Error('Transport not open');}};/**
	* Called upon open
	*
	* @api private
	*/Transport.prototype.onOpen=function(){this.readyState='open';this.writable=true;this.emit('open');};/**
	* Called with data.
	*
	* @param {String} data
	* @api private
	*/Transport.prototype.onData=function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet);};/**
	* Called with a decoded packet.
	*/Transport.prototype.onPacket=function(packet){this.emit('packet',packet);};/**
	* Called upon close.
	*
	* @api private
	*/Transport.prototype.onClose=function(){this.readyState='closed';this.emit('close');};},{"component-emitter":17,"engine.io-parser":32}],25:[function(require,module,exports){(function(global){/**
	* Module dependencies
	*/var XMLHttpRequest=require('xmlhttprequest-ssl');var XHR=require('./polling-xhr');var JSONP=require('./polling-jsonp');var websocket=require('./websocket');/**
	* Export transports.
	*/exports.polling=polling;exports.websocket=websocket;/**
	* Polling transport polymorphic constructor.
	* Decides on xhr vs jsonp based on feature detection.
	*
	* @api private
	*/function polling(opts){var xhr;var xd=false;var xs=false;var jsonp=false!==opts.jsonp;if(global.location){var isSSL='https:'===location.protocol;var port=location.port;// some user agents have empty `location.port`
   if(!port){port=isSSL?443:80;}xd=opts.hostname!==location.hostname||port!==opts.port;xs=opts.secure!==isSSL;}opts.xdomain=xd;opts.xscheme=xs;xhr=new XMLHttpRequest(opts);if('open'in xhr&&!opts.forceJSONP){return new XHR(opts);}else{if(!jsonp)throw new Error('JSONP disabled');return new JSONP(opts);}}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./polling-jsonp":26,"./polling-xhr":27,"./websocket":29,"xmlhttprequest-ssl":30}],26:[function(require,module,exports){(function(global){/**
	* Module requirements.
	*/var Polling=require('./polling');var inherit=require('component-inherit');/**
	* Module exports.
	*/module.exports=JSONPPolling;/**
	* Cached regular expressions.
	*/var rNewline=/\n/g;var rEscapedNewline=/\\n/g;/**
	* Global JSONP callbacks.
	*/var callbacks;/**
	* Noop.
	*/function empty(){}/**
	* JSONP Polling constructor.
	*
	* @param {Object} opts.
	* @api public
	*/function JSONPPolling(opts){Polling.call(this,opts);this.query=this.query||{};// define global callbacks array if not present
   // we do this here (lazily) to avoid unneeded global pollution
   if(!callbacks){// we need to consider multiple engines in the same page
   if(!global.___eio)global.___eio=[];callbacks=global.___eio;}// callback identifier
   this.index=callbacks.length;// add callback to jsonp global
   var self=this;callbacks.push(function(msg){self.onData(msg);});// append to query string
   this.query.j=this.index;// prevent spurious errors from being emitted when the window is unloaded
   if(global.document&&global.addEventListener){global.addEventListener('beforeunload',function(){if(self.script)self.script.onerror=empty;},false);}}/**
	* Inherits from Polling.
	*/inherit(JSONPPolling,Polling);/*
	* JSONP only supports binary as base64 encoded strings
	*/JSONPPolling.prototype.supportsBinary=false;/**
	* Closes the socket.
	*
	* @api private
	*/JSONPPolling.prototype.doClose=function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script=null;}if(this.form){this.form.parentNode.removeChild(this.form);this.form=null;this.iframe=null;}Polling.prototype.doClose.call(this);};/**
	* Starts a poll cycle.
	*
	* @api private
	*/JSONPPolling.prototype.doPoll=function(){var self=this;var script=document.createElement('script');if(this.script){this.script.parentNode.removeChild(this.script);this.script=null;}script.async=true;script.src=this.uri();script.onerror=function(e){self.onError('jsonp poll error',e);};var insertAt=document.getElementsByTagName('script')[0];if(insertAt){insertAt.parentNode.insertBefore(script,insertAt);}else{(document.head||document.body).appendChild(script);}this.script=script;var isUAgecko='undefined'!==typeof navigator&&/gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement('iframe');document.body.appendChild(iframe);document.body.removeChild(iframe);},100);}};/**
	* Writes with a hidden iframe.
	*
	* @param {String} data to send
	* @param {Function} called upon flush.
	* @api private
	*/JSONPPolling.prototype.doWrite=function(data,fn){var self=this;if(!this.form){var form=document.createElement('form');var area=document.createElement('textarea');var id=this.iframeId='eio_iframe_'+this.index;var iframe;form.className='socketio';form.style.position='absolute';form.style.top='-1000px';form.style.left='-1000px';form.target=id;form.method='POST';form.setAttribute('accept-charset','utf-8');area.name='d';form.appendChild(area);document.body.appendChild(form);this.form=form;this.area=area;}this.form.action=this.uri();function complete(){initIframe();fn();}function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe);}catch(e){self.onError('jsonp polling iframe removal error',e);}}try{// ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
   var html='<iframe src="javascript:0" name="'+self.iframeId+'">';iframe=document.createElement(html);}catch(e){iframe=document.createElement('iframe');iframe.name=self.iframeId;iframe.src='javascript:0';}iframe.id=self.iframeId;self.form.appendChild(iframe);self.iframe=iframe;}initIframe();// escape \n to prevent it from being converted into \r\n by some UAs
   // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
   data=data.replace(rEscapedNewline,'\\\n');this.area.value=data.replace(rNewline,'\\n');try{this.form.submit();}catch(e){}if(this.iframe.attachEvent){this.iframe.onreadystatechange=function(){if(self.iframe.readyState==='complete'){complete();}};}else{this.iframe.onload=complete;}};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./polling":28,"component-inherit":31}],27:[function(require,module,exports){(function(global){/**
	* Module requirements.
	*/var XMLHttpRequest=require('xmlhttprequest-ssl');var Polling=require('./polling');var Emitter=require('component-emitter');var inherit=require('component-inherit');var debug=require('debug')('engine.io-client:polling-xhr');/**
	* Module exports.
	*/module.exports=XHR;module.exports.Request=Request;/**
	* Empty function
	*/function empty(){}/**
	* XHR Polling constructor.
	*
	* @param {Object} opts
	* @api public
	*/function XHR(opts){Polling.call(this,opts);this.requestTimeout=opts.requestTimeout;if(global.location){var isSSL='https:'===location.protocol;var port=location.port;// some user agents have empty `location.port`
   if(!port){port=isSSL?443:80;}this.xd=opts.hostname!==global.location.hostname||port!==opts.port;this.xs=opts.secure!==isSSL;}else{this.extraHeaders=opts.extraHeaders;}}/**
	* Inherits from Polling.
	*/inherit(XHR,Polling);/**
	* XHR supports binary
	*/XHR.prototype.supportsBinary=true;/**
	* Creates a request.
	*
	* @param {String} method
	* @api private
	*/XHR.prototype.request=function(opts){opts=opts||{};opts.uri=this.uri();opts.xd=this.xd;opts.xs=this.xs;opts.agent=this.agent||false;opts.supportsBinary=this.supportsBinary;opts.enablesXDR=this.enablesXDR;// SSL options for Node.js client
   opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;opts.requestTimeout=this.requestTimeout;// other options for Node.js client
   opts.extraHeaders=this.extraHeaders;return new Request(opts);};/**
	* Sends data.
	*
	* @param {String} data to send.
	* @param {Function} called upon flush.
	* @api private
	*/XHR.prototype.doWrite=function(data,fn){var isBinary=typeof data!=='string'&&data!==undefined;var req=this.request({method:'POST',data:data,isBinary:isBinary});var self=this;req.on('success',fn);req.on('error',function(err){self.onError('xhr post error',err);});this.sendXhr=req;};/**
	* Starts a poll cycle.
	*
	* @api private
	*/XHR.prototype.doPoll=function(){debug('xhr poll');var req=this.request();var self=this;req.on('data',function(data){self.onData(data);});req.on('error',function(err){self.onError('xhr poll error',err);});this.pollXhr=req;};/**
	* Request constructor
	*
	* @param {Object} options
	* @api public
	*/function Request(opts){this.method=opts.method||'GET';this.uri=opts.uri;this.xd=!!opts.xd;this.xs=!!opts.xs;this.async=false!==opts.async;this.data=undefined!==opts.data?opts.data:null;this.agent=opts.agent;this.isBinary=opts.isBinary;this.supportsBinary=opts.supportsBinary;this.enablesXDR=opts.enablesXDR;this.requestTimeout=opts.requestTimeout;// SSL options for Node.js client
   this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;// other options for Node.js client
   this.extraHeaders=opts.extraHeaders;this.create();}/**
	* Mix in `Emitter`.
	*/Emitter(Request.prototype);/**
	* Creates the XHR object and sends the request.
	*
	* @api private
	*/Request.prototype.create=function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};// SSL options for Node.js client
   opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;var xhr=this.xhr=new XMLHttpRequest(opts);var self=this;try{debug('xhr open %s: %s',this.method,this.uri);xhr.open(this.method,this.uri,this.async);try{if(this.extraHeaders){xhr.setDisableHeaderCheck(true);for(var i in this.extraHeaders){if(this.extraHeaders.hasOwnProperty(i)){xhr.setRequestHeader(i,this.extraHeaders[i]);}}}}catch(e){}if(this.supportsBinary){// This has to be done after open because Firefox is stupid
   // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
   xhr.responseType='arraybuffer';}if('POST'===this.method){try{if(this.isBinary){xhr.setRequestHeader('Content-type','application/octet-stream');}else{xhr.setRequestHeader('Content-type','text/plain;charset=UTF-8');}}catch(e){}}try{xhr.setRequestHeader('Accept','*/*');}catch(e){}// ie6 check
   if('withCredentials'in xhr){xhr.withCredentials=true;}if(this.requestTimeout){xhr.timeout=this.requestTimeout;}if(this.hasXDR()){xhr.onload=function(){self.onLoad();};xhr.onerror=function(){self.onError(xhr.responseText);};}else{xhr.onreadystatechange=function(){if(4!==xhr.readyState)return;if(200===xhr.status||1223===xhr.status){self.onLoad();}else{// make sure the `error` event handler that's user-set
   // does not throw in the same tick and gets caught here
   setTimeout(function(){self.onError(xhr.status);},0);}};}debug('xhr data %s',this.data);xhr.send(this.data);}catch(e){// Need to defer since .create() is called directly fhrom the constructor
   // and thus the 'error' event can only be only bound *after* this exception
   // occurs.  Therefore, also, we cannot throw here at all.
   setTimeout(function(){self.onError(e);},0);return;}if(global.document){this.index=Request.requestsCount++;Request.requests[this.index]=this;}};/**
	* Called upon successful response.
	*
	* @api private
	*/Request.prototype.onSuccess=function(){this.emit('success');this.cleanup();};/**
	* Called if we have data.
	*
	* @api private
	*/Request.prototype.onData=function(data){this.emit('data',data);this.onSuccess();};/**
	* Called upon error.
	*
	* @api private
	*/Request.prototype.onError=function(err){this.emit('error',err);this.cleanup(true);};/**
	* Cleans up house.
	*
	* @api private
	*/Request.prototype.cleanup=function(fromError){if('undefined'===typeof this.xhr||null===this.xhr){return;}// xmlhttprequest
   if(this.hasXDR()){this.xhr.onload=this.xhr.onerror=empty;}else{this.xhr.onreadystatechange=empty;}if(fromError){try{this.xhr.abort();}catch(e){}}if(global.document){delete Request.requests[this.index];}this.xhr=null;};/**
	* Called upon load.
	*
	* @api private
	*/Request.prototype.onLoad=function(){var data;try{var contentType;try{contentType=this.xhr.getResponseHeader('Content-Type').split(';')[0];}catch(e){}if(contentType==='application/octet-stream'){data=this.xhr.response||this.xhr.responseText;}else{if(!this.supportsBinary){data=this.xhr.responseText;}else{try{data=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response));}catch(e){var ui8Arr=new Uint8Array(this.xhr.response);var dataArray=[];for(var idx=0,length=ui8Arr.length;idx<length;idx++){dataArray.push(ui8Arr[idx]);}data=String.fromCharCode.apply(null,dataArray);}}}}catch(e){this.onError(e);}if(null!=data){this.onData(data);}};/**
	* Check if it has XDomainRequest.
	*
	* @api private
	*/Request.prototype.hasXDR=function(){return'undefined'!==typeof global.XDomainRequest&&!this.xs&&this.enablesXDR;};/**
	* Aborts the request.
	*
	* @api public
	*/Request.prototype.abort=function(){this.cleanup();};/**
	* Aborts pending requests when unloading the window. This is needed to prevent
	* memory leaks (e.g. when using IE) and to ensure that no spurious error is
	* emitted.
	*/Request.requestsCount=0;Request.requests={};if(global.document){if(global.attachEvent){global.attachEvent('onunload',unloadHandler);}else if(global.addEventListener){global.addEventListener('beforeunload',unloadHandler,false);}}function unloadHandler(){for(var i in Request.requests){if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort();}}}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./polling":28,"component-emitter":17,"component-inherit":31,"debug":18,"xmlhttprequest-ssl":30}],28:[function(require,module,exports){/**
	* Module dependencies.
	*/var Transport=require('../transport');var parseqs=require('parseqs');var parser=require('engine.io-parser');var inherit=require('component-inherit');var yeast=require('yeast');var debug=require('debug')('engine.io-client:polling');/**
	* Module exports.
	*/module.exports=Polling;/**
	* Is XHR2 supported?
	*/var hasXHR2=function(){var XMLHttpRequest=require('xmlhttprequest-ssl');var xhr=new XMLHttpRequest({xdomain:false});return null!=xhr.responseType;}();/**
	* Polling interface.
	*
	* @param {Object} opts
	* @api private
	*/function Polling(opts){var forceBase64=opts&&opts.forceBase64;if(!hasXHR2||forceBase64){this.supportsBinary=false;}Transport.call(this,opts);}/**
	* Inherits from Transport.
	*/inherit(Polling,Transport);/**
	* Transport name.
	*/Polling.prototype.name='polling';/**
	* Opens the socket (triggers polling). We write a PING message to determine
	* when the transport is open.
	*
	* @api private
	*/Polling.prototype.doOpen=function(){this.poll();};/**
	* Pauses polling.
	*
	* @param {Function} callback upon buffers are flushed and transport is paused
	* @api private
	*/Polling.prototype.pause=function(onPause){var self=this;this.readyState='pausing';function pause(){debug('paused');self.readyState='paused';onPause();}if(this.polling||!this.writable){var total=0;if(this.polling){debug('we are currently polling - waiting to pause');total++;this.once('pollComplete',function(){debug('pre-pause polling complete');--total||pause();});}if(!this.writable){debug('we are currently writing - waiting to pause');total++;this.once('drain',function(){debug('pre-pause writing complete');--total||pause();});}}else{pause();}};/**
	* Starts polling cycle.
	*
	* @api public
	*/Polling.prototype.poll=function(){debug('polling');this.polling=true;this.doPoll();this.emit('poll');};/**
	* Overloads onData to detect payloads.
	*
	* @api private
	*/Polling.prototype.onData=function(data){var self=this;debug('polling got data %s',data);var callback=function callback(packet,index,total){// if its the first message we consider the transport open
   if('opening'===self.readyState){self.onOpen();}// if its a close packet, we close the ongoing requests
   if('close'===packet.type){self.onClose();return false;}// otherwise bypass onData and handle the message
   self.onPacket(packet);};// decode payload
   parser.decodePayload(data,this.socket.binaryType,callback);// if an event did not trigger closing
   if('closed'!==this.readyState){// if we got data we're not polling
   this.polling=false;this.emit('pollComplete');if('open'===this.readyState){this.poll();}else{debug('ignoring poll - transport state "%s"',this.readyState);}}};/**
	* For polling, send a close packet.
	*
	* @api private
	*/Polling.prototype.doClose=function(){var self=this;function close(){debug('writing close packet');self.write([{type:'close'}]);}if('open'===this.readyState){debug('transport open - closing');close();}else{// in case we're trying to close while
   // handshaking is in progress (GH-164)
   debug('transport not open - deferring close');this.once('open',close);}};/**
	* Writes a packets payload.
	*
	* @param {Array} data packets
	* @param {Function} drain callback
	* @api private
	*/Polling.prototype.write=function(packets){var self=this;this.writable=false;var callbackfn=function callbackfn(){self.writable=true;self.emit('drain');};parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn);});};/**
	* Generates uri for connection.
	*
	* @api private
	*/Polling.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'https':'http';var port='';// cache busting is forced
   if(false!==this.timestampRequests){query[this.timestampParam]=yeast();}if(!this.supportsBinary&&!query.sid){query.b64=1;}query=parseqs.encode(query);// avoid port if default for schema
   if(this.port&&('https'===schema&&Number(this.port)!==443||'http'===schema&&Number(this.port)!==80)){port=':'+this.port;}// prepend ? to query
   if(query.length){query='?'+query;}var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query;};},{"../transport":24,"component-inherit":31,"debug":18,"engine.io-parser":32,"parseqs":41,"xmlhttprequest-ssl":30,"yeast":42}],29:[function(require,module,exports){(function(global){/**
	* Module dependencies.
	*/var Transport=require('../transport');var parser=require('engine.io-parser');var parseqs=require('parseqs');var inherit=require('component-inherit');var yeast=require('yeast');var debug=require('debug')('engine.io-client:websocket');var BrowserWebSocket=global.WebSocket||global.MozWebSocket;var NodeWebSocket;if(typeof window==='undefined'){try{NodeWebSocket=require('ws');}catch(e){}}/**
	* Get either the `WebSocket` or `MozWebSocket` globals
	* in the browser or try to resolve WebSocket-compatible
	* interface exposed by `ws` for Node-like environment.
	*/var WebSocket=BrowserWebSocket;if(!WebSocket&&typeof window==='undefined'){WebSocket=NodeWebSocket;}/**
	* Module exports.
	*/module.exports=WS;/**
	* WebSocket transport constructor.
	*
	* @api {Object} connection options
	* @api public
	*/function WS(opts){var forceBase64=opts&&opts.forceBase64;if(forceBase64){this.supportsBinary=false;}this.perMessageDeflate=opts.perMessageDeflate;this.usingBrowserWebSocket=BrowserWebSocket&&!opts.forceNode;if(!this.usingBrowserWebSocket){WebSocket=NodeWebSocket;}Transport.call(this,opts);}/**
	* Inherits from Transport.
	*/inherit(WS,Transport);/**
	* Transport name.
	*
	* @api public
	*/WS.prototype.name='websocket';/*
	* WebSockets support binary
	*/WS.prototype.supportsBinary=true;/**
	* Opens socket.
	*
	* @api private
	*/WS.prototype.doOpen=function(){if(!this.check()){// let probe timeout
   return;}var uri=this.uri();var protocols=void 0;var opts={agent:this.agent,perMessageDeflate:this.perMessageDeflate};// SSL options for Node.js client
   opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;if(this.extraHeaders){opts.headers=this.extraHeaders;}if(this.localAddress){opts.localAddress=this.localAddress;}try{this.ws=this.usingBrowserWebSocket?new WebSocket(uri):new WebSocket(uri,protocols,opts);}catch(err){return this.emit('error',err);}if(this.ws.binaryType===undefined){this.supportsBinary=false;}if(this.ws.supports&&this.ws.supports.binary){this.supportsBinary=true;this.ws.binaryType='nodebuffer';}else{this.ws.binaryType='arraybuffer';}this.addEventListeners();};/**
	* Adds event listeners to the socket
	*
	* @api private
	*/WS.prototype.addEventListeners=function(){var self=this;this.ws.onopen=function(){self.onOpen();};this.ws.onclose=function(){self.onClose();};this.ws.onmessage=function(ev){self.onData(ev.data);};this.ws.onerror=function(e){self.onError('websocket error',e);};};/**
	* Writes data to socket.
	*
	* @param {Array} array of packets.
	* @api private
	*/WS.prototype.write=function(packets){var self=this;this.writable=false;// encodePacket efficient as it uses WS framing
   // no need for encodePayload
   var total=packets.length;for(var i=0,l=total;i<l;i++){(function(packet){parser.encodePacket(packet,self.supportsBinary,function(data){if(!self.usingBrowserWebSocket){// always create a new object (GH-437)
   var opts={};if(packet.options){opts.compress=packet.options.compress;}if(self.perMessageDeflate){var len='string'===typeof data?global.Buffer.byteLength(data):data.length;if(len<self.perMessageDeflate.threshold){opts.compress=false;}}}// Sometimes the websocket has already been closed but the browser didn't
   // have a chance of informing us about it yet, in that case send will
   // throw an error
   try{if(self.usingBrowserWebSocket){// TypeError is thrown when passing the second argument on Safari
   self.ws.send(data);}else{self.ws.send(data,opts);}}catch(e){debug('websocket closed before onclose event');}--total||done();});})(packets[i]);}function done(){self.emit('flush');// fake drain
   // defer to next tick to allow Socket to clear writeBuffer
   setTimeout(function(){self.writable=true;self.emit('drain');},0);}};/**
	* Called upon close
	*
	* @api private
	*/WS.prototype.onClose=function(){Transport.prototype.onClose.call(this);};/**
	* Closes socket.
	*
	* @api private
	*/WS.prototype.doClose=function(){if(typeof this.ws!=='undefined'){this.ws.close();}};/**
	* Generates uri for connection.
	*
	* @api private
	*/WS.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'wss':'ws';var port='';// avoid port if default for schema
   if(this.port&&('wss'===schema&&Number(this.port)!==443||'ws'===schema&&Number(this.port)!==80)){port=':'+this.port;}// append timestamp to URI
   if(this.timestampRequests){query[this.timestampParam]=yeast();}// communicate binary support capabilities
   if(!this.supportsBinary){query.b64=1;}query=parseqs.encode(query);// prepend ? to query
   if(query.length){query='?'+query;}var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query;};/**
	* Feature detection for WebSocket.
	*
	* @return {Boolean} whether this transport is available.
	* @api public
	*/WS.prototype.check=function(){return!!WebSocket&&!('__initialize'in WebSocket&&this.name===WS.prototype.name);};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../transport":24,"component-inherit":31,"debug":18,"engine.io-parser":32,"parseqs":41,"ws":2,"yeast":42}],30:[function(require,module,exports){(function(global){// browser shim for xmlhttprequest module
   var hasCORS=require('has-cors');module.exports=function(opts){var xdomain=opts.xdomain;// scheme must be same when usign XDomainRequest
   // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
   var xscheme=opts.xscheme;// XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
   // https://github.com/Automattic/engine.io-client/pull/217
   var enablesXDR=opts.enablesXDR;// XMLHttpRequest can be disabled on IE
   try{if('undefined'!==typeof XMLHttpRequest&&(!xdomain||hasCORS)){return new XMLHttpRequest();}}catch(e){}// Use XDomainRequest for IE8 if enablesXDR is true
   // because loading bar keeps flashing when using jsonp-polling
   // https://github.com/yujiosaka/socke.io-ie8-loading-example
   try{if('undefined'!==typeof XDomainRequest&&!xscheme&&enablesXDR){return new XDomainRequest();}}catch(e){}if(!xdomain){try{return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');}catch(e){}}};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"has-cors":39}],31:[function(require,module,exports){module.exports=function(a,b){var fn=function fn(){};fn.prototype=b.prototype;a.prototype=new fn();a.prototype.constructor=a;};},{}],32:[function(require,module,exports){(function(global){/**
	* Module dependencies.
	*/var keys=require('./keys');var hasBinary=require('has-binary');var sliceBuffer=require('arraybuffer.slice');var after=require('after');var utf8=require('wtf-8');var base64encoder;if(global&&global.ArrayBuffer){base64encoder=require('base64-arraybuffer');}/**
	* Check if we are running an android browser. That requires us to use
	* ArrayBuffer with polling transports...
	*
	* http://ghinda.net/jpeg-blob-ajax-android/
	*/var isAndroid=typeof navigator!=='undefined'&&/Android/i.test(navigator.userAgent);/**
	* Check if we are running in PhantomJS.
	* Uploading a Blob with PhantomJS does not work correctly, as reported here:
	* https://github.com/ariya/phantomjs/issues/11395
	* @type boolean
	*/var isPhantomJS=typeof navigator!=='undefined'&&/PhantomJS/i.test(navigator.userAgent);/**
	* When true, avoids using Blobs to encode payloads.
	* @type boolean
	*/var dontSendBlobs=isAndroid||isPhantomJS;/**
	* Current protocol version.
	*/exports.protocol=3;/**
	* Packet types.
	*/var packets=exports.packets={open:0// non-ws
   ,close:1// non-ws
   ,ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets);/**
	* Premade error packet.
	*/var err={type:'error',data:'parser error'};/**
	* Create a blob api even for blob builder when vendor prefixes exist
	*/var Blob=require('blob');/**
	* Encodes a packet.
	*
	*     <packet type id> [ <data> ]
	*
	* Example:
	*
	*     5hello world
	*     3
	*     4
	*
	* Binary is encoded in an identical principle
	*
	* @api private
	*/exports.encodePacket=function(packet,supportsBinary,utf8encode,callback){if('function'==typeof supportsBinary){callback=supportsBinary;supportsBinary=false;}if('function'==typeof utf8encode){callback=utf8encode;utf8encode=null;}var data=packet.data===undefined?undefined:packet.data.buffer||packet.data;if(global.ArrayBuffer&&data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback);}else if(Blob&&data instanceof global.Blob){return encodeBlob(packet,supportsBinary,callback);}// might be an object with { base64: true, data: dataAsBase64String }
   if(data&&data.base64){return encodeBase64Object(packet,callback);}// Sending data as a utf-8 string
   var encoded=packets[packet.type];// data fragment is optional
   if(undefined!==packet.data){encoded+=utf8encode?utf8.encode(String(packet.data)):String(packet.data);}return callback(''+encoded);};function encodeBase64Object(packet,callback){// packet data is an object { base64: true, data: dataAsBase64String }
   var message='b'+exports.packets[packet.type]+packet.data.data;return callback(message);}/**
	* Encode packet helpers for binary types
	*/function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1+data.byteLength);resultBuffer[0]=packets[packet.type];for(var i=0;i<contentArray.length;i++){resultBuffer[i+1]=contentArray[i];}return callback(resultBuffer.buffer);}function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var fr=new FileReader();fr.onload=function(){packet.data=fr.result;exports.encodePacket(packet,supportsBinary,true,callback);};return fr.readAsArrayBuffer(packet.data);}function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback);}var length=new Uint8Array(1);length[0]=packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob);}/**
	* Encodes a packet with binary data in a base64 string
	*
	* @param {Object} packet, has `type` and `data`
	* @return {String} base64 encoded message
	*/exports.encodeBase64Packet=function(packet,callback){var message='b'+exports.packets[packet.type];if(Blob&&packet.data instanceof global.Blob){var fr=new FileReader();fr.onload=function(){var b64=fr.result.split(',')[1];callback(message+b64);};return fr.readAsDataURL(packet.data);}var b64data;try{b64data=String.fromCharCode.apply(null,new Uint8Array(packet.data));}catch(e){// iPhone Safari doesn't let you apply with typed arrays
   var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i<typed.length;i++){basic[i]=typed[i];}b64data=String.fromCharCode.apply(null,basic);}message+=global.btoa(b64data);return callback(message);};/**
	* Decodes a packet. Changes format to Blob if requested.
	*
	* @return {Object} with `type` and `data` (if any)
	* @api private
	*/exports.decodePacket=function(data,binaryType,utf8decode){if(data===undefined){return err;}// String data
   if(typeof data=='string'){if(data.charAt(0)=='b'){return exports.decodeBase64Packet(data.substr(1),binaryType);}if(utf8decode){data=tryDecode(data);if(data===false){return err;}}var type=data.charAt(0);if(Number(type)!=type||!packetslist[type]){return err;}if(data.length>1){return{type:packetslist[type],data:data.substring(1)};}else{return{type:packetslist[type]};}}var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob&&binaryType==='blob'){rest=new Blob([rest]);}return{type:packetslist[type],data:rest};};function tryDecode(data){try{data=utf8.decode(data);}catch(e){return false;}return data;}/**
	* Decodes a packet encoded in a base64 string
	*
	* @param {String} base64 encoded message
	* @return {Object} with `type` and `data` (if any)
	*/exports.decodeBase64Packet=function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!base64encoder){return{type:type,data:{base64:true,data:msg.substr(1)}};}var data=base64encoder.decode(msg.substr(1));if(binaryType==='blob'&&Blob){data=new Blob([data]);}return{type:type,data:data};};/**
	* Encodes multiple messages (payload).
	*
	*     <length>:data
	*
	* Example:
	*
	*     11:hello world2:hi
	*
	* If any contents are binary, they will be encoded as base64 strings. Base64
	* encoded strings are marked with a b before the length specifier
	*
	* @param {Array} packets
	* @api private
	*/exports.encodePayload=function(packets,supportsBinary,callback){if(typeof supportsBinary=='function'){callback=supportsBinary;supportsBinary=null;}var isBinary=hasBinary(packets);if(supportsBinary&&isBinary){if(Blob&&!dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback);}return exports.encodePayloadAsArrayBuffer(packets,callback);}if(!packets.length){return callback('0:');}function setLengthHeader(message){return message.length+':'+message;}function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?false:supportsBinary,true,function(message){doneCallback(null,setLengthHeader(message));});}map(packets,encodeOne,function(err,results){return callback(results.join(''));});};/**
	* Async array map using after
	*/function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function eachWithIndex(i,el,cb){each(el,function(error,msg){result[i]=msg;cb(error,result);});};for(var i=0;i<ary.length;i++){eachWithIndex(i,ary[i],next);}}/*
	* Decodes data when a payload is maybe expected. Possible binary contents are
	* decoded from their base64 representation
	*
	* @param {String} data, callback method
	* @api public
	*/exports.decodePayload=function(data,binaryType,callback){if(typeof data!='string'){return exports.decodePayloadAsBinary(data,binaryType,callback);}if(typeof binaryType==='function'){callback=binaryType;binaryType=null;}var packet;if(data==''){// parser error - ignoring payload
   return callback(err,0,1);}var length='',n,msg;for(var i=0,l=data.length;i<l;i++){var chr=data.charAt(i);if(':'!=chr){length+=chr;}else{if(''==length||length!=(n=Number(length))){// parser error - ignoring payload
   return callback(err,0,1);}msg=data.substr(i+1,n);if(length!=msg.length){// parser error - ignoring payload
   return callback(err,0,1);}if(msg.length){packet=exports.decodePacket(msg,binaryType,true);if(err.type==packet.type&&err.data==packet.data){// parser error in individual packet - ignoring payload
   return callback(err,0,1);}var ret=callback(packet,i+n,l);if(false===ret)return;}// advance cursor
   i+=n;length='';}}if(length!=''){// parser error - ignoring payload
   return callback(err,0,1);}};/**
	* Encodes multiple messages (payload) as binary.
	*
	* <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	* 255><data>
	*
	* Example:
	* 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	*
	* @param {Array} packets
	* @return {ArrayBuffer} encoded payload
	* @api private
	*/exports.encodePayloadAsArrayBuffer=function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0));}function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(data){return doneCallback(null,data);});}map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p==='string'){len=p.length;}else{len=p.byteLength;}return acc+len.toString().length+len+2;// string/binary identifier + separator = 2
   },0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p==='string';var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i<p.length;i++){view[i]=p.charCodeAt(i);}ab=view.buffer;}if(isString){// not true binary
   resultArray[bufferIndex++]=0;}else{// true binary
   resultArray[bufferIndex++]=1;}var lenStr=ab.byteLength.toString();for(var i=0;i<lenStr.length;i++){resultArray[bufferIndex++]=parseInt(lenStr[i]);}resultArray[bufferIndex++]=255;var view=new Uint8Array(ab);for(var i=0;i<view.length;i++){resultArray[bufferIndex++]=view[i];}});return callback(resultArray.buffer);});};/**
	* Encode as Blob
	*/exports.encodePayloadAsBlob=function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0]=1;if(typeof encoded==='string'){var view=new Uint8Array(encoded.length);for(var i=0;i<encoded.length;i++){view[i]=encoded.charCodeAt(i);}encoded=view.buffer;binaryIdentifier[0]=0;}var len=encoded instanceof ArrayBuffer?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length+1);for(var i=0;i<lenStr.length;i++){lengthAry[i]=parseInt(lenStr[i]);}lengthAry[lenStr.length]=255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob);}});}map(packets,encodeOne,function(err,results){return callback(new Blob(results));});};/*
	* Decodes data when a payload is maybe expected. Strings are decoded by
	* interpreting each byte as a key code for entries marked to start with 0. See
	* description of encodePayloadAsBinary
	*
	* @param {ArrayBuffer} data, callback method
	* @api public
	*/exports.decodePayloadAsBinary=function(data,binaryType,callback){if(typeof binaryType==='function'){callback=binaryType;binaryType=null;}var bufferTail=data;var buffers=[];var numberTooLong=false;while(bufferTail.byteLength>0){var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0]===0;var msgLength='';for(var i=1;;i++){if(tailArray[i]==255)break;if(msgLength.length>310){numberTooLong=true;break;}msgLength+=tailArray[i];}if(numberTooLong)return callback(err,0,1);bufferTail=sliceBuffer(bufferTail,2+msgLength.length);msgLength=parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg=String.fromCharCode.apply(null,new Uint8Array(msg));}catch(e){// iPhone Safari doesn't let you apply to typed arrays
   var typed=new Uint8Array(msg);msg='';for(var i=0;i<typed.length;i++){msg+=String.fromCharCode(typed[i]);}}}buffers.push(msg);bufferTail=sliceBuffer(bufferTail,msgLength);}var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,true),i,total);});};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./keys":33,"after":34,"arraybuffer.slice":35,"base64-arraybuffer":36,"blob":37,"has-binary":43,"wtf-8":38}],33:[function(require,module,exports){/**
	* Gets the keys for an object.
	*
	* @return {Array} keys
	* @api private
	*/module.exports=Object.keys||function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj){if(has.call(obj,i)){arr.push(i);}}return arr;};},{}],34:[function(require,module,exports){module.exports=after;function after(count,callback,err_cb){var bail=false;err_cb=err_cb||noop;proxy.count=count;return count===0?callback():proxy;function proxy(err,result){if(proxy.count<=0){throw new Error('after called too many times');}--proxy.count;// after first error, rest are passed to err_cb
   if(err){bail=true;callback(err);// future error callbacks will go to error handler
   callback=err_cb;}else if(proxy.count===0&&!bail){callback(null,result);}}}function noop(){}},{}],35:[function(require,module,exports){/**
	* An abstraction for slicing an arraybuffer even when
	* ArrayBuffer.prototype.slice is not supported
	*
	* @api public
	*/module.exports=function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start=start||0;end=end||bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end);}if(start<0){start+=bytes;}if(end<0){end+=bytes;}if(end>bytes){end=bytes;}if(start>=bytes||start>=end||bytes===0){return new ArrayBuffer(0);}var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end-start);for(var i=start,ii=0;i<end;i++,ii++){result[ii]=abv[i];}return result.buffer;};},{}],36:[function(require,module,exports){/*
	* base64-arraybuffer
	* https://github.com/niklasvh/base64-arraybuffer
	*
	* Copyright (c) 2012 Niklas von Hertzen
	* Licensed under the MIT license.
	*/(function(){"use strict";var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";// Use a lookup table to find the index.
   var lookup=new Uint8Array(256);for(var i=0;i<chars.length;i++){lookup[chars.charCodeAt(i)]=i;}exports.encode=function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i=0;i<len;i+=3){base64+=chars[bytes[i]>>2];base64+=chars[(bytes[i]&3)<<4|bytes[i+1]>>4];base64+=chars[(bytes[i+1]&15)<<2|bytes[i+2]>>6];base64+=chars[bytes[i+2]&63];}if(len%3===2){base64=base64.substring(0,base64.length-1)+"=";}else if(len%3===1){base64=base64.substring(0,base64.length-2)+"==";}return base64;};exports.decode=function(base64){var bufferLength=base64.length*0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length-1]==="="){bufferLength--;if(base64[base64.length-2]==="="){bufferLength--;}}var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i=0;i<len;i+=4){encoded1=lookup[base64.charCodeAt(i)];encoded2=lookup[base64.charCodeAt(i+1)];encoded3=lookup[base64.charCodeAt(i+2)];encoded4=lookup[base64.charCodeAt(i+3)];bytes[p++]=encoded1<<2|encoded2>>4;bytes[p++]=(encoded2&15)<<4|encoded3>>2;bytes[p++]=(encoded3&3)<<6|encoded4&63;}return arraybuffer;};})();},{}],37:[function(require,module,exports){(function(global){/**
	* Create a blob builder even when vendor prefixes exist
	*/var BlobBuilder=global.BlobBuilder||global.WebKitBlobBuilder||global.MSBlobBuilder||global.MozBlobBuilder;/**
	* Check if Blob constructor is supported
	*/var blobSupported=function(){try{var a=new Blob(['hi']);return a.size===2;}catch(e){return false;}}();/**
	* Check if Blob constructor supports ArrayBufferViews
	* Fails in Safari 6, so we need to map to ArrayBuffers there.
	*/var blobSupportsArrayBufferView=blobSupported&&function(){try{var b=new Blob([new Uint8Array([1,2])]);return b.size===2;}catch(e){return false;}}();/**
	* Check if BlobBuilder is supported
	*/var blobBuilderSupported=BlobBuilder&&BlobBuilder.prototype.append&&BlobBuilder.prototype.getBlob;/**
	* Helper function that maps ArrayBufferViews to ArrayBuffers
	* Used by BlobBuilder constructor and old browsers that didn't
	* support it in the Blob constructor.
	*/function mapArrayBufferViews(ary){for(var i=0;i<ary.length;i++){var chunk=ary[i];if(chunk.buffer instanceof ArrayBuffer){var buf=chunk.buffer;// if this is a subarray, make a copy so we only
   // include the subarray region from the underlying buffer
   if(chunk.byteLength!==buf.byteLength){var copy=new Uint8Array(chunk.byteLength);copy.set(new Uint8Array(buf,chunk.byteOffset,chunk.byteLength));buf=copy.buffer;}ary[i]=buf;}}}function BlobBuilderConstructor(ary,options){options=options||{};var bb=new BlobBuilder();mapArrayBufferViews(ary);for(var i=0;i<ary.length;i++){bb.append(ary[i]);}return options.type?bb.getBlob(options.type):bb.getBlob();};function BlobConstructor(ary,options){mapArrayBufferViews(ary);return new Blob(ary,options||{});};module.exports=function(){if(blobSupported){return blobSupportsArrayBufferView?global.Blob:BlobConstructor;}else if(blobBuilderSupported){return BlobBuilderConstructor;}else{return undefined;}}();}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],38:[function(require,module,exports){(function(global){/*! https://mths.be/wtf8 v1.0.0 by @mathias */;(function(root){// Detect free variables `exports`
   var freeExports=(typeof exports==="undefined"?"undefined":_typeof(exports))=='object'&&exports;// Detect free variable `module`
   var freeModule=(typeof module==="undefined"?"undefined":_typeof(module))=='object'&&module&&module.exports==freeExports&&module;// Detect free variable `global`, from Node.js or Browserified code,
   // and use it as `root`
   var freeGlobal=(typeof global==="undefined"?"undefined":_typeof(global))=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal){root=freeGlobal;}/*--------------------------------------------------------------------------*/var stringFromCharCode=String.fromCharCode;// Taken from https://mths.be/punycode
   function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
   extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
   output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
   // code unit is the high surrogate of a surrogate pair
   output.push(value);counter--;}}else{output.push(value);}}return output;}// Taken from https://mths.be/punycode
   function ucs2encode(array){var length=array.length;var index=-1;var value;var output='';while(++index<length){value=array[index];if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);}return output;}/*--------------------------------------------------------------------------*/function createByte(codePoint,shift){return stringFromCharCode(codePoint>>shift&0x3F|0x80);}function encodeCodePoint(codePoint){if((codePoint&0xFFFFFF80)==0){// 1-byte sequence
   return stringFromCharCode(codePoint);}var symbol='';if((codePoint&0xFFFFF800)==0){// 2-byte sequence
   symbol=stringFromCharCode(codePoint>>6&0x1F|0xC0);}else if((codePoint&0xFFFF0000)==0){// 3-byte sequence
   symbol=stringFromCharCode(codePoint>>12&0x0F|0xE0);symbol+=createByte(codePoint,6);}else if((codePoint&0xFFE00000)==0){// 4-byte sequence
   symbol=stringFromCharCode(codePoint>>18&0x07|0xF0);symbol+=createByte(codePoint,12);symbol+=createByte(codePoint,6);}symbol+=stringFromCharCode(codePoint&0x3F|0x80);return symbol;}function wtf8encode(string){var codePoints=ucs2decode(string);var length=codePoints.length;var index=-1;var codePoint;var byteString='';while(++index<length){codePoint=codePoints[index];byteString+=encodeCodePoint(codePoint);}return byteString;}/*--------------------------------------------------------------------------*/function readContinuationByte(){if(byteIndex>=byteCount){throw Error('Invalid byte index');}var continuationByte=byteArray[byteIndex]&0xFF;byteIndex++;if((continuationByte&0xC0)==0x80){return continuationByte&0x3F;}// If we end up here, it’s not a continuation byte.
   throw Error('Invalid continuation byte');}function decodeSymbol(){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex>byteCount){throw Error('Invalid byte index');}if(byteIndex==byteCount){return false;}// Read the first byte.
   byte1=byteArray[byteIndex]&0xFF;byteIndex++;// 1-byte sequence (no continuation bytes)
   if((byte1&0x80)==0){return byte1;}// 2-byte sequence
   if((byte1&0xE0)==0xC0){var byte2=readContinuationByte();codePoint=(byte1&0x1F)<<6|byte2;if(codePoint>=0x80){return codePoint;}else{throw Error('Invalid continuation byte');}}// 3-byte sequence (may include unpaired surrogates)
   if((byte1&0xF0)==0xE0){byte2=readContinuationByte();byte3=readContinuationByte();codePoint=(byte1&0x0F)<<12|byte2<<6|byte3;if(codePoint>=0x0800){return codePoint;}else{throw Error('Invalid continuation byte');}}// 4-byte sequence
   if((byte1&0xF8)==0xF0){byte2=readContinuationByte();byte3=readContinuationByte();byte4=readContinuationByte();codePoint=(byte1&0x0F)<<0x12|byte2<<0x0C|byte3<<0x06|byte4;if(codePoint>=0x010000&&codePoint<=0x10FFFF){return codePoint;}}throw Error('Invalid WTF-8 detected');}var byteArray;var byteCount;var byteIndex;function wtf8decode(byteString){byteArray=ucs2decode(byteString);byteCount=byteArray.length;byteIndex=0;var codePoints=[];var tmp;while((tmp=decodeSymbol())!==false){codePoints.push(tmp);}return ucs2encode(codePoints);}/*--------------------------------------------------------------------------*/var wtf8={'version':'1.0.0','encode':wtf8encode,'decode':wtf8decode};// Some AMD build optimizers, like r.js, check for specific condition patterns
   // like the following:
   if(typeof define=='function'&&_typeof(define.amd)=='object'&&define.amd){define(function(){return wtf8;});}else if(freeExports&&!freeExports.nodeType){if(freeModule){// in Node.js or RingoJS v0.8.0+
   freeModule.exports=wtf8;}else{// in Narwhal or RingoJS v0.7.0-
   var object={};var hasOwnProperty=object.hasOwnProperty;for(var key in wtf8){hasOwnProperty.call(wtf8,key)&&(freeExports[key]=wtf8[key]);}}}else{// in Rhino or a web browser
   root.wtf8=wtf8;}})(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],39:[function(require,module,exports){/**
	* Module exports.
	*
	* Logic borrowed from Modernizr:
	*
	*   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	*/try{module.exports=typeof XMLHttpRequest!=='undefined'&&'withCredentials'in new XMLHttpRequest();}catch(err){// if XMLHttp support is disabled in IE then it will throw
   // when trying to create
   module.exports=false;}},{}],40:[function(require,module,exports){(function(global){/**
	* JSON parse.
	*
	* @see Based on jQuery#parseJSON (MIT) and JSON2
	* @api private
	*/var rvalidchars=/^[\],:{}\s]*$/;var rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g;var rtrimLeft=/^\s+/;var rtrimRight=/\s+$/;module.exports=function parsejson(data){if('string'!=typeof data||!data){return null;}data=data.replace(rtrimLeft,'').replace(rtrimRight,'');// Attempt to parse using the native JSON parser first
   if(global.JSON&&JSON.parse){return JSON.parse(data);}if(rvalidchars.test(data.replace(rvalidescape,'@').replace(rvalidtokens,']').replace(rvalidbraces,''))){return new Function('return '+data)();}};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],41:[function(require,module,exports){/**
	* Compiles a querystring
	* Returns string representation of the object
	*
	* @param {Object}
	* @api private
	*/exports.encode=function(obj){var str='';for(var i in obj){if(obj.hasOwnProperty(i)){if(str.length)str+='&';str+=encodeURIComponent(i)+'='+encodeURIComponent(obj[i]);}}return str;};/**
	* Parses a simple querystring into an object
	*
	* @param {String} qs
	* @api private
	*/exports.decode=function(qs){var qry={};var pairs=qs.split('&');for(var i=0,l=pairs.length;i<l;i++){var pair=pairs[i].split('=');qry[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]);}return qry;};},{}],42:[function(require,module,exports){'use strict';var alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),length=64,map={},seed=0,i=0,prev;/**
	* Return a string representing the specified number.
	*
	* @param {Number} num The number to convert.
	* @returns {String} The string representation of the number.
	* @api public
	*/function encode(num){var encoded='';do{encoded=alphabet[num%length]+encoded;num=Math.floor(num/length);}while(num>0);return encoded;}/**
	* Return the integer value specified by the given string.
	*
	* @param {String} str The string to convert.
	* @returns {Number} The integer value represented by the string.
	* @api public
	*/function decode(str){var decoded=0;for(i=0;i<str.length;i++){decoded=decoded*length+map[str.charAt(i)];}return decoded;}/**
	* Yeast: A tiny growing id generator.
	*
	* @returns {String} A unique id.
	* @api public
	*/function yeast(){var now=encode(+new Date());if(now!==prev)return seed=0,prev=now;return now+'.'+encode(seed++);}//
   // Map each character to its index.
   //
   for(;i<length;i++){map[alphabet[i]]=i;}//
   // Expose the `yeast`, `encode` and `decode` functions.
   //
   yeast.encode=encode;yeast.decode=decode;module.exports=yeast;},{}],43:[function(require,module,exports){(function(global){/*
	* Module requirements.
	*/var isArray=require('isarray');/**
	* Module exports.
	*/module.exports=hasBinary;/**
	* Checks for binary data.
	*
	* Right now only Buffer and ArrayBuffer are supported..
	*
	* @param {Object} anything
	* @api public
	*/function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer&&global.Buffer.isBuffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer||global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i<obj.length;i++){if(_hasBinary(obj[i])){return true;}}}else if(obj&&'object'==(typeof obj==="undefined"?"undefined":_typeof(obj))){// see: https://github.com/Automattic/has-binary/pull/4
   if(obj.toJSON&&'function'==typeof obj.toJSON){obj=obj.toJSON();}for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)&&_hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"isarray":44}],44:[function(require,module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=='[object Array]';};},{}],45:[function(require,module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i;}return-1;};},{}],46:[function(require,module,exports){/**
	* Parses an URI
	*
	* @author Steven Levithan <stevenlevithan.com> (MIT license)
	* @api private
	*/var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports=function parseuri(str){var src=str,b=str.indexOf('['),e=str.indexOf(']');if(b!=-1&&e!=-1){str=str.substring(0,b)+str.substring(b,e).replace(/:/g,';')+str.substring(e,str.length);}var m=re.exec(str||''),uri={},i=14;while(i--){uri[parts[i]]=m[i]||'';}if(b!=-1&&e!=-1){uri.source=src;uri.host=uri.host.substring(1,uri.host.length-1).replace(/;/g,':');uri.authority=uri.authority.replace('[','').replace(']','').replace(/;/g,':');uri.ipv6uri=true;}return uri;};},{}],47:[function(require,module,exports){(function(global){/*global Blob,File*//**
	* Module requirements
	*/var isArray=require('isarray');var isBuf=require('./is-buffer');/**
	* Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	* Anything with blobs or files should be fed through removeBlobs before coming
	* here.
	*
	* @param {Object} packet - socket.io event packet
	* @return {Object} with deconstructed packet and list of buffers
	* @api public
	*/exports.deconstructPacket=function(packet){var buffers=[];var packetData=packet.data;function _deconstructPacket(data){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:true,num:buffers.length};buffers.push(data);return placeholder;}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i<data.length;i++){newData[i]=_deconstructPacket(data[i]);}return newData;}else if('object'==(typeof data==="undefined"?"undefined":_typeof(data))&&!(data instanceof Date)){var newData={};for(var key in data){newData[key]=_deconstructPacket(data[key]);}return newData;}return data;}var pack=packet;pack.data=_deconstructPacket(packetData);pack.attachments=buffers.length;// number of binary 'attachments'
   return{packet:pack,buffers:buffers};};/**
	* Reconstructs a binary packet from its placeholder packet and buffers
	*
	* @param {Object} packet - event packet with placeholders
	* @param {Array} buffers - binary buffers to put in placeholder positions
	* @return {Object} reconstructed packet
	* @api public
	*/exports.reconstructPacket=function(packet,buffers){var curPlaceHolder=0;function _reconstructPacket(data){if(data&&data._placeholder){var buf=buffers[data.num];// appropriate buffer (should be natural order anyway)
   return buf;}else if(isArray(data)){for(var i=0;i<data.length;i++){data[i]=_reconstructPacket(data[i]);}return data;}else if(data&&'object'==(typeof data==="undefined"?"undefined":_typeof(data))){for(var key in data){data[key]=_reconstructPacket(data[key]);}return data;}return data;}packet.data=_reconstructPacket(packet.data);packet.attachments=undefined;// no longer useful
   return packet;};/**
	* Asynchronously removes Blobs or Files from data via
	* FileReader's readAsArrayBuffer method. Used before encoding
	* data as msgpack. Calls callback with the blobless data.
	*
	* @param {Object} data
	* @param {Function} callback
	* @api private
	*/exports.removeBlobs=function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj;// convert any blob
   if(global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){pendingBlobs++;// async filereader
   var fileReader=new FileReader();fileReader.onload=function(){// this.result == arraybuffer
   if(containingObject){containingObject[curKey]=this.result;}else{bloblessData=this.result;}// if nothing pending its callback time
   if(! --pendingBlobs){callback(bloblessData);}};fileReader.readAsArrayBuffer(obj);// blob -> arraybuffer
   }else if(isArray(obj)){// handle array
   for(var i=0;i<obj.length;i++){_removeBlobs(obj[i],i,obj);}}else if(obj&&'object'==(typeof obj==="undefined"?"undefined":_typeof(obj))&&!isBuf(obj)){// and object
   for(var key in obj){_removeBlobs(obj[key],key,obj);}}}var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData);}};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./is-buffer":49,"isarray":54}],48:[function(require,module,exports){/**
	* Module dependencies.
	*/var debug=require('debug')('socket.io-parser');var json=require('json3');var Emitter=require('component-emitter');var binary=require('./binary');var isBuf=require('./is-buffer');/**
	* Protocol version.
	*
	* @api public
	*/exports.protocol=4;/**
	* Packet types.
	*
	* @api public
	*/exports.types=['CONNECT','DISCONNECT','EVENT','ACK','ERROR','BINARY_EVENT','BINARY_ACK'];/**
	* Packet type `connect`.
	*
	* @api public
	*/exports.CONNECT=0;/**
	* Packet type `disconnect`.
	*
	* @api public
	*/exports.DISCONNECT=1;/**
	* Packet type `event`.
	*
	* @api public
	*/exports.EVENT=2;/**
	* Packet type `ack`.
	*
	* @api public
	*/exports.ACK=3;/**
	* Packet type `error`.
	*
	* @api public
	*/exports.ERROR=4;/**
	* Packet type 'binary event'
	*
	* @api public
	*/exports.BINARY_EVENT=5;/**
	* Packet type `binary ack`. For acks with binary arguments.
	*
	* @api public
	*/exports.BINARY_ACK=6;/**
	* Encoder constructor.
	*
	* @api public
	*/exports.Encoder=Encoder;/**
	* Decoder constructor.
	*
	* @api public
	*/exports.Decoder=Decoder;/**
	* A socket.io Encoder instance
	*
	* @api public
	*/function Encoder(){}/**
	* Encode a packet as a single string if non-binary, or as a
	* buffer sequence, depending on packet type.
	*
	* @param {Object} obj - packet object
	* @param {Function} callback - function to handle encodings (likely engine.write)
	* @return Calls callback with Array of encodings
	* @api public
	*/Encoder.prototype.encode=function(obj,callback){debug('encoding packet %j',obj);if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){encodeAsBinary(obj,callback);}else{var encoding=encodeAsString(obj);callback([encoding]);}};/**
	* Encode packet as string.
	*
	* @param {Object} packet
	* @return {String} encoded
	* @api private
	*/function encodeAsString(obj){var str='';var nsp=false;// first is type
   str+=obj.type;// attachments if we have them
   if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){str+=obj.attachments;str+='-';}// if we have a namespace other than `/`
   // we append it followed by a comma `,`
   if(obj.nsp&&'/'!=obj.nsp){nsp=true;str+=obj.nsp;}// immediately followed by the id
   if(null!=obj.id){if(nsp){str+=',';nsp=false;}str+=obj.id;}// json data
   if(null!=obj.data){if(nsp)str+=',';str+=json.stringify(obj.data);}debug('encoded %j as %s',obj,str);return str;}/**
	* Encode packet as 'buffer sequence' by removing blobs, and
	* deconstructing packet into object with placeholders and
	* a list of buffers.
	*
	* @param {Object} packet
	* @return {Buffer} encoded
	* @api private
	*/function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack);// add packet info to beginning of data list
   callback(buffers);// write all the buffers
   }binary.removeBlobs(obj,writeEncoding);}/**
	* A socket.io Decoder instance
	*
	* @return {Object} decoder
	* @api public
	*/function Decoder(){this.reconstructor=null;}/**
	* Mix in `Emitter` with Decoder.
	*/Emitter(Decoder.prototype);/**
	* Decodes an ecoded packet string into packet JSON.
	*
	* @param {String} obj - encoded packet
	* @return {Object} packet
	* @api public
	*/Decoder.prototype.add=function(obj){var packet;if('string'==typeof obj){packet=decodeString(obj);if(exports.BINARY_EVENT==packet.type||exports.BINARY_ACK==packet.type){// binary packet's json
   this.reconstructor=new BinaryReconstructor(packet);// no attachments, labeled binary but no binary data to follow
   if(this.reconstructor.reconPack.attachments===0){this.emit('decoded',packet);}}else{// non-binary full packet
   this.emit('decoded',packet);}}else if(isBuf(obj)||obj.base64){// raw binary data
   if(!this.reconstructor){throw new Error('got binary data when not reconstructing a packet');}else{packet=this.reconstructor.takeBinaryData(obj);if(packet){// received final buffer
   this.reconstructor=null;this.emit('decoded',packet);}}}else{throw new Error('Unknown type: '+obj);}};/**
	* Decode a packet String (JSON data)
	*
	* @param {String} str
	* @return {Object} packet
	* @api private
	*/function decodeString(str){var p={};var i=0;// look up type
   p.type=Number(str.charAt(0));if(null==exports.types[p.type])return error();// look up attachments if type binary
   if(exports.BINARY_EVENT==p.type||exports.BINARY_ACK==p.type){var buf='';while(str.charAt(++i)!='-'){buf+=str.charAt(i);if(i==str.length)break;}if(buf!=Number(buf)||str.charAt(i)!='-'){throw new Error('Illegal attachments');}p.attachments=Number(buf);}// look up namespace (if any)
   if('/'==str.charAt(i+1)){p.nsp='';while(++i){var c=str.charAt(i);if(','==c)break;p.nsp+=c;if(i==str.length)break;}}else{p.nsp='/';}// look up id
   var next=str.charAt(i+1);if(''!==next&&Number(next)==next){p.id='';while(++i){var c=str.charAt(i);if(null==c||Number(c)!=c){--i;break;}p.id+=str.charAt(i);if(i==str.length)break;}p.id=Number(p.id);}// look up json data
   if(str.charAt(++i)){p=tryParse(p,str.substr(i));}debug('decoded %s as %j',str,p);return p;}function tryParse(p,str){try{p.data=json.parse(str);}catch(e){return error();}return p;};/**
	* Deallocates a parser's resources
	*
	* @api public
	*/Decoder.prototype.destroy=function(){if(this.reconstructor){this.reconstructor.finishedReconstruction();}};/**
	* A manager of a binary event's 'buffer sequence'. Should
	* be constructed whenever a packet of type BINARY_EVENT is
	* decoded.
	*
	* @param {Object} packet
	* @return {BinaryReconstructor} initialized reconstructor
	* @api private
	*/function BinaryReconstructor(packet){this.reconPack=packet;this.buffers=[];}/**
	* Method to be called when binary data received from connection
	* after a BINARY_EVENT packet.
	*
	* @param {Buffer | ArrayBuffer} binData - the raw binary data received
	* @return {null | Object} returns null if more binary data is expected or
	*   a reconstructed packet object if all buffers have been received.
	* @api private
	*/BinaryReconstructor.prototype.takeBinaryData=function(binData){this.buffers.push(binData);if(this.buffers.length==this.reconPack.attachments){// done with buffer list
   var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet;}return null;};/**
	* Cleans up binary packet reconstruction variables.
	*
	* @api private
	*/BinaryReconstructor.prototype.finishedReconstruction=function(){this.reconPack=null;this.buffers=[];};function error(data){return{type:exports.ERROR,data:'parser error'};}},{"./binary":47,"./is-buffer":49,"component-emitter":50,"debug":51,"json3":55}],49:[function(require,module,exports){(function(global){module.exports=isBuf;/**
	* Returns true if obj is a buffer or an arraybuffer.
	*
	* @api private
	*/function isBuf(obj){return global.Buffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer;}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],50:[function(require,module,exports){/**
	* Expose `Emitter`.
	*/module.exports=Emitter;/**
	* Initialize a new `Emitter`.
	*
	* @api public
	*/function Emitter(obj){if(obj)return mixin(obj);};/**
	* Mixin the emitter properties.
	*
	* @param {Object} obj
	* @return {Object}
	* @api private
	*/function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;}/**
	* Listen on the given `event` with `fn`.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks[event]=this._callbacks[event]||[]).push(fn);return this;};/**
	* Adds an `event` listener that will be invoked a single
	* time then automatically removed.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.once=function(event,fn){var self=this;this._callbacks=this._callbacks||{};function on(){self.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;};/**
	* Remove the given callback for `event` or all
	* registered callbacks.
	*
	* @param {String} event
	* @param {Function} fn
	* @return {Emitter}
	* @api public
	*/Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};// all
   if(0==arguments.length){this._callbacks={};return this;}// specific event
   var callbacks=this._callbacks[event];if(!callbacks)return this;// remove all handlers
   if(1==arguments.length){delete this._callbacks[event];return this;}// remove specific handler
   var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;};/**
	* Emit `event` with the given args.
	*
	* @param {String} event
	* @param {Mixed} ...
	* @return {Emitter}
	*/Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;};/**
	* Return array of callbacks for `event`.
	*
	* @param {String} event
	* @return {Array}
	* @api public
	*/Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks[event]||[];};/**
	* Check if this emitter has `event` handlers.
	*
	* @param {String} event
	* @return {Boolean}
	* @api public
	*/Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length;};},{}],51:[function(require,module,exports){/**
	* This is the web browser implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/exports=module.exports=require('./debug');exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();/**
	* Colors.
	*/exports.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'];/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/function useColors(){// is webkit? http://stackoverflow.com/a/16459606/376773
   return'WebkitAppearance'in document.documentElement.style||// is firebug? http://stackoverflow.com/a/398120/376773
   window.console&&(console.firebug||console.exception&&console.table)||// is firefox >= v31?
   // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
   navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31;}/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/exports.formatters.j=function(v){return JSON.stringify(v);};/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/function formatArgs(){var args=arguments;var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return args;var c='color: '+this.color;args=[args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1));// the final "%c" is somewhat tricky, because there could be other
   // arguments passed either before or after the %c, so we need to
   // figure out the correct index to insert the CSS into
   var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){// we only are interested in the *last* %c
   // (the user may have provided their own)
   lastC=index;}});args.splice(lastC,0,c);return args;}/**
	* Invokes `console.log()` when available.
	* No-op when `console.log` is not a "function".
	*
	* @api public
	*/function log(){// this hackery is required for IE8/9, where
   // the `console.log` function doesn't have 'apply'
   return'object'===(typeof console==="undefined"?"undefined":_typeof(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments);}/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug');}else{exports.storage.debug=namespaces;}}catch(e){}}/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/function load(){var r;try{r=exports.storage.debug;}catch(e){}return r;}/**
	* Enable namespaces listed in `localStorage.debug` initially.
	*/exports.enable(load());/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/function localstorage(){try{return window.localStorage;}catch(e){}}},{"./debug":52}],52:[function(require,module,exports){/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*
	* Expose `debug()` as the module.
	*/exports=module.exports=debug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=require('ms');/**
	* The currently active debug mode names, and names to skip.
	*/exports.names=[];exports.skips=[];/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lowercased letter, i.e. "n".
	*/exports.formatters={};/**
	* Previously assigned color.
	*/var prevColor=0;/**
	* Previous log timestamp.
	*/var prevTime;/**
	* Select a color.
	*
	* @return {Number}
	* @api private
	*/function selectColor(){return exports.colors[prevColor++%exports.colors.length];}/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/function debug(namespace){// define the `disabled` version
   function disabled(){}disabled.enabled=false;// define the `enabled` version
   function enabled(){var self=enabled;// set `diff` timestamp
   var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;// add the `color` if not set
   if(null==self.useColors)self.useColors=exports.useColors();if(null==self.color&&self.useColors)self.color=selectColor();var args=Array.prototype.slice.call(arguments);args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){// anything else let's inspect with %o
   args=['%o'].concat(args);}// apply any `formatters` transformations
   var index=0;args[0]=args[0].replace(/%([a-z%])/g,function(match,format){// if we encounter an escaped % then don't increase the array index
   if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);// now we need to remove `args[index]` since it's inlined in the `format`
   args.splice(index,1);index--;}return match;});if('function'===typeof exports.formatArgs){args=exports.formatArgs.apply(self,args);}var logFn=enabled.log||exports.log||console.log.bind(console);logFn.apply(self,args);}enabled.enabled=true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace=namespace;return fn;}/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/function enable(namespaces){exports.save(namespaces);var split=(namespaces||'').split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;// ignore empty strings
   namespaces=split[i].replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'));}else{exports.names.push(new RegExp('^'+namespaces+'$'));}}}/**
	* Disable debug output.
	*
	* @api public
	*/function disable(){exports.enable('');}/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false;}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true;}}return false;}/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/function coerce(val){if(val instanceof Error)return val.stack||val.message;return val;}},{"ms":53}],53:[function(require,module,exports){/**
	* Helpers.
	*/var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} options
	* @return {String|Number}
	* @api public
	*/module.exports=function(val,options){options=options||{};if('string'==typeof val)return parse(val);return options.long?long(val):short(val);};/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/function parse(str){str=''+str;if(str.length>10000)return;var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match)return;var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case'years':case'year':case'yrs':case'yr':case'y':return n*y;case'days':case'day':case'd':return n*d;case'hours':case'hour':case'hrs':case'hr':case'h':return n*h;case'minutes':case'minute':case'mins':case'min':case'm':return n*m;case'seconds':case'second':case'secs':case'sec':case's':return n*s;case'milliseconds':case'millisecond':case'msecs':case'msec':case'ms':return n;}}/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/function short(ms){if(ms>=d)return Math.round(ms/d)+'d';if(ms>=h)return Math.round(ms/h)+'h';if(ms>=m)return Math.round(ms/m)+'m';if(ms>=s)return Math.round(ms/s)+'s';return ms+'ms';}/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/function long(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms';}/**
	* Pluralization helper.
	*/function plural(ms,n,name){if(ms<n)return;if(ms<n*1.5)return Math.floor(ms/n)+' '+name;return Math.ceil(ms/n)+' '+name+'s';}},{}],54:[function(require,module,exports){arguments[4][44][0].apply(exports,arguments);},{"dup":44}],55:[function(require,module,exports){(function(global){/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */;(function(){// Detect the `define` function exposed by asynchronous module loaders. The
   // strict `define` check is necessary for compatibility with `r.js`.
   var isLoader=typeof define==="function"&&define.amd;// A set of types used to distinguish objects from primitives.
   var objectTypes={"function":true,"object":true};// Detect the `exports` object exposed by CommonJS implementations.
   var freeExports=objectTypes[typeof exports==="undefined"?"undefined":_typeof(exports)]&&exports&&!exports.nodeType&&exports;// Use the `global` object exposed by Node (including Browserify via
   // `insert-module-globals`), Narwhal, and Ringo as the default context,
   // and the `window` object in browsers. Rhino exports a `global` function
   // instead.
   var root=objectTypes[typeof window==="undefined"?"undefined":_typeof(window)]&&window||this,freeGlobal=freeExports&&objectTypes[typeof module==="undefined"?"undefined":_typeof(module)]&&module&&!module.nodeType&&(typeof global==="undefined"?"undefined":_typeof(global))=="object"&&global;if(freeGlobal&&(freeGlobal["global"]===freeGlobal||freeGlobal["window"]===freeGlobal||freeGlobal["self"]===freeGlobal)){root=freeGlobal;}// Public: Initializes JSON 3 using the given `context` object, attaching the
   // `stringify` and `parse` functions to the specified `exports` object.
   function runInContext(context,exports){context||(context=root["Object"]());exports||(exports=root["Object"]());// Native constructor aliases.
   var Number=context["Number"]||root["Number"],String=context["String"]||root["String"],Object=context["Object"]||root["Object"],Date=context["Date"]||root["Date"],SyntaxError=context["SyntaxError"]||root["SyntaxError"],TypeError=context["TypeError"]||root["TypeError"],Math=context["Math"]||root["Math"],nativeJSON=context["JSON"]||root["JSON"];// Delegate to the native `stringify` and `parse` implementations.
   if((typeof nativeJSON==="undefined"?"undefined":_typeof(nativeJSON))=="object"&&nativeJSON){exports.stringify=nativeJSON.stringify;exports.parse=nativeJSON.parse;}// Convenience aliases.
   var objectProto=Object.prototype,getClass=objectProto.toString,_isProperty,_forEach,undef;// Test the `Date#getUTC*` methods. Based on work by @Yaffle.
   var isExtended=new Date(-3509827334573292);try{// The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
   // results for certain dates in Opera >= 10.53.
   isExtended=isExtended.getUTCFullYear()==-109252&&isExtended.getUTCMonth()===0&&isExtended.getUTCDate()===1&&// Safari < 2.0.2 stores the internal millisecond time value correctly,
   // but clips the values returned by the date methods to the range of
   // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
   isExtended.getUTCHours()==10&&isExtended.getUTCMinutes()==37&&isExtended.getUTCSeconds()==6&&isExtended.getUTCMilliseconds()==708;}catch(exception){}// Internal: Determines whether the native `JSON.stringify` and `parse`
   // implementations are spec-compliant. Based on work by Ken Snyder.
   function has(name){if(has[name]!==undef){// Return cached feature test result.
   return has[name];}var isSupported;if(name=="bug-string-char-index"){// IE <= 7 doesn't support accessing string characters using square
   // bracket notation. IE 8 only supports this for primitives.
   isSupported="a"[0]!="a";}else if(name=="json"){// Indicates whether both `JSON.stringify` and `JSON.parse` are
   // supported.
   isSupported=has("json-stringify")&&has("json-parse");}else{var value,serialized="{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";// Test `JSON.stringify`.
   if(name=="json-stringify"){var stringify=exports.stringify,stringifySupported=typeof stringify=="function"&&isExtended;if(stringifySupported){// A test function object with a custom `toJSON` method.
   (value=function value(){return 1;}).toJSON=value;try{stringifySupported=// Firefox 3.1b1 and b2 serialize string, number, and boolean
   // primitives as object literals.
   stringify(0)==="0"&&// FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
   // literals.
   stringify(new Number())==="0"&&stringify(new String())=='""'&&// FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
   // does not define a canonical JSON representation (this applies to
   // objects with `toJSON` properties as well, *unless* they are nested
   // within an object or array).
   stringify(getClass)===undef&&// IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
   // FF 3.1b3 pass this test.
   stringify(undef)===undef&&// Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
   // respectively, if the value is omitted entirely.
   stringify()===undef&&// FF 3.1b1, 2 throw an error if the given value is not a number,
   // string, array, object, Boolean, or `null` literal. This applies to
   // objects with custom `toJSON` methods as well, unless they are nested
   // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
   // methods entirely.
   stringify(value)==="1"&&stringify([value])=="[1]"&&// Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
   // `"[null]"`.
   stringify([undef])=="[null]"&&// YUI 3.0.0b1 fails to serialize `null` literals.
   stringify(null)=="null"&&// FF 3.1b1, 2 halts serialization if an array contains a function:
   // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
   // elides non-JSON values from objects and arrays, unless they
   // define custom `toJSON` methods.
   stringify([undef,getClass,null])=="[null,null,null]"&&// Simple serialization test. FF 3.1b1 uses Unicode escape sequences
   // where character escape codes are expected (e.g., `\b` => `\u0008`).
   stringify({"a":[value,true,false,null,"\x00\b\n\f\r\t"]})==serialized&&// FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
   stringify(null,value)==="1"&&stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&// JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
   // serialize extended years.
   stringify(new Date(-8.64e15))=='"-271821-04-20T00:00:00.000Z"'&&// The milliseconds are optional in ES 5, but required in 5.1.
   stringify(new Date(8.64e15))=='"+275760-09-13T00:00:00.000Z"'&&// Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
   // four-digit years instead of six-digit years. Credits: @Yaffle.
   stringify(new Date(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&// Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
   // values less than 1000. Credits: @Yaffle.
   stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"';}catch(exception){stringifySupported=false;}}isSupported=stringifySupported;}// Test `JSON.parse`.
   if(name=="json-parse"){var parse=exports.parse;if(typeof parse=="function"){try{// FF 3.1b1, b2 will throw an exception if a bare literal is provided.
   // Conforming implementations should also coerce the initial argument to
   // a string prior to parsing.
   if(parse("0")===0&&!parse(false)){// Simple parsing test.
   value=parse(serialized);var parseSupported=value["a"].length==5&&value["a"][0]===1;if(parseSupported){try{// Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
   parseSupported=!parse('"\t"');}catch(exception){}if(parseSupported){try{// FF 4.0 and 4.0.1 allow leading `+` signs and leading
   // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
   // certain octal literals.
   parseSupported=parse("01")!==1;}catch(exception){}}if(parseSupported){try{// FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
   // points. These environments, along with FF 3.1b1 and 2,
   // also allow trailing commas in JSON objects and arrays.
   parseSupported=parse("1.")!==1;}catch(exception){}}}}}catch(exception){parseSupported=false;}}isSupported=parseSupported;}}return has[name]=!!isSupported;}if(!has("json")){// Common `[[Class]]` name aliases.
   var functionClass="[object Function]",dateClass="[object Date]",numberClass="[object Number]",stringClass="[object String]",arrayClass="[object Array]",booleanClass="[object Boolean]";// Detect incomplete support for accessing string characters by index.
   var charIndexBuggy=has("bug-string-char-index");// Define additional utility methods if the `Date` methods are buggy.
   if(!isExtended){var floor=Math.floor;// A mapping between the months of the year and the number of days between
   // January 1st and the first of the respective month.
   var Months=[0,31,59,90,120,151,181,212,243,273,304,334];// Internal: Calculates the number of days between the Unix epoch and the
   // first day of the given month.
   var getDay=function getDay(year,month){return Months[month]+365*(year-1970)+floor((year-1969+(month=+(month>1)))/4)-floor((year-1901+month)/100)+floor((year-1601+month)/400);};}// Internal: Determines if a property is a direct property of the given
   // object. Delegates to the native `Object#hasOwnProperty` method.
   if(!(_isProperty=objectProto.hasOwnProperty)){_isProperty=function isProperty(property){var members={},constructor;if((members.__proto__=null,members.__proto__={// The *proto* property cannot be set multiple times in recent
   // versions of Firefox and SeaMonkey.
   "toString":1},members).toString!=getClass){// Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
   // supports the mutable *proto* property.
   _isProperty=function isProperty(property){// Capture and break the object's prototype chain (see section 8.6.2
   // of the ES 5.1 spec). The parenthesized expression prevents an
   // unsafe transformation by the Closure Compiler.
   var original=this.__proto__,result=property in(this.__proto__=null,this);// Restore the original prototype chain.
   this.__proto__=original;return result;};}else{// Capture a reference to the top-level `Object` constructor.
   constructor=members.constructor;// Use the `constructor` property to simulate `Object#hasOwnProperty` in
   // other environments.
   _isProperty=function isProperty(property){var parent=(this.constructor||constructor).prototype;return property in this&&!(property in parent&&this[property]===parent[property]);};}members=null;return _isProperty.call(this,property);};}// Internal: Normalizes the `for...in` iteration algorithm across
   // environments. Each enumerated key is yielded to a `callback` function.
   _forEach=function forEach(object,callback){var size=0,Properties,members,property;// Tests for bugs in the current environment's `for...in` algorithm. The
   // `valueOf` property inherits the non-enumerable flag from
   // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
   (Properties=function Properties(){this.valueOf=0;}).prototype.valueOf=0;// Iterate over a new instance of the `Properties` class.
   members=new Properties();for(property in members){// Ignore all properties inherited from `Object.prototype`.
   if(_isProperty.call(members,property)){size++;}}Properties=members=null;// Normalize the iteration algorithm.
   if(!size){// A list of non-enumerable properties inherited from `Object.prototype`.
   members=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];// IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
   // properties.
   _forEach=function forEach(object,callback){var isFunction=getClass.call(object)==functionClass,property,length;var hasProperty=!isFunction&&typeof object.constructor!="function"&&objectTypes[_typeof(object.hasOwnProperty)]&&object.hasOwnProperty||_isProperty;for(property in object){// Gecko <= 1.0 enumerates the `prototype` property of functions under
   // certain conditions; IE does not.
   if(!(isFunction&&property=="prototype")&&hasProperty.call(object,property)){callback(property);}}// Manually invoke the callback for each non-enumerable property.
   for(length=members.length;property=members[--length];hasProperty.call(object,property)&&callback(property)){}};}else if(size==2){// Safari <= 2.0.4 enumerates shadowed properties twice.
   _forEach=function forEach(object,callback){// Create a set of iterated properties.
   var members={},isFunction=getClass.call(object)==functionClass,property;for(property in object){// Store each property name to prevent double enumeration. The
   // `prototype` property of functions is not enumerated due to cross-
   // environment inconsistencies.
   if(!(isFunction&&property=="prototype")&&!_isProperty.call(members,property)&&(members[property]=1)&&_isProperty.call(object,property)){callback(property);}}};}else{// No bugs detected; use the standard `for...in` algorithm.
   _forEach=function forEach(object,callback){var isFunction=getClass.call(object)==functionClass,property,isConstructor;for(property in object){if(!(isFunction&&property=="prototype")&&_isProperty.call(object,property)&&!(isConstructor=property==="constructor")){callback(property);}}// Manually invoke the callback for the `constructor` property due to
   // cross-environment inconsistencies.
   if(isConstructor||_isProperty.call(object,property="constructor")){callback(property);}};}return _forEach(object,callback);};// Public: Serializes a JavaScript `value` as a JSON string. The optional
   // `filter` argument may specify either a function that alters how object and
   // array members are serialized, or an array of strings and numbers that
   // indicates which properties should be serialized. The optional `width`
   // argument may be either a string or number that specifies the indentation
   // level of the output.
   if(!has("json-stringify")){// Internal: A map of control characters and their escaped equivalents.
   var Escapes={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"};// Internal: Converts `value` into a zero-padded string such that its
   // length is at least equal to `width`. The `width` must be <= 6.
   var leadingZeroes="000000";var toPaddedString=function toPaddedString(width,value){// The `|| 0` expression is necessary to work around a bug in
   // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
   return(leadingZeroes+(value||0)).slice(-width);};// Internal: Double-quotes a string `value`, replacing all ASCII control
   // characters (characters with code unit values between 0 and 31) with
   // their escaped equivalents. This is an implementation of the
   // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
   var unicodePrefix="\\u00";var quote=function quote(value){var result='"',index=0,length=value.length,useCharIndex=!charIndexBuggy||length>10;var symbols=useCharIndex&&(charIndexBuggy?value.split(""):value);for(;index<length;index++){var charCode=value.charCodeAt(index);// If the character is a control character, append its Unicode or
   // shorthand escape sequence; otherwise, append the character as-is.
   switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:result+=Escapes[charCode];break;default:if(charCode<32){result+=unicodePrefix+toPaddedString(2,charCode.toString(16));break;}result+=useCharIndex?symbols[index]:value.charAt(index);}}return result+'"';};// Internal: Recursively serializes an object. Implements the
   // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
   var serialize=function serialize(property,object,callback,properties,whitespace,indentation,stack){var value,className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,result;try{// Necessary for host object support.
   value=object[property];}catch(exception){}if((typeof value==="undefined"?"undefined":_typeof(value))=="object"&&value){className=getClass.call(value);if(className==dateClass&&!_isProperty.call(value,"toJSON")){if(value>-1/0&&value<1/0){// Dates are serialized according to the `Date#toJSON` method
   // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
   // for the ISO 8601 date time string format.
   if(getDay){// Manually compute the year, month, date, hours, minutes,
   // seconds, and milliseconds if the `getUTC*` methods are
   // buggy. Adapted from @Yaffle's `date-shim` project.
   date=floor(value/864e5);for(year=floor(date/365.2425)+1970-1;getDay(year+1,0)<=date;year++){}for(month=floor((date-getDay(year,0))/30.42);getDay(year,month+1)<=date;month++){}date=1+date-getDay(year,month);// The `time` value specifies the time within the day (see ES
   // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
   // to compute `A modulo B`, as the `%` operator does not
   // correspond to the `modulo` operation for negative numbers.
   time=(value%864e5+864e5)%864e5;// The hours, minutes, seconds, and milliseconds are obtained by
   // decomposing the time within the day. See section 15.9.1.10.
   hours=floor(time/36e5)%24;minutes=floor(time/6e4)%60;seconds=floor(time/1e3)%60;milliseconds=time%1e3;}else{year=value.getUTCFullYear();month=value.getUTCMonth();date=value.getUTCDate();hours=value.getUTCHours();minutes=value.getUTCMinutes();seconds=value.getUTCSeconds();milliseconds=value.getUTCMilliseconds();}// Serialize extended years correctly.
   value=(year<=0||year>=1e4?(year<0?"-":"+")+toPaddedString(6,year<0?-year:year):toPaddedString(4,year))+"-"+toPaddedString(2,month+1)+"-"+toPaddedString(2,date)+// Months, dates, hours, minutes, and seconds should have two
   // digits; milliseconds should have three.
   "T"+toPaddedString(2,hours)+":"+toPaddedString(2,minutes)+":"+toPaddedString(2,seconds)+// Milliseconds are optional in ES 5.0, but required in 5.1.
   "."+toPaddedString(3,milliseconds)+"Z";}else{value=null;}}else if(typeof value.toJSON=="function"&&(className!=numberClass&&className!=stringClass&&className!=arrayClass||_isProperty.call(value,"toJSON"))){// Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
   // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
   // ignores all `toJSON` methods on these objects unless they are
   // defined directly on an instance.
   value=value.toJSON(property);}}if(callback){// If a replacement function was provided, call it to obtain the value
   // for serialization.
   value=callback.call(object,property,value);}if(value===null){return"null";}className=getClass.call(value);if(className==booleanClass){// Booleans are represented literally.
   return""+value;}else if(className==numberClass){// JSON numbers must be finite. `Infinity` and `NaN` are serialized as
   // `"null"`.
   return value>-1/0&&value<1/0?""+value:"null";}else if(className==stringClass){// Strings are double-quoted and escaped.
   return quote(""+value);}// Recursively serialize objects and arrays.
   if((typeof value==="undefined"?"undefined":_typeof(value))=="object"){// Check for cyclic structures. This is a linear search; performance
   // is inversely proportional to the number of unique nested objects.
   for(length=stack.length;length--;){if(stack[length]===value){// Cyclic structures cannot be serialized by `JSON.stringify`.
   throw TypeError();}}// Add the object to the stack of traversed objects.
   stack.push(value);results=[];// Save the current indentation level and indent one additional level.
   prefix=indentation;indentation+=whitespace;if(className==arrayClass){// Recursively serialize array elements.
   for(index=0,length=value.length;index<length;index++){element=serialize(index,value,callback,properties,whitespace,indentation,stack);results.push(element===undef?"null":element);}result=results.length?whitespace?"[\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"]":"["+results.join(",")+"]":"[]";}else{// Recursively serialize object members. Members are selected from
   // either a user-specified list of property names, or the object
   // itself.
   _forEach(properties||value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);if(element!==undef){// According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
   // is not the empty string, let `member` {quote(property) + ":"}
   // be the concatenation of `member` and the `space` character."
   // The "`space` character" refers to the literal space
   // character, not the `space` {width} argument provided to
   // `JSON.stringify`.
   results.push(quote(property)+":"+(whitespace?" ":"")+element);}});result=results.length?whitespace?"{\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"}":"{"+results.join(",")+"}":"{}";}// Remove the object from the traversed object stack.
   stack.pop();return result;}};// Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
   exports.stringify=function(source,filter,width){var whitespace,callback,properties,className;if(objectTypes[typeof filter==="undefined"?"undefined":_typeof(filter)]&&filter){if((className=getClass.call(filter))==functionClass){callback=filter;}else if(className==arrayClass){// Convert the property names array into a makeshift set.
   properties={};for(var index=0,length=filter.length,value;index<length;value=filter[index++],(className=getClass.call(value),className==stringClass||className==numberClass)&&(properties[value]=1)){}}}if(width){if((className=getClass.call(width))==numberClass){// Convert the `width` to an integer and create a string containing
   // `width` number of space characters.
   if((width-=width%1)>0){for(whitespace="",width>10&&(width=10);whitespace.length<width;whitespace+=" "){}}}else if(className==stringClass){whitespace=width.length<=10?width:width.slice(0,10);}}// Opera <= 7.54u2 discards the values associated with empty string keys
   // (`""`) only if they are used directly within an object member list
   // (e.g., `!("" in { "": 1})`).
   return serialize("",(value={},value[""]=source,value),callback,properties,whitespace,"",[]);};}// Public: Parses a JSON source string.
   if(!has("json-parse")){var fromCharCode=String.fromCharCode;// Internal: A map of escaped control characters and their unescaped
   // equivalents.
   var Unescapes={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"};// Internal: Stores the parser state.
   var Index,Source;// Internal: Resets the parser state and throws a `SyntaxError`.
   var abort=function abort(){Index=Source=null;throw SyntaxError();};// Internal: Returns the next token, or `"$"` if the parser has reached
   // the end of the source string. A token may be a string, number, `null`
   // literal, or Boolean literal.
   var lex=function lex(){var source=Source,length=source.length,value,begin,position,isSigned,charCode;while(Index<length){charCode=source.charCodeAt(Index);switch(charCode){case 9:case 10:case 13:case 32:// Skip whitespace tokens, including tabs, carriage returns, line
   // feeds, and space characters.
   Index++;break;case 123:case 125:case 91:case 93:case 58:case 44:// Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
   // the current position.
   value=charIndexBuggy?source.charAt(Index):source[Index];Index++;return value;case 34:// `"` delimits a JSON string; advance to the next character and
   // begin parsing the string. String tokens are prefixed with the
   // sentinel `@` character to distinguish them from punctuators and
   // end-of-string tokens.
   for(value="@",Index++;Index<length;){charCode=source.charCodeAt(Index);if(charCode<32){// Unescaped ASCII control characters (those with a code unit
   // less than the space character) are not permitted.
   abort();}else if(charCode==92){// A reverse solidus (`\`) marks the beginning of an escaped
   // control character (including `"`, `\`, and `/`) or Unicode
   // escape sequence.
   charCode=source.charCodeAt(++Index);switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:// Revive escaped control characters.
   value+=Unescapes[charCode];Index++;break;case 117:// `\u` marks the beginning of a Unicode escape sequence.
   // Advance to the first character and validate the
   // four-digit code point.
   begin=++Index;for(position=Index+4;Index<position;Index++){charCode=source.charCodeAt(Index);// A valid sequence comprises four hexdigits (case-
   // insensitive) that form a single hexadecimal value.
   if(!(charCode>=48&&charCode<=57||charCode>=97&&charCode<=102||charCode>=65&&charCode<=70)){// Invalid Unicode escape sequence.
   abort();}}// Revive the escaped character.
   value+=fromCharCode("0x"+source.slice(begin,Index));break;default:// Invalid escape sequence.
   abort();}}else{if(charCode==34){// An unescaped double-quote character marks the end of the
   // string.
   break;}charCode=source.charCodeAt(Index);begin=Index;// Optimize for the common case where a string is valid.
   while(charCode>=32&&charCode!=92&&charCode!=34){charCode=source.charCodeAt(++Index);}// Append the string as-is.
   value+=source.slice(begin,Index);}}if(source.charCodeAt(Index)==34){// Advance to the next character and return the revived string.
   Index++;return value;}// Unterminated string.
   abort();default:// Parse numbers and literals.
   begin=Index;// Advance past the negative sign, if one is specified.
   if(charCode==45){isSigned=true;charCode=source.charCodeAt(++Index);}// Parse an integer or floating-point value.
   if(charCode>=48&&charCode<=57){// Leading zeroes are interpreted as octal literals.
   if(charCode==48&&(charCode=source.charCodeAt(Index+1),charCode>=48&&charCode<=57)){// Illegal octal literal.
   abort();}isSigned=false;// Parse the integer component.
   for(;Index<length&&(charCode=source.charCodeAt(Index),charCode>=48&&charCode<=57);Index++){}// Floats cannot contain a leading decimal point; however, this
   // case is already accounted for by the parser.
   if(source.charCodeAt(Index)==46){position=++Index;// Parse the decimal component.
   for(;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++){}if(position==Index){// Illegal trailing decimal.
   abort();}Index=position;}// Parse exponents. The `e` denoting the exponent is
   // case-insensitive.
   charCode=source.charCodeAt(Index);if(charCode==101||charCode==69){charCode=source.charCodeAt(++Index);// Skip past the sign following the exponent, if one is
   // specified.
   if(charCode==43||charCode==45){Index++;}// Parse the exponential component.
   for(position=Index;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++){}if(position==Index){// Illegal empty exponent.
   abort();}Index=position;}// Coerce the parsed value to a JavaScript number.
   return+source.slice(begin,Index);}// A negative sign may only precede numbers.
   if(isSigned){abort();}// `true`, `false`, and `null` literals.
   if(source.slice(Index,Index+4)=="true"){Index+=4;return true;}else if(source.slice(Index,Index+5)=="false"){Index+=5;return false;}else if(source.slice(Index,Index+4)=="null"){Index+=4;return null;}// Unrecognized token.
   abort();}}// Return the sentinel `$` character if the parser has reached the end
   // of the source string.
   return"$";};// Internal: Parses a JSON `value` token.
   var get=function get(value){var results,hasMembers;if(value=="$"){// Unexpected end of input.
   abort();}if(typeof value=="string"){if((charIndexBuggy?value.charAt(0):value[0])=="@"){// Remove the sentinel `@` character.
   return value.slice(1);}// Parse object and array literals.
   if(value=="["){// Parses a JSON array, returning a new JavaScript array.
   results=[];for(;;hasMembers||(hasMembers=true)){value=lex();// A closing square bracket marks the end of the array literal.
   if(value=="]"){break;}// If the array literal contains elements, the current token
   // should be a comma separating the previous element from the
   // next.
   if(hasMembers){if(value==","){value=lex();if(value=="]"){// Unexpected trailing `,` in array literal.
   abort();}}else{// A `,` must separate each array element.
   abort();}}// Elisions and leading commas are not permitted.
   if(value==","){abort();}results.push(get(value));}return results;}else if(value=="{"){// Parses a JSON object, returning a new JavaScript object.
   results={};for(;;hasMembers||(hasMembers=true)){value=lex();// A closing curly brace marks the end of the object literal.
   if(value=="}"){break;}// If the object literal contains members, the current token
   // should be a comma separator.
   if(hasMembers){if(value==","){value=lex();if(value=="}"){// Unexpected trailing `,` in object literal.
   abort();}}else{// A `,` must separate each object member.
   abort();}}// Leading commas are not permitted, object property names must be
   // double-quoted strings, and a `:` must separate each property
   // name and value.
   if(value==","||typeof value!="string"||(charIndexBuggy?value.charAt(0):value[0])!="@"||lex()!=":"){abort();}results[value.slice(1)]=get(lex());}return results;}// Unexpected token encountered.
   abort();}return value;};// Internal: Updates a traversed object member.
   var update=function update(source,property,callback){var element=walk(source,property,callback);if(element===undef){delete source[property];}else{source[property]=element;}};// Internal: Recursively traverses a parsed JSON object, invoking the
   // `callback` function for each value. This is an implementation of the
   // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
   var walk=function walk(source,property,callback){var value=source[property],length;if((typeof value==="undefined"?"undefined":_typeof(value))=="object"&&value){// `forEach` can't be used to traverse an array in Opera <= 8.54
   // because its `Object#hasOwnProperty` implementation returns `false`
   // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
   if(getClass.call(value)==arrayClass){for(length=value.length;length--;){update(value,length,callback);}}else{_forEach(value,function(property){update(value,property,callback);});}}return callback.call(source,property,value);};// Public: `JSON.parse`. See ES 5.1 section 15.12.2.
   exports.parse=function(source,callback){var result,value;Index=0;Source=""+source;result=get(lex());// If a JSON string contains multiple tokens, it is invalid.
   if(lex()!="$"){abort();}// Reset the parser state.
   Index=Source=null;return callback&&getClass.call(callback)==functionClass?walk((value={},value[""]=result,value),"",callback):result;};}}exports["runInContext"]=runInContext;return exports;}if(freeExports&&!isLoader){// Export for CommonJS environments.
   runInContext(root,freeExports);}else{// Export for web browsers and JavaScript engines.
   var nativeJSON=root.JSON,previousJSON=root["JSON3"],isRestored=false;var JSON3=runInContext(root,root["JSON3"]={// Public: Restores the original value of the global `JSON` object and
   // returns a reference to the `JSON3` object.
   "noConflict":function noConflict(){if(!isRestored){isRestored=true;root.JSON=nativeJSON;root["JSON3"]=previousJSON;nativeJSON=previousJSON=null;}return JSON3;}});root.JSON={"parse":JSON3.parse,"stringify":JSON3.stringify};}// Export for asynchronous module loaders.
   if(isLoader){define(function(){return JSON3;});}}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],56:[function(require,module,exports){module.exports=toArray;function toArray(list,index){var array=[];index=index||0;for(var i=index||0;i<list.length;i++){array[i-index]=list[i];}return array;}},{}],57:[function(require,module,exports){"use strict";// this is what is returned by new Rltm()
   module.exports=function(setup){// these are available realtime providers and their definitions
   var services={ably:require('./services/ably'),pubnub:require('./services/pubnub'),socketio:require('./services/socketio')};// return error if service is not set
   var service=services[setup.service];if(!setup.service){throw new Error('You must supply a service property.');}if(!service){throw new Error('The service you supplied is invalid.');}// add config if doesn't exist
   setup.config=setup.config||{};// set a default uuid if it has not been set for this user
   setup.config.uuid=setup.config.uuid||new Date();// set this uuid if it is not set
   setup.config.state=setup.config.state||{};// immediately invoke and return the main function
   return new service(setup);};},{"./services/ably":58,"./services/pubnub":59,"./services/socketio":60}],58:[function(require,module,exports){"use strict";// include the NodeJS event emitter
   var EventEmitter=require('events');// include the Ably javascript sdk
   var Ably=require('ably');// represents a connection to a single channel
   var Room=function(_EventEmitter){_inherits(Room,_EventEmitter);function Room(ably,channel,state){_classCallCheck(this,Room);// determine the user's state
   var _this=_possibleConstructorReturn(this,(Room.__proto__||Object.getPrototypeOf(Room)).call(this));// call the EventEmitter constructor
   state=state||{};// assign the channel parameter as a property
   _this.channelName=channel;_this.channel=ably.channels.get(channel);// save Ably in the instance of room
   _this.ably=ably;_this.isReady=false;// use the Ably library to listen for messages
   _this.channel.once('attached',function(){// tell the user that first connection made
   _this.onReady();});_this.channel.subscribe(function(message){// emit the message as an event
   _this.emit('message',message.id,message.data);});_this.channel.presence.subscribe(function(presenceEvent){if(presenceEvent.action==='enter'||presenceEvent.action==='sync'){_this.emit('join',presenceEvent.clientId,presenceEvent.data);}// someone leaves channel
   if(presenceEvent.action==='leave'){_this.emit('leave',presenceEvent.clientId);}// timeout event is not supported in Ably
   // this.emit('disconnect', presenceEvent.uuid);
   // someone's state is updated
   if(presenceEvent.action==='update'){_this.emit('state',presenceEvent.clientId,presenceEvent.data);}});// explicitly attach to the channel, although it will implicilty be attached by calling subscribe above
   _this.channel.attach();// enter the channel room automatically and be present
   _this.channel.presence.enter();return _this;}_createClass(Room,[{key:"onReady",value:function onReady(){// waiting to be assigned by user
   return;}},{key:"ready",value:function ready(fn){this.onReady=fn;}},{key:"message",value:function message(data){var _this2=this;return new Promise(function(resolve,reject){// publish the given data over the Ably channel
   _this2.channel.publish(null,data);},function(err){if(err){// if there's a problem publishing, reject
   reject(err);}else{resolve();}});}},{key:"here",value:function here(){var _this3=this;return new Promise(function(resolve,reject){// ask Ably for information about members presence on this channel
   _this3.channel.presence.get(function(err,members){if(err){// if there's a problem with the get request, reject
   reject(err);}else{// build a userlist in rltm.js format
   var userList={};// format the userList for rltm.js standard
   for(var i in members){userList[members[i].clientId]=members[i].data;}// respond with formatted list
   resolve(userList);}});});}},{key:"state",value:function state(_state){var _this4=this;return new Promise(function(resolve,reject){// Update presence state
   _this4.channel.presence.update(_state,function(err){if(err){// if there's a problem with the update request, reject
   reject(err);}else{resolve();}});});}},{key:"history",value:function history(){var _this5=this;return new Promise(function(resolve,reject){// retrieved the message history
   _this5.channel.history({count:100},function(err,page){if(err){// if there's a problem with the history request, reject
   reject(err);}else{// create our return array
   var _data=[];// loop through response and push data to array
   for(var i in page.items){_data.push({uuid:page.items[i].clientId,data:page.items[i].data});}// respond with the history data
   resolve(_data);}});});}},{key:"leave",value:function leave(){var _this6=this;return new Promise(function(resolve,reject){// tell Ably to complete leave and detach from this channel
   _this6.channel.detach(function(err){if(err){// if there's a problem detaching, reject
   reject(err);}else{resolve();}});});}}]);return Room;}(EventEmitter);// export a generic function expected by rltm.js
   module.exports=function(setup){var _this7=this;// convenience method to assign the service string name to itself
   this.service=setup.service;// initialize Ably with supplied config information
   var ably=new Ably.Realtime(setup.config);// clientId may be assigned from the token issued to the client so
   // only assign once the client has connected
   ably.connection.once('connected',function(){setup.config.uuid=ably.auth.clientId;});this.ably=ably;// expose the join method to create new room connections
   this.join=function(channel,state){return new Room(_this7.ably,channel,state);};// return the instance of this service
   return this;};},{"ably":1,"events":7}],59:[function(require,module,exports){"use strict";// include the NodeJS event emitter
   var EventEmitter=require('events');// include the PubNub javascript sdk v4
   var PubNub=require('pubnub');var globalReady=false;// represents a connection to a single channel
   var Room=function(_EventEmitter2){_inherits(Room,_EventEmitter2);function Room(pubnub,channel,uuid,state){_classCallCheck(this,Room);// determine the user's state 
   var _this8=_possibleConstructorReturn(this,(Room.__proto__||Object.getPrototypeOf(Room)).call(this));// call the EventEmitter constructor
   state=state||{};// store this users uuid
   _this8.uuid=uuid;// assign the channel parameter as a property
   _this8.channel=channel;// save pubnub in the instance of room
   _this8.pubnub=pubnub;_this8.isReady=false;// use the PubNub library to listen for messages
   _this8.pubnub.addListener({status:function status(statusEvent){// detect if this is a connection event on this channel
   if(statusEvent.category==="PNConnectedCategory"&&!_this8.isReady&&statusEvent.affectedChannels.indexOf(channel)>-1){globalReady=true;// tell the user that first connection made
   _this8.onReady();}}});_this8.pubnub.addListener({message:function message(m){// if message is sent to this specific channel
   if(channel==m.channel){// emit the message as an event
   _this8.emit('message',m.message.uuid,m.message.data);}},presence:function presence(presenceEvent){// make sure channel matches this channel
   if(channel==presenceEvent.channel){// someone joins channel
   if(presenceEvent.action=="join"){_this8.emit('join',presenceEvent.uuid,presenceEvent.state);}// someone leaves channel
   if(presenceEvent.action=="leave"){_this8.emit('leave',presenceEvent.uuid);}// someone timesout
   if(presenceEvent.action=="timeout"){_this8.emit('disconnect',presenceEvent.uuid);}// someone's state is updated
   if(presenceEvent.action=="state-change"){_this8.emit('state',presenceEvent.uuid,presenceEvent.state);}}}});// tell PubNub to subscribe to the supplied channel
   _this8.pubnub.subscribe({channels:[channel],withPresence:true,state:state});return _this8;}// ready is a callback and not an event because pubnub may be ready
   // immediately, which doesn't allow time to register an event handler
   // this can be solved with setTimeout(() => {}, 10) to let the 
   _createClass(Room,[{key:"onReady",value:function onReady(){// waiting to be assigned by user
   return;}},{key:"ready",value:function ready(fn){this.onReady=fn;if(globalReady){this.onReady();this.isReady=true;}}},{key:"message",value:function message(data){var _this9=this;return new Promise(function(resolve,reject){// publish the given data over PubNub channel
   _this9.pubnub.publish({channel:_this9.channel,message:{uuid:_this9.uuid,data:data}},function(status,response){if(status.error){// if there's a problem publishing, reject
   reject(status);}else{resolve();}});});}},{key:"here",value:function here(){var _this10=this;return new Promise(function(resolve,reject){// ask PubNub for information about connected users in this channel
   _this10.pubnub.hereNow({channels:[_this10.channel],includeUUIDs:true,includeState:true},function(status,response){if(status.error){// if there's a problem with the request, reject
   reject(status);}else{// build a userlist in rltm.js format
   var userList={};// get the list of occupants in this channel
   var occupants=response.channels[_this10.channel].occupants;// format the userList for rltm.js standard
   for(var i in occupants){userList[occupants[i].uuid]=occupants[i].state;}// respond with formatted list
   resolve(userList);}});});}},{key:"state",value:function state(_state2){var _this11=this;return new Promise(function(resolve,reject){// use PubNub state function to update state for channel
   _this11.pubnub.setState({state:_state2,uuid:_this11.uuid,channels:[_this11.channel]},function(status,response){if(status.error){// if there's a problem with the request log it
   reject(status);}else{resolve();}});});}},{key:"history",value:function history(){var _this12=this;return new Promise(function(resolve,reject){// retrieved the message history with PubNub
   _this12.pubnub.history({channel:_this12.channel,count:100// how many items to fetch
   },function(status,response){if(status.error){// if there's a problem with the request log it
   reject(status);}else{// create our return array
   var _data2=[];// loop through response and push data to array
   for(var i in response.messages){_data2.push(response.messages[i].entry);}// reverse the array so newest are first
   _data2=_data2.reverse();// respond with the history data
   resolve(_data2);}});});}},{key:"leave",value:function leave(){var _this13=this;return new Promise(function(resolve,reject){// tell PubNub to manually unsubscribe from this channel        
   _this13.pubnub.unsubscribe({channels:[_this13.channel]});resolve();});}}]);return Room;}(EventEmitter);// export a generic function expected by rltm.js
   module.exports=function(setup){var _this14=this;// convenience method to assign the service string name to itself
   this.service=setup.service;// initialize PubNub with supplied config information
   this.pubnub=new PubNub(setup.config);// expose the join method to create new room connections
   this.join=function(channel,state){return new Room(_this14.pubnub,channel,setup.config.uuid,state);};// return the instance of this service
   return this;};},{"events":7,"pubnub":9}],60:[function(require,module,exports){"use strict";// include NodeJS event emitter
   var EventEmitter=require('events');// include the Socket.io user library
   var io=require('socket.io-client');// represents a connection to a single channel
   var Room=function(_EventEmitter3){_inherits(Room,_EventEmitter3);function Room(endpoint,channel,uuid,state){_classCallCheck(this,Room);// store this users uuid
   var _this15=_possibleConstructorReturn(this,(Room.__proto__||Object.getPrototypeOf(Room)).call(this));// call the EventEmitter constructor
   _this15.uuid=uuid;// assign the channel parameter as a property
   _this15.channel=channel;_this15.isReady=false;// create a connection to the socketio endpoint
   _this15.socket=io.connect(endpoint,{multiplex:true});// subscribe to the socket.io connection event
   _this15.socket.on('connect',function(){// tell the server that we want to join a channel
   _this15.socket.emit('channel',channel,_this15.uuid,state);// tell the user the server is ready
   _this15.onReady();_this15.isReady=true;});// server says someone has joined
   _this15.socket.on('join',function(channel,uuid,state){// make sure the channel is this channel
   if(_this15.channel==channel){// emit the 'join' event to the user
   _this15.emit('join',uuid,state);}});// server says someone has left
   _this15.socket.on('leave',function(channel,uuid){// make sure it's on this channel
   if(_this15.channel==channel){// emit the 'leave' event to the user
   _this15.emit('leave',uuid);}});// server says someone has disconnected
   _this15.socket.on('disconnect',function(channel,uuid){// make sure it's on this channel
   if(_this15.channel==channel){// emit the 'leave' event to the user
   _this15.emit('disconnect',uuid);}});// a message is sent from the srever
   _this15.socket.on('message',function(channel,uuid,data){// make sure it is on this channel
   if(_this15.channel==channel){// tell the user of the new message
   _this15.emit('message',uuid,data);}});// a user sets their state
   _this15.socket.on('state',function(channel,uuid,state){// make sure it is on this channel
   if(_this15.channel==channel){// tell the user of the set state
   _this15.emit('state',uuid,state);}});return _this15;}_createClass(Room,[{key:"ready",value:function ready(fn){this.onReady=fn;if(this.isReady){this.onReady();}}},{key:"onReady",value:function onReady(){// waiting to be assigned by user
   return;}},{key:"message",value:function message(data){var _this16=this;return new Promise(function(resolve,reject){// publish the data to the socket.io server
   _this16.socket.emit('publish',_this16.channel,_this16.uuid,data,function(){resolve();});});}},{key:"here",value:function here(){var _this17=this;// ask socket.io-server for a list of online users
   return new Promise(function(resolve,reject){_this17.socket.emit('whosonline',_this17.channel,null,function(users){// callback with an object of users
   resolve(users);});});}},{key:"state",value:function state(_state3){var _this18=this;return new Promise(function(resolve,reject){// tell socket.io-server to update this user's state
   _this18.socket.emit('setState',_this18.channel,_this18.uuid,_state3,function(){resolve();});});}},{key:"history",value:function history(){var _this19=this;return new Promise(function(resolve,reject){// ask socket.io-server for the history of messages published
   _this19.socket.emit('history',_this19.channel,function(data){// callback with an array of messages
   resolve(data);});});}},{key:"leave",value:function leave(channel){var _this20=this;return new Promise(function(resolve,reject){// manually disconnect from socket.io-server
   _this20.socket.emit('leave',_this20.uuid,channel,function(){resolve();});});}}]);return Room;}(EventEmitter);module.exports=function(setup){// convenience method to assign the service string name to itself
   this.service=setup.service;this.join=function(channel,state){return new Room(setup.config.endpoint,channel,setup.config.uuid,setup.config.state);};return this;};},{"events":7,"socket.io-client":10}]},{},[57])(57);});
