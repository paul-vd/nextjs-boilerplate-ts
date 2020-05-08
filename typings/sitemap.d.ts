import { SitemapItem } from 'sitemap'

declare interface SitemapConfigItem extends Omit<SitemapItem, 'img' | 'links' | 'video'> {
  img?: SitemapItem['img'] // transform type to optional
  links?: SitemapItem['links'] // transform type to optional
  video?: SitemapItem['video'] // transform type to optional
}
