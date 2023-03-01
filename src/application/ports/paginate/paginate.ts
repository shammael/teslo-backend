interface IPaginate<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPage?: number;
  offset: number;
  prevPage: number | null;
  nextPage: number | null;
  pagingCounter: number;
  meta: object;
}

export default IPaginate;
