export function getImageFromLocalStorage() {
  if (localStorage.getItem('userImage')) {
    return localStorage.getItem('userImage')
  }
  return ''
}