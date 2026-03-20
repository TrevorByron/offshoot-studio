import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  keywords?: string[]
  image?: string
  content: string
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "")
}

export function getAllPosts(): BlogPost[] {
  const dir = BLOG_DIR
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(raw)
    const slug = (data.slug as string) ?? getSlugFromFilename(filename)
    return {
      slug,
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      date: data.date ?? "",
      keywords: data.keywords,
      image: data.image,
      content,
    }
  })

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}
