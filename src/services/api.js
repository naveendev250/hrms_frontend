const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }))
    throw new Error(error.detail || error.message || 'An error occurred')
  }
  return response.json()
}

// Employee API
export const employeeAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/employees/`)
    return handleResponse(response)
  },

  getById: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`)
    return handleResponse(response)
  },

  create: async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })
    return handleResponse(response)
  },

  delete: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  },
}

// Attendance API
export const attendanceAPI = {
  getAll: async (fromDate = null, toDate = null) => {
    const params = new URLSearchParams()
    if (fromDate) params.append('from_date', fromDate)
    if (toDate) params.append('to_date', toDate)
    const queryString = params.toString() ? `?${params.toString()}` : ''
    const response = await fetch(`${API_BASE_URL}/api/attendance/${queryString}`)
    return handleResponse(response)
  },

  getByEmployee: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance/employee/${employeeId}`)
    return handleResponse(response)
  },

  create: async (attendanceData) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    })
    return handleResponse(response)
  },
}
