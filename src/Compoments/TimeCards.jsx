

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




export default function TimeCard({name,times,PrayerImage})
{

    
    return(


      <>
          
          <Grid xs={2} style={{backgroundColor:'white',width:'15%'}}>
                <Card >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={PrayerImage}
                    />
                    <CardContent>
                        <h1>
                        {name}
                        </h1>
                        <Typography variant="body1" color="text.secondary" style={{fontSize:'25px'}} >
                        {times}
                        </Typography>
                    </CardContent>
                    
                </Card>
          </Grid>

         
        
       </>
    )
}