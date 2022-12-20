import { Step, StepButton, Stepper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";

interface IStepBase {
    id: number;
    label: string;
    description: string;
}

interface IStepCustom {
    steps: IStepBase[];
    activeStep: number;
    handleOnClick(index: number): void;
    isCompleted(index: number): boolean;
}

const StepCustom = ({ steps, activeStep, handleOnClick, isCompleted }: IStepCustom) => {
    const { t } = useTranslation();

    return (
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((step, index) => {
                return (
                    <Step key={step.id} completed={isCompleted(index)}>
                        <StepButton color="inherit" onClick={() => handleOnClick(index)}>
                            <Typography>{t(step.label)}</Typography>
                            <Typography variant="caption">{t(step.description)}</Typography>
                        </StepButton>
                    </Step>
                )
            })
            }
        </Stepper>
    )
}

export default StepCustom;