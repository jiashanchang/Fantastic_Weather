let hourInfoRecords=null;
const iconAndImgData={
    01: ["sun", "morning_sun"],
    02: ["cloudy", "morning_partly_cloudy"],
    03: ["cloudy", "morning_partly_cloudy"],
    04: ["cloud", "morning_cloudy"],
    05: ["cloud", "morning_cloudy"],
    06: ["cloud", "morning_cloudy"],
    07: ["cloud", "morning_cloudy"],
    24: ["cloud", "morning_cloudy"],
    25: ["cloud", "morning_cloudy"],
    26: ["cloud", "morning_cloudy"],
    27: ["cloud", "morning_cloudy"],
    28: ["cloud", "morning_cloudy"],
    08: ["rain", "morning_light_rain"],
    09: ["rain", "morning_light_rain"],
    10: ["rain", "morning_light_rain"],
    11: ["rain", "morning_light_rain"],
    13: ["rain", "morning_light_rain"],
    14: ["rain", "morning_light_rain"],
    17: ["rain", "morning_light_rain"],
    20: ["rain", "morning_light_rain"],
    29: ["rain", "morning_light_rain"],
    31: ["rain", "morning_light_rain"],
    32: ["rain", "morning_light_rain"],
    38: ["rain", "morning_light_rain"],
    39: ["rain", "morning_light_rain"],
    12: ["sun_rain", "morning_light_rain"],
    16: ["sun_rain", "morning_light_rain"],
    19: ["sun_rain", "morning_light_rain"],
    30: ["sun_rain", "morning_light_rain"],
    15: ["thunderstorm", "heavy_rain"],
    18: ["thunderstorm", "heavy_rain"],
    21: ["thunderstorm", "heavy_rain"],
    22: ["thunderstorm", "heavy_rain"],
    33: ["thunderstorm", "heavy_rain"],
    34: ["thunderstorm", "heavy_rain"],
    35: ["thunderstorm", "heavy_rain"],
    36: ["thunderstorm", "heavy_rain"],
    41: ["thunderstorm", "heavy_rain"]
};

const countyIds={
    "F-D0047-003":"宜蘭縣",
    "F-D0047-007":"桃園市",
    "F-D0047-011":"新竹縣",
    "F-D0047-015":"苗栗縣",
    "F-D0047-019":"彰化縣",
    "F-D0047-023":"南投縣",
    "F-D0047-027":"雲林縣",
    "F-D0047-031":"嘉義縣",
    "F-D0047-035":"屏東縣",
    "F-D0047-039":"臺東縣",
    "F-D0047-043":"花蓮縣",
    "F-D0047-047":"澎湖縣",
    "F-D0047-051":"基隆市",
    "F-D0047-055":"新竹市",
    "F-D0047-059":"嘉義市",
    "F-D0047-063":"臺北市",
    "F-D0047-067":"高雄市",
    "F-D0047-071":"新北市",
    "F-D0047-075":"臺中市",
    "F-D0047-079":"臺南市",
    "F-D0047-083":"連江縣",
    "F-D0047-087":"金門縣",
}

const countryIds3HR={
    "基隆市":"F-D0047-049",
    "臺北市":"F-D0047-061",
    "新北市":"F-D0047-069",
    "桃園市":"F-D0047-005",
    "新竹市":"F-D0047-053",
    "新竹縣":"F-D0047-009",
    "苗栗縣":"F-D0047-013",
    "臺中市":"F-D0047-073",
    "彰化縣":"F-D0047-017",
    "南投縣":"F-D0047-021",
    "雲林縣":"F-D0047-025",
    "嘉義縣":"F-D0047-029",
    "嘉義市":"F-D0047-057",
    "高雄市":"F-D0047-065",
    "臺南市":"F-D0047-077",  
    "屏東縣":"F-D0047-033",
    "宜蘭縣":"F-D0047-001",
    "花蓮縣":"F-D0047-041",
    "臺東縣":"F-D0047-037",
    "澎湖縣":"F-D0047-045",
    "連江縣":"F-D0047-081",
    "金門縣":"F-D0047-085",
  }

const hourInfo=document.querySelector(".hourInfo");
const countyId=document.getElementById("country-list");
countyId.addEventListener("change", getValue);
  
function getValue(event){
    const selectedValue=event.target.value;
    locationName=countyIds[selectedValue];
    hourInfo.innerHTML="";
    fetchHourInfo(locationName);
    let countryId=countryIds3HR[locationName];
    fetchHourInfoForTown(countryId);
    
}

function fetchHourInfo(locationName){
    fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${CWB_API_KEY}&locationName=${locationName}`).then((response)=>{
	    return response.json();
    }).then((data)=>{
        hourInfoRecords=data.records;
        renderHourForecast();
    })
    .catch((error)=>{
        console.error(error);
    })
}

function fetchHourInfoForTown(countryIds){   //selectedValue=F-D0047-085
    let src = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${CWB_API_KEY}&locationId=${countryIds}`
    fetch(src).then((response)=>{
        return response.json();
    }).then((data)=>{
        let hourInfoRecords=data.records;
        let locationArry=hourInfoRecords.locations[0].location;
        townArryLoad(locationArry);
    })
    .catch((error)=>{
        console.error(error);
    })
}

function renderHourForecast(){
    const hourInfo=document.querySelector(".hourInfo");

    const time=new Date();
    let getHour=time.getHours(); 

    //天氣現象>圖
    const weatherPattern=hourInfoRecords.locations[0].location[0].weatherElement[1].time[0].elementValue[1].value;
    const weatherPatternValue=Number(weatherPattern);

    //溫度
    const T=hourInfoRecords.locations[0].location[0].weatherElement[3].time[0].elementValue[0].value;

    //降雨機率
    // const rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[0].elementValue[0].value;

    //container
    const hourInfoContainer=document.createElement("div");
          hourInfoContainer.className="hourInfo__container";
    const TTimeDiv=document.createElement("div");
          TTimeDiv.className="hourInfo__time infoBold";
    const iconDiv=document.createElement("div");
          iconDiv.className="hourInfo__iconBox";
    const iconImg=document.createElement("img");
          iconImg.className="hourInfo__icon";
    // const rain6hDDiv=document.createElement("div");
    const TDiv=document.createElement("div");
          TDiv.className="hourInfo__temp infoBold";

    //div內容
    TTimeDiv.innerText="現在";
    const icon=iconAndImgData[weatherPatternValue][0];  
    if (getHour>=3 && getHour<6 && icon==="sun"){
        iconImg.src="image/icon/sunrise.png";
    }else if(getHour>=0 && getHour<3 && icon==="sun"){
        iconImg.src="image/icon/moon.png";
    }else if(getHour>=15 && getHour<18 && icon==="sun"){
        iconImg.src="image/icon/sunset.png";
    }else if(getHour>=18 && getHour<24 && icon==="sun"){
        iconImg.src="image/icon/moon.png";
    }else if(getHour<3 && icon==="cloud"){
        iconImg.src="image/icon/moon_cloud.png";
    }else if(getHour>=18 && getHour<24 && icon==="cloud"){
        iconImg.src="image/icon/moon_cloud.png";
    }else if(getHour<6 && icon==="sun_rain"){
        iconImg.src="image/icon/moon_rain.png";
    }else if(getHour>=18 && getHour<24 && icon==="sun_rain"){
        iconImg.src="image/icon/moon_rain.png";
    }else{
        iconImg.src=`image/icon/${icon}.png`;
    }
    // rain6hDDiv.innerText=rain6h+"%";
    TDiv.innerText=T+"°";

    //設定背景圖   
    const backgroundImg=iconAndImgData[weatherPatternValue][1];
    if (getHour>=5 && getHour<9 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/early_morning_sun.jpg')";
    }else if (getHour>=16 && getHour<19 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/evening_sun.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/night.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_partly_cloudy"){
        document.documentElement.style.backgroundImage="url('image/background/night_partly_cloudy.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_cloudy"){
        document.documentElement.style.backgroundImage="url('image/background/night_cloudy.jpg')";
    }else if (getHour>=0 && getHour<5 && backgroundImg==="morning_cloudy"){
        document.documentElement.style.backgroundImage="url('image/background/night_cloudy.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_light_rain"){
        document.documentElement.style.backgroundImage="url('image/background/night_light_rain.jpg')";
    }else{
        document.documentElement.style.backgroundImage=`url('image/background/${backgroundImg}.jpg')`;
    }

    hourInfoContainer.appendChild(TTimeDiv);
    iconDiv.appendChild(iconImg);
    hourInfoContainer.appendChild(iconDiv);
    // hourInfoContainer.appendChild(rain6hDDiv);
    hourInfoContainer.appendChild(TDiv);

    hourInfo.appendChild(hourInfoContainer);

    //---------------------------------------------

    for (let i=1,j=3,k=1;i<15;i++,j+=3,k++){
        // 時間判斷
        let hour;
        let TTime;
        if (getHour<12){
            hour=getHour+j;          
            if (hour>48){
                hour=getHour+j-48;
                TTime="上午"+hour+"時";
            }else if (hour>36){
                hour=getHour+j-36;
                TTime="下午"+hour+"時";
            }
            else if (hour>24){
                hour=getHour+j-24;
                TTime="上午"+hour+"時";
            }else if (hour>12){
                hour=getHour+j-12;
                TTime="下午"+hour+"時";
            }else{
                TTime="上午"+hour+"時";
            }
        }else{
            hour=getHour+j-12;

            if (hour>48){
                hour=getHour+j-60;
                TTime="下午"+hour+"時";
            }else if (hour>36){
                hour=getHour+j-48;
                TTime="上午"+hour+"時";
            }else if (hour>24){
                hour=getHour+j-36;
                TTime="下午"+hour+"時";
            }else if (hour>12){
                hour=getHour+j-24;
                TTime="上午"+hour+"時";
            }else{
                TTime="下午"+hour+"時";
            }
        }

        //天氣現象>圖
        const weatherPattern=hourInfoRecords.locations[0].location[0].weatherElement[1].time[i].elementValue[1].value;
        const weatherPatternValue=Number(weatherPattern);

        //溫度
        const T=hourInfoRecords.locations[0].location[0].weatherElement[3].time[i].elementValue[0].value;

        //降雨機率
        // let k1=k;
        // let rain6h;
        // if (k1<2){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[0].elementValue[0].value;
        // }else if (1<k1 && k1<4){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[1].elementValue[0].value;
        // }else if (3<k1 && k1<6){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[2].elementValue[0].value;
        // }else if (5<k1 && k1<8){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[3].elementValue[0].value;
        // }else if (7<k1 && k1<10){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[4].elementValue[0].value;
        // }else if (9<k1 && k1<12){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[5].elementValue[0].value;
        // }else{
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[6].elementValue[0].value;
        // }

        //container
        const hourInfoContainer=document.createElement("div");
              hourInfoContainer.className="hourInfo__container";
        const TTimeDiv=document.createElement("div");
              TTimeDiv.className="hourInfo__time infoBold";
        const iconDiv=document.createElement("div");
              iconDiv.className="hourInfo__iconBox";
        const iconImg=document.createElement("img");
              iconImg.className="hourInfo__icon";
        // const rain6hDDiv=document.createElement("div");
        const TDiv=document.createElement("div");
              TDiv.className="hourInfo__temp infoBold";

        //div內容
        TTimeDiv.innerText=TTime;
        const icon=iconAndImgData[weatherPatternValue][0];
        let WxDate=hourInfoRecords.locations[0].location[0].weatherElement[1].time[i].startTime;
        let WxDateValue=new Date(WxDate);
        let WxHour=WxDateValue.getHours();
        if (WxHour>=3 && WxHour<6 && icon==="sun"){
            iconImg.src="image/icon/sunrise.png";
        }else if(WxHour>=0 && WxHour<3 && icon==="sun"){
            iconImg.src="image/icon/moon.png";
        }else if(WxHour>=15 && WxHour<18 && icon==="sun"){
            iconImg.src="image/icon/sunset.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="sun"){
            iconImg.src="image/icon/moon.png";
        }else if(WxHour<3 && icon==="cloud"){
            iconImg.src="image/icon/moon_cloud.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="cloud"){
            iconImg.src="image/icon/moon_cloud.png";
        }else if(WxHour<6 && icon==="sun_rain"){
            iconImg.src="image/icon/moon_rain.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="sun_rain"){
            iconImg.src="image/icon/moon_rain.png";
        }else{
            iconImg.src=`image/icon/${icon}.png`;
        }
        // rain6hDDiv.innerText=rain6h+"%";
        TDiv.innerText=T+"°";

        hourInfoContainer.appendChild(TTimeDiv);
        iconDiv.appendChild(iconImg);
        hourInfoContainer.appendChild(iconDiv);
        // TItem.appendChild(rain6hDDiv);
        hourInfoContainer.appendChild(TDiv);
    
        hourInfo.appendChild(hourInfoContainer);
    }
}

window.addEventListener("load", fetchHourInfo("臺北市"));


function townArryLoad(locationArry){
    let locationCards = document.getElementsByClassName('blockSB__container');
    for (var i = 0; i < locationCards.length; i++) {
        let self = locationCards[i];
        self.addEventListener('click', function (event){  
          let index = this.getAttribute('data-index'); //html-->data-modal="modal2"
        renderHourInfoForTown(locationArry, index);
        }, false);
    }
}

function renderHourInfoForTown(locationArry, index){
    let townData=locationArry;
    let locationIndex=index;
    const time=new Date();
    let getHour=time.getHours(); 

    hourInfo.innerHTML="";

    //天氣現象>圖
    const weatherPattern=townData[locationIndex].weatherElement[1].time[0].elementValue[1].value;
    const weatherPatternValue=Number(weatherPattern);

    //溫度
    const T=townData[locationIndex].weatherElement[3].time[0].elementValue[0].value;

    //降雨機率
    // const rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[0].elementValue[0].value;

    //container
    const hourInfoContainer=document.createElement("div");
          hourInfoContainer.className="hourInfo__container";
    const TTimeDiv=document.createElement("div");
          TTimeDiv.className="hourInfo__time infoBold";
    const iconDiv=document.createElement("div");
          iconDiv.className="hourInfo__iconBox";
    const iconImg=document.createElement("img");
          iconImg.className="hourInfo__icon";
    // const rain6hDDiv=document.createElement("div");
    const TDiv=document.createElement("div");
          TDiv.className="hourInfo__temp infoBold";

    //div內容
    TTimeDiv.innerText="現在";
    const icon=iconAndImgData[weatherPatternValue][0];  
    if (getHour>=3 && getHour<6 && icon==="sun"){
        iconImg.src="image/icon/sunrise.png";
    }else if(getHour>=0 && getHour<3 && icon==="sun"){
        iconImg.src="image/icon/moon.png";
    }else if(getHour>=15 && getHour<18 && icon==="sun"){
        iconImg.src="image/icon/sunset.png";
    }else if(getHour>=18 && getHour<24 && icon==="sun"){
        iconImg.src="image/icon/moon.png";
    }else if(getHour<3 && icon==="cloud"){
        iconImg.src="image/icon/moon_cloud.png";
    }else if(getHour>=18 && getHour<24 && icon==="cloud"){
        iconImg.src="image/icon/moon_cloud.png";
    }else if(getHour<6 && icon==="sun_rain"){
        iconImg.src="image/icon/moon_rain.png";
    }else if(getHour>=18 && getHour<24 && icon==="sun_rain"){
        iconImg.src="image/icon/moon_rain.png";
    }else{
        iconImg.src=`image/icon/${icon}.png`;
    }
    // rain6hDDiv.innerText=rain6h+"%";
    TDiv.innerText=T+"°";

    //設定背景圖   
    const backgroundImg=iconAndImgData[weatherPatternValue][1];
    if (getHour>=5 && getHour<9 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/early_morning_sun.jpg')";
    }else if (getHour>=16 && getHour<19 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/evening_sun.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_sun"){
        document.documentElement.style.backgroundImage="url('image/background/night.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_partly_cloudy"){
        document.documentElement.style.backgroundImage="url('image/background/night_partly_cloudy.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_cloudy"){
        document.documentElement.style.backgroundImage="url('image/background/night_cloudy.jpg')";
    }else if (getHour>=19 && getHour<24 && backgroundImg==="morning_light_rain"){
        document.documentElement.style.backgroundImage="url('image/background/night_light_rain.jpg')";
    }else{
        document.documentElement.style.backgroundImage=`url('image/background/${backgroundImg}.jpg')`;
    }

    hourInfoContainer.appendChild(TTimeDiv);
    iconDiv.appendChild(iconImg);
    hourInfoContainer.appendChild(iconDiv);
    // hourInfoContainer.appendChild(rain6hDDiv);
    hourInfoContainer.appendChild(TDiv);

    hourInfo.appendChild(hourInfoContainer);

    //---------------------------------------------

    for (let i=1,j=3,k=1;i<15;i++,j+=3,k++){
        // 時間判斷
        let hour;
        let TTime;
        if (getHour<12){
            hour=getHour+j;          
            if (hour>48){
                hour=getHour+j-48;
                TTime="上午"+hour+"時";
            }else if (hour>36){
                hour=getHour+j-36;
                TTime="下午"+hour+"時";
            }
            else if (hour>24){
                hour=getHour+j-24;
                TTime="上午"+hour+"時";
            }else if (hour>12){
                hour=getHour+j-12;
                TTime="下午"+hour+"時";
            }else{
                TTime="上午"+hour+"時";
            }
        }else{
            hour=getHour+j-12;

            if (hour>48){
                hour=getHour+j-60;
                TTime="下午"+hour+"時";
            }else if (hour>36){
                hour=getHour+j-48;
                TTime="上午"+hour+"時";
            }else if (hour>24){
                hour=getHour+j-36;
                TTime="下午"+hour+"時";
            }else if (hour>12){
                hour=getHour+j-24;
                TTime="上午"+hour+"時";
            }else{
                TTime="下午"+hour+"時";
            }
        }

        //天氣現象>圖
        const weatherPattern=hourInfoRecords.locations[0].location[0].weatherElement[1].time[i].elementValue[1].value;
        const weatherPatternValue=Number(weatherPattern);

        //溫度
        const T=hourInfoRecords.locations[0].location[0].weatherElement[3].time[i].elementValue[0].value;

        //降雨機率
        // let k1=k;
        // let rain6h;
        // if (k1<2){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[0].elementValue[0].value;
        // }else if (1<k1 && k1<4){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[1].elementValue[0].value;
        // }else if (3<k1 && k1<6){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[2].elementValue[0].value;
        // }else if (5<k1 && k1<8){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[3].elementValue[0].value;
        // }else if (7<k1 && k1<10){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[4].elementValue[0].value;
        // }else if (9<k1 && k1<12){
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[5].elementValue[0].value;
        // }else{
        //     rain6h=hourInfoRecords.locations[0].location[0].weatherElement[7].time[6].elementValue[0].value;
        // }

        //container
        const hourInfoContainer=document.createElement("div");
              hourInfoContainer.className="hourInfo__container";
        const TTimeDiv=document.createElement("div");
              TTimeDiv.className="hourInfo__time infoBold";
        const iconDiv=document.createElement("div");
              iconDiv.className="hourInfo__iconBox";
        const iconImg=document.createElement("img");
              iconImg.className="hourInfo__icon";
        // const rain6hDDiv=document.createElement("div");
        const TDiv=document.createElement("div");
              TDiv.className="hourInfo__temp infoBold";

        //div內容
        TTimeDiv.innerText=TTime;
        const icon=iconAndImgData[weatherPatternValue][0];
        let WxDate=hourInfoRecords.locations[0].location[0].weatherElement[1].time[i].startTime;
        let WxDateValue=new Date(WxDate);
        let WxHour=WxDateValue.getHours();
        if (WxHour>=3 && WxHour<6 && icon==="sun"){
            iconImg.src="image/icon/sunrise.png";
        }else if(WxHour>=0 && WxHour<3 && icon==="sun"){
            iconImg.src="image/icon/moon.png";
        }else if(WxHour>=15 && WxHour<18 && icon==="sun"){
            iconImg.src="image/icon/sunset.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="sun"){
            iconImg.src="image/icon/moon.png";
        }else if(WxHour<3 && icon==="cloud"){
            iconImg.src="image/icon/moon_cloud.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="cloud"){
            iconImg.src="image/icon/moon_cloud.png";
        }else if(WxHour<6 && icon==="sun_rain"){
            iconImg.src="image/icon/moon_rain.png";
        }else if(WxHour>=18 && WxHour<24 && icon==="sun_rain"){
            iconImg.src="image/icon/moon_rain.png";
        }else{
            iconImg.src=`image/icon/${icon}.png`;
        }
        // rain6hDDiv.innerText=rain6h+"%";
        TDiv.innerText=T+"°";

        hourInfoContainer.appendChild(TTimeDiv);
        iconDiv.appendChild(iconImg);
        hourInfoContainer.appendChild(iconDiv);
        // TItem.appendChild(rain6hDDiv);
        hourInfoContainer.appendChild(TDiv);
    
        hourInfo.appendChild(hourInfoContainer);
    }
}

window.addEventListener("load", fetchHourInfoForTown("F-D0047-061"));