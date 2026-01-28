import { useState, useEffect } from 'react'
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack,
  FormControl, FormLabel, Input, Select, useToast, Badge, Flex, SimpleGrid, Icon
} from '@chakra-ui/react'
import { MdAdd, MdCheckCircle, MdCancel, MdVisibility, MdFilterList } from 'react-icons/md'
import { attendanceAPI, employeeAPI } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import CustomModal from '../components/Modal'

function Attendance() {
  const [attendance, setAttendance] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  })
  const [submitting, setSubmitting] = useState(false)
  const [filterEmployee, setFilterEmployee] = useState('')
  const [filterFromDate, setFilterFromDate] = useState('')
  const [filterToDate, setFilterToDate] = useState('')
  const toast = useToast()

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [attendanceData, employeesData] = await Promise.all([
        attendanceAPI.getAll(filterFromDate || null, filterToDate || null),
        employeeAPI.getAll(),
      ])
      setAttendance(attendanceData)
      setEmployees(employeesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filterFromDate, filterToDate])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await attendanceAPI.create(formData)
      setIsModalOpen(false)
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      })
      fetchData()
      toast({ title: 'Attendance marked', status: 'success', duration: 2000, isClosable: true })
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true })
    } finally {
      setSubmitting(false)
    }
  }

  const handleViewEmployee = async (employeeId) => {
    try {
      const employeeAttendance = await attendanceAPI.getByEmployee(employeeId)
      const employee = employees.find(e => e.employee_id === employeeId)
      setSelectedEmployee({
        ...employee,
        attendance: employeeAttendance,
        totalPresent: employeeAttendance.filter(a => a.status === 'Present').length,
        totalAbsent: employeeAttendance.filter(a => a.status === 'Absent').length,
      })
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true })
    }
  }

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.employee_id === employeeId)
    return employee ? employee.full_name : employeeId
  }

  const filteredAttendance = filterEmployee
    ? attendance.filter(a => a.employee_id === filterEmployee)
    : attendance

  if (loading) return <Loading message="Loading attendance..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />

  return (
    <Box>
      <Flex justify="space-between" align="flex-start" mb={4}>
        <VStack align="stretch" spacing={0}>
          <Text fontSize="lg" fontWeight="600" letterSpacing="tight">Attendance</Text>
          <Text fontSize="10px" color="gray.500">Track and manage daily attendance</Text>
        </VStack>
        <Button
          size="xs"
          bgGradient="linear(to-r, green.500, green.600)"
          color="white"
          onClick={() => setIsModalOpen(true)}
          isDisabled={employees.length === 0}
          px={3}
          leftIcon={<MdAdd size={14} />}
          _hover={{ bgGradient: "linear(to-r, green.600, green.700)", transform: 'translateY(-1px)', shadow: 'md' }}
          _active={{ bgGradient: "linear(to-r, green.700, green.800)" }}
          shadow="sm"
          transition="all 0.2s"
        >
          Mark Attendance
        </Button>
      </Flex>

      {employees.length === 0 ? (
        <Box bg="white" rounded="md" shadow="sm">
          <EmptyState title="No employees found" message="Please add employees first before marking attendance" />
        </Box>
      ) : (
        <>
          <Box 
            bgGradient="linear(to-br, white, blue.50)" 
            p={3} 
            rounded="lg" 
            shadow="md" 
            mb={3} 
            borderTop="3px" 
            borderColor="blue.400"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              bgGradient: 'radial(blue.100, transparent)',
              opacity: 0.5,
              borderRadius: 'full'
            }}
          >
            <HStack spacing={1.5} mb={2} alignItems="center" position="relative" zIndex={1}>
              <Box bgGradient="linear(to-br, blue.400, blue.600)" p={1} rounded="md" shadow="sm">
                <Icon as={MdFilterList} color="white" boxSize={3} />
              </Box>
              <Text fontSize="11px" fontWeight="600" color="blue.700">Filters</Text>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3} position="relative" zIndex={1}>
              <FormControl>
                <FormLabel fontSize="11px" mb={1}>Employee</FormLabel>
                <Select
                  size="sm"
                  fontSize="11px"
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                >
                  <option value="">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.employee_id} value={emp.employee_id}>
                      {emp.full_name} ({emp.employee_id})
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="11px" mb={1}>From Date</FormLabel>
                <Input
                  size="sm"
                  fontSize="11px"
                  type="date"
                  value={filterFromDate}
                  onChange={(e) => setFilterFromDate(e.target.value)}
                  placeholder="Start date"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="11px" mb={1}>To Date</FormLabel>
                <Input
                  size="sm"
                  fontSize="11px"
                  type="date"
                  value={filterToDate}
                  onChange={(e) => setFilterToDate(e.target.value)}
                  placeholder="End date"
                />
              </FormControl>
            </SimpleGrid>
            
            {(filterEmployee || filterFromDate || filterToDate) && (
              <Button
                size="xs"
                variant="ghost"
                colorScheme="gray"
                mt={2}
                fontSize="10px"
                position="relative"
                zIndex={1}
                onClick={() => {
                  setFilterEmployee('')
                  setFilterFromDate('')
                  setFilterToDate('')
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>

          {filteredAttendance.length === 0 ? (
            <Box bg="white" rounded="md" shadow="sm">
              <EmptyState 
                title={filterEmployee || filterFromDate || filterToDate ? "No records found" : "No attendance records"} 
                message={filterEmployee || filterFromDate || filterToDate ? "No attendance records match the selected filters. Try adjusting your filters or clear them to see all records." : "Start by marking attendance for your employees"} 
              />
            </Box>
          ) : (
            <Box bg="white" rounded="md" shadow="sm" overflowX="auto">
              <Table size="sm" variant="simple">
                <Thead bgGradient="linear(to-r, green.50, blue.50)">
                  <Tr>
                    <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="green.700">Employee ID</Th>
                    <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="green.700">Employee Name</Th>
                    <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="green.700">Date</Th>
                    <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="green.700">Status</Th>
                    <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="green.700">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredAttendance.map((record) => (
                    <Tr 
                      key={record.id} 
                      _hover={{ bgGradient: 'linear(to-r, green.50, blue.50)', transform: 'scale(1.001)' }} 
                      transition="all 0.2s"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      <Td fontSize="11px" fontFamily="mono" color="blue.600" py={2} fontWeight="600">{record.employee_id}</Td>
                      <Td fontSize="11px" fontWeight="500" py={2}>{getEmployeeName(record.employee_id)}</Td>
                      <Td fontSize="11px" color="gray.600" py={2}>{new Date(record.date).toLocaleDateString()}</Td>
                      <Td fontSize="11px" py={2}>
                        <Badge colorScheme={record.status === 'Present' ? 'green' : 'red'} fontSize="10px" px={2} py={0.5} rounded="full">
                          <HStack spacing={1}>
                            <Icon as={record.status === 'Present' ? MdCheckCircle : MdCancel} boxSize={2.5} />
                            <Text>{record.status}</Text>
                          </HStack>
                        </Badge>
                      </Td>
                      <Td fontSize="11px" py={2}>
                        <Button
                          size="xs"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => handleViewEmployee(record.employee_id)}
                          px={2}
                          leftIcon={<MdVisibility size={12} />}
                        >
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </>
      )}

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Mark Attendance">
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Employee</FormLabel>
              <Select
                size="sm"
                fontSize="11px"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
              >
                <option value="">Select an employee</option>
                {employees.map(emp => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.full_name} ({emp.employee_id})
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Date</FormLabel>
              <Input
                size="sm"
                fontSize="11px"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Status</FormLabel>
              <Select
                size="sm"
                fontSize="11px"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </Select>
            </FormControl>

            <HStack spacing={2} justify="flex-end" w="full" pt={1}>
              <Button size="xs" variant="ghost" onClick={() => setIsModalOpen(false)} isDisabled={submitting} px={3}>
                Cancel
              </Button>
              <Button size="xs" colorScheme="blue" type="submit" isLoading={submitting} px={3}>
                Mark Attendance
              </Button>
            </HStack>
          </VStack>
        </form>
      </CustomModal>

      <CustomModal
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title={selectedEmployee ? `${selectedEmployee.full_name} - Attendance Details` : ''}
      >
        {selectedEmployee && (
          <VStack spacing={3} align="stretch">
            <SimpleGrid columns={2} spacing={2}>
              <Box p={2.5} bg="green.50" rounded="md" borderLeft="3px" borderColor="green.500">
                <HStack spacing={1} mb={0.5}>
                  <Icon as={MdCheckCircle} color="green.600" boxSize={3} />
                  <Text fontSize="10px" color="gray.600" textTransform="uppercase" letterSpacing="wide">Total Present</Text>
                </HStack>
                <Text fontSize="lg" fontWeight="700" lineHeight="1" color="green.600">{selectedEmployee.totalPresent}</Text>
              </Box>
              <Box p={2.5} bg="red.50" rounded="md" borderLeft="3px" borderColor="red.500">
                <HStack spacing={1} mb={0.5}>
                  <Icon as={MdCancel} color="red.600" boxSize={3} />
                  <Text fontSize="10px" color="gray.600" textTransform="uppercase" letterSpacing="wide">Total Absent</Text>
                </HStack>
                <Text fontSize="lg" fontWeight="700" lineHeight="1" color="red.600">{selectedEmployee.totalAbsent}</Text>
              </Box>
            </SimpleGrid>

            {selectedEmployee.attendance.length === 0 ? (
              <EmptyState title="No attendance records" message="No attendance has been marked for this employee yet" />
            ) : (
              <Box>
                <Text fontSize="11px" fontWeight="600" mb={2} pb={1.5} borderBottom="1px" borderColor="gray.200" letterSpacing="tight">
                  Attendance History
                </Text>
                <VStack spacing={1.5} maxH="48" overflowY="auto">
                  {selectedEmployee.attendance.map(record => (
                    <Flex key={record.id} justify="space-between" align="center" p={2} bg="gray.50" rounded="md" w="full" transition="all 0.15s" _hover={{ bg: 'gray.100' }}>
                      <Text fontSize="11px" color="gray.700" fontWeight="500">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Text>
                      <Badge colorScheme={record.status === 'Present' ? 'green' : 'red'} fontSize="10px" px={2} py={0.5} rounded="full">
                        <HStack spacing={1}>
                          <Icon as={record.status === 'Present' ? MdCheckCircle : MdCancel} boxSize={2.5} />
                          <Text>{record.status}</Text>
                        </HStack>
                      </Badge>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        )}
      </CustomModal>
    </Box>
  )
}

export default Attendance
