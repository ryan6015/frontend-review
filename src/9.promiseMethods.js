/**
 * 实现Promise.all
 */
function promiseAll(promiseList) {
  // 校验参数
  if (!Array.isArray(promiseList)) {
    throw new Error('promiseAll argument must be an array')
  }
  // promise为0的时候之间返回
  if (promiseList.length === 0) {
    return Promise.resolve([])
  }

  let count = 0
  const len = promiseList.length
  const result = new Array(len)
  return new Promise((resolve, reject) => {
    promiseList.forEach((p, index) => {
      p.then((res) => {
        result[index] = res
        count++
        if (count === len) {
          resolve(result)
        }
      }).catch((e) => {
        reject(e)
      })
    })
  })
}

function promiseAllSetted(promiseList) {
  // 校验参数
  if (!Array.isArray(promiseList)) {
    throw new Error('promiseAll argument must be an array')
  }
  // promise为0的时候之间返回
  if (promiseList.length === 0) {
    return Promise.resolve([])
  }

  let count = 0
  const len = promiseList.length
  const result = new Array(len)
  return new Promise((resolve) => {
    promiseList.forEach((p, index) => {
      p.then((res) => {
        result[index] = {
          value: res,
          status: 'fulfilled',
        }
      })
        .catch((err) => {
          result[index] = {
            reason: err,
            status: 'rejected',
          }
        })
        .finally(() => {
          count++
          if (count === len) {
            resolve(result)
          }
        })
    })
  })
}

function promiseAny(promiseList) {
  // 校验参数
  if (!Array.isArray(promiseList)) {
    throw new Error('promiseAll argument must be an array')
  }
  // promise为0的时候之间返回
  if (promiseList.length === 0) {
    return Promise.reject(new AggregateError([]))
  }

  let count = 0
  const errors = []
  const len = promiseList.length
  return new Promise((resolve, reject) => {
    promiseList.forEach((p) => {
      p.then(resolve).catch((err) => {
        count++
        errors.push(err)
        if (count === len) {
          reject(new AggregateError(errors))
        }
      })
    })
  })
}

function promiseRace(promiseList) {
  // 校验参数
  if (!Array.isArray(promiseList)) {
    throw new Error('promiseAll argument must be an array')
  }

  // 如果传入的是空数组，返回的就是pending状态的Promise
  return new Promise((resolve, reject) => {
    promiseList.forEach((p) => p.then(resolve, reject))
  })
}

module.exports = { promiseAll, promiseAllSetted, promiseAny, promiseRace }