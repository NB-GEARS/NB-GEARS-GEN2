import { getCollectionBlog } from '$core/services/getCollectionBlog'
import rss from '@astrojs/rss'

export const get = async () => {
  const blogs = await getCollectionBlog()

  const rssItems = blogs.map(item => {
    const { data, slug } = item

    return {
      title: data.title,
      description: data.subtitle ?? '',
      link: `/blog/${slug}`,
      pubDate: new Date(data.date),
      draft: data.draft,
    }
  })

  return rss({
    title: 'Siravij Blog',
    description: 'The Siravij Blog',
    site: 'https://siravijbb.me/blog',
    items: rssItems,
  })
}
