import { ResponseData } from "@/api/type.ts";

export interface PagingRequest {
  page: number;
  limit: number;
}

export interface Records {
  id: number;
  createTime: string;
  updateTime: string;
  tmName: string;
  logUrl: string;
}

interface Paging {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders: [];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: null | number;
  maxLimit: null | number;
  searchCount: boolean;
  pages: number;
}

export interface PagingData extends ResponseData<Paging> {}
