
# SHOP_CO_BACKEND

## Installation

First, install the required packages:

```bash
npm install
```

## Environment Setup

Duplicate the `.env-example` file and add the necessary information:

```plaintext
ACTIVE_DB=          # Specify the database type: pg, mysql, or remotepg

POSTGRES_URL=      # URL for your PostgreSQL database

JWT_TOKEN=         # Secret key for JWT authentication

CLOUDINARY_NAME=   # Your Cloudinary account name
CLOUDINARY_SECRET= # Your Cloudinary account secret
CLOUDINARY_KEY=    # Your Cloudinary API key
```

### Database Options

- **pg**: Use this for a local PostgreSQL database.
- **mysql**: Use this for a MySQL database.
- **remotepg**: Use this for a remote PostgreSQL database.

## Running Migrations

To run the database migrations, execute:

```bash
npm run knex migrate:latest
```

## Starting the Application

To run the application locally, use:

```bash
npm run start:dev
```

## Additional Information

- Ensure that your database service is running before executing migrations.
