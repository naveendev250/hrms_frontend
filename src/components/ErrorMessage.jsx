import { Box, VStack, Text, Button } from '@chakra-ui/react'

function ErrorMessage({ message, onRetry }) {
  return (
    <Box bg="red.50" border="1px" borderColor="red.200" rounded="md" py={6} px={3}>
      <VStack spacing={2}>
        <Text fontSize="11px" color="red.600" textAlign="center">{message}</Text>
        {onRetry && (
          <Button size="xs" colorScheme="red" onClick={onRetry} px={3}>
            Try Again
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default ErrorMessage
