const api_url = "https://ec-course-api.hexschool.io/v2"; // 請加入站點
const api_path = "yuling2023"; // 請加入個人 API Path

// #1 如何串接 API 資料

const emailInput = document.querySelector("#username");
const pwInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const checkBtn = document.querySelector("#check");
const getProductsBtn = document.querySelector("#getProducts");
const addProductBtn = document.querySelector("#addProduct");
const delProductBtn = document.querySelector("#delProduct");

loginBtn.addEventListener("click", login);
let products = [];
function login() {
  const username = emailInput.value;
  const password = pwInput.value;

  const user = {
    username,
    password,
  };
  // console.log(username,password);
  // #2 發送 API 至遠端並登入（並儲存 Token）
  axios
    .post(`${api_url}/admin/signin`, user)
    .then((res) => {
      console.log(res);
      alert(`${res.data.message}`);
      // unix.timestamp
      //取得token
      const { expired, token } = res.data;
      console.log(expired, token);
      //儲存cookeie
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
    })
    .catch((err) => {
      console.log(err);
      console.dir(err);
      alert(`${err.data.message}`);
    });
}

checkBtn.addEventListener("click", checkLogin);
// #3 取得 Token（Token 僅需要設定一次）
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
//   console.log(token);
axios.defaults.headers.common["Authorization"] = token;
function checkLogin(params) {
  // #4  確認是否登入
  axios
    .post(`${api_url}/api/user/check`)
    .then((res) => {
      console.log(res);
      alert(`驗證成功`);
    })
    .catch((err) => {
      console.log(err);
      alert(`${err.data.message}`);
    });
}

getProductsBtn.addEventListener("click", getProducts);
function getProducts() {
  // #5 取得後台產品列表
  axios
    .get(`${api_url}/api/${api_path}/admin/products`)
    .then((res) => {
      console.log(res);
      alert(`已取得產品列表`)
    })
    .catch((err) => {
      console.log(err);
      alert(`${err.data.message}`);
    });
}

addProductBtn.addEventListener("click", addProduct);
function addProduct() {
  const product = {
    data: {
      title: "[賣]動物園造型褲子5",
      category: "褲子2",
      origin_price: 900,
      price: 799,
      unit: "個",
      description: "open設計師設計",
      content: "這是內容",
      is_enabled: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
    },
  };

  // #6 新增一個產品
  axios
  .post(`${api_url}/api/${api_path}/admin/product`,product)
  .then((res) => {
    console.log(res);
    alert(`已建立產品`)
  })
  .catch((err) => {
    console.log(err);
    alert(`${err.data.message}`);
  });
}

delProductBtn.addEventListener("click", removeProduct);
function removeProduct() {
  // #7 刪除一個產品
  axios
  .delete(`${api_url}/api/${api_path}/admin/product/-NLvH3J0Qwwhyff6B_wU`)
  .then((res) => {
    console.log(res);
    alert(`已刪除產品`)
  })
  .catch((err) => {
    console.log(err);
    alert(`${err.data.message}`);
  });
}
