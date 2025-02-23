+++
path =  '/snippets'
date = '2022-01-30'
title =  'Snippets'
+++

### Kubernetes aliases

_*Added: 30-01-2022*_

To be used in the control plane node(s) in a K8s cluster

```
cat << EOF > kubectl_aliases
# Kubectl aliases
alias k=kubectl
alias kg=”k get pods”
alias kks=”k -n kube-system”
alias kgd=”k get deploy”
alias kgn=”k get nodes”
alias kgs=”k get svc”
alias kge=”k get events — sort-by=’.metadata.creationTimestamp’ |tail -8"
complete -F __start_kubectl k
EOF

cat kubectl_aliases >> ~/.bashrc
rm kubectl_aliases

source ~/.bashrc
```

---
### Git: Delete all branches but master

_*Added: 01-02-2022*_

Alias to delete all but master branches (I use zsh, change `~/.zshrc` to `~/.bashrc` if you use bash)

```
echo 'alias gdb="git branch | grep -v "master" | xargs git branch -D"' >> ~/.zshrc
```

> I read it as *gbd* (git branches delete)

---

### Delete corrupted pods

_*Added: 02-02-2022*_

Deletes all pods from all namespaces marked as `Failed, Evicted` or `Pending`

```
kubectl get pods -A | grep Evicted | awk '{print $1}' | xargs kubectl delete pod

kubectl get pods -A | grep Failed | awk '{print $1}' | xargs kubectl delete pod

kubectl get pods -A | grep Pending | awk '{print $1}' | xargs kubectl delete pod
```

---

### Find Large files in Linux

_*Added: 12-02-2022*_
_*Updated: 11-10-2023*_

Find large files in Linux

```
sudo find / -xdev -type f -size +100M
```

```
# Go to a folder then get top 10 biggest files
sudo du -hsx -- * | sort -rh | head -10
```

---

### Clean systemd journal logs 

_*Added: 12-02-2022*_

Clean (vacuum) /var/log/journal logs (produced by systemd)

```
# Check space used
du -hs /var/log/journal/

# Clean logs older than 1 day
sudo journalctl --vacuum-time=1d
```

### Download SSL cert from website with openssl

_*Added: 14-02-2022*_

Save leaf/server cert to `/tmp/$SERVERNAME.cert`. Use `-showcerts` to download all certs in the chain. `echo -n` gives a response to the server so that connection is released

```
echo -n | openssl s_client -connect $HOST:$PORTNUMBER -servername $SERVERNAME | openssl x509 > /tmp/$SERVERNAME.cert
```

---
### Configure git cache 

_*Added: 17-02-2022*_

To avoid having to type your password/PAT all the time for HTTPS

```
# After you've entered the user password/PAT
git config --global credential.helper cache
```

---

### Convert squid proxy logs to timestamps

_*Added: 02-06-2022*_

To convert unix.centiseconds timestamp to a more readable format

```
cat access.log | perl -p -e 's/^([0-9]*)/"[".localtime($1)."]"/e'
```

---

### Aliases to get kubernetes resources (nodes)
_*Added: 15-08-2022*_

To get CPU/Mem requests/limits from the Kubernetes nodes

```
alias k8snoderesources='kubectl get nodes --no-headers | awk '\''{print $1}'\'' | xargs -I {} sh -c '\''echo {} ; kubectl describe node {} | grep Allocated -A 5 | grep -ve Event -ve Allocated -ve percent -ve -- ; echo '\'''
```

---

#### Alias to get kubernetes resources (cpu/mem)
_*Added: 15-08-2022*_

To get CPU/Mem requests/limits from the Kubernetes pods

```
alias k8spodresources='kubectl get po --all-namespaces -o=jsonpath="{range .items[*]}{.metadata.namespace}:{.metadata.name}{'\n'}{range .spec.containers[*]}  {.name}:{.resources.requests}{'\n'}{end}{'\n'}{end}"'
```

---

#### Interactive debug pod for Kubernetes
_*Added: 19-08-2022*_

Creates an ephemeral pod based on busybox (image can be anything) that will die on exit

```
kubectl run -i --tty --rm debug --image=busybox --restart=Never -- sh

# curl in busybox
kubectl run -i --tty --rm debug --image=yauritux/busybox-curl --restart=Never -- sh

# dns util
kubectl run -i --tty --rm dnsdebug --image=registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3 --restart=Never -- nslookup <svc>

```

---

### SSH Tunnel

_*Added: 24-08-2022*_

Create a ssh tunnel through a jump box / bastion host

On terminal 1
```
 ssh -i <BASTION_KEY> -N -L <PORT_TO_BIND_LOCALLY>:<HOST_ACCESSIBLE_FROM_BASTION>:<PORT_TO_LISTEN_FROM_BASTION> <USER>@<BASTION_HOST_IP_OR_DNS>
```

Keep this one open. This will tunnel the service at the specified port through SSH

On terminal 2 (check connection)
```
nc -vz localhost <PORT_TO_BIND_LOCALLY>
```

---

### Get K8s resources from multiple namespaces

_*Added: 12-09-2022*_

Get kubernetes resources from multiple namespaces

```
eval 'kubectl --namespace='{ns1, ns2}' get pod;'
```

---

### Remove finalizers from CRDs and K8s resources

_*Added: 22-09-2022*_

Remove all finalizer objects that block CRDs and K8s native resources from being terminanted

```
kubectl patch <RESOURCE> <NAME>  --type json -p='[{"op": "remove", "path": "/metadata/finalizers"}]';
```

---

### Use ProxyJump with SSH/SCP

_*Added: 05-10-2022*_

Use a Jump machine (bastion host) to copy a file or connect

```
# Copy locally using JumpHost
scp -o 'ProxyJump <JUMP_HOST_USER>@<JUMP_HOST>' -i <END_HOST_KEY> <END_HOST_USER>@<END_HOST>:~/file .


# Connect using JumpHost
ssh -J <JUMP_HOST_USER>@<JUMP_HOST> -i <END_HOST_KEY> <END_HOST_USER>@<END_HOST>
```

---

### Re-tag an existing AWS ECR Image using AWS cli

_*Added: 17-10-2022*_

Use a different tag on the same AWS ECR Docker image using AWS cli

```
# Get ECR Image manifest
MANIFEST=$(aws ecr batch-get-image --repository-name <REPO_NAME> --image-ids imageTag=<OLD_TAG> --query 'images[].imageManifest' --output text)

# Put new manifest (new tag)
aws ecr put-image --repository-name <REPO_NAME> --image-tag <NEW_TAG> --image-manifest "$MANIFEST" 
```

---

### Common PSQL commands
_*Added: 26-10-2022*_


1. Grant CONNECT to the database:

`GRANT CONNECT ON DATABASE database_name TO username;`

2. Grant USAGE on schema:

`GRANT USAGE ON SCHEMA schema_name TO username;`

3. Grant on all tables for DML statements: SELECT, INSERT, UPDATE, DELETE:

`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA schema_name TO username;`


4. Grant all privileges on all tables in the schema:

`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA schema_name TO username;`

5. Grant all privileges on all sequences in the schema:

`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA schema_name TO username;`

6. Grant all privileges on the database:

`GRANT ALL PRIVILEGES ON DATABASE database_name TO username;`

7. Grant permission to create database:

`ALTER USER username CREATEDB;`

8. Make a user superuser:

`ALTER USER myuser WITH SUPERUSER;`

9. Remove superuser status:

`ALTER USER username WITH NOSUPERUSER;`

Those statements above only affect the current existing tables. To apply to newly created tables, you need to use alter default. For example:

```
ALTER DEFAULT PRIVILEGES
FOR USER username
IN SCHEMA schema_name
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO username;
```

---

### Restart ALL deployments in a namespace in K8s

_*Added: 17-11-2022*_

```
for svc in $(k get deploy --no-headers | awk '{print $1}'); do kubectl rollout restart deploy $svc; done
```

---

### Terraform: Destroy all but desired module

_*Added: 12-12-2022*_

```
# Create destroy.plan without desired module
terraform plan -destroy $(for r in `terraform state list | fgrep -v module.save_me_from_obliteration` ; do printf " -target ${r} "; done) -out destroy.plan

# Apply destruction
terraform apply "destroy.plan"
```

Credit to [cmacrae](https://github.com/hashicorp/terraform/issues/2253#issuecomment-318665739)

### Install various Java versions with Homebrew in macOS

_*Added: 13-12-2022*_

Install homebrew

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Use AdoptOpenJDK

```
brew tap adoptopenjdk/openjdk

brew install --cask adoptopenjdk8
brew install --cask adoptopenjdk11
```

Modify your ~/.zshrc or ~/.bashrc

```
alias j11="export JAVA_HOME=`/usr/libexec/java_home -v 11`"
alias j8="export JAVA_HOME=`/usr/libexec/java_home -v 1.8`"
```

Reload 
```
source ~/.zshrc
```

Switch easily typing `j8` or `j11` 


---

### Get size of top docker storage layers 

_*Added: 04-01-2023*_

Get in a k8s worker node.


```
# Find top storage layers
TOP_STORAGE=$(du -hs /var/lib/docker/overlay2/* | grep -Ee '^[0-9]{3}[M]+|[0-9]G' | sort -h |tail -n 10 |tee -a /dev/stderr |awk '{print $2}'|xargs|sed 's/ /|/g')

# See which containers they belong to
docker inspect $(docker ps -q) | jq '.[]|.Config.Hostname,.Config.Labels."io.kubernetes.pod.name",.GraphDriver.Data.MergedDir,.hovno' | egrep -B2 "$TOP_STORAGE"
```

Credit to [rharshad.com](https://rharshad.com/eks-troubleshooting-disk-pressure/)


---

### Compress a large PDF with ghostscript

_*Added: 22-03-2023*_

```
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
-dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```

---

### Convert a SSL certificate/privatekey to a 1 line string

_*Added: 16-06-2023*_

```
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' ca.pem
```

---

### Add linux user and add it sudo 

_*Added: 27-07-2023*_

```
# Add user
sudo useradd -m -d /home/<username> -s /bin/bash <username>

# Change its password
sudo passwd <username>

# Add it to sudo access
sudo usermod -a -G sudo <username>
```

##### EXTRA: Create ssh key and add it to the newly created user

```
# Switch user
sudo su - <username>

# Create .ssh dir (in case it's not there)
mkdir ~/.ssh

# Create ed25519 ssh key
ssh-keygen -t ed25519 -C <username> -f ~/.ssh/<username> 

## Make sure to save the private key ~/.ssh/<username> 

# Make sure you can see public key
cat ~/.ssh/<username>.pub

# Add ssh key for user in authorized_keys
echo $(cat ~/.ssh/<username>.pub) >> ~/.ssh/authorized_keys

# Change mode for ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Logout and try to login with private key you saved earlier
ssh -i ~/.ssh/<username> <username>@<ip-address>
```

### Write a file in a machine where the folder doesn't belong to the ssh user (scp workaround)

_*Added: 29-11-2023*_

Suppose you have the ssh key for the `ubuntu` user, which can `sudo`, but inside the machine you want to put a file in the folder `/does/not/belong/to/ubuntu/` which belongs to user `oscar`

Solution (only works if ssh user can use `sudo`) is to use `tee` and then reassign ownership

```
cat <<EOF > secret
RQNQKvlJIj8rvktFi7SjqnTx1hHwGxXgkKfwljowLUo= # dummy data
EOF

cat secret | ssh -i ~/.ssh/key ubuntu@<IP> "sudo tee /does/not/belong/to/ubuntu/secret; sudo chown -R oscar:oscar /does/not/belong/to/ubuntu/secret"
```

### Check connectivity for TCP and UDP using netcat

_*Added: 07-12-2023*_

```
# TCP
nc -vz  <IP> <PORT>

# UDP
nc -vuzw 3  <IP> <PORT>
```

### Kill process listening on specific port

_*Added: 08-01-2024*_

```
PORT=8080; lsof -i TCP:${PORT} | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Delete k8s namespace stuck in Terminating

https://stackoverflow.com/a/53661717
_*Added: 20-02-2024*_


```
(
    NAMESPACE=<NAMESPACE>
    kubectl proxy &
    kubectl get namespace $NAMESPACE -o json |jq '.spec = {"finalizers":[]}' >temp.json
    curl -k -H "Content-Type: application/json" -X PUT --data-binary @temp.json 127.0.0.1:8001/api/v1/namespaces/$NAMESPACE/finalize
)
```

### Install Docker on Ubuntu 22.04

[docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

_*Added: 29-02-2024*_

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Test
sudo docker run hello-world
```