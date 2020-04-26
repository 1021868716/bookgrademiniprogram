import { getOpenId } from "./index"
// 存放微信的api
// 获取用户信息的api
export function getSetting(auth, onSuccess, onFail) {
  // 判断用户是否具有传入的auth属性
  mpvue.getSetting({
    success(res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(err) {
      console.log(err) // 直接抛出异常
    }
  })
}

export function getUserInfo(onSuccess, onFail) {
  // 获取用户信息
  mpvue.getUserInfo({
    success(res) {
      const { userInfo } = res
      // 将res.userInfo保存下来执行传入的onSuccess
      if (userInfo) {
        onSuccess(userInfo)
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

export function setStorageSync(key, data) {
  // 调取缓存存数据
  mpvue.setStorageSync(key, data)
}

export function getStorageSync(key) {
  // 读取缓存读数据
  return mpvue.getStorageSync(key)
}

export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {
      if (res.code) {
        // 获取登录凭证（code）
        const code = res.code
        // 获取到用户的code传入 getOpenId函数发送网络请求获取用户openid
        getOpenId(code).then(
          res => {
            const openid = res.data.data.openid
            setStorageSync('openId', openid)
            callback && callback(openid)
          }).catch(err => console.log(err))
      } else {
        // 抛出异常
        console.log(res)
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

export function showLoading(title) {
  // 加载loading弹窗
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading(title) {
  // 清除loading弹窗
  mpvue.showLoading()
}

export function setNavigationBarTitle(title) {
  // 设置顶部导航栏标题
  mpvue.setNavigationBarTitle({title})
}