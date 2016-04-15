var app = angular.module("ticketApp", []);

app.controller("TicketController", ["$scope", "$http", function($scope, $http) {
  $scope.ticket = {};
  $scope.allTickets = [];

  $scope.createTicket = function() {
    $http.post('/tickets/new', $scope.ticket).then(function(response) {
      console.log('saved ticket', response);
      $scope.resetForm();
      $scope.getData();
    });

  };


// gets all tickets on DB
$scope.getData = function() {
  $http.get('/tickets').then(function(response) {
    $scope.allTickets = response.data;
  });
};

// resets ticket form
  $scope.resetForm = function() {
    $scope.ticket.name = "";
    $scope.ticket.type = "";
    $scope.ticket.priority = "";
    $scope.ticket.description = "";
    $scope.ticket.assignee = "";
    $scope.ticket.reporter = "";
  };

}]); // TicketController
