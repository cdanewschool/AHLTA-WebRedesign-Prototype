/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Template Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 8
	codeCompleteness: 90
	testCompleteness: 0
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Template= module implements a [[../explainers/javascript-templates.html][JavaScript Templates]] system, with rich template functionality that fully leverages the JavaScript language.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Template= module is a package under the =Uize= namespace.
*/

Uize.module ({
	name:'Uize.Template',
	required:[
		'Uize.Url',
		'Uize.Json',
		'Uize.String'
	],
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var
				_package = function () {},
				_true = true,
				_false = false,
				_string = 'string',
				_Uize_Url = Uize.Url,
				_Uize_Json = Uize.Json,
				_Uize_String = Uize.String,
				_Uise_String_splitInTwo = _Uize_String.splitInTwo,
				_Uise_String_trim = _Uize_String.trim
			;

		/*** Global Variables ***/
			var
				_sacredEmptyObject = {},
				_codeChunkStartsWithEqualsRegExp = /^\s*=/,
				_codeChunkStartsWithAtRegExp = /^\s*@/,
				_codeChunkStartsWithPeriodRegExp = /^\s*\./,
				_encodingStartsWithInverseRegExp = /^!\s*/,
				_trailingLinebreakAndPossibleWhitespaceRegExp = /(\r|\n|\r\n)[ \t]*$/,
				_precedingLinebreakInPossibleWhitespaceRegExp = /^[ \t]*(\r|\n|\r\n)[ \t]*/,
				_encodingsDelimiter = '->'
			;

		/*** Public Static Methods ***/
			_package.compile = function (_template,_templateOptions) {
				function _getQuotedStr (_string,_quoteChar) {
					return (
						_quoteChar +
						_string
							.replace (/\\/g,'\\\\')
							.replace (/\n/g,'\\n')
							.replace (/\r/g,'\\r')
							.replace (new RegExp (_quoteChar,'g'),'\\' + _quoteChar) +
						_quoteChar
					);
				}
				_templateOptions = _templateOptions || _sacredEmptyObject;
				var
					_required = [],
					_input = {},
					_openerToken = _templateOptions.openerToken || '<%',
					_closerToken = _templateOptions.closerToken || '%>',
					_gobbleWhitespace = _templateOptions.gobbleWhitespace !== _false,
					_templateLength = _template.length,
					_blockFirstChunk = 'var output = [];',
					_blockLastChunk = 'return output.join (\'\');',
					_templateFunctionChunks = [_blockFirstChunk],
					_pushToOutputBuffer = [],
					_tokenEnd = 0,
					_tokenStart,
					_notAtEnd = _true,
					_staticSegment, _codeChunk, _codeChunkIsDirective, _codeChunkIsAssignment, _codeChunkIsAssignmentOrParam
				;
				function _pushToTemplateFunctionChunks (_codeChunk) {
					if (_pushToOutputBuffer.length) {
						_templateFunctionChunks.push ('output.push (' + _pushToOutputBuffer.join (',') + ');');
						_pushToOutputBuffer = [];
					}
					_templateFunctionChunks.push (_codeChunk);
				}

				/*** compiler directives ***/
					/*** interface type directives ***/
						function required (_requiredToAdd) {
							Array.prototype.push.apply (
								_required,Uize.isArray (_requiredToAdd) ? _requiredToAdd : [_requiredToAdd]
							);
							/*?
								Directives
									@required
										Lets you specify modules that are required by the code inside a JavaScript template.

										SYNTAX
										...............................
										<%@ required (moduleNameSTR) %>
										...............................

										The entire list of modules required for your template to process is returned in the =required= property of the =Uize.Template.compile= method's result, when the value ='full'= is specified for its optional =templateOptionsOBJ= parameter.

										EXAMPLE
										............................
										<%@ required ('Uize.Xml') %>
										............................

										In the above example, the =@required= directive declares that the template needs the =Uize.Xml= module for its processing.

										VARIATION
										..................................
										<%@ required (moduleNamesARRAY) %>
										..................................

										By using an array value, you can specify more than one module that is required. You can also call the =@required= directive multiple times inside the same template, which will have a cumulative effect in building up the required modules list.

										So, for example, the following template code...

										.............................
										<%@ required ('Uize.Xml') %>
										<%@ required ('Uize.Date') %>
										.............................

										...is equivalent to...

										..........................................
										<%@ required (['Uize.Xml','Uize.Date']) %>
										..........................................
							*/
						}
						function input (_inputProfiles) {
							Uize.copyInto (_input,_inputProfiles);
							/*?
								Directives
									@input
										Lets you specify information about the inputs that a JavaScript template supports.

										SYNTAX
										..............................
										<%@ input (inputProfileOBJ) %>
										..............................

										The complete input profile, describing all the inputs that your template accepts, is returned in the =input= property of the =Uize.Template.compile= method's result, when the value ='full'= is specified for its optional =templateOptionsOBJ= parameter.

										EXAMPLE
										..................................
										<%@ input ({idPrefix:'string'}) %>
										..................................

										In the above example, the =@input= directive declares that the template accepts the =idPrefix= input.

										You can specify profiles for multiple inputs at a time in the =inputProfileOBJ= parameter, simply by having multiple properties in the obejct. You can also call the =@input= directive multiple times inside the same template, which will have a cumulative effect in building up the input profile for the template.

										So, for example, the following template code...

										......................................
										<%@ input ({idPrefix:'string'}) %>
										<%@ input ({displayTitle:'string'}) %>
										......................................

										...is equivalent to...

										........................................................
										<%@ input ({idPrefix:'string',displayTitle:'string'}) %>
										........................................................
							*/
						}

					/*** block directives ***/
						function startBlock (_blockName,_paramsList) {
							_pushToTemplateFunctionChunks (
								'function ' + _blockName + ' (' + (_paramsList || '') + ') {' + _blockFirstChunk
							);
							/*?
								Directives
									@startBlock
										Lets you specify the start of a block of template code.

										SYNTAX
										................................
										<%@ startBlock (blockNameSTR) %>
										................................

										Once a block is defined using the =@startBlock= and =@endBlock= directives, the block is then accessible for use with a simple function call. Essentially, the block directives define a function by the name =blockName= that you can then use in subsequent JavaScript code in your template that executes at processing time.

										EXAMPLE
										.......................................................................................
										<%@ startBlock ('fancyRule') %>
										<div style="width:100%; height:5px; background:url(rule.jpg) repeat-x left top;"></div>
										<%@ endBlock () %>
										<p>This is section 1.</p>
										<%= fancyRule () %>
										<p>This is section 2.</p>
										<%= fancyRule () %>
										<p>This is section 3.</p>
										<%= fancyRule () %>
										<p>This is section 4.</p>
										.......................................................................................

										In the above example, a block called =fancyRule= is being defined, that generates output for a decorated rule using a styled =div= tag. The block is then used within the rest of the template code to insert the decorated rule into the main output for the template, between each section paragraph.

										VARIATION
										..............................................
										<%@ startBlock (blockNameSTR,paramsListSTR) %>
										..............................................

										The optional =paramsListSTR= parameter lets you specify a list of parameters that your template block handles. The parameter list string should be formatted as a comma-separated list of parameter names.

										EXAMPLE
										...............................................................
										<%@ startBlock ('thumbnail','title') %>
										<% var filename = title.toLowerCase ().replace (/\s+/g,'-'); %>
										<a href="../photos/700x500/<%= filename %>.jpg">
											<img
												src="../photos/105x75/<%= filename %>.jpg"
												width="105" height="75"
												alt="<%= title %>"
											/>
										</a>
										<%@ endBlock () %>
										<%= thumbnail ('Pink and Yellow Sunset') %>
										<%= thumbnail ('Braving the Onslaught') %>
										<%= thumbnail ('Companion to a Sunset') %>
										<%= thumbnail ('Concrete Eternity') %>
										<%= thumbnail ('Corrugate It') %>
										...............................................................

										In the above example, a block called =thumbnail= is being defined, that takes the single parameter =title=. After the block is defined, it is called multiple times with different values for the block's =title= parameter. The block uses the parameter in generating its output. The block's function returns the block's generated output. The result of each call to the =thumbnail= block's function is being assigned to the template's main output, using the =&#60;%&#61;= syntax.
							*/
						}
						function endBlock () {
							_pushToTemplateFunctionChunks (_blockLastChunk + '}');
							/*?
								Directives
									@endBlock
										Lets you specify the end of a block of template code.

										SYNTAX
										..................
										<%@ endBlock () %>
										..................

										For a more detailed discussion of the block directives, see the reference for the =@startBlock= directive.
							*/
						}

				while (_notAtEnd) {
					_tokenStart = _template.indexOf (_openerToken,_tokenEnd);
					if (_tokenStart < 0)
						_tokenStart = _templateLength
					;
					_staticSegment = _template.slice (_tokenEnd,_tokenStart);
					_notAtEnd = _tokenStart < _templateLength;
					if (_notAtEnd) {
						_tokenStart += 2;
						_tokenEnd = _template.indexOf (_closerToken,_tokenStart);
						_codeChunk = _template.slice (_tokenStart,_tokenEnd);
						_codeChunkIsAssignment = _codeChunkStartsWithEqualsRegExp.test (_codeChunk);
						_codeChunkIsAssignmentOrParam =
							_codeChunkIsAssignment || _codeChunkStartsWithPeriodRegExp.test (_codeChunk)
						;
						_codeChunkIsDirective =
							!_codeChunkIsAssignmentOrParam && _codeChunkStartsWithAtRegExp.test (_codeChunk)
						;
						_tokenEnd += 2;
					}
					if (_staticSegment) {
						if (
							_gobbleWhitespace && _notAtEnd && !_codeChunkIsAssignmentOrParam &&
							_trailingLinebreakAndPossibleWhitespaceRegExp.test (_staticSegment) &&
							_precedingLinebreakInPossibleWhitespaceRegExp.test (_template.substr (_tokenEnd))
						)
							/* NOTE: support for whitespace gobbling
								Rather than having modifiers (like in Template Toolkit) to explicitly gobble leading and/or trailing whitespace and linebreaks, this code assumes that if the preceding static segment ends with a linebreak and possible whitespace, and the current code chunk is followed by a linebreak amongst possible whitespace characters, then the trailing linebreak and whitespace should be gobbled from the previous static segment.
							*/
							_staticSegment = _staticSegment.replace (_trailingLinebreakAndPossibleWhitespaceRegExp,'')
						;
						_staticSegment &&
							_pushToOutputBuffer.push (_getQuotedStr (_staticSegment,'\''));
						;
					}
					if (_notAtEnd) {
						if (_codeChunkIsAssignmentOrParam) {
							/* NOTE: support for expressions
								param shortcut syntax
									<%. param %>
									<%. param -> encoding %>
									<%. param -> encoding{encodingOptions} %>
									<%. param -> encoding1 -> encoding2 %>
									<%. param -> encoding1{encodingOptions} -> encoding2 %>
								JavaScript expression shortcut
									<%= expression %>
									<%= expression -> encoding1 -> encoding2 %>
							*/
							_codeChunk = _codeChunkIsAssignment
								? _codeChunk.replace (_codeChunkStartsWithEqualsRegExp,'')
								: ('input' + _codeChunk)
							;
							var
								_expressionAndEncodings = _Uise_String_splitInTwo (_codeChunk,_encodingsDelimiter),
								_expression = _Uise_String_trim (_expressionAndEncodings [0]),
								_encodings = _expressionAndEncodings [1]
							;
							if (_encodings) {
								_encodings = _encodings.split (_encodingsDelimiter);
								for (
									var _encodingNo = -1, _encodingsLength = _encodings.length;
									++_encodingNo < _encodingsLength;
								) {
									var
										_encodingNameAndParams = _Uise_String_splitInTwo (_encodings [_encodingNo],'{'),
										_encodingName = _Uise_String_trim (_encodingNameAndParams [0])
									;
									if (_encodingName) {
										var
											_encodingParams = _Uise_String_trim (_encodingNameAndParams [1]),
											_encodingInverse = _encodingStartsWithInverseRegExp.test (_encodingName),
											_encoderOrDecoderStr = (_encodingInverse ? 'de' : 'en') + 'coder'
										;
										if (_encodingInverse)
											_encodingName = _encodingName.replace (_encodingStartsWithInverseRegExp,'')
										;
										_expression = 'Uize.Template.' + _encoderOrDecoderStr + 's.' + _encodingName + '.' + _encoderOrDecoderStr + '(' + _expression + (_encodingParams ? (',{' + _encodingParams) : '') + ')';
									}
								}
							}
							_pushToOutputBuffer.push (_expression);
						} else if (_codeChunkIsDirective) {
							eval (_codeChunk.replace (_codeChunkStartsWithAtRegExp,''));
						} else {
							_pushToTemplateFunctionChunks (_codeChunk);
						}
					}
				}
				_pushToTemplateFunctionChunks (_blockLastChunk);
				var
					_templateFunctionCode = _templateFunctionChunks.join ('\n'),
					_templateFunction = new Function ('input',_templateFunctionCode)
				;
				return (
					_templateOptions.result == 'full'
					? {
						input:_input,
						required:_required,
						code:_templateFunctionCode,
						templateFunction:_templateFunction
					}
					: _templateFunction
				);
				/*?
					Static Methods
						Uize.Template.compile
							Compiles a JavaScript template to a function for high performance repeat usage.

							SYNTAX
							..............................................................................
							compiledTemplateFUNC = Uize.Template.compile (templateSTR,templateOptionsOBJ);
							..............................................................................

							templateOptionsOBJ
								The =templateOptionsOBJ= parameter lets you specify options for how the template should be compiled, and has properties as follows...

								PROPERTIES
								..........................................................................
								{
									openerToken:openerTokenSTR,            // optional, defaults to <%
									closerToken:closerTokenSTR,            // optional, defaults to %>
									gobbleWhitespace:gobbleWhitespaceBOOL, // optional, defaults to true
									result:resultTypeSTR                   // 'function' (default) | 'full'
								};
								..........................................................................

								openerToken
									A string, specifying the characters that should delimit the start of a segment of template code. Defaults to =&#60;%=.

								closerToken
									A string, specifying the characters that should delimit the end of a segment of template code. Defaults to =%&#62;=.

								gobbleWhitespace
									A boolean, specifying whether or not the automatic whitespace gobbling mechanism should be enabled. Defaults to =true=.

								result
									A string, specifying how the =Uize.Template.compile= method should return its result. The default value ='function'= will cause the method to return just a reference to the compiled template function. The value ='full'= will cause the method to return an object comprised of the following items...

									FULL RESULT
									..................................................................................
									{
										input:inputProfileOBJ,        // a profile of the input handled by the template
										required:moduleNamesARRAY,    // a list of modules required by the template
										code:templateCodeSTR,         // implementation code for the template function
										templateFunction:templateFUNC // a reference to the compiled template function
									}
									..................................................................................
				*/
			};

			/*** encoding/decoding methods ***/
				function _encodeOrDecode (_source,_encoding,_mustEncode) {
					var
						_result = _source,
						_encodersOrDecoders = _package [_mustEncode ? 'encoders' : 'decoders'],
						_encoderOrDecoderPropertyName = _mustEncode ? 'encoder' : 'decoder'
					;
					function _processEncoding (_encoding) {
						var _encodingIsString = typeof _encoding == _string;
						if (_encodingIsString && _encoding.indexOf ('|') > -1) {
							_processEncoding (_encoding.split ('|'));
						} else {
							if (!_encodingIsString && Uize.isArray (_encoding)) {
								for (
									var _encodingNo = -1, _encodingLength = _encoding.length;
									++_encodingNo < _encodingLength;
								)
									_processEncoding (_encoding [_mustEncode ? _encodingNo : _encodingLength - 1 - _encodingNo])
								;
							} else {
								var _encoderOrDecoder = _encodersOrDecoders [_encodingIsString ? _encoding : _encoding.type] [_encoderOrDecoderPropertyName];
								if (_encoderOrDecoder)
									_result = _encoderOrDecoder (_result,_encodingIsString ? _sacredEmptyObject : _encoding)
								;
							}
						}
					}
					_processEncoding (_encoding);
					return _result;
				};

				_package.encode = function (_toEncode,_encoding) {return _encodeOrDecode (_toEncode,_encoding,_true)};
					/*?
						Static Methods
							Uize.Template.encode
								Encodes the specified value, using the specified encoding(s).

								SYNTAX
								................................................................................
								encodedANYTYPE = Uize.Template.encode (toEncodeANYTYPE,encodingSTRorOBJorARRAY);
								................................................................................

								EXAMPLE
								.....................................
								urlParamsStr = Uize.Template.encode (
									{
										category:'Dogs and Cats',
										type:'all',
										sort:'recent',
										resultsPerPage:20
									},
									'urlParams'
								);
								.....................................

								The above example would produce the string output...

								................................................................
								category=Dogs%20and%20Cats&type=allsort=recent&resultsPerPage=20
								................................................................
					*/

				_package.decode = function (_toDecode,_encoding) {return _encodeOrDecode (_toDecode,_encoding)};
					/*?
						Static Methods
							Decodes the specified value, by reversing the specified encoding(s).

							Uize.Template.decode
								SYNTAX
								................................................................................
								decodedANYTYPE = Uize.Template.decode (toDecodeANYTYPE,encodingSTRorOBJorARRAY);
								................................................................................

								EXAMPLE
								......................................................................
								urlParamsHash = Uize.Template.decode (
									'category=Dogs%20and%20Cats&type=allsort=recent&resultsPerPage=20',
									'urlParams'
								);
								......................................................................

								The above example would produce the string output...

								............................
								{
									category:'Dogs and Cats',
									type:'all',
									sort:'recent',
									resultsPerPage:20
								}
								............................
					*/

		/*** Public Static Properties ***/
			/*** Encoders ***/
				_package.encoders = {
					json:{
						encoder:_Uize_Json.to
						/*?
							Static Properties
								Uize.Template.encoders
									Uize.Template.encoders.json
										Encodes the value to a string of JSON format. The value to encode can be a string, boolean, number, object, array, null, undefined, or a regular expression.

										This encoder is equivalent to calling to =Uize.Json.to= static method.
						*/
					},
					miniJson:{
						encoder:function (_toEncode) {return _Uize_Json.to (_toEncode,'mini')}
						/*?
							Static Properties
								Uize.Template.encoders
									Uize.Template.encoders.miniJson
										Encodes the value to a string of mini JSON format (compact, with no indentation or linebreaks for complex objects).

										This encoder is equivalent to calling =Uize.Json.to (toEncodeANYTYPE,'mini')=.
						*/
					},
					url:{
						encoder:_Uize_Url.resolve
						/*?
							Static Properties
								Uize.Template.encoders
									Uize.Template.encoders.url
										Encodes the value to a URL string. The value may be a string or an array containing a URL path string and any number of optional query params objects.

										This encoder is equivalent to calling to =Uize.Url.resolve= static method.
						*/
					},
					urlParams:{
						encoder:_Uize_Url.toParams
						/*?
							Static Properties
								Uize.Template.encoders
									Uize.Template.encoders.urlParams
										Encodes a query params object to a URL encoded query params string.

										This encoder is equivalent to calling to =Uize.Url.toParams= static method.
						*/
					},
					urlPiece:{
						encoder:_Uize_Url.toPiece
						/*?
							Static Properties
								Uize.Template.encoders
									Uize.Template.encoders.urlPiece
										Encodes a string value to a URL encoded fragment of a URL.

										This encoder is equivalent to calling to =Uize.Url.toPiece= static method.
						*/
					}
				};

			/*** Decoders ***/
				_package.decoders = {
					json:{
						decoder:_Uize_Json.from
						/*?
							Static Properties
								Uize.Template.decoders
									Uize.Template.decoders.json
										Decodes the value from a JSON format string to a JavaScript memory representation. The resulting value can be a string, boolean, number, object, array, null, undefined, or a regular expression.

										This decoder is equivalent to calling to =Uize.Json.from= static method.
						*/
					},
					miniJson:{
						decoder:_Uize_Json.from
						/*?
							Static Properties
								Uize.Template.decoders
									Uize.Template.decoders.miniJson
										This decoder is essentially equivalent to the =Uize.Template.decoders.json= decoder, but is provided for parity with the corresponding =Uize.Template.encoders.miniJson= encoder.

										This decoder is equivalent to calling to =Uize.Json.from= static method.
						*/
					},
					urlParams:{
						decoder:_Uize_Url.fromParams
						/*?
							Static Properties
								Uize.Template.decoders
									Uize.Template.decoders.urlParams
										Decodes a URL encoded query params string to produce a query params object.

										This decoder is equivalent to calling to =Uize.Url.fromParams= static method.
						*/
					},
					urlPiece:{
						decoder:_Uize_Url.fromPiece
						/*?
							Static Properties
								Uize.Template.decoders
									Uize.Template.decoders.urlPiece
										Decodes a URL encoded fragment of a URL to a plain string value.

										This decoder is equivalent to calling to =Uize.Url.fromPiece= static method.
						*/
					}
				};

		return _package;
	}
});

