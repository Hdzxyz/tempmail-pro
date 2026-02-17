let totalEmails = 0
let totalMessages = 0

export default function handler(req, res) {
  res.status(200).json({
    totalEmails,
    totalMessages,
    activeDomains: 3
  })
}
