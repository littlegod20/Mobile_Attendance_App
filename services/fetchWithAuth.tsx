import * as SecureStore from "expo-secure-store";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = await SecureStore.getItemAsync("authToken");

  const defaultOptions: RequestInit = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  // Determine if we're sending FormData
  const isFormData = options.body instanceof FormData;

  // Set Content-Type only if it's not FormData and not already set
  if (
    !isFormData &&
    !(options.headers as Record<string, string>)?.["Content-Type"]
  ) {
    (defaultOptions.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers as Record<string, string>),
    },
  };

  // For FormData, remove Content-Type to let the browser set it
  if (isFormData) {
    delete (mergedOptions.headers as Record<string, string>)["Content-Type"];
  }

  // console.log("Fetching with options:", mergedOptions);

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export default fetchWithAuth;
