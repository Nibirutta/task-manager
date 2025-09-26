const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Adiciona um dia para corrigir problemas de fuso horário na exibição.
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
};

export default formatDate;