const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const chkstring = async function(input){
    if (input == ""){
        console.log(" Input Needed")
    }else{return true}
};
const chknum = async function(input){
    if (isNaN(input) || input == ""){
        console.log(" Number Needed")
    }else{return true}
};

//Courtesey of Stackaflow 
const chkemail = async (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    const a = expression.test(String(email).toLowerCase())
    if(a==false){console.log(" is an Invalid Email")}
    else{return true};
};
//



const initquestion = [
    {
        message: "Please enter Employee's Name.",
        type: "input",
        name: "Name",
        validate: chkstring,
    },
    {
        message: "Please enter Id Number.",
        type: "input",
        name: "Id",
        validate: chknum,
    },
    {
        message: "Please enter Email Address.",
        type: "input",
        name: "Email",
        validate: chkemail,

    }
];

const additQMag = [
    {
        message: "Please enter Office Number.",
        type: "input",
        name: "OfficeNum",
        validate: chknum,
    }
];

const additQEng = [
    {
        message: "Please Enter Github Name.",
        type: "input",
        name: "GitName",
        validate: chkstring,
    }
];

const additQIntern = [
    {
        message: "Please Enter School Name.",
        type: "input",
        name: "SchoolName",
        validate: chkstring,
    }

];

const empType = [
    {
        message: "What Role Employee would you like to Add Next?",
        type: "list",
        name: "Role",
        choices: ["Engineer", "Intern", "No more to Add"]

    }

];

function empquestion(){
    return inquirer.prompt(initquestion);
}

async function add(){
    const team = [];
    let role = "Manager";
    let newstaff;
    let iniqst;
    let additqst

    do {
        switch (role) {
            case "Manager":
                iniqst = await inquirer.prompt(initquestion);
                additqst = await inquirer.prompt(additQMag);
                newstaff = new Manager(iniqst.Name, iniqst.Id, iniqst.Email, additqst.OfficeNum);
                break;
            case "Engineer":
                iniqst = await inquirer.prompt(initquestion);
                additqst = await inquirer.prompt(additQEng);
                newstaff = new Engineer(iniqst.Name, iniqst.Id, iniqst.Email, additqst.GitName);
                break;        
            case "Intern":
                iniqst = await inquirer.prompt(initquestion);
                additqst = await inquirer.prompt(additQIntern);
                newstaff = new Intern(iniqst.Name, iniqst.Id, iniqst.Email, additqst.SchoolName);
                break;        
            default:
                console.log("Something Wrong, Get Help!")
                break;
        }
        team.push(newstaff);
        const next = await inquirer.prompt(empType);
        role = next.Role;
        
    } while (role != "No more to Add");

    console.log(team)

}


async function init(){
    try {
        const initask = await empquestion();
        const Mqst = await inquirer.prompt(additQMag);
        const staff = new Manager(initask.Name, initask.Id,initask.Email,Mqst.OfficeNum);
        console.log(staff, staff.getRole())
        
        
        
        
    } catch (error) {
        console.log(error)
    }
}
add()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
