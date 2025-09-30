import { FC } from 'react'
import { Card, Flex, Box, Text, Button } from '@radix-ui/themes'

interface IIdeaItemProps {
  title: string
  description: string
  count: number
  isLoading: boolean
  handleVote: () => void
}

export const IdeaItem: FC<IIdeaItemProps> = ({
  title,
  description,
  count,
  isLoading,
  handleVote,
}) => (
  <Card>
    <Flex gap="3" align="center" justify="between">
      <Box>
        <Text as="div" size="3" weight="bold" mb="1">
          {title}
        </Text>
        <Text as="div" size="2" color="gray">
          {description}
        </Text>
        <Text as="div" size="2" mt="2">
          Количество голосов: <Text weight="bold">{count}</Text>
        </Text>
      </Box>

      <Button 
        size="3" 
        variant="soft"
        loading={isLoading} 
        onClick={handleVote}
      >
        Проголосовать
      </Button>
    </Flex>
  </Card>
)
