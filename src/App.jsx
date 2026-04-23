import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const USER_KEY = "mise_user_v1";

const SEED_RECIPES = [{"id":1000,"url":"","title":"Basil Pork Stirfry (Pa Kra Pow)","ingredients":["2 tablespoons oil","4 cloves garlic, minced","2-4 Thai chilies, minced","1 lb ground pork","2 tablespoons fish sauce","1 tablespoon oyster sauce","1 tablespoon dark soy sauce","1 teaspoon sugar","1 cup Thai holy basil leaves"],"instructions":["Heat oil in a wok over high heat. Add garlic and Thai chilies, stir-fry 30 seconds until fragrant.","Add ground pork, breaking it apart. Cook until no longer pink, about 3-4 minutes.","Add fish sauce, oyster sauce, dark soy sauce, and sugar. Stir-fry 2 minutes.","Add Thai basil leaves, toss until wilted, about 30 seconds.","Serve over rice with a fried egg on top."],"tags":["Asian","Stir Fry","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1001,"url":"","title":"40 Clove Chicken","ingredients":["chicken","garlic (40 cloves)","white wine","thyme","olive oil","butter"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1002,"url":"","title":"African Peanut Stew","ingredients":["sweet potato","peanut butter","tomatoes","onion","garlic","ginger","broth","chicken"],"instructions":[],"tags":["African","Stew","Vegetarian-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"African","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1003,"url":"","title":"Asian Salmon","ingredients":["salmon","soy sauce","ginger","garlic","sesame oil","green onion"],"instructions":[],"tags":["Asian","Salmon","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1004,"url":"","title":"Asparagus Stuffed Chicken","ingredients":["4 boneless skinless chicken breasts","1 bunch asparagus, trimmed","4 oz cream cheese, softened","1/2 cup sun-dried tomatoes, chopped","1/4 cup parmesan, grated","2 cloves garlic, minced","salt and pepper","2 tablespoons olive oil"],"instructions":["Preheat oven to 400F.","Cut a deep pocket into each chicken breast.","Mix cream cheese, sun-dried tomatoes, parmesan, and garlic.","Stuff each breast with cream cheese mixture and 3-4 asparagus spears.","Season outside with salt and pepper. Sear in olive oil 3 min per side.","Transfer to oven and bake 18-20 minutes until chicken reaches 165F."],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1005,"url":"","title":"Baked Ziti","ingredients":["ziti pasta","ground beef","marinara sauce","ricotta","mozzarella","parmesan"],"instructions":[],"tags":["Italian","Pasta","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1006,"url":"","title":"Balsamic Pork Loin","ingredients":["pork loin","olive oil (1 cup)","balsamic vinegar (1 cup)"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Season meat & marinate in 1c olive oil, 1c balsamic. Bake 350° for 1hr (145° internal temp). Rest covered 10 min.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1007,"url":"","title":"Banana Bread Oatmeal (Acorn Squash)","ingredients":["acorn squash","banana","oats","cinnamon","maple syrup"],"instructions":[],"tags":["Breakfast","AIP","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. AIP-friendly.","cuisine":"Breakfast","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1008,"url":"","title":"Banh Mi Pickled Veggies","ingredients":["1 cup daikon radish, julienned","1 cup carrots, julienned","1/2 cup rice vinegar","1/2 cup warm water","1/4 cup sugar","1 teaspoon salt"],"instructions":["Julienne the daikon and carrots into thin matchsticks.","Dissolve sugar and salt in warm water and rice vinegar.","Add vegetables to the brine. Refrigerate at least 30 minutes.","Will keep in the fridge for up to 2 weeks."],"tags":["Asian","Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1009,"url":"https://www.hy-vee.com/discover/recipes/instant-pot-banh-mi-pork-sandwiches","title":"Banh Mi Pulled Pork","ingredients":["3.5 lbs pork shoulder","2 tsp Chinese five spice","2 tsp kosher salt","0.5 tsp ground black pepper","2 tbsp olive oil","0.5 cup seasoned rice vinegar","0.5 cup fresh lime juice","0.5 cup water","6 mini baguettes","0.5 cup chipotle mayonnaise","0.5 cup shredded carrots","0.25 cup radishes","0.5 cup cucumbers","0.25 cup green onions","0.25 cup fresh cilantro","1 jalapeno pepper"],"instructions":["Heat Instant Pot on the Saut\u00e9 setting.","Rub pork with Chinese five spice, kosher salt, and black pepper; slice pork against the grain into 8 pieces. Add olive oil to Instant Pot and sear pork on all sides until a deep color develops, about 7 minutes. Add rice vinegar, lime juice, and water. Seal lid and pressure cook on HIGH for 1 hour.","Once pork has finished cooking, release seal and allow steam to escape naturally. Once steam has escaped, carefully remove the lid.","Remove pork from Instant Pot and shred into large pieces.","Spread mayonnaise onto split baguettes. Divide pork between 6 buns. Top with carrots, radishes, cucumber, green onions, fresh cilantro, and jalapenos, if desired."],"tags":["Asian","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1010,"url":"","title":"BBQ Pulled Pork","ingredients":["pork shoulder","bbq sauce","brown sugar","garlic powder","onion powder","smoked paprika"],"instructions":[],"tags":["American","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1011,"url":"","title":"Beef Pho","ingredients":["beef bones","brisket","star anise","cinnamon","cloves","fish sauce","rice noodles","bean sprouts","basil","lime"],"instructions":[],"tags":["Asian","Beef","Soup","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1012,"url":"https://www.allrecipes.com/recipe/14685/slow-cooker-beef-stew-i/","title":"Beef Stew","ingredients":["2 lb beef stew meat (chuck), cut into 1-inch cubes","3 tablespoons olive oil","1 onion, diced","3 cloves garlic, minced","2 tablespoons tomato paste","1/3 cup flour","1 cup red wine","4 cups beef broth","3 carrots, peeled and sliced","3 potatoes, cubed","2 stalks celery, sliced","1 teaspoon thyme","1 teaspoon rosemary","salt and pepper"],"instructions":["Season beef with salt and pepper. Brown in batches in olive oil in a Dutch oven over medium-high heat. Set aside.","Saute onion and garlic until softened. Add tomato paste, cook 1 minute.","Sprinkle flour over onions, stir 1 minute. Deglaze with red wine, scraping up browned bits.","Add broth, return beef, add carrots, potatoes, celery, thyme, and rosemary.","Bring to a boil, then cover and braise in a 325F oven for 2-3 hours until beef is tender.","Adjust seasoning and serve."],"tags":["American","Beef","Dutch Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Braise for 3+ hours in dutch oven.","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1013,"url":"https://www.allrecipes.com/recipe/228823/quick-beef-stir-fry/","title":"Beef with Broccoli","ingredients":["1.5 lb flank steak, sliced thin against the grain","4 cups broccoli florets","3 tablespoons soy sauce","2 tablespoons oyster sauce","1 tablespoon sesame oil","1 tablespoon cornstarch","3 cloves garlic, minced","1 tablespoon ginger, grated","2 tablespoons vegetable oil","1/2 cup beef broth"],"instructions":["Marinate sliced beef in 1 tbsp soy sauce, 1 tbsp cornstarch, and sesame oil for 15 minutes.","Heat oil in a wok over high heat. Stir-fry beef in batches until browned. Set aside.","Stir-fry broccoli with garlic and ginger for 2 minutes. Add beef broth, cover and steam 2 minutes.","Return beef to wok. Add remaining soy sauce and oyster sauce. Toss to combine.","Serve over rice."],"tags":["Asian","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1014,"url":"","title":"Black Pepper Beef & Noodles","ingredients":["beef","noodles","black pepper sauce","soy sauce","oyster sauce","garlic","ginger","onion"],"instructions":[],"tags":["Asian","Beef","Noodles"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Black pepper sauce.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1015,"url":"https://thewoksoflife.com/braised-oxtails/","title":"Braised Oxtail","ingredients":["3 lbs oxtail","3 tablespoons soy sauce","2 tablespoons oyster sauce","1 tablespoon dark soy sauce","2 star anise","1 cinnamon stick","3 slices ginger","4 cloves garlic","2 tablespoons rice wine (Shaoxing)","1 tablespoon sugar","2 green onions","2 cups water or broth"],"instructions":["Blanch oxtail in boiling water for 5 minutes. Drain and rinse.","Heat oil in a pot or Instant Pot on saute. Brown oxtail on all sides.","Add ginger, garlic, and green onions. Stir-fry 1 minute.","Add soy sauce, dark soy sauce, oyster sauce, rice wine, sugar, star anise, cinnamon stick, and water.","If using Instant Pot: pressure cook on high for 45 minutes, natural release 15 minutes.","If using Dutch oven: braise at 325F for 3 hours until tender.","Reduce sauce if needed. Serve over rice."],"tags":["Asian","Oxtail","Braise"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Sauce is good — cook in Instant Pot.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1016,"url":"","title":"Breakfast Sandwiches","ingredients":["eggs","english muffin","cheese","bacon or sausage","butter"],"instructions":[],"tags":["American","Breakfast","Eggs"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1017,"url":"","title":"Buffalo Chicken","ingredients":["chicken","buffalo sauce","butter","garlic powder","celery","blue cheese or ranch"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1018,"url":"","title":"Burgers","ingredients":["ground beef (80/20)","burger buns","lettuce","tomato","onion","cheese","condiments"],"instructions":[],"tags":["American","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1019,"url":"","title":"Butter Chicken","ingredients":["chicken","butter","cream","tomatoes","onion","garlic","ginger","garam masala","cumin","coriander","turmeric"],"instructions":[],"tags":["Indian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Michelle's recipe — 2x recommended.","cuisine":"Indian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1020,"url":"","title":"Carbonara","ingredients":["spaghetti","guanciale or bacon","eggs","pecorino romano","parmesan","black pepper"],"instructions":[],"tags":["Italian","Pasta","Bacon"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1021,"url":"https://www.seriouseats.com/no-waste-tacos-de-carnitas-recipe","title":"Carnitas","ingredients":["3-4 lb pork shoulder, cut into 2-inch chunks","1 orange, juiced","2 limes, juiced","6 cloves garlic, minced","2 teaspoons cumin","1 teaspoon oregano","1 teaspoon chili powder","1 teaspoon salt","1/2 teaspoon black pepper","1 onion, quartered"],"instructions":["Season pork with cumin, oregano, chili powder, salt, and pepper.","Place pork in Instant Pot with onion, garlic, orange juice, and lime juice.","Pressure cook on high for 45 minutes, natural release 15 minutes.","Remove pork and shred with two forks. Reserve cooking liquid.","For crispy carnitas: spread shredded pork on a baking sheet, drizzle with some cooking liquid, and broil 3-5 minutes until edges are crispy.","Serve in tortillas with salsa, cilantro, and lime."],"tags":["American","Pork","Instant Pot","Mexican-inspired"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. Try more seasoning; keep juices to thicken and pour over.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1022,"url":"","title":"Cashew Chicken","ingredients":["chicken","cashews","soy sauce","hoisin","sesame oil","garlic","ginger","chili oil"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Sweet sauce — add chili oil.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1023,"url":"https://thewoksoflife.com/chinese-bbq-pork-cha-siu/","title":"Char Siu","ingredients":["2 lbs pork shoulder, cut into long strips (2-inch thick)","3 tablespoons hoisin sauce","3 tablespoons soy sauce","2 tablespoons honey","2 tablespoons rice wine (Shaoxing)","1 tablespoon five-spice powder","2 cloves garlic, minced","1 tablespoon red fermented bean curd (optional)","red food coloring (optional)"],"instructions":["Mix hoisin, soy sauce, honey, rice wine, five-spice, garlic, and bean curd into a marinade.","Marinate pork strips for at least 4 hours or overnight in the fridge.","Preheat oven to 475F. Place pork on a wire rack over a foil-lined baking sheet.","Roast for 15 minutes, flip, brush with marinade.","Roast another 10-15 minutes until edges are slightly charred.","Brush with honey for a final glaze. Rest 5 minutes, then slice and serve."],"tags":["Asian","Pork","Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Oven-roasted.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1024,"url":"","title":"Char Siu Pork Tenderloin","ingredients":["pork tenderloin","char siu sauce","honey","soy sauce","hoisin","five spice"],"instructions":[],"tags":["Asian","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1025,"url":"","title":"Cheesy Pasta with Veggies","ingredients":["pasta","cheese","mixed vegetables","butter","garlic","broth"],"instructions":[],"tags":["American","Pasta","Instant Pot","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"No chopping / minimal prep. Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1026,"url":"","title":"Chicken Lettuce Wraps","ingredients":["ground chicken","water chestnuts","hoisin sauce","soy sauce","ginger","garlic","green onion","butter lettuce"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1027,"url":"","title":"Chicken Parm","ingredients":["chicken breast","breadcrumbs","parmesan","mozzarella","marinara sauce","eggs","flour"],"instructions":[],"tags":["Italian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1028,"url":"","title":"Chicken Pot Pie","ingredients":["chicken","carrots","peas","celery","onion","cream","flour","butter","pie crust"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1029,"url":"","title":"Chicken Salad","ingredients":["cooked chicken","mayo","celery","onion","dijon mustard","lemon juice","salt","pepper"],"instructions":[],"tags":["American","Chicken","Cold"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1030,"url":"","title":"Chicken Teriyaki","ingredients":["chicken thighs","soy sauce","mirin","sake","sugar","garlic","ginger"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1031,"url":"","title":"Chicken Tikka Masala","ingredients":["chicken","yogurt","tomatoes","cream","garlic","ginger","garam masala","cumin","turmeric","paprika"],"instructions":[],"tags":["Indian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Indian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1032,"url":"","title":"Chinese Broccoli","ingredients":["chinese broccoli (gai lan)","oyster sauce","garlic","sesame oil"],"instructions":[],"tags":["Asian","Vegetable","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1033,"url":"","title":"Chinese Broccoli with Beef","ingredients":["beef","chinese broccoli","oyster sauce","soy sauce","garlic","ginger","cornstarch"],"instructions":[],"tags":["Asian","Beef","Vegetable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Make with rice.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1034,"url":"https://www.allrecipes.com/recipe/13117/coconut-curry-salmon/","title":"Coconut Milk Salmon Leek Soup","ingredients":["1 lb salmon fillets, cubed","2 leeks, sliced (white and light green parts)","1 can (14 oz) coconut milk","2 cups fish or chicken broth","1 cup daikon, cubed","4 oz enoki mushrooms","2 slices ginger","1 stalk lemongrass, bruised","2 tablespoons fish sauce","1 tablespoon lime juice","cilantro for garnish"],"instructions":["Heat a pot over medium heat. Saute leeks and ginger until softened, 3 minutes.","Add broth, lemongrass, and daikon. Simmer 10 minutes until daikon is tender.","Pour in coconut milk and bring to a gentle simmer.","Add salmon cubes and enoki mushrooms. Cook 5-7 minutes until salmon is cooked through.","Season with fish sauce and lime juice. Remove lemongrass.","Garnish with cilantro and serve."],"tags":["Asian","Seafood","Soup","AIP"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Added daikon and enoki.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1035,"url":"https://thewoksoflife.com/dan-dan-noodles/","title":"Dan Dan Noodles","ingredients":["8 oz dried Chinese noodles","1/2 lb ground pork","2 tablespoons chili oil","2 tablespoons sesame paste (or tahini)","2 tablespoons soy sauce","1 tablespoon Chinese black vinegar","1 teaspoon Sichuan peppercorn, ground","3 cloves garlic, minced","1 tablespoon ginger, minced","2 green onions, chopped","1 tablespoon preserved mustard greens (ya cai), minced"],"instructions":["Cook noodles according to package directions. Drain, reserving 1 cup pasta water.","Make sauce: mix sesame paste, soy sauce, chili oil, black vinegar, and Sichuan peppercorn with 3-4 tablespoons pasta water.","Heat oil in a wok. Brown ground pork with garlic, ginger, and preserved mustard greens until crispy.","Divide sauce among bowls. Add noodles and top with pork mixture.","Garnish with green onions and extra chili oil."],"tags":["Asian","Noodles","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1036,"url":"","title":"Detroit Pizza","ingredients":["pizza dough","brick cheese","pepperoni","tomato sauce","garlic"],"instructions":[],"tags":["American","Pizza"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1037,"url":"https://www.allrecipes.com/recipe/257938/egg-roll-in-a-bowl/","title":"Egg Roll in a Bowl","ingredients":["1 lb ground pork","1/2 head cabbage, shredded","2 carrots, shredded","3 tablespoons soy sauce (or coconut aminos for AIP)","1 tablespoon sesame oil","1 tablespoon rice vinegar","3 cloves garlic, minced","1 tablespoon ginger, grated","3 green onions, sliced","sriracha or chili oil to taste"],"instructions":["Brown ground pork in a large skillet over medium-high heat. Drain excess fat.","Add garlic and ginger, cook 30 seconds.","Add shredded cabbage and carrots. Cook 5-7 minutes until tender-crisp.","Add soy sauce, sesame oil, and rice vinegar. Toss to combine.","Garnish with green onions and sriracha. Serve as is or over rice."],"tags":["Asian","AIP-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"AIP-friendly.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1038,"url":"","title":"Eggplant Parm","ingredients":["eggplant","breadcrumbs","marinara","mozzarella","parmesan","eggs","flour"],"instructions":[],"tags":["Italian","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1039,"url":"","title":"Fish Sauce Dipping Sauce","ingredients":["fish sauce (3/4 cup)","water (3/4 cup)","sugar (1/4 cup)","white vinegar (1/3 cup + 1/4 cup)"],"instructions":[],"tags":["Asian","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"3/4c fish sauce, 3/4c water, 1/4c sugar, 1/3c + 1/4c white vinegar.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1040,"url":"","title":"Fried Rice","ingredients":["rice","eggs","soy sauce","sesame oil","green onion","garlic","frozen peas and carrots","protein of choice"],"instructions":[],"tags":["Asian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1041,"url":"","title":"Garlic Bread","ingredients":["baguette or italian bread","butter","garlic","parsley","parmesan"],"instructions":[],"tags":["Italian","Side","Bread"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1042,"url":"","title":"Gochujang Sauce","ingredients":["2 tablespoons gochujang","1 tablespoon soy sauce","1 tablespoon sesame oil","1 tablespoon rice vinegar","1 tablespoon honey or sugar","2 cloves garlic, minced","1 teaspoon ginger, grated"],"instructions":["Whisk together gochujang, soy sauce, sesame oil, rice vinegar, honey, garlic, and ginger.","Adjust sweetness and heat to taste.","Use as a marinade, dipping sauce, or stir-fry sauce. Keeps refrigerated for 2 weeks."],"tags":["Asian","Sauce","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1043,"url":"","title":"Green Curry","ingredients":["chicken","green curry paste","coconut milk","bamboo shoots","thai basil","fish sauce","sugar","lime leaves"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1044,"url":"","title":"Grilled Cheese","ingredients":["bread","butter","brie or cheddar","crispy bacon","caramelized onions"],"instructions":[],"tags":["American","Sandwich"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Variations: brie + crispy bacon + caramelized onions; buffalo chicken.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1045,"url":"","title":"Ground Beef Carrots with Curry Rice","ingredients":["ground beef","carrots","zataar spice","curry spiced rice","sweet peppers","tahini","yogurt","lemon","garlic"],"instructions":[],"tags":["Asian","Beef","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Zataar ground beef & carrots with curry spiced rice, sweet peppers, tahini/yogurt/lemon/garlic sauce.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1046,"url":"https://www.seriouseats.com/halal-cart-style-chicken-and-rice-recipe","title":"Halal Chicken Over Rice","ingredients":["2 lbs chicken thighs, boneless skinless","1/2 cup yogurt","2 tablespoons lemon juice","3 cloves garlic, minced","1 teaspoon turmeric","1 teaspoon cumin","1 teaspoon coriander","1 teaspoon paprika","salt and pepper","2 cups basmati rice","White sauce: 1/2 cup mayo, 1/4 cup yogurt, 1 tablespoon sugar, 2 tablespoons white vinegar, salt","Hot sauce: sriracha or harissa"],"instructions":["Marinate chicken in yogurt, lemon, garlic, turmeric, cumin, coriander, paprika, salt and pepper for 1-4 hours.","Cook rice according to package directions.","Grill or pan-sear chicken over medium-high heat, 5-6 minutes per side until charred and cooked through.","Slice chicken. Make white sauce by mixing mayo, yogurt, sugar, vinegar, and salt.","Serve sliced chicken over rice with white sauce and hot sauce."],"tags":["Mediterranean","Chicken","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Marinate 1–4 hours.","cuisine":"Mediterranean","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1047,"url":"","title":"Hot Sandwiches","ingredients":["hoagie roll","deli meat","cheese","peppers","onions","oil and vinegar"],"instructions":[],"tags":["American","Sandwich"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1048,"url":"","title":"Jamaican Oxtail","ingredients":["oxtail","jerk seasoning","allspice","thyme","scotch bonnet pepper","onion","garlic","butter beans"],"instructions":[],"tags":["Caribbean","Oxtail","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Caribbean","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1049,"url":"","title":"Lamb Loin Chops","ingredients":["lamb loin chops","garlic","rosemary","olive oil","salt","pepper"],"instructions":[],"tags":["American","Lamb","Pan"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pan-seared.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1050,"url":"","title":"Lemon Chicken","ingredients":["chicken","lemon juice","lemon zest","garlic","olive oil","capers","white wine","butter"],"instructions":[],"tags":["Italian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1051,"url":"https://www.allrecipes.com/recipe/24771/basic-mashed-potatoes/","title":"Mashed Potatoes","ingredients":["3 lbs russet potatoes, peeled and cubed","1/2 cup butter","1/2 cup heavy cream, warmed","4 cloves garlic, minced (optional)","salt and pepper to taste"],"instructions":["If using Instant Pot: add 1 cup water and potatoes. Pressure cook 8 minutes, quick release.","If stovetop: boil potatoes in salted water until fork-tender, about 15-20 minutes. Drain.","Mash potatoes with a masher or ricer.","Stir in butter, warm cream, and garlic. Season with salt and pepper.","Serve immediately."],"tags":["American","Side","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1052,"url":"https://www.allrecipes.com/recipe/18891/italian-spaghetti-sauce-with-meatballs/","title":"Meatballs","ingredients":["1 lb ground beef","1/2 lb ground pork","2 eggs","1/2 cup breadcrumbs","1/2 cup parmesan, grated","3 cloves garlic, minced","2 tablespoons parsley, chopped","1 teaspoon salt","1/2 teaspoon pepper","1/4 cup milk"],"instructions":["Preheat oven to 400F.","Combine all ingredients in a large bowl. Mix gently with hands (don't overwork).","Roll into 1.5-inch balls (about 24 meatballs).","Place on a parchment-lined baking sheet.","Bake 18-20 minutes until cooked through (165F internal).","Add to marinara sauce and simmer 15 minutes before serving."],"tags":["Italian","Beef","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1053,"url":"","title":"Miso Cod","ingredients":["black cod","white miso","mirin","sake","sugar"],"instructions":[],"tags":["Asian","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1054,"url":"","title":"Mom's Gravy","ingredients":["pork neckbones","italian sweet sausage","ground beef (80/20)","eggs","breadcrumbs","onion powder","garlic powder","parmesan","olive oil","garlic","tuttoroso crushed tomatoes (3-4 cans)","tomato paste (1-2 cans kirkland)","basil","sugar"],"instructions":[],"tags":["Italian","Pork","Beef","Sauce"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Brown meats in pan. Sauté olive oil + garlic 2 min. Add 3-4 cans crushed tomatoes + 1-2 cans paste. When paste melts add meats, cook 2hr+. Add basil, water to thin, sugar to cut acidity.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1055,"url":"","title":"Mushroom Gravy","ingredients":["mushrooms","butter","onion","garlic","beef broth","thyme","flour","cream"],"instructions":[],"tags":["American","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add meat of choice; serve over pasta or mashed potatoes.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1056,"url":"","title":"Mushroom Jasmine Rice Risotto","ingredients":["jasmine rice","mushrooms","parmesan","onion","garlic","white wine","butter","broth"],"instructions":[],"tags":["Italian","Vegetarian","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1057,"url":"","title":"Mushroom Risotto","ingredients":["arborio rice","mushrooms","parmesan","onion","garlic","white wine","butter","broth","pancetta or bacon"],"instructions":[],"tags":["American","Instant Pot","Vegetarian-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. Add pancetta/bacon in the beginning. Good for groups.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1058,"url":"","title":"Omelette Souffle","ingredients":["3 eggs, separated","1 tablespoon butter","pinch of salt","1/4 teaspoon cream of tartar"],"instructions":["Preheat oven to 350F.","Beat egg whites with cream of tartar until stiff peaks form.","Beat egg yolks with salt until pale and thick.","Gently fold yolks into whites in thirds, being careful not to deflate.","Melt butter in an oven-safe skillet over medium heat. Pour in egg mixture.","Cook on stovetop 2 minutes until bottom is set. Transfer to oven.","Bake 5-7 minutes until puffed and golden. Serve immediately with desired fillings."],"tags":["French","Breakfast","Eggs"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Very fluffy/airy.","cuisine":"French","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1059,"url":"","title":"Pan Fried Turnip Cake","ingredients":["turnip (daikon)","rice flour","dried shrimp","chinese sausage","soy sauce","sesame oil"],"instructions":[],"tags":["Asian","Dim Sum"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1060,"url":"","title":"Pan Seared Pork Chops","ingredients":["pork chops","garlic","butter","thyme","salt","pepper"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1061,"url":"","title":"Peanut Butter Hoisin Sauce","ingredients":["3 tablespoons peanut butter","2 tablespoons hoisin sauce","1 tablespoon soy sauce","1 tablespoon lime juice","1 tablespoon sriracha","1 clove garlic, minced","2-3 tablespoons warm water to thin"],"instructions":["Whisk together peanut butter, hoisin, soy sauce, lime juice, sriracha, and garlic.","Add warm water a tablespoon at a time until desired consistency.","Use as a dipping sauce for spring rolls, satay, or drizzle over noodles."],"tags":["Asian","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1062,"url":"","title":"Pesto","ingredients":["fresh basil (1 TJ package)","garlic (4 cloves, add to taste)","pine nuts","parmesan","olive oil","salt","pepper"],"instructions":[],"tags":["Italian","Sauce","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add garlic one clove at a time — easy to overdo. Don't over-salt.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1063,"url":"","title":"Pesto Chicken Pasta","ingredients":["chicken","pasta","pesto","parmesan","cherry tomatoes","olive oil"],"instructions":[],"tags":["Italian","Chicken","Pasta"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1064,"url":"","title":"Pesto Pasta","ingredients":["pasta","pesto","parmesan","olive oil","salt","pepper"],"instructions":[],"tags":["American","Pasta","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Can make pesto ahead of time.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1065,"url":"","title":"Pickled Jalapeños","ingredients":["jalapeños","white vinegar","garlic","salt","sugar"],"instructions":[],"tags":["Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1066,"url":"https://www.allrecipes.com/recipe/240564/quick-pickled-red-onions/","title":"Pickled Red Onion","ingredients":["1 large red onion, thinly sliced","1/2 cup apple cider vinegar","1 tablespoon sugar","1 teaspoon salt","1 cup warm water"],"instructions":["Thinly slice red onion into rings or half-moons.","Dissolve sugar and salt in warm water and vinegar.","Add onion slices to the brine. Let sit at room temperature 30 minutes.","Transfer to a jar and refrigerate. Ready in 1 hour, best after 24 hours. Keeps 2 weeks."],"tags":["Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1067,"url":"https://www.allrecipes.com/recipe/65357/pineapple-pork-chops/","title":"Pineapple Pork Loin","ingredients":["2 lb pork loin","1 can (20 oz) pineapple slices or chunks, with juice","3 tablespoons soy sauce","salt and pepper"],"instructions":["Preheat oven to 350F.","Season pork loin with salt and pepper. Place in a baking dish.","Pour pineapple with juice over the pork. Drizzle soy sauce over top.","Cover with foil and bake 60 minutes until internal temp reaches 145F.","Rest 10 minutes before slicing. Spoon pineapple and pan juices over slices."],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pineapple + soy sauce on pork, bake 350° 60 min.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1068,"url":"https://www.pressurecookrecipes.com/instant-pot-pot-roast/","title":"Pot Roast","ingredients":["3-4 lb beef chuck roast","1 lb baby carrots or carrots, chunked","1.5 lbs potatoes, quartered","1 onion, quartered","4 cloves garlic","2 cups beef broth","2 tablespoons tomato paste","1 tablespoon Worcestershire sauce","1 teaspoon thyme","1 teaspoon rosemary","salt and pepper","2 tablespoons olive oil"],"instructions":["Season roast generously with salt and pepper. Sear on all sides in olive oil in the Instant Pot on saute mode.","Remove roast. Saute onion and garlic 2 minutes. Add tomato paste and Worcestershire.","Add broth, scrape up browned bits. Return roast. Add herbs.","Pressure cook on high 60 minutes, natural release 15 minutes.","Add carrots and potatoes around the roast. Pressure cook 8 more minutes, quick release.","Slice roast and serve with vegetables and pot juices."],"tags":["American","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1069,"url":"","title":"Rachael Ray Soup","ingredients":["italian sausage","white beans","kale","onion","garlic","chicken broth","parmesan"],"instructions":[],"tags":["Italian","Pork","Soup"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1070,"url":"","title":"Ribs","ingredients":["pork ribs","dry rub","bbq sauce","apple juice"],"instructions":[],"tags":["American","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Season & remove membrane. 25 min high pressure in apple juice. Then broil with sauce.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1071,"url":"https://thewoksoflife.com/stir-fried-sticky-rice-cakes/","title":"Rice Cakes with Onions & Peppers","ingredients":["8 oz. pork shoulder or loin (julienned)","1 tablespoon water","2 teaspoons light soy sauce","1/2 teaspoon sesame oil","1/4 teaspoon white pepper","1 teaspoon vegetable oil","1 teaspoon cornstarch","1 pound rice cakes","8 ounces baby bok choy (or napa cabbage)","2 cloves garlic (coarsely chopped)","3 scallions (cut on a diagonal into 1 inch pieces)","6 dried shiitake mushrooms (soaked for 2 hours)","3 tablespoons vegetable oil","1 tablespoon Shaoxing wine","1/2-3/4 cup water","1/2 teaspoon sesame oil","1 1/2 teaspoons dark soy sauce","1 tablespoon light soy sauce","2 teaspoons oyster sauce","1/4 teaspoon ground white pepper","1/2 teaspoon sugar","salt (to taste)"],"instructions":["Marinate the julienned pork with the water, light soy sauce, sesame oil, white pepper, vegetable oil, and cornstarch. Allow to sit for 20 minutes.","If using dried rice cakes, soak them in water for at least 2 hours or overnight in the fridge. If using fresh or vacuum-packed rice cakes, no soaking needed.","Slice the bok choy, chop the garlic, cut the scallions, and slice the reconstituted shiitake mushrooms.","Heat 2 tablespoons oil in a wok over high heat. Sear the pork until just cooked, then remove and set aside.","Add 1 tablespoon oil. Stir-fry the garlic, mushrooms, and white parts of scallions for 30 seconds.","Add the rice cakes and bok choy. Stir-fry for 1 minute.","Add the Shaoxing wine, water, sesame oil, dark soy sauce, light soy sauce, oyster sauce, white pepper, and sugar. Stir and cook until sauce thickens and rice cakes are tender, about 3-4 minutes.","Add back the pork and scallion greens. Toss everything together and serve."],"tags":["Asian","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1072,"url":"https://www.allrecipes.com/recipe/79980/baked-plantains/","title":"Roasted Sweet Plantains","ingredients":["2 Ripe plantains","1 Tbsp Coconut oil","Sea salt to taste"],"instructions":["Cut plantains in half lengthwise, remove skin and then cut into oblong chunks.","Lightly toss slices of very ripe plantain with coconut oil with a little sea salt and cover in a roasting pan with tin foil.","Cook low on 320F degrees for approx. 20 minutes.","Then, remove the cover (the plantains will be a little puffy and very soft), crank up the heat to 420F degrees for 15 minutes or so, watch them and they're done when you're happy with the color!"],"tags":["Side","Caribbean-inspired"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Bake 20 min covered at 320°, then 15 min uncovered at 420°.","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1073,"url":"","title":"Roasted Whole Chicken","ingredients":["whole chicken","butter","garlic","lemon","thyme","rosemary","salt","pepper"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1074,"url":"","title":"Roseanne's Pasta Sauce","ingredients":["garlic","olive oil","crushed tomatoes (3 cans)","tomato paste (1 can)","basil","oregano","sugar","meatballs","pork neck bones"],"instructions":[],"tags":["Italian","Sauce","Pork","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Sauté garlic in olive oil. Add 3 cans crushed tomatoes + 1 can paste. Add basil, oregano, sugar. Simmer 1hr then add browned meatballs/pork neck bones. Simmer a few hours. Add water if too thick.","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1075,"url":"","title":"Salsa Chicken","ingredients":["chicken","salsa","cumin","garlic powder","onion powder","chili powder"],"instructions":[],"tags":["Mexican","Chicken","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Mexican","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1076,"url":"","title":"Savory Steamed Egg","ingredients":["eggs","dashi or broth","soy sauce","sesame oil","green onion"],"instructions":[],"tags":["Asian","Egg","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Silky smooth. Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1077,"url":"","title":"Seared Salmon with Mustard Vinaigrette","ingredients":["salmon","shallot","dijon mustard","vinegar","italian seasoning","garlic"],"instructions":[],"tags":["American","Seafood","Salmon"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pat dry salmon, cook 3–5 min each side. Sauce: 1 shallot, 1 tbsp dijon, 1 tbsp vinegar, 1 tbsp italian seasoning, garlic.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1078,"url":"","title":"Sesame Teriyaki Chicken","ingredients":["chicken","soy sauce","mirin","sake","sugar","sesame oil","sesame seeds"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1079,"url":"","title":"Skillet Pork Loin Chops","ingredients":["pork loin chops","garlic","butter","herbs","salt","pepper"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1080,"url":"https://www.allrecipes.com/smashed-cucumber-salad-recipe-7499498","title":"Smashed Cucumber Salad","ingredients":["2 English cucumbers","1.5 teaspoons kosher salt, plus more as needed","1 teaspoon white sugar","2 cloves garlic, finely crushed","2 tablespoons seasoned rice vinegar","1 teaspoon soy sauce","1 teaspoon sesame oil","red pepper flakes to taste","2 teaspoons toasted sesame seeds"],"instructions":["Wrap each cucumber in plastic wrap. Place on a work surface and pound with a flat object until cucumbers crack and are slightly flattened. Remove from plastic. Cut cucumbers in half; halve each side lengthwise. Slice into 1- to 1.5-inch wide slices. Transfer to a strainer set over a bowl.","Sprinkle cucumber with salt and sugar; mix until well combined. Refrigerate for 30 to 60 minutes so cucumber pieces can drain.","To make the dressing: Place garlic, seasoned rice vinegar, soy sauce, sesame oil, and red pepper flakes in a large bowl; whisk together thoroughly.","Transfer drained cucumbers into the bowl with dressing. Toss to combine. Sprinkle with sesame seeds and serve."],"tags":["Asian","Salad","Appetizer"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1081,"url":"","title":"Steamed Eggplant with Meat","ingredients":["eggplant","ground beef or pork","garlic","soy sauce","oyster sauce","sesame oil","green onion"],"instructions":[],"tags":["Asian","Beef","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1082,"url":"","title":"Sweet and Sour Country Ribs","ingredients":["country ribs","vinegar","sugar","soy sauce","ketchup","garlic","pineapple"],"instructions":[],"tags":["Asian","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"OK, not a favorite.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1083,"url":"","title":"Taiwanese Braised Minced Pork","ingredients":["pork shoulder (minced)","soy sauce","rice wine","sugar","five spice","shallots","hard boiled eggs"],"instructions":[],"tags":["Asian","Pork","Dutch Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Braise 2–3 hours in Dutch oven.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1084,"url":"","title":"Thai Chicken Enchiladas","ingredients":["chicken","flour tortillas","peanut sauce","coconut milk","thai basil","lime","bean sprouts","shredded cheese"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1085,"url":"","title":"Thai Coconut Meatball Soup","ingredients":["meatballs","coconut milk","broth","lemongrass","kaffir lime leaves","thai basil","bok choy","rice or noodles","fish sauce"],"instructions":[],"tags":["Asian","Soup","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add kaffir lime leaves, thai basil, bok choy, rice or noodles.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1086,"url":"https://www.seriouseats.com/chicken-tinga-recipe","title":"Tinga","ingredients":["2 bone-in, skin-on chicken breast halves (about 1 1/4 pounds)","Kosher salt and freshly ground black pepper","2 tablespoons lard or vegetable oil","6 ounces tomatillos, peeled (about 2 medium)","6 ounces ripe plum tomatoes (about 2 medium)","4 medium garlic cloves","1 small white onion, finely chopped","2 teaspoons dried oregano (preferably Mexican)","2 bay leaves","2 tablespoons cider vinegar","2 cups chicken stock","2 to 3 canned chipotle chilies in adobo sauce, plus 1 tablespoon sauce from can","2 teaspoons Asian fish sauce"],"instructions":["Season chicken generously with salt and pepper. Heat oil in a medium saucepan over high heat until shimmering. Add chicken skin-side-down and cook until well-browned, 6 to 8 minutes. Flip and cook 2 minutes. Transfer to a plate.","Add tomatillos, tomatoes, and garlic to the pot. Cook, turning occasionally, until charred, about 5 minutes. Transfer to a blender.","Add onion to pot and cook until softened, about 4 minutes. Add oregano and bay leaves. Cook 30 seconds. Add vinegar and scrape up browned bits. Add stock and bring to a boil.","Return chicken to pot, reduce heat, and simmer until cooked through, about 20 minutes. Transfer chicken to a plate.","Discard bay leaves. Add chipotle chilies and sauce to blender with tomatillo mixture. Blend until smooth. Add to pot. Add fish sauce.","Shred chicken, discarding skin and bones. Return to sauce and simmer until thickened, about 10 minutes. Season with salt and pepper."],"tags":["Mexican","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Mexican","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1087,"url":"https://www.pressurecookrecipes.com/instant-pot-tomato-beef/","title":"Tomato Beef Roast","ingredients":["2-3 pounds chuck roast, 2 inches thick","1 can 14oz diced tomatoes","1 medium onion, sliced","6 garlic cloves, minced","1 tablespoon olive oil","1 cup unsalted chicken stock","3 tablespoons tomato paste","2 tablespoons regular soy sauce","1 tablespoon oyster sauce (optional)","1 tablespoon white sugar (optional)","Salt and Black pepper","2 tablespoons cornstarch","3 tablespoons cold water","2 stalks green onions, finely sliced"],"instructions":["Heat up Instant Pot using Saute More function. Pat dry the chuck roast steaks, then season one side generously with salt and black pepper. Drizzle 1 tbsp olive oil in inner pot. Carefully place the seasoned side of chuck steaks in Instant Pot. Season the other side with salt and black pepper. Brown for 4 minutes per side.","Remove browned chuck roast. Add sliced onions and minced garlic. Saute for roughly 2 minutes.","Add diced tomatoes with juices, unsalted chicken stock, tomato paste, regular soy sauce, oyster sauce, and white sugar. Mix well. Place chuck steak back in.","Close lid, pressure cook at high pressure for 35 minutes, then natural release for 15 minutes.","Remove beef, cut into bite-sized pieces. Set Instant Pot to Saute. Mix cornstarch with cold water, stir into sauce to thicken. Add beef back, garnish with green onions."],"tags":["Asian","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1088,"url":"","title":"Vietnamese Fish Sauce Dipping Sauce","ingredients":["fish sauce","water","sugar","lime juice","garlic","chili"],"instructions":[],"tags":["Asian","Sauce","Vietnamese"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1089,"url":"https://www.allrecipes.com/recipe/228967/mussels-in-white-wine-sauce/","title":"White Wine Mussels","ingredients":["2 tablespoons butter","4 cloves garlic, minced","1 lemon, zested","0.5 teaspoon red pepper flakes, or to taste","2 cups white wine","freshly ground black pepper to taste","2 pounds mussels, cleaned and debearded","1 cup chopped fresh flat-leaf parsley"],"instructions":["Melt butter in a large stockpot over medium heat. Add garlic and let sizzle for about 30 seconds. Stir in lemon zest and red pepper flakes for about 45 seconds.","Quickly pour wine into the pot and season with black pepper. Bring sauce to a boil; add mussels and cover immediately. Shake pot and let boil for 1 minute.","Stir mussels, replace cover, and let boil for 2 more minutes. The shells will begin to open. Stir in parsley, cover, and cook until all shells are open, 1 to 3 minutes.","Serve with crusty bread."],"tags":["American","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1090,"url":"","title":"Yellow Curry","ingredients":["chicken","yellow curry paste","coconut milk","potato","onion","fish sauce","sugar"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1091,"url":"https://www.pressurecookrecipes.com/instant-pot-soy-sauce-chicken/","title":"Soy Sauce Chicken","ingredients":["2 teaspoons vegetable oil","7 slices ginger","2 scallions (cut into 3-inch pieces)","3 star anise","1 1/2 cups Chinese Rose Wine (or Shaoxing wine)","1 1/2 cups light soy sauce","1 1/4 cups dark soy sauce","1 cup plus 2 tablespoons sugar","2 teaspoons salt","8 cups water","8 boneless skinless chicken thighs"],"instructions":["Turn on the Instant Pot saute setting, add oil and ginger. Let it caramelize for about 30 seconds. Add scallions and cook another 30 seconds. Add the star anise, rice wine, soy sauce, dark soy sauce, sugar, salt, and water.","Close the lid, set vent to sealing. Cook for 5 minutes on high pressure.","Safely release the pressure. Remove chicken and slice. Serve over rice with sauce ladled over top."],"tags":["Asian","Chicken","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1092,"url":"https://thecozyapron.com/braised-pork-shoulder/","title":"Braised Pork Shoulder","ingredients":["1 1/2 teaspoons smoked paprika","1 teaspoon ground cumin","1 teaspoon ground coriander","1/4 teaspoon chipotle powder","2 1/4 to 2 1/2 pound pork shoulder (boneless), cut into medium-large chunks","Salt","Black pepper","2 tablespoons flour","Olive oil or avocado oil","1 large onion, quartered and sliced","1 large green bell pepper, sliced","2 Anaheim peppers, sliced","6 cloves garlic, pressed","1 cup beer (Mexican lager)","1 3/4 cup chicken stock","8 ounces baby yellow potatoes, halved or quartered","1 pound Campari tomatoes (about 8), quartered","1/4 cup chopped cilantro, plus extra for garnish","2 tablespoons chopped parsley"],"instructions":["Gather and prep all ingredients. Preheat oven to 325 degrees.","Prepare spice mix: combine smoked paprika, cumin, coriander, and chipotle powder.","Season pork with salt and pepper, then coat with flour. Brown in batches in a Dutch oven with oil over medium-high heat. Set aside.","Saute onion, bell pepper, and Anaheim peppers until softened. Add garlic and spice mix, cook 1 minute.","Deglaze with beer, scraping up browned bits. Add chicken stock and bring to a simmer.","Return pork to pot. Add potatoes and tomatoes. Cover and braise in oven for 2 to 2.5 hours until pork is very tender.","Stir in cilantro and parsley. Adjust seasoning and serve."],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Need more seasoning. Chipotle peppers.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1093,"url":"https://iamafoodblog.com/birria-tacos-recipe/","title":"Birria","ingredients":["1.5 lb beef shank","1 lb sirloin (or other roast/steak)","3 dried guajillo peppers","1 can chipotle peppers in adobo","1/4 cup vinegar","1/2 cup crushed tomatoes","5 cloves garlic","1 tsp dried oregano","1/2 tsp smoked paprika","1 tsp cumin","1 medium onion, chopped","1 cinnamon stick","2 bay leaves","6 whole cloves","chicken stock to cover (about 1 quart)","4 inch corn or flour tortillas (12-16)","1 medium onion, chopped (optional)","1 bunch cilantro, chopped (optional)","1 cup mexican cheese blend, grated (optional)"],"instructions":["Bring a large pot of water to a boil and remove from heat. Soak dried guajillo peppers for 15 minutes. Cube the sirloin, season both steak and shank with salt and pepper.","Add soaked peppers, chipotle peppers with adobo, vinegar, crushed tomatoes, garlic, oregano, smoked paprika, and cumin to a blender. Blend until smooth.","Place beef in a large pot or Dutch oven. Add onion, cinnamon stick, bay leaves, and cloves. Pour marinade over the beef. Add chicken stock to cover.","Bring to a boil, then reduce heat and simmer covered for 3 hours until meat is very tender and falling apart.","Shred the meat. Strain the broth (this is the consomme for dipping).","To make tacos: dip tortillas in the broth/fat, then pan-fry. Fill with shredded meat, cheese, onion, and cilantro. Serve with consomme for dipping."],"tags":["Mexican","Beef","Stew"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Mexican","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1094,"url":"","title":"White Chili","ingredients":["chicken","white beans","green chiles","onion","garlic","cumin","chicken broth","cream cheese","sour cream"],"instructions":[],"tags":["American","Chicken","Soup"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1095,"url":"","title":"Mapo Tofu","ingredients":["soft tofu","ground pork","doubanjiang","sichuan peppercorn","black bean sauce","garlic","ginger","broth","cornstarch"],"instructions":[],"tags":["Asian","Pork","Tofu"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1096,"url":"","title":"Cottage Cheese Pancakes","ingredients":["cottage cheese (1 cup)","oats (1 cup)","eggs (2)","baking powder (1 tsp)"],"instructions":[],"tags":["Breakfast","High Protein"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"1 cup cottage cheese, 1 cup oats, 2 eggs, 1 tsp baking powder — blend.","cuisine":"Breakfast","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1097,"url":"https://www.recipetineats.com/momofuku-bossam-korean-slow-cooked-pork/","title":"Momofuku Bossam Pork Shoulder","ingredients":["3.5-4 kg/7-8 lb pork butt/shoulder, bone in, skinless","1/2 cup white sugar","1/2 cup kosher salt","1 tbsp kosher salt","7 tbsp brown sugar","2.5 cups scallions, thinly sliced","1/2 cup fresh ginger, peeled and finely grated","1/3 cup canola oil","1.5 tsp light soy sauce","1 teaspoon sherry vinegar","1/2 tsp kosher salt","2 tbsp ssamjang","1 tbsp gochujang","5 tsp sherry vinegar","2 tbsp canola oil","1 tbsp water","1 tsp white sugar","4-5 heads butter/bib lettuce (40-50+ leaves)","3 cups cooked white rice","500g/1lb kimchi"],"instructions":["Mix sugar and salt together. Pat pork dry and rub sugar-salt mixture all over. Place in a roasting pan, cover tightly with foil, and refrigerate for at least 6 hours or overnight.","Preheat oven to 300F. Roast covered with foil for 6 hours until falling-apart tender.","Make scallion sauce: mix scallions, ginger, canola oil, soy sauce, sherry vinegar, and salt.","Make ssam sauce: mix ssamjang, gochujang, sherry vinegar, canola oil, water, and sugar.","Increase oven to 500F. Remove foil and roast pork for 10-15 minutes until caramelized on top.","Serve by pulling pork apart. Wrap in lettuce leaves with rice, kimchi, and sauces."],"tags":["Asian","Pork","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"With miso gochujang sauce.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1098,"url":"https://www.recipetineats.com/thai-stir-fried-noodles-pad-see-ew/","title":"Pad See Ew","ingredients":["200g / 7 oz dried wide rice stick noodles (or 450g fresh wide flat rice noodles)","2 tsp dark soy sauce","1 1/2 tbsp oyster sauce","1 tbsp light soy sauce","2 tsp white vinegar","2 tsp sugar","3 tbsp peanut or vegetable oil, separated","2 cloves garlic, very finely chopped","1 cup chicken thighs (boneless, skinless), sliced","1 large egg","4 stems Chinese broccoli"],"instructions":["Trim Chinese broccoli ends, cut into 3-inch pieces. Separate leaves from stems. Cut thick stems in half vertically.","Cook noodles according to package directions and drain. Time it so they're cooked just before using.","Mix sauce: dark soy sauce, oyster sauce, light soy sauce, white vinegar, and sugar.","Heat 1 tbsp oil in a large wok over very high heat. Cook chicken until golden, about 2 minutes. Remove.","Add 1 tbsp oil, stir-fry broccoli stems 30 seconds, add leaves, cook 30 seconds. Remove.","Add 1 tbsp oil, crack in egg, break yolk, let it set slightly. Add noodles on top.","Pour sauce over noodles, toss vigorously. Add back chicken and broccoli. Toss 30 seconds and serve."],"tags":["Asian","Noodles","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1099,"url":"","title":"Nina's Sausage & Peppers","ingredients":["italian sausage (casing removed)","red peppers","green peppers","onion","garlic","tomato sauce","oregano","basil"],"instructions":[],"tags":["Italian","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Tomato sauce, oregano, basil. Chopped red peppers, green peppers, onion & garlic. Remove sausage casing.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]}];

const MEMBER_COLORS = {
  "Amy": "#ff492c",
  "default": "#5938a2",
};
function getMemberColor(name) {
  return MEMBER_COLORS[name] || "#23cca2";
}

// ── Helper: convert DB row → app recipe object ──
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
    cookLog: (row.cook_log || []).map(d => typeof d === "string" ? d : new Date(d).toISOString()),
    shareToken: row.share_token || null,
    isShared: row.is_shared || false,
  };
}

// ── Helper: convert app recipe → DB row for insert/update ──
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

const views = { HOME:"home", DETAIL:"detail", ADD:"add", FAVORITES:"favorites", LOG:"log", SHARED:"shared" };

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange && onChange(n)}
          style={{ cursor:onChange?"pointer":"default", fontSize:20, color:n<=(hover||value)?"#ff492c":"#ddd", transition:"color 0.15s" }}
        >★</span>
      ))}
    </div>
  );
}

function Avatar({ name, size=28 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:getMemberColor(name),
      color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.4, fontWeight:700, flexShrink:0,
      fontFamily:"'DM Sans',sans-serif"
    }}>{(name||"?")[0].toUpperCase()}</div>
  );
}

function RecipeCard({ recipe, onClick, onFav }) {
  const daysSince = recipe.cookLog?.length > 0
    ? Math.floor((Date.now() - new Date(recipe.cookLog[recipe.cookLog.length-1]).getTime()) / 86400000)
    : null;
  const overdue = daysSince === null || daysSince > 30;

  return (
    <div onClick={onClick}
      style={{ background:"#fff", borderRadius:16, overflow:"hidden", cursor:"pointer",
        boxShadow:"0 2px 12px rgba(0,0,0,0.07)", transition:"transform 0.18s, box-shadow 0.18s", position:"relative" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.07)"; }}
    >
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
      <div style={{ color:"#888", fontFamily:"'DM Sans',sans-serif", fontSize:13 }}>{label}</div>
    </div>
  );
}

async function callClaude(system, userMsg, useSearch=false) {
  const body = { model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages:[{role:"user",content:userMsg}] };
  if (useSearch) body.tools = [{type:"web_search_20250305",name:"web_search"}];
  const res = await fetch("/api/claude", {
    method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)
  });
  const data = await res.json();
  const tb = data.content?.find(b => b.type==="text");
  if (!tb) throw new Error("No response");
  return tb.text;
}
function parseJSON(text) { return JSON.parse(text.replace(/```json|```/g,"").trim()); }

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(views.HOME);
  const [selected, setSelected] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(USER_KEY) || "");
  const [showUserModal, setShowUserModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const [addTab, setAddTab] = useState("url");
  const [url, setUrl] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");

  // Manual entry state
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
  const [fetchingFromUrl, setFetchingFromUrl] = useState(false);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editInstructions, setEditInstructions] = useState("");
  const [editNotes, setEditNotes] = useState("");

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

  async function fetchAndFillFromUrl() {
    if (!editUrl.trim()) return;
    setFetchingFromUrl(true);
    try {
      const text = await callClaude(
        `You are a recipe extractor. Use web search to fetch the URL and return ONLY valid JSON (no markdown):
{"title":"string","ingredients":["string"],"instructions":["string"],"tags":["string"],"servings":"string","time":"string"}
If you cannot extract, return {"error":"message"}.`,
        `Extract the recipe from: ${editUrl}`, true
      );
      const parsed = parseJSON(text);
      if (parsed.error) throw new Error(parsed.error);
      setEditIngredients((parsed.ingredients || []).join("\n"));
      setEditInstructions((parsed.instructions || []).join("\n"));
    } catch(e) {
      console.error("Could not fetch from URL:", e.message);
    }
    finally { setFetchingFromUrl(false); }
  }

  // Export recipes to .docx (HTML-based)
  function exportRecipesToDoc() {
    const recipesToExport = recipes.filter(r => r.ingredients?.length > 0 || r.instructions?.length > 0);
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><style>
body { font-family: Calibri, sans-serif; color: #333; max-width: 700px; margin: 0 auto; }
h1 { color: #062846; font-size: 28px; border-bottom: 2px solid #ff492c; padding-bottom: 6px; }
h2 { color: #062846; font-size: 20px; margin-top: 30px; page-break-before: always; }
h2:first-of-type { page-break-before: avoid; }
h3 { color: #5938a2; font-size: 14px; margin: 12px 0 6px; }
li { margin-bottom: 4px; line-height: 1.5; }
.tags { color: #888; font-size: 11px; margin-bottom: 8px; }
.notes { background: #fffbf0; padding: 8px 12px; border-left: 3px solid #ffd200; margin: 10px 0; font-size: 12px; }
.source { font-size: 11px; color: #5938a2; }
</style></head><body>
<h1>mise en place Recipe Collection</h1>
<p style="color:#888;font-size:12px;">\${recipes.length} recipes total, \${recipesToExport.length} with full details. Exported \${new Date().toLocaleDateString()}</p>`;
    for (const r of recipesToExport) {
      html += `<h2>\${r.title}</h2>`;
      if (r.cuisine || r.tags?.length) html += `<div class="tags">\${r.cuisine ? r.cuisine + ' - ' : ''}\${(r.tags||[]).join(', ')}</div>`;
      if (r.ingredients?.length) {
        html += `<h3>Ingredients</h3><ul>`;
        for (const ing of r.ingredients) html += `<li>\${ing}</li>`;
        html += `</ul>`;
      }
      if (r.instructions?.length) {
        html += `<h3>Instructions</h3><ol>`;
        for (const step of r.instructions) html += `<li>\${step}</li>`;
        html += `</ol>`;
      }
      if (r.notes) html += `<div class="notes"><strong>Notes:</strong> \${r.notes}</div>`;
      if (r.url) html += `<div class="source">Source: \${r.url}</div>`;
    }
    html += `</body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mise-en-place-recipes.doc';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // Sharing state
  const [shareLoading, setShareLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [sharedRecipe, setSharedRecipe] = useState(null); // for viewing a shared recipe via link

  // ── Check URL for shared recipe token on mount ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("share");
    if (token && supabase) {
      supabase.from("recipes").select("*").eq("share_token", token).eq("is_shared", true).single()
        .then(({ data, error }) => {
          if (data && !error) {
            setSharedRecipe(rowToRecipe(data));
            setView(views.SHARED);
          }
        });
    }
  }, []);

  // ── Load recipes from Supabase on mount ──
  useEffect(() => {
    if (!currentUser) {
      setShowUserModal(true);
      setLoading(false);
      return;
    }
    loadRecipes();
  }, [currentUser]);

  async function loadRecipes() {
    if (!supabase) {
      // Fallback to seed recipes if Supabase not configured
      setRecipes(SEED_RECIPES);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("recipes").select("*").order("date_added", { ascending: true });
      if (error) throw error;
      if (data && data.length > 0) {
        setRecipes(data.map(rowToRecipe));
      } else {
        // First time: seed the database with initial recipes
        await seedDatabase();
      }
    } catch (e) {
      console.error("Failed to load recipes:", e);
      setRecipes(SEED_RECIPES); // fallback
    }
    setLoading(false);
  }

  async function seedDatabase() {
    if (!supabase) return;
    const rows = SEED_RECIPES.map(r => recipeToRow(r));
    const { data, error } = await supabase.from("recipes").insert(rows).select();
    if (error) {
      console.error("Seed failed:", error);
      setRecipes(SEED_RECIPES);
    } else {
      setRecipes(data.map(rowToRecipe));
    }
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
      rating: 0,
      favorite: false,
      addedBy: currentUser || "Unknown",
      dateAdded: new Date().toISOString(),
      cookLog: [],
      notes: "",
      cuisine: parsed.cuisine || "",
      ease: parsed.ease || "",
      shareToken: null,
      isShared: false,
    };

    if (supabase) {
      const { data, error } = await supabase.from("recipes").insert([recipeToRow(recipe)]).select().single();
      if (!error && data) {
        const newRecipe = rowToRecipe(data);
        setRecipes(prev => [...prev, newRecipe]);
        return newRecipe;
      }
    }
    // Fallback: add locally with generated id
    const local = { ...recipe, id: Date.now() + Math.random() };
    setRecipes(prev => [...prev, local]);
    return local;
  }

  async function updateRecipe(id, updates) {
    // Convert updates to DB format
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

  async function logCook(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    const newLog = [...(recipe.cookLog || []), new Date().toISOString()];
    await updateRecipe(id, { cookLog: newLog });
  }

  async function toggleFav(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    await updateRecipe(id, { favorite: !recipe.favorite });
  }

  async function setRating(id, rating) {
    await updateRecipe(id, { rating });
  }

  async function deleteRecipe(id) {
    if (supabase) {
      const { error } = await supabase.from("recipes").delete().eq("id", id);
      if (error) console.error("Delete failed:", error);
    }
    setRecipes(prev => prev.filter(r => r.id !== id));
    setView(views.HOME);
    setSelected(null);
  }

  // ── Sharing ──
  async function shareRecipe(id) {
    setShareLoading(true);
    setShareCopied(false);
    try {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;

      let token = recipe.shareToken;
      if (!token) {
        token = crypto.randomUUID();
        await updateRecipe(id, { shareToken: token, isShared: true });
      } else if (!recipe.isShared) {
        await updateRecipe(id, { isShared: true });
      }

      const shareUrl = `${window.location.origin}?share=${token}`;
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch (e) {
      console.error("Share failed:", e);
    }
    setShareLoading(false);
  }

  async function unshareRecipe(id) {
    await updateRecipe(id, { isShared: false });
  }

  async function saveSharedRecipe(recipe) {
    // Save a copy of a shared recipe to your own collection
    await addRecipeObj({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags,
      servings: recipe.servings,
      time: recipe.time,
      cuisine: recipe.cuisine,
      ease: recipe.ease,
    }, recipe.url);
    // Clear the share view and go home
    window.history.replaceState({}, "", window.location.pathname);
    setSharedRecipe(null);
    setView(views.HOME);
  }

  async function fetchFromUrl() {
    if (!url.trim()) return;
    setUrlLoading(true); setUrlError("");
    try {
      const text = await callClaude(
        `You are a recipe extractor. Use web search to fetch the URL and return ONLY valid JSON (no markdown):
{"title":"string","ingredients":["string"],"instructions":["string"],"tags":["string"],"servings":"string","time":"string"}
If you cannot extract, return {"error":"message"}.`,
        `Extract the recipe from: ${url}`, true
      );
      const parsed = parseJSON(text);
      if (parsed.error) throw new Error(parsed.error);
      await addRecipeObj(parsed, url);
      setUrl(""); setView(views.HOME);
    } catch(e) { setUrlError(e.message||"Could not extract recipe."); }
    finally { setUrlLoading(false); }
  }

  async function fetchFromUrlInDetail(urlToFetch) {
    if (!urlToFetch?.trim()) return;
    setFetchingFromUrl(true);
    try {
      const text = await callClaude(
        `You are a recipe extractor. Use web search to fetch the URL and return ONLY valid JSON (no markdown):
{"title":"string","ingredients":["string"],"instructions":["string"],"tags":["string"],"servings":"string","time":"string"}
If you cannot extract, return {"error":"message"}.`,
        `Extract the recipe from: ${urlToFetch}`, true
      );
      const parsed = parseJSON(text);
      if (parsed.error) throw new Error(parsed.error);
      await updateRecipe(selected.id, {
        ingredients: parsed.ingredients || [],
        instructions: parsed.instructions || [],
      });
    } catch(e) {
      console.error("Could not fetch from URL:", e.message);
    }
    finally { setFetchingFromUrl(false); }
  }


  const allMembers = [...new Set(recipes.map(r => r.addedBy).filter(Boolean))];
  const allCuisines = [...new Set(recipes.map(r => r.cuisine).filter(Boolean))].sort();
  const proteinKeywords = ["Chicken", "Beef", "Pork", "Seafood", "Vegetarian", "Fish", "Lamb", "Turkey", "Tofu"];
  const allProteins = [...new Set(
    recipes.flatMap(r => r.tags?.filter(t => proteinKeywords.some(p => t.includes(p))) || [])
  )].sort();

  const applyAllFilters = (recipeList) => {
    return recipeList.filter(r => {
      const matchCuisine = filterCuisine === "all" || r.cuisine === filterCuisine;
      const matchProtein = filterProtein === "all" || r.tags?.some(t => proteinKeywords.some(p => t === p || t.includes(p)));
      const matchUser = filterUser === "all" || r.addedBy === filterUser;
      const matchSearch = r.title?.toLowerCase().includes(search.toLowerCase()) ||
                         r.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const hasRecipe = r.instructions && r.instructions.length > 0;
      const matchRecipeStatus = filterRecipeStatus === "all" || (filterRecipeStatus === "has" && hasRecipe) || (filterRecipeStatus === "needs" && !hasRecipe);
      return matchCuisine && matchProtein && matchUser && matchSearch && matchRecipeStatus;
    });
  };

  const filtered = applyAllFilters(recipes);
  const favs = applyAllFilters(recipes.filter(r => r.favorite));

  const cookEntries = recipes
    .flatMap(r => (r.cookLog||[]).map(date => ({ recipe:r, date })))
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  const tabBtn = (active) => ({
    flex:1, padding:"9px 0", border:"none", borderRadius:10, cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:12,
    background:active?"#062846":"#f0f0f0", color:active?"#fff":"#888", transition:"all 0.15s"
  });
  const navBtn = (active) => ({
    background:"none", border:"none", cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", fontWeight:active?700:500,
    fontSize:12, color:active?"#ff492c":"#aab4c4",
    padding:"6px 8px", borderRadius:8,
    borderBottom:active?"2px solid #ff492c":"2px solid transparent", transition:"color 0.15s"
  });

  // ── Loading state ──
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
        input,textarea{font-family:'DM Sans',sans-serif}
      `}</style>

      {/* User name modal */}
      {showUserModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:28, maxWidth:360, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:6 }}>Welcome to<br/>mise <span style={{color:"#ff492c"}}>en place</span></div>
            <div style={{ fontSize:13, color:"#888", marginBottom:20 }}>What's your name? Recipes you add will be tagged to you.</div>
            <input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && saveUser(nameInput)}
              placeholder="Your first name"
              autoFocus
              style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:15, outline:"none", marginBottom:14 }}
            />
            <button onClick={() => saveUser(nameInput)} disabled={!nameInput.trim()}
              style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:nameInput.trim()?"#ff492c":"#eee", color:nameInput.trim()?"#fff":"#bbb", fontWeight:700, fontSize:15, cursor:nameInput.trim()?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif" }}>
              Let's cook
            </button>
          </div>
        </div>
      )}

      {/* ── SHARED RECIPE VIEW (accessed via ?share=token) ── */}
      {view === views.SHARED && sharedRecipe && (
        <div style={{ minHeight:"100vh", background:"#f7f6f3" }}>
          <div style={{ background:"#062846", padding:"0 16px" }}>
            <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", height:52 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:900, color:"#fff" }}>
                mise <span style={{color:"#ff492c"}}>en place</span>
              </div>
            </div>
          </div>
          <div style={{ maxWidth:720, margin:"0 auto", padding:"22px 16px" }}>
            <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
              <div style={{ height:140, background:"linear-gradient(135deg,#062846 0%,#5938a2 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56 }}>
                🍽️
              </div>
              <div style={{ padding:"20px 20px 28px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#ff492c", textTransform:"uppercase", letterSpacing:0.5, marginBottom:6 }}>Shared Recipe</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#062846", lineHeight:1.2 }}>{sharedRecipe.title}</div>
                {sharedRecipe.addedBy && (
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:10 }}>
                    <Avatar name={sharedRecipe.addedBy} size={22} />
                    <span style={{ fontSize:12, color:"#888" }}>Shared by <strong>{sharedRecipe.addedBy}</strong></span>
                  </div>
                )}
                <div style={{ display:"flex", gap:14, marginTop:10, fontSize:12, color:"#888" }}>
                  {sharedRecipe.time && <span>⏱ {sharedRecipe.time}</span>}
                  {sharedRecipe.servings && <span>👤 {sharedRecipe.servings}</span>}
                </div>
                <StarRating value={sharedRecipe.rating||0} />
                {sharedRecipe.tags?.length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:14 }}>
                    {sharedRecipe.tags.map(t => <span key={t} style={{ background:"#f0f4ff", color:"#5938a2", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{t}</span>)}
                  </div>
                )}
                <div style={{ marginTop:22 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Ingredients</div>
                  {sharedRecipe.ingredients.length===0
                    ? <div style={{ fontSize:12, color:"#aaa" }}>No ingredients saved.</div>
                    : <ul style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:5 }}>{sharedRecipe.ingredients.map((ing,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{ing}</li>)}</ul>}
                </div>
                <div style={{ marginTop:20 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Instructions</div>
                  {sharedRecipe.instructions.length===0
                    ? <div style={{ fontSize:12, color:"#aaa" }}>No instructions saved.</div>
                    : <ol style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:9 }}>{sharedRecipe.instructions.map((step,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</li>)}</ol>}
                </div>
                {sharedRecipe.notes && (
                  <div style={{ marginTop:18, background:"#fffbf0", borderRadius:10, padding:"11px 13px", borderLeft:"3px solid #ffd200" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                    <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{sharedRecipe.notes}</div>
                  </div>
                )}
                {/* Save to my collection button */}
                {currentUser && (
                  <button onClick={() => saveSharedRecipe(sharedRecipe)}
                    style={{ marginTop:20, width:"100%", padding:14, borderRadius:12, border:"none", background:"#ff492c", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                    Save to My Recipes
                  </button>
                )}
                <button onClick={() => { window.history.replaceState({}, "", window.location.pathname); setSharedRecipe(null); setView(views.HOME); }}
                  style={{ marginTop:8, width:"100%", padding:12, borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", color:"#888", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Go to App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main app (hidden when viewing shared recipe) */}
      {view !== views.SHARED && (
        <>
          {/* Header */}
          <div style={{ background:"#062846", padding:"0 16px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.18)" }}>
            <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:52 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>
                mise <span style={{color:"#ff492c"}}>en place</span>
              </div>
              <nav style={{ display:"flex", gap:1, alignItems:"center" }}>
                {[{label:"Recipes",v:views.HOME},{label:"Favs",v:views.FAVORITES},{label:"+ Add",v:views.ADD},{label:"📋 Log",v:views.LOG}].map(n => (
                  <button key={n.v} onClick={() => setView(n.v)} style={navBtn(view===n.v)}>{n.label}</button>
                ))}
                {currentUser && (
                  <div onClick={() => { setNameInput(currentUser); setShowUserModal(true); }}
                    style={{ marginLeft:8, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
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
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search recipes or tags…"
                    style={{ flex:1, padding:"10px 14px", borderRadius:12, border:"1.5px solid #e5e5e5", fontSize:13, background:"#fff", outline:"none" }} />
                  <button onClick={() => setListView(!listView)}
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:listView?"#062846":"#fff", color:listView?"#fff":"#888", cursor:"pointer", fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}
                    title={listView ? "Grid view" : "List view"}>
                    {listView ? "≡" : "▦"}
                  </button>
                  <button onClick={exportRecipesToDoc} title="Export recipes to Word doc"
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:"#fff", color:"#888", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                    Export
                  </button>
                </div>
                {/* Member filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
                  {["all", ...allMembers].map(m => (
                    <button key={m} onClick={() => setFilterUser(m)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterUser===m?(m==="all"?"#062846":getMemberColor(m)):"#f0f0f0",
                        color:filterUser===m?"#fff":"#888", transition:"all 0.15s", display:"flex", alignItems:"center", gap:5 }}>
                      {m==="all" ? "All recipes" : <><Avatar name={m} size={16}/>{m}</>}
                    </button>
                  ))}
                </div>
                {/* Cuisine filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Cuisine:</span>
                  {["all", ...allCuisines].map(c => (
                    <button key={c} onClick={() => setFilterCuisine(c)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterCuisine===c?"#5938a2":"#f0f0f0",
                        color:filterCuisine===c?"#fff":"#888", transition:"all 0.15s" }}>
                      {c==="all" ? "All" : c}
                    </button>
                  ))}
                </div>
                {/* Protein filter */}
                <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Protein:</span>
                  {["all", ...allProteins].map(p => (
                    <button key={p} onClick={() => setFilterProtein(p)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterProtein===p?"#23cca2":"#f0f0f0",
                        color:filterProtein===p?"#fff":"#888", transition:"all 0.15s" }}>
                      {p==="all" ? "All" : p}
                    </button>
                  ))}
                </div>
                {/* Recipe status filter */}
                <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Recipe:</span>
                  {[{k:"all",label:"All"},{k:"has",label:"Has recipe"},{k:"needs",label:"Needs recipe"}].map(({k,label}) => (
                    <button key={k} onClick={() => setFilterRecipeStatus(k)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterRecipeStatus===k?(k==="has"?"#23cca2":k==="needs"?"#ff492c":"#062846"):"#f0f0f0",
                        color:filterRecipeStatus===k?"#fff":"#888", transition:"all 0.15s" }}>
                      {label}
                    </button>
                  ))}
                </div>
                {filtered.length===0 ? (
                  <div style={{ textAlign:"center", padding:"60px 0", color:"#aaa" }}>
                    <div style={{ fontSize:40 }}>🍳</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#ccc", marginTop:10 }}>No recipes yet</div>
                    <div style={{ marginTop:6, fontSize:12 }}>Search the web or paste a URL to get started</div>
                  </div>
                ) : listView ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {filtered.map(r => {
                const hasInstructions = r.instructions && r.instructions.length > 0;
                return (
                <div key={r.id} onClick={() => { setSelected(r); setView(views.DETAIL); }}
                  style={{ background:"#fff", borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center",
                    boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"transform 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateX(3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform=""}>
                  <div style={{ flex:1, display:"flex", alignItems:"center", gap:10 }}>
                    <span title={hasInstructions ? "Has recipe" : "Needs recipe"} style={{ width:8, height:8, borderRadius:"50%", background:hasInstructions?"#23cca2":"#ddd", flexShrink:0 }}/>
                    <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif", minWidth:180 }}>{r.title}</div>
                    {r.cuisine && <span style={{ fontSize:10, color:"#fff", background:"#5938a2", borderRadius:12, padding:"3px 8px", fontWeight:600, flexShrink:0 }}>{r.cuisine}</span>}
                    {r.tags?.some(t => proteinKeywords.some(p => t === p || t.includes(p))) && (
                      <span style={{ fontSize:10, color:"#fff", background:"#23cca2", borderRadius:12, padding:"3px 8px", fontWeight:600, flexShrink:0 }}>
                        {r.tags.find(t => proteinKeywords.some(p => t === p || t.includes(p)))}
                      </span>
                    )}
                    {r.url && <a href={r.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize:10, color:"#5938a2", textDecoration:"none", fontWeight:600, flexShrink:0 }}>source</a>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                    <StarRating value={r.rating||0} />
                    <span onClick={e => { e.stopPropagation(); toggleFav(r.id); }}
                      style={{ fontSize:16, cursor:"pointer", color:r.favorite?"#ff492c":"#ccc", transition:"color 0.15s" }}>&#9829;</span>
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
                    style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:listView?"#062846":"#fff", color:listView?"#fff":"#888", cursor:"pointer", fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}
                    title={listView ? "Grid view" : "List view"}>
                    {listView ? "≡" : "▦"}
                  </button>
                </div>
                {/* Cuisine filter */}
                <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Cuisine:</span>
                  {["all", ...allCuisines].map(c => (
                    <button key={c} onClick={() => setFilterCuisine(c)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterCuisine===c?"#5938a2":"#f0f0f0",
                        color:filterCuisine===c?"#fff":"#888", transition:"all 0.15s" }}>
                      {c==="all" ? "All" : c}
                    </button>
                  ))}
                </div>
                {/* Protein filter */}
                <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:60 }}>Protein:</span>
                  {["all", ...allProteins].map(p => (
                    <button key={p} onClick={() => setFilterProtein(p)}
                      style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                        background:filterProtein===p?"#23cca2":"#f0f0f0",
                        color:filterProtein===p?"#fff":"#888", transition:"all 0.15s" }}>
                      {p==="all" ? "All" : p}
                    </button>
                  ))}
                </div>
                {favs.length===0
                  ? <div style={{ textAlign:"center", padding:"60px 0", color:"#bbb", fontSize:13 }}>Heart a recipe to save it here</div>
                  : listView ? (
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {favs.map(r => (
                        <div key={r.id} onClick={() => { setSelected(r); setView(views.DETAIL); }}
                          style={{ background:"#fff", borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center",
                            boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"transform 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.transform="translateX(3px)"}
                          onMouseLeave={e => e.currentTarget.style.transform=""}>
                          <div style={{ flex:1, display:"flex", alignItems:"center", gap:12 }}>
                            <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif", minWidth:200 }}>{r.title}</div>
                            {r.cuisine && <span style={{ fontSize:10, color:"#fff", background:"#5938a2", borderRadius:12, padding:"3px 8px", fontWeight:600, flexShrink:0 }}>{r.cuisine}</span>}
                            {r.tags?.some(t => proteinKeywords.some(p => t === p || t.includes(p))) && (
                              <span style={{ fontSize:10, color:"#fff", background:"#23cca2", borderRadius:12, padding:"3px 8px", fontWeight:600, flexShrink:0 }}>
                                {r.tags.find(t => proteinKeywords.some(p => t === p || t.includes(p)))}
                              </span>
                            )}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                            <StarRating value={r.rating||0} />
                            <span onClick={e => { e.stopPropagation(); toggleFav(r.id); }}
                              style={{ fontSize:16, cursor:"pointer", color:r.favorite?"#ff492c":"#ccc", transition:"color 0.15s" }}>♥</span>
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
                <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                  <button onClick={() => { setAddTab("url"); setUrlError(""); }} style={tabBtn(addTab==="url")}>🔗 Paste URL</button>
                  <button onClick={() => setAddTab("manual")} style={tabBtn(addTab==="manual")}>✏️ Type It In</button>
                </div>



                {addTab==="url" && (
                  <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                    <input value={url} onChange={e=>{setUrl(e.target.value);setUrlError("");}} onKeyDown={e=>e.key==="Enter"&&fetchFromUrl()}
                      placeholder="https://..." style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", marginBottom:12 }} />
                    {urlError && <div style={{ color:"#ff492c", fontSize:12, marginBottom:10 }}>{urlError}</div>}
                    {urlLoading ? <Spinner label="Extracting recipe…" /> : (
                      <button onClick={fetchFromUrl} disabled={!url.trim()}
                        style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:url.trim()?"#ff492c":"#eee", color:url.trim()?"#fff":"#bbb", fontWeight:700, fontSize:14, cursor:url.trim()?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif" }}>
                        Extract Recipe
                      </button>
                    )}
                  </div>
                )}

                {addTab==="manual" && (
                  <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                    <div style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>TITLE *</label>
                      <input value={manualTitle} onChange={e=>setManualTitle(e.target.value)} placeholder="e.g. Chicken Tikka Masala"
                        style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <div style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>SOURCE URL (optional)</label>
                      <input value={manualUrl} onChange={e=>setManualUrl(e.target.value)} placeholder="https://..."
                        style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <div style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>INGREDIENTS (one per line)</label>
                      <textarea value={manualIngredients} onChange={e=>setManualIngredients(e.target.value)} placeholder={"1 lb chicken thighs\n2 tbsp olive oil\n3 cloves garlic"}
                        rows={6} style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <div style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>INSTRUCTIONS (one step per line)</label>
                      <textarea value={manualInstructions} onChange={e=>setManualInstructions(e.target.value)} placeholder={"Preheat oven to 400F.\nSeason chicken.\nBake 25 min."}
                        rows={6} style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                      <div style={{ flex:1 }}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>CUISINE</label>
                        <input value={manualCuisine} onChange={e=>setManualCuisine(e.target.value)} placeholder="e.g. Asian, Italian"
                          style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
                      </div>
                      <div style={{ flex:1 }}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>DIFFICULTY</label>
                        <select value={manualEase} onChange={e=>setManualEase(e.target.value)}
                          style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif", background:"#fff" }}>
                          <option value="">Select...</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>TAGS (comma-separated)</label>
                      <input value={manualTags} onChange={e=>setManualTags(e.target.value)} placeholder="e.g. Chicken, Instant Pot, Weeknight"
                        style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <div style={{ marginBottom:18 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:0.5, display:"block", marginBottom:5 }}>NOTES (optional)</label>
                      <textarea value={manualNotes} onChange={e=>setManualNotes(e.target.value)} placeholder="Any tips, variations, or reminders…"
                        rows={3} style={{ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif" }} />
                    </div>
                    <button onClick={async () => {
                        if (!manualTitle.trim()) return;
                        setManualSaving(true);
                        try {
                          const parsed = { title: manualTitle.trim(), ingredients: manualIngredients.split("\n").map(s=>s.trim()).filter(Boolean), instructions: manualInstructions.split("\n").map(s=>s.trim()).filter(Boolean), tags: manualTags.split(",").map(s=>s.trim()).filter(Boolean), cuisine: manualCuisine.trim(), ease: manualEase };
                          const newRecipe = await addRecipeObj(parsed, manualUrl.trim());
                          if (manualNotes.trim() && newRecipe) await updateRecipe(newRecipe.id, { notes: manualNotes.trim() });
                          setManualTitle(""); setManualIngredients(""); setManualInstructions(""); setManualTags(""); setManualCuisine(""); setManualEase(""); setManualNotes(""); setManualUrl("");
                          setSelected(newRecipe); setView(views.DETAIL);
                        } catch(e) { console.error("Manual save error:", e); }
                        finally { setManualSaving(false); }
                      }}
                      disabled={!manualTitle.trim() || manualSaving}
                      style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:manualTitle.trim()?"#ff492c":"#eee", color:manualTitle.trim()?"#fff":"#bbb", fontWeight:700, fontSize:14, cursor:manualTitle.trim()&&!manualSaving?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif" }}>
                      {manualSaving ? "Saving…" : "Save Recipe"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── COOK LOG ── */}
            {view===views.LOG && (
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:6 }}>Cook Log</div>
                <div style={{ fontSize:12, color:"#888", marginBottom:18 }}>Every time someone hits "I made this" it gets logged here.</div>
                {cookEntries.length===0
                  ? <div style={{ background:"#fff", borderRadius:14, padding:28, textAlign:"center", color:"#bbb", fontSize:13 }}>No cooks logged yet. Open a recipe and hit "I made this".</div>
                  : <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {cookEntries.map((entry, i) => {
                        const d = new Date(entry.date);
                        const today = new Date(); today.setHours(0,0,0,0);
                        const entryDay = new Date(d); entryDay.setHours(0,0,0,0);
                        const diffDays = Math.floor((today - entryDay) / 86400000);
                        const label = diffDays===0 ? "Today" : diffDays===1 ? "Yesterday" : `${diffDays} days ago`;
                        return (
                          <div key={i} onClick={() => { setSelected(entry.recipe); setView(views.DETAIL); }}
                            style={{ background:"#fff", borderRadius:12, padding:"12px 15px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <Avatar name={entry.recipe.addedBy||"?"} size={32} />
                              <div>
                                <div style={{ fontWeight:700, color:"#062846", fontSize:13 }}>{entry.recipe.title}</div>
                                <div style={{ fontSize:11, color:"#aaa", marginTop:1 }}>Added by {entry.recipe.addedBy||"Unknown"}</div>
                              </div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:12, fontWeight:600, color:"#5938a2" }}>{label}</div>
                              <div style={{ fontSize:10, color:"#bbb" }}>{d.toLocaleDateString()}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                }
              </div>
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
                      <span onClick={() => toggleFav(selected.id)} style={{ fontSize:22, cursor:"pointer", color:selected.favorite?"#ff492c":"#ddd", flexShrink:0, transition:"color 0.15s" }}>♥</span>
                    </div>

                    {/* Added by */}
                    {selected.addedBy && (
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:10 }}>
                        <Avatar name={selected.addedBy} size={22} />
                        <span style={{ fontSize:12, color:"#888" }}>Added by <strong>{selected.addedBy}</strong></span>
                      </div>
                    )}

                    <div style={{ display:"flex", gap:14, marginTop:10, fontSize:12, color:"#888" }}>
                      {selected.time && <span>⏱ {selected.time}</span>}
                      {selected.servings && <span>👤 {selected.servings}</span>}
                    </div>
                    <div style={{ marginTop:10 }}><StarRating value={selected.rating||0} onChange={r => setRating(selected.id,r)} /></div>

                    {/* Action buttons row */}
                    <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                      <button onClick={() => logCook(selected.id)}
                        style={{ padding:"10px 20px", borderRadius:10, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                        ✓ I made this
                      </button>
                      <button onClick={() => shareRecipe(selected.id)} disabled={shareLoading}
                        style={{ padding:"10px 16px", borderRadius:10, border:"1.5px solid #5938a2", background:shareCopied?"#5938a2":"#fff", color:shareCopied?"#fff":"#5938a2", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                        {shareLoading ? "..." : shareCopied ? "Link copied!" : selected.isShared ? "Copy share link" : "Share recipe"}
                      </button>
                      {selected.isShared && (
                        <button onClick={() => unshareRecipe(selected.id)}
                          style={{ padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", background:"#fff", color:"#888", fontWeight:600, fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                          Unshare
                        </button>
                      )}
                    </div>

                    {/* Cook history */}
                    {selected.cookLog?.length > 0 && (
                      <div style={{ marginTop:14, background:"#f7f6f3", borderRadius:10, padding:"10px 14px" }}>
                        <div style={{ fontSize:11, fontWeight:700, color:"#aaa", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Cook history</div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {[...selected.cookLog].reverse().map((d, i) => (
                            <span key={i} style={{ background:"#fff", borderRadius:20, padding:"2px 9px", fontSize:11, color:"#5938a2", fontWeight:600, border:"1px solid #e5e5e5" }}>
                              {new Date(d).toLocaleDateString()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selected.tags?.length > 0 && (
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:14 }}>
                        {selected.tags.map(t => <span key={t} style={{ background:"#f0f4ff", color:"#5938a2", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{t}</span>)}
                      </div>
                    )}

                    {/* Edit / View toggle button */}
                    <div style={{ marginTop:16, display:"flex", gap:8, alignItems:"center" }}>
                      {!editMode ? (
                        <button onClick={() => startEditing(selected)}
                          style={{ padding:"6px 14px", borderRadius:8, border:"1.5px solid #5938a2", background:"none", color:"#5938a2", fontWeight:700, fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                          Edit recipe
                        </button>
                      ) : (
                        <>
                          <button onClick={saveEdits}
                            style={{ padding:"6px 14px", borderRadius:8, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                            Save changes
                          </button>
                          <button onClick={() => setEditMode(false)}
                            style={{ padding:"6px 14px", borderRadius:8, border:"1.5px solid #ccc", background:"none", color:"#888", fontWeight:600, fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                            Cancel
                          </button>
                        </>
                      )}
                    </div>

                    {/* Source URL */}
                    {editMode ? (
                      <div style={{ marginTop:16 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#aaa", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Source URL</div>
                        <div style={{ display:"flex", gap:6 }}>
                          <input value={editUrl} onChange={e => setEditUrl(e.target.value)} placeholder="Paste recipe URL..."
                            style={{ flex:1, padding:"8px 10px", borderRadius:8, border:"1.5px solid #ddd", fontSize:12, fontFamily:"'DM Sans',sans-serif" }} />
                          <button onClick={fetchAndFillFromUrl} disabled={fetchingFromUrl || !editUrl.trim()}
                            style={{ padding:"8px 12px", borderRadius:8, border:"none", background:"#5938a2", color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", opacity:(!editUrl.trim()||fetchingFromUrl)?0.5:1 }}>
                            {fetchingFromUrl ? "Fetching..." : "Fetch"}
                          </button>
                        </div>
                      </div>
                    ) : selected.url ? (
                      <div style={{ marginTop:16 }}>
                        <a href={selected.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:"#5938a2", textDecoration:"none", fontWeight:600 }}>View original source \u2197</a>
                      </div>
                    ) : null}

                    {/* Ingredients */}
                    <div style={{ marginTop:22 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Ingredients</div>
                      {editMode ? (
                        <textarea value={editIngredients} onChange={e => setEditIngredients(e.target.value)}
                          placeholder="One ingredient per line..."
                          style={{ width:"100%", minHeight:120, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      ) : selected.ingredients.length===0
                        ? <div style={{ fontSize:12, color:"#aaa" }}>No ingredients saved.</div>
                        : <ul style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:5 }}>{selected.ingredients.map((ing,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{ing}</li>)}</ul>}
                    </div>

                    {/* Instructions */}
                    <div style={{ marginTop:20 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Instructions</div>
                      {editMode ? (
                        <textarea value={editInstructions} onChange={e => setEditInstructions(e.target.value)}
                          placeholder="One step per line..."
                          style={{ width:"100%", minHeight:150, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      ) : selected.instructions.length===0
                        ? <div style={{ fontSize:12, color:"#aaa" }}>No instructions saved.</div>
                        : <ol style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:9 }}>{selected.instructions.map((step,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</li>)}</ol>}
                    </div>

                    {/* Notes */}
                    {editMode ? (
                      <div style={{ marginTop:18 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                        <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)}
                          placeholder="Add notes..."
                          style={{ width:"100%", minHeight:60, padding:"10px 12px", borderRadius:10, border:"1.5px solid #ddd", fontSize:12, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, resize:"vertical", boxSizing:"border-box" }} />
                      </div>
                    ) : selected.notes ? (
                      <div style={{ marginTop:18, background:"#fffbf0", borderRadius:10, padding:"11px 13px", borderLeft:"3px solid #ffd200" }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                        <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{selected.notes}</div>
                      </div>
                    ) : null}

                    <div style={{ marginTop:24, paddingTop:16, borderTop:"1px solid #f0f0f0", display:"flex", gap:10, flexWrap:"wrap" }}>
                      <button onClick={() => deleteRecipe(selected.id)}
                        style={{ background:"none", border:"1.5px solid #ff492c", color:"#ff492c", borderRadius:9, padding:"7px 14px", cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
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
