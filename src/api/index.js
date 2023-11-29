import axios from "axios";
import { BASE_URL } from '../utils/config'

export const schedule = axios.create({
    baseURL: BASE_URL
})