import { Clear } from "@mui/icons-material";
import { DialogTitle, IconButton } from "@mui/material"

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const DialogTitleCustom = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }}>
            <div>
                {children}
            </div>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Clear />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default DialogTitleCustom