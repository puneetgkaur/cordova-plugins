/*
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

/*
  Network API overview: http://www.w3.org/TR/netinfo-api/
  and http://w3c.github.io/netinfo/
*/

var cordova = require('cordova'),
    Connection = require('./Connection'),
    modulemapper = require('cordova/modulemapper'),
    bus = require('cordova/sugar/bus');


bus.listen();




module.exports = {

  getConnectionInfo: function(successCallback, errorCallback) {
    var connectionType = Connection.UNKNOWN;
	function onResponseReceived(err, result) {
		if (!err) {
		    console.log("result : "+JSON.stringify(result));
		    console.log("Its success");
		    type=result; // should match one of the following - cellular,ethernet,wifi,none in the switch statement in the getConnectionInfo function
			if (result != undefined) {
			  switch(type) {
				case "cellular":
				  connectionType = Connection.CELL;
				  break;
				case "ethernet":
				  connectionType = Connection.ETHERNET;
				  break;
				case "wifi":
				  connectionType = Connection.WIFI;
				  break;
				case "none":
				  connectionType = Connection.NONE;
				  break;
			  }
			} 
			successCallback(connectionType);
		} else {
			console.log("error:"+JSON.stringify(err));
			console.log("Its error");
      		successCallback(Connection.UNKNOWN);
		}
	}
	bus.sendMessage("activity.cordova",['Network','alert',[]],onResponseReceived);
    /*
    if (type != undefined) {
      switch(type) {
        case "cellular":
          connectionType = Connection.CELL;
          break;
        case "ethernet":
          connectionType = Connection.ETHERNET;
          break;
        case "wifi":
          connectionType = Connection.WIFI;
          break;
        case "none":
          connectionType = Connection.NONE;
          break;
      }
    } 
    //setTimeout(function() {
      successCallback(connectionType);
    //}, 5000);
    */


  }
};

require("cordova/sugar/commandProxy").add("NetworkStatus", module.exports);
