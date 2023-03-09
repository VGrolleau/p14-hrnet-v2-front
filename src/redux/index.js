const { createSlice, configureStore } = require("@reduxjs/toolkit");

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: []
    },
    reducers: {
        createEmployee: (state, action) => {
            state = {
                ...state,
                employees: action.payload
            };
            return state;
        }
    }
});
export const { createEmployee } = employeeSlice.actions;

export const store = configureStore({
    reducer: {
        employee: employeeSlice.reducer
    }
});