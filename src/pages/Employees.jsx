import { useState, useEffect } from 'react'
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Badge, Flex, Icon
} from '@chakra-ui/react'
import { MdAdd, MdDelete, MdPerson, MdEmail, MdBusiness } from 'react-icons/md'
import { employeeAPI } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import CustomModal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, employee: null })
  const [deleting, setDeleting] = useState(false)
  const toast = useToast()

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await employeeAPI.getAll()
      setEmployees(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

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
      await employeeAPI.create(formData)
      setIsModalOpen(false)
      setFormData({ employee_id: '', full_name: '', email: '', department: '' })
      fetchEmployees()
      toast({ title: 'Employee added', status: 'success', duration: 2000, isClosable: true })
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteDialog.employee) return

    setDeleting(true)
    try {
      await employeeAPI.delete(deleteDialog.employee.employee_id)
      setDeleteDialog({ isOpen: false, employee: null })
      fetchEmployees()
      toast({ title: 'Employee deleted successfully', status: 'success', duration: 2000, isClosable: true })
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading message="Loading employees..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchEmployees} />

  return (
    <Box>
      <Flex justify="space-between" align="flex-start" mb={4}>
        <VStack align="stretch" spacing={0}>
          <Text fontSize="lg" fontWeight="600" letterSpacing="tight">Employees</Text>
          <Text fontSize="10px" color="gray.500">Manage your employee records</Text>
        </VStack>
        <Button 
          size="xs" 
          bgGradient="linear(to-r, blue.500, blue.600)"
          color="white"
          onClick={() => setIsModalOpen(true)} 
          px={3} 
          leftIcon={<MdAdd size={14} />}
          _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)", transform: 'translateY(-1px)', shadow: 'md' }}
          _active={{ bgGradient: "linear(to-r, blue.700, blue.800)" }}
          shadow="sm"
          transition="all 0.2s"
        >
          Add Employee
        </Button>
      </Flex>

      {employees.length === 0 ? (
        <Box bg="white" rounded="md" shadow="sm">
          <EmptyState title="No employees found" message="Get started by adding your first employee" />
        </Box>
      ) : (
        <Box bg="white" rounded="md" shadow="sm" overflowX="auto">
          <Table size="sm" variant="simple">
            <Thead bgGradient="linear(to-r, blue.50, purple.50)">
              <Tr>
                <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="blue.700">ID</Th>
                <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="blue.700">Name</Th>
                <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="blue.700">Email</Th>
                <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="blue.700">Department</Th>
                <Th fontSize="10px" textTransform="uppercase" letterSpacing="wide" py={2} color="blue.700">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr 
                  key={employee.employee_id} 
                  _hover={{ bgGradient: 'linear(to-r, blue.50, purple.50)', transform: 'scale(1.001)' }} 
                  transition="all 0.2s"
                  borderBottom="1px"
                  borderColor="gray.100"
                >
                  <Td fontSize="11px" fontFamily="mono" color="blue.600" py={2} fontWeight="600">{employee.employee_id}</Td>
                  <Td fontSize="11px" fontWeight="500" py={2}>
                    <HStack spacing={1.5}>
                      <Icon as={MdPerson} color="purple.500" boxSize={3.5} />
                      <Text>{employee.full_name}</Text>
                    </HStack>
                  </Td>
                  <Td fontSize="11px" color="gray.600" py={2}>
                    <HStack spacing={1.5}>
                      <Icon as={MdEmail} color="green.500" boxSize={3.5} />
                      <Text>{employee.email}</Text>
                    </HStack>
                  </Td>
                  <Td fontSize="11px" py={2}>
                    <Badge colorScheme="purple" fontSize="10px" px={2} py={0.5} rounded="full">
                      <HStack spacing={1}>
                        <Icon as={MdBusiness} boxSize={2.5} />
                        <Text>{employee.department}</Text>
                      </HStack>
                    </Badge>
                  </Td>
                  <Td fontSize="11px" py={2}>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => setDeleteDialog({ isOpen: true, employee })}
                      px={2}
                      leftIcon={<MdDelete size={12} />}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Employee ID</FormLabel>
              <Input
                size="sm"
                fontSize="11px"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                placeholder="e.g., EMP001"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Full Name</FormLabel>
              <Input
                size="sm"
                fontSize="11px"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="e.g., John Doe"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Email Address</FormLabel>
              <Input
                size="sm"
                fontSize="11px"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g., john.doe@example.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="11px" mb={1}>Department</FormLabel>
              <Input
                size="sm"
                fontSize="11px"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Engineering"
              />
            </FormControl>

            <HStack spacing={2} justify="flex-end" w="full" pt={1}>
              <Button size="xs" variant="ghost" onClick={() => setIsModalOpen(false)} isDisabled={submitting} px={3}>
                Cancel
              </Button>
              <Button size="xs" colorScheme="blue" type="submit" isLoading={submitting} px={3}>
                Add Employee
              </Button>
            </HStack>
          </VStack>
        </form>
      </CustomModal>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, employee: null })}
        onConfirm={handleDelete}
        title="Delete Employee"
        message={deleteDialog.employee ? `Are you sure you want to delete ${deleteDialog.employee.full_name}? This action cannot be undone and will also delete all attendance records for this employee.` : ''}
        confirmText="Delete"
        isLoading={deleting}
      />
    </Box>
  )
}

export default Employees
