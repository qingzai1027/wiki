## 删除远程分支

```shell
git push origin --delete Chapater6  
```

## 新建远程分支

```shell
git checkout -b new_branch
git push origin new_branch:new_branch
```

## 导入其他分支的文件

```shell
git checkout other_branch "path of file"
```

## 解除和远程分支的关联

```shell
git branch --unset-upstream origin
```

## 合入主分支的方法

```shell
## 使用reset的方法
git reset --soft origin/master

```

## gitlog格式化

以后使用git lg就可以方便的查看commit记录了。

```shell
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## git推送tag

和推送branch是类似的

### 推送固定的tag

```shell
git push origin ${tag_name}
```

### 推送本地所有的tag

```shell
git push origin --tags
```

## 忽略本地文件的方法

```shell
.git/info/exclude
```

## 查看某次commit

```bash
git show {commit-id} {file name}
```