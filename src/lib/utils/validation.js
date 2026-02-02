import validator from 'validator';

export const validateSignup = (data) => {
  let { name, email, password } = data;
  
  if (!name || !email || !password) {
    return {
      valid: false,
      message: 'Name, email and password are required',
    };
  }

  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  // Checking for empty strings after trimming
  if (name === '' || email === '' || password === '') {
    return {
      valid: false,
      message: 'Fields cannot be empty or just whitespace',
    };
  }

  // Validating email format 
  if (!validator.isEmail(email)) {
    return {
      valid: false,
      message: 'Provide a valid email address',
    };
  }

  // Validating password strength
  if (!validator.isStrongPassword(password, { minLength: 8 })) {
    return {
      valid: false,
      message: 'Choose a stronger password with at least 8 characters, including uppercase, lowercase, numbers and symbols',
    };
  }

  return {
    valid: true,
    data: { name, email, password }
  };
};

export const validateLogin = (data) => {
  let { email, password } = data;
  
  if (!email || !password) {
    return {
      valid: false,
      message: 'Email and password are required',
    };
  }

  email = email.trim().toLowerCase();
  password = password.trim();

  // Checking for empty strings after trimming
  if (email === '' || password === '') {
    return {
      valid: false,
      message: 'Fields cannot be empty or just whitespace',
    };
  }

  // Validating email format 
  if (!validator.isEmail(email)) {
    return {
      valid: false,
      message: 'Provide a valid email address',
    };
  }

  return {
    valid: true,
    data: { email, password }
  };
};
