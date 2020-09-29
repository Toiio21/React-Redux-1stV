const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
        filter: Record({
            startDate: null,
            endDate: null,
            clientName: '',
            onlyMe: false
        })(),
        // пагинация
        pagination: Record({
            page: 1, // текущий номер страницы
            size: 15, // размер страницы
            totalCount: 0 // всего элементов
        })()
        // ...
    })()
})