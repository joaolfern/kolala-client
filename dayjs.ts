import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'
import dayjsBR from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.locale(dayjsBR)
