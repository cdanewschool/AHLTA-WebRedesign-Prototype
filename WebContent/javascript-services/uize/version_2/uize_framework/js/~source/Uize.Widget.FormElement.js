/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.FormElement Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2007-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 7
	codeCompleteness: 80
	testCompleteness: 0
	docCompleteness: 50
*/

/*?
	Introduction
		The =Uize.Widget.FormElement= class serves as a wrapper class in order to provide an interface for any form element (input, select, textarea, etc).

		*DEVELOPERS:* `Tim Carter`, `Chris van Rensburg`, `Ben Ilegbodu`

		The =Uize.Widget.FormElement= module defines the =Uize.Widget.FormElement= widget class, a subclass of =Uize.Widget=.
*/

Uize.module ({
	name:'Uize.Widget.FormElement',
	required:[
		'Uize.Node',
		'Uize.Node.Event'
	],
	builder:function(_superclass){
		/*** Variables for Scruncher Optimization ***/
			var
				_null = null,
				_undefined
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					_null,
					function () {
						var _this = this;

						function _updateUiState () {_this._updateUiState ()}
						_this.wire ({
							'Changed.busyInherited':_updateUiState,
							'Changed.enabledInherited':_updateUiState
						});
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._getInputNode = function() { return this.getNode('input') };

			_classPrototype._updateUiElementName = function() {
				this.setNodeProperties(this._getInputNode(), {name:this._elementName})
			};

			_classPrototype._updateUiState = function () {
				var _this = this;
				if (_this.isWired) {
					var _enabled = _this.get ('enabledInherited') && !_this.get ('busyInherited');
					_this.setNodeProperties (_this._getInputNode(), {readOnly:!_enabled,disabled:!_enabled});
				}
			};

			_classPrototype._updateUiValue = function () {
				var _this = this;
				if (_this.isWired) {
					var
						_inputNode = _this._getInputNode(),
						_valueForNode = _this._value
					;
					_valueForNode + '' != _this.getNodeValue (_inputNode) && _this.setNodeValue (_inputNode, _valueForNode);
				}
			};

		/*** Public Methods ***/
			_classPrototype.blur = function () {
				var _inputNode = this._getInputNode();
				_inputNode && (Uize.Node.isNode(_inputNode) ? _inputNode : _inputNode[0]).blur ();
				/*?
					Instance Methods
						blur
							Blurs the =input= implied node of the instance.

							SYNTAX
							......................
							myFormElement.blur ();
							......................

							NOTES
							- see the companion =focus= instance method
				*/
			};

			_classPrototype.getProperties = function() {
				var
					_this = this,
					_type = _this._type,
					_value = _this._value,
					_properties = {value:_value}
				;

				if (_this.isWired) {
					var _inputNode = _this._getInputNode();

					if (_type == 'select-one') {
						var _selectedIndex = _inputNode.selectedIndex;

						Uize.copyInto(
							_properties,
							{
								selectedIndex:_selectedIndex,
								text:_selectedIndex > -1 ? _inputNode.options[_selectedIndex].text : _null
							}
						);
					}
					else if (_type == 'select-multiple') {
						_properties = [];

						var
							_inputNodeOptions = _inputNode.options,
							_optionNo = 0,
							_optionsLength = _inputNodeOptions.length,
							_option
						;

						for (; _optionNo < _optionsLength; _optionNo++)
							(_option = _inputNodeOptions [_optionNo]).selected &&
								_properties.push ({
									value:_option.value,
									selectedIndex:_option.selectedIndex,
									title:_option.title
								})
						;
					}
				}

				return _properties;
			};

			_classPrototype.focus = function () {
				var _inputNode = this._getInputNode();
				_inputNode && (Uize.Node.isNode(_inputNode) ? _inputNode : _inputNode[0]).focus ();
				/*?
					Instance Methods
						focus
							Focuses the =input= implied node of the instance.

							SYNTAX
							.......................
							myFormElement.focus ();
							.......................

							NOTES
							- see the companion =blur= instance method
				*/
			};

			_classPrototype.updateUi = function () {
				this._updateUiElementName();
				this._updateUiState ();
				this._updateUiValue ();
			};

			_classPrototype.wireUi = function() {
				var _this = this;

				if (!_this.isWired) {
					var _inputNode = _this._getInputNode();

					if (_inputNode) {
						/*** Set up the set-get properties (attributes of the node) ***/
							_this._type = _inputNode.type;  // this property is read-only

							if (_this._elementName == _undefined)
								_this._elementName = _inputNode.name
							;
						function _fire (_event) { _this.fire (_event) }
						function _fireClicked () { _fire ('Clicked') }
						function _fireBlur () { _fire ('Blur') }
						function _fireFocus () { _fire ('Focus') }
						function _fireKeyUp () { _fire ('Key Up') }
						function _setValue () { _this.set ({_value:_this.getNodeValue(_inputNode)}) }

						switch (_this._type) {
							case 'text':
							case 'textarea':
							case 'password':
								_this.wireNode (
									_inputNode,
									{
										change:function () { _setValue() },
										keyup:function (_domEvent) {
											if (Uize.Node.Event.isKeyEnter (_domEvent) && _this._type != 'textarea')
												_fire ({name:'Ok',domEvent:_domEvent});
											else if (Uize.Node.Event.isKeyEscape (_domEvent))
												_fire ({name:'Cancel',domEvent:_domEvent});

											_setValue ();
											_fireKeyUp ();
										},
										blur:function () {
											_setValue ();		// do we need to do this?
											_fireBlur ();
										},
										focus:function () {
											_setValue ();		// do we need to do this?
											_fireFocus ();
										}
									}
								);
								break;

							case 'hidden':
								_this.wireNode (_inputNode,'change',_setValue);
								break;

							case 'radio':	// operates on a group of like-named radio buttons, but one has to have the implied node id
								_this.set ({
									nodeMap:_class.copyInto(
										_this.get('nodeMap') || {},
										{
											input:_inputNode = Uize.Node.find({
												tagName:'INPUT',
												type:'radio',
												name:_inputNode.name
											})
										}
									)
								});

							case 'checkbox':	// radio and checkbox do the same at this point
								_this.wireNode (
									_inputNode,
									{
										blur:_fireBlur,
										click:function () {
											_setValue();
											_fireClicked ();
										},
										change:_setValue,
										focus:_fireFocus
									}
								);
								break;

							case 'select-one':
							case 'select-multiple':
								_this.wireNode (
									_inputNode,
									{
										change:_setValue,
										blur:_fireBlur,
										click:function () {
											_setValue ();
											_fireClicked ();
										},
										keyup:function () {
											_setValue ();
											_fireKeyUp ();
										},
										focus:_fireFocus
									}
								);
								break;
						}

						_this._value == _undefined && _setValue();
					}

					_superclass.prototype.wireUi.call (_this);
				}
			};

		/*** Register Properties ***/
			_class.registerProperties({
				_elementName:'elementName', // read-only
					/*?
						Set-get Properties
							elementName
								The name associated with the input nodes belonging to the form element.

								EXAMPLE
								........................................................
								<input id="myWidget-input" type='button' name='foobar'/>
								........................................................

								For a =Uize.Widget.FormElement= instance with the =idPrefix= of ='myWidget'= and the above HTML for its =input= implied node, the value of the =elementName= set-get property will be ='foobar'=.
					*/
				_type:'type', // read-only
					/*?
						Set-get Properties
							type
								The type associated with the input node belonging to the form element.

								EXAMPLE
								........................................................
								<input id="myWidget-input" type='button' name='foobar'/>
								........................................................

								For a =Uize.Widget.FormElement= instance with the =idPrefix= of ='myWidget'= and the above HTML for its =input= implied node, the value of the =type= set-get property will be ='button'=.
					*/
				_value:{
					name:'value',
					onChange:_classPrototype._updateUiValue,
					value:_null
					/*?
						Set-get Properties
							value
								The value associated with the input node(s) belonging to the form element. The format of the value will differ depending on the type of the form element.

								The following is a list matching form element types with their value formats:

								- text, hidden, password, textarea --> node.value
								- select-one --> {text, index, optionValue}
								- select-multiple --> [{text, index, optionValue}*]
								- radiobutton --> value of the selected radio button
								- checkbox --> {checked, value}
					*/
				}
			});

		return _class;
	}
});
