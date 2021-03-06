/**
 * @description pagination function returns the number of pages
 *
 * @param { Number } limit - limit
 * @param { Number } offset - offset
 * @param { Number } count - count
 *
 * @returns { Object } result - result object
 */
const pagination = (limit, offset, count) => {
  const result = {};
  limit = limit > count ? count : limit;
  offset = offset > count ? count : offset;
  result.totalCount = count;
  result.currentPage = Math.floor(offset / limit) + 1;
  result.pageCount = Math.ceil(count / limit);
  result.pageSize = Number(limit);

  return result;
};

/**
 * @description paginates function returns the number of pages
 *
 * @param { Number } count - count
 * @param { Number } limit - limit
 * @param { Number } offset - offset
 *
 * @returns { Object } result - result object
 */
export const paginates = (count, limit, offset) => {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = limit;
  return {
    page,
    pageCount,
    pageSize,
    count
  };
};
export default pagination;
