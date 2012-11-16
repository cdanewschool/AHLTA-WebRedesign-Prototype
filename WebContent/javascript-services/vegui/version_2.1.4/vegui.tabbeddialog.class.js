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

/** Constant: VUI_TABBEDDIALOG
  * vegUI element type for <VegUITabbedDialog>
  */

var VUI_TABBEDDIALOG = 11;

/** Constant: VUI_TAB
  * vegUI element type for <VegUITab>
  */

var VUI_TAB = 12;

vui_module_add(VUI_TABBEDDIALOG, VegUITabbedDialog, 'vegui.tabbeddialog.class.js');
vui_module_add(VUI_TAB, VegUITab, 'vegui.tabbeddialog.class.js');

/******************************************************************************
 * V E G U I  T A B B E D  D I A L O G ****************************************
 *****************************************************************************/
/** Class: VegUITabbedDialog
  *
  * The tabbed dialog widget that allows to cram lots of content into
  * little space.
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
  *    +--> VegUITabbedDialog
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_TABBEDDIALOG>
  *
  * Notes: Dependencies
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Child Elements
  *
  *	TplTab - <VegUITab>, template tab all tabs will be cloned from this one
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/25/vegui-tutorial-14---the-tabbed-dialog-widget.html
  *
  * Properties: Object Properties
  *
  *	tabSpacing - *int*, space between each tab (pixels)
  *	Tabs - *object*, holds created tabs by their child name
  *	tabNum - *int*, holds the number of created tabs
  *	tabW - *int*, holds the default tab width
  *
  * Properties: Template Properties
  *
  *	T.tabSpacing - <tabSpacing>
  */

/*****************************************************************************/
/** Constructor: VegUITabbedDialog
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUITabbedDialog(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  this.type = VUI_TABBEDDIALOG;

  this.tabW = 0;

  this.Tabs = {};
  this.tabNum = 0;
  this.TplTab = this.add_child('TplTab', VUI_TAB);
  this.TplTab.flags |= VUI_TEMPLATE;
 
  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: add_tab
    *
    * Adds a tab to the tabbeddialog. This is a *template function* and
    * must be called before the tabbeddialog is built. Add tabs after
    * building is currently not supported
    *
    * Parameters: 
    *
    *	string tabName - unique name of the tab
    *	string tabCaption - caption text in the tab
    *	int tabW - width of the tab (pixels)
    * 
    * Returns:
    *
    *	VegUITab - the created tab
    *
    * Example:
    *
    * (start code)
    * myTabDlg.add_tab('movies', 'Movies', 150);
    * myTabDlg.add_tab('music', 'Music', 150);
    * Manager.build_element(myTabDlg);
    * (end)
    */

  this.add_tab = function(tabName, tabCaption, tabW) {
    if(!tabW)
      var tabW = 120;
    var Tab = this.Tabs[tabName] = this.add_child('Tab_'+tabName, VUI_TAB);
    Tab._tabW = tabW;
    Tab._tabCaption = tabCaption;
    return Tab;
  };

  /***************************************************************************/
  /** Method: build_tabdlg 
    *
    * Builds the tabbed dialog
    *
    * *private function*
    *
    * You should always use <VegUIManager::build_element> to build vegUI 
    * elements
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
    *	<VegUINode::build_node>
    */

  this.build = this.build_tabdlg = function(toNode) {
    var t, Tab, fTab;

    this.tabSpacing = this.T.tabSpacing || 0;
  
    for(t in this.Tabs) {
      Tab = this.Tabs[t];
      if(!fTab)
        fTab = Tab;
      Tab.set(null, null, 3, 28, Tab._tabW, (this.tabW), Tab._tabCaption, 3);
      Tab.set_marg(4,4);
      Tab.clone(this.TplTab);
      Tab.flags ^= VUI_TEMPLATE;
      Tab.Tabs = this.Tabs;
      Tab.Tab.T.z = 10;
      this.tabW += (Tab._tabW + this.tabSpacing);
    }

    if(!this.build_node())
      return null;
    
    fTab.focus();

    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: set_tabdlg
    *
    * Sets the most common template properties of the tabbeddialog
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
    *	int tabSpacing - space between two tabs (pixels)
    *
    * See parent:
    *
    *	<VegUINode::set_node>
    */
  
  this.set = this.set_tabdlg = function(w,h,x,y,tabSpacing) {
    this.set_node('div', w, h, x, y);
    if(!isNaN(tabSpacing))
      this.T.tabSpacing = tabSpacing;
  };
  
}
VegUITabbedDialog.prototype = VegUINode;

/******************************************************************************
 * V E G U I  T A B ***********************************************************
 *****************************************************************************/
/** Class: VegUITab
  *
  * A tab in <VegUITabbedDialog>
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
  *    +--> VegUITab
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_TAB>
  *
  * Notes: Requires
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Child Elements
  *
  *	Tab - <VegUIButton>, The tab
  *	TabCaption - <VegUINode>, holds the caption of the tab
  *	Panel - <VegUINode>, The background of the tab
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/25/vegui-tutorial-14---the-tabbed-dialog-widget.html
  *
  * Properties: Object properties
  *
  *	tabCaption - *string* text of TabCaption
  *	tabSelOff - *int* offset of the focused tab on the y axis (pixels)
  *	Tabs - *Array* tabs that are on the same tabbed dialog control
  *	as this tab
  *
  * Properties: Template properties
  *
  *	T.tabCapion - <tabCaption>
  *	T.tabSelOff - <tabSelOff>
  *	T.tabW - width of the tab button
  *	T.tabX - position of the tab button on the x axis
  *
  */

/*****************************************************************************/
/** Constructor: VegUITab
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUITab(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  this.Tab = this.add_child('Tab', VUI_BUTTON);
  this.TabCaption = this.Tab.add_child('Caption', VUI_NODE);
  this.Panel = this.add_child('Panel', VUI_NODE);

  this.Tabs = [];

  this.Tab.set(0, -25, null, 25);
  this.Tab.T.z = 2;
  this.Panel.set_marg(0,0);

  this.type = VUI_TAB;

  /***************************************************************************/
  /** Method: build_tab
    *
    * Builds the tab
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

  this.build = this.build_tab = function(toNode) {
    this.Tab.T.w = this.T.tabW || 120;
    this.Tab.T.x = this.T.tabX || 0;
  
    if(!this.build_node())
      return null;

    this.Tab.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) {
        argArr[0].Parent.focus();
      }
    );
   
    this.tabSelOff = this.T.tabSelOff;
    this.tabCaption = this.T.tabCaption;
    this.TabCaption.Base.appendChild(document.createTextNode(this.tabCaption));
  
    this.focus();
    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: focus
    *
    * Gives focus to this tab bringing it to the foreground and moving
    * the tabs in this.Tabs to the background
    *
    * Example:
    *
    * (start code)
    * myTabDlg.Tabs['music'].focus();
    * (end)
    *
    */
  
  this.focus = function() {
    var t,i = 0;
    for(t in this.Tabs) {
      var tab = this.Tabs[t];
      if(!tab.Base)
        continue;
      if(!tab.inBack) {
        tab.Tab.move(null, tab.Tab.y() + this.tabSelOff);
        tab.inBack = true;
        tab.Panel.hide(1);
      }
      tab.Css.zIndex = i++;
    }
    this.Css.zIndex = i++;
    if(this.inBack) {
      this.Tab.move(null, this.Tab.y() - this.tabSelOff);
      this.inBack = false;
      this.Panel.hide(0);
    }
  };
  
  /**************************************************************************/
  /** Method: set_tab
    *
    * sets the most common template properties of the tab
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
    *	int tabW - width of the tab button (this.Tab) (pixels)
    *	int tabX - x position of the tab button (this.Tab) (pixels)
    *	string tabCaption - caption of this tab
    *	int tabSelOff - y offset when tab is focused (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    */
  
  this.set = this.set_tab = function(w,h,x,y,tabW,tabX,tabCaption,tabSelOff) {
    this.set_node('div',w,h,x,y);
    if(tabCaption) this.T.tabCaption = tabCaption;
    if(tabW) this.T.tabW = tabW;
    if(tabX) this.T.tabX = tabX;
    if(tabSelOff) this.T.tabSelOff = tabSelOff;
  };
  
}
VegUITab.prototype = VegUINode;
