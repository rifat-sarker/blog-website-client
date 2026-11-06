export const slugify = (text) => {
  if (!text) return "";
  const raw = typeof text === "object" ? text.en || text.bn || "" : String(text);
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getArticleSlug = (article) => {
  if (!article) return "";
  if (article.slug) return article.slug;
  const title = typeof article.title === "object" ? article.title.en || article.title.bn || "" : article.title || "";
  const slug = slugify(title);
  return slug || article._id || article.id || "";
};

