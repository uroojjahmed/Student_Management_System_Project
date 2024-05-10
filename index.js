#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Make the students class
class student {
    static counter = 10001;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 200;
    }
    // Use Method to enroll a students in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    //Use Method to view a student balance
    viewBalance() {
        console.log(`${chalk.greenBright(this.name)} Balance : $${chalk.greenBright(this.balance)}\n`);
    }
    ////Use Method to pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(`${chalk.greenBright(this.name)} Paid $${chalk.greenBright(amount)} Fees Successfully. `);
        console.log(`${chalk.greenBright(this.name)} Remaining Balance : $${chalk.greenBright(this.balance)}\n`);
    }
    //Use Mthod to View students status
    showStatus() {
        console.log(`Student ID: ${chalk.greenBright(this.id)}`);
        console.log(`Student Name: ${chalk.greenBright(this.name)}`);
        console.log(`Courses Name: ${chalk.greenBright(this.courses)}`);
        console.log(`Student Balance: $${chalk.greenBright(this.balance)}\n`);
    }
}
//Use a studentManager class for Mange Students
class Studentmanager {
    students;
    constructor() {
        this.students = [];
    }
    // Add a New Students
    addnew_student(name) {
        let newStudent = new student(name);
        this.students.push(newStudent);
        console.log(`New Student: ${chalk.greenBright(name)} added Successfully. Students ID: ${chalk.greenBright(newStudent.id)}\n`);
    }
    //Enroll a Student in a Courses
    enrollStudents(student_Id, course) {
        let student = this.findStudent(student_Id);
        if (student) {
            student.enrollCourse(course);
            console.log(`${chalk.greenBright(student.name)} Enrolled in ${chalk.greenBright(course)} Successfully.\n`);
        }
        else {
            console.log(chalk.bold.red("You enter a worng student ID.Kindly enter a correct student ID.\n"));
        }
    }
    //Use Method a View Students Balance
    viewstudent_Balance(student_Id) {
        let student = this.findStudent(student_Id);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.bold.red("You enter a worng student ID.Kindly enter a correct student ID.\n"));
        }
    }
    //Use method a Pay student fees
    payStudent_fees(student_Id, amount) {
        let student = this.findStudent(student_Id);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log(chalk.bold.red("You enter a worng student ID.Kindly enter a correct student ID.\n"));
        }
    }
    //Use Method to Disply a student status
    show_student_status(student_Id) {
        let student = this.findStudent(student_Id);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(chalk.bold.red("You enter a worng student ID.Kindly enter a correct student ID.\n"));
        }
    }
    //Use Method to Find student by student ID
    findStudent(student_Id) {
        return this.students.find(stu => stu.id === student_Id);
    }
}
//USe Main Function to run program
async function main() {
    //Print A Welcome Message
    console.log(chalk.bold.blue("\n \t\t _ Welcome To Student Management System _"));
    console.log("_".repeat(70));
    let student_manager = new Studentmanager();
    //use while loop
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Please Select an Option.",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        //Use Switch Case
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Add a Student Name:",
                    }
                ]);
                student_manager.addnew_student(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Add a Student ID:",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Add a Course Name:",
                    }
                ]);
                student_manager.enrollStudents(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Add a Student ID:",
                    }
                ]);
                student_manager.viewstudent_Balance(balanceInput.studentId);
                break;
            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Add a Student ID: ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: " Enter student amount for pay fees."
                    }
                ]);
                student_manager.payStudent_fees(feesInput.student_id, feesInput.amount);
                break;
            case "Show Student Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID:",
                    }
                ]);
                student_manager.show_student_status(statusInput.student_id);
                break;
            case "Exit":
                console.log(chalk.blue("Exiting..."));
                process.exit();
        }
    }
}
//Now Call a Main Function
main();
