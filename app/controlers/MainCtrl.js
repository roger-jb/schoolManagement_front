/**
 * Created by Jean-Baptiste on 07/11/2016.
 */

(function () {
  'use strict';

  angular
  .module('EdeipExtranet')
  .controller('MainController', MainController);

  function MainController($scope, $timeout) {
    $scope.sharedData = {};
    $scope.sharedData.token = "";
    $scope.sharedData.utilisateur = {};
    $scope.sharedData.conf = {};

    $scope.sharedData.conf.apiSrv = {
      protocole: 'http',
      // name: 'roger-leoen.ddns.net',
      name: 'localhost',
      // name: "192.168.10.49",
      port: '3000',
      baseURL: '/.'
    };
    $scope.sharedData.conf.apiAdress = $scope.sharedData.conf.apiSrv.protocole + '://' + $scope.sharedData.conf.apiSrv.name + ':' + $scope.sharedData.conf.apiSrv.port + $scope.sharedData.conf.apiSrv.baseURL;
    var tabs = [
      {title: 'Connexion', content: 'view/connexion.template.html', administrateur: false, professeur:false, responsable: false, eleve:false},
      // {title: 'Mon Profil', content: 'view/profil.template.html', administrateur: true, professeur:false, responsable: false, eleve:false},
      {title: 'Administration', content: 'view/utilisateur.template.html', administrateur: true, professeur:false, responsable: false, eleve:false},
      {title: 'Evaluation', content: 'view/niveauCpt.template.html', administrateur: true, professeur:true, responsable: false, eleve:false},
      {title: 'Publication', content: 'view/connexion.template.html', administrateur: true, professeur:true, responsable: true, eleve:true},
      {title: 'Bulletin', content: 'view/connexion.template.html', administrateur: true, professeur:true, responsable: false, eleve:false}
    ];

    $scope.addTabs = function addTabs() {
      if ($scope.sharedData.utilisateur.id) {
        tabs.forEach(function(tab){
          if((tab.administrateur && ($scope.sharedData.utilisateur.administrateur !== null)) ||
            (tab.professeur && ($scope.sharedData.utilisateur.professeur !== null)) ||
            (tab.responsable && ($scope.sharedData.utilisateur.responsable !== null)) ||
            (tab.eleve && ($scope.sharedData.utilisateur.eleve !== null))){
            addTab(tab);
          }
        });
      }
    };
    var addTab = function (tab) {
      var exist = false;
      $scope.tabs.forEach(function (item) {
        if (item.title === tab.title) {
          exist = true;
        }
      });
      if (!exist) {
        $scope.tabs[0] = {title: 'Mon Profil', content: 'view/profil.template.html'};
        var newIndex = $scope.tabs.push(tab);
        $timeout(function () {
          $scope.selectedIndex = 0;
        });
      }
    };
    $scope.tabs = [
      {title: 'Connexion', content: 'view/connexion.template.html', administrateur: false, professeur:false, responsable: false, eleve:false}
    ];



    $scope.tabs = tabs;
    $scope.tabs.push({title: 'Mon Profil', content: 'view/profil.template.html'});
  }
})();

// $http(
//   {
//     url: "http://roger-leoen.ddns.net:3000/api/v1.0/utilisateur/" + data.utilisateur.id,
//     method: 'GET',
//     headers: {
//       'x_app_token': data.token,
//       'x_app_name': "EdeipExtranet" //,
//     }
//   })
// .then(
//   function (dataUtilisateur, statusUtilisateur, headersUtilisateur, configUtilisateur) {
//     $scope.sharedData.utilisateur = dataUtilisateur.data.utilisateur;
//     $scope.sharedData.token = data.token;
//     $scope.$parent.addTabs();
//   },
//   function (dataUtilisateur, statusUtilisateur, headersUtilisateur, configUtilisateur) {
//     console.log('failed Utilisateur :(');
//   });