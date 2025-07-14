import * as admin from 'firebase-admin'
import fs from 'fs';
import * as path from 'path';

const PROJECT_ID = process.env.PROJECT_ID; 
const SERVICE_ACCOUNT_KEY_PATH = './firebase_keys/firebase-key.json';

const serviceAccount = require(path.resolve(SERVICE_ACCOUNT_KEY_PATH));

function getTemplate() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: PROJECT_ID,
    }, 'instance');
    var config = admin.remoteConfig(admin.app('instance'));
    config.getTemplate()
        .then(function (template) {
            console.log('ETag from server: ' + template.etag);
            var templateStr = JSON.stringify(template);
            fs.writeFileSync('remote_config_keys.json', templateStr);
        })
        .catch(function (err) {
            console.error('Unable to get template');
            console.error(err);
        });
}

getTemplate();