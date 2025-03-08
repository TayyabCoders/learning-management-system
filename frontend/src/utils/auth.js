import { useAuthStore } from "../store/auth";
import axios from "./axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const { data, status } = await axios.post(`user/token/`, {
      email,
      password,
    });

    if (status === 200) {
      setAuthUser(data.access, data.refresh);
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};

export const register = async (full_name, email, role, password, password2) => {
  try {
    const { data } = await axios.post(`user/register/`, {
      full_name,
      email,
      role,
      password,
      password2,
    });

    await login(email, password);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        `${error.response.data.full_name} - ${error.response.data.email}` ||
        "Something went wrong",
    };
  }
};

export const logout = () => {
  Cookie.remove("access_token");
  Cookie.remove("refresh_token");
  Cookie.remove("cartId");
  useAuthStore.getState().setUser(null);
  
};

export const setUser = async () => {
  const access_token = Cookie.get("access_token");
  const refresh_token = Cookie.get("refresh_token");

  if (!access_token || !refresh_token) {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setLoading(false);
    return;
  }

  try {
    if (isAccessTokenExpired(access_token)) {
      // Get new tokens using refresh token
      const response = await getRefreshedToken();
      if (response.access && response.refresh) {
        setAuthUser(response.access, response.refresh);
      } else {
        // If refresh fails, log out the user
        logout();
      }
    } else {
      setAuthUser(access_token, refresh_token);
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    logout();
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  Cookie.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookie.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const getRefreshedToken = async () => {
  try {
    const refresh_token = Cookie.get("refresh_token");
    const response = await axios.post(`user/token/refresh/`, {
      refresh: refresh_token,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}; 

export const isAccessTokenExpired = (access_token) => {
  try {
    const decodedToken = jwt_decode(access_token);
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};
