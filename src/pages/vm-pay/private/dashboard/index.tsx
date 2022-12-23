import { Box, Button, Paper, Stack, Chip, Modal, CircularProgress, Divider, Card, CardContent, styled, Checkbox } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsComp from "../../../../component/breadcrumbs";
import { AppStore } from "../../../../redux/IAppStore";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { CabecalhoUpdate, GetCabecalho } from "../../../../redux/ducks/cabecalho/actions";
import moment from "moment";
import { PDFViewer } from '@react-pdf/renderer';
import PdfGenerator from "../../../../component/pdf";
import { GetDocumentosId } from "../../../../redux/ducks/allDocuments/actions";
import { Column } from "../../../../component/pdf/PDFTable";
import { Icategory } from "../../../../redux/ducks/categorias/types";
import { GetCategory } from "../../../../redux/ducks/categorias/actions";
import { formatMoney } from "../../../../utils/masks";
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { GetVehicles } from "../../../../redux/ducks/vehicles/actions";


interface tableRow {
    id: number;
    data_inicial: string;
    data_final: string;
    cliente: string;
    status: number;
    valor: number;
    name: string;
    obs: string;
    cobranca: boolean;
    veiculo: string;
    vl_km: string;
    totalveiculo: number;
  
}

interface IItensKms {
    id: number;
    id_protocolo: number;
    km_inicial: number;
    km_final: number;
    trajeto: string;
    data: string;
    percorrido: string;
    valor_km: string;
    excluido: string
}

interface cars {
    listKms: IItensKms[];
}

interface listNota {
    id: number;
    categoria: number;
    data: string;
    descricao: string;
    destinatario: string;
    valor: number,
    conteudo: string;
}

interface totais {
    count: number;
    valor: number
}

export interface Icategoria {
    categoriaId: number;
    listNota: listNota[];
    totalCategoria: totais;
}

interface iListaAgrupada {
    totais: totais;
    categoriaList: Icategoria[];
}

const Dashboard = () => {
    const dispatch = useDispatch();
    const {
        cabecalho: { data: cabecalhos },
        alldocuments: { data: documentos },
        categoria: { data: categoria },
        vehicles: { data: kms }
    } = useSelector((state: AppStore) => state);
    const { token } = useSelector((app: AppStore) => app);


    const [isShow, setisShow] = useState(false);
    const [isAprov, setAprov] = useState(false);
    const [checked, setChecked] = useState(false);
    const [itemSelect, setItemSelect] = useState<tableRow | null>(null);

    useEffect(() => {
    }, [token])

    useEffect(() => {
        cabecalhos
    }, []
    )

    useEffect(() => {
        dispatch(GetCategory());
        dispatch(GetCabecalho());
    }, [])

    const rowDocsId = (row: any) => {
        dispatch(GetDocumentosId(row));
        dispatch(GetVehicles(row));
        setisShow(true)
    }

    const isApov = (row: any) => {
        dispatch(GetDocumentosId(row));
        setAprov(true)
    }

    const isItem = (id: any) => {
        let row: any = cabecalhos.filter(item => { if (item.id == id) { return item } });
        if (row.length > 0) {
            setItemSelect(row[0])
        }
    }

    const aprovaPagamento = async (status: number, cobranca: boolean, user: number, idRdv: number) => {
        await dispatch(CabecalhoUpdate(status, cobranca, user, idRdv));
        await setAprov(false)
        dispatch(GetCabecalho());
    }

    const EditaCabecalho = async (status: number, cobranca: boolean, user: number, idRdv: number) => {
        await dispatch(CabecalhoUpdate(1, cobranca, user, idRdv));
        dispatch(GetCabecalho());
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const rows: any[] = cabecalhos.length > 0 ? cabecalhos.map((e): tableRow => ({ id: e.id, data_inicial: e.data_inicial, data_final: e.data_final, cliente: e.cliente, status: e.status, valor: e.valor, name: e.name, obs: e.obs, cobranca: e.cobranca, veiculo: e.veiculo, vl_km: e.vl_km, totalveiculo: e.totalVeiculo })) : [];
    const tablerows: any[] = documentos.length > 0 ? documentos.map((e): listNota => ({ id: e.id, categoria: e.categoria, data: e.data, descricao: e.descricao, destinatario: e.destinatario, valor: e.valor, conteudo: e.conteudo })) : [];
    const rowsCars: any[] = kms.items.length > 0 ? kms.items.map((e) => ({ id: e.id, km_inicial: e.km_inicial, Km_Final: e.km_final, Target: e.trajeto, data: e.data, Km_Percorrido: e.percorrido, })) : [];

    function orderList(): any {
        let listaAgrupado: iListaAgrupada = {
            totais: { count: 0, valor: 0 },
            categoriaList: [
            ]
        }

        tablerows.sort((a, b) => {
            return moment(a.data).diff(moment(b.data))
        }).forEach((e: any) => {
            let index = listaAgrupado.categoriaList.findIndex(i => i.categoriaId == e.categoria)
            if (index > -1) {
                listaAgrupado.categoriaList[index].listNota.push(e);
                listaAgrupado.categoriaList[index].totalCategoria.count++;
                listaAgrupado.categoriaList[index].totalCategoria.valor += e.valor;

            } else {
                listaAgrupado.categoriaList.push({ categoriaId: e.categoria, listNota: [e], totalCategoria: { count: 1, valor: e.valor } });

            }
            listaAgrupado.totais.count++;
            listaAgrupado.totais.valor += e.valor;
        })
        listaAgrupado.categoriaList.sort((a, b) => a.categoriaId - b.categoriaId)
        return listaAgrupado;
    }

    function orderListKm(): any {

        let listaKmtros: cars = {
            listKms: [
            ]
        }
        rowsCars.sort((a, b) => {
            return moment(a.data).diff(moment(b.data))
        }).forEach((e: any) => {
            listaKmtros.listKms.push(e);
        })
        return listaKmtros;

    }

    const agroupedListKm = orderListKm();

    const agroupedList = orderList();

    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'Número', flex: 1, align: 'center', headerAlign: 'center'
        },
        {
            field: 'status', headerName: 'Status', flex: 1.5, align: 'center', headerAlign: 'center', renderCell: (value: any) => {
                if (value.row.status == 1) {
                    return <Chip label='Editando' variant='outlined' color='error' />
                }
                if (value.row.status == 2) {
                    return <Chip label='Fechado' variant='filled' color='warning' />
                }
                if (value.row.status == 3) {
                    return <Chip label='Aprovado Pagamento' variant='filled' color='success' />
                }
                if (value.row.status == 4) {
                    return <Chip label='Reprovado' variant='filled' color='error' />
                }
            }
        },
        {
            field: 'cobranca', headerName: 'Cobrança', flex: 1, align: 'center', headerAlign: 'center', renderCell: (value: any) => {
                if (value.row.cobranca == true) {
                    return <Chip label='Cliente' variant='outlined' color='warning' />
                } else {
                    return <Chip label='Interno' variant='filled' color='success' />
                }
            }
        },
        { field: 'name', headerName: 'Requerente', flex: 1.5, align: 'center', headerAlign: 'center' },
        {
            field: 'data_inicial', headerName: 'Período Inicial', flex: 1, align: 'center', headerAlign: 'center', renderCell: (value: any) => {
                const date = moment(value.formattedValue).format("DD-MM-YYYY");
                return date;
            }
        },
        {
            field: 'data_final', headerName: 'Período Final', flex: 1, align: 'center', headerAlign: 'center', renderCell: (value: any) => {
                const date = moment(value.formattedValue).format("DD-MM-YYYY");
                return date;
            }
        },
        { field: 'cliente', headerName: 'Cliente', flex: 1.5, headerAlign: 'center', align: 'center' },
        {
            field: 'valor',
            headerName: 'Total',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            renderCell: (value: GridRenderCellParams) => {
                if (value) {
                    const formatVal = formatMoney(value.formattedValue, 2);
                    return formatVal;
                }
            }
        },
        {
            field: 'visualizar',
            headerName: 'Visualizar',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            renderCell: (value: any) => (<Button onClick={() => { isItem(value.id), rowDocsId(value.id) }} color="primary" startIcon={<LocalPrintshopOutlinedIcon />} />
            )
        },
        {
            field: 'aprovacao',
            headerName: 'Aprovação',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            renderCell: (value: any) => (<Button disabled={value.row.status == 3 || value.row.status == 1} onClick={() => { isItem(value.id), isApov(value.id) }} color="primary" startIcon={<DownloadDoneOutlinedIcon />} />
            ),
            hide: (aprovacao())

        },
        {
            field: 'editar',
            headerName: 'Editar',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            renderCell: (value: any) => (<Button disabled={value.row.status == 3} onClick={() => { EditaCabecalho(1, false, token.user.id, value.id) }} color="primary" startIcon={<ModeEditOutlinedIcon />} />
            ),


        }
    ];

    function aprovacao(): any {
        if (token.user.master == true) {
            return false
        } else {
            return true
        }
    }

    function situation(row: any): any {
        if (row == 1) {
            return 'Editando'
        }
        if (row == 2) {
            return 'Fechado'
        }
        if (row == 3) {
            return 'Aprovado Pagamento'
        }
        if (row == 4) {
            return 'Reprovadp'
        }
    }

    const columnsViewKms: Column[] = [
        {
            key: 1,
            title: "Data",
            dataIndex: 'data',
            render: (value: any) => {
                if (value) {
                    return moment(value).format('DD/MM/yy')
                } else {
                    return value;
                }
            }
        },

        {
            key: 2,
            title: "Km Inicial",
            dataIndex: 'km_inicial',
        },

        {
            key: 3,
            title: "Km Final",
            dataIndex: 'Km_Final',
        },

        {
            key: 4,
            title: "Trajeto",
            dataIndex: 'Target',
        },

        {
            key: 5,
            title: "Percorrido",
            dataIndex: 'Km_Percorrido',
        },

    ]

    const columnsView: Column[] = [
        {
            key: 1,
            title: "Data",
            dataIndex: 'data',
            render: (value: any) => {
                if (value) {
                    return moment(value).format('DD/MM/yy')
                } else {
                    return value;
                }
            }
        },

        {
            key: 2,
            title: "Categoria",
            dataIndex: 'categoria',
            render: (value: any) => {
                const t = categoria.filter((e: Icategory) => {
                    if (e.id == value) return e
                });
                if (t.length > 0) {
                    return t[0].descricao
                } else {
                    return ''
                }
            }
        },

        {
            key: 3,
            title: "Descrição",
            dataIndex: 'descricao',
        },

        {
            key: 4,
            title: "Obs",
            dataIndex: 'conteudo',
        },

        {
            key: 5,
            title: "Valor",
            dataIndex: 'valor',
            render: (value: any) => {
                if (value) {
                    return formatMoney(value, 2);
                }
            }
        },

    ]

    return (
        <Box >
            <BreadcrumbsComp />
            <Paper elevation={8} />
            <Stack direction="column" spacing={1} alignItems="flex-end">
                <div style={{ height: 600, alignItems: 'flex-start', display: 'flex', margin: '0', maxWidth: '100%', width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        getRowId={(row) => row.id}
                    />
                </div>
            </Stack>

            <Modal
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto'
                }}
                open={isShow}
                onClose={() => { setisShow(false), setItemSelect(null) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={'75%'} height={'75%'}>
                    {documentos.length > 0 &&
                        <PDFViewer width={'100%'} height={'100%'}>
                            <PdfGenerator items={agroupedList} header={columnsView} info={itemSelect} assinatura={token.user.name} items2={agroupedListKm} header2={columnsViewKms} />
                        </PDFViewer>
                    }
                    {documentos.length == 0 && <CircularProgress />}
                </Box>
            </Modal>

            <Modal
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                open={isAprov && itemSelect != null}
                onClose={() => { setAprov(false), setItemSelect(null) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={'75%'} height={'75%'}>
                    {(isAprov && itemSelect) &&
                        <Stack spacing={1}>
                            <Paper elevation={8} >
                                <div style={{ height: 150, width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ height: '45%', width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Divider>
                                            <Chip label="Confirmação de Aprovação" />
                                        </Divider>
                                    </Card>
                                </div>
                                <Item style={{ alignItems: 'left', justifyContent: 'left' }}>{`Número :${JSON.stringify(itemSelect.id)}   Requisitante: ${itemSelect.name} Situação :${situation(itemSelect.status)}`}</Item>
                                <Item style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>{`Período :${(itemSelect.data_inicial)}   até  : ${itemSelect.data_final}`}</Item>
                                <Item style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>{`Cliente :${JSON.stringify(itemSelect.cliente)}   Valor de : ${itemSelect.valor}`}</Item>
                                <Item style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>Cobrança : <FormControlLabel control={<Checkbox defaultChecked={false} />} onChange={(check: any) => {
                                    setChecked(check.target.checked)
                                }} label="Cliente" /></Item>
                            </Paper>

                            <Item><h3>reprovar pagamento <Button onClick={() => { aprovaPagamento(4, checked, token.user.id, itemSelect.id) }} color="error" startIcon={<DownloadDoneOutlinedIcon />} /> | Confirma pagamento <Button onClick={() => { aprovaPagamento(3, checked, token.user.id, itemSelect.id) }} color="primary" startIcon={<DownloadDoneOutlinedIcon />} /> </h3></Item>
                        </Stack>
                    }
                </Box>
            </Modal>

        </Box >)
}

export default Dashboard;
