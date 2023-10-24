import axios from 'axios'

export default axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`
})
