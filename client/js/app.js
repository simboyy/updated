'use strict';angular.module('mediaboxApp',['mediaboxApp.auth','mediaboxApp.admin','mediaboxApp.constants','ngCookies','ngResource','ngSanitize','ngMessages','btford.socket-io','ui.router','validation.match','ngMaterial','ngAnimate','ngMdIcons','angularMoment','infinite-scroll','materialDatePicker','ngFileUpload','rzModule','darthwade.dwLoading','ui.tree','ui.odometer','oitozero.ngSweetAlert','naif.base64','ngPintura','ngOnload','kendo.directives','ui.calendar','ui.bootstrap','daterangepicker']).config(function($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider,$urlMatcherFactoryProvider,$mdThemingProvider,$mdIconProvider){$urlRouterProvider.otherwise('/');$locationProvider.html5Mode(true);var defaultPalette='blue';var greyBackgroundMap=$mdThemingProvider.extendPalette(defaultPalette,{'A100':'fafafa'});$mdThemingProvider.definePalette('grey-background',greyBackgroundMap);$mdThemingProvider.setDefaultTheme(defaultPalette);$mdThemingProvider.theme(defaultPalette).primaryPalette(defaultPalette).accentPalette('pink').backgroundPalette('grey-background');}).controller('preLoaderCtrl',function($scope){$scope.siteLoaded=true});