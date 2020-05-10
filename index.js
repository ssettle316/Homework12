const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },

        {
          name: "View Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },

        {
          name: "View Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },

        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },

        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },

        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },

        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },

        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },

        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },

        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },

        {
          name: "View Roles",
          value: "VIEW_ROLES"
        },

        {
          name: "Add Role",
          value: "ADD_ROLE"
        },

        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },


        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_Manager":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
       return addDepartment();
    case "REMOVE_DEPARTMENT":
       return removeDepartment();
    case "VIEW_ROLES":
       return viewRoles();
    case "ADD_ROLE":
       return addRole();
    case "REMOVE_ROLE":
        return removeRole();
      
      

    default:
      return quit();
  }
}
//save
async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}
//Create viewEmployeesByDepartment function
async function viewEmployeesByDepartment() {
  const employeesByDepartment = await db.findAllEmployees();

  console.log("\n");
  console.table(employeesByDepartment);

  loadMainPrompts();


//Create viewEmployeesByManager function
async function viewEmployeesByManager() {
  const employeesByManager = await db.findAllEmployees();

  console.log("\n");
  console.table(employeesByManager);

  loadMainPrompts();

//save
async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadMainPrompts();
}

//save
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

//Create updateEmployeeManager function

//Create viewRoles function

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

//Create addRole function
async function addRole() {
  const newRole = await db.createRole();

  console.log("\n");
  console.table(newRole);

  loadMainPrompts();
}

//Create removeRole function
async function removeRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to remove?",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("Removed role from the database");

  loadMainPrompts();
}

//Create addDepartment function
async function addDepartment() {
  const newDepartment = await db.createDepartment();

  console.log("\n");
  console.table(newDepartment);

  loadMainPrompts();
}

//Create removeDepartment function
async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: `${name}`,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department do you want to remove?",
      choices: departmentChoices
    }
  ]);

  await db.removeDepartment(departmentId);

  console.log("Removed department from the database");

  loadMainPrompts();
}

//save
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
