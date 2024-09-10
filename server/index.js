//Import Dependencies
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//Imports Files
const errorHandler = require("./handlers/errorHandler");
const authRoutes = require("./modules/Auth/auth.routes");
const userRoutes = require("./modules/users/users.routes");
const categoryRoutes = require("./modules/categories/categorys.routes");
const brandRoutes = require("./modules/Brands/brands.routes");
const colorRoutes = require("./modules/colors/colors.routes");
const productRoutes = require("./modules/products/product.routes");
const reviewRoutes = require("./modules/Reviews/reviews.routes");
const orderRoutes = require("./modules/orders/orders.routes");
const couponRoutes = require("./modules/coupons/coupons.routes");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //to integrate stripe using webhook


// Instance of express (app)
const app = express();

// Stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINTSECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {

  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("Err :", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    //update the order
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    const orderModel = mongoose.model("orders");

    const order = await orderModel.findByIdAndUpdate(
      JSON.parse(orderId), //converts the orderId string (which should be a valid JSON) into a JavaScript object or value
      {
        $set: {
          totalPrice: totalAmount / 100,
          paymentMethod: paymentMethod,
          paymentStatus: paymentStatus,
          currency: currency
        }
      },
      {
        new: true
      }
    );

    console.log("Order Detail :", order);


  } else {
    return;
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();

});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //To parse the cookies sent by the clients
app.use(cors({ origin: 'http://localhost:5173' }));

app.use((req, res, next) => {

  console.log(`Incomming ${req.method} Request on URL : ${req.url}`);

  next();

})

// Connection with our MongoDB Database
mongoose.connect(process.env.MONGO, {})
  .then(() => console.log("Connected to MongoDB Database Successfully"))
  .catch((error) => console.log(`Error While Connecting to Database.${error}`));


// Mongoose Models
require("./models/user.model");
require("./models/product.model");
require("./models/category.model");
require("./models/brand.model");
require("./models/color.model");
require("./models/review.model");
require("./models/order.model");
require("./models/coupon.model");

// Routes
app.get("/api/success", (req, res) => {
  res.send("Payment Successfully");
});

app.get('/', (req, res) => {
  res.send("Hello World From Ecommerce Backend");
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/coupons', couponRoutes);

// Error Handling MiddleWare to Handle Errors
app.use(errorHandler);

// Server initialization
app.listen(process.env.PORT, () => console.log(`Server is Listening on http://localhost:${process.env.PORT}`));

