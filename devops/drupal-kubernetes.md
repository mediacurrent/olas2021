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