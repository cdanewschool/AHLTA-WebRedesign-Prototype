/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.EggTimer Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2005-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 2
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Widget.EggTimer= class implements a countdown timer widget (or egg timer), where digits flip at intervals using a JavaScript animation effect.

		*DEVELOPERS:* `Jan Borgersen`, original code donated by `Zazzle Inc.`

		The =Uize.Widget.EggTimer= module defines the =Uize.Widget.EggTimer= widget class, a subclass of =Uize.Widget=.
*/

Uize.module ({
	name:'Uize.Widget.EggTimer',
	required:'Uize.Widget.Count',
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var
				_superclass = Uize.Widget,
				_class = _superclass.subclass (
					function () {
						var _this = this;

						/*** Private Instance Properties ***/
							_this._timeout = null;
							_this._running = false;
							_this._callAdvance = function () {_this.advance ()};
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Public Instance Methods ***/
			_classPrototype.advance = function () {
				var _this = this;
				if( _this._running ) {
					_this.children.seconds.down();
					_this._timeout = setTimeout( _this._callAdvance, 1000 );
				}
			};

			_classPrototype.resetTo = function (_timeObject) {
				var _this = this;
				_this._running = false;
				_this.set ({startTime:_timeObject});
				_this._showSeconds && _this.children.seconds.setCount( _timeObject.seconds );
				_this._showMinutes && _this.children.minutes.setCount( _timeObject.minutes );
				_this._showHours && _this.children.hours.setCount( _timeObject.hours );
			};

			_classPrototype.reset = function () {
				this.resetTo(this._startTime);
			};

			_classPrototype.resume = function () {
				var _this = this;
				_this._running = true;
				_this._timeout = setTimeout( _this._callAdvance, 1000 );
			};

			_classPrototype.stop = function () {
				this._running = false;
			};

			_classPrototype.wireUi = function () {
				var _this = this;
				if (!_this.isWired) {
					var _idPrefix = _this.get ('idPrefix');
					function _newCount (_name, _count, _limit) {
						var _countWidget = _this.addChild (
							_name,
							Uize.Widget.Count,
							{
								digits: 2,
								limit: _limit,
								numbersImagesPath:_this._numbersImagesPath,
								numbersFiletype:_this._numbersFiletype
							}
						);
						_countWidget.wireUi();
						_countWidget.setCount( _count );
						return _countWidget;
					}
					function _zero () {
						if( (!_this._showMinutes || (_this._showMinutes && !_this.children.minutes.getCount()))
							&& (!_this._showHours || (_this._showHours && !_this.children.hours.getCount())) ) {
							_this._running = false;
							_this.fire('zero');
						}
					}
					this._showSeconds &&
						_newCount ('seconds',_this._startTime.seconds,59)
							.wire ({
								zero:_zero,
								limit:function () {_this._showMinutes && _this.children.minutes.down ()}
							})
					;
					_this._showMinutes &&
						_newCount ('minutes',_this._startTime.minutes,59)
							.wire ('limit',function () {_this._showHours && _this.children.hours.down ()})
					;
					_this._showHours &&
						_newCount ('hours',_this._startTime.hours,23)
					;

					_superclass.prototype.wireUi.call (_this);
				}
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_startTime:{
					name:'startTime',
					value:{ hours: 0, minutes: 0, seconds: 0 }
				},
				_limit:{
					name:'limit',
					value:{ hours: 0, minutes: 0, seconds: 0 }
				},
				_showHours:{
					name:'showHours',
					value:true
				},
				_showMinutes:{
					name:'showMinutes',
					value:true
				},
				_showSeconds:{
					name:'showSeconds',
					value:true
				},
				_direction:{
					name:'direction',
					value:'down'
				},
				_numbersImagesPath:{
					name:'numbersImagesPath',
					value:''
				},
				_numbersFiletype:{
					name:'numbersFiletype',
					value:'gif'
				}
			});

		return _class;
	}
});

