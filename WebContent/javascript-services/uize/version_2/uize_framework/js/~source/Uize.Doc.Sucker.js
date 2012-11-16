/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Doc.Sucker Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2006-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 85
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Doc.Sucker= package provides methods for extracting SimpleDoc documentation from special documentation comments inside JavaScript source code.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Doc.Sucker= module is a package under the =Uize= namespace.
*/

Uize.module({
	name:'Uize.Doc.Sucker',
	required:[
		'Uize.Scruncher',
		'Uize.String.Lines',
		'Uize.Data.Simple',
		'Uize.Doc.Simple'
	],
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var _package = function () {};

		/*** Global Variables ***/
			var _docCommentRegExp = /^\/\*\?/;

		/*** Public Static Methods ***/
			_package.suckDoc = function (_javascriptSource) {
				var _simpleDocChunks = [];
				for (
					var
						_commentNo = -1,
						_comment,
						_comments = Uize.Scruncher.scrunch (_javascriptSource).comments,
						_commentsLength = _comments.length
					;
					++_commentNo < _commentsLength;
				) {
					_docCommentRegExp.test (_comment = _comments [_commentNo]) &&
						_simpleDocChunks.push (
							Uize.String.Lines.normalizeIndent (_comment.replace (_docCommentRegExp,'').replace (/\*\/$/,''))
						)
					;
				}
				return _simpleDocChunks.join ('\n');
			};

			_package.toDocument = function (_javascriptSource,_simpleDocParams) {
				return (
					Uize.Doc.Simple.build (
						Uize.copyInto (
							{
								data:_package.suckDoc (_javascriptSource),
								sectionsToSort:[
									/*** methods ***/
										'Instance Methods',
										'Static Methods',
										'Parameters',
									/*** properties ***/
										'Instance Properties',
										'Static Properties',
										'Set-get Properties',
									/*** events ***/
										'Instance Events',
										'Static Events',
									/*** widgets & nodes ***/
										'Child Widgets',
										'Implied Nodes',
									/*** misc ***/
										'Deprecated Features'
								]
							},
							_simpleDocParams
						)
					)
				);
			};

		return _package;
	}
});

