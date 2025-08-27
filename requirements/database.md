# Collections

## users

```jsx
{
  "_id": ObjectId,
  "role": number,    *// 0-Superadmin, 1-Admin(Owner)/Staff, 2-Member*
  "email": String,
  "fullName": String,
  "phone": String,
  "profilePhotoUrl": String,
  "isActive": number,
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## passwords

```jsx
{
  "_id": ObjectId,
  "userId": ObjectId,
  "passwordHash": String,
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## gyms

Gym branches created by owners

```jsx
{
  "_id": ObjectId,
  "ownerId": ObjectId,          *// references users._id (owner)*
  "name": String,
  "address": {
    "line1": String,
    "line2": String,
    "city": String,
    "state": String,
    "zipcode": String,
    "country": String
  },
  "location": {
		"lat": String,
		"lon": Sting,
		"name": String
  }
  "isActive": number,
  "createdAt": ISODate,
  "updatedAt": DISODateate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## gym_users

```jsx
{
  "_id": ObjectId,
  "gymId": ObjectId,
  "userId": ObjectId,
  "role": number,    *// 0-Admin, 1-Staff*
  "email": String,
  "isActive": number,
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## membership_plans

Gym plans available for subscription

```jsx
{
  "_id": ObjectId,
  "gymId": ObjectId,           *// references gyms._id*
  "name": String,
  "description": String,
  "durationInMonths": String,    *// e.g. 1 Month, 3 Month, 12 Month*
	"freeMonths": String,        *// optional if there are any free extended months*
  "price": Number,             *// currency assumed consistent*
  "benefits": [String],        *// optional list of benefits*
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## members

Registered gym members

```jsx
{
  "_id": ObjectId,
  "gymId": ObjectId,             *// references gyms._id*
  "userId": ObjectId,            *// references users._id*
  "batch": String,
  "dateOfBirth": Date,
  **"subscriptions": [ObjectId],
  "isActive": number,
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## subscriptions

Member's subscription records

```jsx
{
  "_id": ObjectId,
  "memberId": ObjectId,          *// references members._id*
  "gymId": ObjectId,             *// references gyms._id*
  "membershipPlanId": ObjectId,  *// references membership_plans._id*
  "startDate": Date,
  "endDate": Date,
  "subscriptionActive": number   *// 0-Inactive, 1-Active*
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## payments

Payment transaction and status details for 

```jsx
{
  "_id": ObjectId,
  "subscriptionId": ObjectId,   *// references subscriptions._id*
  "memberId": ObjectId,         *// references members._id*
  "gymId": ObjectId,            *// references gyms._id*
  "amount": Number,
  "dueAmount": Number,
  "paymentMethod": String,      *// e.g. cash, card, UPI, etc.*
  "paymentStatus": "paid" | "pending" | "advance_paid" | "scheduled",
  "scheduledPaymentDate": Date,  *// optional for scheduled payments*
  "transactionDate": Date,
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## notifications

Reminders and alerts for users

```jsx
{
  "_id": ObjectId,
  "gymId": ObjectId,
  "gymUserId": ObjectId,          *// references users._id (owner/staff)*
  "memberId": ObjectId,        *// optional: member relevant to notification*
  "type": "payment_reminder" | "membership_renewal" | "general",
  "message": String,
  "readStatus": Boolean,
  "sendMethod": "email" | "sms" | "in_app",
  "scheduledFor": Date,        *// when notification is to be sent*
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## roles_permissions

Role-based access controls (fine-grained permission settings)

```jsx
{
  "_id": ObjectId,
  "role": "superadmin" | "admin" | "staff" | "member",
  "permissions": [
    {
      "resource": String,      *// e.g. "users", "gyms", "subscriptions"*
      "actions": [String]      *// e.g. ["create", "read", "update", "delete"]*
    }
  ],
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---

## enquiries

```jsx
{
  "_id": ObjectId,
  "gym_id": ObjectId,
  "title": String,
  "description": String,
  "name": String,
  "phone": String,
  "Address": String,
  "isActive": Number,       *//0-Active, 1-Inactive*
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}
```

---