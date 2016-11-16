/**
 * Created by Jean-Baptiste on 09/11/2016.
 */
(function () {
  'use strict';

  angular
  .module('EdeipExtranet')
  .controller('ProfilController', ProfilController);

  function ProfilController($scope) {
    console.log($scope.sharedData.utilisateur);
    $scope.updateProfil = function () {
      console.log($scope.sharedData.utilisateur);
    }
  }
})();