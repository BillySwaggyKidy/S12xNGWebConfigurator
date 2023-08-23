import bcrypt from "bcrypt";

// this async function create a hashpassword from a plain password
export async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
    // Store hash in the database
}
 
// this async function compare a plain password with a hashedpassword from the database
export async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}