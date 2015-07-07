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