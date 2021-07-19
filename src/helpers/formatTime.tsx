import dayjs from 'dayjs'

export const formatTime = (time: string) => {
  return dayjs('1/1/2021 ' + time).format(`h:mm`)
}
