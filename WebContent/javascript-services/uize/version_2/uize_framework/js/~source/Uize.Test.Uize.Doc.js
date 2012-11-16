/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Doc Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Test
	importance: 1
	codeCompleteness: 100
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Doc= module defines a simple unit test for the =Uize.Doc= namespace module.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test.Uize.Doc= module defines the =Uize.Test.Uize.Doc= class, a subclass of the =Uize.Test= class.
*/

Uize.module ({
	name:'Uize.Test.Uize.Doc',
	builder:function () {
		return Uize.Test.declare ({
			name:'Test for Uize.Doc Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Doc')
			]
		});
	}
});

