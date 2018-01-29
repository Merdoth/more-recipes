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

export default pagination;

