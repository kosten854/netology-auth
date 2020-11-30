# Авторизация в NestJS через passport.js + local strategy. Хранение в sqlite

## Для запуска приложения

- В докере:

  ```
  docker-compose up
  ```

- Без докера:

  ```
  yarn
  yarn start:dev
  ```

По умолчанию приложение запускается по адресу: <http://0.0.0.0:3000>.

Swagger документация: <http://0.0.0.0:3000/documentation>.

Как следует из задания: приложение предоставляет 2 метода:

1. Регистрация нового пользователя. <https://github.com/kosten854/netology-auth/blob/master/src/modules/user/user.controller.ts> строка 19

   ![регистрация](https://github.com/kosten854/netology-auth/raw/master/README_PICS/регистрация.png)

   Для успешной авторизации требуется чтобы логин был непустой строкой, а пароль строкой длиной минимум 8 символов.
   В случае, если эти условия не соблюдены, то валидатор выдаст ошибку с описанием проблемы.
   Валидатор подключается здесь: <https://github.com/kosten854/netology-auth/blob/master/src/main.ts> 24 строка.

   `Отсутсвие валидации является довольно частой ошибкой, которая может привезти к серьёзным последствиям, например случайно созданный аккаунт администратора с пустым паролем.`

   Также при регистрации происходит проверка уникальности username.

   Для удобства обработки подобных ошибок я создал фильтр <https://github.com/kosten854/netology-auth/blob/master/src/filters/query-failed.filter.ts>, который проверяет ошибки на соответсвие ошибкам уникальности полей БД. Но для того чтобы этот фильтр сработал в БД это поле должно быть уникальным индексом, что я и указал в сущности пользователя <https://github.com/kosten854/netology-auth/blob/master/src/modules/user/user.entity.ts>.

   `Отсутвие подобных проверок также является частой ошибкой новичков.`

   Также не стоит хранить пароли в базе данных в открытом виде. Это может привести к воровству аккаунтов в случае попадания базы данных в сеть. Я использую библиотеку bcrypt для хеширования <https://github.com/kosten854/netology-auth/blob/master/src/modules/user/password.transformer.ts>, но также можно использовать другие надёжные алгоритмы хеширования, например SHA-512.

2. Авторизация по логину и паролю. <https://github.com/kosten854/netology-auth/blob/master/src/modules/user/user.controller.ts> строка 34

   ![авторизация](https://github.com/kosten854/netology-auth/raw/master/README_PICS/авторизация.png)

   Для авторизации по логину и паролю я использую стратегию local-strategy Passport.js <https://github.com/kosten854/netology-auth/blob/master/src/local.strategy.ts>

   Эта стратегия находит пользователя с нужным логином и затем сравнивает хеши паролей. Сравнивать нужно именно хеши, так как в БД в поле password хранится хеш пароля.

   `При несовпадении логина и пароля новички часто отвечают неправильным кодом ошибки, но для удобства работы с сервером необходимо вызывать правильные исключения, как в данном случае UnauthorizedException`

   Для запросов и ответов я использую паттерн Data Transfer Object (DTO). Он позволяет передавать и получать от клиента только нужные структуры данных. В данном случае это важно, так как не стоит отдавать клиенту поле `password`, хоть оно и содержит только хеш пароля, но это также может привести к проблемам с безопасностью ведь имея хеш пароля можно подбором найти сам пароль.

   Также в самих файлах `*Dto.ts` находятся инструкции для валидатора (`@IsNotEmpty(), @MinLength(8) и т.д`), и swagger документации (`@ApiProperty({...})`). <https://github.com/kosten854/netology-auth/blob/master/src/modules/user/dto/UserCreateDto.ts>