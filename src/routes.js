import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import UtilityPage from './pages/UtilityPage'
import SupportPage from './pages/SupportPage'

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
    path: '/category/:categoryId',
    element: CategoryPage
  },
  {
    path: '/utility/:id',
    element: UtilityPage
  },
  {
    path: '/support',
    element: SupportPage
  }
]
