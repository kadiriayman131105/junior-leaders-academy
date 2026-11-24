import type { SchoolPhoto } from "@/lib/photos";

type Cache = { at: number; posts: SchoolPhoto[] };
let memory: Cache | null = null;

function captionAlt(caption?: string) {
  const text = caption?.replace(/\s+/g, " ").trim();
  if (!text) return "Junior Leaders Academy · Instagram";
  return text.length > 120 ? `${text.slice(0, 117)}…` : text;
}

async function fromGraph(limit: number): Promise<SchoolPhoto[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;
  const user = process.env.INSTAGRAM_USER_ID || "me";
  const url = new URL(`https://graph.instagram.com/${user}/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const response = await fetch(url, { signal: AbortSignal.timeout(4000), cache: "no-store" });
  if (!response.ok) return [];
  const data = (await response.json()) as {
    data?: Array<{
      caption?: string;
      media_type?: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink?: string;
    }>;
  };

  return (data.data ?? [])
    .flatMap((item) => {
      const src = item.media_type === "VIDEO" ? item.thumbnail_url || item.media_url : item.media_url;
      if (!src || !item.permalink) return [];
      const photo: SchoolPhoto = {
        src,
        href: item.permalink,
        alt: captionAlt(item.caption),
        caption: item.caption,
        source: "instagram",
      };
      return [photo];
    })
    .slice(0, limit);
}

async function fromPublicProfile(limit: number): Promise<SchoolPhoto[]> {
  const response = await fetch(
    "https://www.instagram.com/api/v1/users/web_profile_info/?username=juniorleadersacademy",
    {
      signal: AbortSignal.timeout(1500),
      headers: {
        "User-Agent": "Mozilla/5.0",
        "X-IG-App-ID": "936619743392459",
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );
  if (!response.ok) return [];
  const json = (await response.json()) as {
    data?: {
      user?: {
        edge_owner_to_timeline_media?: {
          edges?: Array<{
            node?: {
              shortcode?: string;
              display_url?: string;
              thumbnail_src?: string;
              is_video?: boolean;
              edge_media_to_caption?: { edges?: Array<{ node?: { text?: string } }> };
            };
          }>;
        };
      };
    };
  };
  const edges = json.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
  return edges
    .flatMap((edge) => {
      const node = edge.node;
      const src = node?.is_video ? node.thumbnail_src || node.display_url : node?.display_url;
      if (!src || !node?.shortcode) return [];
      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text;
      const photo: SchoolPhoto = {
        src,
        href: `https://www.instagram.com/p/${node.shortcode}/`,
        alt: captionAlt(caption),
        caption,
        source: "instagram",
      };
      return [photo];
    })
    .slice(0, limit);
}

export async function getInstagramPosts(limit = 8): Promise<SchoolPhoto[]> {
  const ttl = process.env.NODE_ENV === "development" ? 60_000 : 30 * 60_000;
  if (memory && Date.now() - memory.at < ttl) return memory.posts.slice(0, limit);

  try {
    const graph = await fromGraph(limit);
    const posts = graph ?? (await fromPublicProfile(limit));
    memory = { at: Date.now(), posts };
    return posts.slice(0, limit);
  } catch {
    memory = { at: Date.now(), posts: [] };
    return [];
  }
}
