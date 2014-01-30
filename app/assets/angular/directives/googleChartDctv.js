
var app = angular.module('app', []);

// ex. <div chart></div>

app
.directive('chart', function () {
    return {

        restrict: 'A',
        link: function ($scope, $elm, $attr) {
            // Create the data table.
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');

            data.addRows([
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {
                title: 'How Much Pizza I Ate Last Night',
                width: 400,
                height: 300
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart($elm[0]);

            chart.draw(data, options);
        }
    };
});

google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

google.load('visualization', '1', {packages: ['corechart']});
