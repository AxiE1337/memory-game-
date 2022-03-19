import { createContext, useState, useEffect, FC } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface IThemeContext {
  isDark: boolean
  updateScore?: (action: any) => void
  toggleTheme?: () => void
  wins: any
  losses: any
}

const defaultState = {
  isDark: false,
  wins: '',
  losses: '',
}
export const ThemeContext = createContext<IThemeContext>(defaultState)

export const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(defaultState.isDark)
  const [wins, setWins] = useState<any>('')
  const [losses, setLosses] = useState<any>('')
  const { get, post, remove, add } = useLocalStorage()

  const updateScore = (action: any) => {
    if (action === 'reset') {
      setWins('')
      setLosses('')
      remove('wins')
      remove('losses')
    }
    if (action === 'addWins') {
      setWins(wins + 1)
      add('wins', 1)
    }
    if (action === 'addLosses') {
      setLosses(losses + 1)
      add('losses', 1)
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    post('darkMode', !isDark)
  }

  useEffect(() => {
    setIsDark(get('darkMode') === 'true' ? true : false)
    setWins(get('wins') || '0')
    setLosses(get('losses') || '0')
  }, [get])
  return (
    <ThemeContext.Provider
      value={{ isDark, updateScore, toggleTheme, wins, losses }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
