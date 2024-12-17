const fetchURL = `https://pawsitivedaycare-backend.onrender.com`;

const createUser = async (userData) => {
    try {
      const response = await fetch(`${fetchURL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

const loginUser = async (loginFormData) => {
    
    try {
      const response = await fetch(`${fetchURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      return data;
    }
}


export { fetchURL };