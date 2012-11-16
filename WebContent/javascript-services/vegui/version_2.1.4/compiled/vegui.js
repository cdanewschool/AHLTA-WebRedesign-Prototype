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
 * Script that sniffs browsers
 */


/* initiated the browser information object that will later hold the information
 * about the browser being used
 */

var VUI_BROWSER_INFO = {
  name : 'unknown',
  version : 0
};

/* find browser name, we only need to scane for mozilla, ie and opera since 
 * those are the only browsers we care about 
 */

if(window.opera) {
  VUI_BROWSER_INFO.name = 'Opera';
} else if (navigator.userAgent) {
  var str = navigator.userAgent;
  if(str.indexOf("Firefox") != -1) {
    VUI_BROWSER_INFO.name = 'Firefox';
  } else if(str.indexOf("Netscape") != -1) {
    VUI_BROWSER_INFO.name = 'Netscape';
  } else if(str.indexOf("MSIE") != -1) {
    VUI_BROWSER_INFO.name = 'MSIE';
  } else if(str.indexOf("Gecko") != -1) {
    VUI_BROWSER_INFO.name = 'Mozilla';
  }
}


/** Function: vui_browser_version
  *
  * Returns the version of the browser
  *
  * Parameters:
  *
  *	string name - browser id name
  *
  * Returns:
  *
  *	int - version
  */

function vui_browser_version(name) {
  if(name == 'Mozilla')
    name == 'rv';

  var str = navigator.userAgent || navigator.appVersion;
  if(!str)
    return 0;

  var index = str.indexOf(name);
  if(index == -1)
    return 0;

  return parseFloat(str.substring(index+name.length+1));
}

VUI_BROWSER_INFO.version = vui_browser_version(VUI_BROWSER_INFO.name);
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
 * G L O B A L S
 *****************************************************************************/

/** Constant: VUI_WIN
  * VegUI element type for <VegUIWindow>
  */

var VUI_WIN = 7;

vui_module_add(VUI_WIN, VegUIWindow, 'vegui.window.class.js');

/** Constant: WINSHAD_CLASS
  * The css class to use for <VegUIManager>.WinShadow
  */

var WINSHAD_CLASS = 'win_shad';

/** Constant: VUI_WIN_Z
  * the minimum z-level of windows
  */

var VUI_WIN_Z = 500;

/** Constant: VUI_WIN_Z_SPACE
  * the z level space between windows
  */

var VUI_WIN_Z_SPACE = 5;

/**
 * Constants: Flags
 *
 * Bitmask flags that can be set on the flags property of the VegUIWindow widget
 *
 * VUI_KILL_ON_CLOSE - Window is destroyed when the close() method is called
 * VUI_NORESIZE_W - Window's width can not be resized
 * VUI_NORESIZE_H - Window's height can not be resized
 * VUI_NORESIZE - Window can not be resized
 * VUI_NOMOVE_X - Window cannot be moved along the x axis
 * VUI_NOMOVE_Y - Window cannot be moved along the y axis
 * VUI_NOMOVE - Window cannot be moved
 * VUI_MOMAXIMIZE - Window cannot be maximized
 * VUI_NOMINIMIZE - Window cannot be minimized
 * VUI_NOTASK - Window will not be added to taskbar if there is one
 */

var VUI_KILL_ON_CLOSE = 0x200;
var VUI_NORESIZE_W = 0x400;
var VUI_NORESIZE_H = 0x800;
var VUI_NORESIZE = VUI_NORESIZE_W | VUI_NORESIZE_H;
var VUI_NOMOVE_X = 0x1000;
var VUI_NOMOVE_Y = 0x2000;
var VUI_NOMOVE = VUI_NOMOVE_X | VUI_NOMOVE_Y;
var VUI_NOMAXIMIZE = 0x40000;
var VUI_NOMINIMIZE = 0x80000;
var VUI_NOTASK = 0x100000;

/******************************************************************************
 * V E G U I W I N D O W
 *****************************************************************************/
/** Class: VegUIWindow
  *
  * A dragable, resizeable window widget with a header component
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
  *    +--> VegUIWindow
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_WIN>
  *
  * Notes: Required
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Flags
  *
  *	These flags are turned on by default for this element
  *
  *	<VUI_HMOUSE_DOWN>
  *
  * Notes: Child Elements
  *
  *	These elements are all directly accessable by *this.[child_name]*
  *	even though they may not be direct childs of this element.
  *
  *	Skin - <VegUINode>, Skin node
  *	Ui - <VegUINode>, UI node, add any childs that need interaction
  *	to this.
  *	Header - <VegUIButton>, Header node (Child of Ui)
  * 	Caption - <VegUINode>, holds window caption (Child of Header)
  *	RC_R - <VegUIButton>, resize capture right (Child of Ui)
  *	RC_B - <VegUIButton>, resize capture bottom (Child of Ui)
  *	RC_RB - <VegUIButton>, resize capture right-bottom (Child of Ui)
  *	BtnClose - <VegUIButton>, closes the window (Child of Ui)
  *	BtnMaximize - <VegUIButton>, maximizes the window (Child of Ui)
  *	BtnMinimize - <VegUIButton>, minimizes the window (Child of Ui)
  *	
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/26/vegui-tutorial-15---the-window-element.html
  *
  * Properties: Object Properties
  *
  *	minW - *int*, minimum width (pixels)
  *	maxW - *int*, maximum width (pixels)
  *	minH - *int*, minimum height (pixels)
  *	maxH - *int*, maximum height (pixels)
  *	maxX - *int*, x position of the window when maximized
  *	maxY - *int*, y position of the window when maximized
  *	bMaximized - *bool*, set to true if the window is currently maximized
  *	origW - *int*, original width of window (set by <maximize>)
  *	origH - *int*, original height of window (set by <maximize>)
  *	origX - *int*, original x position of window (set by <maximize>)
  *	origY - *int*, original y position of window (set by <minimize>)
  *	pushZ - *int*, push z index (pixels)
  *	title - *string*, read-only, current window title
  *	WinShadow - <VegUINode>, link to WinShadow in the window's manager
  *	winIdx - *int*, read-only, index of the window
  *
  * Properties: Template Properties
  *
  *	T.minW - <minW>
  *	T.minH - <minH>
  *	T.maxW - <maxW>
  *	T.maxH - <maxH>
  *	T.winTitle - <title>
  *	T.pushZ - <pushZ>
  *
  */

/*****************************************************************************/
/** Constructor: VegUIWindow
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUIWindow(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /* objects */
  this.type = VUI_WIN;
  this.Skin = this.add_child('Skin', VUI_NODE);
  this.Ui = this.add_child('Ui', VUI_NODE);
  this.Header = this.Ui.add_child('Header', VUI_BUTTON);
  this.Caption = this.Header.add_child('Caption', VUI_NODE);
  this.RC_R = this.Ui.add_child('RC_R', VUI_BUTTON);
  this.RC_B = this.Ui.add_child('RC_B', VUI_BUTTON); 
  this.RC_RB = this.Ui.add_child('RC_RB', VUI_BUTTON);
  this.BtnClose = this.Ui.add_child('BtnClose', VUI_BUTTON);
  this.BtnMinimize = this.Ui.add_child('BtnMinimize', VUI_BUTTON);
  this.BtnMaximize = this.Ui.add_child('BtnMaximize', VUI_BUTTON);
 
  this.Skin.set_marg(0,0);
  this.Ui.set_marg(0,0);
  
  this.RC_R.T.rmarg_nr = -10;
  this.RC_R.T.bmarg = 5;
  this.RC_R.T.w = 13;
  this.RC_R.T.z = 255;
 
  this.RC_B.T.rmarg = 5;
  this.RC_B.T.bmarg_nr = -10;
  this.RC_B.T.h = 13;
  this.RC_B.T.z = 255;

  this.RC_RB.T.rmarg_nr = -10;
  this.RC_RB.T.bmarg_nr = -10;
  this.RC_RB.T.h = 15;
  this.RC_RB.T.w = 15;
  this.RC_RB.T.z = 255;

  this.Header.set_marg(-1);
  this.BtnClose.T.rmarg_nr = 2;
  this.BtnClose.set(0, 2);
  this.Caption.set(null, null, null, 10, 3);

  this.Header.T.h = 20;
  this.Header.T.micon = 'move';
  this.Header.T.z = 20;
  this.BtnClose.T.z = 21;
  this.BtnMinimize.T.z = 21;
  this.BtnMaximize.T.z = 21;
 
  this.Skin.T.z = 0;
  this.Ui.T.z = 1;
  
  this.bMaximized = 0;
 
  this.RC_B.flags = this.RC_RB.flags = (this.RC_R.flags |= VUI_HMOUSE_MOVE);

  this.WinShadow = this.Manager.WinShadow;

  this.flags |= VUI_HMOUSE_DOWN;

  /** 
   * Methods
   */
  
  /***************************************************************************/
  /** Method: build_win
    *
    * Builds the window
    *
    * *private function*
    * 
    * You should always use <VegUIManager::build_element> to build vegui
    * elements
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be appedned
    *	to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    *
    * See Parent:
    *
    * 	<VegUINode::build_node>
    */
  
  this.build = this.build_win = function(toNode) {
    
    var Win = this;
    
    if(!this.build_node())
      return null;
 
    /* set mouse states */
  
    this.Header.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_drag(1);}
    );
    this.Header.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_drag(0);}
    );

    this.BtnClose.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.close();}
    );
    
    this.BtnMaximize.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.maximize(); }
    );
     
    this.BtnMinimize.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.minimize(); }
    );
   
    this.RC_R.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'e-resize'; }
    );

    this.RC_B.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 's-resize'; }
    );

    this.RC_RB.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'se-resize'; }
    );

    this.RC_R.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );

    this.RC_B.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );
  
    this.RC_RB.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );

    this.RC_R.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); }
    );

    this.RC_R.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); }
    );
  
    this.RC_B.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); } 
    );
  
    this.RC_B.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); }
    );

    this.RC_RB.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); } 
    );
  
    this.RC_RB.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); } 
    );
 
    this.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.set_focus(null,true); }
    );
  
    this.title = this.T.winTitle;
    this.minW = this.T.minW || 0;
    this.maxW = this.T.maxW || this.Manager.width();
    this.minH = this.T.minH || 0;
    this.maxH = this.T.maxH || this.Manager.height();
    this.maxX = this.T.maxX || 0;
    this.maxY = this.T.maxY || 0;

    this.pushZ = this.T.pushZ || 0;
  
    this.set_caption(this.title);
    this.dock(toNode);
    this.set_focus(null, true);
   
    if(this.Manager.Taskbar) {
      this.Manager.Taskbar.taskbutton_add(this);
    }
    
    return 1;
  };
  
  /***************************************************************************/
  /** Method: clone_win
    * 
    * Clones a window, calls clone_node() and also clones window specific
    * event handlers
    *
    * *private function*
    *
    * Alias:
    *
    *	clone()
    *
    * Parameters:
    *
    *	VegUIWindow Template - the template window to clone from
    *
    * Returns:
    *
    *	VegUIWindow - this 
    *
    * See Parent:
    *
    *	<VegUINode::clone_node>
    */

  this.clone = this.clone_win = function(Template) {
    this.clone_node(Template);

    this.ontofront = this.clone_event(Template.ontofront);
    this.ontoback = this.clone_event(Template.ontoback);
    this.onwinfocus = this.clone_event(Template.onwinfocus);
    this.onminimize = this.clone_event(Template.onminimize);
    this.onmaximize = this.clone_event(Template.onmaximize);

    return this;
  };
  
  /***************************************************************************/
  /** Method: close
    * 
    * Closes the window. If the <VUI_KILL_ON_CLOSE> flag is set it will also
    * destroy the window. Will trigger <onclose> event
    *
    * Example:
    *
    * (start code)
    * // window will be hidden and can be made visible again
    * // by calling the .show() method
    * myWin.close();
    *
    * // window will be destroyed
    * myWin.flags |= VUI_KILL_ON_CLOSE
    * myWin.close();
    * (end)
    */
  
  this.close = function() {
    if((this.flags & VUI_KILL_ON_CLOSE)) {
      this.kill(1);
    } else
      this.hide(1);

    var i,z=0,W,SW;
    for(i in this.Manager.W) {
      W = this.Manager.W[i];
      if(W && W.Css && !W.is_hidden() && W.eleIdx != this.eleIdx && parseInt(W.Css.zIndex) > z) {
	SW = this.Manager.W[i];
	z = parseInt(SW.Css.zIndex);
      }
    }

    if(SW) {
      SW.set_focus(VUI_FOCUS_ACTIVE, true);
    }
    
    this.event_execute('onclose');
  };
  
  /***************************************************************************/
  /** Method: drag
    *
    * This method is called when the mouse is moved while drag mode for
    * this window is on. It moves the WinShadow element to a new
    * position
    *
    * *private function*
    *
    * See also:
    *
    *	<tgl_drag>
    */
  
  this.drag = function() {
    
    var x = mouseX;
    var y = mouseY;
    
    if(!this.bDrag)
      return;
    this.WinShadow.move(
      (
        !(this.flags & VUI_NOMOVE_X) ?
        this.WinShadow.x() - (this.lastDragX - x) :
        null
      ),
      (
        !(this.flags & VUI_NOMOVE_Y) ?
        this.WinShadow.y() - (this.lastDragY - y) :
        null
      )
    );
    this.lastDragY = y;
    this.lastDragX = x;
  };

  /***************************************************************************/
  /** Method: maximize
    *
    * Maximizes the window, moving it to the position this.maxX,maxY and
    * resizing it to this.maxW, this.maxH
    *
    * If window is maximized when this method is called it will be restored
    * to its original proportions and position
    *
    * See Also:
    *
    *	<minimize>, <close>
    */

  this.maximize = function() {
    
    if(this.flags & VUI_NOMAXIMIZE)
      return 0;
 
    if(this.flags & VUI_NORESIZE_H || this.flags & VUI_NORESIZE_W)
      return 0;
  
    if(!this.bMaximized) {
      
      this.origX = this.x();
      this.origY = this.y();
      this.origW = this.width();
      this.origH = this.height();
      
      this.move(this.maxX, this.maxY);
      this.resize(this.maxW, this.maxH);
      
    } else {
      
      this.move(this.origX, this.origY);
      this.resize(this.origW, this.origH);
     
    }

    this.bMaximized ^= 1;

    if(this.onmaximize)
      this.onmaximize(this.bMaximized);
    
  };
 
  /***************************************************************************/
  /** Method: minimize
    *
    * Minimizes the window, hiding it from the user but never destroying 
    * it
    */

  this.minimize = function() {
    
    if(this.flags & VUI_NOMINIMIZE)
      return 0;
    
    this.hide(1);
    this.event_execute('onminimize');
  };

  /***************************************************************************/
  /** Method: mresize
    *
    * Resizes the WinShadow element in relation to the mouse cursor coordinates
    *
    * This function is called when the user clicks on one of the resize 
    * panels on the borders of the window
    *
    * *private function*
    *
    * Paramters:
    *
    *	string dir - resize direction, makes sure the window can only be
    *	resized in the given direction ('e-resize', 's-resize', 'se-resize')
    *
    * See also:
    *
    *	<tgl_resize>
    */
  
  this.mresize = function(dir) {
    
    var x = mouseX;
    var y = mouseY;
    var w = this.WinShadow.width() - (this.lastDragX - x);
    var h = this.WinShadow.height() - (this.lastDragY - y);

    if(dir == 'e-resize' && !(this.flags & VUI_NORESIZE_W) && w >= this.minW && w <= this.maxW)
      this.WinShadow.resize(w, null);
    else if(dir == 's-resize' && !(this.flags & VUI_NORESIZE_H) && h >= this.minH && h <= this.maxH)
      this.WinShadow.resize(null, h);
    else if(dir == 'se-resize') {
      this.WinShadow.resize(
        (
          (!(this.flags & VUI_NORESIZE_W) && w >= this.minW && w <= this.maxW) ?
          this.WinShadow.width() - (this.lastDragX - x) : 
          null
        ),
        ( 
          (!(this.flags & VUI_NORESIZE_H) && h >= this.minH && h <= this.maxH) ?
          this.WinShadow.height() - (this.lastDragY - y) :
          null
        )
      );
    }
    this.lastDragX = x;
    this.lastDragY = y;
  };
  
  /***************************************************************************/
  /** Method: put_shadow
    *
    * This makes the WinShadow element visible and molds it to fit the
    * window's proportions and position
    *
    * *private function*
    */
  
  this.put_shadow = function() {
    this.WinShadow.set_pos('absolute', VUI_WIN_Z*100);
    this.WinShadow.resize(this.width(), this.height());
    this.WinShadow.move(this.x(), this.y());
    this.WinShadow.hide(0);
  };
  
  /***************************************************************************/
  /** Method: set_win
    *
    * Sets the most common template properties of the window
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	string title - title of the window
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - x position (pixels)
    *	int y - y position (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * myWin.set('Some Window!', 500, 300, 50, 50);
    * (end)
    */
  
  this.set = this.set_win = function(title, w, h, x, y) {
    if(title) this.T.winTitle = title;
    this.set_node(null, w, h, x, y);
  };
  
  /***************************************************************************/
  /** Method: set_caption
    *
    * Sets the title of the window
    *
    * Paramters: 
    *
    *	string txt - new title for the window
    *
    * Example:
    *
    * (start code)
    * myWin.set_caption('Another title for my window');
    * (end)
    */
  
  this.set_caption = function(txt) {
    this.winTitle = txt;
    this.Caption.clear(document.createTextNode(txt));
  };
 
  /***************************************************************************/
  /** Method: set_focus_win
    *
    * Similar to <VegUI::set_focus_node> but also has the option to bring
    * the window to the foreground and z-sort the other windows
    *
    * Alias:
    *
    *	set_focus()
    *
    * Parameters:
    *
    *	int focusType - <Focus types>
    *	bool bringToFron - if true the window is brough to the foreground
    *
    * See Parent:
    *
    *	<VegUINode::set_focus_node>
    */
  
  this.set_focus = this.set_focus_win = function(focusType, bringToFront) {
  
    var hadFocus, M = this.Manager;
 
    if(! (hadFocus = this.check_focus(focusType)) )
      this.set_focus_node(focusType);

    if(!bringToFront)
      return;

    this.set_pos(null, VUI_WIN_Z+this.pushZ);

    this.event_execute('ontofront');
   
    var lastZ = this.Css.zIndex;
    var w, z, i = 1, W, l;
 
    /*
     * decrement z-index on all windows that had
     * a z-index bigger than this window's original
     * z-index
     */
 
    var zArr = [];
 
    for(w in M.W) {
      W = M.W[w];
      if(W == this || !W.Css)
        continue;
      zArr.push(W);
    }

    zArr.sort(
      function(W1,W2) {
        return W2.Css.zIndex-W1.Css.zIndex; 
      }
    );

    for(w = 0, l = zArr.length; w < l; w++) {
      W = zArr[w];
      
      W.set_pos(null, lastZ - (i+=VUI_WIN_Z_SPACE));
      W.event_execute('ontoback');
    }  

    if(!hadFocus)
      this.event_execute('onwinfocus'); 
  };

  /***************************************************************************/
  /** Method: show
    *
    * Unhides the window and gives focus to it
    */

  this.show = function() {
    this.hide(0);
    this.set_focus(VUI_FOCUS_ACTIVE, true);
    if(this.Manager.Taskbar) {
      this.Manager.Taskbar.taskbutton_add(this);
    }
  };
  
  /***************************************************************************/
  /** Method: tgl_drag
    *
    * Toggles drag mode on or off, when the window is in drag mode the
    * WinShadow element is visible and moves with the mouse cursor
    *
    * Parameters:
    *
    *	bool b - true (on), false (off)
    *
    * See also:
    *
    *	<drag>
    *
    */
  
  this.tgl_drag = function(b) {
    this.Header.lockFocus = this.bDrag = b;
    var Win = this;
    if(b) {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { Win.drag(); },
        'windrg'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
      this.put_shadow();
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('windrg');
      this.move(this.WinShadow.x(), this.WinShadow.y());
      this.WinShadow.hide(1);
    }
  };
  
  /***************************************************************************/
  /** Method: tgl_resize
    *
    * Toggles resize mode on or off. When resize mode is on the WinShadow
    * element resizes in relation to mouse cursor movements
    *
    * Parameters:
    *
    *	bool b - true (on) , false (off)
    *
    * See also:
    *
    *  <mresize>
    */
  
  this.tgl_resize = function(b) {
    if(this.bDrag)
      return;
    var cursor;
    var Win = this;

    this.RC_R.lockFocus = this.RC_B.lockFocus = this.RC_RB.lockFocus = b;

    if(this.RC_R.Css.cursor == 'e-resize')
      cursor = 'e-resize';
    else if(this.RC_B.Css.cursor == 's-resize')
      cursor = 's-resize';
    else if(this.RC_RB.Css.cursor = 'se-resize')
      cursor = 'se-resize';

    this.bResize = b;
    if(b && cursor) {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { Win.mresize(cursor);},
        'winrsz'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
      this.put_shadow();
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('winrsz');
      this.resize(this.WinShadow.width(), this.WinShadow.height());
      this.WinShadow.hide(1);
    }
  };
  
  /**
   * Functions: Event Handlers
   *
   *	onclose - when <close> is called
   *	onwinfocus - when <set_focus_win> is called
   *	ontoback - when window is moved to the background
   *	ontofront - when window is brought to the front
   *	onmaximize - when <maximize> is called
   *	onminimize - when <minimize> is called
   */
  
  this.onclose = function() { return true; };
  this.onwinfocus = function() { return true; };
  
  this.ontofront = function() { return true; };
  this.ontoback = function() { return true; };
  this.onminimize = function() { return true; };
  this.onmaximize = function() { return true; };

  this.Manager.W[this.Manager.winIdx] = this;
  this.winIdx = this.Manager.winIdx;
  this.Manager.winIdx++;
}
VegUIWindow.prototype = VegUINode;

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
 * G L O B A L S
 *****************************************************************************/

/** Constant: VUI_SCOLL
  * vegUI element type for <VegUIScrollbar>
  */

var VUI_SCROLL = 6;

vui_module_add(VUI_SCROLL, VegUIScrollbar, 'vegui.scrollbar.class.js');

/******************************************************************************
 * V E G U I  S C R O L L B A R
 *****************************************************************************/
/** Class: VegUIScrollbar
  *
  * *extends VegUINode*
  *
  * Inherits properties and functions from: <VegUINode>
  *
  * (start code)
  * VegUINode
  *	|
  *	|
  *	+--> VegUIScrollbar
  * (end)
  * 
  * Type:
  *
  *	<VUI_SCROLL>
  *
  * Child Elements:
  *
  *	These children are all accessable over *this.[child_name]*
  *
  *	Btn1 - *VUI_BUTTON*, Button to scroll up or left
  *	Btn2 - *VUI_BUTTON*, Button to scroll up or right
  *	Btn3 - *VUU_BUTTON*, Button that can be dragged to scroll
  *
  * Properties: Object Properties
  *
  *	CHolder - *VegUIElement*, the content holder element this scroll bar is linked 
  *	to
  *	Content - *VegUIElement*, the content element this scroll bar is linked to
  *	scrollSpeed - *int*, interval of timer when auto scroll is on
  *	scrollStep - *int*, pixels moved each scroll step
  *	dir - *char*, direction type of the scrollbar, 'y' or 'x'
  *	scrollInterval - *Interval*, holds the interval object when auto scroll is on
  *	bDrag - *bool*, is true if scrollbar is in drag mode
  *	skipButtonAlign - *bool*, if true buttons will not be aligned automatically
  *	on <build_scroll>
  *
  * Properties: Template Properties
  *
  *	T.scrollSpeed - <scrollSpeed>
  *	T.scrollStep - <scrollStep>
  *	T.scrollDir - <dir>
  *	T.skipButtonAlign - <skipButtonAlign>
  */
  
/***************************************************/
/** Constructor */

function VegUIScrollbar(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
  
  this.type = VUI_SCROLL;
  this.T.scrollDir = 'y';
  this.CHolder = null;
  this.Content = null;
 
  this.Btn1 = this.add_child('Btn1', VUI_BUTTON);
  this.Btn2 = this.add_child('Btn2', VUI_BUTTON);
  this.Btn3 = this.add_child('Btn3', VUI_BUTTON);
  
  this.Btn1.T.z = 2;
  this.Btn2.T.z = 2;
  this.Btn3.T.z = 0;
  
  this.T.scrollSpeed = 20;
  this.T.scrollStep = 5;
 
 
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Method: asa
    *
    * Returns the size of the active scroll area in the scrolbar. The active
    * scroll area is the are between Btn1 and Btn2. If the scrollbar is
    * of type 'x' then width is returned else height
    *
    * Returns:
    *
    *	int - avtice scroll area size (pixels)
    */
  
  this.asa = function() {
    return (!this.is_x() ? (this.height() - this.Btn1.height() - this.Btn2.height()) : (this.width() - this.Btn1.width() - this.Btn2.width()));
  };
  
  /***************************************************************************/
  /** Method: build_scroll
    * 
    * Builds the scrollbar
    *
    * Alias: 
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLnode> toNode - if submitted the created HTML node will be appended
    *	to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See also:
    *
    *	<VegUINode::build_node>
    */
  
  this.build = this.build_scroll = function(toNode) {
  
    this.dir = this.T.scrollDir;
    
    this.skipButtonAlign = this.T.skipButtonAlign;

    if(!this.skipButtonAlign) {
      if(!this.is_x()) {
        this.Btn2.T.bmarg_nr = 0;
        this.Btn3.T.rmarg = 0; 
      } else {
        this.Btn2.T.rmarg_nr = 0;
        this.Btn3.T.bmarg = 0; 
      }
    }
  
    this.scrollSpeed = this.T.scrollSpeed;
    this.scrollStep = this.T.scrollStep;
  
    if(!this.build_node())
      return null;
  
    /* Set up button events */
    
    this.Btn1.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(1,0); }
    );
    this.Btn2.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(1,1); }
    );
    this.Btn1.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(0); }
    );
    this.Btn2.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(0); }
    );
    this.Btn3.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_drag(0); }
    );
    this.Btn3.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_drag(1); }
    ); 
  
    /* 
     * Set up bounding boxes for button 3
     */

    if(!this.is_x()) {
      this.Btn3.onresize = function() {
        this.BBox.set(
          0,
          this.Parent.Btn1.height(),
          this.Parent.width(),
          this.Parent.asa(),
          true,
          true
        );
      };
    } else {
      this.Btn3.onresize = function() {
        this.BBox.set(
          this.Parent.Btn1.width(),
	  0,
	  this.Parent.asa(),
	  this.Parent.height(),
	  true,
          true
        );
      };
    }

    this.sync();
  
    this.Css.overflow = 'hidden';
    this.dock(toNode);
    return 1;
  };

  /****************************************************************************/
  /** Method: disable_scroll
    *
    * Similar to the <VegUINode::disable_node> method but makes sure all
    * children will be disabled as well.
    *
    * Alias:
    *
    *	disable()
    *
    * Parameters:
    *
    *	bool b - true (disable) false (enable)
    *
    * See also
    *
    *	<VegUINode::disable_node>
    */
  
  this.disable = this.disable_scroll = function(b) {
    this.disable_node(b);
    this.Btn1.disable(b);
    this.Btn2.disable(b);
    this.Btn3.disable(b);
  };  
  
  /***************************************************************************/
  /** Method: drag
    *
    * Move Btn3 to a new position and sync the content element's position to it
    *
    * Parameters:
    *
    *	int x - new x position of the Btn3
    *	int y - new y position of the Btn3
    *
    * See also:
    *
    *	<tgl_drag>, <scroll>
    */
  
  this.drag = function(x, y) {
    if(!this.bDrag)
      return;
  
    if(!this.is_x()) {
      this.Btn3.move(null, this.Btn3.y() - (this.lastDragY - y));
      this.lastDragY = y;
    } else {
      this.Btn3.move(this.Btn3.x() - (this.lastDragX - x), null);
      this.lastDragX = x;
    }
    this.sync(1);
  };
  
  /****************************************************************************/
  /** Method: is_x
    *
    * Checks if scroll bar is an x axis or an y axis scroll bar
    * 
    * Returns:
    *
    *	bool - true if direction is x
    *	bool - false if direction is y
    */
  
  this.is_x = function() {
    return (this.dir == 'x' ? true : false);
  };
  
  /***************************************************************************/
  /** Method: link
    *
    * Links two VegUIElement as CHolder and Content. The Content element should
    * be a child of the CHolder element
    *
    * Parameters:
    *
    *	VegUIElement CHolder - The content holder element that holds the content
    *	to be scrolled
    *	VegUIElement Content - The element that holds the content
    *
    * See also:
    *
    *	<sync>
    */
  
  this.link = function(CHolder, Content) {
    this.CHolder = CHolder;
    this.Content = Content;
    this.update_content_boundary();
    this.sync();
  };
  
  /***************************************************************************/
  /** Method: overflow
    * 
    * Calculate content overflow ratio
    *
    * Returns:
    *
    *	int - content overflow ration 
    */
    
  this.overflow = function() {
    if(!this.CHolder || !this.Content)
      return 0;
    var res = (!this.is_x() ? (this.Content.height() / this.CHolder.height()) : (this.Content.width() / this.CHolder.width()));
    if(isNaN(res))
      res = 0;
    return (res < 1?0:res);
  };
  
  /***************************************************************************/
  /** Method: scroll
    *
    * Scrolls content into the specified direction
    *
    * Parameters:
    *
    *	bool dir - false = up/left, true = down/right
    *	<int rep> - repeat scroll n times
    *
    * See also:
    *
    *	<tgl_scroll>, <drag>
    */
  
  this.scroll = function(dir, rep) {
    if(!this.is_x()) {
      if(!dir) {
        if(this.Content.y() < 0)
	  this.Content.move(null, this.Content.y() + this.scrollStep);
      } else
        this.Content.move(null, this.Content.y() - this.scrollStep);
    } else {
      if(!dir) {
        if(this.Content.x() < 0)
	  this.Content.move(this.Content.x() + this.scrollStep, null);
      } else
        this.Content.move(this.Content.x() - this.scrollStep, null);
    }

    this.sync();
    if(this.Content.BBox.bumped || this.Btn3.BBox.bumped) {
      this.tgl_scroll(0);
    } else if(!isNaN(rep) && rep)
      this.scroll(dir, (rep-1));
    
  };
  
  /***************************************************************************/
  /** Method: set_scroll
    * 
    * Sets the most common template properties for the scrollbar
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	char dir - direction type of the scrollbar 'x' or 'y'
    *	int x - x position of the scroll bar (pixels)
    *	int y - y position of the scroll bar (pixels)
    *	int w - width of the scroll bar (pixels)
    *	int h - height of the scroll bar (pixels)
    *
    * See also:
    *
    *	<VegUINode::set_node>
    */
  
  this.set = this.set_scroll = function(dir, x, y, w, h) {
    if(dir)
      this.T.scrollDir = dir; 
    this.set_node(null, w, h, x, y);
  };
  
  /***************************************************************************/
  /** Method: sync
    *
    * Syncs the position and proportions of Btn3 to the Contenr overflow
    * ratio of the CHolder and Content elements. Can also sync the position
    * of the content element to the position of Btn3
    *
    * Parameters:
    *
    *	bool b - if true content is sync'd to scroll bar, if false Btn3 is
    *	synced to content
    * 
    * See also:
    *
    *	<link>
    */
  
  this.sync = function(b) {
    var mod;
    if(!b) {
      
      /* Sync Scrollbar to content */
      
      if(!this.is_x()) {
        if(this.overflow() <= 1) {
          
	  /* No content overflow */
          
	  this.Btn3.move(0, this.Btn1.height());
          this.Btn3.resize(0, this.asa()); 
      
        } else {
          
	  var f = (this.asa() / this.overflow());
        
	  /*
	   * make sure the button does not get resized smaller than its
	   * original scale
	   */

	  if( f >= this.Btn3.origH)
            this.Btn3.resize(null, f);
	  else 
            this.Btn3.resize(null, this.Btn3.origH);
        
	  /* figure out sync ratio */

          var cov_bar = this.Btn3.height() / (this.asa() / 100);
	  var cov_con = this.CHolder.height() / (this.Content.height() / 100);
          
	  if(cov_bar > cov_con)
	    var cov_diff = 1 - (Math.abs(cov_bar - cov_con) / 100);
	  else
	    var cov_diff = 1 + (Math.abs(cov_bar - cov_con) / 100);
	
	  var pos_bcon = Math.abs(this.Content.y())  / ( this.Content.height() / 100);
	  mod = ( (this.asa() / 100) * (pos_bcon*cov_diff)) + this.Btn1.height(); 
        
	  /* sync */
    
          this.Btn3.BBox.enabled = false;
          this.Btn3.move(null, mod);
          this.Btn3.BBox.enabled = true;
          this.Btn3.BBox.correct();
        }
      
      } else {
       
        if(this.overflow() <= 1) {
        
	  this.Btn3.move(this.Btn1.width(), 0);
	  this.Btn3.resize(this.asa(), 0);
        
	} else {
        
	  var f = (this.asa() / this.overflow());
        
	  /*
	   * make sure the button does not get resized smaller than its
	   * original scale
	   */

	  if( f >= this.Btn3.origW)
            this.Btn3.resize(f, null);
	  else 
            this.Btn3.resize(this.Btn3.origW, null);
        
	  /* figure out sync ratio */

          var cov_bar = this.Btn3.width() / (this.asa() / 100);
	  var cov_con = this.CHolder.width() / (this.Content.width() / 100);
         
	  if(cov_bar > cov_con)
	    var cov_diff = 1 - (Math.abs(cov_bar - cov_con) / 100);
	  else
	    var cov_diff = 1 + (Math.abs(cov_bar - cov_con) / 100);
	
	  var pos_bcon = Math.abs(this.Content.x())  / ( this.Content.width() / 100);
	  mod = ( (this.asa() / 100) * (pos_bcon*cov_diff)) + this.Btn1.width(); 
        
	  /* sync */
  
          this.Btn3.BBox.enabled = false;
          this.Btn3.move(mod,null);
          this.Btn3.BBox.enabled = true;
          this.Btn3.BBox.correct();

        }
      }
    } else {
      
      /* Sync Content to scrollbar */
    
      if(!this.is_x()) {
        var pos_bar = (this.Btn3.y()-this.Btn1.height()) / ( (this.asa() - this.Btn3.height()) / 100);
        mod = -(( (this.Content.height() - this.CHolder.height()) / 100)*pos_bar);
        this.Content.move(null, mod);
      } else {
        var pos_bar = (this.Btn3.x()-this.Btn1.width()) / ( (this.asa() - this.Btn3.width()) / 100);
        mod = -(( (this.Content.width() - this.CHolder.width()) / 100)*pos_bar);
        this.Content.move(mod, null);
      }
    }
    this.disable(this.overflow() <= 1);
  };

  /**************************************************************************/
  /** Method: tgl_drag
    *
    * Toggles drag mode on or off. While in drag mode Btn3 will follow 
    * mouse movements
    *
    * Parameters:
    *
    *	bool b - true (on) false (off)
    *
    * See also:
    *
    *	<drag>, <tgl_scroll>
    */
    
  this.tgl_drag = function(b) {
    if(b) {
      var _Scroll = this;
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { _Scroll.drag(mouseX, mouseY); },
        'scrldrg'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('scrldrg');
    }
    this.bDrag = b;
  };
  
  /***************************************************************************/
  /** Method: tgl_scroll
    *
    * Toggles auto scroll mode on or off. If the scrollbar is in auto scroll
    * mode then the content will be scrolled until it is either toggled off
    * again or the content's BBox bumped
    *
    * Parameters:
    *
    *	bool b - true (on) false (off)
    *	bool dir - false = up/left , true = down/right
    *
    * See also:
    *
    *	<scroll>
    */
  
  this.tgl_scroll = function(b, dir) {
    if(b) {
      this.tgl_scroll(0);
      var SB = this;
      this.scrollInterval = setInterval(
        function() { SB.scroll(dir); },
        this.scrollSpeed
      );
    } else {
      clearInterval(this.scrollInterval);
      this.scrollIntervall = null;
    }
  };
  
  /**************************************************************************/
  /** Method: update_content_boundary
    *
    * Updates the BBox settings for the Content element that is linked
    * to this scrollbar
    *
    */
  
  this.update_content_boundary = function() {
    if(!this.Content)
      return;

    var y_diff = this.Content.height() - this.CHolder.height();  
    var x_diff = this.Content.width() - this.CHolder.width();
   
    if(x_diff < 1) x_diff = 0;
    if(y_diff < 1) y_diff = 0;
  
    this.Content.BBox.set(
      (0 - x_diff) - 5,
      (0 - y_diff) - 5,
      this.CHolder.width() + (x_diff * 2) + 5, 
      this.CHolder.height() + (y_diff * 2) + 5,
      true,
      true
    );
  };
 
}
VegUIScrollbar.prototype = VegUINode;
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
 * VegUI FX Manager and effect objects
 *
 * Notes: Tutorials
 *
 * http://www.vegui.org/site/blog/28/vegui-tutorial-17---the-fx-engine.html
 */

/******************************************************************************
 * G L O B A L S **************************************************************
 *****************************************************************************/

/*  Effect 
 *
 *	VUI_FX_TRIGGER - effect that will be triggered right away and
 *	will be removed once done
 *	VUI_FX_HOOK - effect that will be hooked to an element and
 *	be active until removed manually
 */

var VUI_FX_TRIGGER = 1;
var VUI_FX_HOOK = 2;

/* Constants: Effect types
 * 
 *	VUI_FX_FADEIN - fades the element in 
 *	VUI_FX_FADEOUT - fades the element out
 * 	VUI_FX_SHADOW - adds a shadow to the element
 *	VUI_FX_SCALE - grow or shrink an element
 */

var VUI_FX_FADEOUT = 1;
var VUI_FX_FADEIN = 2;
var VUI_FX_SHADOW = 3;
var VUI_FX_SCALE = 4;

/******************************************************************************
 * V E G U I  F X  M A N A G E R **********************************************
 *****************************************************************************/
/** Class: VegUIFXManager
  *
  * Effect manager
  *
  * Properties: Object Properties
  *
  *	Timer - *Interval* , the fx interval
  *	interval - *int*, interval speed (ms) 
  *	effectNum - *int*, number of active effects
  *	Effects - *Array*, holds active effects
  *	Manager - VegUIManager element that the fx manager belongs to
  */

/*****************************************************************************/
/** Constructor: VegUIFXManager 
  *
  * *constructor*
  *
  * Parameters:
  *
  *	VegUIManager Manager - VegUI manager object
  *
  */

function VegUIFXManager(Manager) {
 
  this.Timer = 0;
  this.interval = 20;
  this.effectNum = 0;
  this.Effects = [];
  this.Manager = Manager;
 
  /***************************************************************************/
  /** Method: initialize
    *
    * Initializes the manager at the set interval, note that this does not
    * start the interval timer, it just sets the speed.
    *
    * Paramters:
    *
    *	int interval - fx timer interval (ms)
    *
    * Example:
    *
    * (start code)
    * // initialize the fx manager's effect interval to run at 50 ms
    *
    * FX.init(50);
    * (end)
    *
    */

  this.init = function(interval) {
    this.interval = interval;
  };

  /***************************************************************************/
  /** Method: start
    *
    * Activates the fx timer if any effects are currently active
    *
    * Returns:
    *
    *	null - if Timer is already running
    *   int - *0*, if no effects are queued
    *
    * See Also:
    *
    *	<stop>
    *
    */

  this.start = function() {
    
    if(this.effectNum <= 0)
      return this.stop();
    else if(this.Timer)
      return null;
    
    var FX = this;
    this.Timer = setInterval(function() { FX.poll(); }, this.interval);
  };

  /***************************************************************************/
  /** Method: stop
    *
    * Stops the fx timer
    *
    * Returns:
    *
    *	int - *0*
    */

  this.stop = function() {
    this.Timer = clearInterval(this.Timer);
    this.Timer = null;
    return 0;
  };

  /***************************************************************************/
  /** Method: effect_add
    *
    * Adds an effect to a certain vegui element. Effects are added
    * as objects
    *
    * Parameters:
    *
    *	VegUIElement Element - the vegui element that the effect should hook on
    *	VegUIEffect Effect - the effect
    *	<function onhalt> - if submitted this function will be called when
    *	the effect is done
    *
    * Code example:
    *
    * (start code)
    * FX.effect_add(myNode, new VegUIFxFadeOut(2000));
    * (end)
    *
    * Returns:
    *
    *	VegUIEffect - the effect object
    */

  this.effect_add = function(Element, Effect, onhalt) {
    if(!this.Effects[Element.eleIdx])
      this.Effects[Element.eleIdx] = [];
  
    Effect.collides(this.Effects[Element.eleIdx], true);
    Effect.init(Element, this);

    if(onhalt)
      Effect.onhalt = onhalt;
    
    if(!Element.Effects)
      Element.Effects = [];

    Element.Effects[Effect.type] = Effect;
    
    if(!Effect.isPassive) {
      this.Effects[Element.eleIdx][Effect.type] = Effect;
      this.effectNum++;
      this.start();
    } else {
      
      Effect.execute();

      /* since the effect is passive it wont be added to the processing
       * loop of the fx engine, we still need to make sure it gets
       * halted when the element ceases to exist we do that by adding
       * a onkill event to the element
       */

      Element.event_add(
        'onkill', function() { Effect.halt(); }, 'fx_kill_'+Effect.type
      );
      
    }
    
    return Effect;
  };

  /***************************************************************************/
  /** Method: effect_pop
    * 
    * a certain effect for the element with the submited element index
    *
    * Parameters:
    *
    *	int eleIdx - element index of the vegui element
    *	int type - effect type
    *
    * Example:
    *
    * (start code)
    * // add fade out effect to myNode
    * FX.effect_add(myNode, new VegUIFxFadeOut(2000));
    *
    * // remove fade out effect from myNode
    * FX.effect_pop(myNode.eleIdx, VUI_FX_FADEOUT);
    * (end)
    */

  this.effect_pop = function(eleIdx, type) {
    if(this.Effects[eleIdx] && this.Effects[eleIdx][type]) {
      var E = this.Effects[eleIdx][type];
      
      if(E.isPassive) {
        E.Element.onkill.free('fx_kill_'+E.type);
      }
      
      delete this.Effects[eleIdx][type];
      this.effectNum--;
    }
    if(this.effectNum<=0)
      this.stop();
  };

  /***************************************************************************/
  /** Method: poll
    *
    * This is the function that is repeatedly called by the fx timer. It
    * polls the Effects array for any active effects and executes them
    * 
    * *private function*
    *
    */

  this.poll = function() {


    if(this.effectNum <= 0)
      return this.stop();
    
    var i, n, e, effect, element;

    for(i in this.Effects) {
      e = this.Effects[i];
      for(n in e) {
        effect = e[n];
	if(!effect.Element || !effect.Element.Base)
	  this.effect_pop(parseInt(i),effect.type);
	else
	  effect.execute();
      } 
    }
   

  };
}

/******************************************************************************
 * V E G U I  E F F E C T *****************************************************
 *****************************************************************************/
/** Class: VegUIEffect
  *
  * The base object for any effect
  *
  * Properties: Object Properties
  *
  *	Element - VegUIElement, the element this effect is affecting
  *	type - *int*, effect type
  *	Manager - <VegUIFXManager>, FX manager that controls this effect
  *	isPassive - *bool*, if true the effect will be executed when it
  *	is created and will not be added to the processing loop of the
  *	fx engine
  *
  */

/*****************************************************************************/
/** Constructor: VegUIEffect
  *
  * *constructor*
  */
  
function VegUIEffect() {

  this.Element = null;
  this.effectType = VUI_FX_TRIGGER;
  this.type = 0;
  this.Manager = null;
  
  this.Collision = [];

  this.onhalt = function() { return 1; };
  this.execute = function() { return 1; }; 

  /**************************************************************************/
  /** Method: collides
    *
    * Check if effect type exists in an array that collides with this
    * array. When effects collide it means that they can not be affecting
    * the same target at the same time, and one will have to be canceled
    *
    * Parameters:
    *
    *	Array effects - the array holding the effect objects
    *	bool cancelOther - if true the effect in the effects array will be
    *   canceled if false 1 will be returned
    *
    * Returns:
    *
    *	int - *1* if there were coliding effects and cancelOther was
    *	false
    */

  this.collides = function(Effects, cancelOther) {
  
    var i, E; 

    for(i in Effects) {
      E = Effects[i];
      if(E == this) 
        continue;
      if(this.Collision[E.type]) {
	if(!cancelOther) {
	  return 1;
	} else {
          E.halt(true);
	}
      } 
    }
  
  };

  /**************************************************************************/
  /** Method: init 
    *
    * Initialize effect
    *
    * Parameters:
    *
    *	VegUIElement Element - element this effect is affecting
    *	VegUIFXManager Manager - Manager that controls this effect
    */

  this.init = function(Element, Manager) {
    this.Element = Element;
    this.Manager = Manager;
  };

  /**************************************************************************/
  /** Method: halt_effect
    *
    * Alias:
    *
    *	halt()
    *
    * Halts this effect, effectivly removing it
    *
    * Parameters:
    *
    *	bool noOnHalt - if true <onhalt> will not be called
    */

  this.halt = this.halt_effect = function(noOnHalt) {
    this.Manager.effect_pop(this.Element.eleIdx, this.type);
    if(!noOnHalt && this.onhalt) {
      this.onhalt();
    }
  };

}

/******************************************************************************
 * V E G U I  E F F E C T  F A D E  O U T *************************************
 *****************************************************************************/
/** Class: VegUIFXFadeOut
  *
  * fades the target element out, gradually reducing its transparency value
  * to 0
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_FADEOUT>
  *
  * Notes: Example
  *
  * (start code) 
  * // add fade out effect to myNode with a duration of 1000 ms
  * 
  * FX.effect_add(myNode, new VegUIFXFadeOut(1000));
  *
  * // add fade out effect to myNode with a duration of 1000 ms and
  * // stop the effect when a transparency of 50% is reached
  *
  * FX.effect_add(myNode, new VegUIFXFadeOut(1000, 50));
  * (end)
  *
  * Properties: Object Properties
  *
  *	fadeSpeed - *int*, speed of fading (ms)
  *	limit - *int*, effect will stop when this amount of transparency
  *	is reached
  *
  */

/******************************************************************************/
/** Constructor: VegUIFXFadeOut
  *
  * *concstructor*
  *
  * Parameters:
  *
  *	int fadeSpeed - speed of fading (ms)
  *	int limit - effect will stopped when this amount of transparency
  *	is reached
  */

function VegUIFXFadeOut(fadeSpeed, limit) {

  this.constructor = VegUIEffect;
  this.constructor();

  this.type = VUI_FX_FADEOUT;
  
  this.limit = limit || 0;
  this.fadeSpeed = fadeSpeed || 1000;

  this.Collision[VUI_FX_FADEOUT] = true;
  this.Collision[VUI_FX_FADEIN] = true;

  /***************************************************************************/
  /** Method: execute
    *
    * Execute effect
    */

  this.execute = function() {
    if(!this.Element || !this.Element.Base || !this.Manager)
      return null;

    var interval = 100 / (this.fadeSpeed / this.Manager.interval);
     
    var t = this.Element.transparency;

    if(t > this.limit) 
      this.Element.set_transparency(t-interval);
    else
      this.halt();
  };

}
VegUIFXFadeOut.prototype = VegUIEffect;

/******************************************************************************
 * V E G U I  E F F E C T  F A D E  I N ***************************************
 *****************************************************************************/
/** Class: VegUIFXFadeIn
  * fades the target element in, gradually increasing its transparency value
  * to 100
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *	
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_FADEIN>
  *
  * Notes: Example
  *
  * (start code)
  * // add the fade in effect with a duration of 1000 ms to myNode
  *
  * FX.effect_add(myNode, new VegUIFXFadeIn(1000));
  *
  * // add the fade in effect with a duration of 1000 ms to myNode, and
  * // make it stop when a transparency of 50% is reached
  *
  * FX.effect_add(myNode, new VegUIFXFadeIn(1000, 50));
  * (end)
  *
  * Properties: Object Properties
  *
  *	fadeSpeed - *int*, speed of fading (ms)
  *	limit - *int*, effect will stop when this transparency value is
  *	reached
  *
  */

/*****************************************************************************/
/** Constructor: VegUIFXFadeIn
  *
  * *constructor*
  *
  * Parameters:
  *
  *	int fadeSpeed - speed of fading (ms)
  *	int limit - stop when limit is reached (min 0, max 100) 
  */

function VegUIFXFadeIn(fadeSpeed, limit) {

  this.constructor = VegUIEffect;
  this.constructor();

  this.type = VUI_FX_FADEIN;

  this.fadeSpeed = fadeSpeed || 1000;
  this.limit = limit || 100;

  this.Collision[VUI_FX_FADEOUT] = true;
  this.Collision[VUI_FX_FADEIN] = true;

  /***************************************************************************/
  /** Method: execute
    * Executes effect
    */

  this.execute = function() {
    if(!this.Element || !this.Element.Base || !this.Manager) {
      return null;
    }

    var interval = 100 / (this.fadeSpeed / this.Manager.interval);

    var t = this.Element.transparency;

    if(t < this.limit) 
      this.Element.set_transparency(t+interval);
    else
      this.halt();
  };

}
VegUIFXFadeIn.prototype = VegUIEffect;

/*****************************************************************************/
/** Class: VegUIFXShadow
  *
  * Adds a shadow effect to a specified vegUI element
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *	
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_SHADOW>
  *
  * Notes: Tutorials
  *
  *	http://www.vegui.org/site/blog/51/applying-effects-to-template-elements.html
  *
  * Notes: Example
  *
  * (start code)
  * // add shadow effect to myNode at an off set of 5 pixels on the x axis
  * // and 10 pixels on the y axis, with an opacity of 50% and the color
  * // black
  *
  * FX.effect_add(myNode, new VegUIFXShadow(5,10,50,'#000');
  * (end)
  *
  * Properties: Object Properties
  *
  *	x - *int*, x offset of the shadow
  *	y - *int*, y offset of the shadow
  *	opacity - *int*, the opacity of the outer shadow
  *	color - *string*, color of the shadow (css value)
  *	shadowNode - *VegUINode*, holds the shadow node
  *
  */
/*****************************************************************************/
/** Constructor: VegUIFXShadow */

function VegUIFXShadow(x, y, opacity, color) {
  
  /*
   * constructor
   */

  this.constructor = VegUIEffect;
  this.constructor();

  /*
   * properties
   */

  this.type = VUI_FX_SHADOW;
  this.x = x || 8;
  this.y = y || 8;
  this.opacity = opacity || 15;
  this.color = color || '#000';

  this.ShadowNode = null;

  this.isPassive = true;

  /*
   * methods
   */

  /***************************************************************************/
  /** Method: execute 
    * executes effect
    */

  this.execute = function() {
    if(!this.Manager || this.ShadowNode)
      return;

    var M = this.Element.Manager;

    /* create shadow node */
    
    var SN = this.ShadowNode = M.get_new(VUI_NODE);
    SN.T.Css.backgroundColor = this.color;
    SN.T.t = this.opacity;
    SN.set('div', this.Element.width(), this.Element.height());

    /* attach shadow node to the element */
    
    this.Element.attach(this.ShadowNode, this.x, this.y, VUI_BACK);
    
    /* make sure shadow node is resized correctly with the element */

    this.Element.event_add(
      'onresize',
      function(a) { SN.resize(a[0].width(), a[0].height()); },
      'fx_shadow'
    );

    this.Element.event_add(
      'onhide',
      function(a) { SN.hide(a[0].is_hidden()); },
      'fx_shadow'
    );

    M.build_element(
      this.ShadowNode, this.Element.Base.parentNode
    );
  };

  /***************************************************************************/
  /** Method: halt_fx_shadow
    *
    * Alias:
    *
    *	halt()
    *
    * Parameters:
    *
    *	<bool noOnHalt> - if true the onhalt event of the effect will not
    *	be fired
    *
    * See Also:
    *
    *	<VegUIEffect::halt>
    */

  this.halt = this.halt_fx_shadow = function(noOnHalt) {
    
    this.ShadowNode.kill(1);
    
    this.halt_effect(noOnHalt);
  };

}
VegUIFXShadow.prototype = VegUIEffect;

/*****************************************************************************/
/** Class: VegUIFXScale
  *
  * Adds a scaling effect to a vegui element that lets it either grow
  * into view or shrink out of view.
  *
  * Notes: Hierarchy
  *
  *	extends <VegUIEffect>
  *
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_SCALE>
  *
  * Notes: Example
  *
  * (start code)
  * // First we define the stunt node, the stunt node is the element
  * // that we will use to visualize the effect
  * 
  * var StuntNode = Manager.get_new(VUI_NODE);
  *
  * // you can style it whichever way you want but we will just give
  * // it a white border in our example
  *
  * StuntNode.T.Css.border = '1px #fff solid';
  * Manager.build_element(StuntNode);
  *
  * // add the effect to shrink the node towards the coordinates
  * // 50,50 in 500 ms. The stunt node will be placed at
  * // z-index of 1000
  *
  * FX.effect_add(50,50,500,1,StuntNode,true,1000);
  * (end)
  *
  * Object Properties:
  *
  *	x - *int*, when growing the effect will start from here, when
  *	shrinking it will end here (x axis)
  *	y - *int*, when growing the effect will start from here, when
  *	shrinking it will end here (y axis)
  *	speed - *int*, scaling time (ms)
  *	StuntNodeTemplate - *VegUIElement*, template that will be used to clone the node
  *     that will be shown instead of the target element when unreasonable small sizes are reached
  *	StuntNode - *VegUIElement*, holds the built StuntNode element while
  *	the effect is active
  *	phase - *int*, the current phase of the effect
  *	scaleType - *int*, defines if the effect grows or shrinks the element
  *	(0 = grow, 1 = shrink)
  *	useFade - *bool*, if true the stunt node will be faded in/out as
  *	it moves
  *	fadeLimit - *int*, fade limit, if useFade is active fadeLimit prevents
  *	the fading past a certain value
  *	z - *int*, z index of the stunt node
  */

/*****************************************************************************/
/** Constructor: VegUIFXScale */

function VegUIFXScale(x, y, speed, scaleType, StuntNodeTemplate, useFade, z, fadeLimit) {

  /* 
   * Constructor
   */

  this.constructor = VegUIEffect;
  this.constructor();

  /*
   * Properties
   */

  this.type = VUI_FX_SCALE;
  this.x = x || 0;
  this.y = y || 0;
  this.speed = speed || 500;
  this.StuntNodeTemplate = StuntNodeTemplate || null;
  this.StuntNode = null;
  this.phase = 0;
  this.scaleType = scaleType || 0;
  this.useFade = useFade || false;
  this.rw = this.rh = this.mvx = this.mvy = 0;
  this.fadeLimit = 0;
  this.z = z || 0;

  /*
   * Methods
   */

  /***************************************************************************/
  /** Method: execute
    * executes/processes the effect
    */

  this.execute = function() {
    if(!this.Manager)
      return null;

    var M = this.Element.Manager;
    
    switch(this.phase) {
      
      /* 
       * Phase 0, effect has been created, StuntNode has not been created
       * yet.
       */
      
      case 0:
        
        if(!this.StuntNodeTemplate)
	  return;

        /* create StuntNode from StuntNodeTemplate */

	this.StuntNode = M.get_clone(this.StuntNodeTemplate);
	this.StuntNode.T.z = this.z;
	M.build_element(this.StuntNode, this.Element.Base.parentNode);
	
	if(!this.scaleType) {
	  this.StuntNode.move(this.x, this.y);
          this.StuntNode.resize(1,1);	
	  this.w = 1;
	  this.h = 1;
	  this.toW = this.Element.width();
	  this.toH = this.Element.height();
	  this.toX = this.Element.x();
	  this.toY = this.Element.y();
	  if(this.useFade)
	    this.StuntNode.set_transparency(1);
	} else {
	  this.StuntNode.move(this.Element.x(), this.Element.y());
          this.StuntNode.resize(this.Element.width(), this.Element.height());
	  this.toW = 1;
	  this.toH = 1;
	  this.w = this.Element.width();
	  this.h = this.Element.height();
	  this.toX = this.x;
	  this.toY = this.y;
	  this.x = this.Element.x();
	  this.y = this.Element.y();
	  if(this.useFade)
	    this.StuntNode.set_transparency(100);
	}
	 
	this.Element.hide(1);
        
        this.phase++;

      break;

      /*
       * Phase 1, StuntNode has been created and positioned start
       * scaling
       */

      case 1:
        
	/*
	 * resize node
	 */

        var r = (this.speed / this.Manager.interval);
        var N = this.StuntNode;

        this.rw += (Math.abs(this.toW - this.w) / r);
	this.rh += (Math.abs(this.toH - this.h) / r);

	/* check if the size is at the targeted size yet */
	  
	var w = (N.width() == this.toW);
	var h = (N.height() == this.toH);
          
	/* if not, grow node */

        if((!w && this.rw>=1) || (!h && this.rh>=1)) {
          
	  var rw = Math.floor(this.rw);
	  var rh = Math.floor(this.rh);
	
	  var uW = (!w ? (!this.scaleType ? N.width()+rw : N.width()-rw) : null);
	  var uH = (!h ? (!this.scaleType ? N.height()+rh : N.height()-rh) : null);
          N.resize(
	    (uW > -1 ? uW : 1) , (uH > -1 ? uH : 1)
	  );
	}

	if(this.rw >= 1)
	  this.rw = (this.rw - Math.floor(this.rw));
	if(this.rh >= 1)
	  this.rh = (this.rh - Math.floor(this.rh));

        /* check if node is bigger than targeted size, if so
	 * correct it to be the targeted size
	 */

        if(!w)
	  w = (!this.scaleType ? (N.width() > this.toW) : (N.width() < this.toW));
        if(!h)
	  h = (!this.scaleType ? (N.height() > this.toH) : (N.height() < this.toH));
       
        if(w || h) {
          N.resize(
	    (w ? this.toW : null),
	    (h ? this.toH : null)
	  );
	}

        /* 
  	 * Move node
	 */

	this.mvx += (Math.abs(this.x - this.toX) / r);
	this.mvy += (Math.abs(this.y - this.toY) / r);

	/* check if the position is at the targeted position yet */

	var x = (N.x() == this.toX);
	var y = (N.y() == this.toY);

	/* if not, move node */

	if((!x && this.mvx>=1) || (!y && this.mvy>=1)) {
          
	  var mx = Math.floor(this.mvx);
	  var my = Math.floor(this.mvy);
	
          N.move(
	    (!x ? (this.toX > N.x() ? N.x()+mx : N.x()-mx) : null),
	    (!y ? (this.toY > N.y() ? N.y()+my : N.y()-my) : null)
	  );
	}

	if(this.mvx >= 1)
	  this.mvx = (this.mvx - Math.floor(this.mvx));
	if(this.mvy >= 1)
	  this.mvy = (this.mvy - Math.floor(this.mvy));

	/* check if node is close to its target position if it is
	* move it there
	*/

	x = (Math.abs(N.x() - this.toX) <= (Math.abs(this.x - this.toX) / r));
	y = (Math.abs(N.y() - this.toY) <= (Math.abs(this.y - this.toY) / r));
     
        if(x || y) {
          N.move(
	    (x ? this.toX : null),
	    (y ? this.toY : null)
	  );
	}

	if(this.useFade) {
	  
	  if( !(this.scaleType && this.StuntNode.transparency <= this.fadeLimit) && !(!this.scaleType && this.StuntNode.transaprency >= this.fadeLimit)) {
	    this.StuntNode.set_transparency(
	      !this.scaleType ? 
	      this.StuntNode.transparency + (100 / r) :
	      this.StuntNode.transparency - (100 / r)
	    );
	  }
	}
        
	if(w && h && x && y)
	  this.halt();

      break;
      
    } 
  };

  /****************************************************************************/
  /** Method: halt_scale
    *
    * halts the event
    *
    * Alias:
    *
    *	halt()
    *
    * See also:
    *
    *	<VegUIEffect::halt>
    */

  this.halt_scale = this.halt = function() {
    if(!this.scaleType) {
      this.Element.move(this.StuntNode.x(), this.StuntNode.y());
      this.Element.resize(this.StuntNode.width(), this.StuntNode.height());
      this.Element.hide(0);
    }
    this.StuntNode.kill(1);
    this.halt_effect();
  };

}
VegUIFXScale.prototype = VegUIEffect;
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

/** Constant: VUI_CHECKBOX
  * VegUI element type for <VegUICheckBox>
  */

var VUI_CHECKBOX = 13;

vui_module_add(VUI_CHECKBOX, VegUICheckBox, 'vegui.checkbox.class.js');

/******************************************************************************
 * V E G U I  C H E C K B O X *************************************************
 *****************************************************************************/
/** Class: VegUICheckBox
  *
  * The checkbox widget
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
  *    |
  *    +--> VegUICheckBox
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_CHECKBOX>
  *
  * Notes: Child Elements:
  *
  *	These child elements are all accessable over *this.[child_name]
  *	even though they may not all be direct children of this element
  *
  *	BtnCheck - *VUI_BUTTON* Button that represents the check box
  *	Label - *VUI_NODE* Node that holds the text that appears besides the buttton
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/13/vegui-tutorial-08---the-checkbox-widget.html
  *
  * Properties: Object Properties
  *
  *	isChecked - *bool* holds the checked status of the checkbox, true if
  *	it is checked, false if it is unchecked
  *	labelTxt - *string* text of the label
  *	cClass - *string* Css class to use for BtnCheck when checked
  *	ucClass - *string* Css class to use for BtnCheck when unchecked
  *
  * Properties: Template Properties
  *
  *	T.labelTxt - <labelTxt>
  *	T.cClass - <cClass>
  *	T.ucClass - <ucClass>
  *	T.checked - *bool* if ture checkbox will be checked by default
  *
  */
  
/*****************************************************************************/
/** Constructor: VegUICheckBox
  *
  * *Constructor*
  *
  * Parameters:
  *
  * 	string refName - name of the object
  *	<VegUIElement Parent> - parent element of the object
  *	VegUIElement Manager - manager element of the object
  *
  * See also:
  *
  *	<VegUINode::VegUINode>
  */

function VegUICheckBox(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /** 
   * Properties
   */

  this.type = VUI_CHECKBOX;
  this.isChecked = 0;

  /**
   * Child elements
   */

  this.BtnCheck = this.add_child('BtnCheck', VUI_BUTTON);
  this.Label = this.add_child('Label', VUI_NODE);
  this.BtnLabel = this.add_child('BtnLabel', VUI_BUTTON);

  this.Label.set('div', null, 14, 15, 0);
  this.Label.set_marg(0);


  this.BtnCheck.States[VUI_MOUSE_DOWN].Scripts.add(
    function(argArr) {
      argArr[0].Parent.tgl_check();
    }
  );

  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: build_cb
    *
    * Builds the checkbox
    *
    * *private function*
    *
    * You should always use the <VegUIManager::build_element> function
    * to build elements.
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
    * See also:
    *
    *	<VegUINode::build_node> 
    */

  this.build = this.build_cb = function(toNode) {
    this.labelTxt = this.T.labelTxt;
    this.isChecked = this.T.checked ^ 1;
    this.cClass = this.T.cClass;
    this.ucClass = this.T.ucClass;
    
    var BL = this.BtnLabel;
    this.Label.event_add(
      'onresize',
      function(a) { BL.resize(a[0].width(), a[0].height()); }
    );

    if(!this.build_node(toNode))
      return null;

    this.Label.attach(this.BtnLabel,0,0,VUI_FRONT, 1);
    this.BtnLabel.States[VUI_MOUSE_DOWN].Scripts.add(
      function(a) { 
        a[0].Parent.tgl_check();
      }
    );

    this.tgl_check();

    this.Label.clear(document.createTextNode(this.labelTxt));

    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: set_cb
    *
    * Sets the most common template properties for the checkbox
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
    *	int h - height (pixels)
    *	string label - text to be displayed in the label
    *	bool checked - if true the checkbox will be checked by default
    *	string cClass - CSS class to use for BtnCheck when checked
    *	string ucClass - CSS class to use for BtnCheck when unchecked
    *
    * See also:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * myCheckBox.set(5,5,150,20,'Enable Something!',false,'cb_checked','ch_unchecked');
    * (end)
    */
  
  this.set = this.set_cb = function(x,y,w,h,label, checked, cClass, ucClass) {
    this.set_node('div', w, h, x, y);
    if(label) this.T.labelTxt = label;
    if(checked !== null) this.T.checked = parseInt(checked);
    if(cClass) this.T.cClass = cClass;
    if(ucClass) this.T.ucClass = ucClass;
  };
  
  /***************************************************************************/
  /** Method: tgl_check
    *
    * Toggles checkbox to be checked or unchecked
    *
    * Parameters:
    *
    *	bool b - true = checked , false = unchecked
    *	bool noOnChange - if true will prevent <VegUINode::onchange> from 
    *	being called
    *
    * Example:
    *
    * (start code)
    * // checkbox will be set to unchecked 
    * 
    * myCheckBox.tgl_check(false);
    *
    * // checkbox will be set to checked
    * 
    * myCheckBox.tgl_check(true);
    *
    * // set onchange event for the checkbox
    * 
    * myCheckBox.event_add('onchange', function(a) {
    *   alert(a[0].isChecked);
    * });
    *
    * // checkbox will be set to checked and the onchange
    * // event will fire
    *
    * myCheckBox.tgl_check(true);
    *
    * // onchange event will not fire 
    *
    * myCheckBox.tgl_check(true, true);
    * (end)
    *
    */
  
  this.tgl_check = function(b, noOnChange) {
  
    if(b != undefined)
      this.isChecked = (b ? 1 : 0) ^ 1;

    this.isChecked ^= 1;
    if(this.isChecked == 1) {
      this.BtnCheck.Base.className = this.cClass;
    } else if(this.isChecked == 0)
      this.BtnCheck.Base.className = this.ucClass;
    if(!noOnChange)
      this.event_execute('onchange');
  };

  
}
VegUICheckBox.prototype = VegUINode;
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
 * G L O B A L S
 *****************************************************************************/
 

/**
 * Constants: Flags
 *
 * Bitmask flags that can be set on the flags property of the VegUIContentBox widget
 *
 * These flags need to be set before the element is built
 *
 * VUI_HIDE_SCROLLX - hide the x axis scrollbar
 * VUI_HIDE_SCROLLY - hide the y axis scrollbar
 * VUI_HIDE_SCROLLS - hide both scrollbars
 */

var VUI_HIDE_SCROLLX = 0x80;
var VUI_HIDE_SCROLLY = 0x100;
var VUI_HIDE_SCROLLS = VUI_HIDE_SCROLLX | VUI_HIDE_SCROLLY;

/** 
 * Constant: VUI_CBOX
 * vegUI element type for <VegUIContentBox> */

var VUI_CBOX = 5;

vui_module_add(VUI_CBOX, VegUIContentBox, 'vegui.cbox.class.js');

/******************************************************************************
 * V E G U I C O N T E N T B O X
 *****************************************************************************/
/** Class: VegUIContentBox
  *
  * A scrollable frame to display content in. 
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
  *    +--> VegUIContentBox
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_CBOX>
  *
  * Notes: Requires
  *
  *	file - <vegui.scrollbar.class.js>
  *
  * Notes: Flags
  *
  *	These flags are turned on for this element by default
  *
  *	<VUI_HMOUSE_WHEEL> | <VUI_HMOUSE_OVER> | <VUI_HMOUSE_OUT>
  *
  *
  * Notes: Properties
  *
  *	noKeyScrolling - *bool*, if true, scrolling via keyboard keys will be disabled
  *
  * Notes: Template Properties
  *
  *	T.noKeyScrolling - <noKeyScrolling>
  *
  * Notes: Child Elements
  *
  *	These elements are all accessable over *this.[child_name]* even
  *	though they may not all be direct children of this element
  *
  *	CHolder - <VegUINode>, Content holder node, the frame
  *	Content - <VegUINode>, Content node
  *	ScrollX - <VegUIScrollbar>, X Axis Scroll
  *	ScrollY - <VegUIScrollbar>, Y Axis Scroll
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/14/vegui-tutorial-09---the-content-box-widget.html
  */

/***************************************************/
/** Constructor */

function VegUIContentBox(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
  
  this.type = VUI_CBOX;
  this.noKeyScrolling = false;
  
  this.CHolder = this.add_child('CHolder', VUI_NODE);
  this.Content = this.CHolder.add_child('Content', VUI_NODE);
  this.CHolder.T.rmarg = 15;
  this.CHolder.T.bmarg = 15;

  /* Set up Y Axis scrollbar */  
  
  this.ScrollY = this.add_child('ScrollY', VUI_SCROLL);
  this.ScrollY.set('y');
  this.ScrollY.T.rmarg_nr = 0;
  this.ScrollY.T.bmarg = 15;
  
  /* Set up X Axis scrollbar */
  
  this.ScrollX = this.add_child('ScrollX', VUI_SCROLL);
  this.ScrollX.set('x');
  this.ScrollX.T.bmarg_nr = 0;
  this.ScrollX.T.rmarg = 15;

  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: build_cbox
    *
    * builds the content box
    *
    * *private function*
    *
    * Elements should always be build using the vegui manager
    *
    * <VegUIManager::build_element>, <VegUIManager::build_elements>
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
    */
 
  this.build = this.build_cbox = function(toNode) {
  
    var CB = this;
    var Man = this.Manager;

    this.flags |= VUI_HMOUSE_WHEEL | VUI_HMOUSE_OVER | VUI_HMOUSE_OUT;
    
    this.noKeyScrolling = this.T.noKeyScrolling;

    this.States[VUI_MOUSE_OVER].Scripts.add(
      function() {
	if(Man.focusedElement) {
	  if(Man.focusedElement == this)
	    return 0;
          if(Man.focusedElement.is_parent(CB))
	    return 0;
	}
	CB.set_focus(CB.ScrollY.overflow() ? VUI_FOCUS_ACTIVE : VUI_FOCUS_PASSIVE);
      }
    );

    this.States[VUI_MOUSE_OUT].Scripts.add(
      function() {
        if(has_parent(CB.toE, CB.Base))
	  return;
	  
	if(Man.focusedElement == CB) {
	  CB.lose_focus();
        }
      }
    );

    this.States[VUI_MOUSE_WHEEL].Scripts.add(
      function() {
	if(!CB.ScrollY.overflow())
          return;
        if(CB.delta > 0)
          CB.ScrollY.scroll(0,3);
        else if(CB.delta < 0)
          CB.ScrollY.scroll(1,3);
      }
    );
    
    this.States[VUI_KEY_DOWN].Scripts.add(
      function() { CB.handle_key(); }
    );
 
    this.event_add(
      'onfocusset', 
      function(args) {
        if(!CB.noKeyScrolling)
	  args[0].Manager.block_key([33,34,37,38,39,40]);
      }
    );

    this.event_add(
      'onfocuslose',
      function(args) {
        if(!CB.noKeyScrolling)
	  args[0].Manager.unblock_key([33,34,37,38,39,40]);
      }
    );
    
    if(!this.build_node())
      return null;
   
    if(this.flags & VUI_HIDE_SCROLLX)
      this.ScrollX.noAutoShow = true;
    
    if(this.flags & VUI_HIDE_SCROLLY)
      this.ScrollY.noAutoShow = true;
   
    this.CHolder.Css.overflow = 'hidden';
    this.ScrollY.link(this.CHolder, this.Content);
    this.ScrollX.link(this.CHolder, this.Content);
    this.ScrollX.hide((this.flags & VUI_HIDE_SCROLLX));
    this.ScrollY.hide((this.flags & VUI_HIDE_SCROLLY));
    this.dock(toNode);
    return 1;
  
  };
  
  /***************************************************************************/
  /** Method: fill
    *
    * Fills the Content child of the content box with an existing HTML node
    *
    * Parameters:
    *
    *	HTMLNode Node - Node that should be displayed by the content box
    *
    * Code example:
    *
    * (start code)
    * myCBox.fill(document.getElementById('stuff'));
    * (end)
    *
    * See also:
    *
    *	<fill_remote>
    *
    * Example:
    *
    * (start code)
    * // fill content box with existing node 
    *
    * myCBox.fill(document.getElementById('some_element'));
    *
    * // fill content box with new node 
    *
    * myCBox.fill(htmlnode('div'));
    * (end)
    */
  
  this.fill = function(Node) {
    if(!Node || !Node.nodeName || !this.Base)
      return null;

    this.Content.clear();
    this.Content.Base.appendChild(Node);

    /* set bounding box for content */
    this.update_bbox();
    this.ScrollY.sync();
    this.ScrollX.sync();
  };
  
  /***************************************************************************/
  /** Method: fill_remote
    *
    * Fills the content child of the content box with the contents of a html
    * file
    *
    * Requires:
    *
    *	file - <vegui.bridge.class.js>
    *	action - <VegUIManager::init_bridge> needs to have been called on
    *	the manager element
    *
    * Parameters:
    *
    *	string path - path of file to load. 
    *	<function ondone> - function to execute when done
    *
    * Note:
    *
    *	The file needs to be on the same server as the page where the content 
    *	box is located on is. The file's contents will be added as innerHTML to 
    *   the Content node so using HTML tags in the file is encouraged
    *
    * See also:
    *
    *	<fill>
    *
    * Example:
    *
    * (start code)
    * // fills the content box with the contents of file.html, note
    * // that it will be rendered correctly
    *
    * myCBox.fill_remote('file.html');
    *
    * // same as above, the function submitted will be executed once
    * // the content box has been filled
    *
    * myCBox.fill_remote('file.html', function() { alert('done'); });
    * (end)
    */
  
  this.fill_remote = function(path, ondone) {
 
    var CB = this, Bridge = this.Manager.Bridge;
  
    if(!Bridge) {
      CB.fill(txtnode('vegUI Error: no bridge found'));
      return;
    }
  
    /* define process function that will add the data
     * to the content box's content node
     */

    var pFunc = function() {
      var node = htmlnode('div');
      node.innerHTML = this.request.responseText;
      CB.Content.clear();
      CB.fill(node);
      if(ondone)
        ondone();
    };

    /* send request */

    Bridge.send(path, null, 'get', pFunc);
  
  };
   
  /***************************************************************************/
  /** Method: handle_key_cbox
    *
    * Handles key input on the element, this private function is called
    * whenever a key is hit on the keyboard while the element is focused.
    *
    * *private function*
    *
    * Alias:
    *
    *	<handle_key>
    *
    */

  this.handle_key = this.handle_key_cbox = function() {
    
    if(!this.mEvent)
      return;
    
    switch(this.aKey) {
      case 33:
        var d = Math.abs(this.Content.y());
	var i = (d < this.CHolder.height()) ? d : this.CHolder.height();
	this.Content.move(
	  this.Content.x(), this.Content.y()+i
	);
	this.ScrollY.sync();
      break;
      case 34:
        var d = this.Content.y2()-this.CHolder.height();
	var i = (d < this.CHolder.height()) ? d : this.CHolder.height();
	this.Content.move(
	  this.Content.x(), this.Content.y()-i
	);
	this.ScrollY.sync();
      break;
      break;
      case 37:
        if(!this.noKeyScrolling)
	  this.ScrollX.scroll(0,2);
      break;
      case 38:
        if(!this.noKeyScrolling)
          this.ScrollY.scroll(0,2);
      break;
      case 39:
        if(!this.noKeyScrolling)
	  this.ScrollX.scroll(1,2);
      break;
      case 40:
        if(!this.noKeyScrolling)
          this.ScrollY.scroll(1,2);
      break;
    }
    
  };
  
 
  /***************************************************************************/
  /** Method: set_cbox
    * 
    * Set the most common template properties for this element
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
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * myCBox.set(500,500,5,5);
    * (end) 
    */
  
  this.set = this.set_cbox = function(w,h,x,y) {
    this.set_node(null,w,h,x,y);
  };
  
  /***************************************************************************/
  /** Method: update_bbox
    *
    * Updates bounding box of the content child
    *
    * This function actually gets called automatically when the 
    * <VegUINode::resize> method is called on it.
    *
    */
  
  this.update_bbox = function() {
    this.ScrollX.update_content_boundary();

    if(this.ScrollY.overflow() <= 1)
      this.Content.move(null, 0);
    if(this.ScrollX.overflow() <= 1)
      this.Content.move(0, null);
  };
  
  this.event_add('ondock', function(a) {
    a[0].ScrollY.sync();
    a[0].ScrollX.sync();
  });
  

  this.event_add('onresize', function(a) {
    if(!a[0].Base || !a[0].Base.parentNode)
      return;
    a[0].update_bbox();
    a[0].ScrollY.sync();
    a[0].ScrollX.sync();
  });
}
VegUIContentBox.prototype = VegUINode;
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
 * G L O B A L S
 *****************************************************************************/

/** Constant: VUI_BUTTON
  * vegUI element type for <VegUIButton>
  */

var VUI_BUTTON = 4;

vui_module_add(VUI_BUTTON, VegUIButton, 'vegui.button.class.js');

/******************************************************************************
 * V E G U I B U T T O N
 *****************************************************************************/
/** Class: VegUIButton
  *
  * Notes: Hierachy
  *
  * *extends VegUINode*
  *
  * Inherits properties and functions from: <VegUINode>
  * 
  * (start code)
  * VegUINode
  *     |
  *     +--> VegUIButton
  * (end)
  *
  * The button widget
  *
  * Notes: Type
  *
  *	<VUI_BUTTON>
  *
  * Notes: Flags
  *
  *	These flags are turned on for this element by default
  *
  *	<VUI_HMOUSE_DOWN>
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/12/vegui-tutorial-07---the-button-widget.html
  *
  * Properties: Template Properties
  *	
  *	T.caption - *string*, if set the button will be filled with a textnode
  *	T.captionChildName - *string*, if set the child with this name will
  *	be used to hold the caption text. This is useful when you add one
  *	or more skin childs to the button
  *
  */

/*****************************************************************************/
/** Constructor: VegUIButton
  *
  * *Constructor*
  *
  * Parameters:
  *
  *	string refName - name of the element
  *	<VegUIElement Parent> - Parent element
  *	VegUIElement Manager - Manager element
  *
  * See also:
  *
  *	<VegUINode::VegUINode>
  */

function VegUIButton(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
 
  /**
   * Properties
   */
   
  this.type = VUI_BUTTON;
  
  this.flags |= VUI_HMOUSE_DOWN;
  this.T.micon = 'pointer';
 
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Method: build_button
    *
    * Builds the button element
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
    * See also:
    *
    *	<VegUINode::build_node>
    *
    */
  
  this.build = this.build_button = function(toNode) {
  
    this.origW = this.T.w;
    this.origH = this.T.h;
    this.captionChildName = this.T.captionChildName;

    if(this.T.caption) {
      var SelBlock = this.add_skin('SelectionBlocker',0,0,0,0,0,0,0);
      SelBlock.T.z = 50;
    }

    if(!this.build_node())
      return null;
    
    this.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { 
        argArr[0].Manager.Base.ondragstart = function() { return false };
        argArr[0].Manager.Base.onselectstart = function() { return false };
      }
    );

    this.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) {
        argArr[0].Manager.Base.ondragstart = null;
        argArr[0].Manager.Base.onselectstart = null;
      }
    );
    
    this.Base.ondrag = function() { return false; };
    this.Base.onselectstart = function() { return false; };
   
    if(this.T.caption) {
      var n = document.createTextNode(this.T.caption);
      if(!this.captionChildName) {
        this.Base.appendChild(n);
      } else {
        this.C[this.captionChildName].Base.appendChild(n);
      }
      this.Css.overflow = 'hidden';
    }

    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: disable_button
    *
    * Similar to <VegUINode::disable_node> only that this method also prohibits the mouse
    * cursor from changing to a pointer when hovering over the button element
    * if the button is disabled
    *
    * Alias:
    *
    *	disable()
    *
    * Parameters:
    *
    *	bool b - disable (true) or enable (false)
    *
    * See also
    *
    *	<VegUINode::disable_node>
    *
    * Examples:
    *
    * (start code)
    * myButton.disable(true); // events will no longer be captured
    * myButton.disable(false); // events will be captured again
    * (end)
    */
  
  this.disable = this.disable_button = function(b) {
    this.disable_node(b);
    this.Css.cursor = b ? 'default' : 'pointer';
  };  
  
  /***************************************************************************/
  /** Method: hevent_button
    *
    * Similar to <VegUINode::hevent_node> only that this function also handles the
    * focus status of the button, giving it active focus when it is clicked
    * and taking the focus when the mouse button is released again
    *
    * *private function*
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
    * See also:
    *
    *	<VegUINode::hevent_node>
    */
  
  this.hevent = this.hevent_button = function (eventType, mEvent) {

    if(eventType == VUI_MOUSE_DOWN)
      this.set_focus(VUI_FOCUS_ACTIVE);
    else if(eventType == VUI_MOUSE_UP && this.Manager.focusedElement == this) {
      this.lose_focus();
    }
    var _state = this.hevent_node(eventType, mEvent);
    return _state;
  };
  
  /***************************************************************************/
  /** Method: set_button
    * 
    * sets the most common template properties for the button
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int x - position on the x axis (pixels)
    *	int y - position on the y axis (pixels)
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	string cssNormal - css class to be used when button is not clicked
    *	string cssMDown - css class to be used when button is clicked
    *	string c - caption
    *
    * See also:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * // will set up the button to be positioned at 5, 5 with the size
    * // of 75x18. When the button is in a normal state the css
    * // class 'button_normal' will be used, when the button is 
    * // being clicked the css class 'button_click' will be used
    *
    * myButton.set(5, 5, 75, 18, 'button_normal', 'button_click');
    *
    * (end)
    */
  
  this.set = this.set_button = function(x, y, w, h, cssNormal, cssMDown, c) {
    this.set_node(null, w, h, x, y);
    if(cssNormal) {
      this.States[VUI_MOUSE_UP].P.className = cssNormal;
      this.T.className = cssNormal;
    }
    if(cssMDown)
      this.States[VUI_MOUSE_DOWN].P.className = cssMDown;
    this.T.caption = c;
  };
  

}
VegUIButton.prototype = VegUINode;
/*
 
 Copyright (c) 2005,2006 Stefan Pratter

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

/*
 * Allows Client - Server communication via XMLHttpRequest
 */

/** Constant: VUI_URL
  * allows you do specify which domain to use for all requests sent
  * with the bridge, default: ''
  */

var VUI_URL = '';

/******************************************************************************
 * V E G U I  R E Q U E S T ***************************************************
 *****************************************************************************/
/** Class: VegUIRequest
  *
  * VegUI xml request object
  *
  * Properties: Object Properties
  *
  *	timeCreation - *int*, time of creation
  *	timeSend - *int*, time it took to send and get a request
  *	request - *XMLHttpRequest*, the xml http request object
  *	toElement - *VegUIElement*, request belongs to this element
  *	process - *function*, if set this function will be executed when
  *	the request has been responded to by the server
  *	id - *int*, unique request id
  */

/*****************************************************************************/
/** Constructor: VegUIRequest
  *
  * *constructor*
  *
  * Parameters:
  *
  *	XMLHttpRequest req - the xml http request object
  *	int id - the unique request id
  *	<VegUIElement toElement> - flags this request as belong to the
  *	submitted element
  */

function VegUIRequest(req, id, toElement) {
  this.timeCreation = new Date().getTime();
  this.timeSend = null;
  this.request = req;
  this.toElement = toElement;
  this.process =  null;
  this.id = id;
}

/******************************************************************************
 * V E G U I  B R I D G E *****************************************************
 *****************************************************************************/
/** Class: VegUIBridge
  *
  * Allows client - server communication
  *
  * Properties: Object Properties
  *
  *	maxSendTime - *int*, maximum time a request can take before timing out
  *	maxTimeouts - *int*, maximum number of timeouts before <onmaxtimeouts>
  *	is called
  *	conTimeouts - *int*, current timeouts in a row
  *	sendNum - *int*, number of requests sent
  *	timeoutNum - *int*, total number of timeouts
  *	successNum - *int*, total number of successful requests
  *	PTimer - *Interval*, the interval object that polls timeouts
  *	denyRequests - *bool', if true no requests can be sent
  *	resend - *bool*, if true failed requests will be resent
  *	Request, R - *Array*, holds all active requests
  *
  * Notes: Tutorials
  *
  *	http://www.vegui.org/site/blog/27/vegui-tutorial-16---the-vegui-bridge.html
  */


function VegUIBridge() {

  this.R = this.Request = [];

  this.maxSendTime = 5000;
  this.maxTimeouts = 10;
  this.conTimeouts = 0;
  this.sendNum = 0;
  this.timeoutNum = 0;
  this.successNum = 0;
  this.PTimer = null;
  this.denyRequests = false;
  this.resend = true;
  
  /***************************************************************************/
  /** Method: cleanup
    *
    * *private function*
    *
    * Removes a request from the list
    *
    * Parameters:
    *
    *	VegUIRequest vreq - request to be removed
    *
    */
   
  this.cleanup = function(vreq) {
    if(this.R[vreq.id].request)
      this.R[vreq.id].request.onreadystatechange = function() { return; };
    delete this.R[vreq.id];
  };
 
  /****************************************************************************/
  /** Method: execute
    *
    * This function will be called on successful response to request if the 
    * <VegUIRequest>'s pFunc property is not set. Be aware that you
    * may overwrite the execute methid with your own by simply redefining
    * it
    *
    * This is useful if you decide to create a network protocol. All server
    * responses will be sent to this function and can be processed
    * accordingly.
    * 
    * *dummy function*
    *
    * Parameters:
    *
    *	VegUIRequest vreq - the request that was successful
    *
    * Returns:
    *
    *	bool - true
    *
    * Examples:
    *
    * (start code)
    * Bridge.execute = function(vreq) {
    *   alert(vreq.request.responseText);
    * };
    * Bridge.send('some_file.txt');
    * (end)
    */

  this.execute = function(vreq) { 
    return true; 
  };
 
  /***************************************************************************/
  /** Method: new_request
    *
    * Spawns a new XMLHttpRequest object and returns it in the form of
    * a <VegUIRequest> object
    *
    * *private function*
    *
    * Parameters:
    *
    *	<VegUIElement toElement> - if set the request will be flagged to
    *	belong to the submitted element
    *
    */

  this.new_request = function(toElement) {
    var req;
    if(window.XMLHttpRequest)
      req = new XMLHttpRequest();
    else {
      if(window.ActiveXObject) 
        req = new ActiveXObject('Msxml2.XMLHTTP');
      else
        req = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(!req)
      return null;

    var vreq = new VegUIRequest(req, this.valid_id(), toElement);
    this.R[vreq.id] = vreq;
    
    return this.R[vreq.id];
  }; 
  
  /***************************************************************************/
  /** Functions: Event Handlers
    *
    *	onmaxtimeouts - triggered when the maximum number of timeouts is
    *	reched
    *	ontimeout - triggered everytime a request times out, submits the
    *	timed out request as a parameter
    */
  
  this.onmaxtimeouts = function() { 
    alert('Lost connection to the server'); 
    return true; 
  };
  this.ontimeout = function(vreq) { return true; };
  
  /***************************************************************************/
  /** Method: poll_timeouts
    *
    * Polls the Request array for any timed out requests and handles
    * them arcordingly. May call <onmaxtimeouts> and <ontimeout>
    *
    * *private function*
    */

  this.poll_timeouts = function() {
    var r;
    var time = new Date().getTime();
    for(r in this.R) {
      if(time - this.R[r].timeSend > this.maxSendTime) {
        this.ontimeout(this.R[r]);	
	this.R[r].request.abort();
	
	if(this.resend)
	  this.send(this.R[r].url, this.R[r].para, this.R[r].method);
	
	this.cleanup(this.R[r]);
	this.conTimeouts++;
	this.timeoutNum++;
      }
    }
    if(this.conTimeouts >= this.maxTimeouts)
      this.onmaxtimeouts();
  }; 
 
  /***************************************************************************/
  /** Method: process_request
    *
    * When a request gets a response from the server then it will go through
    * this function where it will determine if it was a successful request
    * or not
    *
    * *private function*
    *
    * Parameters:
    *
    *	VegUIRequest vreq - the request object 
    *
    */

  this.process_request = function(vreq) {
    var req = vreq.request;
    if(req.readyState == 4) {
      if(req.status == 200) {
        this.successNum++;
        this.conTimeouts = 0;
	if(!vreq.process)
	  this.execute(vreq);
        else
	  vreq.process();
      } else {
	this.conTimeouts++;
	this.ontimeout(vreq);
      }
      this.cleanup(vreq);
    }
  };
  
  /***************************************************************************/
  /** Method: send
    *
    * send a request to the server
    *
    * Parameters:
    *
    *	string url - url or relative path to send the request to
    *	<string para> - url parameter string
    *	<string method> - method to use
    *	<function pFunc> - custom process function that will be executed
    *	when the request was returned successfully
    *	<bool sync> - if true the request will be synchronous to the execution
    *	of the script, false by default.
    * 
    * See also:
    *
    *	<process>
    *
    * Example:
    *
    * (start code)
    * // requests the file some_file.php and submits the argument
    * // string as GET variables. The response of this request
    * // will be processed by the Bridge.execute function
    *
    * Bridge.send('some_file.php', 'name=jon&age=13', 'GET');
    *
    * // same as above only that it will be a POST request
    *
    * Bridge.send('some_file.php', 'name=jon&age=13', 'POST');
    *
    * // in this case the response of the server will not be handled
    * // by Bridge.execute, but by the function that is submitted.
    * // the function will be a property of the created vreq object
    * // and therefor 'this' will point to the vrew object.
    *
    * Bridge.send('some_file.php', 'name=jon&age=13', 'GET',
    *   function() {
    *     alert(this.request.responseText);
    *   }
    * );
    * (end)
    */

  this.send = function(url, para, method, pFunc, sync) {

    if(this.denyRequests)
      return null;
  
    var req, vreq, Bridge = this;
    
    if( !(vreq = this.new_request()) ) {
      alert('VegUIBridge: Could not create XMLHttpRequest Object');
      return;
    }

    vreq.timeSend = new Date().getTime();

    vreq.url = url;
    vreq.para = para;
    vreq.method = method;
    vreq.process = pFunc;
    
    var req = vreq.request;
    
    var method = method ? method : 'GET';
    var url = VUI_URL+url+(method=='GET' ? '?'+para : '');
    req.onreadystatechange = function() { Bridge.process_request(vreq); };
    
    if(sync)
      req.open(method, url);
    else
      req.open(method, url, true);

    if(method.toUpperCase() == 'POST') {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
      req.send(para);
    } else
      req.send(null);

    this.sendNum++;

  };

  /***************************************************************************/
  /** Method: valid_id
    *
    * *private function*
    *
    * Returns:
    *
    *	int - valid request id
    */

  this.valid_id = function() {
    var id = (Math.round(Math.random()*9999)+1);
    while(this.R[id])
      id = (Math.round(Math.random()*9999)+1);
    return id;
  };
  
}


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

/** Constant: VUI_SELECTOR
  * VegUI element type for <VegUISelector>
  */

var VUI_SELECTOR = 35;

vui_module_add(VUI_SELECTOR, VegUISelector, 'vegui.selector.class.js');

/******************************************************************************
 * V E G U I  S E L E C T O R *************************************************
 *****************************************************************************/
/* Class: VegUISelector
 * a widget that lets the user select a value by clicking two buttons (left
 * and right) with a label in the middle
 *
 * Notes: Hierarchy
 *
 *	*extends VegUINode*
 *
 *	Inherits all functions and methods from <VegUINode>
 *
 * (start code)
 * VegUINode
 *    |
 *    |
 *    +--> VegUISelector
 * (end)
 *
 * Notes: Type
 *
 *	<VUI_SELECTOR>
 *
 * Notes: Child Elements
 *
 *	Btn1 - <VegUIButton>, Button to select the next item to the left
 *	Btn2 - <VegUIButton>, Button to select the next item to the right
 *	Label - <VegUINode>, Label to display the selected item
 *
 *
 * Notes: Items Array
 *
 *	The items array holds value, name pairs meaning a valid items
 *	array would look like this:
 *
 *	(start code)
 *	var items = [
 *	  [1,'First Item'],
 *	  [2,'Second Item']
 *	];
 *	(end)
 *
 * Notes: Tutorials
 *
 * http://www.vegui.org/site/blog/21/vegui-tutorial-12---the-selector-widget.html
 *
 * Properties: Object Properties
 *
 *	value - *variable*, holds the currently selected value
 *	Items - *Array*, holds the items in the form of value, name pairs
 *	idxPtr - *int*, index pointer
 *
 */

/*****************************************************************************/
/** Constructor: VegUISelector
  *
  * *Constructor*
  *
  * See Parent Class:
  *
  *	<VegUINode::VegUINode>
  *
  */
 
function VegUISelector(refName, Parent, Manager) {
 
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
 
  /**
   * properties
   */

  this.type = VUI_SELECTOR;
  this.value = null;
  this.Items = [];
  this.idxPtr = 0;
  
  this.T.btnWidth = 0;
  this.T.btnHeight = 0;
  
  /**
   * child elements
   */
 
  this.Btn1 = this.add_child('Btn1', VUI_BUTTON);
  this.Btn2 = this.add_child('Btn2', VUI_BUTTON);
  this.Label = this.add_child('Label', VUI_NODE);

  /** 
   * methods
   */

  /***************************************************************************/
  /** Method: build_selector
    *
    * Builds the selector
    *
    * *private function*
    *
    * You should always use the <VegUIManager::build_element> to build vegUI
    * elements
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLnode toNode> - if submitted the created HTML node will be
    *	appended to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See Parent:
    *
    +	<VegUINode::build_node>
    */

  this.build = this.build_selector = function(toNode) {
  
    this.btnWidth = this.Btn1.T.w;
    this.btnHeight = this.Btn1.T.h;

    /* position the label and the buttons */

    this.Label.set(
      'div',this.T.w - (this.btnWidth * 2), this.T.h, this.btnWidth
    );
    this.Label.set_marg(this.btnWidth);
    this.Btn2.set_marg(null,null,0);
 
    if(!this.build_node())
      return null;

    var VS = this;

    /* button states */

    this.Btn1.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { VS.go(VUI_LEFT); }
    );

    this.Btn2.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { VS.go(VUI_RIGHT); }
    );

    /* if there are items in the array, update the label */
  
    if(this.Items.length)
      this.update_label();

    this.dock(toNode);
    return 0;
  
  };
  
  /***************************************************************************/
  /** Method: flush
    *
    * Clears the <Items> array and calls <update_label>
    */
  
  this.flush = function() {
    this.Items = [];
    this.update_label();
  };
  
  /***************************************************************************/
  /** Method: go
    *
    * Select either the next (right) or the previous (left) item
    * .Calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	int dir - direction for selection, <Generic directions>
    *
    * See also:
    *
    *	<select_idx>, <select_value>
    *
    * Example:
    *
    * (start code)
    * // move the selection to the item on the left
    * Selector.go(VUI_LEFT);
    *
    * // move the selection to the item on the right
    * Selector.go(VUI_RIGHT);
    * (end)
    */
  
  this.go = function(dir) {
    switch(dir) {
      case VUI_LEFT:
        /* go back */
        if(this.idxPtr > 0)
  	  this.select_idx(this.idxPtr - 1);
      break;

      case VUI_RIGHT:
        /* go forward */
        if(this.idxPtr < (this.Items.length)-1)
          this.select_idx(this.idxPtr + 1);
      break;
      default: return null;
    }
  };

  
  /***************************************************************************/
  /** Method: select_idx
    *
    * Select an item using its index in the array, calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	int idx - array index
    *
    * See also:
    *
    *	<select_value>, <go>
    *
    * Example:
    *
    * (start code)
    * // select the third item
    * Selector.select_idx(2);
    * (end)
    **/
  
  this.select_idx = function(idx) {
    if(!this.Items[idx])
      return null;

    this.idxPtr = idx;
    this.value = this.Items[this.idxPtr][0];
    this.update_label();
    this.event_execute('onchange');
  };

  /***************************************************************************/
  /** method: select_value
    *
    * Selects the first item with the requested value, calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	variable value - the value to search for
    *
    * See also:
    *
    *   <select_idx>, <go>
    *
    * Example:
    *
    * (start code)
    * // select the item with the value 22
    * Selector.select_value(22);
    * (end)
    */
  
  this.select_value = function(value) {
  
    /* find the first occurance of value */

    var i, idx = -1;
    for(i in this.Items) {
      if(this.Items[i][0] == value) {
        idx = i;
        break;
      }
    }
    this.select_idx(idx);
  };
  
  /***************************************************************************/
  /** Method: set_selector
    *
    * Sets the most common Template Properties of the selector
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - position x (pixels)
    *	int y - position y (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    */
  
  this.set = this.set_selector = function(w,h,x,y) {
    this.set_node('div',w,h,x,y);
  };
  
  /***************************************************************************/
  /** Method: update_label
    *
    * Sets the text of the Label child to the currently selected item name
    *
    */
  
  this.update_label = function() {
    if(!this.Items[this.idxPtr])
      this.Label.clear(txtnode(''));
    else {
      var item = this.Items[this.idxPtr];
      this.Label.clear(txtnode(item[1]));
    }
  };

}
VegUISelector.prototype = VegUINode;
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

/* Constant: VUI_TASKBAR
 * vegUI element type for <VegUITaskBar>
 */

var VUI_TASKBAR = 20;

vui_module_add(VUI_TASKBAR, VegUITaskBar, 'vegui.taskbar.class.js');

/* Constant: Taskbar Order Types
 *
 * 	VUI_TB_HORIZONTAL - tasks get ordered horizontally
 *	VUI_TB_VERTICAL - tasks get order vertically
 */

var VUI_TB_HORIZONTAL = 1;
var VUI_TB_VERTICAL = 2;

/******************************************************************************
 * T A S K B A R **************************************************************
 *****************************************************************************/
/** Class: VegUITaskBar
  *
  * A task bar that holds one button for each window spawned. Clicking
  * the button will give focus to the window
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
  *    +--> VegUITaskBar
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_TASKBAR>
  *
  * Notes: Dependencies
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Automatic adding of windows to taskbar
  *
  * If you set the Taskbar property of the vegUIManager element to point
  * to your taskbar then any windows will have task buttons added automatically
  * when they are built:
  *
  * (start code)
  * Manager.Taskbar = Manager.get_new(VUI_TASKBAR);
  * Manager.Taskbar.set(500,20,0,0,VUI_TB_HORIZONTAL,5);
  * Manager.build_element(Manager.Taskbar);
  * (end)
  * 
  * Child Elements:
  *
  *	All of these child elements are accessable by *this.[child_name]* even
  *	though they may not be all direct children of this element
  *
  *	TplButton - <VegUIButton>, all task buttons will be cloned from
  *	this button
  *
  * Properties: Object Properties
  *
  *	Btns - *object*, holds all the buttons in the taskbar
  *	buttonSpace - *int*, space between task buttons 
  *	tbType - *int*, taskbar type
  *	btnNum - *int*, button counter
  *	btnOffset - *int*, offset position
  *
  * Properties: Template Properties
  *
  *	T.buttonSpace - <buttonSpace>
  *	T.tbType - <tbType>
  *	T.btnOffset - <btnOffset>
  */

/*****************************************************************************/
/** Constructor: VegUITaskBar
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUITaskBar(refName, Parent, Manager) {

  /* constructor */

  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /* properties */

  this.type = VUI_TASKBAR;
  this.Btns = {};
  this.tbType = VUI_TB_HORIZONTAL;
  this.buttonSpace = 5;
  this.btnNum = 0;

  /* children */
  
  this.TplButton = this.add_child('TplButton', VUI_BUTTON);

  this.TplButton.flags |= VUI_TEMPLATE;

  /* methods */

  /**************************************************************************/
  /** Method: set_taskbar
    *
    * Sets the most common template properties for the taskbar
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
    *	int type - task bar type <Taskbar Order Types>
    *	int space - space between task buttons (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * TaskBar.set(500,20,0,0,VUI_TB_HORIZONTAL,5);
    * (end)
    */

  this.set_taskbar = this.set = function(w,h,x,y,type,space) {
    this.set_node('div', w, h, x, y);
    if(type)
      this.T.tbType = type;
    if(!isNaN(space))
      this.T.buttonSpace = space;
  };

  /**************************************************************************/
  /** Method: build_taskbar
    *
    * builds the taskbar
    *
    * *private function*
    *
    * You should always use <VegUIManager::build_element> to build vegui
    * elements
    *
    * Alias:
    *	
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created html node will be 
    *	appended to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    */

  this.build_taskbar = this.build = function(toNode) {
    
    this.tbType = this.T.tbType || VUI_TB_HORIZONTAL;
    this.buttonSpace = this.T.buttonSpace;
    this.btnOffset = this.T.btnOffset || 0;

    if(!this.build_node())
      return null;

    this.dock(toNode);
    return 1;
  };

  /**************************************************************************/
  /** Method: taskbutton_add
    *
    * Adds a taskbutton for a window
    *
    * Parameters:
    *
    *	VegUIWindow Win - the window element
    *
    * Returns:
    *
    *	VegUIButton - the created button
    *	null - if there already exists a button for the submitted window
    *	null - if the VUI_NOTASK flag is active on the window
    *
    * See also:
    *
    *	<taskbutton_remove>, <taskbutton_reorder>
    *
    * Example:
    *
    * (start code)
    * myWin = Manager.get_new(VUI_WIN);
    * Manager.build_element(myWin);
    * TaskBar.taskbutton_add(myWin);
    * (end)
    */

  this.taskbutton_add = function(Win) {
    if(this.taskbutton_exists(Win))
      return null;
    
    if(Win.flags & VUI_NOTASK)
      return null;
   
    var Btn = this.add_child('Btn_'+Win.winIdx, VUI_BUTTON);
    Btn.clone(this.TplButton);

    Btn.flags ^= VUI_TEMPLATE;
    
    Btn.set(null,null,0,0,0,0,Win.winTitle);
   
    Btn.build(this.Base);
  
    this.Btns[Win.winIdx]=Btn;
    this.btnNum++;
    this.taskbutton_reorder();   
   
    Btn.States[VUI_MOUSE_UP].Scripts.add(
      function() { 
        if(Win.Manager.FX && Win.is_hidden() && typeof vuiTpl_Scale !== 'undefined') {
	  var abs = Btn.abs_middle();
	  Win.Manager.FX.effect_add(
	    Win, new VegUIFXScale(abs[0], abs[1], 300, 0, vuiTpl_Scale, true, VUI_WIN_Z+100),
	    function() { Win.show(); }
	  );
	} else {
	  Win.show(); 
	}
      }
    );
    
    var TB = this;
 
    Win.event_add('onclose', function(args) { TB.taskbutton_remove(args[0]); });

    if(this.Manager.FX) {
    
      Win.event_add(
        'onminimize', function() {
	  if(typeof vuiTpl_Scale == 'undefined')
	    return;
	  var abs = Btn.abs_middle();
          Win.Manager.FX.effect_add(
	    Win, new VegUIFXScale(abs[0], abs[1], 300, 1, vuiTpl_Scale, true, VUI_WIN_Z+100)
	  );
	}
      );

    }
   
    return Btn;
  };

  /***************************************************************************/
  /** Method: taskbutton_exists
    * 
    * Checks if a task button exists for a certain window
    *
    * Parameters:
    *
    *	<VegUIWindow> Win - the window element
    *
    * Returns:
    *
    *	bool - *true* if taskbutton exists for the submitted window
    *	bool - *false* if taskbutton does not exists for the submitted window
    *
    * Example:
    *
    * (start code)
    * // create and build a window
    * myWin = Manager.get_new(VUI_WIN);
    * Manager.build_element(myWin);
    *
    * // add task button to taskbar for window
    * TaskBar.taskbutton_add(myWin)
    *
    * // then this will return true:
    * return TaskBar.taskbutton_exists(myWin);
    * (end)
    */

  this.taskbutton_exists = function(Win) {
    var winIdx = Win.winIdx;
    if(!this.Btns[winIdx])
      return false;
    return true;
  };

  /***************************************************************************/
  /** Method: taskbutton_reorder
    *
    * Reorders taskbuttons, removing any that dont have a window any
    * assigned to them any longer
    *
    */

  this.taskbutton_reorder = function() {
    var i, lastPos = this.buttonSpace, fsize;
     
    if(this.btnOffset)
      lastPos += this.btnOffset;
    
    /*
     * if the total width of the current buttons is wider than the
     * width of the task bar, shrink the buttons
     */

    switch(this.tbType) {
      case VUI_TB_HORIZONTAL:
        if(this.btnNum*this.TplButton.T.w > this.width()) {
          fsize = (this.width() / this.btnNum) - this.buttonSpace - ((this.buttonSpace*2) / this.btnNum);
        }
      break;

      case VUI_TB_VERTICAL:
        if(this.btnNum+this.TplButton.T.h > this.height()) {
          fsize = (this.height() / this.btnNum) - this.buttonSpace - ((this.buttonSpace*2) / this.btnNum);
	}
      break;
    }
   
    for(i in this.Btns) {
      var Btn = this.Btns[i];
      switch(this.tbType) {
        case VUI_TB_HORIZONTAL:
          Btn.move(lastPos, null);
	  if(fsize)
	    Btn.resize(fsize, null);
	break;
	case VUI_TB_VERTICAL:
          Btn.move(null, lastPos);
	  if(fsize)
	    Btn.resize(null, fsize);
	break;
      }
      
      lastPos+=Btn.width()+this.buttonSpace;
    }
  };

  /***************************************************************************/
  /** Method: taskbutton_remove
    *
    * Removes the taskbutton for a window
    *
    * Parameters:
    *
    *	VegUIWindow Win - the window element
    *
    * See also:
    *
    *	<taskbutton_add>
    *
    * Example:
    *
    * (start code)
    * // create and build window element
    * myWin = Manager.get(VUI_WIN);
    * Manager.build_element(myWin);
    *
    * // add taskbutton for window
    * TaskBar.taskbutton_add(myWin);
    *
    * // remove taskbutton from window
    * TaskBar.taskbutton_remove(myWin);
    * (end)
    */

  this.taskbutton_remove = function(Win) {
    var winIdx = Win.winIdx;
    if(!this.Btns[winIdx])
      return null;

    var Btn = this.Btns[winIdx];
    var Taskbar = this;
    
    if(this.Manager.FX) {
      var Effect = this.Manager.FX.effect_add(
        Btn, 
	new VegUIFXFadeOut(500),
        function() { 
          Btn.kill(1);
	  delete Taskbar.Btns[winIdx];
	  Taskbar.taskbutton_reorder(); 
	  Taskbar.btnNum--;
	}
      );
    } else  {
      this.Btns[winIdx].kill(1);
      delete this.Btns[winIdx];
      this.taskbutton_reorder();
      this.btnNum--;
    }
  };


}
VegUITaskBar.prototype = VegUINode;

