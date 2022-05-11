+++
path =  '/whatip'
date = '2022-05-10'
title =  'whatip.info'

cover = 'https://oschvr.s3.us-west-2.amazonaws.com/whatip.jpg'
+++


Introducing (whatip.info)[https://whatip.info]. A very very simple Go program behind an NGINX server to resolve and return the remote IPv4 (and soon IPv6) address.

My motivation behind it is dead simple: I need that exact functionality from something I know I control. Prior to this, I was using several alternatives:

- ifconfig.me
- ifconfig.co
- icanhazip.com

All work great but I wished to `curl` something of my own making. Thus `whatip.info` was born. Here's the code:

```go
package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/gorilla/mux"
)


//IPHandler function to attempt to get IP from headers, or request object
func IPHandler(w http.ResponseWriter, r *http.Request) {

	// Local var to store ip addr
	var realIp string

	// Get IP from headers or Request obj
	// Attempt to get it from X-Forwarded-For header
	if r.Header.Get("X-Forwarded-For") != "" {
		realIp = r.Header.Get("X-Forwarded-For")

	// Attempt X-Real-Ip header
	} else if r.Header.Get("X-Real-Ip") != "" {
		realIp = r.Header.Get("X-Real-Ip")
		log.Printf("🔵 [INFO] X-Real-Ip %s \n", realIp)

	// Use r.RemoteAddr to get it if none of above worked
	} else {
		ip, _, err := net.SplitHostPort(r.RemoteAddr)
		fmt.Printf("RemoteAddr: %s \n", ip)
		if err != nil {
			log.Fatalln("🔴 [ERROR] Could not get Remote Address", err)
		}
		realIp = ip
	}

	// Write header and 200 response
	w.WriteHeader(http.StatusOK)

	//Write back IP address
	w.Write([]byte(realIp))
}

// main function that implements a http server (gorila mux)
func main() {

	// Create router
	r := mux.NewRouter()
	r.HandleFunc("/", IPHandler)
	port := ":8080"

	// Run server
	if err := http.ListenAndServe(port, r); err != nil {
		log.Panicln("🔴 [ERROR] Error starting server", err)
	}
}

```

As you can see, it is dead simple. The program runs a webserver with a powerful http router, and it attempts to get the IPv4 address from headers or request object.

This is running it in an Oracle Cloud Infrastructure (_"Always Free"_)[https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm] VM. Which means, I'm using a *VM.Standard.E2.1.Micro* (1/8 vCPUs and 1Gb of Ram Memory, 480 Mbps i/o and 1 VNIC)


For https traffic, I'm using (Let's Encrypt free ssl with Nginx via certbot)[https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04]. My NGINX configuration looks like the following

```shell
# Another block for http/80 traffic
server {

        # Usually managed by certbot
        # More: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
        listen [::]:443 ssl ipv6only=on;
   	    listen 443 ssl;
        ssl_certificate </path/to/cert>;
        ssl_certificate_key </path/to/key>;
   	    include </path/to/nginx/conf>;
        ssl_dhparam </path/to/ssl/conf>;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;
        server_name whatip.info;

        # Use proxy pass and proxy set header to use NGINX as reverse proxy
        # More: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
        location / {
                proxy_pass http://localhost:8080;

                proxy_set_header   Host               $host;
                proxy_set_header   X-Real-IP          $remote_addr;
                proxy_set_header   X-Forwarded-Proto  $scheme;
                proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
        }
}
```

Try it now in your terminal:

```
curl https://whatip.info
```