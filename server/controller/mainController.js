/* GET - HomePage */
exports.homePage = async (req, res) => {
    const locals = {
        title: 'Note Taking App',
        description:'Enrich Skill - Note Taking App'
    }

    res.render('index', locals);
}

/* GET - Manage list */
exports.manageList = async (req, res) => {
    const locals = {
        title: 'Manage List',
        description:'Enrich Skill - Note Taking App'
    }

    res.render('manage', {
        locals,
        layout: '../views/layouts/front-page'
    });
}