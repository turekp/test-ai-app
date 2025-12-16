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

### Prerequisites

1. GitLab repository with CI/CD enabled
2. DigitalOcean account
3. Docker registry (GitLab Container Registry or DigitalOcean Container Registry)

### GitLab CI/CD Variables

Configure the following variables in GitLab Settings > CI/CD > Variables:

- `CI_REGISTRY_USER` - GitLab registry username
- `CI_REGISTRY_PASSWORD` - GitLab registry password
- `CI_REGISTRY` - Container registry URL (e.g., `registry.gitlab.com`)

For DigitalOcean deployment, add one of the following:

**Option 1: App Platform Webhook**
- `DIGITALOCEAN_DEPLOY_WEBHOOK_URL` - Webhook URL from DigitalOcean App Platform

**Option 2: Droplet SSH Deployment**
- `DIGITALOCEAN_SSH_USER` - SSH username
- `DIGITALOCEAN_HOST` - Droplet IP or hostname
- `DIGITALOCEAN_SSH_PRIVATE_KEY` - SSH private key (masked variable)

### Deployment Options

#### Option 1: DigitalOcean App Platform

1. Create a new App in DigitalOcean App Platform
2. Connect your GitLab repository
3. Configure build settings:
   - Build Command: `docker build -t app .`
   - Run Command: `docker run -p 8080:80 app`
4. Add the deployment webhook URL to GitLab CI/CD variables

#### Option 2: DigitalOcean Droplet

1. Create a Droplet with Docker installed
2. Set up SSH access
3. Configure the deployment script in `.gitlab-ci.yml` to SSH into the droplet
4. Pull and restart containers on the droplet

### Manual Deployment

If you prefer manual deployment:

```bash
# Build and push to registry
docker build -t registry.gitlab.com/your-group/test-ai-app:latest .
docker push registry.gitlab.com/your-group/test-ai-app:latest

# On DigitalOcean Droplet
docker pull registry.gitlab.com/your-group/test-ai-app:latest
docker run -d -p 80:80 --name test-ai-app registry.gitlab.com/your-group/test-ai-app:latest
```

## License

MIT

