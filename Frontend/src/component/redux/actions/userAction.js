import axios from "axios";
import { server } from '../store/store'

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "signUpRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    };
    const { data } = await axios.post(
      `${server}/signup`,
      formData,
      config
    );
    dispatch({ type: "signUpSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "signUpFail", payload: error.response.data.message });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    };
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      config
    );
    localStorage.setItem('token', data.token); // Store the token after successful login
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};





