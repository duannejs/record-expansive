import { Fragment, useEffect, useState } from "react"
import { List, ListItem, Box, ListItemText, IconButton, ListSubheader, Typography, TextField, InputAdornment, MenuItem } from "@mui/material";
import { Add, DeleteOutlineOutlined, Keyboard, LiveHelp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { IWalletProcesses, IWalletSteps, IWalletStepsOpts } from "../../../../../../../redux/ducks/pay/walletDetail/types";
import { getWalletInput } from "../../../../../../../utils/functions";
import { useDispatch } from "react-redux";
import { deleteWalletProcess, putWalletProcess } from "../../../../../../../redux/ducks/pay/walletDetail/actions";


interface IStepDataCapture {
    processes: IWalletProcesses[];
    tenantId: string;
    inputs: string[];
    steps: IWalletStepsOpts[];
    children?: any;
    updateValues: boolean;
    permission: number[];
    checkValues(valid: boolean, update: boolean): void;
}



const StepDataCapture = ({ tenantId, processes, permission=[], inputs, steps, updateValues, checkValues }: IStepDataCapture) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [listUnused, setListUnused] = useState<IWalletStepsOpts[]>([]);
    const [listUsed, setListUsed] = useState<IWalletSteps[]>([]);
    const [hasPermission, setHasPermission] = useState(!permission.find((p) => p == 4003));

    useEffect(() => {
        let process = processes.find((process) => process.method == 'CONSULTAR')
        let unused = steps.filter((step) => {
            let include = true;
            if (step.required)
                return false;
            process?.steps?.forEach((pStep) => {
                if (pStep.fieldName == step.fieldName) {
                    include = false;
                }
            })
            if (include)
                return step;
        });
        setListUnused(unused);

        let used = process?.steps || [];
        steps.forEach((step) => {
            if (step.required)
                if (used.filter((usedStep) => usedStep.fieldName == step.fieldName).length == 0) {
                    used.push({ stepId: '', fieldName: step.fieldName, inputType: step.inputType, message: step.description })
                }
        })

        setListUsed(used);

    }, []);

    useEffect(() => {
        if (updateValues) {
            dispatch(putWalletProcess({ tenantId, steps: listUsed }));
        }
    }, [dispatch, tenantId, updateValues, listUsed])

    useEffect(() => {
        let process = processes.find((process) => process.method == 'CONSULTAR');
        validationValues(listUsed, steps, process)
    }, [processes, steps, listUsed]);


    const validationValues = function (list: IWalletSteps[], steps: IWalletStepsOpts[], origin?: IWalletProcesses) {
        let valid = steps.filter((origStep) => origStep.required).every((reqStep) => {
            return list.find((s) => s.fieldName == reqStep.fieldName)
        });
        if (!valid) {
            checkValues(false, false);
            return;
        }

        valid = list.every((step) => (!step.message || !step.inputType) ? false : true);
        if (!valid) {
            checkValues(false, false);
            return;
        }

        let updated = compareObjKeyValue(list, origin);
        checkValues(valid, updated);
    }

    const compareObjKeyValue = (list: IWalletSteps[], origin?: IWalletProcesses): boolean => {
        if (!origin)
            return true;

        let customToOrigin = list.every((customStep) => (origin.steps || []).find(
            (step) => step.fieldName == customStep.fieldName &&
                step.inputType == customStep.inputType &&
                step.message == customStep.message));

        let originToCustom = (origin.steps || []).every((customStep) => list.find(
            (step) => step.fieldName == customStep.fieldName &&
                step.inputType == customStep.inputType &&
                step.message == customStep.message));
        return !(customToOrigin && originToCustom);
    }

    const onChangeField = (step: IWalletSteps, value: string, field: string) => {
        let values = [...listUsed];
        let stepField = values.find((v) => v.fieldName == step.fieldName);
        if (stepField)
            stepField[field as keyof IWalletSteps] = value;
        setListUsed(values);
    }

    const addStep = (step: IWalletStepsOpts, index: number) => {
        let custom_unused = [...listUnused];
        custom_unused.splice(index, 1);
        setListUnused(custom_unused);
        setListUsed([...listUsed, { stepId: '', fieldName: step.fieldName, inputType: step.inputType, message: step.description }])
    }

    const removeStep = (step: IWalletSteps, index: number) => {
        if (step.stepId) {
            dispatch(deleteWalletProcess({ tenantId, fieldName: step.fieldName }))
        }
        let custom_used = [...listUsed];
        custom_used.splice(index, 1);
        setListUsed(custom_used);
        let default_step = steps.find((s) => s.fieldName == step.fieldName)
        if (default_step)
            setListUnused([...listUnused, default_step]);
    }

    const renderUnusedQuestions = () => (
        <Box sx={{ flex: 1, overflow: 'auto', }}>
            <List dense sx={{ maxHeight: '35vh', overflow: 'auto', pt: 0 }}>
                <ListSubheader sx={{ padding: 0, bgColor: 'background.paper', zIndex:2}}>
                    {t('wallet.steps.question.listInactive')}</ListSubheader>
                {listUnused.map((step, index) => (
                    <ListItem
                        key={step.fieldName}
                        secondaryAction={
                            <IconButton disabled={hasPermission} edge="end" aria-label="add" onClick={() => addStep(step, index)}>
                                <Add color="primary" />
                            </IconButton>
                        }>
                        <ListItemText primary={step.fieldName} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const adornment = (children: any) => {
        return {
            startAdornment: (
                <InputAdornment position="start">
                    {children}
                </InputAdornment>)
        }
    }

    const renderUsedItem = (step: IWalletSteps, index: number) => {
        let stepProps = steps.find((s) => s.fieldName == step.fieldName)
        const isDeletable = !stepProps?.required;
        const answerSelect = stepProps?.inputType;
        const isSelectFixed = stepProps?.fixedOption;

        return (
            <ListItem
                key={step.fieldName}
                secondaryAction={isDeletable &&
                    <IconButton disabled={hasPermission}  edge="end" aria-label="remove">
                        <DeleteOutlineOutlined color="error" onClick={() => removeStep(step, index)} />
                    </IconButton>
                }>
                <Typography variant='subtitle2' sx={{ flex: 1, m: 0.5 }}>{step.fieldName}</Typography>
                <TextField
                    sx={{ flex: 3, m: 0.5 }}
                    margin="none"
                    size="small"
                    disabled={hasPermission} 
                    InputProps={adornment(<LiveHelp />)}
                    value={step.message}
                    label={t('wallet.steps.question.titleField')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(step, event.target.value, 'message')}
                />
                <TextField
                    sx={{ flex: 2, m: 0.5 }}
                    margin="none"
                    select
                    size="small"
                    InputProps={adornment(<Keyboard />)}
                    value={step.inputType || answerSelect || ''}
                    disabled={hasPermission || isSelectFixed }
                    label={t('wallet.steps.question.titleSelect')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(step, event.target.value, 'inputType')}
                >
                    {inputs.map((option) => (
                        <MenuItem key={option} value={option}>
                            {t(getWalletInput(option))}
                        </MenuItem>
                    ))}
                </TextField>
            </ListItem>
        )
    }

    const renderUsedQuestions = () => (
        <Box sx={{ flex: 3.5, overflow: 'auto', pl: 2, borderLeft: 1, borderColor: "#9a9a9a", borderLeftStyle: 'dashed' }}>
            <List dense sx={{ height: '35vh', maxHeight: '35vh', overflow: 'auto', pt: 0 }}>
                <ListSubheader sx={{ padding: 0, bgColor: 'background.paper', zIndex:2 }}>{t('wallet.steps.question.listActive')}</ListSubheader>
                {listUsed.map((step, index) => renderUsedItem(step, index))}
            </List>
        </Box>
    )


    return (
        <Fragment>
            <Box sx={{ mt: 2, mb: 1, pl: 5, display: 'flex', bgColor: 'background.paper', flexDirection: 'row', justifyContent: 'space-around' }}>
                {renderUnusedQuestions()}
                {renderUsedQuestions()}
            </Box>
        </Fragment>


    )
}

export default StepDataCapture;