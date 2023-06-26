import { getCollectionBlog } from '$core/services/getCollectionBlog'
import rss from '@astrojs/rss'

export const get = async () => {
  const blogs = await getCollectionBlog()

  const rssItems = blogs.map(item => {
    const { data, slug } = item

    return {
      title: data.title,
      description: data.subtitle ?? '',
      link: `/${slug}`,
      pubDate: new Date(data.date),
      draft: data.draft,
    }
  })

  return rss({
    title: 'NB GEARS Blog',
    description: 'The Story of NB GEARS',
    site: 'https://blog.nbgears.com',
    items: rssItems,
  })
}
