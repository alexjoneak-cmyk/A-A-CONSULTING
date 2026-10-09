const express = require("express");
const app = express();
app.use(express.json());

// Prices are in Lakhs (1 Lakh = 100,000 INR, 1 Crore = 100 Lakhs)
const cars = [
  // ---------- Hatchbacks ----------
  { name: "Maruti Alto K10", price: 4, bodyType: "hatchback", fuelType: "petrol", seats: 4, usage: "city commuting" },
  { name: "Maruti S-Presso", price: 5, bodyType: "hatchback", fuelType: "petrol", seats: 4, usage: "city commuting" },
  { name: "Renault Kwid", price: 5, bodyType: "hatchback", fuelType: "petrol", seats: 4, usage: "city commuting" },
  { name: "Maruti WagonR", price: 6, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Tiago", price: 6, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Tiago EV", price: 8, bodyType: "hatchback", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Hyundai i10 Nios", price: 6, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Maruti Swift", price: 7, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Maruti Baleno", price: 9, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Hyundai i20", price: 8, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Altroz", price: 8, bodyType: "hatchback", fuelType: "diesel", seats: 5, usage: "highway travel" },
  { name: "Toyota Glanza", price: 8, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Maruti Swift Hybrid", price: 10, bodyType: "hatchback", fuelType: "hybrid", seats: 5, usage: "city commuting" },
  { name: "Volkswagen Polo GT", price: 11, bodyType: "hatchback", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "MG Comet EV", price: 7, bodyType: "hatchback", fuelType: "ev", seats: 4, usage: "city commuting" },

  // ---------- Sedans ----------
  { name: "Maruti Dzire", price: 8, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Honda Amaze", price: 8, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Tigor EV", price: 13, bodyType: "sedan", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Maruti Ciaz", price: 10, bodyType: "sedan", fuelType: "hybrid", seats: 5, usage: "highway travel" },
  { name: "Hyundai Verna", price: 12, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Honda City", price: 13, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Honda City Hybrid", price: 19, bodyType: "sedan", fuelType: "hybrid", seats: 5, usage: "highway travel" },
  { name: "Skoda Slavia", price: 14, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Volkswagen Virtus", price: 14, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Skoda Octavia", price: 28, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Skoda Superb", price: 55, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Toyota Camry", price: 46, bodyType: "sedan", fuelType: "hybrid", seats: 5, usage: "business" },
  { name: "BMW 3 Series", price: 62, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Mercedes C-Class", price: 60, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Audi A4", price: 47, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Audi A6", price: 65, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "BMW 5 Series", price: 68, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Mercedes E-Class", price: 75, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Mercedes E-Class Diesel", price: 78, bodyType: "sedan", fuelType: "diesel", seats: 5, usage: "business" },
  { name: "BMW i4", price: 72, bodyType: "sedan", fuelType: "ev", seats: 5, usage: "business" },
  { name: "BMW 7 Series", price: 180, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Mercedes S-Class", price: 190, bodyType: "sedan", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Mercedes EQS", price: 160, bodyType: "sedan", fuelType: "ev", seats: 5, usage: "business" },
  { name: "Tesla Model 3", price: 45, bodyType: "sedan", fuelType: "ev", seats: 5, usage: "highway travel" },

  // ---------- Mini SUVs / Compact SUVs ----------
  { name: "Tata Punch", price: 6, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Hyundai Exter", price: 7, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Nissan Magnite", price: 6, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Renault Kiger", price: 6, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Maruti Fronx", price: 8, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Nexon", price: 9, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Tata Nexon Diesel", price: 11, bodyType: "mini suv", fuelType: "diesel", seats: 5, usage: "highway travel" },
  { name: "Hyundai Venue", price: 9, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "city commuting" },
  { name: "Kia Sonet", price: 9, bodyType: "mini suv", fuelType: "diesel", seats: 5, usage: "city commuting" },
  { name: "Maruti Brezza", price: 10, bodyType: "mini suv", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Mahindra XUV 3XO", price: 9, bodyType: "mini suv", fuelType: "diesel", seats: 5, usage: "highway travel" },
  { name: "Mahindra XUV400 EV", price: 16, bodyType: "mini suv", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Tata Nexon EV", price: 15, bodyType: "mini suv", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Tata Punch EV", price: 11, bodyType: "mini suv", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Maruti Grand Vitara Hybrid", price: 17, bodyType: "mini suv", fuelType: "hybrid", seats: 5, usage: "highway travel" },
  { name: "Toyota Urban Cruiser Hyryder", price: 16, bodyType: "mini suv", fuelType: "hybrid", seats: 5, usage: "highway travel" },
  { name: "Toyota Innova Hycross", price: 22, bodyType: "mini suv", fuelType: "hybrid", seats: 7, usage: "family trips" },

  // ---------- SUVs ----------
  { name: "Hyundai Creta", price: 15, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "family trips" },
  { name: "Hyundai Creta Diesel", price: 16, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "highway travel" },
  { name: "Kia Seltos", price: 15, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "highway travel" },
  { name: "MG Hector", price: 16, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "family trips" },
  { name: "Tata Harrier", price: 17, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "family trips" },
  { name: "Mahindra Thar", price: 12, bodyType: "suv", fuelType: "diesel", seats: 4, usage: "off road" },
  { name: "Maruti Jimny", price: 13, bodyType: "suv", fuelType: "petrol", seats: 4, usage: "off road" },
  { name: "Mahindra Scorpio-N", price: 18, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Mahindra XUV700", price: 20, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Tata Safari", price: 19, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "MG ZS EV", price: 19, bodyType: "suv", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Hyundai Ioniq 5", price: 46, bodyType: "suv", fuelType: "ev", seats: 5, usage: "highway travel" },
  { name: "Jeep Compass", price: 22, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Volkswagen Taigun", price: 14, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Skoda Kushaq", price: 14, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Toyota Fortuner", price: 38, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Toyota Fortuner Legender", price: 46, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "business" },
  { name: "Jeep Meridian", price: 35, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Volvo XC40 Recharge", price: 55, bodyType: "suv", fuelType: "ev", seats: 5, usage: "city commuting" },
  { name: "Volvo XC60", price: 70, bodyType: "suv", fuelType: "hybrid", seats: 5, usage: "family trips" },
  { name: "Mercedes GLC", price: 76, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "BMW X1", price: 50, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "BMW X3", price: 75, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "business" },
  { name: "Audi Q5", price: 68, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Range Rover Evoque", price: 67, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Land Rover Defender", price: 100, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "BMW X5", price: 95, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "business" },
  { name: "Audi Q7", price: 90, bodyType: "suv", fuelType: "petrol", seats: 7, usage: "family trips" },
  { name: "Porsche Macan", price: 100, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "highway travel" },
  { name: "Mercedes GLS", price: 135, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "BMW X7", price: 130, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "business" },
  { name: "Audi Q8 e-tron", price: 115, bodyType: "suv", fuelType: "ev", seats: 5, usage: "highway travel" },
  { name: "Mercedes G-Class", price: 255, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Toyota Land Cruiser 300", price: 215, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "off road" },
  { name: "Range Rover", price: 240, bodyType: "suv", fuelType: "diesel", seats: 5, usage: "business" },
  { name: "Lexus LX 500d", price: 300, bodyType: "suv", fuelType: "diesel", seats: 7, usage: "business" },
  { name: "Lamborghini Urus", price: 420, bodyType: "suv", fuelType: "petrol", seats: 5, usage: "highway travel" },

  // ---------- Minivans / MPVs ----------
  { name: "Maruti Ertiga", price: 11, bodyType: "minivan", fuelType: "petrol", seats: 7, usage: "family trips" },
  { name: "Maruti Ertiga CNG Hybrid", price: 12, bodyType: "minivan", fuelType: "hybrid", seats: 7, usage: "family trips" },
  { name: "Renault Triber", price: 7, bodyType: "minivan", fuelType: "petrol", seats: 7, usage: "family trips" },
  { name: "Maruti XL6", price: 12, bodyType: "minivan", fuelType: "petrol", seats: 6, usage: "family trips" },
  { name: "Kia Carens", price: 11, bodyType: "minivan", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Toyota Innova Crysta", price: 20, bodyType: "minivan", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "Maruti Invicto", price: 26, bodyType: "minivan", fuelType: "hybrid", seats: 8, usage: "family trips" },
  { name: "Kia Carnival", price: 65, bodyType: "minivan", fuelType: "diesel", seats: 7, usage: "family trips" },
  { name: "BYD eMax 7", price: 27, bodyType: "minivan", fuelType: "ev", seats: 7, usage: "family trips" },
  { name: "Toyota Vellfire", price: 120, bodyType: "minivan", fuelType: "hybrid", seats: 7, usage: "business" },
  { name: "Mercedes V-Class", price: 140, bodyType: "minivan", fuelType: "diesel", seats: 7, usage: "business" },

  // ---------- Pickup trucks ----------
  { name: "Mahindra Bolero Pickup", price: 9, bodyType: "pickup truck", fuelType: "diesel", seats: 3, usage: "off road" },
  { name: "Tata Yodha Pickup", price: 8, bodyType: "pickup truck", fuelType: "diesel", seats: 3, usage: "business" },
  { name: "Mahindra Scorpio-N Pik-Up", price: 15, bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Isuzu D-Max V-Cross", price: 25, bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Toyota Hilux", price: 35, bodyType: "pickup truck", fuelType: "diesel", seats: 5, usage: "off road" },
  { name: "Isuzu MU-X", price: 40, bodyType: "pickup truck", fuelType: "diesel", seats: 7, usage: "off road" }
];

// Converts "20L-40L" or "1.2cr-2cr" into { min, max } in Lakhs.
// A single value like "20 lakh" is treated as "up to 20 lakh".
function parseBudgetRange(str) {
  if (!str) return null;
  const parseVal = (v) => {
    v = String(v).trim().toLowerCase();
    if (v.endsWith("cr")) return parseFloat(v) * 100;
    return parseFloat(v); // handles "20l", "20 lakh", "20"
  };
  const parts = String(str).split("-");
  if (parts.length < 2) {
    const val = parseVal(parts[0]);
    if (isNaN(val)) return null;
    return { min: 0, max: val };
  }
  const min = parseVal(parts[0]);
  const max = parseVal(parts[1]);
  if (isNaN(min) || isNaN(max)) return null;
  return { min, max };
}

// Converts "5+" -> 5, "3" -> 3
function parsePassengers(str) {
  if (!str) return null;
  const n = parseInt(String(str).replace("+", ""), 10);
  return isNaN(n) ? null : n;
}

function scoreCar(car, prefs) {
  let score = 0;
  if (prefs.budget) {
    if (car.price >= prefs.budget.min && car.price <= prefs.budget.max) score += 3;
  }
  if (prefs.bodyType && car.bodyType === String(prefs.bodyType).toLowerCase()) score += 2;
  if (prefs.fuelType && car.fuelType === String(prefs.fuelType).toLowerCase()) score += 2;
  if (prefs.usage && car.usage === String(prefs.usage).toLowerCase()) score += 2;
  if (prefs.passengers && car.seats >= prefs.passengers) score += 1;
  return score;
}

// Gathers parameters from this intent AND from earlier answers stored in contexts
function collectParams(body) {
  const merged = {};
  const contexts = body.queryResult.outputContexts || [];
  contexts.forEach((ctx) => {
    Object.entries(ctx.parameters || {}).forEach(([k, v]) => {
      if (k.endsWith(".original")) return;
      if (v !== "" && v !== null && v !== undefined) merged[k] = v;
    });
  });
  Object.entries(body.queryResult.parameters || {}).forEach(([k, v]) => {
    if (v !== "" && v !== null && v !== undefined) merged[k] = v;
  });
  return merged;
}

const first = (v) => (Array.isArray(v) ? v[0] : v);

const BODY_TYPES = ["hatchback", "sedan", "mini suv", "suv", "minivan", "pickup truck"];
const FUEL_TYPES = ["petrol", "diesel", "hybrid", "ev"];
const USAGE_TYPES = ["city commuting", "highway travel", "off road", "family trips", "business", "buisness"];

// Finds a value by what it IS, not by what the parameter is named
function findByValue(params, allowed, preferredKeys) {
  for (const k of preferredKeys) {
    const v = first(params[k]);
    if (v && allowed.includes(String(v).toLowerCase())) return String(v).toLowerCase();
  }
  for (const v of Object.values(params)) {
    const val = first(v);
    if (typeof val === "string" && allowed.includes(val.toLowerCase())) return val.toLowerCase();
  }
  return null;
}

// Friendly message when you open the URL in a browser
app.get("/", (req, res) => {
  res.send("Car recommendation webhook is running.");
});

app.post("/", (req, res) => {
  const params = collectParams(req.body);
  console.log("PARAMS RECEIVED:", JSON.stringify(params));

  let usage = findByValue(params, USAGE_TYPES, ["usage-type"]);
  if (usage === "buisness") usage = "business"; // entity typo

  const prefs = {
    budget: parseBudgetRange(first(params.budget)),
    bodyType: findByValue(params, BODY_TYPES, ["body-type", "bodytype", "body_type", "car-type"]),
    fuelType: findByValue(params, FUEL_TYPES, ["fuel-type", "fuel_type", "fueltype"]),
    usage: usage,
    passengers: parsePassengers(first(params.passengers))
  };
  console.log("PREFS USED:", JSON.stringify(prefs));

  // 1) Body type is a hard filter, so asking for an SUV never returns a sedan
  let pool = cars;
  if (prefs.bodyType) {
    const sameBody = cars.filter((c) => c.bodyType === prefs.bodyType);
    if (sameBody.length > 0) pool = sameBody;
  }

  // 2) Then narrow to the budget, if any cars fit
  if (prefs.budget) {
    const inBudget = pool.filter(
      (c) => c.price >= prefs.budget.min && c.price <= prefs.budget.max
    );
    if (inBudget.length > 0) pool = inBudget;
  }

  // 3) Rank what's left by fuel, usage and seats
  const ranked = pool
    .map((car) => ({ ...car, score: scoreCar(car, prefs) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const second = ranked[1];

  let responseText;
  if (!best) {
    responseText = "I couldn't find a close match. Try a different budget or fuel type.";
  } else {
    responseText = `Based on what you told me, I'd recommend the ${best.name}, priced around ₹${best.price} Lakh.`;
    if (second) {
      responseText += ` Another good option is the ${second.name} (₹${second.price} Lakh).`;
    }
  }

   res.json({ fulfillmentText: responseText + "\n\n[DEBUG] " + JSON.stringify(prefs) });
});
