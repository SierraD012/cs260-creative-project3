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
    console.log("entering afterDataRetrieval function");

    $scope.populate = function(){
        
    }

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

app.directive('activity', activityDirective);

function activityDirective() {
    return {
      scope: {
          user: '='
      },
      restrict: 'E',
      replace: true,
      template: (
          
        ),
        link: link
    };
    function link(scope){
        if(!scope.user.imageUrl){
            scope.user.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/BYU_Cougars_logo.svg/2000px-BYU_Cougars_logo.svg.png';
        }
    }
}

