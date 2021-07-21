// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    let employees = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        employees.push(createEmployeeRecord(element));
    }
    return employees;
}

function createTimeInEvent(employees, dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    employees.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employees;
}

function createTimeOutEvent(employees, dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    employees.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employees;
}

function hoursWorkedOnDate(employees, date){
    let inTime = employees.timeInEvents.find(function(timeIn){
        return timeIn.date === date;
    });
    let outTime = employees.timeOutEvents.find(function(timeOut){
        return timeOut.date === date;
    });
    return (outTime.hour - inTime.hour) / 100;
}

function wagesEarnedOnDate(employees, date){
    return hoursWorkedOnDate(employees, date) * employees.payPerHour;
}

function allWagesFor(employees){
    let dates = employees.timeInEvents.map(function(day){
        return day.date;
    });
    let total = dates.reduce(function(prevDayWage, date){
        return prevDayWage + wagesEarnedOnDate(employees, date);
    }, 0);
    return total;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let emp = srcArray.find(function(findFirstName) {
        return findFirstName.firstName === firstName;
    });
    return emp;
}

function calculatePayroll(arr) {
    let total =  arr.reduce(function(cummWages, emp){
        return cummWages + allWagesFor(emp);
    }, 0);
    return total;
}