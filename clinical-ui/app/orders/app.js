'use strict';

angular.module('orders', ['ngRoute', 'orders.pending', 'bahmni.common.infrastructure','authentication', 'bahmni.common.appFramework', 'httpErrorInterceptor','bahmni.common.patient']);
angular.module('orders').config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/patient/:patientUuid/:orderTypeUuid', {templateUrl: 'views/pendingOrders.html', controller: 'PendingOrdersController',resolve: {initialization: 'initialization'}});
        $routeProvider.otherwise({redirectTo: "../patients"});
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
}]).run(['backlinkService', function (backlinkService) {
        backlinkService.addUrl("Patient Search", "/clinical/clinical/#/patient/search");
    }]);

