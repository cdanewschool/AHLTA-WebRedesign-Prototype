/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Templates.HashTable.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Templates.HashTable',builder:function(){var _a=function(){};_a.process=function(input){var output=[];output.push('<table cellspacing="1" style="width:100%; background:#666;">');var propertiesToIgnore={idPrefix:1,pathToResources:1,blankGif:1};for(var inputParamName in input){if(!propertiesToIgnore[inputParamName]){output.push('\r\n	<tr valign="top"><td style="text-align:right; font-size:10px; text-transform:uppercase; padding-right:3px; color:#000; background:#ccc;">',inputParamName,'</td><td style="text-align:left; font-size:10px; padding-left:3px; color:#fff; background:#000;">',input[inputParamName],'</td></tr>');}}output.push('\r\n</table>\r\n\r\n');return output.join('');};_a.input={};return _a;}});