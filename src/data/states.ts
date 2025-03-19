
export interface State {
  name: string;
  path: string;
  description: string;
  image: string;
  thumbnail: string;
  famous: string;
  isUT: boolean;
  capital: string;
  tags: string[];
  places: {
    name: string;
    image: string;
    description: string;
  }[];
  cuisine: {
    name: string;
    description: string;
    image: string;
  }[];
  culture: {
    art: string;
    dance: string;
    festivals: string[];
    handicrafts: string[];
  };
  history: {
    ancient: string;
    medieval: string;
    modern: string;
    details: {
      period: string;
      year: string;
      description: string;
    }[];
  };
  news: {
    title: string;
    date: string;
    summary: string;
  }[];
}

export const states: State[] = [
  {
    name: "Rajasthan",
    path: "rajasthan",
    image: "https://source.unsplash.com/random/800x600/?rajasthan-palace",
    description: "Land of Kings, known for its majestic palaces, vibrant culture, and vast Thar Desert.",
    capital: "Jaipur",
    thumbnail: "https://source.unsplash.com/random/100x100/?rajasthan",
    famous: "Desert landscapes and royal palaces",
    isUT: false,
    tags: ["Palaces", "Desert", "Culture", "North India"],
    places: [
      {
        name: "Jaipur",
        image: "https://source.unsplash.com/random/800x600/?jaipur",
        description: "The Pink City with stunning architecture and vibrant markets."
      },
      {
        name: "Udaipur",
        image: "https://source.unsplash.com/random/800x600/?udaipur",
        description: "The City of Lakes with beautiful palaces and romantic setting."
      }
    ],
    cuisine: [
      {
        name: "Dal Baati Churma",
        image: "https://source.unsplash.com/random/800x600/?indian-food",
        description: "Traditional Rajasthani dish with baked wheat balls, lentils, and sweet churma."
      }
    ],
    culture: {
      art: "Rajasthan is known for miniature paintings, pottery, and block printing textiles.",
      dance: "Popular dance forms include Ghoomar, Kalbeliya, and Bhavai.",
      festivals: ["Pushkar Camel Fair", "Desert Festival", "Gangaur"],
      handicrafts: ["Blue Pottery", "Bandhani", "Camel Leather Work"]
    },
    history: {
      ancient: "Rajasthan has a rich history dating back to the Indus Valley Civilization. It was home to the Rajput warriors who built magnificent forts and palaces.",
      medieval: "During the medieval period, Rajasthan saw numerous battles between Rajput kingdoms and Mughal invaders, creating a rich tapestry of cultural influences.",
      modern: "In the modern era, Rajasthan's princely states integrated into the Indian Union after independence, preserving their cultural heritage.",
      details: [
        {
          year: "700-1200 CE",
          period: "Rajput",
          description: "Rise of Rajput kingdoms and building of major fortresses."
        },
        {
          year: "1200-1700 CE",
          period: "Medieval",
          description: "Conflicts between Rajput kingdoms and Mughal Empire."
        }
      ]
    },
    news: [
      {
        title: "Tourism Boost in Rajasthan",
        date: "June 15, 2023",
        summary: "Rajasthan sees 30% increase in international tourists after pandemic recovery."
      },
      {
        title: "New Heritage Conservation Project",
        date: "May 10, 2023",
        summary: "Government launches initiative to restore ancient stepwells across the state."
      }
    ]
  },
  {
    name: "Kerala",
    path: "kerala",
    image: "https://source.unsplash.com/random/800x600/?kerala-backwaters",
    description: "God's Own Country, famous for its serene backwaters, lush greenery, and Ayurvedic traditions.",
    capital: "Thiruvananthapuram",
    thumbnail: "https://source.unsplash.com/random/100x100/?kerala",
    famous: "Backwaters and Ayurvedic wellness",
    isUT: false,
    tags: ["Backwaters", "Nature", "Ayurveda", "South India"],
    places: [
      {
        name: "Alleppey",
        image: "https://source.unsplash.com/random/800x600/?alleppey",
        description: "Known as the 'Venice of the East', famous for houseboat cruises on backwaters."
      },
      {
        name: "Munnar",
        image: "https://source.unsplash.com/random/800x600/?munnar",
        description: "Hill station known for vast tea plantations and breathtaking scenery."
      }
    ],
    cuisine: [
      {
        name: "Appam with Stew",
        image: "https://source.unsplash.com/random/800x600/?kerala-food",
        description: "Lacy, bowl-shaped pancake made with fermented rice batter and coconut milk."
      }
    ],
    culture: {
      art: "Kerala has a rich tradition of Kathakali dance drama, mural paintings, and traditional musical instruments.",
      dance: "Classical dance forms include Kathakali, Mohiniyattam, and Koodiyattam.",
      festivals: ["Onam", "Thrissur Pooram", "Vishu"],
      handicrafts: ["Bell Metal Crafts", "Coconut Shell Crafts", "Coir Products"]
    },
    history: {
      ancient: "Kerala has a history dating back to 3000 BCE, with influences from Arab, Chinese, and European traders.",
      medieval: "The medieval period saw the rise of various kingdoms and maritime trade connections with the world.",
      modern: "Modern Kerala was formed in 1956 and is known for its progressive social policies.",
      details: [
        {
          year: "300 BCE-1500 CE",
          period: "Ancient Trade",
          description: "Kerala was a major spice trading center with connections to Romans, Arabs, and Chinese."
        },
        {
          year: "1500-1800 CE",
          period: "Colonial Era",
          description: "Period of Portuguese, Dutch, and British colonial influence."
        }
      ]
    },
    news: [
      {
        title: "Kerala's Sustainable Tourism Initiative",
        date: "July 5, 2023",
        summary: "New eco-friendly tourism policies recognized by World Travel Awards."
      },
      {
        title: "Recovery After Floods",
        date: "March 12, 2023",
        summary: "Tourism sector shows resilience with visitor numbers exceeding pre-flood levels."
      }
    ]
  },
  {
    name: "Himachal Pradesh",
    path: "himachal-pradesh",
    image: "https://source.unsplash.com/random/800x600/?himachal-mountains",
    description: "Land of Snow, offering breathtaking mountain views, adventure sports, and peaceful monasteries.",
    capital: "Shimla",
    thumbnail: "https://source.unsplash.com/random/100x100/?himachal",
    famous: "Himalayan landscapes and adventure tourism",
    isUT: false,
    tags: ["Mountains", "Adventure", "Nature", "North India"],
    places: [
      {
        name: "Shimla",
        image: "https://source.unsplash.com/random/800x600/?shimla",
        description: "Former summer capital of British India with colonial architecture and mall road."
      },
      {
        name: "Manali",
        image: "https://source.unsplash.com/random/800x600/?manali",
        description: "Popular hill station with stunning views of the Himalayas and adventure sports."
      }
    ],
    cuisine: [
      {
        name: "Dham",
        image: "https://source.unsplash.com/random/800x600/?indian-thali",
        description: "Traditional festive meal served on leaf plates with rice, lentils, and yogurt preparations."
      }
    ],
    culture: {
      art: "Himachal is known for Pahari miniature paintings, wood carving, and Kangra art style.",
      dance: "Folk dances include Kullu Nati, Chamba, and Kinnauri Nati.",
      festivals: ["Kullu Dussehra", "Shimla Winter Carnival", "Mandi Shivratri"],
      handicrafts: ["Kullu Shawls", "Himachali Caps", "Wood Carvings"]
    },
    history: {
      ancient: "Himachal Pradesh was inhabited by tribal communities and has many ancient temples dating back to early Hindu period.",
      medieval: "Various hill states and kingdoms ruled different parts of the region before British colonization.",
      modern: "Became a full state of India in 1971 and has developed into a major tourism destination.",
      details: [
        {
          year: "1000-1800 CE",
          period: "Hill Kingdoms",
          description: "Era of small princely states like Kangra, Kullu, and Chamba."
        },
        {
          year: "1800-1947 CE",
          period: "British Rule",
          description: "British established hill stations and introduced modern administration."
        }
      ]
    },
    news: [
      {
        title: "New Ecotourism Projects",
        date: "April 22, 2023",
        summary: "Himachal launches six new ecotourism destinations to promote sustainable mountain tourism."
      },
      {
        title: "Record Snowfall Attracts Visitors",
        date: "January 8, 2023",
        summary: "Winter tourism breaks records as heavy snowfall draws visitors to Himachal hill stations."
      }
    ]
  },
  {
    name: "Gujarat",
    path: "gujarat",
    image: "https://source.unsplash.com/random/800x600/?gujarat-culture",
    description: "Known for its rich cultural heritage, vibrant festivals, and the unique Rann of Kutch.",
    capital: "Gandhinagar",
    thumbnail: "https://source.unsplash.com/random/100x100/?gujarat",
    famous: "White desert of Rann of Kutch and business enterprise",
    isUT: false,
    tags: ["Culture", "Heritage", "Festivals", "West India"],
    places: [
      {
        name: "Rann of Kutch",
        image: "https://source.unsplash.com/random/800x600/?kutch",
        description: "Vast white salt desert that transforms into a vibrant cultural hub during Rann Utsav."
      },
      {
        name: "Statue of Unity",
        image: "https://source.unsplash.com/random/800x600/?statue-of-unity",
        description: "World's tallest statue honoring Sardar Vallabhbhai Patel with panoramic views."
      }
    ],
    cuisine: [
      {
        name: "Dhokla",
        image: "https://source.unsplash.com/random/800x600/?dhokla",
        description: "Savory steamed cake made from fermented rice and split chickpea batter."
      }
    ],
    culture: {
      art: "Gujarat is famous for Bandhani textile art, embroidery styles like Kutch work, and vibrant folk art.",
      dance: "Traditional dance forms include Garba, Dandiya Raas, and Tippani dance.",
      festivals: ["Navratri", "Uttarayan", "Rann Utsav"],
      handicrafts: ["Bandhani Textiles", "Patola Sarees", "Kutch Embroidery"]
    },
    history: {
      ancient: "Gujarat has been home to ancient Indus Valley Civilization sites and important trading ports.",
      medieval: "The medieval period saw the rise of local dynasties and maritime trade with the Middle East and Africa.",
      modern: "Modern Gujarat has emerged as one of India's most industrialized and economically prosperous states.",
      details: [
        {
          year: "2500-1500 BCE",
          period: "Indus Valley",
          description: "Lothal and Dholavira were important Harappan sites in Gujarat."
        },
        {
          year: "1300-1700 CE",
          period: "Sultanate Era",
          description: "Gujarat was ruled by the Sultanate and later became a Mughal province."
        }
      ]
    },
    news: [
      {
        title: "Gujarat's Renewable Energy Milestone",
        date: "May 30, 2023",
        summary: "State achieves 50% of its energy needs from renewable sources, setting national record."
      },
      {
        title: "Rann Utsav Expansion",
        date: "November 15, 2023",
        summary: "Annual desert festival extends duration and adds new cultural experiences for tourists."
      }
    ]
  },
  {
    name: "Tamil Nadu",
    path: "tamil-nadu",
    image: "https://source.unsplash.com/random/800x600/?tamil-nadu-temple",
    description: "Rich in ancient temples, classical arts, and traditional Dravidian culture.",
    capital: "Chennai",
    thumbnail: "https://source.unsplash.com/random/100x100/?tamil-nadu",
    famous: "Dravidian temples and classical dance forms",
    isUT: false,
    tags: ["Temples", "Art", "Culture", "South India"],
    places: [
      {
        name: "Meenakshi Temple",
        image: "https://source.unsplash.com/random/800x600/?meenakshi-temple",
        description: "Ancient temple with towering gopurams and thousands of colorful sculptures."
      },
      {
        name: "Marina Beach",
        image: "https://source.unsplash.com/random/800x600/?marina-beach",
        description: "Second longest urban beach in the world with historical monuments and sea-side promenade."
      }
    ],
    cuisine: [
      {
        name: "Dosa",
        image: "https://source.unsplash.com/random/800x600/?dosa",
        description: "Crispy fermented crepe made from rice batter and black lentils, typically served with chutney."
      }
    ],
    culture: {
      art: "Tamil Nadu is renowned for Bharatanatyam dance, Tanjore paintings, and bronze sculptures.",
      dance: "Classical dance forms include Bharatanatyam, Koothu, and Karakattam.",
      festivals: ["Pongal", "Thiruvalluvar Day", "Deepavali"],
      handicrafts: ["Bronze Casting", "Tanjore Paintings", "Stone Carvings"]
    },
    history: {
      ancient: "Tamil Nadu is home to one of the world's oldest classical civilizations, with evidence of the Sangam period.",
      medieval: "The medieval era saw powerful dynasties like Cholas, Pandyas, and Pallavas who built magnificent temples.",
      modern: "The state has maintained its distinct cultural identity while becoming an industrial and technological hub.",
      details: [
        {
          year: "300 BCE-300 CE",
          period: "Sangam Era",
          description: "Golden age of Tamil literature and culture with flourishing trade."
        },
        {
          year: "850-1200 CE",
          period: "Chola Empire",
          description: "Era of extensive temple building and naval expeditions across Southeast Asia."
        }
      ]
    },
    news: [
      {
        title: "UNESCO Recognition for Ancient Temples",
        date: "September 8, 2023",
        summary: "Three more Tamil Nadu temples added to the World Heritage Site tentative list."
      },
      {
        title: "Classical Arts Festival",
        date: "December 1, 2023",
        summary: "Chennai's annual Margazhi festival attracts global audience with over 1,000 performances."
      }
    ]
  }
];
