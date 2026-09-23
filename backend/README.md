# Udhamshil Nepal

A Django project folder structure is generated with [djinitx/djinit/dj](https://github.com/S4NKALP/djinit).

## Setup

### Using Just (Recommended)

1. Set environment variables in `.env` file

2. Run setup (installs dependencies, runs migrations, creates superuser):

   ```bash
   just setup
   ```

3. Start development server:

   ```bash
   just dev
   ```

## Available Commands

Run `just` to see all available commands, including:

- `just dev` - Run development server
- `just migrate` - Run migrations
- `just makemigrations` - Create migrations
- `just createsuperuser` - Create superuser
- `just test` - Run tests
- `just lint` - Lint code
- `just format` - Format code
- `just shell` - Django shell
- `just clean` - Clean cache files
- `just install <package>` - Install package
- `just remove <package>` - Remove package
- `just server` - Run production server
- `just ci` - Run all linting and checks
- `just test-coverage` - Run tests with coverage

