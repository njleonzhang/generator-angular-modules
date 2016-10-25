/**
 * @ngdoc service
 * @name <%= moduleName %>.<%= name %>
 * @description
 * # <%= name %>
 * Factory in the <%= moduleName %>.
 */
angular.module('<%= moduleName %>')
  .factory('<%= name %>', () => {
    // Service logic
    // ...

    let meaningOfLife = 42

    // Public API here
    return {
      someMethod() {
        return meaningOfLife
      }
    }
  })
