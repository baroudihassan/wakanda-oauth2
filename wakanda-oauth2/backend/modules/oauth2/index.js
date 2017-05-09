var queryString= require('query-string');

function oAuth2(clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders) {
  this._clientId= clientId;
  this._clientSecret= clientSecret;
  this._baseSite= baseSite;
  this._authorizeUrl= authorizePath || "/oauth2/authorize";
  this._accessTokenUrl= accessTokenPath || "/oauth2/token";
  this._customHeaders = customHeaders || {};
};

oAuth2.prototype._getAccessTokenUrl = function() {
  return this._baseSite + this._accessTokenUrl;
};

oAuth2.prototype._executeRequest = function(method, url, headers, post_body, callback) {
	// Prepare the request
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	for( var key in this._customHeaders ) {
		xhr.setRequestHeader(key, this._customHeaders[key]);
	}
	if(headers) {
	    for(var key in headers) {
	    	xhr.setRequestHeader(key, headers[key]);
	    }
  	}

	// Send the request
	if((method == 'POST' || method == 'PUT') && post_body) {
    	xhr.send(queryString.stringify(post_body));
  	} else {
  		xhr.send();
  	}

	if(xhr.status !== 200){
		callback({status: xhr.status, data: xhr.responseText});
	} else {
		// Parse the result
		var result = JSON.parse(xhr.responseText);
		result.created_at = new Date();
	
		callback(null, result);
	}  
};

oAuth2.prototype.getAuthorizeUrl = function(params) {
	var params= params || {};
	params['client_id'] = this._clientId;
	return this._baseSite + this._authorizeUrl + "?" + queryString.stringify(params);
};

oAuth2.prototype.getOAuthAccessToken= function(code, params, callback) {
	var params= params || {};
	params['client_id'] = this._clientId;
	params['client_secret'] = this._clientSecret;
	var codeParam = (params.grant_type === 'refresh_token') ? 'refresh_token' : 'code';
	params[codeParam]= code;

  	var post_headers= {
    	'Content-Type': 'application/x-www-form-urlencoded'
   	};

	this._executeRequest("POST", this._getAccessTokenUrl(), post_headers, params, function(error, data) {
		if(error) {
			callback(error);
		} else {
		  callback(null, data);
		}
	});
};

module.exports = oAuth2;
