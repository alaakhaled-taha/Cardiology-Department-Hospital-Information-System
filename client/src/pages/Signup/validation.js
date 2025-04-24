// validation.js

export const validation = (data) => {
  const errors = [];

  // 1. Validate Password Confirmation
  if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match");
  }

  // 2. Validate Email Format (check for @gmail.com)
  const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  if (!emailPattern.test(data.email)) {
    errors.push("Please enter a valid Gmail address.");
  }

  // 3. Check if names have valid lengths
  if (!data.first_name || data.first_name.length <= 1) {
    errors.push("First name must be at least 2 characters long.");
  }

  if (!data.last_name || data.last_name.length <= 1) {
    errors.push("Last name must be at least 2 characters long.");
  }




  return errors;
};
