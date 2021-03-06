// import { logger } from 'log'
import URLSearchParams from 'url-search-params';
// import { createResponse } from 'create-response';
import { EdgeKV } from './edgekv.js';
import { getRecordFromFakeKV } from 'data.js';
import { getDeviceType, evaluateIt } from 'evaluate.js'

const version = '0.61';

export async function onClientRequest (request) {
    const params = new URLSearchParams(request.query)
    const publisherId = params.get('publisherId');
    const profileGroupId = params.get('profileGroupId');
    const doNotRedirect = params.get('doNotRedirect');
    const kvKeyName = publisherId + '___' + profileGroupId;
    const deviceType = getDeviceType(request);
    // const dataFromKV = getRecordFromFakeKV(kvKeyName);

    const edgeKv = new EdgeKV({namespace: "ow-profile-selector", group: "pub-profile-groups"});
    // var data = "NO_DATA_FOUND";
    var dataFromKV = {};
    try {
        dataFromKV = await edgeKv.getText({
            item: kvKeyName, 
            default_value: {} 
        });
        dataFromKV = JSON.parse(dataFromKV.replace(/\\/g, ''));
    } catch (error) {
        // Catch the error and store the error message to use in a response
        // header for debugging. Use a default greeting as well in this case.
        dataFromKV = {}; // error.toString();
    }

    var op = evaluateIt(request, dataFromKV || {});

    if(op && doNotRedirect != 1){
        request.respondWith(
            302,
            {
                Location: [`https://ads.pubmatic.com/AdServer/js/pwt/${publisherId}/${op}/pwt.js`]
            },
            ''
        );
    } else {
        request.respondWith(
            200,
            {
                'Content-Type':['text/javascript;charset=utf-8'],
                'Cache-Control': 'max-age=0, must-revalidate'
            },
            `
                /*
                Harshad: Hackathon 2021!!
                version: ${version}
                publisherId: ${publisherId}
                profileGroupId: ${profileGroupId}
                kvKeyName: ${kvKeyName}
                deviceType: ${deviceType}
                dataFromKV: ${JSON.stringify(dataFromKV)}
                request.userLocation: ${JSON.stringify(request.userLocation)}
                op: ${op}
                */
            `
        );
    }

    
}

// export async function responseProvider(request) {
//     const params = new URLSearchParams(request.query)
//     const publisherId = params.get('publisherId');
//     const profileGroupId = params.get('profileGroupId');
//     const kvKeyName = publisherId + '___' + profileGroupId;
//     const deviceType = getDeviceType(request);
//     // const dataFromKV = getRecordFromFakeKV(kvKeyName);

//     const edgeKv = new EdgeKV({namespace: "ow-profile-selector", group: "pub-profile-groups"});
//     // var data = "NO_DATA_FOUND";
//     var dataFromKV = {};
//     try {
//         dataFromKV = await edgeKv.getText({
//             item: kvKeyName, 
//             default_value: {} 
//         });
//         // dataFromKV = JSON.parse(dataFromKV);
//     } catch (error) {
//         // Catch the error and store the error message to use in a response
//         // header for debugging. Use a default greeting as well in this case.
//         dataFromKV = {}; // error.toString();
//     }

//     const op = evaluateIt(request, dataFromKV || {});
    
//     return createResponse(
//         200,
//         {
//             'Content-Type':['text/html;charset=utf-8'],
//             'Cache-Control': 'max-age=0, must-revalidate'
//         },
//         `<html>
//             <body>
//                 <h1>Harshad: Hackathon 2021!!</h1>
//                 version: ${version}<br>
//                 publisherId: ${publisherId}<br>
//                 profileGroupId: ${profileGroupId}<br>
//                 kvKeyName: ${kvKeyName}<br>
//                 deviceType: ${deviceType}<br>
//                 dataFromKV: ${JSON.stringify(dataFromKV)}<br>
//                 op: ${JSON.stringify(op)}
//             </body>
//         </html>`
//     );
// }