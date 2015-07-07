app.controller('signUp', function($scope, $location, $http){
    $scope.errors = [];
    $scope.skills = {
        'C' : false,
        'Cplusplus' : false,
        'JAVA': false,
        'PHP': false
    };
    // $scope.user = {
    //     skills: [$scope.skills.C,$scope.skills.Cplusplus,$scope.skills.JAVA,$scope.skills.PHP]
    // };
    console.log($scope.skills);
    JSON.parse(JSON.stringify($scope.skills));
    $scope.signup = function(){
        console.log($scope.skills, $scope.stream);
        $http.post('/signup',{
            name: $scope.name,
            username: $scope.username,
            password: $scope.password,
            reenterpassword: $scope.reenterpassword,
            age: $scope.age,
            gender: $scope.gender,
            skills: [$scope.skills.C,$scope.skills.Cplusplus,$scope.skills.JAVA,$scope.skills.PHP],
            stream: $scope.stream,
            contact: $scope.contact,
            email: $scope.email
        }).success(function(data, status) {
            if(data.success){
                $location.path('/login'); 
            } else {
                $scope.codeStatus = data.error;
            }
        });
    }
});