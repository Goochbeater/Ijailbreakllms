import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const jailbreaksDirectory = path.join(process.cwd(), 'content/jailbreaks');

// Get all blog posts
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Calculate reading time (average 200 words per minute)
      const wordCount = content.split(/\s+/g).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        content,
        readingTime,
        ...data,
      };
    });

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single post by slug
export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    content,
    readingTime,
    ...data,
  };
}

// Get all jailbreak posts
export function getAllJailbreaks() {
  if (!fs.existsSync(jailbreaksDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(jailbreaksDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(jailbreaksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const wordCount = content.split(/\s+/g).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        content,
        readingTime,
        ...data,
      };
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single jailbreak by slug
export function getJailbreakBySlug(slug) {
  const fullPath = path.join(jailbreaksDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    content,
    readingTime,
    ...data,
  };
}
