import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------------------------------------
// 1. SEND DATA TO BACKEND  
// ---------------------------------------------
export const submitRegistration = createAsyncThunk(
    "register/submitRegistration",
    async ({ role, data }, { rejectWithValue }) => {
        try {
            // -----------------------------------------
            // CITIZEN → SEND JSON (NOT FormData)
            // -----------------------------------------
            if (role === "Citizen") {
                const payload = {
                    fullName: data.fullName,
                    aadharNum: data.aadhar,
                    email: data.email,
                    mobileNum: data.phone,
                    dateOfBirth: data.dob,
                    password: data.password,
                };

                const response = await axios.post(
                    "http://localhost:8080/citizens/add",
                    payload,
                    { headers: { "Content-Type": "application/json" } }
                );

                return response.data;
            }

            // -----------------------------------------
            // LAWYER + NGO → THEY HAVE FILE UPLOADS → USE FORMDATA
            // -----------------------------------------
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("role", role);

            const response = await axios.post(
                "http://localhost:8080/" + role.toLowerCase() + "/add",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


// ---------------------------------------------
// 2. GET DATA FROM BACKEND 
// ---------------------------------------------
export const fetchRegistrations = createAsyncThunk(
    "register/fetchRegistrations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unable to fetch users");
        }
    }
);

// ---------------------------------------------
// INITIAL STATE 
// ---------------------------------------------
const initialState = {
    role: "Citizen",

    citizen: {
        fullName: "",
        aadhar: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: "",
    },

    lawyer: {
        fullName: "",
        email: "",
        phone: "",
        aadhar: "",
        aadharProof: null,
        barId: "",
        barState: "",
        specialization: "",
        barCert: null,
        experience: "",
        address: "",
        district: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: "",
    },

    ngo: {
        name: "",
        type: "",
        regNo: "",
        regCert: null,
        contact: "",
        officialEmail: "",
        address: "",
        district: "",
        city: "",
        state: "",
        pincode: "",
        password: "",
        confirmPassword: "",
    },

    loading: false,
    error: null,
    backendUsers: [],
};

// ---------------------------------------------
// REDUCER + ACTIONS
// ---------------------------------------------
const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },

        updateCitizen: (state, action) => {
            const { field, value } = action.payload;
            state.citizen[field] = value;
        },

        updateLawyer: (state, action) => {
            const { field, value } = action.payload;
            state.lawyer[field] = value;
        },

        updateNGO: (state, action) => {
            const { field, value } = action.payload;
            state.ngo[field] = value;
        },
    },

    extraReducers: (builder) => {
        // SUBMIT REGISTRATION
        builder
            .addCase(submitRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitRegistration.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Registration Successful:", action.payload);
            })
            .addCase(submitRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // FETCH USERS
        builder
            .addCase(fetchRegistrations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRegistrations.fulfilled, (state, action) => {
                state.loading = false;
                state.backendUsers = action.payload;
            })
            .addCase(fetchRegistrations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setRole, updateCitizen, updateLawyer, updateNGO } =
    registerSlice.actions;

export default registerSlice.reducer;
