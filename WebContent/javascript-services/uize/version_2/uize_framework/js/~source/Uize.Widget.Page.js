/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Page Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 7
	codeCompleteness: 90
	testCompleteness: 0
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widget.Page= class implements the page widget (the main controller for a page), supporting widget adoption, dialog sharing, popups, and more.

		*DEVELOPERS:* `Chris van Rensburg`, `Ben Ilegbodu`

		The =Uize.Widget.Page= module defines the =Uize.Widget.Page= widget class, a subclass of =Uize.Widget=. The page widget provides an environment and services that can be relied upon by child widgets in its tree. Use this base class as the superclass for page widget classes that you will develop for your own Web site projects.

	Widget Adoption
		This class implements a widget adoption mechanism that allows child widgets to be declared in the page's markup using a purely declarative syntax (ie. requiring no JavaScript to be previously loaded).

		For more information on this feature, and for a discussion of some of the other features of the =Uize.Widget.Page= class, consult the explainer [[../explainers/javascript-widgets.html][JavaScript Widgets]] and see under the section `Page Widget`.
*/

Uize.module ({
	name:'Uize.Widget.Page',
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_true = true,
				_false = false,
				_undefined
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._showConfirmDialog = function (_mode,_defaultState,_params) {
				var _this = this;
				_this.useDialog ({
					component:_this._confirmDialog.component,
					widgetClassName:_this._confirmDialog.widgetClassName || 'Uize.Widget.Dialog.Confirm',
					widgetProperties:{
						name:'confirmDialog',
						title:_params.title || '',
						message:(_params.message + '').replace (/\n/g,'<br/>'),
						mode:_mode,
						state:_params.state || _defaultState,
						okText:_params.okText || null,
						cancelText:_params.cancelText || null
					},
					submitHandler:function (_confirmed) {
						var _handler = _params.callback || (_confirmed ? _params.yesHandler : _params.noHandler);
						_handler && _handler (_confirmed);
					}
				});
			};

		/*** Public Instance Methods ***/
			_classPrototype.useDialog = function (_params) {
				/* TO DO:
					- may want to also track to see if people move dialogs, or other interactions
					- should track dismiss events
				*/
				var
					_this = this,
					_dialogWidgetProperties = _params.widgetProperties,
					_dialogWidgetParent = _dialogWidgetProperties.parent || _this,
					_dialogWidgetName = _dialogWidgetProperties.name,
					_dialogWidget = _dialogWidgetParent.children [_dialogWidgetName],
					_component = _params.component,
					_componentProfile
				;
				if (_component) {
					var _rootNodeId =
						_dialogWidgetProperties.idPrefix || (_dialogWidgetParent.get ('idPrefix') + '_' + _dialogWidgetName)
					;
					_componentProfile = {
						name:_component.name,
						rootNodeId:_rootNodeId,
						params:_class.copyInto ({idPrefix:_rootNodeId},_component.params)
					};
				}
				function _trackDialogEvent (_extra) {
					var _productType = _this.get ('productType');
					_dialogWidget.fire ({
						name:'Track Event',
						extra:_extra + (_productType ? (' (' + _productType + ')') : ''),
						bubble:_true
					});
				}
				function _showDialog (_loadType) {
					setTimeout(
						/* NOTE:
							Using a setTimeout here to ensure that the dialog is shown in an asynchronous manner. We were getting in situations where a dialog would be shown, OK would be pressed, and the OK handler executed in such a way that the dialog would be reshown.  Then once the dialog was reshown, the set({shown:false}) for the first dialog would execute, but hide the second dialog.  We'd like the hiding to happen before the second dialog is shown and this should guarantee that by effectively breaking the thread of execution.
						*/

						function() {
							function _callHandler (_handlerProperty,_handlerParams) {
								var _handler = _params [_handlerProperty];
								_handler && _handler.apply (0,_handlerParams);
							}
							function _handleCloseOrCancel (_event) {
								var _handlerParams = [_event];
								_callHandler (_event.name.toLowerCase () + 'Handler',_handlerParams);
								_callHandler ('dismissHandler',_handlerParams);
							}
							/*** store handlers as properties of widget, in order to be able to remove them on reuse ***/
								/* WORKAROUND:
									this is a horrible workaround, since there is currently no elegant way to remove event handlers based upon an owner ID, or wiring IDs

									fundamental problem is...

										- reuse wants to register handlers that are specific to closure scope
										- reuse wants to remove handlers from previous use
										- reuse shouldn't remove handlers registered by others
										- can't remove handlers on closing dialog, because some dialogs fire 'Submission Complete' asynchronously after dialog is closed

									...reuse could either...
										...have ability to remove handlers by owner ID
										...have ability to remove handlers by wiring ID, and store just the wiring IDs
										...store reference to previous handlers on widget instance
								*/
								_dialogWidget.unwire (_dialogWidget.eventHandlersForUseDialog || {});
								_dialogWidget.eventHandlersForUseDialog = {
									'Submission Complete':
										function (_event) {_callHandler ('submitHandler',[_event.result,_event])},
									Close:_handleCloseOrCancel,
									Cancel:_handleCloseOrCancel
								};
								_dialogWidget.wire (_dialogWidget.eventHandlersForUseDialog);

							_dialogWidget.set (_dialogWidgetProperties);
							_dialogWidget.set ({shown:_true});
							_trackDialogEvent (_loadType);
						},
						0
					);
				}
				if (
					_dialogWidget &&
					(
						_dialogWidget.componentProfile == _componentProfile ||
							// HACK: avoid requiring Uize.Data for most cases (it's a component specific thing)
						Uize.Data.identical (_dialogWidget.componentProfile,_componentProfile)
					)
				) {
					_showDialog ('subsequent');
				} else {
					var _refetch = _componentProfile && !!_dialogWidget;
					if (_refetch) {
						_dialogWidget.removeUi ();
						_dialogWidgetParent.removeChild (_dialogWidgetName);
					}
					function _createDialogWidget () {
						var _dialogWidgetClassName = _params.widgetClassName;
						Uize.module ({
							required:_dialogWidgetClassName,
							builder:function () {
								_dialogWidget = _dialogWidgetParent.addChild (
									_dialogWidgetName,eval (_dialogWidgetClassName),_dialogWidgetProperties
								);
								_dialogWidget.componentProfile = _componentProfile;
								_dialogWidget.wire (_params.widgetEventHandlers);
								_dialogWidget.insertOrWireUi ();
								_showDialog (_refetch ? 'refetched' : 'initial');
							}
						});
					}
					_componentProfile
						? _this.loadComponentIntoNode ({
							rootNodeId:_componentProfile.rootNodeId,
							componentParams:_class.copyInto ({cp:_componentProfile.name},_componentProfile.params),
							injectMode:'inner bottom',
							alwaysReplace:_false,
							callback:_createDialogWidget
						})
						: _createDialogWidget ()
					;
				}
				/*?
					Instance Methods
						useDialog
							Lets you conveniently use a dialog widget that may need to be dynamically loaded.

							SYNTAX
							...................................
							myPageWidget.useDialog (paramsOBJ);
							...................................

							Both the widget class for the dialog as well as its HTML markup can be loaded dynamically. The =useDialog= method takes care of loading the dialog widget class module and HTML, if necessary. Also, this method makes it easy for the same dialog to be reused multiple times - from within the same code or across different modules of code. Once a dialog has been loaded and used for the first time, then subsequent uses of the dialog will incur no additional load cost. Examples of dialogs that are suitable for use with this method are: a confirmation dialog, a media browser dialog, a file uploader dialog, a date picker dialog, a color picker dialog, a link-to-this dialog, etc.

							Contract
								In order for a dialog widget class to be compatible with the =useDialog= method, it must comply with a specific contract (or interface).

								Submission Complete
									A dialog widget class to be used with this method should be a subclass of the =Uize.Widget.Dialog= class (or one of its subclasses), and should implement a =Submission Complete= event.

									This event should be fired when the dialog has finished all its processing and has produced a result that can be delivered to the code that is using the dialog. This means that the =Submission Complete= event may fire some time after the user either clicks the dialog's =ok= button or otherwise interacts with the contents of the dialog so that it triggers submission. The dialog class may need to perform asynchronous processing to complete the submission action. The event object for the =Submission Complete= event should contain a =result= property, and the value of this property will be relayed to the handler function specified in the =submitHandler= property of the =paramsOBJ= parameter (see below).

								Close and Cancel
									The handler function specified in the =submitHandler= property of the =paramsOBJ= parameter will not be executed when the user closes the dialog by clicking the =close= or =cancel= button, unless you deliberately code your dialog class to do this.

									There may be cases where it is desirable (such as with a confirmation dialog) for the =close= and =cancel= buttons to fire a =Submission Complete= event, with a false or "no" value for the result. In such cases, your dialog class can listen on its own =Close= and =Cancel= events in order to fire the =Submission Complete= event. A good example of this can be found in the =Uize.Widget.Dialog.Confirm= module.

							paramsOBJ
								The =paramsOBJ= parameter lets you specify parameters for the =useDialog= method, and its value should be an object that may contain the following properties...

								widgetProperties
									An object, specifying the values of set-get properties of the dialog widget that will be set on the dialog widget right before it is displayed.

									The =widgetProperties= property's value should be an object of the form...

									......................................................................
									{
										name:dialogWidgetNameSTR, // REQUIRED!!!
										parent:parentWidgetOBJ,   // optional, defaults to page widget
										idPrefix:idPrefixSTR,     // optional, constructed if not specified
										... ... ...
										... ... ...
										... ... ...
									}
									......................................................................

									NOTES

									- The value specified for the required "name" property will be used as the child widget name for the dialog widget.

									- The optional "parent" property allows you to attach the dialog widget as the child of a widget other than the page widget. If not specified (which is most of the time), the diaog widget will have the page widget as its parent.

									- The optional "idPrefix" property lets you explicitly specify the =idPrefix= for the dialog widget. Usually you will want to just leave it up to the =useDialog= method to construct the =idPrefix= for you, based upon the =idPrefix= of the dialog widget's parent and the name of the dialog widget (as specified in the "name" property mentioned earlier).

									Beyond the "name", "parent", and "idPrefix" properties, values can be specified for any of the set-get properties supported by the class of the dialog widget. This is useful for reuse of dialogs, where on repeat use you may wish to change state.

								component
									An object, defining the parameters for a server side component that should be accessed - through an Ajax request - for providing the HTML markup for the dialog.

									The =component= property's value should be an object of the form...

									............................
									{
										name:componentNameSTR,
										params:componentParamsOBJ
									}
									............................

									When no =component= property is specified, then the dialog widget's HTML will be expected to be already in the page, or it will be the responsibility of the dialog's widget class to build the HTML for insertion into the page.

								widgetClassName
									A string, specifying the name of the widget class that should be used for creating the instance of the dialog widget.

									The widget class is specified as a string, precisely because the class may not yet be loaded (you can't reference a class that isn't defined). The class name is used by the module loader mechanism to dynamically load in the widget class module for the dialog.

								widgetEventHandlers
									An object, specifying handlers for events of the dialog widget that should be wired up when the widget is first instantiated.

									The =widgetEventHandlers= property's value should be an object of the form...

									...................................
									{
										event1Name:event1HandlerSTRorFN,
										event2Name:event2HandlerSTRorFN,
										...
										eventNName:eventNHandlerSTRorFN
									}
									...................................

								submitHandler
									A function, specifying the callback handler that will be executed when the user submits the dialog by clicking on its =ok= button, or otherwise interacts with the contents of the dialog so that it triggers submission.

									The handler function that you specify for this property can expect to receive a single parameter, being the result of the submission action. The value of this result will depend on the specific dialog widget class being used - in some cases it may be a simple type value (such as a boolean), while in other cases it may be an object containing multiple properties.

								closeHandler
									A function, specifying the callback handler that will be executed if the user closes the dialog by clicking the =close= button.

									The handler function that you specify for this property can expect to receive a single parameter, being the event object originating from the dialog.

								cancelHandler
									A function, specifying the callback handler that will be executed if the user dismisses the dialog by clicking the =cancel= button.

									The handler function that you specify for this property can expect to receive a single parameter, being the event object originating from the dialog.

								dismissHandler
									A function, specifying the callback handler that will be executed if the user dismisses the dialog by clicking either the =close= or =cancel= button.

									The handler function that you specify for this property can expect to receive a single parameter, being the event object originating from the dialog.

							An Example
								To better understand how the =useDialog= method is used, let's consider an example...

								EXAMPLE
								.......................................................
								myWidget.callInherited ('useDialog') ({
									widgetClassName:'UizeDotCom.DialogConfirm',
									widgetProperties:{
										name:'confirmDialog',
										title:'Are you sure?',
										message:'Would you like to delete this product?',
										mode:'confirm',
										state:'confirm',
										okText:'DELETE',
										cancelText:'NOOOOOOOOO!!!!'
									},
									submitHandler:function (_confirmed) {
										if (_confirmed) {
											alert ('now your product will get deleted');
											// code to delete the product
										}
									}
								});
								.......................................................

								In the above example, the =callInherited= instance method of the widget =myWidget= is being used to get a caller for the =useDialog= instance method of the page widget. It is assumed, in this example, that =myWidget= is somewhere on a widget tree with a page widget instance at the root. The widget class =UizeDotCom.DialogConfirm= is being used for the dialog widget, and the various widget properties that are specified in the =widgetProperties= property are set-get properties of the =UizeDotCom.DialogConfirm= class. This example is essentially using a dynamically loaded dialog widget class for displaying a decorated confirmation dialog that is implemented using HTML.
				*/
			};

			_classPrototype.wireUi = function () {
				var _this = this;
				if (!_this.isWired) {
					/*** adopt child widgets (declared using $[idPrefix] syntax) ***/
						var _idPrefix = _this.get ('idPrefix');
						function _mergeCopyInto (_targetObject,_sourceObject) {
							var
								_targetObjectPropertyValue,
								_sourceObjectPropertyValue
							;
							for (var _propertyName in _sourceObject)
								(
									typeof (_targetObjectPropertyValue = _targetObject [_propertyName]) == 'object' &&
									typeof (_sourceObjectPropertyValue = _sourceObject [_propertyName]) == 'object' &&
									_targetObjectPropertyValue && _sourceObjectPropertyValue
								)
									? _mergeCopyInto (_targetObjectPropertyValue,_sourceObjectPropertyValue)
									: (_targetObject [_propertyName] = _sourceObject [_propertyName])
							;
						}

						/*** find $... properties in window object, whose values are objects with widgetClass property ***/
							var
								_childrenToAdoptTree = {},
								_hasChildrenToAdopt = _false,
								_childPropertiesPrefix = '$' + _idPrefix + '_',
								_childPropertiesPrefixLength = _childPropertiesPrefix.length,
								_propertyValue
							;
							for (var _propertyName in window) {
								if (
									_propertyName.charAt (0) == '$' && /* reduce impact of this feature with quick elimination */
									_propertyName.substr (0,_childPropertiesPrefixLength) == _childPropertiesPrefix &&
									typeof (_propertyValue = window [_propertyName]) == 'object' && _propertyValue &&
									_propertyValue.widgetClass
								) {
									_hasChildrenToAdopt = _true;
									for (
										var
											_widgetLevelNo = -1,
											_levelChildren = _childrenToAdoptTree,
											_widgetLevels = _propertyName.substr (_childPropertiesPrefixLength).split ('_'),
											_widgetLevelsLength = _widgetLevels.length
										;
										++_widgetLevelNo < _widgetLevelsLength;
									) {
										var
											_widgetLevelName = _widgetLevels [_widgetLevelNo],
											_levelWidget = _levelChildren [_widgetLevelName]
										;
										if (_widgetLevelNo < _widgetLevelsLength - 1) {
											if (!_levelWidget)
												_levelWidget = _levelChildren [_widgetLevelName] = {}
											;
											_levelChildren = _levelWidget.children || (_levelWidget.children = {});
										} else {
											_levelWidget
												? _mergeCopyInto (_levelWidget,_propertyValue)
												: (_levelChildren [_widgetLevelName] = _propertyValue)
											;
											window [_propertyName] = _undefined;
										}
									}
								}
							}

						/*** if any widgets to adopt, require widget class modules and recurse tree to add widgets ***/
							if (_hasChildrenToAdopt) {
								function _traverseChildrenToAdoptTree (_childCreator,_childInitializer) {
									function _traverseChild (_parent,_childName,_childProperties) {
										var
											_childChildren = _childProperties.children,
											_child = _childCreator (_parent,_childName,_childProperties)
										;
										_childChildren && _traverseChildren (_child,_childChildren);
										_childInitializer && _childInitializer (_child);
									}
									function _traverseChildren (_parent,_children) {
										for (var _childName in _children)
											_traverseChild (_parent,_childName,_children [_childName])
										;
									}
									_traverseChildren (_this,_childrenToAdoptTree);
								}

								/*** recurse tree, determining required widget class modules ***/
									var
										_requiredModulesMap = {},
										_requiredModules = []
									;
									_traverseChildrenToAdoptTree (
										function (_parent,_childName,_childProperties) {
											var _widgetClass = _childProperties.widgetClass;
											if (_widgetClass && !_requiredModulesMap [_widgetClass]) {
												_requiredModulesMap [_widgetClass] = 1;
												_requiredModules.push (_widgetClass);
											}
										}
									);

								Uize.module ({
									required:_requiredModules,
									builder:function () {
										_traverseChildrenToAdoptTree (
											function (_parent,_childName,_childProperties) {
												var
													_child = _parent.children [_childName],
													_widgetClass = _childProperties.widgetClass || Uize.Widget
												;
												delete _childProperties.widgetClass;
												delete _childProperties.children;
												_child
													? _child.set (_childProperties)
													: (
														_child = _childName.charCodeAt (0) == 36 && _childName.charCodeAt (1) == 36
															? eval (_widgetClass).spawn (_childProperties,_parent)
															: _parent.addChild (_childName,eval (_widgetClass),_childProperties)
													)
												;
												return _child;
											},
											_this.isWired ? function (_child) {_class.callOn (_child,'insertOrWireUi')} : 0
												/* NOTE:
													Don't wire adopted child widgets if page widget isn't wired yet (this code could be executed before the page widget is wired if all modules required by adopted children are already loaded, and the builder for this anonymous module is executed immediately).
												*/
										);
									}
								});
							}

					_superclass.prototype.wireUi.call (_this);
				}
			};

		/*** Public Static-instance Methods ***/
			var _equivalentToTrue = {yes:1,on:1,1:1,'true':1};
			_class.launchPopup = _classPrototype.launchPopup = function (_params) {
				if (!_params) _params = {};

				/*** default the width and height ***/
					if (_params.width == _undefined) _params.width = 850;
					if (_params.height == _undefined) _params.height = 600;

				/*** calculate window centering (if no explicit positioning specified) ***/
					var _screen = window.screen;
					if (_params.left == _undefined)
						_params.left = Math.max ((_screen.width - _params.width - 10) >> 1,0)
					;
					if (_params.top == _undefined)
						_params.top = Math.max ((_screen.height - _params.height - 40) >> 1,0)
					;

				/*** open the popup window ***/
					function _getParamAsNameValue (_paramName) {
						return _paramName + '=' + _params [_paramName];
					}
					function _getDefaultedBooleanParamAsNameValue (_paramName,_defaultValue) {
						return (
							_paramName + '=' +
							(
								_equivalentToTrue [
									_params [_paramName] == _undefined ? _defaultValue : _params [_paramName] + ''
								] ? 'yes' : 'no'
							)
						);
					}
					var _popupWindow = window.open (
						_params.url || '',
						_params.name || 'popupWindow',
						[
							_getParamAsNameValue ('width'),
							_getParamAsNameValue ('height'),
							_getParamAsNameValue ('top'),
							_getParamAsNameValue ('left'),
							_getDefaultedBooleanParamAsNameValue ('toolbar',0),
							_getDefaultedBooleanParamAsNameValue ('location',0),
							_getDefaultedBooleanParamAsNameValue ('directories',0),
							_getDefaultedBooleanParamAsNameValue ('status',0),
							_getDefaultedBooleanParamAsNameValue ('menubar',0),
							_getDefaultedBooleanParamAsNameValue ('scrollbars',1),
							_getDefaultedBooleanParamAsNameValue ('resizable',1)
						].join (',')
					);
					_popupWindow && _popupWindow.focus ();

				return _popupWindow;
				/*?
					Instance Methods
						launchPopup
							For convenience, the =Uize.Widget.Page.launchPopup= static method is also mapped as the instance method =launchPopup=.

							SYNTAX
							..........................................................
							windowOBJ = myPageWidget.launchPopup (popupPropertiesOBJ);
							..........................................................

							The =launchPopup= instance method is fully equivalent to the =Uize.Widget.Page.launchPopup= static method, but its availability as an instance method is convenient for implementing page widget code, or for implementing widgets that are expected to be used within the context of a widget tree with a page widget at the root.

							EXAMPLE
							..................................................................................
							// using the static method
							Uize.Widget.Page.launchPopup ({name:'window1',url:'http://www.wikipedia.org'});

							// calling the instance method on a page widget instance
							page = new Uize.Widget.Page;
							page.launchPopup ({name:'window2',url:'http://www.zazzle.com'});

							// using callInherited to access instance method of root page widget from child
							var widget = page.addChild ('myChildWidget',Uize.Widget);
							widget.callInherited ('launchPopup') ({name:'window3',url:'http://www.uize.com'});
							..................................................................................

							For an in-depth discussion of the features of the =launchPopup= instance method, consult the reference for the =Uize.Widget.Page.launchPopup= static method.

					Static Methods
						Uize.Widget.Page.launchPopup
							Lets you launch content in a popup window, allowing you to specify properties for that popup window, such as =width=, =height=, =toolbar=, =scrollbars=, etc.

							SYNTAX
							..............................................................
							windowOBJ = Uize.Widget.Page.launchPopup (popupPropertiesOBJ);
							..............................................................

							EXAMPLE
							.....................................................................................
							Uize.Widget.Page.launchPopup ({url:'http://www.wikipedia.org',width:800,height:600});
							.....................................................................................

							The above example will launch the Wikipedia Web site in a popup window named =popupWindow=, and whose document area is sized to 800x600.

							popupPropertiesOBJ
								The =popupPropertiesOBJ= parameter lets you specify various properties for the popup window, and its value should be an object that may contain the following properties...

								url
									A string, specifying the URL of the document that should be loaded into the popup window.

									If no URL is specified, then a `Blank Popup Window` will be launched.

								width
									An integer, specifying the width of the document area of the popup window (ie. *not* the outside width, so excluding browser chrome).

									When no value is specified for this property, or if the value =0=, =null=, or =undefined= is specified, then the default value of =850= will be used.

								height
									An integer, specifying the height of the document area of the popup window (ie. *not* the outside height, so excluding browser chrome).

									When no value is specified for this property, or if the value =0=, =null=, or =undefined= is specified, then the default value of =600= will be used.

								name
									A string, specifying the name of the popup window.

									The value of this property should be a valid JavaScript identifier (ie. no special characters or delimeters that would break an identifier). If a window is already open by the name specified in the =name= property, then it will be reused (see `Reusing Windows`). When no value is specified for this property, or if the value =null=, =undefined=, or =''= (empty string) is specified, then the default value ='popupWindow'= will be used.

								left
									An integer, specifying the screen coordinate for the left edge of the popup window.

									When no value is specified for this property, or if the value =null= or =undefined= is specified, then the popup window will be centered horizontally (see `Automatic Centering`).

								top
									An integer, specifying the screen coordinate for the top edge of the popup window.

									When no value is specified for this property, or if the value =null= or =undefined= is specified, then the popup window will be centered vertically (see `Automatic Centering`).

								toolbar
									A string, boolean, or number, specifying whether or not the toolbar should be displayed for the popup window.

									For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='no'= will be used.

								location
									A string, boolean, or number, specifying whether or not the location bar should be displayed for the popup window.

									For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='no'= will be used.

								directories
									A string, boolean, or number, specifying whether or not the directories bar should be displayed for the popup window.

									In some browsers, the directories bar is known as the personal toolbar and may contain personal bookmarks. For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='no'= will be used.

								status
									A string, boolean, or number, specifying whether or not the status bar should be displayed for the popup window.

									The status bar is usually displayed at the bottom of the browser window. For some browsers, it is not possible to suppress the status bar, so this property may essentially be ignored in such cases. For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='no'= will be used.

								menubar
									A string, boolean, or number, specifying whether or not the menu bar should be displayed for the popup window.

									The menu bar is usually displayed at the top of the browser window, underneath the titlebar. For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='no'= will be used.

								scrollbars
									A string, boolean, or number, specifying whether or not scrollbars should be displayed for the popup window.

									For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='yes'= will be used.

								resizable
									A string, boolean, or number, specifying whether or not the popup window should be resizable by the user.

									For convenience, the value of this property can be of multiple types (see `Switch Property Values` below). When no value is specified for this property, or if the value =null= or =undefined= is specified, then the default value ='yes'= will be used.

							Switch Property Values
								For the switch properties =toolbar=, =location=, =directories=, =status=, =menubar=, =scrollbars=, and =resizable=, values can be specified as string, boolean, or number.

								Boolean and number type values are resolved to the string values ='yes'= or ='no'=. The boolean value =true= and the number value =1= are resolved to ='yes'=, and the boolean value =false= and the number value =0= are resolved to ='no'=. Additionally, the string values ='on'=, ='true'=, and ='1'= are resolved to ='yes'=, and the string values ='off'=, ='false'=, and ='0'= are resolved to ='no'=.

							Automatic Centering
								The popup window is automatically centered if positioning is not specified by the =left= and/or =top= properties.

								When no value is specified for the =left= property, then the popup window will be centered horizontally. Similarly, when no value is specified for the =top= property, then the popup window will be centered vertically. If neither =left= nor =top= are specified, then the popup window will be centered horizontally *and* vertically.

							Blank Popup Window
								When no value is specified for the =url= property, or if the value =null=, =undefined=, or =''= (empty string) is specified, then a blank popup window will be launched.

								A document can be written into a blank popup window by using the window object reference that is returned by the =Uize.Widget.Page.launchPopup= method, as in...

								EXAMPLE
								.......................................................................
								var
									popupWindow = Uize.Widget.Page.launchPopup ({width:350,height:100}),
									popupWindowDoc = popupWindow.document
								;
								popupWindowDoc.open ('text/plain');
								popupWindowDoc.writeln ('HELLO, WORLD!');
								popupWindowDoc.close ();
								.......................................................................

								In the above example, a little popup window would be launched displaying the text *"HELLO, WORLD!"*.

							Reusing Windows
								If a window is already open by the name specified in the =name= property, then it will be reused.

								A reused window will be brought to the front (see `Focusing of Popup Windows`), but its properties will not be updated to the new property values specified in the =popupPropertiesOBJ= parameter. So, size, position, displaying of scrollbars, etc. will not be changed when a popup window is reused. If a value is specified for the =url= property, then the contents of the reused window will be replaced with the document from the specified URL. If no =url= is specified, then the contents of the reused window will not be disturbed.

							Focusing of Popup Windows
								Popup windows that are launched using the =Uize.Widget.Page.launchPopup= method are focused (brought to the front).

								This is useful for reusing popup windows that may have become covered by other browser windows since first being launched.

							VARIATION
							............................................
							windowOBJ = Uize.Widget.Page.launchPopup ();
							............................................

							When no =popupPropertiesOBJ= parameter is specified, then a blank popup window will be opened using default values for all the =popupPropertiesOBJ= properties.
				*/
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_confirmDialog:{
					name:'confirmDialog',
					value:{}
					/*?
						Set-get Properties
							confirmDialog
								An object, allowing aspects of the confirm dialog to be configured by an application.

								The object value for this property should be of the form...

								.............................................
								{
									component:componentProfileOBJ, // optional
									widgetClassName:widgetClassNameSTR
								}
								.............................................

								Confirm Dialog Properties
									The confirm dialog can be configured for an application using the following two properties...

									- =component= - A string, specifying the name of the server side component that should be loaded for building the confirm dialog's HTML. If no value is specified for the =component= property, then no component will be loaded from the server, and the confirm dialog's HTML will be expected to be already in the page, or it will be the responsibility of the confirm dialog's widget class to build the HTML for insertion into the page.

									- =widgetClassName= - A string, specifying the class name of the dialog widget that should be used for the confirm dialog. When no value is specified for the =widgetClassName= property, then the class =Uize.Widget.Dialog.Confirm= will be used as the default.

								NOTES
								- the initial value is ={}= (empty object)
								- the value specified for this property will affect the behavior of the =showConfirm= and =showInform= instance methods
					*/
				}
			});

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				idPrefix:'page'
				/*?
					Set-get Properties
						idPrefix
							This class inherits the =idPrefix= set-get property from the =Uize.Widget= base class, but overrides the initial value to ='page'=.

							Therefore, an instance of the page widget that is created without specifying a value for this property will automatically get the value ='page'=. You will generally only create one instance of this widget per page.
				*/
			});

		/*** Hook Methods ***/
			/*?
				Hook Methods
					These methods are primarily of interest to developers of the UIZE JavaScript Framework and are not intended to be used in applications. They are only public because they form an interface between separate modules.
			*/
			_classPrototype.showConfirm = function (_params) {
				this._showConfirmDialog ('confirm','confirm',_params);
				/*?
					Hook Methods
						showConfirm
							Provides a hook to support the implementation of the =confirm= instance method of the =Uize.Widget= class.

							NOTES
							- see also the companion =showInform= hook method
				*/
			};

			_classPrototype.showInform = function (_params) {
				this._showConfirmDialog ('alert','info',_params);
				/*?
					Hook Methods
						showInform
							Provides a hook to support the implementation of the =inform= instance method of the =Uize.Widget= class.

							NOTES
							- see also the companion =showConfirm= hook method
				*/
			};

		return _class;
	}
});

