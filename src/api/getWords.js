const getData= () => {
    return fetch(window.server || 'db.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(myJson) {
        return myJson
    })
}

const getWords = async (value) => {
    let data = await getData()
    console.log(data, typeof data)
    if(data?.hasOwnProperty('words')) {
        data = data.words
    }
    if(data?.length > 0) {
        return data?.reduce((arr,curr) => {
            if(curr.value.toUpperCase().includes(value.toUpperCase())) { 
                arr.push(curr)
            }
            return arr
        }, [])
    }
}

export default getWords