import React from "react";
import { SitemapItem, EnumChangefreq } from "sitemap";
import { SitemapStream, streamToPromise } from "sitemap";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

interface TransformedSitemapItem
  extends Omit<SitemapItem, "img" | "links" | "video"> {
  img?: SitemapItem["img"]; // transform type to optional
  links?: SitemapItem["links"]; // transform type to optional
  video?: SitemapItem["video"]; // transform type to optional
}

interface RouteItem {
  title: string; // title to display in components
  path: string;
  sitemap?: TransformedSitemapItem; // filter routes when constructing sitemap
  navigation: boolean | "main" | "footer"; // filter routes when constructing navigation [ true === ("main" && "footer") | false === "none" | "main" || "footer" ]
}

export const routes: RouteItem[] = [
  {
    title: "landing",
    path: "/",
    sitemap: {
      url: "/",
      changefreq: EnumChangefreq.YEARLY,
    },
    navigation: false,
  },
];

interface PageContext extends NextPageContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }: PageContext) {
    const hostname = "https://" + req.headers.host;
    res.setHeader("Content-Type", "text/xml");
    const smStream = new SitemapStream({ hostname });
    for (const route of routes) route.sitemap && smStream.write(route.sitemap);
    smStream.end();
    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
    res.write(sitemap);
    res.end();
  }
}

export default Sitemap;
