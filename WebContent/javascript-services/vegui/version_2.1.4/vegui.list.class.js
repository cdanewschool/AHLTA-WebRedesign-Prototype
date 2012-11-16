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

/** Constants: List Types 
  * VUI_LISTTYPE_NORMAL - normal list
  * VUI_LISTTYPE_DROPDOWN - drop down list
  * VUI_LISTTYPE_MULTI - multi select list
  */

var VUI_LISTTYPE_DROPDOWN = 2;
var VUI_LISTTYPE_NORMAL = 1;
var VUI_LISTTYPE_MULTI = 3;

/** Constant: VUI_LIST
  * vegUI element type for <VegUIList>
  */

var VUI_LIST = 8;

vui_module_add(VUI_LIST, VegUIList, 'vegui.list.class.js');

/******************************************************************************
 * V E G U I  L I S T  ********************************************************
 *****************************************************************************/
/** Class: VegUIList
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIContentBox*
  *	
  *	Inherits all properties and methods from <VegUIContentBox>
  *
  * (start code)
  * VegUINode
  *   |
  *   +-- VegUIContentBox
  *         |
  *         +-- VegUIList
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_LIST>
  *
  * Notes: Dependencies
  *
  *	file - vegui.cbox.class.js
  *	file - vegui.scrollbar.class.js
  *
  * Notes: Child Elements
  *
  *	These child elements are all accessable over *this.[child_name]
  *	even though they may not all be direct children of this element
  *
  *	<inherited> - Children of <VegUIContentBox>
  *	Table - <VegUINode>, List table
  *	BtnOpen - <VegUIButton>, Button to open the *dropdown list*
  *	SelITemLabel - <VegUINode>, Label that shows what item is selected 
  *	in a dropdown list
  *
  * Notes: Events
  *
  *	onchange - the <VegUINode::onchange> event is called whenever an item 
  *	gets selected
  *
  * Notes: Item Object
  *
  *	the <sItem> property holds the selected item in the form of an object.
  *	The object's structure is this:
  *
  *	sItem.node - the HTML node of the item
  *	sItem.itemValue - the value of the item
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/15/vegui-tutorial-10---the-list-widget.html
  *
  * Properties: Object Properties
  *
  *	items - *int*, number of items in the list
  *	sItem - *Object*, holds the currently selected item
  *	sItems - *Array*, holds the currently selected items if list is
  *	of type <VUI_LISTTYPE_MULTI>
  *	sValue - *variable*, holding the value of the currently selected item
  *	hItem - *object*, holds the currently hovered item
  *	expandedSize - *int*, height of the list if expanded (dropdown mode only)
  *	listType - *int*, <List Types>
  *	bSelectMode - *bool*, if true then list is currently in select mode
  *	where multiple items can be selected just be moving the mouse
  *	over them
  *	mNormal - *string*, css class to use for items while not selected and
  *	not hovered by mouse
  *	mOver - *string*, css class to use for items when mouse is hovering
  *	over them
  *	mClick - *string*, css class to use for selected items
  *	mOverSelected - *string*, css class to use for hovering over selected items
  *	mHeader - *string*, css class to use for header items
  *	blockTextSelection - *bool*, true by default, prevents text selection in the
  *	cells
  *	blockKeyScrolling - *bool*, if true prevents scrolling via arrow keys
  *
  * Properties: Template Properties
  *
  *	T.itemHeight - *int*, row height (pixels)
  *	T.h - *int*, in addition of being the height of the list it also
  *	sets the <expandedSize> property (pixels)
  *	T.rowSpace - *int*, space between two rows (pixels)
  *	T.listType - *int*, <listType>
  *	T.nullEntry - *bool*, if true the item '-' with value null will
  *	be added to the beginning of the list
  *	T.mNormal - <mNormal>
  *	T.mOver - <mOver>
  *	T.mClick - <mClick>
  *	T.mHeader - <mHeader>
  *	T.mOverSelected - <mOverSelected>
  *
  */

/******************************************************************************
 * Constructor: VegUIList
 *
 * *Constructor*
 *
 * See Parent:
 *
 *	<VegUINode::VegUINode>
 */

function VegUIList(refName, Parent, Manager) {
  
  /* constructor */

  this.constructor = VegUIContentBox;
  this.constructor(refName, Parent, Manager);

  /* properties */

  this.type = VUI_LIST;
  this.items = 0;
  this.sItem = 0;
  this.sItems = [];
  this.sValue = 0;
  this.TBodyNode = 0;
  this.blockTextSelection = false;

  /* child elements */

  this.Table = this.Content.add_child('Table', VUI_NODE);
  this.BtnOpen = this.add_child('BtnOpen', VUI_BUTTON);
  this.SelItemLabel = this.add_child('SelItemLabel', VUI_NODE); 

  /* methods */
  
  /***************************************************************************/
  /** Method: add_item
    *
    * Adds a HTML node as a new item to the list with a certain value attached
    *
    * Parameters:
    *
    *	HTMLNode node - the html node you want to add as item to the list
    *	variable value - the value you want to attach to the item
    *	<bool dontAdjust> - prevents <adjust> method from being called after
    *	the item is added
    *	<bool asHeader> - if true the item will be added as header and will 
    *	not be selectable
    *	<bool replace> - if true and the submitted value already exists
    *	in the list the item at the current value will be replace
    *	by the newly created item
    *
    * Code example:
    * 
    * (start code)
    * // add item 
    * myList.add_item(document.getElementById('somenode'), 1);
    * 
    * // add item as header
    * myList.add_item(document.getElementById('somenode'), 0, false, true);
    * (end)
    *
    * See also:
    *
    *	<drop_item>, <add_item_txt>, <add_item_imgtxt>
    */
  
  this.add_item = function(node, value, dontAdjust, asHeader, replace) {
    var td = htmlnode('div'), idx;
    td.appendChild(node);
    td.vuiValue = value;
 
    td.style.position = 'relative';
    td.className = (!asHeader ? this.mNormal : this.mHeader);
 
    if(!replace || !(idx = this.find(value))) {
      
      /* add new item to the end of the list */
      
      this.Table.Base.appendChild(td)
    
    } else {
      
      /* replace existing item with in the list, also
       * make sure the hItem, sItem and sItems properties
       * of the list get updated accordingly to the 
       * change
       */
    
      var oldItem = this.Table.Base.childNodes[idx];
      var sidx = this.sitem_idx(value);
      
      td.vuiSelected = oldItem.vuiSelected;
      td.className = oldItem.className;      

      this.Table.Base.insertBefore(td, oldItem);  	 
      this.Table.Base.removeChild(oldItem); 	 
  	 
      if(this.sItem && this.sItem.itemValue === value)
        this.sItem.node = td;
      
      if(this.hItem && this.hItem.itemValue === value)
        this.hItem.node = td;
      
      if(sidx)
        this.sItems[sidx].node = td;
    }
    
    this.items = this.Table.Base.childNodes.length;

    /* set hover and click functions for the item */
  
    var List = this;
    td.asHeader = asHeader;
 
    if(this.itemHeight)
      td.style.height = this.itemHeight + 'px';
    
    var m = (this.listType == VUI_LISTTYPE_MULTI);
  
    if(!asHeader) {
      
      td.style.cursor = 'pointer';
      
      td.onmouseover = function(e) {
	if(List.blockMouse)
	  return false;
	
	if(!e)
	  var e = window.event;
	
	var toE = (e.relatedTarget || e.fromElement);
	
        if(toE == this || has_parent(toE, this))
	    return false;
	  
	if(!List.bSelectMode) {

	  if(!List.is_selected(this.vuiValue))
  	    this.className = List.mOver;
	  else
	    this.className = List.mOverSelected;
	  
          if(List.hItem && !List.hItem.node.vuiSelected)
	    List.hItem.node.className = List.mNormal;
	  List.hItem = { node : this, itemValue : this.vuiValue };
	} else if(List.bSelectMode && m) {
	  if(!List.is_selected(this.vuiValue))
            List.select_item(this, false, true);
          else {
	    List.deselect_item(this.vuiValue);
	  }
	}
      };

      td.onmouseout = function(e) {
        if(List.blockMouse)
	  return false;
	
	if(!e)
	  var e = window.event;

	var toE = (e.relatedTarget || e.toElement);
	
        if(has_parent(toE, this))
	  return;

        if(!List.bSelectMode) {
	  if(!List.is_selected(this.vuiValue))
	    this.className = List.mNormal;
	  else {
	    this.className = List.mClick;
	  }
	}
      };

      td.onmousedown = function(e) {
        if(List.blockMouse)
	  return List.blockTextSelection;
	if(!e)
          var e = window.event;
        List.hevent(VUI_MOUSE_DOWN, e);
      
        if(m)
          List.bSelectMode = true;
         
        if(!List.is_selected(this.vuiValue)) {
	  if(m && e.shiftKey)
	    List.select_items(List.sValue, this.vuiValue);
	  else 
            List.select_item(this, false, (m && e.ctrlKey));
	} else {
	  if(!m || (m && e.ctrlKey))
	    List.deselect_item(this.vuiValue);
          else if(m)
	    List.select_item(this);
	}
	return List.blockTextSelection;
      };

      td.onmouseup = function(e) {
        if(List.blockMouse)
	  return;

	List.bSelectMode = false;
      };
      
      td.onselectstart = function() { return List.blockTextSelection; };
    }
    if(!dontAdjust)
      this.adjust();
  
    return td;
  };
  
  /***************************************************************************/
  /** Method: add_item_imgtxt
    *
    * Wrapper function to add an item that contains an image and text
    *
    * Parameters:
    *
    *	string src - path of the image to embed
    *	string txt - text that appears beside the image
    *	variable value - value to attach to the item
    *	<bool dontAdjust> - prevents the call of the <adjust> method
    *	<bool asHeader> - if true item will be added as header
    *   <bool replace> - if true and the submitted value already exists
    *	in the list the item at the current value will be replace
    *	by the newly created item
    * 
    * See also:
    *
    *	<add_item>, <add_item_txt>
    *
    * Example:
    *
    * (start code)
    * List.add_item_imgtxt('image.gif', 'Some Image', 1);
    * (end)
    */
  
  this.add_item_imgtxt = function(src, txt, value, dontAdjust, asHeader, replace) {
    var node = htmlnode('div');
    var img = htmlnode('img');
    img.src = src;
    img.style.verticalAlign = 'top';
    node.appendChild(img);
    node.appendChild(txtnode(txt));
    return this.add_item(node, value, dontAdjust, asHeader, replace);
  };
  
  /***************************************************************************/
  /** Method: add_item_txt
    *
    * Wrapper function to add an item that contains on text
    *
    * Parameters:
    *
    *	string txt - text of the item
    *	variable value - value to attach to the item
    *	<bool dontAdjust> - prevents the call of the <adjust> method
    *	<bool asHeader> - if true item will be added as header
    *   <bool replace> - if true and the submitted value already exists
    *	in the list the item at the current value will be replace
    *	by the newly created item
    * 
    * See also:
    *
    *	<add_item>, <add_item_imgtxt>
    * 
    * Example:
    *
    * (start code)
    * List.add_item_txt('List Entry', 1);
    * (end)
    */
  
  this.add_item_txt = function(txt, value, dontAdjust, asHeader, replace) {
    this.add_item(txtnode(txt), value, dontAdjust, asHeader, replace);
  };
  
  /***************************************************************************/
  /** Method: adjust
    *
    * Adjusts the scrollbars of the list to the content over flow of the
    * list. This is usually called everytime an item is added to the
    * list at runtime.
    */
  
  this.adjust = function() {
    this.update_bbox();
    this.ScrollY.sync();   
  };
  
  /***************************************************************************/
  /** Method: build_list
    *
    * Builds the list
    *
    * *private function*
    *
    * You should always use <VegUIManager::build_element> to build 
    * VegUI elements.
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be appended
    * 	to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See Parent:
    *
    *	<VegUINode::build_node>
    */

  this.build = this.build_list = function(toNode) {
     
    if(!(this.flags & VUI_HIDE_SCROLLX))
      this.flags |= VUI_HIDE_SCROLLX;
    
    this.itemHeight = this.T.itemHeight;
    this.listType = this.T.listType || VUI_LISTTYPE_NORMAL;
    this.nullEntry = this.T.nullEntry || false;
  
    this.mNormal = this.T.mNormal;
    this.mOver = this.T.mOver;
    this.mClick = this.T.mClick;
    this.mHeader = this.T.mHeader;
    this.mOverSelected = this.T.mOverSelected;
  
    this.Table.set_marg(0);
    this.Table.T.pos = null;
    this.Content.set_marg(0);

    this.ScrollX.noAutoShow = true;
    var L = this;

    /* set up the list for combobox mode if the type is set */
    
    if(this.listType == VUI_LISTTYPE_DROPDOWN) {
      this.ScrollY.T.y = this.CHolder.T.y = this.itemHeight + 5;
      this.SelItemLabel.set('div', null, this.itemHeight);
      this.SelItemLabel.T.Css.overflow = 'hidden';
      this.SelItemLabel.set_marg(this.BtnOpen.T.w+ 5);
      this.BtnOpen.set_marg(null,null,0);

      this.BtnOpen.States[VUI_MOUSE_DOWN].Scripts.add(
        function() {
          if(L.isOpen)
            L.close();
          else
            L.open();
        }
      );

      this.CHolder.noAutoShow=1;
      this.ScrollY.noAutoShow=1;
    } else {
      this.SelItemLabel.flags |= VUI_TEMPLATE;
      this.BtnOpen.flags |= VUI_TEMPLATE;
    }

  
    if(!this.build_cbox())
      return null;
   
    this.expandedSize = this.height();

    /* set on mousemove states */

    this.States[VUI_MOUSE_MOVE].Scripts.add(
      function() {
        L.draw_hover(mouseX, mouseY);
      }
    );

    this.States[VUI_MOUSE_OUT].Scripts.add(
      function() {
        if(!has_parent(L.toE, L.Base))
	  L.bSelectMode = false;
      }
    );

    this.States[VUI_KEY_DOWN].Scripts.add(
      function() { 
        if(L.aKey == 38 || L.aKey == 40)
	  L.blockMouse = true; 
      }
    );

    this.States[VUI_KEY_UP].Scripts.add(
      function() { 
        if(L.aKey == 38 || L.aKey == 40)
	  L.blockMouse = false; 
      }
    );

    /* add tbody to table */
   
    this.dock(toNode); 
   
    /* if nullentry is true then add null entry */
 
    if(this.nullEntry)
      this.add_item_txt('-', null);
  
    if(this.listType == VUI_LISTTYPE_DROPDOWN)
      this.close();
 
    return 1;
  };
  
  /***************************************************************************/
  /** Method: close
    *
    * Closes the list if the list is a *dropdown* list
    *
    * See also:
    *
    *	<open>
    *
    * Example:
    *
    * (start code)
    * List.close();
    * (end)
    */
  
  this.close = function() {
    if(this.listType != VUI_LISTTYPE_DROPDOWN)
      return;
    this.isOpen = false;
    this.resize(null, this.itemHeight);
    this.CHolder.hide(1);
    this.ScrollY.hide(1);
  };
  
  /***************************************************************************/
  /** Method: deselect_item
    *
    * Deselects the currently selected item(s), or the item submitted to
    * the function.
    *
    * *private function*
    *
    * Parameters:
    *
    *	<variable value> - if submitted the item with this value will be
    *	deslected only (multi selection list)
    *   <bool noOnChange> - if true onchange() will not be called
    *
    * See also:
    *
    *	<select>, <select_item>
    *
    */
  
  this.deselect_item = function(value, noOnChange) {
  
    if(this.listType == VUI_LISTTYPE_MULTI && this.sItems.length) {
      
      /* if list is multi selection list and there are currently items
       * selected, de-select them all
       */
      
      if(value === undefined || value === null) {
        var i, item,l;

        for(i = 0, l = this.sItems.length; i < l; i++) {
          if(!(item = this.sItems[i]))
	    continue;
          item.node.className = this.mNormal;
	  item.node.vuiSelected = false;
        }

        this.sItems = [];
        this.sItem = this.sValue = null;
      
      } else {
        
	var i, item, l;

	for(i = 0, l = this.sItems.length; i < l; i++) {
          
	  if(!(item = this.sItems[i]))
	    continue;
	 
	  if(item.itemValue === value) {
            item.node.className = this.mNormal;
	    item.node.vuiSelected = false;
	    delete this.sItems[i];
            break;
	  }
	  
	}

        if(this.sItems.length > 0) {
  	  if(this.sValue === value)
            this.sItem = this.sItems[0];
        } else
	  this.sItem = this.sValue = null;
      }
    
    } else if(this.sItem) {
      this.sItem.node.className = this.mNormal;
      this.sItem.node.vuiSelected = false;
      this.sItem = null;
      this.sValue = null;
    
      /* if list is a dropdown list make sure to clear out the sellabel as 
       * well and close the dropdown list
       */
  
      if(this.listType == VUI_LISTTYPE_DROPDOWN) {
        this.SelItemLabel.clear();
        this.close();
      }
    }
  };
  
  /***************************************************************************/
  /** Method: drop_item
    *
    * Drops the item that is located at the submitted index in the childNodes
    * array of the Table child's HTML node
    *
    * Parameters:
    *
    *	int index - index of the item's HTML node in this.Table.Base.childNodes
    *
    * See also:
    *
    *	<add_item>
    *
    * Example:
    *
    * (start code)
    * // drops the item in the beginning of the list
    * List.drop_item(0);
    *
    * // drops the 10th item
    * List.drop_item(9);
    * (end)
    */
  
  this.drop_item = function(index) {
    if(index < 0)
      return;
      
    var item = this.Table.Base.childNodes[index];
    
    if(!item)
      return;
    
    this.Table.Base.removeChild(item);
    this.items = this.Table.Base.childNodes.length;

    var i,l;
    
    if(this.hItem && this.hItem.itemValue == item.vuiValue)
      this.hItem = null;
   
    for(i = 0, l = this.sItems.length; i < l; i++) {
      if(this.sItems[i] && this.sItems[i].itemValue == item.vuiValue) {
        delete this.sItems[i];
	break;
      }
    }

    if(this.sItem && this.sItem.itemValue == item.vuiValue) {
      this.sItem = null;
      this.sValue = null;
    }
    
    this.adjust();
  };
  
  /***************************************************************************/
  /** Method: find
    *
    * Sees if an item with a certain value exists
    *
    * Parameters:
    *
    *	variable value - value to search for
    *
    * Returns:
    *
    *	int - returns the index of the HTMLnode of the item in the childNodes
    *	Array of the Table child
    *	bool - returns false if no item with the requested value was found
    *
    * See also:
    *
    *	<is_selected>
    *
    * Example:
    *
    * (start code)
    * // returns the index of the first item that has the item value 1
    * return List.find(1);
    *
    * // combined with drop_item
    * List.drop_item(List.find(1));
    * (end)
    */
  
  this.find = function(value) {
    var n, Item;
    for(n = 0; n < this.Table.Base.childNodes.length; n++) {
      Item = this.Table.Base.childNodes[n];
      if(Item.asHeader)
        continue;
      if(Item.vuiValue === value) 
        return n;
    }
    return false;
  };
  
  /***************************************************************************/
  /** Method: flush
    *
    * Clears the list of all items
    *
    * Example:
    *
    * (start code)
    * List.flush();
    * (end)
    *
    */
  
  this.flush = function() {
    this.deselect_item(undefined, true);
    this.sItems = [];
    this.Table.clear();
    this.adjust();
    if(this.nullEntry)
      this.add_item_txt('-',null);
  };

  /***************************************************************************/
  /** Method: handle_key_list() 
    *
    * Handles key press on the list element
    *
    * *private function*
    *
    * Alias:
    *
    *	<handle_key>
    *
    * See also:
    *
    *	<VegUICBox::handle_key_cbox>
    */

  this.handle_key = this.handle_key_list = function() {
    switch(this.aKey) {
      
      /* handle item scrolling via up and down keys
       */
      
      case 38:
      case 40:
        
	if(this.blockKeyScrolling)
	  break;
       
	if(!this.hItem)
	  break;
	
	var n = this.hItem.node;
	
	/* select the next or previous item in the list depending
	 * on the key pressed, make sure to skip items that are
	 * defined as headers
	 */
	
	var rn = (this.aKey == 38 ? n.previousSibling : n.nextSibling);
        while(rn && (rn.asHeader || typeof rn.vuiValue == 'undefined'))
	  rn = (this.aKey == 38 ? rn.previousSibling : rn.nextSibling);
        
	/* if start or end of the list was reached, break */

	if(!rn) {
	  this.handle_key_cbox();
	  break;
	}
        
	/* if currently hovered item was not selected return it's 
	 * appearence to normal
	 */
	
	if(!n.vuiSelected)
	  n.className = this.mNormal;
	else
	  n.className = this.mClick;
	
	/* update hItem to hold rn */
	
	this.hItem = { node : rn, itemValue : rn.value };
       
        this.warp(rn.vuiValue);
       
	/* if shift key was being held, select / deselect the item */
	
	if(this.keyShift) {
	  if(!n.vuiSelected)
	    this.select_item(n,false,true);
	  else
	    this.deselect_item(n.vuiValue);
	} 
	
	if(!rn.vuiSelected)
	  rn.className = this.mOver;
	else
	  rn.className = this.mOverSelected;

      break;
    
    }
  };

  /***************************************************************************/
  /** Method: is_selected
    *
    * Checks if the item with a certain value is selected
    *
    * Parameters:
    *
    *	variable value - value to check for
    *
    * See also:
    *
    *	<select>, <find>
    *
    * Returns:
    *
    *	bool - true if value is currently selected, false if not
    *
    * Example:
    *
    * (start code)
    * // returns true if the item with the item value 1 is currently 
    * // selected
    *
    * return List.is_selected(1);
    * (end)
    */

  this.is_selected = function(value) {
    if(!this.sItem)
      return false;
  
    if(this.listType == VUI_LISTTYPE_MULTI) {
      var i, item;
      for(i in this.sItems) {
        item = this.sItems[i];
	if(item.itemValue === value)
	  return true;
      }
      return false;
    } else
      return (this.sValue === value)
  };

  /***************************************************************************/
  /** Method: open
    *
    * Expands the list if it is a *dropdown* list 
    *
    * See also:
    *
    *	<close>
    */
  
  this.open = function() {
    if(this.listType != VUI_LISTTYPE_DROPDOWN)
      return;
    this.isOpen = true;
    this.resize(null, this.expandedSize);
    this.CHolder.hide(0);
    this.ScrollY.hide(0);
  };
 
  /***************************************************************************/
  /** Method: select
    * 
    * Selects the first item that has the requested value
    *
    * Parameters:
    *
    *	variable value - value to search for
    *	bool noOnChange - prevents the <VegUINode::onchange> event from
    *	being triggered
    *
    * See also:
    *
    *	<select_item>, <deselect_item>
    *
    * Example:
    *
    * (start code)
    * // selects the item with the item value 1
    * List.select(1);
    * (end)
    */
  
  this.select = function(value, noOnChange) {
    if(value === null)
      this.deselect_item();
    else {
      var n, Item;
      for(n = 0; n < this.Table.Base.childNodes.length; n++) {
        Item = this.Table.Base.childNodes[n];
        if(Item.vuiValue === value) 
          return this.select_item(Item, noOnChange);
      }
    }
  };
  
  /***************************************************************************/
  /** Method: select_item 
    *
    * Selects the item with the submitted HTML node. This is a private function
    * that is called whenever an item is clicked to mark it as selected. If
    * you want to select an item manually you should use the <select> method
    *
    * *private function*
    *
    * Use <select> method to select item by value
    *
    * Parameters:
    *
    *	HTMLNode node - node of the item to be selected
    *	<bool noOnChange> - will prevent the call of <VegUINode::onchange>
    *	<bool append> - if true current selected item will not be deselected
    *	and the new selection will be appended (multiselection list only)
    */
  
  this.select_item = function(node, noOnChange, append) {
    
    if(node.asHeader)
      return;
 
    /* check if there is currently another item selected */

    if(this.listType != VUI_LISTTYPE_MULTI || !append)
      this.deselect_item();

    node.className = this.mClick;

    this.sItem = {
      node : node,
      itemValue : node.vuiValue
    };

    this.sValue = node.vuiValue;
 

    if(this.listType == VUI_LISTTYPE_DROPDOWN) {
      
      /* if list is a dropdown list show selected item in the sel label */
      
      var sNode = node.cloneNode(true);
      sNode.className = this.mNormal;
      this.SelItemLabel.clear(sNode);
      this.close();
    } else if(this.listType == VUI_LISTTYPE_MULTI) {

      /* if list is a multi selection list, add selected item to sItems */

      this.sItems.push(
        {
	  node:  node,
	  itemValue: node.vuiValue
	}
      );

    }
  
    node.vuiSelected = true;

    if(!noOnChange && this.onchange)
      this.event_execute('onchange');
  
  };

  /***************************************************************************/
  /** Function: select_items
    * Selects items from item with value1 to item with value2
    *
    * Parameters:
    *
    *	variable value1 - value of an item in the list
    *	variable value2 - value of an item in the list
    *
    * Returns:
    *
    *	int - number of items selected
    *
    * See also:
    *
    *	<select_item>, <select>, <is_selected>
    *
    * Example:
    *
    * (start code)
    * // Will select all items that are between the item with the 
    * // item value 1 and the item with the item value 20
    * // items 1 and 20 will be selected as well
    *
    * List.select_items(1,20);
    * (end)
    */

  this.select_items = function(value1, value2) {
    
    if(this.listType !== VUI_LISTTYPE_MULTI)
      return;
    
    var i, n = 0, item, bSelecting = false, bBail = false;

    this.deselect_item();

    for(i in this.Table.Base.childNodes) {
      item = this.Table.Base.childNodes[i];
      
      if(item.asHeader || typeof item.vuiValue == 'undefined')
        continue;
     
      if(item.vuiValue === value1 || item.vuiValue === value2) {
        bSelecting = (bSelecting ? false : true);	
        if(!bSelecting)
	  bBail = true;
      }
      
      if(bSelecting || (item.vuiValue === value1 || item.vuiValue === value2)) {
        this.select_item(item, false, true);
	n++;
      }

      if(bBail) 
        break;
    }

    return n
  };
  
  /***************************************************************************/
  /** Function: set_list
    *
    * Sets the most common template properties for the list
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
    *	int ih - item height (pixels)
    *	int rs - row space, the space between two rows (pixels)
    *	int type - list type <List Types>
    *	int z - z index
    *	bool ne - enable or disable null entry 
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * // set list up as a normal list with a row space of 0 and
    * // fixed item height of 16 pixels
    * 
    * List.set_list(150,200,5,5,16,0,VUI_LISTTYPE_NORMAL);
    *
    * // set list up with non fixed item height
    *
    * List.set_list(150,200,5,5,0,0,VUI_LISTTYPE_NORMAL);
    *
    * // set list up as multi select list
    *
    * List.set_list(150,200,5,5,16,0,VUI_LISTTYPE_MULTI);
    *
    * // set list up as dropdown list
    *
    * List.set_list(150,200,5,5,16,0,VUI_LISTTYPE_DROPDOWN);
    * (end)
    * 
    */
    
  this.set = this.set_list = function(w,h,x,y,ih,rs,type,z,ne) {
    this.set_cbox(w, h, x, y);
    if(h) this.expandedSize = h;
    if(ih) this.T.itemHeight = ih;
    if(rs) this.T.rowSpace= rs;
    if(type) this.T.listType = type;
    if(!isNaN(z)) this.T.z = z;
    if(ne !== undefined) this.T.nullEntry = true;
  };

  /***************************************************************************/
  /** Method: set_style_list
    *
    * Wrapper method to set the style class name attributes of this
    * element
    *
    * Alias:
    *
    *   set_style
    *
    * Parameters:
    *
    *   string over - css class to use on a row when the mouse is hovering
    *   over it
    *   string normal - css class to use on a row when in normal state
    *   string select - css class to use on a row when selected
    *   string header - css class to use on header rows
    *   string overSelect - css class to use on a row when the mouse is
    *   hovering over it and the row is selected
    *
    */

  this.set_style_list = this.set_style = function(
    over, normal, select, header, overSelect
  ) {
    if(over) this.T.mOver = over;
    if(normal) this.T.mNormal = normal;
    if(select) this.T.mClick = select;
    if(header) this.T.mHeader = header;
    if(overSelect) this.T.mOverSelected = overSelect;
  };

  /***************************************************************************/
  /** Method: sitem_idx
    *
    * Returns the index of an item in the sItems property
    *
    * Parameters:
    *
    *	variable value - value of the item to search for
    *
    * Returns:
    *
    *	int - -1 if no item was found
    *	int - index of the item in the sItems array if it was found
    *
    */

  this.sitem_idx = function(value) {
    if(this.listType !== VUI_LISTTYPE_MULTI)
      return -1;

    var i;
    for(i in this.sItems) {
      if(this.sItems[i].itemValue === value)
        return i;
    }
  };

  /***************************************************************************/
  /** Method: to_string
    *
    * Returns a string representation of the selection in the form of
    * item values separated by a delimiter. This is useful for processing  
    * multi selections.
    *
    * Parameters:
    *
    *	<string sep> - seperator string between each item, ',' default
    *
    * Returns:
    *
    *	string - string representation of selections
    *
    * Example:
    *
    * (start code)
    * // if list holds these items:
    * // Item 1 (value = 1)
    * // Item 2 (value = 2)
    * // Item 3 (value = 3)
    * // then this will return '1,2,3';
    *
    * return List.to_string(',');
    * (end)
    *
    * 
    */

  this.to_string = function(sep) {
    var str = '';
    if(!sep)
      sep = ',';
    if(this.listType == VUI_LISTTYPE_MULTI) {
      var i;
      for(i in this.sItems)
        str += this.sItems[i].itemValue+sep;
      str = str.substring(0,str.length-1);
    } else {
      str = new String(this.sValue);
    }
    return str;
  };

  /***************************************************************************/
  /** Method: warp 
    *
    * Scrolls the list to make sure a certain item is in point of view of
    * the user
    *
    * Parameters:
    *
    *	int value - value of the item to warp to
    *
    * Example:
    *
    * (start code)
    * // warp the list to item with item value 1
    *
    * List.warp(1);
    * (end)
    */

  this.warp = function(value) {
    var idx;
    
    if(!(idx = this.find(value)))
      return;
  
    var node = this.Table.Base.childNodes[idx]; 
  
    if(!node)
      return;

    var y = node.style.top ? parseInt(node.style.top) : node.offsetTop;
    var h = node.style.height ? parseInt(node.style.height) : node.offsetHeight;
  
    var yD = y + (this.Content.y()), d;

    if( (yD+h) > this.CHolder.height()) {
      this.Content.move(null, this.Content.y() - ((yD - this.CHolder.height())+h) );
    } else if(yD < 0) {
      d = this.Content.y() - (-y);
      this.Content.move(null, this.Content.y() - d);
    }

    this.adjust();
  };

   
}
VegUIList.prototype = VegUIContentBox;
