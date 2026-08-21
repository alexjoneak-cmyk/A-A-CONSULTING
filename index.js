const express = require("express");
const app = express();
app.use(express.json());

// Prices stored in Lakhs (1 Lakh = 100,000 INR, 1 Crore = 100 Lakhs)
const cars = [
  // Hatchbacks - budget/city
  { name: "Maruti Alto", price: 4,   bodyType: "hatchback", fuelType: "petrol", seats: 4, usage: "city commuting" },
  { name: "Maruti WagonR", price: 6, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Hyundai i10", price: 6,   bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Hyundai i20", price: 8,   bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Tiago", price: 6,    bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Altroz", price: 8,   bodyType: "hatchback", fuelType: "diesel", seats: 5, usage: "city commuting" },
  { name: "Maruti Baleno", price: 9, bodyType: "hatchback", fuelType: "hybrid", seats: 5, usage: "city commuting" },

  // Sedans
  { name: "Honda City",  price: 13,  bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Hyundai Verna", price: 12, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Maruti Ciaz", price: 10,  bodyType: "sedan", fuelType: "hybrid", seats: 5, usage: "highway travel" },
  { name: "Skoda Slavia", price: 14, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Toyota Camry", price: 46, bodyType: "sedan", fuelType: "hybrid", seats: 5, usage: "business" },
  { name: "Mercedes E-Class", price: 75, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "BMW 5 Series", price: 68, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Audi A6", price: 65, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },

  // Mini SUVs
  { name: "Tata Nexon", price: 9,     bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Nexon EV", price: 15, bodyType: "mini suv", fuelType: "ev",     seats: 5, usage: "city commuting" },
  { name: "Hyundai Venue", price: 9,  bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Kia Sonet", price: 9,      bodyType: "mini suv", fuelType: "diesel", seats: 5, usage: "city commuting" },
  { name: "Toyota Innova Hycross", price: 22, bodyType: "mini suv", fuelType: "hybrid", seats: 7, usage: "family trips" },

  // SUVs
  { name: "Hyundai Creta", price: 15,     bodyType: "suv", fuelType: "petrol", seats: 5, usage: "family trips" },
  { name: "Mahindra Scorpio-N", price: 18, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Mahindra XUV700", price: 20,    bodyType: "suv", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Tata Harrier", price: 17,       bodyType: "suv", fuelType: "diesel", seats: 5, usage: "family trips" },
  { name: "MG Hector", price: 16,          bodyType: "suv", fuelType: "petrol", seats: 5, usage: "family trips" },
  { name: "Toyota Fortuner", price: 38,    bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Jeep Compass", price: 22,       bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "BMW X5", price: 95,             bodyType: "suv", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Range Rover Evoque", price: 65, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },

  // Minivans
  { name: "Maruti Ertiga", price: 11, bodyType: "minivan", fuelType: "petrol", seats: 7, usage: "family trips" },
  { name: "Kia Carnival", price: 30,  bodyType: "minivan", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Toyota Vellfire", price: 1.2 * 100, bodyType: "minivan", fuelType: "hybrid", seats: 7, usage: "business" },

  // Pickup trucks
  { name: "Toyota Hilux", price: 35,      bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Isuzu D-Max", price: 25,       bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Mahindra Bolero Pickup", price: 9, bodyType: "pickup truck", fuelType: "diesel", seats: 3, usage: "off road" }
];
// Converts "20L-40L" or "1.2cr-2cr" into { min, max } in Lakhs
function parseBudgetRange(str) {
  if (!str) return null;
  const [lowRaw, highRaw] = str.split("-");
  const parseVal = (v) => {
    v = v.trim().toLowerCase();
    if (v.endsWith("cr")) return parseFloat(v) * 100;
    if (v.endsWith("l")) return parseFloat(v);
    return parseFloat(v);
  };
  return { min: parseVal(lowRaw), max: parseVal(highRaw) };
}

// Converts "5+" -> 5, "3" -> 3
function parsePassengers(str) {
  if (!str) return null;
  return parseInt(String(str).replace("+", ""), 10);
}

function scoreCar(car, prefs) {
  let score = 0;
  if (prefs.budget) {
    if (car.price >= prefs.budget.min && car.price <= prefs.budget.max) score += 3;
  }
  if (prefs.bodyType && car.bodyType === prefs.bodyType.toLowerCase()) score += 2;
  if (prefs.fuelType && car.fuelType === prefs.fuelType.toLowerCase()) score += 2;
  if (prefs.usage && car.usage === prefs.usage.toLowerCase()) score += 2;
  if (prefs.passengers && car.seats >= prefs.passengers) score += 1;
  return score;
}

app.post("/", (req, res) => {
  const params = req.body.queryResult.parameters;

  const prefs = {
    budget: parseBudgetRange(params.budget),
    bodyType: params["body-type"],
    fuelType: params["fuel-type"],
    usage: params["usage-type"],
    passengers: parsePassengers(params.passengers)
  };

  const ranked = cars
    .map(car => ({ ...car, score: scoreCar(car, prefs) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  const responseText = best
    ? `Based on what you told me, I'd recommend the ${best.name} — priced around ₹${best.price} Lakh, it fits your budget and needs well.`
    : `I couldn't find a great match, but let's try again with different preferences.`;

  res.json({ fulfillmentText: responseText });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Webhook listening on port " + listener.address().port);
});
