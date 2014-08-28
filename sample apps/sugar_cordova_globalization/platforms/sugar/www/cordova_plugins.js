cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.globalization/www/GlobalizationError.js",
        "id": "org.apache.cordova.globalization.GlobalizationError",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.globalization/www/globalization.js",
        "id": "org.apache.cordova.globalization.globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.globalization/src/sugar/GlobalizationProxy.js",
        "id": "org.apache.cordova.globalization.GlobalizationProxy",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.globalization": "0.2.8"
}
// BOTTOM OF METADATA
});