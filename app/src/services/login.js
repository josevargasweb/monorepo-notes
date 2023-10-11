const baseUrl = '/api/login'

export const login = async credentials => {
  return await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}
