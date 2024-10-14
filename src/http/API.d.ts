declare namespace API {

  export interface BaseHttpResult {
    code: string;
    message: string;
  }
  export interface HttpResult<D> {
    code: string;
    message: string;
    data: D;
  }

  export interface ItemsHttpResult<D> {
    code: string;
    message: string;
    data: {
      items: D
    };
  }
  export interface ItemsPaginationHttpResult<D> {
    code: string;
    message: string;
    data: {
      items: D,
      total: number;
      page: number;
      perPage: number;
      sort?: string;
      order?: string;
    };
  }

  export interface ItemsPaginationHasTotalAllHttpResult<D> {
    code: string;
    message: string;
    data: {
      datas: {
        items: D,
        total: number;
        page: number;
        perPage: number;
        sort?: string;
        order?: string;
      }
      totalAll: number
    };
  }
}

