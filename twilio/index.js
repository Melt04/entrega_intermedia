const twilio = require('twilio')
const accountSid = process.env.accountSid
const authToken = process.env.authToken
console.log(process.env.PORT)

module.exports = client = twilio(accountSid, authToken)
