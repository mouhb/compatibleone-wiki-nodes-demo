function testRegExp(b,c,a){return new RegExp(a).test(document.forms[b].elements[c].value)
}function validateString(a,b){return(document.forms[a].elements[b].value.length>0)
}function validateSelection(a,b){return(document.forms[a].elements[b].selectedIndex>0)
}function validateCheckBox(a,b){return document.forms[a].elements[b].checked
}function validateCleanString(a,b){return testRegExp(a,b,"^[A-Za-z0-9_]+$")
}function validateEmail(a,b){return testRegExp(a,b,"^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$")
}function validateAbsUrl(a,b){return testRegExp(a,b,"^(news|telnet|nttp|file|http|ftp|https)://[-A-Za-z0-9\\.]+$")
}function validateNumber(a,b,c){return(!c&&value=="")?false:testRegExp(a,b,"^-?[0-9]*\\.?[0-9]*$")
}function validateSize(a,b){return testRegExp(a,b,"^[0-9]+(px|%)?$")
}function validateID(a,b){return testRegExp(a,b,"^[A-Za-z_]([A-Za-z0-9_])*$")
};