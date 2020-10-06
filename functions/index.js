// https://www.youtube.com/watch?v=sB2b3ZYMQgg&t=3707s for backend and stripe

// express app on a cloud function

const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HQE62FgRhgfMb4TX7LLIX4U5Ku4l3WtEQh0LqoEkYpeSPW6iCMPDv19uLmlm1D1bu6UP0a8D5rzftsVVleJJL6m00HyVw4vTv");

//set up api: steps:
// 1 - App config
const app = express();

// 2 - middleware
app.use(cors({ origin: true }));
app.use(express.json()); // move data in json format


// 3 - api routes
//test route
app.get('/', (req, res) => {
    res.status(200).send('helloworld');
});

// ref line 32 payment js for the query noted with a ?
app.post('/payments/create', async (req, res) => {
    const total =  req.query.total;
    console.log('Payment request recieved for this ammount >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // in sub units ref line 32 payment.js
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,


    });
});

// 4 - listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-874e9/us-central1/api found in terminal after starting server.


