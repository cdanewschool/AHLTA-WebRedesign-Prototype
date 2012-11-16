/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Dialog.Picker.Date
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=e" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 4
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 80
*/

/*?
	Introduction
		The =Uize.Widget.Dialog.Picker.Date= widget lets the user select a date from a modal dialog containing a calendar widget, with support for valid date ranges.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Widget.Dialog.Picker.Date= module defines the =Uize.Widget.Dialog.Picker.Date= widget class, a subclass of =Uize.Widget.Dialog=.

		### In a Nutshell
			- intended to be used by =Uize.Widget.Picker.Date= class, but can be used on its own...
				- provide example
			- uses an instance of the =Uize.Widget.Calendar= class in its implementation to let users pick a date
*/

Uize.module ({
	name:'Uize.Widget.Dialog.Picker.Date',
	required:'Uize.Widget.Calendar',
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var _class = _superclass.subclass ();

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				valueWidgetClass:Uize.Widget.Calendar,
				pipedProperties:[
					'maxValue',
						/*?
							Set-get Properties
								minValue
									document...
	
									NOTES
									- see the companion =maxValue= set-get property
									- this value of this property is piped through to the =maxValue= set-get property of the =Uize.Widget.Calendar= value widget
									- the initial value is =undefined=
						*/
					'minValue'
						/*?
							Set-get Properties
								maxValue
									document...
	
									NOTES
									- see the companion =minValue= set-get property
									- this value of this property is piped through to the =minValue= set-get property of the =Uize.Widget.Calendar= value widget
									- the initial value is =undefined=
						*/
				]
			});

		return _class;
	}
});

