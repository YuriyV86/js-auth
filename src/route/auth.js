// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

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

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Користувач з таким email вже існує',
      })
    }

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

router.get('/recovery', function (req, res) {
  res.render('recovery', {
    // вказуємо назву контейнера
    name: 'recovery',
    // вказуємо назву компонентів
    component: ['back-button', 'field'],

    // вказуємо назву сторінки
    title: 'Recovery page',

    // вказуємо дані,
    data: {},
  })
})

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: `Помилка. Обов'язкові поля відсутні`,
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувача з таким email не існує`,
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: `Код для відновлення паролю відправлений`,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/recovery-confirm', function (req, res) {
  res.render('recovery-confirm', {
    // вказуємо назву контейнера
    name: 'recovery-confirm',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Recovery confirm page',

    // вказуємо дані,
    data: {},
  })
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  if (!code || !password) {
    return res.status(400).json({
      message: `Помилка. Обов'язкові поля відсутні`,
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: `Код не існує`,
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувач з таким email не існує`,
      })
    }

    user.password = password
    return res.status(200).json({
      message: `Пароль успішно змінено`,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
// Підключаємо роутер до бек-енду
module.exports = router
