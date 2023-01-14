使用命令工具链接数据库 mysql -u root -p
查看数据库 show databases
创建数据库 create database dbname
切换数据库 use dbname
查看所有表 show tables
修改数据库 alter database dbname character set utf8
删除数据库 drop database dbname

create table 表名(列, 列, …); （创建一个新的表） [creat table (id int,name varchar(20),sex char(1));]
desc 表名;（描述指定表中有哪些列）  
select * from 表名; （查询指定表中所有的数据）
insert into 表名 values(值, 值, …); （向表中插入一行数据(包含多列)）  [insert into tbname values(1,'小明'，0);]
update 表名 set 列=’值’, 列=’值’; （修改所有的数据行） [update tbname set name = '小明'，age=2 where id =3 ;]
delete from 表名 where 条件; （删除满足指定条件的数据行） [delete from tbname where id=3;]
修改表 ；alter table tbname add achievement double(5,2);
修改表 ；alter table tbname change name username varchar(20);
修改表 ；alter table tbname drop name
删除表 ：drop table tbname;


