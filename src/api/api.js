import axios from "axios";
import { SysConstants } from "@/helpers";

/**
 * API 共用設定
 */
export class Api {
  static #axios = axios.create({
    baseURL: SysConstants.apiBaseUrl,
  });

  static get _axios() {
    return Api.#axios;
  }
}
