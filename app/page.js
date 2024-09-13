'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import {
  websiteCategories,
  getWebsitesByCategory,
} from '@/shared/websitesConfig'
import { Input } from '@/components/ui/input'
import {
  Loader2,
  Star,
  GitFork,
  Github,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'
import { checkUsername, suggestUsernames } from '../utils/api'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'

export default function Home() {
  const [username, setUsername] = useState('')
  const [results, setResults] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [githubStats, setGithubStats] = useState({
    stars: 0,
    forks: 0,
    watchers: 0,
    created_at: '',
  })
  const [expandedCategories, setExpandedCategories] = useState({})

  useEffect(() => {
    fetchGithubStats()
  }, [])

  const fetchGithubStats = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/Kamran1819G/HandlePlus'
      )
      const data = await response.json()
      setGithubStats({
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        created_at: new Date(data.created_at).toLocaleDateString(),
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

      const isAnyUnavailable = Object.values(checkResult.results).some(
        (result) => !result.available
      )

      if (isAnyUnavailable) {
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

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const renderWebsiteResults = (category) => {
    const websitesInCategory = getWebsitesByCategory(category)
    if (websitesInCategory.length < 1) return null
    const displayWebsites = expandedCategories[category]
      ? websitesInCategory
      : websitesInCategory.slice(0, 12)

    return (
      <div key={category} className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {websiteCategories[category]}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayWebsites.map((website) => (
            <WebsiteResult
              key={website.name}
              website={website}
              result={results[website.name]}
            />
          ))}
        </div>
        {websitesInCategory.length > 5 && (
          <ExpandCategoryButton
            expanded={expandedCategories[category]}
            onClick={() => toggleCategory(category)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl">
        <CardHeader>
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HandlePlus
          </motion.h2>
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Check username availability across multiple platforms
          </motion.p>
        </CardHeader>
        <CardContent className="space-y-6">
          <UsernameInput
            username={username}
            setUsername={setUsername}
            handleKeyDown={handleKeyDown}
            handleCheckAvailability={handleCheckAvailability}
            isLoading={isLoading}
          />
          <AnimatePresence>
            {error && <ErrorMessage error={error} />}
            {suggestions.length > 0 && (
              <Suggestions suggestions={suggestions} />
            )}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {Object.keys(websiteCategories).map(renderWebsiteResults)}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">Powered by HandlePulse</p>
        </CardFooter>
      </Card>
      <GithubStats stats={githubStats} />
    </div>
  )
}

const getCardColor = (available) => {
  if (available === null) return 'bg-gray-100'
  return available ? 'bg-green-100' : 'bg-red-100'
}

const getTextColor = (available) => {
  if (available === null) return 'text-gray-500'
  return available ? 'text-green-600' : 'text-red-600'
}

const UsernameInput = ({
  username,
  setUsername,
  handleKeyDown,
  handleCheckAvailability,
  isLoading,
}) => (
  <motion.div
    className="flex space-x-4"
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
      className="flex-grow"
    />
    <Button
      onClick={handleCheckAvailability}
      disabled={isLoading}
      className="w-40"
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
)

const ErrorMessage = ({ error }) => (
  <motion.div
    className="text-red-500 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {error}
  </motion.div>
)

const WebsiteResult = ({ website, result }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`p-4 rounded-md flex flex-col items-center justify-between ${getCardColor(
            result.available
          )}`}
        >
          <Image
            src={result.logo}
            alt={`${website.name} logo`}
            className="w-8 h-8 mb-2"
            width={32}
            height={32}
          />
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-sm truncate ${
              result.available ? 'text-green-600' : 'line-through text-red-600'
            } hover:underline`}
          >
            {website.name}
          </a>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
        <div className="space-y-2">
          <p className="font-semibold text-black">{website.name}</p>
          <p className={`text-sm ${getTextColor(result.available)}`}>
            {result.available
              ? '✅ Available'
              : result.available === null
              ? '❓ Unknown'
              : '❌ Not Available'}
          </p>
          <p className="text-xs text-gray-500">
            Response status: {result.status}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const ExpandCategoryButton = ({ expanded, onClick }) => (
  <Button onClick={onClick} className="mt-2" variant="outline">
    {expanded ? (
      <>
        Show Less <ChevronUp className="ml-2 h-4 w-4" />
      </>
    ) : (
      <>
        Show More <ChevronDown className="ml-2 h-4 w-4" />
      </>
    )}
  </Button>
)

const Suggestions = ({ suggestions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={index}
          className="bg-blue-100 text-blue-800 p-2 rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {suggestion}
        </motion.div>
      ))}
    </div>
  </motion.div>
)

const GithubStats = ({ stats }) => (
  <motion.div
    className="mt-4 flex items-center space-x-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-white/90 hover:bg-white/100"
        >
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{stats.stars}</span>
          <GitFork className="w-4 h-4 text-blue-500" />
          <span>{stats.forks}</span>
          <Github className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">HandlePulse</h4>
            <p className="text-sm text-muted-foreground">
              GitHub repository details
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{stats.stars} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{stats.forks} forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm">{stats.watchers} watchers</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Created on {stats.created_at}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </motion.div>
)
