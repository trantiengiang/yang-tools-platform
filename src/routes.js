import Home from './pages/Home'
import UtilityPage from './pages/UtilityPage'

/**
 * Khai báo routes cho ứng dụng
 * Thêm route mới vào đây khi cần
 */
export const routes = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/utility/:id',
    element: UtilityPage
  }
]

