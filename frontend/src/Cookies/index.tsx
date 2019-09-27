const Cookies = {
  setCookie: (name: String, value: String, expireAt: Date) => {
    document.cookie = `${name}=${value}; expires=${expireAt.toUTCString()}; path=/`;
  },

  getCookie: (name: String) => {
    const parts = document.cookie.split(`${name}=`);
    if (parts.length < 2) {
      return null;
    }
    const target = parts.pop();
    if (target) {
      if (target.includes(";")) {
        return target.split(";")[0];
      }
      return target;
    }
    return null;
  },

  deleteCookie: (name: String) => {
    const date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
  },
};

export default Cookies;
