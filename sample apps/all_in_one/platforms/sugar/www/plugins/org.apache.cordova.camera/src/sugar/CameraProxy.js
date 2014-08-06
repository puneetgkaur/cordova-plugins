cordova.define("org.apache.cordova.camera.CameraProxy", function(require, exports, module) { /*
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



function datastore_load(objectId,callback){
        inputStream = bus.createInputStream();

        inputStream.open(function (error) {
            function onResponseReceived(responseError, result) {
                if (responseError === null) {
                    callback(null, result[0], inputStream);
                } else {
                    callback(responseError, null, null);
                }
            }

            var params = [objectId, inputStream.streamId];
            bus.sendMessage("datastore.load", params, onResponseReceived);
        });
}



function read_data(objectId,callback){
        blobToText = function (blob, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.readAsText(blob);
        };

        blobToArrayBuffer = function (blob, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.readAsArrayBuffer(blob);
        };


        //var that = this;
        var inputStream = null;
        var arrayBuffers = [];
        var metadata = null;

        function onRead(error, data) {
            if (data.byteLength === 0) {
                var blob = new Blob(arrayBuffers);

                blobToText(blob, function (text) {
                    callback(null, metadata, text);
                });

                inputStream.close();

                return;
            }

            arrayBuffers.push(data);

            inputStream.read(8192, onRead);
        }

        function onLoad(error, loadedMetadata, loadedInputStream) {
            metadata = loadedMetadata;
            inputStream = loadedInputStream;

            inputStream.read(8192, onRead);
        }

            datastore_load(objectId, onLoad);


}


function takePicture(success, error, opts) {
 console.log("Inside takePicture");
 console.log("opts : "+opts);
 if (opts && opts[2] == 2)
 {
        console.log("opts.sourceType == 2");
        // converting image to base 64
	function onResponseReceived(err, result) {
	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		//console.log("result : "+result);
		console.log("Its success");		
		return success(result);

	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
		//cordova.callbackError(callbackId,error);
		console.log(err);
	    }
	}

        bus.sendMessage("activity.cordova_CameraPlugin",['conversionToBase64'],onResponseReceived);
	

 }
 else if(opts && opts[2] == 0)
 {
        console.log("opts.sourceType == 0");
        // taking image from the photoalbum
	function onResponseReceived1(err, result) {
	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		//console.log("result : "+result);
		console.log("Its success");		
                /*read_data(result,function (error, metadata, data) {
                    
                    try {
                        textdata = JSON.parse(data);
                        console.log("textdata:"+textdata);
                        return success(textdata);
                    } catch (e) {
                        textdata = data;
                        console.log("error in read_data: "+textdata);
                    }

                });*/
		return success(result);

	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
		//cordova.callbackError(callbackId,error);
		console.log(err);
	    }
	}
        
	bus.sendMessage("activity.cordova_CameraPlugin",['image_chooser'],onResponseReceived1);
 }
 else if(opts && opts[2] == 1)
 {
	
        // taking image from camera    

        alert("Click mouse anywhere on the screen to snap the photograph");
        console.log("opts.sourceType == 1");
	function onResponseReceived2(err, result) {
            console.log("hello reached back to javascript");
	    if (!err) {
		console.log("result : "+result);
		//console.log("result : "+result);
		console.log("Its success");		
		return success(result);

	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
		//cordova.callbackError(callbackId,error);
		console.log(err);
	    }
	}

        bus.sendMessage("activity.cordova_CameraPlugin",['webcam'],onResponseReceived2);

 }

/*   var pick = new MozActivity({
        name: "pick",
        data: {
            type: ["image/*"]
        }
    });

    pick.onerror = error || function() {};

    pick.onsuccess = function() {
        // image is returned as Blob in this.result.blob
        // we need to call success with url or base64 encoded image
        if (opts && opts.destinationType == 0) {
            // TODO: base64
            return;
        }
        if (!opts || !opts.destinationType || opts.destinationType > 0) {
            // url
            return success(window.URL.createObjectURL(this.result.blob));
        }
    };
*/

}

module.exports = {
    takePicture: takePicture,
    cleanup: function(){}
};

require("cordova/sugar/commandProxy").add("Camera", module.exports);

});
