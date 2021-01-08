const functions = require('firebase-functions');
const express = require('express')
const app = express();
const path = require('path')
const fetch = require('node-fetch')
app.use(express.static('public'))

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'source_folder/index.html'))
})

exports.app = functions.https.onRequest(app);