const getExchangeRates = async (base = "USD") => {
  const response = await fetch(
    `https://api.exchangeratesapi.io/v1/latest?access_key=${
      process.env.REACT_APP_API_KEY
    }&base=${base}`
  );

  return response.json();
};

export default getExchangeRates;
