import Cookies from "universal-cookie";

export function getHeaders(req) {
    let token;
    if (typeof window === "undefined") {
        let cookies = new Cookies(req.headers.cookie);
        token = cookies.get("token");
    } else {
        token = window.localStorage.getItem("token");
    }
    let headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}