(function () {
  'use strict';

  angular
    .module('items')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Items',
      state: 'items',
      type: 'dropdown',
      roles: ['admin', 'superta', 'ta', 'technician']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'items', {
      title: 'List Items',
      state: 'items.list',
      roles: ['admin', 'superta', 'ta', 'technician']
    });
  }
}());
