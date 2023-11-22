import { Stack } from "@mui/material";

import * as React from 'react';

import SideBar from "./SideBarTimes";
import TimeCard from "./TimeCards";

import Asr from  '../Images/Asr.png'
import Duhhr from  '../Images/dhhr.png'
import sunset from  '../Images/sunset.png'
import Fajr from  '../Images/fajr.png'
import Isha from  '../Images/night.png'
import CitySelect from "./SelctCity";
import { useEffect, useState } from "react";


import moment, { duration } from "moment/moment";
import 'moment/locale/ar-dz'


// Select
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// Select

export default function PrayerApp ()
{
    
    const [times, setTimes ] =useState([])

    const [name , setname] = React.useState({
        displayName : 'وجدة',
        apiName :'Oujda-Angad'
    })

    const [Today , setToDay ] = useState('')

    const [nextParyerIndex, setnextParyerIndex] = useState(3)

    const [remainingTime,setremainingTime] =useState('')
 
    const GetData = ()=>{
        
        fetch(`https://api.aladhan.com/v1/calendarByCity?country=MA&city=${name.apiName}`)
        .then((data)=> data.json())
        .then((res)=>{
            console.log(res.data)
            for (let i=0 ; i<res.data.length ; i++){
                return setTimes(res.data[i].timings)
            }
            
        }) 
        
    }

    useEffect(()=>{
            
            GetData()
        
    },[name])

    let PrayerNames = [
        {key:'Fajr' , displayName:'ٱلفجر'},
        {key:'Dhuhr' , displayName:'ٱاظهر'},
        {key:'Asr' , displayName:'ٱلعصر'},
        {key:'Maghrib' , displayName:'ٱلمغرب'},
        {key:'Isha' , displayName:'ٱلعشاء'},
    ]

// To solve the problem of the rerender 
    useEffect(()=>{

            const t =moment()
            setToDay(t.format('LLLL'))
            
           let getTimer =  setInterval(()=>{

                console.log('hello')

                setUpCountDownTimer()

            },1000)

            return () =>{
             clearInterval(getTimer)
            }

    },[times])

   const  setUpCountDownTimer = () => {

        let momentNow = moment()

        let NextPrayer = 1
        if(momentNow.isAfter(moment(times['Fair'],'hh:mm')) && momentNow.isBefore(moment(times['Dhuhr'],'hh:mm')))
        {
            NextPrayer = 1
        }
        else if(momentNow.isAfter(moment(times['Dhuhr'],'hh:mm')) && momentNow.isBefore(moment(times['Asr'],'hh:mm')))
        {
            NextPrayer = 2
        }
        else if(momentNow.isAfter(moment(times['Asr'],'hh:mm')) && momentNow.isBefore(moment(times['Maghrib'],'hh:mm')))
        {
            NextPrayer = 3
        }
        else if(momentNow.isAfter(moment(times['Maghrib'],'hh:mm')) && momentNow.isBefore(moment(times['Isha'],'hh:mm')))
        {
            NextPrayer = 4
        }
        else{
            NextPrayer = 0
        }
       setnextParyerIndex(NextPrayer)
        

       let nextPrayerTime = PrayerNames[NextPrayer]

      
       
       CountDownTimer(NextPrayer,momentNow)
        
    }

    // Now after we knew what the name of he next prayer is we can make the countDown timer from the prayer time

    const CountDownTimer =(prayerIndex,momentNow)=>{

        const nextPrayerObject = PrayerNames[prayerIndex]
        let nextPrayerTime = times[nextPrayerObject.key]
        const nextPrayerTimeMoment = moment(nextPrayerTime,'hh:mm')
        
        let remainingTime =moment(nextPrayerTime,'hh:mm').diff(momentNow)

        if(remainingTime<0){
            const midNightDiff = moment('23:59:59','hh:mm:ss').diff(momentNow)
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
                moment('00:00:00','hh:mm:ss')
            )

            const TotaDiffrence = midNightDiff+fajrToMidnightDiff

            remainingTime=TotaDiffrence
        }
        
        const durationreminigTime = moment.duration(remainingTime)

        setremainingTime(` 
        ${durationreminigTime.seconds()} :
        ${durationreminigTime.minutes()} :
        ${durationreminigTime.hours()} 
        `)
        
    }
    // Select //

    
   let getNames=[
        {
            id:0,
            displayName : 'وجدة',
            apiName :'Oujda-Angad'
        },
        {
            id:1,
            displayName : 'الرباط',
            apiName :'Rabat-Salé-Kénitra'
        },
        {
            id:2,
            displayName : 'طنجة',
            apiName :'Tanger-Tétouan-Al Hoceïma'
        }
   ] 

    const handleCityChange = (event) => {
        const setCities = getNames.find((citie)=>{
         return citie.apiName == event.target.value
        })

        setname(setCities)
        
    };

    
    return(
        <>
           <SideBar
            name={name.displayName }
            timeOfDay={times}
            Today={Today}
            nextPrayer={PrayerNames[nextParyerIndex]}
            remainingTime={remainingTime}
            />

           <Stack direction='row' display={"flex"} justifyContent={"space-around"} marginTop={'10px'}> 


            <TimeCard name={'ٱلفجر'}  times={times.Fajr} PrayerImage={Duhhr}/>
            <TimeCard name={'ٱاظهر'}  times={times.Dhuhr} PrayerImage={Fajr}/>
            <TimeCard name={'ٱلعصر '} times={times.Asr} PrayerImage={Asr}/>
            <TimeCard name={'ٱلمغرب'} times={times.Maghrib} PrayerImage={sunset}/>
            <TimeCard name={'ٱلعشاء'} times={times.Isha} PrayerImage={Isha}/>
            
           </Stack>


           {/* <CitySelect /> */}

           {/* SelectCity */}

           

     
            <Box sx={{ minWidth: 120 }} style={{marginTop:'50px'}}>
                <FormControl style={{width:'300px'}}>
                <InputLabel id="demo-simple-select-label" style={{fontSize:'20px',fontWeight:'bold'}}>ٱلمدينة</InputLabel>
                    <Select
                        style={{fontSize:'20px'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label='ٱلمدينة'
                        value={name.apiName}
                        onChange={handleCityChange}
                    >
                        {
                            getNames.map((city)=>{
                                return  <MenuItem value={city.apiName} key={city.id}>{city.displayName}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
           
        </>
    )
}
