# 导入Flask类库
from flask import Flask, request
# 导入Json模板
import json

# 链接数据库
import mysql.connector
conn = mysql.connector.connect(user='root', password='x5', database='ToDone')
cursor = conn.cursor()
print('-?')
# 创建应用实例
app = Flask(__name__)
# 视图函数（路由）
@app.route("/")
def hello_world():
    return "Hello, World!"


# 测试路由函数,访问地址为localhost/test,浏览器显示为返回字符
@app.route('/test')
def test():
    return 'this is test page'

# 通过把 URL 的一部分标记为 <variable_name> 就可以在 URL 中添加变量，标记的部分会作为关键字参数传递给函数。
# 程序中对于任务的管理api
@app.route('/Task/<opreation>', methods=['GET'])
def Task(opreation):
    if opreation == 'add':
        print('添加任务', opreation)
        wxid = request.args.get('wxid')
        taskid = request.args.get('taskid')
        content = request.args.get('content')
        cursor.execute('insert into task (wxid, taskid, content, state) values (%s, %s, %s, %s)', (wxid, taskid, content, '0'))
        conn.commit()
        res = 'added'
    elif opreation == 'delete':
        print('删除任务', opreation)
        taskid = request.args.get('taskid')
        cursor.execute('DELETE FROM task WHERE taskid = %s', (taskid,))
        conn.commit()
        res = 'deleted'
    elif opreation == 'get':
        print('获取用户数据库任务')
        wxid = request.args.get('wxid')
        cursor.execute('SELECT * FROM task WHERE wxid = %s ORDER BY taskid DESC ', (wxid,))
        # 将数据转为json格式
        values = [dict(zip(('taskid', 'wxid', 'content', 'state'), x)) for x in cursor.fetchall()]
        tasks = json.dumps(values)
        print(tasks)
        res = tasks
    elif opreation == 'done':
        print('完成任务')
        taskid = request.args.get('taskid')
        cursor.execute('UPDATE task SET state = 1 WHERE taskid = %s', (taskid,))
        conn.commit()
        res = 'done'
    return res


# 程序中对用户信息的管理api
@app.route('/User/<opreation>', methods=['GET'])
def User(opreation):
    if opreation == 'check':
        print('检查是否为已经注册过的用户')
        wxid = request.args.get('wxid')
        cursor.execute('SELECT * FROM user WHERE wxid = %s', (wxid,))
        values = cursor.fetchall()
        if values == [] :
            res = 'NotRegist'
        else:
            res = 'Registed'
    elif opreation == 'regist':
        print('注册新用户')
        cursor.execute('SELECT count(name) FROM user')
        count = int(cursor.fetchall()[0][0]) + 1
        print(count)
        wxid = request.args.get('wxid')
        name = '小土豆'+ str(count)
        avatar = request.args.get('avatar')
        flower = request.args.get('flower')
        cursor.execute('INSERT INTO user (wxid, name, avatar, flower) values (%s, %s, %s, %s)', (wxid, name, avatar, flower))
        conn.commit()
        res = name # 将初始用户名返回至小程序端缓存
    elif opreation == 'changeInfo':
        print('修改用户信息')
        wxid = request.args.get('wxid')
        name = request.args.get('name')
        motto = request.args.get('motto')
        cursor.execute('UPDATE user SET name = %s,motto = %s WHERE wxid = %s', (name, motto, wxid))
        conn.commit()
        print(wxid, name, motto)
        res = 'Changed'
    return res


# 程序中对标签信息的管理api
@app.route('/Label/<opreation>', methods=['GET'])
def Label(opreation):
    if opreation == 'add':
        print('添加标签')
        cursor.execute('SELECT count(labelid) FROM label')
        labelid = int(cursor.fetchall()[0][0]) + 1
        labelcontent = request.args.get('labelcontent')
        labelmasterid = request.args.get('labelmasterid')
        cursor.execute('INSERT INTO label (labelid, labelcontent, labelmasterid) values (%s, %s, %s)',
                       (labelid, labelcontent, labelmasterid))
        conn.commit()
        res = 'addLableSuccess'
    elif opreation == 'delete':
        print('删除标签')
        labelid = request.args.get('labelid')
        cursor.execute('DELETE FROM label WHERE labelid = %s', (labelid, ))
        conn.commit()
        res = 'deleteLabelSuccess'
    elif opreation == 'get':
        print('获取用户标签')
        labelmasterid = request.args.get('labelmasterid')
        cursor.execute('SELECT * FROM label WHERE labelmasterid = %s OR labelmasterid = %s', ('public', labelmasterid))
        # 将数据转为JSON格式
        values = [dict(zip(('labelid', 'labelcontent', 'labelmasterid'), x)) for x in cursor.fetchall()]
        labels = json.dumps(values)
        res = labels

    return res


# 启动服务
if __name__ == '__main__':
    print('-?')
    app.run(host='0.0.0.0', port='5000', debug=True)
# app.run(host, port, debug, options)
