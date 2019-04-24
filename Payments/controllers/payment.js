const axios = require("axios");

exports.payment = (req, res, next) => {
  const orderId = req.params.orderId;
  const url = "http://localhost:5000/orderState/" + orderId + "/true";

  const getOrder = async () => {
    try {
      return await axios.get(url);
    } catch (error) {
      req.flash("error", { msg: "Some error to fetch order details." });
      return next(err);
    }
  };

  const orderToPay = async () => {
    const order = await getOrder();

    if (order.data.orderState === "create") {
      req.flash("info", { msg: "Your order good to pay." });
      res.render("index", order.data);
    } else {
      res.redirect("http://localhost:5000/orderState/" + order.data._id);
    }
  };

  orderToPay();
};

exports.doPayment = function(req, res, next) {
  const orderId = req.params.orderId;
  const randomResponse = Math.round(Math.random() * 10) % 2;
  const state = ["declined", "confirmed"];

  res.redirect(
    "http://localhost:5000/orderUpdate/" + orderId + "/" + state[randomResponse]
  );
};
