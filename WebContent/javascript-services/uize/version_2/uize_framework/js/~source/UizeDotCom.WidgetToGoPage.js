/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.WidgetToGoPage
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=d" LineCompacting="TRUE"*/

/*?
	Introduction
		A subclass of =Uize.Widget.Page= that provides functionality that is generally useful to widgets that are intended to be used remotely in an IFRAME.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'UizeDotCom.WidgetToGoPage',
	superclass:'Uize.Widget.Page',
	required:'UizeDotCom.Templates.WidgetToGoTitle',
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
					/*** insert the title HTML ***/
						Uize.Node.injectHtml (
							document.body,
							UizeDotCom.Templates.WidgetToGoTitle.process ({title:document.title})
						);

					/*** add the main child widget ***/
						Uize.module ({
							required:[_this._widgetClass,_this._widgetHtml],
							builder:function () {
								_this.addChild (
									'widget',
									eval (_this._widgetClass),
									{
										built:false,
										html:eval (_this._widgetHtml)
									}
								).insertOrWireUi ();
							}
						});

					/*** wire up the title bar link ***/
						_this.wireNode (
							'title',
							'click',
							function () {
								page.launchPopup ({
									url:'http://www.uize.com',
									width:1010,
									height:690
								});
							}
						);

					_superclass.prototype.wireUi.call (_this);
				}
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_widgetClass:'widgetClass',
				_widgetHtml:'widgetHtml',
				_title:'title'
			});

		return _class;
	}
});

