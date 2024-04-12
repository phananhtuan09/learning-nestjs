interface IErrorProps {
  message?: string;
}

export interface ICommonResponseProps {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: any;
  errors: IErrorProps[];
}
