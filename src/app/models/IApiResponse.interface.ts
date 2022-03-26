export interface IApiResponse<T> {
  message?: string;
  data: T;
}

export const defaultIApiResponse: IApiResponse<any> = {
  data: null,
};
