/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute' //The ngRoute module provides routing and deeplinking services
            //and directives for angular apps
]);

/**
 * Configure the Routes
 */
 // $routeProvider is used for configuring routes
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
    .when("/", {templateUrl: "/views/homepage.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "/views/about_us.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "../views/login.html", controller: "PageCtrl"})
    .when("/signup", {templateUrl: "../views/signup.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "/views/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "/views/contact_us.html", controller: "PageCtrl"})
    .otherwise({
        templateUrl: "/views/404.html", controller: "PageCtrl"
    });
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
    console.log("Blog Controller reporting for duty.");
});

app.controller('contactUs', function($scope, $http){
    $scope.errors = [];
    $scope.contactus = function(){
        $http.post('/contact_us',{
            name:$scope.name,
            email:$scope.email1,
            comment:$scope.comment,
        }).success(function(data, status) {
            // $scope.name = "";
            // $scope.email1 = "";
            // $scope.comment = "";
            $scope.codeStatus = data;
        }).error(function(data, status) { 
        // called asynchronously if an error occurs
        // or server returns response with an error status.
            $scope.errors.push(status);
        });
    }
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});