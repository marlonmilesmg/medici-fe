# Frontend Deployment Steps

## 1. Port Forwarding

Forward the local port 3000 to the Kubernetes service for user registration:

```bash
kubectl port-forward service/user-registration 3000:80
```

## 2. Docker Image
Navigate to the frontend application's directory and build the Docker image:

```bash
docker build -t user-registration:latest .
```

## 3. Push Docker Image to Docker Hub
Push the newly created image to your Docker Hub repository:

```bash
docker push marlonmilesmg/user-registration:latest
```

## 4. Apply Deployment
Apply the Kubernetes deployment configuration from deployment.yaml:
```bash
kubectl apply -f deployment.yaml
```

## 5. Verify Port Forwarding (if necessary)
Start port-forwarding to verify the service:

```bash
kubectl port-forward service/user-registration 3000:80
```

## 6. Run Tests
Run your tests to ensure the frontend application is functioning as expected:

```bash
npm test
```

## References

Frontend Docker Hub: User Registration Frontend

https://hub.docker.com/repository/docker/marlonmilesmg/user-registration/general