/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=b" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 9
	codeCompleteness: 40
	testCompleteness: 0
	docCompleteness: 0
*/

/*?
	Introduction
		The =Uize.Test= class...

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test= module defines the =Uize.Test= class, a subclass of the =Uize=.
*/

Uize.module ({
	name:'Uize.Test',
	required:[
		'Uize.Data',
		'Uize.Json'
	],
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_true = true,
				_false = false,
				_undefined
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._expectSuccess = function (_succeeded,_serializeExpected,_serializeActual) {
				_succeeded ||
					this.set ({
						_reasonForFailure:
							'EXPECTED:\n\n' +
							_serializeExpected () + '\n\n' +
							'ACTUAL:\n\n' +
							_serializeActual ()
					})
				;
				return _succeeded;
			};

		/*** Public Instance Methods ***/
			_classPrototype.expect = function (_expectedValue,_value) {
				return this._expectSuccess (
					Uize.Data.identical (_expectedValue,_value),
					function () {return Uize.Json.to (_expectedValue)},
					function () {return Uize.Json.to (_value)}
				);
			};

			/*** methods for instance type expectations ***/
				_classPrototype.expectInstanceOf = function (_class,_value) {
					return this._expectSuccess (
						typeof _value == 'object' && _value &&
						_value.constructor == (typeof _class == 'string' ? eval (_class) : _class).prototype.constructor,
						function () {return 'instance of ' + _class},
						function () {return _value.constructor}
					);
				};

			/*** methods for type expectations ***/
				_classPrototype.expectType = function (_expectedType,_value) {
					return this._expectSuccess (
						typeof _value == _expectedType,
						function () {return 'type ' + _expectedType},
						function () {return 'type ' + typeof _value}
					);
				};

				_classPrototype.expectArray = function (_value) {
					return this.expectInstanceOf (Array,_value);
				};

				_classPrototype.expectBoolean = function (_value) {
					return this.expectType ('boolean',_value);
				};

				_classPrototype.expectFunction = function (_value) {
					return this.expectType ('function',_value);
				};

				_classPrototype.expectNumber = function (_value) {
					return this.expectType ('number',_value);
				};

				_classPrototype.expectObject = function (_value) {
					return this.expectType ('object',_value);
				};

				_classPrototype.expectRegExp = function (_value) {
					return this.expectInstanceOf (RegExp,_value);
				};

				_classPrototype.expectString = function (_value) {
					return this.expectType ('string',_value);
				};

			/*** methods for type-like expectations ***/
				_classPrototype.expectArrayLike = function (_value) {
					return this._expectSuccess (
						Uize.isArray (_value),
						function () {return 'array like'},
						function () {return Uize.Json.to (_value)}
					);
				};

			/*** methods for range expectations ***/
				_classPrototype.expectValueRange = function (_minValue,_maxValue,_value) {
					return this._expectSuccess (
						_value >= _minValue && _value <= _maxValue,
						function () {return 'value within range ' + _minValue + ' to ' + _maxValue},
						function () {return Uize.Json.to (_value)}
					);
				};

				/*** convenience methods for negative and positive value ranges ***/
					_classPrototype.expectNegativeValue = function (_value) {
						return this.expectValueRange (-Infinity,0,_value);
					};

					_classPrototype.expectPositiveValue = function (_value) {
						return this.expectValueRange (0,Infinity,_value);
					};

				_classPrototype.expectLengthRange = function (_minLength,_maxLength,_value) {
					var _valueLength = _value.length;
					return this._expectSuccess (
						_valueLength >= _minLength && _valueLength <= _maxLength,
						function () {return 'length within range ' + _minLength + ' to ' + _maxLength},
						function () {return _valueLength}
					);
				};

				_classPrototype.expectNonEmpty = function (_value) {
					return this._expectSuccess (
						!Uize.Data.isEmpty (_value),
						function () {return 'non-empty'},
						function () {return Uize.Json.to (_value)}
					);
				};

			/*** convenience methods for compound expectations ***/
				_classPrototype.expectInteger = function (_value) {
					return this._expectSuccess (
						Math.floor (_value) == +_value,
						function () {return 'integer'},
						function () {return Uize.Json.to (_value)}
					);
				};

				_classPrototype.expectNegativeInteger = function (_value) {
					return this.expectInteger (_value) && this.expectNegativeValue (_value);
				};

				_classPrototype.expectPositiveInteger = function (_value) {
					return this.expectInteger (_value) && this.expectPositiveValue (_value);
				};

				_classPrototype.expectNoRepeats = function (_values) {
					return Uize.Data.getTotalKeys (Uize.Data.getLookup (_values)) == _values.length;
				};

				_classPrototype.expectNonEmptyArray = function (_value) {
					return this.expectArray (_value) && this.expectNonEmpty (_value);
				};

				_classPrototype.expectNonEmptyObject = function (_value) {
					return this.expectObject (_value) && this.expectNonEmpty (_value);
				};

				_classPrototype.expectNonEmptyString = function (_value) {
					return this.expectString (_value) && this.expectNonEmpty (_value);
				};

			_classPrototype.run = function (_callback) {
				var
					_this = this,
					_test = _this._test,
					_testResult = _true
				;
				_this.set ({
					_startTime:new Date,
					_endTime:_undefined,
					_isAsync:_false,
					_log:[],
					_result:_undefined,
					_reasonForFailure:_undefined
				});
				_this.fire ('Start');
				function _updateResultProperty () {
					_this.set ({_result:_testResult});
					if (_testResult == _isAsync) {
						_this.set ({_isAsync:_true});
					} else {
						var _endTime = new Date;
						_this.set ({
							_duration:_endTime - _this._startTime,
							_endTime:_endTime
						});

						/* HACK! This will go away when there is a robust system for logging and watching tests */
							!_testResult && _this._title != null &&
								alert (
									'TEST FAILED: ' + _this._title + '\n' +
									(
										(_this._reasonForFailure || '') && (
											'\n' +
											'REASON FOR FAILURE:\n' +
											'\n' +
											_this._reasonForFailure
										)
									)
								)
							;

						_this.fire ('Done');
						_this._isAsync && _callback && _callback (_testResult);
					}
				}
				if (Uize.isArray (_test)) {
					var
						_testLength = _test.length,
						_testNo = -1,
						_subTest
					;
					function _continue () {
						function _setResultAndContinue (_result) {
							_testResult = _result;
							_continue ();
						}
						while (
							_testResult &&
							++_testNo < _testLength &&
							(_testResult = (_subTest = new _test [_testNo]).run (_setResultAndContinue)) != _isAsync
						);
						_updateResultProperty ();
					}
					_continue ();
				} else {
					try {
						_testResult = _isAsync;
						var
							_returned = _false,
							_testFunctionReturnValue = _test.call (
								_this,
								function (_result) {
									_testResult = _result;
									_returned && _updateResultProperty ();
								}
							)
						;
						if (_testFunctionReturnValue !== _undefined)
							_testResult = _testFunctionReturnValue
						;
						_returned = true;
					} catch (_error) {
						_this.set ({
							_reasonForFailure:
								'JavaScript Error...\n' +
								'ERROR NAME: ' + _error.name + '\n' +
								'ERROR MESSAGE: ' + _error.message + '\n' +
								'ERROR DESCRIPTION: ' + _error.description + '\n' +
								'LINE NUMBER: ' + _error.number + '\n'
						});
						_testResult = _false;
					}
					_updateResultProperty ();
				}

				return _testResult;
			};

		/*** Public Static Properties ***/
			var _isAsync = _class.isAsync = {};

		/*** Public Static Methods ***/
			_class.addTest = function (_test) {
				(this._test || (this._test = [])).push (_test);
			};

			_class.declare = function (_test) {
				/* TO DO
					- if the test is already a class, then just return it
				*/
				var _testClass = _class.subclass ();

				/*** if test property is an array of subtests, then resolve any declarative subtests ***/
					var _subtests = _test.test;
					if (Uize.isArray (_subtests)) {
						for (var _subtestNo = -1, _subtestsLength = _subtests.length; ++_subtestNo < _subtestsLength;) {
							var _subtest = _subtests [_subtestNo];
							if (_subtest.constructor == Object)
								_subtests [_subtestNo] = _class.declare (_subtest)
							;
						}
					}

				_testClass.set (_test);
				return _testClass;
			};

			_class.log = function (_message) {
				this._log.push ({timestamp:new Date,message:_message});
			};

			_class.requiredModulesTest = function (_modules) {
				return Uize.Test.declare ({
					title:'REQUIRED MODULES TEST: ' + _modules,
					test:function (_continue) {
						Uize.module ({
							required:_modules,
							builder:function () {_continue (true)}
						});
					}
				});
			};

			_class.staticMethodTest = function (_methodFullName,_cases,_testProperties) {
				var
					_lastPeriodPos = _methodFullName.lastIndexOf ('.'),
					_methodHostName = _methodFullName.slice (0,_lastPeriodPos),
					_methodName = _methodFullName.slice (_lastPeriodPos + 1),
					_test = [
						{
							title:'Test that host ' + _methodHostName + ' is defined',
							test:function () {
								var _succeeded = !!eval (_methodHostName);
								_succeeded ||
									this.set ({_reasonForFailure:'The host for static method ' + _methodFullName + ', ' + _methodHostName + ', is not defined'})
								;
								return _succeeded;
							}
						},
						{
							title:'Test that static method ' + _methodFullName + ' is defined',
							test:function () {
								var _succeeded = !!eval (_methodHostName) [_methodName];
								_succeeded ||
									this.set ({_reasonForFailure:'Static method ' + _methodFullName + ' is not defined'})
								;
								return _succeeded;
							}
						},
						{
							title:'Test that ' + _methodFullName + ' is a function',
							test:function () {
								var
									_methodType = typeof eval (_methodHostName) [_methodName],
									_succeeded = _methodType == 'function'
								;
								_succeeded ||
									this.set ({
										_reasonForFailure:_methodFullName + ' should be a function, but is of type ' + _methodType
									})
								;
								return _succeeded;
							}
						}
					]
				;
				function _getCaseTest (_case) {
					return (
						Uize.isArray (_case)
							? _class.declare ({
								title:_case [0],
								test:function () {
									var
										_methodHost = eval (_methodHostName),
										_arguments = _case [1]
									;
									return this.expect (
										_case [2],
										_methodHost [_methodName].apply (
											_methodHost,
											Uize.isArray (_arguments) ? _arguments : [_arguments]
										)
									);
								}
							})
							: _case
					);
				}
				for (var _caseNo = -1, _casesLength = _cases.length; ++_caseNo < _casesLength;)
					_test.push (_getCaseTest (_cases [_caseNo]))
				;
				return _class.declare (
					_class.copyInto (
						{
							title:'STATIC METHOD TEST: ' + _methodFullName,
							test:_test
						},
						_testProperties
					)
				);
			};

			_class.staticMethodTests = function (_staticMethodTests) {
				var _test = [];
				for (
					var _staticMethodTestNo = -1, _staticMethodTestsLength = _staticMethodTests.length;
					++_staticMethodTestNo < _staticMethodTestsLength;
				) {
					var _staticMethodTest = _staticMethodTests [_staticMethodTestNo];
					_test.push (
						Uize.isArray (_staticMethodTest)
							? _class.staticMethodTest.apply (this,_staticMethodTest)
							: _staticMethodTest
					);
				}
				return _class.declare ({title:'Static Method Tests',test:_test});
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_isAsync:'isAsync',
				//_breathe:'breathe',
				//_cleanup:'cleanup',
				//_context:'context',
				_duration:'duration',
				_endTime:'endTime',
				_log:'log',
				_reasongForFailure:'reasongForFailure',
				_result:'result',
				_test:'test',
				//_setup:'setup',
				_startTime:'startTime',
				_title:'title'
			});

		return _class;
	}
});

