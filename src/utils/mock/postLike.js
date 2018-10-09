import database from './database.json';

export default function postLike(request, response) {
  if (!request.header('X-Token')) {
    return response
      .body(JSON.stringify({ error: '401001#Unauthorized' }))
      .header('Content-Type', 'application/json')
      .status(401);
  }

  let { page } = request.url().query;
  const postData = database.posts.filter(p => p.isUserLike);

  page = parseInt(page, 10);

  const total = postData.length;
  const start = (page - 1) * 10;
  const end = page * 10;

  return response
    .body(JSON.stringify({ posts: postData.slice(start, end), total }))
    .header('Content-Type', 'application/json')
    .status(200);
}
