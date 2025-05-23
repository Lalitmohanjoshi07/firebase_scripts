import * as fs from 'fs';


const rawData = fs.readFileSync('connector_type.json', 'utf-8');
const data = JSON.parse(rawData);

// console.log(data.keys());
for(const key in data){
    console.log(key)
}