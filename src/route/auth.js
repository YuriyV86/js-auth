// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@email.email',
  password: 123,
  role: 2,
})

// ================================================================

// router.get Створює нам один ентпоїнт
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    // вказуємо назву сторінки
    title: 'Signup page',

    // вказуємо дані,
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'користувач' },
        { value: User.USER_ROLE.ADMIN, text: 'адмін' },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'розробник',
        },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  console.log(req.body)

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    User.create({ email, password, role })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
