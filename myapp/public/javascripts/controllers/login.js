app.controller('login', function($scope, $location , $http){
    $scope.errors = [];
    $scope.login = function(){
        $http.post('/login',{
            username:$scope.username,
            password:$scope.password
        }).success(function(data, status) {
            if(data.success){
                $location.path('/profile'); 
            } else{
                $scope.codeStatus = data;
            }
        });
    }
});