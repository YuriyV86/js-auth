import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

class RecoveryForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    EMAIL: 'Введіть коректне значення e-mail адреси',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }
  }

  submit = async () => {
    if (this.disabled) {
      this.validateAll()
    } else {
      console.log(this.value)
    }

    this.setAlert('progress', 'Завантаження...')
    try {
      const res = await fetch('/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: this.convertData(),
      })

      const data = await res.json()

      if (res.ok) {
        this.setAlert('success', data.message)

        location.assign('/recovery-confirm')
      } else {
        this.setAlert('error', data.message)
      }
    } catch (err) {
      this.setAlert('error', err.message)
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
    })
  }
}

window.recoveryForm = new RecoveryForm()
