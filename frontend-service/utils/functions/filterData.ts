export function filterData<T extends Object>(data: T[], term: string, properties: (keyof T)[] ): T[]{
    const filteredData: T[] = []
    data.forEach((item: T) => {
        properties.forEach(property=>{
            if(typeof item[property] == 'string'){
                if((item[property] as string).toLowerCase().includes(term.toLowerCase())){
                    filteredData.push(item)
                }
            }
        })
    })
    return filteredData
}

export function filterDataNested<T extends Object, V extends Object>(data: T[], key: keyof T , term: string, propertiesT: (keyof T)[],  propertiesV: (keyof V)[]): T[]{
    let flag = false;
    return data.filter((item)=>{
        propertiesT.forEach((propertyT)=>{
            if((item[propertyT] as string).toLowerCase().includes(term.toLowerCase()) && !flag){
                flag = true
            }
        })
        propertiesV.forEach((propertyV)=>{
            if( ( (item[key] as V )[propertyV] as string).toLowerCase().includes(term.toLowerCase()) && !flag) {
                flag = true
            }
        })
        return flag
    })
}