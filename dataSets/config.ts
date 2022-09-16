import dotenv from 'dotenv'

dotenv.config()
export const dataPath = process.env.DATA_SET_PATH || 'DATA_SET_PATH is undefined'
export const lineEndRegExp = new RegExp(/\r\n/);
