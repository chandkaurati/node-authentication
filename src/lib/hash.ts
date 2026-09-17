import bcrypt from "bcryptjs"


export async function generateHash(value : any, salt = 10){
    const generatedSalt = await bcrypt.genSalt(salt);
    const hash = await bcrypt.hash(value, generatedSalt)

    return hash
}

export async function verifyHash(hash:any, value : any){
    return bcrypt.compare(hash, value)
}