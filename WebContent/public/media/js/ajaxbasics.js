
/**
 * provide cross browser ajax functionality -- see Jason Cranford Teague's CSS, DHTML & AJAX (Visual Quickstart Guide)
 * 
 * @param url target of the call, 
 * @param objectId the object to which inner html will be replaced
 * @return void
 * @calledby maincontent tab switching
 * @calls filterData
 */
function fetchData(url, objectId) {
	var pageRequest = (window.XMLHttpRequest)? 
        new XMLHttpRequest() : (window.ActiveXObject) ?
        new ActiveXObject("Microsoft.XMLHTTP") : null;
    if (! pageRequest) {
        return false;
    }
    pageRequest.onreadystatechange = function() {
        filterData(pageRequest, objectId);
    }
    pageRequest.open('GET', url, false);
    pageRequest.send(null);
}

/**
 * on successful completion of an http ajax request set innerhtml or report error 
 * @param pageRequest cross browser representation of the ajax object either an activeX object or an XMLHttpRequest object
 * @param objectId the id of the DOM element to which the inner html will be replaces
 * @return void
 * @calls none
 * @calledby fetchData
 */
function filterData(pageRequest, objectId) {
    var obj = document.getElementById(objectId);
    if (4 == pageRequest.readyState) {
        if (200 == pageRequest.status) {
            obj.innerHTML = pageRequest.responseText;
        } else {
            obj.innerHTML = 'data unavailable';
        }
    }
}

