cordova.define("org.apache.cordova.device.DeviceProxy", function(require, exports, module) { /*
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

var sugar = require('cordova/platform');
var cordova = require('cordova');
var bus = require('cordova/sugar/bus');

bus.listen();

var sugar_version="hi";
var sugar_model="hi";
var sugar_uuid="hi";


		function onResponseReceived1(err, result) {
		    if (!err) {
                        console.log(result);
		        sugar_version = result;
                         
		    } else {
			return err;
		    }
		}
	 	bus.sendMessage("activity.cordova_DevicePlugin",['sugar_version'],onResponseReceived1);
                

		function onResponseReceived2(err, result) {
		    if (!err) {
		        sugar_model= result;
		    } else {
			return err;
		    }
		}
	 	bus.sendMessage("activity.cordova_DevicePlugin",['sugar_model'],onResponseReceived2);




		function onResponseReceived3(err, result) {
		    if (!err) {
		        sugar_uuid= result;
		    } else {
			return err;
		    }
		}
	 	bus.sendMessage("activity.cordova_DevicePlugin",['sugar_uuid'],onResponseReceived3);


module.exports = {
    getDeviceInfo: function (success, error) {
        setTimeout(function () {
            success({
                cordova: sugar.cordovaVersion,
                platform: 'sugar',
                model: sugar_model,
                version: sugar_version,
                uuid: sugar_uuid,
                
            });
        }, 5000);
    }
};

require("cordova/sugar/commandProxy").add("Device", module.exports);

});
