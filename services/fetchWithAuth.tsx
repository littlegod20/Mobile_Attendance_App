import * as SecureStore from "expo-secure-store";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = await SecureStore.getItemAsync("authToken");

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // console.log("Fetching with options:", mergedOptions);

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export default fetchWithAuth;
