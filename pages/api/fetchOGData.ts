import { NextApiResponse, NextApiRequest } from "next";
const og = require("open-graph");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url;
  if (req.method === "GET") {
    og(url, (error: any, meta: {}) => {
      if (!error) {
        res.status(200).json({ response: meta });
      } else {
        res.status(200).json({ response: {} });
      }
    });
  }
}
