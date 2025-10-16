import * as admin from 'firebase-admin';
import * as fs from 'fs';

// Replace with the correct relative path to your service account key
const serviceAccount = require('./firebase_keys/firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface Product {
  id?: string;
  name: string;
  price: number;
}

// Load and parse JSON data
const rawData = fs.readFileSync('amenities_addavolt.json', 'utf-8');
const data = JSON.parse(rawData);

async function uploadData(): Promise<void> {
  // console.log(rawData);
  try {
    const docRef = db.collection("business_info").doc("facilities");
    await docRef.set(data, { merge: true });
    console.log("Map data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading map data:", error);
  }

  console.log('🎉 Upload process completed.');
}

uploadData();
