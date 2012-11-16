/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Example
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*?
	Introduction
		A subclass of =UizeDotCom.Page= that provides additional functionality specific to example/demo pages.

		*DEVELOPERS:* `Chris van Rensburg`
*/

/*ScruncherSettings Mappings="=e" LineCompacting="TRUE"*/

Uize.module ({
	name:'UizeDotCom.Page.Example',
	required:[
		'Uize.Node',
		'Uize.Url'
	],
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (),
				_classPrototype = _class.prototype
			;

		/*** Public Instance Methods ***/
			_classPrototype.wireUi = function () {
				var _this = this;
				if (!_this.isWired) {
					/*** wire up the viewSource link ***/
						_this.wireNode (
							'viewSource',
							'click',
							function () {
								_this.viewSource (location.href,'SOURCE CODE FOR &gt;&gt; ' + document.title);
							}
							/*?
								Implied Nodes
									viewSource
										A node that is wired up so that clicking on it opens up a popup window with the HTML source code for the example page.
							*/
						);

					/*** wire programmatic links ***/
						_this._evaluator &&
							_this.wireNode (
								Uize.Node.find ({tagName:'A',className:/\blinkedJs\b/}),
								'click',
								function () {_this._evaluator (this.title || this.innerHTML)}
							)
						;

					_superclass.prototype.wireUi.call (_this);

					/*** add tour interface, if necessary ***/
						var _tour = Uize.Url.fromParams (location.href).tour;
						_tour &&
							Uize.module ({
								required:[
									'UizeDotCom.Templates.Tour',
									'Uize.Tooltip',
									'Uize.Url',
									'UizeDotCom.Examples'
								],
								builder:function () {
									/*** inject tour UI ***/
										Uize.Node.injectHtml (
											document.body,
											UizeDotCom.Templates.Tour.process ({tour:_tour,pageUrl:location.href})
										);

									/*** wire up tour page tooltip behavior ***/
										function _getTourExampleByUrl (_url) {
											var _tourExamplesMap = arguments.callee._map;
											if (!_tourExamplesMap) {
												_tourExamplesMap = arguments.callee._map = {};
												for (
													var
														_tourExampleNo = -1,
														_tourExamples = UizeDotCom.Examples (),
														_tourExamplesLength = _tourExamples.length
													;
													++_tourExampleNo < _tourExamplesLength;
												) {
													var _tourExample = _tourExamples [_tourExampleNo];
													_tourExamplesMap [Uize.Url.from (_tourExample.path).fileName] = _tourExample;
												}
											}
											return _tourExamplesMap [Uize.Url.from (_url).fileName];
										}
									
										_this.wireNode (
											Uize.Node.find ({tagName:'a',className:/\b(tourPage|tourButton)\b/}),
											{
												mouseover:function () {
													var _tourExample = _getTourExampleByUrl (this.getAttribute ('href'));

													/*** update nodes to reflect tour page being moused over ***/
														_this.setNodeValue ('tourPageTooltip-title',_tourExample.title);
														_this.setNodeValue ('tourPageTooltip-description',_tourExample.description);
														_this.setNodeValue (
															'tourPageTooltip-keywords',
															_tourExample.keywords || '-- NONE --'
														);

													Uize.Tooltip.showTooltip ('page-tourPageTooltip');
												},
												mouseout:function () {Uize.Tooltip.showTooltip ('page-tourPageTooltip',false)}
											}
										);
								}
							})
						;
				}
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_evaluator:'evaluator'
			});

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				showFooter:false
			});

		return _class;
	}
});

