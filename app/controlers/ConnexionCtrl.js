/**
 * Created by Jean-Baptiste on 07/11/2016.
 */

const USERS = {
  "Prof" : {
    professeur: true,
    eleve: null,
    responsable: null,
    administrateur: null,
    id: 1
  },
  "Eleve" : {
    professeur: null,
    eleve: true,
    responsable: null,
    administrateur: null,
    id: 1
  },
  "Responsable" : {
    professeur: null,
    eleve: null,
    responsable: true,
    administrateur: null,
    id: 1
  },
  "Administrateur" : {
    professeur: null,
    eleve: null,
    responsable: null,
    administrateur: true,
    id: 1
  }
};

(function () {
  'use strict';

  angular
  .module('EdeipExtranet')
  .controller('ConnexionController', ConnexionController);

  function ConnexionController($scope, $http) {
    $scope.connect = function connect() {
      // var login = "ROGER.Jean-Baptiste";
      var login = this.identifiant;
      // var pwd = "1a2b8b8dbfc756bbfb6aa2609dae7e9286a989764595713ab9034f237016ae95";
      //var pwd = sha256_digest(this.pwd);
      $scope.sharedData.utilisateur = USERS[login];
      //$scope.sharedData.token = data.token;
      $scope.$parent.addTabs();


      return;

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
            localStorage.setItem("name");
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