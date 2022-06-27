const { options } = require('yargs')

const createTransport = require('nodemailer').createTransport
const TEST_MAIL = 'demetris.pouros52@ethereal.email'
const transport = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'M27Uh89Dt1FDa8aRPJ'
  }
})

module.exports = async function sendMail (mailOptions) {
  try {
    let options = {
      to: TEST_MAIL,
      ...mailOptions
    }
    console.log(options)
    const info = await transport.sendMail(options)
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}
