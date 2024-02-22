from datetime import datetime

current_datetime = datetime.now()
print(current_datetime)

print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))  # Formatting the date and time in a specific format