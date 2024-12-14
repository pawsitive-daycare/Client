const fetchURL = `https://pawsitivedaycare-app-85af86a9e0d4.herokuapp.com`;

const login = async (email, password) => {
  try {
    const response = await fetch(`${fetchURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const signUp = async (userData) => {
  try {
    const response = await fetch(`${fetchURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export { login, signUp, fetchURL };