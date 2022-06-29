const { options } = require('yargs')

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
    console.log(options)
    const info = await transport.sendMail(options)
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}
