import { createRouter, createWebHistory } from 'vue-router'
import { Security } from '../components/security.js'
import Body from '../components/Body.vue'
import Login from '../components/Login.vue'
import Books from '../components/Books.vue'
import Book from '../components/Book.vue'
import BooksAdmin from '../components/BooksAdmin.vue'
import BookEdit from '../components/BookEdit.vue'
import Users from '../components/Users.vue'
import UserEdit from '../components/UserEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Body   
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/books',
    name: 'Books',
    component: Books 
  },
  {
    path: '/books/:bookName',
    name: 'Book',
    component: Book
  },
  {
    path: '/admin/books',
    name: 'BooksAdmin',
    component: BooksAdmin,
  },
  {
    path: '/admin/books/:bookId',
    name: 'BookEdit',
    component: BookEdit,
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/admin/users/:userId',
    name: 'UserEdit',
    component: UserEdit,
  }
]

const router = createRouter({history: createWebHistory(), routes})
// check token on every route change
router.beforeEach(() => {
  Security.checkToken();
})
export default router