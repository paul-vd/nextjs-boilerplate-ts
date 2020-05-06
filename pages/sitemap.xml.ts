import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import React from 'react'

import routes, { routeItem } from '../utils/routes'

const createSitemap = (baseUrl: string, routes: routeItem[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .filter((route) => route.hasOwnProperty('sitemapConfig'))
      .map(({ sitemapConfig, ...route }) => {
        return `
                <url>
                    <loc>${baseUrl}${sitemapConfig?.url || route.path}</loc>
                    ${sitemapConfig?.lastmod ? `<lastmod>${sitemapConfig?.lastmod}</lastmod>` : ''}
                    ${sitemapConfig?.changefreq ? `<changefreq>${sitemapConfig?.changefreq}</changefreq>` : ''}
                    ${sitemapConfig?.priority ? `<priority>${sitemapConfig?.priority}</priority>` : ''}
                </url>
            `
      })
      .join('')}
</urlset>
`

interface PageContext extends NextPageContext {
  req: NextApiRequest
  res: NextApiResponse
}

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }: PageContext) {
    const hostname = 'https://' + req.headers.host
    res.setHeader('Content-Type', 'text/xml')
    res.write(createSitemap(hostname, routes))
    res.end()
  }
}

export default Sitemap
