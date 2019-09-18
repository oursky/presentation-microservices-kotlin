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
            .then(res => res.json())
    },

    Products: {
        delete: (id: number) => 
            fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(result => result.success),

        list: () => fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`)
            .then(res => res.json())
            .then(result => result.products),

        add: (data: FormData) => 
            fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`, {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(result => result.productId)
    }
}


export default APIService