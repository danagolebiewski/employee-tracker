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
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => questions());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => questions());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => questions());
}

function addRole() { 
  //pull from database - department 
  //create iteration based on departments 
  //create prompts - what is the title of the role, salary, department id 
  //.then pass throgh role and 
  db.createRole().then();
}
function addEmployee() {
  prompt([
    {
      name: "first_name",
      value: "What is your first name?",
    },
    {
      name: "last_name",
      value: "What is your last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employees role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;
        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );
          managerChoices.unshift({
            name: "None",
            value: null,
          });
          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employees manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };
              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to database`)
            )
            .then(() => questions());
        });
      });
    });
  });
}
function addDepartment() {
  prompt([
    {
      name: "name",
      value: "What is the department name?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log`Added ${name.name} department to the database`)
      .then(() => questions());
  });
}
function updateEmployeeRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employees role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign to the employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => questions());
      });
    });
  });
}
function quit() {
  console.log("You're all finished");
  process.exit();
}

// view all departments - have to call out rows and define rows second .then goes back to switch - attempted this one...
// view roles - attempted
// view employees -
// methods? other creates are similar to the one we did - check these too
// look at statements in class activities
// I have red squigglys and don't know why - tried to run node but the brackets are off and it won't run, name on 94 is greyed out (maybe because it's the word name and it's ok?)
