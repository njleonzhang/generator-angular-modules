/**
 * @ngdoc function
 * @name <%= moduleName %>.<%= name %> directive
 * @description
 * # <%= name %> directive
 */

angular.module('<%= moduleName %>', ['templates'])
  .directive('<%= name %>', () => {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: '<%= name %>.html',

      link(scope, elem, attr) {

      }
    }
  })
