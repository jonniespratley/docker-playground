import time
import os
import socket
import redis
import json
from flask import Flask, render_template, request

app = Flask(__name__)

redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379')
redis_host = os.getenv('REDIS_HOST', 'localhost')
db = redis.StrictRedis(host=redis_host, port=6379, db=0)
#r.set('foo', 'bar');
#app.logger.debug('from redis', r.get('foo'));
# Connect to Redis
#cache = redis.Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)
#db = redis.Redis('localhost') #connect to server
#app.logger.info('redis_host', redis_host)
#app.logger.info('redis_url', redis_url)

def get_hit_count():
    retries = 5
    #app.logger.debug('get_hit_count');
    while True:
        try:
            return db.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

#
@app.route('/')
def index():
    try:
        visits = db.incr("counter")
    except redis.exceptions.ConnectionError as exc:
        visits = "<i>cannot connect to Redis, counter disabled</i>"

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" \
           "<b>Visits:</b> {visits}"

    #return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)
    return render_template('index.html', hostname=socket.gethostname(), visits=visits, redis_host=redis_host, redis_url=redis_url)



@app.route('/home', defaults={'path': ''}, methods = ['PUT', 'GET'])
def home(path):
    if (request.method == 'PUT'):
        event = request.json
        db.hmset(path, event) #store dict in a hash
        return json.dumps(event), 201
 
    if not db.exists(path): #does the hash exist?
        return "Error: thing doesn't exist"
 
    event = db.hgetall(path) #get all the keys in the hash
    return json.dumps(event), 200
#
@app.route('/cache')
def cache():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % subpath



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)