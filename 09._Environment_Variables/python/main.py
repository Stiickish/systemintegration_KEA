from dotenv import dotenv_values,load_dotenv

"Example 1"
environment_variables = dotenv_values()
print(environment_variables)
print(environment_variables["MYSQL_PASS"])

"Example 2"
import os
load_dotenv()
print(os.getenv("MYSQL_PASS"))