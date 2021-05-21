# pso-map
pso map for custom markers

This project uses Angular 11 with OpenLayers and the database is designed using dotnet ef core

# setup
navigate to /pso-map and run
`npm install`
start the frontend via
`npm start`

to develop the database navigate to /psomysqlefcore and run
`dotnet tools restore`

# generating the db script
navigate to /psomysqlefcore with the PowerShell
`dotnet ef migrations script -o mysqlScript.sql`

to get only the deltas between migrations use the command 
`dotnet ef migrations script 20210521141501_initial otherMigrationName -o mysqlScript.sql`

to add a new migration after a change run
`dotnet ef migrations add AddedXYZ`