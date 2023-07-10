import { container } from 'tsyringe'
import { DateProviderProps } from './DateProvider/InterfaceDateProvider'
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider'

container.registerSingleton<DateProviderProps>(
  'DayJsDateProvider',
  DayJsDateProvider,
)
