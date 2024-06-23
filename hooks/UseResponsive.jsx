import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function UseReponsive() {
  const theme = useTheme();

  const responsive = {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isLaptop: useMediaQuery(theme.breakpoints.between("md", "lg")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
  };

  return responsive;
}
