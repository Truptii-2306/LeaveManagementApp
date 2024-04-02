import {Grid,List } from '@mui/material'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

const annualLeaves=[
    {date:"01/01/2024",day:"Monday",occasion:"New Yaar"},
    {date:"26/01/2024",day:"Friday",occasion:"Republic Day"},
    {date:"25/03/2024",day:"Monday",occasion:"Holi"},
    {date:"01/05/2024",day:"Wednesday",occasion:"May Day"},
    {date:"15/08/2024",day:"Thursday",occasion:"Inependence Day"},
    {date:"07/09/2024",day:"Saturday",occasion:"Ganesh Chaturthi"},
    {date:"02/10/2024",day:"Wednesday",occasion:"Mahatma Gandhi Jayanti"},
    {date:"12/10/2024",day:"Saturday",occasion:"Dusshera"},
    {date:"01/11/2024",day:"Friday",occasion:"Diwali"},
    {date:"25/12/2024",day:"Wednesday",occasion:"Christmas Day"}
]

export default function Holidays(){
    return(
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width="100%" pt="20vh">
            <List>
                {annualLeaves.map(
                    (date,day,occasion,index)=>(
                        <ListItem key={index}>
                           
                        </ListItem>
                    )
                )}
                
            </List>
        </Grid>
    )
}
