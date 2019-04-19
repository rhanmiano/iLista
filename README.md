# iLista - A Basic AngularJS-Slim CRUD App
iLista is a basic Customer Listing App where user can add, update, delete, and retrieve customers. Built with [Slim framework](https://www.slimframework.com/) for serving API routes and [AngularJS](https://angularjs.org/) for the frontend and handling backend calls.

See vue-ilista(VueJS counterpart) [here](https://github.com/rhanmiano/vue-ilista)

## Objectives

  1. Learn more about APIs
  2. Study http calls using AngularJS  
  3. Learn the zigzags of MVC frameworks
  4. Enhance basic frontend theming
  5. Practice, and more practice

## Design Mockup Demo
Prototype is created using AdobeXD and is viewable [here](https://xd.adobe.com/view/7e0c702b-7d6b-4958-4cc4-5735f5b12e9d-083d/)

## Setup and Dependencies
### Local Environment
Ever since I started coding *PHP*, I've been using *XAMPP* to host and serve my files locally.

#### Virtual Host
```
<VirtualHost *:5001>
    DocumentRoot "E:/rhan/dev/xampp/htdocs/slim/ilista"
    ServerName ilista
</VirtualHost>
```

### API
#### Slim (a microframework for PHP)
The project used **Slim** to handle our customer model and to create API endpoints that will be consumed by the app.

#### Install PHP dependencies

```
composer install
```

#### Initialize Database

```
php api/install.php
```

#### Idiorm and Paris (a minimalist database toolkit for PHP 5)
Talk to database in a simpler manner by using these two.

In `api/connection.php` we just required the two php files and setup configuration like so:
```
require_once 'includes/idiorm.php';
require_once 'includes/paris.php';

ORM::configure('mysql:host=localhost; dbname=testapp');
ORM::configure('username', 'root');
ORM::configure('password', '');
ORM::configure('return_result_sets', false);
ORM::configure('error_mode', PDO::ERRMODE_WARNING);
```

We can then use **Idiorm & Paris** syntax to perform operations that involves our database like the sample code below:

```
class Customers extends Model {
  
}

class CustomersModel extends Model{
  // Retrieves all the data from tbl 'Customers' 
  // and turns it into an associative array
  $customers = Model::factory('Customers')
    ->find_array();
} 
```
#### Endpoints
Method | Description | Endpoint
------ | ----------- | --------
GET | Retrieve all customers| /api/customers              
GET | Retrieve specific customer by id| /api/customer/{id}
POST | Add a customer | /api/add/customer
PUT | Update a specific customer by id | /api/update/customer/{id}
DELETE | Delete a customer by id | /api/delete/customer/{id}

### APP
#### AngularJS
Used this framework to build UI functionalities and http calls.

Installed its core files using **bower**

```
bower install angular --save
```

For **angular-route**

```
bower install angular-route --save
```

### Other Dependencies
Install our dev dependencies using **npm**

```
npm install
```

#### Gulp

Mainly used *gulp* in this project for tasks automation such as *sass compiling*, *minifying*, and *livereload*.

In `gulpfile.js` Make sure to configure browserSync.init's proxy value with:
```
gulp.task('serve', function() {
  browserSync.init({
    proxy: 'localhost/whatever-url-path-here', //proxy this url
    port: 5000
  });  
});
```

We can then check our application by using the following commands: 

```
npm start
```

or

```
gulp dev
```

## Todo
### Documentation
  - [X] Setup and dependencies

### Coding
#### API
  - [X] Retrieve all customers
  - [X] Retrieve specific customer
  - [X] Add a customer
  - [X] Update a specific customer
  - [X] Delete a specific customer
#### Frontend
  - [X] Add function
  - [X] Update function
  - [X] Delete function
  - [X] Search function
#### Other Checklist
  - [X] Validations
  - [X] Mobile Responsiveness
  - [X] Initialize SQL db structure


## Improvements/What's next?
  - Autocomplete for selecting/searching customer on delete
  - What are possible risks in security?
  - Add additional component (maybe profile section for each customer)

## Additional Notes
- Stumbled upon this [issue](https://bugs.php.net/bug.php?id=44341) of having MySQL return `string` for data that is originally `int` in the database (e.g. id: "6" instead of id: 6). The fix was to check if the mysql driver that is being used by PHP is `mysqlnd`, we can check by typing `php --info` on the terminal and look for `mysqlnd => enabled` along its indicated version. After confirming, I added `$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);` in `idiorm.php` line `336`. By doing so, PDO now retrieves original column datatype instead of returning string for fetched data using prepared statements.