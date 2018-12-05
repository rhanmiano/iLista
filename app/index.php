<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, IE=11">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="author" content="Rhan Miano">
  <meta name="description" content="A basic AngularJS - Slim CRUD Application">

  <title>iLista - A basic AngularJS - Slim CRUD App</title>
  <link rel="stylesheet" type="text/css" href="css/main.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

  <base href="">
</head>
<body>
  <div class="container-fluid" ng-controller="CustomersListingCtrl" >
    <div class="app-wrapper">
      <div class="row">
        <section class="app-list col-md-8">
          <div class="row">            
            <header class="customer-header">
              <h2><i class="fas fa-user-circle fas-fw"></i>Customers</h2> 
            </header>        
          </div>
          <div class="row">
            <input type="text" name="search" class="form-control mb-5" ng-model="searchCustomer" placeholder="Search a customer">
          </div>
          <div class="row">            
            <div class="col-md-12">    
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                  </tr>
                </thead>                
                <tbody>
                  <tr ng-show="page.loading">
                    <td colspan="4">
                    <div class="ball-pulse">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>                    
                    </td>
                  </tr>
                  <tr ng-repeat="customer in customers | filter:searchCustomer" ng-class="{'is-clickable': customer.clickable}" ng-click="displayCustomer(customer)" ng-show="!page.loading">
                    <td ng-bind="$index + 1"></td>
                    <td ng-bind="customer.name"></td>
                    <td ng-bind="customer.email"></td>
                    <td ng-bind="customer.age"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section class="app-actions col-md-4">
          <a class="btn btn-default btn-small" title="See github documentation" href="https://github.com/rhanmiano/iLista" rel="noopener" target="_blank" role="button">About</a>
          <h1 class="text-center mb-5">iLista</h1>
          <div class="btn-actions">
            <button class="btn btn-add btn-lg shadow-sm" ng-click="addCustomer()">ADD</button>
            <button class="btn btn-update btn-lg shadow-sm" ng-click="updateCustomer()">UPDATE</button>
            <button class="btn btn-delete btn-lg shadow-sm" ng-click="deleteCustomer()">DELETE</button>
          </div>
          <div class="message" role="alert" ng-bind="message.caption" ng-class="{'message-default': message.status == 'default', 'message-success': message.status == 'success', 'message-failed': message.status == 'failed'}">
          </div>
          <!-- Start add form -->
          <form class="mt-5 ml-2 mr-2" id="addForm" ng-show="actions.add" ng-cloak>
            <input type="text" name="name" class="form-control" placeholder="Name*" ng-model="customer.name">
            <input type="email" name="email" class="form-control" placeholder="Email*" ng-model="customer.email">
            <input type="text" name="age" class="form-control" placeholder="Age*" ng-model="customer.age">
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitAddCustomer(customer)" ng-disabled="page.loading">Submit</button>         
          </form>
          <!-- End  add form -->

          <!-- Start update form -->    
          <form class="mt-5 ml-2 mr-2" id="updateForm" ng-show="actions.update" ng-cloak>
            <input type="text" name="name" class="form-control" placeholder="Name*" ng-model="selectedCustomer.name">
            <input type="email" name="email" class="form-control" placeholder="Email*" ng-model="selectedCustomer.email">
            <input type="text" name="age" class="form-control" placeholder="Age*" ng-model="selectedCustomer.age">
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitUpdateCustomer(selectedCustomer)" ng-disabled="page.loading">Submit</button>         
          </form>
          <!-- End update form -->

          <!-- Start delete form -->    
          <form class="mt-5 ml-2 mr-2" id="deleteForm" ng-show="actions.delete" ng-cloak>
            <select name="deleteCustomer" class="form-control" ng-model="customer.id" ng-change="checkValue(customer)">
              <option value="">Choose a customer</option>
              <option ng-repeat="customer in customers" ng-value="customer.id" ng-bind="customer.name"></option>
              <button type="submit" class="btn btn-default btn-block mt-5">Submit</button> 
            </select>
            <button type="submit" class="btn btn-default btn-block mt-5" ng-click="submitDeleteCustomer(customer.id)" ng-disabled="page.loading">Submit</button>  
          </form>
          <!-- End delete form -->
        </section>
      </div>
    </div>
  </div>
  
  <script type="text/javascript" data-main="js/index" src="js/lib/require.js"></script>
</body>
</html>