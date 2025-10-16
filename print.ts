import * as fs from 'fs';


const rawData = fs.readFileSync('amenities_addavolt.json', 'utf-8');
const data = JSON.parse(rawData);
let list: string = "";
// console.log(data.keys());
for(const key in data){
    console.log(key)
    list += key + ", \n";
}
fs.writeFileSync('amenities_list.json', list);