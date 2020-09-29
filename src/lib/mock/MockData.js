import { filter } from 'underscore'

const USER = 'Иванов Иван Иванович'

export const appointments = [
  {
    date: 1556863200000,
    clientName: 'Должанский Николай Сергеевич', 
    status: 'Завершён',
    holderName: 'Иванов Иван Иванович', 
    compliences: 'Боль в правом ухе', 
    diagnosis: 'Застужено правое ухо'
  },
  {
    date: 1560778200000,
    clientName: 'Петров Пётр Генадьевич', 
    status: 'Завершён',
    holderName: 'Иванов Иван Иванович', 
    compliences: 'Боль в горле', 
    diagnosis: 'Ангина'
  },
  {
    date: 1560256200000,
    clientName: 'Буйкевич Галина Петровна', 
    status: 'Завершён',
    holderName: 'Нестеров Валерий Викторович', 
    compliences: 'Головные боли', 
    diagnosis: 'Мигрень'
  },
  {
    date: 1561017600000,
    clientName: 'Астафьева Ирина Михайловна', 
    status: 'Завершён',
    holderName: 'Сидоров Генадий Павлович', 
    compliences: 'Тошнота', 
    diagnosis: 'Ротавирус'
  },
]

export function getAppointments (params) {
  const {
      startDate,
      endDate,
      clientName,
      onlyMe,
    } = params

  return filter(appointments, o => {
    return (startDate ? o.date >= startDate : true) && 
    (endDate ? o.date <= endDate : true) &&
    (clientName ? (clientName.length > 2 ? o.clientName.includes(clientName) : true) : true) && 
    (onlyMe ? o.holderName === USER : true)
  })
}