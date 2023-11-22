import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';


function SideBar({name,Today,remainingTime,nextPrayer}){
 
    
    return(
        
        <>
            <Grid container style={{width:'100%'}}>
                <Grid xs={6}>
                    <h1>{name}</h1>
                    <h3>{Today} </h3>
                </Grid>
                <Grid xs={6}>
                <h2>يبقى حتى صلاة {nextPrayer.displayName}</h2>
                <h3>{remainingTime}</h3>
                </Grid>
            </Grid>

            <Divider variant="middle" />
        </>
      
    )
}

export default SideBar