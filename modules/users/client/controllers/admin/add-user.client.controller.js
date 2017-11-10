(function () {
  'use strict';

  angular
    .module('users')
    .controller('AddUserController', AddUserController);

  AddUserController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Notification', 'ApplicantsService'];

  function AddUserController($scope, $state, UsersService, $location, $window, Notification, ApplicantsService) {
    var vm = this;

    vm.signup = signup;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      ApplicantsService.adminSignup(vm.credentials)
        .then(onAddUserSuccess)
        .catch(onAddUserError);
    }

    function onAddUserSuccess(response) {
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onAddUserError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Add User Error!', delay: 6000 });
    }

  }
}());
