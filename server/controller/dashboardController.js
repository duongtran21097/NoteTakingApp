const Note = require("../models/Notes");
const mongoose = require("mongoose");

/* GET - Dashboard */
exports.dashboard = async (req, res) => {

    let perPage = 12;
    let page = req.query.page || 1;
  
    const locals = {
      title: "Dashboard",
      description: "Free NodeJS Notes App.",
    };
  
    try {
      const notes = await Note.aggregate([
        { $sort: { updatedAt: -1 } },
        {
          $project: {
            title: { $substr: ["$title", 0, 10] },
            body: { $substr: ["$body", 0, 50] },
            topic: { $substr: ["$topic", 0, 10] },
          },
        },
      ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      const count = await Note.count();
  
      res.render('dashboard/index', {
        userName: req.user.firstName,
        locals,
        notes,
        layout: "../views/layouts/dashboard",
        current: page,
        pages: Math.ceil(count / perPage)
      });
     } catch (error) {
      console.log(error);
    }
  };
