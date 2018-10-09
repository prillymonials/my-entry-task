export default function postPast(request, response) {
  if (!request.header('X-Token')) {
    return response
      .body(JSON.stringify({ error: '401001#Unauthorized' }))
      .header('Content-Type', 'application/json')
      .status(401);
  }

  return response
    .body(JSON.stringify({ posts: [], total: 0 }))
    .header('Content-Type', 'application/json')
    .status(200);
}
