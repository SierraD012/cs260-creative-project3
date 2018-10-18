angular.module('mainActivityList', [])

.factory('coolPlaces', function () {
    var jsonFileName = "data.json";

    
    
})

.controller('mainController', mainCtrl)
//.directive('activity', activityDirective);  //maybe use this to populate the list of activities once category is selected 
  
function mainCtrl ($scope) {
    
  $scope.activities = [];
  
  $scope.addNewActivity = function (activity) {
      console.log(">AddNewActivity: called")
      //put this in a factory
        $scope.activities.push({ 
            title: activity.title,
            category: activity.category,    //enum or dropdown
            description: activity.description,
            imgURL: activity.imgURL
        });
    
    console.log(">ActivitiesList length= " + $scope.activities.length);
  };
  
  //Use this init function to populate the activityList with our hard-coded activities
  var init = function () {
        $scope.activities.push({ 
            title: "Sample Activity 1",
            category: "category",    //enum?
            description: "description",
            imgURL: "imgURL"
        });
     };
  init(); //pre-populate list right after page loads
} 
//end mainController ---------