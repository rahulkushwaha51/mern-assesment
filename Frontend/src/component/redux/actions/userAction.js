import axios from "axios";
import { server } from '../store/store'

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "signUpRequest" });
    const { data } = await axios.post(
      `${server}/signup`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    dispatch({ type: "signUpSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "signUpFail", payload: error.response.data.message });

  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};



