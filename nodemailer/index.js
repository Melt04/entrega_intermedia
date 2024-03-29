const { options } = require('yargs')
const logger = require('../logger')

const createTransport = require('nodemailer').createTransport

const transport = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.PASS
  }
})

module.exports = async function sendMail (mailOptions) {
  try {
    let options = {
      to: process.env.TEST_MAIL,
      ...mailOptions
    }

    const info = await transport.sendMail(options)
  } catch (error) {
    logger.error(error.message)
  }
}
