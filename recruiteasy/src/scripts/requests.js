export const get = async (url, token) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
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