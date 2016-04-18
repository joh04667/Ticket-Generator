var app = angular.module("ticketApp", []);

app.controller("TicketController", ["$scope", "$http", function($scope, $http) {
  $scope.ticket = {};
  $scope.allTickets = [];
  $scope.chunkedTickets = [];
  $scope.formActive = false;
  $scope.btnText = "New Ticket";
  $scope.slideClass = "";

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
    $scope.chunkedTickets = $scope.chunk($scope.allTickets, 3);
  });
};

// displays date as human readable
$scope.prettyDate = function(date) {
  var temp = date.toString().match(/\d+-\d+-\d+/)[0].split("-");
  return temp[1] + '-' + temp[2] + '-' + temp[0];
};

$scope.deleteTicket = function(ticket) {
  $http.delete('/tickets/delete/' + ticket._id).then(function(response) {
    console.log('deleted ticket');
    $scope.getData();
});
};

$scope.toggleForm = function() {
  if($scope.formActive) {
    $scope.formActive = false;
    $scope.slideClass = "";
    $scope.btnText = "New Ticket";
  } else {
    $scope.formActive = false;
    $scope.slideClass = "slide";
    $scope.btnText = "Hide Form";
  }
};


//chunking function for wells
  $scope.chunk = function(arr, size) {
   var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
          newArr.push(arr.slice(i, i+size));
      }
   return newArr;
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


  //load tix on page start
  $scope.getData();

}]); // TicketController
