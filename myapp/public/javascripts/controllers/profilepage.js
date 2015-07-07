app.controller('editProfile', function($scope,$rootScope,$http){
    $scope.errors = [];
    $http.get('/profile').success(function(data, status) {
            if(data){
                $scope.name = data.name;
                $rootScope.username = data.username;
                $scope.password = data.password;
                $scope.reenterpassword = data.reenterpassword;
                $scope.age = data.age;
                $scope.gender = data.sex;
                $scope.stream = data.stream;
                $scope.contact = data.contactnumber;
                $scope.email = data.email;
            } else{
                $scope.codeStatus = data.error;
            }
        });
    $scope.editprofile = function(){
        $http.post('/editprofile',{
            name: $scope.name,
            username: $scope.username,
            password: $scope.password,
            reenterpassword: $scope.reenterpassword,
            age: $scope.age,
            gender: $scope.gender,
            //skills: [$scope.skills.C,$scope.skills.Cplusplus,$scope.skills.JAVA,$scope.skills.PHP],
            stream: $scope.stream,
            contact: $scope.contact,
            email: $scope.email
        }).success(function(data, status) {
            if(data.success){
                $location.path('/profile');
            } else{
                $scope.codeStatus = data.error;
            }
        });
    }
});