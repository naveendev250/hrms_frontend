import { useState, useEffect } from 'react'
import { Box, Text, SimpleGrid, VStack, Icon, HStack } from '@chakra-ui/react'
import { MdPeople, MdEvent, MdCheckCircle, MdCancel, MdCalendarToday } from 'react-icons/md'
import { employeeAPI, attendanceAPI } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendance: 0,
    presentToday: 0,
    absentToday: 0,
  })

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [employees, attendance] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(),
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayAttendance = attendance.filter(a => a.date === today)
      const presentToday = todayAttendance.filter(a => a.status === 'Present').length
      const absentToday = todayAttendance.filter(a => a.status === 'Absent').length

      setStats({
        totalEmployees: employees.length,
        totalAttendance: attendance.length,
        presentToday,
        absentToday,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) return <Loading message="Loading dashboard..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchStats} />

  return (
    <Box>
      <VStack align="stretch" mb={4} spacing={0}>
        <Text fontSize="lg" fontWeight="600" letterSpacing="tight">Dashboard</Text>
        <Text fontSize="10px" color="gray.500">Overview</Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={3} mb={4}>
        <Box 
          bgGradient="linear(to-br, blue.50, blue.100)" 
          p={3} 
          rounded="lg" 
          shadow="md" 
          borderTop="3px" 
          borderColor="blue.400"
          position="relative"
          overflow="hidden"
          _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            bgGradient: 'radial(blue.200, transparent)',
            opacity: 0.4,
            borderRadius: 'full'
          }}
        >
          <HStack spacing={2} mb={2} position="relative" zIndex={1}>
            <Box bgGradient="linear(to-br, blue.400, blue.600)" p={1.5} rounded="lg" shadow="sm">
              <Icon as={MdPeople} color="white" boxSize={4} />
            </Box>
            <Text fontSize="10px" color="blue.800" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
              Total Employees
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="700" lineHeight="1" color="blue.700" position="relative" zIndex={1}>{stats.totalEmployees}</Text>
        </Box>

        <Box 
          bgGradient="linear(to-br, green.50, green.100)" 
          p={3} 
          rounded="lg" 
          shadow="md" 
          borderTop="3px" 
          borderColor="green.400"
          position="relative"
          overflow="hidden"
          _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            bgGradient: 'radial(green.200, transparent)',
            opacity: 0.4,
            borderRadius: 'full'
          }}
        >
          <HStack spacing={2} mb={2} position="relative" zIndex={1}>
            <Box bgGradient="linear(to-br, green.400, green.600)" p={1.5} rounded="lg" shadow="sm">
              <Icon as={MdCheckCircle} color="white" boxSize={4} />
            </Box>
            <Text fontSize="10px" color="green.800" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
              Present Today
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="700" lineHeight="1" color="green.700" position="relative" zIndex={1}>{stats.presentToday}</Text>
        </Box>

        <Box 
          bgGradient="linear(to-br, red.50, red.100)" 
          p={3} 
          rounded="lg" 
          shadow="md" 
          borderTop="3px" 
          borderColor="red.400"
          position="relative"
          overflow="hidden"
          _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            bgGradient: 'radial(red.200, transparent)',
            opacity: 0.4,
            borderRadius: 'full'
          }}
        >
          <HStack spacing={2} mb={2} position="relative" zIndex={1}>
            <Box bgGradient="linear(to-br, red.400, red.600)" p={1.5} rounded="lg" shadow="sm">
              <Icon as={MdCancel} color="white" boxSize={4} />
            </Box>
            <Text fontSize="10px" color="red.800" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
              Absent Today
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="700" lineHeight="1" color="red.700" position="relative" zIndex={1}>{stats.absentToday}</Text>
        </Box>

        <Box 
          bgGradient="linear(to-br, purple.50, purple.100)" 
          p={3} 
          rounded="lg" 
          shadow="md" 
          borderTop="3px" 
          borderColor="purple.400"
          position="relative"
          overflow="hidden"
          _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            bgGradient: 'radial(purple.200, transparent)',
            opacity: 0.4,
            borderRadius: 'full'
          }}
        >
          <HStack spacing={2} mb={2} position="relative" zIndex={1}>
            <Box bgGradient="linear(to-br, purple.400, purple.600)" p={1.5} rounded="lg" shadow="sm">
              <Icon as={MdCalendarToday} color="white" boxSize={4} />
            </Box>
            <Text fontSize="10px" color="purple.800" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
              Total Records
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="700" lineHeight="1" color="purple.700" position="relative" zIndex={1}>{stats.totalAttendance}</Text>
        </Box>
      </SimpleGrid>

      <Box bg="white" p={4} rounded="md" shadow="sm" borderTop="3px" borderColor="purple.400">
        <Text fontSize="sm" fontWeight="600" mb={1.5} letterSpacing="tight" bgGradient="linear(to-r, blue.600, purple.500)" bgClip="text">
          Welcome to HRMS Lite
        </Text>
        <Text fontSize="11px" color="gray.600" lineHeight="1.5">
          Manage your employee records and track daily attendance efficiently. Use the navigation menu above to get started.
        </Text>
      </Box>
    </Box>
  )
}

export default Dashboard
