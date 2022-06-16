const express = require('express')
const router = express.Router();

const {getAllStudents, getSingleStudent,createstudents, updateStudents,deleteStudents} = require('../controllers/studentsController')


router.get('/', getAllStudents)
router.get('/:id', getSingleStudent)
router.post('/', createstudents)
router.put('/:id', updateStudents)
router.delete('/:id', deleteStudents)

router.patch('/:id', (req, res) => {
    res.send(`Patch Route Done with id ${req.params.id}`)
})



module.exports = router;