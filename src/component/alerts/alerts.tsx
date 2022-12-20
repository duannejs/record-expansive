import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from "react-router-dom";
import { CategoryUpdate } from '../../redux/ducks/categorias/actions';
import { useDispatch } from 'react-redux';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AlertDialogSlide({data, dataFim, tipo, destinatario , userId, protocoloId, obs, cobranca} : any) {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateCabecalho = async () => {
    await dispatch(CategoryUpdate(data, dataFim, tipo, destinatario , userId, protocoloId, obs , cobranca,'',''));  
};

  const redirect = () =>{
    updateCabecalho();   
    navigate('/vm-pay/private/home', { replace: true })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Finalizar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Finalizar e enviar RDV para confência?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Após finalização não poderá retornar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={redirect}>Aceitar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


