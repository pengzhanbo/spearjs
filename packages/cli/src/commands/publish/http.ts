import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type * as FormData from 'form-data'
import { loadCliConfig } from '../../cliConfig'

export const getHttp = (target?: string) => {
  const config = loadCliConfig()!
  const http = axios.create({
    baseURL: target || config.repository,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  http.interceptors.response.use((response) => response.data)
  return http
}

export const updateWidget = async (http: AxiosInstance, formData: FormData) => {
  try {
    const res = await http.post('/widget/publish', formData, {
      headers: formData.getHeaders(),
    } as any)
    return res
  } catch (e: any) {
    throw e
  }
}
