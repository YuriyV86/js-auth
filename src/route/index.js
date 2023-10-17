// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    // вказуємо назву контейнера
    name: 'index',

    // вказуємо назву компонентів
    component: [''],

    // вказуємо назву сторінки
    title: 'Index page',

    data: {},
  })
})

router.get('/home', function (req, res) {
  res.render('home', {
    // вказуємо назву контейнера
    name: 'home',

    // вказуємо назву компонентів
    component: [''],

    // вказуємо назву сторінки
    title: 'Home page',

    data: {},
  })
})

router.get('/logout', function (req, res) {
  res.render('logout', {
    // вказуємо назву контейнера
    name: 'logout',

    // вказуємо назву компонентів
    component: [''],

    // вказуємо назву сторінки
    title: 'Logout page',

    data: {},
  })
})

// Підключіть файли роутів
const auth = require('./auth')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', auth)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
