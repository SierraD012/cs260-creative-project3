var app = angular.module('mainActivityList', []);

app.controller('mainController', function($scope) {
    $.ajaxSetup({
        async: false
    });
    var data = $.getJSON("data.json", data, function(data) {
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
        })
        .fail(function(){
            console.log("Something went wrong loading the file.");
        });
});

function afterDataRetrieval($scope, parsed){
    console.log("We are in the new function");
   // $scope.activities = parsed;

    $scope.addNewActivity = function(activity) {
        console.log(">AddNewActivity: called")
        
        var newActivity = {
            name: activity.name,
            category: activity.category,
            imageUrl: activity.imageUrl,
            description: activity.description
        }
        
        parsed.push(newActivity);

        console.log(">ActivitiesList length= " + parsed.length);
    };
}


