/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Doc.Sucker.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Doc.Sucker',required:['Uize.Scruncher','Uize.String.Lines','Uize.Data.Simple','Uize.Doc.Simple'],builder:function(){var _a=function(){};var _b=/^\/\*\?/;_a.suckDoc=function(_c){var _d=[];for(var _e= -1,_f,_g=Uize.Scruncher.scrunch(_c).comments,_h=_g.length;++_e<_h;){_b.test(_f=_g[_e])&&_d.push(Uize.String.Lines.normalizeIndent(_f.replace(_b,'').replace(/\*\/$/,'')));}return _d.join('\n');};_a.toDocument=function(_c,_i){return(Uize.Doc.Simple.build(Uize.copyInto({data:_a.suckDoc(_c),sectionsToSort:['Instance Methods','Static Methods','Parameters','Instance Properties','Static Properties','Set-get Properties','Instance Events','Static Events','Child Widgets','Implied Nodes','Deprecated Features']},_i)));};return _a;}});