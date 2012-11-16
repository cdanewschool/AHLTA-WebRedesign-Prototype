/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Subclass Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2005-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=b" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 2
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 30
*/

/*?
	Introduction
		The =Uize.Subclass= class provides an example for how to create =Uize= subclasses, and that can be used as a template when creating new =Uize= subclasses.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Subclass= module defines the =Uize.Subclass= class, a subclass of the =Uize=.
*/

Uize.module ({
	name:'Uize.Subclass',
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					null, // typically don't need to do anything in the alphastructor
					function (_properties) {
						var _this = this;

						/*** Private Instance Properties ***/
							_this._privateInstanceProperty = 0;
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._privateInstanceMethod = function () {
				var _this = this;
				// implementation for this method
			};

		/*** Public Instance Methods ***/
			_classPrototype.publicInstanceMethod = function () {
				var _this = this;
				// implementation for this method
			};

		/*** Private Static-instance Methods ***/
			_class._privateStaticInstanceMethod = _classPrototype._privateStaticInstanceMethod = function () {
				// implementation for this method
			};

		/*** Public Static-instance Methods ***/
			_class.publicStaticInstanceMethod = _classPrototype.publicStaticInstanceMethod = function () {
				// implementation for this method
			};

		/*** Public Static Methods ***/
			_class.publicStaticMethod = function () {
				// implementation for this method
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_property1:'property1', // this is the minimalistic approach to registering a property
				_property2:{
					name:'property2',
					onChange:function () {
						// do something when the value of this property changes
					},
					value:0
				}
			});

		return _class;
	}
});

