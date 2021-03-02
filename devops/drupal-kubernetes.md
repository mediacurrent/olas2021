# Drupal + Kubernetes

- [Drupal Hosted on Kubernetes](https://www.youtube.com/watch?v=GJSWU1JDaII)
- [Running Drupal on Kubernetes the "Easy Way"](https://www.youtube.com/watch?v=2R-OFmCOp34)

- Concepts
    - API based
    - Self-healing, declarative
    - Containers are immutable (Docker container registries)
    - Stateless by default
    - Load balancers and ingress
    - Services
    - Deployments
    - Pods
    - Nodes
    - Helm (package manager)
        - https://github.com/bitnami/charts/tree/master/bitnami/drupal/
- Pitfalls
    - Public/private files
    - Databases
- Local, On-Prem, and Managed Hosting
    - Local allows devs to exactly match dev/stage/prod
    - On-Prem gives most control, but most overhead
    - Managed (GKE, EKS, AKS) allow for a middle ground

# Local Example

For this example deployment, we have several files that need to be created and run.

## Set up the nginx ingress controller

In order to route requests for a specific hostname to our service, we'll need an nginx ingress controller installed to our cluster. This can be done with the following command:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
```

## Files

We'll need the following files for our local cluster:

- ingress.yaml
- volumes.yaml
- drupal-deployment.yaml
- mysql-deployment.yaml
- kustomization.yaml

### ingress.yaml

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-drupal-host
spec:
  rules:
  - host: "drupal.k8s.site.local"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: drupal
            port:
              number: 8081
```

### volumes.yaml

```yaml
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: drupal-volume
provisioner: docker.io/hostpath
reclaimPolicy: Retain
volumeBindingMode: Immediate
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: drupal-claim
  labels:
    app: drupal
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: drupal-volume
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-claim
  labels:
    app: drupal
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: drupal-volume
```

### drupal-deployment.yaml

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: drupal
  labels:
    app: drupal
spec:
  ports:
    - port: 8081
      protocol: TCP
      name: web
      targetPort: 80
  selector:
    app: drupal
    tier: frontend
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: drupal
  labels:
    app: drupal
    tier: frontend
spec:
  selector:
    matchLabels:
      app: drupal
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: drupal
        tier: frontend
    spec:
      initContainers:
        - name: init-sites-volume
          image: drupal:latest
          command: ['/bin/bash', '-c']
          args: ['cp -r /var/www/html/sites /data; chown www-data:www-data /data/ -R']
          volumeMounts:
            - mountPath: /data
              name: drupal
      containers:
        - image: drupal:latest
          name: drupal
          env:
            - name: DRUPAL_DATABASE_HOST
              value: drupal-mysql
            - name: DRUPAL_DATABASE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-pass
                  key: password
          ports:
            - containerPort: 8081
              name: drupal
          volumeMounts:
            - name: drupal
              mountPath: /var/www/html/modules
              subPath: modules
            - name: drupal
              mountPath: /var/www/html/profiles
              subPath: profiles
            - name: drupal
              mountPath: /var/www/html/sites
              subPath: sites
            - name: drupal
              mountPath: /var/www/html/themes
              subPath: themes
      volumes:
        - name: drupal
          persistentVolumeClaim:
            claimName: drupal-claim
```

### mysql-deployment.yaml

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: drupal-mysql
  labels:
    app: drupal
spec:
  ports:
    - protocol: TCP
      port: 3306
  selector:
    app: drupal
    tier: backend
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  labels:
    app: drupal
spec:
  selector:
    matchLabels:
      app: drupal
      tier: backend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: drupal
        tier: backend
    spec:
      containers:
        - image: mysql:latest
          name: mysql
          env:
            - name: MYSQL_DATABASE
              value: drupal-db
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                 secretKeyRef:
                  name: mysql-pass
                  key: password
          ports:
            - containerPort: 3306
              name: mysql
              protocol: TCP
          volumeMounts:
            - name: mysql
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql
          persistentVolumeClaim:
            claimName: mysql-claim
```

### kustomization.yaml

```yaml
---
secretGenerator:
- name: mysql-pass
  literals:
  - password=MySQLpassword
resources:
  # - volumes.yaml
  - ingress.yaml
  - mysql-deployment.yaml
  - drupal-deployment.yaml
# To connect in Drupal's admin
# Host: drupal-mysql
# User: root
# Pass: MySQLpassword
```

## Running the cluster

Putting those all together, you can start the cluster with the following commands:

```
kubectl apply -f volumes.yaml && kubectl apply -k ./
```

## Stopping the cluster

To stop the services

```
kubectl delete -k ./
```

To delete the persistent volumes

```
kubectl delete -f volumes.yaml
```