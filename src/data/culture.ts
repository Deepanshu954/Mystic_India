
export interface CulturalItem {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  tags?: string[];
}

export const culturalData: CulturalItem[] = [
  {
    id: 1,
    title: "Classical Dance Forms",
    description: "India's eight classical dance forms including Bharatanatyam, Kathakali, and Odissi are recognized for their expressiveness and deep cultural significance.",
    fullDescription: "India's eight classical dance forms are renowned worldwide for their grace, technical precision, and rich storytelling heritage. Each dance form represents the cultural traditions of different regions across India. Bharatanatyam from Tamil Nadu features geometric positions and rhythmic footwork. Kathakali from Kerala combines elaborate costumes with facial expressions to depict epic stories. Odissi from Odisha emphasizes fluid upper body movements and sculptural poses. These ancient art forms have been preserved for centuries through the guru-shishya tradition and continue to evolve while maintaining their classical roots and spiritual significance.",
    image: "https://source.unsplash.com/random/800x600/?indian-dance",
    tags: ["Performance", "Traditional", "Heritage"]
  },
  {
    id: 2,
    title: "Traditional Music",
    description: "From classical Carnatic and Hindustani traditions to folk music, India's musical heritage spans millennia with diverse instruments and vocal styles.",
    fullDescription: "India's rich musical traditions have evolved over thousands of years, creating a tapestry of sounds that vary dramatically across regions. The two primary classical traditions—Hindustani from the north and Carnatic from the south—feature elaborate raga systems that connect particular melodies with specific times, seasons, and emotions. Traditional instruments like the sitar, tabla, veena, and sarangi produce distinctive sounds that have influenced global music. Beyond classical forms, folk music traditions thrive in every state, with regional instruments, vocal techniques, and rhythmic patterns that preserve local cultural identities while contributing to India's overall musical heritage.",
    image: "https://source.unsplash.com/random/800x600/?indian-music",
    tags: ["Performance", "Instruments", "Vocal"]
  },
  {
    id: 3,
    title: "Textile Traditions",
    description: "India's textile heritage includes techniques like Bandhani, Ikat, and Banarasi weaving, showcasing intricate craftsmanship and regional distinctions.",
    fullDescription: "India's textile traditions represent one of the world's oldest and most diverse craft heritages, with techniques that have been refined over millennia. Each region has developed distinctive styles: Gujarat's Bandhani tie-dye creates intricate patterns through thousands of tiny knots; Andhra Pradesh's Ikat involves precisely dyeing threads before weaving them into blurred-edge designs; Varanasi's legendary Banarasi brocades incorporate gold and silver threads into luxurious silk. These techniques are more than decorative—they convey cultural identity, social status, and religious symbolism. Modern efforts to preserve these traditions focus on sustainable practices and fair compensation for artisans while adapting designs for contemporary markets.",
    image: "https://source.unsplash.com/random/800x600/?indian-textiles",
    tags: ["Craft", "Handloom", "Heritage"]
  },
  {
    id: 4,
    title: "Religious Festivals",
    description: "India's vibrant festivals like Diwali, Holi, and Durga Puja celebrate spiritual traditions with elaborate rituals, music, dance, and community participation.",
    fullDescription: "India's religious festivals represent the extraordinary diversity of its spiritual traditions, with celebrations that transform cities and villages into spectacular showcases of devotion, art, and community spirit. Major festivals like Diwali illuminate homes with millions of lamps celebrating the triumph of light over darkness; Holi erupts in rainbow clouds of colored powders welcoming spring; Durga Puja converts neighborhoods into elaborate temporary art installations honoring the goddess. These celebrations blend ancient rituals with regional artistic traditions, creating immersive experiences where religion, performing arts, visual aesthetics, and culinary traditions converge to strengthen community bonds and preserve cultural heritage across generations.",
    image: "https://source.unsplash.com/random/800x600/?indian-festival",
    tags: ["Celebration", "Spiritual", "Community"]
  },
  {
    id: 5,
    title: "Classical Art Forms",
    description: "From Tanjore paintings to Madhubani art, India's visual art traditions feature distinct styles, materials, and symbolic languages across different regions.",
    fullDescription: "India's classical art forms represent continuous artistic traditions that have evolved over centuries while maintaining distinctive regional characteristics and symbolic languages. South India's Tanjore paintings feature gold leaf embellishments and gemstone inlays depicting divine figures against richly colored backgrounds. Bihar's Madhubani paintings use geometric patterns and nature motifs created with fingers, twigs, and natural dyes. Rajasthan's miniature paintings demonstrate extraordinary detail on tiny surfaces, often illustrating court life or mythological scenes. These traditions aren't mere decorative arts—they serve as visual documentation of cultural narratives, religious philosophies, and historical events, encoded in complex symbolic systems that reward deeper study and appreciation.",
    image: "https://source.unsplash.com/random/800x600/?indian-art",
    tags: ["Visual Art", "Traditional", "Heritage"]
  },
  {
    id: 6,
    title: "Architectural Marvels",
    description: "India's architectural heritage spans ancient temple complexes, Islamic monuments, colonial structures, and vernacular building traditions adapted to diverse climates.",
    fullDescription: "India's architectural heritage represents one of the world's most diverse and continuous building traditions, with structures that have influenced global design for millennia. The subcontinent's temple architecture evolved distinct regional styles: North India's Nagara towers reach skyward with curved spires; South India's Dravidian temples expand horizontally with massive gateways and pillared halls; the Indo-Islamic synthesis produced marvels like the Taj Mahal combining Persian aesthetics with local craftsmanship. Beyond monumental structures, vernacular traditions developed sophisticated responses to local climates—like Kerala's wooden architecture optimized for monsoon conditions or Rajasthan's haveli courtyards designed for desert cooling. These building traditions incorporated sophisticated mathematical principles, astronomical alignments, and acoustic engineering alongside their artistic and spiritual dimensions.",
    image: "https://source.unsplash.com/random/800x600/?indian-architecture",
    tags: ["Heritage", "Monuments", "Design"]
  }
];
