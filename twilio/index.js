const twilio = require('twilio')
const accountSid = process.env.accountSid
const authToken = process.env.authToken

module.exports = client = twilio(accountSid, authToken)
