// controller.js
app = angular.module('app');

app.controller('TMSSysAdminController', ['$scope', '$rootScope', '$state', 'APIServices',
    'DashboardDataSharingServices', '$location','$cookieStore', '$timeout', '$filter','logger',
    function($scope, $rootScope, $state, APIServices, DashboardDataSharingServices, $location, $cookieStore,
    $timeout, $filter, logger, $apply) {
	try {
	    $('#vehicleOrganizationId').select2({
		placeholder: "Select Organization",
		allowClear: true,
		width: 227
	    });
	    $('#vehicledepotId').select2({
		placeholder: "Select Depot",
		allowClear: true,
		width: 227
	    });
	    $('#vehicletyreId').select2({
		placeholder: "Select Tyre",
		allowClear: true,
		width: 227
	    });
	    $('#vehicletyrepositiontId').select2({
		placeholder: "Select Position",
		allowClear: true,
		width: 227
	    });
	    $('#vehiclerfidId').select2({
		placeholder: "Select RFID",
		allowClear: true,
		width: 227
	    });
	    $('#vehiclebluetoothId').select2({
		placeholder: "Select Bluetooth",
		allowClear: true,
		width: 227
	    });
	    $('#tyredepotId').select2({
		placeholder: "Select Depot",
		allowClear: true,
		width: 227
	    });
	    $('#tyremakeId').select2({
		placeholder: "Select Tyre Make",
		allowClear: true,
		width: 227
	    });
	    $('#sensorId').select2({
		placeholder: "Select Sensor UID",
		allowClear: true,
		width: 227
	    });
	    // Tyre assign to vehicle ddl
	    $('#FrontLeft_Id').select2({
		placeholder: "FrontLeft Tyre",
		allowClear: true,
		width: 230
	    });
	    $('#FrontRight_Id').select2({
		placeholder: "FrontRight Tyre",
		allowClear: true,
		width: 230
	    });
	    $('#RearLeftOuter_Id').select2({
		placeholder: "RearLeftOuter Tyre",
		allowClear: true,
		width: 230
	    });
	    $('#RearLeftInner_Id').select2({
		placeholder: "RearLeftInner Tyre",
		allowClear: true,
		width: 230
	    });
	    $('#RearRightOuter_Id').select2({
		placeholder: "RearRightOuter Tyre",
		allowClear: true,
		width: 230
	    });
	    $('#RearRightInner_Id').select2({
		placeholder: "RearRightInner Tyre",
		allowClear: true,
		width: 230
	    });

	    // Tire Inspection
	    $('#tyreNumberId').select2({
		placeholder: "Tyre Number",
		allowClear: true,
		width: 278
	    });
	    $('#serviceTyreId').select2({
		placeholder: "Tyre Number",
		allowClear: true,
		width: 235
	    });
	    $('#tyreScrapId').select2({
		placeholder: "Tyre Condition",
		allowClear: true,
		width: 235
	    });
	    $('#searchTyreId').select2({
		placeholder: "Tyre Number",
		allowClear: true,
		width: 227
	    });

	    $('#selectVehId_TMSVehFilter').select2({
		placeholder: "Select Vehicles",
		allowClear: true,
		width: 200
	    });

	    $('#vehicleStatusId').select2({
		placeholder: "Select Status",
		allowClear: true,
		width: 200
	    });

	    $('#tyrePosition_id').select2({
	 	placeholder: "Tyre Position",
	 	allowClear: true,
	 	width: 235
	    });
	    $('#selectedTMSServiceVeh_id').select2({
		placeholder: "Select Vehicle",
	 	allowClear: true,
	 	width: 235
	    });
	    $('#tyreTypeId').select2({
		placeholder: "Select Tyre Type",
		allowClear: true,
		width: 227
	    });
	    $('#location_id').select2 ({
	        placeholder: "Tyre Position",
	        allowClear: true,
	        width: 278
	    });
	    $('#deallocatedVehicleSelect_id').select2({
		placeholder: "Select Status",
		allowClear: true,
		width: 227
	    });
            
	    $('#sensorOrganizationId').select2 ({
		placeholder: "Organization",
	        allowClear: true,
	        width: 278
	    });

	    $('#bluetoothOrganizationId').select2 ({
		placeholder: "Organization",
	        allowClear: true,
	        width: 278
	    });

	    $('#rfidOrganizationId').select2 ({
		placeholder: "Organization",
	        allowClear: true,
	        width: 278
	    });
            
            $('#selectupdateChoice').select2 ({
	        allowClear: true,
	        width: 250
	    });
            
            $('#selectDeviceVehicle').select2({
                placeholder: "Select Vehicle",
                allowClear: true,
                width: 228
            });
        
	    if(sessionStorage.UserLevelId > 0 && sessionStorage.UserLevelId < 5){
		$('#sensorOrgList').show();
		$('#bluetoothOrgList').show();
		$('#rfidOrgList').show();
	    } else {
		$('#sensorOrgList').hide();
		$('#bluetoothOrgList').hide();
		$('#rfidOrgList').hide();
	    }

	    // Tyre status
	    $scope.tyreStatusList = ["InStock", "Retread", "Scrap"];
	    $scope.DeviceStatusList = ["InStock", "Scrap"];
	} catch (e) { console.log(e); }

	$scope.getTMSOrganizationList = function() {
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getTMSOrgList', true)
		.then(
		    function(httpResponse){ // Success block
			try{
			    loading.finish();
			    if(httpResponse.data.status == true) {
  				  $rootScope.TMSOrgList = httpResponse.data.result;
			    }
			}
			catch(error) {
			    loading.finish();
			    console.log("Error :"+error);
			}
		    }, function(httpError) { 	// Error block
			loading.finish();
			console.log("Error while processing request");
		    }, function(httpInProcess){	// In process
			console.log(httpInProcess);
		    }
		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.addNewOrg = function() {
	    try {
		if($scope.TMSVehNewOrgName != undefined && $scope.TMSVehNewOrgName != "" && $scope.TMSVehNewOrgName.length > 0 ){
		    APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/addOrganization?orgName='+$scope.TMSVehNewOrgName, true)
		    .then(
			function(httpResponse){ // Success block
			    try{
				loading.finish();
				if(httpResponse.data.status == true) {
				    logger.logSuccess('Organization added successfully');
				    $scope.getTMSOrganizationList();
				    $('#org-popup').hide();
				    $('#create_NewOrg').val('');
				} else {
				    logger.logError(httpResponse.data.displayMsg);
				}
			    }
			    catch(error) {
				loading.finish();
				console.log("Error :"+error);
			    }
			}, function(httpError){	 	// Error block
			    loading.finish();
			    console.log("Error while processing request");
			}, function(httpInProcess){	// In process
			    console.log(httpInProcess);
			}
		    );
		} else{
		    logger.logError("Please enter Organization Name");
		}
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.getTMSOrganizationList();

	// Bluetooth Details code starts Here
	$scope.totalItems_bctrl = 0;
	$scope.currentPage_bctrl = 1;
	$scope.itemsPerPage_bctrl = 10;
	$scope.maxSize_bctrl = 3;

	$scope.TMSBctrl_searchWord = "";

	$scope.pageChanged_Bluetooth = function(){
	    $scope.nextIndex_bctrl = ($scope.currentPage_bctrl - 1) * $scope.itemsPerPage_bctrl;
	    $rootScope.getTMSAllBController('', $scope.nextIndex_bctrl, $scope.searchStringForBctrl);
	};

	var timer_bctrl = false;
	$scope.searchBCtrl = function() {
	    if(timer_bctrl) {
		$timeout.cancel(timer_bctrl);
	    }
	    timer_bctrl = $timeout(function(){
		$scope.pageChanged_Bluetooth();
	    },1000);
	};

	$scope.addBControllerButtonStatus = true;
	$rootScope.TMSAllBController = new Array();
	$rootScope.getTMSAllBController = function(status, startIndex, searchWord) {
	    try {
		if (status == undefined || status == "" || status.length == 0) {
		    status = '';
		}
		if (searchWord == undefined || searchWord == "" || searchWord.length == 0) {
		    searchWord = '';
		}
		if(startIndex == undefined || startIndex == 'null') {
		    startIndex = 0;
		}

		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getBController?status=' + status
		+'&limit='+$scope.itemsPerPage_bctrl+'&startIndex='+startIndex+'&searchWord='+searchWord, true)
 		.then(
		    function(httpResponse){ // Success block
 			try{
 			    loading.finish();
			    if(httpResponse.data.status == true) {
				$rootScope.TMSAllBController = httpResponse.data.result;
				$scope.totalItems_bctrl = httpResponse.data.count;
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError) {	// Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess) {   // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.getBControllerDetailsFormForAdd = function() {
	    $('#showTMSBluetoothModalId').modal('show');
	    $scope.showBControllerAddingForm = !$scope.showBControllerAddingForm;
	    $scope.updateBControllerButtonStatus = false;
	    $scope.showBControllerAddingForm = true;
	    $scope.addBControllerButtonStatus = true;
	    $scope.BControllerUID = '';
	    $scope.updateBControllerButtonStatus = false;
	};

	$scope.getBControllerDetailsFormForUpdate = function(BControllerDetails) {
	    $('#showTMSBluetoothModalId').modal('show');
	    $scope.BControllerUID = BControllerDetails.controllerUID;
	    $scope.updateBController = BControllerDetails;
	    $scope.updateBControllerButtonStatus = true;
	    $scope.showBControllerAddingForm = true;
	    $scope.addBControllerButtonStatus = false;
	};

	$scope.AddBController = function() {
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/BController/Add?BControllerUID='+$scope.BControllerUID, true)
		.then(
 		    function(httpResponse){ // Success block
			try{
			    loading.finish();
			    if(httpResponse.data.status == true) {
				logger.logSuccess('Bluetooth UID added successfully');
				$scope.pageChanged_Bluetooth();
				$('#showTMSBluetoothModalId').modal('hide');
			    } else {
			 	logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError) { // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.updateBControllerDetails = function(){
	    try {
		var UPDATE_URL =$rootScope.HOST_TMS + 'api/tms/BController/Update?BControllerId='
		+$scope.updateBController.controllerId+'&BControllerUID='+$scope.BControllerUID;
		APIServices.callGET_API(UPDATE_URL, true)
		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true) {
				logger.logSuccess('Bluetooth UID udated successfully');
				$scope.pageChanged_Bluetooth();
				$('#showTMSBluetoothModalId').modal('hide');
			    }
			    else {
				logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
	    		console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	// RFID Details code starts Here
	$scope.totalItems_rfid = 0;
	$scope.currentPage_rfid = 1;
	$scope.itemsPerPage_rfid = 10;
	$scope.maxSize_rfid = 3;

	$scope.TMSRFID_searchWord = "";

	$scope.pageChanged_RFID = function(){
	    $scope.nextIndex_rfid = ($scope.currentPage_rfid - 1) * $scope.itemsPerPage_rfid;
	    $rootScope.getTMSAllRFID('', $scope.nextIndex_rfid, $scope.searchStringForRfid);
	};

	var timer_rfid = false;
	$scope.searchRFID = function() {
	    if(timer_rfid){
		$timeout.cancel(timer_rfid);
	    }
	    timer_rfid = $timeout(function(){
		$scope.pageChanged_RFID();
	    },1000);
	};

	$scope.addRFIDButtonStatus = true;
	$rootScope.TMSAllRFID = new Array();
	$rootScope.getTMSAllRFID = function(status, startIndex, searchWord) {
	    try {
		if (status == undefined || status == "" || status.length == 0) {
		    status = '';
		}
		if (searchWord == undefined || searchWord == "" || searchWord.length == 0) {
		    searchWord = '';
		}
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getRFID?status=' + status
		+'&limit='+$scope.itemsPerPage_rfid+'&startIndex='+startIndex+'&searchWord='+searchWord, true)
 		.then(
 		    function(httpResponse){ // Success block
			try{
 			    loading.finish();
			    if(httpResponse.data.status == true) {
				$rootScope.TMSAllRFIDS = httpResponse.data.result;
				$scope.totalItems_rfid = httpResponse.data.count;
			    } else {
				logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError) {	// Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){	// In process
	    		console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.getRFIDDetailsFormForAdd = function(){
	    $('#showTMSRfidModalId').modal('show');
	    $scope.showRFIDAddingForm = !$scope.showRFIDAddingForm;
	    $scope.updateRFIDButtonStatus = false;
	    $scope.showRFIDAddingForm = true;
	    $scope.addRFIDButtonStatus = true;
	    $scope.RFIDUID = '';
	    $scope.updateRFIDButtonStatus = false;
	};

	$scope.getRFIDDetailsFormForUpdate = function(RFIDDetails) {
	    $('#showTMSRfidModalId').modal('show');
	    $scope.RFIDUID = RFIDDetails.rfiduid;
	    $scope.updateRFID = RFIDDetails;
	    $scope.updateRFIDButtonStatus = true;
	    $scope.showRFIDAddingForm = true;
	    $scope.addRFIDButtonStatus = false;
	}

	$scope.AddRFID = function(){
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/RFID/Add?RFIDUID='+$scope.RFIDUID, true)
		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true) {
				logger.logSuccess('RFID UID added successfully');
				$scope.pageChanged_RFID();
				$('#showTMSRfidModalId').modal('hide');
			    } else {
			 	logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error){
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError) { // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	}

	$scope.updateRFIDDetails = function() {
	    try {
		var UPDATE_URL =$rootScope.HOST_TMS + 'api/tms/RFID/Update?RFID='
		+$scope.updateRFID.rfid+'&RFIDUID='+$scope.RFIDUID;

		APIServices.callGET_API(UPDATE_URL, true)
 		.then(
 		    function(httpResponse){ // Success block
 			try{
 			    loading.finish();
			    if(httpResponse.data.status == true) {
				logger.logSuccess('RFID UID updated successfully');
				$scope.pageChanged_RFID();
				$('#showTMSRfidModalId').modal('hide');
			    }
			    else {
				logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error){
 			    loading.finish();
 			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
 			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){	// In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	}

	// Sensor Details Code Starts Here
	$scope.addSensorButtonStatus = true;
	$scope.sensorStatusList = ["All", "InStock", "Installed", "Scraped"];
	$rootScope.TMSAllSensors = new Array();
	$scope.limit_sensor = 10;
	$scope.startIndex_sensor = 0;

	$scope.totalItems_sensor = 0;
	$scope.currentPage_sensor = 1;
	$scope.itemsPerPage_sensor = 10;
	$scope.maxSize_sensor = 3;

	$scope.TMSSensor_searchWord = "";

	$scope.pageChanged_sensor = function(from){
	    $scope.nextIndex_sensor = ($scope.currentPage_sensor - 1) * $scope.itemsPerPage_sensor;
	    $rootScope.getTMSAllSensors($scope.sensorStatusFilter, $scope.nextIndex_sensor, $scope.searchStringForSensors);
	};

	$scope.AddSensor = function() {
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/Sensor/Add?sensorUID='+$scope.sensorUID
		+'&rimNo='+$scope.rimNo, true)
		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true){
				logger.logSuccess('Sensor UID added successfully');
				$scope.pageChanged_sensor('sensor added');
				$('#showTMSSensorModalId').modal('hide');
			    } else {
			 	logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.sensorStatusFilter = "All";
	$scope.sensorStatusChanged = function(){
	    $scope.limit_sensor = 10;
	    $scope.startIndex_sensor = 0;
	    $scope.pageChanged_sensor('sensor status changed');
	};

	var timer_sensors = false;
	$scope.searchSensors = function() {
	    if(timer_sensors){
		$timeout.cancel(timer_sensors);
	    }
	    timer_sensors= $timeout(function(){
		$scope.pageChanged_sensor('sensor search');
	    },1000);
	};
        
        $rootScope.download_SensorStatus = function(){
            try{
                loading.start();
                // Download excel
                window.location = $rootScope.HOST_TMS + "api/tms/downloadSensorList";
            } catch(e){
                loading.finish();
                console.log(e);
            }
        };

	$scope.sensorSID = 0;
	$rootScope.getTMSAllSensors = function(status, startIndex, searchWord) {
	    try {
		if(status == undefined || status == 'All') {
		    status ='';
		}
		if(searchWord == undefined || searchWord == 'null') {
		    searchWord ='';
		}
		if(startIndex == undefined || startIndex == 'null'){
		    startIndex = 0;
		}
		$scope.sensorSID = $scope.startIndex_sensor;
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getSensors?status=' + status
		+'&limit='+$scope.itemsPerPage_sensor+'&startIndex='+startIndex+'&searchWord='+searchWord, true)
 		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true){
				$rootScope.TMSAllSensors = httpResponse.data.result;
				$scope.totalItems_sensor = httpResponse.data.count;
			    }
 			}
 			catch(error){
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.getSensorDetailsFormForUpdate = function(sensorDetails) {
	    $('#showTMSSensorModalId').modal('show');
	    $scope.sensorUID = sensorDetails.sensorUID;
	    $scope.rimNo = sensorDetails.rimNo;
	    $scope.updateSensor = sensorDetails;
	    $scope.updateSensorButtonStatus = true;
	    $scope.showSensorAddingForm = true;
	    $scope.addSensorButtonStatus = false;
	};

	$scope.getSensorDetailsFormForAdd = function() {
	    $('#showTMSSensorModalId').modal('show');
	    $scope.showSensorAddingForm = !$scope.showSensorAddingForm;
	    $scope.updateSensorButtonStatus = false;
	    $scope.showSensorAddingForm = true;
	    $scope.addSensorButtonStatus = true;
	    $scope.sensorUID = '';
	    $scope.rimNo = '';
	    $scope.updateSensorButtonStatus = false;
	};

	$scope.updateSensorDetails = function(){
	    try {
		var UPDATE_URL =$rootScope.HOST_TMS + 'api/tms/Sensor/Update?sensorId='+$scope.updateSensor.sensorId
		+'&sensorUID='+$scope.sensorUID+ '&rimNo='+ $scope.rimNo;
		APIServices.callGET_API(UPDATE_URL, true)
		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true){
				$scope.pageChanged_sensor('sensor updated');
				logger.logSuccess('Sensor UID updated successfully');
				$('#showTMSSensorModalId').modal('hide');
			    } else {
			 	logger.logError(httpResponse.data.displayMsg);
			    }
 			}
 			catch(error) {
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError) {	// Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	try {
	    $("#sensorOrganizationId").val("").trigger('change');
	} catch (e) { }
	try {
	    $("#bluetoothOrganizationId").val("").trigger('change');
	} catch (e) { }
	try {
	    $("#rfidOrganizationId").val("").trigger('change');
	} catch (e) { }

	// Assign vehicle code starts
	// display users
	$scope.getTMSAllUsers = function() {
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getAllUserDetails', true)
	 	.then(
		    function(httpResponse){ // Success block
			try {
			    loading.finish();
			    if (httpResponse.data.status) {
				$scope.basicUserDetails = httpResponse.data.result;
			    }  else {
				logger.logWarning(httpResponse.data.displayMsg);
			    }
			}
			catch(error) {
			    loading.finish();
			    console.log("Error :"+error);
			}
		    }, function(httpError) { // Error block
			loading.finish();
			console.log("Error while processing request");
		    }, function(httpInProcess)  { // In process
			console.log(httpInProcess);
		    }
		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	// display Vehicles
	$scope.getTMSAllVehicles = function() {
	    try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getBasicVehDetails', true)
		.then(
		    function(httpResponse){ // Success block
			try {
			    loading.finish();
			    if (httpResponse.data.status) {
				$scope.basicVehicleDetails = httpResponse.data.result;
			    }  else {
				logger.logWarning(httpResponse.data.displayMsg);
			    }
			} catch(error) {
			    loading.finish();
			    console.log("Error :"+error);
			}
		    }, function(httpError) { // Error block
			loading.finish();
			console.log("Error while processing request");
		    }, function(httpInProcess)  { // In process
			console.log(httpInProcess);
		    }
		);
	    } catch (e) { loading.finish(); console.log(e); }
	};

	$scope.tmsAssignVehToUser = function() {
	    try {
		if ($('#tms_assignUser_id :selected').length == 0) {
		    alert("Select atleast one user");
		} else if ($('#tms_assignVehicle_id :selected').length == 0) {
		    alert("Select atleast one vehicle");
		} else {
		    var assignVeh_paramlog = JSON.stringify({userIds: $('#tms_assignUser_id').val(), vehIds: $('#tms_assignVehicle_id').val()});
		    var assignVeh_request_data = {
			RequestParam: assignVeh_paramlog,
		    };

		    APIServices.callAPI($rootScope.HOST_TMS + 'api/tms/assignVehToUsers', assignVeh_request_data, true)
		    .then(function(httpResponse){ // Success block
			try{
			    if (httpResponse.data.status) {
				logger.logSuccess(httpResponse.data.displayMsg);
			    }else {
				logger.logError(httpResponse.data.displayMsg)
			    }
			        loading.finish();
			} catch (e) { console.log(e); }
		    });
		}
	    } catch (e) { loading.finish(); console.log(e); }
	};

	// User - Vehicle details
	$scope.totalItems_vehUserDetails = 0;
	$scope.currentPage_vehUserDetails = 1;
	$scope.itemsPerPage_vehUserDetails = 10;
	$scope.maxSize_vehUserDetails = 3;

	$scope.searchStringForvehUserDetails = "";

	$scope.pageChanged_vehUserDetails = function(){
	    $scope.nextIndex_vehUserDetails = ($scope.currentPage_vehUserDetails - 1) * $scope.itemsPerPage_vehUserDetails;
	    $scope.getAllTMSVehiclesDetails($scope.nextIndex_vehUserDetails, $scope.searchStringForvehUserDetails);
	};

	var timer_vehUserDetails = false;
	$scope.searchVehUserDetails = function() {
	    if(timer_vehUserDetails){
		$timeout.cancel(timer_vehUserDetails);
	    }
	    timer_vehUserDetails= $timeout(function(){
		$scope.pageChanged_vehUserDetails();
	    },1000);
	};

	$scope.enableVehicle = function(vehName, userName) {
	    $('#vehicle_status_enable_modal').modal('show');
	    $("#enableContentId").html("");
	    $('#enableContentId').append('Are you sure you want to Enable vehicle details <span style="font-weight:bold">'
		+vehName+'</span> to <span style="font-weight:bold">' +userName+'</span>?<div style="margin-top:10px;" ><button type="button" class="btn btn-success"'
		+'onclick="updateDeviceStatus();" style="height: 35px;">Yes</button>&nbsp;<button type="button" class="btn btn-warning"'
		+'data-dismiss="modal" style="height: 35px; padding-top: 6px;">No</button></div>');
	};

	$scope.disableVehicle = function(vehName, userName){
	    $('#vehicle_status_disable_modal').modal('show');
	    $("#disableContentId").html("");
	    $('#disableContentId').append('Are you sure you want to Disable vehicle details <span style="font-weight:bold">'
	      +vehName+'</span> to <span style="font-weight:bold">' +userName+'</span>?<div style="margin-top:10px;" ><button type="button" class="btn btn-success"'
	      +'onclick="updateDeviceStatus();" style="height: 35px;">Yes</button>&nbsp;<button type="button" class="btn btn-warning"'
	      +'data-dismiss="modal" style="height: 35px; padding-top: 6px;">No</button></div>');
	};

	$scope.getAllTMSVehiclesDetails = function(nextIndex_vehicle, searchWord) {
	    $scope.VehicleUserDetails = new Array();
	    try	{
		var request = "limit="+$scope.itemsPerPage_vehUserDetails+"&startIndex="+nextIndex_vehicle;

		if(searchWord != undefined && searchWord != null && searchWord.trim().length > 0){
		    // Search vehicles
		    request = request + "&searchWord=" + searchWord
		}
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getUserVehDetials?' + request, true)
		.then(
		    function(httpResponse){ // Success block
			try{
			    if (httpResponse.data.status) {
				if (httpResponse.data.result.length > 0) {
				    $scope.VehicleUserDetails = httpResponse.data.result;
				    $scope.totalItems_vehUserDetails = httpResponse.data.count;
				} else {
				    $rootScope.VehicleUserDetails = [];
				    $scope.totalItems_vehUserDetails = 0;
				}
			    }
			}
			catch(error) {
			    loading.finish();
			    console.log("Error :"+error);
			}
		    }, function(httpError){	 // Error block
			loading.finish();
			console.log("Error while processing request");
		    }, function(httpInProcess){		// In process
			console.log(httpInProcess);
		    }
		);
	    } catch(err) {
		loading.finish();
		console.log(err);
	    }
	};
        
        //Error log
        $scope.searchStringForErrlog = "";
	var timer_errlog = false;
	$scope.searchErrLog = function() {
	    if(timer_errlog) {
		$timeout.cancel(timer_errlog);
	    }
	    timer_errlog = $timeout(function(){
		$scope.pageChanged_errorlog();
	    },1000);
	};
        
        $scope.limit_errorLog = 10;
	$scope.startIndex_errorLog = 0;

	$scope.totalItems_errorLog = 0;
	$scope.currentPage_errorLog = 1;
	$scope.itemsPerPage_errorLog = 10;
	$scope.maxSize_errorLog = 3;

        $scope.pageChanged_errorlog = function(){
	    $scope.nextIndex_errlog = ($scope.currentPage_errorLog - 1) * $scope.itemsPerPage_errorLog;
	    $rootScope.getTMSAllErrorLogs( $scope.nextIndex_errlog, $scope.searchStringForErrlog);
	};
       
        // display all error log details
        $scope.errorLog = 0;
	$rootScope.getTMSAllErrorLogs = function(startIndex, searchWord) {
	    try {
		if(searchWord == undefined || searchWord == 'null') {
		    searchWord ='';
		}
		if(startIndex == undefined || startIndex == 'null'){
		    startIndex = 0;
		}
		$scope.errorLog = $scope.startIndex_errorLog;
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getpierrorlog?'
		+'limit='+$scope.itemsPerPage_errorLog+'&startId='+startIndex+'&searchWord='+searchWord, true)
 		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true){
				$rootScope.TMSAllErrorLog = httpResponse.data.result;
				$scope.totalItems_errorLog = httpResponse.data.count;
			    }
 			}
 			catch(error){
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};
        
        
        // Update log and removal log
        
        $scope.tyreUpdateChoice = "U";
        
        $scope.searchStringForUpdateRemoveLog = "";
        $scope.logStartDate = "";
        $scope.logEndDate = "";
	var timer_updateRemoveLog = false;
        
	$scope.searchUpdateRemoveLog = function() {
	    if(timer_updateRemoveLog) {
		$timeout.cancel(timer_updateRemoveLog);
	    }
	    timer_updateRemoveLog = $timeout(function(){
		$scope.pageChanged_updateRemoveLog();
	    },1000);
	};
        
        $scope.limit_updateRemoveLog = 10;
	$scope.startIndex_updateRemoveLog = 0;

	$scope.totalItems_updateRemoveLog = 0;
	$scope.currentPage_updateRemoveLog = 1;
	$scope.itemsPerPage_updateRemoveLog = 10;
	$scope.maxSize_updateRemoveLog = 3;

        $scope.pageChanged_updateRemoveLog = function(){
	    $scope.nextIndex_updateRemoveLog = ($scope.currentPage_updateRemoveLog - 1) * $scope.itemsPerPage_updateRemoveLog;
	    $rootScope.getTMSAllUpdateRemoveLogs( $scope.nextIndex_updateRemoveLog, $scope.searchStringForUpdateRemoveLog);
	};
        
        $scope.updateRemoveLog = 0;
        $rootScope.TMSAllUpdateLogs = "";
        $rootScope.TMSAllRemoveLogs = "";
	$rootScope.getTMSAllUpdateRemoveLogs = function(startIndex, searchWord) {
	    try {
		if(searchWord == undefined || searchWord == 'null') {
		    searchWord ='';
		}
		if(startIndex == undefined || startIndex == 'null'){
		    startIndex = 0;
		}
                $scope.updateRemoveLog = $scope.startIndex_updateRemoveLog;
                $scope.logStartDate = moment($("#masterLogStartTime").val() + ":00", "D/M/YYYY").valueOf();
                $scope.logEndDate = moment($("#masterLogEndTime").val() + "23:59:59", "D/M/YYYY H:mm:ss").valueOf();
        
                if($scope.tyreUpdateChoice == "U") {  
                    $rootScope.TMSAllUpdateLogs = "";
                    APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getmasterassignmentlog?'
                    +'&startId='+startIndex+'&limit='+$scope.itemsPerPage_updateRemoveLog
                    +'&masterLogStart='+$scope.logStartDate+'&masterLogEnd='+$scope.logEndDate, true)
                    .then(
                        function(httpResponse){ // Success block
                            try{
                                loading.finish();
                                if(httpResponse.data.status == true){
                                    $rootScope.TMSAllUpdateLogs = httpResponse.data.result;
                                    $scope.totalItems_updateRemoveLog = httpResponse.data.count;
                                }
                            }
                            catch(error){
                                loading.finish();
                                console.log("Error :"+error);
                            }
                        }, function(httpError){ // Error block
                            loading.finish();
                            console.log("Error while processing request");
                        }, function(httpInProcess){ // In process
                            console.log(httpInProcess);
                        }
                    );
                } else if($scope.tyreUpdateChoice == "R") {  
                    $rootScope.TMSAllRemoveLogs = "";
                    APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getmasterremovallog?'
                    +'&startId='+startIndex+'&limit='+$scope.itemsPerPage_updateRemoveLog
                    +'&masterLogStart='+$scope.logStartDate+'&masterLogEnd='+$scope.logEndDate, true)
                    .then(
                        function(httpResponse){ // Success block
                            try{
                                loading.finish();
                                if(httpResponse.data.status == true){
                                    $rootScope.TMSAllRemoveLogs = httpResponse.data.result;
                                    $scope.totalItems_updateRemoveLog = httpResponse.data.count;
                                }
                            }
                            catch(error){
                                loading.finish();
                                console.log("Error :"+error);
                            }
                        }, function(httpError){ // Error block
                            loading.finish();
                            console.log("Error while processing request");
                        }, function(httpInProcess){ // In process
                            console.log(httpInProcess);
                        }
                    );
                }
	    } catch (e) { loading.finish(); console.log(e); }
	};
        
        
      //  $scope.vehDetailsList = DashboardDataSharingServices.getVehiclesList();
        // device details
        
        $('#deviceDateTime').datetimepicker({
            format: 'd-m-Y',
            onShow: function (ct) {
                if ($('#deviceDateTime').hasClass('error'))
                $('#deviceDateTime').removeClass('error');
            },
            maxDate: moment().format('DD-MM-YYYY'),
            defaultTime: '00:00',
            timepicker: false,
            value: moment().format("DD-MM-YYYY")
        });
        
        $("#selectDeviceVehicle").prop("disabled", false);
        
        $scope.deviceDateTime = moment($("#deviceDateTime").val(), "D/M/YYYY").valueOf();
        
        $scope.addSensorButtonStatus = true;
	$rootScope.TMSAllDevices = new Array();
        
	$scope.limit_device = 10;
	$scope.startIndex_device = 0;

	$scope.totalItems_device = 0;
	$scope.currentPage_device = 1;
	$scope.itemsPerPage_device = 10;
	$scope.maxSize_device = 3;

	$scope.TMSdevice_searchWord = "";

	$scope.pageChanged_device = function(from){
	    $scope.nextIndex_device = ($scope.currentPage_device - 1) * $scope.itemsPerPage_device;
	    $rootScope.getTMSAllDevices($scope.deviceStatusFilter, $scope.nextIndex_device, $scope.searchStringForDevices);
	};
        
        // Display Tyre Details        
        $scope.deviceSID = 0;
	$rootScope.getTMSAllDevices = function(status, startIndex, searchWord) {
	    try {
		if(status == undefined || status == 'All') {
		    status ='';
		}
		if(searchWord == undefined || searchWord == 'null') {
		    searchWord ='';
		}
		if(startIndex == undefined || startIndex == 'null'){
		    startIndex = 0;
		}
		$scope.deviceSID = $scope.startIndex_device;
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/Device/getDevice?status=' + status
		+'&limit='+$scope.itemsPerPage_device+'&startIndex='+startIndex+'&searchWord='+searchWord, true)
 		.then(
		    function(httpResponse){ // Success block
 			try{
			    loading.finish();
			    if(httpResponse.data.status == true){
				$rootScope.TMSAllDevices = httpResponse.data.result;
				$scope.totalItems_device = httpResponse.data.count;
			    }
 			}
 			catch(error){
 			    loading.finish();
			    console.log("Error :"+error);
 			}
 		    }, function(httpError){ // Error block
			loading.finish();
 			console.log("Error while processing request");
 		    }, function(httpInProcess){ // In process
			console.log(httpInProcess);
 		    }
 		);
	    } catch (e) { loading.finish(); console.log(e); }
	};
        
        var timer_device = false;
	$scope.searchDevices = function() {
	    if(timer_device){
		$timeout.cancel(timer_device);
	    }
	    timer_device= $timeout(function(){
		$scope.pageChanged_device('device search');
	    },1000);
	};
                     
        $scope.getTMSAllInstockVehicles = function(){
            try {
		APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/Device/getUnassignedVehicle?status=Instock', true)
 		.then(
                    function(httpResponse){ // Success block
                        try{
                            loading.finish();
                            if(httpResponse.data.status == true) {
				$scope.TMSAllInstockVehicles = httpResponse.data.result;
                            }
 			}
 			catch(error) {
                            loading.finish();
                            console.log("Error :"+error);
 			}
                    }, function(httpError){ // Error block
                        loading.finish();
 			console.log("Error while processing request");
                    }, function(httpInProcess){ // In process
                        console.log(httpInProcess);
                    }
 		);
            } catch (e) { loading.finish(); console.log(e); }
	};
        
        $scope.showVehicleChangeDiv = false;
        $scope.selectedVehicleIds = 0;
        
        $scope.getDeviceDetailsFormForAdd = function(){
            $('#showTMSDeviceDetailsModalId').modal('show');
            $scope.showDeviceAddingForm = !$scope.showDeviceAddingForm;
            
            $scope.getTMSAllInstockVehicles();
            $scope.showDeviceAddingForm = true;
            
            $scope.updateDeviceButtonStatus = false;
            $scope.addDeviceButtonStatus = true;
            
            $scope.showVehicleChangeDiv = false;
            $scope.boxNumber = '';
            $scope.imeiNumber = '';
            $scope.simNumber = '';
            $scope.selectedVehicleIds = 0;
            $scope.deviceDateTime = '';
            $scope.selectedDeviceVehUID = '';
            
            $("#selectDeviceVehicle").prop("disabled", false);
            
            try {
                $("#selectDeviceVehicle").val("").trigger('change');
            } catch (e) { }
        };
        
        // Add Device Details
        $scope.AddDeviceDetails = function() {
            $("#selectDeviceVehicle").prop("disabled", false);
            try{
                var params = 'api/tms/Device/Add?deviceName='+$scope.boxNumber +'&IMEI='+$scope.imeiNumber
                         +'&simNumber='+$scope.simNumber+'&vehId='+$scope.selectedVehicleIds+'&deviceDateTime='+$scope.deviceDateTime;
            
                APIServices.callGET_API($rootScope.HOST_TMS + params, true)
		.then(
                    function(httpResponse){ // Success block
                        try{
                            loading.finish();
                            if(httpResponse.data.status == true) {
				logger.logSuccess('Device added successfully');
				$('#showTMSDeviceDetailsModalId').modal('hide');
                                $rootScope.getTMSAllDevices();
                            } else {
				logger.logError(httpResponse.data.displayMsg);
                            }
			}
			catch(error){
                            loading.finish();
                            console.log("Error :"+error);
			}
                    }, function(httpError){ // Error block
                        loading.finish();
			console.log("Error while processing request");
                    }, function(httpInProcess){ // In process
                        console.log(httpInProcess);
                    }
		);
            } catch (e) { loading.finish(); console.log(e); }
        };
        
        $scope.getDeviceDetailsFormForUpdate = function(device) {
	    $('#showTMSDeviceDetailsModalId').modal('show');
            
            $scope.getTMSAllInstockVehicles();
            $scope.showDeviceAddingForm = true;
            
            $scope.updateDeviceButtonStatus = true;
            $scope.addDeviceButtonStatus = false;
                        
            $scope.showVehicleChangeDiv = false;
            $scope.boxNumber = device.boxNumber;
            $scope.deviceId = device.deviceId;
            $scope.imeiNumber = device.imei;
            $scope.simNumber = device.simNumber;
			$scope.selectedVehicleIds = device.vehId;
			// alert($scope.selectedVehicleIds);
            $scope.selectedDeviceVehUID = device.vehName;
            $scope.deviceDateTime = device.deviceDateTime;
	    $scope.updateDeviceDetails = device;
            
            $("#selectDeviceVehicle").prop("disabled", false);
            
            try {
		$("#selectDeviceVehicle").val("").trigger('change');
            } catch (e) { }
            try {
		$("#deallocatedVehicleSelect_id").val($scope.VehicleStatusList[0]).trigger('change');
            } catch (e) { }
	};
        
        // Update Device Details
        $scope.UpdateDeviceDetails = function() {
		   // $scope.selectedVehicleIds = 0;
		   var vehIdUpdate=document.getElementById("selectDeviceVehicle").value;
		   //alert('111' + vehIdUpdate);
		   var simnadIMei=$scope.simNumber+'-'+vehIdUpdate;
            try {
		var UPDATE_URL =$rootScope.HOST_TMS + 'api/tms/Device/Update?deviceId ='+$scope.deviceId
                        +'&IMEI='+$scope.imeiNumber+'&simNumber='+simnadIMei+'&deviceDateTime='+$scope.deviceDateTime;
                                 
		APIServices.callGET_API(UPDATE_URL, true)
		.then(
                    function(httpResponse){ // Success block
                        try{
                            loading.finish();
                            if(httpResponse.data.status == true){
                                $('#showTMSDeviceDetailsModalId').modal('hide');
                                logger.logSuccess('Device updated successfully');
                                $rootScope.getTMSAllDevices();
                            }
                            else {
                                logger.logError(httpResponse.data.displayMsg);
                            }
			}
			catch(error){
                            loading.finish();
                            console.log("Error :"+error);
			}
                    }, function(httpError){ // Error block
                        loading.finish();
			console.log("Error while processing request");
                    }, function(httpInProcess){// In process
                        console.log(httpInProcess);
                    }
		);
            } catch (e) { loading.finish(); console.log(e); }
	};
        
        // deallocate vehicle from device   
        $scope.VehicleStatusList = ["InStock"];

        $scope.deallocateVehicleFromDevice = function(){
            try {
                var status = $("#deallocatedVehicleSelect_id").val();
                var DEALLOCATE_VEHICLE_URL =$rootScope.HOST_TMS + 'api/tms/Device/removeDevice?IMEI='+$scope.imeiNumber
                    +'&vehId='+$scope.selectedVehicleIds+"&status="+status;
                APIServices.callGET_API(DEALLOCATE_VEHICLE_URL, true)
                .then(
                    function(httpResponse){ // Success block
                        try{
                            loading.finish();
                            if(httpResponse.data.status == true){
                                $scope.showVehicleChangeDiv = false;
                                logger.logSuccess('Vehicle is deallocated from this Device');
                                $scope.updateDeviceDetails = httpResponse.data.result[0];
                                $scope.getDeviceDetailsFormForUpdate($scope.updateDeviceDetails);
                                $("#selectDeviceVehicle").prop("disabled", true);
                            }
                            else {
                                logger.logError(httpResponse.data.displayMsg);
                            }
                        }
                        catch(error){
                            loading.finish();
                            console.log("Error :"+error);
                        }
                    }, function(httpError){ // Error block
                        loading.finish();
                        console.log("Error while processing request");
                    }, function(httpInProcess){// In process
                        console.log(httpInProcess);
                    }
                );
            } catch (e) {
		console.log(e);
            }
	};


	if($state.current.url == "/tms-sensor") {
	    $scope.pageChanged_sensor('sensor default');
	} else if($state.current.url == "/tms-bluetooth") {
	    $scope.pageChanged_Bluetooth();
	} else if($state.current.url == "/tms-rfid") {
	    $scope.pageChanged_RFID();
	} else if ($state.current.url == "/tms-assignVehicle") {
	    $scope.getTMSAllUsers();
	    $scope.getTMSAllVehicles();
	}else if($state.current.url == "/tms-vehicleDetails") {
	    $scope.pageChanged_vehUserDetails();
	} else if($state.current.url == "/tms-errorlog") {
	    $scope.pageChanged_errorlog();
	} 
        else if($state.current.url == "/tms-updatelog") {
            $scope.pageChanged_updateRemoveLog();
        }
        else if($state.current.url == "/tmsDeviceDetails") {
            $scope.pageChanged_device();
            $scope.getTMSAllVehicles();
        }
    }]);
