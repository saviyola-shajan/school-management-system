import axios from 'axios'
import { BASE_URL } from '../../constants/baseUrl.js'

export const adminApi =axios.create({
    baseURL:`${BASE_URL}/api`
})

