export const parseError = (error) => {
    const data = { error: '' }
    if (error?.response?.data) {
      data.error = error.response.data
    } else if (error?.response?.status) {
      data.error = error?.response?.statusText
    } else {
      data.error = error?.message
    }
  
    return data
  }
  
  export const handleGenericError = (error) => {
    if (error?.response) {
      // The request was made, but the server responded with an error
      const { data, message } = error.response
      console.log(data)
      return (
        data?.data?.message ||
        data?.message ||
        data?.detail ||
        data?.email?.join(',') ||
        data?.error ||
        message
      )
    } else if (error?.message) {
      // The request was made, but no response was received
      return error.message
    } else if (error?.request) {
      // The request was made, but no response was received
      return 'No response received from the server.'
    } else {
      // Something happened in setting up the request that triggered an Error
      return 'An unexpected error occurred.'
    }
  }