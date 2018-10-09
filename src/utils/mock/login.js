export default function login(request, response) {
  const { email, password } = JSON.parse(request.body());

  if (email.length === 0) {
    return response
      .body(JSON.stringify({ error: 'Email is required.' }))
      .header('Content-Type', 'application/json')
      .status(400);
  }

  if (password.length === 0) {
    return response
      .body(JSON.stringify({ error: 'Password is required.' }))
      .header('Content-Type', 'application/json')
      .status(400);
  }

  if (email === 'user@blackcat.com' && password === 'password') {
    return response
      .body(
        JSON.stringify({
          name: 'User',
          username: 'Username',
          email: 'user@blackcat.com',
          token: 'ThisIsFakeToken',
          avatarUrl: '/assets/avatar01.png',
        }),
      )
      .header('Content-Type', 'application/json')
      .status(200);
  }

  return response
    .body(JSON.stringify({ error: 'Invalid username or password.' }))
    .header('Content-Type', 'application/json')
    .status(400);
}
