import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "mise_recipes_v2";
const USER_KEY = "mise_user_v1";
const SEED_RECIPES = [{"id":1000,"url":"","title":"Basil Pork Stirfry (Pa Kra Pow)","ingredients":["basil","pork","fish sauce","oyster sauce","thai chili","garlic","oil"],"instructions":[],"tags":["Asian","Stir Fry","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1001,"url":"","title":"40 Clove Chicken","ingredients":["chicken","garlic (40 cloves)","white wine","thyme","olive oil","butter"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1002,"url":"","title":"African Peanut Stew","ingredients":["sweet potato","peanut butter","tomatoes","onion","garlic","ginger","broth","chicken"],"instructions":[],"tags":["African","Stew","Vegetarian-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"African","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1003,"url":"","title":"Asian Salmon","ingredients":["salmon","soy sauce","ginger","garlic","sesame oil","green onion"],"instructions":[],"tags":["Asian","Salmon","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1004,"url":"","title":"Asparagus Stuffed Chicken","ingredients":["chicken breast","asparagus","garlic","lemon","olive oil","salt","pepper"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1005,"url":"","title":"Baked Ziti","ingredients":["ziti pasta","ground beef","marinara sauce","ricotta","mozzarella","parmesan"],"instructions":[],"tags":["Italian","Pasta","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1006,"url":"","title":"Balsamic Pork Loin","ingredients":["pork loin","olive oil (1 cup)","balsamic vinegar (1 cup)"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Season meat & marinate in 1c olive oil, 1c balsamic. Bake 350\u00b0 for 1hr (145\u00b0 internal temp). Rest covered 10 min.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1007,"url":"","title":"Banana Bread Oatmeal (Acorn Squash)","ingredients":["acorn squash","banana","oats","cinnamon","maple syrup"],"instructions":[],"tags":["Breakfast","AIP","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. AIP-friendly.","cuisine":"Breakfast","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1008,"url":"","title":"Banh Mi Pickled Veggies","ingredients":["daikon","carrots","rice vinegar","sugar","salt","water"],"instructions":[],"tags":["Asian","Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1009,"url":"","title":"Banh Mi Pulled Pork","ingredients":["pork shoulder","fish sauce","soy sauce","garlic","ginger","lemongrass","baguette","pickled veggies"],"instructions":[],"tags":["Asian","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1010,"url":"","title":"BBQ Pulled Pork","ingredients":["pork shoulder","bbq sauce","brown sugar","garlic powder","onion powder","smoked paprika"],"instructions":[],"tags":["American","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1011,"url":"","title":"Beef Pho","ingredients":["beef bones","brisket","star anise","cinnamon","cloves","fish sauce","rice noodles","bean sprouts","basil","lime"],"instructions":[],"tags":["Asian","Beef","Soup","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1012,"url":"","title":"Beef Stew","ingredients":["beef chuck","potatoes","carrots","celery","onion","beef broth","tomato paste","thyme","rosemary"],"instructions":[],"tags":["American","Beef","Dutch Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Braise for 3+ hours in dutch oven.","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1013,"url":"","title":"Beef with Broccoli","ingredients":["beef chuck roast","broccoli","soy sauce","oyster sauce","sesame oil","garlic","ginger","cornstarch"],"instructions":[],"tags":["Asian","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1014,"url":"","title":"Black Pepper Beef & Noodles","ingredients":["beef","noodles","black pepper sauce","soy sauce","oyster sauce","garlic","ginger","onion"],"instructions":[],"tags":["Asian","Beef","Noodles"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Black pepper sauce.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1015,"url":"","title":"Braised Oxtail","ingredients":["oxtail","soy sauce","oyster sauce","star anise","garlic","ginger","rice wine","sugar"],"instructions":[],"tags":["Asian","Oxtail","Braise"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Sauce is good \u2014 cook in Instant Pot.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1016,"url":"","title":"Breakfast Sandwiches","ingredients":["eggs","english muffin","cheese","bacon or sausage","butter"],"instructions":[],"tags":["American","Breakfast","Eggs"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1017,"url":"","title":"Buffalo Chicken","ingredients":["chicken","buffalo sauce","butter","garlic powder","celery","blue cheese or ranch"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1018,"url":"","title":"Burgers","ingredients":["ground beef (80/20)","burger buns","lettuce","tomato","onion","cheese","condiments"],"instructions":[],"tags":["American","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1019,"url":"","title":"Butter Chicken","ingredients":["chicken","butter","cream","tomatoes","onion","garlic","ginger","garam masala","cumin","coriander","turmeric"],"instructions":[],"tags":["Indian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Michelle's recipe \u2014 2x recommended.","cuisine":"Indian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1020,"url":"","title":"Carbonara","ingredients":["spaghetti","guanciale or bacon","eggs","pecorino romano","parmesan","black pepper"],"instructions":[],"tags":["Italian","Pasta","Bacon"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1021,"url":"","title":"Carnitas","ingredients":["pork shoulder","orange juice","lime juice","garlic","cumin","oregano","chili powder"],"instructions":[],"tags":["American","Pork","Instant Pot","Mexican-inspired"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. Try more seasoning; keep juices to thicken and pour over.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1022,"url":"","title":"Cashew Chicken","ingredients":["chicken","cashews","soy sauce","hoisin","sesame oil","garlic","ginger","chili oil"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Sweet sauce \u2014 add chili oil.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1023,"url":"","title":"Char Siu","ingredients":["pork shoulder","char siu sauce","honey","soy sauce","hoisin","five spice","red food coloring (optional)"],"instructions":[],"tags":["Asian","Pork","Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Oven-roasted.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1024,"url":"","title":"Char Siu Pork Tenderloin","ingredients":["pork tenderloin","char siu sauce","honey","soy sauce","hoisin","five spice"],"instructions":[],"tags":["Asian","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1025,"url":"","title":"Cheesy Pasta with Veggies","ingredients":["pasta","cheese","mixed vegetables","butter","garlic","broth"],"instructions":[],"tags":["American","Pasta","Instant Pot","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"No chopping / minimal prep. Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1026,"url":"","title":"Chicken Lettuce Wraps","ingredients":["ground chicken","water chestnuts","hoisin sauce","soy sauce","ginger","garlic","green onion","butter lettuce"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1027,"url":"","title":"Chicken Parm","ingredients":["chicken breast","breadcrumbs","parmesan","mozzarella","marinara sauce","eggs","flour"],"instructions":[],"tags":["Italian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1028,"url":"","title":"Chicken Pot Pie","ingredients":["chicken","carrots","peas","celery","onion","cream","flour","butter","pie crust"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1029,"url":"","title":"Chicken Salad","ingredients":["cooked chicken","mayo","celery","onion","dijon mustard","lemon juice","salt","pepper"],"instructions":[],"tags":["American","Chicken","Cold"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1030,"url":"","title":"Chicken Teriyaki","ingredients":["chicken thighs","soy sauce","mirin","sake","sugar","garlic","ginger"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1031,"url":"","title":"Chicken Tikka Masala","ingredients":["chicken","yogurt","tomatoes","cream","garlic","ginger","garam masala","cumin","turmeric","paprika"],"instructions":[],"tags":["Indian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Indian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1032,"url":"","title":"Chinese Broccoli","ingredients":["chinese broccoli (gai lan)","oyster sauce","garlic","sesame oil"],"instructions":[],"tags":["Asian","Vegetable","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1033,"url":"","title":"Chinese Broccoli with Beef","ingredients":["beef","chinese broccoli","oyster sauce","soy sauce","garlic","ginger","cornstarch"],"instructions":[],"tags":["Asian","Beef","Vegetable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Make with rice.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1034,"url":"","title":"Coconut Milk Salmon Leek Soup","ingredients":["salmon","leek","coconut milk","daikon","enoki mushrooms","broth","ginger","lemongrass"],"instructions":[],"tags":["Asian","Seafood","Soup","AIP"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Added daikon and enoki.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1035,"url":"","title":"Dan Dan Noodles","ingredients":["ground pork","noodles","tahini or sesame paste","chili oil","soy sauce","garlic","ginger","sichuan peppercorn","green onion"],"instructions":[],"tags":["Asian","Noodles","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1036,"url":"","title":"Detroit Pizza","ingredients":["pizza dough","brick cheese","pepperoni","tomato sauce","garlic"],"instructions":[],"tags":["American","Pizza"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1037,"url":"","title":"Egg Roll in a Bowl","ingredients":["ground pork or beef","cabbage","carrots","soy sauce","sesame oil","garlic","ginger","green onion"],"instructions":[],"tags":["Asian","AIP-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"AIP-friendly.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1038,"url":"","title":"Eggplant Parm","ingredients":["eggplant","breadcrumbs","marinara","mozzarella","parmesan","eggs","flour"],"instructions":[],"tags":["Italian","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1039,"url":"","title":"Fish Sauce Dipping Sauce","ingredients":["fish sauce (3/4 cup)","water (3/4 cup)","sugar (1/4 cup)","white vinegar (1/3 cup + 1/4 cup)"],"instructions":[],"tags":["Asian","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"3/4c fish sauce, 3/4c water, 1/4c sugar, 1/3c + 1/4c white vinegar.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1040,"url":"","title":"Fried Rice","ingredients":["rice","eggs","soy sauce","sesame oil","green onion","garlic","frozen peas and carrots","protein of choice"],"instructions":[],"tags":["Asian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1041,"url":"","title":"Garlic Bread","ingredients":["baguette or italian bread","butter","garlic","parsley","parmesan"],"instructions":[],"tags":["Italian","Side","Bread"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1042,"url":"","title":"Gochujang Sauce","ingredients":["gochujang","soy sauce","sesame oil","garlic","sugar","rice vinegar"],"instructions":[],"tags":["Asian","Sauce","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1043,"url":"","title":"Green Curry","ingredients":["chicken","green curry paste","coconut milk","bamboo shoots","thai basil","fish sauce","sugar","lime leaves"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1044,"url":"","title":"Grilled Cheese","ingredients":["bread","butter","brie or cheddar","crispy bacon","caramelized onions"],"instructions":[],"tags":["American","Sandwich"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Variations: brie + crispy bacon + caramelized onions; buffalo chicken.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1045,"url":"","title":"Ground Beef Carrots with Curry Rice","ingredients":["ground beef","carrots","zataar spice","curry spiced rice","sweet peppers","tahini","yogurt","lemon","garlic"],"instructions":[],"tags":["Asian","Beef","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Zataar ground beef & carrots with curry spiced rice, sweet peppers, tahini/yogurt/lemon/garlic sauce.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1046,"url":"","title":"Halal Chicken Over Rice","ingredients":["chicken thighs","yogurt","lemon","garlic","turmeric","cumin","coriander","paprika","rice","white sauce","hot sauce"],"instructions":[],"tags":["Mediterranean","Chicken","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Marinate 1\u20134 hours.","cuisine":"Mediterranean","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1047,"url":"","title":"Hot Sandwiches","ingredients":["hoagie roll","deli meat","cheese","peppers","onions","oil and vinegar"],"instructions":[],"tags":["American","Sandwich"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1048,"url":"","title":"Jamaican Oxtail","ingredients":["oxtail","jerk seasoning","allspice","thyme","scotch bonnet pepper","onion","garlic","butter beans"],"instructions":[],"tags":["Caribbean","Oxtail","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Caribbean","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1049,"url":"","title":"Lamb Loin Chops","ingredients":["lamb loin chops","garlic","rosemary","olive oil","salt","pepper"],"instructions":[],"tags":["American","Lamb","Pan"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pan-seared.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1050,"url":"","title":"Lemon Chicken","ingredients":["chicken","lemon juice","lemon zest","garlic","olive oil","capers","white wine","butter"],"instructions":[],"tags":["Italian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1051,"url":"","title":"Mashed Potatoes","ingredients":["russet potatoes","butter","cream","garlic","salt","pepper"],"instructions":[],"tags":["American","Side","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1052,"url":"","title":"Meatballs","ingredients":["ground beef","ground pork","eggs","breadcrumbs","parmesan","garlic","parsley","salt","pepper"],"instructions":[],"tags":["Italian","Beef","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1053,"url":"","title":"Miso Cod","ingredients":["black cod","white miso","mirin","sake","sugar"],"instructions":[],"tags":["Asian","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1054,"url":"","title":"Mom's Gravy","ingredients":["pork neckbones","italian sweet sausage","ground beef (80/20)","eggs","breadcrumbs","onion powder","garlic powder","parmesan","olive oil","garlic","tuttoroso crushed tomatoes (3-4 cans)","tomato paste (1-2 cans kirkland)","basil","sugar"],"instructions":[],"tags":["Italian","Pork","Beef","Sauce"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Brown meats in pan. Saut\u00e9 olive oil + garlic 2 min. Add 3-4 cans crushed tomatoes + 1-2 cans paste. When paste melts add meats, cook 2hr+. Add basil, water to thin, sugar to cut acidity.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1055,"url":"","title":"Mushroom Gravy","ingredients":["mushrooms","butter","onion","garlic","beef broth","thyme","flour","cream"],"instructions":[],"tags":["American","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add meat of choice; serve over pasta or mashed potatoes.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1056,"url":"","title":"Mushroom Jasmine Rice Risotto","ingredients":["jasmine rice","mushrooms","parmesan","onion","garlic","white wine","butter","broth"],"instructions":[],"tags":["Italian","Vegetarian","Rice"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1057,"url":"","title":"Mushroom Risotto","ingredients":["arborio rice","mushrooms","parmesan","onion","garlic","white wine","butter","broth","pancetta or bacon"],"instructions":[],"tags":["American","Instant Pot","Vegetarian-adaptable"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot. Add pancetta/bacon in the beginning. Good for groups.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1058,"url":"","title":"Omelette Souffle","ingredients":["eggs","butter","salt","cream of tartar"],"instructions":[],"tags":["French","Breakfast","Eggs"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Very fluffy/airy.","cuisine":"French","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1059,"url":"","title":"Pan Fried Turnip Cake","ingredients":["turnip (daikon)","rice flour","dried shrimp","chinese sausage","soy sauce","sesame oil"],"instructions":[],"tags":["Asian","Dim Sum"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1060,"url":"","title":"Pan Seared Pork Chops","ingredients":["pork chops","garlic","butter","thyme","salt","pepper"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1061,"url":"","title":"Peanut Butter Hoisin Sauce","ingredients":["peanut butter","hoisin sauce","soy sauce","garlic","lime juice","sriracha","water"],"instructions":[],"tags":["Asian","Sauce","Side"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1062,"url":"","title":"Pesto","ingredients":["fresh basil (1 TJ package)","garlic (4 cloves, add to taste)","pine nuts","parmesan","olive oil","salt","pepper"],"instructions":[],"tags":["Italian","Sauce","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add garlic one clove at a time \u2014 easy to overdo. Don't over-salt.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1063,"url":"","title":"Pesto Chicken Pasta","ingredients":["chicken","pasta","pesto","parmesan","cherry tomatoes","olive oil"],"instructions":[],"tags":["Italian","Chicken","Pasta"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1064,"url":"","title":"Pesto Pasta","ingredients":["pasta","pesto","parmesan","olive oil","salt","pepper"],"instructions":[],"tags":["American","Pasta","Vegetarian"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Can make pesto ahead of time.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1065,"url":"","title":"Pickled Jalape\u00f1os","ingredients":["jalape\u00f1os","white vinegar","garlic","salt","sugar"],"instructions":[],"tags":["Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1066,"url":"","title":"Pickled Red Onion","ingredients":["red onion","apple cider vinegar","sugar","salt"],"instructions":[],"tags":["Side","Condiment"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1067,"url":"","title":"Pineapple Pork Loin","ingredients":["pork loin","pineapple","soy sauce"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pineapple + soy sauce on pork, bake 350\u00b0 60 min.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1068,"url":"","title":"Pot Roast","ingredients":["beef chuck roast","carrots","potatoes","onion","garlic","beef broth","rosemary","thyme"],"instructions":[],"tags":["American","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1069,"url":"","title":"Rachael Ray Soup","ingredients":["italian sausage","white beans","kale","onion","garlic","chicken broth","parmesan"],"instructions":[],"tags":["Italian","Pork","Soup"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1070,"url":"","title":"Ribs","ingredients":["pork ribs","dry rub","bbq sauce","apple juice"],"instructions":[],"tags":["American","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Season & remove membrane. 25 min high pressure in apple juice. Then broil with sauce.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1071,"url":"","title":"Rice Cakes with Onions & Peppers","ingredients":["korean rice cakes (tteok)","beef or pork","onion","peppers","gochujang","soy sauce","sesame oil"],"instructions":[],"tags":["Asian","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1072,"url":"","title":"Roasted Sweet Plantains","ingredients":["ripe plantains","oil","salt"],"instructions":[],"tags":["Side","Caribbean-inspired"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Bake 20 min covered at 320\u00b0, then 15 min uncovered at 420\u00b0.","cuisine":"Side","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1073,"url":"","title":"Roasted Whole Chicken","ingredients":["whole chicken","butter","garlic","lemon","thyme","rosemary","salt","pepper"],"instructions":[],"tags":["American","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1074,"url":"","title":"Roseanne's Pasta Sauce","ingredients":["garlic","olive oil","crushed tomatoes (3 cans)","tomato paste (1 can)","basil","oregano","sugar","meatballs","pork neck bones"],"instructions":[],"tags":["Italian","Sauce","Pork","Beef"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Saut\u00e9 garlic in olive oil. Add 3 cans crushed tomatoes + 1 can paste. Add basil, oregano, sugar. Simmer 1hr then add browned meatballs/pork neck bones. Simmer a few hours. Add water if too thick.","cuisine":"Italian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1075,"url":"","title":"Salsa Chicken","ingredients":["chicken","salsa","cumin","garlic powder","onion powder","chili powder"],"instructions":[],"tags":["Mexican","Chicken","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Mexican","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1076,"url":"","title":"Savory Steamed Egg","ingredients":["eggs","dashi or broth","soy sauce","sesame oil","green onion"],"instructions":[],"tags":["Asian","Egg","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Silky smooth. Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1077,"url":"","title":"Seared Salmon with Mustard Vinaigrette","ingredients":["salmon","shallot","dijon mustard","vinegar","italian seasoning","garlic"],"instructions":[],"tags":["American","Seafood","Salmon"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Pat dry salmon, cook 3\u20135 min each side. Sauce: 1 shallot, 1 tbsp dijon, 1 tbsp vinegar, 1 tbsp italian seasoning, garlic.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1078,"url":"","title":"Sesame Teriyaki Chicken","ingredients":["chicken","soy sauce","mirin","sake","sugar","sesame oil","sesame seeds"],"instructions":[],"tags":["Asian","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1079,"url":"","title":"Skillet Pork Loin Chops","ingredients":["pork loin chops","garlic","butter","herbs","salt","pepper"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1080,"url":"","title":"Smashed Cucumber Salad","ingredients":["cucumbers","garlic","soy sauce","rice vinegar","sesame oil","chili oil","sugar"],"instructions":[],"tags":["Asian","Salad","Appetizer"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1081,"url":"","title":"Steamed Eggplant with Meat","ingredients":["eggplant","ground beef or pork","garlic","soy sauce","oyster sauce","sesame oil","green onion"],"instructions":[],"tags":["Asian","Beef","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1082,"url":"","title":"Sweet and Sour Country Ribs","ingredients":["country ribs","vinegar","sugar","soy sauce","ketchup","garlic","pineapple"],"instructions":[],"tags":["Asian","Pork","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"OK, not a favorite.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1083,"url":"","title":"Taiwanese Braised Minced Pork","ingredients":["pork shoulder (minced)","soy sauce","rice wine","sugar","five spice","shallots","hard boiled eggs"],"instructions":[],"tags":["Asian","Pork","Dutch Oven"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Braise 2\u20133 hours in Dutch oven.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1084,"url":"","title":"Thai Chicken Enchiladas","ingredients":["chicken","flour tortillas","peanut sauce","coconut milk","thai basil","lime","bean sprouts","shredded cheese"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Hard","addedBy":"Amy","cookLog":[]},{"id":1085,"url":"","title":"Thai Coconut Meatball Soup","ingredients":["meatballs","coconut milk","broth","lemongrass","kaffir lime leaves","thai basil","bok choy","rice or noodles","fish sauce"],"instructions":[],"tags":["Asian","Soup","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Add kaffir lime leaves, thai basil, bok choy, rice or noodles.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1086,"url":"","title":"Tinga","ingredients":["chicken","chipotle in adobo","tomatoes","onion","garlic","oregano"],"instructions":[],"tags":["Mexican","Chicken"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Mexican","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1087,"url":"","title":"Tomato Beef Roast","ingredients":["beef","tomatoes","onion","garlic","soy sauce","oyster sauce"],"instructions":[],"tags":["Asian","Beef","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1088,"url":"","title":"Vietnamese Fish Sauce Dipping Sauce","ingredients":["fish sauce","water","sugar","lime juice","garlic","chili"],"instructions":[],"tags":["Asian","Sauce","Vietnamese"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1089,"url":"","title":"White Wine Mussels","ingredients":["mussels","white wine","butter","garlic","shallots","parsley","cream"],"instructions":[],"tags":["American","Seafood"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1090,"url":"","title":"Yellow Curry","ingredients":["chicken","yellow curry paste","coconut milk","potato","onion","fish sauce","sugar"],"instructions":[],"tags":["Asian","Chicken","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1091,"url":"","title":"Soy Sauce Chicken","ingredients":["chicken","soy sauce","dark soy sauce","sugar","garlic","ginger","star anise","rice wine"],"instructions":[],"tags":["Asian","Chicken","Instant Pot"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Instant Pot.","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1092,"url":"","title":"Braised Pork Shoulder","ingredients":["pork shoulder","chipotle peppers in adobo","onion","garlic","cumin","oregano","broth"],"instructions":[],"tags":["American","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Need more seasoning. Chipotle peppers.","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1093,"url":"","title":"Birria","ingredients":["beef chuck","guajillo chiles","ancho chiles","chipotle","tomatoes","onion","garlic","cumin","cloves","cinnamon","oregano","corn tortillas","consomme"],"instructions":[],"tags":["Mexican","Beef","Stew"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Mexican","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1094,"url":"","title":"White Chili","ingredients":["chicken","white beans","green chiles","onion","garlic","cumin","chicken broth","cream cheese","sour cream"],"instructions":[],"tags":["American","Chicken","Soup"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"American","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1095,"url":"","title":"Mapo Tofu","ingredients":["soft tofu","ground pork","doubanjiang","sichuan peppercorn","black bean sauce","garlic","ginger","broth","cornstarch"],"instructions":[],"tags":["Asian","Pork","Tofu"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1096,"url":"","title":"Cottage Cheese Pancakes","ingredients":["cottage cheese (1 cup)","oats (1 cup)","eggs (2)","baking powder (1 tsp)"],"instructions":[],"tags":["Breakfast","High Protein"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"1 cup cottage cheese, 1 cup oats, 2 eggs, 1 tsp baking powder \u2014 blend.","cuisine":"Breakfast","ease":"Easy","addedBy":"Amy","cookLog":[]},{"id":1097,"url":"","title":"Momofuku Bossam Pork Shoulder","ingredients":["pork shoulder","brown sugar","salt","miso","gochujang"],"instructions":[],"tags":["Asian","Pork","Korean"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"With miso gochujang sauce.","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1098,"url":"","title":"Pad See Ew","ingredients":["wide rice noodles","chicken or beef","chinese broccoli","egg","dark soy sauce","oyster sauce","fish sauce","garlic","sugar"],"instructions":[],"tags":["Asian","Noodles","Thai"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"","cuisine":"Asian","ease":"Medium","addedBy":"Amy","cookLog":[]},{"id":1099,"url":"","title":"Nina's Sausage & Peppers","ingredients":["italian sausage (casing removed)","red peppers","green peppers","onion","garlic","tomato sauce","oregano","basil"],"instructions":[],"tags":["Italian","Pork"],"servings":"","time":"","rating":0,"favorite":false,"dateAdded":"2024-01-01T00:00:00.000Z","notes":"Tomato sauce, oregano, basil. Chopped red peppers, green peppers, onion & garlic. Remove sausage casing.","cuisine":"Italian","ease":"Easy","addedBy":"Amy","cookLog":[]}];

const MEMBER_COLORS = {
  "Amy": "#ff492c",
  "default": "#5938a2",
};
function getMemberColor(name) {
  return MEMBER_COLORS[name] || "#23cca2";
}

const getStored = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && stored.length > 0) return stored;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_RECIPES));
    return SEED_RECIPES;
  } catch { return SEED_RECIPES; }
};

const views = { HOME:"home", DETAIL:"detail", ADD:"add", SUGGEST:"suggest", FAVORITES:"favorites", LOG:"log" };

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
        >â</span>
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
        ð½ï¸
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
            style={{ fontSize:17, cursor:"pointer", color:recipe.favorite?"#ff492c":"#ccc", flexShrink:0, transition:"color 0.15s" }}>â¥</span>
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

function Spinner({ label="Workingâ¦" }) {
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
  const [recipes, setRecipes] = useState(getStored);
  const [view, setView] = useState(views.HOME);
  const [selected, setSelected] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(USER_KEY) || "");
  const [showUserModal, setShowUserModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const [addTab, setAddTab] = useState("search");
  const [url, setUrl] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [webQuery, setWebQuery] = useState("");
  const [webResults, setWebResults] = useState(null);
  const [webLoading, setWebLoading] = useState(false);
  const [webError, setWebError] = useState("");
  const [importingId, setImportingId] = useState(null);

  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestTab, setSuggestTab] = useState("ingredients"); // "ingredients" | "overdue"

  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("all");

  // Show user modal on first load if no name set
  useEffect(() => {
    if (!currentUser) setShowUserModal(true);
  }, []);

  const persist = useCallback((updater) => {
    setRecipes(prev => {
      const next = typeof updater==="function" ? updater(prev) : updater;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  function saveUser(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCurrentUser(trimmed);
    localStorage.setItem(USER_KEY, trimmed);
    setShowUserModal(false);
  }

  function addRecipeObj(parsed, sourceUrl) {
    const recipe = {
      id: Date.now() + Math.random(),
      url: sourceUrl || "",
      title: parsed.title || "Untitled Recipe",
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
      notes: ""
    };
    persist(prev => [...prev, recipe]);
    return recipe;
  }

  function logCook(id) {
    persist(prev => prev.map(r => r.id===id ? {...r, cookLog:[...(r.cookLog||[]), new Date().toISOString()]} : r));
    setSelected(prev => prev?.id===id ? {...prev, cookLog:[...(prev.cookLog||[]), new Date().toISOString()]} : prev);
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
      addRecipeObj(parsed, url);
      setUrl(""); setView(views.HOME);
    } catch(e) { setUrlError(e.message||"Could not extract recipe."); }
    finally { setUrlLoading(false); }
  }

  async function searchWeb() {
    if (!webQuery.trim()) return;
    setWebLoading(true); setWebError(""); setWebResults(null);
    try {
      const text = await callClaude(
        `You are a recipe search assistant. Find 5-6 real recipes. Return ONLY a JSON array (no markdown):
[{"title":"string","source":"site name","url":"full https url","description":"one sentence","tags":["string"],"time":"string"}]`,
        `Find recipes for: ${webQuery}`, true
      );
      setWebResults(parseJSON(text));
    } catch { setWebError("Search failed. Try again."); }
    finally { setWebLoading(false); }
  }

  async function importFromResult(result, idx) {
    setImportingId(idx);
    try {
      const text = await callClaude(
        `Extract the full recipe from the URL. Return ONLY valid JSON (no markdown):
{"title":"string","ingredients":["string"],"instructions":["string"],"tags":["string"],"servings":"string","time":"string"}
If you cannot extract, return {"error":"message"}.`,
        `Extract from: ${result.url}`, true
      );
      const parsed = parseJSON(text);
      if (parsed.error) throw new Error(parsed.error);
      addRecipeObj(parsed, result.url);
      setView(views.HOME);
    } catch {
      addRecipeObj({title:result.title, tags:result.tags||[], ingredients:[], instructions:[], time:result.time||""}, result.url);
      setView(views.HOME);
    }
    finally { setImportingId(null); }
  }

  async function getSuggestions() {
    setSuggestLoading(true); setSuggestions(null);
    try {
      const recipeList = recipes.map(r => `- ${r.title} (ingredients: ${r.ingredients.slice(0,5).join(", ")})`).join("\n");
      const prompt = ingredients.trim()
        ? `I have these ingredients: ${ingredients}.\n\nFrom my saved recipes below, which can I make? Rank them.\n\n${recipeList}`
        : `From my saved recipes below, suggest 3-5 meals for tonight.\n\n${recipeList}`;
      const text = await callClaude(
        `You are a meal planning assistant. Return ONLY a JSON array (no markdown): [{"title":"string","reason":"string","match":"high|medium|low"}]. Only reference saved recipes.`,
        prompt
      );
      setSuggestions(parseJSON(text));
    } catch { setSuggestions([]); }
    finally { setSuggestLoading(false); }
  }

  function getOverdueSuggestions() {
    const now = Date.now();
    return [...recipes]
      .map(r => {
        const lastMade = r.cookLog?.length > 0 ? new Date(r.cookLog[r.cookLog.length-1]).getTime() : 0;
        const daysSince = lastMade === 0 ? 999 : Math.floor((now - lastMade) / 86400000);
        return { ...r, daysSince };
      })
      .filter(r => r.daysSince > 21)
      .sort((a,b) => b.daysSince - a.daysSince)
      .slice(0, 8);
  }

  function toggleFav(id) {
    persist(prev => prev.map(r => r.id===id ? {...r, favorite:!r.favorite} : r));
    setSelected(prev => prev?.id===id ? {...prev, favorite:!prev.favorite} : prev);
  }
  function setRating(id, rating) {
    persist(prev => prev.map(r => r.id===id ? {...r, rating} : r));
    setSelected(prev => prev?.id===id ? {...prev, rating} : prev);
  }
  function deleteRecipe(id) {
    persist(prev => prev.filter(r => r.id!==id));
    setView(views.HOME); setSelected(null);
  }

  const allMembers = [...new Set(recipes.map(r => r.addedBy).filter(Boolean))];
  const filtered = recipes.filter(r =>
    (filterUser==="all" || r.addedBy===filterUser) &&
    (r.title?.toLowerCase().includes(search.toLowerCase()) ||
     r.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );
  const favs = recipes.filter(r => r.favorite);

  // Cook log â all entries sorted newest first
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

      {/* Header */}
      <div style={{ background:"#062846", padding:"0 16px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:52 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>
            mise <span style={{color:"#ff492c"}}>en place</span>
          </div>
          <nav style={{ display:"flex", gap:1, alignItems:"center" }}>
            {[{label:"Recipes",v:views.HOME},{label:"Favs",v:views.FAVORITES},{label:"+ Add",v:views.ADD},{label:"â¦ Suggest",v:views.SUGGEST},{label:"ð Log",v:views.LOG}].map(n => (
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

        {/* ââ HOME ââ */}
        {view===views.HOME && (
          <div>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search recipes or tagsâ¦"
                style={{ flex:1, padding:"10px 14px", borderRadius:12, border:"1.5px solid #e5e5e5", fontSize:13, background:"#fff", outline:"none" }} />
            </div>
            {/* Member filter */}
            <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
              {["all", ...allMembers].map(m => (
                <button key={m} onClick={() => setFilterUser(m)}
                  style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:11,
                    background:filterUser===m?(m==="all"?"#062846":getMemberColor(m)):"#f0f0f0",
                    color:filterUser===m?"#fff":"#888", transition:"all 0.15s", display:"flex", alignItems:"center", gap:5 }}>
                  {m==="all" ? "All recipes" : <><Avatar name={m} size={16}/>{m}</>}
                </button>
              ))}
            </div>
            {filtered.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#aaa" }}>
                <div style={{ fontSize:40 }}>ð³</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#ccc", marginTop:10 }}>No recipes yet</div>
                <div style={{ marginTop:6, fontSize:12 }}>Search the web or paste a URL to get started</div>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => { setSelected(r); setView(views.DETAIL); }} onFav={toggleFav} />)}
              </div>
            )}
          </div>
        )}

        {/* ââ FAVORITES ââ */}
        {view===views.FAVORITES && (
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:16 }}>Favorites</div>
            {favs.length===0
              ? <div style={{ textAlign:"center", padding:"60px 0", color:"#bbb", fontSize:13 }}>Heart a recipe to save it here</div>
              : <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                  {favs.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => { setSelected(r); setView(views.DETAIL); }} onFav={toggleFav} />)}
                </div>
            }
          </div>
        )}

        {/* ââ ADD ââ */}
        {view===views.ADD && (
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:16 }}>Add a Recipe</div>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              <button onClick={() => { setAddTab("search"); setWebResults(null); setWebError(""); }} style={tabBtn(addTab==="search")}>ð Search Web</button>
              <button onClick={() => { setAddTab("url"); setUrlError(""); }} style={tabBtn(addTab==="url")}>ð Paste URL</button>
            </div>

            {addTab==="search" && (
              <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={webQuery} onChange={e=>{setWebQuery(e.target.value);setWebError("");}} onKeyDown={e=>e.key==="Enter"&&searchWeb()}
                    placeholder="e.g. easy chicken pasta, vegan tacosâ¦"
                    style={{ flex:1, padding:"10px 13px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none" }} />
                  <button onClick={searchWeb} disabled={!webQuery.trim()||webLoading}
                    style={{ padding:"10px 16px", borderRadius:10, border:"none", background:webQuery.trim()?"#ff492c":"#eee", color:webQuery.trim()?"#fff":"#bbb", fontWeight:700, fontSize:13, cursor:webQuery.trim()?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>
                    Search
                  </button>
                </div>
                {webError && <div style={{ color:"#ff492c", fontSize:12, marginTop:10 }}>{webError}</div>}
                {webLoading && <Spinner label="Searchingâ¦" />}
                {webResults && webResults.length===0 && !webLoading && <div style={{ textAlign:"center", marginTop:20, color:"#aaa", fontSize:13 }}>No results. Try different terms.</div>}
                {webResults && webResults.length>0 && (
                  <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:10 }}>
                    <div style={{ fontSize:10, color:"#aaa", fontWeight:700, letterSpacing:0.5 }}>{webResults.length} RESULTS</div>
                    {webResults.map((r,i) => (
                      <div key={i} style={{ border:"1.5px solid #eee", borderRadius:12, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, background:"#fafafa" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif" }}>{r.title}</div>
                          <div style={{ fontSize:11, color:"#888", marginTop:3 }}>{r.description}</div>
                          <div style={{ display:"flex", gap:7, marginTop:6, flexWrap:"wrap", alignItems:"center" }}>
                            {r.source && <span style={{ fontSize:10, color:"#5938a2", fontWeight:600 }}>{r.source}</span>}
                            {r.time && <span style={{ fontSize:10, color:"#aaa" }}>â± {r.time}</span>}
                          </div>
                        </div>
                        <button onClick={() => importFromResult(r,i)} disabled={importingId===i}
                          style={{ flexShrink:0, padding:"7px 13px", borderRadius:9, border:"none", background:importingId===i?"#eee":"#062846", color:importingId===i?"#aaa":"#fff", fontWeight:700, fontSize:11, cursor:importingId===i?"not-allowed":"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                          {importingId===i?"Savingâ¦":"+ Save"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {addTab==="url" && (
              <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                <input value={url} onChange={e=>{setUrl(e.target.value);setUrlError("");}} onKeyDown={e=>e.key==="Enter"&&fetchFromUrl()}
                  placeholder="https://..." style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", marginBottom:12 }} />
                {urlError && <div style={{ color:"#ff492c", fontSize:12, marginBottom:10 }}>{urlError}</div>}
                {urlLoading ? <Spinner label="Extracting recipeâ¦" /> : (
                  <button onClick={fetchFromUrl} disabled={!url.trim()}
                    style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:url.trim()?"#ff492c":"#eee", color:url.trim()?"#fff":"#bbb", fontWeight:700, fontSize:14, cursor:url.trim()?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif" }}>
                    Extract Recipe
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ââ SUGGEST ââ */}
        {view===views.SUGGEST && (
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#062846", marginBottom:16 }}>What should I make?</div>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              <button onClick={() => setSuggestTab("ingredients")} style={tabBtn(suggestTab==="ingredients")}>ð§ By Ingredients</button>
              <button onClick={() => setSuggestTab("overdue")} style={tabBtn(suggestTab==="overdue")}>â° Haven't Made In a While</button>
            </div>

            {suggestTab==="ingredients" && (
              <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                <textarea value={ingredients} onChange={e=>setIngredients(e.target.value)}
                  placeholder="e.g. chicken, garlic, lemon, pastaâ¦ or leave blank for open suggestions"
                  rows={3} style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:13, outline:"none", resize:"vertical", marginBottom:12 }} />
                <button onClick={getSuggestions}
                  style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:"#5938a2", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  {suggestLoading?"Thinkingâ¦":"Suggest Meals"}
                </button>
                {suggestLoading && <Spinner label="Checking your pantryâ¦" />}
                {suggestions && suggestions.length===0 && <div style={{ textAlign:"center", marginTop:16, color:"#aaa", fontSize:13 }}>No strong matches. Try different ingredients.</div>}
                {suggestions && suggestions.length>0 && (
                  <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:9 }}>
                    {suggestions.map((s,i) => {
                      const match = recipes.find(r => r.title.toLowerCase()===s.title?.toLowerCase()) ||
                                    recipes.find(r => r.title.toLowerCase().includes(s.title?.toLowerCase()?.split(" ")[0]));
                      return (
                        <div key={i} onClick={() => match && (setSelected(match), setView(views.DETAIL))}
                          style={{ background:"#f7f6f3", borderRadius:10, padding:"12px 14px", cursor:match?"pointer":"default",
                            borderLeft:"4px solid", borderColor:s.match==="high"?"#23cca2":s.match==="medium"?"#ffd200":"#ddd", transition:"transform 0.15s" }}
                          onMouseEnter={e => match && (e.currentTarget.style.transform="translateX(3px)")}
                          onMouseLeave={e => e.currentTarget.style.transform=""}>
                          <div style={{ fontWeight:700, color:"#062846", fontSize:13 }}>{s.title}</div>
                          <div style={{ fontSize:11, color:"#666", marginTop:3 }}>{s.reason}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {suggestTab==="overdue" && (
              <div>
                <div style={{ fontSize:12, color:"#888", marginBottom:14 }}>Recipes you haven't made in 21+ days, or never logged.</div>
                {getOverdueSuggestions().length===0
                  ? <div style={{ background:"#fff", borderRadius:14, padding:24, textAlign:"center", color:"#aaa", fontSize:13 }}>You're on top of your rotation!</div>
                  : <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                      {getOverdueSuggestions().map(r => (
                        <div key={r.id} onClick={() => { setSelected(r); setView(views.DETAIL); }}
                          style={{ background:"#fff", borderRadius:12, padding:"13px 15px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center",
                            boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"transform 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.transform="translateX(3px)"}
                          onMouseLeave={e => e.currentTarget.style.transform=""}>
                          <div>
                            <div style={{ fontWeight:700, color:"#062846", fontSize:13, fontFamily:"'Playfair Display',serif" }}>{r.title}</div>
                            <div style={{ fontSize:11, color:"#aaa", marginTop:3 }}>
                              {r.daysSince===999 ? "Never logged" : `Last made ${r.daysSince} days ago`}
                            </div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            {r.addedBy && <Avatar name={r.addedBy} size={22} />}
                            <span style={{ background:"#fff8d6", color:"#8a6e00", borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:700 }}>
                              {r.daysSince===999?"Never":"Overdue"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                }
              </div>
            )}
          </div>
        )}

        {/* ââ COOK LOG ââ */}
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

        {/* ââ DETAIL ââ */}
        {view===views.DETAIL && selected && (
          <div>
            <button onClick={() => setView(views.HOME)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#888", fontSize:12, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:4, padding:0 }}>
              â Back
            </button>
            <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
              <div style={{ height:140, background:"linear-gradient(135deg,#062846 0%,#5938a2 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, position:"relative" }}>
                ð½ï¸
                {selected.cookLog?.length > 0 && (
                  <div style={{ position:"absolute", bottom:10, right:12, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"3px 10px", fontSize:11, color:"#fff", fontWeight:600 }}>
                    Made {selected.cookLog.length}Ã 
                  </div>
                )}
              </div>
              <div style={{ padding:"20px 20px 28px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#062846", lineHeight:1.2 }}>{selected.title}</div>
                  <span onClick={() => toggleFav(selected.id)} style={{ fontSize:22, cursor:"pointer", color:selected.favorite?"#ff492c":"#ddd", flexShrink:0, transition:"color 0.15s" }}>â¥</span>
                </div>

                {/* Added by */}
                {selected.addedBy && (
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:10 }}>
                    <Avatar name={selected.addedBy} size={22} />
                    <span style={{ fontSize:12, color:"#888" }}>Added by <strong>{selected.addedBy}</strong></span>
                  </div>
                )}

                <div style={{ display:"flex", gap:14, marginTop:10, fontSize:12, color:"#888" }}>
                  {selected.time && <span>â± {selected.time}</span>}
                  {selected.servings && <span>ð¤ {selected.servings}</span>}
                </div>
                <div style={{ marginTop:10 }}><StarRating value={selected.rating||0} onChange={r => setRating(selected.id,r)} /></div>

                {/* "I made this" button */}
                <button onClick={() => logCook(selected.id)}
                  style={{ marginTop:14, padding:"10px 20px", borderRadius:10, border:"none", background:"#23cca2", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  â I made this
                </button>

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

                <div style={{ marginTop:22 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Ingredients</div>
                  {selected.ingredients.length===0
                    ? <div style={{ fontSize:12, color:"#aaa" }}>No ingredients saved.</div>
                    : <ul style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:5 }}>{selected.ingredients.map((ing,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{ing}</li>)}</ul>}
                </div>

                <div style={{ marginTop:20 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:"#062846", marginBottom:9 }}>Instructions</div>
                  {selected.instructions.length===0
                    ? <div style={{ fontSize:12, color:"#aaa" }}>No instructions saved.</div>
                    : <ol style={{ paddingLeft:16, display:"flex", flexDirection:"column", gap:9 }}>{selected.instructions.map((step,i) => <li key={i} style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</li>)}</ol>}
                </div>

                {selected.notes && (
                  <div style={{ marginTop:18, background:"#fffbf0", borderRadius:10, padding:"11px 13px", borderLeft:"3px solid #ffd200" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#8a6e00", marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Notes</div>
                    <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{selected.notes}</div>
                  </div>
                )}

                {selected.url && (
                  <div style={{ marginTop:18 }}>
                    <a href={selected.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:"#5938a2", textDecoration:"none", fontWeight:600 }}>View original source â</a>
                  </div>
                )}

                <div style={{ marginTop:24, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
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
    </div>
  );
}
