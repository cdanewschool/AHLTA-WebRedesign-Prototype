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

/*****************************************************************************
 * G L O B A L S 
 ****************************************************************************/

/** Constant: VUI_MENU
  * vegUI element type for <VegUIMenu>
  */
 
var VUI_MENU = 9;

/** Constant: VUI_MENU_ITEM
  * vegUI element type for <VegUIMenuItem>
  */

var VUI_MENU_ITEM = 10;

vui_module_add(VUI_MENU, VegUIMenu, 'vegui.menu.class.js');
vui_module_add(VUI_MENU_ITEM, VegUIMenuItem, 'vegui.menu.class.js');

/*****************************************************************************
 * V E G U I  M E N U 
 ****************************************************************************/
/** Class: VegUIMenu
  *
  * The popup menu widget.
  *
  * Notes: Hierarchy
  *
  *	*extends VegUINode*
  *
  *	Inherits all properties and methods from <VegUINode>
  *
  * (start code)
  * VegUINode
  *    |
  *    +-- VegUIMenu
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_MENU>
  *
  * Notes: Dependencies
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Child Elements
  *
  *	These child elements are all accessable over *this.[child_name]
  *	even though they may not all be direct children of this element
  *
  *	Skin - <VegUINode>, the skin node of the menu
  *	Table - <VegUINode>, the table that holds the items
  *	Tbody - <VegUINode>, controlls the tbody node in the table
  *	TRow - <VegUIMenuItem>, Template row, all rows added will be cloned from this template
  *
  * Notes: Flags
  *
  *	These flags are enabled by default for this element
  *
  *	<VUI_HMOUSE_OUT> | <VUI_HMOUSE_OVER>
  *
  * Notes: Item Index Explanation
  *
  *	When an item is added via the <add_item> method then it will also be added
  *	to the <Items> property of the menu. 
  *
  * (start code)
  * myMenu.add_item('item 1'); // index 0
  * myMenu.add_item('item 2'); // index 1
  * myMenu.add_item('item 3'); // index 2
  * (end)
  * 
  *	So item1 could be accessed by myMenu.Items[0]
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/17/vegui-tutorial-11---the-popup-menu.html
  *
  * Properties: Object Properties
  *
  *	Items - *Array* , holds the <VegUIMenuItem> objects in this menu
  *	RootMenu - <VegUIMenu>, holds a pointer to the root menu of this menu 
  *	ParentMenu - <VegUIMenu>, holds a pointer to the parent menu of this menu
  *	ChildMenu - *Array*, holds all the sub menues of this menu
  *	FriendMenu - *Array*, holds all the befriended menues of this menu
  *	closeTime - *int*, time it takes before the menu is closed after the mouse cursor
  *	has left it
  *	arrowImg - *string*, path of the image to use for the arrow that indicates a
  *	nested menu
  *	nestedSpace - *int*, space between this menu and its child menu
  *	fxNoFade - *bool*, if true there will be no fade effects even if init_fx
  *	was called on the manager
  *	fxFadeTime - *int*, time of fade effect (ms)
  *	fxFadeLimitIn - *int*, limit of fade in effect, if set the fade effect
  *	will be halted at the selected value (0-100)
  *	noCorrection - *bool* if true
  *     the menu will be allowed to go outside of the manager node's
  *     proportions. If false (default) then it will auto correct it's
  *     position on popup should it be positioned outside of the manager's
  *     borders.
  *
  *
  * Properties: Template Properties
  *
  *	T.closeTime - <closeTime>
  *	T.arrowImg - <arrowImg>
  *	T.nestedSpace - <nestedSpace>
  *	T.noCorrection - <noCorrection>
  *	T.fxNoFade - <fxNoFade>
  *	T.fxFadeLimitIn - <fxFadeLimitIn>
  *	T.fxFadeTime - <fxFadeTime>
  *	
  */


/*****************************************************************************/
/** Constructor: VegUIMenu 
  *
  * *Constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  *
  */

function VegUIMenu(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
  
  this.type = VUI_MENU;
  this.itemIdx = 0;
  this.noAutoShow = 1;
  
  this.Items = this.I = {};
  this.Skin = this.add_child('Skin', VUI_NODE);
  this.Table = this.add_child('Table', VUI_NODE, 'TABLE');
  this.Tbody = this.Table.add_child('Tbody', VUI_NODE, 'TBODY');
  this.TRow = this.add_child('TRow', VUI_MENU_ITEM); 
  this.Table.T.pos = 'absolute';
  this.Table.T.Css.borderCollapse = 'collapse';
  this.Table.set_marg(0,0);
  this.Table.T.Css.padding = '0px';
  this.Tbody.T.Css.padding = '0px';
  this.TRow.T.pos = this.Tbody.T.pos = 'static';
  this.T.closeTime = 2500;  
  this.T.nestedSpace = 3;
  this.Skin.set_marg(0,0);
 
  this.RootMenu = this;
  this.ParentMenu = null;
  this.ChildMenu = [];
  this.FriendMenu = [];

  /* Flag TRow as template so it doesnt get built */
  
  this.TRow.flags |= VUI_TEMPLATE;
  
  this.flags |=  VUI_HMOUSE_OUT | VUI_HMOUSE_OVER;
 
  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: add_item
    *
    * Adds an item to the menu
    *
    * Parameters:
    *
    *	string content - text of the item
    *	<function script> - function to execute when the item is clicked
    *	string lIcon - path of the image that is to be displayed on the 
    *	left side of the item
    *
    * Returns:
    *
    *	VegUIMenuItem - returns the created item
    *
    * See also:
    *
    *	<flush>
    *
    * Example:
    *
    * (start code)
    * Menu.add_item('Item Description', function() { alert('clicked'); }, 'icon.gif');
    * (end)
    */

  this.add_item = function(content, script, lIcon) {
    
    var M = this;
    
    var _idx = this.itemIdx++;
    var item = this.Tbody.add_child(('Item' + _idx), VUI_MENU_ITEM);
    item.clone(this.TRow);
    item.set(content, script, lIcon);
    item.flags ^= VUI_TEMPLATE;
    item.mnuIdx = _idx;
    this.I[_idx] = item;


    item.States[VUI_MOUSE_OVER].Scripts.add(
      function() { 
	if(!has_parent(item.toE, item.Base)) {
	  M.close_children(); 
	}
      },
      'close_children'
    );

    if(this.Base) {
      this.Manager.build_element(item);
      this.resize(null, (this.TRow.LCell.T.h * this.itemIdx) + this.Table.y() + parseInt(this.Table.bmarg));
    }
 
    return item;
  };
  
  /***************************************************************************/
  /** Method: befriend
    *
    * Befriends several menues, making sure only one of them can be open
    * at the same time
    *
    * Parameters:
    *
    *	Array FMArr - array holding menues to be friend, this array also needs
    *	to hold a pointer to this menu for it to work correctly
    *
    * Note:
    *
    *	The <befriend> method only needs to be called on one menu, it will
    *	call the befriend method on the other menues automatically
    *
    * See also:
    *
    *	<close_friends>
    *
    * Example:
    *
    * (start code)
    * // Menu1 will automatically be closed if Menu2 is opened and
    * // vice versa
    *
    * Menu1.befriend([Menu1,Menu2]);
    * (end)
    */
  
  this.befriend = function(FMArr, noSpread) {
    var i;
    this.FriendMenu.length = 0;
    for(i in FMArr) {
      if(FMArr[i] != this) {
        this.FriendMenu.push(FMArr[i]);
        if(!noSpread)
          FMArr[i].befriend(FMArr, true);
      }
    }
  };
  
  /***************************************************************************/
  /** Method: build_menu
    * 
    * Builds the menu
    *
    * *private function*
    *
    * You should always use <VegUIManager::build_element> to build VegUI
    * elements
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be appended
    *	to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See Parent:
    *
    *	<VegUINode::build_node>
    *
    */
  
  this.build = this.build_menu = function(toNode) {

    this.States[VUI_MOUSE_OVER].Scripts.add(
      function(argArr) { 
        argArr[0].RootMenu.CloseTimer = clearTimeout(argArr[0].RootMenu.CloseTimer);
        argArr[0].isActive = true; 
        argArr[0].RootMenu.set_focus(VUI_FOCUS_ACTIVE);
      }
    );

    this.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) {
        var Obj = argArr[0];
        var toE = Obj.toE; 
        if(!has_parent(toE, Obj.Base) && toE != Obj.Base) {
	  Obj.isActive = false;
          Obj.RootMenu.init_close();
        }
      }
    );

    var M = this;
    this.onfocuslose = function() {
      M.RootMenu.close();
    };

    this.Skin.T.z = 0;
    this.Table.T.z = 1;

    this.noCorrection = this.T.noCorrection;

    this.fxNoFade = this.T.fxNoFade || false;
    this.fxFadeTime = this.T.fxFadeTime || 300;
    this.fxFadeLimitIn = this.T.fxFadeLimitIn || 100;
    this.fxFadeLimitOut = this.T.fxFadeLimitOut || 0;

    if(!this.build_node())
      return null;
  
    this.closeTime = this.T.closeTime;
    this.arrowImg = this.T.arrowImg;
    this.nestedSpace = this.T.nestedSpace || 5;
    this.hide(1);
    this.resize(null, (this.TRow.LCell.T.h * (this.itemIdx?this.itemIdx:1)) + this.Table.y() + parseInt(this.Table.bmarg));
    this.dock(toNode);
    return 1;
  };
   
  /***************************************************************************/
  /** Method: close
    *
    * Close this menu and all open sub menues
    *
    * See also:
    *
    *	<init_close>, <popup>
    *
    */
   
  this.close = function(p) {
    var p = this.RootMenu.get_tail();
    
    if(this.RootMenu.CloseTimer) {
      this.RootMenu.CloseTimer = clearTimeout(this.RootMenu.CloseTimer);
      this.RootMenu.CloseTimer = null;
    }
    
    while(p) {
      if(p.is_active()) {
	return;
      }
      
      p.set_transparency(100);
      p.hide(1);
      p.close_children();
      p = p.ParentMenu;
    }
    
    this.hide(1);
    
    if(this.hasFocus)
      this.lose_focus();
  };
  
  /****************************************************************************/
  /** Method: close_friends
    *
    * Closes all friend menues
    *
    * See also:
    *
    *	<close_children>, <befriend>
    */
 
  this.close_friends = function() {
    var i,l;
    for(i = 0, l = this.FriendMenu.length; i < l; i++)
      this.FriendMenu[i].close();
  };
  
  /***************************************************************************/
  /** Method: close_children
    *
    * Closes all child menues
    *
    * See also:
    *
    *	<close_friends>, <popup>
    */

  this.close_children = function() {
    var i, M, l;
    for(i = 0, l = this.ChildMenu.length; i < l; i++) {
      if(!this.ChildMenu[i].is_hidden()) {
        this.ChildMenu[i].hide(1);
	this.ChildMenu[i].isActive = false;
	this.ChildMenu[i].close_children();
      }
    }
  };
  
  /***************************************************************************/
  /** Method: flush
    *
    * Clears the menu of all items
    *
    * See also:
    *
    *	<add_item>
    */
  
  this.flush = function() {
    var i, item, subMenu, cm;
    for(i in this.I) {
      item = this.I[i];
    
      if(item.isLink) {
        subMenu = item.isLink;
        subMenu.ParentMenu = null;
        subMenu.RootMenu = subMenu;
        subMenu.ParentItem = null;
      }
    
      item.kill(1);
    }

    this.I = [];
    this.ChildMenu = [];
    this.itemIdx = 0;
  
    if(this.Base)
      this.resize(null, this.TRow.T.h);
  };
  
  /***************************************************************************/
  /** Method: get_open
    *
    * Returns:
    *
    *	VegUIMenu - the child menu (sub menu) that is currently open for this
    *	menu
    *	null - if no child menu is open
    *
    * See also:
    *
    *	<get_tail>
    *
    */
  
  this.get_open = function() {
    var c,l;
    for(c = 0, l = this.ChildMenu.length; c < l; c++) {
      if(!this.ChildMenu[c].is_hidden()) {
        return this.ChildMenu[c];
      }
    }
    return null;
  };
  
  /***************************************************************************/
  /** Method: get_tail
    *
    * *Best function name EVER*
    *
    * Returns:
    *
    *	VegUIMenu - The child menu on the end of the open child menu chain
    *	VegUIMenu - this, if no child menues are open
    */
  
  this.get_tail = function() {
    var c;
    if((c = this.get_open())) {
      return c.get_tail();
    }
    return this;
  };
  
  /***************************************************************************/
  /** Method: init_close
    *
    * Starts a timer that will close the menu in this.<closeTime> ms.
    * If the mouse enters the menu before the timer has run out the process
    * is interrupted.
    *
    * See also:
    *
    *	<close>, <popup>
    */
  
  this.init_close = function() {
    if(this.RootMenu.CloseTimer) {
     clearTimeout(this.RootMenu.CloseTimer);
     this.RootMenu.CloseTimer = null;
    }
    
    var M = this.RootMenu;
 
    this.RootMenu.CloseTimer = setTimeout(
      function() { M.close(); },
      this.closeTime
    );
  };

  /***************************************************************************/
  /** Method: is_active
    *
    * Checks if this or any of the child menues of this menu is 
    * active
    */

  this.is_active = function() {
    if(this.isActive)
      return true;
    
    var c = this;

    while( (c = c.OpenChild) ) {
      if(c.isActive)
        return true;
    }

    return false;
    
  };
  
  /***************************************************************************/
  /** Method: link_menu
    *
    * Links another <VegUIMenu> element as a subment to this menu. If the
    * mouse hovers over the item that links to the submenu it is opened.
    *
    * Parameters:
    *
    *	int itemIdx - item index of the item that shall link to the sub menu. 
    *	<Item Index Explanation>
    *	VegUIMenu Menu - the menu that shall be the submenu
    *
    * See also:
    *
    *	<befriend>
    *
    * Example:
    *
    * (start code)
    * // add item to the menu, this example is assuming that the
    * // menu has no other items in it yet
    *
    * Menu.add_item('Item 1');
    *
    * // Link Menu2 to 'Item 1' in Menu, so it will be opened
    * // as a sub menu when the user hovers over 'Item 1' in
    * // Menu
    *
    * Menu.link_menu(0, Menu2);
    * (end)
    */
  
  this.link_menu = function(itemIdx, Menu) {
   
    this.I[itemIdx].States[VUI_MOUSE_OVER].Scripts.free('close_children');
    this.I[itemIdx].States[VUI_MOUSE_OVER].Scripts.add(
      function(argArr) {
	if(Menu.is_hidden())
	  Menu.popup(); 
      }
    );
 
    this.I[itemIdx].isLink = Menu;
    
    if(this.arrowImg) {
      var img = imgnode(this.arrowImg);
      this.I[itemIdx].RCell.clear(img);
    }
    Menu.ParentMenu = this;
    Menu.RootMenu = this.RootMenu;
    Menu.ParentItem = this.I[itemIdx];
    this.ChildMenu.push(Menu);
  };
  
  /***************************************************************************/
  /** Method: popup
    *
    * Shows the menu. If coordinates are submitted the menu will be moved
    * to those coordinates first. If no coordinates are submitted and
    * the manu is a submenu of another menu then it will be moved
    * to be besides the menu item that links to it.
    *
    * Parameters:
    *
    *	<int x> - x position (pixels)
    *	<int y> - y position (pixels)
    *
    * See also:
    *
    *	<close>, <init_close>
    */
  
  this.popup = function(x, y) {
    
    if(!isNaN(x) && !isNaN(y)) {
      this.move(x, y);
    } else if(this.ParentMenu) {
      this.move(this.ParentMenu.x2() + this.ParentMenu.nestedSpace, this.ParentMenu.y() + this.ParentItem.Base.offsetTop);
      this.ParentMenu.close_children();
      this.ParentMenu.OpenChild = this;
    }
    
    /* make sure the menu is positioned within the borders
     * of the manager node 
     */

    if(!this.noCorrection) {
      
      var bDiff = this.abs_y()+this.height();
      var rDiff = this.abs_x()+this.width();
     
      if(bDiff > this.Manager.height()) {
        this.move(this.x(), this.y()-(bDiff-this.Manager.height()));
      } else if(this.abs_y() < 0) {
        this.move(this.x(), 0);
      }

      if(rDiff > this.Manager.width()) {
        this.move(this.x()-(rDiff-this.Manager.width()), this.y());
      } else if(this.abs_x() < 0) {
        this.move(0, this.y());
      }
      
    }
    
    clearTimeout(this.RootMenu.CloseTimer);
    this.closeTimer = null;
    
    this.RootMenu.close_friends();
    
    if(this.Manager.FX && !this.fxNoFade) {
      var Menu = this;
      this.hide(0);
      this.set_transparency(1);
      this.Manager.FX.effect_add(
        this, new VegUIFXFadeIn(this.fxFadeTime, this.fxFadeLimitIn)
      );
    } else
      this.hide(0);
  };
  
  /***************************************************************************/
  /** Method: set_menu
    *
    * Sets the most common template properties of this menu
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int x - x position (pixels)
    *	int y - y position (pixels)
    *	int w - width (pixels)
    *	int closeTime - the time it takes for the menu to close after the
    *	mouse cursor has left it (ms)
    *	string cN - Css class to use for the menu
    *	string arrowImg - path of the image to use for the icon that
    *	indicates a sub menu
    *	int nSpace - space between a parent menu and a submenu
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    */
  
  this.set = this.set_menu = function(x, y, w, closeTime, cN, arrowImg, nSpace) {
    this.set_node(null, w, 100, x, y);
    if(closeTime)
      this.T.closeTime = closeTime;
    if(cN)
      this.T.className = cN;
    if(arrowImg)
      this.T.arrowImg = arrowImg;
    if(nSpace)
      this.T.nestedSpace = nSpace
  };
}
VegUIMenu.prototype = VegUINode;

/*****************************************************************************
 * V E G U I  M E N U  I T E M
 ****************************************************************************/
/** Class: VegUIMenuItem
  *
  * An item in <VegUIMenu> object
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIButton*
  *
  *	Inherits all properties and methods from <VegUIButton>
  *
  * (start code)
  * VegUINode
  *    |
  *    +-- VegUIButton
  *           |
  *           +-- VegUIMenuItem
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_MENU_ITEM>
  *
  * Notes: Dependencies
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Child Elements
  *
  *	LCell - <VegUINode>, left cell, holds left icon 
  *	MCell - <VegUINode>, middle cell, holds item text
  *	RCell - <VegUINode>, right cell, holds right icon
  *
  * Notes: Flags
  *
  *	These flags are turned on for this element by default
  *
  *	<VUI_HMOUSE_OUT> | <VUI_HMOUSE_OVER>
  *
  * Properties: Template Properties
  *
  *	T.label - *string*, text of the item
  *	T.rIconImg - *string*, path of the right icon image
  *	T.lIconImg - *string*, path of the left icon image
  *	T.lIconW - *int*, width of the left cell
  *	T.rIconW - *int*, width of the right cell
  *
  */	

/*****************************************************************************/
/** Constructor: VegUIMenuItem
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUIButton::VegUIButton>
  */

function VegUIMenuItem(refName, Parent, Manager) {
  this.constructor = VegUIButton;
  this.constructor(refName, Parent, Manager);
  
  /** 
   * Child elements
   */
  
  this.LCell = this.add_child('LCell', VUI_NODE, 'TD', 'static');
  this.MCell = this.add_child('MCell', VUI_NODE, 'TD', 'static');
  this.RCell = this.add_child('RCell', VUI_NODE, 'TD', 'static');
  
  /**
   * Properties
   */

  this.T.pos = 'static';
  this.T.Css.padding = '0px';
  this.LCell.T.Css.padding = '0px';
  this.MCell.T.Css.padding = '0px';
  this.RCell.T.Css.padding = '0px';
  this.type = VUI_MENU_ITEM; 
  this.flags |= VUI_HMOUSE_OVER | VUI_HMOUSE_OUT;

  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: build_mnuitem
    *
    * Builds the menu item
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
    *	null - on failure
    *	int - *1* on success
    *
    * See Parent:
    *
    *	<VegUIButton::build_button>, <VegUINode::build_node>
    */

  this.build = this.build_mnuitem = function(toNode) {
    if(!this.build_node())
      return null;

    this.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) {
        argArr[0].Parent.Parent.Parent.isActive = false;
        argArr[0].Parent.Parent.Parent.RootMenu.close();
      }
    );
  
    if(this.T.lIconImg)
      this.LCell.clear(imgnode(this.T.lIconImg));

    if(!this.T.label.nodeName)
      this.MCell.clear(document.createTextNode(this.T.label));
    else
      this.MCell.clear(this.T.label);

    if(this.T.rIconImg)
      this.RCell.clear(imgnode(this.T.rIconImg));

    this.LCell.resize(this.T.lIconW);
    this.RCell.resize(this.T.rIconW);


    this.dock(toNode);
  };
  
  /***************************************************************************/
  /** Method: set_mnuitem
    *
    * Sets the most common template properties for the menu item
    * 
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	string content - text of the item
    *	function script - script to be executed when the item is clicked
    *	string lIcon - path of the image to use for the left icon graphic
    *	string rIcon - path of the image to use for the right icon graphic
    *	int h - height (pixels)
    *	int lIconW - width of the left cell (pixels)
    *	int rIconW - width of the right cell (pixels)
    *	string nClass - CSS class to use for item when mouse is not touching it
    *	string hClass - CSS class to use for item when mouse is touching it
    *
    * See Parent:
    *
    *	<VegUIButton::set_button>, <VegUINode::set_node>
    */
    
  this.set = this.set_mnuitem = function(content, script, lIcon, rIcon, h, lIconW, rIconW, nClass, hClass) {
    this.set_node('TR',null,h);
    if(h > 0)  
      this.LCell.T.h = this.MCell.T.h = this.RCell.T.h = h;
    if(lIconW != null) this.T.lIconW = lIconW;
    if(rIconW != null) this.T.rIconW = rIconW;
    if(hClass != undefined) this.States[VUI_MOUSE_OVER].P.className = hClass;
    if(nClass != undefined) {
      this.States[VUI_MOUSE_OUT].P.className = nClass;
      this.T.className = nClass;
    }
    if(script) this.States[VUI_MOUSE_DOWN].Scripts.add(script);
    if(lIcon != undefined) this.T.lIconImg= lIcon;
    if(rIcon != undefined) this.T.rIconImg = rIcon;
    if(content) this.T.label = content;
  };
  
}
VegUIMenuItem.prototype = VegUIButton;

