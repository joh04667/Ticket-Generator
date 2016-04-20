var app = angular.module("ticketApp", []);

app.controller("TicketController", ["$scope", "$http", function($scope, $http) {
  $scope.ticket = {};
  $scope.allTickets = [];
  $scope.chunkedTickets = [];
  $scope.formActive = false;
  $scope.btnText = "New Ticket";
  $scope.slideClass = "";
  $scope.edit = {};

// post new ticket
  $scope.createTicket = function() {
    $scope.toggleForm();
    $http.post('/tickets/new', $scope.ticket).then(function(response) {
      console.log('saved ticket', response);
      $scope.resetForm();
      $scope.getData();
    });
  };

// edits current ticket
$scope.saveTicket = function(ticket) {
  console.log(ticket, 'save');
  $http.put('tickets/edit', ticket).then(function(response){
    console.log(response);
    $scope.getData();
  });
  $scope.allTickets.forEach(function(s) {s.edit = false; s.border=null;});
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

//delete
$scope.deleteTicket = function(ticket) {
  $http.delete('/tickets/delete/' + ticket._id).then(function(response) {
    console.log('deleted ticket');
    $scope.getData();
});
};

// put changes to db
$scope.editTicket = function(ticket) {
  // clear any edit values
  $scope.allTickets.forEach(function(s) {s.edit = false;});
  // get this index and this object
  $scope.edit = $scope.allTickets[$scope.allTickets.indexOf(ticket)];
   $scope.allTickets[$scope.allTickets.indexOf(ticket)].edit = true;
   $scope.allTickets[$scope.allTickets.indexOf(ticket)].border = "red";
};

$scope.cancelEdit = function(ticket) {
  $scope.allTickets.forEach(function(s) {s.edit = false; s.border=null;});
  $scope.getData();
  // $scope.getData();
};



$scope.toggleForm = function() {
  if($scope.formActive) {
    $scope.formActive = false;
    $scope.slideClass = "";
    $scope.btnText = "New Ticket";
  } else {
    $scope.formActive = true;
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
