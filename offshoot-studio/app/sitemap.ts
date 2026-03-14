import type { MetadataRoute } from "next"
import { getAllProjects } from "@/lib/recent-work"

const baseUrl = "https://tigerteamstudios.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()
  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/selected-work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/selected-work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
  ]
}
