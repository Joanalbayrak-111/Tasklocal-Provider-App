const { createListing } = require("./createListing");

console.log("--- Test 1: Valid listing ---");
try {
  const listing = createListing(
    {
      service_type: "cleaning",
      title: "Deep Apartment Cleaning",
      description: "Full clean including kitchen and bathrooms.",
      hourly_rate: 45.5,
      availability_slots: ["2026-08-20T09:00:00Z", "2026-08-21T13:00:00Z"],
    },
    "prov_88301"
  );
  console.log(JSON.stringify(listing, null, 2));
} catch (e) {
  console.log("FAILED:", e.message);
}

console.log("\n--- Test 2: Invalid service_type ---");
try {
  createListing(
    { service_type: "gardening", title: "Yard work", hourly_rate: 30, availability_slots: ["2026-08-20T09:00:00Z"] },
    "prov_88301"
  );
  console.log("Should have thrown, but didn't!");
} catch (e) {
  console.log("Correctly rejected:", e.message);
}

console.log("\n--- Test 3: Bad availability_slots format (not ISO string) ---");
try {
  createListing(
    {
      service_type: "handyman",
      title: "Furniture Assembly",
      hourly_rate: 40,
      availability_slots: [{ day: "Monday", start_time: "9am", end_time: "5pm" }],
    },
    "prov_88301"
  );
  console.log("Should have thrown, but didn't!");
} catch (e) {
  console.log("Correctly rejected:", e.message);
}

console.log("\n--- Test 4: Missing hourly_rate ---");
try {
  createListing(
    { service_type: "moving", title: "Local Move Help", availability_slots: ["2026-08-20T09:00:00Z"] },
    "prov_88301"
  );
  console.log("Should have thrown, but didn't!");
} catch (e) {
  console.log("Correctly rejected:", e.message);
}

console.log("\n--- Test 5: Malformed provider_id (should be rejected) ---");
try {
  createListing(
    { service_type: "cleaning", title: "Deep Clean", hourly_rate: 50, availability_slots: ["2026-08-20T09:00:00Z"] },
    "provider123"
  );
  console.log("Should have thrown, but didn't!");
} catch (e) {
  console.log("Correctly rejected:", e.message);
}