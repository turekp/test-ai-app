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

**⚠️ OPS Team Action Required**: This application is ready for deployment but requires OPS team configuration. Please see `OPS_DEPLOYMENT_REQUEST.md` for detailed requirements.

This project is configured for automated deployment to DigitalOcean via GitLab CI/CD.

### OPS Team Setup Required

The OPS team needs to:
1. Review `OPS_DEPLOYMENT_REQUEST.md` for deployment requirements
2. Select deployment method (App Platform, Droplet, or Kubernetes)
3. Configure credentials in `test-ai/.env` file
4. Update `.gitlab-ci.yml` deploy stage with selected method
5. Configure GitLab CI/CD variables (see below)

### Prerequisites

1. GitLab repository with CI/CD enabled
2. DigitalOcean account (configured by OPS team)
3. Docker registry (GitLab Container Registry or DigitalOcean Container Registry)

### GitLab CI/CD Variables

**OPS Team**: Configure the following variables in GitLab Settings > CI/CD > Variables:

**Required for Build:**
- `CI_REGISTRY_USER` - GitLab registry username
- `CI_REGISTRY_PASSWORD` - GitLab registry password (masked)
- `CI_REGISTRY` - Container registry URL (e.g., `registry.gitlab.com`)

**Required for Deploy (choose based on deployment method):**

**Option 1: App Platform Webhook**
- `DIGITALOCEAN_DEPLOY_WEBHOOK_URL` - Webhook URL from DigitalOcean App Platform

**Option 2: Droplet SSH Deployment**
- `DIGITALOCEAN_SSH_USER` - SSH username
- `DIGITALOCEAN_HOST` - Droplet IP or hostname
- `DIGITALOCEAN_SSH_PRIVATE_KEY` - SSH private key (masked, protected)
- `DIGITALOCEAN_SSH_PORT` - SSH port (default: 22)

**Option 3: Kubernetes**
- `DIGITALOCEAN_KUBECONFIG` - kubeconfig file content (masked, protected)
- `DIGITALOCEAN_NAMESPACE` - Kubernetes namespace (default: default)

**Application Configuration:**
- `APP_URL` - Public URL where app will be accessible

### Deployment Status

- ✅ Dockerfile configured
- ✅ GitLab CI/CD pipeline structure ready
- ✅ Build stage configured
- ⏳ Deploy stage awaiting OPS team configuration
- ⏳ Credentials need to be added to `test-ai/.env`

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

