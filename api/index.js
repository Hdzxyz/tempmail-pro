import axios from "axios"

export default async function handler(req, res) {
  const { login, domain } = req.query

  try {
    const response = await axios.get(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`
    )
    res.status(200).json(response.data)
  } catch {
    res.status(500).json({ error: "Failed to fetch inbox" })
  }
}
