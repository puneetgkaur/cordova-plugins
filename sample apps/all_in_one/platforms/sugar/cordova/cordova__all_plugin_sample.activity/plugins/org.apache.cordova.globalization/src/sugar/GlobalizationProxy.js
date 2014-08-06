cordova.define("org.apache.cordova.globalization.GlobalizationProxy", function(require, exports, module) { /*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
var bus = require('cordova/sugar/bus'),
    argscheck = require('cordova/argscheck'),
    GlobalizationError = require('org.apache.cordova.globalization.GlobalizationError');

bus.listen();

var globalization = {
    getPreferredLanguage:function(successCB, failureCB) {
	function onResponseReceived(err, result) {

	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		console.log("Its success");
		successCB(result);
	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
                failureCB(err);
	    }
	}
 	bus.sendMessage("activity.cordova_GlobalizationPlugin",['getPreferredLanguage'],onResponseReceived);
    },
    getLocaleName:function(successCB, failureCB) {

	function onResponseReceived(err, result) {

	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		console.log("Its success");
		successCB(result);
	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
                failureCB(err);
	    }
	}
 	bus.sendMessage("activity.cordova_GlobalizationPlugin",['getLocaleName'],onResponseReceived);
    }
};

module.exports = globalization;

require("cordova/sugar/commandProxy").add("Globalization", module.exports);

});
