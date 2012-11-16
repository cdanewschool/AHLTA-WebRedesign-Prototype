/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Wsh.RunUizeUnitTests Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 2
	codeCompleteness: 20
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Wsh.RunUizeUnitTests= package simply loads and runs the unit tests for the UIZE JavaScript Framework.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Wsh.RunUizeUnitTests= module is a package under the =Uize.Wsh= namespace, designed specifically to run in the context of Windows Script Host.
*/

Uize.module ({
	name:'Uize.Wsh.RunUizeUnitTests',
	required:'Uize.Test.UnitTests',
	builder:function () {
		var _unitTests = new Uize.Test.UnitTests;
		_unitTests.wire ('Done',function () {alert (_unitTests.get ('result') ? 'PASSED' : 'FAILED')});
		_unitTests.run ();
	}
});

