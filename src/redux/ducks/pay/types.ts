export interface IPaginated {
    totalPages: number;
    pageSize: number;
    sortType: string;
    currentPage: number;
    totalRegistered: number;
    pageFrom: string;
    data: any[];
  }