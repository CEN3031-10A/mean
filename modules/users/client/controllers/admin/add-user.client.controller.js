(function () {
  'use strict';

  angular
    .module('users')
    .controller('AddUserController', AddUserController);

  AddUserController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Notification', 'ApplicantsService'];

  function AddUserController($scope, $state, UsersService, ApplicantsService, $location, $window, Notification) {
    var vm = this;

    vm.signup = signup;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      ApplicantsService.adminSignup(vm.credentials);
    }

    // Authentication Callbacks

    function onAddUserSuccess(response) {
      // If successful we assign the response to the global user model
      //vm.authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onAddUserError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Add User Error!', delay: 6000 });
    }

    
  }
}());
