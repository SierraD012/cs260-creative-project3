var app = angular.module('mainActivityList', []);


app.controller('mainController', function($scope) {
    /*
    This code inicialises the data from the json file
    It will send an error message to the console if there is a
    problem pulling the information
    After pulling the data, it gives it to the next function
    along with the $scope.
    */

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
            $scope.activities = parsed;
            afterDataRetrieval($scope);
        })
        .fail(function() {
            console.log("Something went wrong loading the file.");
        });
});

app.directive('activity', activityDirective);

/* 
This runs the populate and add activity functions
This is the majority of the work for updating the html
*/
function afterDataRetrieval($scope) {
    console.log("entering afterDataRetrieval function");


    $scope.addNewActivity = function(activity) {
        console.log(">AddNewActivity: called")

        var newActivity = {
            name: activity.name,
            category: activity.category,
            link: "",
            imageUrl: activity.imageUrl,
            description: activity.description
        }

        $scope.activities.push(newActivity)
        activity.name = "";
        activity.category = "";
        activity.link = "";
        activity.imageUrl = "";
        activity.description = "";


        console.log(">ActivitiesList length= " + $scope.activities.length);
    };
}



/* 
This directive gives us a templete to data bind the html view
If no image link is provided, it will give a defalt image
*/
function activityDirective() {
    return {
        scope: {
            activity: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            '<div class="row">' +
            '<a href={{activity.link}} target="_blank">' +
            '<img class="activity-img" ng-src={{activity.imageUrl}} />' +
            '</a>' +
            '<div class="col">' +
            '<span class="activity-name">{{activity.name}}</span>' +
            '<br>' +
            '<span class="activity-info">{{activity.description}}</span>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '</div>'
        ),
        link: link
    };

    function link(scope) {
        if (!scope.activity.imageUrl) {
            scope.activity.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/BYU_Cougars_logo.svg/2000px-BYU_Cougars_logo.svg.png";
        }
        if (!scope.activity.link) {
            scope.activity.link = "http://www.google.com";
        }
    }
}