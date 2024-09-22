const API_URL =
  "https://app-ffb84f79-a617-43e4-b3ef-d4e15dbc138f.cleverapps.io";

export const loginUser = async (credentials) => {
  try {
    const payload = JSON.stringify(credentials);
    console.log("Request Payload:", payload);

    const response = await fetch(`${API_URL}/user/login`, {
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
    const response = await fetch(`${API_URL}/user/register`, {
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
    const response = await fetch(`${API_URL}/user/viewUser?id=${id}`, {
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
      body: JSON.stringify({ body: text }),
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

export const invokeAgent = async (prompt) => {
  try {
    const response = await fetch(`${API_URL}/agent/invoke-agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentId: "BGELUFMFO8",
        agentAliasId: "4W3EKJWXTC",
        sessionId: 10,
        prompt: prompt,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error trying to reach agent:", error);
    throw error;
  }
};