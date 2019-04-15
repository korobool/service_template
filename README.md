## 


## How to clone and run quickly on ubuntu
### cloning and going inside the repo 
```
git clone git@github.com:korobool/service_template.git
cd service_template/
```

### Install things from NODE.js universe (optional, won't be used in runtime)
NodeJS wan't be used in runtime, but provides good toolbox to config react app
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo npm install babel babel-cli webpack webpack-cli webpack-dev-server -g
```

### Building
```
cd static/
npm install
npm run build

```

### Running docker with RabbitMQ to provide queue functionality
We need something to be able to deligate computational bound things to workers. 
RabbitMQ is a one of the possible option.
```
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### Running the instance that makes everything works on localhost:port
```
cd ..
mkvirtualenv -p python3 <venvname>
pip install aiohttp pika 
python endpoint.py
```