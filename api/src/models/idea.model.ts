import type { RowDataPacket } from 'mysql2'

export default interface Idea extends RowDataPacket {
  id: number
  title: string
  description: string | null
  votes: number
}
