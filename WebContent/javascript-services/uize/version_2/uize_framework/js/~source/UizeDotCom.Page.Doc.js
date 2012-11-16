/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Doc
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=e" LineCompacting="TRUE"*/

/*?
	Introduction
		A subclass of =UizeDotCom.Page= that provides additional functionality specific to pages that contain documentation.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'UizeDotCom.Page.Doc',
	required:[
		'Uize.Widget.Tree.List',
		'Uize.Node'
	],
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					null,
					function () {
						var _this = this;

						/*** add the contents tree widget ***/
							_this.addChild (
								'contents',
								Uize.Widget.Tree.List,
								{
									levelClasses:['contents-tree-level1','contents-tree-level2','contents-tree-level3','contents-tree-level4'],
									iconTheme:'arrows-orange',
									iconBgColor:'',
									tooltip:'contentsTooltip',
									built:false
								}
								/*?
									Child Widgets
										contents
											An instance of =Uize.Widget.Tree.List= that is used to provide an expandable/collapsible contents tree at the top of the document.
								*/
							);
					}
				),
				_classPrototype = _class.prototype
			;

			/*** Public Instance Methods ***/
				_classPrototype.wireUi = function () {
					var _this = this;
					if (!_this.isWired) {
						/*** populate contents tree's data ***/
							var
								_contents = _this.children.contents,
								_contentsTreeItems = Uize.Widget.Tree.List.getTreeFromList (_contents.getNode ())
							;
							_this.set ({contentsTreeItems:_contentsTreeItems});
							_contents.set ({items:_contentsTreeItems});
							_contents.setExpandedDepth (1);

						/*** insert tooltip div for contents tree ***/
							Uize.Node.injectHtml (document.body,'<div id="contentsTooltip" class="contents-tooltip"></div>');

						/*** wire up page actions ***/
							var _pageTitle = document.title.match (/^\s*(.*?)\s*\|/) [1];

							/*** search link ***/
								_this.wireNode (
									'search',
									'click',
									function () {
										location.href = _this.getPathToRoot () + 'search-sections.html?' + _pageTitle;
									}
								);

							/*** examples link ***/
								_this.wireNode (
									'examples',
									'click',
									function () {_this.performSearch ('"' + _pageTitle + '"','/examples')}
								);

						/*** wire up behavior for scrolling to anchors ***/
							/* TO DO: animated scrolling behavior
								- what to wire the event on (document.body or document.documentElement?)
								- how to cancel the event
								- how to know that the thing being clicked is a link that is an anchor link
								- calculate the position of the anchor
								- scroll the document to the positio
								- set the document location to the anchor
								- have a timeout that watches on changes in the href
									- if the anchor changes, scroll the position to the current anchor minus clearance amount

								issues
									- IE7 has a stupid issue where the getAttribute DOM method doesn't return the value from the document, but returns a resolved value, and for href for anchor links this contains the entire URL path, not just the anchor part
							*/
							var _titleBar = Uize.Node.find ({tagName:'h1',className:'document-title'}) [0];
							Uize.Node.getStyle (_titleBar,'position') == 'fixed' &&
								_this.wireNode (
									document.body,
									'click',
									function (_event) {
										var _target = _event.target || _event.srcElement;
										function _urlSansAnchor (_url) {
											var _anchorPos = _url.indexOf ('#');
											return _anchorPos > -1 ? _url.slice (0,_anchorPos) : _url;
										}
										if (_target.tagName == 'A') {
											var _href = _target.getAttribute ('href');
											if (
												_href.charCodeAt (0) == 35 ||
												(
													_href.indexOf ('#') > -1 &&
													_urlSansAnchor (_href) == _urlSansAnchor (location.href)
												)
											) {
												setTimeout (
													function () {
														(Uize.Node.isSafari ? document.body : document.documentElement).scrollTop
															-= 48
														;
													},
													100
												);
											}
										}
									}
								)
							;

						_superclass.prototype.wireUi.call (_this);

						_contents.setNodeStyle ('',{maxHeight:'none',overflow:'visible'});
					}
				};

		return _class;
	}
});

