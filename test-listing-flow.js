const { createListing } = require("./createListing");
const { saveListing, getListings, clearListings } = require("./listingStore");

clearListings();

// Test 1: invalid — missing hourly_rate
try {
  createListing({ title: "Test", service_type: "cleaning", availability_slots: [] }, "prov_88301");
  console.error("FAIL: expected error for missing hourly_rate");
} catch (err) {
  console.log("PASS: invalid entry rejected —", err.message);
}

// Test 2: valid entry
try {
  const listing = createListing(
    {
      title: "Deep Clean",
      hourly_rate: 45,
      service_type: "cleaning",
      availability_slots: ["2026-08-20T09:00:00Z"],
    },
    "prov_88301"
  );
  saveListing(listing);
  console.log("PASS: valid listing created —", JSON.stringify(listing));
  console.log("My Listings:", getListings());
} catch (err) {
  console.error("FAIL: valid entry rejected —", err.message);
}