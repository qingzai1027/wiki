先cmd里mysql -u root -p ，安装时候设置的那个密码
##  1创建数据库 

```sql
create database panjunqing;回车
```

## 2 创建数据表

```sql

```
切换数据库 use panjunqing 来选择
接着creat table students回车
输入(id int,name varchar(20),sex char(1));回车
desc students;描述表
insert into students (id,name,sex) values (1,'小明'，0);插入数据  (还可以 insert into students values(2,'xiaoqiang',0);
查看表名select * from students;
修改数据update students set name = '小明'，sex=2 where id =3 ;(还可以 update students sex =0 where id =2；)
删除数据 delete from students where id =1;
修改表添加字段 alter table students add achievement double(5,2);（加入achi，类型为double）
改表名 alter table students change name teacher_name varchar(20);(name变成了teacher_name)
删除表字段alter table students drop achievement;(删掉students里的achie...)