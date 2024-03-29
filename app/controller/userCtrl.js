﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', ['$scope', '$filter', '$location', 'dataService', function ($scope, $filter ,$location, dataService) {

            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();


            $scope.createNewUser = function () {
                $location.path('/adduser');
            };
            $scope.editUser = function (id) {
                $location.path('/edituser/' + id);
            };

            $scope.deleteUser = function (id) {
                dataService.deleteUser(id).then(function () {
                    toastr.success('User deleted succefully');
                    getData();
                }, function () {
                    toastr.error('Error in deleting user with Id: ' + id);
                });
            };
            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            };

            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    });
                });
            };
        }])
        .controller('userAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function () {
                    toastr.success('User created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in creating user')
                })
            };
            $scope.cancel = function () {
                $location.path('/');
            };
        }])
        .controller('userEditCtrl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            $scope.states = {
                showUpdateButton: false
            };
            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error in fetching user with Id:' + $routeParams.id)
            });

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success('User updated successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updating user')
                })
            }
        }]);
})();
