import MemoryGame from './components/MemoryGame'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <MemoryGame />
      </ThemeProvider>
    </div>
  )
}

export default App
