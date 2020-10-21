export const initialState = {
  basket: [],
  user: "null",
};

// selectors and they go in the reducer
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// reducer
// state of application, action, what are you trying to do.
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    // action.type is ADD_To_BASKET
    case "ADD_TO_BASKET":
      return {
        ...state, // return state
        basket: [...state.basket, action.item], // whatever the basket was plus the action item
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't Remove product (id: ${action.id}) as its not in the basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
