import { Response } from 'express';

export const handleErrorResponse = (res: Response, error: any): void => {
  const status = error.response?.status || 500;
  const message = error.response?.data?.message || error.message || 'Unknown error';
  const code = error.response?.data?.code;
  
  res.status(status).json({
    error: message,
    code,
    details: error.response?.data || error.message
  });
}; 