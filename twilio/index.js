const twilio = require('twilio')
const accountSid = 'AC09a01133c1f9e72e58e0d1bc11c756d5'
const authToken = 'b41ca96f97366d4eb1bf1e0d056c7241'

module.exports = client = twilio(accountSid, authToken)
