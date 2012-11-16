/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Committer Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2007-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=c" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 4
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widget.Committer= class provides a way to interface between a configurable set of set-get properties, on one or more instance, and other code.

		*DEVELOPERS:* `Chris van Rensburg`, `Tim Carter`

		The =Uize.Widget.Committer= module implements the =Uize.Widget.Committer= widget class, a subclass of =Uize.Widget=.

		In a Nutshell
			The =Uize.Widget.Committer= class provides a convenient way to interface between a set of properties and other code.

			Watched Properties
				An instance of this class can be wired up to watch on any number of properties, as specified by the =watchedProperties= set-get property.

				In a common case, the set of properties being watched might be the =value= set-get properties of a bunch of form input widgets. The committer instance acts as a conduit or interface between the watched properties and the code that cares about watching them.

			Convenient Buttons
				The values of the watched properties can be committed to the watching code by the user clicking on a =commit button=, or by the =commit= instance method being called. Additionally, optional =clearAll=, =restoreInitial=, and =restorePrevious= buttons are supported.

			Auto-commit
				An auto-commit behavior allows uncommitted values to be automatically committed after a configurable period of inactivity since the last modification, as specified by the =autoCommitDelay= set-get property.

			Logical State Summary
				For the convenience of the watching code, a full complement of read-only boolean set-get properties provides a logical state summary of the watched properties.

				This state summary is provided through the =allClear=, =allValid=, =anyNotInitial=, =anyNotCommitted=, and =readyToCommit= boolean set-get properties, and the =committedValues=, =initialValues=, and =uncommittedValues= object set-get properties.
*/

Uize.module ({
	name:'Uize.Widget.Committer',
	required:'Uize.Widget.Button',
	builder:function  (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_null = null,
				_true = true,
				_false = false
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					function () {
						var _this = this;

						/*** Private Instance Properties ***/
							_this._autoCommitTimeout;

						/*** add the commit button ***/
							_this._commitButton = _this._addChildButton ('commit',function () {_this.commit ()});
								/*?
									Child Widgets
										commit button
											An instance of the =Uize.Widget.Button= class, that is wired up so that clicking on it will commit the values of the watched properties.

											The markup for this button is optional. If no markup is present, the action of the button can still be invoked programmatically by calling the =commit= instance method.

											NOTES
											- see the related =commit= instance method
								*/

						/*** add the clearAll, restoreInitial, and restorePrevious buttons ***/
							function _setAllValues (_valuesSource) {
								var
									_watchedProperties = _this._watchedProperties,
									_committedValues = _this._committedValues,
									_newValues = _this.get (_valuesSource + 'Values')
								;
								for (var _watchedPropertyAlias in _committedValues) {
									var
										_watchedPropertyProfile = _watchedProperties [_watchedPropertyAlias],
										_propertySetObject = {}
									;
									_propertySetObject [_watchedPropertyProfile.name] =
										_newValues ? _newValues [_watchedPropertyAlias] : ''
									;
									_watchedPropertyProfile.instance.set (_propertySetObject);
								}
							}
							_this._clearAllButton =
								_this._addChildButton ('clearAll',function () {_setAllValues ('clear')})
								/*?
									Child Widgets
										clearAll
											An instance of the =Uize.Widget.Button= class, that is wired up so that clicking on it will clear the values of all the watched properties by setting them to =''= (empty string).

											The markup for this button is optional. The enabled state of this button is managed by the =Uize.Widget.Committer= class, so that it is disabled whenever the values of all watched properties are empty (ie. when the value of the =allClear= set-get property is =true= and clicking this button would have no effect).

											NOTES
											- see the related =allClear= set-get property
								*/
							;
							_this._restoreInitialButton =
								_this._addChildButton ('restoreInitial',function () {_setAllValues ('initial')})
								/*?
									Child Widgets
										restoreInitial
											An instance of the =Uize.Widget.Button= class, that is wired up so that clicking on it will restore the values of all the watched properties to their initial state (ie. before a =Uize.Widget.Committer= instance is wired up).

											The markup for this button is optional. The enabled state of this button is managed by the =Uize.Widget.Committer= class, so that it is disabled whenever the values of all watched properties are at their initial state (ie. when the value of the =anyNotInitial= set-get property is =false= and clicking this button would have no effect). This could be right after wiring the instance, or right after using the =restoreInitial= button to retore the values of the watched properties to their initial state.

											NOTES
											- see the related =anyNotInitial= set-get property
								*/
							;
							_this._restorePreviousButton =
								_this._addChildButton ('restorePrevious',function () {_setAllValues ('committed')})
								/*?
									Child Widgets
										restorePrevious
											An instance of the =Uize.Widget.Button= class, that is wired up so that clicking on it will restore the values of all the watched properties to their previous committed state (ie. before any of the previously committed values were subsequently modified).

											The markup for this button is optional. The enabled state of this button is managed by the =Uize.Widget.Committer= class, so that it is disabled whenever there are no values to commit (ie. when the value of the =anyNotCommitted= set-get property is =false= and clicking this button would have no effect). This could be right after wiring the instance, right after using the =restorePrevious= button to retore the values of the watched properties to their previous committed state, or after editing the values of the watched properties in such a way that they return to their previously committed state.

											NOTES
											- see the related =anyNotCommitted= set-get property
								*/
							;
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._addChildButton = Uize.Widget.Button.addChildButton;

			_classPrototype._clearAutoCommitTimeout = function () {
				this._autoCommitTimeout && clearTimeout (this._autoCommitTimeout);
			};

			_classPrototype._updateSummaryStateProperties = function () {
				var
					_this = this,
					_allValid = _true,
					_allClear = _true,
					_anyNotCommitted = _false,
					_anyNotInitial = _false,
					_committedValues = _this._committedValues,
					_uncommittedValues = _this._uncommittedValues,
					_initialValues = _this._initialValues,
					_watchedProperties = _this._watchedProperties
				;
				for (var _watchedPropertyAlias in _committedValues) {
					var _uncommittedValue = _uncommittedValues [_watchedPropertyAlias];
					if (!_anyNotCommitted && _uncommittedValue !== _committedValues [_watchedPropertyAlias])
						_anyNotCommitted = _true
					;
					if (!_anyNotInitial && _uncommittedValue !== _initialValues [_watchedPropertyAlias])
						_anyNotInitial = _true
					;
					if (_allClear && _uncommittedValue != '')
						_allClear = _false
					;
					if (_allValid && !_watchedProperties [_watchedPropertyAlias].instance.get ('isValid'))
						_allValid = _false
					;
				}
				_this.set ({
					_allClear:_allClear,
					_allValid:_allValid,
					_anyNotCommitted:_anyNotCommitted,
					_anyNotInitial:_anyNotInitial,
					_readyToCommit:_anyNotCommitted && _allValid
				});
			};

		/*** Public Instance Methods ***/
			_classPrototype.commit = function () {
				var _this = this;
				_this._clearAutoCommitTimeout ();
				if (_this._readyToCommit) {
					_this.set ({_committedValues:_class.copyInto ({},_this._uncommittedValues)});
					_this.fire ('Commit');
					/*?
						Instance Events
							Commit
								Fired whenever uncommitted values are successfully committed.

								This event will be fired regardless of how the uncommitted values are committed - whether programmatically by calling the =commit= instance method, or by the user clicking the =commit button=.
					*/
					_this._updateSummaryStateProperties ();
				}
				/*?
					Instance Methods
						commit
							Lets you programmatically commit the uncommitted values of the watched properties.

							SYNTAX
							......................
							myCommitter.commit ();
							......................

							Calling the =commit= instance method has the same effect as the user clicking the =commit button=. Uncommitted values will only be successfully committed if they are all valid, as indicated by the =allValid= set-get property. Successfully committing values will result in the =Commit= instance event being fired. After uncommitted values are successfully committed, the values of the =uncommittedValues= and =committedValues= set-get properties will be identical.

							NOTES
							- see the related =commit button= child widget
				*/
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_allClear:{
					name:'allClear',
					onChange:function () {
						this._clearAllButton.set ({enabled:this._allClear ? _false : 'inherit'});
					},
					value:_false
					/*?
						Set-get Properties
							allClear
								A read-only boolean, indicating whether or not all the watched properties are clear (ie. set to =''=).

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change.

								NOTES
								- this property is read-only
								- the initial value is =false=
					*/
				},
				_allValid:{
					name:'allValid',
					value:_false
					/*?
						Set-get Properties
							allValid
								A read-only boolean, indicating whether or not all the watched properties have valid values.

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change. The value is determined by the current values of the watched properties - regardless of whether or not those values are committed yet.

								NOTES
								- this property is read-only
								- the initial value is =false=
					*/
				},
				_anyNotInitial:{
					name:'anyNotInitial',
					onChange:function () {
						this._restoreInitialButton.set ({enabled:this._anyNotInitial ? 'inherit' : _false});
					},
					value:_false
					/*?
						Set-get Properties
							anyNotInitial
								A read-only boolean, indicating whether or not the values of any of the watched properties are not their initial value (as stored in the =initialValues= set-get property).

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change.

								NOTES
								- this property is read-only
								- see the related =initialValues= set-get property
								- the initial value is =false=
					*/
				},
				_anyNotCommitted:{
					name:'anyNotCommitted',
					onChange:function () {
						this._restorePreviousButton.set ({enabled:this._anyNotCommitted ? 'inherit' : _false});
					},
					value:_false
					/*?
						Set-get Properties
							anyNotCommitted
								A read-only boolean, indicating whether or not the values of any of the watched properties have been changed from their previous state and have not yet been committed.

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change. The value of this property is =true= whenever there is a difference between the values of the =committedValues= and =uncommittedValues= set-get properties.

								NOTES
								- this property is read-only
								- the initial value is =false=
					*/
				},
				_autoCommitDelay:'autoCommitDelay',
					/*?
						Set-get Properties
							autoCommitDelay
								An integer, specifying the amount of time (measured in milliseconds), after uncommited values become ready to commit (ie. the value of =readyToCommit= becomes =true=) and are no longer being modified, before those uncommitted values are automaticlly committed.

								When the value of this property is set to =null=, =undefined=, =0=, or =false=, then the auto-commit feature will be disabled.

								NOTES
								- the initial value is =undefined=
					*/
				_committedValues:{
					name:'committedValues',
					value:{}
					/*?
						Set-get Properties
							committedValues
								A read-only object, representing the committed values for all the watched properties.

								The value of this property is automatically set whenever the value of the =watchedProperties= set-get property is changed. The =committedValues= object will contain a property for each watched property.

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the uncommitted values of the watched properties (as stored in the =uncommittedValues= set-get property) are committed by calling the =commit= instance method or by the user clicking the =commit button=.

								NOTES
								- this property is read-only
								- see the related =uncommittedValues= and =watchedProperties= set-get properties
								- the initial value is ={}= (an empty object)
					*/
				},
				_initialValues:{
					name:'initialValues',
					value:{}
					/*?
						Set-get Properties
							initialValues
								A read-only object, representing the initial values for all the watched properties.

								The value of this property is automatically set whenever the value of the =watchedProperties= set-get property is changed. The =initialValues= object will contain a property for each watched property.

								NOTES
								- see the related =committedValues= and =uncommittedValues= set-get properties
								- the initial value is ={}= (an empty object)
					*/
				},
				_readyToCommit:{
					name:'readyToCommit',
					onChange:function () {
						this._commitButton.set ({enabled:this._readyToCommit ? 'inherit' : _false});
					},
					value:_false
					/*?
						Set-get Properties
							readyToCommit
								A read-only boolean, indicating whether or not there are uncommitted values for watched properties that are ready to commit.

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change. The value of this property will be =true= if there are any uncommitted values (ie. =anyNotCommitted= is set to =true=) and the values of all watched properties are valid (ie. =allValid= is set to =true=).

								NOTES
								- this property is read-only
								- see the related =anyNotCommitted= and =allValid= set-get properties
								- the initial value is =false=
					*/
				},
				_uncommittedValues:{
					name:'uncommittedValues',
					value:{}
					/*?
						Set-get Properties
							uncommittedValues
								A read-only object, representing the current values of the watched properties.

								The value of this property is automatically set whenever the value of the =watchedProperties= set-get property is changed. The =uncommittedValues= object will contain a property for each watched property.

								The value of this property is automatically managed by the =Uize.Widget.Committer= class and is updated as the values of the watched properties change. The value of this property represents all the current values of the watched properties and may be identical to the values of the =initialValues= and =committedValues= set-get properties.

								The value of this property will be identical to that of the =initialValues= set-get property immediately after the value of =watchedProperties= is set and before the values of the watched properties have been modified, or right after using the =restoreInitial= button to retore the values of the watched properties. Its value will be identical to that of the =committedValues= set-get property immediately after =watchedProperties= is set and before the values of the watched properties have been modified, or right after successfully using the =commit button= or =commit= instance method to commit the uncommited values.

								NOTES
								- this property is read-only
								- see the related =committedValues= and =watchedProperties= set-get properties
								- the initial value is ={}= (an empty object)
					*/
				},
				_watchedProperties:{
					name:'watchedProperties',
					onChange:function () {
						var
							_this = this,
							_watchedProperties = _this._watchedProperties,
							_committedValues = {},
							_uncommittedValues = {},
							_initialValues = {}
						;
						if (_watchedProperties) {
							function _watchProperty (_watchedPropertyAlias,_watchedPropertyProfile) {
								var
									_watchedPropertyInstance = _watchedPropertyProfile.instance,
									_watchedPropertyName = _watchedPropertyProfile.name
								;
								_committedValues [_watchedPropertyAlias] =
								_uncommittedValues [_watchedPropertyAlias] =
								_initialValues [_watchedPropertyAlias] =
									_watchedPropertyInstance.get (_watchedPropertyName)
								;
								_watchedPropertyInstance.wire (
									'Changed.' + _watchedPropertyName,
									function () {
										_this._uncommittedValues [_watchedPropertyAlias] =
											_watchedPropertyInstance.get (_watchedPropertyName)
										;
										_this._updateSummaryStateProperties ();

										/*** handling for the auto-commit behavior ***/
											if (_this._readyToCommit && _this._autoCommitDelay) {
												_this._clearAutoCommitTimeout ();
												_this._autoCommitTimeout = setTimeout (
													function () {_this.commit ()},
													_this._autoCommitDelay
												)
											}
									}
								);
							}
							for (var _watchedPropertyAlias in _watchedProperties)
								_watchProperty (_watchedPropertyAlias,_watchedProperties [_watchedPropertyAlias])
							;
						}
						_this.set ({
							_committedValues:_committedValues,
							_initialValues:_initialValues,
							_uncommittedValues:_uncommittedValues
						});
						_this._updateSummaryStateProperties ();
					}
					/*?
						Set-get Properties
							watchedProperties
								An object, specifying the properties that should be watched by the instance.

								The value of the =watchedProperties= property should be an object of the form...

								........................................
								{
									watchedProperty1Alias:{
										instance:watchedProperty1Instance,
										name:'watchedProperty1Name'
									},
									... ... ...
									... ... ...
									... ... ...
									watchedPropertyNAlias:{
										instance:watchedPropertyNInstance,
										name:'watchedPropertyNName'
									}
								}
								........................................

								Each property of the =watchedProperties= object provides a profile for a watched property, where the property name is an alias for the watched property, and where the property value is an object identifying the property. The object identifying a watched property should contain an "instance" property, identifying the =Uize= subclass instance to which the property belongs, and a "name" property, identifying the name of the set-get property to watch.

								NOTES
								- see the related =committedValues= and =uncommittedValues= set-get properties
								- the initial value is =undefined=
					*/
				}
			});

		return _class;
	}
});

