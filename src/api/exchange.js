const getExchangeRates = async (base = "USD") => {
  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${base}`
  );

  return response.json();
};

export default getExchangeRates;
