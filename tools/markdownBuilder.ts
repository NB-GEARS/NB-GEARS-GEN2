import * as fs from 'fs'
import * as path from 'path'

import { config } from 'dotenv'

import { reporter } from './services/reporter'
import { getBlogPosts } from './services/getBlogPosts'

config()

const rootMarkdownDirectory = path.join(process.cwd(), 'src/content/blog')
const stringifyArray = (strings: (string | number)[]) => {
  return `[${strings
    .map(o => (typeof o === 'string' ? `"${o.replace(/\"/g, '\\"')}"` : o))
    .join(', ')}]`
}

;(async () => {
  const command = process.argv[process.argv.length - 1]
  switch (command) {
    case 'build':
      const blogPosts = await getBlogPosts({
        preview: !['true', '1'].includes(process.env.CI ?? ''),
      })

      console.log('writing...')
      await Promise.all(
        blogPosts.map(blogPost => {
          const header = {
            title: `"${blogPost.title.replace(/\"/g, '\\"')}"`,
            subtitle: `"${blogPost.subtitle}"`,
            date: blogPost.date,
            author: blogPost.author ? blogPost.author.name : 'Unknown Author',
            categories: stringifyArray(
              blogPost.categoryCollection.items.map(o => o.name)
            ),
            banner: `\n${[
              ['url', blogPost.banner.url],
              ['width', blogPost.banner.width],
              ['height', blogPost.banner.height],
              ['placeholder', blogPost.banner.placeholder.encoded],
              ['blurhash', blogPost.banner.placeholder.blurhashCode],
            ]
              .map(([key, val]) => `  ${key}: ${val}`)
              .join('\n')}`,
            featured: blogPost.featured ? 'true' : 'false',
            draft: blogPost.sys.publishedAt === null,
          }

          const builtContent = `---\n${Object.entries(header)
            .map(([key, val]) => `${key}: ${val}`)
            .join('\n')}\n---\n\n${blogPost.content}`
          return fs.promises.writeFile(
            path.join(rootMarkdownDirectory, `${blogPost.slug}.md`),
            builtContent
          )
        })
      )
      break
    case 'clean':
      await Promise.all(
        fs
          .readdirSync(rootMarkdownDirectory)
          .filter(file => ['.md', '.mdx'].some(o => file.endsWith(o)))
          .map(file => fs.promises.rm(path.join(rootMarkdownDirectory, file)))
      )
      break
    default:
      reporter.fail('unrecognized command')
      process.exit(1)
  }
})()

export {}
