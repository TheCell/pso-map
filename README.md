# Pso-map
pso map for custom markers

This project uses Angular 11 with OpenLayers and the database is designed using dotnet ef core

# Setup
## Frontend
navigate to /pso-map and run
`npm install`
start the frontend via
`npm start`

## Backend
to develop the database navigate to /psomysqlefcore and run
`dotnet tools restore`

navigate to /pso-backend
`composer install`

after working on the php, don't forget to update composer with
`composer dumpautoload -o`

This project is using XAMPP / LAMPP. Create a symlink to your git backend folder in your xampp folder: C:\xampp\htdocs\psomap. You should find the .env file and others directly there and the subfolder public should can be found there too. Make sure you can access the API via http://localhost/psomap/public/
Remove the .dev from the .env.dev file to get development started

## Setup the Db

Start mysql and apache. Navigate to http://localhost/phpmyadmin/ create a new database named 'psomap'. Copy the content of mysqlScript.sql and paste it into the SQL tab on the local page to setup the db.

## Generating the db script
navigate to /psomysqlefcore with the PowerShell
`dotnet ef migrations script -o mysqlScript.sql`

to get only the deltas between migrations use the command 
`dotnet ef migrations script 20210521141501_initial otherMigrationName -o mysqlScript.sql`

to add a new migration after a change run
`dotnet ef migrations add AddedXYZ`