/*
	This is an automatically generated module, compiled from the JavaScript template file:
		UizeDotCom.Templates.WidgetToGoTitle.js.jst
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

Uize.module ({
	name:'UizeDotCom.Templates.WidgetToGoTitle',
	builder:function () {
		var _package = function () {};

		/*** Public Static Methods ***/
			_package.process = function (input) {
				var output = [];
				output.push ('\r\n<div class="widgetHeader">\r\n	<div id="page-title" class="widgetTitle">\r\n		<div class="logo"></div>\r\n		<div class="textShadow">',input .title,'</div>\r\n		<div class="textHighlight">',input .title,'</div>\r\n		<div class="textMain">',input .title,'</div>\r\n	</div>\r\n</div>\r\n\r\n');
				return output.join ('');
			};

		/*** Public Static Properties ***/
			_package.input = {
				title:'string'
			};

		return _package;
	}
});

