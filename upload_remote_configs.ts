import fs from 'fs';
import axios from 'axios';
import * as admin from 'firebase-admin'
import * as path from 'path';


const PROJECT_ID = 'hled-production'; // <-- replace this
const SERVICE_ACCOUNT_KEY_PATH = './firebase_keys/firebase-key.json';

const CONFIG_FILE = './remote_config_keys.json';

const serviceAccount = require(path.resolve(SERVICE_ACCOUNT_KEY_PATH));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: PROJECT_ID, // optional if in JSON
    }, 'instance');
}

// Function to publish Remote Config template from local JSON
async function publishTemplate() {
    const config = admin.remoteConfig(admin.app('instance'));

    try {
        const remoteTemplate = await config.getTemplate();
        const fileContents = fs.readFileSync(CONFIG_FILE, 'utf8');
        const localTemplate = config.createTemplateFromJSON(fileContents);
        remoteTemplate.parameters = {
            ...localTemplate.parameters,
            ...remoteTemplate.parameters,
        };

        if (localTemplate.conditions) {
            remoteTemplate.conditions = localTemplate.conditions;
        }
        config.publishTemplate(remoteTemplate)
            .then(updatedTemplate => {
                console.log('Template has been published.');
                console.log('ETag from server:', updatedTemplate.etag);
            })
            .catch(err => {
                console.error('Unable to publish template.');
                console.error(err.message);
            });

    } catch (err) {
        console.error('Failed to read or parse config.json:', err);
    }
}

publishTemplate();