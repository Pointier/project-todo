import admin from "firebase-admin";

const serviceAccount = require("./toDoAdminKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export default admin;
