import { apiClient } from 'shared'

export const getIdeas = async () => {
    const response = await apiClient.get('ideas')

    return response.data;
}

export const addVote = async (id: number) => {
    const response = await apiClient.post('ideas/vote', { ideaId: id })

    return response.data;
}
