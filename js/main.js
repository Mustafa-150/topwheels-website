
/* ==================================================
   TOPWHEELS INT, AUTO SALES LLC
   Main JavaScript
   IST 301 Website Project
   ================================================== */

"use strict";

/* ==================================================
   VEHICLE DATA

   Each vehicle is a structured information record.

   Preferred terms:
   - Gasoline (alternative: Gas, Petrol)
   - Electric (alternative: EV)
   - Hybrid (alternative: Hybrid Vehicle)

   All listings below are DEMONSTRATION DATA.
   They are not confirmed dealership inventory.
   ================================================== */

const INVENTORY = [
  {
    id: "tw-1001",
    year: 2021,
    make: "Toyota",
    model: "Camry",
    trim: "SE",
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "FWD",
    mileage: 38420,
    price: 24990,
    color: "Black",
    stockNumber: "TW-1001",
    tags: ["Sedan", "Popular"],
    featured: true,
    image:
      "assets/cars/toyota-camry.jpg",
    description:
      "A comfortable midsize sedan with practical features and everyday versatility."
  },
  {
    id: "tw-1002",
    year: 2020,
    make: "Honda",
    model: "Civic",
    trim: "Sport",
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "FWD",
    mileage: 41210,
    price: 21990,
    color: "Gray",
    stockNumber: "TW-1002",
    tags: ["Sedan", "Sport"],
    featured: true,
    image:
      "assets/cars/honda-civic.jpg",
    description:
      "A compact sedan designed for practical commuting and a sporty driving experience."
  },
  {
    id: "tw-1003",
    year: 2022,
    make: "Ford",
    model: "F-150",
    trim: "XLT",
    bodyType: "Truck",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "4WD",
    mileage: 26880,
    price: 42990,
    color: "White",
    stockNumber: "TW-1003",
    tags: ["Truck", "4WD"],
    featured: true,
    image:
      "assets/cars/ford-f150.jpg",
    description:
      "A full-size pickup truck offering practical utility and four-wheel-drive capability."
  },
  {
    id: "tw-1004",
    year: 2021,
    make: "BMW",
    model: "330i",
    trim: "",
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "RWD",
    mileage: 29500,
    price: 35990,
    color: "Blue",
    stockNumber: "TW-1004",
    tags: ["Sedan", "Luxury"],
    featured: false,
    image:"assets/cars/bmw-330i.jpg",
    description:
      "A compact luxury sedan with a refined design and responsive driving character."
  },
  {
    id: "tw-1005",
    year: 2019,
    make: "Jeep",
    model: "Grand Cherokee",
    trim: "",
    bodyType: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "4WD",
    mileage: 55800,
    price: 27990,
    color: "Silver",
    stockNumber: "TW-1005",
    tags: ["SUV", "4WD"],
    featured: false,
    image:"assets/cars/jeep-grand-cherokee.jpg",
    description:
      "A versatile SUV with passenger space and four-wheel-drive capability."
  },
  {
    id: "tw-1006",
    year: 2023,
    make: "Tesla",
    model: "Model 3",
    trim: "",
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    drivetrain: "RWD",
    mileage: 14250,
    price: 36990,
    color: "Red",
    stockNumber: "TW-1006",
    tags: ["Sedan", "Electric"],
    featured: false,
    image:"assets/cars/tesla-model3.jpg",
    description:
      "An all-electric sedan offering modern technology and an electric driving experience."
  }
];

/* ==================================================
   CONTROLLED VOCABULARY

   Preferred terms and their alternative search terms.
   This supports consistent information retrieval.
   ================================================== */

const VEHICLE_VOCABULARY = {
  Gasoline: ["gas", "petrol", "gasoline"],
  Electric: ["ev", "electric vehicle", "electric car", "electric"],
  Hybrid: ["hybrid vehicle", "hybrid car", "hybrid"],
  Sedan: ["sedan", "saloon"],
  SUV: ["suv", "sport utility vehicle"],
  Truck: ["truck", "pickup", "pickup truck"],
  Inventory: ["inventory", "cars for sale", "vehicle inventory"]
};

/* ==================================================
   FORMAT HELPERS
   ================================================== */

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatMileage(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getVehicleName(vehicle) {
  return [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.trim
  ].filter(Boolean).join(" ");
}

/* ==================================================
   COPYRIGHT YEAR
   ================================================== */

function setCopyrightYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==================================================
   MOBILE NAVIGATION
   ================================================== */

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");

  if (!toggle || !navigation) {
    return;
  }

  function closeMenu() {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }

  toggle.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !navigation.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

/* ==================================================
   VEHICLE IMAGE PLACEHOLDER

   If a vehicle does not have a photograph,
   show a clearly labeled placeholder instead.
   ================================================== */

function createVehiclePlaceholder() {
  const placeholder = document.createElement("div");

  placeholder.className = "vehicle-image-placeholder";
  placeholder.textContent = "Photo coming soon";

  return placeholder;
}

/* ==================================================
   CREATE VEHICLE CARD

   Vehicle data is inserted with textContent to avoid
   interpreting inventory values as HTML.
   ================================================== */

function createVehicleCard(vehicle) {
  const article = document.createElement("article");
  article.className = "vehicle-card";

  const imageArea = document.createElement("div");
  imageArea.className = "vehicle-card-image";

  if (vehicle.image) {
    const image = document.createElement("img");

    image.src = vehicle.image;
    image.alt = `Illustrative photo of ${getVehicleName(vehicle)}`;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", function () {
      image.replaceWith(createVehiclePlaceholder());
    });

    imageArea.appendChild(image);
  } else {
    imageArea.appendChild(createVehiclePlaceholder());
  }

  const badge = document.createElement("span");
  badge.className = "vehicle-badge";
  badge.textContent = "DEMO VEHICLE";

  imageArea.appendChild(badge);

  const body = document.createElement("div");
  body.className = "vehicle-card-body";

  const heading = document.createElement("h3");
  heading.textContent = getVehicleName(vehicle);

  const meta = document.createElement("div");
  meta.className = "vehicle-card-meta";

  [
    `${formatMileage(vehicle.mileage)} mi`,
    vehicle.fuelType,
    vehicle.bodyType
  ].forEach(function (value) {
    const item = document.createElement("span");
    item.textContent = value;
    meta.appendChild(item);
  });

  const bottom = document.createElement("div");
  bottom.className = "vehicle-card-bottom";

  const price = document.createElement("span");
  price.className = "vehicle-price";
  price.textContent = formatPrice(vehicle.price);

  const link = document.createElement("a");
  link.className = "vehicle-view";
  link.href = `vehicle.html?id=${encodeURIComponent(vehicle.id)}`;
  link.textContent = "View Details →";
  link.setAttribute(
    "aria-label",
    `View details for ${getVehicleName(vehicle)}`
  );

  bottom.append(price, link);
  body.append(heading, meta, bottom);
  article.append(imageArea, body);

  return article;
}

/* ==================================================
   FEATURED INVENTORY ON HOMEPAGE
   ================================================== */

function renderFeaturedVehicles() {
  const container = document.getElementById("featuredVehicles");

  if (!container) {
    return;
  }

  const featured = INVENTORY.filter(function (vehicle) {
    return vehicle.featured === true;
  }).slice(0, 3);

  container.replaceChildren();

  if (featured.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No featured vehicles are available.";
    container.appendChild(message);
    return;
  }

  featured.forEach(function (vehicle) {
    container.appendChild(createVehicleCard(vehicle));
  });
}

/* ==================================================
   INITIALIZE WEBSITE
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setCopyrightYear();
  setupMobileNavigation();
  renderFeaturedVehicles();
});

/* ==================================================
   STEP 7 — INVENTORY SEARCH AND FILTERS
   ================================================== */

/*
   Normalize text for consistent searching.

   Examples:
   "Electric Car" -> "electric car"
   "  TOYOTA  "   -> "toyota"
*/

function normalizeSearchText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[\u2010-\u2015-]/g, " ")
    .replace(/\s+/g, " ");
}

/*
   Convert an alternative term to its preferred
   controlled-vocabulary term.

   Examples:
   EV -> Electric
   Petrol -> Gasoline
   Pickup Truck -> Truck
*/

function getPreferredTerm(value) {
  const normalized = normalizeSearchText(value);

  for (const [preferred, alternatives] of
    Object.entries(VEHICLE_VOCABULARY)) {

    if (normalizeSearchText(preferred) === normalized) {
      return preferred;
    }

    if (alternatives.some(function (term) {
      return normalizeSearchText(term) === normalized;
    })) {
      return preferred;
    }
  }

  return value;
}

/*
   Create searchable text for a vehicle.

   Each record includes:
   - Year
   - Make
   - Model
   - Trim
   - Body type
   - Fuel type
   - Drivetrain
   - Transmission
   - Color
   - Stock number
   - Tags

   Alternative terms are added to improve retrieval.
*/

function getVehicleSearchText(vehicle) {
  const terms = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.trim,
    vehicle.bodyType,
    vehicle.fuelType,
    vehicle.drivetrain,
    vehicle.transmission,
    vehicle.color,
    vehicle.stockNumber,
    ...vehicle.tags
  ];

  [vehicle.bodyType, vehicle.fuelType].forEach(function (term) {
    const preferred = getPreferredTerm(term);

    if (VEHICLE_VOCABULARY[preferred]) {
      terms.push(...VEHICLE_VOCABULARY[preferred]);
    }
  });

  return normalizeSearchText(terms.join(" "));
}

/*
   Match a search query against a vehicle.

   Multiple words are supported.

   Example:
   "Toyota Sedan"

   Both words must be present somewhere in the
   searchable vehicle metadata.
*/

function matchesVehicleSearch(vehicle, query) {
  const normalized = normalizeSearchText(query);

  if (!normalized) {
    return true;
  }

  const preferredQuery = getPreferredTerm(normalized);
  const searchText = getVehicleSearchText(vehicle);

  if (preferredQuery !== query &&
      searchText.includes(normalizeSearchText(preferredQuery))) {
    return true;
  }

  const words = normalized.split(" ").filter(Boolean);

  return words.every(function (word) {
    return searchText.split(" ").some(function (term) {
      return term.startsWith(word);
    });
  });
}

/* ==================================================
   PRICE RANGE FILTERING

   Ranges do not overlap.

   Under $20,000: price < 20000
   $20k–$29,999: 20000 <= price < 30000
   $30k–$39,999: 30000 <= price < 40000
   $40k+: price >= 40000
   ================================================== */

function matchesPriceRange(vehicle, selectedRange) {
  if (selectedRange === "Any") {
    return true;
  }

  if (selectedRange === "40000-max") {
    return vehicle.price >= 40000;
  }

  const [minimum, maximum] = selectedRange
    .split("-")
    .map(Number);

  if (!Number.isFinite(minimum) ||
      !Number.isFinite(maximum)) {
    return true;
  }

  return vehicle.price >= minimum &&
         vehicle.price < maximum;
}

/* ==================================================
   SORTING
   ================================================== */

function sortVehicles(vehicles, sortOption) {
  const sorted = [...vehicles];

  switch (sortOption) {
    case "year-asc":
      sorted.sort(function (a, b) {
        return a.year - b.year;
      });
      break;

    case "price-asc":
      sorted.sort(function (a, b) {
        return a.price - b.price;
      });
      break;

    case "price-desc":
      sorted.sort(function (a, b) {
        return b.price - a.price;
      });
      break;

    case "mileage-asc":
      sorted.sort(function (a, b) {
        return a.mileage - b.mileage;
      });
      break;

    case "year-desc":
    default:
      sorted.sort(function (a, b) {
        return b.year - a.year;
      });
      break;
  }

  return sorted;
}

/* ==================================================
   INVENTORY PAGE SETUP
   ================================================== */

function setupInventoryPage() {
  const grid = document.getElementById("inventoryGrid");

  // Only run this function on inventory.html.
  if (!grid) {
    return;
  }

  const form = document.getElementById("inventoryFilters");

  const searchInput = document.getElementById("search");
  const makeSelect = document.getElementById("make");
  const bodyTypeSelect = document.getElementById("bodyType");
  const fuelTypeSelect = document.getElementById("fuelType");
  const priceSelect = document.getElementById("price");
  const sortSelect = document.getElementById("sort");

  const resultCount = document.getElementById("resultCount");
  const clearButton = document.getElementById("clearFilters");
  const resetEmptyButton = document.getElementById("resetEmpty");
  const emptyResults = document.getElementById("emptyResults");

  /*
     Prevent the filter form from navigating away
     when Enter is pressed.
  */

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  /*
     Populate Vehicle Make from the inventory records.

     This is more reliable than manually maintaining
     a separate list of manufacturers.
  */

  const makes = [...new Set(
    INVENTORY.map(function (vehicle) {
      return vehicle.make;
    })
  )].sort();

  makes.forEach(function (make) {
    const option = document.createElement("option");

    option.value = make;
    option.textContent = make;

    makeSelect.appendChild(option);
  });

  /*
     Read the search query passed from the homepage.

     Example:
     inventory.html?q=Toyota
  */

  const urlParameters = new URLSearchParams(
    window.location.search
  );

  const initialQuery = urlParameters.get("q");

  if (initialQuery) {
    searchInput.value = initialQuery;
  }

  /* ===== APPLY FILTERS ===== */

  function applyFilters() {
    const query = searchInput.value;
    const selectedMake = makeSelect.value;
    const selectedBodyType = bodyTypeSelect.value;
    const selectedFuelType = fuelTypeSelect.value;
    const selectedPrice = priceSelect.value;
    const selectedSort = sortSelect.value;

    let results = INVENTORY.filter(function (vehicle) {

      const searchMatch = matchesVehicleSearch(
        vehicle,
        query
      );

      const makeMatch =
        selectedMake === "Any" ||
        vehicle.make === selectedMake;

      const bodyTypeMatch =
        selectedBodyType === "Any" ||
        vehicle.bodyType === selectedBodyType;

      const fuelTypeMatch =
        selectedFuelType === "Any" ||
        vehicle.fuelType === selectedFuelType;

      const priceMatch = matchesPriceRange(
        vehicle,
        selectedPrice
      );

      return searchMatch &&
             makeMatch &&
             bodyTypeMatch &&
             fuelTypeMatch &&
             priceMatch;
    });

    results = sortVehicles(results, selectedSort);

    /* Render matching vehicle cards. */

    grid.replaceChildren();

    results.forEach(function (vehicle) {
      grid.appendChild(createVehicleCard(vehicle));
    });

    /* Update accessible result count. */

    resultCount.textContent =
      `${results.length} vehicle` +
      `${results.length === 1 ? "" : "s"} found`;

    /* Show a helpful message when nothing matches. */

    emptyResults.hidden = results.length !== 0;

    /* Keep the search query in the URL. */

    const updatedUrl = new URL(window.location.href);

    if (query.trim()) {
      updatedUrl.searchParams.set("q", query.trim());
    } else {
      updatedUrl.searchParams.delete("q");
    }

    window.history.replaceState(
      null,
      "",
      updatedUrl.pathname +
      updatedUrl.search +
      updatedUrl.hash
    );
  }

  /* ===== CLEAR FILTERS ===== */

  function clearFilters() {
    searchInput.value = "";
    makeSelect.value = "Any";
    bodyTypeSelect.value = "Any";
    fuelTypeSelect.value = "Any";
    priceSelect.value = "Any";
    sortSelect.value = "year-desc";

    applyFilters();
  }

  /* ===== EVENT LISTENERS ===== */

  searchInput.addEventListener("input", applyFilters);

  [
    makeSelect,
    bodyTypeSelect,
    fuelTypeSelect,
    priceSelect,
    sortSelect
  ].forEach(function (control) {
    control.addEventListener("change", applyFilters);
  });

  clearButton.addEventListener("click", clearFilters);

  resetEmptyButton.addEventListener("click", clearFilters);

  /* Display all vehicles when the page first loads. */

  applyFilters();
}

/* ==================================================
   INITIALIZE INVENTORY PAGE
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupInventoryPage();
});

/* ==================================================
   STEP 8 — VEHICLE DETAILS
   ================================================== */

function setupVehicleDetailsPage() {
  const titleElement = document.getElementById("vehicleTitle");

  // Run only on vehicle.html.
  if (!titleElement) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const vehicleId = params.get("id");

  const vehicle = INVENTORY.find(function (item) {
    return item.id === vehicleId;
  });

  const content = document.getElementById("vehicleContent");
  const notFound = document.getElementById("vehicleNotFound");

  /* ===== HANDLE UNKNOWN VEHICLE ===== */

  if (!vehicle) {
    titleElement.textContent = "Vehicle Not Found";

    document.getElementById("vehicleSubtitle").textContent =
      "We couldn't find a vehicle matching that ID.";

    notFound.hidden = false;
    content.hidden = true;

    document.title = "Vehicle Not Found | TopWheels Int";

    return;
  }

  /* ===== BASIC VEHICLE INFORMATION ===== */

  const vehicleName = getVehicleName(vehicle);

  titleElement.textContent = vehicleName;

  document.getElementById("vehicleBreadcrumb").textContent =
    vehicleName;

  document.getElementById("vehicleSubtitle").textContent =
    `${vehicle.bodyType} • ${vehicle.fuelType} • ` +
    `Stock ${vehicle.stockNumber}`;

  document.title =
    `${vehicleName} | TopWheels Int, Auto Sales LLC`;

  document.getElementById("vehiclePrice").textContent =
    formatPrice(vehicle.price);

  document.getElementById("vehicleMileage").textContent =
    `${formatMileage(vehicle.mileage)} mi`;

  document.getElementById("vehicleFuel").textContent =
    vehicle.fuelType;

  document.getElementById("vehicleBodyType").textContent =
    vehicle.bodyType;

  document.getElementById("vehicleDrivetrain").textContent =
    vehicle.drivetrain;

  document.getElementById("vehicleDescription").textContent =
    vehicle.description;

  /* ===== VEHICLE IMAGE ===== */

  const imageContainer =
    document.getElementById("vehicleImageContainer");

  imageContainer.replaceChildren();

  if (vehicle.image) {
    const image = document.createElement("img");

    image.src = vehicle.image;
    image.alt = `Illustrative photo of ${getVehicleName(vehicle)}`;
    image.decoding = "async";

    image.addEventListener("error", function () {
      image.replaceWith(createVehiclePlaceholder());
    });

    imageContainer.appendChild(image);
  } else {
    imageContainer.appendChild(createVehiclePlaceholder());
  }

  /* ===== VEHICLE TAGS ===== */

  const tagsContainer = document.getElementById("vehicleTags");

  tagsContainer.replaceChildren();

  vehicle.tags.forEach(function (tag) {
    const tagElement = document.createElement("span");

    tagElement.className = "details-tag";
    tagElement.textContent = tag;

    tagsContainer.appendChild(tagElement);
  });

  /* ===== STRUCTURED SPECIFICATIONS ===== */

  const specifications = [
    ["Year", vehicle.year],
    ["Vehicle Make", vehicle.make],
    ["Vehicle Model", vehicle.model],
    ["Trim", vehicle.trim || "Not specified"],
    ["Body Type", vehicle.bodyType],
    ["Fuel Type", vehicle.fuelType],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Mileage", `${formatMileage(vehicle.mileage)} miles`],
    ["Exterior Color", vehicle.color],
    ["Stock Number", vehicle.stockNumber],
    ["Vehicle Price", formatPrice(vehicle.price)]
  ];

  const specificationsContainer =
    document.getElementById("vehicleSpecifications");

  specificationsContainer.replaceChildren();

  specifications.forEach(function ([label, value]) {
    const item = document.createElement("div");
    item.className = "specification-item";

    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    description.textContent = String(value);

    item.append(term, description);
    specificationsContainer.appendChild(item);
  });

  /* ===== VEHICLE CONTACT LINK ===== */

  const contactLink =
    document.getElementById("vehicleContactLink");

  contactLink.href =
    `contact.html?vehicle=${encodeURIComponent(vehicle.id)}`;

  /* ===== SHOW VEHICLE DETAILS ===== */

  notFound.hidden = true;
  content.hidden = false;
}

/* ==================================================
   INITIALIZE VEHICLE DETAILS PAGE
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupVehicleDetailsPage();
});

/* ==================================================
   STEP 9 — FINANCING PAYMENT CALCULATOR
   ================================================== */

function setupPaymentCalculator() {
  const form = document.getElementById("paymentCalculator");

  // Run only on financing.html.
  if (!form) {
    return;
  }

  const priceInput = document.getElementById("financePrice");
  const downInput = document.getElementById("financeDown");
  const rateInput = document.getElementById("financeRate");
  const termInput = document.getElementById("financeTerm");

  const monthlyOutput = document.getElementById("monthlyPayment");
  const loanOutput = document.getElementById("loanAmount");
  const interestOutput = document.getElementById("totalInterest");
  const totalOutput = document.getElementById("totalPayments");
  const errorOutput = document.getElementById("calculatorError");

  function clearResults() {
    monthlyOutput.textContent = "—";
    loanOutput.textContent = "—";
    interestOutput.textContent = "—";
    totalOutput.textContent = "—";
  }

  function calculatePayment() {
    const price = Number(priceInput.value);
    const down = Number(downInput.value);
    const annualRate = Number(rateInput.value);
    const months = Number(termInput.value);

    errorOutput.hidden = true;
    errorOutput.textContent = "";

    const inputsAreValid =
      priceInput.value.trim() !== "" &&
      downInput.value.trim() !== "" &&
      rateInput.value.trim() !== "" &&
      Number.isFinite(price) &&
      Number.isFinite(down) &&
      Number.isFinite(annualRate) &&
      Number.isInteger(months) &&
      price >= 0 &&
      price <= 10000000 &&
      down >= 0 &&
      down <= price &&
      annualRate >= 0 &&
      annualRate <= 100 &&
      months > 0;

    if (!inputsAreValid) {
      clearResults();
      errorOutput.textContent =
        "Enter valid amounts. Down payment cannot exceed " +
        "vehicle price, and the interest rate must be 0–100%.";
      errorOutput.hidden = false;
      return;
    }

    const principal = price - down;
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment;

    if (principal === 0) {
      monthlyPayment = 0;
    } else if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      monthlyPayment =
        principal * monthlyRate * factor / (factor - 1);
    }

    const totalPayments = monthlyPayment * months;
    const totalInterest = Math.max(0, totalPayments - principal);

    monthlyOutput.textContent =
      formatPrice(monthlyPayment);

    loanOutput.textContent =
      formatPrice(principal);

    interestOutput.textContent =
      formatPrice(totalInterest);

    totalOutput.textContent =
      formatPrice(totalPayments);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculatePayment();
  });

  // Show an estimate immediately when the page loads.
  calculatePayment();
}

document.addEventListener("DOMContentLoaded", function () {
  setupPaymentCalculator();
});

/* ==================================================
   STEP 11 — CONTACT FORM AND VEHICLE INQUIRIES
   ================================================== */

function setupContactPage() {
  const form = document.getElementById("contactForm");

  // Run only on contact.html.
  if (!form) {
    return;
  }

  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const phoneInput = document.getElementById("contactPhone");
  const topicInput = document.getElementById("contactTopic");
  const messageInput = document.getElementById("contactMessage");

  const errorOutput = document.getElementById("contactFormError");

  const reviewSection = document.getElementById("contactReview");
  const reviewText = document.getElementById("contactReviewText");
  const emailLink = document.getElementById("contactEmailLink");
  const editButton = document.getElementById("contactEditButton");

  const selectedVehicleBox =
    document.getElementById("selectedVehicleBox");

  const selectedVehicleName =
    document.getElementById("selectedVehicleName");

  const selectedVehicleStock =
    document.getElementById("selectedVehicleStock");

  const selectedVehicleLink =
    document.getElementById("selectedVehicleLink");

  /* ===== READ VEHICLE FROM URL ===== */

  const parameters = new URLSearchParams(window.location.search);
  const vehicleId = parameters.get("vehicle");

  const selectedVehicle = INVENTORY.find(function (vehicle) {
    return vehicle.id === vehicleId;
  });

  if (selectedVehicle) {
    const vehicleName = getVehicleName(selectedVehicle);

    selectedVehicleName.textContent = vehicleName;

    selectedVehicleStock.textContent =
      `Stock Number: ${selectedVehicle.stockNumber}`;

    selectedVehicleLink.href =
      `vehicle.html?id=${encodeURIComponent(selectedVehicle.id)}`;

    selectedVehicleBox.hidden = false;

    topicInput.value = "Vehicle Inquiry";

    messageInput.value =
      `Hello, I would like more information about the ` +
      `${vehicleName} (Stock ${selectedVehicle.stockNumber}).`;
  }

  /* ===== FIELD VALIDATION ===== */

  const requiredFields = [
    nameInput,
    emailInput,
    topicInput,
    messageInput
  ];

  function clearError() {
    errorOutput.hidden = true;
    errorOutput.textContent = "";
  }

  function showError(message, field) {
    errorOutput.textContent = message;
    errorOutput.hidden = false;

    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  }

  function validateForm() {
    clearError();

    requiredFields.forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });

    if (!nameInput.value.trim()) {
      showError("Please enter your full name.", nameInput);
      return false;
    }

    if (!emailInput.value.trim() || !emailInput.validity.valid) {
      showError("Please enter a valid email address.", emailInput);
      return false;
    }

    if (!topicInput.value) {
      showError("Please select an inquiry type.", topicInput);
      return false;
    }

    if (!messageInput.value.trim()) {
      showError("Please enter a message.", messageInput);
      return false;
    }

    if (!form.checkValidity()) {
      showError(
        "Please review the form fields and correct any invalid values."
      );
      return false;
    }

    return true;
  }

  /* ===== PREPARE EMAIL ===== */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    reviewSection.hidden = true;

    if (!validateForm()) {
      return;
    }

    const customerName = nameInput.value.trim();
    const customerEmail = emailInput.value.trim();
    const customerPhone = phoneInput.value.trim();
    const inquiryType = topicInput.value;
    const customerMessage = messageInput.value.trim();

    const vehicleName = selectedVehicle
      ? getVehicleName(selectedVehicle)
      : "Not specified";

    const vehicleStock = selectedVehicle
      ? selectedVehicle.stockNumber
      : "Not specified";

    const subject = selectedVehicle
      ? `Vehicle Inquiry - ${vehicleName}`
      : `TopWheels Inquiry - ${inquiryType}`;

    const body = [
      "TOPWHEELS INT - CUSTOMER INQUIRY",
      "",
      `Name: ${customerName}`,
      `Email: ${customerEmail}`,
      `Phone: ${customerPhone || "Not provided"}`,
      `Inquiry Type: ${inquiryType}`,
      "",
      `Vehicle: ${vehicleName}`,
      `Stock Number: ${vehicleStock}`,
      "",
      "MESSAGE:",
      customerMessage,
      "",
      "Sent using an email application after",
      "preparation on the TopWheels website."
    ].join("\n");

    reviewText.textContent = body;

    const mailtoUrl =
      "mailto:sales@topwheelsinternational.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    emailLink.href = mailtoUrl;

    reviewSection.hidden = false;

    reviewSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    emailLink.focus();
  });

  /* ===== EDIT INQUIRY ===== */

  editButton.addEventListener("click", function () {
    reviewSection.hidden = true;
    nameInput.focus();
  });

  /* ===== HIDE OUTDATED REVIEW WHEN FORM CHANGES ===== */

  form.addEventListener("input", function () {
    reviewSection.hidden = true;
    clearError();
  });

  form.addEventListener("change", function () {
    reviewSection.hidden = true;
    clearError();
  });
}

/* ==================================================
   INITIALIZE CONTACT PAGE
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupContactPage();
});
