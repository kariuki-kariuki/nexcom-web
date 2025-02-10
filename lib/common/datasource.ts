import Cookies from 'js-cookie';
import { API_URL, WS_URL } from './constans';
import { io, Socket } from 'socket.io-client';

enum CRUDMETHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

interface IFetch {
  method: CRUDMETHODS;
  path: string;
  body?: any;
  contentType?: boolean;
}

export interface ReturnType<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

class DataSource {
  // eslint-disable-next-line prettier/prettier
  constructor(private API_URL: string, private readonly WS_URL: string) { }

  // CRUD METHODS
  async get<T>(path: string): Promise<ReturnType<T>> {
    return this.handleFetch<T>({ method: CRUDMETHODS.GET, path });
  }
  async post<T>({formData, path, contentType}:{formData: any, path: string, contentType?: boolean}): Promise<ReturnType<T>> {
    return this.handleFetch<T>({
      method: CRUDMETHODS.POST,
      path,
      body: formData,
      contentType
    });
  }

  async update<T>(formData: any, path: string, contentType?: boolean): Promise<ReturnType<T>> {
    return this.handleFetch<T>({
      method: CRUDMETHODS.PATCH,
      path,
      body: formData,
      contentType
    });
  }

  async delete<T>(path: string): Promise<ReturnType<T>> {
    return this.handleFetch<T>({ method: CRUDMETHODS.DELETE, path });
  }

  async handleFetch<T>({ method, path, body, contentType = true }: IFetch) {
    let loading = true;
    let data: T | null = null;
    const token = this.getJwtToken();
    try {
      const res = await fetch(`${this.API_URL}/${path}`, {
        method,
        headers: contentType ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        } : {
          Authorization: `Bearer ${token}`

        },
        cache: "no-store",
        body: contentType ? JSON.stringify(body) : body,
      });

      if (!res.ok) {
        const refinedError: any = await res.json();
        const error = await this.handleError(refinedError.message);
        loading = false;
        return { data, error, loading };
      }
      data = await res.json();
      loading = false;
      return { data, error: null, loading };
    } catch (e: any) {
      loading = false;
      return { data, error: e.message, loading };
    }
  }

  getJwtToken() {
    const token = Cookies.get('Authentication');
    return token;
  }

  getSocket(): Socket {
    const socket: Socket = io(this.WS_URL, {
      extraHeaders: {
        authorization: `Bearer ${this.getJwtToken()}`,
      },
    });
    return socket;
  }


  async handleError(errors: string | Array<string>): Promise<string> {
    if (typeof errors === 'string') {
      return errors;
    }
    return errors[0];
  }

}

export const datasource = new DataSource(API_URL, WS_URL);
