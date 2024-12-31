// @ts-check
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

/** @typedef {import('@/types/post').Post} Post */

const postsDirectory = path.join(process.cwd(), 'data', 'md')

if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

function validatePostData(data) {
  const required = ['title', 'date', 'description'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  return data;
}

let postsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(query = '') {
  return `posts_cache_${query}`;
}

/**
 * @returns {Post[]}
 */
export function getSortedPostsData() {
  const cacheKey = getCacheKey();
  const now = Date.now();
  
  if (postsCache && postsCache[cacheKey] && (now - lastCacheTime) < CACHE_DURATION) {
    return postsCache[cacheKey];
  }

  // Add directory existence check
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory not found: ${postsDirectory}`);
    return [];
  }

  // Get file names under /data/md
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    try {
      // Verify file is markdown
      if (!fileName.endsWith('.md')) {
        return null;
      }

      // Read the file contents
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const validatedData = validatePostData(matterResult.data);

      // Combine the data with the id
      return {
        id: fileName.replace(/\.md$/, ''),
        ...validatedData,
      };
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
      return null;
    }
  }).filter(Boolean); // Remove null entries

  // Sort posts by date
  const sortedPostsData = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  // 更新缓存
  postsCache = {
    [cacheKey]: sortedPostsData
  };
  lastCacheTime = now;
  return sortedPostsData;
}

/**
 * @param {string} slug
 * @returns {Promise<Post>}
 */
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    // ... any other fields you want to include
  };
}

export async function getPostData2(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

/**
 * @returns {{ params: { slug: string } }[]}
 */
export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}