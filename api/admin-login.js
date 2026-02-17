export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { password } = req.body

  if (password === "123") {
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ success: false })
  }
}
