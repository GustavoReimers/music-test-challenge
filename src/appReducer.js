export const initialState = {
  isPlaying: false,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "setIsPlaying":
      return {
        ...state,
        isPlaying: action.payload,
      };
    default:
      throw new Error();
  }
};
