import React, { useReducer } from "react";

const ExchangeContext = React.createContext();

const initialState = {
  walletData: [
    {
      currency: "USD",
      symbol: "$",
      balance: 200
    },
    {
      currency: "EUR",
      symbol: "€",
      balance: 150
    },
    {
      currency: "GBP",
      symbol: "£",
      balance: 10
    }
  ],
  exchangeRates: [],
  transaction: {
    fromCurrency: "EUR",
    fromValue: "",
    toCurrency: "USD",
    toValue: "",
    currentExchangeRate: "",
    flipped: false,
    exceedsBalance: false
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EXCHANGE_RATES":
      return { ...state, exchangeRates: action.payload };
    case "SET_CURRENT_EXCHANGE_RATE":
      return {
        ...state,
        transaction: Object.assign(state.transaction, action.payload)
      };
    case "SET_TRANSACTION":
      return {
        ...state,
        transaction: Object.assign(state.transaction, action.payload)
      };
    case "UPDATE_WALLET":
      return {
        ...state,
        walletData: Object.assign(state.walletData, {
          [action.payload.key]: Object.assign(
            state.walletData[action.payload.key],
            {
              balance: action.payload.balance
            }
          )
        })
      };
    case "SET_BALANCE_STATUS":
      return {
        ...state,
        transaction: Object.assign(state.transaction, action.payload)
      };
    default:
      return state;
  }
};

function ExchangeContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <ExchangeContext.Provider value={value}>
      {children}
    </ExchangeContext.Provider>
  );
}

const ExchangeContextConsumer = ExchangeContext.Consumer;

export { ExchangeContext, ExchangeContextProvider, ExchangeContextConsumer };
