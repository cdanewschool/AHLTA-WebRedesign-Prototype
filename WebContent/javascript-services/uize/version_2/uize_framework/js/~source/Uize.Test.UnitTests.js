/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.UnitTests Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Test
	importance: 5
	codeCompleteness: 5
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.UnitTests= class...

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test.UnitTests= module defines the =Uize.Test.UnitTests= class, a subclass of the =Uize.Test= class.
*/

Uize.module ({
	name:'Uize.Test.UnitTests',
	required:[
		'Uize.Test',
		'Uize.Test.Uize',
		'Uize.Test.Uize.Data',
		'Uize.Test.Uize.Data.Csv',
		'Uize.Test.Uize.Doc',
		'Uize.Test.Uize.String',
		'Uize.Test.Uize.String.Builder',
		'Uize.Test.Uize.String.Lines',
		'Uize.Test.Uize.Templates',
		'Uize.Test.Uize.Url',
		'Uize.Test.Uize.Util',
		'Uize.Test.Uize.Xml'
	],
	builder:function () {
		return Uize.Test.declare ({
			title:'UIZE JavaScript Framework Unit Tests',
			test:[
				Uize.Test.Uize,
				Uize.Test.Uize.Data,
				Uize.Test.Uize.Data.Csv,
				Uize.Test.Uize.Doc,
				Uize.Test.Uize.String,
				Uize.Test.Uize.String.Builder,
				Uize.Test.Uize.String.Lines,
				Uize.Test.Uize.Templates,
				Uize.Test.Uize.Url,
				Uize.Test.Uize.Util,
				Uize.Test.Uize.Xml
			]
		});
	}
});

