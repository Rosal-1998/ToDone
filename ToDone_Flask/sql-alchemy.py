#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建对象的基类:
Base = declarative_base()

# 定义User对象:
class User(Base):
    # 表的名字:
    __tablename__ = 'user'

    # 表的结构:
    wxid = Column(String(20), primary_key=True)
    name = Column(String(20))

# 初始化数据库连接:
engine = create_engine('mysql+mysqlconnector://root:x5@127.0.0.1:3306/to_done')
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# # 创建session对象:
# session = DBSession()
# # 创建新User对象:
# new_user = User(wxid='5', name='Bob')
# # 添加到session:
# session.add(new_user)
# # 提交即保存到数据库:
# session.commit()
# # 关闭session:
# session.close()

# 创建Session:
session = DBSession()
# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
# user = session.query(User).filter(User.wxid=='5').all()
count = session.query(User).count
print(count)
# for row in user:
#     print('wxid:'+row.wxid, 'name:'+row.name)
# # 打印类型和对象的name属性:
# print('type:', type(user))
# print('name:', user)
# 关闭Session:
session.close()