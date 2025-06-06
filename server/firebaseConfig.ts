import admin from "firebase-admin";
let serviceAccount: any;
if (process.env.NODE_ENV === "production") {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY!);
} else {
  serviceAccount = require("./toDoAdminKey.json");
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export default admin;
