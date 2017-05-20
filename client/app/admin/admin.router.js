'use strict';

angular.module('mediaboxApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController as admin',
        authenticate: 'admin'
      });
  });
