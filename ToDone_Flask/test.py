from flask import Flask

# import mysql.connector
# conn = mysql.connector.connect(user='root', password='x5',host='localhost', database='to_done')
# print(conn)
# cursor = conn.cursor()


import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='localhost',
                                         database='to_done',
                                         user='root',
                                         password='x5')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if (connection.is_connected()):
        connection.close()
        print("MySQL connection is closed")



app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/test')
def test():
    return 'this is test page'