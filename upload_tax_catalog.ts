import * as admin from "firebase-admin";
import * as fs from "fs";

// this is to upload tax catalog data to Firestore on intelimeter firebase project
admin.initializeApp({
  credential: admin.credential.cert("./firebase_keys/firebase-key.json") 
});

const db = admin.firestore();

// Load your JSON file
const data = JSON.parse(fs.readFileSync("tax_catalog_intelimeter.json", "utf8"));

// Upload function
async function uploadTaxCatalogs() {
  try {
    // Upload taxPersons
    const taxPersonRef = db.collection("tax_catalogs").add({"tax_person": data.taxPersons, "tax_regime": data.taxRegimes, "cfdi_use": data.cfdiUses});

    console.log("🚀 All data uploaded successfully.");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
}

uploadTaxCatalogs();
