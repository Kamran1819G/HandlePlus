// shared/websitesConfig.js

export const websites = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/{username}',
    logo: '/logos/twitter.svg',
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
    checkAvailability: (response, username) => {
      if (response.status === 404) return true
      if (response.status === 200) return false
      return null
    },
  },
]
