export interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content: string;
    featured?: boolean;
  }
  
  export const BLOGS: Blog[] = [
    {
      id: 1,
      title: "10 Best Restaurants in Paris",
      category: "Where to Eat",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
      excerpt: "Discover the finest dining experiences in the City of Light",
      content: "<h2>Top Parisian Dining</h2><p>Paris offers an incredible culinary journey with restaurants ranging from traditional bistros to modern gastronomic temples. Each establishment tells a story through its cuisine, blending centuries of tradition with contemporary innovation.</p><p>From the classic French onion soup to the most exquisite patisserie, these restaurants represent the pinnacle of French gastronomy.</p>"
    },
    {
      id: 2,
      title: "Hidden Gems in Tokyo",
      category: "Places to Stay",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      excerpt: "Explore unique accommodations off the beaten path",
      content: "<h2>Tokyo's Best Kept Secrets</h2><p>Beyond the usual tourist spots, Tokyo hides remarkable accommodations that offer authentic Japanese experiences. These hidden gems provide a window into local culture and hospitality.</p>"
    },
    {
      id: 3,
      title: "Bucket List Travel: Top 50 Must-Visit Places in the World",
      category: "What to Do",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop",
      excerpt: "What's on your travel bucket list? If you're like most travelers, you dream of...",
      content: "<h2>The Ultimate Travel Bucket List</h2><p>From the ancient wonders of the world to modern marvels, this comprehensive guide covers the most breathtaking destinations every traveler should experience at least once in their lifetime.</p><p>Each location has been carefully selected based on its cultural significance, natural beauty, and unique experiences it offers to visitors.</p>",
      featured: true
    },
    {
      id: 4,
      title: "Beach Paradise in Maldives",
      category: "Where to Go",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop",
      excerpt: "Crystal clear waters and pristine beaches await",
      content: "<h2>Maldives Paradise</h2><p>The ultimate beach destination featuring overwater bungalows, coral reefs, and turquoise lagoons. The Maldives represents tropical paradise at its finest.</p>"
    },
    {
      id: 5,
      title: "Adventure Activities in Cape Town",
      category: "What to Do",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop",
      excerpt: "Thrilling experiences in South Africa's gem",
      content: "<h2>Cape Town Adventures</h2><p>From shark diving to mountain hiking, Cape Town offers adrenaline-pumping activities against stunning backdrops. Experience the wild side of South Africa.</p>"
    },
    {
      id: 6,
      title: "Street Food Guide: Mexico City",
      category: "Where to Eat",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
      excerpt: "Authentic flavors from local vendors",
      content: "<h2>Mexico City Street Food</h2><p>The best tacos, tortas, and traditional Mexican dishes found in the bustling streets of Mexico City. A culinary adventure through authentic flavors.</p>"
    }
  ];
  