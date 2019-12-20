
#

#### Table of Contents  

- [How to run 🚀](#How-to-run-)  
- [Backend 🔙](#Backend-) 
	- [User endpoints](#USER)
	- [Product endpoints](#MOVIE)

- [Frontend 👁‍🗨](#Frontend-)  

#



<br>

# ¿Qué es? 👀

Es una e-commerce hecho entre 2 personas que usa:

- Frontend: 🌌 React + Redux
- Backend: 🔸 NodeJS + Express
- DB: 🍃 mongoDB 

Durante el desarrollo he usado [este tablón de Trello](https://trello.com/b/mjg0ka7B/monetae).


<br>

# How to run 🚀

- Download [backend repo](https://github.com/Icaruk/monetae-b).
- Download [frontend repo](https://github.com/Dave86dev/monetae-f).
- On the backend run:
	- `PENDIENTE`
- On the frontend run:
	- `PENDIENTE`
- It should open on http://localhost:3005/


<br>

# Backend 🔙

## **Endpoints** 📃

## USER

- Register
	- **POST** /user/register
```json
{
	"username":  "Username",
	"email": "asd@asd.com",
	"password":  "1234",
	"phone": "647123456",
	"address": "c/ Falsa, 123",
	"billing": {
		"cardNumber": 123456789,
		"cardOwner": "Name Name Name",
		"cardExpireDate": [6, 22]
	}
}
```

- Login
	- **POST** /user/login
```json
{
	"username":  "Icaruk",
	"password":  "1234"
}
```

- Logout
	- **GET** user/logout?token={token}
	
- Get user data
	- **GET** user/{userId}?token={token}

- Delete user
	- **DELETE** user/delete/{userId}?token={token}

#
## PRODUCT

- Asd

#
## RATING



<br>

# Frontend 👁‍🗨

## Features 📃

- Homepage:
	- Slider with best selling products
	- Slider with most popular products
	- Slider with custom recommended products
- Search by title
	- Filters:
		- Minimum and maximum price
		- Category
	- Sort
		- Price
		- Rating
- Users.
- Cart
	- asd


## Preview 🔍

- Home
> ![](https://i.gyazo.com/519f71b33bde9428c3fabd660d43aa1c.jpg)


- Register
> ![](https://i.gyazo.com/86c7b8519bd18b50c92f71d1f41cef5b.png)

- Login
> ![](https://i.gyazo.com/d3ee62fe15b5bdee3a459cf675309432.png)

- Profile
> ![](https://i.gyazo.com/e8a56ea1f3ba321440d664e06ed93b7f.png)

- Search
> ![](https://i.gyazo.com/db65979413b9a0837926c0dde9fbde75.jpg)
> https://i.gyazo.com/d2f07a6195ed7a330b824a178a2cf3bf.mp4

- Detail
> ![](https://i.gyazo.com/184c987c56213ccde2be076c4dfe8fbd.jpg)
> https://i.gyazo.com/9b946615597c14a649596f5d9a8916a4.mp4

- New order
> ![](https://i.gyazo.com/62ccc27171926e9c00e34c8be21ea3d4.png)

- User orders
> ![](https://i.gyazo.com/82ed673e41059de6358875b8be871d43.png)
> https://i.gyazo.com/c55e560de90655d3e907a99a141bf915.mp4



<br>

# [🡅 TOP 🡅](#Table-of-Contents)  
