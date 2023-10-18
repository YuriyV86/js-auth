class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []

  static #count = 1

  constructor({ email, password, role }) {
    this.id = User.#count++
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.role = User.#convertRole(role)
    this.isConfirm = false
  }

  static #convertRole = (role) => {
    role = Number(role)

    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }

    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER

    return role
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)

    // console.log(this.#list)

    return user
  }

  static getByEmail(email) {
    email = String(email).toLowerCase()

    return (
      this.#list.find((user) => user.email === email) ||
      null
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = { User }
