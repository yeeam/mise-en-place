import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const USER_KEY = "mise_user_v1";

const SEED_RECIPES = [{"id":1000,"url":"","title":"Basil Pork Stirfry (Pa Kra Pow)","ingredients":["2 tablespoons oil","4 cloves garlic, minced","2-4 Thai chilies, minced","1 lb ground pork","2 tablespoons fish sauce","1 tablespoon oyster sauce","1 tablespoon dark soy sauce","1 teaspoon sugar","1 cup Thai holy basil leaves"],"instructions":["Heat oil in a wok over high heat. Add garlic and Thai chilies, stir-fry 30 seconds until fragrant.","Add ground pork, breaking it apart. Cook until no longer pink, about 3-4 minutes.","Add fish sauce, oyster sauce, dark soy sauce, and sugar. Stir-fry 2 minutes.","Add Thai basil leaves, toss until wilted, about 30 seconds.","Serve over rice with a fried egg on top."],"tags":["Asian","Stir Fry","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1001,"url":"","title":"40 Clove Chicken","ingredients":["chicken","garlic (40 cloves)","white wine","thyme","olive oil","butter"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1002,"url":"","title":"African Peanut Stew","ingredients":["sweet potato","peanut butter","tomatoes","onion","garlic","ginger","broth","chicken"],"instructions":[],"tags":["African","Stew","Vegetarian-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"African","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1003,"url":"","title":"Asian Salmon","ingredients":["salmon","soy sauce","ginger","garlic","sesame oil","green onion"],"instructions":[],"tags":["Asian","Salmon","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1004,"url":"","title":"Asparagus Stuffed Chicken","ingredients":["4 boneless skinless chicken breasts","1 bunch asparagus, trimmed","4 oz cream cheese, softened","1/2 cup sun-dried tomatoes, chopped","1/4 cup parmesan, grated","2 cloves garlic, minced","salt and pepper","2 tablespoons olive oil"],"instructions":["Preheat oven to 400F.","Cut a deep pocket into each chicken breast.","Mix cream cheese, sun-dried tomatoes, parmesan, and garlic.","Stuff each breast with cream cheese mixture and 3-4 asparagus spears.","Season outside with salt and pepper. Sear in olive oil 3 min per side.","Transfer to oven and bake 18-20 minutes until chicken reaches 165F."],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1005,"url":"","title":"Baked Ziti","ingredients":["ziti pasta","ground beef","marinara sauce","ricotta","mozzarella","parmesan"],"instructions":[],"tags":["Italian","Pasta","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1006,"url":"","title":"Balsamic Pork Loin","ingredients":["pork loin","olive oil (1 cup)","balsamic vinegar (1 cup)"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Season meat & marinate in 1c olive oil, 1c balsamic. Bake 350° for 1hr (145° internal temp). Rest covered 10 min.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1007,"url":"","title":"Banana Bread Oatmeal (Acorn Squash)","ingredients":["acorn squash","banana","oats","cinnamon","maple syrup"],"instructions":[],"tags":["Breakfast","AIP","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. AIP-friendly.","cuisine":"Breakfast","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1008,"url":"","title":"Banh Mi Pickled Veggies","ingredients":["1 cup daikon radish, julienned","1 cup carrots, julienned","1/2 cup rice vinegar","1/2 cup warm water","1/4 cup sugar","1 teaspoon salt"],"instructions":["Julienne the daikon and carrots into thin matchsticks.","Dissolve sugar and salt in warm water and rice vinegar.","Add vegetables to the brine. Refrigerate at least 30 minutes.","Will keep in the fridge for up to 2 weeks."],"tags":["Asian","Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1009,"url":"https://www.hy-vee.com/discover/recipes/instant-pot-banh-mi-pork-sandwiches","title":"Banh Mi Pulled Pork","ingredients":["3.5 lbs pork shoulder","2 tsp Chinese five spice","2 tsp kosher salt","0.5 tsp ground black pepper","2 tbsp olive oil","0.5 cup seasoned rice vinegar","0.5 cup fresh lime juice","0.5 cup water","6 mini baguettes","0.5 cup chipotle mayonnaise","0.5 cup shredded carrots","0.25 cup radishes","0.5 cup cucumbers","0.25 cup green onions","0.25 cup fresh cilantro","1 jalapeno pepper"],"instructions":["Heat Instant Pot on the Sauté setting.","Rub pork with Chinese five spice, kosher salt, and black pepper; slice pork against the grain into 8 pieces. Add olive oil to Instant Pot and sear pork on all sides until a deep color develops, about 7 minutes. Add rice vinegar, lime juice, and water. Seal lid and pressure cook on HIGH for 1 hour.","Once pork has finished cooking, release seal and allow steam to escape naturally. Once steam has escaped, carefully remove the lid.","Remove pork from Instant Pot and shred into large pieces.","Spread mayonnaise onto split baguettes. Divide pork between 6 buns. Top with carrots, radishes, cucumber, green onions, fresh cilantro, and jalapenos, if desired."],"tags":["Asian","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1010,"url":"","title":"BBQ Pulled Pork","ingredients":["pork shoulder","bbq sauce","brown sugar","garlic powder","onion powder","smoked paprika"],"instructions":[],"tags":["American","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1011,"url":"","title":"Beef Pho","ingredients":["beef bones","brisket","star anise","cinnamon","cloves","fish sauce","rice noodles","bean sprouts","basil","lime"],"instructions":[],"tags":["Asian","Beef","Soup","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1012,"url":"https://www.allrecipes.com/recipe/14685/slow-cooker-beef-stew-i/","title":"Beef Stew","ingredients":["2 lb beef stew meat (chuck), cut into 1-inch cubes","3 tablespoons olive oil","1 onion, diced","3 cloves garlic, minced","2 tablespoons tomato paste","1/3 cup flour","1 cup red wine","4 cups beef broth","3 carrots, peeled and sliced","3 potatoes, cubed","2 stalks celery, sliced","1 teaspoon thyme","1 teaspoon rosemary","salt and pepper"],"instructions":["Season beef with salt and pepper. Brown in batches in olive oil in a Dutch oven over medium-high heat. Set aside.","Saute onion and garlic until softened. Add tomato paste, cook 1 minute.","Sprinkle flour over onions, stir 1 minute. Deglaze with red wine, scraping up browned bits.","Add broth, return beef, add carrots, potatoes, celery, thyme, and rosemary.","Bring to a boil, then cover and braise in a 325F oven for 2-3 hours until beef is tender.","Adjust seasoning and serve."],"tags":["American","Beef","Dutch Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Braise for 3+ hours in dutch oven.","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1099,"url":"","title":"Nina's Sausage & Peppers","ingredients":["italian sausage (casing removed)","red peppers","green peppers","onion","garlic","tomato sauce","oregano","basil"],"instructions":[],"tags":["Italian","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Tomato sauce, oregano, basil. Chopped red peppers, green peppers, onion & garlic. Remove sausage casing.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]}];

const MEMBER_COLORS = { "Amy": "#ff492c", "default": "#5938a2" };
function getMemberColor(name) { return MEMBER_COLORS[name] || "#23cca2"; }

// ── DB helpers ──
function rowToRecipe(row) {
  return {
    id: row.id,
    url: row.url || "",
    title: row.title,
    ingredients: row.ingredients || [],
    instructions: row.instructions || [],
    tags: row.tags || [],
    servings: row.servings || "",
    time: row.time || "",
    rating: row.rating || 0,
    favorite: row.favorite || false,
    dateAdded: row.date_added,
    notes: row.notes || "",
    cuisine: row.cuisine || "",
    ease: row.ease || "",
    addedBy: row.added_by,
    // cookLog entries: either legacy ISO strings or new {date,note,rating} objects
    cookLog: (row.cook_log || []),
    shareToken: row.share_token || null,
    isShared: row.is_shared || false,
  };
}

function recipeToRow(recipe) {
  return {
    title: recipe.title,
    url: recipe.url || "",
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
    tags: recipe.tags || [],
    servings: recipe.servings || "",
    time: recipe.time || "",
    rating: recipe.rating || 0,
    favorite: recipe.favorite || false,
    date_added: recipe.dateAdded || new Date().toISOString(),
    notes: recipe.notes || "",
    cuisine: recipe.cuisine || "",
    ease: recipe.ease || "",
    added_by: recipe.addedBy || "Unknown",
    cook_log: recipe.cookLog || [],
    share_token: recipe.shareToken || null,
    is_shared: recipe.isShared || false,
  };
}

// ── Cook log helpers ──
function normalizeCookEntry(entry) {
  if (typeof entry === "string") return { date: entry, note: "", rating: 0 };
  return entry;
}
function cookEntryDate(entry) {
  return typeof entry === "string" ? entry : entry.date;
}

// ── Sort utility ──
function sortRecipes(arr, sortBy) {
  const copy = [...arr];
  switch (sortBy) {
    case "az": return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "za": return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "rating": return copy.sort((a, b) => {
      if ((b.rating||0) !== (a.rating||0)) return (b.rating||0) - (a.rating||0);
      return a.title.localeCompare(b.title);
    });
    case "never_made": return copy.sort((a, b) => {
      const ac = (a.cookLog||[]).length, bc = (b.cookLog||[]).length;
      if (ac !== bc) return ac - bc;
      return a.title.localeCompare(b.title);
    });
    case "recent": {
      const latest = r => {
        const log = r.cookLog || [];
        if (!log.length) return 0;
        return Math.max(...log.map(e => new Date(cookEntryDate(e)).getTime()));
      };
      return copy.sort((a, b) => {
        const diff = latest(b) - latest(a);
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
      });
    }
    case "added": return copy.sort((a, b) => {
      const diff = new Date(b.dateAdded||0) - new Date(a.dateAdded||0);
      return diff !== 0 ? diff : a.title.localeCompare(b.title);
    });
    default: return copy;
  }
}

const views = { HOME:"home", DETAIL:"detail", ADD:"add", FAVORITES:"favorites", LOG:"log", SHARED:"shared", PLAN:"plan" };

// ── Sub-components ──

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange && onChange(n)}
          style={{ cursor:onChange?"pointer":"default", fontSize:20, color:n<=(hover||value)?"#ff492c":"#ddd", transition:"color 0.15s" }}>★</span>
      ))}
    </div>
  );
}

function MiniStarPicker({ value, onChange, size=22 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n === value ? 0 : n)}
          style={{ cursor:"pointer", fontSize:size, color:n<=(hover||value)?"#ffd200":"#ddd", transition:"color 0.1s", userSelect:"none" }}>★</span>
      ))}
    </div>
  );
}

function Avatar({ name, size=28 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:getMemberColor(name), color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.4, fontWeight:700, flexShrink:0 }}>
      {(name||"?")[0].toUpperCase()}
    </div>
  );
}

function RecipeCard({ recipe, onClick, onFav }) {
  const daysSince = recipe.cookLog?.length > 0
    ? Math.floor((Date.now() - new Date(cookEntryDate(recipe.cookLog[recipe.cookLog.length-1])).getTime()) / 86400000)
    : null;
  const overdue = daysSince === null || daysSince > 30;
  return (
    <div onClick={onClick}
      style={{ background:"#fff", borderRadius:16, overflow:"hidden", cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", transition:"transform 0.18s, box-shadow 0.18s", position:"relative" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.07)"; }}>
      <div style={{ height:110, background:"linear-gradient(135deg,#062846 0%,#5938a2 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, position:"relative" }}>
        🍽️
        {overdue && (
          <div style={{ position:"absolute", top:8, right:8, background:"#ffd200", borderRadius:20, padding:"2px 7px", fontSize:9, fontWeight:800, color:"#062846" }}>
            {daysSince === null ? "NEVER MADE" : `${daysSince}d ago`}
          </div>
        )}
      </div>
      <div style={{ padding:"12px 14px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:700, color:"#062846", lineHeight:1.3, flex:1, marginRight:6 }}>{recipe.title}</div>
          <span onClick={e => { e.stopPropagation(); onFav(recipe.id); }}
            style={{ fontSize:17, cursor:"pointer", color:recipe.favorite?"#ff492c":"#ccc", flexShrink:0, transition:"color 0.15s" }}>♥</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:7 }}>
          <StarRating value={recipe.rating||0} />
          {recipe.addedBy && <Avatar name={recipe.addedBy} size={22} />}
        </div>
        {recipe.tags?.length > 0 && (
          <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:3 }}>
            {recipe.tags.slice(0,3).map(t => <span key={t} style={{ background:"#f0f4ff", color:"#5938a2", borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:600 }}>{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner({ label="Working…" }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"32px 0" }}>
      <div style={{ width:40, height:40, borderRadius:"50%", border:"3px solid #f0f0f0", borderTop:"3px solid #ff492c", animation:"spin 0.8s linear infinite" }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ color:"#888", fontSize:13 }}>{label}</div>
    </div>
  );
}

// ── FEATURE 1: Import from URL ──
function ImportFromUrl({ onImport }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleImport = async () => {
    if (!url.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const proxyRes = await fetch(proxyUrl);
      if (!proxyRes.ok) throw new Error("Could not fetch that URL. Check the link and try again.");
      const { contents: rawHtml } = await proxyRes.json();
      if (!rawHtml) throw new Error("Page returned no content.");

      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, "text/html");
      ["script","style","nav","footer","header","aside","iframe","noscript"].forEach(tag =>
        doc.querySelectorAll(tag).forEach(el => el.remove())
      );
      const recipeArea = doc.querySelector('[class*="recipe"]') || doc.querySelector('[id*="recipe"]') || doc.querySelector("article") || doc.querySelector("main") || doc.body;
      const textContent = (recipeArea?.innerText || recipeArea?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 6000);
      if (textContent.length < 100) throw new Error("Couldn't extract text from that page. Try adding manually.");

      const prompt = `Extract the recipe from this webpage text and return ONLY valid JSON with these exact fields. No markdown, no explanation, just the JSON object.

Required fields:
- title: string
- ingredients: array of strings
- instructions: array of strings (each step as one string)
- cuisine: string (e.g. "American", "Italian", "Asian")
- ease: one of "Easy", "Medium", "Hard"
- tags: array of strings (cuisine + main protein + method, e.g. ["Italian","Chicken","Weeknight"])
- servings: string (e.g. "4")
- time: string (e.g. "45 min")
- notes: string (tips or storage info, empty string if none)

Webpage text:
${textContent}`;

      const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role:"user", content:prompt }] })
      });
      const apiData = await apiRes.json();
      if (!apiRes.ok || apiData.error) throw new Error(apiData.error?.message || "Import failed — try again.");

      const rawText = apiData.content?.find(b => b.type === "text")?.text || "";
      const cleanJson = rawText.replace(/```json|```/g, "").trim();
      let parsed;
      try { parsed = JSON.parse(cleanJson); }
      catch { throw new Error("Could not parse the recipe. Try adding manually."); }

      parsed.url = url;
      setStatus("success");
      onImport(parsed);
      setUrl("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Import failed.");
    }
  };

  return (
    <div style={{ background:"#f7f6f3", borderRadius:12, padding:"16px 18px", marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:6 }}>Import from URL</div>
      <p style={{ fontSize:12, color:"#aaa", margin:"0 0 10px" }}>Paste a link from AllRecipes, Serious Eats, Budget Bytes, Smitten Kitchen, and more.</p>
      <div style={{ display:"flex", gap:8 }}>
        <input type="url" value={url} onChange={e => { setUrl(e.target.value); setStatus("idle"); }}
          placeholder="https://www.allrecipes.com/recipe/..."
          disabled={status === "loading"}
          onKeyDown={e => e.key === "Enter" && handleImport()}
          style={{ flex:1, padding:"9px 13px", borderRadius:8, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
        <button onClick={handleImport} disabled={!url.trim() || status === "loading"}
          style={{ padding:"9px 16px", borderRadius:8, border:"none", background:!url.trim()||status==="loading"?"#ddd":"#ff492c", color:!url.trim()||status==="loading"?"#999":"#fff", fontWeight:700, fontSize:13, cursor:!url.trim()||status==="loading"?"not-allowed":"pointer", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif" }}>
          {status === "loading" ? "Importing…" : "Import"}
        </button>
      </div>
      {status === "success" && <p style={{ marginTop:8, fontSize:12, color:"#23cca2", fontWeight:600 }}>Recipe imported — review the fields below and save.</p>}
      {status === "error" && <p style={{ marginTop:8, fontSize:12, color:"#ff492c" }}>{errorMsg}</p>}
    </div>
  );
}

// ── FEATURE 3: Meal Planner ──
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  d.setHours(0,0,0,0);
  return d;
}

function MealPlanner({ recipes, onSelectRecipe }) {
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [plan, setPlan] = useState({});
  const [picker, setPicker] = useState(null);
  const [search, setSearch] = useState("");

  const key = `mealplan_${weekStart.toISOString().slice(0,10)}`;
  useEffect(() => {
    const saved = localStorage.getItem(key);
    setPlan(saved ? JSON.parse(saved) : {});
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(plan));
  }, [plan, key]);

  const assign = (recipeId) => {
    if (!picker) return;
    setPlan(prev => ({ ...prev, [`${picker.day}_Dinner`]: recipeId }));
    setPicker(null);
    setSearch("");
  };
  const remove = (day, e) => { e.stopPropagation(); setPlan(prev => { const n = {...prev}; delete n[`${day}_Dinner`]; return n; }); };
  const getR = id => recipes.find(r => r.id === id);

  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
  const fmtOpts = { month:"short", day:"numeric" };
  const weekLabel = `${weekStart.toLocaleDateString("en-US", fmtOpts)} – ${weekEnd.toLocaleDateString("en-US", fmtOpts)}`;

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.tags||[]).some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const today = new Date();

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846" }}>Meal Plan</div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate()-7); setWeekStart(d); }}
            style={{ width:30, height:30, borderRadius:8, border:"1.5px solid #e5e5e5", background:"#fff", cursor:"pointer", fontSize:15, color:"#555" }}>←</button>
          <span style={{ fontWeight:600, fontSize:13, color:"#333", minWidth:150, textAlign:"center" }}>{weekLabel}</span>
          <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate()+7); setWeekStart(d); }}
            style={{ width:30, height:30, borderRadius:8, border:"1.5px solid #e5e5e5", background:"#fff", cursor:"pointer", fontSize:15, color:"#555" }}>→</button>
          <button onClick={() => setPlan({})}
            style={{ padding:"5px 11px", borderRadius:8, border:"1.5px solid #e5e5e5", background:"transparent", color:"#aaa", fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8 }}>
        {DAYS.map((day, i) => {
          const date = new Date(weekStart); date.setDate(date.getDate() + i);
          const isToday = today.toDateString() === date.toDateString();
          const recipe = getR(plan[`${day}_Dinner`]);
          return (
            <div key={day} style={{ background:"#fff", borderRadius:12, border:isToday?"2px solid #ff492c":"1.5px solid #eee", overflow:"hidden", minHeight:130 }}>
              <div style={{ padding:"6px 8px", background:isToday?"#ff492c":"#062846", color:"#fff" }}>
                <div style={{ fontSize:11, fontWeight:700 }}>{day}</div>
                <div style={{ fontSize:10, opacity:0.7 }}>{date.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
              </div>
              <div style={{ padding:7 }}>
                <div onClick={() => { setPicker({ day }); setSearch(""); }}
                  style={{ borderRadius:8, padding:"7px 8px", background:recipe?"#f0fff8":"#fafafa", border:recipe?"1.5px solid #23cca2":"1.5px dashed #ddd", cursor:"pointer", minHeight:60, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>Dinner</div>
                  {recipe ? (
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <span style={{ fontSize:11, fontWeight:600, color:"#062846", lineHeight:1.3 }}>{recipe.title}</span>
                      <button onClick={e => remove(day,e)} style={{ background:"none", border:"none", color:"#ccc", cursor:"pointer", fontSize:13, padding:0, lineHeight:1, marginLeft:3, flexShrink:0 }}>×</button>
                    </div>
                  ) : (
                    <span style={{ fontSize:10, color:"#ccc" }}>+ add</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {picker && (
        <div onClick={() => { setPicker(null); setSearch(""); }}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:440, maxHeight:"70vh", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ padding:"18px 18px 12px", borderBottom:"1px solid #eee" }}>
              <p style={{ margin:"0 0 10px", fontWeight:700, fontSize:14, color:"#062846" }}>{picker.day} · Dinner</p>
              <input autoFocus type="text" placeholder="Search recipes…" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #ddd", fontSize:13, boxSizing:"border-box", outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
            </div>
            <div style={{ overflowY:"auto", flex:1 }}>
              {filtered.map(r => (
                <div key={r.id} onClick={() => assign(r.id)}
                  style={{ padding:"11px 18px", borderBottom:"1px solid #f5f5f5", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}
                  onMouseEnter={e => e.currentTarget.style.background="#f8f8f8"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:13, color:"#062846" }}>{r.title}</div>
                    <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>{(r.tags||[]).slice(0,3).join(" · ")}</div>
                  </div>
                  {r.rating > 0 && <span style={{ fontSize:12, color:"#ffd200", fontWeight:700 }}>{"★".repeat(r.rating)}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FEATURE 6: Sort bar ──
const SORT_OPTIONS = [
  { value:"az", label:"A → Z" },
  { value:"rating", label:"Top rated" },
  { value:"never_made", label:"Never made" },
  { value:"recent", label:"Last cooked" },
  { value:"added", label:"Recently added" },
];

function SortBar({ sortBy, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:14 }}>
      <span style={{ fontSize:11, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.07em", flexShrink:0 }}>Sort:</span>
      {SORT_OPTIONS.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          style={{ padding:"4px 11px", borderRadius:20, border:"1.5px solid", borderColor:sortBy===opt.value?"#062846":"#e5e5e5", background:sortBy===opt.value?"#062846":"#fff", color:sortBy===opt.value?"#fff":"#666", fontSize:11, fontWeight:sortBy===opt.value?700:400, cursor:"pointer", transition:"all 0.12s", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif" }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── FEATURE 7: Log Cook Modal ──
function LogCookModal({ isOpen, onClose, onSave, recipeName }) {
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);
  if (!isOpen) return null;
  const handleSave = () => {
    onSave({ date: new Date().toISOString(), note: note.trim(), rating });
    setNote(""); setRating(0); onClose();
  };
  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:420, padding:26, boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:900, color:"#062846", marginBottom:4 }}>Logged!</div>
        <p style={{ margin:"0 0 18px", fontSize:13, color:"#888" }}>{recipeName}</p>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:7 }}>How did it go? (optional)</label>
          <textarea autoFocus value={note} onChange={e => setNote(e.target.value)}
            placeholder="Kids loved it, doubled the garlic, served with rice…"
            rows={3}
            style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1.5px solid #e5e5e5", fontSize:13, resize:"vertical", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", outline:"none", lineHeight:1.5 }} />
        </div>
        <div style={{ marginBottom:22 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Rate this cook (optional)</label>
          <MiniStarPicker value={rating} onChange={setRating} size={24} />
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={handleSave}
            style={{ flex:1, padding:12, borderRadius:10, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Save
          </button>
          <button onClick={onClose}
            style={{ padding:"12px 16px", borderRadius:10, border:"1.5px solid #e5e5e5", background:"transparent", color:"#888", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FEATURE 7: Cook history on detail page ──
function CookHistory({ cookLog }) {
  const entries = (cookLog || []).map(normalizeCookEntry).reverse();
  if (entries.length === 0) {
    return (
      <div style={{ marginTop:14, background:"#f7f6f3", borderRadius:10, padding:"10px 14px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#aaa", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Cook history</div>
        <div style={{ fontSize:12, color:"#bbb" }}>Not made yet — hit "I made this" after cooking.</div>
      </div>
    );
  }
  return (
    <div style={{ marginTop:14, background:"#f7f6f3", borderRadius:10, padding:"10px 14px" }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#aaa", marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 }}>
        Cook history · {entries.length}×
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {entries.map((entry, i) => {
          const d = new Date(entry.date);
          const diffDays = Math.floor((Date.now() - d.getTime()) / 86400000);
          const ago = diffDays === 0 ? "today" : diffDays === 1 ? "yesterday" : diffDays < 7 ? `${diffDays}d ago` : d.toLocaleDateString();
          return (
            <div key={i} style={{ background:"#fff", borderRadius:8, padding:"9px 11px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:entry.rating||entry.note ? 6 : 0 }}>
                <span style={{ fontSize:12, fontWeight:600, color:"#062846" }}>{d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                <span style={{ fontSize:11, color:"#aaa" }}>{ago}</span>
              </div>
              {entry.rating > 0 && (
                <div style={{ display:"flex", gap:2, marginBottom:entry.note?4:0 }}>
                  {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize:12, color:n<=entry.rating?"#ffd200":"#ddd" }}>★</span>)}
                </div>
              )}
              {entry.note && <p style={{ margin:0, fontSize:12, color:"#555", lineHeight:1.5 }}>{entry.note}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(views.HOME);
  const [selected, setSelected] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(USER_KEY) || "");
  const [showUserModal, setShowUserModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  // Sort state (Feature 6)
  const [sortBy, setSortBy] = useState("az");

  // Log cook modal state (Feature 7)
  const [logModalOpen, setLogModalOpen] = useState(false);

  // Add/import form state
  const [manualTitle, setManualTitle] = useState("");
  const [manualIngredients, setManualIngredients] = useState("");
  const [manualInstructions, setManualInstructions] = useState("");
  const [manualTags, setManualTags] = useState("");
  const [manualCuisine, setManualCuisine] = useState("");
  const [manualEase, setManualEase] = useState("");
  const [manualNotes, setManualNotes] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [manualSaving, setManualSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [filterRecipeStatus, setFilterRecipeStatus] = useState("all");
  const [listView, setListView] = useState(false);
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [filterProtein, setFilterProtein] = useState("all");

  const [editMode, setEditMode] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editInstructions, setEditInstructions] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const [shareLoading, setShareLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [sharedRecipe, setSharedRecipe] = useState(null);

  // Feature 1: handle imported recipe → populate form fields
  const handleImportedRecipe = (imported) => {
    setManualTitle(imported.title || "");
    setManualIngredients((imported.ingredients || []).join("\n"));
    setManualInstructions((imported.instructions || []).join("\n"));
    setManualCuisine(imported.cuisine || "");
    setManualEase(imported.ease || "");
    setManualTags((imported.tags || []).join(", "));
    setManualNotes(imported.notes || "");
    setManualUrl(imported.url || "");
  };

  function startEditing(recipe) {
    setEditMode(true);
    setEditUrl(recipe.url || "");
    setEditIngredients((recipe.ingredients || []).join("\n"));
    setEditInstructions((recipe.instructions || []).join("\n"));
    setEditNotes(recipe.notes || "");
  }

  async function saveEdits() {
    const updates = {
      url: editUrl.trim(),
      ingredients: editIngredients.split("\n").map(s => s.trim()).filter(Boolean),
      instructions: editInstructions.split("\n").map(s => s.trim()).filter(Boolean),
      notes: editNotes,
    };
    await updateRecipe(selected.id, updates);
    setEditMode(false);
  }

  function exportRecipesToDoc() {
    const recipesToExport = recipes.filter(r => r.ingredients?.length > 0 || r.instructions?.length > 0);
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><style>body{font-family:Calibri,sans-serif;color:#333;max-width:700px;margin:0 auto}h1{color:#062846;font-size:28px;border-bottom:2px solid #ff492c;padding-bottom:6px}h2{color:#062846;font-size:20px;margin-top:30px;page-break-before:always}h2:first-of-type{page-break-before:avoid}h3{color:#5938a2;font-size:14px;margin:12px 0 6px}li{margin-bottom:4px;line-height:1.5}.tags{color:#888;font-size:11px;margin-bottom:8px}.notes{background:#fffbf0;padding:8px 12px;border-left:3px solid #ffd200;margin:10px 0;font-size:12px}.source{font-size:11px;color:#5938a2}</style></head><body><h1>mise en place Recipe Collection</h1><p style="color:#888;font-size:12px;">${recipes.length} recipes total. Exported ${new Date().toLocaleDateString()}</p>`;
    for (const r of recipesToExport) {
      html += `<h2>${r.title}</h2>`;
      if (r.cuisine||r.tags?.length) html += `<div class="tags">${r.cuisine?r.cuisine+' - ':""}${(r.tags||[]).join(", ")}</div>`;
      if (r.ingredients?.length) { html += `<h3>Ingredients</h3><ul>`; for (const ing of r.ingredients) html += `<li>${ing}</li>`; html += `</ul>`; }
      if (r.instructions?.length) { html += `<h3>Instructions</h3><ol>`; for (const step of r.instructions) html += `<li>${step}</li>`; html += `</ol>`; }
      if (r.notes) html += `<div class="notes"><strong>Notes:</strong> ${r.notes}</div>`;
      if (r.url) html += `<div class="source">Source: ${r.url}</div>`;
    }
    html += `</body></html>`;
    const blob = new Blob([html], { type:"application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mise-en-place-recipes.doc";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("share");
    if (token && supabase) {
      supabase.from("recipes").select("*").eq("share_token", token).eq("is_shared", true).single()
        .then(({ data, error }) => {
          if (data && !error) { setSharedRecipe(rowToRecipe(data)); setView(views.SHARED); }
        });
    }
  }, []);

  useEffect(() => {
    if (!currentUser) { setShowUserModal(true); setLoading(false); return; }
    loadRecipes();
  }, [currentUser]);

  async function loadRecipes() {
    if (!supabase) { setRecipes(SEED_RECIPES); setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("recipes").select("*").order("date_added", { ascending:true });
      if (error) throw error;
      if (data && data.length > 0) { setRecipes(data.map(rowToRecipe)); }
      else { await seedDatabase(); }
    } catch(e) { console.error("Failed to load:", e); setRecipes(SEED_RECIPES); }
    setLoading(false);
  }

  async function seedDatabase() {
    if (!supabase) return;
    const { data, error } = await supabase.from("recipes").insert(SEED_RECIPES.map(recipeToRow)).select();
    if (error) { console.error("Seed failed:", error); setRecipes(SEED_RECIPES); }
    else { setRecipes(data.map(rowToRecipe)); }
  }

  function saveUser(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCurrentUser(trimmed);
    localStorage.setItem(USER_KEY, trimmed);
    setShowUserModal(false);
  }

  async function addRecipeObj(parsed, sourceUrl) {
    const recipe = {
      title: parsed.title || "Untitled Recipe",
      url: sourceUrl || "",
      ingredients: parsed.ingredients || [],
      instructions: parsed.instructions || [],
      tags: parsed.tags || [],
      servings: parsed.servings || "",
      time: parsed.time || "",
      rating: 0, favorite: false,
      addedBy: currentUser || "Unknown",
      dateAdded: new Date().toISOString(),
      cookLog: [], notes: "",
      cuisine: parsed.cuisine || "",
      ease: parsed.ease || "",
      shareToken: null, isShared: false,
    };
    if (supabase) {
      const { data, error } = await supabase.from("recipes").insert([recipeToRow(recipe)]).select().single();
      if (!error && data) { const r = rowToRecipe(data); setRecipes(prev => [...prev, r]); return r; }
    }
    const local = { ...recipe, id: Date.now() + Math.random() };
    setRecipes(prev => [...prev, local]);
    return local;
  }

  async function updateRecipe(id, updates) {
    const dbUpdates = {};
    if ("rating" in updates) dbUpdates.rating = updates.rating;
    if ("favorite" in updates) dbUpdates.favorite = updates.favorite;
    if ("cookLog" in updates) dbUpdates.cook_log = updates.cookLog;
    if ("ingredients" in updates) dbUpdates.ingredients = updates.ingredients;
    if ("instructions" in updates) dbUpdates.instructions = updates.instructions;
    if ("notes" in updates) dbUpdates.notes = updates.notes;
    if ("url" in updates) dbUpdates.url = updates.url;
    if ("tags" in updates) dbUpdates.tags = updates.tags;
    if ("title" in updates) dbUpdates.title = updates.title;
    if ("shareToken" in updates) dbUpdates.share_token = updates.shareToken;
    if ("isShared" in updates) dbUpdates.is_shared = updates.isShared;
    if (supabase) {
      const { error } = await supabase.from("recipes").update(dbUpdates).eq("id", id);
      if (error) console.error("Update failed:", error);
    }
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  }

  // Feature 7: logCook now opens modal, save path takes {date,note,rating} object
  function openLogModal() { setLogModalOpen(true); }

  async function handleLogSave(entry) {
    const recipe = recipes.find(r => r.id === selected?.id);
    if (!recipe) return;
    const newLog = [...(recipe.cookLog || []), entry];
    await updateRecipe(recipe.id, { cookLog: newLog });
  }

  async function toggleFav(id) {
    const r = recipes.find(r => r.id === id);
    if (!r) return;
    await updateRecipe(id, { favorite: !r.favorite });
  }

  async function setRating(id, rating) { await updateRecipe(id, { rating }); }

  async function deleteRecipe(id) {
    if (supabase) { const { error } = await supabase.from("recipes").delete().eq("id", id); if (error) console.error("Delete failed:", error); }
    setRecipes(prev => prev.filter(r => r.id !== id));
    setView(views.HOME); setSelected(null);
  }

  async function shareRecipe(id) {
    setShareLoading(true); setShareCopied(false);
    try {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;
      let token = recipe.shareToken;
      if (!token) { token = crypto.randomUUID(); await updateRecipe(id, { shareToken:token, isShared:true }); }
      else if (!recipe.isShared) { await updateRecipe(id, { isShared:true }); }
      await navigator.clipboard.writeText(`${window.location.origin}?share=${token}`);
      setShareCopied(true); setTimeout(() => setShareCopied(false), 3000);
    } catch(e) { console.error("Share failed:", e); }
    setShareLoading(false);
  }

  async function unshareRecipe(id) { await updateRecipe(id, { isShared:false }); }

  async function saveSharedRecipe(recipe) {
    await addRecipeObj({ title:recipe.title, ingredients:recipe.ingredients, instructions:recipe.instructions, tags:recipe.tags, servings:recipe.servings, time:recipe.time, cuisine:recipe.cuisine, ease:recipe.ease }, recipe.url);
    window.history.replaceState({}, "", window.location.pathname);
    setSharedRecipe(null); setView(views.HOME);
  }

  const allMembers = [...new Set(recipes.map(r => r.addedBy).filter(Boolean))];
  const allCuisines = [...new Set(recipes.map(r => r.cuisine).filter(Boolean))].sort();
  const proteinKeywords = ["Chicken","Beef","Pork","Seafood","Vegetarian","Fish","Lamb","Turkey","Tofu"];
  const allProteins = [...new Set(recipes.flatMap(r => r.tags?.filter(t => proteinKeywords.some(p => t.includes(p))) || []))].sort();

  function applyFilters(list) {
    return list.filter(r => {
      const matchCuisine = filterCuisine === "all" || r.cuisine === filterCuisine;
      const matchProtein = filterProtein === "all" || r.tags?.some(t => proteinKeywords.some(p => t === p || t.includes(p)));
      const matchUser = filterUser === "all" || r.addedBy === filterUser;
      const matchSearch = r.title?.toLowerCase().includes(search.toLowerCase()) || r.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const hasRecipe = r.instructions && r.instructions.length > 0;
      const matchStatus = filterRecipeStatus === "all" || (filterRecipeStatus === "has" && hasRecipe) || (filterRecipeStatus === "needs" && !hasRecipe);
      return matchCuisine && matchProtein && matchUser && matchSearch && matchStatus;
    });
  }

  const filtered = sortRecipes(applyFilters(recipes), sortBy);
  const favs = sortRecipes(applyFilters(recipes.filter(r => r.favorite)), sortBy);

  // Cook log: flatten all entries for the Log view
  const cookEntries = recipes
    .flatMap(r => (r.cookLog||[]).map(entry => ({ recipe:r, date:cookEntryDate(entry), entry:normalizeCookEntry(entry) })))
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  const navBtn = (active) => ({
    background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:active?700:500,
    fontSize:12, color:active?"#ff492c":"#aab4c4", padding:"6px 8px", borderRadius:8,
    borderBottom:active?"2px solid #ff492c":"2px solid transparent", transition:"color 0.15s"
  });

  if (loading && currentUser) {
    return (
      <div style={{ minHeight:"100vh", background:"#f7f6f3", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Spinner label="Loading recipes…" />
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f7f6f3", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
        input,textarea,select{font-family:'DM Sans',sans-serif}
      `}</style>

      {/* User modal */}
      {showUserModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:28, maxWidth:360, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:6 }}>Welcome to<br/>mise <span style={{color:"#ff492c"}}>en place</span></div>
            <div style={{ fontSize:13, color:"#888", marginBottom:20 }}>What's your name? Recipes you add will be tagged to you.</div>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key==="Enter" && saveUser(nameInput)}
              placeholder="Your first name" autoFocus
              style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:15, outline:"none", marginBottom:14 }} />
            <button onClick={() => saveUser(nameInput)} disabled={!nameInput.trim()}
              style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:nameInput.trim()?"#ff492c":"#eee", color:nameInput.trim()?"#fff":"#bbb", fontWeight:700, fontSize:15, cursor:nameInput.trim()?"pointer":"not-allowed" }}>
              Let's cook
            </button>
          </div>
        </div>
      )}

      {/* Feature 7 modal */}
      <LogCookModal isOpen={logModalOpen} onClose={() => setLogModalOpen(false)} onSave={handleLogSave} recipeName={selected?.title || ""} />

      {/* Shared recipe view */}
      {view === views.SHARED && sharedRecipe && (
        <div style={{ minHeight:"100vh", background:"#f7f6f3" }}>
          <div style={{ background:"#062846", padding:"0 16px" }}>
            <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", height:52 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:900, color:"#fff" }}>mise <span style={{color:"#ff492c"}}>en place</span></div>
            </div>
          </div>
          <div style={{ maxWidth:720, margin:"0 auto", padding:"22px 16px" }}>
            <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
              <div style={{ height:140, background:"linear-gradient(135deg,#062846 0%,#5938a2 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56 }}>🍽️</div>
              <div style={{ padding:"20px 20px 28px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#ff492c", textTransform:"uppercase", letterSpacing:0.5, marginBottom:6 }}>Shared Recipe</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#062846", lineHeight:1.2 }}>{sharedRecipe.title}</div>
                {sharedRecipe.addedBy && <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:10 }}><Avatar name={sharedRecipe.addedBy} size={22}/><span style={{ fontSize:12, color:"#888" }}>Shared by <strong>{sharedRecipe.addedBy}</strong></span></div>}
                <StarRating value={sharedRecipe.rating||0} />
                {sharedRecipe.tags?.length > 0 && <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:14 }}>{sharedRecipe.tags.map(t => <span key={t} style={{ background:"#f0f4ff", color:"#5938a2", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{t}</span>)}</div>}
                <div style={{ marginTop:22 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Ingredients</div>
                  {sharedRecipe.ingredients.length===0 ? <div style={{ fontSize:12, color:"#aaa" }}>No ingredients saved.</div> : <ul style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:5 }}>{sharedRecipe.ingredients.map((ing,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{ing}</li>)}</ul>}
                </div>
                <div style={{ marginTop:20 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Instructions</div>
                  {sharedRecipe.instructions.length===0 ? <div style={{ fontSize:12, color:"#aaa" }}>No instructions saved.</div> : <ol style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:9 }}>{sharedRecipe.instructions.map((step,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</li>)}</ol>}
                </div>
                {sharedRecipe.notes && <div style={{ marginTop:18, background:"#fffbf0", borderRadius:10, padding:"11px 13px", borderLeft:"3px solid #ffd200" }}><div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div><div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{sharedRecipe.notes}</div></div>}
                {currentUser && <button onClick={() => saveSharedRecipe(sharedRecipe)} style={{ marginTop:20, width:"100%", padding:14, borderRadius:12, border:"none", background:"#ff492c", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer" }}>Save to My Recipes</button>}
                <button onClick={() => { window.history.replaceState({}, "", window.location.pathname); setSharedRecipe(null); setView(views.HOME); }} style={{ marginTop:8, width:"100%", padding:12, borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", color:"#888", fontWeight:600, fontSize:13, cursor:"pointer" }}>Go to App</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {view !== views.SHARED && (
        <>
          {/* Header */}
          <div style={{ background:"#062846", padding:"0 16px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.18)" }}>
            <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:52 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>
                mise <span style={{color:"#ff492c"}}>en place</span>
              </div>
              <nav style={{ display:"flex", gap:1, alignItems:"center" }}>
                {[
                  { label:"Recipes", v:views.HOME },
                  { label:"Favs", v:views.FAVORITES },
                  { label:"+ Add", v:views.ADD },
                  { label:"📋 Log", v:views.LOG },
                  { label:"📅 Plan", v:views.PLAN },
                ].map(n => (
                  <button key={n.v} onClick={() => setView(n.v)} style={navBtn(view===n.v)}>{n.label}</button>
                ))}
                {currentUser && (
                  <div onClick={() => { setNameInput(currentUser); setShowUserModal(true); }} style={{ marginLeft:8, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                    <Avatar name={currentUser} size={28} />
                  </div>
                )}
              </nav>
            </div>
          </div>

          <div style={{ maxWidth:720, margin:"0 auto", padding:"22px 16px" }}>

            {/* ── HOME ── */}
            {view===views.HOME && (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:16, alignItems:"center" }}>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recipes or tags…"
                    style={{ flex:1, padding:"10px 14px", borderRadius:12, border:"1.5px solid #e5e5e5", fontSize:13, background:"#fff", outline:"none" }} />
                  <button onClick={() => setListView(!listView)}
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:listView?"#062846":"#fff", color:listView?"#fff":"#888", cursor:"pointer", fontSize:14, fontWeight:600 }}
                    title={listView?"Grid view":"List view"}>{listView?"≡":"▦"}</button>
                  <button onClick={exportRecipesToDoc} title="Export to Word"
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:"#fff", color:"#888", cursor:"pointer", fontSize:12, fontWeight:600 }}>Export</button>
                </div>

                {/* Member filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
                  {["all", ...allMembers].map(m => (
                    <button key={m} onClick={() => setFilterUser(m)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:11,
                        background:filterUser===m?(m==="all"?"#062846":getMemberColor(m)):"#f0f0f0",
                        color:filterUser===m?"#fff":"#888", transition:"all 0.15s", display:"flex", alignItems:"center", gap:5 }}>
                      {m==="all"?"All recipes":<><Avatar name={m} size={16}/>{m}</>}
                    </button>
                  ))}
                </div>

                {/* Cuisine filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Cuisine:</span>
                  {["all", ...allCuisines].map(c => (
                    <button key={c} onClick={() => setFilterCuisine(c)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:11,
                        background:filterCuisine===c?"#5938a2":"#f0f0f0", color:filterCuisine===c?"#fff":"#888", transition:"all 0.15s" }}>
                      {c==="all"?"All":c}
                    </button>
                  ))}
                </div>

                {/* Protein filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Protein:</span>
                  {["all", ...allProteins].map(p => (
                    <button key={p} onClick={() => setFilterProtein(p)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:11,
                        background:filterProtein===p?"#23cca2":"#f0f0f0", color:filterProtein===p?"#fff":"#888", transition:"all 0.15s" }}>
                      {p==="all"?"All":p}
                    </button>
                  ))}
                </div>

                {/* Recipe status filter */}
                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Recipe:</span>
                  {[{k:"all",label:"All"},{k:"has",label:"Has recipe"},{k:"needs",label:"Needs recipe"}].map(({k,label}) => (
                    <button key={k} onClick={() => setFilterRecipeStatus(k)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:11,
                        background:filterRecipeStatus===k?(k==="has"?"#23cca2":k==="needs"?"#ff492c":"#062846"):"#f0f0f0",
                        color:filterRecipeStatus===k?"#fff":"#888", transition:"all 0.15s" }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Feature 6: Sort bar */}
                <SortBar sortBy={sortBy} onChange={setSortBy} />

                {filtered.length===0 ? (
                  <div style={{ textAlign:"center", padding:"60px 0", color:"#aaa" }}>
                    <div style={{ fontSize:40 }}>🍳</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#ccc", marginTop:10 }}>No recipes found</div>
                  </div>
                ) : listView ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {filtered.map(r => {
                      const hasInstructions = r.instructions && r.instructions.length > 0;
                      return (
                        <div key={r.id} onClick={() => { setSelected(r); setView(views.DETAIL); }}
                          style={{ background:"#fff", borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"transform 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.transform="translateX(3px)"}
                          onMouseLeave={e => e.currentTarget.style.transform=""}>
                          <div style={{ flex:1, display:"flex", alignItems:"center", gap:10 }}>
                            <span style={{ width:8, height:8, borderRadius:"50%", background:hasInstructions?"#23cca2":"#ddd", flexShrink:0 }}/>
                            <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif", minWidth:180 }}>{r.title}</div>
                            {r.cuisine && <span style={{ fontSize:10, color:"#fff", background:"#5938a2", borderRadius:12, padding:"3px 8px", fontWeight:600, flexShrink:0 }}>{r.cuisine}</span>}
                            {r.url && <a href={r.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize:10, color:"#5938a2", textDecoration:"none", fontWeight:600, flexShrink:0 }}>source</a>}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                            <StarRating value={r.rating||0} />
                            <span onClick={e => { e.stopPropagation(); toggleFav(r.id); }} style={{ fontSize:16, cursor:"pointer", color:r.favorite?"#ff492c":"#ccc" }}>♥</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                    {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => { setSelected(r); setView(views.DETAIL); }} onFav={toggleFav} />)}
                  </div>
                )}
              </div>
            )}

            {/* ── FAVORITES ── */}
            {view===views.FAVORITES && (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:16, alignItems:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", flex:1 }}>Favorites</div>
                  <button onClick={() => setListView(!listView)}
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:listView?"#062846":"#fff", color:listView?"#fff":"#888", cursor:"pointer", fontSize:14, fontWeight:600 }}>{listView?"≡":"▦"}</button>
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Cuisine:</span>
                  {["all", ...allCuisines].map(c => (
                    <button key={c} onClick={() => setFilterCuisine(c)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:11, background:filterCuisine===c?"#5938a2":"#f0f0f0", color:filterCuisine===c?"#fff":"#888" }}>
                      {c==="all"?"All":c}
                    </button>
                  ))}
                </div>
                <SortBar sortBy={sortBy} onChange={setSortBy} />
                {favs.length===0
                  ? <div style={{ textAlign:"center", padding:"60px 0", color:"#bbb", fontSize:13 }}>Heart a recipe to save it here</div>
                  : listView ? (
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {favs.map(r => (
                        <div key={r.id} onClick={() => { setSelected(r); setView(views.DETAIL); }}
                          style={{ background:"#fff", borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"transform 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.transform="translateX(3px)"}
                          onMouseLeave={e => e.currentTarget.style.transform=""}>
                          <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif" }}>{r.title}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                            <StarRating value={r.rating||0} />
                            <span onClick={e => { e.stopPropagation(); toggleFav(r.id); }} style={{ fontSize:16, cursor:"pointer", color:r.favorite?"#ff492c":"#ccc" }}>♥</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                      {favs.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => { setSelected(r); setView(views.DETAIL); }} onFav={toggleFav} />)}
                    </div>
                  )
                }
              </div>
            )}

            {/* ── ADD ── */}
            {view===views.ADD && (
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:16 }}>Add a Recipe</div>
                {/* Feature 1: Import from URL */}
                <ImportFromUrl onImport={handleImportedRecipe} />
                <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>TITLE *</label>
                    <input value={manualTitle} onChange={e => setManualTitle(e.target.value)} placeholder="e.g. Chicken Tikka Masala"
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none" }} />
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>SOURCE URL (optional)</label>
                    <input value={manualUrl} onChange={e => setManualUrl(e.target.value)} placeholder="https://..."
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none" }} />
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>INGREDIENTS (one per line)</label>
                    <textarea value={manualIngredients} onChange={e => setManualIngredients(e.target.value)} placeholder={"1 lb chicken thighs\n2 tbsp olive oil\n3 cloves garlic"} rows={6}
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical" }} />
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>INSTRUCTIONS (one step per line)</label>
                    <textarea value={manualInstructions} onChange={e => setManualInstructions(e.target.value)} placeholder={"Preheat oven to 400F.\nSeason chicken.\nBake 25 min."} rows={6}
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical" }} />
                  </div>
                  <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                    <div style={{ flex:1 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>CUISINE</label>
                      <input value={manualCuisine} onChange={e => setManualCuisine(e.target.value)} placeholder="e.g. Asian, Italian"
                        style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none" }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>DIFFICULTY</label>
                      <select value={manualEase} onChange={e => setManualEase(e.target.value)}
                        style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>TAGS (comma-separated)</label>
                    <input value={manualTags} onChange={e => setManualTags(e.target.value)} placeholder="e.g. Chicken, Instant Pot, Weeknight"
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none" }} />
                  </div>
                  <div style={{ marginBottom:18 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>NOTES (optional)</label>
                    <textarea value={manualNotes} onChange={e => setManualNotes(e.target.value)} placeholder="Any tips, variations, or reminders…" rows={3}
                      style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical" }} />
                  </div>
                  <button onClick={async () => {
                    if (!manualTitle.trim()) return;
                    setManualSaving(true);
                    try {
                      const parsed = { title:manualTitle.trim(), ingredients:manualIngredients.split("\n").map(s=>s.trim()).filter(Boolean), instructions:manualInstructions.split("\n").map(s=>s.trim()).filter(Boolean), tags:manualTags.split(",").map(s=>s.trim()).filter(Boolean), cuisine:manualCuisine.trim(), ease:manualEase };
                      const newRecipe = await addRecipeObj(parsed, manualUrl.trim());
                      if (manualNotes.trim() && newRecipe) await updateRecipe(newRecipe.id, { notes:manualNotes.trim() });
                      setManualTitle(""); setManualIngredients(""); setManualInstructions(""); setManualTags(""); setManualCuisine(""); setManualEase(""); setManualNotes(""); setManualUrl("");
                      setSelected(newRecipe); setView(views.DETAIL);
                    } catch(e) { console.error("Save error:", e); }
                    finally { setManualSaving(false); }
                  }}
                  disabled={!manualTitle.trim()||manualSaving}
                  style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:manualTitle.trim()?"#ff492c":"#eee", color:manualTitle.trim()?"#fff":"#bbb", fontWeight:700, fontSize:14, cursor:manualTitle.trim()&&!manualSaving?"pointer":"not-allowed" }}>
                    {manualSaving?"Saving…":"Save Recipe"}
                  </button>
                </div>
              </div>
            )}

            {/* ── COOK LOG ── */}
            {view===views.LOG && (
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:6 }}>Cook Log</div>
                <div style={{ fontSize:12, color:"#888", marginBottom:18 }}>Every time someone hits "I made this" it gets logged here.</div>
                {cookEntries.length===0
                  ? <div style={{ background:"#fff", borderRadius:14, padding:28, textAlign:"center", color:"#bbb", fontSize:13 }}>No cooks logged yet.</div>
                  : <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {cookEntries.map((item, i) => {
                        const d = new Date(item.date);
                        const today = new Date(); today.setHours(0,0,0,0);
                        const entryDay = new Date(d); entryDay.setHours(0,0,0,0);
                        const diffDays = Math.floor((today - entryDay) / 86400000);
                        const label = diffDays===0?"Today":diffDays===1?"Yesterday":`${diffDays} days ago`;
                        return (
                          <div key={i} onClick={() => { setSelected(item.recipe); setView(views.DETAIL); }}
                            style={{ background:"#fff", borderRadius:12, padding:"12px 15px", cursor:"pointer", boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                <Avatar name={item.recipe.addedBy||"?"} size={32} />
                                <div>
                                  <div style={{ fontWeight:700, color:"#062846", fontSize:13 }}>{item.recipe.title}</div>
                                  <div style={{ fontSize:11, color:"#aaa", marginTop:1 }}>Added by {item.recipe.addedBy||"Unknown"}</div>
                                </div>
                              </div>
                              <div style={{ textAlign:"right" }}>
                                <div style={{ fontSize:12, fontWeight:600, color:"#5938a2" }}>{label}</div>
                                <div style={{ fontSize:10, color:"#bbb" }}>{d.toLocaleDateString()}</div>
                              </div>
                            </div>
                            {/* Feature 7: show note + rating on log entry if present */}
                            {(item.entry.rating > 0 || item.entry.note) && (
                              <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid #f5f5f5" }}>
                                {item.entry.rating > 0 && <div style={{ display:"flex", gap:2, marginBottom:3 }}>{[1,2,3,4,5].map(n=><span key={n} style={{ fontSize:12, color:n<=item.entry.rating?"#ffd200":"#ddd" }}>★</span>)}</div>}
                                {item.entry.note && <div style={{ fontSize:12, color:"#666", fontStyle:"italic" }}>"{item.entry.note}"</div>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                }
              </div>
            )}

            {/* ── MEAL PLANNER (Feature 3) ── */}
            {view===views.PLAN && (
              <MealPlanner recipes={recipes} onSelectRecipe={(r) => { setSelected(r); setView(views.DETAIL); }} />
            )}

            {/* ── DETAIL ── */}
            {view===views.DETAIL && selected && (
              <div>
                <button onClick={() => { setEditMode(false); setView(views.HOME); }}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#888", fontSize:12, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:4, padding:0 }}>
                  ← Back
                </button>
                <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
                  <div style={{ height:140, background:"linear-gradient(135deg,#062846 0%,#5938a2 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, position:"relative" }}>
                    🍽️
                    {selected.cookLog?.length > 0 && (
                      <div style={{ position:"absolute", bottom:10, right:12, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"3px 10px", fontSize:11, color:"#fff", fontWeight:600 }}>
                        Made {selected.cookLog.length}×
                      </div>
                    )}
                  </div>
                  <div style={{ padding:"20px 20px 28px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#062846", lineHeight:1.2 }}>{selected.title}</div>
                      <span onClick={() => toggleFav(selected.id)} style={{ fontSize:22, cursor:"pointer", color:selected.favorite?"#ff492c":"#ddd", flexShrink:0 }}>♥</span>
                    </div>

                    {selected.addedBy && (
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:10 }}>
                        <Avatar name={selected.addedBy} size={22}/>
                        <span style={{ fontSize:12, color:"#888" }}>Added by <strong>{selected.addedBy}</strong></span>
                      </div>
                    )}

                    <div style={{ display:"flex", gap:14, marginTop:10, fontSize:12, color:"#888" }}>
                      {selected.time && <span>⏱ {selected.time}</span>}
                      {selected.servings && <span>👤 {selected.servings}</span>}
                    </div>
                    <div style={{ marginTop:10 }}><StarRating value={selected.rating||0} onChange={r => setRating(selected.id,r)} /></div>

                    {/* Action buttons — Feature 7: "I made this" now opens modal */}
                    <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                      <button onClick={openLogModal}
                        style={{ padding:"10px 20px", borderRadius:10, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                        ✓ I made this
                      </button>
                      <button onClick={() => shareRecipe(selected.id)} disabled={shareLoading}
                        style={{ padding:"10px 16px", borderRadius:10, border:"1.5px solid #5938a2", background:shareCopied?"#5938a2":"#fff", color:shareCopied?"#fff":"#5938a2", fontWeight:700, fontSize:13, cursor:"pointer", transition:"all 0.15s" }}>
                        {shareLoading?"...":shareCopied?"Link copied!":selected.isShared?"Copy share link":"Share recipe"}
                      </button>
                      {selected.isShared && (
                        <button onClick={() => unshareRecipe(selected.id)}
                          style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", background:"#fff", color:"#888", fontWeight:600, fontSize:11, cursor:"pointer" }}>
                          Unshare
                        </button>
                      )}
                    </div>

                    {/* Feature 7: Cook history — replaces the old date-pill version */}
                    <CookHistory cookLog={selected.cookLog} />

                    {selected.tags?.length > 0 && (
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:14 }}>
                        {selected.tags.map(t => <span key={t} style={{ background:"#f0f4ff", color:"#5938a2", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{t}</span>)}
                      </div>
                    )}

                    <div style={{ marginTop:16, display:"flex", gap:8, alignItems:"center" }}>
                      {!editMode ? (
                        <button onClick={() => startEditing(selected)}
                          style={{ padding:"6px 14px", borderRadius:8, border:"1.5px solid #5938a2", background:"none", color:"#5938a2", fontWeight:700, fontSize:11, cursor:"pointer" }}>
                          Edit recipe
                        </button>
                      ) : (
                        <>
                          <button onClick={saveEdits} style={{ padding:"6px 14px", borderRadius:8, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer" }}>Save changes</button>
                          <button onClick={() => setEditMode(false)} style={{ padding:"6px 14px", borderRadius:8, border:"1.5px solid #ccc", background:"none", color:"#888", fontWeight:600, fontSize:11, cursor:"pointer" }}>Cancel</button>
                        </>
                      )}
                    </div>

                    {editMode ? (
                      <div style={{ marginTop:16 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#aaa", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Source URL</div>
                        <input value={editUrl} onChange={e => setEditUrl(e.target.value)} placeholder="Paste recipe URL..."
                          style={{ width:"100%", padding:"8px 10px", borderRadius:8, border:"1.5px solid #ddd", fontSize:12 }} />
                      </div>
                    ) : selected.url ? (
                      <div style={{ marginTop:16 }}>
                        <a href={selected.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:"#5938a2", textDecoration:"none", fontWeight:600 }}>View original source ↗</a>
                      </div>
                    ) : null}

                    <div style={{ marginTop:22 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Ingredients</div>
                      {editMode ? (
                        <textarea value={editIngredients} onChange={e => setEditIngredients(e.target.value)} placeholder="One ingredient per line..."
                          style={{ width:"100%", minHeight:120, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      ) : selected.ingredients.length===0
                        ? <div style={{ fontSize:12, color:"#aaa" }}>No ingredients saved.</div>
                        : <ul style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:5 }}>{selected.ingredients.map((ing,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{ing}</li>)}</ul>}
                    </div>

                    <div style={{ marginTop:20 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Instructions</div>
                      {editMode ? (
                        <textarea value={editInstructions} onChange={e => setEditInstructions(e.target.value)} placeholder="One step per line..."
                          style={{ width:"100%", minHeight:150, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      ) : selected.instructions.length===0
                        ? <div style={{ fontSize:12, color:"#aaa" }}>No instructions saved.</div>
                        : <ol style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:9 }}>{selected.instructions.map((step,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</li>)}</ol>}
                    </div>

                    {editMode ? (
                      <div style={{ marginTop:18 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                        <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Add notes..."
                          style={{ width:"100%", minHeight:60, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      </div>
                    ) : selected.notes ? (
                      <div style={{ marginTop:18, background:"#fffbf0", borderRadius:10, padding:"11px 13px", borderLeft:"3px solid #ffd200" }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                        <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{selected.notes}</div>
                      </div>
                    ) : null}

                    <div style={{ marginTop:24, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                      <button onClick={() => deleteRecipe(selected.id)}
                        style={{ background:"none", border:"1.5px solid #ff492c", color:"#ff492c", borderRadius:9, padding:"7px 14px", cursor:"pointer", fontSize:11, fontWeight:600 }}>
                        Remove recipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
}
