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


var Notification = {
    beep: function(milliseconds) {
        //navigator.vibrate(milliseconds);
    },
    alert: function(successCallback, errorCallback, args) {
        var message = args[0];
        var title = args[1];
        var _buttonLabels = [args[2]];
        var _callback = (successCallback || _empty);
        //modal(message, _callback, title, _buttonLabels);
	function onResponseReceived(err, result) {

	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		console.log("Its success");
		_callback();
	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
	    }
	}
 	bus.sendMessage("activity.cordova",['Dialog','alert',[message,title,_buttonLabels]],onResponseReceived);        
    },
    confirm: function(successCallback, errorCallback, args) {
        var message = args[0];
        var title = args[1];
        var buttonLabels = args[2];
        console.log(buttonLabels);
        var _callback = (successCallback || _empty);
	function onResponseReceived(err, result) {

	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		console.log("Its success");
		_callback(result);
	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
	    }
	}
 	bus.sendMessage("activity.cordova",['Dialog','confirm',[message,title,buttonLabels]],onResponseReceived); 
        //modal(message, _callback, title, buttonLabels);
    },
    prompt: function(successCallback, errorCallback, args) {
        var message = args[0];
        var title = args[1];
        var buttonLabels = args[2];
        var defaultText = args[3];
        var _callback = (successCallback || _empty);
	function onResponseReceived(err, result) {

	    if (!err) {
		console.log("result : "+JSON.stringify(result));
		console.log("Its success");
		_callback(result);
	    } else {
		console.log("error:"+JSON.stringify(err));
		console.log("Its error");
	    }
	}
 	bus.sendMessage("activity.cordova",['Dialog','prompt',[message,title,buttonLabels,defaultText]],onResponseReceived); 
        /*var inputParagraph = document.createElement('p');
        inputParagraph.classList.add('input');
        var inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.id = 'prompt-input';
        if (defaultText) {
            inputElement.setAttribute('placeholder', defaultText);
        }
        inputParagraph.appendChild(inputElement);*/
        //modal(message, successCallback, title, buttonLabels, inputParagraph);
    }

};

module.exports = Notification;
require('cordova/sugar/commandProxy').add('Notification', Notification);
