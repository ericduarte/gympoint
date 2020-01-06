import { format, parseISO } from 'date-fns';

export function formatCurrencyBR(value, prefix = true) {
  let numberFormatted;

  if (prefix) {
    numberFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  } else {
    numberFormatted = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
    }).format(value);
  }

  return numberFormatted;
}

export function stringToFloatBR(value) {
  return parseFloat(value.replace(',', '.'));
}

export function formatDatePicker(value) {
  if (!value) return null;
  const dateFormatted = format(parseISO(value), 'yyyy-MM-dd');

  return dateFormatted;
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
