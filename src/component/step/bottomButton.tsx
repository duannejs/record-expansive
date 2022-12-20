import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";


interface IBottomButton {
    activeStep: number;
    length: number;
    isValid: boolean;
    isLoading: boolean;
    isUpdated: boolean;
    handleBack(): void;
    handleCompleted(): void;
}


const BottomButton = ({ activeStep, length, isLoading, isUpdated, isValid, handleBack, handleCompleted }: IBottomButton) => {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false)

    const onBackButton = () => {
        if (isValid) {
            setOpen(true)
        } else {
            handleBack();
        }
    }

    const handleCloseDialog = (isConfirm: boolean) => {
        setOpen(false);
        if (isConfirm) {
            handleBack();
        }
    }

    const DialogCustom = () => (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('wallet.steps.modalCancel.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('wallet.steps.modalCancel.description')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={() => handleCloseDialog(false)}>{t('common.cancel')}</Button>
                <Button onClick={() => handleCloseDialog(true)} autoFocus>{t('common.confirm')}</Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <Box sx={{
            position: 'absolute', bottom: 0, pb: 1, width: '90%', display: 'flex', flexDirection: 'row',
            alignContent: 'center', justifyContent: 'space-around'
        }}>
            <Button variant="text" color="inherit" onClick={onBackButton} size="large" disabled={activeStep == 0 || isLoading} startIcon={<ArrowBackIosNew />}>
                {t('common.back')}
            </Button>
            <Button
                disabled={isValid}
                endIcon={activeStep != length ? <ArrowForwardIos /> : ''}
                variant="text" size="large"
                onClick={handleCompleted}>
                {activeStep == length ?
                    isUpdated ? t('common.finishAndSave') : t('common.finish')
                    : isUpdated ? t('common.nextAndSave') : t('common.next')
                }
            </Button>
            <DialogCustom />
        </Box >
    )
}


export default BottomButton;
