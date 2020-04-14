import React from "react";

import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

interface PageContext extends NextPageContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

class Robots extends React.Component {
  static async getInitialProps({ req, res }: PageContext) {
    const hostname = "https://" + req.headers.host;
    res.setHeader("Content-Type", "text/txt");
    res.write(`
    User-agent: *
    Sitemap: ${hostname}/sitemap.xml
    `);
    res.end();
  }
}

export default Robots;
