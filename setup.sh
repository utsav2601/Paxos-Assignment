##if created previously, cleanup 
docker container stop p-container
docker container rm p-container

##Build image using Dockerfile
echo -e "Building docker image on top of nodejs image"
docker build -t p-image:assignment .

##Run container
background="-d"
echo -e "Running docker using created image"
docker run -p 8080:8080 $background --name p-container p-image:assignment

##Access bash on docker
#docker exec -it p-container bash



