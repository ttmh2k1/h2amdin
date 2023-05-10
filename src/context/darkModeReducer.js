const DarkModeReducer = (state, action) => {
    switch (action.type) {
        case "MODE": {
            return {
                darkMode: !state.darkMode,
            };
        }
        default:
            return state;
    }
};

export default DarkModeReducer;