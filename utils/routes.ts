import { SitemapConfigItem } from '../typings/sitemap'
import { EnumChangefreq } from '../typings/enum-sitemap'

export interface routeItem {
  title: string // title to display in components
  path: string
  sitemapConfig?: SitemapConfigItem // filter routes when constructing sitemap
  navigation: boolean | 'main' | 'footer' // filter routes when constructing navigation [ true === ("main" && "footer") | false === "none" | "main" || "footer" ]
}

const routes: routeItem[] = [
  {
    title: 'landing',
    path: '/',
    navigation: false,
    sitemapConfig: {
      url: '/',
      changefreq: EnumChangefreq.YEARLY,
    },
  },
]

export default routes
