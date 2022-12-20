import { Box, Card, CardContent, Paper, Button, Divider, TextField, TextareaAutosize, MenuItem, Input, InputAdornment, Chip, Stack, Alert, Grid, TextFieldProps } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BreadcrumbsComp from "../../../../component/breadcrumbs";
import { styled, StyledEngineProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import ptLocale from 'date-fns/locale/pt-BR';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from "../../../../redux/IAppStore";
import { CategoryUpdate, GetCategory } from "../../../../redux/ducks/categorias/actions";
import { DocDelete, DocsSave, GetDocumentos } from "../../../../redux/ducks/documents/actions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Delete } from "@mui/icons-material";
import { Icategory } from "../../../../redux/ducks/categorias/types";
import AlertDialogSlide from "../../../../component/alerts/alerts";
import { ErrorToast } from "../../../../redux/ducks/component/actions";
import { GetVehicles, VehiclesDelete, VehiclesSave } from "../../../../redux/ducks/vehicles/actions";


interface IDocumento {
    desc: string;
    conteudo: string;
    destinatario: string;
    secretaria: string;
    valor: string;
    setor: string;
    dataNota: string | undefined;
    dataNotaInicial: string;
    dataNotaFinal: string;
    obsjust: string;
    veiculo: string;
    vl_km: string;
}

interface IVeiculo {
    kmIni: string;
    kmFim: string;
    trajeto: string;
    data: string;
    percorrido: string;
}

const Report = () => {
    const dispatch = useDispatch();
    let id = 0;
    const {
        categoria: { data: categoria },
        documents: { data: documentos, loading: load },
        vehicles: { data: kms },
    } = useSelector((state: AppStore) => state);

    useEffect(() => {
        dispatch(GetCategory());
        dispatch(GetDocumentos());
    }, [])


    useEffect(() => {
    }, [documentos, kms])
   


    const [documento, setDocumento] = useState<IDocumento>({ desc: '', conteudo: '', destinatario: '', secretaria: '', valor: '', setor: '', dataNota: moment().format('YYYY-MM-DD'), dataNotaInicial: moment().format('YYYY-MM-DD'), dataNotaFinal: moment().format('YYYY-MM-DD'), obsjust: '', veiculo: '', vl_km: '' });
    const [veiculo, setVeiculo] = useState<IVeiculo>({ kmIni: '', kmFim: '', trajeto: '', data: moment().format('YYYY-MM-DD'), percorrido: '' });



    function onChangeVeiculo(value: string | undefined, field: string | null) {
        if (value === undefined) {
            return;
        }
        let doc_aux = veiculo;
        doc_aux[field as keyof IVeiculo] = value;
        setVeiculo({ ...doc_aux });
    }

    const saveDocs = async () => {
        if (documento.desc) {
            await dispatch(DocsSave(String(documento.dataNota), 1, documento.desc, documento.conteudo, 1, Number(documento.secretaria), Number(documento.setor), '', '', 1, Number(documento.valor), '', '', Number(documentos.protocoloId)));
        } else {
        }
    };

    const saveKm = async (protocolo: Number) => {
        if (protocolo) {
            await dispatch(VehiclesSave(veiculo.kmIni, veiculo.kmFim, veiculo.trajeto, veiculo.data, veiculo.percorrido, protocolo));          
        } else {

        }

    };

    const updateCabecalho = async (tipo: number) => {
        if (documento.dataNotaInicial) {
            await dispatch(CategoryUpdate(documento.dataNotaInicial, documento.dataNotaFinal, tipo, documento.destinatario, Number(documentos.protocoloId), Number(documentos.protocoloId), documento.obsjust, false, documento.veiculo, documento.vl_km));
        }
    };



    const saved = (descricao: string, title: string) => {
        if (documento.obsjust && documento.destinatario) {
            saveDocs();
            updateCabecalho(1);
        } else {
            if (!documento.obsjust) {
                dispatch(ErrorToast(1, 400, "Necessário preecher Observações e Justificativas para seguir"))
            } else {
                dispatch(ErrorToast(1, 400, "Necessário preecher Destinatario para seguir"))
            }
        }
    }

    function onChangeDocumento(value: string | undefined, field: string | null) {
        if (value === undefined) {
            return;
        }
        let doc_aux = documento;
        doc_aux[field as keyof IDocumento] = value;
        console.log(doc_aux)
        setDocumento({ ...doc_aux });
    }

    const ItemCustom = styled(TextField)(({ theme }) => ({
    }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const rowSelectedDoc = async (row: any) => {
        await dispatch(DocDelete(row))
    }

    const rowDelKmc = async (row: any) => {
        await dispatch(VehiclesDelete(row))
    }


    const rows: any[] = documentos.items.length > 0 ? documentos.items.map((e) => ({ id: e.id, data: e.data, descricao: e.descricao, categoria: e.categoria, valor: e.valor })) : [];

    const rowsCars: any[] = kms.items.length > 0 ? kms.items.map((e) => ({ id: e.id, km_inicial: e.km_inicial, Km_Final: e.km_final, Target: e.trajeto, data: e.data, Km_Percorrido: e.percorrido, })) : [];



    const columnsVeiculos: GridColDef[] = [

        { field: 'km_inicial', headerName: 'Km Inicial', width: 180, align: 'center' },
        { field: 'Km_Final', headerName: 'Km Final', width: 180, align: 'center' },
        { field: 'Target', headerName: 'Trajeto', width: 180, align: 'left' },
        {
            field: 'data', headerName: 'Data', width: 130, align: 'center', renderCell: (value: any) => {
                const date = moment(value.formattedValue).format("DD-MM-YYYY");
                return date;
            }
        },
        { field: 'Km_Percorrido', headerName: 'Km Percorrido', width: 180, align: 'center' },
        {
            field: 'delete',
            headerName: 'Remover',
            renderCell: (value: any) => (<Button onClick={() => rowDelKmc(value.id)} color="error" startIcon={<Delete />} />
            )
        }
    ];


    const columns: GridColDef[] = [
        {
            field: 'data', headerName: 'Data', width: 130, align: 'center', renderCell: (value: any) => {
                const date = moment(value.formattedValue).format("DD-MM-YYYY");
                return date;
            }
        },
        { field: 'descricao', headerName: 'Descrição', width: 180 },
        {
            field: 'categoria',
            headerName: 'Categoria',
            width: 150, renderCell: (value: any) => {
                const t = categoria.filter((e: Icategory) => {
                    if (e.id == value.row.categoria) return e
                });
                if (t.length > 0) {
                    return t[0].descricao
                } else {
                    return ''
                }
            }
        },
        {
            field: 'valor',
            headerName: 'Valor',

            renderCell: (value: any) => {
                if (value) {
                    const formatVal = 'R$ ' + value.formattedValue.toFixed(2);
                    return formatVal;
                }
            }

        },
        {
            field: 'delete',
            headerName: 'Remover',
            renderCell: (value: any) => (<Button onClick={() => rowSelectedDoc(value.id)} color="error" startIcon={<Delete />} />
            )
        }
    ];


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Box>
                    <BreadcrumbsComp />
                    <Paper elevation={8} />
                    <Stack direction="column" spacing={1} alignItems="flex-end">
                        <AlertDialogSlide data={documento.dataNotaInicial} dataFim={documento.dataNotaFinal} tipo={2} destinatario={documento.destinatario} userId={Number(documentos.protocoloId)} protocoloId={Number(documentos.protocoloId)} obs={documento.obsjust} cobranca={false} />
                    </Stack>

                    <Card sx={{ minWidth: 275 }}>
                        <Divider>
                            <Chip label="Cadastro de Notas" />
                        </Divider>

                        <CardContent>
                            <br></br>
                            <Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 3,
                                    rowGap: 1,
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                }}
                            >
                                <Item><h3>Protocolo - {documentos.protocoloId}</h3></Item>

                                <TextField
                                    key="destinatario"
                                    label="Destinatario"
                                    onChange={e => onChangeDocumento(e.target.value, 'destinatario')}

                                />

                                {<DesktopDatePicker
                                    key="dataNotaInicial"
                                    label="Data Inicial"
                                    inputFormat="dd/MM/yyyy"
                                    value={documento.dataNotaInicial}
                                    onChange={e => onChangeDocumento(e?.toString(), 'dataNotaInicial')}
                                    renderInput={(params) => <TextField {...params} />}
                                />}

                                {<DesktopDatePicker
                                    key="dataNotaFinal"
                                    label="Data Final"
                                    inputFormat="dd/MM/yyyy"
                                    value={documento.dataNotaFinal}
                                    onChange={e => onChangeDocumento(e?.toString(), 'dataNotaFinal')}
                                    renderInput={(params) => <TextField {...params} />}
                                />}



                                <Item><h3>Status - Editando</h3></Item>
                                {<DesktopDatePicker
                                    key="dataNotaFinal1"
                                    label="Data Entrega"
                                    inputFormat="dd/MM/yyyy"
                                    value={documento.dataNotaFinal}
                                    disabled={true}
                                    onChange={e => onChangeDocumento(e?.toString(), 'dataNotaFinal')}
                                    renderInput={(params) => <TextField {...params} />}
                                />}

                            </Box>

                            <br></br>
                            <Divider>
                                <Chip label="Observações e Justificativas" />
                            </Divider>
                            <br></br>

                            {<Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 3,
                                    rowGap: 3,
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                }}
                            >
                                <TextareaAutosize
                                    id="obsjust"
                                    key="obsjust"
                                    aria-label="empty textarea"
                                    placeholder="Observações e Justificativas"
                                    style={{ height: 100, width: '75%' }}
                                    onChange={e => onChangeDocumento(e.target.value, 'obsjust')}
                                />


                                <TextField
                                    key="veiculo"
                                    label="Veiculo Utilizado"
                                    onChange={e => onChangeDocumento(e.target.value, 'veiculo')}

                                />
                                <TextField
                                    key="vl_km"
                                    label="Valor Km"
                                    onChange={e => onChangeDocumento(e.target.value, 'vl_km')}

                                />
                            </Box>}

                            <br></br>
                            <Divider>
                                <Chip label="Lançamentos de Despesas com Veículos" />
                            </Divider>
                            <br></br>

                            <Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 5,
                                    rowGap: 5,
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                }}
                            >
                                <TextField
                                    id="kmIni"
                                    label="Km Inicial"
                                    key="kmIni"
                                    type="text"
                                    size="small"
                                    onChange={e => onChangeVeiculo(e.target.value, 'kmIni')}
                                />

                                <TextField
                                    id="kmFim"
                                    label="Km Final"
                                    key="kmFim"
                                    type="text"
                                    size="small"
                                    onChange={e => onChangeVeiculo(e.target.value, 'kmFim')}
                                />


                                <TextField
                                    id="trajeto"
                                    label="Trajeto"
                                    key="trajeto"
                                    type="text"
                                    size="small"
                                    onChange={e => onChangeVeiculo(e.target.value, 'trajeto')}
                                />

                                <DesktopDatePicker
                                    key="data"
                                    label="Data"
                                    inputFormat="dd/MM/yyyy"
                                    value={veiculo.data}
                                    onChange={e => onChangeVeiculo(e?.toString(), 'data')}
                                    renderInput={(params) => <TextField {...params} />}
                                />


                                <Stack direction="row" spacing={1} alignItems="flex-end">
                                    <Button variant="contained" style={{ left: 780 }} onClick={() => saveKm(Number(documentos.protocoloId))} endIcon={<SendIcon />}>
                                        Inserir
                                    </Button>
                                </Stack>

                            </Box>

                            <br></br>
                            <Divider>
                                <Chip label="Conferência de Lançamentos Veiculos" />
                            </Divider>
                            <br></br>

                            <Paper>
                                <div style={{ height: 400, width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'stretch' }}>
                                    <DataGrid
                                        columns={columnsVeiculos}
                                        rows={rowsCars}
                                        getRowId={(row) => row.id}
                                    />
                                </div>
                            </Paper>



                            <br></br>
                            <Divider>
                                <Chip label="Lançamentos de Despesas" />
                            </Divider>
                            <br></br>

                            <Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                }}
                            >
                                <TextField
                                    id="desc"
                                    label="Descrição"
                                    key="desc"
                                    type="text"
                                    size="small"
                                    onChange={e => onChangeDocumento(e.target.value, 'desc')}
                                />
                                <DesktopDatePicker
                                    key="dataNota"
                                    label="Data Nota"
                                    inputFormat="dd/MM/yyyy"
                                    value={documento.dataNota}
                                    onChange={e => onChangeDocumento(e?.toString(), 'dataNota')}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TextareaAutosize
                                    id="conteudo"
                                    aria-label="empty textarea"
                                    placeholder="Observações"
                                    style={{ height: 50 }}
                                    onChange={e => onChangeDocumento(e.target.value, 'conteudo')}
                                />
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={documento.secretaria}
                                    label="Categoria"
                                    placeholder="Categoria"
                                    size="small"
                                    onChange={e => onChangeDocumento(e.target.value, 'secretaria')}
                                >
                                    {categoria.map((name) => (
                                        <MenuItem
                                            key={name.id}
                                            value={name.id}
                                        >
                                            {name.descricao}
                                        </MenuItem>))}
                                </Select>
                                <Input
                                    id="valor"
                                    type="number"
                                    onChange={e => onChangeDocumento(e.target.value, 'valor')}
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                />
                                <Stack direction="row" spacing={1} alignItems="flex-end">
                                    <Button variant="contained" style={{ left: 300 }} onClick={() => saved(documento.desc, 'Documento')} endIcon={<SendIcon />}>
                                        Inserir
                                    </Button>
                                </Stack>
                            </Box>

                            <br></br>
                            <Divider>
                                <Chip label="Conferência de Lançamentos" />
                            </Divider>
                            <br></br>

                            <Paper>
                                <div style={{ height: 400, width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'stretch' }}>
                                    <DataGrid
                                        columns={columns}
                                        rows={rows}
                                        getRowId={(row) => row.id}
                                    />
                                </div>
                            </Paper>

                        </CardContent>

                    </Card>

                    <Paper />
                </Box>
            </Grid>
        </LocalizationProvider>)
}

export default Report;