export const exchangeApi = async () => {
  const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(END_POINT);
  const data = response.json();
  return data;
};

export default exchangeApi;
