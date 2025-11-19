export const confirmPasswordService = async (passwordData) => {
  const { password, confirmPassword } = passwordData;
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};
