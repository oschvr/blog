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
