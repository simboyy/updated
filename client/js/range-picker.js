'use strict';angular.module('rgkevin.datetimeRangePicker',['vr.directives.slider']).filter('rgTime',[function(){return function(input,type){var
hours=parseInt(input/60,10),minutes=(input-(hours*60))<10?'0'+(input-(hours*60)):input-(hours*60),meridian=type?':00':(hours>=12&&hours!==24?' pm':' am');return(!type&&hours>12?(hours===24?'00':(hours-12<10?'0':'')+(hours-12)):(hours<10?'0':'')+hours)+':'+minutes+meridian;};}]).directive('rgRangePicker',['$compile','$timeout','$filter',function($compile,$timeout,$filter){return{restrict:'A',scope:{data:'=rgRangePicker',labels:'=',onTimeChange:'&',maxRangeDate:'=',vertical:'='},template:function(){return'<div class="rg-range-picker" ng-class="{\'rg-range-picker-vertical\':vertical}">'+'<div class="rg-range-picker-box well" ng-class="{ \'only-calendars\': !data.hasTimeSliders, \'only-slider\': !data.hasDatePickers }">'+'<div class="rg-range-picker-calendars" ng-show="data.hasDatePickers">'+'<div class="rg-range-picker-calendar-box">'+'<h5 class="rg-range-picker-calendar-label" ng-bind-template="{{datepickerTitles.from}}"></h5>'+'<datepicker ng-model="data.date.from" max-date="data.date.to" min-date="data.date.min" show-weeks="false" class="clean-calendar"></datepicker>'+'</div>'+'<div class="rg-range-picker-calendar-box right">'+'<h5 class="rg-range-picker-calendar-label" ng-bind-template="{{datepickerTitles.to}}"></h5>'+'<datepicker ng-model="data.date.to" min-date="data.date.from" max-date="data.date.max" show-weeks="false" class="clean-calendar"></datepicker>'+'</div>'+'</div>'+'<div class="rg-range-picker-slider" id="rgRangePickerSliderContainer" ng-show="data.hasTimeSliders">'+'<div class="rg-range-picker-slider-labels">'+'<div class="row">'+'<div class="rg-range-picker-divider xs-hidden"><span class="label">to</span></div>'+'<div class="col-xs-6 text-center"><span class="label label-range-picker">{{data.time.from | rgTime:data.time.hours24}}</span></div>'+'<div class="col-xs-6 text-center"><span class="label label-range-picker">{{data.time.to | rgTime:data.time.hours24}}</span></div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>';},link:function(scope,element,attrs){var
sliderMinWidth=400,sliderContainer=angular.element('#rgRangePickerSliderContainer',element[0]),slider=angular.element('<div slider class="clean-slider" ng-model="data.time.from" ng-model-range="data.time.to" floor="{{data.time.dFrom}}" ceiling="{{data.time.dTo}}" buffer="{{data.time.minRange || 1}}" step="{{data.time.step || 1}}" step-width="{{data.time.step || 1}}" precision="0" stretch="3"></div>'),sliderAlreadyRender=false,defaultLabels={date:{from:'START_DATE',to:'END_DATE'}},timeDefaults={from:480,to:1020,dFrom:0,dTo:1440,step:15,minRange:15,hours24:true},dateDefaults={from:new Date(),to:new Date(),min:null,max:null},timeChangePromise;scope.data.hasDatePickers=angular.isObject(scope.data.date);scope.data.hasTimeSliders=angular.isObject(scope.data.time);scope.datepickerTitles=angular.extend(defaultLabels.date,scope.labels&&scope.labels.date);if(scope.data.hasDatePickers){scope.data.date=angular.extend(dateDefaults,scope.data.date);}if(scope.data.hasTimeSliders){scope.data.time=angular.extend(timeDefaults,scope.data.time);}function renderSlider(){if(!sliderAlreadyRender&&scope.data.hasTimeSliders){sliderContainer.append(slider);$compile(slider)(scope);sliderAlreadyRender=true;if(element.width()<=sliderMinWidth){angular.element('.rg-range-picker',element[0]).addClass('rg-range-picker-responsive');}}}if(attrs.collapse){scope.$watch(function(){return element[0].className;},function(){if(element.hasClass('in')){renderSlider();}});}else{renderSlider();}function timeChanges(newValue,oldValue){if(!angular.isUndefined(timeChangePromise)){$timeout.cancel(timeChangePromise);}if(newValue!==oldValue){timeChangePromise=$timeout(function(){scope.onTimeChange()({from:$filter('rgTime')(scope.data.time.from,true),to:$filter('rgTime')(scope.data.time.to,true),range:$filter('rgTime')(scope.data.time.to-scope.data.time.from,true)});},500);}}if(!angular.isUndefined(scope.onTimeChange())&&scope.data.hasTimeSliders){scope.$watch('data.time.from',timeChanges);scope.$watch('data.time.to',timeChanges);}var
maxRange=((scope.maxRangeDate&&scope.maxRangeDate-1)||0)*86400000,superMaxDate=scope.data.date&&scope.data.date.max&&scope.data.date.max.getTime(),superMinDate=scope.data.date&&scope.data.date.min&&scope.data.date.min.getTime();function updateMinAndMaxDate(){var
currentRange=scope.data.date.to.getTime()-scope.data.date.from.getTime(),offset=maxRange-currentRange,_min=(scope.data.date.from.getTime()-offset)<superMinDate?superMinDate:scope.data.date.from.getTime()-offset,_max=(scope.data.date.to.getTime()+offset)>superMaxDate?superMaxDate:(scope.data.date.to.getTime()+offset);scope.data.date.min=new Date(_min);scope.data.date.max=new Date(_max);}if(scope.maxRangeDate&&scope.data.hasDatePickers){scope.$watch('data.date.from',updateMinAndMaxDate);scope.$watch('data.date.to',updateMinAndMaxDate);}},controller:["$scope","$element","$attrs",function($scope,$element,$attrs){}]};}]);