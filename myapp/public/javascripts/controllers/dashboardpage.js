app.controller('dashboard', function($scope,$rootScope,$http){
    $scope.errors = [];
    $http.get('/dashboard').success(function(data, status) {
            if(data.success){
                $location.path('/dashboard');
            }
        });
    // $scope.editprofile = function(){
    //     $http.post('/editprofile',{
    //         name: $scope.name,
    //         username: $scope.username,
    //         password: $scope.password,
    //         reenterpassword: $scope.reenterpassword,
    //         age: $scope.age,
    //         gender: $scope.gender,
    //         //skills: [$scope.skills.C,$scope.skills.Cplusplus,$scope.skills.JAVA,$scope.skills.PHP],
    //         stream: $scope.stream,
    //         contact: $scope.contact,
    //         email: $scope.email
    //     }).success(function(data, status) {
    //         if(data.success){
    //             $location.path('/profile');
    //         } else{
    //             $scope.codeStatus = data.error;
    //         }
    //     });
    // }
});