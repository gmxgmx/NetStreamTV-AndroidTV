// Mock data for NetStream TV (Android TV optimized)

export const featuredContent = {
  id: 1,
  title: "Breaking Bad",
  description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
  backdrop: "https://images.unsplash.com/photo-1489599162871-75d4d7e94a11?w=1920&h=1080&fit=crop",
  genre: "Crime Drama",
  year: 2008,
  rating: "TV-MA",
  duration: "49 min",
  type: "series",
  video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
};

export const liveChannels = [
  {
    id: 1,
    name: "CNN International",
    logo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=200&fit=crop",
    category: "News",
    stream_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    epg: {
      current: "World News Today",
      next: "Business Report",
      time: "14:00 - 15:00"
    },
    number: 1
  },
  {
    id: 2,
    name: "ESPN Sports",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop",
    category: "Sports",
    stream_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    epg: {
      current: "Football Highlights",
      next: "Live Match",
      time: "15:00 - 17:00"
    },
    number: 2
  },
  {
    id: 3,
    name: "Discovery Channel",
    logo: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=200&fit=crop",
    category: "Documentary",
    stream_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    epg: {
      current: "Wild Life Safari",
      next: "Ocean Mysteries",
      time: "16:00 - 17:00"
    },
    number: 3
  },
  {
    id: 4,
    name: "MTV Music",
    logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    category: "Music",
    stream_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    epg: {
      current: "Top 40 Countdown",
      next: "Music Videos",
      time: "17:00 - 18:00"
    },
    number: 4
  },
  {
    id: 5,
    name: "Comedy Central",
    logo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
    category: "Entertainment",
    stream_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    epg: {
      current: "Stand-up Comedy",
      next: "Comedy Show",
      time: "18:00 - 19:00"
    },
    number: 5
  }
];

export const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    image: "https://images.unsplash.com/photo-1478720568477-b0ac077fe8e8?w=400&h=600&fit=crop",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "152 min",
    description: "Batman raises the stakes in his war on crime with the joker wreaking havoc.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 2,
    title: "Inception",
    image: "https://images.unsplash.com/photo-1489599162871-75d4d7e94a11?w=400&h=600&fit=crop",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "148 min",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 3,
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    duration: "169 min",
    description: "A team of explorers travel through a wormhole in space.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 4,
    title: "The Matrix",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    year: 1999,
    genre: "Action",
    rating: 8.7,
    duration: "136 min",
    description: "A computer hacker learns about the true nature of reality.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    year: 1994,
    genre: "Crime",
    rating: 8.9,
    duration: "154 min",
    description: "The lives of two mob hitmen, a boxer, and others intertwine.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  }
];

export const tvShows = [
  {
    id: 1,
    title: "Stranger Things",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    year: 2016,
    genre: "Horror",
    rating: 8.7,
    seasons: 4,
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 2,
    title: "The Crown",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop",
    year: 2016,
    genre: "Drama",
    rating: 8.6,
    seasons: 6,
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 3,
    title: "Money Heist",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    year: 2017,
    genre: "Crime",
    rating: 8.3,
    seasons: 5,
    description: "An unusual group of robbers attempt to carry out the most perfect robbery.",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  }
];

export const categories = [
  { id: 1, name: "Home", key: "all" },
  { id: 2, name: "Movies", key: "movies" },
  { id: 3, name: "TV Shows", key: "tvshows" },
  { id: 4, name: "Live TV", key: "live" },
  { id: 5, name: "News", key: "news" },
  { id: 6, name: "Sports", key: "sports" }
];

export const screenModes = [
  { id: 1, name: "Fit Screen", key: "fit", description: "Scale to fit without cropping" },
  { id: 2, name: "Fill Screen", key: "fill", description: "Scale to fill, may crop edges" },
  { id: 3, name: "Stretch", key: "stretch", description: "Stretch to exact screen size" },
  { id: 4, name: "Original", key: "original", description: "Keep original aspect ratio" }
];