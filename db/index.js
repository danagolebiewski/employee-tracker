// methods
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
findAllEmployees() {
  return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
}
findAllDepartments() {
  return this.connection.promise().query("SELECT department.id, department.name FROM department");
}
findAllRoles() {
  return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id");
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
// don't want to update employee managers 
// view employees by manager
// view employees by dept
// delete dept roles and employees
// view total utilized budget of dept
