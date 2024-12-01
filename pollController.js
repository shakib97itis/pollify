const Poll = require("./Poll");

exports.createGetController = (_req, res, _next) => {
  res.render("create");
};

exports.createPostController = async (req, res, _next) => {
  try {
    let { title, description, options } = req.body;
    options = options.map((option) => ({ name: option }));

    // Create a new poll
    const newPoll = new Poll({ title, description, options });

    // Save to MongoDB
    const savePoll = await newPoll.save();
    res.status(201).json(savePoll);
  } catch (e) {
    console.log(e);
    res.render("home")
  }
};
