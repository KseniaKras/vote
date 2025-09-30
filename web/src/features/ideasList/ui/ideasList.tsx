import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Container, Flex, Heading, Spinner } from '@radix-ui/themes'

import { IdeaItem } from 'entities'
import { Notification, NotificationType, INotificationHandler } from 'shared'

import { ideasApi } from '../api'
import { IdeaItemType } from '../types'

export const IdeasList = () => {
  const notificationRef = useRef<INotificationHandler>(null)
  const [isListLoading, setIsListLoading] = useState(false)
  const [ideas, setIdeas] = useState<IdeaItemType[]>([])
  const [loadingIdeaId, setLoadingIdeaId] = useState<number | null>(null)

  const getIdeas = async () => {
    try {
      setIsListLoading(true)
      const data = await ideasApi.getIdeas()
      setIdeas(data.list)
    } catch(error) {
      snowNotification(NotificationType.Error, 'Что-то пошло не так...')
    } finally {
      setIsListLoading(false)
    }
  }

  useEffect(() => {
    getIdeas()
  }, [])

  const snowNotification = (type: NotificationType, text: string) => {
    notificationRef.current?.publish(type, text);
  };

  const handleVote = async (id: number) => {
    try {
      setLoadingIdeaId(id)
      const res = await ideasApi.addVote(id);

      if (res.success) {
        console.log('data', res.list)
        setIdeas(
          res.list
          // prev => prev.map(idea => idea.id === id ? {...idea, votes: idea.votes + 1} : idea)
            // .sort((a, b) => b.votes - a.votes)
        )

        snowNotification(NotificationType.Success, 'Ваш голос успешно добавлен')
      }
    } catch(error) {
      if (error instanceof AxiosError) {
        snowNotification(NotificationType.Error, error?.response?.data.message!)
      } else {
        snowNotification(NotificationType.Error, 'Что-то пошло не так...')
      }
    } finally {
      setLoadingIdeaId(null)
    }
  }

  return (
    <Container>
      <Heading as="h3" color="indigo" align="center" weight="bold" size="7" mb="5">Ideas List:</Heading>

      {isListLoading && !ideas.length
        ? <Flex align="center" justify="center" height="100dvh">
            <Spinner size="3" />
          </Flex>
        : <Flex direction="column" gap="3" mx="9" my="5">
          {ideas.map((idea) => {
            return (
              <IdeaItem 
                key={idea.id} 
                title={idea.title} 
                description={idea.description} 
                count={idea.votes}
                isLoading={loadingIdeaId === idea.id}
                handleVote={() => handleVote(idea.id)}
              />
            )
          })}
        </Flex>
      }

      <Notification ref={notificationRef} />
    </Container>
  )
}
