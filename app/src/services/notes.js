const baseUrl = '/api/notes'

export const noteService = {
  token: null,
  setToken (newToken) {
    this.token = `Bearer ${newToken}`
  },
  getAll () {
    return fetch(baseUrl)
      .then(response => response.json())
  },
  async create (newObject) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: this.token
      },
      body: JSON.stringify(newObject)
    })

    return response.json()
  },
  update (id, newObject) {
    return fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: this.token
      },
      body: JSON.stringify(newObject)
    }).then(response => response.json())
  }
}
