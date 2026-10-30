const demoPassword = 'EatsDemo123!'

const demoUsers = [
  { id: 'user-selam', name: 'Selam Tesfaye', email: 'selam@example.com', password: demoPassword },
  { id: 'user-dawit', name: 'Dawit Bekele', email: 'dawit@example.com', password: demoPassword },
]

export function authenticateDemoUser(email, password) {
  return demoUsers.find(
    (user) => user.email === email.trim().toLowerCase() && user.password === password,
  ) || null
}

export function getDemoUser(userId) {
  const user = demoUsers.find((item) => item.id === userId)
  return user ? { id: user.id, name: user.name, email: user.email } : null
}

export function listDemoUsers() {
  return demoUsers.map(({ id, name, email }) => ({ id, name, email }))
}
