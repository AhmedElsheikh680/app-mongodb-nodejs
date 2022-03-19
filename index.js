const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/employees',{
    useNewurlParser: true,
})
.then(()=>console.log("Connected Successfully!!"))
.catch((e)=>console.error("Connected Failed!!"+e))

const employeeSchema = new mongoose.Schema({

    name: {type: String, required: true},
    age: {type: Number, min: [24, 'Too Small'], max: 60},
    department: [String],
    date: {type:Date, default: Date.now()},
    isApproved: Boolean,
    job: {
      type: String,
      enum: ['IT', 'HR', 'Sales'],
        required: true
    },
    salary: {
      type: Number,
        required: function (){
          return this.isApproved;
        }
    }

});

const Employee = mongoose.model('Employee', employeeSchema);

 async function createEmployee() {
    const emp = new Employee({
        name: "Basma",
        age: 54,
        department: ["C# Developer", "Nodejs Developer"],
        // isApproved: false,
        job: 'HR',
        salary: 50045
    });
     try{
         const data =  await emp.save();
         console.log(data);
     }catch(error) {
         console.log(error.message);
     }
}
createEmployee();

async function getEmployees(){
   const emps =  await Employee.
   // find({name: 'Ali'}).
   // find({age: {$gte: 10}}).
   //     find({age: {$in: [25,40]}}).
   find({age: {$nin: [25,40]}}).
   sort({name: 1})
       .limit(20)
   .select({name: 1, age:1,department:1, isApproved:1})
   console.log(emps);
}
//getEmployees();

// async function updateEmployee(id) {
//      const emp =await Employee.findById(id);
//      if(!emp) {
//          console.log('Employee not Found!!');
//      }
//      emp.name="Ahmed Updated";
//      const data = await emp.save();
//      console.log(data);
//
// }
// updateEmployee('62363b06049cdc37ec77359d');

// async function updateEmployee2(id){
//     const emp = Employee.updateOne({_id: id},
//         {
//             $set: {name: 'Not Ahmed'}
//         });
//      console.log(emp+ ' Updaed Successfully!!');
// }
// updateEmployee2('62363b06049cdc37ec77359d');

async function updateEmployee3(id){
     const emp = await Employee.findByIdAndUpdate(id,{
         $set:{name: 'Not Name'}
     },{new: true});
     console.log(emp + 'Updated');
}

// updateEmployee3('62363b33e08de04586ef2946');


//Delete
// async function deleteEmployee1(id){
//      const emp = await Employee.deleteOne({_id: id});
//      console.log(emp+ 'Deleted Successfully!!');
// }
// deleteEmployee1("62365001bd689bbce3e92992");

async function deleteEmployee2(id){
     const emp =await Employee.findByIdAndRemove(id);
     console.log(emp+ 'Deleted Successfully!!');
}
// deleteEmployee2("623650f656eab3a17562478f");




































