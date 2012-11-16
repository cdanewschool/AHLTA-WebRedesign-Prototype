/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Drag Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2005-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 6
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Widget.Drag= class implements support for managing drag operations and draggable nodes - slider / scrollbar knobs, resizer drag handles, etc.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Widget.Drag= module defines the =Uize.Widget.Drag= widget class, a subclass of =Uize.Widget=.
*/

Uize.module ({
	name:'Uize.Widget.Drag',
	required:[
		'Uize.Node',
		'Uize.Node.Event',
		'Uize.Fade'
	],
	builder:function  (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_undefined,
				_true = true,
				_false = false,
				_null = null,
				_Uize_Node = Uize.Node,
				_isIe = _Uize_Node.isIe,
				_useFixedPositioningForShield = (
					(!_isIe || navigator.appVersion.indexOf ('MSIE 6') == -1) &&
					navigator.userAgent.indexOf ('Firefox/2') < 0
				)
			;

		/*** Global Variables ***/
			var _dragShield;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					function () {
						var _this = this;

						/*** Public Instance Properties ***/
							_this.eventStartPos = _this._eventStartPos = [0,0];
							_this.eventPos = _this._eventPos = [0,0];
							_this.eventDeltaPos = _this._eventDeltaPos = [0,0];
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._fireDragRestEvent = function () {
				this._dragRestTimeout = null;
				this.fire ('Drag Rest');
			};

			_classPrototype._flushDragRestTimeout = function () {
				this._dragRestTimeout && clearTimeout (this._dragRestTimeout);
				this._dragRestTimeout = null;
			};

			_classPrototype._updateUiCursor = function () {
				var _this = this;
				if (_this.isWired) {
					var _node = _this.getNode ();
					_this._cursor
						? _Uize_Node.setStyle (
							_this._inDrag ? [_node,_dragShield] : _node,
							{cursor:_this.get ('enabledInherited') ? _this._cursor : 'not-allowed'}
						)
						: _this.set ({_cursor:_Uize_Node.getStyle (_node,'cursor')})
					;
				}
			};

		/*** Public Instance Methods ***/
			_classPrototype.mousedown = function (_event) {
				var _this = this;
				if (!_this._inDrag && _this.get ('enabledInherited')) {
					_this.set ({_inDrag:_true});
					_this._updateUiCursor ();
					Uize.Node.Event.abort (_event);
					_this._dragAxisMode = _event.shiftKey ? 'one' : 'both';

					_this.fire ({name:'Before Drag Start',domEvent:_event});

					_this._eventStartPos [0] = _event.clientX;
					_this._eventStartPos [1] = _event.clientY;

					var
						_dragIsDone = _false,
						_oldOnkeyup = document.onkeyup,
						_oldOnmousemove = document.onmousemove,
						_oldOnmouseup = document.onmouseup
					;
					function _dragDone (_event) {
						if (_this._inDrag) {
							_dragIsDone = _true;
							if (_this._dragRestTimeout) {
								_this._flushDragRestTimeout ();
								_this._fireDragRestEvent ();
							}
							_this.set ({_inDrag:_false});
							_this.fire ({name:'Drag Done',domEvent:_event});
							_this.set ({
								_dragCancelled:_false,
								_dragStarted:_false
							});
						}
					}
					function _releaseGripOnDocument (_event) {
						_dragDone (_event);
						document.onmousemove = _oldOnmousemove;
						document.onmouseup = _oldOnmouseup;
						document.onkeyup = _oldOnkeyup;
						_Uize_Node.display (_dragShield,_false);
					}
					function _dragMove (_eventX,_eventY) {
						_this._eventPos [0] = _eventX;
						_this._eventPos [1] = _eventY;
						var
							_eventDeltaPos = [
								_this._eventPos [0] - _this._eventStartPos [0],
								_this._eventPos [1] - _this._eventStartPos [1]
							],
							_absEventDeltaPos = [
								Math.abs (_eventDeltaPos [0]),
								Math.abs (_eventDeltaPos [1])
							]
						;
						function _getEventDeltaPos (_axis) {
							return (
								(
									_this._dragAxisMode == 'both' ||
									_absEventDeltaPos [_axis] > _absEventDeltaPos [1 - _axis] ||
									(_absEventDeltaPos [_axis] == _absEventDeltaPos [1 - _axis] && _axis == 1)
								)
								? _eventDeltaPos [_axis] : 0
							);
						}
						_this._eventDeltaPos [0] = _getEventDeltaPos (0);
						_this._eventDeltaPos [1] = _getEventDeltaPos (1);
						_this.fire ('Drag Update');

						_this._flushDragRestTimeout ();
						_this._dragRestTimeout = setTimeout (function () {_this._fireDragRestEvent ()},_this._dragRestTime);
					}
					document.onmousemove = function (_event) {
						if (!_event) _event = event;
						if (_isIe && _event.button == 0) {
							/* NOTE:
								when the user mouses up outside of the document area, the onmouseup event is not fired, so this is a way to catch the next mouse move inside the document where not mouse button is depressed -- can't do this in Firefox, because Firefox doesn't update the value of the button property for each onmousemove event
							*/
							_this._inDrag && _releaseGripOnDocument (_event);
						} else {
							if (!_dragIsDone) {
								if (!_this._dragStarted) {
									_class.resizeShield (_dragShield);
									_Uize_Node.display (_dragShield);
									_this.set ({_dragStarted:_true});
									_this.fire ({name:'Drag Start',domEvent:_event});
								}
								_dragMove (_event.clientX,_event.clientY);
							}
						}
						return _false;
					};
					document.onmouseup = function (_event) {
						if (!_event) _event = event;
						_releaseGripOnDocument (_event);
						return _false;
					};
					document.onkeyup = function (_event) {
						if (Uize.Node.Event.isKeyEscape (_event) && _this._inDrag) {
							_this.set ({_dragCancelled:_true});
							if (_this._animation) {
								var
									_fade = _this.fade,
									_fadeEventHandlers = {
										'Changed.value':
											function () {
												var _value = _fade.valueOf ();
												_dragMove (_value [0],_value [1]);
											},
										Done:
											function () {
												_fade.unwire (_fadeEventHandlers);
												_dragDone (_event);
											}
									}
								;
								_fade.wire (_fadeEventHandlers);
								_fade.start ({
									startValue:_this._eventPos,
									endValue:_this._eventStartPos
								});
							} else {
								_dragMove (_this._eventStartPos [0],_this._eventStartPos [1]);
								_dragDone (_event);
							}
						}
					};
				}
				return _false;
			};

			_classPrototype.updateUi = function () {
				var _this = this;
				_this.isWired && !_this.get ('enabledInherited') || _this._cursor && _this._updateUiCursor ();
			};

			_classPrototype.wireUi = function () {
				var _this = this;
				if (!_this.isWired) {
					var _rootNode = _this.getNode ();
					if (_rootNode) {
						_rootNode.onmousedown = _Uize_Node.returnFalse;
						_this.wireNode (_rootNode,'mousedown',function (_event) {return _this.mousedown (_event)});
					}
					if (!_dragShield)
						_dragShield = _class.insertShield ({zIndex:50000})
					;
					_this.wire ({'Changed.enabledInherited':function () {_this._updateUiCursor ()}});

					_superclass.prototype.wireUi.call (_this);
				}
			};

		/*** Public Static Methods ***/
			_class.insertShield = function (_extraStyleProperties) {
				var _styleProperties = {
					display:'none',
					position:'absolute'
				};
				if (_isIe)
					_styleProperties.background = 'url(' + _class.getBlankImageUrl () + ')'
					/* NOTE:
						using a transparent image for the background of the drag shield DIV is not necessary in Firefox and slows rendering on drag refreshes
					*/
				;
				var _shield = document.createElement ('div');
				_Uize_Node.setStyle (_shield,_class.copyInto (_styleProperties,_extraStyleProperties));
				_shield.Uize_Widget_Drag_shield = _true;
				document.body.appendChild (_shield);
				_class.resizeShield (_shield);
				return _shield;
			};

			_class.resizeShield = function (_shield) {
				/* TO DO:
					- for browsers that support fixed positioning, updating the position and size only needs to happen once: at the time of initializing the shield. For IE6, we need to watch document scroll and resize. The best way to clean this up and factor it out would be to create a shield widget. Uize.Widget.Drag could share one instance, and instances of Uize.Widget.
				*/
				if (_useFixedPositioningForShield) {
					_Uize_Node.setStyle (
						_shield,
						{
							left:'0',
							top:'0',
							width:'100%',
							height:'100%',
							position:'fixed'
						}
					);
				} else {
					/* NOTE:
						This is a workaround for IE6 (which doesn't support fixed positioning) and should be killed as soon as possible.
					*/
					/*
						TO DO: just the following will work better, if we watch scroll events and reposition each time...

							var _documentElement = document.documentElement;
							_Uize_Node.setStyle (
								_shield,
								{
									left:'0',
									top:'0',
									width:_documentElement.clientWidth + 'px',
									height:_documentElement.clientHeight + 'px'
								}
							);
					*/
					var
						_shieldStyleDisplay = _Uize_Node.getStyle (_shield,'display'),
						_documentElement = document.documentElement,
						_documentBody = document.body
					;
					_Uize_Node.display (_shield,_false);
					_Uize_Node.setStyle (
						_shield,
						{
							left:0,
							top:0,
							width:_documentElement.scrollWidth,
							height:
								Math.max (
									typeof window.innerHeight =='number' ? window.innerHeight : (_documentElement && _documentElement.clientHeight ? _documentElement.clientHeight : (_documentBody && _documentBody.clientHeight ? _documentBody.clientHeight : 0)),
									_documentElement.scrollHeight
								),
							display:_shieldStyleDisplay
						}
					);
				}
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_animation:{
					name:'animation',
					onChange:function () {
						if (this._animation && !this.fade)
							this.fade = new Uize.Fade ({duration:500})
						;
					},
					value:_false
				},
				_cursor:{
					name:'cursor',
					onChange:_classPrototype._updateUiCursor
				},
				_dragCancelled:{
					name:'dragCancelled',
					value:_false
				},
				_dragRestTime:{
					name:'dragRestTime',
					value:250
				},
				_dragStarted:{
					name:'dragStarted',
					value:_false
				},
				_inDrag:{
					name:'inDrag',
					value:_false
				}
			});

		/*** Global Initialization ***/
			!_useFixedPositioningForShield &&
				_superclass.wire ('Window Resized',function () {_class.resizeShield (_dragShield)})
			;

		return _class;
	}
});

