import { Paper } from "@mui/material";




const ItemContainerGeneric = ({ children, key }: any) => {

    return (
        <Paper sx={{ width: 320, padding: 2, marginRight: 2, marginBottom: 2 }} elevation={2} key={key}>
            {children}
        </Paper >
    )
}

export default ItemContainerGeneric;