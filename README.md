# TaskLocal — Provider App

## What This Product Does
The Provider App lets independent home-service providers (cleaners, handymen, movers) 
create structured service listings, manage their availability, and respond to booking 
requests from customers.

## Role in the TaskLocal Product Suite
This is Product A of 4 in TaskLocal's two-sided marketplace. It is the source of 
truth for all listing data used across the platform:

- **Product B (Customer App)** displays and filters the listings created here.
- **Product C (Matching Chatbot)** matches customer job requests against this 
  product's `service_type` and listing data.
- **Product D (Trust & Safety Dashboard)** references listings and bookings 
  created here when flagging issues.

## Shared Data This Product Owns
- `listing_id`, `provider_id`, `title`, `service_type`, `description`, 
  `hourly_rate`, `availability_slots`
- `booking_id`, `booking_status` (read/update)
