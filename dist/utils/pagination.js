"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description paginate function
 *
 * @param {Integer} limit - limit integer
 * @param {Integer} offset - offset integer
 * @param {integer} count - count integer
 *
 * @returns {object} result - result object
 */
var pagination = function pagination(limit, offset, count) {
  /** totalCount : total number of records based on query
   * pageCount : total number of pages
   * currentPage : current page of the query result based on limit and offset
   * pageSize : number of records per page (based on limit)
   */
  var result = {};
  limit = limit > count ? count : limit;
  offset = offset > count ? count : offset;
  result.totalCount = count;
  result.currentPage = Math.floor(offset / limit) + 1;
  result.pageCount = Math.ceil(count / limit);
  result.pageSize = Number(limit);

  return result;
};

exports.default = pagination;