import bcryptJs from 'bcryptjs';

const hashPassword = async (plainTextPass: string) => {
  try {
    return await bcryptJs.hash(plainTextPass, 10);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to hash password: ${error.message}`);
    } else {
      throw new Error(`Failed to hash password.`);
    }
  }
};

const matchPassword = async (plainTextPass: string, hashPass: string) => {
  try {
    return await bcryptJs.compare(plainTextPass, hashPass);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to match password: ${error.message}`);
    } else {
      throw new Error(`Failed to match password.`);
    }
  }
};

export { hashPassword, matchPassword };
