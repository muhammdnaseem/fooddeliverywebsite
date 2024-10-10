APIs Link and Reieved JSON data

1) Fetching Food Product image
http://localhost:4000/images/1728119521465nuggets.jpg

2) Fetching Category Images
http://localhost:4000/categoryimages/1728114417407family-fisto.jpg

3) Fetching Food Products List
http://localhost:4000/api/food/list

{
  "success": true,
  "data": [
    {
      "_id": "670102e117a6fd4f7bebb9e9",
      "name": "6pc Nuggets",
      "description": "6pc Nuggets description",
      "price": 7.99,
      "image": "1728119521465nuggets.jpg",
      "category": "6700f0b8ded0621ea8687d6e",
      "__v": 0
    },
  ]
}

4) Fetching Categories List
http://localhost:4000/api/category/list

{
  "success": true,
  "data": [
    {
      "_id": "6700eef1430036c8bf9b8bec",
      "categoryname": "Family Fisto",
      "categorydetails": "Family Fisto Details",
      "categoryimage": "1728114417407family-fisto.jpg",
      "__v": 0
    },
  ]
  }

5) Fetching Order List
http://localhost:4000/api/order/list

{
  "success": true,
  "data": [
    {
      "_id": "66ffc46ff3f24fa3bc2703f7",
      "userId": "66fd75f1538daadc7578b57a",
      "items": [
        {
          "_id": "66ffc0c4f3f24fa3bc2703a8",
          "name": "Food 7",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem, dicta itaque iure fugiat architecto.",
          "price": 20,
          "image": "1728037060916food_7.png",
          "category": "Salad",
          "__v": 0,
          "quantity": 3
        },
      ]
    }
  ]
}


07/10/2024
6) Adding Deal of the day API
http://localhost:4000/api/deal/add

7) Fetching Deals API and integrating in frontend
http://localhost:4000/api/deal/list

integrating in counting down component

8) Deleting Deal API
http://localhost:4000/api/deal/remove`,{id:dealId}

9) Adding Order API
http://localhost:4000/api/order/add


10) Getting User Orders API
http://localhost:4000/api/order/userorders',{},{headers:{token}}
get my orders list of users


11) Make Adding Review API
http://localhost:4000/api/food/review

12) Make reviews dynamic on frontend