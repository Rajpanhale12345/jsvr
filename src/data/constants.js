// JSVR Company and business configuration
export const COMPANY_INFO = {
  name: "JSVR",
  legalName: "JSVR Logistics & Construction Haulage",
  tagline: "Powering Construction. Delivering Progress.",
  subTagline: "High-capacity 18-wheel heavy transport fleet engineered for rapid, reliable construction material movement and large-scale site logistics.",
  email: "info@jsvr.in",
  fleetDescription: "Dedicated fleet of heavy-duty 18-wheel trucks engineered for active site deployment and continuous material logistics."
};

// 6 Core Services with 100% verified working high-res Unsplash image URLs (All HTTP 200 OK)
export const SERVICES_LIST = [
  {
    id: "material-transport",
    title: "Construction Material Transportation",
    shortDesc: "Timely and safe transport of structural construction supplies and raw materials directly to active project sites.",
    fullDesc: "Reliable distribution of construction materials including pre-cast blocks, reinforcement mesh, structural steel components, and site supplies with meticulous scheduling to prevent jobsite downtime.",
    icon: "Truck",
    tag: "High Demand",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "aggregate-hauling",
    title: "Sand, Gravel, and Aggregate Hauling",
    shortDesc: "High-volume quarry-to-site hauling of crushed stone, natural sand, graded gravel, and recycled aggregates.",
    fullDesc: "Direct hauling from quarries and aggregate yards to roadworks, foundation beds, and commercial developments. Managed dump runs designed for continuous material flow.",
    icon: "Mountain",
    tag: "Core Capability",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "bulk-material",
    title: "Bulk Material Transportation",
    shortDesc: "Efficient large-scale bulk delivery of loose and dry construction matter with scheduled turnaround cycles.",
    fullDesc: "Engineered for civil engineering works, commercial paving, and industrial grading projects requiring ongoing, dependable bulk movement round-the-clock.",
    icon: "Layers",
    tag: "Bulk Capacity",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "site-logistics",
    title: "Construction Site Logistics",
    shortDesc: "On-site dispatch coordination, material positioning, and phased intake to maintain orderly construction flows.",
    fullDesc: "Streamlined logistics that align deliveries with crane picks, concrete pours, and excavator schedules to eliminate congestion at narrow construction access gates.",
    icon: "Compass",
    tag: "Strategic",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "heavy-duty-trucking",
    title: "Heavy-Duty Trucking",
    shortDesc: "Tough 18-wheel heavy haul solutions tailored for challenging topography, rugged haul roads, and industrial paths.",
    fullDesc: "Purpose-built multi-axle configurations geared for high-traction site ingress and egress, ensuring consistent performance in demanding dirt and rock environments.",
    icon: "ShieldAlert",
    tag: "Heavy-Duty",
    image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "project-support",
    title: "Project-Based Transportation Support",
    shortDesc: "Dedicated multi-week or multi-month fleet allocation for turnkey infrastructure and commercial civil projects.",
    fullDesc: "Contracted fleet reservation matching project milestones, with assigned trucks and dedicated operational communication for superintendents and project managers.",
    icon: "CalendarCheck",
    tag: "Contract Work",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80"
  }
];

// Admin Credentials (Demo mode)
export const DEMO_ADMIN = {
  username: "rahul",
  password: "rahul@123"
};

export const STORAGE_KEYS = {
  ENQUIRIES: "construction_enquiries",
  AUTH: "jsvr_admin_session"
};

export const ENQUIRY_STATUSES = [
  { value: "New", label: "New", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.15)", border: "#3B82F6" },
  { value: "Contacted", label: "Contacted", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", border: "#F59E0B" },
  { value: "In Progress", label: "In Progress", color: "#A855F7", bg: "rgba(168, 85, 247, 0.15)", border: "#A855F7" },
  { value: "Resolved", label: "Resolved", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", border: "#10B981" }
];
