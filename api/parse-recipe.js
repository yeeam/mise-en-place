// Vercel serverless function: parse a recipe from a URL using schema.org/Recipe JSON-LD.
// GET /api/parse-recipe?url=<recipe page url>
// Returns { title, ingredients[], instructions[], tags[], cuisine, servings, time }.

export default async function handler(req, res) {
  const rawUrl = (req.query && req.query.url) || "";
  let target;
  try {
    target = new URL(rawUrl);
    if (!/^https?:$/.test(target.protocol)) throw new Error("bad protocol");
  } catch {
    return res.status(400).json({ error: "Please provide a valid http(s) URL." });
  }

  let html;
  try {
    const r = await fetch(target.href, {
      headers: {
        // Some sites block non-browser agents; present as a normal browser.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!r.ok) {
      return res.status(502).json({ error: `Couldn't load the page (HTTP ${r.status}).` });
    }
    html = await r.text();
  } catch {
    return res.status(502).json({ error: "Couldn't reach that URL." });
  }

  const recipe = extractRecipe(html);
  if (!recipe) {
    return res.status(422).json({
      error: "No structured recipe data found on that page. Enter the details manually.",
    });
  }
  return res.status(200).json(recipe);
}

// ---- helpers ----

function extractRecipe(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) blocks.push(m[1]);

  const candidates = [];
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(sanitizeJson(b));
    } catch {
      continue;
    }
    collectRecipes(data, candidates);
  }
  if (!candidates.length) return null;

  const r = candidates[0];
  const result = {
    title: clean(firstString(r.name)),
    ingredients: asStringArray(r.recipeIngredient || r.ingredients).map(stripTags).filter(Boolean),
    instructions: parseInstructions(r.recipeInstructions).map(clean).filter(Boolean),
    tags: buildTags(r),
    cuisine: clean(joinField(r.recipeCuisine)),
    servings: clean(firstString(r.recipeYield)),
    time: humanDuration(r.totalTime || r.cookTime || r.prepTime),
  };
  // Require at least a title or ingredients to be considered a hit.
  if (!result.title && !result.ingredients.length) return null;
  return result;
}

function collectRecipes(node, out) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n) => collectRecipes(n, out));
    return;
  }
  if (Array.isArray(node["@graph"])) node["@graph"].forEach((n) => collectRecipes(n, out));
  const t = node["@type"];
  const isRecipe = t === "Recipe" || (Array.isArray(t) && t.includes("Recipe"));
  if (isRecipe) out.push(node);
}

function parseInstructions(field) {
  if (!field) return [];
  if (typeof field === "string") return splitText(stripTags(field));
  if (!Array.isArray(field)) field = [field];
  const steps = [];
  for (const item of field) {
    if (typeof item === "string") {
      steps.push(stripTags(item));
    } else if (item && typeof item === "object") {
      if (Array.isArray(item.itemListElement)) {
        // HowToSection
        for (const s of item.itemListElement) {
          if (typeof s === "string") steps.push(stripTags(s));
          else if (s && s.text) steps.push(stripTags(s.text));
        }
      } else if (item.text) {
        steps.push(stripTags(item.text));
      } else if (item.name) {
        steps.push(stripTags(item.name));
      }
    }
  }
  return steps.flatMap((s) => splitText(s));
}

function buildTags(r) {
  const parts = []
    .concat(toArray(r.recipeCategory))
    .concat(toArray(r.keywords).flatMap((k) => String(k).split(",")));
  const seen = new Set();
  const out = [];
  for (let p of parts) {
    p = clean(String(p));
    const key = p.toLowerCase();
    if (p && !seen.has(key)) {
      seen.add(key);
      out.push(p);
    }
  }
  return out.slice(0, 12);
}

// Convert ISO-8601 duration (PT1H30M) to "1 hr 30 min".
function humanDuration(d) {
  if (!d || typeof d !== "string") return "";
  const m = d.match(/^P(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return "";
  const h = parseInt(m[1] || "0", 10);
  const min = parseInt(m[2] || "0", 10);
  if (!h && !min) return "";
  const bits = [];
  if (h) bits.push(`${h} hr`);
  if (min) bits.push(`${min} min`);
  return bits.join(" ");
}

function toArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
function asStringArray(v) {
  return toArray(v).map((x) => (typeof x === "string" ? x : x && x.name ? x.name : String(x)));
}
function firstString(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return firstString(v[0]);
  if (typeof v === "object") return v.name || "";
  return String(v);
}
function joinField(v) {
  return toArray(v).filter(Boolean).map(String).join(", ");
}
function splitText(s) {
  return String(s)
    .split(/\r?\n+/)
    .map((x) => x.trim())
    .filter(Boolean);
}
function stripTags(s) {
  return decodeEntities(String(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}
function clean(s) {
  return decodeEntities(String(s || "")).replace(/\s+/g, " ").trim();
}
function sanitizeJson(s) {
  // Replace raw control chars (invalid inside JSON strings) that break JSON.parse.
  return s.replace(/[\u0000-\u001F]/g, " ");
}
function decodeEntities(s) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
  return String(s).replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (full, code) => {
    if (named[code] != null) return named[code];
    if (code[0] === "#") {
      const num = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      if (!isNaN(num)) return String.fromCodePoint(num);
    }
    return full;
  });
}
