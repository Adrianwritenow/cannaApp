import { Filter } from "../interfaces/filter";

export const Filters: Record<string, Filter> = {
  strains: {
    value: "Strains",
    list: [{ value: "Indica" }, { value: "Sativa" }, { value: "Hybrid" }],
  },
  reviews: {
    value: "Reviews",
    list: [
      { value: "Most Reviewed" },
      { value: "Top Rated" },
      { value: "Lowest Rated" },
    ],
  },
  type: {
    value: "Type",
    list: [
      { value: "Cartridge" },
      { value: "Flower" },
      { value: "Clothing" },
      { value: "Edible" },
    ],
  },
  sort: {
    value: "Sort By",
    list: [
      { value: "Relevance" },
      { value: "Price: Low to High" },
      { value: "Price: Hight to Low" },
    ],
  },
  price: {
    value: "Price",
    list: [{ value: "$" }, { value: "$$" }, { value: "$$$" }],
  },
  concentrates: {
    value: "Concentrates",
    list: [
      { value: "Budder" },
      { value: "Crumble" },
      { value: "Crystalline" },
      { value: "Ingestibles" },
      { value: "Solvent" },
      { value: "Solventless" },
      { value: "Terpenes" },
    ],
  },
  edibles: {
    value: "Edibles",
    list: [
      {
        value: "Candy",
        subList: [
          { value: "Brittle, Caramel & Toffee" },
          { value: "Candied & Chocolate Covered Snacks" },
          { value: "Chocolate & Fudge" },
          { value: "Candy & Chocolate Bars" },
          { value: "Chewing Gum & Bubblegum" },
          { value: "Ginger Candy" },
          { value: "Hard Candy & Lollipops" },
          { value: "Halva" },
          { value: "Jelly Beans & Gummy Candy" },
          { value: "Marshmallows" },
          { value: "Mints" },
          { value: "Sour Candy" },
          { value: "Wagashi" },
        ],
      },
      {
        value: "Beverages",
        subList: [
          { value: "Soft Drinks" },
          { value: "Energy" },
          { value: "Powdered Drink Mixes & Flavorings" },
          { value: "Juices" },
          {
            value: "Drinking Water",
            list: [
              { value: "Flavored Drinking Water" },
              { value: "Seltzer Drinking Water" },
              { value: "Sparkling Drinking Water" },
            ],
          },
        ],
      },
      {
        value: "Syrups, Sugars & Sweeteners",
        subList: [
          { value: "Agave Nectar & Syrup" },
          { value: "Honey" },
          { value: "Maple Syrup" },
          { value: "Molasses" },
          { value: "Simple Syrups" },
          { value: "Sugar Substitutes" },
          { value: "Sugars" },
        ],
      },
    ],
  },
  topicals: {
    value: "Topicals",
    list: [
      {
        value: "Fragrances",
        subList: [
          { value: "Body Sprays" },
          { value: "Cologne" },
          { value: "Dusting Powders" },
          { value: "Eau Fraiche" },
          { value: "Eau de Parfum" },
          { value: "Eau de Toilette" },
        ],
      },
      {
        value: "Hair Care",
        subList: [{ value: "Shampoos & Conditioner" }],
      },

      {
        value: "Skin Care",
        subList: [
          {
            value: "Sun Skin Care",
            list: [
              { value: "After Sun Skin Care" },
              { value: "Self-Tanners" },
              { value: "Skin Sun Protection" },
              { value: "Tanning Oils & Lotions" },
            ],
          },
          {
            value: "Lip Care",
            list: [
              { value: "Lip Balms & Moisturizers" },
              { value: "Lip Butters Butters" },
              { value: "Lip Scrubs" },
            ],
          },
          {
            value: "Eyes",
            list: [
              { value: "Eye Treatment Creams" },
              { value: "Eye Treatment Gels" },
              { value: "Eye Masks" },
            ],
          },
          {
            value: "Face",
            list: [
              { value: "Creams & Moisturizers" },
              { value: "Cleansers" },
              { value: "Treatments &  Masks" },
            ],
          },
          {
            value: "Body",
            list: [{ value: "Cleansers" }, { value: "Moisturizers" }],
          },
        ],
      },
      {
        value: "Bath & Bathing Accessories",
        subList: [
          {
            value: "Bath",
            list: [
              { value: "Bath Bombs" },
              { value: "Minerals & Salts" },
              { value: "Oils" },
            ],
          },
        ],
      },
    ],
  },
  feelings: {
    value: "Feelings",
    list: [
      { value: "Aroused" },
      { value: "Creative" },
      { value: "Energetic" },
      { value: "Euphoric" },
      { value: "Focused" },
      { value: "Giggly" },
      { value: "Happy" },
      { value: "Hungry" },
      { value: "Relaxed" },
      { value: "Sleepy" },
      { value: "Talkative" },
      { value: "Tingly" },
      { value: "Uplifted" },
    ],
  },
  flavors: {
    value: "",
    list: [{ value: "Sweet" }, { value: "Savory" }, { value: "Earthy" }],
  },
  armoas: {
    value: "",
    list: [{ value: "Smokey" }, { value: "Nutty" }, { value: "Funky" }],
  },
  helps: {
    value: "",
    list: [{ value: "Anxiety" }, { value: "Apetite" }, { value: "Sleep" }],
  },
};
