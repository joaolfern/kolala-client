import axios, { AxiosResponse } from 'axios'


interface IResponseBase<T = any> extends AxiosResponse {
  data: {
    status: string
    code: number
    success: boolean
    message?: string
    data?: T
  }
}


export class ErrInternetDisconnected extends Error {
  name = 'ERR_INTERNET_DISCONNECTED';
  message = 'Verifique sua conexão com a internet';
}

export class ConnectionFailed extends Error {
  name = 'CONNECTION_FAILED';
  message = 'Não foi possível se comunicar com o servidor';
}

export class RouteNotFound extends Error {
  name = 'NOT_FOUND';
  message = 'Rota não encontrada';
}


export async function Fetch <T> (request: () => Promise<AxiosResponse>): Promise<IResponseBase<T>> {
  try {
    const response: AxiosResponse = await request()
    return response
  } catch (err: any) {
      console.log('👽👽👽',err.response)
    if (axios.isCancel(err)) throw err
    if (err.name === 'ERR_INTERNET_DISCONNECTED') throw new ErrInternetDisconnected()
    if (err.response?.['_response']?.includes?.('Failed to connect to')) throw new ConnectionFailed()
    throw err
  }
}