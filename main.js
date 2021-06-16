// import { logger } from 'log'
import URLSearchParams from 'url-search-params';
// import { createResponse } from 'create-response';
import { getRecordFromFakeKV } from 'data.js';
import { getDeviceType, evaluateIt } from 'evaluate.js'

const version = '0.45';

export function onClientRequest (request) {
    const params = new URLSearchParams(request.query)
    const publisherId = params.get('publisherId');
    const profileGroupId = params.get('profileGroupId');
    const kvKeyName = publisherId + '___' + profileGroupId;
    const deviceType = getDeviceType(request);
    // const deviceType = "UNKNOWN DEVICE";
    const dataFromKV = getRecordFromFakeKV(kvKeyName);
    // const dataFromKV = {};
    const op = evaluateIt(request, dataFromKV || {});
    // const op = buzz();

    request.respondWith(
        200, 
        {},
        `<html>
            <body>
                <h1>Harshad: Hackathon 2021!</h1>
                version: ${version}<br>
                publisherId: ${publisherId}<br>
                profileGroupId: ${profileGroupId}<br>
                kvKeyName: ${kvKeyName}<br>
                deviceType: ${deviceType}<br>
                dataFromKV: ${JSON.stringify(dataFromKV)}<br>
                op: ${JSON.stringify(op)}
            </body>
        </html>`
    );
}

// export async function responseProvider(request) {
//     const params = new URLSearchParams(request.query)
//     const publisherId = params.get('publisherId');
//     const profileGroupId = params.get('profileGroupId');
//     const kvKeyName = publisherId + '___' + profileGroupId;
//     // const deviceType = getDeviceType(request);
//     // const dataFromKV = getRecordFromFakeKV(kvKeyName);
//     // const op = evaluate(request, dataFromKV);
    
//     var data = "NOTHING!!!"; 

//     return createResponse(
//         200,
//         {'Content-Type':['text/html;charset=utf-8']},
//         // `hello world... Chashma!!! ${version}!<br>${data}`
//         `<html>
//             <body>
//                 <h1>Harshad: Hackathon 2021... LOLZZ!</h1>
//                 version: ${version}<br>
//                 data: ${data}<br>
//                 publisherId: ${publisherId}<br>
//                 profileGroupId: ${profileGroupId}<br>
//                 kvKeyName: ${kvKeyName}<br>                    
//             </body>
//         </html>`
//     );
// }