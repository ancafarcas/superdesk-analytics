TrackActivityReportView.$inject = [];

/**
 * @ngdoc directive
 * @module superdesk.apps.analytics.track-activity-report
 * @name sdTrackActivityReportView
 * @description A directive that displays the generated track activity report
 */
var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);
    require('highcharts/modules/data')(Highcharts);

export function TrackActivityReportView() {
    return {
        template: require('../views/track-activity-report-view.html'),
        scope: {},

        link: function(scope, element, attrs, controller) {
            scope.$on('view:track_activity_report', (event, args) => {
                scope.trackActivityReport = args;
                scope.generateChart();
            });



            scope.generateChart = function() {
                Highcharts.chart('container', {
                    chart: {
                        type: 'column',
                        renderTo: 'container'
                    },
                    xAxis: {
                        // categories: ['Jan', 'Feb', 'Mar', 'Apr']
                        categories: scope.getCategories()
                    },
                    series: [{
                        name: 'Year 1800',
                        data: [scope.trackActivityReport.report.length, 4]
                        }, {
                        name: 'Year 1900',
                        data: [4, 5]
                    }]
                });

            };
            scope.getCategories = function() {
                var users = [scope.trackActivityReport.user, 5]
                return users
            };


            /**
             * @ngdoc method
             * @name sdTrackActivityReportView#formatDate
             * @param {String} date
             * @description Format given date for generate
             */
            scope.formatDate = function(date) {
                return date ? moment(date).format('YYYY-MM-DD HH:mm') : null; // jshint ignore:line
            };
        }
    };
}
