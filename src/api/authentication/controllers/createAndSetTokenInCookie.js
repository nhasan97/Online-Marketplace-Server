const tokenGenerator = require("../../../utilities/tokenGenerator");

const createAndSetTokenInCookie = async (req, res) => {
  const user = req.body;

  const token = tokenGenerator(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true });
};

module.exports = createAndSetTokenInCookie;
