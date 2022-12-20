import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToastHide } from "../../redux/ducks/component/actions";
import { AppStore } from "../../redux/IAppStore"


const SnackBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const component = useSelector((app: AppStore) => app.componentError);
    return (
        <>
            <Snackbar open={component.display}
                style={{ marginTop: 70 }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={7000}
                onClose={() => { dispatch(ErrorToastHide()) }}>
                <Alert severity={component.type == 1 ? "error" : 'info'}>
                    <AlertTitle>{t(component.title)}</AlertTitle>
                    {t(component.message)}
                </Alert>
            </Snackbar>

        </>
    )
}


export default SnackBar;