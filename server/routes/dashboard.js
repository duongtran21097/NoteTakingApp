const express = require('express')
const router = express.Router();
const {isLoggedIn } = require('../middleware/checkAuth')
const dashboardController = require('../controller/dashboardController');

/* Dashboard Routes */
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.get('/dashboard/addnote', isLoggedIn, dashboardController.dashboardAddNote);
router.post('/dashboard/addnote', isLoggedIn, dashboardController.dashboardAddNoteSubmit);

module.exports = router;