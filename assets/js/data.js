window.AviationData = (() => {
  const timelineOrder = ["Foundational", "Jet Age", "Digital Age", "Next Horizon"];

  const timelineDescriptions = {
    Foundational: "early propeller, piston, and pre-digital era aircraft that shaped the first decades of flight",
    "Jet Age": "cold war and early jet-era aircraft that defined global airline and military expansion",
    "Digital Age": "aircraft designed around modern avionics, composites, efficient engines, and networked operations",
    "Next Horizon": "future-facing aircraft programs, development projects, and upcoming aviation directions"
  };

  const categoryDescriptions = {
    "Commercial Airliner": "Large passenger and cargo aircraft builders focused on major airline networks.",
    "Regional & Utility": "Manufacturers serving short-haul routes, STOL utility roles, and specialized transport missions.",
    "Business & General Aviation": "Builders of personal, training, business, and light utility aircraft families.",
    "Military & Defense": "Manufacturers centered on fighters, surveillance, bombers, transports, and mission aircraft.",
    "Special Mission & Amphibious": "Aircraft makers focused on unique roles such as water operations, patrol, and rescue."
  };

  const classDescriptions = {
    "Commercial Jet": "Mainline passenger or cargo jets for regional, national, or intercontinental networks.",
    "Regional Turboprop": "Efficient propeller aircraft optimized for shorter sectors and smaller runways.",
    "Business Jet": "Corporate and private jets focused on speed, range, and cabin comfort.",
    "General Aviation": "Personal, training, and utility aircraft serving a broad civil flying market.",
    Fighter: "Combat aircraft designed for air superiority, multirole strike, or interception.",
    "Military Transport": "Aircraft built to move people, cargo, or special mission systems for defense operators.",
    Trainer: "Aircraft specialized for pilot instruction, lead-in fighter training, or ab initio flying.",
    Amphibian: "Aircraft designed to operate from land and water for firefighting, rescue, or utility roles.",
    ISR: "Intelligence, surveillance, reconnaissance, and airborne early warning platforms.",
    Experimental: "Concept aircraft, future programs, or technology demonstrators aimed at the next era."
  };

  const technicalProfilesByClass = {
    "Commercial Jet": {
      dimensions: { Length: "Program-dependent mainline airliner dimensions", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Typically Mach 0.74 to Mach 0.86", Range: "Program-dependent short, medium, or long-haul range", "Service ceiling": "Usually around 35,000 to 43,000 ft" },
      weights: { MTOW: "Program-dependent commercial airliner weight class" },
      capacity: { Crew: "Normally 2 flight crew", Passengers: "Program-dependent passenger or cargo capacity" }
    },
    "Regional Turboprop": {
      dimensions: { Length: "Regional turboprop size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Typically 450 to 650 km/h", Range: "Program-dependent regional range", "Service ceiling": "Usually 20,000 to 30,000 ft" },
      weights: { MTOW: "Program-dependent regional transport weight class" },
      capacity: { Crew: "Usually 2", Passengers: "Program-dependent regional seating" }
    },
    "Business Jet": {
      dimensions: { Length: "Business jet size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Typically Mach 0.75 to Mach 0.93", Range: "Program-dependent business aviation range", "Service ceiling": "Usually 41,000 to 51,000 ft" },
      weights: { MTOW: "Program-dependent business jet weight class" },
      capacity: { Crew: "Usually 2", Passengers: "Program-dependent executive cabin capacity" }
    },
    "General Aviation": {
      dimensions: { Length: "General aviation size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Mission-dependent", Range: "Program-dependent", "Service ceiling": "Program-dependent" },
      weights: { MTOW: "Program-dependent light aircraft weight class" },
      capacity: { Crew: "Usually 1 or 2", Passengers: "Program-dependent light-aircraft occupancy" }
    },
    Fighter: {
      dimensions: { Length: "Fighter-class dimensions", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Max speed": "Mission and generation dependent", Range: "Mission-dependent ferry and combat radius", "Service ceiling": "Typically high-performance combat ceiling" },
      weights: { MTOW: "Program-dependent fighter weight class" },
      capacity: { Crew: "Usually 1 or 2" }
    },
    "Military Transport": {
      dimensions: { Length: "Transport aircraft size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Mission-dependent", Range: "Program-dependent transport range", "Service ceiling": "Program-dependent" },
      weights: { MTOW: "Program-dependent transport weight class" },
      capacity: { Crew: "Mission dependent", Payload: "Program-dependent payload" }
    },
    Trainer: {
      dimensions: { Length: "Trainer aircraft size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Training mission dependent", Range: "Program-dependent", "Service ceiling": "Program-dependent" },
      weights: { MTOW: "Training role dependent" },
      capacity: { Crew: "Usually 2" }
    },
    ISR: {
      dimensions: { Length: "Mission-platform dependent", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Mission-dependent", Range: "Long-endurance mission dependent", "Service ceiling": "Program dependent" },
      weights: { MTOW: "Mission dependent" },
      capacity: { Crew: "Flight crew plus mission operators" }
    },
    Amphibian: {
      dimensions: { Length: "Amphibious aircraft size class", Wingspan: "Program-dependent", Height: "Program-dependent" },
      performance: { "Cruise speed": "Mission-dependent", Range: "Program-dependent" },
      weights: { MTOW: "Program dependent" },
      capacity: { Crew: "Mission dependent" }
    },
    Experimental: {
      dimensions: { Length: "Program dependent", Wingspan: "Program dependent", Height: "Program dependent" },
      performance: { "Cruise speed": "Program dependent", Range: "Program dependent", "Service ceiling": "Program dependent" },
      weights: { MTOW: "Program dependent" },
      capacity: { Crew: "Program dependent" }
    }
  };

  const classDesignFocus = {
    "Commercial Jet": "airline economics, passenger or cargo efficiency, and reliable high-cycle operations",
    "Regional Turboprop": "short-haul efficiency, field performance, and operating cost control",
    "Business Jet": "long range, speed, cabin comfort, and point-to-point executive travel",
    "General Aviation": "accessibility, utility, training value, and owner-flown practicality",
    Fighter: "high-energy performance, mission systems, and combat survivability",
    "Military Transport": "payload flexibility, austere-field access, and mission adaptability",
    Trainer: "predictable handling, systems learning, and pilot progression",
    ISR: "sensor endurance, mission-system integration, and persistent situational awareness",
    Amphibian: "multi-surface access, utility flexibility, and specialized rescue or firefighting roles",
    Experimental: "new technology, future mission concepts, and developmental learning"
  };

  const classServiceFocus = {
    "Commercial Jet": "scheduled passenger service, cargo work, and network connectivity",
    "Regional Turboprop": "regional airline, commuter, and utility transport work",
    "Business Jet": "corporate, charter, and premium executive missions",
    "General Aviation": "training, personal travel, and general utility flying",
    Fighter: "air defense, strike, and high-performance tactical missions",
    "Military Transport": "airlift, tanker, special mission, and logistics operations",
    Trainer: "ab initio, advanced, or lead-in pilot training",
    ISR: "maritime patrol, airborne early warning, surveillance, or reconnaissance tasks",
    Amphibian: "water operations, firefighting, search and rescue, and public-service missions",
    Experimental: "testing, technology demonstration, and future program development"
  };

  const defaultOperatorNotesByClass = {
    "Commercial Jet": ["Typical operators include passenger airlines, leasing companies, cargo carriers, and state transport users depending on configuration."],
    "Regional Turboprop": ["Typical operators include commuter airlines, regional carriers, utility operators, and remote-network services."],
    "Business Jet": ["Typical operators include corporations, charter firms, fractional providers, and government or special mission users."],
    "General Aviation": ["Typical operators include private owners, clubs, schools, utility operators, and specialized small-aircraft users."],
    Fighter: ["Typical operators are national air forces or naval aviation branches, often with role-specific mission packages and training pipelines."],
    "Military Transport": ["Typical operators include air forces, defense logistics organizations, and special mission units."],
    Trainer: ["Typical operators include military flying schools, civilian flight academies, and training organizations."],
    ISR: ["Typical operators include military surveillance units, maritime patrol organizations, and government special mission fleets."],
    Amphibian: ["Typical operators include firefighting services, public agencies, rescue organizations, and niche utility operators."],
    Experimental: ["Operator coverage is often limited because the program is developmental, low-volume, or still evolving."]
  };

  const defaultVariantNotesByClass = {
    "Commercial Jet": ["This program often has multiple passenger, cargo, and performance-related sub-variants or configuration standards."],
    "Regional Turboprop": ["Variant coverage usually reflects seat-count changes, cockpit upgrades, or mission-role refinements."],
    "Business Jet": ["Variant differences usually appear in range packages, cabin upgrades, avionics standards, or later production improvements."],
    "General Aviation": ["Variant differences often involve avionics generations, engine updates, landing gear options, or cabin refinements."],
    Fighter: ["Variant differences often involve radar, avionics, engine standard, mission kit, or single-seat versus dual-seat configuration."],
    "Military Transport": ["Variant differences often include tanker, cargo, surveillance, or special mission sub-types."],
    Trainer: ["Variant differences often reflect cockpit modernization, military mission kits, or updated propulsion standards."],
    ISR: ["Variant differences often come from sensor suites, antenna arrangements, and mission-system integration."],
    Amphibian: ["Variant differences often involve mission equipment, tanking capability, or land/water role optimization."],
    Experimental: ["Variant and block-level coverage may change significantly as the program evolves."]
  };

  const engineProfiles = {
    "airbus-a220": { Engines: "2", "Engine manufacturer": "Pratt & Whitney", "Engine model": "PW1500G", "Engine type": "Geared turbofan" },
    "airbus-a300": { Engines: "2", "Engine manufacturer": "General Electric / Pratt & Whitney", "Engine model": "CF6-50 / JT9D depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a310": { Engines: "2", "Engine manufacturer": "General Electric / Pratt & Whitney", "Engine model": "CF6-80C2 / JT9D-7R4 depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a319": { Engines: "2", "Engine manufacturer": "CFM International / IAE", "Engine model": "CFM56-5B / V2500 depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a320": { Engines: "2", "Engine manufacturer": "CFM International / IAE", "Engine model": "CFM56-5A/5B / V2500 depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a320neo": { Engines: "2", "Engine manufacturer": "CFM International / Pratt & Whitney", "Engine model": "LEAP-1A / PW1100G-JM depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a321": { Engines: "2", "Engine manufacturer": "CFM International / IAE", "Engine model": "CFM56-5B / V2500 depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a321xlr": { Engines: "2", "Engine manufacturer": "CFM International / Pratt & Whitney", "Engine model": "LEAP-1A / PW1100G-JM depending on configuration", "Engine type": "High-bypass turbofan" },
    "airbus-a330-300": { Engines: "2", "Engine manufacturer": "Rolls-Royce / General Electric / Pratt & Whitney", "Engine model": "Trent 700 / CF6-80E1 / PW4000 depending on variant", "Engine type": "High-bypass turbofan" },
    "airbus-a330neo": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Trent 7000", "Engine type": "High-bypass turbofan" },
    "airbus-a340-600": { Engines: "4", "Engine manufacturer": "Rolls-Royce", "Engine model": "Trent 556", "Engine type": "High-bypass turbofan" },
    "airbus-a350-900": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Trent XWB-84", "Engine type": "High-bypass turbofan" },
    "airbus-a350-1000": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Trent XWB-97", "Engine type": "High-bypass turbofan" },
    "airbus-a380": { Engines: "4", "Engine manufacturer": "Engine Alliance / Rolls-Royce", "Engine model": "GP7270 / Trent 900 depending on airline selection", "Engine type": "High-bypass turbofan" },
    "airbus-belugaxl": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Trent 700", "Engine type": "High-bypass turbofan" },

    "boeing-707": { Engines: "4", "Engine manufacturer": "Pratt & Whitney", "Engine model": "JT3C / JT3D depending on variant", "Engine type": "Turbojet / low-bypass turbofan" },
    "boeing-727": { Engines: "3", "Engine manufacturer": "Pratt & Whitney", "Engine model": "JT8D", "Engine type": "Low-bypass turbofan" },
    "boeing-737-800": { Engines: "2", "Engine manufacturer": "CFM International", "Engine model": "CFM56-7B", "Engine type": "High-bypass turbofan" },
    "boeing-737-max": { Engines: "2", "Engine manufacturer": "CFM International", "Engine model": "LEAP-1B", "Engine type": "High-bypass turbofan" },
    "boeing-747-400": { Engines: "4", "Engine manufacturer": "Pratt & Whitney / General Electric / Rolls-Royce", "Engine model": "PW4000 / CF6-80C2 / RB211-524 depending on variant", "Engine type": "High-bypass turbofan" },
    "boeing-747-8f": { Engines: "4", "Engine manufacturer": "General Electric", "Engine model": "GEnx-2B67", "Engine type": "High-bypass turbofan" },
    "boeing-757-200": { Engines: "2", "Engine manufacturer": "Rolls-Royce / Pratt & Whitney", "Engine model": "RB211-535 / PW2000 depending on variant", "Engine type": "High-bypass turbofan" },
    "boeing-767-300f": { Engines: "2", "Engine manufacturer": "General Electric / Pratt & Whitney / Rolls-Royce", "Engine model": "CF6-80C2 / PW4000 / RB211-524 depending on operator and airframe", "Engine type": "High-bypass turbofan" },
    "boeing-777-300er": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "GE90-115B", "Engine type": "High-bypass turbofan" },
    "boeing-777-9": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "GE9X", "Engine type": "High-bypass turbofan" },
    "boeing-787-8": { Engines: "2", "Engine manufacturer": "General Electric / Rolls-Royce", "Engine model": "GEnx-1B / Trent 1000 depending on customer selection", "Engine type": "High-bypass turbofan" },
    "boeing-787-9": { Engines: "2", "Engine manufacturer": "General Electric / Rolls-Royce", "Engine model": "GEnx-1B / Trent 1000 depending on customer selection", "Engine type": "High-bypass turbofan" },
    "boeing-787-10": { Engines: "2", "Engine manufacturer": "General Electric / Rolls-Royce", "Engine model": "GEnx-1B / Trent 1000 depending on customer selection", "Engine type": "High-bypass turbofan" },
    "boeing-p8": { Engines: "2", "Engine manufacturer": "CFM International", "Engine model": "CFM56-7B", "Engine type": "High-bypass turbofan" },

    "embraer-bandeirante": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-34", "Engine type": "Turboprop" },
    "embraer-erj145": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "AE 3007A", "Engine type": "Turbofan" },
    "embraer-e170": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-8E", "Engine type": "Turbofan" },
    "embraer-e175": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-8E", "Engine type": "Turbofan" },
    "embraer-e190": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-10E", "Engine type": "Turbofan" },
    "embraer-e195-e2": { Engines: "2", "Engine manufacturer": "Pratt & Whitney", "Engine model": "PW1900G series", "Engine type": "Geared turbofan" },
    "embraer-kc390": { Engines: "2", "Engine manufacturer": "IAE", "Engine model": "V2500-E5", "Engine type": "Turbofan" },
    "embraer-super-tucano": { Engines: "1", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-68C", "Engine type": "Turboprop" },

    "bombardier-crj200": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-3B1", "Engine type": "Turbofan" },
    "bombardier-crj900": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-8C5", "Engine type": "Turbofan" },
    "bombardier-q400": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW150A", "Engine type": "Turboprop" },
    "bombardier-challenger-3500": { Engines: "2", "Engine manufacturer": "Honeywell", "Engine model": "HTF7350", "Engine type": "Turbofan" },
    "bombardier-global-7500": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "Passport", "Engine type": "Turbofan" },

    "cessna-152": { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "O-235", "Engine type": "Piston flat-four" },
    "cessna-172": { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "IO-360-L2A on current Skyhawk production", "Engine type": "Piston flat-four" },
    "cessna-182": { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "IO-540 / TIO-540 family depending on version", "Engine type": "Piston flat-six" },
    "cessna-caravan": { Engines: "1", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-114A / PT6A-140 depending on variant", "Engine type": "Turboprop" },
    "cessna-cj4-gen2": { Engines: "2", "Engine manufacturer": "Williams International", "Engine model": "FJ44-4A", "Engine type": "Turbofan" },
    "cessna-latitude": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW306D1", "Engine type": "Turbofan" },
    "cessna-longitude": { Engines: "2", "Engine manufacturer": "Honeywell", "Engine model": "HTF7700L", "Engine type": "Turbofan" },

    "beechcraft-bonanza": { Engines: "1", "Engine manufacturer": "Continental", "Engine model": "IO-550-B", "Engine type": "Piston flat-six" },
    "beechcraft-baron": { Engines: "2", "Engine manufacturer": "Continental", "Engine model": "IO-550-C", "Engine type": "Piston flat-six" },
    "beechcraft-king-air-260": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-52", "Engine type": "Turboprop" },
    "beechcraft-king-air-360": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-60A", "Engine type": "Turboprop" },
    "beechcraft-t6c": { Engines: "1", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-68", "Engine type": "Turboprop" },

    "piper-j3": { Engines: "1", "Engine manufacturer": "Continental", "Engine model": "A65 series", "Engine type": "Piston flat-four" },
    "piper-archer-lx": { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "IO-360-B4A", "Engine type": "Piston flat-four" },
    "piper-seminole": { Engines: "2", "Engine manufacturer": "Lycoming", "Engine model": "O-360-E1A6D", "Engine type": "Piston flat-four" },
    "piper-m350": { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "TIO-540-AE2A", "Engine type": "Turbocharged piston flat-six" },
    "piper-m600-sls": { Engines: "1", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-42A", "Engine type": "Turboprop" },
    "piper-m700-fury": { Engines: "1", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-52", "Engine type": "Turboprop" },

    "gulfstream-g280": { Engines: "2", "Engine manufacturer": "Honeywell", "Engine model": "HTF7250G", "Engine type": "Turbofan" },
    "gulfstream-g500": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW814GA", "Engine type": "Turbofan" },
    "gulfstream-g650er": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "BR725", "Engine type": "Turbofan" },
    "gulfstream-g700": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Pearl 700", "Engine type": "Turbofan" },
    "gulfstream-g800": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Pearl 700", "Engine type": "Turbofan" },

    "atr-42-600": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW127M / PW127XT-M depending on production standard", "Engine type": "Turboprop" },
    "atr-72-600": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW127M / PW127XT-M depending on production standard", "Engine type": "Turboprop" },
    "atr-evo": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada / future hybrid-assist partners under study", "Engine model": "Future regional turboprop powerplant not yet finalized", "Engine type": "Next-generation turboprop / hybrid-assist concept" },

    "comac-c909": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CF34-10A", "Engine type": "Turbofan" },
    "comac-c919": { Engines: "2", "Engine manufacturer": "CFM International", "Engine model": "LEAP-1C", "Engine type": "High-bypass turbofan" },
    "comac-c929": { Engines: "2", "Engine manufacturer": "Not yet finalized", "Engine model": "Widebody-class engine selection still program-dependent", "Engine type": "Future high-bypass turbofan" },

    "lockheed-f16v": { Engines: "1", "Engine manufacturer": "Pratt & Whitney / General Electric", "Engine model": "F100-PW-229 or F110-GE-129 depending on operator", "Engine type": "Afterburning turbofan" },
    "lockheed-f22": { Engines: "2", "Engine manufacturer": "Pratt & Whitney", "Engine model": "F119-PW-100", "Engine type": "Afterburning turbofan" },
    "lockheed-f35a": { Engines: "1", "Engine manufacturer": "Pratt & Whitney", "Engine model": "F135-PW-100", "Engine type": "Afterburning turbofan" },
    "lockheed-f35b": { Engines: "1 main engine plus lift system", "Engine manufacturer": "Pratt & Whitney / Rolls-Royce lift system partner", "Engine model": "F135-PW-600 with shaft-driven lift fan system", "Engine type": "STOVL afterburning turbofan arrangement" },
    "lockheed-f35c": { Engines: "1", "Engine manufacturer": "Pratt & Whitney", "Engine model": "F135-PW-400", "Engine type": "Afterburning turbofan" },
    "lockheed-c130j": { Engines: "4", "Engine manufacturer": "Rolls-Royce", "Engine model": "AE 2100D3", "Engine type": "Turboprop" },

    "northrop-b2": { Engines: "4", "Engine manufacturer": "General Electric", "Engine model": "F118-GE-100", "Engine type": "Non-afterburning turbofan" },
    "northrop-b21": { Engines: "Undisclosed", "Engine manufacturer": "Undisclosed", "Engine model": "Undisclosed next-generation strategic bomber powerplant", "Engine type": "Strategic stealth bomber turbofan configuration" },
    "northrop-e2d": { Engines: "2", "Engine manufacturer": "Rolls-Royce / Allison heritage", "Engine model": "T56-A-427A", "Engine type": "Turboprop" },
    "northrop-mq4c": { Engines: "1", "Engine manufacturer": "Rolls-Royce", "Engine model": "AE 3007H", "Engine type": "Turbofan" },

    "dassault-mirage2000": { Engines: "1", "Engine manufacturer": "SNECMA", "Engine model": "M53-P2", "Engine type": "Afterburning turbofan" },
    "dassault-rafale-f4": { Engines: "2", "Engine manufacturer": "Safran", "Engine model": "M88-2", "Engine type": "Afterburning turbofan" },
    "dassault-falcon-8x": { Engines: "3", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW307D", "Engine type": "Turbofan" },
    "dassault-falcon-10x": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "Pearl 10X", "Engine type": "Turbofan" },

    "saab-gripen-e": { Engines: "1", "Engine manufacturer": "General Electric", "Engine model": "F414G", "Engine type": "Afterburning turbofan" },
    "saab-globaleye": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "BR710A2-20", "Engine type": "Turbofan" },
    "saab-340-aew": { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "CT7-9B", "Engine type": "Turboprop" },

    "sukhoi-superjet100": { Engines: "2", "Engine manufacturer": "PowerJet", "Engine model": "SaM146", "Engine type": "Turbofan" },
    "sukhoi-su27": { Engines: "2", "Engine manufacturer": "Saturn / Lyulka lineage", "Engine model": "AL-31F", "Engine type": "Afterburning turbofan" },
    "sukhoi-su30sm2": { Engines: "2", "Engine manufacturer": "Saturn", "Engine model": "AL-41F-1S / AL-31FP depending on standard", "Engine type": "Afterburning turbofan" },
    "sukhoi-su35s": { Engines: "2", "Engine manufacturer": "Saturn", "Engine model": "AL-41F1S", "Engine type": "Afterburning turbofan" },
    "sukhoi-su57": { Engines: "2", "Engine manufacturer": "Saturn", "Engine model": "AL-41F1 currently, future Izdeliye 30 path", "Engine type": "Afterburning turbofan" },

    "antonov-an124": { Engines: "4", "Engine manufacturer": "Ivchenko-Progress / Motor Sich", "Engine model": "D-18T", "Engine type": "High-bypass turbofan" },
    "antonov-an148": { Engines: "2", "Engine manufacturer": "Ivchenko-Progress / Motor Sich", "Engine model": "D-436-148", "Engine type": "Turbofan" },
    "antonov-an225": { Engines: "6", "Engine manufacturer": "Ivchenko-Progress / Motor Sich", "Engine model": "D-18T", "Engine type": "High-bypass turbofan" },

    "mdd-dc10": { Engines: "3", "Engine manufacturer": "General Electric / Pratt & Whitney", "Engine model": "CF6 / JT9D depending on variant", "Engine type": "High-bypass turbofan" },
    "mdd-md11": { Engines: "3", "Engine manufacturer": "General Electric / Pratt & Whitney / Rolls-Royce", "Engine model": "CF6-80C2 / PW4460 / RB211-524 depending on variant", "Engine type": "High-bypass turbofan" },
    "mdd-md80": { Engines: "2", "Engine manufacturer": "Pratt & Whitney", "Engine model": "JT8D-200 series", "Engine type": "Low-bypass turbofan" },
    "mdd-md95": { Engines: "2", "Engine manufacturer": "Rolls-Royce", "Engine model": "BR715", "Engine type": "Turbofan" },

    "dhc-twin-otter": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PT6A-34 / PT6A-35 depending on series", "Engine type": "Turboprop" },
    "dhc-dash-8-400": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW150A", "Engine type": "Turboprop" },
    "dhc-515": { Engines: "2", "Engine manufacturer": "Pratt & Whitney Canada", "Engine model": "PW123AF", "Engine type": "Turboprop" }
  };

  const specOverrides = {
    "airbus-a220": { dimensions: { Length: "35.0 to 38.7 m", Wingspan: "35.1 m", Height: "11.5 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Up to about 6,300 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Up to about 70,900 kg" }, capacity: { Crew: "2", Passengers: "Approx. 100 to 160" } },
    "airbus-a320": { dimensions: { Length: "37.6 m", Wingspan: "34.1 m", Height: "11.8 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 6,100 km", "Service ceiling": "39,000 ft" }, weights: { MTOW: "Up to about 78,000 kg" }, capacity: { Crew: "2", Passengers: "Typically 150 to 180" } },
    "airbus-a320neo": { dimensions: { Length: "37.6 m", Wingspan: "35.8 m", Height: "11.8 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 6,300 to 6,500 km", "Service ceiling": "39,000 ft" }, weights: { MTOW: "Up to about 79,000 kg" }, capacity: { Crew: "2", Passengers: "Typically 150 to 190" } },
    "airbus-a321": { dimensions: { Length: "44.5 m", Wingspan: "34.1 m", Height: "11.8 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 5,600 km", "Service ceiling": "39,000 ft" }, weights: { MTOW: "Up to about 93,500 kg on later variants" }, capacity: { Crew: "2", Passengers: "Typically 185 to 220+" } },
    "airbus-a321xlr": { dimensions: { Length: "44.5 m", Wingspan: "35.8 m", Height: "11.8 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 8,700 km", "Service ceiling": "39,000 ft" }, weights: { MTOW: "Approx. 101,000 kg" }, capacity: { Crew: "2", Passengers: "Typically 180 to 220" } },
    "airbus-a330-300": { dimensions: { Length: "63.7 m", Wingspan: "60.3 m", Height: "16.8 m" }, performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 11,750 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Up to about 242,000 kg" }, capacity: { Crew: "2", Passengers: "Typically 277 to 440" } },
    "airbus-a330neo": { dimensions: { Length: "63.7 m", Wingspan: "64.0 m", Height: "16.8 m" }, performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 13,300 km", "Service ceiling": "41,100 ft" }, weights: { MTOW: "Up to about 251,000 kg" }, capacity: { Crew: "2", Passengers: "Typically around 260 to 300+" } },
    "airbus-a350-900": { dimensions: { Length: "66.8 m", Wingspan: "64.8 m", Height: "17.1 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 15,000 km", "Service ceiling": "43,100 ft" }, weights: { MTOW: "Up to about 283,000 kg" }, capacity: { Crew: "2", Passengers: "Typically around 300 to 350" } },
    "airbus-a350-1000": { dimensions: { Length: "73.8 m", Wingspan: "64.8 m", Height: "17.1 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 16,100 km", "Service ceiling": "43,100 ft" }, weights: { MTOW: "Up to about 319,000 kg" }, capacity: { Crew: "2", Passengers: "Typically around 350 to 410" } },
    "airbus-a380": { dimensions: { Length: "72.7 m", Wingspan: "79.8 m", Height: "24.1 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 15,200 km", "Service ceiling": "43,000 ft" }, weights: { MTOW: "Up to about 575,000 kg" }, capacity: { Crew: "2", Passengers: "Typical 500+; certified for much more in dense layout" } },
    "boeing-737-800": { dimensions: { Length: "39.5 m", Wingspan: "35.8 m", Height: "12.5 m" }, performance: { "Cruise speed": "Mach 0.785", Range: "Approx. 5,400 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Up to about 79,000 kg" }, capacity: { Crew: "2", Passengers: "Typical 162 to 189" } },
    "boeing-737-max": { dimensions: { Length: "39.5 m", Wingspan: "35.9 m", Height: "12.3 m" }, performance: { "Cruise speed": "Mach 0.79", Range: "Approx. 6,570 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Up to about 82,190 kg" }, capacity: { Crew: "2", Passengers: "Typical 162 to 178, up to 210 in dense layout" } },
    "boeing-747-400": { dimensions: { Length: "70.7 m", Wingspan: "64.4 m", Height: "19.4 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 13,450 km", "Service ceiling": "45,100 ft" }, weights: { MTOW: "Up to about 396,900 kg" }, capacity: { Crew: "2", Passengers: "Typical around 416 to 524" } },
    "boeing-747-8f": { dimensions: { Length: "76.3 m", Wingspan: "68.4 m", Height: "19.4 m" }, performance: { "Cruise speed": "Mach 0.855", Range: "Approx. 8,130 km with full payload", "Service ceiling": "43,100 ft" }, weights: { MTOW: "Approx. 447,700 kg" }, capacity: { Crew: "2", Payload: "Approx. 137 t class payload" } },
    "boeing-757-200": { dimensions: { Length: "47.3 m", Wingspan: "38.0 m", Height: "13.6 m" }, performance: { "Cruise speed": "Mach 0.80", Range: "Approx. 7,200 km", "Service ceiling": "42,000 ft" }, weights: { MTOW: "Up to about 115,700 kg" }, capacity: { Crew: "2", Passengers: "Typical 178 to 239" } },
    "boeing-767-300f": { dimensions: { Length: "54.9 m", Wingspan: "47.6 m", Height: "15.8 m" }, performance: { "Cruise speed": "Mach 0.80", Range: "Approx. 6,000 km with freight mission profile", "Service ceiling": "43,000 ft" }, weights: { MTOW: "Approx. 186,900 kg" }, capacity: { Crew: "2", Payload: "Approx. 52 to 58 t class" } },
    "boeing-777-300er": { dimensions: { Length: "73.9 m", Wingspan: "64.8 m", Height: "18.5 m" }, performance: { "Cruise speed": "Mach 0.84", Range: "Approx. 13,650 km", "Service ceiling": "43,100 ft" }, weights: { MTOW: "Approx. 351,500 kg" }, capacity: { Crew: "2", Passengers: "Typical 350 to 396" } },
    "boeing-777-9": { dimensions: { Length: "76.7 m", Wingspan: "71.8 m unfolded", Height: "19.5 m" }, performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 13,500 km", "Service ceiling": "43,100 ft" }, weights: { MTOW: "Approx. 351,500+ kg class" }, capacity: { Crew: "2", Passengers: "Typical 400+" } },
    "boeing-787-8": { dimensions: { Length: "56.7 m", Wingspan: "60.1 m", Height: "17.0 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 13,620 km", "Service ceiling": "43,000 ft" }, weights: { MTOW: "Approx. 227,900 kg" }, capacity: { Crew: "2", Passengers: "Typical 242 to 290" } },
    "boeing-787-9": { dimensions: { Length: "62.8 m", Wingspan: "60.1 m", Height: "17.0 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 14,100 km", "Service ceiling": "43,000 ft" }, weights: { MTOW: "Approx. 254,000 kg" }, capacity: { Crew: "2", Passengers: "Typical 280 to 320" } },
    "boeing-787-10": { dimensions: { Length: "68.3 m", Wingspan: "60.1 m", Height: "17.0 m" }, performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 11,900 km", "Service ceiling": "43,000 ft" }, weights: { MTOW: "Approx. 254,000 kg" }, capacity: { Crew: "2", Passengers: "Typical 318 to 336+" } },
    "embraer-e175": { dimensions: { Length: "31.7 m", Wingspan: "26.0 m", Height: "9.7 m" }, performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 3,700 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Approx. 38,790 kg" }, capacity: { Crew: "2", Passengers: "Typically 76 to 88" } },
    "embraer-e195-e2": { dimensions: { Length: "41.5 m", Wingspan: "35.1 m", Height: "10.9 m" }, performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 4,800 to 5,300 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Approx. 61,500 kg" }, capacity: { Crew: "2", Passengers: "Typically 120 to 146" } },
    "embraer-kc390": { dimensions: { Length: "35.2 m", Wingspan: "35.0 m", Height: "11.8 m" }, performance: { "Cruise speed": "Approx. 870 km/h", Range: "Approx. 2,800 km with full payload, farther on lighter missions", "Service ceiling": "36,000 ft" }, weights: { MTOW: "Approx. 87,000 kg" }, capacity: { Crew: "2", Payload: "Approx. 26 t class" } },
    "bombardier-crj900": { dimensions: { Length: "36.4 m", Wingspan: "24.9 m", Height: "7.5 m" }, performance: { "Cruise speed": "Approx. Mach 0.78", Range: "Approx. 2,900 km", "Service ceiling": "41,000 ft" }, weights: { MTOW: "Approx. 38,300 kg" }, capacity: { Crew: "2", Passengers: "Typically 76 to 90" } },
    "bombardier-q400": { dimensions: { Length: "32.8 m", Wingspan: "28.4 m", Height: "8.4 m" }, performance: { "Cruise speed": "Approx. 660 km/h", Range: "Approx. 2,000 km", "Service ceiling": "25,000 ft" }, weights: { MTOW: "Approx. 29,260 kg" }, capacity: { Crew: "2", Passengers: "Typically 68 to 90" } },
    "bombardier-global-7500": { dimensions: { Length: "33.8 m", Wingspan: "31.8 m", Height: "8.1 m" }, performance: { "Cruise speed": "Up to Mach 0.925", Range: "Approx. 14,260 km", "Service ceiling": "51,000 ft" }, weights: { MTOW: "Approx. 52,100 kg" }, capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" } },
    "cessna-172": { dimensions: { Length: "8.3 m", Wingspan: "11.0 m", Height: "2.7 m" }, performance: { "Cruise speed": "Approx. 226 km/h", Range: "Approx. 1,180 km", "Service ceiling": "14,000 ft" }, weights: { MTOW: "Approx. 1,157 kg" }, capacity: { Crew: "1", Passengers: "Up to 3 more occupants" } },
    "cessna-caravan": { dimensions: { Length: "12.7 m", Wingspan: "15.9 m", Height: "4.5 m" }, performance: { "Cruise speed": "Approx. 340 km/h", Range: "Approx. 1,700 km", "Service ceiling": "25,000 ft" }, weights: { MTOW: "Approx. 3,970 kg to 3,995 kg class depending on model" }, capacity: { Crew: "1 or 2", Passengers: "Typically up to 9 to 14 depending on layout and rules" } },
    "cessna-longitude": { dimensions: { Length: "22.3 m", Wingspan: "21.0 m", Height: "6.2 m" }, performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 6,500 km", "Service ceiling": "45,000 ft" }, weights: { MTOW: "Approx. 17,900 kg" }, capacity: { Crew: "2", Passengers: "Typically up to 12" } },
    "gulfstream-g650er": { dimensions: { Length: "30.4 m", Wingspan: "30.4 m", Height: "7.8 m" }, performance: { "Cruise speed": "Up to Mach 0.925", Range: "Approx. 13,900 km", "Service ceiling": "51,000 ft" }, weights: { MTOW: "Approx. 45,200 kg" }, capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" } },
    "gulfstream-g700": { dimensions: { Length: "33.5 m", Wingspan: "31.4 m", Height: "7.8 m" }, performance: { "Cruise speed": "Approx. Mach 0.90, max Mach 0.935", Range: "Approx. 13,900 km", "Service ceiling": "51,000 ft" }, weights: { MTOW: "Approx. 48,200 kg" }, capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" } },
    "lockheed-f16v": { dimensions: { Length: "15.0 m", Wingspan: "9.96 m", Height: "4.9 m" }, performance: { "Max speed": "Approx. Mach 2.0", Range: "Ferry range roughly 4,200 km with tanks", "Service ceiling": "50,000+ ft" }, weights: { MTOW: "Approx. 19,000 kg class" }, capacity: { Crew: "1 or 2 depending on configuration" } },
    "lockheed-f22": { dimensions: { Length: "18.9 m", Wingspan: "13.6 m", Height: "5.1 m" }, performance: { "Max speed": "Approx. Mach 2.0+", Range: "Approx. 3,000 km ferry class", "Service ceiling": "65,000 ft" }, weights: { MTOW: "Approx. 38,000 kg" }, capacity: { Crew: "1" } },
    "lockheed-f35a": { dimensions: { Length: "15.7 m", Wingspan: "10.7 m", Height: "4.4 m" }, performance: { "Max speed": "Approx. Mach 1.6", Range: "Approx. 2,200 km class", "Service ceiling": "50,000+ ft" }, weights: { MTOW: "Approx. 31,800 kg" }, capacity: { Crew: "1" } },
    "lockheed-c130j": { dimensions: { Length: "29.8 m", Wingspan: "40.4 m", Height: "11.9 m" }, performance: { "Cruise speed": "Approx. 670 km/h", Range: "Approx. 3,300 km with useful payload", "Service ceiling": "28,000 ft+" }, weights: { MTOW: "Approx. 74,400 kg" }, capacity: { Crew: "Usually 2 to 5 depending on mission", Payload: "Approx. 20 t class" } }
  };

  const detailNotes = {
    "airbus-a220": "It is especially important because it gives airlines a genuinely modern aircraft below traditional narrowbody sizes, with noticeably strong comfort and efficiency for its seating bracket.",
    "airbus-a380": "Its scale, cabin volume, and four-engine architecture make it one of the clearest examples of the hub-and-spoke superjumbo strategy.",
    "boeing-747-400": "It is one of the aircraft most strongly associated with the golden image of long-haul travel and the classic widebody era.",
    "boeing-787-9": "The 787-9 is often seen as the commercial sweet spot of the Dreamliner family because it combines very good range with balanced capacity.",
    "embraer-e175": "The aircraft is especially famous in North American regional flying, where scope clauses and network planning made it commercially influential.",
    "bombardier-global-7500": "In business aviation, it represents the top end of range, cabin zoning, and flagship-style corporate transport.",
    "cessna-172": "Its long training history makes it one of the most important pilot-making aircraft ever produced.",
    "lockheed-f35a": "What makes it unusual is how much of its combat value comes from software, data fusion, and mission networking rather than raw kinematics alone.",
    "northrop-b2": "Its flying-wing stealth approach makes it one of the most visually and strategically distinctive bombers ever fielded."
  };

  const rawManufacturers = [
    {
      id: "airbus",
      name: "Airbus",
      country: "Europe",
      founded: "1970",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Widebody", "Freighter"],
      summary: "Airbus is a major European airframer known for fly-by-wire airliners, wide global airline reach, and an extensive modern jet family.",
      aircraft: [
        { id: "airbus-a220", name: "A220", firstFlight: "2013", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "Originally developed as the C Series, the A220 covers the 100 to 150 seat market with efficient engines and a modern cabin." },
        { id: "airbus-a300", name: "A300", firstFlight: "1972", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The A300 was the world's first twin-engine widebody airliner and launched Airbus into the mainline market." },
        { id: "airbus-a310", name: "A310", firstFlight: "1982", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The A310 shortened the A300 concept into a medium-to-long-haul widebody used by airlines, cargo operators, and governments." },
        { id: "airbus-a319", name: "A319", firstFlight: "1995", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Long-running program", overview: "The A319 became popular with airlines needing a slightly smaller A320-family aircraft with common crew and systems." },
        { id: "airbus-a320", name: "A320", firstFlight: "1987", timeline: "Jet Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Historic best-seller", overview: "The A320 changed short-haul airline design with digital fly-by-wire controls and a highly scalable single-aisle platform." },
        { id: "airbus-a320neo", name: "A320neo", firstFlight: "2014", timeline: "Digital Age", type: "Re-engined narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A320neo modernized Airbus's best-known family with more efficient engines and lower operating costs." },
        { id: "airbus-a321", name: "A321", firstFlight: "1993", timeline: "Jet Age", type: "Stretched narrowbody airliner", class: "Commercial Jet", programState: "Core family program", overview: "The A321 became one of the most commercially important single-aisle aircraft by combining capacity with strong economics." },
        { id: "airbus-a321xlr", name: "A321XLR", firstFlight: "2022", timeline: "Digital Age", type: "Long-range narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A321XLR extends narrowbody reach into transatlantic and thin long-haul missions that used to require larger widebodies." },
        { id: "airbus-a330-300", name: "A330-300", firstFlight: "1992", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Long-running program", overview: "The A330-300 has been a flexible widebody for medium and long-haul operations, cargo conversion, and high-density routes." },
        { id: "airbus-a330neo", name: "A330-900neo", firstFlight: "2017", timeline: "Digital Age", type: "Updated widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A330neo refreshes a familiar widebody platform with newer engines, aerodynamic improvements, and better fuel efficiency." },
        { id: "airbus-a340-600", name: "A340-600", firstFlight: "2001", timeline: "Digital Age", type: "Long-range four-engine airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The A340-600 represented Airbus's long-haul four-engine era before very large twinjets took over much of that market." },
        { id: "airbus-a350-900", name: "A350-900", firstFlight: "2013", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A350-900 blends composites, advanced systems, and long-range economics into one of Airbus's flagship aircraft." },
        { id: "airbus-a350-1000", name: "A350-1000", firstFlight: "2016", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The stretched A350-1000 serves high-capacity long-haul missions with strong range and efficiency." },
        { id: "airbus-a380", name: "A380", firstFlight: "2005", timeline: "Digital Age", type: "Very large airliner", class: "Commercial Jet", programState: "Modern icon", overview: "The A380 became aviation's best-known double-deck passenger jet and a symbol of the hub-and-spoke era." },
        { id: "airbus-belugaxl", name: "BelugaXL", firstFlight: "2018", timeline: "Digital Age", type: "Oversize cargo transport", class: "Commercial Jet", programState: "Specialized fleet", overview: "The BelugaXL is Airbus's unmistakable internal logistics aircraft, built to carry large fuselage and wing sections between factories." }
      ]
    },
    {
      id: "boeing",
      name: "Boeing",
      country: "United States",
      founded: "1916",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Cargo", "Widebody"],
      summary: "Boeing spans early aviation history through the modern jetliner era and remains one of the defining names in global aerospace.",
      aircraft: [
        { id: "boeing-707", name: "707", firstFlight: "1957", timeline: "Jet Age", type: "Early jet airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The 707 helped turn jet travel into a practical global airline model and established Boeing as a jetliner giant." },
        { id: "boeing-727", name: "727", firstFlight: "1963", timeline: "Jet Age", type: "Trijet narrowbody airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The 727 became one of the most recognizable short-to-medium-haul jets of the classic airliner era." },
        { id: "boeing-737-800", name: "737-800", firstFlight: "1997", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Global airline staple", overview: "The 737-800 became one of the most widely used airline aircraft in the world thanks to its size and route flexibility." },
        { id: "boeing-737-max", name: "737 MAX 8", firstFlight: "2016", timeline: "Digital Age", type: "Updated narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 737 MAX continues Boeing's long-running narrowbody line with updated engines and revised systems." },
        { id: "boeing-747-400", name: "747-400", firstFlight: "1988", timeline: "Jet Age", type: "Widebody jumbo jet", class: "Commercial Jet", programState: "Historic icon", overview: "The 747-400 became one of the most famous long-haul aircraft ever built and defined the image of intercontinental travel." },
        { id: "boeing-747-8f", name: "747-8 Freighter", firstFlight: "2010", timeline: "Digital Age", type: "Widebody cargo aircraft", class: "Commercial Jet", programState: "Cargo flagship", overview: "The 747-8F carried Boeing's jumbo concept into the modern cargo world with updated aerodynamics and higher efficiency." },
        { id: "boeing-757-200", name: "757-200", firstFlight: "1982", timeline: "Jet Age", type: "Medium-range narrowbody airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The 757 combined strong runway performance and useful range, earning a loyal following among airlines and passengers." },
        { id: "boeing-767-300f", name: "767-300 Freighter", firstFlight: "1995 freighter line", timeline: "Digital Age", type: "Widebody cargo aircraft", class: "Commercial Jet", programState: "Current cargo line", overview: "The 767 freighter remains highly relevant in cargo networks and has become one of the most important mid-size freight aircraft." },
        { id: "boeing-777-300er", name: "777-300ER", firstFlight: "2003", timeline: "Digital Age", type: "Long-range widebody airliner", class: "Commercial Jet", programState: "Long-haul icon", overview: "The 777-300ER dominated premium long-haul airline planning for years with range, payload, and twin-engine efficiency." },
        { id: "boeing-777-9", name: "777-9", firstFlight: "2020", timeline: "Next Horizon", type: "Next-generation widebody airliner", class: "Commercial Jet", programState: "Advanced development", overview: "The 777-9 represents the next step in Boeing's large twinjet strategy, blending folding wingtips and updated long-range efficiency." },
        { id: "boeing-787-8", name: "787-8 Dreamliner", firstFlight: "2009", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-8 launched Boeing's composite long-haul family and helped normalize thinner point-to-point long-distance routes." },
        { id: "boeing-787-9", name: "787-9 Dreamliner", firstFlight: "2013", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-9 became one of Boeing's most important widebodies by pairing long range with strong airline economics." },
        { id: "boeing-787-10", name: "787-10 Dreamliner", firstFlight: "2017", timeline: "Digital Age", type: "Stretched widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-10 stretches the Dreamliner concept toward higher capacity while staying focused on efficient medium and long-haul work." },
        { id: "boeing-p8", name: "P-8 Poseidon", firstFlight: "2009", timeline: "Digital Age", type: "Maritime patrol aircraft", class: "ISR", programState: "Current military derivative", overview: "The P-8 shows how Boeing's commercial jet platforms can be adapted into advanced defense and surveillance roles." }
      ]
    },
    {
      id: "embraer",
      name: "Embraer",
      country: "Brazil",
      founded: "1969",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Commercial Jet", "Regional jet", "Military Transport"],
      summary: "Embraer blends regional jet leadership with business aviation and defense programs, giving it one of the broadest portfolios in aerospace.",
      aircraft: [
        { id: "embraer-bandeirante", name: "EMB 110 Bandeirante", firstFlight: "1968", timeline: "Jet Age", type: "Twin turboprop regional aircraft", class: "Regional Turboprop", programState: "Historic regional aircraft", overview: "The Bandeirante helped establish Embraer and became an early regional workhorse." },
        { id: "embraer-erj145", name: "ERJ 145", firstFlight: "1995", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Historic regional jet", overview: "The ERJ 145 became one of the best-known 50-seat regional jets and a familiar sight worldwide." },
        { id: "embraer-e170", name: "E170", firstFlight: "2002", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "E-Jet family program", overview: "The E170 launched the first-generation E-Jet family with a comfortable cabin and efficient short-haul performance." },
        { id: "embraer-e175", name: "E175", firstFlight: "2003", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Current program", overview: "The E175 became a staple of regional airline fleets thanks to its cabin comfort, economics, and network flexibility." },
        { id: "embraer-e190", name: "E190", firstFlight: "2004", timeline: "Digital Age", type: "Small mainline jet", class: "Commercial Jet", programState: "Current family line", overview: "The E190 moved Embraer further upmarket into mainline routes that needed less capacity than larger narrowbodies." },
        { id: "embraer-e195-e2", name: "E195-E2", firstFlight: "2017", timeline: "Digital Age", type: "Regional jet / small mainline jet", class: "Commercial Jet", programState: "Current program", overview: "The E2 generation modernized Embraer's commercial family with new wings, engines, and improved operating efficiency." },
        { id: "embraer-kc390", name: "KC-390 Millennium", firstFlight: "2015", timeline: "Digital Age", type: "Tactical transport / tanker", class: "Military Transport", programState: "Current program", overview: "The KC-390 extends Embraer into defense airlift with jet speed, multi-role flexibility, and cargo handling capability." },
        { id: "embraer-super-tucano", name: "A-29 Super Tucano", firstFlight: "1999", timeline: "Digital Age", type: "Turboprop light attack and trainer", class: "Trainer", programState: "Current program", overview: "The Super Tucano is one of Embraer's most successful military aircraft, widely used for training and light attack missions." }
      ]
    },
    {
      id: "bombardier",
      name: "Bombardier",
      country: "Canada",
      founded: "1942",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Regional jet", "Long-range"],
      summary: "Bombardier evolved from regional airliners into a business-jet specialist known for long-range cabins and premium corporate aircraft.",
      aircraft: [
        { id: "bombardier-crj200", name: "CRJ200", firstFlight: "1991", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Historic regional jet", overview: "The CRJ200 became one of the classic small regional jets and was central to high-frequency feeder flying." },
        { id: "bombardier-crj900", name: "CRJ900", firstFlight: "2001", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Legacy icon", overview: "The CRJ900 became one of the best-known regional jet variants, helping shape high-frequency short-haul networks." },
        { id: "bombardier-q400", name: "Dash 8 Q400", firstFlight: "1998", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Historic family member", overview: "The Q400 offered turboprop efficiency with higher speed and remains a highly recognizable regional aircraft." },
        { id: "bombardier-challenger-3500", name: "Challenger 3500", firstFlight: "2021 generation", timeline: "Next Horizon", type: "Super-midsize business jet", class: "Business Jet", programState: "Current generation", overview: "The Challenger 3500 keeps Bombardier highly visible in the super-midsize corporate market." },
        { id: "bombardier-global-7500", name: "Global 7500", firstFlight: "2016", timeline: "Digital Age", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current program", overview: "Bombardier positioned the Global 7500 at the top end of business aviation with exceptional range and a four-zone cabin." }
      ]
    },
    {
      id: "cessna",
      name: "Cessna",
      country: "United States",
      founded: "1927",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Business Jet"],
      summary: "Cessna is one of the most recognized general aviation names, spanning primary trainers, utility aircraft, and business jets.",
      aircraft: [
        { id: "cessna-152", name: "152", firstFlight: "1977", timeline: "Jet Age", type: "Primary trainer", class: "Trainer", programState: "Historic training icon", overview: "The Cessna 152 trained huge numbers of pilots and remains one of the most familiar light trainers ever built." },
        { id: "cessna-172", name: "172 Skyhawk", firstFlight: "1955", timeline: "Jet Age", type: "Piston trainer / touring aircraft", class: "General Aviation", programState: "Current program", overview: "The Skyhawk became a worldwide standard for pilot training thanks to its approachable handling and huge support network." },
        { id: "cessna-182", name: "182 Skylane", firstFlight: "1956", timeline: "Jet Age", type: "Touring piston single", class: "General Aviation", programState: "Long-running aircraft", overview: "The Skylane is a classic Cessna step-up aircraft for owners who want more load, speed, and traveling flexibility." },
        { id: "cessna-caravan", name: "208 Caravan", firstFlight: "1982", timeline: "Jet Age", type: "Utility turboprop", class: "General Aviation", programState: "Current program", overview: "The Caravan is a versatile single-engine turboprop used for passengers, cargo, bush operations, and special missions." },
        { id: "cessna-cj4-gen2", name: "Citation CJ4 Gen2", firstFlight: "2009 lineage", timeline: "Digital Age", type: "Light business jet", class: "Business Jet", programState: "Current program", overview: "The CJ4 line keeps Cessna strong in owner-flown and corporate light-jet operations." },
        { id: "cessna-latitude", name: "Citation Latitude", firstFlight: "2014", timeline: "Digital Age", type: "Midsize business jet", class: "Business Jet", programState: "Current program", overview: "The Citation Latitude helped Cessna move further into the midsize business jet market with a stand-up cabin." },
        { id: "cessna-longitude", name: "Citation Longitude", firstFlight: "2016", timeline: "Digital Age", type: "Super-midsize business jet", class: "Business Jet", programState: "Current program", overview: "The Citation Longitude adds long-range corporate capability to Cessna's long-running business jet family." }
      ]
    },
    {
      id: "beechcraft",
      name: "Beechcraft",
      country: "United States",
      founded: "1932",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Turboprop", "Trainer"],
      summary: "Beechcraft blends classic personal aircraft with durable turboprops and military training platforms.",
      aircraft: [
        { id: "beechcraft-bonanza", name: "Bonanza G36", firstFlight: "1947 lineage", timeline: "Jet Age", type: "Piston single", class: "General Aviation", programState: "Current program", overview: "The Bonanza is one of general aviation's longest-running nameplates, known for speed, range, and owner-flown utility." },
        { id: "beechcraft-baron", name: "Baron G58", firstFlight: "1969 lineage", timeline: "Jet Age", type: "Twin-engine piston aircraft", class: "General Aviation", programState: "Current program", overview: "The Baron remains a famous piston twin for training, travel, and utility operations." },
        { id: "beechcraft-king-air-260", name: "King Air 260", firstFlight: "2020 generation", timeline: "Next Horizon", type: "Twin turboprop", class: "General Aviation", programState: "Current generation", overview: "The King Air 260 keeps Beechcraft visible in high-end turboprop travel and utility operations." },
        { id: "beechcraft-king-air-360", name: "King Air 360", firstFlight: "2020", timeline: "Digital Age", type: "Twin turboprop", class: "General Aviation", programState: "Current program", overview: "The King Air line remains a benchmark for flexible turboprop missions, from corporate travel to medevac and surveillance." },
        { id: "beechcraft-t6c", name: "T-6C Texan II", firstFlight: "1998", timeline: "Digital Age", type: "Military trainer", class: "Trainer", programState: "Current program", overview: "The T-6C serves as a primary and basic military trainer for air forces that need a modern cockpit training environment." }
      ]
    },
    {
      id: "piper",
      name: "Piper",
      country: "United States",
      founded: "1937",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Personal aircraft"],
      summary: "Piper is a foundational general aviation brand with training aircraft, touring singles, and modern personal transport models.",
      aircraft: [
        { id: "piper-j3", name: "J-3 Cub", firstFlight: "1938", timeline: "Foundational", type: "Classic light aircraft", class: "General Aviation", programState: "Historic icon", overview: "The J-3 Cub became one of aviation's most famous grassroots airplanes and helped define personal flying." },
        { id: "piper-archer-lx", name: "Archer LX", firstFlight: "1960s lineage", timeline: "Jet Age", type: "Training / touring piston single", class: "General Aviation", programState: "Current program", overview: "The Archer remains a favorite at flight schools and clubs for straightforward handling and dependable cross-country capability." },
        { id: "piper-seminole", name: "Seminole", firstFlight: "1978", timeline: "Jet Age", type: "Twin-engine trainer", class: "Trainer", programState: "Current program", overview: "The Seminole is a famous multi-engine training aircraft used by many flight schools around the world." },
        { id: "piper-m350", name: "M350", firstFlight: "Current lineage", timeline: "Digital Age", type: "Pressurized piston single", class: "General Aviation", programState: "Current program", overview: "The M350 keeps the high-performance pressurized personal aircraft concept alive in Piper's lineup." },
        { id: "piper-m600-sls", name: "M600/SLS", firstFlight: "2015", timeline: "Digital Age", type: "Pressurized single-engine turboprop", class: "General Aviation", programState: "Current program", overview: "The M600/SLS brought high-performance personal flying together with advanced automation and safety systems." },
        { id: "piper-m700-fury", name: "M700 Fury", firstFlight: "2024", timeline: "Next Horizon", type: "High-performance personal turboprop", class: "Experimental", programState: "Current direction", overview: "The M700 Fury pushes Piper's personal turboprop concept toward higher speed and a more premium owner-flown mission." }
      ]
    },
    {
      id: "gulfstream",
      name: "Gulfstream",
      country: "United States",
      founded: "1958",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Long-range", "Special mission"],
      summary: "Gulfstream sits at the premium end of business aviation, with long-range cabins and special mission variants derived from corporate platforms.",
      aircraft: [
        { id: "gulfstream-g280", name: "G280", firstFlight: "2009", timeline: "Digital Age", type: "Super-midsize business jet", class: "Business Jet", programState: "Current program", overview: "The G280 balances runway performance, cabin refinement, and transcontinental reach in the super-midsize segment." },
        { id: "gulfstream-g500", name: "G500", firstFlight: "2015", timeline: "Digital Age", type: "Long-range business jet", class: "Business Jet", programState: "Current program", overview: "The G500 helped introduce Gulfstream's newer symmetric flight deck and a fresh large-cabin generation." },
        { id: "gulfstream-g650er", name: "G650ER", firstFlight: "2014 variant", timeline: "Digital Age", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Flagship icon", overview: "The G650ER became one of the defining ultra-long-range business jets of the modern era." },
        { id: "gulfstream-g700", name: "G700", firstFlight: "2020", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current generation", overview: "The G700 expands Gulfstream's top-end offering with a large cabin, advanced flight deck, and long-range mission profile." },
        { id: "gulfstream-g800", name: "G800", firstFlight: "2022", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current generation", overview: "The G800 emphasizes maximum range, giving operators a flagship option aimed at the most demanding intercontinental routes." }
      ]
    },
    {
      id: "atr",
      name: "ATR",
      country: "France / Italy",
      founded: "1981",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "Short-haul", "Commuter"],
      summary: "ATR focuses on fuel-efficient regional turboprops tailored for short sectors, small airports, and airline connectivity.",
      aircraft: [
        { id: "atr-42-600", name: "ATR 42-600", firstFlight: "2010", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "The ATR 42-600 is designed for lower-demand routes, flexible passenger layouts, and strong short-runway utility." },
        { id: "atr-72-600", name: "ATR 72-600", firstFlight: "2009", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "ATR's 72-seat flagship is a workhorse on regional networks where low fuel burn and field performance matter most." },
        { id: "atr-evo", name: "ATR EVO", firstFlight: "2030s", timeline: "Next Horizon", type: "Next-generation regional turboprop", class: "Experimental", programState: "Future direction", overview: "ATR EVO represents the company's future-facing path toward hybridized systems, lower emissions, and updated regional operations." }
      ]
    },
    {
      id: "comac",
      name: "COMAC",
      country: "China",
      founded: "2008",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Regional jet", "Narrowbody"],
      summary: "COMAC is China's flagship airliner manufacturer and a central player in the country's long-term commercial aviation ambitions.",
      aircraft: [
        { id: "comac-c909", name: "C909", firstFlight: "2008", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Current program", overview: "Originally launched as the ARJ21, the C909 serves regional jet routes and built COMAC's early certification and airline experience." },
        { id: "comac-c919", name: "C919", firstFlight: "2017", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The C919 is COMAC's mainline narrowbody program aimed at the single-aisle market long dominated by Airbus and Boeing." },
        { id: "comac-c929", name: "C929", firstFlight: "Future", timeline: "Next Horizon", type: "Widebody airliner", class: "Experimental", programState: "Future direction", overview: "The C929 reflects COMAC's long-range ambition to expand from narrowbodies into intercontinental widebody design." }
      ]
    },
    {
      id: "lockheed-martin",
      name: "Lockheed Martin",
      country: "United States",
      founded: "1995",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Military Transport", "Special mission"],
      summary: "Lockheed Martin builds some of the best-known combat and airlift aircraft in the world, spanning tactical fighters to heavy logistics.",
      aircraft: [
        { id: "lockheed-f16v", name: "F-16V", firstFlight: "1974 lineage", timeline: "Jet Age", type: "Multirole fighter", class: "Fighter", programState: "Current upgrade line", overview: "The F-16 remains one of the most widespread fighters globally, with the V-standard bringing modern sensors and avionics." },
        { id: "lockheed-f22", name: "F-22 Raptor", firstFlight: "1997", timeline: "Digital Age", type: "Stealth air superiority fighter", class: "Fighter", programState: "Modern icon", overview: "The F-22 became a benchmark stealth fighter focused on air dominance, speed, and supercruise." },
        { id: "lockheed-f35a", name: "F-35A Lightning II", firstFlight: "2006", timeline: "Digital Age", type: "Stealth multirole fighter", class: "Fighter", programState: "Current program", overview: "The F-35 centers on sensor fusion, stealth, and shared mission systems across allied air forces." },
        { id: "lockheed-f35b", name: "F-35B Lightning II", firstFlight: "2008", timeline: "Digital Age", type: "STOVL stealth fighter", class: "Fighter", programState: "Current program", overview: "The F-35B adds short takeoff and vertical landing flexibility to the Joint Strike Fighter family." },
        { id: "lockheed-f35c", name: "F-35C Lightning II", firstFlight: "2010", timeline: "Digital Age", type: "Carrier-based stealth fighter", class: "Fighter", programState: "Current program", overview: "The F-35C adapts the family to catapult-launch carrier operations with larger wings and navalized structure." },
        { id: "lockheed-c130j", name: "C-130J Super Hercules", firstFlight: "1996", timeline: "Digital Age", type: "Tactical airlifter", class: "Military Transport", programState: "Current program", overview: "The C-130J modernizes a classic airlift platform with updated avionics, engines, and broad special mission adaptability." }
      ]
    },
    {
      id: "northrop-grumman",
      name: "Northrop Grumman",
      country: "United States",
      founded: "1994",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Stealth bomber", "ISR", "Carrier support"],
      summary: "Northrop Grumman is heavily associated with stealth design, airborne surveillance, and large high-end defense systems.",
      aircraft: [
        { id: "northrop-b2", name: "B-2 Spirit", firstFlight: "1989", timeline: "Jet Age", type: "Stealth bomber", class: "Military Transport", programState: "Strategic icon", overview: "The B-2 became one of the most visually distinctive aircraft ever built and a symbol of stealth bomber design." },
        { id: "northrop-b21", name: "B-21 Raider", firstFlight: "2020s", timeline: "Next Horizon", type: "Stealth bomber", class: "Experimental", programState: "Current generation", overview: "The B-21 represents the United States' next major stealth bomber, focused on long-range penetration and future adaptability." },
        { id: "northrop-e2d", name: "E-2D Advanced Hawkeye", firstFlight: "2007", timeline: "Digital Age", type: "Carrier-based airborne early warning aircraft", class: "ISR", programState: "Current program", overview: "The E-2D provides fleet-level radar coverage, battle management, and persistent airborne sensing for naval operations." },
        { id: "northrop-mq4c", name: "MQ-4C Triton", firstFlight: "2013", timeline: "Digital Age", type: "High-altitude surveillance aircraft", class: "ISR", programState: "Current program", overview: "The MQ-4C extends long-endurance maritime surveillance with broad-area sensors and high-altitude persistence." }
      ]
    },
    {
      id: "dassault",
      name: "Dassault Aviation",
      country: "France",
      founded: "1929",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Business Jet", "Special mission"],
      summary: "Dassault pairs combat-aircraft heritage with a high-end Falcon business-jet family, making it unusually balanced across civil and military sectors.",
      aircraft: [
        { id: "dassault-mirage2000", name: "Mirage 2000", firstFlight: "1978", timeline: "Jet Age", type: "Multirole fighter", class: "Fighter", programState: "Classic fighter line", overview: "The Mirage 2000 became one of Dassault's most recognizable export fighters and a signature delta-wing aircraft." },
        { id: "dassault-rafale-f4", name: "Rafale F4", firstFlight: "1986 lineage", timeline: "Digital Age", type: "Omnirole fighter", class: "Fighter", programState: "Current program", overview: "The Rafale blends air-to-air, strike, and naval capability with continual sensor and software modernization." },
        { id: "dassault-falcon-8x", name: "Falcon 8X", firstFlight: "2015", timeline: "Digital Age", type: "Long-range business jet", class: "Business Jet", programState: "Current program", overview: "The Falcon 8X combines intercontinental reach with tri-jet flexibility and an efficient premium cabin layout." },
        { id: "dassault-falcon-10x", name: "Falcon 10X", firstFlight: "Next generation", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Advanced development", overview: "The Falcon 10X is intended to move Dassault further into the flagship business-jet segment with a very large cabin." }
      ]
    },
    {
      id: "saab",
      name: "Saab",
      country: "Sweden",
      founded: "1937",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "ISR", "Special mission"],
      summary: "Saab is best known for agile fighters and adaptable special mission aircraft tailored for efficient national defense and export markets.",
      aircraft: [
        { id: "saab-gripen-e", name: "Gripen E", firstFlight: "2017", timeline: "Digital Age", type: "Multirole fighter", class: "Fighter", programState: "Current program", overview: "Gripen E emphasizes sensor integration, dispersed operations, and cost-conscious multirole capability." },
        { id: "saab-globaleye", name: "GlobalEye", firstFlight: "2018", timeline: "Digital Age", type: "Airborne early warning and surveillance aircraft", class: "ISR", programState: "Current program", overview: "GlobalEye turns a business-jet platform into a long-endurance multi-domain surveillance node." },
        { id: "saab-340-aew", name: "Saab 340 AEW&C", firstFlight: "1983 lineage", timeline: "Jet Age", type: "Regional surveillance aircraft", class: "ISR", programState: "Current mission family", overview: "The Saab 340 has served both airline and surveillance roles, showing the company's talent for adaptable platforms." }
      ]
    },
    {
      id: "sukhoi",
      name: "Sukhoi",
      country: "Russia",
      founded: "1939",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Air superiority", "Stealth"],
      summary: "Sukhoi is associated with powerful high-performance fighters that have been central to Russian tactical aviation and exports.",
      aircraft: [
        { id: "sukhoi-superjet100", name: "Superjet 100", firstFlight: "2008", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Civil program", overview: "The Superjet 100 gave Sukhoi a civilian regional-jet presence beyond its fighter legacy." },
        { id: "sukhoi-su27", name: "Su-27", firstFlight: "1977", timeline: "Jet Age", type: "Air superiority fighter", class: "Fighter", programState: "Historic icon", overview: "The Su-27 established the Flanker family and became one of the most famous Soviet fighter designs." },
        { id: "sukhoi-su30sm2", name: "Su-30SM2", firstFlight: "1990s lineage", timeline: "Digital Age", type: "Multirole fighter", class: "Fighter", programState: "Current program", overview: "The Su-30SM2 continues the versatile Flanker family with long range, payload, and two-seat mission flexibility." },
        { id: "sukhoi-su35s", name: "Su-35S", firstFlight: "2008", timeline: "Digital Age", type: "Air superiority fighter", class: "Fighter", programState: "Current program", overview: "The Su-35S refines the Flanker line with advanced maneuverability, sensor upgrades, and strong range performance." },
        { id: "sukhoi-su57", name: "Su-57", firstFlight: "2010", timeline: "Next Horizon", type: "Stealth fighter", class: "Fighter", programState: "Current generation", overview: "The Su-57 represents Sukhoi's move into lower-observable fighter design and next-generation mission systems." }
      ]
    },
    {
      id: "antonov",
      name: "Antonov",
      country: "Ukraine",
      founded: "1946",
      status: "Active / disrupted",
      category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Heavy lift", "Regional transport"],
      summary: "Antonov became legendary for outsized cargo airlifters and practical transport aircraft able to operate in difficult conditions.",
      aircraft: [
        { id: "antonov-an124", name: "An-124 Ruslan", firstFlight: "1982", timeline: "Jet Age", type: "Strategic heavy transport", class: "Military Transport", programState: "Legacy icon", overview: "The An-124 is one of the largest cargo aircraft ever built and a symbol of Antonov's heavy-lift design philosophy." },
        { id: "antonov-an148", name: "An-148", firstFlight: "2004", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Regional program", overview: "The An-148 served short and medium routes with a design aimed at flexible infrastructure and harsh-weather operation." },
        { id: "antonov-an225", name: "An-225 Mriya", firstFlight: "1988", timeline: "Jet Age", type: "Ultra-heavy cargo aircraft", class: "Military Transport", programState: "Historic icon", overview: "The An-225 became one of aviation's most iconic aircraft thanks to its unmatched size and oversize cargo role." }
      ]
    },
    {
      id: "mcdonnell-douglas",
      name: "McDonnell Douglas",
      country: "United States",
      founded: "1967",
      status: "Historic",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Trijet", "Military aircraft"],
      summary: "McDonnell Douglas produced some of the most famous late-20th-century airliners and military jets before merging into Boeing.",
      aircraft: [
        { id: "mdd-dc10", name: "DC-10", firstFlight: "1970", timeline: "Jet Age", type: "Widebody trijet airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The DC-10 became one of the signature trijets of long-haul travel and cargo flying." },
        { id: "mdd-md11", name: "MD-11", firstFlight: "1990", timeline: "Digital Age", type: "Widebody trijet airliner and freighter", class: "Commercial Jet", programState: "Cargo icon", overview: "The MD-11 found a second life in cargo networks and remains a memorable final major trijet." },
        { id: "mdd-md80", name: "MD-80", firstFlight: "1979", timeline: "Jet Age", type: "Rear-engined narrowbody airliner", class: "Commercial Jet", programState: "Historic airline staple", overview: "The MD-80 family was a short-haul workhorse and a familiar sound and shape at airports for decades." },
        { id: "mdd-md95", name: "MD-95 / Boeing 717", firstFlight: "1998", timeline: "Digital Age", type: "Short-haul narrowbody airliner", class: "Commercial Jet", programState: "Transition aircraft", overview: "The MD-95 evolved into the Boeing 717 and bridged McDonnell Douglas history into the Boeing era." }
      ]
    },
    {
      id: "dehavilland-canada",
      name: "De Havilland Canada",
      country: "Canada",
      founded: "1928",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "STOL utility", "Firefighting"],
      summary: "De Havilland Canada is famous for rugged utility aircraft and regional turboprops designed for demanding environments.",
      aircraft: [
        { id: "dhc-twin-otter", name: "DHC-6 Twin Otter", firstFlight: "1965", timeline: "Jet Age", type: "STOL utility aircraft", class: "General Aviation", programState: "Current program", overview: "The Twin Otter is valued for short takeoff performance, remote operations, and dependable service on land, skis, or floats." },
        { id: "dhc-dash-8-400", name: "Dash 8-400", firstFlight: "1998", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "The Dash 8-400 pairs turboprop efficiency with higher speed, making it a versatile regional platform." },
        { id: "dhc-515", name: "DHC-515 Firefighter", firstFlight: "Future", timeline: "Next Horizon", type: "Amphibious aerial firefighter", class: "Experimental", programState: "Future direction", overview: "The DHC-515 aims to modernize the aerial scooper role for wildfire response and public-service aviation." }
      ]
    }
  ];

  function mergeSpecs(baseSpecs, overrideSpecs, powerplantSpecs) {
    const merged = {};
    ["dimensions", "powerplant", "performance", "weights", "capacity"].forEach((group) => {
      const value =
        group === "powerplant"
          ? powerplantSpecs
          : {
              ...(baseSpecs[group] || {}),
              ...((overrideSpecs && overrideSpecs[group]) || {})
            };

      if (value && Object.keys(value).length > 0) {
        merged[group] = value;
      }
    });
    return merged;
  }

  function buildPowerplantSummary(aircraft) {
    const engine = engineProfiles[aircraft.id];
    if (!engine) {
      return {
        Engines: "Program dependent",
        "Engine manufacturer": "Program dependent",
        "Engine model": "Program dependent",
        "Engine type": "Program dependent"
      };
    }
    return engine;
  }

  function buildFallbackDetail(aircraft, manufacturer) {
    const engine = buildPowerplantSummary(aircraft);
    const classProfile = technicalProfilesByClass[aircraft.class] || technicalProfilesByClass.Experimental;
    const specOverride = specOverrides[aircraft.id] || {};
    const powerplantLine = `${engine["Engine manufacturer"]} ${engine["Engine model"]} (${engine["Engine type"]})`;
    const extraNote = detailNotes[aircraft.id] ? ` ${detailNotes[aircraft.id]}` : "";

    return {
      overview: `${aircraft.overview} The ${aircraft.name} is a ${aircraft.type.toLowerCase()} developed by ${manufacturer.name} and placed in the ${aircraft.class.toLowerCase()} category of the wiki. It first flew in ${aircraft.firstFlight} and is grouped in the ${aircraft.timeline.toLowerCase()} because it fits into ${timelineDescriptions[aircraft.timeline]}.${extraNote}`,
      design: `From a technical point of view, ${aircraft.name} is powered by ${powerplantLine}. That powerplant choice supports ${classDesignFocus[aircraft.class] || "its intended mission profile"}. In manufacturer terms, the program also reflects ${manufacturer.name}'s wider focus on ${manufacturer.aircraftFocus.join(", ")} and shows how the company approached this part of the market or mission set.`,
      service: `${aircraft.name} is listed here as a ${aircraft.programState.toLowerCase()}. In operational terms, aircraft in this category are normally associated with ${classServiceFocus[aircraft.class] || "specialized aviation work"}. Within ${manufacturer.name}'s catalog, it stands out as a ${aircraft.type.toLowerCase()} that helps explain the manufacturer's role inside ${manufacturer.category.toLowerCase()}.`,
      specs: mergeSpecs(classProfile, specOverride, buildPowerplantSummary(aircraft)),
      facts: [
        `Manufacturer: ${manufacturer.name}`,
        `Country or region: ${manufacturer.country}`,
        `First flight: ${aircraft.firstFlight}`,
        `Aircraft class: ${aircraft.class}`,
        `Program state: ${aircraft.programState}`,
        `Engine manufacturer: ${engine["Engine manufacturer"]}`,
        `Engine model: ${engine["Engine model"]}`
      ],
      variants: defaultVariantNotesByClass[aircraft.class] || ["Variant coverage can be expanded as the wiki grows."],
      notableOperators: defaultOperatorNotesByClass[aircraft.class] || ["Operator examples can be added program-by-program."]
    };
  }

  const manufacturers = rawManufacturers.map((manufacturer) => ({
    ...manufacturer,
    aircraft: manufacturer.aircraft.map((aircraft) => ({
      ...aircraft,
      detail: buildFallbackDetail(aircraft, manufacturer)
    }))
  }));

  const historyMilestones = [
    { id: "montgolfier-balloon", year: "1783", era: "Lighter-Than-Air Dawn", visual: "balloon", title: "Montgolfier Balloon Flight", summary: "Human aviation begins with the first crewed hot-air balloon ascents over France.", highlight: "The dream of flight becomes visible for the first time." },
    { id: "cayley-glider", year: "1799", era: "Lift And Control Theory", visual: "glider", title: "Cayley Sketches The Modern Airplane Layout", summary: "Sir George Cayley separates lift, propulsion, and control into a recognizable fixed-wing concept.", highlight: "The airplane starts becoming an engineering idea instead of a fantasy." },
    { id: "wright-flyer", year: "1903", era: "Powered Flight", visual: "biplane", title: "Wright Flyer Takes Off", summary: "The Wright brothers combine propulsion and control into the first sustained powered flight.", highlight: "Flight becomes steerable, not just possible." },
    { id: "bleriot-channel", year: "1909", era: "Pioneer Breakthrough", visual: "monoplane", title: "Bleriot Crosses The English Channel", summary: "Louis Bleriot proves aircraft can cover meaningful water crossings and public imagination races ahead.", highlight: "Aircraft begin to look like tools for real travel and prestige." },
    { id: "scheduled-airline", year: "1914", era: "Commercial Routes Begin", visual: "airliner", title: "Scheduled Passenger Airline Service Starts", summary: "The St. Petersburg-Tampa route shows that aircraft can be used for repeatable public transport, even if the industry is still young.", highlight: "Aviation starts moving from demonstration to service." },
    { id: "alcock-brown", year: "1919", era: "Long-Range Ambition", visual: "monoplane", title: "First Nonstop Atlantic Crossing", summary: "Alcock and Brown complete the first nonstop transatlantic flight, expanding the idea of global range.", highlight: "Air routes begin stretching beyond local and regional imagination." },
    { id: "dc3-service", year: "1935", era: "Airline Reliability", visual: "airliner", title: "Douglas DC-3 Changes Airline Economics", summary: "The DC-3 helps make passenger air travel commercially dependable with better speed, comfort, and operating logic.", highlight: "The airline business model starts becoming sustainable." },
    { id: "heinkel-he178", year: "1939", era: "Jet Era Begins", visual: "jet", title: "First Turbojet Aircraft Flies", summary: "The Heinkel He 178 opens a new performance envelope and points aviation toward jet propulsion.", highlight: "A new speed and altitude ceiling appears." },
    { id: "bell-x1", year: "1947", era: "Supersonic Research", visual: "jet", title: "Bell X-1 Breaks The Sound Barrier", summary: "Rocket-powered research proves controlled supersonic flight is achievable and measurable.", highlight: "The boundaries of aerodynamic design move again." },
    { id: "comet-service", year: "1952", era: "Jetliners For The Public", visual: "airliner", title: "The Jet Airliner Arrives", summary: "Commercial aviation begins compressing global travel times at scale as jetliners enter passenger service.", highlight: "Distance starts to feel smaller." },
    { id: "widebody-era", year: "1969", era: "Mass Long-Haul Travel", visual: "airliner", title: "Widebody Airliners Redefine Capacity", summary: "Large long-haul aircraft change airport planning, airline networks, and the scale of international travel.", highlight: "Aviation becomes truly mass global infrastructure." },
    { id: "airbus-a320", year: "1987", era: "Digital Flight Decks", visual: "digital", title: "Fly-By-Wire Moves Into Mainstream Airliners", summary: "The Airbus A320 family pushes digital flight-control thinking into everyday airline operations.", highlight: "Software becomes part of how large aircraft feel and fly." },
    { id: "composite-era", year: "2009", era: "Composite Efficiency", visual: "digital", title: "Composite-Led Long-Haul Aircraft Mature", summary: "Programs like the 787 and A350 era emphasize lighter structures, new cabins, and fuel-burn improvement.", highlight: "Materials science becomes a frontline part of performance." },
    { id: "sustainable-transition", year: "2020s", era: "Sustainable Transition", visual: "future", title: "Hydrogen, SAF, Electric, And New Layouts", summary: "The industry turns toward emissions reduction, lower-energy operations, and new airframe concepts.", highlight: "Future aviation is also an energy and infrastructure story." }
  ];

  const futureSignals = [
    { title: "Hydrogen Airframes", tag: "Energy Shift", summary: "Expect more work around cryogenic storage, redesigned fuselages, and new airport support systems." },
    { title: "Blended Wing Bodies", tag: "Layout Rethink", summary: "Wide lifting bodies could improve efficiency, but they challenge cabin layout and airport compatibility." },
    { title: "Autonomous Assistance", tag: "Software Layer", summary: "Flight decks will likely gain more predictive assistance before full autonomy becomes realistic." },
    { title: "Regional Electrification", tag: "Short-Haul Labs", summary: "Training and short-hop aircraft are likely to be early proving grounds for electric propulsion." },
    { title: "Sustainable Aviation Fuel Scaling", tag: "Fleet Bridge", summary: "SAF is likely to remain one of the fastest ways to lower emissions while waiting for larger airframe changes." },
    { title: "Smarter Manufacturing", tag: "Production Flow", summary: "Digital twins, automation, and cleaner factories may become as important as the aircraft themselves." }
  ];

  const allAircraft = manufacturers.flatMap((manufacturer) =>
    manufacturer.aircraft.map((aircraft) => ({
      ...aircraft,
      manufacturerId: manufacturer.id,
      manufacturerName: manufacturer.name,
      manufacturerCategory: manufacturer.category,
      manufacturerCountry: manufacturer.country
    }))
  );

  function getManufacturerById(id) {
    return manufacturers.find((manufacturer) => manufacturer.id === id) || null;
  }

  function getAircraftById(id) {
    return allAircraft.find((aircraft) => aircraft.id === id) || null;
  }

  function getUniqueCategories() {
    return [...new Set(manufacturers.map((manufacturer) => manufacturer.category))];
  }

  function getUniqueAircraftClasses() {
    return [...new Set(allAircraft.map((aircraft) => aircraft.class))];
  }

  function groupAircraftByTimeline(aircraftList) {
    return timelineOrder
      .map((timeline) => ({
        timeline,
        description: timelineDescriptions[timeline],
        aircraft: aircraftList.filter((aircraft) => aircraft.timeline === timeline)
      }))
      .filter((group) => group.aircraft.length > 0);
  }

  return {
    manufacturers,
    historyMilestones,
    futureSignals,
    allAircraft,
    timelineOrder,
    timelineDescriptions,
    categoryDescriptions,
    classDescriptions,
    getManufacturerById,
    getAircraftById,
    getUniqueCategories,
    getUniqueAircraftClasses,
    groupAircraftByTimeline
  };
})();
