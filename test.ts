import * as admin from 'firebase-admin'
import fs from 'fs';
import * as path from 'path';

const serviceAccount = require(path.resolve('./firebase_keys/firebase-key.json'));

function getTemplate() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount), 
      projectId: 'hled-production',
    }, 'instance');  
    var config = admin.remoteConfig(admin.app('hled-production'));
  config.getTemplate()
      .then(function (template) {
        console.log('ETag from server: ' + template.etag);
        var templateStr = JSON.stringify(template);
        fs.writeFileSync('config.json', templateStr);
      })
      .catch(function (err) {
        console.error('Unable to get template');
        console.error(err);
      });
}

getTemplate();