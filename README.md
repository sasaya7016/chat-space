# chat-space DB設計
<img width="1436" alt="chatspace" src="https://user-images.githubusercontent.com/61730661/85026902-3c2c7e80-b1b4-11ea-9502-3928e7207a42.png">
<img width="1073" alt="chat-space2" src="https://user-images.githubusercontent.com/61730661/85026924-43ec2300-b1b4-11ea-8c4c-90f50c4dcf79.png">

## 概要
> ### このアプリでできること
>> ユーザーの登録、ログイン、ログアウト
>> グループ作成、編集/※（メンバー検索）インクリメンタルサーチ
>> チャット機能/Ajax非同期通信/

## 使用した技術
* 言語: Haml/SCSS/Javascript,Ruby/SQL
* FW:  Ruby on Rails
* DB:  MySQL
* AWS:  EC2,S3,Route 53
* ミドルウェア:  Unicorn,Nginx
* 現在ECインスタンスストップしてますので本番環境にデプロイされておりません。

## 制作背景
> プログラミングスクールでのカリキュラム開発アプリ


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through:groups_users
- has_many :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many:users,through:groups_user
- has_many:groups_users
- has_many:messeagea

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null:false,foreign_key: true|
- belongs_to :user
- belongs_to :groups
