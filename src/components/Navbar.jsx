import { Box, Flex, Text, Button, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react'
import { MdDashboard, MdPeople, MdCalendarToday, MdLogout } from 'react-icons/md'

function Navbar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'employees', label: 'Employees', icon: MdPeople },
    { id: 'attendance', label: 'Attendance', icon: MdCalendarToday }
  ]

  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={50} boxShadow="sm">
      <Flex maxW="1400px" mx="auto" px={3} align="center" justify="space-between" h="48px">
        <Text 
          fontSize="md" 
          fontWeight="700" 
          letterSpacing="tight"
          bgGradient="linear(to-r, blue.600, purple.500)"
          bgClip="text"
        >
          HRMS Lite
        </Text>
        <HStack spacing={3}>
          <HStack spacing={0.5}>
            {menuItems.map(item => (
              <Button
                key={item.id}
                size="xs"
                px={3}
                leftIcon={<item.icon size={14} />}
                colorScheme={currentPage === item.id ? 'blue' : 'gray'}
                variant={currentPage === item.id ? 'solid' : 'ghost'}
                onClick={() => setCurrentPage(item.id)}
                _hover={{ bg: currentPage === item.id ? 'blue.600' : 'gray.100' }}
              >
                {item.label}
              </Button>
            ))}
          </HStack>
          
          <Menu>
            <MenuButton
              as={Button}
              size="xs"
              variant="ghost"
              px={2}
              _hover={{ bg: 'gray.100' }}
            >
              <HStack spacing={1.5}>
                <Avatar 
                  size="xs" 
                  name="Admin User" 
                  bg="blue.500" 
                  color="white"
                  w="24px"
                  h="24px"
                />
                <Text fontSize="11px" fontWeight="500" color="gray.700">Admin User</Text>
              </HStack>
            </MenuButton>
            <MenuList minW="140px" py={1}>
              <MenuItem 
                fontSize="11px" 
                icon={<Icon as={MdLogout} boxSize={3.5} />}
                isDisabled
                _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>  
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
