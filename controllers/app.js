export const getBookings = (req, res, next) => {
  res.status(200).send(req.auth.email);
};
