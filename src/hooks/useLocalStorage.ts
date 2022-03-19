export default function useLocalStorage() {
  const post = (key: any, value: any) => {
    localStorage.setItem(key, value)
  }
  const get = (key: any) => {
    return localStorage.getItem(key)
  }
  const add = (key: any, value: any) => {
    const prev = localStorage.getItem(key) || 0
    localStorage.setItem(key, (value += Number(prev)))
  }
  const remove = (key: any) => {
    localStorage.removeItem(key)
  }

  return { get, add, post, remove }
}
