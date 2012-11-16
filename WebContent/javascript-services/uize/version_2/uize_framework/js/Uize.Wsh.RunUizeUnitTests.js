/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Wsh.RunUizeUnitTests.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Wsh.RunUizeUnitTests',required:'Uize.Test.UnitTests',builder:function(){var _a=new Uize.Test.UnitTests;_a.wire('Done',function(){alert(_a.get('result')?'PASSED':'FAILED')});_a.run();}});