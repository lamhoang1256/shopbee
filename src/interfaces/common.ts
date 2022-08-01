export interface IResponse {
  data?: any;
  message: string;
  status: number;
  success: boolean;
  [key: string]: any;
}
