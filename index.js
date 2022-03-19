const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/employees',{
    useNewurlParser: true,
})
.then(()=>console.log("Connected Successfully!!"))
.catch((e)=>console.error("Connected Failed!!"+e))

const employeeSchema = new mongoose.Schema({

    name: String,
    age: {type: Number, min: 24, max: 60},
    department: [String],
    date: {type:Date, default: Date.now()},
    isApproved: Boolean
});

const Employee = mongoose.model('Employee', employeeSchema);

 async function createEmployee() {
    const emp = new Employee({
        name: "Ali",
        age: 54,
        department: ["C# Developer", "Nodejs Developer"],
        isApproved: true
    });
   const data =  await emp.save();
   console.log(data);
}
// createEmployee();

async function getEmployees(){
   const emps =  await Employee.
   find().
   sort({name: 1})
       .limit(2)
   .select({name: 1, age:1,department:1, isApproved:1})
   console.log(emps);
}
getEmployees();