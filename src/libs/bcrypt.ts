import bcrypt from "bcryptjs";

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
