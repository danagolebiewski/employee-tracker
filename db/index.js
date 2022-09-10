// methods
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
findAllEmployees() {
  return this.connection.promise().query("");
}
findAllDepartments() {
  return this.connection.promise().query("");
}
findAllRoles() {
  return this.connection.promise().query("");
}
createRole() {
  return this.connection.promise().query("");
}
createEmployee(employee) {
  return this.connection.promise().query("INSERT INTO employee SET ?", employee);
}
createDepartment() {
  return this.connection.promise().query("");
}
updateEmployeeRole() {
  return this.connection.promise().query("");
}
}
// don't watn to update employee managers 
// view employees by manager
// view employees by dept
// delete dept roles and employees
// view total utilized budget of dept
