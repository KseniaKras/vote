import type { RowDataPacket } from 'mysql2'

export default interface Vote extends RowDataPacket {
  id: number
  idea_id: number
  ip: string
  created_at: Date
}
