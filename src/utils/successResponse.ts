import { Response } from "express";


// success response type
type THandlesResponse<T> = {
  success?: boolean,
  statusCode?: number,
  massage: string,
  mete?: {}
  data: T | T[] | null
}

/**
 * Handle all success response
 * @param res express response
 * @param data response data
 * @param statusCode HTTP status code
 */
const successResponse = <T>(res: Response, data: THandlesResponse<T>, statusCode?: number): void => {
  const code = statusCode || 200;
  res.status(code || 200).json({
    'success': true,
    'massage': data.massage,
    'mete': data.mete,
    'data': data.data
  });
}

export default successResponse;