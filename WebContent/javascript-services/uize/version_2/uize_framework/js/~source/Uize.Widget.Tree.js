/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Tree Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2003-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 5
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Widget.Tree= class is a base class for hierarchical collapsible/expandable tree widgets of many kinds, including lists, drop-down menus, etc.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Widget.Tree= module implements the =Uize.Widget.Tree= class, a subclass of =Uize.Widget=.
*/

Uize.module ({
	name:'Uize.Widget.Tree',
	required:'Uize.Node',
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_undefined,
				_false = false,
				_Uize_Node = Uize.Node
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (),
				_classPrototype = _class.prototype
			;

		/*** Public Static Methods ***/
			_class.itemHasChildren = function (_item) {
				return !!(_item && _item.items && _item.items.length);
			};

			_class.itemIsDivider = function (_item) {
				return !!_item && _item.title == '-' && !_class.itemHasChildren (_item);
			};

		/*** Public Instance-static Methods ***/
			_classPrototype.getTreeFromList = _class.getTreeFromList = function (_node) {
				function _getText (_node) {
					var _text = '';
					if (_node) {
						if (_node.nodeType == 3) _text = _node.data;
						if (_node.childNodes) {
							var _childNodes = _node.childNodes;
							for (var _childNodeNo = -1; ++_childNodeNo < _childNodes.length;) {
								var _childNode = _childNodes [_childNodeNo];
								if (_childNode.tagName == 'UL' || _childNode.tagName == 'OL') {
									break;
								} else {
									_text += _getText (_childNode);
								}
							}
						}
					}
					return _text.replace (/^\s*/,'').replace (/\s*$/,'');
				}
				function _getItemFromListItem (_node) {
					var _item = null;
					if (_node) {
						_item = {
							title:_getText (_node),
							link:'',
							items:[]
						};
						var _childNodes = _node.childNodes;
						for (var _nodeNo = -1; ++_nodeNo < _childNodes.length;) {
							_node = _childNodes [_nodeNo];
							if (_node.tagName == 'UL' || _node.tagName == 'OL') {
								_item.expanded = _node.style.display != 'none';
								var _childNodes = _node.childNodes;
								for (var _childNodeNo = -1; ++_childNodeNo < _childNodes.length;) {
									var _childNode = _childNodes [_childNodeNo];
									_childNode.tagName == 'LI' && _item.items.push (_getItemFromListItem (_childNode));
								}
							} else if (_node.tagName == 'A') {
								_item.link = _node.getAttribute ('href');
								var _description = _node.title;
								if (_description) _item.description = _description;
							}
						}
					}
					return _item;
				}
				var _item = _getItemFromListItem (_Uize_Node.getById (_node));
				return _item ? (/\S/.test (_item.title) ? [_item] : _item.items) : [];
			};

			_classPrototype.getTreeFromPage = _class.getTreeFromPage = function  (_levelClasses,_initialExpandedDepth) {
				var
					_nodes = document.all || document.getElementsByTagName ('*'),
					_nodesLength = _nodes.length,
					_levelClassMap = {},
					_levelClassRegExp,
					_levelClassRegExpChunks = [],
					_tree = {
						title:'Contents',
						link:''
					},
					_currentLevelNo = 0,
					_treeLevels = [_tree],
					_itemSpecifier = [],
					_currentLevel = _tree,
					_linkPrefix = 'Uize_Widget_Tree',
					_anchor,
					_documentUrl = location.href,
					_urlAnchorPos = _documentUrl.lastIndexOf ('#')
				;
				if (_urlAnchorPos > -1) _documentUrl = _documentUrl.slice (0,_urlAnchorPos);
				if (typeof _initialExpandedDepth != 'number') _initialExpandedDepth = 1;
				for (var _levelClassNo = -1; ++_levelClassNo < _levelClasses.length;) {
					var _levelClass = _levelClasses [_levelClassNo];
					_levelClassMap [_levelClass] = _levelClassNo;
					_levelClassRegExpChunks.push ('\\b' + _levelClass + '\\b');
				}
				_levelClassRegExp = new RegExp (_levelClassRegExpChunks.join ('|'));
				for (var _nodeNo = -1; ++_nodeNo < _nodesLength;) {
					var
						_node = _nodes [_nodeNo],
						_nodeClassName = _node.className
					;
					if (_nodeClassName) {
						var _levelClassMatch = _nodeClassName.match (_levelClassRegExp);
						if (_levelClassMatch) {
							var _newLevelNo = _levelClassMap [_levelClassMatch [0]];
							if (_newLevelNo > _currentLevelNo) {
								_treeLevels [_newLevelNo] = _currentLevel.items [_currentLevel.items.length - 1];
								_currentLevelNo = _newLevelNo;
								_currentLevel = _treeLevels [_currentLevelNo];
							} else if (_newLevelNo < _currentLevelNo) {
								_currentLevelNo = _newLevelNo;
								_currentLevel = _treeLevels [_currentLevelNo];
							}
							_itemSpecifier.length = _currentLevelNo;
							if (!_currentLevel.items) {
								_currentLevel.items = [];
								_currentLevel.expanded = _currentLevelNo < _initialExpandedDepth;
							}
							_itemSpecifier.push (_currentLevel.items.length);
							_anchor = _linkPrefix + '_' + _itemSpecifier.join ('_');
							_currentLevel.items.push ({
								title:_Uize_Node.getText (_node),
								link:_documentUrl + '#' + _anchor
							});
							_Uize_Node.injectHtml (_node,'<a name="' + _anchor + '"></a>','outer top');
							/* NOTE: offset to compensate for added anchor node */
								_nodesLength++;
								_nodeNo++;
						}
					}
				}
				return [_tree];
			};

		/*** Private Instance Methods ***/
			_classPrototype._canonicalizeItemSpecifier = function (_itemSpecifier) {
				return (
					typeof _itemSpecifier == 'string'
						? _itemSpecifier
						: this._getItemInfoFromSpecifier (_itemSpecifier)._itemSpecifier
				);
			};

			_classPrototype._getItemInfoFromSpecifier = function (_itemSpecifier) {
				var
					_this = this,
					_item,
					_items = _this._items,
					_canonicalItemSpecifier = [],
					_itemSpecifierWasArray = _class.isArray (_itemSpecifier),
					_itemDelimiter = _this._itemDelimiter,
					_itemSpecifierLevels = _itemSpecifierWasArray ? _itemSpecifier : _itemSpecifier.split (_itemDelimiter),
					_itemSpecifierLevelsLength = _itemSpecifierLevels.length
				;
				for (var _levelNo = -1; ++_levelNo < _itemSpecifierLevelsLength;) {
					var _itemSpecifierForLevel = _itemSpecifierLevels [_levelNo];
					if (_itemSpecifierWasArray && typeof _itemSpecifierForLevel == 'string')
						_itemSpecifierForLevel = _class.findRecordNo (_items,{title:_itemSpecifierForLevel})
					;
					_item = _items [_itemSpecifierForLevel];
					if (_item) {
						_items = _item.items;
						_canonicalItemSpecifier.push (_itemSpecifierForLevel);
					} else {
						break;
					}
				}
				return {
					_item:_item,
					_itemSpecifier:_item ? _canonicalItemSpecifier.join (_itemDelimiter) : ''
				};
			};

		/*** Public Instance Methods ***/
			_classPrototype.getItemFromSpecifier = function (_itemSpecifier) {
				return this._getItemInfoFromSpecifier (_itemSpecifier)._item;
			};

			_classPrototype.setExpandedDepth = function (_expandedDepth,_itemSpecifier) {
				var _this = this;
				_this.traverseTree ({
					itemHandler:
						function (_item,_itemSpecifier,_depth) {
							_this.setItemExpanded (_itemSpecifier,_depth < _expandedDepth);
						},
					itemSpecifier:_itemSpecifier
				});
			};

			_classPrototype.setItemExpanded = function (_itemSpecifier,_expanded) {
				/* NOTE:
					- override the implementation of this method in a subclass
					- fall back to using this implementation in subclass implementation if widget is not yet wired
				*/
				var _item = this.getItemFromSpecifier (_itemSpecifier);
				_item.expanded = typeof _expanded == 'boolean' ? _expanded : _item.expanded === _false;
			};

			_classPrototype.collapseAllBut = function (_expandedItemSpecifier) {
				var
					_this = this,
					_itemDelimiter = _this._itemDelimiter
				;
				_expandedItemSpecifier = _this._canonicalizeItemSpecifier (_expandedItemSpecifier);
				_this.traverseTree ({
					itemHandler:
						function (_item,_itemSpecifier) {
							_this.setItemExpanded (
								_itemSpecifier,
								!(_expandedItemSpecifier + _itemDelimiter).indexOf (_itemSpecifier + _itemDelimiter)
							);
						}
				});
			};

			_classPrototype.traverseTree = function (_params) {
				var
					_this = this,
					_itemSpecifier = _params.itemSpecifier,
					_itemDelimiter = _this._itemDelimiter,
					_doNothing = function () {},
					_itemHandler = _params.itemHandler || _doNothing,
					_beforeSubItemsHandler = _params.beforeSubItemsHandler || _doNothing,
					_afterSubItemsHandler = _params.afterSubItemsHandler || _doNothing
				;
				function _traverseItem (_item,_itemSpecifier,_depth) {
					_itemHandler (_item,_itemSpecifier,_depth);
					var _itemItems = _item.items;
					if (_itemItems && _itemItems.length) {
						_beforeSubItemsHandler (_item,_itemSpecifier,_depth);
						_traverseItems (_itemItems,_itemSpecifier + _itemDelimiter,_depth + 1);
						_afterSubItemsHandler (_item,_itemSpecifier,_depth);
					}
				}
				function _traverseItems (_items,_itemSpecifierPrefix,_depth) {
					for (var _itemNo = -1, _itemsLength = _items.length; ++_itemNo < _itemsLength;)
						_traverseItem (_items [_itemNo],_itemSpecifierPrefix + _itemNo,_depth)
					;
				}
				if (_itemSpecifier) {
					_itemSpecifier = _this._canonicalizeItemSpecifier (_itemSpecifier);
					_traverseItem (_this.getItemFromSpecifier (_itemSpecifier),_itemSpecifier,0);
				} else {
					_traverseItems (_this._items,'',0);
				}
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_itemDelimiter:{
					name:'itemDelimiter',
					value:'x'
				},
				_items:{
					name:'items',
					value:[],
					onChange:function () {
						var _this = this;
						if (_this.isWired) {
							_this.removeUi ();
							_this.insertUi ();
						}
					}
				},
				_value:{
					name:'value',
					value:[]
				}
			});

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				built:_false
			});

		return _class;
	}
});

