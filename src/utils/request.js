function createFly () {
  if (mpvuePlatform === 'wx') {
    // mpvuePlatform是一个全局变量，判断当前平台
    // 如果是wx平台则引入flyio库进行网络请求
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

function handleError (err) {
  console.log(err)
}

// 封装一个get方法,方法返回一个promise，可以在调用之后加then处理
export function get(url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      // 当fly实例可以使用时，调用fly实例的get方法进行get请求
      fly.get(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0)
        {
          resolve(response) 
        } else {
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post(url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0)
        { 
          resolve(response) 
        } else {
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}
