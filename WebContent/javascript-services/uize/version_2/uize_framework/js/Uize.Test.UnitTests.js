/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-25

	http://www.uize.com/reference/Uize.Test.UnitTests.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Test.UnitTests',required:['Uize.Test','Uize.Test.Uize','Uize.Test.Uize.Data','Uize.Test.Uize.Data.Csv','Uize.Test.Uize.Doc','Uize.Test.Uize.String','Uize.Test.Uize.String.Builder','Uize.Test.Uize.String.Lines','Uize.Test.Uize.Templates','Uize.Test.Uize.Url','Uize.Test.Uize.Util','Uize.Test.Uize.Xml'],builder:function(){return Uize.Test.declare({title:'UIZE JavaScript Framework Unit Tests',test:[Uize.Test.Uize,Uize.Test.Uize.Data,Uize.Test.Uize.Data.Csv,Uize.Test.Uize.Doc,Uize.Test.Uize.String,Uize.Test.Uize.String.Builder,Uize.Test.Uize.String.Lines,Uize.Test.Uize.Templates,Uize.Test.Uize.Url,Uize.Test.Uize.Util,Uize.Test.Uize.Xml]});}});