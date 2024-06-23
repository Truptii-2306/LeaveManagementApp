import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box,Divider} from '@mui/material'
import {Typography} from '@mui/material';
import {Card,CardContent} from "@mui/material";

export default function LeavePolicy() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (paper) => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
        <Card>
            <CardContent>
            <Typography fontWeight={"bold"}>
                FAQ ?
            </Typography>
            </CardContent>
            <Divider/>

            <Box p={1.6}>
            <Typography  bgcolor={"#f5f5f5"} p={"1%"} mb={1} borderRadius={"5px"} onClick={handleClickOpen('paper')} sx={{cursor:"pointer"}}>What about leave policy ?</Typography>
            <a href="https://ayssoftwaresolution.com/" target="_blank" rel="noopener noreferrer">
            <Typography  bgcolor={"#f5f5f5"} p={"1%"} borderRadius={"5px"} sx={{cursor:"pointer"}}>About</Typography>
            </a>
            </Box>

        </Card> 
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="scroll-dialog-title">Leave Policy</DialogTitle>
        <Divider/>
        <DialogContent sx={{scrollbarWidth:"thin"}}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            <Typography textAlign={"justify"}>
              1. Annual Leave:
                Full-time employees: 1- days of paid annual leave per calendar year.
                Part-time employees: Entitlement prorated based on contracted hours.
                Request and approval: Through company's leave management system.
                Carryover: Unused annual leave up to 10 days allowed; excess forfeited.
                <br/>
              2. Sick Leave:
                Full-time employees: 10 days of paid sick leave per calendar year.
                Usage: For personal illness, injury, medical appointments, or caring for ill family members.
                Part-time employees: Entitlement prorated based on contracted hours.
                Notification: Employees must inform supervisor or HR department promptly.
                Certification: Doctor's certificate may be required for sick leave exceeding 10 consecutive days.
                <br/>
              3. Bereavement Leave: 
                Entitlement: 5 days of paid bereavement leave for the death of an immediate family member.
                Additional leave: Unpaid leave may be granted for other relatives or close relationships, at management's discretion.
              <br/>  
              4. Public Holidays:
                Recognition: [List of public holidays] are considered paid holidays.
                Compensation: Employees working on public holidays entitled to compensatory time off or holiday pay as per company policy.
                <br/>
              5. Maternity/Paternity Leave:
                Compliance: Policies adhere to local laws and regulations.
                Details: Maternity/paternity leave entitlements, duration, pay, and eligibility align with local laws and company policy.
                <br/>
              6. Unpaid Leave:
                Request: Employees may seek unpaid leave for personal reasons.
                Approval: Subject to supervisor and HR department approval.
                Granting: At management's discretion, considering business needs and employee performance.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}