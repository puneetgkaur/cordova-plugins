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
var bus = require('cordova/sugar/bus');


bus.listen();

setInterval(function(){
		function onResponseReceived(err, result) {
		    if (!err) {
			//console.log("result : "+JSON.stringify(result));
			//console.log("result : "+result);
			//console.log("Its success");
		        result.timestamp = new Date().getTime();			
		        cordova.fireWindowEvent('devicemotion',result);
		    } else {
			//console.log("error:"+JSON.stringify(err));
			//console.log("Its error");
			//cordova.callbackError(callbackId,error);
			console.log(err);
		    }
		}
	 	bus.sendMessage('activity.cordova',['Accelerometer','getCurrentAcceleration',[]],onResponseReceived);
           },1000);


var accelerometer_running=false;


function listener(success, ev) {
    //console.log("ev:"+JSON.stringify(ev));
    
    //acc.timestamp = new Date().getTime();
    success(ev);
}


var Accelerometer = {
    start: function start(success, error) {
        console.log("In start acceleration");
        console.log("accelerometer_running = "+accelerometer_running);

        accelerometer_running=true;


        console.log("accelerometer_running = "+accelerometer_running);

        return window.addEventListener('devicemotion', function(ev) {
            listener(success, ev);
        }, false);
    },

    stop: function stop() {
        console.log("In stop acceleration");

        accelerometer_running=false;
        console.log("accelerometer_running = "+accelerometer_running);

        window.removeEventListener('devicemotion', listener, false);
    }
};

module.exports = Accelerometer;
require('cordova/sugar/commandProxy').add('Accelerometer', Accelerometer);
