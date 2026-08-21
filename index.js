const express = require("express");
const app = express();
app.use(express.json());

// Prices stored in Lakhs (1 Lakh = 100,000 INR, 1 Crore = 100 Lakhs)
const cars = [
  { name: "Maruti Alto", price: 4,   bodyType: "hatchback", fuelType: "petrol", seats: 4, usage: "city commuting" },
  { name: "Hyundai i20", price: 8,   bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Honda City",  price: 13,  bodyType: "sedan",     fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Toyota Innova Hycross", price: 22, bodyType: "mini suv", fuelType: "hybrid", seats: 7, usage: "family trips" },
  { name: "Hyundai Creta", price: 15, bodyType: "suv",      fuelType: "petrol", seats: 5, usage: "family trips" },
  { name: "Mahindra Scorpio-N", price: 18, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Toyota Fortuner", price: 38, bodyType: "suv",    fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Tata Nexon EV", price: 15, bodyType: "mini suv", fuelType: "ev",     seats: 5, usage: "city commuting" },
  { name: "Kia Carnival", price: 30, bodyType: "minivan",   fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Toyota Hilux", price: 35, bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Mercedes E-Class", price: 75, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "BMW 5 Series", price: 68, bodyType: "sedan",     fuelType: "petrol", seats: 5, usage: "business" }
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
