function getRecordFromFakeKV(kvKeyName){
    const data = {
        "31445:::2": {
            "country": {
                "IN": {
                    "deviceType": {
                        "desktop": 130,				
                        "DEFAULT": 123
                    }
                },
                "US": {
                    "deviceType": {
                        "desktop": 130,
                        "mobile": 131,
                        "DEFAULT": 124
                    }
                },
                "AU": {
                    "deviceType": {
                        "mobile": 131,
                        "tablet": 132,
                        "DEFAULT": 125
                    }
                },
                "UK": {
                    "deviceType": {			
                        "DEFAULT": 126
                    }
                },
                "IN": {
                    "deviceType": {
                        "desktop": 130,
                        "mobile": 131,
                        "tablet": 132,
                        "DEFAULT": 127
                    }
                }
            },
            "continent": {
                "NA": {  // NORTH AMERICA
                    "deviceType": {
                        "desktop": 130,
                        "mobile": 131,
                        "tablet": 132,
                        "DEFAULT": 127
                    }
                }, 
                "AS": { // ASIA 
                    "deviceType": {
                        "desktop": 130,				
                        "DEFAULT": 123
                    }
                }
            },
            "DEFAULT": {  // this is "Rest Of the World" profile, please rename as DEFAULT 
                "deviceType": {
                    "desktop": 130,
                    "mobile": 131,
                    "tablet": 132,
                    "DEFAULT": 127
                }
            }
        }
    };

    return data[kvKeyName] || null;
}

export { getRecordFromFakeKV };