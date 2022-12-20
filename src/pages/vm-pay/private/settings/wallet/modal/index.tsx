import { Box, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppStore } from "../../../../../../redux/IAppStore";
import DialogTitleCustom from "../../../../../../component/dialog/dialogTitle";
import StepCustom from "../../../../../../component/step";
import BottomButton from "../../../../../../component/step/bottomButton";
import { IWallet } from "../../../../../../redux/ducks/pay/wallet/types";
import { GetWalletDetail, GetWalletSteps, GetWalletInput, getWalletParam } from "../../../../../../redux/ducks/pay/walletDetail/actions";
import SkeletonCustom from '../../../../../../component/skeleton'
import StepTenant from "../steps/tenant";
import StepDataCapture from "../steps/capture";
import StepStore from "../steps/store";
import StepParam from "../steps/param";


interface IWalletModalConfig {
    handleClose(): void;
    wallet: IWallet | null;
}

const stepsWallet = [
    { id: 1, label: 'wallet.steps.tenant.title', description: 'wallet.steps.tenant.description' },
    { id: 2, label: 'wallet.steps.question.title', description: 'wallet.steps.question.description' },
    { id: 3, label: 'wallet.steps.store.title', description: 'wallet.steps.store.description' },
    { id: 4, label: 'wallet.steps.param.title', description: 'wallet.steps.param.description' }
]

const WalletModalConfig = ({ handleClose, wallet }: IWalletModalConfig) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { walletDetail, profile } = useSelector((app: AppStore) => app);

    useEffect(() => {
        if (wallet) {
            dispatch(GetWalletDetail(wallet.tenantId));
            dispatch(GetWalletInput());
            dispatch(GetWalletSteps(wallet.walletId));
            dispatch(getWalletParam(wallet.walletId));
        }
    }, []);

    useEffect(() => {
        if (walletDetail.awaitConfirm) {
            onNext();
        }
    }, [walletDetail.awaitConfirm])

    //----------------------
    const [activeStep, setActiveStep] = useState(0);
    const [statusStep, setStatusStep] = useState({ valid: false, updated: false, loading: false, confirm: false })
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});


    const onNext = () => {
        if (activeStep == (stepsWallet.length - 1)) {
            handleClose();
        } else {
            handleNext();
        }
    }

    const handleNext = () => {
        setStatusStep({ ...statusStep, valid: false, updated: false, loading: false, confirm: false });
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => {
        if (statusStep.valid && !statusStep.updated && !statusStep.confirm) {
            setActiveStep(step);
        }
    };

    const handleCompleted = () => {
        if (statusStep.updated) {
            setStatusStep({ ...statusStep, confirm: true, loading: true });
        } else {
            onNext();
        }
    };

    const handleCompletedStep = (index: number) => {
        return completed[index];
    }

    const handleCheckValues = (valid: boolean, updated: boolean) => {
        setStatusStep({ ...statusStep, valid, updated })
    }

    const renderContent = (step: number) => {
        const stepObj = stepsWallet[step];
        if (walletDetail.loading) {
            return (
                <SkeletonCustom />
            )
        } else {
            return (
                <Box sx={{ mt: 2, mb: 2 }}>
                    {stepObj.id == 1 &&
                        <StepTenant tenant={walletDetail.dataWallet.tenant}
                            updateValues={statusStep.confirm}
                            permission={profile.userInfo.permissions}
                            checkValues={handleCheckValues}>
                        </StepTenant>}
                    {stepObj.id == 2 &&
                        <StepDataCapture
                            tenantId={walletDetail.dataWallet.tenant.id}
                            permission={profile.userInfo.permissions}
                            processes={walletDetail.dataWallet.processes}
                            inputs={walletDetail.inputData.input}
                            steps={walletDetail.stepsData.steps}
                            updateValues={statusStep.confirm}
                            checkValues={handleCheckValues}
                        />

                    }
                    {stepObj.id == 3 &&
                        <StepStore
                            tenantId={walletDetail.dataWallet.tenant.id}
                            stores={walletDetail.dataWallet.stores}
                            updateValues={statusStep.confirm}
                            permission={profile.userInfo.permissions}
                            checkValues={handleCheckValues}
                        />

                    }
                    {stepObj.id == 4 &&
                        <StepParam
                            tenantId={walletDetail.dataWallet.tenant.id}
                            params={walletDetail.dataWallet.params}
                            permission={profile.userInfo.permissions}
                            paramsConfig={walletDetail.paramsData.params}
                            updateValues={statusStep.confirm}
                            checkValues={handleCheckValues}
                        />

                    }
                </Box>
            )
        }
    }
    const renderSteps = () => {
        return (
            <Box sx={{ width: '100%', pr: 5, pl: 5, flex: 4 }}>
                <StepCustom
                    activeStep={activeStep} steps={stepsWallet}
                    handleOnClick={handleStep} isCompleted={handleCompletedStep} />
                <Divider />
                {renderContent(activeStep)}
                <BottomButton
                    activeStep={activeStep}
                    isLoading={statusStep.loading}
                    isUpdated={statusStep.updated}
                    isValid={!statusStep.valid}
                    length={stepsWallet.length - 1}
                    handleBack={handleBack}
                    handleCompleted={handleCompleted}
                />
            </Box>
        )
    }

    return (
        <Paper sx={{ minHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 0.1 }}>
                <DialogTitleCustom id="customized-dialog-title" onClose={handleClose}>
                    <Typography align="center" variant="h5">
                        {`ID ${wallet?.walletId} - ${t('wallet.title')} [${wallet?.wallet}]`}
                    </Typography>
                </DialogTitleCustom>
            </Box>
            {renderSteps()}
        </Paper>
    )
};



export default WalletModalConfig;