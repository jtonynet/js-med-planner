export const dateFormat = (date) => {
  const formatedDate = new Date(date).toLocaleDateString('pt-BR');
  return formatedDate;
}

