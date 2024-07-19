import 'dotenv/config'
import { defineConfig } from '@hey-api/openapi-ts';

// console.log('API_URL', process.env.API_URL)
// fetch(process.env.API_URL + '/doc-json',).then(async (res) => {
// if (!error && response.statusCode === 200) {
// const spec = JSON.stringify(await res.json());
// fs.writeFileSync("./openapi.json", spec);
export default defineConfig({
    client: 'fetch',
    input: `${process.env.API_URL}/doc-json`,
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: 'api/client',
    },
    exportCore: true
    //dates: true,
   // enum: 'typescript',
})
// } else {
//     console.error("Could not get the spec json.");
// }
// }).catch(e => {
//     console.error("Could not get the spec json.", e);
// });