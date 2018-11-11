<!DOCTYPE html>
<html lang="en">
<head>
  <title>iLista - A basic AngularJS - Slim CRUD App</title>
  <link rel="stylesheet" type="text/css" href="css/main.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
  <base href="/">
</head>
<body>
  <div class="container-fluid" ng-controller="CustomersListingCtrl" ng-cloak>
    <div class="app-wrapper">
      <div class="row">
        <section class="app-list col-md-8">
          <div class="row">
            <div class="customer-header">      
              <h1><i class="fas fa-user-circle fas-fw"></i>Customers</h1> 
            </div>
            <div class="col-md-12">    
              <table class="table table-fixed">
              <thead>
                <tr>
                  <th class="col-md-1">ID</th>
                  <th class="col-md-4">Name</th>
                  <th class="col-md-5">Email</th>
                  <th class="col-md-2">Age</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="customer in customers" ng-class="{'is-clickable': customer.clickable}" ng-click="displayCustomer(customer)">
                  <td ng-bind="$index + 1" class="col-md-1"></td>
                  <td ng-bind="customer.name" class="col-md-4"></td>
                  <td ng-bind="customer.email" class="col-md-5"></td>
                  <td ng-bind="customer.age" class="col-md-2"></td>
                </tr>
            </table>
            </div>
          </div>
        </section>
        <section class="app-actions col-md-4">
          <h1 class="text-center mb-5">iLista</h1>
          <div class="btn-actions">
            <button class="btn btn-add btn-lg shadow-sm" ng-click="addCustomer()">ADD</button>
            <button class="btn btn-update btn-lg shadow-sm" ng-click="updateCustomer()">UPDATE</button>
            <button class="btn btn-delete btn-lg shadow-sm" ng-click="deleteCustomer()">DELETE</button>
          </div>
          <div class="message" role="alert" ng-bind="message.caption" ng-class="{'message-default': message.status == 'default', 'message-success': message.status == 'success', 'message-failed': message.status == 'failed'}">
          </div>
          <!-- Start add form -->
          <form class="mt-5 ml-2 mr-2" id="addForm" ng-show="actions.add">
            <input type="text" name="name" class="form-control" placeholder="Name" ng-model="customer.name">
            <input type="email" name="email" class="form-control" placeholder="Email" ng-model="customer.email">
            <input type="text" name="age" class="form-control" placeholder="Age" ng-model="customer.age">
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitAddCustomer(customer)">Submit</button>         
          </form>
          <!-- End  add form -->

          <!-- Start update form -->    
          <form class="mt-5 ml-2 mr-2" id="updateForm" ng-show="actions.update">
            <input type="text" name="name" class="form-control" placeholder="Name" ng-model="selectedCustomer.name">
            <input type="email" name="email" class="form-control" placeholder="Email" ng-model="selectedCustomer.email">
            <input type="text" name="age" class="form-control" placeholder="Age" ng-model="selectedCustomer.age">
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitUpdateCustomer(selectedCustomer)">Submit</button>         
          </form>
          <!-- End update form -->

          <!-- Start delete form -->    
          <form class="mt-5 ml-2 mr-2" id="deleteForm" ng-show="actions.delete">
            <select name="deleteCustomer" class="form-control" ng-model="customer.id" ng-change="checkValue(customer)">
              <option value="">Choose a customer</option>
              <option ng-repeat="customer in customers" ng-value="customer.id" ng-bind="customer.name"></option>
              <button type="submit" class="btn btn-default btn-block mt-5">Submit</button> 
            </select>
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitDeleteCustomer(customer.id)">Submit</button>  
          </form>
          <!-- End delete form -->
        </section>
      </div>
    </div>
  </div>
  
  <script type="text/javascript" data-main="app/js/index" src="app/js/lib/require.js"></script>
</body>
</html>
