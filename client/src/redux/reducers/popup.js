const initialState = {
  header: null,
  message: null,
  type: null,
};

const popup = (state = initialState, action) => {
  /* eslint-disable */
  switch (action.type) {
    case 'SET_POPUP':
      return { ...state, ...action.payload };
    case 'UNSET_POPUP':
      return {
        initialState,
      };
    default:
      return { ...state };
  }
};

export default popup;
