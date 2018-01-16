(function () {
  'use strict';

  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

  app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('doughnut', {
      cutoutPercentage: 60
    });
    ChartJsProvider.setOptions('bubble', {
      tooltips: { enabled: false }
    });
  });

  app.controller('MenuCtrl', ['$scope', function ($scope) {
    $scope.isCollapsed = true;
    $scope.charts = ['Line',  'Bubble', 'Base'];
  }]);

  app.controller('LineCtrl',  ['$scope', '$interval','$http', function ($scope, $interval,$http) {
	 $scope.labels = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    $scope.series = ['排口浓度', 'SBR进水浓度','调节池进水浓度'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90],
      [26, 45, 44, 15, 84, 25, 94]
    ];
    
    // Update the dataset at 25FPS for a smoothly-animating chart
    $interval(function () {
      getLiveChartData();
    }, 40);

    function getLiveChartData () {
  
    };
 
    
    
    
    
    
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
  }]);


  app.controller('MixedChartCtrl', ['$scope', function ($scope) {
    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.labels = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    $scope.data = [
      [65, -59, 80, 81, -56, 55, -40],
      [28, 48, -40, 19, 86, 27, 90]
    ];
    $scope.datasetOverride = [
      {
        label: 'Bar chart',
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: 'Line chart',
        borderWidth: 3,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        type: 'line'
      }
    ];
  }]);

  app.controller('BubbleCtrl', ['$scope', '$interval', function ($scope, $interval) {
    $scope.options = {
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }]
      }
    };

    createChart();
    $interval(createChart, 2000);

    function createChart () {
      $scope.data = [];
      for (var i = 0; i < 50; i++) {
        $scope.data.push([{
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: randomRadius()
        }]);
      }
    }

    function randomScalingFactor () {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    function randomRadius () {
      return Math.abs(randomScalingFactor()) / 4;
    }
  }]);

  app.controller('TicksCtrl', ['$scope', '$interval', function ($scope, $interval) {
    var maximum = document.getElementById('container').clientWidth / 2 || 300;
    $scope.data = [[]];
    $scope.labels = [];
    $scope.options = {
      animation: {
        duration: 0
      },
      elements: {
        line: {
          borderWidth: 0.5
        },
        point: {
          radius: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: false
        }],
        gridLines: {
          display: false
        }
      },
      tooltips: {
        enabled: false
      }
    };

    // Update the dataset at 25FPS for a smoothly-animating chart
    $interval(function () {
      getLiveChartData();
    }, 40);

    function getLiveChartData () {
      if ($scope.data[0].length) {
        $scope.labels = $scope.labels.slice(1);
        $scope.data[0] = $scope.data[0].slice(1);
      }

      while ($scope.data[0].length < maximum) {
        $scope.labels.push('');
        $scope.data[0].push(getRandomValue($scope.data[0]));
      }
    }
  }]);

  function getRandomValue (data) {
    var l = data.length, previous = l ? data[l - 1] : 50;
    var y = previous + Math.random() * 10 - 5;
    return y < 0 ? 0 : y > 100 ? 100 : y;
  }
})();