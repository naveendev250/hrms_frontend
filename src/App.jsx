import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'employees':
        return <Employees />
      case 'attendance':
        return <Attendance />
      default:
        return <Dashboard />
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Box maxW="1400px" mx="auto" px={3} py={4}>
        {renderPage()}
      </Box>
    </Box>
  )
}

export default App
