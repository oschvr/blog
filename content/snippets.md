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

Find large files in Linux

```
sudo find / -xdev -type f -size +100M
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