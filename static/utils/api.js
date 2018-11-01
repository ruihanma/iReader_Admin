"use strict";

// 接口
let base    = "http://localhost:3001",
    api     = "/api";

const API = {
    base: base,

    book: {
        category: {

            list:   api + "/book/category/list",

            update: api + "/book/category/update",

            del:    api + "/book/category/del",
        }
    }
}
