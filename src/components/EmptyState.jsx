import { VStack, Text } from '@chakra-ui/react'

function EmptyState({ title, message }) {
  return (
    <VStack py={12} px={3} spacing={0.5}>
      <Text fontSize="sm" fontWeight="500" color="gray.900" letterSpacing="tight">{title}</Text>
      <Text fontSize="11px" color="gray.500">{message}</Text>
    </VStack>
  )
}

export default EmptyState
