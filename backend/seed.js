import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.json');

export const initialData = {
  products: [
    {
      id: "bed",
      name: "The Bed Blueprint",
      tag: "BLUEPRINT 01",
      basePrice: 1200,
      description: "Modular birch platform bed.",
      detailedDescription: "Constructed from solid, sustainably sourced timber. The frame utilizes traditional finger joinery for structural integrity that requires zero hardware for assembly. The result is a monolithic form that anchors the bedroom.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALflyJqzJUrELr_xzUkaxsfB-rtwaGQLoahW1UFJtue-gP6nzqvo5AdLuAaTtAJhGEo9J3rm04G_povoxJm2vIC8Ghas6svkSVNNo3x80t9TuhU7Qz8v1_s1O8pjC1SJGvc7vHLFuqGVCl2Abh5jPji5RJZw2IbTL_fvXz4PKAo_BHHWQ_IlZEa6dU9vK4UJSurggmDRiXLmHLoWPYFMUFEXVjcCndHc6WTa5nb3qz_XhDiQZqh59JjndP_oZmHuStekFs-1ofVRs",
      specImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJDrD2HafNiNmsFXtDCYwh5cvZ5Fne0C33J8xzUArbyC5hT7sn_Ee4xhI2IrJbxA3W-IbVjUwZtd3euDnOQJNIoXrkjrE-YgDO4kCTSa9NRehYqwR3w5nxIaZYQ5huDqG11YahwM1s2uiiMDnG5NJk_S0LyGHtusNiHIf_Z0S7HmMcEVnb1odUCzQ3cAu-5qOYF20evwXDAlC9VdoIHAzrT2QC8KfL7vYUarOILl4vptAU6EbI7ITPl4kHfVc4SEtFqkJyJ7t1x-g",
      detailImages: [
        { src: "/assets/bed_detail_joinery.png", label: "DETAIL A: FINGER JOINERY" },
        { src: "/assets/bed_nightstand_set.png", label: "DETAIL B: FLOATING NIGHTSTAND" },
        { src: "/assets/material_oak.png", label: "MAT: OAK" },
        { src: "/assets/material_birch.png", label: "MAT: BIRCH" }
      ],
      options: {
        sizes: [
          { id: "full", name: "Full", priceModifier: -150 },
          { id: "queen", name: "Queen", priceModifier: 0 },
          { id: "king", name: "King", priceModifier: 250 }
        ],
        materials: [
          { id: "birch", name: "Natural Birch", color: "#e6d5b8", priceModifier: 0 },
          { id: "oak", name: "Light Oak", color: "#d4c1a5", priceModifier: 150 }
        ]
      },
      addons: [
        { id: "headboard", name: "Integrated Headboard", price: 400 },
        { id: "nightstands", name: "Floating Nightstands (Set of 2)", price: 350 }
      ],
      specs: {
        materials: [
          "Solid Birch or Oak hardwood",
          "Non-toxic, VOC-free finish",
          "Birch plywood slatted base"
        ],
        dimensions: [
          "W: 64\" / L: 84\" / H: 12\" (Platform)",
          "Headboard H: 36\" (Optional)",
          "Clearance: 8\""
        ],
        performance: [
          "Weight Capacity: 800 lbs",
          "Hardware-free assembly",
          "Lifetime structural warranty"
        ]
      }
    },
    {
      id: "seating",
      name: "The Seating Blueprint",
      tag: "BLUEPRINT 02",
      basePrice: 2800,
      description: "Configurable charcoal modular sofa.",
      detailedDescription: "Designed for endless adaptability. The Seating Blueprint is a modular sofa system with a solid hardwood core and high-resiliency foam cushions wrapped in premium felt wool. Rearrange the layout as your living space evolves.",
      image: "/assets/seating_main.png",
      specImage: "/assets/seating_technical_diagram.png",
      detailImages: [
        { src: "/assets/seating_detail_backseat.png", label: "Wool Cover" },
        { src: "/assets/seating_detail_leg.png", label: "Hardwood Legs" },
        { src: "/assets/seating_detail_ottoman.png", label: "Quality" },
        { src: "/assets/seating_detail_quality_comfort.png", label: "Ottoman" }
      ],
      options: {
        sizes: [
          { id: "2seater", name: "2-Seater", priceModifier: -400 },
          { id: "3seater", name: "3-Seater", priceModifier: 0 },
          { id: "sectional", name: "Sectional", priceModifier: 800 }
        ],
        materials: [
          { id: "cream", name: "Cream Wool", color: "#f6ead4", priceModifier: 0 },
          { id: "cloud", name: "Cloud Felt", color: "#d8d8d8", priceModifier: 150 }
        ]
      },
      addons: [
        { id: "ottoman", name: "Matching Ottoman", price: 450 },
        { id: "pillows", name: "Premium Pillows (Set of 3)", price: 150 }
      ],
      specs: {
        materials: [
          "Premium Wool Blend upholstery",
          "Solid Oak support frame",
          "High-resiliency pocket spring core"
        ],
        dimensions: [
          "W: 96\" / D: 38\" / H: 30\" (3-Seater)",
          "Seat Height: 16\"",
          "Armless modules configurable"
        ],
        performance: [
          "Weight Capacity: 1000 lbs",
          "Tool-free connector system",
          "10-year cushion warranty"
        ]
      }
    },
    {
      id: "storage",
      name: "The Storage Blueprint",
      tag: "BLUEPRINT 03",
      basePrice: 850,
      description: "Steel and oak minimalist shelving.",
      detailedDescription: "A heavy-duty, grid-based storage system designed for architectural spaces. The powder-coated steel frame supports solid hardwood shelves that can be positioned at 3-inch increments, presenting a perfect marriage of industrial function and wood warmth.",
      image: "/assets/storage_main.png",
      specImage: "/assets/storage_technical_diagram.png",
      detailImages: [
        { src: "/assets/storage_detail_metal_grid.png", label: "Metal Grid" },
        { src: "/assets/storage_detail_metal_structure.png", label: "Steel Frame" },
        { src: "/assets/storage_detail_metal_structure_with_wood_shelf.png", label: "Shelf" },
        { src: "/assets/storage_detail_wood_storage.png", label: " Module" }
      ],
      options: {
        sizes: [
          { id: "2shelf", name: "5 x 2", priceModifier: -150 },
          { id: "5shelf", name: "5 x 5", priceModifier: 0 },
          { id: "double", name: "Double", priceModifier: 400 }
        ],
        materials: [
          { id: "oak_black", name: "Light Oak", color: "#8b7e74", priceModifier: 0 },
          { id: "birch_white", name: "Birch", color: "#e6d5b8", priceModifier: 50 }
        ]
      },
      addons: [
        { id: "drawers", name: "Soft-Close Drawer Module", price: 250 },
        { id: "led", name: "Integrated LED Light Bars", price: 180 }
      ],
      specs: {
        materials: [
          "12-gauge laser-cut structural steel",
          "Solid Oak or Birch shelves",
          "Hard-wearing powder coat finish"
        ],
        dimensions: [
          "W: 36\" / D: 14\" / H: 72\" (5-Shelf)",
          "Shelf thickness: 1\"",
          "Adjustable feet leveling"
        ],
        performance: [
          "Weight Capacity: 200 lbs per shelf",
          "Wall anchoring hardware included",
          "Lifetime steel warranty"
        ]
      }
    },
    {
      id: "table",
      name: "The Table Blueprint",
      tag: "BLUEPRINT 04",
      basePrice: 1600,
      description: "Solid oak dining table and bench set.",
      detailedDescription: "Constructed from solid, sustainably sourced timber. The dining table utilizes traditional finger joinery for structural integrity that requires zero hardware for assembly. The result is a monolithic form that anchors the dining space.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8mhHH5p5sLtPOPw2XXWEWyLIYdaBsvKfwgDHDJXxklf9PVRnOGIMaNyxG9NFYLKVKlGmQ-_4Cqo3rFrg2y6UmexQsKVN57OaDvZc6lsJ1l41fVru6hI4KLB-d6bigUwL0MzD6XsC3xmsRTDDXDwDKn4CsabVHf3-yc04L1cMTcAkhCyZCOTbO1TN-z6W2oDpjOm--6V9SZIcltokEDgS3pyfvMSlnblHrWnCzQSamFecjwZ1J2aAn2TjkiwD7A_L_AoaqEs3-7V8",
      specImage: "/assets/table_technical_diagram.png",
      detailImages: [
        { src: "/assets/table_detail_joinery.png", label: "DETAIL A: FINGER JOINERY" },
        { src: "/assets/table_bench_set.png", label: "DETAIL B: MATCHING BENCH SET" },
        { src: "/assets/material_oak.png", label: "MAT: OAK" },
        { src: "/assets/material_birch.png", label: "MAT: BIRCH" }
      ],
      options: {
        sizes: [
          { id: "6seater", name: "6-Seater", priceModifier: -200 },
          { id: "8seater", name: "8-Seater", priceModifier: 0 }
        ],
        materials: [
          { id: "birch", name: "Natural Birch", color: "#e6d5b8", priceModifier: -100 },
          { id: "oak", name: "Light Oak", color: "#d4c1a5", priceModifier: 0 }
        ]
      },
      addons: [
        { id: "bench_set", name: "Matching Bench (Set of 2)", price: 600 },
        { id: "bench_single", name: "Matching Bench (Single)", price: 350 }
      ],
      specs: {
        materials: [
          "Solid Birch or Oak hardwood",
          "Non-toxic, VOC-free finish",
          "Precision machined joinery"
        ],
        dimensions: [
          "W: 36\" / L: 84\" / H: 30\" (8-Seater)",
          "Matching benches available",
          "Seating: 8 comfortably"
        ],
        performance: [
          "Weight Capacity: 500 lbs",
          "Hardware-free assembly",
          "Lifetime structural warranty"
        ]
      }
    }
  ],
  orders: []
};

export function seedDb(targetPath = dbPath) {
  fs.writeFileSync(targetPath, JSON.stringify(initialData, null, 2), 'utf-8');
  console.log('Database seeded successfully at:', targetPath);
}

if (process.argv[1] && (process.argv[1] === __filename || process.argv[1].endsWith('seed.js'))) {
  seedDb();
}

