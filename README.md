# Test AI App

A simple Hello World web application ready for deployment to DigitalOcean via GitLab CI/CD.

## Project Structure

- `index.html` - Main HTML page
- `styles.css` - Styling
- `script.js` - Client-side JavaScript
- `pom.xml` - Maven configuration (for Java components)
- `src/` - Java source code

## Local Development

### Using Docker

1. Build the Docker image:
```bash
docker build -t test-ai-app .
```

2. Run the container:
```bash
docker run -d -p 8080:80 test-ai-app
```

3. Open your browser and navigate to `http://localhost:8080`

### Using Docker Compose

```bash
docker-compose up -d
```

## Deployment to DigitalOcean

This project is configured for automated deployment to DigitalOcean via GitLab CI/CD.

**Deployment Request**: See `OPS_DEPLOYMENT_REQUEST.md` for deployment requirements and specifications.

### Prerequisites

1. GitLab repository with CI/CD enabled
2. DigitalOcean account
3. Docker registry (GitLab Container Registry or DigitalOcean Container Registry)

### Deployment Status

- ✅ Dockerfile configured
- ✅ GitLab CI/CD pipeline structure ready
- ✅ Build stage configured
- ⏳ Deploy stage implementation pending (see OPS_DEPLOYMENT_REQUEST.md)
- ⏳ Infrastructure provisioning pending
- ⏳ Credentials configuration pending

### Required Credentials

Credentials should be configured in `test-ai/.env` and GitLab CI/CD variables:

**For Build:**
- `CI_REGISTRY_USER` - GitLab registry username
- `CI_REGISTRY_PASSWORD` - GitLab registry password
- `CI_REGISTRY` - Container registry URL

**For Deploy (varies by deployment method):**
- See `OPS_DEPLOYMENT_REQUEST.md` for specific credential requirements based on selected deployment method (App Platform, Droplet, or Kubernetes)

### Manual Deployment (For Testing)

If you prefer manual deployment for testing:

```bash
# Build and push to registry
docker build -t registry.gitlab.com/your-group/test-ai-app:latest .
docker push registry.gitlab.com/your-group/test-ai-app:latest

# On DigitalOcean Droplet
docker pull registry.gitlab.com/your-group/test-ai-app:latest
docker run -d -p 80:80 --name test-ai-app --restart unless-stopped registry.gitlab.com/your-group/test-ai-app:latest
```

## License

MIT

