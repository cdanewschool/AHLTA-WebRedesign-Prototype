/*

Copyright (c) 2005,2006,2007 Stefan Pratter

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
/******************************************************************************
 * G L O B A L S **************************************************************
 *****************************************************************************/

/* Constant: VUI_PROP_SET
 * VegUI element type for <VegUIPropertySet>
 */

var VUI_PROP_SET = 51;

vui_module_add(VUI_PROP_SET, VegUIPropertySet, 'vegui.propertyset.class.js');

/* Constants: Field Input Types
 *
 * 	VUI_PSET_INPUT - generic input text field
 *	VUI_PSET_LIST - <VegUIList> as input
 *	VUI_PSET_CHECK - <VegUICheckBox> as input
 *	VUI_PSET_CUSTOM - custom function as input
 */

var VUI_PSET_INPUT = 1;
var VUI_PSET_LIST = 2;
var VUI_PSET_CHECK = 3;
var VUI_PSET_CUSTOM = 4;

/******************************************************************************
 * V E G U I  P R O P E R T Y  S E T ******************************************
 *****************************************************************************/
/** Class: VegUIPropertySet
  *
  * A property set element, that has name value pairs and lets the user
  * set the value via different methods
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIContentBox*
  *
  *	Inherits all properties and methods from <VegUIContentBox>
  *
  * (start code)
  * VegUINode
  *    |
  *    +--> VegUIContentBox
  *            |
  *            +--> VegUIPropertySet
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_PROP_SET>
  *
  * Notes: Child Elements
  *
  *	All these children are accessable over *this.[child_name]* even if they
  *	may not be direct children of the element
  *
  *	<inherited> - Child elements from <VegUIContentBox>
  *	Table - <VegUINode>, table
  *	TBody - <VegUINOde>, tbody
  *	FldInput - <VegUINode>, the input field used to gather value by text input
  *	CbInput - <VegUICheckBox>, the checkbox used to gather values
  *
  *
  * Notes: Field Object Explained
  *
  *	The field object is used to populate the property set with name value
  *	pairs. It should have one property for each field, the property name
  *	should be the fields name and be a javascript object.
  *
  *	Each field can have several sub properties that define its behaviour
  *	in regards to the property set
  *
  *	Sometimes the documentation will talk about *Single Valid Field Objects*
  *	, which means a single field object. Like the *field_1* object in
  *	the code example below.
  *
  * Notes: Valid field properties
  *
  *	name - *string*, the name of the field
  *	value - *variable*, predefined value of the field
  *	type - *int*, input type of the field. <Field Input Types>
  *	fill_list - *function*, if input type is <VUI_PSET_LIST>, this function
  *	will be called to populate the liss that pops up
  *	fetch - *function*, if input type <VUI_PSET_CUSTOM>, this function
  *	will be called to return the value
  *	caption - *string*, if set this will be displayed in the name
  *	column instead of the actual field name
  *	oncancel - *function*, executed when input is canceled on field
  *	isPassword - *bool*, if true a password input field will be shown instead
  *	of a regular input field
  *	is_large - *int*, if *>0*, the input field will be a text area with n height
  *	disabled - *bool*, if *true*, input can not be toggled for this field
  *	xml_type - *int*, if *1*, <to_xml> will output this field as it's own
  *	tag instead of as an attribute of the main tag
  *	
  * Notes: Code example of a valid fields object
  *
  * (start code)
  * fields = { 
  *   field_1 : {
  *     name : 'field_1',
  *     value : 'some string',
  *     type : VUI_PSET_INPUT,
  *     caption : 'A field'
  *   }
  * }
  * (end)
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/22/vegui-tutorial-13---the-property-set-widget.html
  *
  * Properties: Object Properties
  *
  *	fields - *Object*, field information object
  *	listX - *int*, x offset for list popup
  *	listY - *int*, y offset for list popup
  *	ListTemplate - <VegUIList>, all lists will be cloned from this template 
  *	cssName - *string*, css class to use for the name column
  *	cssValue - *string*, css class to use for the value column
  *	nameWidth - *int*, width of the name column (percentage)
  *
  * 
  * Properties: Template Properties
  *
  *	T.listX - <listX>
  *	T.listY - <listY>
  *	T.ListTemplate - <ListTemplate>
  *	T.cssName - <cssName>
  *	T.cssValue - <cssValue>
  *	T.cssTable - Css class to use for the Table child
  *	T.nameWidth - <nameWidth>
  *	T.fields - <fields>
  */

/******************************************************************************
 ** Constructor: VegUIPropertySet
  * 
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUIPropertySet(refName, Parent, Manager) {
  
  /* constructor */

  this.constructor = VegUIContentBox;
  this.constructor(refName, Parent, Manager);

  /* properties */

  this.type = VUI_PROP_SET;
  this.fields = {};

  /* child elements */

  this.Table = this.Content.add_child('Table', VUI_NODE, 'table');
  this.TBody = this.Table.add_child('TBody', VUI_NODE, 'tbody');
  this.FldInput = this.add_child('FldInput', VUI_NODE);
  this.FldInputPw = this.add_child('FldInputPw', VUI_NODE);
  this.FldInputLarge = this.add_child('FldInputLarge', VUI_NODE);
  this.CbInput = this.add_child('CbInput', VUI_CHECKBOX);
  this.CbInput.noAutoShow = true;
  this.Nctrl = this.add_child('Nctrl', VUI_NODE);
  this.Nctrl.flags |= VUI_TEMPLATE;
  this.FldInputPw.T.type = 'password';

  /* methods */

  /***************************************************************************/
  /** Method: adjust
    *
    * Adjusts the scrollbars to the property set list, this is called
    * automatically by the <dataset_add>, <dataset_build> and <flush>
    * methods
    */

  this.adjust = function() {
    this.update_bbox();
    this.ScrollY.sync();
    this.align_childs();
  };
  
  /***************************************************************************/
  /** Method: build_propset
    *
    * Builds the property set
    *
    * *private function*
    *
    * You should always use <VegUIManager::build_element> to build a vegUI
    * element
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created html node will be appended
    *	to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    *
    * See Parent:
    *
    *	<VegUINode::build_node>
    */
  
  this.build = this.build_propset = function(toNode) {

    this.Table.set_marg(0);
    this.Table.T.pos = 'static';
    this.TBody.T.pos = 'static';
    this.TBody.set_marg(0);
    this.Content.set_marg(0);

    this.Table.T.className = this.T.cssTable;
 
    this.nameWidth = this.T.nameWidth;
    this.cssName = this.T.cssName;
    this.cssValue = this.T.cssValue;
    this.ListTemplate = this.Manager.E[this.T.ListTemplate];
    this.listX = this.T.listX;
    this.listY = this.T.listY;
    this.itemHeight = this.T.itemHeight || undefined;
 
    /* set up field input */
  
    this.FldInput.set('input');
    this.FldInput.T.pos = 'static';
    this.FldInput.flags |= VUI_HKEY_DOWN;
    
    this.FldInputPw.set('input');
    this.FldInputPw.T.pos = 'static';
    this.FldInputPw.flags |= VUI_HKEY_DOWN;
 
    this.FldInputLarge.set('textarea');
    this.FldInputLarge.T.pos = 'static';
    this.FldInputLarge.flags |= VUI_HKEY_DOWN;
 
    /* set up checkbox input */

    this.CbInput.T.pos = 'relative';
    this.CbInput.noAutoShow = true;
 
    if(!this.build_cbox())
      return null;

    this.TBodyNode = this.TBody.Base;

    /* set up fields */

    var P = this;
    this.dataset_build(this.T.fields);
  
    /* hide input objects */
  
    this.FldInput.Base.setAttribute('autocomplete','off');
    this.FldInputPw.Base.setAttribute('autocomplete','off');
    this.FldInputLarge.Base.setAttribute('autocomplete','off');
    this.FldInput.hide(1);
    this.FldInputPw.hide(1);
    this.FldInputLarge.hide(1);
    this.CbInput.hide(1);

    /* set up states */

    this.FldInput.States[VUI_KEY_DOWN].Scripts.add(
      function(argArr) { 
        if(argArr[0].aKey === 13)
          P.dataset_tgl_input(P.selFld, 0); 
      }
    );
 
    this.FldInputPw.States[VUI_KEY_DOWN].Scripts.add(
      function(argArr) { 
        if(argArr[0].aKey === 13)
          P.dataset_tgl_input(P.selFld, 0); 
      }
    );
  
    this.FldInputLarge.States[VUI_KEY_DOWN].Scripts.add(
      function(argArr) { 
        if(argArr[0].keyCtrl && argArr[0].aKey === 13)
          P.dataset_tgl_input(P.selFld, 0); 
      }
    );
    
    this.CbInput.BtnCheck.States[VUI_MOUSE_DOWN].Scripts.returnVal = false;

    this.CbInput.onchange = function() {
      P.dataset_tgl_input(P.selFld, 0);
    };

    this.dock(toNode);
    this.adjust();
    return 1;
  };
  
  /***************************************************************************/
  /** Method: dataset_add
    *
    * Adds a single field to the property set list
    *
    * *private function*
    *
    * Parameters:
    *
    *	Object fld - single valid field object. <Field Object Explained>
    *
    * See also:
    *
    *	<dataset_build>, <dataset_update>
    */
  
  this.dataset_add = function(fld) {
    var tr = htmlnode('tr');
    var tdName = htmlnode('td');
    var tdValue = htmlnode('td');
 
    tdName.className = this.cssName;
    tdName.style.width = this.nameWidth+'%';
  
    tdValue.style.width = 100 - this.nameWidth+'%';
    if(!isNaN(this.itemHeight) && this.itemHeight !== null)
      tdValue.style.height = this.itemHeight+'px';
    tdValue.style.cursor = 'pointer';
    tdValue.className = this.cssValue;
  
    tdName.appendChild(txtnode((fld.caption?fld.caption:fld.name)));
  
    fld.valueNode = tdValue;
  
    var P = this;
  
    if(fld.type == VUI_PSET_LIST) { 
    
      /* field is of type list, build the list element for the
       * field and call the defined fill_list function to fill
       * it with data
       */
    
      var List = this.add_child('Lst_'+fld.name, VUI_LIST);
      List.clone(this.ListTemplate);
      List.T.listType = 1;
      List.noAutoShow = true;
      this.Manager.build_element(List);
      List.hide(1);
      
      List.onchange = function() {
        P.dataset_tgl_input(fld, 0);
      };
   
      fld.fill_list(List);   
  
    }
  
    this.dataset_update(fld);
 
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
 
 
    tdValue.onmousedown = function(e) {
      if(!e)
        var e = event;
      if(VUI_BROWSER_INFO.name == 'opera' && e.srcElement != this)
        return;
      P.dataset_tgl_input(fld, 1);
    };

    this.TBodyNode.appendChild(tr);
  };

  
  /***************************************************************************/
  /** Method: dataset_build
    *
    * Builds the property set from a fields object. <Field Object Explained>
    *
    * Parameters:
    *
    *	Object fields - valid fields object containing 1 or more fields
    *
    * See also:
    *
    *	<dataset_add>, <flush>
    *
    * Example:
    *
    * (start code)
    * // create fields object
    *
    * fields = {
    *   field_1 : {
    *     name : 'field_1',
    *     type : VUI_PSET_INPUT,
    *     value : 'some default value',
    *     caption : 'Field 1'
    *   },
    *   field_2 : {
    *     name : 'field_2',
    *     type : VUI_PSET_CHECK,
    *     value : false,
    *     caption : 'Is this true?'
    *   }
    * };
    *
    * // rebuild the dataset with the new fields
    *
    * Dataset.dataset_rebuild(fields);
    * (end)
    */
  
  this.dataset_build = function(fields) {
  
    var i, fld;
    this.flush();
    this.fields = fields;
    for(i in this.fields) {
      fld = this.fields[i];
      this.dataset_add(fld);
    }
    this.adjust();
  };
  
  /***************************************************************************/
  /** Method: dataset_cancel_input
    *
    * Cancels the input for the current field, toggling input mode off and
    * reverting it to its old value
    *
    * Parameters:
    *
    *	<variable newValue> - if submitted this will be the new value of the
    *	field instead of its original value
    *
    * See also:
    *
    *	<tgl_input>
    */
  
  this.dataset_cancel_input = function(newValue) {
    var fld = this.selFld;
    if( !fld || !fld.hasInput )
      return;

    fld.hasInput = false;
    this.selFld = null;
    this.CbInput.undock();
    this.FldInput.undock();
    this.FldInputPw.undock();
    
    if(fld.type == VUI_PSET_LIST) {
      var List = this.C['Lst_'+fld.name];
      List.undock();
    }
    
    this.dataset_update(fld, newValue);

    if(fld.oncancel)
      fld.oncancel();
  };
  
  /***************************************************************************/
  /** Method: dataset_tgl_input
    *
    * Toggles input mode for a field in the property set list on or off
    *
    * Parameters:
    *
    *	Object fld - single valid field object that needs to exist in the <fields>
    *	property.
    *	bool b - turn input on or off for the submitted field
    *
    * See also:
    *
    *	<dataset_cancel_input>
    *
    * Example:
    *
    * (start code)
    * // assuming there is a field stored with the property index 'field_2'
    * Dataset.dataset_tgl_input(Dataset.fields.field_2, true);
    * (end)
    */
  
  this.dataset_tgl_input = function(fld, b) {

    if(!fld.valueNode)
      return;

    if( (fld.hasInput && b) || (!fld.hasInput && !b) )
      return;
    
    if( fld.disabled )
      return;
  
    
    var P = this, node = fld.valueNode;
  
    if(b) {
      
      this.dataset_cancel_input();
      this.selFld = fld;
      this.Nctrl.control(node);
      fld.hasInput = 1;
      switch(fld.type) {

        /*
         * display check box input 
         */
      
        case VUI_PSET_CHECK:
          this.CbInput.undock();
  	  this.CbInput.Css.width = '95%';
          this.CbInput.hide(0);
	  this.CbInput.tgl_check(fld.value, true);
	  this.Nctrl.clear(this.CbInput.Base);
        break;
 
        /* 
         * display list input
         */

        case VUI_PSET_LIST:
          var List = this.C['Lst_'+fld.name];
  	  List.Css.position = 'relative';
	  List.move(0,0);
	  List.hide(0);
	  this.Nctrl.clear(List.Base);
	  fld.fill_list(List);
	  List.select(fld.value, true);
	  this.adjust();
        break;

        /* 
         * custom input
         */

        case VUI_PSET_CUSTOM:
          if(fld.fetch)
	    fld.fetch(this, fld);
        break;
     
        /*
         * display field input
         */
      
        case VUI_PSET_INPUT:
        default:
          var o = (fld.isPassword ? this.FldInputPw : this.FldInput);
	  
	  if(o == this.FldInput && fld.is_large > 0) {
	    o = this.FldInputLarge;
	    o.resize(null, fld.is_large);
	  }
	    
	  o.undock();
	  o.Css.width = '95%';
	  o.hide(0);
	  o.Base.value = fld.value;
	  this.Nctrl.clear(o.Base);
          o.Base.focus();
	  o.Base.select();
        break;
      }
  
    } else {
     
      switch(fld.type) {
        case VUI_PSET_CUSTOM: break;
        case VUI_PSET_CHECK: 
          fld.value = parseInt(this.CbInput.isChecked);
        break;

        case VUI_PSET_LIST: 
          var List = this.C['Lst_'+fld.name];
	  fld.value = List.sValue;
	  fld.labelNode = List.sItem.node.childNodes[0].cloneNode(true);
        break;
      
        case VUI_PSET_INPUT:
        default:
	  var o = (fld.isPassword ? this.FldInputPw : this.FldInput);
          if(o == this.FldInput && fld.is_large > 0)
	    o = this.FldInputLarge;
	  fld.value = o.Base.value;
        break;
      }
      this.dataset_cancel_input(fld.value);
    }

  };

  /***************************************************************************/
  /** Method: dataset_update
    * 
    * Updates the value of a single valid field object 
    *
    * Parameters:
    *
    *	Object fld - single valid field object. <Field Types Explained>
    *	variable newValue - new value
    *
    * See also:
    *
    *	<dataset_cancel_input>
    *
    * Example:
    *
    * (start code)
    * // assuming there is a field stored in the fields object under the
    * // property name of field_2
    * // field_2 is of type VUI_PSET_INPUT
    *
    * Dataset.dataset_update(Dataset.fields.field_2, 'some text');
    * (end)
    */

  
  this.dataset_update = function(fld, newValue) {
    if(!fld)
      return;
    
    this.dataset_cancel_input();

    this.Nctrl.control(fld.valueNode);
  
    if(newValue !== undefined)
      fld.value = newValue;

    switch(fld.type) {
      case VUI_PSET_CHECK:
        this.Nctrl.clear(txtnode(fld.value ? 'true' : 'false'));
      break;
    
      case VUI_PSET_LIST:
        this.Nctrl.clear(fld.labelNode ? fld.labelNode : txtnode('select ...'));
        this.adjust();
      break;
    
      case VUI_PSET_INPUT:
      default:
        var v = (fld.isPassword ? '<hidden>' : fld.value);
        this.Nctrl.clear(txtnode(v !== undefined ? v : ''));
      break;
    }
  };

  /***************************************************************************/
  /** Method: flush
    *
    * Clears the property set, effectivly removing all name values pairs
    * 
    * Also clears the fields property
    *
    */

  this.flush = function() {

    /* clear list */
  
    this.dataset_cancel_input();
    this.Nctrl.control(this.TBodyNode);
    this.Nctrl.clear();
  
    var i;
    for(i in this.fields) {
      fld = this.fields[i];
      if(this.C['Lst_'+fld.name])
        this.C['Lst_'+fld.name].kill(1);
    }
  
    this.fields = {};
    this.adjust(); 
  };
  
  /***************************************************************************/
  /** Method: set_propset
    *
    * Sets the most common template properties for the property set
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - x position (pixels)
    *	int y - y position (pixels)
    *	int nameWidth - width of the name column (percentage)
    *	Object fields - fields object. <Field Object Explained>
    *	int listX - x offset for input lists (pixels)
    *	int listY - y offset for input lists (pixels)
    *	string cssTable - CSS class to use for the Table element
    *	string cssName - CSS class to use for the name column
    * 	string cssValue - CSS class to use for the value column
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    */
  
  this.set = this.set_propset = function(w, h, x, y, nameWidth, fields, listX, listY, cssTable, cssName, cssValue, itemHeight) {
    this.set_cbox(w, h, x, y);
    if(fields)
      this.T.fields = fields;
    if(cssTable)
      this.T.cssTable = cssTable;
    if(cssName)
      this.T.cssName = cssName;
    if(cssValue)
      this.T.cssValue = cssValue;
    if(!isNaN(nameWidth) && nameWidth > 0)
      this.T.nameWidth = nameWidth;
    if(!isNaN(listX))
      this.T.listX = listX;
    if(!isNaN(listY))
      this.T.listY = listY;
    if(!isNaN(itemHeight))
      this.T.itemHeight = itemHeight;
  };
  
  /***************************************************************************/
  /** Method: to_xml
    *
    * Returns the property set as a valid xml string
    *
    * Parameters:
    *
    *	string tag - name of the starting xml tag
    *
    * Returns:
    *
    *	string - xml string containing the data of the property set
    *
    * Example:
    *
    * (start code)
    * // assuming this is the property set:
    * // Dataset.fields = {
    * //   field_1 : {
    * //     name : 'field_1',
    * //     type : VUI_PSET_INPUT,
    * //     value : 'some default value',
    * //     caption : 'Field 1'
    * //   },
    * //   field_2 : {
    * //     name : 'field_2',
    * //     type : VUI_PSET_CHECK,
    * //     value : false,
    * //     caption : 'Is this true?',
    * //     xml_type : 1
    * //   }
    * // };
    * //
    * // Note how the xml_type property for field_2
    * // is set to 1, this will cause field_2 to be
    * // outputted as its own tag instead as
    * // an attribute of the main tag
    * //
    * // In the example below
    * // xml will be set to this string: 
    * //
    * // '<mydata field_1="some default value">
    * //    <field_2>false</field_2>
    * //  </mydata>'
    *
    * var xml = Dataset.to_xml('mydata');
    * (end)
    */
  
  this.to_xml = function(tag) {
  
    var i,f,n;
    var strOTag='';
    var strTag = '<' + tag + ' ';
    for(i in this.fields) {
      f = this.fields[i];
    
      if(f.xml_ignore)
        continue;
      
      n = f.xml_name || f.name;
      if(!f.xml_type)
        strTag += n + '="'+ f.value+'" ';
      else 
        strOTag += '<'+n+'>'+f.value+'</'+n+'>\n';
    }

    strTag += '>'+strOTag+'</'+tag+'>';

    return strTag;
  };

}
VegUIPropertySet.prototype = VegUIContentBox;
