# joplin note web client
 A webbased Joplin Note client
* Deply it on a static web server and connect to the joplin clipper API port.
* You can also use this https://kikoqiu.github.io/Webnote/ . All code is run in browser, nothing is sent to the server.
* If you want to use it on the internet, you can redirect the clipper server's port with a reverse proxy.
* You can install the joplin cli and use `joplin server start` to start a clipper server.
* Remenber to set the token with `:config api.token 123456` to set the api token first.
