import { useContext, useState } from 'react'
import { Switch, Button } from 'antd'
import { ThemeContext } from '../context/ThemeContext'

interface Props {
  wins: any
  losses: any
}

export default function UpperBar({ wins, losses }: Props) {
  const { isDark, toggleTheme, updateScore } = useContext(ThemeContext)
  const [isReseted, setIsReseted] = useState(false)

  const reset = () => {
    setIsReseted(true)
    setTimeout(() => {
      setIsReseted(false)
      updateScore && updateScore('reset')
    }, 1000)
  }

  return (
    <div className={isDark ? 'upperBarDark' : 'upperBar'}>
      <div className='stats'>
        <h1>wins {wins}</h1>
        <h1>losses {losses}</h1>
        <Button onClick={reset} loading={isReseted} type='primary'>
          Reset
        </Button>
      </div>

      <div className='switch'>
        <Switch onChange={toggleTheme} checked={isDark} />
        <p>{isDark ? 'Dark' : 'Light'}</p>
      </div>
    </div>
  )
}
