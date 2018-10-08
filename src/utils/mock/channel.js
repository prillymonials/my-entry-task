import database from './database.json';

export default function channel(request, response) {
  if (!request.header('X-Token')) {
    return response
      .body(JSON.stringify({ error: '401001#Unauthorized' }))
      .header('Content-Type', 'application/json')
      .status(401);
  }

  return response
    .body(JSON.stringify({ channels: database.channels }))
    .header('Content-Type', 'application/json')
    .status(200);
}
