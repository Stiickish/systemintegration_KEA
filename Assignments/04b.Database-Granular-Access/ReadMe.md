# Zootopia Database Documentation

## About
This README file contains documentation for the database and it's structure, as well as information about users and permissions. The goal is to set up a database with granular access.

## Database Setup
### Tables

### Animal Information Table: `animal_information`
| No. | Name                | Datatype                    | Description                                      |
|-----|---------------------|-----------------------------|--------------------------------------------------|
| 1   | animal_id           | INT, PRIMARY KEY            | Unique identifier for the animal                |
| 2   | species             | VARCHAR(50)                 | Species of the animal                           |
| 3   | name                | VARCHAR(50)                 | Name of the animal                              |
| 4   | age                 | INT                         | Age of the animal                               |
| 5   | gender              | VARCHAR(10)                 | Gender of the animal                            |
| 6   | habitat             | VARCHAR(50)                 | Habitat of the animal                           |

### Feeding Schedule Table: `feeding_schedule`
| No. | Name                | Datatype                    | Description                                      |
|-----|---------------------|-----------------------------|--------------------------------------------------|
| 1   | schedule_id         | INT, PRIMARY KEY            | Unique identifier for the feeding schedule      |
| 2   | animal_id           | INT                         | Foreign key referencing the animal ID           |
| 3   | date                | DATE                        | Date of the feeding schedule                    |
| 4   | time                | TIME                        | Time of the feeding schedule                    |
| 5   | food_type           | VARCHAR(50)                 | Type of food for the feeding schedule           |
| 6   | quantity            | INT                         | Quantity of food for the feeding schedule       |

### Staff Details Table: `staff_details`
| No. | Name                | Datatype                    | Description                                      |
|-----|---------------------|-----------------------------|--------------------------------------------------|
| 1   | staff_id            | INT, PRIMARY KEY            | Unique identifier for the staff member           |
| 2   | full_name           | VARCHAR(100)                | Full name of the staff member                    |
| 3   | position            | VARCHAR(100)                | Position of the staff member                     |
| 4   | salary              | INT                         | Salary of the staff member                       |
| 5   | hire_date           | DATE                        | Date of hire for the staff member                |

## Table Permissions

| Role          | animal_information | feeding_schedule                                  | staff_details                   |
|---------------|---------------------|---------------------------------------------------|---------------------------------|
| zoo_assistant | Read/Write          | Read/Write (No Update on food_type, quantity)     | Read (No Write) (Only staff_id, full_name, position) (No Read on salary, hire_date) |



## Database Connection
Server: `systemintegration-kea.database.windows.net`

Database: `zootopia`

Login: `zoo_assistant`

Pass: `LionTigerB3@r`

## SQL Commands
To access the database, follow these steps:

1. Open Powershell or any terminal on your computer
          
2. Use `sqlcmd` and run this command `sqlcmd -S <servername> -U <username> -P <password> -d <database>`

3. If connection is successful, a sql session will be started. You can now use sql queries. Remember to run `go` after every query.

Example: 
`SELECT * FROM animal_information`

