export type SeedMenuItem = {
  name: string
  desc: string
  image: string
  category: string
  tag?: string
}

export const seedMenuItems: SeedMenuItem[] = [

    // ── Coffee ──────────────────────────────────────────────
    { name: "Double Espresso",   desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Piccolo",           desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Macchiato",         desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Long Black",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Latte",             desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Flat White",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Cappuccino",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Mocha",             desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "White Mocha",       desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Chai Latte",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Affogato",          desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Babyccino",         desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Iced Long Black",   desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Iced Latte",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },
    { name: "Iced Coffee",       desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Coffee" },

    // ── Chocolate ───────────────────────────────────────────
    { name: "Hot Chocolate",     desc: "Rich, creamy hot chocolate made with 33% real cocoa for a smooth, comforting sip.",         image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                            category: "Chocolate" },
    { name: "Italian Hot Choc",  desc: "Thick creamy dark hot chocolate topped with home made whipped cream.",                      image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Italian_Hot_Chocolate_sYQawcKij.jpg",                            category: "Chocolate", tag: "Chef's Pick" },
    { name: "Iced Chocolate",    desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                            category: "Chocolate" },

    // ── Matcha ──────────────────────────────────────────────
    { name: "Matcha Latte",              desc: "",                                                                                  image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Matcha" },
    { name: "Iced Matcha",               desc: "",                                                                                  image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Matcha" },
    { name: "Iced Matcha Strawberry",    desc: "Premium matcha, strawberry purée, a touch of rose, topped with a thin layer of vanilla cold foam.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_straberry_rose_matcha_2880x2304_pA59vRC_2.jpg", category: "Matcha", tag: "Signature" },

    // ── Cold Brew ────────────────────────────────────────────
    { name: "Cold Brew",         desc: "Single‑origin specialty coffee steeped for 20 hours for a clean, crisp, smooth brew with a bold kick.",                                                                image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Cold_Brew_3Hvmk3-Fa.jpg",                                        category: "Cold Brew" },
    { name: "Nitro Cold Brew",   desc: "20‑hour steeped single‑origin coffee, infused with nitrogen for an ultra‑smooth, creamy, naturally sweet finish.",                                                     image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Nitro_Cold_Brew_dnLwTsNKF.jpg",                                  category: "Cold Brew", tag: "Fan Fave" },
    { name: "Season Special",    desc: "A rotating specialty brew of the month, crafted from limited‑release beans and unique flavour profiles. Ask our team what's pouring today.",                           image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Cold Brew", tag: "Limited" },
    { name: "Coconut Latte",     desc: "Cold brew blended with creamy coconut milk for a smooth, lightly sweet, and fully dairy‑free refreshing alternative.",                                                 image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Cold Brew" },
    { name: "Almond & Maple",    desc: "Almond cold brew with a hint of maple for gentle sweetness and a smooth, nutty finish.",                                                                               image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Almond_Maple_Cold_Brew_IZpPyCNdp.jpg",                           category: "Cold Brew" },
    { name: "Oat & Vanilla",     desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Oat___Vanilla_Cold_Brew_MOkH62vqN.jpg",                          category: "Cold Brew" },
    { name: "Bombon (Spanish)",  desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Spanish_Latte__a9sWjGJA.jpg",                                    category: "Cold Brew" },

    // ── Cloud ────────────────────────────────────────────────
    { name: "Mont Blanc",        desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Mont_Blanc_pUzZ-g-I1.jpg",                                       category: "Cloud" },
    { name: "Salted Caramel",    desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",          category: "Cloud" },
    { name: "Tiramisu",          desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Tiramisu_Cold_Brew_XCbgzSx_s.jpg",                               category: "Cloud", tag: "Bestseller" },
    { name: "Vanilla Cream",     desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",          category: "Cloud" },

    // ── Tea ──────────────────────────────────────────────────
    { name: "Peppermint Tea",    desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Tea" },
    { name: "Green Tea",         desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Tea" },
    { name: "Camomile Tea",      desc: "",                                                                                          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Tea" },

    // ── Smoothies ────────────────────────────────────────────
    { name: "Tropical Sky",      desc: "Pineapple, Mango, Banana, Passionfruit, Blue Spirulina, Coconut Milk",                     image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Tropical_Sky_naS9qx0Rq.jpg",                                     category: "Smoothies" },
    { name: "Berry Boost",       desc: "Strawberries, Mango, Raspberries, Goji Berries, Almond Milk",                              image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Berry_Boost_d8vdcZfJ2.jpg",                                      category: "Smoothies" },
    { name: "Acai Berry",        desc: "Acai, Blueberries, Banana, Dates, Oat Milk",                                               image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Purple_Power_Zc6AvoLVp.jpg",                                     category: "Smoothies" },

    // ── Protein ──────────────────────────────────────────────
    { name: "Blue Spirulina Protein", desc: "Blue Spirulina, Banana, Almond Milk, Vanilla Protein",                                image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Blue_Spirulina_Protein_Shake_yX888bhTM.jpg",                     category: "Protein" },
    { name: "Cocoa Energy",           desc: "Cold Brew Coffee, Cacao, Almond Milk, Vanilla Protein",                               image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                             category: "Protein" },
    { name: "Strawberry Shortcake",   desc: "Strawberries, Oat Milk, Vanilla Protein, Short Bread",                                image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                             category: "Protein" },

    // ── Signature Shakes ─────────────────────────────────────
    { name: "Cookie Monster",         desc: "A thick, sky‑blue cookies‑and‑cream shake with a fun, nostalgic vibe. Creamy, playful, and indulgent in every sip.",          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Cookie_Monster_hZGopk3Is.jpg",                                category: "Signature Shake", tag: "Bestseller" },
    { name: "Cold Brew Crunch",       desc: "A bold, smooth cold brew with a creamy, cookie‑like crunch and a hint of sweetness. Refreshing, textured, and indulgent.",    image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                          category: "Signature Shake" },
    { name: "Mal-tese",               desc: "A creamy, malty chocolate blend with a distinct Malteser crunch.",                                                             image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_maltease_shake_2880x2304_klBub4KIx.jpg",                     category: "Signature Shake" },
    { name: "Pistachio Silk",         desc: "A rich, creamy pistachio blend made with pure pistachio and ice cream, finished with a smooth swirl of whipped cream.",        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Pistachio_Silk_EJuwomcVV.jpg",                                category: "Signature Shake" },
    { name: "Golden Gaytime",         desc: "A caramel‑rich shake with a nostalgic biscuit‑and‑toffee vibe.",                                                               image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Golden_Gaytime_zi0UC3yAz.jpg",                                category: "Signature Shake" },
    { name: "Strawberry Cheesecake",  desc: "A dessert‑style shake with a lush strawberry swirl and a smooth cheesecake richness, delivering a sweet, velvety treat.",     image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                      category: "Signature Shake" },

    // ── Classic Shakes ───────────────────────────────────────
    { name: "Biscoff",           desc: "A caramel‑spiced shake with a buttery cookie richness.",                                    image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Classic Shake" },
    { name: "Nutella",           desc: "A thick, chocolate‑hazelnut dream that tastes like pure, creamy indulgence.",               image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Classic Shake" },
    { name: "Chocolate Fudge",   desc: "A deep, velvety chocolate shake with a rich fudge swirl.",                                  image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Classic Shake" },
    { name: "Mango",             desc: "A bright, tropical shake bursting with juicy mango sweetness and smooth, creamy freshness.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Classic Shake" },
    { name: "Strawberry",        desc: "A classic, fruity shake with a sweet, juicy strawberry lift and a silky, refreshing finish.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                      category: "Classic Shake" },
    { name: "Vanilla",           desc: "A smooth, creamy vanilla shake with a soft, nostalgic sweetness that never goes out of style.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                    category: "Classic Shake" },
    { name: "Butterscotch",      desc: "A buttery, caramel‑rich shake with a golden sweetness that's comforting and crave‑worthy.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                        category: "Classic Shake" },

    // ── Waffles ──────────────────────────────────────────────
    { name: "Biscoff & White Choc", desc: "Lotus biscoff and premium white chocolate on a golden, crispy eggless waffle.",          image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_biscoff_white_chocolate_waffle_2880x2304_eyMpxbL-Z.jpg",       category: "Waffles", tag: "Fan Fave" },
    { name: "Nutella Overload",     desc: "Rich nutella and chocolate topping on a freshly baked eggless waffle.",                  image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Waffles" },
    { name: "Pistachio Crunch",     desc: "Pistachio sauce and crushed nuts on a crispy eggless waffle.",                           image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_pistachio_crunch_waffle_2880x2304_xtZiZED5d.jpg",               category: "Waffles" },
    { name: "Strawberry Cream",     desc: "Fresh strawberries and whipped cream on a golden eggless waffle.",                       image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Strawberry___Cream_Waffle_tcOS3NJD3.jpg",                        category: "Waffles" },
    { name: "Triple Chocolate",     desc: "Dark, milk, and white chocolate overload on a freshly baked eggless waffle.",            image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_tripple_chocolate_waffle_2880x2304_Y10L4MED8.jpg",                                         category: "Waffles" },

    // ── Knafeh ───────────────────────────────────────────────
    { name: "Classic Knafeh",    desc: "Sweet, cheesy, and satisfying with a golden, crunchy baked finish.",                        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_kanafeh_classic_2880x2304_eEO_vqRnt.jpg",                                         category: "Knafeh" },
    { name: "Nutella Knafeh",    desc: "Sweet cheesy knafeh topped with rich, creamy Nutella.",                                     image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_kanafeh_chocolate_2880x2304_tjbPnosAt.jpg",                                         category: "Knafeh" },
    { name: "Biscoff Knafeh",    desc: "Golden knafeh topped with lotus biscoff spread and crumbs.",                                image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                         category: "Knafeh" },
    { name: "Pistachio Knafeh",  desc: "Topped with excessive pistachio sauce and nuts.",                                           image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/Knafeh_-_Pistachio_MQoCu6Ckl.jpg",                               category: "Knafeh", tag: "New" },

    // ── Cakes ────────────────────────────────────────────────
    { name: "Basque Cheesecake",  desc: "A rich, ultra‑creamy burnt cheesecake with a molten centre and deep caramelised flavour. Pre‑order only.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png", category: "Cakes", tag: "Pre-order" },
    { name: "Tiramisu Cake",      desc: "A creamy, coffee‑kissed dessert with soft mascarpone richness and a light cocoa finish, all without eggs. Pre‑order only.", image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png", category: "Cakes", tag: "Pre-order" },
    { name: "Rose & Pistachio",   desc: "A fragrant, nutty delight with soft rose sweetness. Gluten‑free. Pre‑order only.",         image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Cakes", tag: "Pre-order" },
    { name: "Matilda",            desc: "A rich, ultra‑chocolatey, fudgy cake with a melt‑in‑your‑mouth finish. Pre‑order only.",   image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png",                                              category: "Cakes", tag: "Pre-order" },
];

export const seedMenuCategories = [
    "Coffee", "Chocolate", "Matcha", "Cold Brew", "Cloud",
    "Tea", "Smoothies", "Protein", "Signature Shake", "Classic Shake",
    "Waffles", "Knafeh", "Cakes",
];
