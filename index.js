// root
const { prompt } = require("inquirer");
const { listenerCount, title } = require("process");
const db = require("./db");
require("console.table");

function questions() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        }, 
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default: 
        quit();
    }
  });
}
function viewEmployees() {
  db.findAllEmployees().then();
}
function viewDepartments() {
  db.findAllDepartments().then();
}
function viewRoles() {
  db.findAllRoles().then();
}
function addRole() {
  db.createRole().then();
}
function addEmployee() {
  prompt([
    {
      name: "first_name",
      value: "What is your first name?"
    },
    {
      name: "last_name",
      value: "What is your last name?"
    }
  ]
  ).then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
    const roleChoices = roles.map(({
      id , title
    }) => ({ name: title, value: id
    }));
    prompt({
      type: "list",
      name: "roleId",
      message: "What is the employees role?",
      choices: roleChoices
    })
  })
  db.createEmployee().then();
}
function addDepartment() {
  db.createDepartment().then();
}
function updateEmployeeRole() {
  db.updateEmployeeRole().then();
}
function quit() {
  console.log("You're all finished");
  process.exit();
}


// view all departments - have to call out rows and define rows second .then goes back to switch
// view roles - 
// view employees 
// methods? other creates are similar to the one we did 
// look at statements in class activities 