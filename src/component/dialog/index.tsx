import { Clear } from "@mui/icons-material";
import { Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography } from "@mui/material"

interface IDialogCustom {
    isOpen: boolean;
    children: React.ReactNode;
    fullWidth?: boolean;
    maxWidth?: Breakpoint;
    handleClose?(): void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogCustom = ({ isOpen, children, maxWidth = 'md', fullWidth = false, handleClose = () => { } }: IDialogCustom) => {

    return (<BootstrapDialog
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
    >
        {children}
    </BootstrapDialog>)
}

export default DialogCustom