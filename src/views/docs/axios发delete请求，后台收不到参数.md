## 1、问题；

> `vue`项目前台用`axios`发请求；由于之前也是一直用`axios`发请求，所以这一次遇到问题一脸懵逼；

- 请求方式：`delete`;请求头类型：`application/json, charset=utf-8`

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\1594913286812.png" alt="1594913286812" style="zoom:50%;" />

  ```
  看着没问题参数确实传了，但是后台就是收不到，
  ```

  > 后台我用的是`nodejs`

- 解决：`axios`的请求头设置错误；

  - 错的设置；

    ```js
    const _Axios = axios.create({
      // 解决线上的请求404问题；
      baseURL: process.env.NODE_ENV === 'production' ? 'http://11.114.1119.71:3000' : '',
      headers: {
        'Content-Type': 'application/json, charset=utf-8'
      }
    })
    ```

    > 看着没问题，和**官网**也一样。

  - 正确的设置；

    ```js
    const _Axios = axios.create({
      // 解决线上的请求404问题；
      baseURL: process.env.NODE_ENV === 'production' ? 'http://11.114.1119.71:3000' : '',
      header: {
        'Content-Type': 'application/json, charset=utf-8'
      }
    })
    // 或者
    axios.defaults.headers.post['Content-Type'] = 'application/json, charset=utf-8'
    ```

    > 去掉`headers`后的`s`就可以了，后台就成功收到参数了；
    >
    > 后面我又仔细查看了一下官网，确实是带有`s`的，不知道算不算一个`bug`;