'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Star, GitFork, Github } from 'lucide-react'
import { checkUsername, suggestUsernames } from '../utils/api'

export default function Home() {
  const [username, setUsername] = useState('')
  const [results, setResults] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [githubStats, setGithubStats] = useState({ stars: 0, forks: 0 })

  useEffect(() => {
    fetchGithubStats()
  }, [])

  const fetchGithubStats = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/yourusername/your-repo-name'
      )
      const data = await response.json()
      setGithubStats({
        stars: data.stargazers_count,
        forks: data.forks_count,
      })
    } catch (error) {
      console.error('Error fetching GitHub stats:', error)
    }
  }

  const handleCheckAvailability = async () => {
    setIsLoading(true)
    setResults(null)
    setSuggestions([])
    setError(null)

    try {
      const checkResult = await checkUsername(username)
      setResults(checkResult.results)

      if (Object.values(checkResult.results).some((v) => !v)) {
        const suggestResult = await suggestUsernames(username)
        setSuggestions(suggestResult.suggestions)
      }
    } catch (error) {
      setError('An error occurred while processing your request.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheckAvailability()
    }
  }

  const redirectToGithub = () => {
    window.open('https://github.com/yourusername/your-repo-name', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl">
        <CardHeader className="relative">
          <motion.h1
            className="text-3xl font-bold text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Username Checker
          </motion.h1>
          <motion.div
            className="absolute top-2 right-2 flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>{githubStats.stars}</span>
            </div>
            <div className="flex items-center">
              <GitFork className="w-4 h-4 mr-1 text-blue-500" />
              <span>{githubStats.forks}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={redirectToGithub}
              className="flex items-center"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter username"
              className="w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={handleCheckAvailability}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Availability'
              )}
            </Button>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-red-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-2">Results:</h2>
                <div className="space-y-2">
                  {Object.entries(results).map(([platform, available]) => (
                    <div
                      key={platform}
                      className={`p-2 rounded-md ${
                        available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {platform}: {available ? 'Available' : 'Not Available'}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-2">Suggestions:</h2>
                <ul className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      className="bg-blue-100 text-blue-800 p-2 rounded-md"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {suggestion}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">Powered by HandlePulse</p>
        </CardFooter>
      </Card>
    </div>
  )
}
