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


