# Angular Growl Messages

Angular module that adds growl message functionality. Growl messages are quick notification messages that are forcefully removed or removed after a short amount of time.


## Usage

Declare the Growl Messages module in the app module.

`angular.module('app', ['growl'])`

### Service

This module comes with a service that handles adding and removing messages.

    app.controller('SomeController', ['$scope', 'GrowlMessages',
    function( $scope, GrowlMessages ) {

        GrowlMessages.notice("This is a notice styled message");

        GrowlMessages.success("This is a success styled message");

        GrowlMessages.error("This is a error styled message");

        GrowlMessages.add("Custom style", 'custom-class');

    }]);

### Directive

Add the growl messages directive anywhere in the app. The given directives are a container
for the messages that can be styled.

    <div growl-messages></div>

Example of compiled directive templates:


    <div class="growl-messages">
        <div class="growl-message success">
            <span>Growl message</span>
            <button>&times;</button>
        </div>
    </div>


## Development

Testing the test app.

    npm install -g http-server
    cd path/to/growl/testapp
    http-server
