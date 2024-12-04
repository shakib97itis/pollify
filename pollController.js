const Poll = require("./Poll");

// Get all Polls
exports.getAllPolls = async (_req, res, _next) => {
  let polls = await Poll.find();
  res.render("home", { polls });
};

// Handling Poll creation
exports.getCreatePoll = (_req, res, _next) => {
  res.render("create");
};

exports.postCreatePoll = async (req, res, _next) => {
  try {
    let { title, description, options } = req.body;
    options = options.map((option) => ({ name: option }));
    console.log(title, description, options);

    // Create a new poll
    const newPoll = new Poll({ title, description, options });

    // Save to MongoDB
    const savePoll = await newPoll.save();

    // Redirect to the home page after successful form submission
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

// Handling Voting.
exports.getPoll = async (req, res, _next) => {
  const { id } = req.params;
  try {
    let poll = await Poll.findById(id);
    res.render("poll", { poll });
  } catch (e) {
    console.log(e);
  }
};

exports.postPoll = async (req, res, _next) => {
  const { id } = req.params; // Poll ID
  const { selectedOption } = req.body; // Selected option ID from the user

  try {
    // Find the poll by ID
    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).send("Poll not found");
    }

    // Update Total vote count
    poll.totalVotes += 1;

    // Update the vote count for the selected option
    poll.options.forEach((option) => {
      if (option._id.equals(selectedOption)) {
        option.votes += 1;
      }
    });

    // Save the updated poll to the database
    await poll.save();

    // Redirect the user to the result page
    res.redirect(`/result/${id}`);
  } catch (error) {
    console.error("Error while processing the poll vote:", error);
    res.status(500).send("An error occurred while voting");
  }
};

exports.getResult = async (req, res, next) => {
  const id = req.params.id;
  const poll = await Poll.findById(id);
  res.render("pollResult", { poll });
};
