import dayjs from 'dayjs'

export const formatTime = (time: string) => {
  return dayjs(time).format(`h:mm`)
}
