# yepjet-js

Welcome to the JavaScript SDK for YepJet, the simple flight booking API.

## API

The library is structured as to mimic the REST APIs. There are 5 resources currently available. 
Methods are available under `yepjet.${resource}.${method}`

### Search

The entry point to the REST APi. Allow searching of multiple flights and passengers.

**Path**: `/search`

**Method:** _POST_

**Params:**
```js
{
  flights: [
    {
      from: 'SFO', // 3-LETTER IATA CODE
      to: 'JFK', // 3-LETTER IATA CODE
      departure: "2016-01-01" // yyyy/MM/dd FORMATTED DATE
    }
  ],
  passengers: [{ category: 'ADT' }] 
}
```

### Flights

Provides details about the selected flights.

**Path**: `/flights/:id`

**Method:** _GET_

**Params:**
```js
{
  id: 'xxxx-xxxx-xxxxxxxxx' // FLIGHT IDS
}
```

### Orders

A cart-like structure which holds the selected flights, ready for purchase.

**Path**: `/orders`

**Method:** _POST_

**Params:**
```js
{
  flights: [{ id: 'xxxx-xxxx-xxxxxxxxx' }] // ARRAY OF FLIGHT IDS
}
```

### Traveler

Allows creation and retrieval of travelers, which include payment details and ticket-specific properties.

**Path**: `/travelers`

**Method:** _POST_

**Params:**
```js
{
  prefix: 'Mr.',
  first_name: 'Jon',
  last_name: 'Snow',
  gender: 'M',
  email: 'you@knownothing.com',
  birth_date: "1990/10/10",
  phone_number: '0123456789',
  address: {
    street: 'Tower A',
    city: 'The Wall',
    state: 'North',
    postal_code: '12345',
    country: 'GB'
  }
}
```

**Path**: `/travelers/:id`

**Method:** _GET_

**Params:**
```js
{
  id: 'xxxx-xxxx-xxxxxxxxx' // TRAVELER ID
}
```

### Bookings

The final booking call, which allows to book the selected itinerary through a previously created order

**Path**: `/bookings`

**Method:** _POST_

**Params:**
```js
{
  order_id: 'xxxx-xxxx-xxxxxxxxx', // ID OF THE SELECTED ORDER
  payment_token: 'xxxx-xxxx-xxxxxxxxx', // ID OF THE SELECTED PAYMENT METHOD
  travelers: [{ id: 'xxxx-xxxx-xxxxxxxxx' }] // ARRAY OF TRAVELERS BY ID
}
```

## Contributing

We support and encourage contributions, be it through issues or pull requests.
In case you'd like to submit a patch, please do as follows:
- Open a PR in a branch with a significant name
- Submit PR
- If necessary, complement with unit tests

Thanks a lot!

## License

MIT
