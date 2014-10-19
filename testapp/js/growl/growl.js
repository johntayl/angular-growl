(function(window, angular, undefined) {
'use strict';

angular.module('growl', [])

/**
*  Growl Messages service
*
*  Growl messages service to manage the queue.
*/

.factory('GrowlMessages', [ function() {
    var _next_id = 0;
    var messages = [];

    return {
        messages: function() {
            return messages;
        },

        success: function( str ) {
            this.add(str, 'success');
        },
        error: function( str ) {
            this.add(str, 'error');
        },
        notice: function( str ) {
            this.add(str, 'notice');
        },

        //Custom add, can override status values.
        add: function( str, status ) {
            _next_id++;
            var message = {
                _id: _next_id,
                message: str,
                status: status
            };
            messages.push(message);
        },

        remove: function( message ) {
            angular.forEach(messages, function(value, key) {
                if ( value._id === message._id )
                    messages.splice(key, 1);
            });
        }
    }
}])

/**
* Growl Message directive.
*
* Growl Message directive which displays growl messages.
*/
.directive("growlMessages", [ 'GrowlMessages', function ( GrowlMessages ) {
    return {
        scope: {},
        template: '<div class="growl-messages" growl-message message="message" ng-repeat="message in messages track by $index"></div>',
        link: function (scope, element, attributes) {
            scope.messages = [];

            scope.$watch(function(){
                scope.messages = GrowlMessages.messages();
            });
        }
    };
}])
.directive("growlMessage", [ '$timeout', 'GrowlMessages', function($timeout, GrowlMessages) {
    return {
        scope: {
            message: "="
        },
        template: '<div class="growl-message" ng-class="::message.status"><span>{{::message.message}}</span> <button ng-click="remove()">&times;</button></div>',
        link: function(scope, element, attributes) {

            var timeout = $timeout(function() {
                GrowlMessages.remove(scope.message);
            }, 5000);

            scope.remove = function() {
                GrowlMessages.remove(scope.message);
                $timeout.cancel(timeout);
            };
        }
    }
}]);




})(window, angular);
