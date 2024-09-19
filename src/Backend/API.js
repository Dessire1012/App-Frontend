const API_URL =
  "https://app-ffb84f79-a617-43e4-b3ef-d4e15dbc138f.cleverapps.io/user";

export const loginUser = async (credentials) => {
  try {
    const payload = JSON.stringify(credentials);
    console.log("Request Payload:", payload);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Response Error Details:", errorDetails);
      throw new Error(`Network response was not ok: ${errorDetails.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/viewUser?id=${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const sentimentAnalysis = async (text) => {
  try {
    const response = await fetch(`${API_URL}/aws-function`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error analyzing the sentiment:", error);
    throw error;
  }
};
