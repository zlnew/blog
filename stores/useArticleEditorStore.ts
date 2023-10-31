interface FormPayload {
  title: string
  content: string
  image: string | Blob
  image_caption: string
  read_estimation: string | number
  tags: []
}

interface FormValidation {
  message: string
  errors: {
    path: string
    message: string
  }[]
}

export const useArticleEditorStore = defineStore('articleEditor', () => {
  const { auth: { accessToken } } = useAuthStore()

  const form = reactive({
    payload: <FormPayload>{
      title: '',
      content: '',
      image: '',
      image_caption: '',
      read_estimation: '',
      tags: []
    },
    validation: <FormValidation>{
      message: '',
      errors: []
    },
    processing: false
  })

  async function store (payload: any) {
    form.processing = true

    const { status, data } = await useFetch('/api/articles/store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: payload,
      watch: false,
      onResponse ({ response }) {
        if (response.status === 422) {
          form.validation.errors = setValidationErrors(response._data.data.errors)
        }
      }
    })

    form.processing = false

    return {
      status,
      data
    }
  }

  async function update (payload: any, id: string) {
    form.processing = true

    const { status, data } = await useFetch('/api/articles/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id
      },
      body: payload,
      watch: false,
      onResponse ({ response }) {
        if (response.status === 422) {
          form.validation.errors = setValidationErrors(response._data.data.errors)
        }
      }
    })

    form.processing = false

    return {
      status,
      data
    }
  }

  async function destroy (id: string) {
    form.processing = true

    const { status, data } = await useFetch('/api/articles/destroy', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id
      },
      watch: false
    })

    form.processing = false

    return {
      status,
      data
    }
  }

  return {
    form,
    actions: {
      store,
      update,
      destroy
    }
  }
})
