/**
 * Created by Jean-Baptiste on 07/11/2016.
 */

/*
 angular.module('myApp', ['ngMaterial'])
 .config(function($mdThemingProvider) {

 $mdThemingProvider.theme('default')
 .primaryPalette('pink', {
 'default': '400', // by default use shade 400 from the pink palette for primary intentions
 'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
 'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
 'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
 })
 // If you specify less than all of the keys, it will inherit from the
 // default shades
 .accentPalette('purple', {
 'default': '200' // use shade 200 for default, and keep all other shades the same
 });

 });
 */
(function () {
    'use strict';

    angular
        .module('EdeipExtranet', ['ngMaterial'])
        .config(function($mdThemingProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('pink', {
                    'default': '400', // by default use shade 400 from the pink palette for primary intentions
                    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                // If you specify less than all of the keys, it will inherit from the
                // default shades
                .accentPalette('indigo', {
                    'default': '200' // use shade 200 for default, and keep all other shades the same
                });

        })
        .controller('MainController', MainController);

    function MainController($scope, $timeout) {
        $scope.sharedData = {};
        $scope.sharedData.token = "";
        $scope.sharedData.utilisateur = {};
        $scope.sharedData.conf = {};

        $scope.sharedData.conf.apiSrv = {
            protocole: 'http',
            name: 'roger-leoen.ddns.net',
            // name: 'localhost',
            // name: "192.168.10.49",
            port: '3000',
            baseURL: '/.'
        };
        $scope.sharedData.conf.apiAdress = $scope.sharedData.conf.apiSrv.protocole + '://' + $scope.sharedData.conf.apiSrv.name + ':' + $scope.sharedData.conf.apiSrv.port + $scope.sharedData.conf.apiSrv.baseURL;
        var tabs = [
            {
                title: 'Connexion',
                administrateur: false,
                professeur: false,
                responsable: false,
                eleve: false,
                id : 'connexion',
                sub: [{
                    title: 'Me connecter',
                    content: 'view/connexion.template.html'
                }]
            },

            {
                title: 'Administration',
                administrateur: true,
                professeur: false,
                responsable: false,
                eleve: false,
                id : 'administration',
                sub: [{
                    title: 'Utilisateurs',
                    content: 'view/utilisateur.template.html'
                },{
                    title: 'Niveaux',
                    content: 'view/niveau.template.html'
                },
                    {
                        title: 'Relations Tuteurs/Etudiants',
                        content: 'view/etudiantTuteur.template.html'
                    }
                ]
            },

            {
                title: 'Communication',
                content: 'view/carnetLiaison.template.html',
                administrateur: true,
                professeur: true,
                responsable: true,
                eleve: true,
                id : 'carnetLiaison',
                sub: [{
                    title: 'Écrire un nouveau message',
                    content: 'view/carnetLiaison.template.html'
                }, {
                    title: 'Consulter les messages',
                    content: 'view/carnetConsultation.template.html'
                }]
            },

            {
                title: 'Modules',
                sub: [{
                    title: 'Gestion des module',
                    content: 'view/module.template.html'
                }, {
                    title: 'Modules étudiant',
                    content: 'view/affectModule.template.html'
                },{
                    title: 'Modules enseignant',
                    content: 'view/moduleEnseignant.template.html'
                }],
                administrateur: true,
                professeur: true,
                responsable: false,
                eleve: false
            },

            {
                title: 'Évaluation',
                administrateur: true,
                professeur: true,
                responsable: false,
                eleve: false,
                id : 'evaluation',
                sub: [{
                    title: 'Ajouter',
                    content: 'view/addEvaluation.template.html'
                }, {
                    title: 'Modifier',
                    content: 'view/modifEval.template.html'
                }, {
                    title: 'Consulter',
                    content: 'view/createEvaluation.template.html'
                }],
            },

            {
                title: 'Notes',
                sub: [{
                    title: 'Affecter',
                    content: 'view/affectNote.template.html'
                }, {
                    title: 'Consulter',
                    content: 'view/verifNote.template.html'
                }],
                administrateur: true,
                professeur: true,
                responsable: false,
                eleve: false
            },

            {
                title: 'Compétences',
                sub: [{
                    title: 'Modifier',
                    content: 'view/modifCpt.template.html'
                }, {
                    title: 'Niveaux',
                    content: 'view/niveauCpt.template.html'
                }, {
                    title:'Consultation',
                    content: 'view/consultationCpt.template.html'
                    }],
                administrateur: true,
                professeur: true,
                responsable: false,
                eleve: false
            },

            {
                title: 'Bulletin',
                content: 'view/getBulletin.template.html',
                administrateur: true,
                professeur: true,
                responsable: false,
                eleve: false,
                sub: [{
                    title: 'Remplir',
                    content: 'view/bulletinComment.template.html'
                }, {
                    title: 'Générer',
                    content: 'view/getBulletin.template.html'
                }],
            },

            {
                title: 'Espace entreprise',
                sub: [{
                    title: 'Consulter les notes de mes étudiants',
                    content: 'view/consultNoteCompetence.template.html'
                },{
                    title: 'Sondage modules titre RNCP',
                    content: 'view/sondage.template.html'
                }],
                administrateur: true,
                professeur: true,
                responsable: true,
                eleve: false
            }
        ];

        $scope.addTabs = function addTabs() {
            if ($scope.sharedData.utilisateur.id) {
                tabs.forEach(function (tab) {
                    if ((tab.administrateur && ($scope.sharedData.utilisateur.administrateur !== null)) ||
                        (tab.professeur && ($scope.sharedData.utilisateur.professeur !== null)) ||
                        (tab.responsable && ($scope.sharedData.utilisateur.responsable !== null)) ||
                        (tab.eleve && ($scope.sharedData.utilisateur.eleve !== null))) {
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
                $scope.tabs[0] = {
                    title: 'Mon Profil',
                    content: 'view/profil.template.html',
                    administrateur: true,
                    professeur: true,
                    responsable: true,
                    eleve: true,
                    id : 'profil',
                    sub: [{
                        title: 'Mon profil',
                        content: 'view/profil.template.html'
                    }]
                };
                $scope.tabs = $scope.tabs.slice();
                var newIndex = $scope.tabs.push(tab);
                $timeout(function () {
                    $scope.selectedIndex = 0;
                });
            }
        };
        $scope.tabs = [ tabs[0] ];


        if (localStorage.getItem('user')) {
            $scope.sharedData.utilisateur = JSON.parse(localStorage.getItem('user'));
            $scope.addTabs();
        }

        $scope.disconnect = function(){
            localStorage.clear();
            window.location.reload();
        };
        //$scope.tabs = tabs;
        //$scope.tabs.push({title: 'Mon Profil', content: 'view/profil.template.html'});
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
