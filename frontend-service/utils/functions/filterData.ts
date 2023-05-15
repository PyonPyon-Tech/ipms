export function filterData<T extends Object>(data: T[], term: string, properties: (keyof T)[] ): T[]{
    const filteredData: T[] = []
    data.forEach((item: T) => {
        let flag = false;
        properties.forEach(property=>{
            if(typeof item[property] == 'string'){
                if((item[property] as string).toLowerCase().includes(term.toLowerCase())){
                    flag = true
                }
            }
        })
        if(flag){
            filteredData.push(item)
        }
    })
    return filteredData
}

export function filterDataOnlyNested<T extends Object, V extends Object>(data: T[], key: keyof T , term: string, propertiesV: (keyof V)[]): T[]{
    return data.filter((item)=>{
        let flag = false;

        propertiesV.forEach((propertyV)=>{
            if( ( (item[key] as V )[propertyV] as string).toLowerCase().includes(term.toLowerCase()) && !flag) {
                flag = true
            }
        })
        return flag
    })
}

export function filterDataNested<T extends Object, V extends Object>(data: T[], key: keyof T , term: string, propertiesT: (keyof T)[],  propertiesV: (keyof V)[]): T[]{
    return data.filter((item)=>{
        let flag = false;
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

export function filterDataDoublyNested<T extends Object, V1 extends Object, V2 extends Object>(data: T[], key1: keyof T, key2: keyof V1, term: string, propertiesV: (keyof V2)[]): T[] {
    return data.filter((item) => {
      let flag = false;
  
      propertiesV.forEach((propertyV) => {
        if ((((item[key1] as V1)[key2] as V2)[propertyV] as string).toLowerCase().includes(term.toLowerCase()) && !flag) {
          flag = true;
        }
      });
  
      return flag;
    });
  }
  