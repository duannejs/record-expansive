export type IndexSignatureGeneric = { [key: string]: any };
export type IndexSignature = { [key: string]: string };


export const statusInfo: IndexSignature = {
  "PENDENTE": "Pendente",
  "CFN": "Emitido",
//  "CFM": "CFM",
//  "CFA": "CFA",
//  "NF": "NF",
  "AFERICAO": "Aferição",
}

export const pdvDetailType: IndexSignature = {
  "DISK": "Disco",
  "CPU": "CPU",
  "MEMORY": "Memória",
}

export const portaConcentrador: IndexSignature = {
  1771: "1771",
  771: "771",
  857: "857",
  7001: "7001",
  7002: "7002"

}

export const portaMedidor: IndexSignature = {
  10001: "10001",
}

export const manutencaoInfo: IndexSignature = {
  1: "Descontinuidade de Encerrante",
  2: "Troca de Placa",
}

export const livroLMC: IndexSignature = {
  0: "Em Aberto",
  1: "Fechado",
}

export const agrupado: IndexSignature = {
  0: "Produto/Dia",
  1: "Dia/Produto",
}

export const tipoMedicao: IndexSignature = {
  0: "Manual",
  1: "Medição",
}

export const tipoMedicaoBomba: IndexSignature = {
  0: "Analógico",
  1: "Digital",
}

export const statusProcesso: IndexSignature = {
  0: "EM ABERTO",
  1: "LANÇAMENTO PENDENTE",
  2: "LANÇADO",
  3: "ESTORNO PENDENTE",
  4: "ESTORNADO",
  8: "EXCLUIDO",
}

export const typeAbastecimento: IndexSignature = {
  0: "Normal",
  1: "Quebra",
  2: "Quebra Encerrante"
}

export const typeIdentifidAfericao: IndexSignature = {
  0: "Normal",
  1: "Aferição",
}

export const typeAgendaAtivo: IndexSignature = {
  0: "Ativo",
  1: "Inativo"
}



export const typeValuesPdv: IndexSignature = {
  "INTEGER": "Numero",
  "STRING": "Texto",
  "BOOLEAN": "Sim/Não",
}

export const typeAgendaOperacao: IndexSignature = {
  "HORA_AUTOMACAO": "Hora Automação",
  "MEDIDOR": "Medição Tanque"
}

export const typeAgenda: IndexSignature = {
  0: "Intervalo Fixo",
  1: "Horário Fixo",
}

export const typeAgendaIntervalo: IndexSignature = {
  "HOUR": "Por Hora",
  "MINUTE": "Por Minuto",
  "DAY": "Por Dia"
}

export const typeProtMedidor: IndexSignature = {
  VEEDER_ROOT: "Veeder Root"
}


export const typeIdentifidControle: IndexSignature = {
  FUNCIONARIO_1: "Funcionário 1",
  FUNCIONARIO_2: "Funcionário 2",
  FUNCIONARIO_3: "Funcionário 3",
  FUNCIONARIO_4: "Funcionário 4",
  FUNCIONARIO_5: "Funcionário 5",
  FUNCIONARIO_6: "Funcionário 6",
  CLIENTE_1: "Cliente 1",
  CLIENTE_2: "Cliente 2",
  CLIENTE_3: "Cliente 3",
  GERENTE_1: "Gerente 1",
  GERENTE_2: "Gerente 2",
  GERENTE_3: "Gerente 3",
  // VEICULO: "Veículo",
  // MAQUINALAVAR: "Maquina de Lavar",
}

export const permissaoIdentifid: IndexSignature = {
  SEMACESSO: "Sem Acesso",
  LIBERABOMBA: "Libera Bomba",
  RESERVADO: "Reservado",
  // RESPEITATURNOS: "Respeita Turno",
  // LIBERAMAQUINA: "Libera Maquina de Lavar",
  // LIBERABOMBARESPEITATURNOS: "Libera Bomba e Respeita Turno",
  // LIBERABOMBAMAQUINA: "Libera Bomba e Maquina de Lavar",
  // VAZIO: "Vazio";
}

export const bombaCanal: IndexSignature = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09 (A)",
  10: "10 (B)",
  11: "11 (C)",
  12: "12 (D)"
}

export const typeProtConcentrador: IndexSignature = {
  PROT_2: "v2",
  PROT_4: "v4",
  PROT_6: "v6 (IdentFID)",
}

export const typeConnection: IndexSignature = {
  SOCKET: "Ethernet (TPC/IP)",
  SERIAL: "Serial (COM)"
}

export const bombaConector: IndexSignature = {
  1: "01 (Ld A 1)",
  2: "02 (Ld A 2)",
  3: "03 (Ld B 1)",
  4: "04 (Ld B 2)",
}

export function getConectorByValue(connect: string) {
  let value = Object.keys(bombaConector).filter((key: string) => {
    if (bombaConector[key] === connect) {
      return key;
    }
  });
  if (value.length > 0) {
    return value[0]
  }
  return null;
}

export const typeIdentifid: IndexSignature = {
  FRENTISTA: "Frentista",
  CLIENTE: "Cliente",
  GERENTE: "Gerente",
}


export const descontinuidadeDeEncerrante: IndexSignature = {
  // numeroIntervencao: 'Número da Intervenção',
  idManutencao: 'ID Manuntenção',
  bomba: 'Bomba',
  tanque: 'Tanque',
  encerranteInicial: 'Encerrante Inicial',
  encerranteFinal: 'Encerrante Final',
  motivo: 'Motivo'
}


export const trocaDePlacaHelper: IndexSignature = {
  idManutencao: 'ID Manuntenção',
  // numeroIntervencao: 'Número da Intervenção',
  bomba: 'Bomba',
  tanque: 'Tanque',
  encerranteInicial: 'Encerrante Inicial',
  encerranteFinal: 'Encerrante Final',
  nomeIntervencao: 'Nome do técnico',
  cnpjIntervencao: 'CNPJ',
  cpfIntervencao: 'CPF',
  lacreNovo: 'Lacre Novo',
  lacreAntigo: 'Lacre Antigo',
  numPdv: 'PDV',
  fiscal: 'Fiscal',
  numCupom: 'N° Cupom',
  operador: 'Operador',
  motivo: 'Motivo',
}


export const formatJsonWithDate = (value: any) => {
  let { datas: [dataInicio, dataFim] } = value;
  dataInicio = dataInicio.format('YYYY-MM-DD 00:00:00');
  dataFim = dataFim.format('YYYY-MM-DD 23:59:59');
  return { dataInicio, dataFim };
}


export function getEndLog(canal: number, conector: number) {
  const address = ['4', '68', '132', '196'];
  const multiple = ((canal - 1) * 4) + (conector - 1);
  let values: string[] = [];
  address.forEach((v) => {
    values.push((Number(v) + multiple).toString(16).padStart(2, "0").toUpperCase())
  });
  return values;
}

export function getEndLogicoByCanalConectorPosicao(canal: number, conector: number, posicao: number) {
  return { elogico: getEndLog(canal, conector)[posicao - 1], canal, conector };
}

export function getCanalConector(icom: number, conec: string) {
  const canalPart = conec.split('');
  const conector = Number(canalPart[1]);
  const canal = ((icom - 1) * 4) + (canalPart[0].charCodeAt(0) - 96);
  return { canal, conector }
}


export function getCanalConectorByEndLogico(endLogico: string) {
  const address = ['196', '132', '68', '4'];
  // get decimal logico
  const decimalLogico = parseInt(endLogico, 16);

  // get posicao logico
  let valPosicao = 0;
  address.every((v) => {
    valPosicao = decimalLogico - Number(v);
    return valPosicao >= 0 ? false : true;
  });

  //get canal
  let canal = 0;
  let values = [1, 2, 3, 4]
  values.every((v) => {
    canal = ((valPosicao - (v - 1)) / 4) + 1;
    return canal % 1 === 0 ? false : true;
  });

  const conector = (valPosicao % 4) + 1

  return { conector, canal }

}




/** Object Array that will be tested */
type Arr = Object[];

/** Prop that should be tested */
type Param = string;

export const getDiff = (firstArr: Arr, secondArr: Arr, param: Param, sParam?: Param) => {
  function comparer(firstArr: any) {
    return function (secondArr: any) {
      return firstArr.filter(function (other: any) {
        if (sParam) {
          return other[param] === secondArr[sParam]
        }
        return other[param] === secondArr[param]
      }).length === 0;
    }
  }

  const onlyInA = firstArr.filter(comparer(secondArr));
  const onlyInB = secondArr.filter(comparer(firstArr));
  return onlyInA.concat(onlyInB);
}

export const splitBy = (arr: Object[], property: string) => {
  const ids = [...Array.from(new Set(arr.map((i: any) => i[property])))];

  const groupBy = (arr: Object[], property: string) => {
    return arr.reduce((memo: any, x: any) => {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  return ids.map(id => groupBy(arr, property)[id]);
}

export const headerColors = (n: number) => {
  const colors = ['#3399ff', '#2077d4', '#63a3e2'];
  return colors[Math.floor(Math.random() * colors.length + n)];
}


export const resetPagination = (current: number, setCurrent: any) => {
  if (current > 1) return setCurrent(1);
}


export const multipleSelectOnChange = (values: any) => {
  const findAll = values.indexOf('');
  if (values.length > 1 && findAll !== -1) {
    values = values.splice(findAll, 1);
  }
}

export const getConectorList = (values: String) => {
  let list: string[] = [];
  (values || '').split('').forEach((v: string, index: number) => {
    if (v === 'S') {
      list.push(`${index + 1}`)
    }
  })
  return list;

}

export const getStringArray = (array: any) => {
  if (!array) {
    return null
  } else {
    if (array.join(',') === '')
      return null
    return array.join(',')
  }
}