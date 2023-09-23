/* The code is importing the `admin` module from the `firebase-admin` package and the `getApps`
function from the `firebase-admin/app` module. It then parses the `FIREBASE_SERVICE_ACCOUNT_KEY`
environment variable as a JSON object and assigns it to the `serviceAccount` variable. */
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// const serviceAccount = require ("./serviceAccountKey.json")

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

const adminDb = admin.firestore();

export { adminDb };