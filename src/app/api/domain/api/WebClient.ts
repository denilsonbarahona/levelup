import { Interceptors } from './Interceptors';
import { ApiResponse } from './Response';

export interface WebClient {
  // Client Configuration
  /** Setup initial configuration for the client, with a base URL and additional configuration in the options parameter
   * @param {string} baseUrl - The api base URL to use in the project
   * @param {Record<string, string>} options - Additional Options to configure the http client
   */
  setup: (baseUrl: string, options?: Record<string, string>) => void;

  /** Configure heading for your HTTP requests
   * @param {Record<string, string>} headers - Configure the headers for a particular http client
   */
  configureHeaders?: (headers: Record<string, string>) => void;

  /** Configure interceptors if the library supports it our if you want to add some
    middleware for your HTTP request
    @param {()=> ApiResponse}  onSuccess - Middleware for successful HTTP calls
    @param {()=> Error} onError - Middleware for unsuccessful HTTP calls
  */
  configureInterceptors?: (
    request?: Interceptors,
    response?: Interceptors
  ) => void;

  // HTTP Methods

  /** Method for fetching information from the HTTP Client
   * @param {string} url - The url resource to get the information
   * @param {Record<string, string>} headers - Additional headers for the request
   */
  get: <T = any>(
    url: string,
    headers?: Record<string, string>
  ) => Promise<ApiResponse<T>>;

  /** Method for posting information to a HTTP Client
   * @param {string} url - The url resource to post the information
   * @param {Record<string, string>} body - The data to be posted
   * @param {Record<string, string>} headers - Additional headers for the request
   */
  post: <T = any>(
    url: string,
    body: Record<string, string>,
    headers?: Record<string, string>
  ) => Promise<ApiResponse<T>>;

  /** Method for deleting information from the HTTP Client
   * @param {string} url - The url resource to delete the information
   * @param {Record<string, string>} headers - Additional headers for the request
   */
  delete: <T = any>(
    url: string,
    headers?: Record<string, string>
  ) => Promise<ApiResponse<T>>;

  /** Method for updating information from the HTTP Client
   * @param {string} url - The url resource to update the information
   *  @param {Record<string, string>} body - The data to be updated
   * @param {Record<string, string>} headers - Additional headers for the request
   */
  put: <T = any>(
    url: string,
    body: Partial<Record<string, string>>,
    headers?: Record<string, string>
  ) => Promise<ApiResponse<T>>;
}
