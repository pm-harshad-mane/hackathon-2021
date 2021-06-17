const DEFAULT = 'DEFAULT';
const geoPreference = ['country', 'region', 'DEFAULT']; // ['zip', 'city', 'state', 'country', 'region', 'DEFAULT']
// const deviceTypePreference = ['desktop', 'mobile', 'tablet', 'DEFAULT'];

function evaluateGeo(userLocation, inputData){    
    var output = null;
    // evaluate as per geoPreference
    geoPreference.some(function(geoPreferenceEntity){
        if(geoPreferenceEntity === DEFAULT){
            if(inputData.hasOwnProperty(geoPreferenceEntity) === true){
                output = inputData[geoPreferenceEntity];
                return true;
            } else {
                return false;
            }            
        } else {
            // check if geoPreferenceEntity like country is present in inputData
            if(inputData.hasOwnProperty(geoPreferenceEntity) === true){
                // check if geoPreferenceEntity specific record (as per userLocation) is present in inputData 
                if(inputData[geoPreferenceEntity].hasOwnProperty(userLocation[geoPreferenceEntity]) === true){
                    output = inputData[geoPreferenceEntity][userLocation[geoPreferenceEntity]];
                    return true;    
                } else {
                    return false
                }                
            } else {
                return false;
            }
        }
    });

    return output;
}

export function evaluateIt(request, inputData){
    // return {"say": "evaluateIt.."}
  var output = null;
  output = evaluateGeo(request.userLocation, inputData);

  // output should NOT be null now
  if(output === null){
      return null;
  }

  const deviceType = getDeviceType(request);
  if(output.hasOwnProperty("deviceType") === false){
    return null;
  }

  if(output["deviceType"].hasOwnProperty(deviceType) === true){
    return output["deviceType"][deviceType];
  }

  if(output["deviceType"].hasOwnProperty("UNKNOWN") === true){
    return output["deviceType"]["UNKNOWN"];      
  }
  
  return null;
}

export function buzz(){
    return {"say": "Buzz"};
}

export function getDeviceType(request){
  var deviceType = 'DEFAULT'; // desktop / mobile / tablet / DEFAULT
  if(request.device.isTablet === false && request.device.isMobile === false){
      deviceType = 'desktop';
  } else if (request.device.isMobile === true){
      deviceType = 'mobile';
  } else if(request.device.isTablet === true){
      deviceType = 'tablet';
  }
  return deviceType
}

// export { getDeviceType, evaluateIt };