// TMSUpdateController.js
//http://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm
app = angular.module('app');

app.controller('TMSUpdateController', ['$scope', '$rootScope', '$state', 'APIServices',
    'DashboardDataSharingServices', '$location','$cookieStore', '$timeout', '$filter','logger',
    function($scope, $rootScope, $state, APIServices, DashboardDataSharingServices, $location, $cookieStore,
    $timeout, $filter, logger, $apply) {
        
    $('#selectTyreChoice').select2({
	allowClear: true,
        width: 310
    });    
        
	// TMS Device update Controller
  $scope.tms_updateResp = [];


  $scope.uploadTyreInspectionFile = function(){
    
    var file = $scope.myFile;

    //console.log('file is ' );
    //console.log(file.name)...;
    console.log($scope.myFile);

    var UPLOAD_API_URL = "api/tms/NSDataUpload";

    var fd = new FormData();
    fd.append('file', file);
    loading.start();
    $.ajax({
        url: $rootScope.HOST_TMS + UPLOAD_API_URL,
        type: 'POST',
        xhrFields: {withCredentials: true},
        data: fd,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                console.log("Success");
                loading.finish();
                if(data.status == true){
                  $scope.tms_updateResp = data.tyreAssinmentList;
                  $scope.tms_removeResp = data.tyreRemovalList;
                  $scope.$digest();
                } else {
                  logger.logWarning(data.displayMsg);
                }
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
                logger.logWarning("Unable to connect to server. Please check your internet connection / Server may down. Please try again later");
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            logger.logWarning("Unable to connect to server. Please check your internet connection / Server may down. Please try again later");
        }
    });
    // $https:.post($rootScope.HOST_TMS + uploadUrl, fd, {
    //   transformRequest: angular.identity,
    //   headers: {'Content-Type': 'multipart/*'}
    // })
    // .success(function(){
    //   console.log("Success");
    // })
    // .error(function(){
    //   console.log("Error");
    // });
  };
//uploadTyreInspectionFile


  $scope.uploadFile = function(){
    var file = $scope.myFile;

    //console.log('file is ' );
    //console.log(file.name);
    console.log($scope.myFile);

    var UPLOAD_API_URL = "api/tms/fileupload";

    var fd = new FormData();
    fd.append('file', file);
    loading.start();
    $.ajax({
        url: $rootScope.HOST_TMS + UPLOAD_API_URL,
        type: 'POST',
        xhrFields: {withCredentials: true},
        data: fd,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                console.log("Success");
                loading.finish();
                if(data.status == true){
                  $scope.tms_updateResp = data.tyreAssinmentList;
                  $scope.tms_removeResp = data.tyreRemovalList;
                  $scope.$digest();
                } else {
                  logger.logWarning(data.displayMsg);
                }
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
                logger.logWarning("Unable to connect to server. Please check your internet connection / Server may down. Please try again later");
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            logger.logWarning("Unable to connect to server. Please check your internet connection / Server may down. Please try again later");
        }
    });
    // $https:.post($rootScope.HOST_TMS + uploadUrl, fd, {
    //   transformRequest: angular.identity,
    //   headers: {'Content-Type': 'multipart/*'}
    // })
    // .success(function(){
    //   console.log("Success");
    // })
    // .error(function(){
    //   console.log("Error");
    // });
  };

}]);
