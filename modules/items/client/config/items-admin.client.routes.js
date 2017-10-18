﻿(function () {
  'use strict';

  angular
    .module('articles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('admin.articles.list', {
        url: '',
        templateUrl: '/modules/items/client/views/admin/list-items.client.view.html',
        controller: 'ArticlesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['ta', 'technician', 'superta', 'admin']
        }
      })
      .state('admin.articles.create', {
        url: '/create',
        templateUrl: '/modules/items/client/views/admin/form-item.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['ta', 'technician', 'superta', 'admin']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('admin.articles.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/items/client/views/admin/form-item.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['ta', 'technician', 'superta', 'admin'],
          pageTitle: '{{ articleResolve.title }}'
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['ArticlesService'];

  function newArticle(ArticlesService) {
    return new ArticlesService();
  }
}());
