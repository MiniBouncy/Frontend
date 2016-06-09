'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontApp
 */
var app = angular.module('frontApp', []);
app.controller('totalsCtrl', function ($scope, $http) {
		$http({
	        method: 'GET',
	        url: 'http://localhost:3000/graphs/totalIncidents'
	    }).then(function successCallback(response) {
	    	var total = [];
	    	var crit = [];
	    	var high = [];
	    	var low = [];
	    	var med = [];
	    	var inf = [];
	    	var dates = [];
	    	var a;
	    	var b;
	       // console.log(response);

	        for(a = 0 ; a <response.data.message.length; a++){
	        	total.push(response.data.message[a].total);
	        	crit.push(response.data.message[a].critical);
	        	high.push(response.data.message[a].high);
	        	low.push(response.data.message[a].low);
	        	med.push(response.data.message[a].med);
	        	inf.push(response.data.message[a].info);
	        }

	        for(b = 0 ; b <response.data.dates.length ; b++){
	        	var date = new Date(response.data.dates[b]*1000);
				var year = date.getFullYear(),
				year = year.toString().substr(2,2),
				month = ('0' + (date.getMonth() + 1)).slice(-2),
				day = ('0' + date.getDate()).slice(-2);	
				var finalDates = day + '-' + month + '-`' + year;
				dates.push(finalDates);
	        }

	        $(window).load(function() {
				// Animate loader off screen
				$(".se-pre-con").fadeOut("slow");;
			});

	         $(function () {
			    $('#totalGraph').highcharts({
			    	exporting: { enabled: true },
			        chart: {
			            type: 'line',
			            width: 1500,
			            height: 800,
			        },
			        title: {
			            text: 'Incident graph',
			        },
			        xAxis: {
			        	type: 'datetime',
			            categories: dates,		            
			        },
			        yAxis: {
			            title: {
			                text: 'Number of incidents',
			            }
			        },
			        series: [{
			        	name: 'Total',
			            data: total,
			            color: 'rgb(170,170,170)',
			        }, {
			            name: 'Critical',
			            data: crit,
			            color: 'rgb(212,63,58)',
			        }, {
			            name: 'High',
			            data: high,
			            color: 'rgb(238,147,54)',
			        }, {
			            name: 'Medium',
			            data: med,
			            color: 'rgb(253,196,49)',
			        },{
			            name: 'Low',
			            data: low,
			            color: 'rgb(76,174,76)',
			        },{
			            name: 'Informational',
			            data: inf,
			            color: 'rgb(53,122,189)',
			        }]

			    });
			});
	        

	    }, function errorCallback(response) {
	        console.log(response);
	    });
    
});

app.controller('vulnQuantityCtrl', function ($scope, $http) {
		$http({
	        method: 'GET',
	        url: 'http://localhost:3000/graphs/totalIncidents'
	    }).then(function successCallback(response) {
	    	var b;
	    	var c;
	    	var amount = [];
	    	var plugins = [];
	    //	console.log(response);

	    	for(b = 0 ; b <response.data.amount.length; b++){
	    		amount.push(response.data.amount[b]);
	        }

	        for(c = 0 ; c <response.data.plugins.length; c++){
	    		plugins.push(response.data.plugins[c]);
	        }
	    	
	         $(function () {
			    $('#vulnQuantityGraph').highcharts({
			    	exporting: { enabled: true },
			        chart: {
			            type: 'column',
			            width: 800,
			            height: 800,
			        },
			        title: {
			            text: 'Impacted hosts',
			        },
			        xAxis: {
			            text: 'Plugins',
			            categories: plugins,        
			        },
			        yAxis: {
			            text: 'Number of incidents',
			            min: 0
			        },
			        series: [{
			        	name: 'Vulnerabilities',
			            data: amount,
			            color: 'rgb(212,63,58)',
			        }]
			    });
			});
	        

	    }, function errorCallback(response) {
	        console.log(response);
	    });
    
});
app.controller('incGraphCtrl', function ($scope, $http) {
			$http({
		        method: 'POST',
		        url: 'http://localhost:3000/graphs/getIncidents'
		    }).then(function successCallback(response) {
		        $scope.critCurr = response.data.msg.critical;
		        $scope.highCurr = response.data.msg.high;
		        $scope.medCurr = response.data.msg.med;
		        $scope.lowCurr = response.data.msg.low;
		        $scope.infoCurr = response.data.msg.info;
		        $scope.totalCurr = response.data.msg.total;
		        
		    }, function errorCallback(response) {
		        console.log(response);
		    });
});

app.controller('scanIDCtrl', function ($scope, $http) {
	document.getElementById('searchBtn').onclick = function() {
		var inputs = document.getElementById('searchID');
		console.log(inputs.value);
			$http({
		        method: 'POST',
		        url: 'http://localhost:3000/graphs/getIncidents',
		        data: {
		        	scan_id: inputs.value
		        }
		    }).then(function successCallback(response) {
		        $scope.critCurr = response.data.msg.critical;
		        $scope.highCurr = response.data.msg.high;
		        $scope.medCurr = response.data.msg.med;
		        $scope.lowCurr = response.data.msg.low;
		        $scope.infoCurr = response.data.msg.info;
		        $scope.totalCurr = response.data.msg.total;
		        
		    }, function errorCallback(response) {
		        console.log(response);
		    });
	};
});