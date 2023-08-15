import { getCollectionBlog } from '$core/services/getCollectionBlog'

export const get = async () => {
  const blogs = await getCollectionBlog()

  const processedItems = blogs.slice(0, 12).map(item => ({
    url: `/blog/${item.slug}`,
    banner: {
      url: item.data.banner.url,
      width: item.data.banner.width,
      height: item.data.banner.height,
      hash: item.data.banner.blurhash,
    },
    title: item.data.title,
    subtitle: item.data.subtitle,
    date: item.data.date,
    featured: item.data.featured,
    categories: item.data.categories,
  }))
  const response = new Response(JSON.stringify(processedItems), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })

  return {
    body: JSON.stringify(processedItems),
    response,
  }
}
