import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Icon,
  Box
} from '@chakra-ui/react'
import { MdWarning } from 'react-icons/md'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', isLoading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent mx={3} shadow="2xl" borderTop="4px" borderColor="red.500">
        <ModalHeader fontSize="sm" fontWeight="600" py={3} px={4} borderBottom="1px" borderColor="gray.100">
          {title}
        </ModalHeader>
        <ModalBody py={4} px={4}>
          <VStack spacing={3} align="center">
            <Box 
              bg="red.50" 
              p={2.5} 
              rounded="full" 
              borderWidth="3px" 
              borderColor="red.100"
            >
              <Icon as={MdWarning} color="red.500" boxSize={6} />
            </Box>
            <Text fontSize="12px" color="gray.700" textAlign="center" lineHeight="1.6">
              {message}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter py={3} px={4} borderTop="1px" borderColor="gray.100" gap={2}>
          <Button
            size="xs"
            variant="ghost"
            onClick={onClose}
            isDisabled={isLoading}
            px={3}
            fontSize="11px"
          >
            Cancel
          </Button>
          <Button
            size="xs"
            colorScheme="red"
            onClick={onConfirm}
            isLoading={isLoading}
            px={3}
            fontSize="11px"
            _hover={{ transform: 'scale(1.02)' }}
            transition="all 0.2s"
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDialog
