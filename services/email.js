const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = process.env.DEV_LINK
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        this.link = process.env.TEMP_LINK
        break
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'Alex Belozertsev',
        link: this.link,
      },
    })
    const email = {
      body: {
        name,
        intro:
          "Welcome to testing send system! We're very excited to have you on board.",
        action: {
          instructions: 'To get started working in testing the system of sending, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name)
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml,
    }
    console.log('Presend')
    const result = await this.sender.send(msg)
    console.log(result)
  }
}

module.exports = EmailService