// shared/websitesConfig.js
export const websiteCategories = {
  social: 'Social Media',
  professional: 'Professional',
  blogging: 'Blogging',
  video: 'Video',
  gaming: 'Gaming',
  development: 'Software & Development',
  design: 'Design',
  photography: 'Photography',
  music: 'Music',
  art: 'Art',
  ecommerce: 'E-commerce',
  crowdfunding: 'Crowdfunding',
  books: 'Books & Reading',
  knowledge: 'Knowledge Sharing',
  reviews: 'Reviews & Ratings',
  tech: 'Technology',
  startup: 'Startups',
  fitness: 'Fitness & Health',
  messaging: 'Messaging',
  dataScience: 'Data Science',
  creative: 'Creative',
  education: 'Education',
  travel: 'Travel & Hospitality',
  finance: 'Finance & Cryptocurrency',
  portfolio: 'Portfolio',
  networking: 'Networking',
}

export const getWebsitesByCategory = (category) => {
  return websites.filter((website) => website.categories.includes(category))
}

export const websites = [
  {
    name: 'Twitter',
    url: 'https://x.com/{username}',
    logo: '/logos/twitter.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (
        response.status === 200 &&
        response.data.includes("This account doesn't exist")
      )
        return true
      return null
    },
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/{username}/',
    logo: '/logos/instagram.svg',
    categories: ['social'],
    unavailableIndicators: ['@'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (
        response.status === 200 &&
        response.data.includes("Sorry, this page isn't available.")
      )
        return false
      return null
    },
  },
  {
    name: 'GitHub',
    url: 'https://github.com/{username}',
    logo: '/logos/github.svg',
    categories: ['development'],
    unavailableIndicators: ['@'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200 && response.data.includes(`@${username}`))
        return false
      return null
    },
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/{username}',
    logo: '/logos/facebook.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (
        response.status === 200 &&
        response.data.includes("This content isn't available at the moment")
      )
        return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/{username}',
    logo: '/logos/linkedin.svg',
    categories: ['professional'],
    checkAvailability: (response, username) => {
      if (
        response.status === 404 ||
        (response.status === 200 && response.data.includes('Page not found'))
      )
        return true
      if (response.status === 200 && !response.data.includes('Page not found'))
        return false
      return null
    },
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@{username}',
    logo: '/logos/youtube.svg',
    categories: ['video'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (
        response.status === 200 &&
        response.data.includes("This page isn't available")
      )
        return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@{username}',
    logo: '/logos/tiktok.svg',
    categories: ['video', 'social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200 && response.data.includes(`@${username}`))
        return false
      return null
    },
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/{username}',
    logo: '/logos/pinterest.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/{username}',
    logo: '/logos/reddit.svg',
    categories: ['social', 'professional'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (
        response.status === 200 &&
        response.data.includes('Sorry, nobody on Reddit goes by that name')
      )
        return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Snapchat',
    url: 'https://www.snapchat.com/add/{username}',
    logo: '/logos/snapchat.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Tumblr',
    url: 'https://{username}.tumblr.com',
    logo: '/logos/tumblr.svg',
    categories: ['blogging'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/{username}',
    logo: '/logos/soundcloud.svg',
    categories: ['music'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Vimeo',
    url: 'https://vimeo.com/{username}',
    logo: '/logos/vimeo.svg',
    categories: ['video'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/{username}',
    logo: '/logos/dribbble.svg',
    categories: ['design'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@{username}',
    logo: '/logos/medium.svg',
    categories: ['blogging'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (
        response.status === 200 &&
        response.data.includes('This page does not exist')
      )
        return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/{username}',
    logo: '/logos/twitch.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/{username}',
    logo: '/logos/spotify.svg',
    categories: ['music'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/{username}',
    logo: '/logos/behance.svg',
    categories: ['design'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Flickr',
    url: 'https://www.flickr.com/people/{username}',
    logo: '/logos/flickr.svg',
    categories: ['photography'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'DeviantArt',
    url: 'https://www.deviantart.com/{username}',
    logo: '/logos/deviantart.svg',
    categories: ['art', 'design'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/{username}',
    logo: '/logos/stackoverflow.svg',
    categories: ['development', 'professional'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Etsy',
    url: 'https://www.etsy.com/shop/{username}',
    logo: '/logos/etsy.svg',
    categories: ['ecommerce', 'creative'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Patreon',
    url: 'https://www.patreon.com/{username}',
    logo: '/logos/patreon.svg',
    categories: ['crowdfunding', 'creative'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Goodreads',
    url: 'https://www.goodreads.com/{username}',
    logo: '/logos/goodreads.svg',
    categories: ['books', 'social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Quora',
    url: 'https://www.quora.com/profile/{username}',
    logo: '/logos/quora.svg',
    categories: ['social', 'knowledge'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Steam',
    url: 'https://steamcommunity.com/id/{username}',
    logo: '/logos/steam.svg',
    categories: ['gaming'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/{username}',
    logo: '/logos/codepen.svg',
    categories: ['development', 'design'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Last.fm',
    url: 'https://www.last.fm/user/{username}',
    logo: '/logos/lastfm.svg',
    categories: ['music', 'social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Yelp',
    url: 'https://www.yelp.com/user_details?userid={username}',
    logo: '/logos/yelp.svg',
    categories: ['reviews', 'social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Product Hunt',
    url: 'https://www.producthunt.com/@{username}',
    logo: '/logos/product-hunt.svg',
    categories: ['tech', 'startup'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Mastodon',
    url: 'https://mastodon.social/@{username}',
    logo: '/logos/mastodon.svg',
    categories: ['social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Bandcamp',
    url: 'https://{username}.bandcamp.com',
    logo: '/logos/bandcamp.svg',
    categories: ['music'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Unsplash',
    url: 'https://unsplash.com/@{username}',
    logo: '/logos/unsplash.svg',
    categories: ['photography'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Ko-fi',
    url: 'https://ko-fi.com/{username}',
    logo: '/logos/ko-fi.svg',
    categories: ['crowdfunding', 'creative'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Kaggle',
    url: 'https://www.kaggle.com/{username}',
    logo: '/logos/kaggle.svg',
    categories: ['data science', 'development'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Strava',
    url: 'https://www.strava.com/athletes/{username}',
    logo: '/logos/strava.svg',
    categories: ['fitness', 'social'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Telegram',
    url: 'https://t.me/{username}',
    logo: '/logos/telegram.svg',
    unavailableIndicators: ['@'],
    categories: ['social', 'messaging'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
  {
    name: 'Wellfound',
    url: 'https://wellfound.com/u/{username}',
    logo: '/logos/wellfound.svg',
    categories: ['professional', 'startup'],
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
]
