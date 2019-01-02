"use strict";

// 接口
let base = "http://localhost:3001",
  api = "/api";

const API = {
  base: base,

  project: {
    category: {

      list: api + "/project/category/list",

      update: api + "/project/category/update",

      del: api + "/project/category/del",
    },
  },

  book: {
    list: api + "/book/list",

    update: api + "/book/update",

    del: api + "/book/del",

    category: {

      list: api + "/book/category/list",

      update: api + "/book/category/update",

      del: api + "/book/category/del",
    },
    author: {
      list: api + "/book/author/list",

      update: api + "/book/author/update",

      del: api + "/book/author/del",
    }
  }
};

export default API