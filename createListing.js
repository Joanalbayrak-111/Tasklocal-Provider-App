// Listing schema — matches team's EXACT locked shared schema (from Data Schema Template)
// listing_id: string, format lst_XXXXXX
// provider_id: string, format prov_XXXXX
// title: string
// service_type: enum "cleaning" | "handyman" | "moving" | "custom"
// description: string
// hourly_rate: number (decimal)
// availability_slots: JSON array of ISO 8601 datetime strings

const SERVICE_CATEGORIES = ["cleaning", "handyman", "moving", "custom"];

function randomDigits(n) {
  let out = "";
  for (let i = 0; i < n; i++) out += Math.floor(Math.random() * 10);
  return out;
}

function generateListingId() {
  return `lst_${randomDigits(6)}`;
}

function validateListingForm(formData) {
  const errors = [];

  if (!SERVICE_CATEGORIES.includes(formData.service_type)) {
    errors.push(`Invalid service_type. Must be one of: ${SERVICE_CATEGORIES.join(", ")}`);
  }
  if (!formData.title || formData.title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (typeof formData.hourly_rate !== "number" || formData.hourly_rate <= 0) {
    errors.push("hourly_rate must be a positive number");
  }
  if (!Array.isArray(formData.availability_slots) || formData.availability_slots.length === 0) {
    errors.push("At least one availability slot is required");
  } else {
    const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    formData.availability_slots.forEach((slot, i) => {
      if (typeof slot !== "string" || !isoPattern.test(slot)) {
        errors.push(
          `availability_slots[${i}] must be an ISO 8601 datetime string (e.g. "2026-08-20T09:00:00Z"), got: ${JSON.stringify(slot)}`
        );
      }
    });
  }

  return errors;
}

function validateProviderId(providerId) {
  const providerIdPattern = /^prov_\d{5}$/;
  if (typeof providerId !== "string" || !providerIdPattern.test(providerId)) {
    return [`provider_id must match format prov_XXXXX (5 digits), got: ${JSON.stringify(providerId)}`];
  }
  return [];
}

function createListing(formData, providerId) {
  const errors = [
    ...validateListingForm(formData),
    ...validateProviderId(providerId),
  ];
  if (errors.length > 0) {
    throw new Error(`Listing validation failed:\n- ${errors.join("\n- ")}`);
  }

  const listing = {
    listing_id: generateListingId(),
    provider_id: providerId,
    title: formData.title.trim(),
    service_type: formData.service_type,
    description: formData.description?.trim() || "",
    hourly_rate: Number(formData.hourly_rate.toFixed(2)),
    availability_slots: formData.availability_slots,
  };

  return listing;
}

module.exports = { createListing, validateListingForm, validateProviderId, SERVICE_CATEGORIES, generateListingId };