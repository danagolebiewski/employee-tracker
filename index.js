// root
const {prompt} = require("inquirer");
const { listenerCount } = require("process");
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
          value: "VIEW_EMPLOYEES"
        },
        // {
        //   name: "View All Employees", 
        //   value: "VIEW_EMPLOYEES"
        // },
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch(choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
    }
  })
}
function viewEmployees() {
  db.findAllEmployees()
  .then()
}