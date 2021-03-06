/**
 * Created by Jean-Baptiste on 07/11/2016.
 */

(function () {
  'use strict';

  angular
  .module('EdeipExtranet')
  .controller('ConnexionController', ConnexionController);

  function ConnexionController($scope, $http) {
    $scope.connect = function connect() {
      var login = "ROGER.Jean-Baptiste"; //this.identifiant;
      var login = this.identifiant;
      var pwd = "1a2b8b8dbfc756bbfb6aa2609dae7e9286a989764595713ab9034f237016ae95";//this.pwd;
      var pwd = sha256_digest(this.pwd);

      $http.post($scope.sharedData.conf.apiAdress + '/authenticate',
        JSON.stringify({
          "login": login,
          "password": pwd
        }),
        {
          headers: {
            'x_app_name': "EdeipExtranet",
            'Content-Type': "application/json"
          }
        }
      ).success(function (data, status, headers, config) {
        if (typeof(data.error) === 'undefined') {
          $http.get($scope.sharedData.conf.apiAdress + "/api/v1.0/utilisateur/" + data.utilisateur.id, {
            headers: {
              'x_app_token': data.token,
              'x_app_name': "EdeipExtranet",
              'Content-Type': "application/json"
            }
          })
          .success(function (dataUtilisateur, statusUtilisateur, headersUtilisateur, configUtilisateur) {
            console.log(dataUtilisateur);
            $scope.sharedData.utilisateur = dataUtilisateur.data.utilisateur;
            $scope.sharedData.token = data.token;
            $scope.$parent.addTabs();
          })
          .error(function (dataUtilisateur, statusUtilisateur, headersUtilisateur, configUtilisateur) {
            console.log('failed Utilisateur :(');
          });
        } else {
          console.log('error on /utilisateur');
        }
      })
      .error(function (data, status, headers, config) {
        console.log('failed :(');
      });
    }
  }
})();