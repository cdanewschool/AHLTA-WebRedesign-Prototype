/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Collection.Dynamic Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2007-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=d" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 4
	codeCompleteness: 80
	testCompleteness: 0
	docCompleteness: 3
*/

/*?
	Introduction
		The =Uize.Widget.Collection.Dynamic= class extends =Uize.Widget.Collection= by adding dynamic adding, removing, and drag-and-drop re-ordering of items.

		*DEVELOPERS:* `Chris van Rensburg`, `Jan Borgersen`, `Rich Bean`

		The =Uize.Widget.Collection.Dynamic= module defines the =Uize.Widget.Collection.Dynamic= widget class, a subclass of =Uize.Widget.Collection=.
*/

Uize.module ({
	name:'Uize.Widget.Collection.Dynamic',
	required:[
		'Uize.Node',
		'Uize.Widget.Drag',
		'Uize.Tooltip'
	],
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_true = true,
				_false = false,
				_null = null,
				_Uize_Node = Uize.Node,
				_Uize_Tooltip = Uize.Tooltip
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					_null,
					function () {
						var _this = this;

						/*** watch for dragging of items ***/
							var
								_itemInitiatingDrag,
								_itemDisplayOrderNo, // 0 is normal, 1 is reverse
								_itemsDragged,
								_itemsDraggedLength,
								_itemsCoords,
								_itemWidgetOver,
								_itemWidgetOverCoords,
								_insertPointItem,
								_insertPointModeNo, // 0 is before, 1 is after
								_insertPointCoords,
								_lastInsertPointItem,
								_lastInsertPointModeNo,
								_orientationNo,
								_insertionMarkerNode,
								_insertionMarkerDims,
								_axisPosName,
								_axisDimName,
								_drag = _this.addChild ('drag',Uize.Widget.Drag,{node:_null})
							;

							function _setInDrag (_inDrag) {
								var
									_opacity = _inDrag ? .2 : 1,
									_draggingTooltip = _this.getNode ('tooltipDragging')
								;
								for (var _itemDraggedNo = -1; ++_itemDraggedNo < _itemsDraggedLength;)
									_itemsDragged [_itemDraggedNo].setNodeOpacity ('',_opacity)
								;
								_inDrag &&
									_Uize_Node.setInnerHtml (
										_draggingTooltip,
										_this.localize (
											'draggingToReorder' + (_itemsDraggedLength > 1 ? 'Plural' : 'Singular'),
											{totalItems:_itemsDraggedLength}
										)
									)
								;
								_Uize_Tooltip.showTooltip (_draggingTooltip,_inDrag);
							}
							_drag.wire ({
								'Drag Start':
								function () {
									_itemDisplayOrderNo = _this._itemDisplayOrder == 'reverse' ? 1 : 0;

									_itemInitiatingDrag.set ({over:_false});

									/*** determine items being dragged ***/
										var _itemInitiatingDragIsSelected = _itemInitiatingDrag.get ('selected');
										_itemInitiatingDragIsSelected || _this.selectAll (_false);
										_itemsDragged =
											_itemInitiatingDragIsSelected ? _this.getSelected () : [_itemInitiatingDrag]
										;
										_itemsDraggedLength = _itemsDragged.length;

									/*** capture coords for item widgets (for performance during drag) ***/
										_itemsCoords = [];
										_this.forAll (
											function (_itemWidget) {
												_itemsCoords.push (_Uize_Node.getCoords (_itemWidget.getNode ()));
											}
										);

									/*** initialize ***/
										var
											_itemsCoordsLength = _itemsCoords.length,
											_totalItemsMinus1 = _itemsCoordsLength - 1,
											_itemsCoords0 = _itemsCoords [_itemDisplayOrderNo ? _totalItemsMinus1 : 0],
											_itemsCoords1 = _itemsCoords [_itemDisplayOrderNo ? _totalItemsMinus1 - 1 : 1]
										;
										_orientationNo =
											_totalItemsMinus1 && _itemsCoords1.top > _itemsCoords0.bottom
												? 1 /* 1 = items layed out vertically */
												: 0 /* 0 = items layed out horizontally */
										;
										_axisPosName = _orientationNo ? 'top' : 'left';
										_axisDimName = _orientationNo ? 'height' : 'width';
										_insertPointItem = _insertPointModeNo = _insertPointCoords = _lastInsertPointItem = _lastInsertPointModeNo = _null;
										_insertionMarkerNode = _this.getNode ('insertionMarker');
										_insertionMarkerDims = _Uize_Node.getDimensions (_insertionMarkerNode);

										/*** expand drop coordinates for item widgets (performance optimization) ***/
											for (
												var
													_itemWidgetNo = -1,
													_itemWidgetSpacing = _totalItemsMinus1
														?
															_itemsCoords1 [_axisPosName] -
															(_itemsCoords0 [_axisPosName] + _itemsCoords0 [_axisDimName] - 1)
														: 0
													,
													_itemWidgetSpacingDiv2 = _itemWidgetSpacing / 2
												;
												++_itemWidgetNo < _itemsCoordsLength;
											) {
												var _itemWidgetCoords = _itemsCoords [_itemWidgetNo];
												_itemWidgetCoords [_axisPosName] -= _itemWidgetSpacingDiv2;
												_itemWidgetCoords [_axisDimName] += _itemWidgetSpacing;
											}

										_setInDrag (_true);
									},
								'Drag Update':
									function () {
										var
											_documentElement = document.documentElement,
											_dragEventPos = _drag.eventPos,
											_eventAbsPos = _Uize_Node.getEventAbsPos ()
										;
										_eventAbsPos = [_eventAbsPos.left,_eventAbsPos.top];
										function _mouseWithinCoords (_coords) {
											return (
												_coords &&
												_Uize_Node.doRectanglesOverlap (
													_coords.left,_coords.top,_coords.width,_coords.height,
													_eventAbsPos [0],_eventAbsPos [1],1,1
												)
											);
										}
										if (!_mouseWithinCoords (_itemWidgetOverCoords)) {
											_itemWidgetOver = _itemWidgetOverCoords = _null;
											_this.forAll (
												function (_itemWidget,_itemWidgetNo) {
													var _itemWidgetCoords = _itemsCoords [_itemWidgetNo];
													if (_mouseWithinCoords (_itemWidgetCoords)) {
														_itemWidgetOver = _itemWidget;
														_itemWidgetOverCoords = _itemWidgetCoords;
													}
													return !_itemWidgetOver;
												}
											);
										}
										if (!_mouseWithinCoords (_insertPointCoords)) {
											_insertPointItem = _insertPointCoords = _null;
											if (_itemWidgetOver && !_class.isIn (_itemsDragged,_itemWidgetOver)) {
												var
													_axisDim = _itemWidgetOverCoords [_axisDimName],
													_axisDimDiv2 = _axisDim / 2,
													_axisLower = _itemWidgetOverCoords [_axisPosName],
													_axisCenter = _axisLower + _axisDimDiv2
												;
												_insertPointItem = _itemWidgetOver;
												_insertPointModeNo = _eventAbsPos [_orientationNo] < _axisCenter ? 0 : 1;
												_insertPointCoords = _class.clone (_itemWidgetOverCoords);
												_insertPointCoords [_axisPosName] = _insertPointModeNo ? _axisCenter : _axisLower;
												_insertPointCoords [_axisDimName] = _axisDimDiv2;
											}
										}
										if (
											_insertPointItem != _lastInsertPointItem ||
											_insertPointModeNo != _lastInsertPointModeNo
										) {
											_this.displayNode (_insertionMarkerNode,!!_insertPointItem);
											if (_insertPointItem) {
												var _insertionMarkerCoords = _class.clone (_insertPointCoords);
												_insertionMarkerCoords [_axisPosName] +=
													(_insertPointModeNo ? _insertPointCoords [_axisDimName] : 0)
													- _insertionMarkerDims [_axisDimName] / 2
												;
												delete _insertionMarkerCoords [_axisDimName];
												_Uize_Node.setCoords (_insertionMarkerNode,_insertionMarkerCoords);
											}
											_lastInsertPointItem = _insertPointItem;
											_lastInsertPointModeNo = _insertPointModeNo;
										}
										_drag.set ({cursor:_insertPointItem || _itemWidgetOver ? 'move' : 'not-allowed'});
									},
								'Drag Done':
									function (_event) {
										if (_drag.get ('dragStarted')) {
											_setInDrag (_false);
											_this.displayNode ('insertionMarker',_false);

											function _finishDrag () {
												if (_insertPointItem && !_drag.get ('dragCancelled')) {
													var _itemWidgets = _this.itemWidgets;

													/*** handle the 'after' insert mode ***/
														if (_insertPointModeNo ^ _itemDisplayOrderNo) {
															var
																_itemWidgetsLength = _itemWidgets.length,
																_insertionIndex = _class.indexIn (_itemWidgets,_insertPointItem) + 1
															;
															_insertPointItem = _null;
															while (_insertionIndex < _itemWidgetsLength) {
																var _itemWidget = _itemWidgets [_insertionIndex];
																if (!_class.isIn (_itemsDragged,_itemWidget)) {
																	_insertPointItem = _itemWidget;
																	break;
																} else {
																	_insertionIndex++;
																}
															}
														}

													/*** perform the move ***/
														for (var _itemDraggedNo = -1; ++_itemDraggedNo < _itemsDraggedLength;)
															_this.move (_itemsDragged [_itemDraggedNo],_insertPointItem)
														;

													/*** fire events informing of move ***/
														_this.fire ('Items Reordered');
														_this._fireItemsChangedEvent ();
												}
											}
											_this._confirmToDrag
												? _this.confirm ({
													state:'warning',
													title:_this.localize ('confirmDragToReorderTitle'),
													message:_this.localize ('confirmDragToReorderPrompt'),
													yesHandler:function () {
														_this._confirmToDrag = _false;
														_this.fire ('Drag Confirmed');
														_finishDrag ();
													},
													noHandler:function () {
														_drag.set ({dragCancelled:true});
													}
												})
												: _finishDrag ()
											;
										}
									}
							});

							/*** hand the mousedown DOM event to the drag widget and let it do the rest ***/
								_this.wire (
									'Item Mouse Down',
									function (_event) {
										if (_this._dragToReorder) {
											_itemInitiatingDrag = _event.source;
											_drag.mousedown (_event.domEvent);
										}
										_event.bubble = _false;
									}
								);
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._addItem = function (_widgetProperties) {
				var
					_this = this,
					_propertiesProperty = _widgetProperties.properties,
					_itemWidgetName = _this.makeItemWidgetName (_propertiesProperty),
					_itemTemplateNode = _this.getNode ('itemTemplate')
				;
				if (_itemTemplateNode)
					_widgetProperties.html = _itemTemplateNode.innerHTML.replace (/ITEMWIDGETNAME/g,_itemWidgetName)
				;
				_widgetProperties.built = _false;
				_widgetProperties.container = _this.getNode ('items');
				_widgetProperties.insertionMode = _this._itemDisplayOrder == 'reverse' ? 'inner top' : 'inner bottom';
				_this.get ('items').push (_propertiesProperty);
				return _this.addItemWidget (_itemWidgetName,_widgetProperties);
			};

			_classPrototype._fireItemsChangedEvent = function () {this.fire ('Items Changed')};

			_classPrototype._removeItemUiAndWidget = function (_itemWidget) {
				_itemWidget.removeUi ();
				_itemWidget.kill ();
				this.removeChild (_itemWidget);
			};

			_classPrototype._removeAllItemsUiAndWidget = function () {
				var _this = this;
				_this.forAll (function (_itemWidget) {_this._removeItemUiAndWidget (_itemWidget)});
			};

		/*** Public Instance Methods ***/
			var _selectedProperty = {selected:_true};
			_classPrototype.add = function (_itemsToAdd) {
				var
					_this = this,
					_itemWidgetsAdded = []
				;
				if (_this.isWired) {
					if (!_class.isArray (_itemsToAdd)) _itemsToAdd = [_itemsToAdd];
					var _itemsToAddLength = _itemsToAdd.length;
					if (_itemsToAddLength) {
						_this._makeNewlyAddedSelected && _this.selectAll (_false);
						var _commonProperties = _this._makeNewlyAddedSelected ? _selectedProperty : _null;
						for (var _itemToAddNo = -1; ++_itemToAddNo < _itemsToAddLength;)
							_itemWidgetsAdded.push (
								_this._addItem (_class.copyInto (_itemsToAdd [_itemToAddNo],_commonProperties))
							)
						;
					}
					_this._fireItemsChangedEvent ();
				}
				return _itemWidgetsAdded;
			};

			_classPrototype.getItemWidgetProperties = function () {
				var _this = this;
				return (
					_class.copyInto (
						{
							previewTooltip:
								function () {return _this._dragToReorder ? _this.getNode ('tooltipDragToReorder') : _null}
						},
						_this.get ('itemWidgetProperties')
					)
				);
			};

			_classPrototype.finishRemove = function (_itemWidgetsToRemove, _byUser) {
				var
					_this = this,
					_items = _this.get ('items'),
					_itemWidgets = _this.itemWidgets,
					_itemWidgetsLength = _itemWidgets.length,
					_itemWidgetsRemoved = _itemWidgetsToRemove,
					_itemWidgetsRemovedLength = _itemWidgetsToRemove.length
				;
				if (_itemWidgetsRemovedLength == _itemWidgetsLength) {
					_this._removeAllItemsUiAndWidget ();
				} else {
					/*** find the items(s) in the array and remove ***/
						_itemWidgetsRemoved = [];
						_itemWidgetsRemovedLength = 0;
						var _itemToMakeActive = _null;
						_this.forAll (
							function (_itemWidget,_itemWidgetNo) {
								if (_class.isIn (_itemWidgetsToRemove,_itemWidget)) {
									_itemToMakeActive = _null;
									_itemWidgetsRemoved.push (_itemWidget);
									_itemWidgetsRemovedLength++;
									_this._removeItemUiAndWidget (_itemWidget,_itemWidgetNo);
								} else {
									if (!_itemToMakeActive && !_itemWidget.get ('locked'))
										_itemToMakeActive = _itemWidget
									;
									if (_itemWidgetsRemovedLength) {
										_items [_itemWidgetNo - _itemWidgetsRemovedLength] = _items [_itemWidgetNo];
										_itemWidgets [_itemWidgetNo - _itemWidgetsRemovedLength] = _itemWidget;
									}
								}
							}
						);
				}
				if (_itemWidgetsRemovedLength) {
					_items.length = _itemWidgets.length = _itemWidgetsLength - _itemWidgetsRemovedLength;
					_this.fire ({
						name:'Items Removed',
						byUser:_byUser,
						totalBeforeRemove:_itemWidgetsLength,
						itemWidgetsRemoved:_itemWidgetsRemoved,
						totalRemoved:_itemWidgetsRemovedLength,
						percentRemoved:_itemWidgetsRemovedLength / _itemWidgetsLength * 100
					});
					_this._fireItemsChangedEvent ();
				}
			};

			_classPrototype.move = function (_itemWidgetToMove, _insertionPointItem) {
				var
					_this = this,
					_insertAfter = _this._itemDisplayOrder == 'reverse',
					_insertionPointNode = _insertionPointItem ? _insertionPointItem.getNode () : _null,
					_items = _this.get ('items'),
					_itemWidgets = _this.itemWidgets,
					_rootNode = _this.getNode ('items'),
					_node = _itemWidgetToMove.getNode (),
					_nodeToInsertBefore = _insertAfter
						? (_insertionPointNode ? _insertionPointNode.nextSibling : _rootNode.childNodes[0])
						: _insertionPointNode
				;
				// reorder the DOM element
				_nodeToInsertBefore ? _rootNode.insertBefore (_node, _nodeToInsertBefore) : _rootNode.appendChild(_node);

				/*** reorder itemWidget in the itemWidgets, and item in items ***/
					/*** splice out item being dragged ***/
						var
							_spliceOutPos = _class.indexIn (_itemWidgets,_itemWidgetToMove),
							_item = _items [_spliceOutPos]
						;
						_itemWidgets.splice (_spliceOutPos,1);
						_items.splice (_spliceOutPos,1);

					/*** splice item into new position ***/
						var _spliceInPos = _insertionPointItem
							? _class.indexIn (_itemWidgets,_insertionPointItem)
							: _itemWidgets.length - (_insertAfter ? 0 : 1)
						;
						_itemWidgets.splice (_spliceInPos,0,_itemWidgetToMove);
						_items.splice (_spliceInPos,0,_item);
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_dragToReorder:{
					name:'dragToReorder',
					value:_false
				},
				_confirmToDrag:{
					name:'confirmToDrag',
					value:_false
				},
				_itemDisplayOrder:{
					name:'itemDisplayOrder',
					value:'normal' // normal | reverse
				},
				_makeNewlyAddedSelected:{
					name:'makeNewlyAddedSelected',
					value:_true
				}
			});

		return _class;
	}
});

