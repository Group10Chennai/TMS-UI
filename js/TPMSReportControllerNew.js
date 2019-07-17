// controller.js
app = angular.module('app');

// NavController
app.controller('TPMSReportControllerNew', ['$scope', '$rootScope', '$state', 'APIServices', '$http',
  'DashboardDataSharingServices', '$location','$cookieStore','$filter', 'logger','$timeout',
  function($scope, $rootScope, $state, APIServices, $http, DashboardDataSharingServices, $location,
  $cookieStore, $filter, logger, $timeout) {

  $scope.controller = 'ReportsController!';
  $scope.vehicleChoice = 1;

	$('#selectVehChoice').select2({
	    placeholder: "Select Vehicle Choice",
	    allowClear: true,
	    width: 265
	});

	$('#tpmsVehicleReport').select2({
	    placeholder: "Select Vehicle",
	    allowClear: true,
	    width: 790
	});

	$('#selectDepot').select2({
	    placeholder: "Select Depot",
	    allowClear: true,
	    width: 790
	});

	// Get the vehicles list
	$scope.vehDetails = DashboardDataSharingServices.getVehIdName_HashMap();
	
  $scope.depotDetails = DashboardDataSharingServices.getDeportList();

	// Get TPMS report data
	$scope.getTPMSReportData = function(selected_vehIds_report, uniqueStatus,
    startDateTime, endDateTime, downloadStatus, callback)
  {
    try {
  		loading.start();
  		var request = {
		    startDateTime : startDateTime,
		    endDateTime: endDateTime,
		    vehIds: selected_vehIds_report,
		    uniqueStatus: uniqueStatus,
                    fileStatus : downloadStatus
          }
		  
		  
  		$http.post($rootScope.HOST_TMS + "api/tms/getTPReportDataNew", request)
  		.then(function successCallback(httpResponse){
		    try {
				loading.finish();
				
    			if(httpResponse.data.status == true) {
					callback(httpResponse);
					
					for (var ii = 0; ii < selected_vehIds_report.length; ii++) {
						var wrapper = document.getElementById("myHTMLWrapper");
      
						var myHTML1 = "<table class='table table-fixed table-bordered table-hover'><thead></thead><tr class='tablehead'></tr><th class='tableHead-center><a href='#' > Serial No</a></th><th class='tableHead-center><a href='#' > VehName</a></th><th class='tableHead-center><a href='#' > Date Time </a></th><th class='tableHead-center><a href='#' > FL </a></th>";		
						var i=0;
						var myHTML='';
						angular.forEach(httpResponse.data.result, function(value, key)
          {

			
				
				if(selected_vehIds_report[ii]==value.vehId){
					var addElement='';
					i++;
					
				if(i==1){
					var tempFL='';
					var pressFL='';
					if(value.tyres.length > 0){	
						angular.forEach(value.tyres, function(tyre, id)
						{
					
					
					tempFL=tyre.temp;
					pressFL=tyre.pressure;
						})
				
					}
					var current_datetime = new Date(value.device_date_time);

					//date.toString("dd-MM-yyyy HH:mm:ss");	

					var formatted_date = current_datetime.getDate()+"-"+(current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() ;


					myHTML=myHTML1+"<tr><td class='tablebody-td'>"  + i + "</td><td class='tablebody-td'>"  + value.vehName + "</td><td>"  +  formatted_date+ "</td><td><span ng-if ='tempFL == '0' || pressFL == '0''><span style='color:green'>"  +  tempFL + "℃ </span></span> - <span style='color:rgba(254, 51, 51, 0.92)'> "+pressFL+" Psi </span></td></tr>  ";			
					myHTML1+= myHTML;
					
					 
				}else{ 
					var tempFL='';
					var pressFL='';
					if(value.tyres.length > 0){	
						angular.forEach(value.tyres, function(tyre, id)
						{
					
					
					tempFL=tyre.temp;
					pressFL=tyre.pressure;
						})
				
					}
					var current_datetime = new Date(value.device_date_time);

					//date.toString("dd-MM-yyyy HH:mm:ss");	

					var formatted_date = current_datetime.getDate()+"-"+(current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() ;

					myHTML+="<tr><td class='tablebody-td'>"  + i + "</td><td class='tablebody-td'>"  + value.vehName + "</td><td>"  + formatted_date + "</td><td><span ng-if ='tempFL == '0' || pressFL == '0''><span style='color:green'>"  +  tempFL + "℃ </span></span> - <span style='color:rgba(254, 51, 51, 0.92)'> "+pressFL+" Psi </span></td></tr></tr>  ";	
					
				}
			}
			
			
			
		  // })
		   
		   });
		   myHTML+="</table>";
		   console.log("myHTML-END  : ");
		   $("#myHTMLWrapper").append(myHTML);
		   //$("#myHTMLWrapper").empty();
		  // wrapper.innerHTML = myHTML;
		}
					
// 					var wrapper = document.getElementById("myHTMLWrapper");
      
// 					var myHTML = '';
				  
// 					for (var i = 0; i < selected_vehIds_report.length; i++) {
// 					  //myHTML += '<span class="test">Testing out my script! loooooop #' +selected_vehIds_report[i] + '</span><br/><br/>';
					
// 					  myHTML+= "<table class='table table-fixed table-bordered table-hover'><thead></thead><tr class='tablehead'></tr><th class='tableHead-center><a href='#' > # </a></th><th class='tableHead-center><a href='#' > # </a></th><tr><td class='tablebody-td'>"  + selected_vehIds_report[i] + "</td><td>"  + selected_vehIds_report[i] + "</td></tr> </table> ";
//   //$("#ReportContainer").append(veh_report_table);
					
// 					}
				 // console.log(myHTML);
					//wrapper.innerHTML = myHTML
    			} else {
    			    logger.logWarning(httpResponse.data.displayMsg);
    			}
		    } catch(error) {
    			loading.finish();
    			console.log("Error :"+error);
		    }
  		}, function errorCallback(response){
  		    console.log("POST-ing of data failed");
  		});
    } catch (e) { loading.finish(); console.log(e); }
	}

	// loading the service first time
	var startDateTime = 0;
	var endDateTime = 0;
  $scope.selected_vehIds_report = [];
  $scope.generateTPReport = function(){
    $scope.selected_vehIds_report = [];
    var selected_depot_id = 0;

    
    if($scope.vehicleChoice == 1){
      // Based on Vehicles
	  $scope.selected_vehIds_report = $('#tpmsVehicleReport').val();
//	  alert( $scope.selected_vehIds_report);
    } else{
      // Based on Depot
      if($scope.selectedReportDepotId > 0)
      {
        // Find the vehicles in that Depot
        $scope.selected_vehIds_report = [];
        $scope.vehDetailsList = DashboardDataSharingServices.getVehiclesList();
        angular.forEach($scope.vehDetailsList, function(vehicle, key){
          if(vehicle.depotId == $scope.selectedReportDepotId){
            $scope.selected_vehIds_report.push(vehicle.vehId);
          }
        })
      }
    }

    startDateTime = moment($("#tpms_ReportStartTime").val(), "D/M/YYYY HH:mm").valueOf();
    // Adding 59 sec at the end
    endDateTime = moment($("#tpms_ReportEndTime").val()+":59", "D/M/YYYY HH:mm:ss").valueOf();
	for (var i = 0; i < $scope.selected_vehIds_report.length; i++) {
		//alert($scope.selected_vehIds_report[i]);
		//Do something
	}
	
    if($scope.selected_vehIds_report.length > 0){
      // showing in main table
      $scope.getTPMSReportData($scope.selected_vehIds_report, true, startDateTime, endDateTime, false, function(TPMSReportDataResponse)
      {
    		$rootScope.processVehDetailsForView(TPMSReportDataResponse, function(processedData){
			 
			
				$scope.TPMSReportDataResponse = processedData;
    		})
      })
    } else {
      logger.logWarning("Please select vehicles or Depot");
    }
	}

  $scope.getTMSDepotList = function() {
    try {
  		$.ajax({
		    url: $rootScope.HOST_TMS + 'api/tms/getTMSDepotList',
		    type: "GET",
		    xhrFields: {withCredentials: true},
		    cache: false,
		    success: function (result, textStatus, request) {
    			loading.finish();
    			if(result.status == true) {
    		    $scope.depotDetails = result.result;
    		    DashboardDataSharingServices.addDeportList($scope.depotDetails);
    			}
		    },
		    error: function (e) {
    			$scope.getCaptchaImg();
    			$scope.captcha = '';
    			loading.finish();
    			console.log("Error while processing request");
		    }
  		});
    } catch (e) { loading.finish(); console.log(e); }
	} // End of getTMSDepotList()

	//Load the values after 1 sec
	$timeout(function() {
    if($scope.vehDetails == undefined){
  		// Call Dashboard service
  		$rootScope.getDashboardDetails(true, true, function(dashboardResponse) {
  		    $scope.vehDetails = DashboardDataSharingServices.getVehIdName_HashMap();
  		});
    }
    if($scope.depotDetails == undefined){
  		// Call Depot service
  		$scope.getTMSDepotList();
    }
	}, 1000);

  $scope.download_TPMSHistoryReport = function(){
    $scope.getTPMSReportData($scope.selected_vehIds_report, false, startDateTime, endDateTime, true, function(TPMSReportDataResponse)
    {
      // Call API for download
      window.location = $rootScope.HOST_TMS + "api/tms/downloadExcelReport";
    });
  }

  $scope.Back2Top = function(){
    $('body,html').animate({
        scrollTop: 0
    }, 300);
  }

	var XaxisDateTime = [];
	var FL_temp = [];
	var FR_temp = [];
	var RLO_temp = [];
	var RLI_temp = [];
	var RRI_temp = [];
	var RRO_temp = [];

	var FL_pressure = [];
	var FR_pressure = [];
	var RLO_pressure = [];
	var RLI_pressure = [];
	var RRI_pressure = [];
	var RRO_pressure = [];

	$scope.findHistoryData = function(selected_vehId){
    var selected_vehIds_report = [];
    selected_vehIds_report.push(selected_vehId);

    //showing in chart
    $scope.getTPMSReportData(selected_vehIds_report, false, startDateTime, endDateTime, false,
      function(TPMSReportHistoryDataResponse){

    		if (TPMSReportHistoryDataResponse.data.status == true) {
  		    // prepare chart
  		    XaxisDateTime = [];
  		    FL_temp = [];
  		    FR_temp = [];
  		    RLO_temp = [];
  		    RLI_temp = [];
  		    RRI_temp = [];
  		    RRO_temp = [];

  		    FL_pressure = [];
  		    FR_pressure = [];
  		    RLO_pressure = [];
  		    RLI_pressure = [];
  		    RRI_pressure = [];
  		    RRO_pressure = [];

  		    angular.forEach(TPMSReportHistoryDataResponse.data.result, function(value, key)
          {
            if(value.tyres.length > 0){
        			XaxisDateTime.push($filter('date')(value.device_date_time,
                "dd/MM/yyyy HH:mm:ss"));
        			angular.forEach(value.tyres, function(tyre, id)
              {
      			    if (tyre.position == 'FL') {
          				FL_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'FR') {
          				FR_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'RLO') {
          				RLO_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'RLI') {
          				RLI_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'RRI') {
          				RRI_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'RRO') {
          				RRO_temp.push(tyre.temp);
      			    }
      			    if (tyre.position == 'FL') {
          				FL_pressure.push(tyre.pressure);
      			    }
      			    if (tyre.position == 'FR') {
          				FR_pressure.push(tyre.pressure);
      			    }
      			    if (tyre.position == 'RLO') {
          				RLO_pressure.push(tyre.pressure);
      			    }
      			    if (tyre.position == 'RLI') {
          				RLI_pressure.push(tyre.pressure);
      			    }
      			    if (tyre.position == 'RRI') {
          				RRI_pressure.push(tyre.pressure);
      			    }
      			    if (tyre.position == 'RRO') {
          				RRO_pressure.push(tyre.pressure);
      			    }
        			})
            }
  		    });

  		    $('#reportModal').modal('show');
  		    // by default pressure chart will display
  		    $scope.typeOfChart = 2;
  		    $scope.pressureReportchart(XaxisDateTime, FL_pressure, FR_pressure,
            RLO_pressure, RLI_pressure, RRI_pressure, RRO_pressure);
      	}
	    }
    )
	}

	//pressure chart
	$scope.typeOfChart = 2;

	$scope.newValue = function() {
    if($scope.typeOfChart == 1) {
  		$scope.tempReportchart(XaxisDateTime, FL_temp, FR_temp, RLO_temp, RLI_temp,
        RRI_temp, RRO_temp);
    }
    if($scope.typeOfChart == 2) {
  		$scope.pressureReportchart(XaxisDateTime, FL_pressure, FR_pressure,
        RLO_pressure, RLI_pressure, RRI_pressure, RRO_pressure);
    }
	}

	Highcharts.setOptions({
	    colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#F15C80'],
	    global: {
	        useUTC: false
	    }
	});

	// Temperature Chart
	$scope.tempReportchart = function(XaxisDateTime, FL_temp, FR_temp, RLO_temp, RLI_temp, RRI_temp, RRO_temp){
    $('#report_chart').highcharts({
  		chart: {
  		    type: 'spline',
  		    width: 1050,
  		    panning: false,
  		    panKey: 'shift',
  		    renderTo: 'report_chart'
  		},
  		credits: {
  		    enabled: false
  		},
  		title: {
  		    text: 'Temperature Report',
  		    x: -20 //center
  		},
  		xAxis: {
  		    categories: XaxisDateTime,
  		},
  		scrollbar: {
  		    enabled: true
  		},
  		yAxis: {
  		    title: {
  			text: 'Temperature'
  		    }
  		},
  		plotOptions: {
  		    line: {
  			dataLabels: {
  			    enabled: true
  			},
  			enableMouseTracking: true
  		    }
  		},
  		legend: {
  		    layout: 'horizontal',
  		    align: 'right',
  		    verticalAlign: 'bottom',
  		    borderWidth: 0
  		},

  		series: [{
  		    name: 'FL',
  		    data: FL_temp
  		}, {
  		    name: 'FR',
  		    data: FR_temp
  		}, {
  		    name: 'RLO',
  		    data: RLO_temp
  		}, {
  		    name: 'RLI',
  		    data: RLI_temp
  		}, {
  		    name: 'RRI',
  		    data: RRI_temp
  		}, {
  		    name: 'RRO',
  		    data: RRO_temp
  		}],
    });
	}

	// Pressure Chart
	$scope.pressureReportchart = function(XaxisDateTime, FL_pressure, FR_pressure,
    RLO_pressure, RLI_pressure, RRI_pressure, RRO_pressure)
  {
    $('#report_chart').highcharts({
  		chart: {
  		    type: 'spline',
  		    width: 1050,
  		    panning: false,
  		    panKey: 'shift',
  		    renderTo: 'report_chart'
  		},
  		credits: {
  		    enabled: false
  		},
  		title: {
  		    text: 'Pressure Report',
  		    x: -20 //center
  		},
  		xAxis: {
  		    categories: XaxisDateTime,
  		},
  		scrollbar: {
  		    enabled: true
  		},
  		yAxis: {
  		    title: {
  			text: 'Pressure'
  		    }
  		},
  		plotOptions: {
  		    line: {
  			dataLabels: {
  			    enabled: true
  			},
  			enableMouseTracking: true
  		    }
  		},
  		legend: {
  		    layout: 'horizontal',
  		    align: 'right',
  		    verticalAlign: 'bottom',
  		    borderWidth: 0
  		},

  		series: [{
  		    name: 'FL',
  		    data: FL_pressure,
  		}, {
  		    name: 'FR',
  		    data: FR_pressure
  		}, {
  		    name: 'RLO',
  		    data: RLO_pressure
  		}, {
  		    name: 'RLI',
  		    data: RLI_pressure
  		}, {
  		    name: 'RRI',
  		    data: RRI_pressure
  		}, {
  		    name: 'RRO',
  		    data: RRO_pressure
  		}],
    });
	}

}]); // End of ReportsController
