import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import PDFTable from './PDFTable';
import moment from 'moment';
import { formatMoney } from '../../utils/masks';

const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  generalTable: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row'
  },
  headerLogo: {
    width: '20%'
  },
  headerInfo: {
    width: '80%'
  },
  infoContent: {
    fontSize: 12,
  },
  tables: {
    marginBottom: 10
  }
});


const PdfGenerator = ({ items, header, info, query, assinatura, items2, header2 }: any) => { 
  let status: string;
  let pagador: string;
  let gastoVeiculo: number;
  let veiculo: string;
  let totalGeral: number;
  if (info.veiculo) {
    veiculo = info.veiculo
  } else {
    veiculo = ''
  }
  if (info.totalveiculo) {
    gastoVeiculo = Number(info.totalveiculo) * Number(info.vl_km)
  } else {
    gastoVeiculo = 0
  }
  totalGeral = info.valor + gastoVeiculo
  if (info.cobranca == true) {
    pagador = "Pago por Cliente"
  } else {
    pagador = "Pago por Visual Mix"
  }
  if (info.status == 1) {
    status = "Editando"
  }
  if (info.status == 2) {
    status = "Fechado"
  }
  if (info.status == 3) {
    status = "Aprovado Pagamento"
  }
  if (info.status == 4) {
    status = "Reprovado"
  }
  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.page} >
        <View style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }} >
          <Text style={{ fontSize: 10, alignSelf: 'flex-end' }} render={() => `Emissão: ${moment().format('DD/MM/YYYY')} ${moment().format("HH:mm")}`}></Text>
        </View>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            {<Image style={{ height: '50px' }} src={'../../img/vmix.jpg'}></Image>}
          </View>
          <View style={styles.headerInfo}>
            <Text render={() => `Relatório RDV  -  Número: ${moment().format('YYYY')}/${info.id}   Status: ${status}`} />
            <View style={styles.infoContent}>
              <Text render={() => `Nome: ${info.name}`} />
              <Text render={() => `Cliente: ${info.cliente}`} />
              <Text render={() => `Período Inicial: ${moment(info.data_inicial).format('DD/MM/YYYY')} á Período Final: ${moment(info.data_final).format('DD/MM/YYYY')}  -  Data de Entrega: ${moment(info.entrega).format('DD/MM/YYYY')}`} />
              {veiculo ? <Text render={() => `Veículo Utilizado: ${veiculo}  Valor Km: ${formatMoney(info.vl_km, 2)}  Total KM:  ${formatMoney(gastoVeiculo, 2)} `} /> : ''
              }
              <Text render={() => `Valor Total das Despesas: ${formatMoney(info.valor, 2)} + Km ${formatMoney(gastoVeiculo, 2)} = ${formatMoney(totalGeral, 2)}`} />
              <Text render={() => `Pagamento executado por: ${pagador}`} />
              <Text render={() => `Observações e Justificativas: ${info.obs}`} />
            </View>
          </View>
        </View>
        <View style={styles.generalTable}>
          {items2.listKms.length > 0 ? <PDFTable columns={header2} data={items2} assina={''} />   : undefined         
          } 
          <PDFTable columns={header} data={items} assina={assinatura} />
        </View>
      </Page>

    </Document>
  )
}

export default PdfGenerator;