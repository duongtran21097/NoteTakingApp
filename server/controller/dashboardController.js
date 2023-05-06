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
          title: { $substr: ["$title", 0, 20] },
          body: { $substr: ["$body", 0, 50] },
          topic: { $substr: ["$topic", 0, 10] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Note.count();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/* GET - View Note */
exports.dashboardViewNote = async (req, res) => {
  let paramID = req.params.id;
  try {
    const note = await Note.findById(paramID).lean();
    if (note) {
      res.render("dashboard/view-note", {
        noteID: paramID,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
  } catch (error) {
    res.send(500);
  }
};

/* PUT - Update Note */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, topic: req.body.topic, updatedAt: Date.now() }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// DELETE - Delete Note
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/addnote", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
