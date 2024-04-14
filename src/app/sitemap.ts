import { MetadataRoute } from 'next';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

const getFrontmatters = async (path: string) => {
  const files = await readdir(path);
  return Promise.all(
    files.map(async (file) => {
      const content = (await readFile(`${path}/${file}`)).toString();
      return matter(content).data;
    })
  );
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, snippets] = await Promise.all([
    getFrontmatters('./posts'),
    getFrontmatters('./snippets'),
  ]);

  return [
    {
      url: '/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: '/posts',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogs.map(
      (frontmatter) =>
        ({
          url: `/blog/${frontmatter.slug}`,
          lastModified: new Date(frontmatter.date),
          changeFrequency: 'yearly',
          priority: 0.8,
        } as const)
    ),
    ...snippets.map(
      (frontmatter) =>
        ({
          url: `/snippets/${frontmatter.slug}`,
          lastModified: new Date(frontmatter.date),
          changeFrequency: 'yearly',
          priority: 0.5,
        } as const)
    ),
  ];
}
