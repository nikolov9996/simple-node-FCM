const bodyParser = require('body-parser')
const express = require('express');
const admin = require("firebase-admin");
const serviceAccount = require('./admin.json'); // admin SDK goes here

const app = express()
const port = process.env.PORT || 4000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/notification/sendToDevice', (req, res) => {
    try {

        const title = req?.body?.title;
        const body = req?.body?.body;
        const image = req?.body?.image;
        const deviceToken = req?.body?.deviceToken

        if (!title) return res.send("TITLE_MISSING").status(400);
        if (!body) return res.send("BODY_MISSING!").status(400);
        if (!deviceToken) return res.send("DEVICE_TOKEN_MISSING").status(400);

        const message = {
            data: {
                title: title,
                body: body,
                image: image || "",
                content_available: "true",
            },
            token: deviceToken
        };

        admin.messaging().send(message)
            .then(function (response) {
                res.send('Message successfully sent! ' + response)
            })
            .catch(function (error) {
                res.send(error).status(500)
            });
    } catch (error) {
        res.send(error).status(500)

    }
})

app.listen(port, () => {
    console.log(`Messaging app listening on port ${port}`)
})