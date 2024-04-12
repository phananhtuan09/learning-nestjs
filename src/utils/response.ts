import { ICommonResponseProps } from 'types/response';
import { DEFAULT_RESPONSE } from 'constants/response';

export function helperResponse(data: Partial<ICommonResponseProps>) {
  return {
    ...DEFAULT_RESPONSE,
    ...data,
  };
}
