export const getPeriodFromDate = (date: Date | string): number =>{
    const tanggal = new Date(date)
    const bulan = tanggal.getMonth() + 1 // karena januari mulai dari 0, sedangkan di DB idnya dari 1
    const tahun_offset = (tanggal.getFullYear() - 2023)*12 // karena mulai dari 2023
    return bulan+tahun_offset
}

export const getDateFromPeriod = (period: number): Date =>{
    const result = new Date()
    result.setDate(2)
    result.setMonth((period- 1) % 12)
    result.setFullYear(Math.floor((period-1) / 12)+2023)
    return result
}