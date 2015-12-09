# yepjet-js

Welcome to the JavaScript SDK for YepJet, the simple flight booking API.

## API

The library is structured as to mimic the REST APIs. There are 5 resources currently available. 
Methods are available under `yepjet.${resource}.${method}`

### Search

The entry point to the REST APi. Allow searching of multiple flights and passengers.

### Flights

Provides details about the selected flights.

### Orders

A cart-like structure which holds the selected flights, ready for purchase.

### Traveler

Allows creation and retrieval of travelers, which include payment details and ticket-specific properties.

### Bookings

The final booking call, which allows to book the selected itinerary through a previously created order

## Contributing

We support and encourage contributions, be it through issues or pull requests.
In case you'd like to submit a patch, please do as follows:
- Open a PR in a branch with a significant name
- Submit PR
- If necessary, complement with unit tests

Thanks a lot!

## License

MIT
