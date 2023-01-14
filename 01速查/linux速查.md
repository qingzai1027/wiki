## 判断当前用户所属组

```shell
groups # 当前用户所属
groups ${UserName} # UserName用户所属
```
## mv

目标文件夹存在或者不存在结果不同

mv file1 /home/   file1被移动到/home 目录下
mv file1  /aaa     当目标目录不存在时，文件被移动到/目录下，更名为aaa
## 杀死某个用户的所有进程

```shell
kill -9 -1
```
## 查看磁盘的大小

du： disk usage
df: disk free

```shell
du -sh [目录名]：返回该目录的大小
df -hl：查看磁盘剩余空间
```
## 批量杀死进程

```shell
ps -ef | grep check_os.sh | grep -v grep | awk '{print $2}' | xargs kill -9
```
# 获取路径的相对路径


```shell
python -c "import os.path; print os.path.relpath('/foo/bar', '/foo/baz/foo')"
```

输出为 ../../bar
## coredump 不能用输出重定向

```bash
export LIBC_FATAL_STDERR_=1
{ ./a.out input.txt ; } >log 2>&1
```