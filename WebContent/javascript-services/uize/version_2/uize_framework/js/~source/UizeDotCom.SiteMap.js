/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.SiteMap
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/*?
	Introduction
		A package that defines a tree data structure for the *uize.com* Web site's site hierarchy.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'UizeDotCom.SiteMap',
	required:'UizeDotCom.ModulesTree',
	builder:function () {
		var _data;
		return function () {
			if (!_data) {
				var _divider = {title:'-'};

				/*** build the modules reference items from the modules tree data ***/
					function _getModuleReferenceUrl (_moduleName) {
						return 'reference/' + _moduleName + '.html';
					}
					function _buildModuleItem (_moduleHost,_moduleSubModuleName,_moduleProfile) {
						var
							_moduleName = _moduleHost + (_moduleHost && '.') + _moduleSubModuleName,
							_moduleLink = _getModuleReferenceUrl (_moduleName),
							_item = {title:_moduleSubModuleName,link:_moduleLink},
							_itemItems = _item.items = []
						;
						if (_moduleProfile)
							for (var _subModule in _moduleProfile)
								_itemItems.push (
									_buildModuleItem (_moduleName,_subModule,_moduleProfile [_subModule])
								)
						;
						_itemItems.length && _moduleName &&
							_itemItems.unshift (
								{title:'[[ BASE ]]',link:_moduleLink},
								_divider
							)
						;
						return _item;
					}
					var _modulesReferenceItem = _buildModuleItem ('','',UizeDotCom.ModulesTree ());
					_modulesReferenceItem.title = 'Module Reference';
					_modulesReferenceItem.link = 'javascript-modules-index.html';


				/*** file size optimization tricks ***/
					function _item (_title,_section,_link) {
						return {
							title:_title,
							link:(_section || '') + (_link || _title.toLowerCase ().replace (/\W/g,'-')) + '.html'
						}
					}
					function _example (_title,_link) {return _item (_title,'examples/',_link)}
					function _explainer (_title,_link) {return _item (_title,'explainers/',_link)}
					function _appendix (_title,_link) {return _item (_title,'appendixes/',_link)}
					function _perfTest (_title,_link) {return _item (_title,'tests/performance/',_link)}
					function _examplesByTheme (_tour) {
						var _tourIndexLink = 'javascript-' + (_tour != 'all' ? (_tour + '-') : '') + 'examples.html';
						return {
							title:Uize.capFirstChar (_tour) + ' examples',
							link:_tourIndexLink,
							items:[
								{
									title:'TOUR ' + _tour.toUpperCase () + ' EXAMPLES',
									link:'javascript-feature-tours.html?tour=' + _tour
								},
								_divider,
								{
									title:'Index of ' + _tour + ' examples',
									link:_tourIndexLink
								}
							]
						}
					}

				_data = [
					_item ('Home','','index'),
					_item ('DOWNLOAD'),
					_explainer ('Getting Started'),
					_item ('Latest News'),
					_divider,
					{
						title:'Examples',
						link:'javascript-examples.html',
						items:[
							_examplesByTheme ('featured'),
							_divider,
							_examplesByTheme ('animation'),
							_examplesByTheme ('color'),
							_examplesByTheme ('drag-and-drop'),
							_examplesByTheme ('form'),
							_examplesByTheme ('menu'),
							_examplesByTheme ('slideshow'),
							_examplesByTheme ('tool'),
							_examplesByTheme ('widget'),
							_examplesByTheme ('zoom'),
							_divider,
							_examplesByTheme ('all'),
							_divider,
							{
								title:'EXAMPLES, BY MODULE...',
								link:'javascript-examples.html',
								items:[
									{
										title:'Uize.Color',
										items:[
											_example ('Sortable Color Table'),
											_example ('Color Sort by RGB Proximity'),
											_example ('Color Gradient Tool')
										]
									},
									{
										title:'Uize.Curve',
										items:[
											_example ('Curve Explorer')
										]
									},
									{
										title:'Uize.Data',
										items:[
											_example ('Simple Data Tester')
										]
									},
									{
										title:'Uize.Doc.Simple',
										items:[
											_example ('SimpleDoc Tester','simple-doc-tester')
										]
									},
									{
										title:'Uize.Json',
										items:[
											_example ('JSON Prettifier')
										]
									},
									{
										title:'Uize.Fade',
										items:[
											_example ('Fade As a Graph'),
											_example ('Fade As a Color Chart'),
											_example ('Fade Quantization Chart'),
											_example ('Fading an Object')
										]
									},
									{
										title:'Uize.Fx',
										items:[
											_example ('Fade CSS Style Across Nodes')
										]
									},
									{
										title:'Uize.Scruncher',
										items:[
											_example ('JavaScript Scruncher')
										]
									},
									{
										title:'Uize.Template',
										items:[
											_example ('JavaScript Template Tester')
										]
									},
									{
										title:'Uize.Templates',
										items:[
											_example ('List Template','templates-list')
										]
									},
									{
										title:'Uize.Widget',
										items:[
											{
												title:'AutoTooltip',
												items:[
													_example ('Auto Tooltip for Photo Info','auto-tooltip-photo-info'),
													_example ('Generic Auto Tooltip','auto-tooltip-generic')
												]
											},
											{
												title:'Bar',
												items:[
													_example ('Bars For Data Comparison','bars'),
													_example ('Basic Progress Bar','progress-bar'),
													{
														title:'Slider',
														items:[
															_example ('Basic Slider','slider'),
															_example ('Multiple Sliders from a Template','sliders-from-template'),
															_example ('The Built-in Slider Skin','slider-built-in-skin'),
															_example ('Slider Plus Buttons','slider-plus'),
															_example ('Sliders as RGB Selectors'),
															_example ('Sliders in a Color Blender','sliders-in-color-blender'),
															_example ('Characters Used Indicator','slider-chars-used')
														]
													}
												]
											},
											{
												title:'Bevel',
												items:[
													_example ('Basic Bevel','bevel'),
													_example ('Bevel On Multiple Images')
												]
											},
											{
												title:'Button',
												items:[
													_example ('Button Types'),
													_example ('Uize.Widget.Button.Toggle','button-toggle')
												]
											},
											_example ('Calculator','javascript-calculator-widget'),
											{
												title:'Calendar',
												items:[
													_example ('Calendar Controls Wikipedia'),
													_example ('Calendar')
												]
											},
											{
												title:'Collection.Dynamic',
												items:[
													_example ('Dynamic Collection','collection-dynamic')
												]
											},
											{
												title:'CollectionItem.Zooming',
												items:[
													_example ('Zooming Collection Items','collection-item-zooming'),
													_example ('Coupled Zooming Collection Items','collection-item-coupled-zooming')
												]
											},
											{
												title:'ColorCube',
												items:[
													_example ('Basic Color Cube','color-cube'),
													_example ('Color Cube With Color Pickers','color-cube-with-pickers')
												]
											},
											{
												title:'ColorPicker',
												items:[
													_example ('Color Picker'),
													_example ('Color Pickers With Gradient')
												]
											},
											{
												title:'Dialog',
												items:[
													_example ('Dialog'),
													_example ('Resizable Dialog','dialog-resizable')
												]
											},
											{
												title:'Drag',
												items:[
													{
														title:'Move',
														items:[
															_example ('Drag-to-move')
														]
													}
												]
											},
											{
												title:'HoverFader',
												items:[
													_example ('Fading Links'),
													_example ('Hover Fader Color Effects'),
													_example ('Hover Fader Stretching Menu'),
													_example ('Hover Fader for Thumbnails'),
													_example ('Hover Fader Text Shadow Animation')
												]
											},
											{
												title:'ImagePort',
												items:[
													_example ('Basic Image Port','image-port'),
													_example ('Image Port Inside a Marquee','image-port-with-marquee'),
													_example ('Draggable Image Port','image-port-drag'),
													_example ('Zoom and Pan','image-port-zoom-and-pan'),
													_example ('Tiled Zoom and Pan','image-port-zoom-and-pan-tiled')
												]
											},
											_example ('ImageWipe','image-wipe'),
											{
												title:'ListEditor',
												items:[
													_example ('Domain List Editor')
												]
											},
											_example ('MagView','mag-view'),
											_example ('Mask'),
											{
												title:'Options',
												items:[
													_example ('Options'),
													_example ('Dynamic Options','options-dynamic'),
													{
														title:'Options.Tabbed',
														items:[
															_example ('Tabbed Interface'),
															_example ('Tabbed Interface With Fade')
														]
													}
												]
											},
											_example ('Picker.Date','date-picker'),
											{
												title:'Population',
												items:[
													_example ('Structured Record Population','population-structured-record'),
													_example ('Populating Photo Details')
												]
											},
											{
												title:'Resizer.Marquee',
												items:[
													_example ('Basic Marquee','marquee'),
													_example ('Different Marquee Modes','marquee-modes'),
													_example ('Marquee and Image Port'),
													_example ('Marquee With Rest Update')
												]
											},
											{
												title:'Scrolly',
												items:[
													_example ('Scrolly'),
													_example ('Scrolly Carousel')
												]
											},
											{
												title:'SlideShow',
												items:[
													_example ('Slideshow'),
													_example ('Slideshow With Dissolve'),
													_example ('Slideshow With Wipes'),
													_example ('Slideshow of Data')
												]
											},
											{
												title:'Swap',
												items:[
													_example ('Image Swap','swap-image'),
													_example ('Deck Swapper','swap-deck'),
													_example ('Cycling Image Swap','swap-image-cycle'),
													_example ('Basic HTML Swap','swap-html'),
													_example ('Image Swap With PNGs','swap-image-png')
												]
											},
											{
												title:'TableSort',
												items:[
													_example ('Basic Table Sort','table-sort-basic'),
													_example ('Complex Table Sort','table-sort-complex')
												]
											},
											_example ('ThumbZoom'),
											{
												title:'Tree',
												items:[
													_example ('Tree List From JSON','tree-list'),
													_example ('Tree Menu From JSON','tree-menu'),
													_example ('Hierarchical Selector'),
													_example ('Two Hierarchical Selectors')
												]
											},
											{
												title:'Widget Functionality',
												items:[
													_example ('enabled/busy in Widget Tree'),
													_example ('Decorated Confirm Dialog','decorated-confirm'),
													_example ('Shared UI'),
													_example ('Transferring State'),
													_example ('The setNodeValue Method','set-node-value'),
													_example ('setNodeValue on Multi-select','set-node-value-multi-select'),
													_example ('Virtual DOM Events'),
													_example ('Edge Virtual DOM Events')
												]
											}
										]
									},
									{
										title:'Sequenced Show Examples',
										items:[
											_example ('Sequenced Show'),
											_example ('Sequenced Show Using Swap')
										]
									}
								]
							}
						]
					},
					{
						title:'Explainers',
						link:'javascript-explainers.html',
						items:[
							_explainer ('Introduction to UIZE'),
							_explainer ('Getting Started With UIZE','getting-started'),
							_explainer ('Using the Documentation'),
							_explainer ('Overview of Features'),
							_explainer ('Building UIZE-powered Pages'),
							{
								title:'MORE TOPICS...',
								items:[
									_explainer ('JavaScript Animation and Effects'),
									_explainer ('JavaScript Inheritance'),
									_explainer ('Set-get Properties'),
									_explainer ('JavaScript Event System'),
									_explainer ('JavaScript DOM Events'),
									_explainer ('JavaScript Localization'),
									_explainer ('JavaScript Modules'),
									_explainer ('JavaScript Libraries'),
									_explainer ('JavaScript Templates'),
									_explainer ('JavaScript Widgets'),
									_explainer ('JavaScript Troubleshooting'),
									_explainer ('JavaScript Build Scripts'),
									_explainer ('All About Scrunching'),
									_explainer ('JavaScript Documentation System'),
									_explainer ('The Philosophy of UIZE','philosophy-of-uize')
								]
							},
							_divider,
							{
								title:'For Framework Developers',
								items:[
									_appendix ('SOTU (State of the UIZE)','sotu')
								]
							},
							_divider,
							_item ('Index of JavaScript Explainers','','javascript-explainers')
						]
					},
					_modulesReferenceItem,
					{
						title:'Tools',
						link:'javascript-tool-examples.html',
						items:[
							_example ('Curve Explorer'),
							_example ('Color Gradient Tool'),
							_example ('JSON Prettifier'),
							_example ('JavaScript Template Tester'),
							_example ('JavaScript Scruncher'),
							_example ('SimpleDoc Tester','simple-doc-tester'),
							_example ('Simple Data Tester'),
							_divider,
							_item ('Index of JavaScript Tools','','javascript-tool-examples')
						]
					},
					{
						title:'Tests',
						items:[
							{
								title:'Performance Tests',
								items:[
									_perfTest ('Array Iteration Styles'),
									_perfTest ('Caching Node References'),
									_perfTest ('Checking if Undefined'),
									_perfTest ('Extended String Class'),
									_perfTest ('getElementById vs getElementsByName','getElementById-vs-getElementsByName'),
									_perfTest ('Repeat String Approaches'),
									_perfTest ('Storing Length for Iterator'),
									_perfTest ('Storing Reference to Sub-object','storing-reference-to-subobject'),
									_perfTest ('String Concatenation Approaches'),
									_perfTest ('String Match Conditional Styles'),
									_perfTest ('String Starts With Substring Styles')
								]
							}
							/*
							,
							{
								title:'Functionality Tests',
								items:[
									_item ('Uize.Data','tests/functionality/','Uize.Data'),
									_item ('Uize.Node.doForAll','tests/functionality/','Uize.Node.doForAll'),
									_item ('Uize.Node.injectHtml','tests/functionality/','Uize.Node.injectHtml'),
									_item ('Uize.Widget.Tree.List','tests/functionality/','Uize.Widget.Tree.List')
								]
							},
							{
								title:'Issue, Browser, Language Tests',
								items:[
									_item ('Multi-line Return Statements','tests/issues/','multiline-return-statements'),
									_item ('Styling AREA Tags','tests/issues/'),
									_item ('Undefined Across Frames','tests/issues/')
								]
							}
							*/
						]
					},
					{
						title:'Appendixes',
						items:[
							_appendix ('Code Fragments'),
							_appendix ('Credits'),
							_item ('Endorsements'),
							_item ('Index of JavaScript Modules','','javascript-modules-index'),
							_appendix ('Glossary'),
							_appendix ('HTML Style Guide'),
							_appendix ('JavaScript Code Conventions'),
							_appendix ('JavaScript Fun'),
							_appendix ('JavaScript Interview Questions'),
							_appendix ('JavaScript Optimization'),
							_appendix ('SOTU (State of the UIZE)','sotu'),
							_item ('License'),
							_appendix ('Press Center')
						]
					},
					_divider,
					_item ('SUPPORT'),
					_item ('SITE MAP','','directory'),
					_item ('SEARCH','','search-sections')
				];
			}
			return _data;
		};
	}
});


