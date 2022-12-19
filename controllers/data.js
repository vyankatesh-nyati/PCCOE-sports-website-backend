exports.getData = (req, res, next) => {
  try {
    res.status(200).json({
      message: "Data sent successfully",
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
