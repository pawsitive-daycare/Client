const fetchURL = `https://pawsitivedaycare-backend.onrender.com` ;

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
      throw new Error(data.message || "Login failed. Please try again.");
    }

    return data;
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw new Error("An error occurred during login. Please try again.");
  }
};
const ourServices = [
  {
    service_name: "Pet Daycare",
    service_price: 100,
    service_description:
      "Keep your pet happy and healthy with play dates, exercise, and playful games, all supervised by our expert PAWsitive team",
  },
  {
    service_name: "Pet Grooming",
    service_price: 45,
    service_description:
      "We also offer grooming services so your pets can enjoy a bath, clip, and tidy, leaving them clean and looking their best!",
  },
  {
    service_name: "Dog Walking",
    service_price: 35,
    service_description:
      "We provide professional dog walking services to keep your furry friend active, happy, and well-exercised, no matter how busy your day gets!",
  },
];

export { fetchURL, createUser, loginUser, ourServices };
