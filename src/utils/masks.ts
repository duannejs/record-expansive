export const truncar= (value: number, decimal: number = 2) =>{
  if (!Number.isNaN(Number(value))) {
      return Math.round((Number(value)) * 1e12) / 1e12;
  }
  return Number((value).toFixed(decimal));
}


// mascaras de exibição

export const formatQuantity = (value: number, decimal: number = 3) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'decimal',
    minimumFractionDigits: decimal,
  }).format(value);
};


export const formatZeroQuantity = (value: number, decimal: number = 0) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'decimal',
    minimumFractionDigits: decimal,
  }).format(value);
};

export const formatLiters= (value: number, decimal: number = 3) => {
  return `${new Intl.NumberFormat('pt-BR', { 
    style: 'decimal',
    minimumFractionDigits: decimal,
  }).format(value)} L`
};

export const formatMoney = (value: number, decimal: number = 3) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimal,
  }).format(value);
};

export const formatTemperature = (value: number) => {

  // return new Intl.NumberFormat('pt-br', {
  //   style: 'unit',
  //   unit: 'celsius'
  // }).format(value);
}