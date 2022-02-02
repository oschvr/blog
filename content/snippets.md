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