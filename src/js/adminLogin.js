// index.js
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      api_url: "https://ec-course-api.hexschool.io/v2",
      api_path: "yuling2023",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
    //   console.log(this.api_url, this.user, this.password);
      axios
        .post(`${this.api_url}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res);
          alert(`${res.data.message}`);
          window.location = 'adminProducts-w2.html';
          // unix.timestamp
          //取得token
          const { expired, token } = res.data;
        //   console.log(expired, token);
          //儲存cookeie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        })
        .catch((err) => {
          // console.log(err);
          //   console.dir(err);
          alert(`${err.data.message}`);
        });
    }
  }
}).mount("#app");
