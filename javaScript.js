var app = angular.module('mainActivityList', []);

app.controller('mainController', function($scope) {
    $.ajaxSetup({
        async: false
    });
    var data = $.getJSON("exampleObjectList.js", data, function(data) {
            console.log(data);
        })
        .done(function(data) {
            var parsed = [];
            $.each(data, function(key, value) {
                $.each(data[key], function(key2, value2) {
                    parsed.push(value2);
                })
            })
            console.log("should still get here");
            afterDataRetrieval($scope, parsed);
        });
});

function afterDataRetrieval($scope, parsed){
    console.log("We are in the new function");
    $scope.activities = parsed;

    $scope.addNewActivity = function(activity) {
        console.log(">AddNewActivity: called")
        
        $scope.activities.push({
            title: activity.title,
            category: activity.category, //enum or dropdown
            description: activity.description,
            imgURL: activity.imgURL
        });

        console.log(">ActivitiesList length= " + $scope.activities.length);
    };
}


function mainCtrl($scope) {

    $scope.activities = [];

    $scope.addNewActivity = function(activity) {
        console.log(">AddNewActivity: called")
        //put this in a factory
        $scope.activities.push({
            title: activity.title,
            category: activity.category, //enum or dropdown
            description: activity.description,
            imgURL: activity.imgURL
        });

        console.log(">ActivitiesList length= " + $scope.activities.length);
    };

}
