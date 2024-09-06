// Function to check if a username is available
export const checkUsername = async (username) => {
  try {
    const response = await fetch(
      `/api/check-username?username=${encodeURIComponent(username)}`
    )
    if (!response.ok) {
      throw new Error(`Failed to check username: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error checking username:', error)
    throw error
  }
}

// Function to suggest alternative usernames
export const suggestUsernames = async (username) => {
  try {
    const response = await fetch(
      `/api/suggest-usernames?username=${encodeURIComponent(username)}`
    )
    if (!response.ok) {
      throw new Error(`Failed to suggest usernames: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error suggesting usernames:', error)
    throw error
  }
}
