wakanda-oauth2
===========
A simple oauth API for Wakanda (https://wakanda.github.io).

Example
==========

```javascript
var OAuth2 = require('oauth2');
    
var ClientKey = 'ClientKey';
var ClientSecret = 'ClientSecret';
var oauth2 = new OAuth2(
  ClientKey,
  ClientSecret, 
  'https://login.microsoftonline.com/common/', 
  'oauth2/v2.0/authorize',
  'oauth2/v2.0/token', 
  {}// custom headers
);

var options = {
  "scope": "Calendars.ReadWrite offline_access",
  "redirect_uri": "http://localhost:4200",
  "response_type": "code"
};
var authurl = oauth2.getAuthorizeUrl(options);
authurl;
debugger
var res; 
oauth2.getOAuthAccessToken(
  "Mf244f4e3-8101-d2dd-a4f8-1ac7fae60453",
  {
    grant_type:'authorization_code',
    redirect_uri: "http://localhost:4200"
  },
  function (e, results){
      if(e) {
        debugger;
      } else {
        res = results;
      }
  }
);

oauth2.getOAuthAccessToken(
  "MCSXORrCZd92nav*yIWYjlT3XyzBBU8v!yZQe!SBniqXn9ZiwR04aSDIjS2udOptklo!WjQW7zi4Lm6ZRWFYeobt8V6TI9ffuBVCiVkXtIpsrirE7rhawHnUAenQjVu5lp0uUdYALr0b1fKQG6BpONzUD7OvR!om9NzcX*4NW3eoWOBLQwXYkfX6ALkcAiez0kJNSi3rXaVYfS23Lmtd9IILN**BhIWNGfXupxkXdzEXxAr!CwmYPXl0lgKlq!QyfmvI*inZ1CYIwtCM1bm4841eg",
  {
    grant_type:'refresh_token',
    redirect_uri: "http://localhost:4200"
  },
  function (e, results){
      if(e) {
        debugger;
      } else {
        res = results;
      }
  }
);
res;
```