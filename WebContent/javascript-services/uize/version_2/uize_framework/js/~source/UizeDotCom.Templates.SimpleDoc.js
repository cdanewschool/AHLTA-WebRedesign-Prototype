/*
	This is an automatically generated module, compiled from the JavaScript template file:
		UizeDotCom.Templates.SimpleDoc.js.jst
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

Uize.module ({
	name:'UizeDotCom.Templates.SimpleDoc',
	builder:function () {
		var _package = function () {};

		/*** Public Static Methods ***/
			_package.process = function (input) {
				var output = [];
				output.push ('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r\n<html xmlns="http://www.w3.org/1999/xhtml">\r\n<head>\r\n	<title>UIZE JavaScript Framework: Reference - ',input .title,'</title>\r\n	<meta name="keywords" content=""/>\r\n	<meta name="description" content=""/>\r\n	<link rel="stylesheet" href="../css/page.css"/>\r\n	<link rel="stylesheet" href="../css/page.simpledoc.css"/>\r\n</head>\r\n\r\n<body>\r\n\r\n<script type="text/javascript" src="../js/Uize.js"></script>\r\n\r\n<h1 class="document-title">\r\n	<a id="page-homeLink" href="../index.html" title="UIZE JavaScript Framework home"></a>\r\n	',input .title,'<a id="page-viewSource" href="javascript://" class="buttonLink">VIEW MODULE SOURCE</a>\r\n</h1>\r\n\r\n',input .body,'\r\n\r\n<script type="text/javascript">\r\n\r\nUize.module ({\r\n	required:\'UizeDotCom.Page.Doc.Module\',\r\n	builder:function () {(window.page = new UizeDotCom.Page.Doc.Module).wireUi ()}\r\n});\r\n\r\n</script>\r\n\r\n</body></html>\r\n');
				return output.join ('');
			};

		/*** Public Static Properties ***/
			_package.input = {};

		return _package;
	}
});

