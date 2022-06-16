const fs = require('fs')
const path = require('path');
const studentModel = require('../modals/studentModel')

//Students data models
// const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db.json')).toString())

// get latest id
const getLatestId = () => {

    if(students.length > 0){
        return students[students.length - 1].id + 1
    }else{
        return 1;
    }
}


// get all students
const getAllStudents = async (req, res) => {
   
let data = await studentModel.find();
res.status(201).json(data)


}

 // get single student
 const getSingleStudent = async (req, res) => {
     
    let id = req.params.id;

    let single_data = await studentModel.findById(id);
    res.status(200).json(single_data)
    
 }

 // add another students
 const createstudents = async (req, res) => {
    
    let data = await studentModel.create({
                name: req.body.name,
                age: req.body.age,
                skill : req.body.skill
    })

    res.status(201).json({
        Message : "Student Add Success"
    })
  
}

// edit students/update students
const updateStudents = async (req, res) => {
  
    let id = req.params.id;
    
    await studentModel.findByIdAndUpdate(id, req.body, {
        new : true
    })
    res.status(200).json({
        Message : "Data Updated Succesfull"
    })
 
}

// delete students 
const deleteStudents = async (req, res) => {

    let id = req.params.id;
   
    await studentModel.findByIdAndDelete(id);

    res.status(200).json({
      Message: "Student Delete Successfull"
    })

}

module.exports = {
    getAllStudents,
    getSingleStudent,
    createstudents,
    updateStudents,
    deleteStudents
}