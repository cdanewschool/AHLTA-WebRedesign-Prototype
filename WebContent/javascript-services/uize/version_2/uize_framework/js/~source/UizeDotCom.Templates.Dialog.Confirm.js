/*
	This is an automatically generated module, compiled from the JavaScript template file:
		UizeDotCom.Templates.Dialog.Confirm.js.jst
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

Uize.module ({
	name:'UizeDotCom.Templates.Dialog.Confirm',
	required:[
		'UizeDotCom.Templates.Dialog'
	],
	builder:function () {
		var _package = function () {};

		/*** Public Static Methods ***/
			_package.process = function (input) {
				var output = [];
				function dialogContents () {var output = [];
				output.push ('\r\n			<table>\r\n				<tr>\r\n					<td><div class="dialogIcon dialogConfirmIcon" id="',input. idPrefix,'-icon">&nbsp;</div></td>\r\n					<td><div id="',input. idPrefix,'-message" class="dialogMessage">',input .message || '','</div></td>\r\n				</tr>\r\n			</table>');
				return output.join ('');}
				output.push ('\r\n',UizeDotCom.Templates.Dialog.process ({idPrefix:input.idPrefix,title:input.title,contents:dialogContents ()}),'\r\n');
				return output.join ('');
			};

		/*** Public Static Properties ***/
			_package.input = {
				idPrefix:'string',
				message:'string',
				title:'string'
			};

		return _package;
	}
});

