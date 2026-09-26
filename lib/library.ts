import { createClient } from "@/lib/supabase/server";

export type LibrarySearchInput = {
  query?: string;
  contentType?: string;
  limit?: number;
};

export type LibraryItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content_type: string;
  language: string;
  summary: string | null;
  tags: string[];
  topics: string[];
  cover_url: string | null;
  access_policy: string;
  difficulty: string | null;
  estimated_duration_seconds: number | null;
  reading_time_minutes: number | null;
  downloadable: boolean;
  featured: boolean;
  published_at: string | null;
};

const SEARCH_COLUMNS = [
  "id",
  "slug",
  "title",
  "subtitle",
  "content_type",
  "language",
  "summary",
  "tags",
  "topics",
  "cover_url",
  "access_policy",
  "difficulty",
  "estimated_duration_seconds",
  "reading_time_minutes",
  "downloadable",
  "featured",
  "published_at",
].join(",");

function normalizeLimit(value?: number) {
  if (!Number.isFinite(value)) return 24;
  return Math.min(Math.max(Math.trunc(value || 24), 1), 50);
}

function normalizeSearchTerm(value?: string) {
  return (value || "").trim().replace(/[%_]/g, "").slice(0, 100);
}

export async function searchLibrary(input: LibrarySearchInput = {}) {
  const supabase = await createClient();
  const limit = normalizeLimit(input.limit);
  const query = normalizeSearchTerm(input.query);

  let request = supabase
    .from("content_items")
    .select(SEARCH_COLUMNS)
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("sort_priority", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (input.contentType) {
    request = request.eq("content_type", input.contentType);
  }

  if (query) {
    request = request.ilike("title", `%${query}%`);
  }

  const { data, error } = await request;

  if (error) {
    throw new Error(`library_search_failed: ${error.message}`);
  }

  return (data || []) as unknown as LibraryItem[];
}

export async function getLibraryItem(slug: string) {
  const supabase = await createClient();
  const normalized = slug.trim().slice(0, 160);

  const { data, error } = await supabase
    .from("content_items")
    .select(SEARCH_COLUMNS)
    .eq("slug", normalized)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(`library_item_lookup_failed: ${error.message}`);
  }

  return data as unknown as LibraryItem | null;
}

export async function listLibraryCollections(limit = 24) {
  const supabase = await createClient();

  // The runtime schema already includes content_collections; this branch predates
  // the regenerated Supabase type snapshot that lands with the consolidated release.
  const { data, error } = await (supabase as any)
    .from("content_collections")
    .select("id,slug,title,description,collection_type,access_policy,cover_url,sort_priority,metadata")
    .eq("status", "published")
    .order("sort_priority", { ascending: false })
    .limit(normalizeLimit(limit));

  if (error) {
    throw new Error(`library_collections_failed: ${error.message}`);
  }

  return data || [];
}
