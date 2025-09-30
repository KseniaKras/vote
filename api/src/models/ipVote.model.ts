import type { RowDataPacket } from 'mysql2'

export default interface IpVoteCounter extends RowDataPacket {
  ip: string
  cnt: number
}
