import { useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import '../styles/memoryGame.css'
import { Button } from 'antd'
import UpperBar from './UpperBar'

export default function MemoryGame() {
  const { isDark, wins, losses, updateScore } = useContext(ThemeContext)
  const [randomNumber, setRandomNumber] = useState<number>(0)
  const [randomArr, setRandomArr] = useState<any[]>([])
  const [arr, setArr] = useState<any[]>([])
  const [isWin, setIsWin] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const startFunction = () => {
    setRandomArr([])
    setArr([])
    setIsDisabled(true)
    setIsWin('')
    let arr1: any[] = []
    const interval = setInterval(() => {
      let randNumber = Math.floor(Math.random() * (4 - 1) + 1)
      setRandomNumber(randNumber)
      arr1.push(randNumber)
      setTimeout(() => {
        setRandomNumber(0)
      }, 300)
      if (arr1.length >= 5) {
        setRandomArr(arr1)
        clearInterval(interval)
      }
    }, 1000)
  }

  const check = () => {
    if (arr.length >= 5) {
      setTimeout(() => {
        setIsWin('')
      }, 1000)
      setIsDisabled(false)
      if (arr.join('') === randomArr.join('')) {
        setIsWin('green')
        return updateScore && updateScore('addWins')
      } else {
        setIsWin('red')
        return updateScore && updateScore('addLosses')
      }
    }
  }

  const btn = (number: number) => {
    if (randomArr.length >= 5) {
      arr.push(number)
      check()
    }
  }

  return (
    <>
      <UpperBar wins={wins} losses={losses} />
      <div className={isDark === true ? 'memoryGameDark' : 'memoryGame'}>
        <div className='mainSquare'>
          <Button
            onClick={() => btn(1)}
            className={randomNumber === 1 ? 'squareBtnActive' : 'squareBtn'}
            style={{ borderColor: isWin }}
            disabled={!isDisabled}
            type='default'
          >
            1
          </Button>
          <Button
            onClick={() => btn(2)}
            className={randomNumber === 2 ? 'squareBtnActive' : 'squareBtn'}
            style={{ borderColor: isWin }}
            disabled={!isDisabled}
            type='default'
          >
            2
          </Button>
          <Button
            onClick={() => btn(3)}
            className={randomNumber === 3 ? 'squareBtnActive' : 'squareBtn'}
            style={{ borderColor: isWin }}
            disabled={!isDisabled}
            type='default'
          >
            3
          </Button>
          <Button
            onClick={() => btn(4)}
            className={randomNumber === 4 ? 'squareBtnActive' : 'squareBtn'}
            style={{ borderColor: isWin }}
            disabled={!isDisabled}
            type='default'
          >
            4
          </Button>
        </div>
        <Button
          onClick={startFunction}
          className='startButton'
          type='primary'
          disabled={isDisabled}
        >
          Start
        </Button>
      </div>
    </>
  )
}
