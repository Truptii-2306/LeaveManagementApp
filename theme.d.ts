import { ThemeOptions } from "@mui/material";
import React  from "react";

declare module '@mui/material/styles'{
    interface Theme{
        status:{
            danger:string
        }
    }
    interface ThemeOptions{
        status:{
            danger:React.CSSProperties['color']        
        }
    }
}