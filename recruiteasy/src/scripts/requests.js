export const get = async (url, token, extra={}) => {
    let header = {}

    if(token){
        header['Authorization'] = `Token ${token}`
    }

    if(Object.keys(extra).length > 0){
        header = Object.assign({}, header, extra)
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: header
    })
    
    return await res.json()
}


export const post = async (url, token, body) => {
    let header = {'Content-Type': 'application/json'}

    if(token){
        header['Authorization'] = `Token ${token}`
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    })
    return await res.json()
}


export const patch = async (url, body) => {
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body)
    })
    
    return await res.json()
}