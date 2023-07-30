import { DateProviderProps } from '../InterfaceDateProvider'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class DayJsDateProvider implements DateProviderProps {
  dateNow(): Date {
    return dayjs().toDate()
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date)
    const start_date_utc = this.convertToUtc(start_date)
    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date)
    const start_date_utc = this.convertToUtc(start_date)
    return dayjs(end_date_utc).diff(start_date_utc, 'days')
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }
}
