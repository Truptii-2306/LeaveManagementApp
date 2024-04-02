import { useTheme,useMediaQuery } from "@emotion/react";

export default function UseReponsive(){
    const theme=useTheme()
    
    const responsive = {
        isMobile : useMediaQuery(theme.breakpoints.down('sm')),
        isTablet : useMediaQuery(theme.breakpoints.between('sm', 'md')),
        isLaptop :  useMediaQuery(theme.breakpoints.between('md', 'lg')),
        isDekstop : useMediaQuery(theme.breakpoints.down('lg'))
    }

    return responsive
}
