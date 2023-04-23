/* GET - Dashboard */
exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard',
        description:'Enrich Skill - Note Taking App'
    }

    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
}
