const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyparser = require('body-parser');
// const cookieparser = require('cookie-parser');
const cors = require('cors');

//DB connectivity
mongoose.connect('mongodb+srv://aj:ajmani@cluster0-c60su.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(err => {
    console.log(err);
});


//Middlewares
app.use(bodyparser.json());
// app.use(cookieparser());
app.use(cors());


//Custom routes
// const workflowRoutes = require("./routes/workflow");
const promiseRoutes = require("./routes/promise");
const flatRoutes = require("./routes/flat");

// const callbackRoutes = require("./routes/callback");





//Routes configuration
// app.use("/", workflowRoutes);
app.use("/", promiseRoutes);
app.use("/flat", flatRoutes);

// app.use("/", callbackRoutes);



//Port configuration
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.json({message: `Server Running On ${port}`})
});

//Listening to port
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})