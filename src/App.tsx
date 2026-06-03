/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Instagram, Coffee, ArrowRight, Quote, Clock } from 'lucide-react';

const menuData = {
  "Chiya (Chai/Tea)": [
    { name: "Himalayan Chiya (Hot)", desc: "Handcrafted house blend of aromatic spices brewed with premium tea leaves grown in high altitude Himalayan region", prices: "10oz $5.5 | 12oz $6 | 16oz $7.25 | Pot $15.99" },
    { name: "Himalayan Chiya Made-To-Order (Hot)", desc: "Handcrafted to your liking using milk options & sweetness level of your choice or with Espresso shot (Dirty Chai Latte)", prices: "10oz $6 | 12oz $6.5 | 16oz $7.75 | Pot $18.99" },
    { name: "Himalayan Iced Chiya Latte", prices: "12oz $6.5 | 16oz $7.5 | 20oz $8" },
    { name: "Dirty Chai Latte (Hot)", prices: "10oz $7.75 | 12oz $8.25 | 16oz $9.5" },
    { name: "Dirty Chai Latte (Iced)", prices: "10oz $8.25 | 12oz $9.25 | 16oz $9.75" }
  ],
  "Coffee": [
    { name: "Latte / Cappuccino (Decaf Available)", desc: "Flavors: Vanilla | Peppermint | Raspberry | Strawberry | Salted Caramel", prices: "10oz $5.8 | 12oz $6.3 | 16oz $7.3" },
    { name: "Macchiato", prices: "$4.25" },
    { name: "Affogato", desc: "Scoop of Vanilla Ice-cream with a shot of espresso", prices: "1 scoop $6.5 | 2 scoop $7.75" },
    { name: "Pour Over Coffee", prices: "10oz $4.25 | 12oz $4.75 | 16oz $6" },
    { name: "Iced Latte (Decaf Available)", prices: "12oz $6.5 | 16oz $7.5 | 20oz $8" },
    { name: "Café Mocha Latte (Hot) (Decaf Available)", prices: "10oz $6 | 12oz $6.5 | 16oz $7.75" },
    { name: "Iced Café Mocha Latte (Decaf Available)", prices: "12oz $7 | 16oz $8 | 20oz $8.5" },
    { name: <>Americano <span className="text-base font-normal opacity-80">(Hot <span className="text-xs opacity-60">10/12/16oz</span> / Iced <span className="text-xs opacity-60">12/16/20oz</span> +$1)</span> (Decaf Available)</>, prices: "10oz $4.50 | 12oz $5 | 16oz $6.25" }
  ],
  "Seasonal": [
    { name: "Shake (Mango | Strawberry)", prices: "12oz $7.25 | 16oz $8 | 20oz $8.5" },
    { name: "Hibiscus Mango Cold Brew", desc: "Options: Sparkling | Coconut Water", prices: "12oz $8.5 | 16oz $10 | 20oz $10.5" },
    { name: "Matcha Latte (Hot/Iced)", desc: "Flavor: Vanilla | Peppermint", prices: "10oz/12oz $7.25 | 12oz/16oz $7.75 | 16oz/20oz $9" },
    { name: "Raspberry Matcha / Raspberry Vanilla Latte", prices: "12oz $8.5 | 16oz $10 | 20oz $10.5" },
    { name: "Matcha Affogato", desc: "Scoop of Vanilla Ice-cream with a shot of Matcha", prices: "1 scoop $7 | 2 scoop $8.25" }
  ],
  "Other": [
    { name: "Ayur Tea", desc: "Chamomile (NC) | Organic Golden Turmeric Ginger (NC) | Organic Lemongrass Green Tea (C) | Organic Spearmint (NC) | Organic Nepali Breakfast (C) | Hibiscus Chai (NC)", prices: "10oz $4 | 12oz $4.5 | Pot $10" },
    { name: "Hot Chocolate w/ Marshmallow", prices: "10oz $6.5" },
    { name: "Golden Turmeric Latte", prices: "10oz $6.5" }
  ],
  "Gourmet Items": [
    { name: "Tiny Treat Affagato", desc: "Scoop of Vanilla Ice-cream with drizzle of chocolate syrup", prices: "1 scoop $6.5 | 2 scoop $7.75" },
    { name: "Avocado Toast / Pesto Ricotta Cheese Toast", prices: "$8.5" },
    { name: "Smoked Salmon Toast", prices: "$10.5" },
    { name: "Spiced Up Toast – ChaiAum Special", prices: "$9.5" },
    { name: "Himalayan Sandwich (Veggie | Ham & Cheese)", prices: "$13.5" },
    { name: "Momo (Chicken/Vegan) – 6pc", prices: "$14.99" },
    { name: "Himalayan Frankie Wrap (Veggie | Paneer | Ham & Cheese | Chicken)", prices: "$10.5 | $11.5 | $11.5 | $12.5" }
  ],
  "Bakery": [
    { name: "Cookie", desc: "Jaggery | Almond | Pistachio | Chocolate Chip" },
    { name: "Sel Roti" },
    { name: "Nimki (Salted Crisp)" },
    { name: "Butter Croissant" },
    { name: "Almond Bear Claw" },
    { name: "Spinach Feta Croissant" },
    { name: "Ham & Cheese Croissant" },
    { name: "Assorted Mini Savory Swirls" }
  ],
  "Grab & Go": [
    { name: "Bottled Water", desc: "Dasani, Fiji" },
    { name: "Sparkling Water", desc: "Flavored Can, Bottled" },
    { name: "Coconut Water" },
    { name: "Assorted Macrons (Pack of 6)" },
    { name: "Assorted Pastry (Pack of 4)" }
  ],
  "Mega Box": [
    { name: "Mega Himalayan Chiya", desc: "96oz (12 cups)", prices: "$45.00" },
    { name: "Mega Organic Dark Roast Coffee", desc: "96oz (12 cups)", prices: "$38.50" }
  ],
  "Extras": [
    { name: "Boba (Seasonal)", prices: "$0.85" },
    { name: "1 Additional Scoop of Ice-Cream", prices: "$1.5" },
    { name: "Milk Alternatives", desc: "Oat | Almond", prices: "$1" }
  ]
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Chiya (Chai/Tea)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeewjark';

  useEffect(() => {
    // Fast loading transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setContactStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setContactStatus('success');
      form.reset();
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setContactStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-cream text-bark relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          >
            <div className="flex flex-col items-center gap-4">
              <img src="/icon.png" alt="ChaiAum logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
              <div className="text-5xl md:text-7xl font-serif text-bark flex items-center">
                <span className="write-text">Chai</span>
                <span className="write-text italic text-amber ml-1" style={{ animationDelay: '0.3s' }}>Aum</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-cream/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer flex items-center gap-2" onClick={() => scrollToSection('home')}>
            <img src="/icon.png" alt="ChaiAum logo" className="w-9 h-9 object-contain" />
            <img src="/wordmark.png" alt="ChaiAum" className="h-7 object-contain" />
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
            {['Home', 'Menu', 'Services', 'Our Story', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="hover:text-terracotta transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      <main>
        {/* SECTION 1: Home Hero */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0 bg-bark overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-80"
              src="/hero-video-compressed.mp4"
            ></video>
            {/* Dark overlay to ensure text readability against video */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/10 rounded-full blur-3xl pointer-events-none z-0"></div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mb-8 relative inline-block"
            >
              {/* Full ChaiAum Logo */}
              <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem] mx-auto mb-0 neon-glow-svg">
                <img src="/logo.png" alt="ChaiAum logo" className="w-full h-full object-contain" />
              </div>

              <p className="text-2xl md:text-3xl font-serif text-white tracking-widest neon-glow-text mb-4 -mt-12 md:-mt-16">
                Tea & Coffee
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              onClick={() => scrollToSection('menu')}
              className="mt-8 px-8 py-3 border border-white/80 text-white hover:bg-white hover:text-bark transition-all duration-300 text-sm tracking-widest uppercase flex items-center mx-auto group"
            >
              Explore the Menu
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </section>

        {/* SECTION 2: Menu */}
        <section id="menu" className="py-24 px-6 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Menu</h2>
              <div className="w-16 h-px bg-amber mx-auto mb-8"></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-sm tracking-widest uppercase opacity-70">Online order/delivery:</span>
                <a
                  href="https://chaiaum.cloveronline.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#229650] text-white hover:bg-[#1B7A41] transition-all duration-300 text-xs tracking-widest uppercase rounded-sm shadow-sm"
                >
                  ChaiAum Online
                </a>
                <a
                  href="https://www.doordash.com/store/chaiaum-pleasanton-40112229/?pickup=true&srsltid=AfmBOoopc8gvZyu11yJlqvN-37fBw-Gk55aJxG4SYn5pa2rBqJ0JU5Bt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#EB1700] text-white hover:bg-[#C81300] transition-all duration-300 text-xs tracking-widest uppercase rounded-sm shadow-sm"
                >
                  DoorDash
                </a>
                <a
                  href="https://www.ubereats.com/store/chaiaum-tea-and-coffee-5424-sunol-boulevard/Yun9OBGMWVSa7uMsDWqOsQ?srsltid=AfmBOorIpoFRMqDSzFocamQjSvD03MfK4ElxH4OKpImVrpKi9uBl9-Pi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#06C167] text-white hover:bg-[#05A355] transition-all duration-300 text-xs tracking-widest uppercase rounded-sm shadow-sm"
                >
                  UberEats
                </a>
                <a
                  href="https://www.grubhub.com/restaurant/chaiaum-5424-sunol-boulevard-11-pleasanton/13860296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#FF8000] text-white hover:bg-[#E67300] transition-all duration-300 text-xs tracking-widest uppercase rounded-sm shadow-sm"
                >
                  Grubhub
                </a>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
                <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-4 lg:gap-0 lg:border-l border-bark/10 sticky top-32">
                  {Object.keys(menuData).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap text-left px-4 py-3 text-sm tracking-wider uppercase transition-all duration-200 relative ${
                        activeCategory === category 
                          ? 'text-terracotta font-medium' 
                          : 'text-bark/60 hover:text-bark'
                      }`}
                    >
                      {activeCategory === category && (
                        <motion.div 
                          layoutId="activeCategory"
                          className="absolute left-0 bottom-0 lg:top-0 w-full lg:w-0.5 h-0.5 lg:h-full bg-terracotta"
                        />
                      )}
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div className="lg:w-3/4 min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <h3 className="text-3xl font-serif text-amber mb-8">{activeCategory}</h3>
                    <div className="grid grid-cols-1 gap-y-10 max-w-4xl">
                      {menuData[activeCategory as keyof typeof menuData].map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div className="flex flex-col sm:flex-row sm:items-baseline w-full mb-1">
                            <h4 className="font-serif text-xl font-medium pr-4">{item.name}</h4>
                            {item.prices && (
                              <>
                                <div className="hidden sm:block flex-grow border-b border-dotted border-bark/30 relative -top-1 mx-2 min-w-[2rem]"></div>
                                <div className="text-sm font-medium text-terracotta sm:pl-4 mt-1 sm:mt-0 sm:text-right">{item.prices}</div>
                              </>
                            )}
                          </div>
                          {item.desc && <p className="text-sm opacity-70 leading-relaxed mt-1">{item.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Other Services */}
        <section id="services" className="py-24 px-6 bg-white/50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Other Services</h2>
            <div className="w-16 h-px bg-amber mx-auto mb-6"></div>
            <p className="text-lg opacity-80 mb-14">Other services provided by us:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
              <div className="px-6 md:border-r border-bark/15">
                <h3 className="font-serif text-2xl text-terracotta mb-3">Event / Office Catering</h3>
                <p className="opacity-80">Bring ChaiAum's signature drinks and custom menu items to your gatherings.</p>
              </div>
              <div className="px-6 md:border-r border-bark/15">
                <h3 className="font-serif text-2xl text-terracotta mb-3">Space for Workshops & Meetups</h3>
                <p className="opacity-80">A warm, cozy setting to host your workshops, classes, and community meetups.</p>
              </div>
              <div className="px-6">
                <h3 className="font-serif text-2xl text-terracotta mb-3">Special Occasions</h3>
                <p className="opacity-80">Parties, birthdays, and celebrations made memorable in our calming café.</p>
              </div>
            </div>

            <p className="mt-14 text-sm opacity-70">
              Interested? Reach out at{' '}
              <a href="mailto:info@chaiAum.com" className="text-amber hover:text-terracotta transition-colors">info@chaiAum.com</a>
              {' '}or call 925-425-7227.
            </p>
          </div>
        </section>

        {/* SECTION 3: Our Story */}
        <section id="our-story" className="py-24 px-6 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Image Panel */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber/20 translate-x-4 translate-y-4 rounded-sm"></div>
                <img 
                  src="https://i.imgur.com/oqpfZip.jpg" 
                  alt="Latte art on a wooden table" 
                  className="relative z-10 w-full h-[600px] object-cover rounded-sm shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Rooted in Ritual</h2>
                <div className="w-16 h-px bg-terracotta mb-8"></div>
                <div className="space-y-6 text-lg opacity-90 leading-relaxed">
                  <p>
                    "ChaiAum was born from the comforting aroma of cardamom and the rhythm of morning brews. What started as a personal ritual became a community space where stories steep as deeply as the tea itself.
                  </p>
                  <p>
                    A Journey of Connection and Inspiration. It's a tribute to the warmth of connection and the depth of self-discovery — all served in a cup. Step into a cozy, feel-good space made for everyone from toddlers to grandparents!
                  </p>
                  <p>
                    We're all about offering something for every craving, from comforting milk teas and bold espresso drinks to soothing herbal infusions and kid-approved treats. More than just drinks, this is your moment of calm. Come sip, savor, and indulge a while!"
                  </p>
                </div>

                {/* Crafted for Connection */}
                <div className="mt-12">
                  <h3 className="font-serif text-3xl mb-4">Crafted for Connection</h3>
                  <p className="text-lg opacity-90 leading-relaxed">
                    We believe in the power of shared moments — whether it's a quiet sip or a lively conversation. Our café is designed to be inclusive, welcoming, and rooted in South Asian hospitality. Here, we celebrate single-origin Himalayan teas, tradition, and quality in every cup. Whether you're catching up with friends or taking a solo pause, our café is your cozy corner of peace in the middle of a busy day.
                  </p>
                </div>

                {/* Hiring CTA */}
                <div className="mt-12 p-8 border border-amber/30 bg-white/40 rounded-sm">
                  <h3 className="font-serif text-2xl mb-3 text-terracotta">Join Our Team</h3>
                  <p className="text-sm mb-4 opacity-80">We are currently hiring! Requirements:</p>
                  <ul className="text-sm space-y-2 opacity-80 list-disc list-inside">
                    <li>High school diploma or equivalent</li>
                    <li>Experience in food and beverage preparation</li>
                    <li>Exceptional communication skills</li>
                    <li>Please email your resume and details to info@chaiAum.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact */}
        <section id="reviews" className="pb-24 bg-bark text-cream">
          {/* Reviews - Full Width Band */}
          <div className="bg-white/5 py-16 mb-20">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-amber text-center">What People Are Saying</h2>

              {/* Google Reviews */}
              <div className="mb-16">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="h-px w-12 bg-terracotta/40"></span>
                  <span className="text-sm tracking-[0.2em] uppercase opacity-70 font-medium">From Google</span>
                  <span className="h-px w-12 bg-terracotta/40"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="border-l-[3px] border-amber pl-8">
                    <Quote className="w-8 h-8 text-terracotta/60 mb-5" />
                    <p className="font-serif text-lg md:text-xl italic opacity-90 leading-relaxed">
                      "If you're looking for an authentic Nepal experience you need to come here. The chai tea and food is so well flavored. Plus, they have a whole collection of holiday drinks that really hit the spot. The ambiance of ChaiAum is so calming; you can feel it the minute you walk through the door. If you're looking for a good caffeinated drink, delicious snacks and a relaxing place to do some work, check out ChaiAum!"
                    </p>
                  </div>
                  <div className="border-l-[3px] border-amber pl-8">
                    <Quote className="w-8 h-8 text-terracotta/60 mb-5" />
                    <p className="font-serif text-lg md:text-xl italic opacity-90 leading-relaxed">
                      "ChaiAum is a such a great new addition to Pleasanton! It's a hidden gem in a plaza near downtown Pleasanton—super friendly owners, cozy vibes, and amazing chai/chiya that's truly special! Loved the savory snacks, especially the Nepali sel roti. Perfect place to relax with great service just off 680 in a convenient shopping plaza."
                    </p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <a href="https://www.google.com/search?q=chaiaum+google+reviews&rlz=1C5OZZY_enUS1183US1183&oq=chaiaum+google+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgcIAhAAGO8FMgcIAxAAGO8FMgcIBBAAGO8FMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTY3MWowajSoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x808fe96dc8915997:0xe5f6f4e39396877a,1,,,," target="_blank" rel="noopener noreferrer" className="text-sm text-amber hover:text-cream transition-colors uppercase tracking-widest font-medium">
                    Read more on Google
                  </a>
                </div>
              </div>

              {/* Yelp Reviews */}
              <div>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="h-px w-12 bg-terracotta/40"></span>
                  <span className="text-sm tracking-[0.2em] uppercase opacity-70 font-medium">From Yelp</span>
                  <span className="h-px w-12 bg-terracotta/40"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="border-l-[3px] border-amber pl-8">
                    <Quote className="w-8 h-8 text-terracotta/60 mb-5" />
                    <p className="font-serif text-lg md:text-xl italic opacity-90 leading-relaxed">
                      "Such a cozy, welcoming spot that truly feels like home. Perfect place to relax with a cup of chai and some tasty snacks. The atmosphere is super chill, and the owners clearly put so much pride and care into this new establishment. A wonderful addition to the community!"
                    </p>
                  </div>
                  <div className="border-l-[3px] border-amber pl-8">
                    <Quote className="w-8 h-8 text-terracotta/60 mb-5" />
                    <p className="font-serif text-lg md:text-xl italic opacity-90 leading-relaxed">
                      "I needed a pick me up and I didn't want to drink coffee in the afternoon. ChaiAum caught my eye and the chiya did the trick. The owner explained the organic ingredients and the Nepal style tea's level of detailed preparation. I will be back to enjoy the wonderful sitting area and the calm ambiance of this gem of a cafe."
                    </p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <a href="https://www.yelp.com/biz/chaiaum-pleasanton-3?dd_referrer=https%3A%2F%2Fwww.google.com%2F#reviews" target="_blank" rel="noopener noreferrer" className="text-sm text-amber hover:text-cream transition-colors uppercase tracking-widest font-medium">
                    Read more on Yelp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Events & Happenings */}
          <div id="events" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-28">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-amber">Events & Happenings</h2>
              <div className="w-16 h-px bg-terracotta/50 mx-auto"></div>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <img
                  src="/handmade-jewellery.jpeg"
                  alt="Handmade Jewellery event flyer"
                  className="w-full rounded-sm shadow-lg"
                />
                <img
                  src="/fathers-day-event.jpeg"
                  alt="Father's Day Chai & Metal Stamp Art event flyer"
                  className="w-full rounded-sm shadow-lg"
                />
              </div>
              <img
                src="/milpitas-banner.png"
                alt="ChaiAum Milpitas event banner"
                className="w-4/5 mx-auto block rounded-sm shadow-lg"
              />
            </div>
          </div>

          <div id="contact" className="max-w-6xl mx-auto px-6 scroll-mt-28">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-amber">Contact</h2>
            <div className="w-16 h-px bg-terracotta/50 mb-12"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Info */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-terracotta mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-xl mb-1">ChaiAum Café</p>
                    <p className="opacity-90 text-lg">5424 Sunol Blvd Suite #11<br/>Pleasanton, CA 94566</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-terracotta mr-4 shrink-0" />
                  <p className="opacity-90 text-lg">925-425-7227</p>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-terracotta mr-4 shrink-0 mt-1" />
                  <div className="w-full max-w-xs">
                    <p className="font-bold text-xl mb-3">Hours</p>
                    <ul className="space-y-1.5 text-lg opacity-90">
                      {(() => {
                        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const todayName = week[new Date().getDay()];
                        const ordered = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        return ordered.map((day) => {
                          const isToday = day === todayName;
                          return (
                            <li
                              key={day}
                              className={`flex justify-between gap-6 rounded-sm transition-colors ${
                                isToday ? 'bg-amber/20 text-amber font-semibold px-2 -mx-2 py-0.5' : ''
                              }`}
                            >
                              <span>{day}{isToday && ' (Today)'}</span>
                              <span className={isToday ? '' : 'opacity-80'}>10 AM–7 PM</span>
                            </li>
                          );
                        });
                      })()}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center pt-2">
                  <a href="https://www.instagram.com/officialchaiaum/" target="_blank" rel="noopener noreferrer" className="flex items-center text-amber hover:text-white transition-colors">
                    <Instagram className="w-6 h-6 mr-4" />
                    <span className="tracking-widest uppercase text-sm font-medium">Follow us on Instagram</span>
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className="overflow-hidden rounded-sm border border-white/10 shadow-lg h-full min-h-[400px]">
                <iframe
                  title="ChaiAum Café location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.9310417930124!2d-121.88125372416337!3d37.6508252192904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fe96dc8915997%3A0xe5f6f4e39396877a!2sChaiAum-Tea%20and%20Coffe!5e0!3m2!1sen!2sus!4v1753754075841!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Send a Message */}
        <section id="message" className="py-24 px-6 bg-bark text-cream">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-amber">Send a Message</h2>
              <div className="w-16 h-px bg-terracotta/50 mx-auto"></div>
            </div>
            <div className="bg-white/5 p-8 md:p-12 rounded-sm">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors resize-none"></textarea>
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === 'sending'}
                  className="w-full py-4 bg-terracotta text-cream tracking-widest uppercase text-sm hover:bg-amber transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactStatus === 'sending' ? 'Sending...' : 'Submit'}
                </button>
                {contactStatus === 'success' && (
                  <p className="text-amber text-sm tracking-wide" role="status">
                    Thanks — your message is on its way. We'll be in touch soon.
                  </p>
                )}
                {contactStatus === 'error' && (
                  <p className="text-terracotta text-sm tracking-wide" role="alert">
                    Something went wrong. Please try again, or email us directly at info@chaiAum.com.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#362C25] text-cream/50 py-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ChaiAum Café. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
