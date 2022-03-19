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
        name: "Sayed",
        age: 54,
        department: ["C# Developer", "Nodejs Developer"],
        isApproved: true
    });
   const data =  await emp.save();
   console.log(data);
}
createEmployee();