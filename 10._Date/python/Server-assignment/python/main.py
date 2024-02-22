from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route('/date')
def current_date():
    current_date = datetime.now().strftime('%Y-%m-%d')
    return f"Current date is: {current_date}"

if __name__ == '__main__':
    app.run(debug=True)