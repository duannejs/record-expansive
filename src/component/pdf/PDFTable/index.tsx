import React from "react";
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';
import { Icategoria } from "../../../pages/vm-pay/private/dashboard";
import { ICars } from "../../../redux/ducks/vehicles/types";




const styles = StyleSheet.create({
  table: {
    display: "table",
  },
  tr: {
    margin: "auto",
    flexDirection: "row"
  },
  th: {
    width: "auto",
  },
  td: {
    width: "auto",
  },
  thContent: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500
  },
  tdContent: {
    margin: 5,
    fontSize: 10
  },

  tbody: {},
  thead: {}
});


const PDFTable = ({ columns, data, assina, headerColor = '#3399FF', headerColorFont = '#fff' }: TableI) => {
  const headerOrder = columns.map((c: any) => c.dataIndex);
  const width = 100 / headerOrder.length;
  const assinatura = () => {
    assina
    return assina
  }

  const createHeader = (columns: Column[]) => {
    return columns.map((column) => {
      return <View key={uuidv4()} style={[styles.th, { width: `${width}%`, backgroundColor: headerColor, color: headerColorFont }]}><Text style={styles.thContent}>{column.title}</Text></View>
    });
  };


  const renderDataTable = (rows: any) => {
    if (rows)
      return rows.map((row: any, index: any) => {
        return <View key={uuidv4()} style={[styles.tr, { backgroundColor: index % 2 ? '' : '#f2f2f2' }]}>{renderRow(row)}</View>
      });
  };

  const renderDataTotal = (rowTotal: any) => {
    let a = { data: null, descricao: '', categoria: '', conteudo: 'Total Categoria ', valor: rowTotal.valor }
    return <View key={uuidv4()} style={[styles.tr, { backgroundColor: '#a7a7a7', color: headerColorFont }]}>{renderRow(a)}</View>
  };



  const renderRow = (row: any) => {
    return columns.map(column => {
      return Object.keys(row).map(item => {
        if (column.dataIndex !== item) return <View key={uuidv4()} />
        if (column.render) return <View key={uuidv4()} style={[styles.td, { width: `${width}%` }]}><Text style={styles.tdContent}>{column.render(row[item])}</Text></View>;
        return <View key={uuidv4()} style={[styles.td, { width: `${width}%` }]}><Text style={styles.tdContent}>{row[item]}</Text></View>;
      })
    })
  }

  return (
    <View style={styles.table}>
      <View style={styles.thead}>
        <View style={styles.tr}>
          {createHeader(columns)}
        </View>
      </View>
      <View style={styles.tbody}>
        {
          data.categoriaList ?
            data.categoriaList.map((e: Icategoria) => <View key={uuidv4()}>
              {renderDataTable(e.listNota)}
              {renderDataTotal(e.totalCategoria)}
            </View>)
            : ''
        }
        {
          data.listKms ?
            <View key={uuidv4()}>
              {renderDataTable(data.listKms)}
            </View>
            : undefined
        }

        <Text style={{ fontWeight: "hairline", fontStyle: "italic", textAlign: "center", fontSize: 12, marginTop: 10, width: 250, marginLeft: 500 }}>{assinatura()}</Text>
        <View style={{ borderTop: 1, borderTopColor: "black", borderStyle: "solid", marginTop: 10, width: 250, marginLeft: 500 }}>
          <Text style={{ fontWeight: "hairline", fontStyle: "italic", textAlign: "center", fontSize: 12 }}>Assinatura</Text>
        </View>
      </View>
    </View>
  );
}

export interface Column {
  key: number | string;
  dataIndex: string;
  title: string;
  render?: (something: any) => any;
}

interface TableI {
  columns: Column[];
  data: any;
  assina: string;
  headerColor?: string;
  headerColorFont?: string;
}



export default PDFTable;