const API_ENDPOINT = "http://localhost:8080"
const API_PATH = {
    AUTH: "/auth",
    PRODUCT: "/product/"
}

const APIService = {
    User: {
        login: (data: FormData) => 
            fetch(`${API_ENDPOINT}${API_PATH.AUTH}/login`, {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(data)),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()),

        register: (data: FormData) => 
            fetch(`${API_ENDPOINT}${API_PATH.AUTH}/signup`, {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(data)),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()),

        verifyAccessToken: (token: String) => 
            fetch(`${API_ENDPOINT}${API_PATH.AUTH}/verify`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.status)
    },

    Products: {
        delete: (id: number, token: String) => 
            fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json()),

        list: () => fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`)
            .then(res => res.json())
            .then(result => result.products),

        add: (data: FormData, token: String) => 
            fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`, {
                method: "POST",
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
    }
}


export default APIService