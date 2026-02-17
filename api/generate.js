export default function handler(req, res) {
  const domains = ["1secmail.com", "1secmail.org", "1secmail.net"]

  function randomString(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const login = randomString(10)
  const domain = domains[Math.floor(Math.random() * domains.length)]

  res.status(200).json({ email: `${login}@${domain}` })
}
