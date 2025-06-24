import axios from "axios";

/**
 * API 共用設定
 */
export class Api {
  static #axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  static get _axios() {
    return Api.#axios;
  }
}
