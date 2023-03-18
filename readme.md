# Installing MySql

- Working on Mac Pro OS ARM M1
- Download MySql server from https://dev.mysql.com/downloads/mysql/
- Download MySql workbench from https://dev.mysql.com/downloads/workbench/
- Control MySql server with the following: (Reference: https://www.databasestar.com/start-mysql-server/)
  - Start: `sudo launchctl load -F /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist`
  - Stop: `sudo launchctl unload -F /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist`
- Install MySql2 package `npm install --save mysql2`
