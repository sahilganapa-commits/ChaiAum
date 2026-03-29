/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Instagram, Coffee, ArrowRight, Quote } from 'lucide-react';

const menuData = {
  "Chiya (Chai)": [
    { name: "Himalayan Chiya (Hot)", desc: "Handcrafted house blend of aromatic spices brewed with premium tea leaves grown in the high-altitude Himalayan region.", prices: "Pot | 10oz $5.5 | 12oz $6 | 16oz $7.25 | Pot $15.99" },
    { name: "Himalayan Chiya Made-To-Order (Hot)", desc: "Handcrafted to your liking using milk options & sweetness level of your choice, or with Espresso shot (Dirty Chai Latte).", prices: "10oz $6 | 12oz $6.5 | 16oz $7.75 | Pot $18.99" },
    { name: "Himalayan Iced Chiya Latte", prices: "12oz $6.5 | 16oz $7.5 | 20oz $8" },
    { name: "Himalayan Iced Chiya", prices: "12oz $5.25 | 16oz $6.25 | 20oz $6.75" }
  ],
  "Coffee": [
    { name: "Latte / Cappuccino (Decaf Available)", desc: "Flavors: Vanilla, Peppermint, Raspberry, Strawberry.", prices: "10oz $5.8 | 12oz $6.3 | 16oz $7.3" },
    { name: "Macchiato", prices: "$4.25" },
    { name: "Affogato", desc: "Scoop of Vanilla Ice Cream with a shot of espresso.", prices: "1 scoop $6.5 | 2 scoops $7.75" },
    { name: "Drip Coffee", prices: "10oz $4.25 | 12oz $4.75 | 16oz $6" },
    { name: "Iced Latte (Decaf Available)", prices: "12oz $6.5 | 16oz $7.5 | 20oz $8" },
    { name: "Café Mocha Latte Hot (Decaf Available)", prices: "10oz $6 | 12oz $6.5 | 16oz $7.75" },
    { name: "Iced Café Mocha Latte (Decaf Available)", prices: "12oz $7 | 16oz $8 | 20oz $8.5" },
    { name: "Americano (Decaf Available)", prices: "Hot: 10oz $4.50 | 12oz $5 | 16oz $5.50" }
  ],
  "Seasonal": [
    { name: "Mango Shake", prices: "12oz $7.25 | 16oz $8 | 20oz $8.5" },
    { name: "Hibiscus Mango Cold Brew", desc: "Sparkling or Coconut Water.", prices: "12oz/16oz $7.75" },
    { name: "Matcha Latte Hot/Iced", desc: "Flavors: Vanilla, Peppermint.", prices: "10oz/12oz $7.25 | 16oz/20oz $9" },
    { name: "Raspberry Matcha Latte", prices: "12oz $8.5 | 16oz $10 | 20oz $10.5" },
    { name: "Raspberry Vanilla Latte", prices: "12oz $8.5 | 16oz $10 | 20oz $10.5" },
    { name: "Strawberry Shake", prices: "12oz $7.25 | 16oz $8 | 20oz $8.5" },
    { name: "Matcha Affogato", desc: "Scoop of Vanilla Ice Cream with a shot of Matcha.", prices: "1 scoop $7 | 2 scoops $8.25" }
  ],
  "Other": [
    { name: "Ayur Tea (Pot)", desc: "Options: Organic Golden Turmeric Ginger, Chamomile, Organic Lemongrass Green Tea, Organic Spearmint, Organic Nepali Breakfast, Hibiscus Chai", prices: "$10" },
    { name: "Hot Chocolate with Marshmallow", prices: "10oz $6.5" },
    { name: "Golden Turmeric Latte", prices: "10oz $6.5" },
    { name: "Tiny Treat Affogato", desc: "Scoop of Vanilla Ice Cream with chocolate syrup drizzle.", prices: "1 scoop $6.5 | 2 scoops $7.75" }
  ],
  "Gourmet Toast": [
    { name: "Avocado Toast", prices: "$8.5" },
    { name: "Smoked Salmon Toast", prices: "$10.5" },
    { name: "Pesto Ricotta Cheese Toast", prices: "$8.5" },
    { name: "Spiced Up Toast (ChaiAum Special)", prices: "$9.5" },
    { name: "Himalayan Frankie Wrap", prices: "Veggie $10.5 | Paneer $11.5 | Ham & Cheese $11.5" }
  ],
  "Bakery": [
    { name: "Cookies", desc: "Jaggery | Almond | Pistachio | Chocolate Chip" },
    { name: "Pastries & Snacks", desc: "Sel Roti | Brownies | Nimki (Salted Crisp)" },
    { name: "Croissants", desc: "Butter Croissant | Almond Bear Claw | Spinach Feta Croissant | Ham & Cheese Croissant" },
    { name: "Assorted Mini Savory Swirls" }
  ],
  "Grab & Go": [
    { name: "Bottled Water", desc: "Dasani, Fiji" },
    { name: "Sparkling Water", desc: "Flavored Can, Bottled" },
    { name: "Coconut Water" },
    { name: "Kids Organic Whole Milk" },
    { name: "Assorted Macarons (Pack of 6)" },
    { name: "Assorted Pastry (Pack of 4)" }
  ],
  "Mega Box": [
    { name: "Mega Himalayan Chiya", desc: "96oz (12 cups)", prices: "$45.00" },
    { name: "Mega Organic Dark Roast Coffee", prices: "$38.50" }
  ],
  "Add-ons": [
    { name: "Boba (Seasonal)", prices: "+$1.50" },
    { name: "Milk Alternatives", desc: "Oat | Almond", prices: "+$1" }
  ]
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Chiya (Chai)");
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:Chaiaumhr@gmail.com?subject=New Message from ${name}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
    window.location.href = mailtoLink;
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
            <div className="text-5xl md:text-7xl font-serif text-bark flex items-center">
              <span className="write-text">chai</span>
              <span className="write-text italic text-amber ml-1" style={{ animationDelay: '0.3s' }}>Aum</span>
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
          <div className="font-serif text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>
            chai<span className="italic text-amber">Aum</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
            {['Home', 'Menu', 'Our Story', 'Contact'].map((item) => (
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
              {/* Leaf Logo SVG */}
              <div className="relative w-32 h-32 mx-auto mb-6 text-white neon-glow-svg">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Outer Arc */}
                  <path d="M 15 78 A 40 40 0 1 1 85 78" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  
                  <g fill="#182A24" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
                    {/* Left Leaf */}
                    <path d="M 0 0 Q -14 -26 0 -52 Q 14 -26 0 0 Z" transform="translate(43.5, 79) rotate(-32)" />
                    
                    {/* Right Leaf */}
                    <path d="M 0 0 Q -14 -26 0 -52 Q 14 -26 0 0 Z" transform="translate(56.5, 79) rotate(32)" />
                    
                    {/* Center Leaf */}
                    <path d="M 0 0 Q -16.8 -31.2 0 -62.4 Q 16.8 -31.2 0 0 Z" transform="translate(50, 81)" />
                  </g>

                  {/* Bottom wavy line */}
                  <path d="M 10 85 Q 35 77 50 82 T 90 77" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              
              <h1 className="text-[5.5rem] md:text-[8rem] font-serif mb-4 text-white tracking-tight neon-glow-text leading-none">
                chai<span className="italic">Aum</span>
              </h1>
              
              <p className="text-2xl md:text-3xl font-serif text-white tracking-widest neon-glow-text mb-4 mt-2">
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
                <span className="text-sm tracking-widest uppercase opacity-70">Order Delivery:</span>
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

                {/* Hiring CTA */}
                <div className="mt-12 p-8 border border-amber/30 bg-white/40 rounded-sm">
                  <h3 className="font-serif text-2xl mb-3 text-terracotta">Join Our Team</h3>
                  <p className="text-sm mb-4 opacity-80">We are currently hiring! Requirements:</p>
                  <ul className="text-sm space-y-2 mb-6 opacity-80 list-disc list-inside">
                    <li>High school diploma or equivalent</li>
                    <li>Experience in food and beverage preparation</li>
                    <li>Exceptional communication skills</li>
                  </ul>
                  <a href="mailto:Chaiaumhr@gmail.com" className="inline-block px-6 py-2 bg-amber text-white text-sm tracking-widest uppercase hover:bg-terracotta transition-colors">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact */}
        <section id="contact" className="pt-24 pb-24 bg-bark text-cream">
          {/* Yelp Review - Full Width Band */}
          <div className="bg-white/5 py-16 mb-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="border-l-[3px] border-amber pl-8">
                <Quote className="w-10 h-10 text-terracotta/60 mb-6" />
                <p className="font-serif text-xl md:text-2xl italic opacity-90 mb-8 leading-relaxed">
                  "Such a cozy, welcoming spot that truly feels like home. Perfect place to relax with a cup of chai and some tasty snacks. The atmosphere is super chill, and the owners clearly put so much pride and care into this new establishment. A wonderful addition to the community!"
                </p>
                <a href="https://www.yelp.com/biz/chaiaum-pleasanton-3?dd_referrer=https%3A%2F%2Fwww.google.com%2F#reviews" target="_blank" rel="noopener noreferrer" className="text-sm text-amber hover:text-cream transition-colors uppercase tracking-widest font-medium">
                  Read more on Yelp
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-amber">Visit Us</h2>
            <div className="w-16 h-px bg-terracotta/50 mb-12"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Info */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-terracotta mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-xl mb-1">chaiAum Café</p>
                    <p className="opacity-90 text-lg">5424 Sunol Blvd Suite #11<br/>Pleasanton, CA 94566</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-terracotta mr-4 shrink-0" />
                  <p className="opacity-90 text-lg">925-425-7227</p>
                </div>
                <div className="flex items-center pt-2">
                  <a href="https://www.instagram.com/officialchaiaum/" target="_blank" rel="noopener noreferrer" className="flex items-center text-amber hover:text-white transition-colors">
                    <Instagram className="w-6 h-6 mr-4" />
                    <span className="tracking-widest uppercase text-sm font-medium">Follow us on Instagram</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/5 p-8 rounded-sm">
                <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm tracking-widest uppercase mb-2 opacity-70">Message</label>
                    <textarea id="message" name="message" required rows={4} className="w-full bg-transparent border-b border-cream/30 py-2 focus:outline-none focus:border-amber transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-terracotta text-cream tracking-widest uppercase text-sm hover:bg-amber transition-colors">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#362C25] text-cream/50 py-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} chaiAum Café. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
