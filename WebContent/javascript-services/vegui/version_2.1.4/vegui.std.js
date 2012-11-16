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

/**
 * Constant: VEGUIOBJ
 * holds pointers to all VegUIElement Constructor functions by their type
 */

var VEGUIOBJ = [];

/** Constant: VUI_NODE
  * vegUI element type for <VegUINode> */

var VUI_NODE = 1;

/** Constant: VUI_MANAGER
  * vegUI element type for <VegUIManager> */

var VUI_MANAGER = 3;

/**
 * Constants: Mouse and keyboard event types 
 *
 * Mouse and keyboard eventtypes that help you identify what event you're dealing with
 *
 * VUI_MOUSE_DOWN - mouse button clicked on the vegUI element
 * VUI_MOUSE_UP - mouse button released on the vegUI element
 * VUI_MOUSE_OVER - mouse button entered the vegUI element
 * VUI_MOUSE_OUT - mouse button leaves the vegUI element
 * VUI_MOUSE_MOVE - mouse moved within the borders of vegUI element
 * VUI_MOUSE_WHEEL - mouse wheel used
 * VUI_KEY_DOWN - keyboard key pressed
 * VUI_KEY_UP - keyboard key released
 * VUI_FORM_BLUR - onblur event in form elements
 * VUI_FORM_FOCUS - onfocus event in form elements
 * VUI_MOUSE_DBL_LICK - dbclick event
 */

var VUI_MOUSE_DOWN = 1;
var VUI_MOUSE_UP = 2;
var VUI_MOUSE_OVER = 3;
var VUI_MOUSE_OUT = 4;
var VUI_MOUSE_MOVE = 5;
var VUI_KEY_DOWN = 6;
var VUI_KEY_UP = 7;
var VUI_MOUSE_WHEEL = 8;
var VUI_FORM_BLUR = 9;
var VUI_FORM_FOCUS = 10;
var VUI_MOUSE_DBL_CLICK = 11;

/**
 * Constant: VUI_URL
 * Url needed for xmlhttprequest to work, can leave blank
 * if working on a local server
 */

var VUI_URL = '';

/**
 * Constants: Generic directions 
 * VUI_UP - up
 * VUI_DOWN - down
 * VUI_LEFT - left
 * VUI_RIGHT - right
 * VUI_BACK - back
 * VUI_FRONT - front
 */

var VUI_UP = 1;
var VUI_DOWN = 2;
var VUI_LEFT = 3;
var VUI_RIGHT = 4;
var VUI_BACK = 5;
var VUI_FRONT = 6;

/**
 * Constants: Flags, Common
 *
 * Bitmask flags that can be set on the flags property of each VegUIElement individually
 *
 * VUI_HMOUSE_UP - enable event handling for VUI_MOUSE_UP
 * VUI_HMOUSE_DOWN - enable event handling for VUI_MOUSE_DOWN
 * VUI_HMOUSE_OVER - enable event handling for VUI_MOUSE_OVER
 * VUI_HMOUSE_OUT - enable event handling for VUI_MOUSE_OUT
 * VUI_HMOUSE_MOVE - enable event handling for VUI_MOUSE_MOVE
 * VUI_HMOUSE_WHEEL - enable event handling for VUI_MOUSE_WHEEL
 * VUI_HMOUSE_DBL_CLICK - enable envent handling for VUI_MOUSE_DBL_CLICK
 * VUI_HKEY_DOWN - enable event handling for VUI_KEY_DOWN
 * VUI_HKEY_UP - enable event handling for VUI_KE_UP
 * VUI_TEMPLATE - flag VegUIElement as template prohibting it from being built
 * VUI_DISABLED - flag VegUIElement as being disabled, prohibiting any event handling
 */

var VUI_HMOUSE_UP = 0x01;
var VUI_HMOUSE_DOWN = 0x02;
var VUI_HMOUSE_OVER = 0x04;
var VUI_HMOUSE_OUT = 0x08;
var VUI_HMOUSE_MOVE = 0x10;
var VUI_HMOUSE_WHEEL = 0x4000;
var VUI_HMOUSE_DBL_CLICK = 0x100000;
var VUI_HKEY_DOWN = 0x10000;
var VUI_HKEY_UP = 0x20000;
var VUI_HFORM_BLUR = 0x40000;
var VUI_HFORM_FOCUS = 0x80000;
var VUI_DISABLED = 0x20;
var VUI_TEMPLATE = 0x40;

/**
 * Constant: ADJUST_BODY_SIZE 
 * Resizes body to manager canvas size, this is to fix
 * text selection and onmouseout in internet explorer 
 */ 

var ADJUST_BODY_SIZE = true; 

/**
 * Constant: ELEMENT_MAX_INDEX
 * Maximum element index possible, 90000 by default, increase if you need
 * to spawn more than 90000 elements at the same time
 */

var ELEMENT_MAX_INDEX = 90000;

/**
 * Constants: Focus types
 * VUI_FOCUS_PASSIVE - passive focus
 * VUI_FOCUS_ACTIVE - active focus
 */

var VUI_FOCUS_PASSIVE = 1;
var VUI_FOCUS_ACTIVE = 2;

/**
 * Constant: VUI_VERSION
 * Current vegUI version
 */

var VUI_VERSION = '2.1.4';

/**
 * Constants: Mouse coordinates
 * mouseX - absolute x coordinate of the mouse pointer
 * mouseY - absolute y coordinate of the mouse pointer
 */

var mouseX;
var mouseY;

var WINSHAD_CLASS = '';

/******************************************************************************
 * Script that sniffs browsers
 */


/* initiated the browser information object that will later hold the information
 * about the browser being used
 */

/** Constant: VUI_BROWSER_INFO
  * holds browser name in its name property
  */

var VUI_BROWSER_INFO = {
  name : null
};

/* find browser name, we only need to scane for mozilla, ie and opera since
 * those are the only browsers we care about
 */

if(window.opera) {
  VUI_BROWSER_INFO.name = 'opera';
} else if (navigator.userAgent) {
  var str = navigator.userAgent;
  if(str.indexOf("Firefox") != -1) {
    VUI_BROWSER_INFO.name = 'firefox';
  } else if(str.indexOf("Netscape") != -1) {
    VUI_BROWSER_INFO.name = 'netscape';
  } else if(str.indexOf("MSIE") != -1) {
    VUI_BROWSER_INFO.name = 'msie';
  } else if(str.indexOf("Gecko") != -1) {
    VUI_BROWSER_INFO.name = 'mozilla';
  }
}

/******************************************************************************
 * F U N C T I O N S **********************************************************
 *****************************************************************************/

/*****************************************************************************/
/** Function: vui_module_add
  *
  * Makes a vegUI module accessable by the manager. When developing addons
  * for vegUI make sure you initialize your module using this function instead
  * of adding it's type directly to the <VEGUIOBJ> array.
  *
  * If there are colliding types an error message will be displayed and
  * the script is halted
  *
  * Added in:
  *
  *	2.0.6
  *
  * Parameters:
  *
  *	int type - unique type id of the module
  *	func module - constructor function of the module
  *	string filename - filename that the function was called in
  *
  * Returns:
  *
  *	bool - true on success
  *	bool - false on error
  *
  * Example:
  *
  * (start code)
  * vui_module_add(VUI_NODE, VegUINode, 'vegui.std.js');
  * (end)
  */

function vui_module_add(type, module, filename) {
  
  if(VEGUIOBJ[type]) {
    var o = VEGUIOBJ[type];
    alert(
      "vegUI ERROR: Colliding module type\n"+
      "Type ID: "+type+"\n"+
      "Used in "+o.filename+"\n"+
      "Used in "+filename+"\n"
    );
    return false;
  }

  VEGUIOBJ[type] = {
    filename : filename,
    type : type,
    module : module
  };
  
}

/*****************************************************************************/
/** Function: iesucks
  * Internet explorer 6 leaks memory in closures, in order to fix that 
  * iesucks is called when the page is unloaded if the browser is ie6
  * 
  * Parameters:
  *
  *	Node - HTML Node that needs to have events reset recursivly
  *
  */

var browser_str = navigator.userAgent.toLowerCase();
function iesucks(Node) {
  var i;
  
  if(Node.nodeName != '#text') {
   
    Node.onmousemove = null;
    Node.onmouseover = null;
    Node.onmouseout = null;
    Node.onmousedown = null;
    Node.onmousewheel = null;
    Node.onmouseup = null;
    Node.onkeydown = null;
    Node.onkeyup = null;
    Node.onkeypress = null;
    Node.onselectstart = null;
    Node.ondrag = null;
   
    for(i in Node.childNodes)
      iesucks(Node.childNodes[i]);
  }
}

if((browser_str.indexOf('msie')+1)) {
  window.onunload = function() { 
    iesucks(window);
    iesucks(document);
  };
}

/*****************************************************************************/
/** Function: Clone
  * Creates a new instance of a javascript object
  *
  * Parameters:
  *
  * 	Object Obj - object to be cloned
  *
  * Example:
  *
  * In this example newObj will be an exact clone of Obj
  *
  * (start code)
  * var newObj = new Clone(Obj);
  * (end)
  */

function Clone(Obj) {
  var i;
  
  if(!Obj)
    return;

  for(i in Obj) {
    if(Obj[i] && Obj[i].push)
      this[i] = cloneArray(Obj[i]);
    else if(typeof Obj[i] == 'object' && Obj[i] != null) {
      this[i] = new Clone(Obj[i]);
    } else
      this[i] = Obj[i];
  }
}

/*****************************************************************************/
/** Function: merge
  * Attempt to append the properties of trgObj to srcObj
  *
  * Parameters:
  *
  *	Object trgObj - Javascript Object
  *	Object srcObj - Javascript Object
  *
  * Example:
  *
  * Any non-existing properties of Obj2 will be copied to Obj1, existing
  * properties will be overwritten
  *
  * (start code)
  * merge(Obj1, Obj2);
  * (end)
  */
  
function merge(srcObj, trgObj) {
  var i;
  for(i in trgObj) {
    if(typeof trgObj[i] == 'object' && trgObj[i] !== null) {
      if(!trgObj[i].unshift)
        srcObj[i] = new Clone(trgObj[i]);
      else
        srcObj[i] = cloneArray(trgObj[i]);
    } else
      srcObj[i] = trgObj[i];
  }
}


/*****************************************************************************/
/** Function: cloneArray
  * clones an array
  * 
  * Parameters:
  *
  *	Array Arr - Array to be cloned
  *
  * Returns:
  *
  *	Array - New instance of Arr
  *
  * Example:
  *
  * newArr will be an exact copy of oldArr
  *
  * (start code)
  * var newArrr = cloneArray(oldArr);
  * (end)
  */

function cloneArray(Arr) {
  if(!Arr || !Arr.push) {
    if(typeof Arr == 'object')
      return new Clone(Arr);
    else
      return Arr;
  }
  var newArr = [];
  var i;
  for(i in Arr)
    newArr[i] = cloneArray(Arr[i]);
  return newArr;
}


/*****************************************************************************/
/** Function: has_parent
  * checks if Node is the child of Parent somewhere up the parent chain
  *
  * Parameters:
  *
  *	HTMLNode Node - HTML Node
  *	HTMLNode Parent - HTML Node
  *
  * Returns:
  *
  *	bool - *true* if Parent is the parent node of Node directly or indirectly
  *	bool - *false* if Parent is not the parent node of Node directly or indirectly
  *
  * Example:
  *
  * (start code)
  * var node1 = document.createElement('div');
  * var node2 = document.createElement('div');
  * var node3 = document.createElement('div');
  * node1.appendChild(node2);
  * node2.appendChild(node3);
  * 
  * // as node1 is the parent node of node 2, this will return true 
  * return has_parent(node2, node1);
  *
  * // returns true as well, since node1 is the parent of node2 which
  * // is the parent of node3
  * return has_parent(node3, node1);
  * (end)
  *
  */

function has_parent(Node, Parent) {
  var _p = Node;
  if(!_p) return false;
  while((_p = _p.parentNode)) {
    if(_p == Parent)
      return true;
  }
  return false;
}

/*****************************************************************************/
/** Function: get_mouse
  * get mouse pointer location, sets <mouseX> and <mouseY>
  *
  * Parameters:
  *
  *	Event e - javascript event
  *
  * Example:
  *
  * (start code)
  * node.onmousemove = function(e) {
  *   get_mouse((e ? e : event));
  *   alert(mouseX+','+mouseY);
  * }
  * (end)
  */

function get_mouse(e) {
  if (e.pageX || e.pageY) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    mouseX = e.clientX + document.documentElement.scrollLeft;
    mouseY = e.clientY + document.documentElement.scrollTop;
  }
}

/*****************************************************************************/
/** Function: htmlnode
  * Wrapper for document.createElement with the option to append the created
  * node to another html node right away
  *
  * Paramters:
  *
  *	string nodeName - html name of the node (ie. 'div')
  *	<HTMLNode parentNode> - created html node will be appended to this node
  * 
  * Returns:
  * 
  *	HTMLNode - Created node
  *
  */

function htmlnode(nodeName, parentNode) {
  var _node = document.createElement(nodeName);
  if(parentNode)
    parentNode.appendChild(_node);
  return _node;
}

/*****************************************************************************/
/** Function: imgnode
  * Wrapper for document.createElement to create an image node with the
  * option to define proportions and image source right away
  *
  * Parameters:
  *
  *	string src - path of the image
  *	int w - width of the image (pixels)
  *	int h - height of the image (pixels)
  *	<HTMLNode parentNode> - created image node will be appened to this
  *	node
  *
  * Returns:
  *
  *	HTMLNode - Created node
  */

function imgnode(src, w, h, parentNode) {
  var _node = htmlnode('img', parentNode);
  _node.src = src;
  if(!isNaN(w) && w > 0)
    _node.setAttribute('width', w);
  if(!isNaN(h) && h > 0)
    _node.setAttribute('height', h);
  return _node;
}

/*****************************************************************************/
/** Function: txtnode
  * Wrapper for document.createTextNode
  *
  * Parameters:
  *
  *	string txt - text string to be created
  *
  * Returns:
  *
  *	DOMNode - Created text node
  */

function txtnode(txt) {
  return document.createTextNode(txt);
}

/*****************************************************************************/
/** Function: vui_rand
  * generate a random number
  *
  * Parameters:
  *
  *	int min - minimum number
  *	int max - maximum number
  *
  * Returns:
  *
  *	int - the generated number (int)
  *
  * Example:
  *
  * (start code)
  * // n may be any number between 1 and 30
  * var n = vui_rand(1,30);
  * (end)
  */

function vui_rand(min, max) {
 return (Math.round(Math.random()*max)+min);
}

/******************************************************************************
 * V E G U I M O U S E E V E N T
 ******************************************************************************
 ** Object that stores scripts to execute and properties for a mouse state */

/*****************************************************************************/
/** Class: VegUIMouseState 
  * Handles a certain keyboard or mouse event type that gets triggered
  * by the VegUIElement the VegUIMouseState belongs to
  */

/**
 * Constructor: VegUIMouseState
 * 
 * Parameters:
 *
 *	int eventType - event type to handle, <Mouse and keyboard event types>
 *	VegUIElement Parent - VegUIElement this object belongs to
 */

function VegUIMouseState(eventType, Parent) {
  
  /* Property: Parent
   * (VegUIElement) VegUI element that owns this mouse state
   */
  
  this.Parent = Parent;

  /* Property: type
   * (int) holds the type of mouse or keyboard event this state handles
   */
  
  this.type = eventType;
  
  /* Property: Scripts
   * <VegUIDynFunc> object
   */
   
  this.Scripts = new VegUIDynFunc();
  
  /* Property: Properties
   * (Array) properties that will be copied over to the element that owns this
   * mouse state if the event that is handled by this mouse state
   * is triggered
   */
  
  this.P = this.Properties = [];
}

/******************************************************************************
 * V E G U I N O D E
 ******************************************************************************
 ** Controls a html node */

vui_module_add(VUI_NODE, VegUINode, 'vegui.std.js');

/*****************************************************************************/
/** Class: VegUINode 
  * The most basic VegUI Element. The VegUINode is the base element for
  * every other vegUI element.
  *
  * Notes: Tutorials
  *
  *     http://www.vegui.org/site/blog/7/vegui-tutorial-02---the-vegui-node.html
  * 
  * Properties: Object Properties
  *
  *	refName - *string*, name of the object
  *	Parent - *VegUIElement*, Parent element of this element
  *	Manager - *VegUIElement*, Manager element that spawned this element
  *	type - *int*, element type <VUI_NODE>
  *	C - Alias for Childs
  *	Childs - *Object*, Holds all child elements of this type by their 
  *	element index
  *	T - Alias for Template
  *	Template - *Object*, Holds template properties
  *	Base - *HTMLNode*, Holds the HTML node that is controlled by the element
  *	Css - *DOMNode*, Holds the style property of the HTML node that is 
  *	controlled by this element
  *	hasFocus - *int*, Holds the focus type of the node
  *	flags - *int*, Bitmask
  *	BBox - <VegUIBBox>, Holds the Bounding Box object of this element
  *	transparency - *int*, Holds the transparency value of this element (0-100)
  * 	States - *Array*, Holds mouse/keyboard event states, one state for each 
  *	event type
  *	nodeId - *string*, Holds the id of the HTML node that is controlled
  * 	noAutoShow - *bool*, prevents the element from being flagged visible
  *	recursivly
  *	childName - *string*, child name of the node
  *	lockFocus - *bool*, if true focus can never be taken away from this
  *	node
  *	Attached - *object*, object holding vegui elements that were attached
  *	to this element via <attach_node>
  *
  * Properties: Event Specific Object Properties
  *
  * These properties are only set after certain mouse or keyboard events have 
  * been handled by this element
  *
  *	mEvent - *Event*, Holds the javascript event object for the last mouse or
  *	key event handled by this node
  *	delta - *int*, Mousewheel delta, is set whenever the mousewheel event is
  *	handled by this element
  *	aKey - *int*, character code of the last key down or key up event handled
  *	by this element
  *	aKeyChar - *char*, character of the last key down or key up event handled
  *	by this element
  *	toE - *HTMLNode*, relatedTarget / toElement from the last mouse event 
  *	handled by this element
  *	keyShift - *bool*, if true then shift key was held down when the last
  *	keyboard event was handled by this element
  *	keyAlt - *bool*, if true then the alt key was held down when the last
  *	keyboard event was handled by this element
  *	keyCtrl - *bool*, if true then the ctrl key was held down when the last
  *	keyboard event was handled by this element
  *
  * Properties: Template Properties
  *
  * Template properties are properties that will get turned into real properties
  * when the node is built. They are stored in the Template property of the 
  * element
  *
  * 	T.nodeType - *string*, node type of the htmli node to be built (ie 'div')
  *	T.x - *int*, node position on the x axis (pixels)
  *	T.y - *int*, node position on the y axis (pixels)
  *	T.w - *int*, node width (pixels)
  *	T.h - *int*, node height (pixels)
  *	T.rmarg - *int*, right margin
  *	T.bmarg - *int*, bottom margin
  *	T.rmarg_nr - *int*, right margin, no resize
  *	T.bmarg_nr - *int*, bottom margin, no resize
  *	T.micon - *string*, mouse cursor to use when the mouse enters the element
  *	(CSS cursor attribute)
  *	T.blockIETransparency - *bool*, if true any transparency effects will be
  *	ignored if the browser is internet explorer
  *	T.img_src - *string*, will set the HTML node's src attribute
  *	T.Css - *Object*, any properties in T.Css will be copied to the HTML node's
  *	style property
  *	T.innerHtml - *string*, The HTML Node's innerHTML attribute will be set to
  *	this, if set
  *	T.type - *string*, The HTML Node's type attribute will be set to this if
  *	set
  *	T.className - *string*, The HTML node will be using this CSS class if set
  *
  **/

/**
 * Constructor: VegUINode
 *
 * Parameters:
 *
 *	string refName - name of the object
 *	VegUIElement Parent - Parent element of this element
 *	VegUIElement Manager - Manager element that spawned this element
 */

function VegUINode(refName, Parent, Manager) {

  /**
   * Properties
   */

  this.refName = refName;
  this.Parent = Parent;
  this.Manager = Manager;
  this.type = VUI_NODE;
  this.Childs = this.C = {};
  this.Template = this.T = {Css : {}};
  this.Base = null;
  this.Css = null;
  this.hasFocus = false;
  this.canFocus = false;
  this.flags = 0;
  this.BBox = new VegUIBBox(this);
  this.transparency = 100;
  this.nodeId = this.refName + "_node";
  
  this.Attached = {};

  this.States = {};
  this.States[VUI_MOUSE_DOWN] = new VegUIMouseState(VUI_MOUSE_DOWN, this);
  this.States[VUI_MOUSE_OVER] = new VegUIMouseState(VUI_MOUSE_OVER, this);
  this.States[VUI_MOUSE_MOVE] = new VegUIMouseState(VUI_MOUSE_MOVE, this);
  this.States[VUI_MOUSE_OUT]  = new VegUIMouseState(VUI_MOUSE_OUT, this);
  this.States[VUI_MOUSE_UP]  = new VegUIMouseState(VUI_MOUSE_UP, this);
  this.States[VUI_MOUSE_DBL_CLICK]  = new VegUIMouseState(VUI_MOUSE_DBL_CLICK, this);
  this.States[VUI_KEY_UP]  = new VegUIMouseState(VUI_KEY_UP, this);
  this.States[VUI_KEY_DOWN]  = new VegUIMouseState(VUI_KEY_DOWN, this);
  this.States[VUI_MOUSE_WHEEL] = new VegUIMouseState(VUI_MOUSE_WHEEL, this);
  this.States[VUI_FORM_FOCUS] = new VegUIMouseState(VUI_FORM_FOCUS, this);
  this.States[VUI_FORM_BLUR] = new VegUIMouseState(VUI_FORM_BLUR, this);
  
  this.on_state_change = function() { return false };

  /**
   * Template Properties
   */
   
  this.T.nodeType = 'DIV';
  this.T.pos = 'absolute';
  
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Function: abs_middle
    *
    * Parameters:
    *
    *	<HTMLNode stopAt> - if submitted, the absolute position will be returned
    *	relative to the submitted node
    * 
    * Returns:
    *
    *	Array - array holding x and y coordinates of the abolute middle
    *	of the HTML node controlled by this element
    *
    * See also:
    *	
    *	<abs_x>, <abs_y>, <x>, <y>
    */
  
  this.abs_middle = function(stopAt) {
    var x = this.abs_x(stopAt);
    var y = this.abs_y(stopAt);
 
    x = x+(this.width()/2);
    y = y+(this.height()/2);
    return [x, y];
  };
 
  /***************************************************************************/
  /** Function: abs_x
    *
    * Parameters:
    *
    *	<HTMLNode stopAt> - if submitted, the absolute position will be returned
    *	relative to the submitted node
    * 
    * Returns:
    *
    *	int - the absolute position of the HTML node controlled by this element
    *	on the x axis
    *	null - if no HTML node is controlled by this element
    *
    * See also:
    *
    *	<abs_y>, <abs_middle>, <x>, <y>
    */
  
  this.abs_x = function(stopAt) {
    if(!this.Base)
      return null;
    
    if(!stopAt)
      var stopAt = this.Manager.Base.parentNode;
    
    var _par = this.Base,x = this.x();
    while((_par = _par.parentNode) && _par.style && _par != stopAt)
      x += parseInt(_par.style.left ? _par.style.left : _par.offsetLeft);
    return (x+this.Manager.x());
  };
   
  /***************************************************************************/
  /** Function: abs_y
    *
    *	<HTMLNode stopAt> - if submitted, the absolute position will be returned
    *	relative to the submitted node
    * 
    * Returns:
    *
    *	int - the absolute position of the HTML node controlled by this element
    *	on the y axis
    *	null - if no HTML node is controlled by this element
    * 
    * See also:
    *
    *	<abs_x>, <abs_middle>, <x>, <y>
    */
  
  this.abs_y = function(stopAt) {
    if(!this.Base)
      return null;
    
    if(!stopAt)
      var stopAt = this.Manager.Base.parentNode;
      
    var _par = this.Base, y = this.y();
    while((_par = _par.parentNode) && _par.style &&  _par !== stopAt) {
      y += parseInt(_par.style.top ? _par.style.top : _par.offsetTop);
    }
    return (y+this.Manager.y());
  };
   
  /***************************************************************************/
  /** Function: add_child
    *
    * Creates a VegUI element as a child of this element. Childs can be
    * accessed over the Child or C property of this element by their
    * unique child name
    *
    * Parameters:
    *
    *	string name - unique child name
    *	int type - <VegUI element types>
    *	<string nodeName> - if set the childs T.nodeType property will be set
    *	to this
    *	<string pos> - if set the childs T.pos property will be set
    * 	to this (Css position value, ie 'absolute')
    *
    * Returns:
    *
    *	VegUIElement - the created element
    *
    * See also:
    *
    *	<add_skin>, <add_child_o>
    *
    * Example:
    *
    * (start code)
    * var c = myNode.add_child('mychild', VUI_NODE, 'div', 'absolute');
    * (end)
    */
  
  this.add_child = function(name, type, nodeName, pos) {
    var _e = this.Manager.get_new(type, this);
    _e.childName = name;
    this.C[name] = _e;
    if(nodeName)
      _e.T.nodeType = nodeName;
    if(pos != undefined)
      _e.T.pos = pos;
    return _e;
  };
  
  /***************************************************************************/
  /** Function: add_child_o
    *
    * Adds an existing VegUI Element to this element as a child
    *
    * Parameters:
    *
    *	string name - unique child name
    *	VegUIElement Obj - element to add as a child
    *
    * See also:
    *
    *	<add_child>, <add_skin>
    *
    * Example:
    *
    * (start code)
    * var node1 = Manager.get_new(VUI_NODE);
    * var node2 = Manager.get_new(VUI_NODE);
    * node2.add_child_o(node1);
    * (end)
    */
  
  this.add_child_o = function(name, Obj) {
    Obj.childName = name;
    this.C[name] = Obj;
    Obj.Parent = this;
    this.align_childs(Obj);
  };
 
  /***************************************************************************/
  /** Function: add_skin
    *
    * Wrapper function to add a new vegui element to this element as a child
    * with the ability to set the most common template properties
    *
    * Parameters:
    *
    *	string n - node name (ie 'div')
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - position on x axis (pixels)
    *	int y - position on y axis (pixels)
    *	string className - sets the T.className property (css class to use)
    *	int rm - right margin (pixels)
    *	int bm - bottom margin (pixels)
    * 	int rm_nr - right margin no resize (pixels)
    *	int bm_nr - bottom margin no resize (pixels)
    *	string nN - node name ie 'div'
    *	string i - image source (file path)
    *
    * Returns:
    *
    *	VegUIElement - the created element
    *
    * See also:
    *
    *	<add_child>, <add_child_o>
    */
  
  this.add_skin = function(n,w,h,x,y,c,rm,bm,rm_nr,bm_nr,nN,i) {
    var e = this.add_child(n, VUI_NODE);
    e.set_node( (nN?nN:'div') , w, h, x, y);
    e.T.className = c;
    e.set_marg(rm,bm,rm_nr,bm_nr);
    if(i)
      e.T.img_src = i;
    return e;
  }; 
  
  /***************************************************************************/
  /** Function: align_childs
    *
    * (Re)Aligns all child elements of this element to their margins
    *
    * Parameters:
    *
    *	VegUIElement <Child> - if submitted only this child will be realigned
    *
    * See also:
    *
    *	<set_marg>
    */
  
  this.align_childs = function(Child) {
    var c, i, w, h, x ,y ;
    for(i in this.C) {
      c = this.C[i];
    
      if(Child)
        c = Child;
      if(!c.Base) 
        continue;
      
      w = x = h = y = null;
  
      if(!isNaN(c.rmarg) && c.rmarg !== null) 
	w = (this.width() - c.x() - c.rmarg);
      else if(!isNaN(c.rmarg_nr) && c.rmarg_nr !== null)
        x = ((this.width() - c.width()) - c.rmarg_nr);
      if(!isNaN(c.bmarg) && c.bmarg !== null)
        h = (this.height() - c.y() - c.bmarg);
      else if(!isNaN(c.bmarg_nr) && c.bmarg_nr !== null)
        y = ((this.height() - c.height()) - c.bmarg_nr);

      if(w || h) {
        c.resize(w, h);
      } 
      if(x !== null || y !== null) {
        c.move(x, y);
      }
      
      if(Child)
        return;
    }
  };

  /***************************************************************************/
  /** Method: attach_node
    *
    * Attaches another VegUI element to this node. When an element is attached
    * it will stick to this node and move with it whenever it is moved
    *
    * Alias:
    *
    *	<attach>
    *
    * Parameters:
    *
    *	VegUIElement Element - the element you want to attach to this node
    *	int offsetX - x offset
    *	int offsetY - y offset
    *	<int direction> - can be set to <VUI_BACK> or <VUI_FRONT> and will
    *	overwrite the z-index value of the attached element
    *	<int z> - z offset (default = 1)
    *
    * See also:
    *
    *	<detach_node>
    *
    * Example:
    *
    * (start code)
    * // yourNode will be attached to myNode at a 5 pixel offset in each
    * // direction. Submitting the direction as VUI_BACK causes 
    * // yourNode to stay under myNode on the z-level
    *
    * myNode.attach(yourNode, 5, 5, VUI_BACK, 2);
    * (end)
    */

  this.attach = this.attach_node = function(Element, offsetX, offsetY, direction, z) {
    if(Element.eleIdx == this.eleIdx)
      return;
    
    this.Attached[Element.eleIdx] = {
      Element : Element,
      offsetX : offsetX,
      offsetY : offsetY,
      direction : direction,
      offsetZ : z 
    };

    Element.attachTo = {
      Element : this,
      offsetX : offsetX,
      offsetY : offsetY,
      direction : direction,
      offsetZ : z
    };

    if(Element.Base && this.Base) {
      Element.stick(this, offsetX, offsetY, direction, z);
    }
  };

  /***************************************************************************/
  /** Function: build_node
    *
    * build a HTML node from the template properties of this element. Once
    * the node is built it will be controlled by this element
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	HTMLNode toNode - if submitted the created HTMLnode will be appended
    *	as a child to this node
    *	<HTMLNode takeNode> - instead of creating a new HTMLnode an existing
    *	one will be taken over
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    *
    */
  
  this.build = this.build_node = function(toNode, takeNode) {
    if(this.Base || (this.flags & VUI_TEMPLATE))
      return null;
  
    var i;
  
    /* create node */
    
    if(!takeNode)
      this.Base = document.createElement(this.T.nodeType);
    else
      this.Base = takeNode;
      
    this.Css = this.Base.style;
    this.Base.id = this.nodeId;
  
    if(this.T.className)
      this.Base.className = this.T.className;
   
    /* set node properties */
   
    if(!takeNode) {
      this.move(this.T.x, this.T.y);
      this.resize(this.T.w, this.T.h, true);
      this.set_pos(this.T.pos, (this.T.z !== undefined ? this.T.z : 0));
    }
    
    this.rmarg = this.T.rmarg;
    this.bmarg = this.T.bmarg;
    this.rmarg_nr = this.T.rmarg_nr;
    this.bmarg_nr = this.T.bmarg_nr;
  
  
    /* Setup cursor change */
    if(this.T.micon) {
      if(!(this.flags & VUI_HMOUSE_OUT))
        this.flags |= VUI_HMOUSE_OUT;
      if(!(this.flags & VUI_HMOUSE_OVER))
        this.flags |= VUI_HMOUSE_OVER; 

      var micon = this.T.micon;
      this.States[VUI_MOUSE_OVER].Scripts.add(function(argArr) { argArr[0].Css.cursor = micon });
      this.States[VUI_MOUSE_OUT].Scripts.add(function(argArr) { argArr[0].Css.cursor = 'default' });
    }
  
    /* set mouse event handlers */
    this.tgl_event((this.flags & VUI_HMOUSE_DOWN), VUI_MOUSE_DOWN, 'onmousedown', true);
    this.tgl_event((this.flags & VUI_HMOUSE_MOVE), VUI_MOUSE_MOVE, 'onmousemove', true);
    this.tgl_event((this.flags & VUI_HMOUSE_OVER), VUI_MOUSE_OVER, 'onmouseover', true);
    this.tgl_event((this.flags & VUI_HMOUSE_OUT), VUI_MOUSE_OUT, 'onmouseout',true);
    this.tgl_event((this.flags & VUI_HFORM_FOCUS), VUI_FORM_FOCUS, 'onfocus',true);
    this.tgl_event((this.flags & VUI_HFORM_BLUR), VUI_FORM_BLUR, 'onblur',true);
    this.tgl_event((this.flags & VUI_HMOUSE_DBL_CLICK), VUI_MOUSE_DBL_CLICK, 'ondblclick',true);
    
    if(this.T.nodeType == 'input' || this.T.nodeType == 'textarea' || this.T.nodeType == 'select') {
      this.tgl_event((this.flags & VUI_HKEY_UP), VUI_KEY_UP, 'onkeyup',true);
      this.tgl_event((this.flags & VUI_HKEY_DOWN), VUI_KEY_DOWN, 'onkeydown',true);
    }
  
    this.blockIETransparency = (this.T.blockIETransparency);
    /* transparency */ 
    if(this.T.t) {
      this.set_transparency(this.T.t);
    }

    /* image src */
    if(this.T.img_src)
      this.Base.src = this.T.img_src;

    /* set styles */ 
    var css;
    for(css in this.T.Css) {
      this.Css[css] = this.T.Css[css];
    }
    
    /* build childs */
    for(i in this.C) {
      this.C[i].build(this.Base);
    }
 
    this.align_childs();
 
    if(this.T.innerHTML)
      this.Base.innerHTML = this.T.innerHTML;
  
    if(this.T.type)
      this.Base.setAttribute('type', this.T.type);
    
    /* append node to document */
    this.dock(toNode);
    
    if(this.attachTo) {
      this.stick(
        this.attachTo.Element, 
	this.attachTo.offsetX, 
	this.attachTo.offsetY, 
	this.attachTo.direction,
	this.attachTo.offsetZ
      );
    }
    
    this.event_execute('onbuild');
   
    return 1;
  };
   
  /***************************************************************************/
  /** Function: call_ondock
    *
    * This function triggers the <ondock> event on this element and all
    * its child elements recursivly
    */
  
  this.call_ondock = function() {
    var c;
    this.event_execute('ondock');
    for(c in this.C)
      this.C[c].call_ondock();
  };  
   
  /***************************************************************************/
  /** Function: check_focus
    *
    * See if this element or any of its child elements has focus. 
    *
    * Parameters:
    *
    *	<int focusType> - if submitted the function checks if the element has
    *   focus of the submitted type	
    *
    * Returns:
    *
    *	int - focus type if element has focus
    *	int - 0 if no focus is found
    *
    * See also:
    *
    *	<set_focus_node>, <lose_focus_node>
    *
    */
  
  this.check_focus = function(focusType) {
    var c;

    if(!this.Manager.focusedElement)
      return 0;

    if(this == this.Manager.focusedElement) {
      if(!focusType || focusType == this.hasFocus)
        return this.hasFocus;
    }
  
    var f;
  
    for(c in this.C) {
      if( (f=this.C[c].check_focus(focusType)) )
        return f;
    }
  
    return 0;
  }; 
  
  /***************************************************************************/
  /** Function: clear
    *
    * Removes all child HTML nodes from the HTML node that is controlled by
    * this element
    *
    * Parameters:
    *
    *	<HTMLNode replacement> - Optional node to be added to the HTML node
    *	controlled by this element after clearing.
    *
    * See also:
    *
    *	<kill>
    *
    * Example:
    *
    * (start code)
    * // all child elements will be removed from myNode
    * myNode.clear();
    *
    * // all child elements will be removed from myNode
    * // and a new div node will be appended
    * myNode.clear(htmlnode('div'));
    * (end)
    */
  
  this.clear = function(replacement) {
    if(!this.Base)
      return 0;
    while(this.Base.childNodes[0])
      this.Base.removeChild(this.Base.childNodes[0]);
    if(replacement)
      this.Base.appendChild(replacement);
  };  
 
  /***************************************************************************/
  /** Function: clone_event
    *
    * Clones a vegUI event
    *
    * Paramters:
    *
    *	var event - can hold a <VegUIDynFunc> object or a generic function
    *
    * Returns:
    *
    *	var event - cloned event
    *
    */

  this.clone_event = function(Template) {
    return (typeof Template == 'function') ? Template : new Clone(Template);
  };
 
  /***************************************************************************/
  /** Function: clone_node
    * 
    * Clones the children and properties of a template element to this element
    * 
    * Template elements are vegUI elements that have not been built.
    * 
    * Alias:
    *
    *	clone()
    *
    * Parameters:
    *
    *	VegUIElement Template - Template element to clone from
    *
    * Returns:
    *
    *	VegUIElement - this
    *
    * Example:
    *
    * (start code)
    * // yourNode will take over the template settings from myNode.
    * // This will only work as long as myNode is still in template
    * // mode and has not been built yet
    * 
    * yourNode.clone(myNode);
    * (end)
    */
  
  this.clone = this.clone_node = function(Template) {
    var i, c;
  
    /* Clone template properties */
  
    merge(this.T, Template.T);
    this.flags = Template.flags;
    for(i in Template.States) {
      this.States[i].Scripts.Funcs = cloneArray(Template.States[i].Scripts.Funcs);
      merge(this.States[i].P, Template.States[i].P);
    }  

    /* Clone Event Handlers */

    this.onmove = this.clone_event(Template.onmove);
    this.onresize = this.clone_event(Template.onresize);
    this.ondock = this.clone_event(Template.ondock);
    this.onchange = this.clone_event(Template.onchange);
    this.onkill = this.clone_event(Template.onkill);
    this.onfocusset = this.clone_event(Template.onfocusset);
    this.onfocuslose = this.clone_event(Template.onfocuslose);
    this.onbuild = this.clone_event(Template.onbuild);

    this.noAutoShow = Template.noAutoShow;

    /* Clone BBox */
    
    this.BBox.set(
      Template.BBox.x,
      Template.BBox.y,
      Template.BBox.w,
      Template.BBox.h,
      Template.BBox.enabled
    );
  
    /* Clone Childs Elements */
    
    for(c in Template.C) {
      if(!this.C[c] || this.C[c].type != Template.C[c].type) 
        this.add_child(c, Template.C[c].type);
      this.C[c].clone(Template.C[c]);
    }

    return this;
  }; 

  /***************************************************************************/
  /** Function: clone_children
    * clone multiple children that are of the same type from the same template
    *
    * Parameters:
    *
    *	int type - vegui type of the children (eg <VUI_NODE))
    *	vegUIElement T - template to clone from
    *	<bool rec> - if true children will be cloned recursively, else only
    *	direct children of this element will be cloned
    *	(default: false)
    *
    */

  this.clone_children = function(type, T, rec) {
    var i;
    for(i in this.C) {
      if(this.C[i].type == type) {
        this.C[i].clone(T);
	if(rec)
	  this.C[i].clone_children(type, T, rec);
      }
    }
  };

  /***************************************************************************/
  /** Function: control
    *
    * Takes control over an existing HTML node
    *
    * Parameters:
    *
    * 	HTMLNode Node - HTML node to take control over
    *
    * Returns:
    *
    *	VegUIElement - itself
    *
    * Example:
    *
    * (start code)
    * // myNode will take control over an existing html element
    *
    * myNode.control(document.getElementById('some_element'));
    * myNode.move(50,50);
    * (end)
    */
  
  this.control = function(Node) {
    if(!Node)
      return;

    this.Base = Node;
    this.Css = Node.style;
    return this;
  }; 
  
  /***************************************************************************/
  /** Function: detach_node
    *
    * Detaches an attached element that was attached to this element via
    * <attach_node>.
    *
    * Alias:
    *
    *	detach()
    *
    * Parameters:
    *
    * VegUIElement Element - element you want to detach
    *
    * See also:
    *
    *	<attach_node>
    *
    * Example:
    *
    * (start code)
    * myNode.attach(yourNode);
    * myNode.detach(yourNode);
    * (end)
    */

  this.detach_node = this.detach = function(Element) {
    if(this.Attached[Element.eleIdx]) {
      Element.attachTo = null;
      delete this.Attached[Element.eleIdx];
    }
  };
  
  /***************************************************************************/
  /** Function: disable_node
    *
    * Toggles the <VUI_DISABLED> flag on this element
    *
    * Alias:
    *
    *	disable()
    *
    * Parameters:
    *
    *	bool b - if true flag is toggled on, if false flag is toggled off
    */
  
  this.disable = this.disable_node = function(b) {
    if(b && !(this.flags & VUI_DISABLED))
      this.flags |= VUI_DISABLED;
    else if(!b && (this.flags & VUI_DISABLED))
      this.flags ^= VUI_DISABLED;
  };
  
  /***************************************************************************/
  /** Function: dock
    * 
    * Appends the HTML node controlled by this element to another HTMLnode
    *
    * Parameters:
    *
    * 	HTMLNode toNode - the HTMLNode that shall serve as a parent
    *
    * See also:
    *
    *	<undock>
    *
    * Example:
    *
    * (start code)
    * myNode.dock(document.body);
    * (end)
    */

  this.dock = function(toNode, insertBefore) {
    if(!this.Base)
      alert('CRITICAL ERROR: COULD NOT DOCK NODE TO DOCUMENT, REASON: NO NODE ('+this.refName + ',' + this.childName +')');
    if(!toNode || !this.Base)
      return;

    this.T = {Css:{}};
    if(!insertBefore)
      toNode.appendChild(this.Base);
    else {
      toNode.insertBefore(this.Base, insertBefore);
    }
    this.call_ondock();
  }; 
  
  /***************************************************************************/
  /** Function: event_add 
    * Adds a function to be executed to a vegui element event
    *
    * Parameters:
    *
    *	string eventName - name of the target event
    *	function func - function to be executed on the event
    *	<var funcId> - optional unique id of the function 
    *
    * See also:
    *
    *	<event_execute>
    *
    * Example:
    *
    * (start code)
    * myNode.event_add('onresize', function() { alert('test'); });
    * (end)
    */

  this.event_add = function(eventName, func, funcId) {
    
    /* if the event does not exist yet create a new VegUIDynFunc object */

    if(!this[eventName] || !this[eventName].add) {
      this[eventName] = new VegUIDynFunc();
    }

    this[eventName].add(func, funcId);
  };

  /***************************************************************************/
  /** Function: event_execute
    *
    * Fires a vegUI event
    *
    * Parameters:
    *
    *	string eventName - name of the event
    *	<array args> - arguments
    *	
    * See also:
    *
    *	<event_execute>
    *
    */

  this.event_execute = function(eventName, args) {
    
    if(!this[eventName])
      return;
    
    /* event points to normal function, execute it and bail, this is 
     * to support the old vegui event types pre 2.0.4
     */
     
    if(typeof this[eventName] == 'function')
      return this[eventName](args);
    else if(this[eventName].execute)
      return this[eventName].execute([this, args]);
  };
  
  /***************************************************************************/
  /** Method: event_listener_set
    *
    * Add function to event listener of the node controlled by this element
    *
    * Parameters
    *
    *	string eventName - name of the event (ie. 'onclick' or 'onmousedown')
    *	function func - function to be added
    *	<HTMLNode n> - if submitted the event listener will be added to this
    *	node instead of the node controlled by the element
    *	
    */

  this.event_listener_set = function(eventName, func, n) {
    if(!n)
      var n = this.Base;
    if(n.attachEvent) {
      n.attachEvent(eventName, func);
    } else if(n.addEventListener) {
      n.addEventListener(eventName.substr(2), func, false);
    }
  };

 
  /***************************************************************************/
  /** Function: find_common_parent
    *
    * Find the first common vegui Parent that this element and Obj share
    *
    * Parameters:
    * 
    *	VegUIElement Obj - VegUI element
    *
    * Returns:
    *
    *	VegUIEleemnt - parent element if one is found
    *	null - if no parent element is found
    *
    * See also:
    *
    *	<is_parent>
    *
    * Example:
    *
    * (start code)
    * var node1 = existingNode.add_child('node1', VUI_NODE);
    * var node2 = existingNode.add_child('node2', VUI_NODE);
    * var node3 = node2.add_child('node3', VUI_NODE);
    *
    * // would return a reference to existingNode
    * return node3.find_common_parent(node1);
    *
    * (end)
    */
  

  this.find_common_parent = function(Obj) {
    var p = this;

    while( (p = p.Parent) && p != this.Manager ) { 
      if(Obj.is_parent(p))
        return p;
    }
    return null;
  };
  
  /***************************************************************************/
  /** Function: height
    * 
    * Returns:
    *
    *	int - the height of the HTML node controlled by this element
    *	null - if no HTML node is currently controlled
    *
    * See also:
    *
    *	<width>, <x>, <y>, <x2>, <y2>
    */

  this.height = function() {
    if(!this.Base)
      return null;
    return (this.Css.height ? parseInt(this.Css.height) : this.Base.offsetHeight);
  };
   
  /***************************************************************************/
  /** Function: hevent_node
    *
    * *private function*
    *
    * This function gets called whenever a mouse or keyboard event is
    * handled by this element.It executes all the functions stored
    * in the <VegUIMouseState> State property of this element for the
    * event in question and sets the event specific properties.
    *
    * Alias:
    *
    *	hevent()
    *
    * Parameters:
    *
    *	int eventType - <Mouse and keyboard event types>
    *	Event mEvent - javascript event object
    *
    * Returns:
    *
    *	bool - returnVal property of the Scripts property of the
    *	affected VegUIMouseState
    *
    * See also:
    *
    *	<tgl_event>
    *
    */
  
  this.hevent = this.hevent_node = function(eventType, mEvent) {
    if(!this.Base || typeof(VUI_DISABLED) == "undefined" || (this.flags & VUI_DISABLED))
      return 0;

    var _state = this.States[eventType], _p = _state.P, i;

    /* change node properties */
    
    if(_p.className) {
      this.Base.className = _p.className;
    }

    this.mEvent = mEvent;
    
    /* handle mouse wheel event */

    if(eventType == VUI_MOUSE_WHEEL) {
      if(mEvent.wheelDelta) {
        this.delta = mEvent.wheelDelta/120;
        if(VUI_BROWSER_INFO.name == 'Opera' && VUI_BROWSER_INFO.version <= 9)
          this.delta = -this.delta;
      } else if (mEvent.detail)
        this.delta = -mEvent.detail/3;
    }

    /* handle key down event */
  
    else if(eventType == VUI_KEY_DOWN) {
      this.aKey = mEvent.which ? mEvent.which : mEvent.keyCode;
      this.aKeyChar = String.fromCharCode(this.aKey);
    } else if(eventType != VUI_KEY_UP) {
      if(eventType == VUI_MOUSE_DOWN) {
        this.aButton = mEvent.which ? mEvent.which : mEvent.button;
      }
      this.toE = (mEvent.relatedTarget || mEvent.toElement); 
    } 
    
    /* handle key up event */

    this.keyShift = mEvent.shiftKey ? true : false;
    this.keyCtrl = mEvent.ctrlKey ? true : false;
    this.keyAlt = mEvent.altKey ? true : false;

    /* execute all the functions stored in the dynamic function object 
     * of the state for the event triggered 
     */
 
    _state.Scripts.execute([this]);
    
    /* call on state change */
  
    this.on_state_change();
    
    return _state.Scripts.returnVal;
  };
  
  /***************************************************************************/
  /** Function: hide
    * 
    * toggles this element to be invisible or visible
    *
    * Parameters:
    *
    *	bool b - if true the element will be made invisible, if false the
    *	element will be made visible
    *
    * See also:
    *
    *	<is_hidden>
    *
    * Example:
    *
    * (start code)
    * myNode.hide(1); // node is hidden
    * myNode.hide(0); // node is visible again
    * (end)
    */
  
  this.hide = function(b) {
    if(!this.Base)
      return;
    var _c;
    this.Css.visibility = b ? 'hidden' : '';
    for(_c in this.C) {
      if(!this.C[_c].noAutoShow)
        this.C[_c].hide();
    }
    this.event_execute('onhide');
  };
  
  /***************************************************************************/
  /** Function: is_hidden
    *
    * Checks if the HTML node controlled by this element is hidden or 
    * visible
    *
    * Returns:
    *
    *	bool - true if hidden
    *	bool - false if visible
    *
    * See also:
    *
    *	<hide>
    *
    * Example:
    *
    * (start code)
    * myNode.hide(1);
    * return myNode.is_hidden(); // returns true
    * (end)
    */

  this.is_hidden = function() {
    if(!this.Base)
      return null;
    return (this.Css.visibility == 'hidden' ? true : false);
  }; 
   
  /***************************************************************************/
  /** Function: is_parent
    *
    * Check if a vegui element is the parent element of this element somewhere
    * down the parent chain
    *
    * Parameters:
    *
    *	VegUiElement Obj - VegUI element to check 
    *
    * Returns:
    *
    *	int - *1* if Obj is the parent of this element
    *
    *	int - *0* if Obj is not the parent of this element
    *
    * See also:
    *
    *	<find_common_parent>
    *
    * Example:
    *
    * (start code)
    * myNode = pNode.add_child('myNode', VUI_NODE);
    * return myNode.is_parent(pNode); // returns true
    * (end)
    */
  
  this.is_parent = function(Obj) {
    var p = this;

    while( (p = p.Parent) ) {
      if(p == Obj)
        return 1;
    }
    return 0;
  };
  
  /***************************************************************************/
  /** Function: kill 
    *
    * Removes the HTMLnode controlled by this element and/or destroys the
    * element it self. The <onkill> event is called by this function
    *
    * Parameters
    *
    *	bool removeSelf - if true this element will be unlinked from the 
    *	manager and destroyed
    *	bool keepBase - if true the HTML node controlled by this element
    *	will not be destroyed
    *
    * See also:
    *
    *	<clear>
    *
    * Example:
    *
    * (start code)
    * myNode.kill(); // only the html node is removed from the document
    * myNode.kill(1); // html node is removed from the document and element is destroyed
    * myNode.kill(1,1); // only the vegui element is destroyed
    * (end)
    */

  this.kill = function(removeSelf, keepBase) {
    
    if(this.Base && this.Base.parentNode && !keepBase) {
      if((browser_str.indexOf('msie')+1))
        iesucks(this.Base);
      this.Base.parentNode.removeChild(this.Base);
    }

    this.event_execute('onkill', [removeSelf]);

    if(removeSelf){
      var c,p;
      for(c in this.C) 
        this.C[c].kill(1);

      if(this.Parent)
        delete this.Parent.C[this.childName];
      delete this.Manager.E[this.eleIdx];
      if(this.winIdx) {
	delete this.Manager.W[this.winIdx];
      }
    }
  
  }; 
 
  /***************************************************************************/
  /** Function: lose_focus_node
    *
    * Takes focus away from this element, the first parent that can have focus
    * set on it will gain passive focus.
    *
    * Alias:
    *
    *	lose_focus()
    *
    * Paramters:
    *
    *	<bool bail> - if true the next focusable parent of this child will not gain
    *	focus
    *
    * See also:
    *
    *	<set_focus_node>, <check_focus>
    */
  
  this.lose_focus = this.lose_focus_node = function(bail) {
    var p = this;

    if(this.lockFocus)
      return false;

    this.hasFocus = false;
    this.Manager.focusedElement = null;
    this.Manager.focusedType = null;
    
    this.event_execute('onfocuslose');

    if(bail)
      return true;
 
    /*
     * find the first parent of the node that can have focus and 
     * set it there
     */
  
    while( (p = p.Parent) ) {
      if(p.canFocus) {
        p.set_focus();
        return;
      }
    }  
  };
  
  /***************************************************************************/
  /** Function: move
    *
    * moves the HTML node controlled by this element to new coordinates
    *
    * Parameters:
    *
    *	int x - new x position (pixels)
    *	int y - new y position (pixels)
    *
    * See also:
    *
    *	<set_x>, <set_y>
    *
    * Example:
    *
    * (start code)
    * myNode.move(5, 15);
    * (end)
    */
  
  this.move = function(x, y) {
    this.set_x(x);
    this.set_y(y);
    
    var a,A,z,l;
    
    /*for(a = 0, l = this.Attached.length; a < l; a++) {
    */
    
    for(a in this.Attached) {
      A = this.Attached[a];
      
      if(!A.Element.Base)
        continue;
      
      A.Element.stick(this, A.offsetX, A.offsetY, A.direction, A.offsetZ);
    }
    
    this.event_execute('onmove');
  }; 
 
  /***************************************************************************/
  /** Functions: event handlers
    *
    *	onmove 		- called when the element is moved via the <set_x>, 
    *	<set_y> or <move> methods
    *	onresize	- called when the element is resized via the 
    *	<set_width>, <set_height> or <resize> methods
    *	ondock 		- triggered by <dock> method
    *	onchange 	- varies from element to element
    *	onkill 		- triggered by <kill> method
    *	onfocusset	- triggered when element gains focus
    *	onfocuslose	- triggered when element loses focus
    *	onbuild 	- triggered after element was built
    *	onhide 		- triggered by <hide> method
    */
  
  /***************************************************************************/
  /** Function: overlaps
    *
    * Checks if this element overlaps with another element. Overlapping meaning
    * they collide somewhere and one is covered by the other.
    *
    * Be aware that this function only checks coordinates, it does not matter
    * if the two nodes arent children of the same parent node, if their
    * coordinates and proportions collide - even in theory - the function
    * will return the overlapping percentage.
    * 
    * Parameters:
    *
    *	VegUIElement Node - vegui element to check against
    *	<int yDiffS> - *experimental* manipulate y position of this element
    *	<int yDiffT> - *experimental* manipulate y position of Node
    *
    * Returns:
    *
    *	int - overlapping percentage value is returned (0-100) 
    */

  this.overlaps = function(Node, yDiffS, yDiffT) {
  
    if(!this.Base || !Node.Base)
      return 0;

    var x = this.x(), y = this.y(), b = this.y2(), r = this.x2();
    var tX = Node.x(), tY = Node.y(), tB = Node.y2(), tR = Node.x2();

    var h = this.height(), w = this.width(), tW = Node.width(), tH = Node.height();

    if(!isNaN(yDiffS)) {
      y += yDiffS;
      h -= yDiffS;
    }

    if(!isNaN(yDiffT)) {
      tY += yDiffT;
      tH -= yDiffT;
    }

    var olW=0, olH=0;

    if(x <= tX && r >= tR)
      olW = tW;
    else if(x <= tX && r <= tR && r >= tX)
      olW = r - tX;
    else if(x >= tX && r <= tR)
      olW = w;
    else if(x >= tX && r >= tR && x <= tR)
      olW = tR - x;

    if(!olW)
      return 0;

    if(y <= tY && b >= tB)
      olH = tH;
    else if(y <= tY && b <= tB && b >= tY)
      olH = b - tY;
    else if(y >= tY && b <= tB)
      olH = h;
    else if(y >= tY && b >= tB && y <= tB)
      olH = tB - y;

    if(!olW)
      return 0;
  
    return (olH * olW) / ((tH * tW) / 100);
  };
  
  /***************************************************************************/
  /** Function: resize
    *
    * resizes the HTML node controlled by this element
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	bool noAlign - if true <align_childs> method will not be called
    *
    * See also:
    *
    *	<set_width>, <set_height>
    */

  this.resize = function(w, h, noAlign) {
    this.set_width(w, 1);
    this.set_height(h, 1);
    if(!noAlign)
      this.align_childs();
    this.event_execute('onresize');
    return true;
  }; 
 
  /***************************************************************************/
  /** Function: set_focus_node
    *
    * Gives focus to the element. When an element has focus the manager
    * that spawned that element knows where to direct certain keyboard
    * and mouse events to
    *
    * Alias:
    *
    *	set_focus()
    *
    * Parameters:
    *
    *	int focusType = <Focus types>
    *
    * Returns:
    *
    *	int - 1
    *	int - 0 if focs is currently on a node that has it's lockFocus
    *	property set to true
    *
    * See also:
    *
    *	<lose_focus_node>, <check_focus>
    */
  
  this.set_focus = this.set_focus_node = function(focusType) {
  
    /*
     * if none of this nodes childs currently have focus, set focus
     * to this node and its parents 
     */

     if(this.check_focus(focusType))
       return 1;
 
     if(this.Manager.focusedElement) {
       var E = this.Manager.focusedElement;
       if(!E.lockFocus)
         E.lose_focus(true);
       else
         return 0;
     }

     this.Manager.focusedElement = this;

     this.canFocus = true;
     this.hasFocus = (focusType ? focusType : VUI_FOCUS_PASSIVE);
  
     this.event_execute('onfocusset');
   
     this.Manager.focusedType = this.hasFocus;

     return 1;
  }; 
  
  /***************************************************************************/
  /** Function: set_height
    * 
    * sets the height of the HTML node controlled by this element
    *
    * Parameters:
    *
    *	int n - height (pixels)
    *	bool noAlign - if true the <align_childs> method will not be called
    * 
    * See also:
    *
    *	<set_width>, <resize>
    */
 
  this.set_height = function(n, noAlign) {
    if(!this.Base || isNaN(n) || n < 1)
      return;
    this.Css.height = n + "px";
    if(!noAlign)
      this.align_childs();
  };
  
  /***************************************************************************/
  /** Function: set_marg
    *
    * *Template Function*
    *
    * Sets the margins of this element in relation to the proportions of it's
    * parent element
    *
    * Parameters:
    *
    *	int rmarg - right margin (pixels)
    *	int bmarg - bottom margin (pixels)
    *	int rmarg_nr - right margin , no resize - node will be moved to meet 
    *	margin (pixels)
    *	int bmarg_nr - bottom margin, no resize - node will be moved to meet
    *	margin (pixels)
    *
    * Code Example:
    *
    * This would resize this element whenever the proportions of it's parents
    * change to leave a space of 5 pixels between the element's right and 
    * bottom border and the parent's right and bottom border
    *
    * (start code)
    * myNode.set_marg(5,5);
    * (end)
    *
    * See also:
    *
    *	<set>, <set_node>, <align_childs>
    *
    */
  
  this.set_marg = function(rmarg, bmarg, rmarg_nr, bmarg_nr) {
    this.T.rmarg = rmarg;
    this.T.bmarg = bmarg;
    this.T.rmarg_nr = rmarg_nr;
    this.T.bmarg_nr = bmarg_nr;
  };
  
  /***************************************************************************/
  /** Function: set_node
    * 
    * *Template Function*
    *
    * Sets the most common template properties for this element. Properties
    * will only be (re)set if valid values are submitted. So if you do
    * wish to ommit certain properties submit them as null
    *
    * Alias: 
    *	
    *	set()
    *
    * Parameters:
    *
    *	string nodeType - HTML tag name (ie 'div')
    *	int w -	width (pixels)
    *	int h - height (pixels)
    *	int x - position on the x axis (pixels)
    *	int y - position on the y axis (pixels)
    *	string pos - CSS position (ie 'absolute'), default = 'absolute'
    *	int z - z index
    *
    * See also:
    *
    *	<set_marg>
    *
    * Example:
    *
    * (start code)
    * myNode.set('div', 50, 50, 5, 5, 'absolute', 15);
    * Manager.build_element(myNode);
    * (end)
    */
  
  this.set = this.set_node = function(nodeType, w, h, x, y, pos, z) {
    if(nodeType) this.T.nodeType = nodeType;
    if(!isNaN(w) && w > 0) this.T.w = w;
    if(!isNaN(h) && h > 0) this.T.h = h;
    if(x != null) this.T.x = x;
    if(y != null) this.T.y = y;
    if(pos) this.T.pos = pos;
    if(z) this.T.z = z;
  }; 
  
  /***************************************************************************/
  /** Function: set_pos
    *
    * sets the CSS position of the HTML node controlled by this element
    *
    * Parameters:
    *
    * 	string pos - css position value (ie 'absolute')
    *	int n - z index
    *
    * Example:
    *
    * (start code)
    * myNode.set_pos('absolute', 15);
    * (end)
    */
  
  this.set_pos = function(pos, n) {
    if(!this.Base)
      return;
    if(pos) 
      this.Css.position = pos;
    if(!isNaN(n)) {
      this.Css.zIndex = n;
      
      var a,A;
      for(a in this.Attached) {
        A = this.Attached[a];
        A.Element.stick(
	  this, A.offsetX, A.offsetY, A.direction, A.offsetZ
	);
      }
      
    }
  };

  /***************************************************************************/
  /** Function: set_transparency
    *
    * Set the CSS transparency of the HTML node that is controlled by this
    * element.
    *
    * Parameters:
    *
    *	int n - transparency value (percent, 0- 100)
    *	bool noIe - deprecated
    *
    * Example:
    *
    * (start code)
    * myNode.set_transparency(50); // 50% transparent
    * (end)
    *
    */
  
  this.set_transparency = function(n, noIe) {
    if(n > 100)
      var n = 100;

    if(!noIe && !this.blockIETransparency)
      this.Css.filter = 'alpha(opacity=' + n +')';
    this.Css.opacity = n / 100;
    this.Css.MozOpacity = n / 100;
    this.transparency = n;
  };
  
  /***************************************************************************/
  /** Function: set_width
    * 
    * sets the width of the HTML node controlled by this element
    *
    * Parameters:
    *
    *	int n - width (pixels)
    *	bool noAlign - if true the <align_childs> method will not be called
    * 
    * See also:
    *
    *	<set_height>, <resize>
    */
  
  this.set_width = function(n, noAlign) {
    if(!this.Base || isNaN(n) || n < 1)
      return;
    
    this.Css.width = n + "px";
    
    if(!noAlign)
      this.align_childs();
  }; 
 
  /***************************************************************************/
  /** Function: set_x
    *
    * repositions the HTML node controlled by this element on the x axis
    * 
    * Parameters:
    *
    *	int n - position (pixels)
    *
    * See also:
    *
    *  <set_y>, <move>
    */
  
  this.set_x = function(n) {
    if(!this.Base || n === null || isNaN(n) || this.BBox.validate(n, null))
      return;
    this.Css.left = n + "px";
  };
 
  /***************************************************************************/
  /** Function: set_y
    *
    * repositions the HTML node controlled by this element on the y axis
    * 
    * Parameters:
    *
    *	int n - position (pixels)
    *
    * See also:
    *
    *  <set_x>, <move>
    */
 
  this.set_y = function(n) {
    if(!this.Base || n === null || isNaN(n) || this.BBox.validate(null, n))
     return;
    this.Css.top = n + "px";
  };
 
  /***************************************************************************/
  /** Function: stick
    *
    * Sticks the element to another element at a certain offset
    *
    * Parameters:
    *
    *	VegUIElement toElement - element to stick to
    *	int offsetX  - x axis offset (px)
    *	int offsetY - y axis offset (px)
    *	int direction - <VUI_FRONT> or <VUI_BACK>
    *	int offsetZ - z offset
    *	
    *
    */

  this.stick = function(toElement, offsetX, offsetY, direction, offsetZ) {
    if(!toElement.Base || !this.Base)
      return;
   
    if(!offsetZ)
      var offsetZ = 1;

    this.dock(toElement.Base.parentNode);

    switch(direction) {
      case VUI_BACK: this.Css.zIndex = parseInt(toElement.Css.zIndex) - offsetZ; break;
      case VUI_FRONT: this.Css.zIndex = parseInt(toElement.Css.zIndex) + offsetZ; break;
      default: break;
    }

    this.move(
      toElement.x() + offsetX, toElement.y() + offsetY
    );
  };
 
  /***************************************************************************/
  /** Function: tgl_event
    *
    * *private function*
    * 
    * Toggles event handling for a certain mouse or keyboard event on or off.
    * This function is called automatically by the <build> method if the
    * flags property of this element has event handling enabled for a
    * certain keyboard or mouse event
    *
    * Parameters:
    *
    *	bool b - toggle on or off (true / false)
    *	int eventType - <Mouse and keyboard event types>
    *	string nodeProp - dom event name (ie onmousemove for VEGUI_MOUSE_MOVE)
    *	bool ret - this will be returned by the mouse event on the node
    * 
    * See also:
    *
    *	<hevent_node>
    *
    */
  
  this.tgl_event = function(b, eventType, nodeProp, ret) {
    if(b) {
      var Obj = this;
      this.States[eventType].Scripts.returnVal = ret;
      
      this.event_listener_set(
        nodeProp, function(e) {
	  if(!e)
	    var e = event;
	  return Obj.hevent(eventType, e)
	}
      );
      
      /*
      this.Base[nodeProp] = function(e) {
        if(!e) var e = event;
        return Obj.hevent(eventType, e);
      };
      */
    } else if(this.Base[nodeProp])
      this.Base[nodeProp] = null;
  };
 
  /***************************************************************************/
  /** Function: undock
    *
    * Removes the HTML node controlled by this element from its current
    * parentNode.
    *
    * Returns:
    *
    *	HTMLNode - the parentNode the HTML node was attached to
    *
    * See also:
    *
    *	<dock>
    *
    * Example:
    *
    * (start code)
    * myNode.dock(document.body);
    * myNode.undock();
    * (end)
    */
  
  this.undock = function() {
    if(!this.Base || !this.Base.parentNode)
      return null;
    var _par = this.Base.parentNode;
    _par.removeChild(this.Base);
    return _par;
  }; 
  
  /***************************************************************************/
  /** Function: width
    * 
    * Returns:
    * 	
    *	int - the width of the HTML node controlled by this element
    *	null - if no HTML node is currently controlled
    *
    * See also:
    *
    *	<height>, <x>, <y>, <x2>, <y2>
    */
  
  this.width = function() {
    if(!this.Base)
      return null;
    
    return (this.Css.width ? parseInt(this.Css.width) : this.Base.offsetWidth);
  };
 
  /***************************************************************************/
  /** Function: x 
    *
    * Returns:
    * 
    *   int - the x position of the HTML node controlled by this element
    *	null - if no HTML node is controlled by this element
    *
    * See Also:
    *
    *	<y>, <x2>, <y2>, <abs_x>, <abs_y>
    */
 
  this.x = function() {
    if(this.Css.left !== '')
      return (this.Base ? (parseInt(this.Css.left) || 0) : null);
    else
      return this.Base.offsetLeft;
  };
   
  /***************************************************************************/
  /** Function: x2
    *
    * Returns:
    *
    *	int - the right position of the HTML node controlled by this element
    *	null - if no HTML node is controlled by this element
    *
    * See also:
    *
    *	<y2>, <x>, <y>, <abs_x>, <abs_y>
    */
  
  this.x2 = function() {
    if(!this.Base)
      return null;
    return (this.x() + this.width());
  };
 
  /***************************************************************************/
  /** Function: y
    *
    * Returns:
    *
    *	int - the y position of the HTML node controlled by this element
    * 	null - if no HTML node is controlled by this element
    *
    * See also:
    *
    *	<x>, <x2>, <y2>, <abs_x>, <abs y>
    */
  
  this.y = function() {
    if(this.Css.top !== '')
      return (this.Base ? (parseInt(this.Css.top) || 0) : null);
    else
      return this.Base.offsetTop;
  };

  /***************************************************************************/
  /** Function: y2
    *
    * Returns:
    *
    *   int - the bottom position of the HTML node controlled by this element
    *   null - if no HTML node is controlled by this element
    *
    * See also:
    *
    *	<x2>, <x>, <y>, <abs_x>, <abs_y>
    */

  this.y2 = function() {
    if(!this.Base)
      return null;
    return (this.y() + this.height());
  }; 


}

/******************************************************************************
 * V E G U I M A N A G E R
 *****************************************************************************/
/** Class: VegUIManager
  * Spawns and keeps track of all vegUI elements 
  *
  * Notes: Tutorials
  *
  *	http://www.vegui.org/site/blog/5/vegui-tutorial-01---getting-started.html
  *
  * Notes: Hierarchy
  *
  * *extends vegUINode*
  *
  * (start code)
  * VegUINode
  *	|
  *	|
  *	+-- VegUIManager
  * (end)
  *
  * Type:
  *
  *	<VUI_MANAGER>
  *
  * Notes: Child Elements
  *
  *	WinShadow - *VUI_NODE*, Window 'shadow' that the user sees while 
  *	resizing or dragging window elements
  *
  * Properties: Object Properties
  *
  *	eleIdx - *int*, element index counter
  *	winIdx - *int*, special index counter for elements of type <VUI_WIN>
  *	Elements - *Array*, Holds all currently spawned elements
  *	Windows - *Array* Holds all currently spawned windows
  *	Bridge - <VegUIBridge>, common <VegUIBridge> object, null until 
  * 	<init_bridge> method is called
  *	VegUIFX FX - <VegUIFXManager>, common <VegUIFXManager> object, null until <init_fx>
  *	method is called
  *	VegUITaskbar Taskbar - link to a taskbar element that shell hold
  *	the windows spawned by this manager
  * 
  
  */

vui_module_add(VUI_MANAGER, VegUIManager, 'vegui.std.js');

/*****************************************************************************/
/** Constructor: VegUIManager
  * *Constructor* 
  *
  * Parameters:
  *
  *	string refName - name of the object
  *
  */

function VegUIManager(refName) {
  this.constructor = VegUINode;
  this.constructor(refName, null, this);
  
  /* objects */
  this.type = VUI_MANAGER;
  this.eleIdx = 0;
  this.winIdx = 0;
  this.Elements = this.E = {};
  this.Windows = this.W = {};

  this.blockKeys = [];

  this.Manager = this;
  this.Bridge = null;
  this.FX = null;
  
  this.Taskbar = null;

  this.flags |= VUI_HMOUSE_UP | VUI_HMOUSE_OUT | VUI_HMOUSE_MOVE;
  
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Method: block key
    *
    * Attempts the prevention of the default browser action for a certain 
    * keyboard key code
    *
    * Paramters:
    *
    *	array keyCode - key codes to block
    *
    * See also:
    *
    *	<unblock_key>
    *
    * Example:
    *
    * (start code)
    * // user should not be able to scroll the browser window using
    * // the arrow keys anylonger
    * 
    * Manager.block_key([37,38,39,40]);
    * (end)
    */

  this.block_key = function(keyCode) {
    var i;
    for(i = 0; i < keyCode.length; i++)
      this.blockKeys.push(keyCode[i]);
  };
  
  /***************************************************************************/
  /** Method: build_element
    * 
    * builds a VegUIElement. This is the function that should be used to
    * build vegui elements, instead of calling the element's build method
    * whenever possible
    *
    * Parameters:
    *
    *	VegUIElement VegUIObj - vegui element to build
    *	<HTMLNode toNode> - if submitted the html node will be appended to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	int - *0* on failure
    *
    * See also:
    *
    *	<build_elements>, <VegUINode::build_node>
    *
    * Example:
    *
    * (start code)
    * myNode = Manager.get_new(VUI_NODE);
    * myNode.set('div',50,50);
    * myNode.T.Css.backgroundColor = 'black';
    * Manager.build_element(myNode);
    * (end)
    */
  
  this.build_element = function(VegUIObj, toNode) {
    if(!this.Base) return;
  
    if(!toNode) {
      var toNode = VegUIObj.Parent && VegUIObj.Parent.Base ? VegUIObj.Parent.Base : this.Base;
    }
  
    return VegUIObj.build(toNode);
  };

  /***************************************************************************/
  /** Method: build_elements
    *
    * builds multiple vegUI elements, if the last argument submitted to the
    * function is a HTML node then the element's will be built as children
    * of that node
    *
    * Added in:
    *
    *	2.0.6
    *
    * Parameters:
    *
    *  	VegUIElement ... - VegUIElement to be built
    *  	<HTMLNode toNode> - if submitted the elements will be built as children
    *  	of this node
    *
    * See also:
    *
    *	<build_element>
    *
    *
    * Example:
    *
    * (start code)
    * // myNode, myNode2 and myNode3 will be built from their template
    * // properties and then be appended to document.body
    *
    * Manager.build_elements(myNode, myNode2, myNode3, document.body);
    * (end)
    */

  this.build_elements = function() {

    if(!this.Base || !arguments.length)
      return null;

    if(arguments[arguments.length-1].nodeName) {
      var toNode = arguments[arguments.length-1];
    } else
      var toNode = null;
    
    var i;
    for(i = 0; i < arguments.length; i++) {
      if(!arguments[i].eleIdx)
        continue;
      this.build_element(arguments[i], toNode);
    }
  };
    
  /***************************************************************************/
  /** Method: build_manager
    *
    * builds the manager
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be
    *	appended to toNode
    *	<bool takeBody> - instead of building a new node, the manager
    *	will take over the body element instead.
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See also:
    *
    *	<VegUINode::build_node>
    *
    */

  this.build = this.build_manager = function(toNode, takeBody) {
    var Manager = this;
    if(!this.build_node(null, (takeBody ? document.body : null)))
      return null;
  
    /*
     * the manager node is the only node who
     * has an actual mouse up event handler
     */
  
    this.tgl_event(true, VUI_MOUSE_UP, 'onmouseup');
    this.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) {
        var Obj = argArr[0];
	if(Obj.focusedElement)
          Obj.focusedElement.hevent(VUI_MOUSE_UP, Obj.mEvent);
      }
    );
  
    /*
     * if a key press or release is detected on the site 
     * route it to the focusedElement 
     */
    
    this.onkeydown = function(e) {
      if(!e) var e = window.event;
      Manager.hevent(VUI_KEY_DOWN, e);
      if(Manager.key_is_blocked(Manager.aKey))
        return false;
      return true;
    };

    /* opera needs onkeypress, ie and mozilla need onkeydown
     * to work properly
     **/

    if(VUI_BROWSER_INFO.name == 'opera') 
      document.onkeypress = this.onkeydown;
    else 
      document.onkeydown = this.onkeydown;

    this.onkeyup = function(e) {
      if(!e) var e = window.event;
      Manager.hevent(VUI_KEY_UP, e);
      if(Manager.key_is_blocked(Manager.aKey))
        return false;
      return true;
    };

    document.onkeyup = this.onkeyup;


    if(window.addEventListener) {
      var mwname = (VUI_BROWSER_INFO.name == 'opera' ? 'mousewheel' : 'DOMMouseScroll');
      window.addEventListener(
        mwname, 
        function(e) {
          if(!e) var e = window.event;

          if(Manager.focusedElement && Manager.focusedType == VUI_FOCUS_ACTIVE) {
	    if(e.preventDefault)
	      e.preventDefault();
	    e.returnValue = false;
  	  }
  	  Manager.hevent(VUI_MOUSE_WHEEL, e);
        }, 
        false
      );
    } else {
      this.event_listener_set('onmousewheel', function(e) {
          if(!e) var e = window.event;
      
          if(Manager.focusedElement && Manager.focusedType == VUI_FOCUS_ACTIVE) {
            if(e.preventDefault)
              e.preventDefault();
            e.returnValue = false;
          }
      
          Manager.hevent(VUI_MOUSE_WHEEL, e);
        },
        document
      );
    }
  
    this.States[VUI_KEY_DOWN].Scripts.add(
      function(argArr) {
        if(argArr[0].focusedElement)
          argArr[0].focusedElement.hevent(VUI_KEY_DOWN, argArr[0].mEvent);
      }
    );

    this.States[VUI_KEY_UP].Scripts.add(
      function(argArr) {
        if(argArr[0].focusedElement)
          argArr[0].focusedElement.hevent(VUI_KEY_UP, argArr[0].mEvent);
      }
    );

    this.States[VUI_MOUSE_WHEEL].Scripts.add(
      function(argArr) {
        if(argArr[0].focusedElement)
          argArr[0].focusedElement.hevent(VUI_MOUSE_WHEEL, argArr[0].mEvent);
      }
    );

    /* 
     * set on mouse up event to trigger on mouse out 
     */
  
    this.tgl_event(true, VUI_MOUSE_OUT, 'onmouseout');
    this.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) {
        var Obj = argArr[0];
        var toE = (Obj.mEvent.relatedTarget || Obj.mEvent.toElement);
        if(Obj.focusedElement && toE != Obj.Base && toE != Obj.focusedElement.Base) {
          if(!has_parent(toE, Obj.Base))
            Obj.hevent(VUI_MOUSE_UP, Obj.mEvent);
        }
      }
    );

    this.Css.overflow = 'hidden';
    this.dock(toNode);

    /* Adjust document body size, this is to fix ie text selection
     * on absolute positioned elements 
     */

    if(ADJUST_BODY_SIZE) {
      document.body.style.width = (this.width() + 50) + "px";
      document.body.style.height = (this.height() + 50) + "px";
    }
 
    /* 
     * Set up onmouse move event handler 
     */

    this.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) {
        get_mouse(argArr[0].mEvent);
      }
    );

    return 1;
  };

  /***************************************************************************/
  /** Method: clone_elements
    * clone multiple elements of the same template
    *
    * Parameters:
    *
    *	VegUIElement T - the template you wish to clone from
    * 	VegUIElement ... - elements
    *
    * Example:
    *
    * (start code)
    * //myNode and myNode2 will be cloned from myTemplate
    * Manager.clone_elemebnts(myTemplate, myNode, myNode2);
    * (end)
    */

  this.clone_elements = function(T) {
    var i;
    for(i = 1; i < arguments.length; i++) {
      arguments[i].clone(T);
    }
  };

  /***************************************************************************/
  /** Method: evalme
    * 
    * evals some javascript code
    *
    * Parameters:
    *
    *	string code - code to evaluate
    *
    */

  this.evalme = function(code) {
    eval(code);
  };
  
  /***************************************************************************/
  /** Method: get_clone 
    * 
    * Wrapper functions to create a new vegui element and clone it
    *
    * Parameters:
    *
    *	VegUIElement Template - template element to clone from
    *	<VegUIElement Parent> - parent of the created element
    *
    * Returns:
    *
    *	VegUIElement - the created element
    *
    * See also:
    *
    *	<get_new>
    *
    * Example:
    *
    * (start code)
    * myNode = Manager.get_new(VUI_NODE);
    * myNode2 = Manager.get_clone(myNode);
    * (end)
    */
  
  this.get_clone = function(Template, Parent) {
    return this.get_new(null, Parent, Template);
  };
  
  /***************************************************************************/
  /** Method: get_free_idx
    *
    * *private function*
    *
    * Returns a free element index, which is a ranom unused number between
    * 0 and <ELEMENT_MAX_INDEX>
    *
    * Returns:
    * 
    *	int - unused element index number
    *	null - if no unused element index number could be found
    */
  
  this.get_free_idx = function() {
    var i=0, idx = (Math.round(Math.random()*ELEMENT_MAX_INDEX)+1);
    while(this.E[idx] && i < ELEMENT_MAX_INDEX) {
      idx = (Math.round(Math.random()*ELEMENT_MAX_INDEX)+1);
      i++;
    }

    if(i == ELEMENT_MAX_INDEX)
      idx = null;
    
    return idx;
  };
  
  /***************************************************************************/
  /** Method: get_new
    * 
    * Creates a new VegUIElement
    *
    * Parameters:
    *
    *	int type - <VegUI Element Types>
    *	<VegUIElement Parent> - Parent element of the element to be created
    *	<VegUIElement Template> - Template to clone the element from
    *
    * Note:
    *
    *	This is the function that should be used to create new vegui elements
    *	that are not the children of other vegui elements.
    *
    * Returns:
    *
    *	VegUIElement - the created vegui element
    *
    * See also:
    *
    *	<get_clone>
    *
    * Example:
    *
    * (start code)
    * myNode = Manager.get_new(VUI_Node);
    * (end)
    */
  
  this.get_new = function(type, Parent, Template) {
    var _idx = this.get_free_idx();
    var _refName = this.refName + ".E[" + _idx + "]";

    var _e = this.E[_idx] = new VEGUIOBJ[(Template ? Template.type : type)].module(_refName,  Parent, this);
    if(Template)
      _e.clone(Template);
    _e.eleIdx = _idx;
    return _e;
  };

  /***************************************************************************/
  /** Method: include
    *
    * Includes javascript code from a file and executes is
    *
    * Requires:
    *
    *	action - <init_bridge> needs to have been called
    *
    * Parameters:
    *
    *	string path - relative file path
    *	<function ondone> - function to execute when the include is done
    *	<bool async> - if true, server request will be async to the
    *	execution of the script allowing the execution of the
    *	script to continue while the request is being sent
    *
    * Example:
    *
    * (start code)
    * Manager.init_bridge(); // only needs to be called once, not everytime
    * Manager.include('helloworld.js');
    * (end)
    */

  this.include = function(path, ondone, async) {
    if(!path || !this.Bridge)
      return null;
    
    var Man = this;
   
    var process = function() {
      Man.evalme(this.request.responseText);
      if(ondone)
        ondone();
    };

    this.Bridge.send(path, null, 'GET', process, async);
  };

  /***************************************************************************/
  /** Method: init_bridge
    * 
    * initializes common <VegUIBridge> object that can be accessed by all
    * spawned VegUIElements by accessing it over their Manager property
    *
    * Requires:
    *
    *	<vegui.bridge.class.js>
    *
    * (start code)
    * myNode.Manager.Bridge.dostuff()
    * (end)
    *
    * Returns:
    *	
    *	VegUIBridge - the created <VegUIBridge> object
    *
    * See also:
    *
    *	<init_fx>
    *
    * Example:
    *
    * (start code)
    * Manager.init_bridge();
    * Manager.Bridge.send('somefile.txt', '', 'GET');
    * (end)
    */
   
  this.init_bridge = function() {
    this.Bridge = new VegUIBridge();
    return this.Bridge;
  };

  
  /***************************************************************************/
  /** Method: init_fx
    * 
    * initializes common <VegUIFXManager> object that can be accessed by all
    * spawned VegUIElements by accessing it over their Manager attribute
    *
    * Requires:
    *
    *	<vegui.fx.class.js>
    *
    * (start code)
    * myNode.Manager.FX.dostuff()
    * (end)
    *
    * Parameters:
    *
    *	int interval - fx timer interval (ms)
    *
    * Returns:
    *
    *	VegUIFXManager - the created <VegUIFXManager> object
    *
    * See also:
    *
    *	<init_bridge>
    */

  this.init_fx = function(interval) {
    this.FX = new VegUIFXManager(this);
    this.FX.init(interval);
    return this.FX;
  };
  
  /***************************************************************************/
  /** Method: key_is_blocked 
    *
    * Check if a keycode has been blocked with <block_key>
    *
    * Parameters:
    *
    *	int keyCode - key code to check
    *
    * Returns:
    *
    *	bool - true if key is blocked
    *	bool - false if key is not blocked
    *
    * See also:
    *
    *	<block_key>, <unblock_key>
    *
    * Example:
    *
    * (start code)
    * Manager.block_key([38]);
    * return Manager.key_is_blocked(38); // true
    * (end)
    */

  this.key_is_blocked = function(keyCode) {
    var i;
    for(i = 0; i < this.blockKeys.length; i++) {
      if(this.blockKeys[i] == keyCode)
        return true;
    }
    return false;
  };


  /***************************************************************************/
  /** Method: set_manager
    *
    * *Template function*
    *
    * sets the most common template properties for the element
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - position on the x axis (pixels)
    *	int y - position on the y axis (pixels)
    *
    * See also:
    *
    *	<VegUINode::set_node>
    *
    */
  
  this.set = this.set_manager = function(w,h,x,y) {
    this.set_node('DIV', w, h, x, y);
    this.nodeId = this.refName + "_node";
  };

  /***************************************************************************/
  /** Method: unblock_key
    *
    * Removes a keycode block set by <block_key> method
    *
    * Parameters:
    *
    *	array keyCode - key codes to unblock
    *
    * See also:
    *
    *	<block_key>
    *
    * Example:
    *
    * (start code)
    * Manager.unblock_key([37,38,39,40]);
    * (end)
    */

  this.unblock_key = function(keyCode) {
    var i,n, index = [];
    for(i=0; i < keyCode.length; i++) {
      for(n=0; n < this.blockKeys.length; n++) {
        if(this.blockKeys[n] == keyCode[i]) {
	  index.push(n);
	}
      }
    }
    for(i=0; i < index.length; i++)
      delete this.blockKeys[index[i]];
  };

  /**
   * Children
   */

  this.WinShadow = this.add_child('WinShadow', VUI_NODE);
  this.WinShadow.T.className = WINSHAD_CLASS;
  this.WinShadow.T.Css.visibility = 'hidden';

  /* wrappers */
  
}
VegUIManager.prototype = VegUINode;

/******************************************************************************
 * V E G U I B B O X
 *****************************************************************************/
/** Class: VegUIBBox
  * Bounding box for elements, limits where an element can be moved to. Every
  * VegUIElement has a bounding box located at its BBox property
  *
  * Properties: Object Properties
  *
  *	x - *int*, x position (pixels)
  *	y - *int*, y position (pixels)
  *	w - *int*, width (pixels)
  *	h - *int*, height (pixels)
  * 	x2 - *int*, right position (pixels)
  *	y2 - *int*, bottom position (pixels)
  *	enabled - *bool*, true if bounding box is enabled
  *	c - *bool*, true if auto correct mode is enabled
  *	bumped - *int*, holds the direction where the last collision happened
  *
  * Auto correct mode:
  *
  *	if auto correct mode is on the element the bounding box is linked to
  *	will be moved back inside the bounding box should it happen to be located
  *	outside of the bounding box
  *
  */

/*****************************************************************************/
/** Constructor: VegUIBBox
  *
  * *Constructor*
  *
  * Parameters:
  *
  *	VegUIElement Element - the vegui element this bounding box belongs
  *	to
  *
  **/

function VegUIBBox(VegUIElement) {
  this.Parent = VegUIElement;
 
  /**
   * Methods
   */
 
  /***************************************************************************/
  /** Method: correct
    * 
    * checks if the element is within the boundin box's border, if not the
    * element will be moved to be within the bounding box's border
    *
    */
 
  this.correct = function() {
    if(!this.enabled)
      return;
    this.enabled = false;
    if(this.Parent.y2() > this.y2)
      this.Parent.move(0,this.Parent.y()-(this.Parent.y2()-this.y2));
    else if(this.Parent.y() < this.y)
      this.Parent.move(0,this.y);
    if(this.Parent.x2() > this.x2)
      this.Parent.move(this.Parent.x()-(this.Parent.x2()-this.x2));
    else if(this.Parent.x() < this.x)
      this.Parent.move(this.x,0);
    this.enabled = true;
  };
  
  /***************************************************************************/
  /** Method: set
    *
    * sets the bounding box up
    *
    * Parameters:
    *
    *	int x - position on the x coordinate (pixels)
    *	int y - position on the y coordinate (pixels)
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	bool b - enable or disable the bounding box
    *	boolc c - enable or disable auto correct mode
    */
  
  this.set = function(x, y, w, h, b, c) {
    this.x = x;
    this.x2 = w + x;
    this.y = y;
    this.y2 = h + y;
    this.w = w;
    this.h = h;
    this.enabled = b;
    this.c = c;
  
    if(c)
      this.correct(c);
  };
  
  /***************************************************************************/
  /** Method: validate
    * 
    * Validates the position of the element that the bounding box belongs to
    *
    * Parameters:
    *
    *	<int x> - x position to check, if ommited this.Parent.x() is used
    *	<int y> - y position to check, if ommited this.Parent.y() is used
    * 
    * Returns:
    *
    *	int - *n* if position of the element is invalid then the direction
    *	of the collision will be returned (<Generic directions>)
    *	int - 0 if position of the element is valid
    *
    */
   
  this.validate = function(x, y) {
    
    if(isNaN(x))
      var x = this.Parent.x();

    if(isNaN(y))
      var y = this.Parent.y();
  
    var ew = this.Parent.width();
    var eh = this.Parent.height();
    this.bumped = 0;
 
    if(!this.enabled)
      return 0;
    else if(!isNaN(x) && x !== null && x < this.x)
      this.bumped = VUI_LEFT;
    else if(!isNaN(x) && x !== null && (x + ew) > (this.x + this.w))
      this.bumped = VUI_RIGHT;
    else if(!isNaN(y) && y !== null && y < this.y)
      this.bumped = VUI_UP;
    else if(!isNaN(y) && y !== null && (y + eh) > (this.y + this.h))
      this.bumped = VUI_DOWN;
    else
      this.bumped = 0;

    return this.bumped;
  };
}

/******************************************************************************
 * D Y N F U N C
 *****************************************************************************/
 /** Class: VegUIDynFunc
   * Allows to have a function with dynamic content 
   *
   * Properties: Object Properties
   *
   * 	Funcs - *Array*, holds the functions
   *	returnVal - *variable*, holds the value that will be returned by the
   *	<execute> method
   *
   */

/*****************************************************************************/
/** Constructor: VegUIDynFunc 
  *
  * *Constructor*
  *
  * Parameters:
  *
  *	var returnVal - value to be returned by the <execute> method
  *
  */

function VegUIDynFunc(returnVal) {
  this.Funcs = {
    _l : 0,
    _p : function(fn) {
      this[this._l] = fn;
      this._l++;
    }
  };
  this.returnVal = returnVal || false;

  /***************************************************************************/
  /** Method: add
    * 
    * Adds a function to the stack
    *
    * Parameters:
    *
    *	function fn - function to be added to the stack
    *	var id - unique id string
    *
    * Code example:
    *
    * (start code)
    * myDynFunc.add(function() { alert('hi'); }, 'hi');
    * (end)
    *
    * See also:
    *
    * 	<free>
    */

  this.add = function(fn,id) { 
    
    if(id) {
      this.Funcs[id] = fn;
    }
    else
      this.Funcs._p(fn);
  };

  /***************************************************************************/
  /** Method: execute
    *
    * Executes all the functions in the stack
    *
    * Parameters:
    *
    *	<Array ArgArr> - Array that can hold various parameters. In order for
    *	functions in the stack to be able to work with the argArr argument
    *	they need to be defined with it in mind
    *
    * Code example:
    *
    * (start code)
    * myDynFunc.add( function(argArr) { alert(argArr[0]); } );
    * myDynFunc.execute(['hello world']);
    * (end)
    *
    * Returns:
    *
    *	variable - returns the value of this.returnValue
    *
    */

  this.execute = function(argArr) {
    var i, returnVal = this.returnVal;
    for(i in this.Funcs) {
      if(typeof this.Funcs[i] != 'function' || i == '_p')
        continue;
      this.Funcs[i](argArr);
    }
    return returnVal;
  };

  /***************************************************************************/
  /** Method: free
    *
    * Free a unique function id effectivly removing the function linked to
    * it from the stack
    *
    * Parameters:
    *
    *	variable id - unique function id
    *
    * See also:
    *
    *	<add>
    */

  this.free = function(id) { delete this.Funcs[id]; };
}


