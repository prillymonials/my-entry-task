import database from './database.json';

export default function post(request, response) {
  if (!request.header('X-Token')) {
    return response
      .body(JSON.stringify({ error: '401001#Unauthorized' }))
      .header('Content-Type', 'application/json')
      .status(401);
  }

  /* eslint-disable */
  let { page, start_at, end_at } = request.url().query;
  const { channel_name } = request.url().query;
  let post = database.posts;

  page = parseInt(page, 10);
  if (start_at && end_at) {
    start_at = parseInt(start_at, 10);
    end_at = parseInt(end_at, 10);

    post = post.filter(p => !(p.startAt > end_at || p.endAt < start_at));
  }

  if (channel_name && channel_name !== 'All') {
    post = post.filter(p => p.channelName === channel_name);
  }
  /* eslint-enable */

  const total = post.length;
  const start = (page - 1) * 10;
  const end = page * 10;

  return response
    .body(JSON.stringify({ posts: post.slice(start, end), total }))
    .header('Content-Type', 'application/json')
    .status(200);
}
