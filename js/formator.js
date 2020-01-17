
/*
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////#####///////////////////////////////////
//////////////////######################//////////////////
//////////////////######################//////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
*/

/////////////// Text Formator ///////////////

String.prototype.format = function () {
    var finaltext = this;
    var args = arguments;
    var vars = finaltext.match(/[{]\D{1,}[}]/gm);
    if (vars) {
        for (var i = 0; i < vars.length; i++) {
            var word = vars[i].replace(/[{,}]/gm, "");
            try {
                var w = finaltext.replace(vars[i], eval(word));
                finaltext = w;
            }
            catch (err) {
                console.warn(word + " is not a variable");
            }
        }
    }
    if (args) {
        var arg = finaltext.match(/[{]\d{1,}[}]/gm);
        if (arg) {
            for (var i = 0; i < arg.length; i++) {
                var word = arg[i].replace(/[{,}]/gm, "");
                if (args[word]) {
                    var w = finaltext.replace(arg[i], args[word]);
                    finaltext = w;
                }
            }
        }
    }
    return finaltext.toString();
};


/////////////// Element Getter ///////////////

    function getDOM(selector, many, number) {
        var selected = document.querySelectorAll(selector);
        if (selected) {
            if (many == false || !many) {
                if (number) {
                    return selected[number];
                }
                else {
                    return selected[0];
                }
            }
            else if (many == true) {
                return selected;
            }
        }
    }

    var getElement = getDOM.bind();

/////////////// Event Handler ///////////////

HTMLElement.prototype.on = function (event, callback) {
    this.addEventListener(event, callback);
}

/////////////// getRequest ///////////////

function getRequest(url, callback) {
    var http;
    if (window.XMLHttpRequest) {
        // modern browsers
        http = new XMLHttpRequest();
    } else {
        // old IE browsers
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    }
    http.open("GET", url, true)
    http.send()
}

/////////////// postRequest ///////////////

function postRequest(url, data, callback) {
    var http;
    if (window.XMLHttpRequest) {
        // modern browsers
        http = new XMLHttpRequest();
    } else {
        // old IE browsers
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    }
    http.open("POST", url, true)
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send(data)
}

/////////////// URI Parser ///////////////

function parseURI() {
    var obj = {};
    var q = window.location.search.slice(1, window.location.search.length).split("&");
    if (q[0] != "") {
        for (e in q) {
            var w = q[e];
            w = w.split("=");
            try {
                eval("obj." + w[0] + "=" + decodeURI(w[1]));
            }
            catch (err) {
                eval("obj." + w[0] + "=" + "'" + decodeURI(w[1]) + "'");
            }
        }
    }
    return obj;
}

/////////////// Object To Array ///////////////

Object.prototype.toArray = function () {
    var keys = Object.getOwnPropertyNames(this);
    var array = [];
    for (var key = 0; key < keys.length; key++) {
        array.push(this[keys[key]]);
    }
    return array;
}

/////////////// Object Value Getter ///////////////

Object.prototype.getValue = function (position) {
    return this.toArray()[position];
}

/////////////// JSON Readier ///////////////

JSON.readyForParse = function (text) {
    return text.replace(/\/\*.{0,}\*\//gmi, "").replace(/\/\/.{0,}/gmi, "");
}
