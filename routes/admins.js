const express = require('express')
const router = express.Router();

const {getAllAdmin, getSingleAdmin, updateAdmin, deleteAdmin, createAdmin, adminProfile, adminTimeline} = require('../controllers/adminController');
const { adminLogin } = require('../controllers/authControler');
const { authCheck } = require('../middleware/auth');

// Admin Login Details
router.post('/login', authCheck, adminLogin)
router.get('/profile', authCheck, adminProfile)
router.get('/timeline', authCheck, adminTimeline)



// get all admins
router.get('/', getAllAdmin);
router.post('/', createAdmin);
router.get('/:id', getSingleAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);






module.exports = router;