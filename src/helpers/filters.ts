import { Filter } from '../interfaces/filter';

export const Filters: Record<string, Filter> = {
  strains: {
    value: 'Strains',
    list: [{ value: 'indica' }, { value: 'sativa' }, { value: 'hybrid' }],
  },
  reviews: {
    value: 'Reviews',
    list: [
      { value: 'Most Reviewed' },
      { value: 'Top Rated' },
      { value: 'Lowest Rated' },
    ],
  },
  type: {
    value: 'Type',
    list: [
      { value: 'Cartridge' },
      { value: 'Flower' },
      { value: 'Clothing' },
      { value: 'Edibles' },
    ],
  },
  sort: {
    value: 'Sort By',
    list: [
      { value: 'Relevance' },
      { value: 'Price: Low to High' },
      { value: 'Price: High to Low' },
      { value: 'Rating' },
    ],
  },
  sortStrain: {
    value: 'Sort By',
    list: [
      { value: 'Most Reviewed' },
      { value: 'Top Rated' },
      { value: 'Lowest Rated' },
    ],
  },
  distance: {
    value: 'Distance',
    list: [{ value: '5mi' }, { value: '10mi' }, { value: '50mi' }],
  },
  sortNews: {
    value: 'Sort By',
    list: [{ value: 'Relevance' }, { value: 'Recent' }],
  },
  sortDispensary: {
    value: 'Sort By',
    list: [
      { value: 'Distance' },
      { value: 'Highest Rated' },
      { value: 'Most Reviewed' },
      // { value: 'Largest Menu' },
    ],
  },
  price: {
    value: 'Price',
    list: [{ value: '$' }, { value: '$$' }, { value: '$$$' }],
  },
  concentrates: {
    value: 'Concentrates',
    list: [
      { value: 'Budder' },
      { value: 'Crumble' },
      { value: 'Crystalline' },
      { value: 'Ingestibles' },
      { value: 'Solvent' },
      { value: 'Solventless' },
      { value: 'Terpenes' },
    ],
  },
  edibles: {
    value: 'Edibles',
    list: [
      {
        value: 'Candy',
        subList: [
          { value: 'Brittle, Caramel & Toffee' },
          { value: 'Candied & Chocolate Covered Snacks' },
          { value: 'Chocolate & Fudge' },
          { value: 'Candy & Chocolate Bars' },
          { value: 'Chewing Gum & Bubblegum' },
          { value: 'Ginger Candy' },
          { value: 'Hard Candy & Lollipops' },
          { value: 'Pods' },
          { value: 'Halva' },
          { value: 'Gummies' },
          { value: 'Marshmallows' },
          { value: 'Mints' },
          { value: 'Sour Candy' },
          { value: 'Wagashi' },
        ],
      },
      {
        value: 'Drinks',
        subList: [
          { value: 'Soft Drinks' },
          { value: 'Energy' },
          { value: 'Powdered Drink Mixes & Flavorings' },
          { value: 'Juices' },
          {
            value: 'Drinking Water',
            list: [
              { value: 'Flavored Drinking Water' },
              { value: 'Seltzer Drinking Water' },
              { value: 'Sparkling Drinking Water' },
            ],
          },
        ],
      },
      {
        value: 'Syrups, Sugars & Sweeteners',
        subList: [
          { value: 'Agave Nectar & Syrup' },
          { value: 'Honey' },
          { value: 'Maple Syrup' },
          { value: 'Molasses' },
          { value: 'Simple Syrups' },
          { value: 'Sugar Substitutes' },
          { value: 'Sugars' },
        ],
      },
    ],
  },
  topicals: {
    value: 'Topicals',
    list: [
      {
        value: 'Fragrances',
        subList: [
          { value: 'Body Sprays' },
          { value: 'Cologne' },
          { value: 'Dusting Powders' },
          { value: 'Eau Fraiche' },
          { value: 'Eau de Parfum' },
          { value: 'Eau de Toilette' },
          { value: 'Balms & Salves' },
        ],
      },
      {
        value: 'Hair Care',
        subList: [{ value: 'Shampoos & Conditioner' }],
      },

      {
        value: 'Skin Care',
        subList: [
          {
            value: 'Sun Skin Care',
            list: [
              { value: 'After Sun Skin Care' },
              { value: 'Self-Tanners' },
              { value: 'Skin Sun Protection' },
              { value: 'Tanning Oils & Lotions' },
            ],
          },
          {
            value: 'Lip Care',
            list: [
              { value: 'Lip Balms & Moisturizers' },
              { value: 'Lip Butters Butters' },
              { value: 'Lip Scrubs' },
            ],
          },
          {
            value: 'Eyes',
            list: [
              { value: 'Eye Treatment Creams' },
              { value: 'Eye Treatment Gels' },
              { value: 'Eye Masks' },
            ],
          },
          {
            value: 'Face',
            list: [
              { value: 'Creams & Moisturizers' },
              { value: 'Cleansers' },
              { value: 'Treatments &  Masks' },
            ],
          },
          {
            value: 'Body',
            list: [{ value: 'Cleansers' }, { value: 'Moisturizers' }],
          },
        ],
      },
      {
        value: 'Bath & Bathing Accessories',
        subList: [
          {
            value: 'Bath',
            list: [
              { value: 'Bath Bombs' },
              { value: 'Minerals & Salts' },
              { value: 'Oils' },
            ],
          },
        ],
      },
    ],
  },
  feelings: {
    value: 'Feelings',
    list: [
      { value: 'Aroused' },
      { value: 'Creative' },
      { value: 'Energetic' },
      { value: 'Euphoric' },
      { value: 'Focused' },
      { value: 'Giggly' },
      { value: 'Happy' },
      { value: 'Hungry' },
      { value: 'Relaxed' },
      { value: 'Sleepy' },
      { value: 'Talkative' },
      { value: 'Tingly' },
      { value: 'Uplifted' },
    ],
  },
  flavors: {
    value: '',
    list: [{ value: 'Sweet' }, { value: 'Savory' }, { value: 'Earthy' }],
  },
  aromas: {
    value: '',
    list: [{ value: 'Smokey' }, { value: 'Nutty' }, { value: 'Funky' }],
  },
  helps: {
    value: '',
    list: [{ value: 'Anxiety' }, { value: 'Apetite' }, { value: 'Sleep' }],
  },
  newsCategories: {
    value: 'Categories',
    list: [
      { value: 'Arts' },
      { value: 'Education' },
      { value: 'CBD' },
      { value: 'Strains & Products' },
      { value: 'Business' },
      { value: 'Politics' },
      { value: 'Entertainment' },
      { value: 'Food & Drink' },
      { value: 'Opinion' },
      { value: 'Travel' },
    ],
  },
  pipes: {
    value: 'Pipes',
    list: [
      {
        value: 'Water Pipes',
        subList: [
          {
            value: 'Percolator',
            list: [
              {
                value: 'Tree Percolator',
              },
              {
                value: 'Showerhead Percolator',
              },
              {
                value: 'Honeycomb Percolator',
              },
              {
                value: 'Disc Percolator',
              },
              {
                value: 'Drum Percolator',
              },
              {
                value: 'Inline Percolator',
              },
              {
                value: 'Matrix Percolator',
              },
              {
                value: 'Barrel Percolator',
              },
              {
                value: 'Circular Percolator',
              },
              {
                value: 'Cyclone/Spiral Percolator',
              },
              {
                value: 'Dome Percolator',
              },
              {
                value: 'Cloud Percolator',
              },
              {
                value: 'Egg Percolator',
              },
              {
                value: 'Propellor Percolator',
              },
            ],
          },
          {
            value: 'Gravity',
          },
          {
            value: 'Recycler',
          },
          {
            value: 'Material',
            list: [
              { value: 'Glass' },
              { value: 'Silicone' },
              { value: 'Acrylic' },
              { value: 'Ceramic' },
              { value: 'Bamboo' },
            ],
          },
          {
            value: 'Base',
            list: [
              {
                value: 'Breaker',
              },
              {
                value: 'Straight',
              },
              {
                value: 'Unique',
              },
            ],
          },
        ],
      },

      {
        value: 'Hand Pipes',
        subList: [
          {
            value: 'Spoon',
          },
          {
            value: 'Steamroller',
          },
          {
            value: 'Dugout',
          },
          {
            value: 'One Hitter',
          },
          {
            value: 'Chillum',
          },
          {
            value: 'Sherlock',
          },
          {
            value: 'Stealth',
          },
          {
            value: 'Unique',
          },
          {
            value: 'Material',
            list: [
              {
                value: 'Glass',
              },
              {
                value: 'Stone',
              },
              {
                value: 'Sillicone',
              },
              {
                value: 'Acrylic',
              },
              {
                value: 'Ceramic',
              },
              {
                value: 'Bamboo',
              },
              {
                value: 'Wooden',
              },
            ],
          },
        ],
      },
      {
        value: 'Accessories',
        subList: [
          {
            value: 'Water pipe adapters',
          },
          {
            value: 'Water pipe bowls',
          },
          {
            value: 'Downstream',
          },
          {
            value: 'Ash catcher',
          },
          {
            value: 'Cleaners',
          },
          {
            value: 'Screens & Gauzes',
          },
        ],
      },
    ],
  },
  rigs: {
    value: 'Rigs',
    list: [
      {
        value: 'Percolator',
        subList: [
          { value: 'Showerhead Percolator' },
          { value: 'Honeycomb Percolator' },
          { value: 'Inline Percolator' },
          { value: 'Drum Percolator' },
          { value: 'Disc Percolator' },
          { value: 'Barrel Percolator' },
          { value: 'Cyclone/Spiral Percolator' },
          { value: 'Matrix Percolator' },
          { value: 'Pineapple Percolator' },
          { value: 'Unique Percolator' },
          { value: 'Ball Showerhead Percolator' },
          { value: 'Water Filter Percolator' },
          { value: 'Circular Percolator' },
          { value: 'Donut Percolator' },
          { value: 'Double Helix Percolator' },
          { value: 'Faberge Egg Percolator' },
          { value: 'Spider Web Percolator' },
          { value: 'Sponge Percolator' },
          { value: 'Sprinkler Percolator' },
          { value: 'Stereo Percolator' },
          { value: 'Swiss Percolator' },
          { value: 'Tire Percolator' },
          { value: 'Tree Percolator' },
          { value: 'Turbine Percolator' },
        ],
      },
      {
        value: 'Joint Size',
        subList: [
          { value: '10mm' },
          { value: '14.5mm' },
          { value: '18.8mm' },
          { value: '18.8mm > 14.5mm' },
          { value: '29.2mm > 18.88mm' },
        ],
      },
      {
        value: 'Hybrid',
      },
      {
        value: 'Electric',
        subList: [
          {
            value: '8 Hole Percolation',
          },
          {
            value: 'Diffused Downstem',
          },
          {
            value: 'Disc Percolator',
          },
          {
            value: 'Dual Disc Percolator',
          },
        ],
      },
      {
        value: 'Accessories',
        subList: [
          { value: 'Oil + Concentrate Storage' },
          { value: 'Torches' },
          { value: 'Carb Caps' },
          { value: 'Dabber/Concentrate Tool' },
          { value: 'Dab Nails', list: [{ value: 'E-Nails' }] },
          { value: 'Dab Pads' },
          { value: 'Dab Straws' },
          { value: 'Dishes and Dabber Sets' },
          { value: 'Dab Bangers' },
          { value: 'Vapor Dome' },
          {
            value: 'Dab Collectors',
            list: [
              { value: '1 Layer Multi Perc Pipe' },
              { value: 'Built In Water Percolator' },
              { value: 'Honeycomb Percolator' },
              { value: 'Diffused Down Stem' },
              { value: 'Drum Percolator' },
              { value: 'Disc Percolator' },
              { value: 'Donut Percolator' },
              { value: 'Domed Showerhead Percolator' },
              { value: 'Barrel Percolator' },
              { value: 'Helix Percolator' },
              { value: 'Tree Percolator' },
              { value: 'Pineapple Percolator' },
              { value: 'Unique Percolator' },
            ],
          },
        ],
      },
      {
        value: 'Material',
        subList: [{ value: 'Glass' }, { value: 'Silicone' }],
      },
    ],
  },
  vapePens: {
    value: 'Vape Pens',
    list: [
      { value: 'Dry Herb' },
      { value: 'Cartridges' },
      { value: 'Juice & Thin Oils' },
      { value: 'Hybrid' },
      { value: 'Desktop' },
      {
        value: 'Accessories',
        subList: [
          { value: 'Batteries' },
          { value: 'Tanks' },
          { value: 'Charger' },
          { value: 'Storage & Cases' },
        ],
      },
    ],
  },
  flower: {
    value: 'Flower',
    list: [
      { value: 'Pre Roll' },
      { value: 'Infused Flower' },
      { value: 'Shake' },
    ],
  },
  rollingPapers: {
    value: 'Rolling Papers',
    list: [
      { value: 'Hemp' },
      { value: 'Flavored' },
      { value: 'Pre-Rolled Cones' },
      {
        value: 'Accessories',
        subList: [
          { value: 'Filters & Tips' },
          { value: 'Joint Rolling Machines' },
          { value: 'Rolling Tray' },
          { value: 'Joint Holders' },
        ],
      },
    ],
  },
  herbGrinders: {
    value: 'Herb Grinders',
    list: [
      { value: 'Crank' },
      { value: 'Electric' },
      { value: 'Grater' },
      {
        value: 'Material',
        subList: [
          { value: 'Metal' },
          { value: 'Wooden' },
          { value: 'Acrylic' },
          { value: 'Stone' },
        ],
      },
    ],
  },
  misc: {
    value: 'Miscellaneous',
    list: [{ value: 'Ash Tray' }],
  },

  arts: {
    value: 'Arts & Entertainment',
    list: [
      {
        value: 'Farms',
        subList: [
          { value: 'Attraction Farms' },
          { value: 'Pick Your Own Farms' },
          { value: 'Ranches' },
        ],
      },
      { value: 'Festivals' },
      { value: 'Museums' },
      { value: 'Wineries', subList: [{ value: 'Wine Tasting Room' }] },
    ],
  },

  beauty: {
    value: 'Beauty & Spas',
    list: [
      { value: 'Cosmetics & Beauty Supply' },
      { value: 'Day Spas' },
      { value: 'Massage' },
    ],
  },

  education: {
    value: 'Education',
    list: [
      { value: 'Art Classes' },
      { value: 'Colleges and Universities' },
      { value: 'Educational Sertvices' },
      { value: 'Private Schools' },
    ],
  },

  event: {
    value: 'Event Planning & Services',
    list: [
      { value: 'Bartenders' },
      { value: 'Budtenders' },
      { value: 'Caterers' },
      { value: 'Floral Designers' },
      {
        value: 'Hotels',
        subList: [
          { value: 'Mountain Huts ' },
          { value: 'Residences' },
          { value: 'Rest Stops' },
        ],
      },
      { value: 'Party & Event Planning ' },
      { value: 'Party Bus Rentals' },
      { value: 'Photo Booth Rentals' },
      {
        value: 'Photographers',
        subList: [
          { value: 'Event Photography' },
          { value: 'Session Photography' },
        ],
      },
      { value: 'Wedding Planning' },
    ],
  },
  amenities: {
    value: 'Amenities',
    list: [
      { value: 'Accessible' },
      { value: 'Onsite Security' },
      { value: 'Lab Tested' },
      { value: 'Social Equity' },
      { value: 'ATM' },
      { value: 'Best Of' },
      { value: 'Brand Verified' },
      { value: 'Security' },
      { value: 'Sale' },
      { value: 'Delivery' },
      { value: 'Doctors' },
      { value: 'CBD' },
    ],
  },
  products: {
    value: 'Products',
    list: [
      { value: 'Vape Pens' },
      { value: 'Flower' },
      { value: 'Concentrates' },
      { value: 'Edibles' },
      { value: 'CB' },
      { value: 'Gear' },
      { value: 'Topicals' },
      { value: 'Pre Roll' },
    ],
  },
  license: {
    value: 'License Type',
    list: [{ value: 'All' }, { value: 'Medical' }, { value: 'Recreational' }],
  },
  order: {
    value: 'Order',
    list: [
      { value: 'Order Online' },
      { value: 'Curbside Pickup' },
      { value: 'Delivery' },
    ],
  },
};
