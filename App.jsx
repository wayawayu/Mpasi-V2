import React, { useState, useEffect, useMemo } from "react";
import {
  Home, NotebookPen, Soup, LineChart as LineIcon, Moon,
  Plus, Trash2, CalendarPlus, Baby, Heart, Syringe,
  Sparkles, ChevronRight, X, Check, Clock, Sun, Sunset, Cookie, Milk
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ComposedChart, Area
} from "recharts";

/* ─────────────────────────  THEME  ───────────────────────── */
const C = {
  cream:   "#FBF6EF",
  cream2:  "#F4EADD",
  rose:    "#E08AA0",
  roseDk:  "#C76483",
  roseSoft:"#F8DEE6",
  sage:    "#9DB395",
  sageDk:  "#6E8A66",
  sageSoft:"#E4EEDF",
  peach:   "#EFB088",
  peachSoft:"#FBE3D2",
  plum:    "#4A3340",
  plum2:   "#6E5260",
  lilac:   "#C9B6D8",
  lilacSoft:"#EEE4F4",
  white:   "#FFFFFF",
  line:    "#EBDFD0",
};

const STAGES = {
  "6-8 Bulan":   { emoji: "🥣", texture: "Puree / Bubur Halus",            color: C.rose,  soft: C.roseSoft },
  "9-11 Bulan":  { emoji: "🍽️", texture: "Cincang Halus / Finger Food",   color: C.sageDk, soft: C.sageSoft },
  "12 Bulan":    { emoji: "🍴", texture: "Makanan Keluarga Lembut",        color: C.peach, soft: C.peachSoft },
};

const QUOTES = [
  "Setiap suap adalah cinta yang tumbuh bersama si kecil 💕",
  "Kamu sedang melakukan pekerjaan terbaik di dunia, Bunda 🌟",
  "Pelan-pelan saja, tidak ada Bunda yang sempurna — yang ada Bunda yang penuh cinta 🌷",
  "Tumbuh kembang si kecil dimulai dari piring kecilnya hari ini 🥄",
  "Bunda hebat! Satu hari, satu suap, satu pelukan 🤍",
];

/* ─────────────────────────  RECIPES  ───────────────────────── */
const RECIPES = [
  { stage:"6-8 Bulan", name:"Bubur Beras Ayam Wortel", bahan:"Beras, dada ayam, wortel, kaldu", cara:"Masak beras+air jadi bubur kental. Suwir ayam, kukus wortel, blender halus.", porsi:"2-3 sdm", nutrisi:"Karbohidrat, Protein, Vit A", waktu:"Pagi" },
  { stage:"6-8 Bulan", name:"Puree Labu Kuning Tempe", bahan:"Labu kuning, tempe, ASI/sufor", cara:"Kukus labu & tempe sampai lunak, blender dengan sedikit ASI.", porsi:"2-3 sdm", nutrisi:"Protein nabati, Zinc", waktu:"Siang" },
  { stage:"6-8 Bulan", name:"Puree Ubi Jalar Telur", bahan:"Ubi jalar, telur, ASI", cara:"Kukus ubi, rebus telur, blender hingga halus.", porsi:"2-3 sdm", nutrisi:"Karbohidrat, Kolin", waktu:"Pagi" },
  { stage:"6-8 Bulan", name:"Bubur Ikan Kakap Bayam", bahan:"Ikan kakap, bayam, beras", cara:"Kukus ikan, rebus bayam sebentar, masak bubur, blender semua.", porsi:"2-3 sdm", nutrisi:"Zat besi, Folat, DHA", waktu:"Siang" },
  { stage:"6-8 Bulan", name:"Puree Pisang Alpukat", bahan:"Pisang matang, alpukat", cara:"Haluskan dengan garpu. Tanpa masak, praktis!", porsi:"1-2 sdm", nutrisi:"Kalium, Lemak sehat", waktu:"Snack" },
  { stage:"6-8 Bulan", name:"Bubur Havermut Pisang", bahan:"Oat, ASI/sufor, pisang", cara:"Masak oat dengan air, tambah ASI, haluskan dengan pisang.", porsi:"2-3 sdm", nutrisi:"Serat, Kalsium", waktu:"Pagi" },
  { stage:"6-8 Bulan", name:"Puree Hati Ayam Wortel", bahan:"Hati ayam, wortel, kaldu", cara:"Rebus hati matang, kukus wortel, blender halus.", porsi:"2 sdm", nutrisi:"Zat besi terbaik!", waktu:"Siang" },
  { stage:"6-8 Bulan", name:"Bubur Salmon Brokoli", bahan:"Salmon, brokoli, beras", cara:"Kukus salmon & brokoli, masak bubur, blender halus.", porsi:"2-3 sdm", nutrisi:"Omega-3, Vit C", waktu:"Siang" },
  { stage:"6-8 Bulan", name:"Puree Kentang Bayam Keju", bahan:"Kentang, bayam, keju", cara:"Kukus kentang & bayam, parut keju, blender semua.", porsi:"2-3 sdm", nutrisi:"Kalsium, Folat", waktu:"Malam" },
  { stage:"6-8 Bulan", name:"Bubur Kacang Hijau", bahan:"Kacang hijau, santan encer", cara:"Rebus kacang hijau lunak, tambah santan encer, haluskan.", porsi:"2 sdm", nutrisi:"Folat, Serat", waktu:"Snack" },
  { stage:"9-11 Bulan", name:"Tim Nasi Ayam Sayuran", bahan:"Nasi, ayam cincang, wortel, buncis", cara:"Masak nasi lembek, tumis ayam, kukus sayur, campur cincang kasar.", porsi:"½ mangkok", nutrisi:"Protein, Serat", waktu:"Siang" },
  { stage:"9-11 Bulan", name:"Sup Ikan Tahu Brokoli", bahan:"Ikan, tahu, brokoli, kaldu", cara:"Masak kaldu, masukkan ikan, tahu & brokoli cincang.", porsi:"½ mangkok", nutrisi:"DHA, Kalsium", waktu:"Malam" },
  { stage:"9-11 Bulan", name:"Nasi Daging Sapi Wortel", bahan:"Daging sapi cincang, nasi, wortel", cara:"Masak nasi lembek, tumis daging, kukus wortel, campur.", porsi:"½ mangkok", nutrisi:"Zat besi heme", waktu:"Siang" },
  { stage:"9-11 Bulan", name:"Finger Food Ubi Panggang", bahan:"Ubi jalar, minyak kelapa", cara:"Potong batang, panggang/kukus lunak, sajikan langsung.", porsi:"3-4 batang", nutrisi:"Beta-karoten", waktu:"Snack" },
  { stage:"9-11 Bulan", name:"Pancake Pisang Telur", bahan:"Pisang, telur, tepung", cara:"Haluskan pisang, campur telur & tepung, masak tipis.", porsi:"2 lembar", nutrisi:"Protein, Kalium", waktu:"Pagi" },
  { stage:"9-11 Bulan", name:"Tim Telur Dadar Sayur", bahan:"Telur, bayam, wortel parut", cara:"Kocok telur + sayur, kukus dalam cetakan.", porsi:"1 porsi kecil", nutrisi:"Kolin, Vit A", waktu:"Pagi" },
  { stage:"9-11 Bulan", name:"Bubur Ayam Jamur Jagung", bahan:"Ayam suwir, jamur, jagung, beras", cara:"Masak bubur, tambah ayam suwir, jamur & jagung cincang.", porsi:"½ mangkok", nutrisi:"Vit D, Serat", waktu:"Siang" },
  { stage:"9-11 Bulan", name:"Nasi Tim Ikan Bandeng", bahan:"Ikan bandeng, nasi, tomat", cara:"Kukus ikan tanpa duri, masak nasi lembek dgn tomat & bawang.", porsi:"½ mangkok", nutrisi:"DHA, Zat besi", waktu:"Malam" },
  { stage:"9-11 Bulan", name:"Sup Krim Labu Keju", bahan:"Labu, susu full cream, keju", cara:"Masak labu dgn kaldu, blender kasar, tambah susu & keju.", porsi:"½ mangkok", nutrisi:"Vit A, Kalori", waktu:"Malam" },
  { stage:"9-11 Bulan", name:"Smoothie Mangga Yogurt", bahan:"Mangga, yogurt plain full fat", cara:"Campur mangga & yogurt, blender atau potong kecil.", porsi:"3-4 sdm", nutrisi:"Probiotik, Vit C", waktu:"Snack" },
  { stage:"12 Bulan", name:"Nasi Goreng Sehat Bayi", bahan:"Nasi, telur, wortel, buncis", cara:"Tumis bawang & sayur, tambah nasi & telur. Tanpa garam berlebih.", porsi:"¾ mangkok", nutrisi:"Karbo, Protein", waktu:"Pagi" },
  { stage:"12 Bulan", name:"Soto Ayam Kuning Sayur", bahan:"Ayam, kentang, wortel, kol, kunyit", cara:"Masak kaldu kuning + ayam, masukkan sayur, sajikan dgn nasi.", porsi:"¾ mangkok", nutrisi:"Vit C, Antioksidan", waktu:"Siang" },
  { stage:"12 Bulan", name:"Omelet Sayur Keju", bahan:"Telur, paprika, bayam, keju", cara:"Kocok telur + sayur, masak omelet, lipat dengan keju.", porsi:"½ omelet", nutrisi:"Protein, Kalsium", waktu:"Pagi" },
  { stage:"12 Bulan", name:"Sup Bola Daging Tahu", bahan:"Daging giling, tahu, wortel", cara:"Bentuk bola kecil, rebus dalam kaldu sayuran.", porsi:"¾ mangkok", nutrisi:"Zat besi, Kalsium", waktu:"Malam" },
  { stage:"12 Bulan", name:"Tumis Tempe Bayam", bahan:"Tempe, bayam, bawang, kecap", cara:"Potong tempe kecil, tumis dgn bawang, tambah bayam.", porsi:"¾ mangkok", nutrisi:"Zat besi, Protein nabati", waktu:"Siang" },
  { stage:"12 Bulan", name:"Puding Susu Buah", bahan:"Susu full cream, agar, buah", cara:"Masak agar + susu, dinginkan, sajikan dgn buah potong.", porsi:"1 cetakan", nutrisi:"Kalsium, Vit C", waktu:"Snack" },
  { stage:"12 Bulan", name:"Mie Ayam Sayuran Bayi", bahan:"Mie telur, ayam, sawi, wortel", cara:"Rebus mie, masak ayam + sayur dalam kaldu, potong pendek.", porsi:"¾ mangkok", nutrisi:"Karbo, Serat", waktu:"Siang" },
  { stage:"12 Bulan", name:"Perkedel Kentang Telur", bahan:"Kentang, telur, daging giling", cara:"Haluskan kentang, campur telur & daging, bentuk, kukus.", porsi:"2-3 butir", nutrisi:"Zat besi, Protein", waktu:"Siang" },
  { stage:"12 Bulan", name:"Smoothie Bowl Alpukat Oat", bahan:"Alpukat, oat, pisang, susu", cara:"Blender semua, sajikan dalam mangkok, beri topping buah.", porsi:"½ mangkok", nutrisi:"Lemak sehat, Serat", waktu:"Sarapan" },
  { stage:"12 Bulan", name:"Cake Kukus Pisang Wortel", bahan:"Pisang, wortel, tepung, telur", cara:"Campur semua, kukus 20 menit, sajikan dingin.", porsi:"1 potong", nutrisi:"Vit A, Karbo", waktu:"Snack" },
];

const IMMUN = [
  { age:"0 bln", name:"Hepatitis B (HB-0)", note:"Dalam 12 jam setelah lahir", wajib:true },
  { age:"0-1 bln", name:"BCG + Polio 0", note:"1 kali", wajib:true },
  { age:"2 bln", name:"DTP-HB-HiB 1 + Polio 1 + PCV 1 + Rotavirus 1", note:"Combo 5-in-1", wajib:true },
  { age:"3 bln", name:"DTP-HB-HiB 2 + Polio 2 + PCV 2 + Rotavirus 2", note:"Ulangan", wajib:true },
  { age:"4 bln", name:"DTP-HB-HiB 3 + Polio 3 + PCV 3 + Rotavirus 3", note:"Ulangan", wajib:true },
  { age:"6 bln", name:"Influenza", note:"Tahun pertama 2 dosis", wajib:false },
  { age:"9 bln", name:"Campak", note:"Dosis pertama", wajib:true },
  { age:"12 bln", name:"MMR", note:"Campak, Gondongan, Rubela", wajib:true },
  { age:"12 bln", name:"Varicella (Cacar Air)", note:"Dianjurkan", wajib:false },
  { age:"12 bln", name:"Hepatitis A", note:"Dosis pertama", wajib:false },
  { age:"12 bln", name:"PCV Booster", note:"Penguat", wajib:true },
];

/* ─────────────────────────  WHO GROWTH STANDARDS  ───────────────────────── */
/* Sumber: WHO Child Growth Standards (Simplified Field Tables, z-scores).
   Tiap baris: [bulan, -3SD, -2SD, median, +2SD, +3SD]. Usia 0-12 bulan. */
const WHO = {
  weight: {
    boys: [
      [0,2.1,2.5,3.3,4.4,5.0],[1,2.9,3.4,4.5,5.8,6.6],[2,3.8,4.3,5.6,7.1,8.0],
      [3,4.4,5.0,6.4,8.0,9.0],[4,4.9,5.6,7.0,8.7,9.7],[5,5.3,6.0,7.5,9.3,10.4],
      [6,5.7,6.4,7.9,9.8,10.9],[7,5.9,6.7,8.3,10.3,11.4],[8,6.2,6.9,8.6,10.7,11.9],
      [9,6.4,7.1,8.9,11.0,12.3],[10,6.6,7.4,9.2,11.4,12.7],[11,6.8,7.6,9.4,11.7,13.0],
      [12,6.9,7.7,9.6,12.0,13.3],
    ],
    girls: [
      [0,2.0,2.4,3.2,4.2,4.8],[1,2.7,3.2,4.2,5.5,6.2],[2,3.4,3.9,5.1,6.6,7.5],
      [3,4.0,4.5,5.8,7.5,8.5],[4,4.4,5.0,6.4,8.2,9.3],[5,4.8,5.4,6.9,8.8,10.0],
      [6,5.1,5.7,7.3,9.3,10.6],[7,5.3,6.0,7.6,9.8,11.1],[8,5.6,6.3,7.9,10.2,11.6],
      [9,5.8,6.5,8.2,10.5,12.0],[10,5.9,6.7,8.5,10.9,12.4],[11,6.1,6.9,8.7,11.2,12.8],
      [12,6.3,7.0,8.9,11.5,13.1],
    ],
  },
  height: { /* length-for-age (cm) */
    boys: [
      [0,44.2,46.1,49.9,53.7,55.6],[1,48.9,50.8,54.7,58.6,60.6],[2,52.4,54.4,58.4,62.4,64.4],
      [3,55.3,57.3,61.4,65.5,67.6],[4,57.6,59.7,63.9,68.0,70.1],[5,59.6,61.7,65.9,70.1,72.2],
      [6,61.2,63.3,67.6,71.9,74.0],[7,62.7,64.8,69.2,73.5,75.7],[8,64.0,66.2,70.6,75.0,77.2],
      [9,65.2,67.5,72.0,76.5,78.7],[10,66.4,68.7,73.3,77.9,80.1],[11,67.6,69.9,74.5,79.2,81.5],
      [12,68.6,71.0,75.7,80.5,82.9],
    ],
    girls: [
      [0,43.6,45.4,49.1,52.9,54.7],[1,47.8,49.8,53.7,57.6,59.5],[2,51.0,53.0,57.1,61.1,63.2],
      [3,53.5,55.6,59.8,64.0,66.1],[4,55.6,57.8,62.1,66.4,68.6],[5,57.4,59.6,64.0,68.5,70.7],
      [6,58.9,61.2,65.7,70.3,72.5],[7,60.3,62.7,67.3,71.9,74.2],[8,61.7,64.0,68.7,73.5,75.8],
      [9,62.9,65.3,70.1,75.0,77.4],[10,64.1,66.5,71.5,76.4,78.9],[11,65.2,67.7,72.8,77.8,80.3],
      [12,66.3,68.9,74.0,79.2,81.7],
    ],
  },
};
function zState(value, row) {
  // row = [month,-3,-2,median,+2,+3]; classify value
  if (value == null || isNaN(value) || !row) return null;
  const [, m3, m2, med, p2, p3] = row;
  if (value < m3) return { key: "low2", label: "Sangat di bawah", color: "#C0392B" };
  if (value < m2) return { key: "low1", label: "Di bawah normal", color: "#E67E22" };
  if (value > p3) return { key: "high2", label: "Sangat di atas", color: "#C0392B" };
  if (value > p2) return { key: "high1", label: "Di atas normal", color: "#E67E22" };
  return { key: "ok", label: "Normal (on-track)", color: "#2E7D32", median: med };
}

const MILESTONES = [
  { age:"6 bln", text:"Duduk dgn bantuan, berguling, meraih benda, babbling (ba-ba)" },
  { age:"7 bln", text:"Duduk mandiri sebentar, pegang benda 2 tangan, respons nama" },
  { age:"8 bln", text:"Mulai merangkak, pindah benda tangan ke tangan, stranger anxiety" },
  { age:"9 bln", text:"Berdiri pegang meja, pincer grasp, mama/dada bermakna, cilukba" },
  { age:"10 bln", text:"Jalan rambat, masukkan benda ke wadah, tepuk tangan" },
  { age:"11 bln", text:"Berdiri sebentar tanpa pegangan, menunjuk benda diinginkan" },
  { age:"12 bln", text:"Langkah pertama! Susun 2 balok, 3-5 kata bermakna" },
];

/* ─────────────────────────  ALLERGENS  ───────────────────────── */
const ALLERGENS = [
  { id:"telur",   label:"Telur",            emoji:"🥚", keys:["telur","omelet","puyuh","dadar","perkedel","pancake","cake","puding"] },
  { id:"susu",    label:"Susu Sapi & Olahan", emoji:"🥛", keys:["susu","keju","yogurt","mentega","krim","sufor"] },
  { id:"ikan",    label:"Ikan",             emoji:"🐟", keys:["ikan","salmon","kakap","bandeng"] },
  { id:"seafood", label:"Makanan Laut",     emoji:"🦐", keys:["udang","kerang","cumi","kepiting"] },
  { id:"kacang",  label:"Kacang-kacangan",  emoji:"🥜", keys:["kacang"] },
  { id:"kedelai", label:"Kedelai (Tempe/Tahu)", emoji:"🫘", keys:["tempe","tahu","kedelai","kecap"] },
  { id:"gluten",  label:"Gluten / Gandum",  emoji:"🌾", keys:["tepung","terigu","mie","roti","biskuit","oat","havermut","pancake","cake"] },
  { id:"ayam",    label:"Ayam",             emoji:"🐔", keys:["ayam","hati ayam"] },
  { id:"sapi",    label:"Daging Sapi",      emoji:"🥩", keys:["sapi","daging giling","daging cincang","bola daging"] },
];
const allergenById = (id) => ALLERGENS.find((a) => a.id === id);
function recipeAllergens(r) {
  const hay = `${r.name} ${r.bahan} ${r.cara}`.toLowerCase();
  return ALLERGENS.filter((a) => a.keys.some((k) => hay.includes(k))).map((a) => a.id);
}
function textAllergens(text) {
  if (!text) return [];
  const hay = String(text).toLowerCase();
  return ALLERGENS.filter((a) => a.keys.some((k) => hay.includes(k))).map((a) => a.id);
}

/* Suggest meals for a stage & slot, skipping recipes that conflict with allergies */
const DEFAULT_TIME = { Pagi: "08:00", Siang: "12:00", Malam: "18:00" };
function suggestPool(stage, slot, allergyIds = []) {
  const slotMap = { Pagi: ["Pagi", "Sarapan"], Siang: ["Siang"], Malam: ["Malam"], Snack: ["Snack"] };
  const wanted = slotMap[slot] || [];
  return RECIPES.filter((r) => {
    if (r.stage !== stage) return false;
    if (!wanted.includes(r.waktu)) return false;
    const conflict = recipeAllergens(r).some((id) => allergyIds.includes(id));
    return !conflict;
  });
}
function pickSuggestion(stage, slot, allergyIds, seed = 0) {
  const pool = suggestPool(stage, slot, allergyIds);
  if (!pool.length) return "";
  const r = pool[seed % pool.length];
  if (slot === "Snack") return r.name;
  return `${DEFAULT_TIME[slot]} ${r.name}`;
}

/* ─────────────────────────  HELPERS  ───────────────────────── */
const pad = (n) => String(n).padStart(2, "0");
const todayISO = () => new Date().toISOString().slice(0, 10);

function calcAge(birth, target) {
  if (!birth) return null;
  const b = new Date(birth), t = new Date(target);
  if (t < b) return { invalid: true };
  let months = (t.getFullYear() - b.getFullYear()) * 12 + (t.getMonth() - b.getMonth());
  let days = t.getDate() - b.getDate();
  if (days < 0) {
    months--;
    const prev = new Date(t.getFullYear(), t.getMonth(), 0).getDate();
    days += prev;
  }
  return { months, days };
}
function stageFromMonths(m) {
  if (m == null) return null;
  if (m < 9) return "6-8 Bulan";
  if (m < 12) return "9-11 Bulan";
  return "12 Bulan";
}
function gcalLink(dateISO, label, meal, stage) {
  if (!meal) return null;
  const m = meal.match(/^(\d{1,2})[:.](\d{2})/);
  const def = { Pagi: 8, Siang: 12, Malam: 18 };
  let h = def[label] || 8, mm = 0;
  if (m) { h = +m[1]; mm = +m[2]; }
  const start = new Date(dateISO); start.setHours(h, mm, 0, 0);
  const end = new Date(start.getTime() + 30 * 60000);
  const f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const text = encodeURIComponent(`MPASI ${label} – ${meal}`);
  const det = encodeURIComponent(`Tahap: ${stage || "-"}. Dicatat dari MPASI Tracker 🌸`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${f(start)}/${f(end)}&details=${det}`;
}
function fmtTanggal(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });
}

/* persistent state hook */
function usePersist(key, initial) {
  const [val, setVal] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const r = await window.storage.get(key);
        if (live && r && r.value != null) setVal(JSON.parse(r.value));
      } catch (e) {}
      if (live) setReady(true);
    })();
    return () => { live = false; };
  }, [key]);
  const update = (next) => {
    setVal((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      (async () => { try { await window.storage.set(key, JSON.stringify(resolved)); } catch (e) {} })();
      return resolved;
    });
  };
  return [val, update, ready];
}

const uid = () => Math.random().toString(36).slice(2, 9);

/* ─────────────────────────  SHARED UI  ───────────────────────── */
const Card = ({ children, style }) => (
  <div style={{ background: C.white, borderRadius: 22, border: `1px solid ${C.line}`,
    boxShadow: "0 6px 22px rgba(74,51,64,0.06)", padding: 18, ...style }}>{children}</div>
);
const Field = ({ label, ...p }) => (
  <label style={{ display: "block", marginBottom: 12 }}>
    <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.plum2, marginBottom: 5 }}>{label}</span>
    <input {...p} style={{ width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 13,
      border: `1.5px solid ${C.line}`, background: C.cream, fontSize: 15, color: C.plum,
      fontFamily: "inherit", outline: "none", ...p.style }} />
  </label>
);

/* ─────────────────────────  APP  ───────────────────────── */
export default function App() {
  const [tab, setTab] = useState("home");
  const [baby, setBaby, babyReady] = usePersist("mpasi:baby", { name: "", birthDate: "", gender: "boys" });
  const [logs, setLogs] = usePersist("mpasi:logs", []);
  const [growth, setGrowth] = usePersist("mpasi:growth", []);
  const [immun, setImmun] = usePersist("mpasi:immun", {});
  const [sleep, setSleep] = usePersist("mpasi:sleep", []);
  const [allergy, setAllergy] = usePersist("mpasi:allergy", { ids: [], note: "" });

  const ageNow = useMemo(() => calcAge(baby.birthDate, todayISO()), [baby.birthDate]);
  const stageNow = ageNow && !ageNow.invalid ? stageFromMonths(ageNow.months) : null;
  const quote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], []);

  const TABS = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "log", label: "Catatan", icon: NotebookPen },
    { id: "menu", label: "Menu", icon: Soup },
    { id: "growth", label: "Tumbuh", icon: LineIcon },
    { id: "sleep", label: "Tidur", icon: Moon },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.cream, color: C.plum,
      fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 86 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { -webkit-tap-highlight-color: transparent; }
        .fr { font-family: 'Fraunces', serif; }
        .fade { animation: fade .5s ease both; }
        .rise { animation: rise .5s ease both; }
        @keyframes fade { from{opacity:0} to{opacity:1} }
        @keyframes rise { from{opacity:0; transform:translateY(12px)} to{opacity:1; transform:none} }
        .tapcard { transition: transform .15s ease, box-shadow .2s ease; cursor:pointer; }
        .tapcard:active { transform: scale(.98); }
        .navbtn { transition: color .2s ease; }
        ::-webkit-scrollbar { width:0; height:0; }
        input[type=date]::-webkit-calendar-picker-indicator { opacity:.5; }
      `}</style>

      {/* HEADER */}
      <div style={{ position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${C.roseSoft} 0%, ${C.peachSoft} 60%, ${C.sageSoft} 100%)`,
        padding: "26px 20px 22px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%",
          background: "rgba(255,255,255,0.35)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -30, width: 110, height: 110, borderRadius: "50%",
          background: "rgba(255,255,255,0.25)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: C.roseDk }}>
            <Sparkles size={15} /> MPASI Tracker · Panduan IDAI
          </div>
          <h1 className="fr" style={{ margin: "6px 0 0", fontSize: 27, fontWeight: 600, lineHeight: 1.15, color: C.plum }}>
            {baby.name ? `Hai, Bunda ${baby.name}` : "Selamat datang, Bunda"} 🌷
          </h1>
          {ageNow && !ageNow.invalid && (
            <p style={{ margin: "6px 0 0", fontSize: 14, color: C.plum2 }}>
              Si kecil kini <b>{ageNow.months} bulan {ageNow.days} hari</b>
              {stageNow && <> · Tahap <b>{STAGES[stageNow].emoji} {stageNow}</b></>}
            </p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 460, margin: "0 auto", padding: "18px 16px 0" }}>
        {tab === "home" && <HomeTab {...{ baby, setBaby, ageNow, stageNow, logs, quote, setTab, allergy, setAllergy }} />}
        {tab === "log" && <LogTab {...{ logs, setLogs, baby, ageNow, allergy }} />}
        {tab === "menu" && <MenuTab stageNow={stageNow} allergy={allergy} />}
        {tab === "growth" && <GrowthTab {...{ growth, setGrowth, immun, setImmun, baby }} />}
        {tab === "sleep" && <SleepTab {...{ sleep, setSleep }} />}
      </div>

      {/* BOTTOM NAV */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.92)",
        zIndex: 40,
        backdropFilter: "blur(10px)", borderTop: `1px solid ${C.line}`, display: "flex",
        justifyContent: "space-around", padding: "8px 6px 12px", maxWidth: 460, margin: "0 auto" }}>
        {TABS.map((t) => {
          const Ic = t.icon, on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className="navbtn"
              style={{ border: "none", background: "none", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 3, cursor: "pointer", flex: 1, color: on ? C.roseDk : C.plum2,
                fontFamily: "inherit" }}>
              <div style={{ background: on ? C.roseSoft : "transparent", borderRadius: 14, padding: "5px 16px",
                transition: "background .2s ease" }}>
                <Ic size={21} strokeWidth={on ? 2.4 : 1.9} />
              </div>
              <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ─────────────────────────  HOME  ───────────────────────── */
function HomeTab({ baby, setBaby, ageNow, stageNow, logs, quote, setTab, allergy, setAllergy }) {
  const [editing, setEditing] = useState(!baby.birthDate);
  const [allOpen, setAllOpen] = useState(false);
  const toggleAllergen = (id) => setAllergy({
    ...allergy,
    ids: allergy.ids.includes(id) ? allergy.ids.filter((x) => x !== id) : [...allergy.ids, id],
  });
  const weekLogs = useMemo(() => {
    const wk = Date.now() - 7 * 864e5;
    return logs.filter((l) => new Date(l.date).getTime() >= wk);
  }, [logs]);
  const totalMeals = weekLogs.reduce((s, l) =>
    s + ["mealPagi", "snack1", "mealSiang", "snack2", "mealMalam"].filter((k) => l[k]).length, 0);
  const avgAsi = weekLogs.length ? (weekLogs.reduce((s, l) => s + (+l.asi || 0), 0) / weekLogs.length).toFixed(1) : "0";

  return (
    <div className="fade">
      {/* Baby card */}
      <Card style={{ marginBottom: 14, background: `linear-gradient(135deg,#fff,${C.cream})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: C.roseSoft,
            display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Baby size={26} color={C.roseDk} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: C.plum2, fontWeight: 600 }}>Data Si Kecil</div>
            <div className="fr" style={{ fontSize: 19, fontWeight: 600 }}>{baby.name || "Belum diisi"}</div>
          </div>
          <button onClick={() => setEditing((e) => !e)} style={{ border: `1.5px solid ${C.line}`,
            background: C.white, borderRadius: 12, padding: "7px 12px", fontSize: 12.5, fontWeight: 600,
            color: C.roseDk, cursor: "pointer", fontFamily: "inherit" }}>
            {editing ? "Tutup" : "Edit"}
          </button>
        </div>

        {editing && (
          <div style={{ marginTop: 14 }} className="rise">
            <Field label="Nama Bayi" placeholder="cth: Arka" value={baby.name}
              onChange={(e) => setBaby({ ...baby, name: e.target.value })} />
            <Field label="Tanggal Lahir Bayi" type="date" value={baby.birthDate}
              onChange={(e) => setBaby({ ...baby, birthDate: e.target.value })} />
            <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.plum2, marginBottom: 6 }}>Jenis Kelamin (untuk kurva WHO)</span>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[["boys", "👦 Laki-laki"], ["girls", "👧 Perempuan"]].map(([g, lbl]) => (
                <button key={g} onClick={() => setBaby({ ...baby, gender: g })} style={{ flex: 1,
                  padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${baby.gender === g ? C.rose : C.line}`,
                  background: baby.gender === g ? C.roseSoft : C.white, fontSize: 13, fontWeight: 700,
                  color: C.plum, cursor: "pointer", fontFamily: "inherit" }}>
                  {lbl}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: C.plum2, margin: "2px 0 0" }}>
              💡 Cukup isi sekali — usia & tahap MPASI akan terhitung otomatis.
            </p>
          </div>
        )}

        {!editing && ageNow && !ageNow.invalid && (
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Stat label="Usia" value={`${ageNow.months}bln ${ageNow.days}hr`} bg={C.roseSoft} fg={C.roseDk} />
            <Stat label="Tahap" value={stageNow ? `${STAGES[stageNow].emoji} ${stageNow.split(" ")[0]}` : "-"} bg={C.sageSoft} fg={C.sageDk} />
          </div>
        )}
        {!editing && stageNow && (
          <div style={{ marginTop: 10, background: STAGES[stageNow].soft, borderRadius: 14, padding: "10px 13px" }}>
            <span style={{ fontSize: 12, color: C.plum2 }}>Tekstur dianjurkan: </span>
            <b style={{ fontSize: 13, color: C.plum }}>{STAGES[stageNow].texture}</b>
          </div>
        )}
      </Card>

      {/* Allergy card */}
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: C.peachSoft,
            display: "grid", placeItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 22 }}>🚫</span>
          </div>
          <div style={{ flex: 1 }}>
            <div className="fr" style={{ fontSize: 16, fontWeight: 600 }}>Alergi Si Kecil</div>
            <div style={{ fontSize: 12, color: C.plum2 }}>
              {allergy.ids.length ? `${allergy.ids.length} alergen ditandai` : "Belum ada — tap untuk menandai"}
            </div>
          </div>
          <button onClick={() => setAllOpen((o) => !o)} style={{ border: `1.5px solid ${C.line}`,
            background: C.white, borderRadius: 12, padding: "7px 12px", fontSize: 12.5, fontWeight: 600,
            color: C.peach, cursor: "pointer", fontFamily: "inherit" }}>
            {allOpen ? "Tutup" : "Atur"}
          </button>
        </div>

        {/* selected chips preview */}
        {!allOpen && allergy.ids.length > 0 && (
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 12 }}>
            {allergy.ids.map((id) => {
              const a = allergenById(id);
              return a ? (
                <span key={id} style={{ background: C.peachSoft, color: "#A8531F", fontSize: 12, fontWeight: 700,
                  padding: "5px 11px", borderRadius: 11 }}>{a.emoji} {a.label}</span>
              ) : null;
            })}
          </div>
        )}

        {allOpen && (
          <div style={{ marginTop: 14 }} className="rise">
            <div style={{ fontSize: 12.5, color: C.plum2, marginBottom: 9 }}>
              Tap alergen yang harus dihindari. Menu di halaman Menu akan otomatis ditandai. 👇
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {ALLERGENS.map((a) => {
                const on = allergy.ids.includes(a.id);
                return (
                  <button key={a.id} onClick={() => toggleAllergen(a.id)} style={{
                    border: `1.5px solid ${on ? C.peach : C.line}`,
                    background: on ? C.peachSoft : C.white, color: on ? "#A8531F" : C.plum2,
                    borderRadius: 12, padding: "8px 12px", fontSize: 12.5, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                    {a.emoji} {a.label} {on && <Check size={13} />}
                  </button>
                );
              })}
            </div>
            <Field label="📝 Catatan alergi lain (gejala, reaksi, dll)" value={allergy.note || ""}
              onChange={(e) => setAllergy({ ...allergy, note: e.target.value })}
              placeholder="cth: ruam saat coba stroberi" />
            <div style={{ background: C.peachSoft, borderRadius: 12, padding: "9px 13px", fontSize: 11.5,
              color: "#A8531F", lineHeight: 1.5 }}>
              💡 Aturan IDAI: perkenalkan 1 bahan baru tiap 3-5 hari agar mudah mendeteksi alergi. Jika muncul ruam,
              bengkak, muntah, atau sesak — hentikan & segera ke dokter.
            </div>
          </div>
        )}
      </Card>

      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <Card style={{ flex: 1, textAlign: "center", padding: 16 }}>
          <Soup size={20} color={C.peach} style={{ marginBottom: 4 }} />
          <div className="fr" style={{ fontSize: 26, fontWeight: 600 }}>{totalMeals}</div>
          <div style={{ fontSize: 11.5, color: C.plum2, fontWeight: 600 }}>Makan minggu ini</div>
        </Card>
        <Card style={{ flex: 1, textAlign: "center", padding: 16 }}>
          <Milk size={20} color={C.sageDk} style={{ marginBottom: 4 }} />
          <div className="fr" style={{ fontSize: 26, fontWeight: 600 }}>{avgAsi}</div>
          <div style={{ fontSize: 11.5, color: C.plum2, fontWeight: 600 }}>Rata-rata ASI/hari</div>
        </Card>
      </div>

      {/* Quote */}
      <Card style={{ marginBottom: 14, background: `linear-gradient(135deg,${C.lilacSoft},${C.roseSoft})`, border: "none" }}>
        <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
          <Heart size={20} color={C.roseDk} style={{ flexShrink: 0, marginTop: 2 }} fill={C.rose} />
          <p className="fr" style={{ margin: 0, fontSize: 16, lineHeight: 1.45, fontStyle: "italic", color: C.plum }}>{quote}</p>
        </div>
      </Card>

      {/* Quick nav */}
      <div style={{ fontSize: 13, fontWeight: 700, color: C.plum2, margin: "4px 4px 8px" }}>Menu Cepat</div>
      {[
        { id: "log", t: "Catat MPASI Hari Ini", d: "Tambah menu & buat reminder Calendar", ic: NotebookPen, c: C.rose },
        { id: "menu", t: "Ide Resep MPASI", d: "30+ resep sesuai tahap usia", ic: Soup, c: C.peach },
        { id: "growth", t: "Tumbuh Kembang", d: "Grafik BB/TB & jadwal imunisasi", ic: LineIcon, c: C.sageDk },
        { id: "sleep", t: "Tidur, ASI & Popok", d: "Pantau pola harian si kecil", ic: Moon, c: C.lilac },
      ].map((q) => {
        const Ic = q.ic;
        return (
          <Card key={q.id} className="tapcard" style={{ marginBottom: 10, padding: 14 }}
            onClick={() => setTab(q.id)}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: q.c + "22",
                display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Ic size={21} color={q.c} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{q.t}</div>
                <div style={{ fontSize: 12, color: C.plum2 }}>{q.d}</div>
              </div>
              <ChevronRight size={20} color={C.plum2} />
            </div>
          </Card>
        );
      })}

      <p style={{ fontSize: 11, color: C.plum2, textAlign: "center", margin: "16px 8px 4px", lineHeight: 1.5 }}>
        ⚠️ Aplikasi ini alat bantu sesuai panduan IDAI. Selalu konsultasikan kondisi bayi dengan dokter anak ya, Bunda.
      </p>
    </div>
  );
}
const Stat = ({ label, value, bg, fg }) => (
  <div style={{ flex: 1, background: bg, borderRadius: 14, padding: "10px 12px" }}>
    <div style={{ fontSize: 11, color: C.plum2, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 700, color: fg }}>{value}</div>
  </div>
);
const StatusRow = ({ label, v, state }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
    <div style={{ width: 10, height: 10, borderRadius: "50%", background: state.color, flexShrink: 0 }} />
    <div style={{ flex: 1, fontSize: 13 }}>
      <b>{label}:</b> {v}
    </div>
    <span style={{ fontSize: 11.5, fontWeight: 700, color: state.color, background: state.color + "1A",
      padding: "4px 10px", borderRadius: 10 }}>
      {state.key === "ok" ? "✅ " : "⚠️ "}{state.label}
    </span>
  </div>
);

/* ─────────────────────────  DAILY LOG  ───────────────────────── */
function LogTab({ logs, setLogs, baby, ageNow, allergy = { ids: [] } }) {
  const [open, setOpen] = useState(false);
  const sorted = useMemo(() => [...logs].sort((a, b) => b.date.localeCompare(a.date)), [logs]);

  return (
    <div className="fade">
      <SectionTitle title="Catatan MPASI Harian" sub={`${logs.length} hari tercatat`} />
      <button onClick={() => setOpen(true)} style={{ width: "100%", border: "none", borderRadius: 16,
        background: `linear-gradient(135deg,${C.rose},${C.roseDk})`, color: "#fff", padding: "14px",
        fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        boxShadow: "0 8px 20px rgba(199,100,131,0.35)" }}>
        <Plus size={20} /> Tambah Catatan Hari Ini
      </button>

      {sorted.length === 0 && <Empty text="Belum ada catatan. Yuk mulai catat MPASI pertama si kecil! 🥄" />}

      {sorted.map((l) => {
        const st = STAGES[l.stage];
        const meals = [
          { k: "mealPagi", label: "Pagi", ic: Sun, c: C.peach },
          { k: "snack1", label: "Snack 1", ic: Cookie, c: C.lilac },
          { k: "mealSiang", label: "Siang", ic: Soup, c: C.rose },
          { k: "snack2", label: "Snack 2", ic: Cookie, c: C.lilac },
          { k: "mealMalam", label: "Malam", ic: Sunset, c: C.sageDk },
        ];
        return (
          <Card key={l.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div className="fr" style={{ fontSize: 16, fontWeight: 600 }}>{fmtTanggal(l.date)}</div>
                {l.ageText && <div style={{ fontSize: 11.5, color: C.plum2 }}>Usia {l.ageText}</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {st && <span style={{ background: st.soft, color: C.plum, fontSize: 11.5, fontWeight: 700,
                  padding: "5px 10px", borderRadius: 11 }}>{st.emoji} {l.stage}</span>}
                <button onClick={() => setLogs(logs.filter((x) => x.id !== l.id))}
                  style={{ border: "none", background: "none", cursor: "pointer", color: C.plum2, padding: 2 }}>
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
            {meals.filter((m) => l[m.k]).map((m) => {
              const Ic = m.ic;
              const link = (m.label === "Pagi" || m.label === "Siang" || m.label === "Malam")
                ? gcalLink(l.date, m.label, l[m.k], l.stage) : null;
              const conflicts = textAllergens(l[m.k]).filter((id) => allergy.ids.includes(id));
              return (
                <div key={m.k} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "7px 0",
                  borderTop: `1px solid ${C.cream2}` }}>
                  <Ic size={16} color={m.c} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: m.c }}>{m.label}</span>
                    <div style={{ fontSize: 13.5, color: C.plum }}>{l[m.k]}</div>
                    {conflicts.length > 0 && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4,
                        background: "#FCE4D6", color: "#A8531F", borderRadius: 8, padding: "3px 8px",
                        fontSize: 10.5, fontWeight: 700 }}>
                        ⚠️ ada {conflicts.map((id) => allergenById(id)?.label).join(", ")}
                      </div>
                    )}
                  </div>
                  {link && (
                    <a href={link} target="_blank" rel="noreferrer" title="Tambah ke Google Calendar"
                      style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 32, height: 32,
                        borderRadius: 10, background: C.sageSoft, color: C.sageDk }}>
                      <CalendarPlus size={16} />
                    </a>
                  )}
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12, color: C.plum2 }}>
              {l.asi && <span><Milk size={13} style={{ verticalAlign: -2 }} /> ASI {l.asi}x</span>}
              {l.notes && <span style={{ fontStyle: "italic" }}>📝 {l.notes}</span>}
            </div>
          </Card>
        );
      })}

      {open && <LogForm baby={baby} ageNow={ageNow} allergy={allergy} onClose={() => setOpen(false)}
        onSave={(entry) => { setLogs([entry, ...logs]); setOpen(false); }} />}
    </div>
  );
}

function LogForm({ baby, allergy = { ids: [] }, onClose, onSave }) {
  const [date, setDate] = useState(todayISO());
  const ageOnDate = useMemo(() => calcAge(baby.birthDate, date), [baby.birthDate, date]);
  const autoStage = ageOnDate && !ageOnDate.invalid ? stageFromMonths(ageOnDate.months) : "6-8 Bulan";
  const [stage, setStage] = useState(autoStage);
  const [f, setF] = useState({ mealPagi: "", snack1: "", mealSiang: "", snack2: "", mealMalam: "", asi: "", notes: "" });
  const [seed, setSeed] = useState(() => new Date().getDate());
  useEffect(() => { if (autoStage) setStage(autoStage); }, [autoStage]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // map each field to (slot, seed-offset) so suggestions vary per slot
  const slotOf = { mealPagi: ["Pagi", 0], snack1: ["Snack", 1], mealSiang: ["Siang", 2], snack2: ["Snack", 3], mealMalam: ["Malam", 4] };

  const fillAll = () => {
    const next = { ...f };
    Object.entries(slotOf).forEach(([key, [slot, off]]) => {
      next[key] = pickSuggestion(stage, slot, allergy.ids, seed + off);
    });
    if (!next.asi) next.asi = "8";
    setF(next);
  };
  const shuffle = () => { setSeed((s) => s + 1); };
  const suggestField = (key) => {
    const [slot, off] = slotOf[key];
    const val = pickSuggestion(stage, slot, allergy.ids, seed + off + 1);
    if (val) { setF((prev) => ({ ...prev, [key]: val })); setSeed((s) => s + 1); }
  };

  const renderMeal = (k, label, ph) => {
    const [slot] = slotOf[k];
    const hasSuggestion = suggestPool(stage, slot, allergy.ids).length > 0;
    return (
      <div style={{ marginBottom: 12 }} key={k}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: C.plum2 }}>{label}</span>
          {hasSuggestion && (
            <button type="button" onClick={() => suggestField(k)} style={{ border: "none", background: C.lilacSoft,
              color: "#7B4FA0", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 9,
              cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 3 }}>
              <Sparkles size={11} /> saran
            </button>
          )}
        </div>
        <input value={f[k]} onChange={set(k)} placeholder={ph}
          style={{ width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 13,
            border: `1.5px solid ${C.line}`, background: C.cream, fontSize: 15, color: C.plum,
            fontFamily: "inherit", outline: "none" }} />
      </div>
    );
  };

  return (
    <Modal onClose={onClose} title="Catat MPASI">
      <Field label="Tanggal" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {ageOnDate && !ageOnDate.invalid && (
        <div style={{ fontSize: 12, color: C.sageDk, fontWeight: 600, margin: "-4px 0 12px" }}>
          ✨ Usia bayi saat itu: {ageOnDate.months} bln {ageOnDate.days} hr
        </div>
      )}
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.plum2, marginBottom: 6 }}>Tahap MPASI</span>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {Object.keys(STAGES).map((s) => (
          <button key={s} onClick={() => setStage(s)} style={{ flex: 1, padding: "9px 4px", borderRadius: 12,
            border: `1.5px solid ${stage === s ? STAGES[s].color : C.line}`,
            background: stage === s ? STAGES[s].soft : C.white, fontSize: 12, fontWeight: 700,
            color: C.plum, cursor: "pointer", fontFamily: "inherit" }}>
            {STAGES[s].emoji}<br />{s}
          </button>
        ))}
      </div>

      {/* Suggestion bar */}
      <div style={{ background: `linear-gradient(135deg,${C.lilacSoft},${C.sageSoft})`, borderRadius: 14,
        padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
          <Sparkles size={16} color="#7B4FA0" />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.plum }}>Bingung mau masak apa?</span>
        </div>
        <div style={{ fontSize: 12, color: C.plum2, marginBottom: 10, lineHeight: 1.4 }}>
          Biar aplikasi isikan saran menu sehari penuh sesuai usia{allergy.ids.length ? " & bebas alergen si kecil" : ""}. Tetap bisa Bunda edit kok.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={fillAll} style={{ flex: 1, border: "none", borderRadius: 11, background: "#7B4FA0",
            color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px", cursor: "pointer",
            fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Sparkles size={15} /> Isi Saran Sehari
          </button>
          <button onClick={shuffle} title="Ganti saran lain" style={{ border: `1.5px solid #C9B6D8`,
            borderRadius: 11, background: "#fff", color: "#7B4FA0", fontSize: 13, fontWeight: 700,
            padding: "10px 14px", cursor: "pointer", fontFamily: "inherit" }}>
            🔄 Ganti
          </button>
        </div>
      </div>

      <div style={{ background: STAGES[stage].soft, borderRadius: 11, padding: "8px 12px", marginBottom: 14, fontSize: 12 }}>
        Tekstur: <b>{STAGES[stage].texture}</b>
      </div>

      {renderMeal("mealPagi", "🌅 MPASI Pagi", "08:00 Bubur Ayam Wortel")}
      {renderMeal("snack1", "🍎 Snack 1 (opsional)", "Buah pisang")}
      {renderMeal("mealSiang", "☀️ MPASI Siang", "12:00 Tim Ikan Brokoli")}
      {renderMeal("snack2", "🍇 Snack 2 (opsional)", "Yogurt plain")}
      {renderMeal("mealMalam", "🌙 MPASI Malam", "18:00 Bubur Labu Tahu")}
      <Field label="🍼 ASI / Sufor (berapa kali)" type="number" value={f.asi} onChange={set("asi")} placeholder="8" />
      <Field label="📝 Catatan (alergi, BAB, dll)" value={f.notes} onChange={set("notes")} placeholder="BAB normal, suka wortel" />
      <button onClick={() => onSave({ id: uid(), date, stage, ...f,
        ageText: ageOnDate && !ageOnDate.invalid ? `${ageOnDate.months} bln ${ageOnDate.days} hr` : "" })}
        style={saveBtn}>
        <Check size={19} /> Simpan Catatan
      </button>
    </Modal>
  );
}

/* ─────────────────────────  MENU  ───────────────────────── */
function MenuTab({ stageNow, allergy = { ids: [] } }) {
  const [filter, setFilter] = useState(stageNow || "6-8 Bulan");
  const [onlySafe, setOnlySafe] = useState(false);
  const hasAllergy = allergy.ids.length > 0;

  const list = RECIPES
    .filter((r) => r.stage === filter)
    .map((r) => {
      const conflicts = recipeAllergens(r).filter((id) => allergy.ids.includes(id));
      return { ...r, conflicts, unsafe: conflicts.length > 0 };
    })
    .filter((r) => (onlySafe ? !r.unsafe : true));

  return (
    <div className="fade">
      <SectionTitle title="Resep MPASI IDAI" sub={`${RECIPES.length} resep mudah untuk Bunda`} />

      {hasAllergy && (
        <Card style={{ marginBottom: 14, background: C.peachSoft, border: "none", padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: 18 }}>🚫</span>
            <div style={{ flex: 1, fontSize: 12.5, color: "#A8531F", lineHeight: 1.4 }}>
              Menu ditandai sesuai alergi: {allergy.ids.map((id) => allergenById(id)?.emoji).join(" ")}
            </div>
            <button onClick={() => setOnlySafe((s) => !s)} style={{ border: "none", borderRadius: 10,
              background: onlySafe ? "#A8531F" : C.white, color: onlySafe ? "#fff" : "#A8531F",
              fontSize: 11.5, fontWeight: 700, padding: "7px 11px", cursor: "pointer", fontFamily: "inherit",
              flexShrink: 0 }}>
              {onlySafe ? "✓ Aman saja" : "Aman saja"}
            </button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.keys(STAGES).map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{ flex: 1, padding: "10px 4px", borderRadius: 13,
            background: filter === s ? STAGES[s].color : C.white,
            color: filter === s ? "#fff" : C.plum2, fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", boxShadow: filter === s ? "0 6px 16px rgba(0,0,0,0.12)" : "none",
            border: filter === s ? "none" : `1px solid ${C.line}` }}>
            {STAGES[s].emoji} {s}
          </button>
        ))}
      </div>

      {list.length === 0 && <Empty text="Semua menu di tahap ini mengandung alergen si kecil. Coba tahap lain atau konsultasikan alternatif dengan dokter. 🤍" />}

      {list.map((r, i) => (
        <Card key={i} style={{ marginBottom: 11,
          border: r.unsafe ? `1.5px solid ${C.peach}` : `1px solid ${C.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <h3 className="fr" style={{ margin: 0, fontSize: 16.5, fontWeight: 600, flex: 1 }}>{r.name}</h3>
            <span style={{ background: C.cream2, fontSize: 11, fontWeight: 700, color: C.plum2,
              padding: "4px 9px", borderRadius: 9, flexShrink: 0 }}>{r.waktu}</span>
          </div>

          {/* safety badge */}
          {hasAllergy && (
            r.unsafe ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FCE4D6",
                color: "#A8531F", borderRadius: 10, padding: "7px 11px", fontSize: 12, fontWeight: 700,
                margin: "9px 0 4px" }}>
                ⚠️ Hindari — mengandung {r.conflicts.map((id) => allergenById(id)?.label).join(", ")}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.sageSoft,
                color: C.sageDk, borderRadius: 10, padding: "7px 11px", fontSize: 12, fontWeight: 700,
                margin: "9px 0 4px" }}>
                ✅ Aman untuk si kecil
              </div>
            )
          )}

          <p style={{ margin: "8px 0 6px", fontSize: 13, color: C.plum2 }}><b style={{ color: C.plum }}>Bahan:</b> {r.bahan}</p>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: C.plum2, lineHeight: 1.5 }}><b style={{ color: C.plum }}>Cara:</b> {r.cara}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag bg={C.roseSoft} fg={C.roseDk}>🥄 {r.porsi}</Tag>
            <Tag bg={C.sageSoft} fg={C.sageDk}>💪 {r.nutrisi}</Tag>
          </div>
        </Card>
      ))}
    </div>
  );
}
const Tag = ({ children, bg, fg }) => (
  <span style={{ background: bg, color: fg, fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 10 }}>{children}</span>
);

/* ─────────────────────────  GROWTH  ───────────────────────── */
function GrowthTab({ growth, setGrowth, immun, setImmun, baby = { gender: "boys" } }) {
  const [open, setOpen] = useState(false);
  const [metric, setMetric] = useState("weight"); // weight | height
  const gender = baby.gender === "girls" ? "girls" : "boys";

  // Build chart data merging WHO band (per month 0-12) with child's entries
  const chartData = useMemo(() => {
    const table = WHO[metric][gender];
    const byMonth = {};
    growth.forEach((g) => { byMonth[+g.month] = g; });
    return table.map((row) => {
      const [mo, , m2, med, p2] = row;
      const g = byMonth[mo];
      return {
        month: mo,
        label: `${mo}`,
        bandLow: m2,            // -2SD
        bandSpan: +(p2 - m2).toFixed(2), // healthy band thickness (stacked on bandLow)
        median: med,
        value: g ? +g[metric] || null : null,
      };
    });
  }, [growth, metric, gender]);

  // Latest entry interpretation
  const latest = useMemo(() => {
    if (!growth.length) return null;
    const g = [...growth].sort((a, b) => b.month - a.month)[0];
    const wRow = WHO.weight[gender].find((r) => r[0] === +g.month);
    const hRow = WHO.height[gender].find((r) => r[0] === +g.month);
    return {
      g,
      weight: g.weight ? zState(+g.weight, wRow) : null,
      height: g.height ? zState(+g.height, hRow) : null,
    };
  }, [growth, gender]);

  const metricLabel = metric === "weight" ? "Berat Badan (kg)" : "Tinggi Badan (cm)";
  const childColor = metric === "weight" ? C.roseDk : C.sageDk;
  const childFill = metric === "weight" ? C.rose : C.sage;

  return (
    <div className="fade">
      <SectionTitle title="Tumbuh Kembang" sub="Kurva WHO, imunisasi & milestone" />

      {/* On-track status card */}
      {latest && (latest.weight || latest.height) && (
        <Card style={{ marginBottom: 14, padding: 16 }}>
          <div style={{ fontSize: 12.5, color: C.plum2, fontWeight: 600, marginBottom: 10 }}>
            📍 Status di usia {latest.g.month} bulan (dibanding standar WHO {gender === "girls" ? "anak perempuan" : "anak laki-laki"})
          </div>
          {latest.weight && (
            <StatusRow label="Berat badan" v={`${latest.g.weight} kg`} state={latest.weight} />
          )}
          {latest.height && (
            <StatusRow label="Tinggi badan" v={`${latest.g.height} cm`} state={latest.height} />
          )}
          {(latest.weight?.key !== "ok" || latest.height?.key !== "ok") &&
           (latest.weight || latest.height) && (
            <div style={{ marginTop: 10, background: "#FFF4E5", borderRadius: 11, padding: "10px 12px",
              fontSize: 11.5, color: "#92400E", lineHeight: 1.5 }}>
              ⚠️ Ada indikator di luar rentang normal. Ini bukan diagnosis — tren beberapa bulan lebih penting
              daripada satu titik. Sebaiknya diskusikan dengan dokter anak ya, Bunda.
            </div>
          )}
        </Card>
      )}

      {/* Metric toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["weight", "⚖️ Berat Badan"], ["height", "📏 Tinggi Badan"]].map(([m, lbl]) => (
          <button key={m} onClick={() => setMetric(m)} style={{ flex: 1, padding: "9px 4px", borderRadius: 12,
            border: "none", background: metric === m ? C.sageDk : C.white,
            color: metric === m ? "#fff" : C.plum2, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", boxShadow: metric === m ? "0 4px 12px rgba(110,138,102,0.3)" : "none",
            border: metric === m ? "none" : `1px solid ${C.line}` }}>
            {lbl}
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: 14, padding: "16px 8px 10px" }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.plum, margin: "0 10px 4px" }}>
          📈 {metricLabel} vs Kurva WHO
        </div>
        <div style={{ fontSize: 11, color: C.plum2, margin: "0 10px 10px" }}>
          Area hijau = rentang normal WHO (−2SD s/d +2SD). Garis putus-putus = median.
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 14, left: -16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 4" stroke={C.line} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: C.plum2 }} axisLine={false} tickLine={false}
              label={{ value: "Usia (bulan)", position: "insideBottom", offset: -2, fontSize: 10, fill: C.plum2 }} />
            <YAxis tick={{ fontSize: 11, fill: C.plum2 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${C.line}`, fontSize: 12 }}
              formatter={(val, name) => {
                if (name === "Batas bawah normal" || name === "Rentang normal WHO") return [null, null];
                return [val, name];
              }} />
            {/* healthy band: invisible base (bandLow) + visible span */}
            <Area type="monotone" dataKey="bandLow" stackId="band" stroke="none" fill="transparent" name="Batas bawah normal" isAnimationActive={false} />
            <Area type="monotone" dataKey="bandSpan" stackId="band" stroke="none" fill="#9DB395" fillOpacity={0.22} name="Rentang normal WHO" isAnimationActive={false} />
            <Line type="monotone" dataKey="median" name="Median WHO" stroke={C.sageDk} strokeWidth={1.5}
              strokeDasharray="5 4" dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="value" name="Si Kecil" stroke={childColor} strokeWidth={3}
              connectNulls dot={{ r: 4, fill: childFill, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Legend wrapperStyle={{ fontSize: 10.5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <button onClick={() => setOpen(true)} style={{ ...saveBtn, marginTop: 0, marginBottom: 18,
        background: `linear-gradient(135deg,${C.sage},${C.sageDk})`, boxShadow: "0 8px 20px rgba(110,138,102,0.3)" }}>
        <Plus size={19} /> Tambah Data Bulan Ini
      </button>

      {growth.length > 0 && (
        <Card style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
          {[...growth].sort((a, b) => b.month - a.month).map((g, i) => (
            <div key={g.id} style={{ display: "flex", alignItems: "center", padding: "11px 15px",
              borderTop: i ? `1px solid ${C.cream2}` : "none" }}>
              <div style={{ width: 40, fontWeight: 700, color: C.sageDk, fontSize: 13 }}>{g.month}bl</div>
              <div style={{ flex: 1, fontSize: 13 }}>
                <b>{g.weight || "-"}</b> kg · <b>{g.height || "-"}</b> cm · LK <b>{g.head || "-"}</b>
                {g.note && <div style={{ fontSize: 11.5, color: C.plum2 }}>{g.note}</div>}
              </div>
              <button onClick={() => setGrowth(growth.filter((x) => x.id !== g.id))}
                style={{ border: "none", background: "none", cursor: "pointer", color: C.plum2 }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </Card>
      )}

      {/* Immunization */}
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.plum, margin: "4px 4px 10px",
        display: "flex", alignItems: "center", gap: 7 }}>
        <Syringe size={17} color={C.roseDk} /> Jadwal Imunisasi IDAI
      </div>
      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
        {IMMUN.map((v, i) => {
          const done = immun[v.name];
          return (
            <div key={i} onClick={() => setImmun({ ...immun, [v.name]: !done })}
              className="tapcard"
              style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px",
                borderTop: i ? `1px solid ${C.cream2}` : "none", cursor: "pointer" }}>
              <div style={{ width: 26, height: 26, borderRadius: 9, flexShrink: 0,
                border: `2px solid ${done ? C.sageDk : C.line}`, background: done ? C.sageDk : "#fff",
                display: "grid", placeItems: "center" }}>
                {done && <Check size={16} color="#fff" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, textDecoration: done ? "line-through" : "none",
                  color: done ? C.plum2 : C.plum }}>{v.name}</div>
                <div style={{ fontSize: 11, color: C.plum2 }}>{v.note}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: v.wajib ? C.roseDk : C.peach,
                background: v.wajib ? C.roseSoft : C.peachSoft, padding: "3px 8px", borderRadius: 8, flexShrink: 0 }}>
                {v.age}
              </span>
            </div>
          );
        })}
      </Card>

      {/* Milestones */}
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.plum, margin: "4px 4px 10px",
        display: "flex", alignItems: "center", gap: 7 }}>
        🌟 Milestone Perkembangan
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        {MILESTONES.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 11, padding: "11px 14px",
            borderTop: i ? `1px solid ${C.cream2}` : "none" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.sageDk, width: 42, flexShrink: 0 }}>{m.age}</span>
            <span style={{ fontSize: 12.5, color: C.plum2, lineHeight: 1.45 }}>{m.text}</span>
          </div>
        ))}
      </Card>

      {open && <GrowthForm onClose={() => setOpen(false)}
        onSave={(e) => { setGrowth([...growth, e]); setOpen(false); }} />}
    </div>
  );
}

function GrowthForm({ onClose, onSave }) {
  const [f, setF] = useState({ month: "", weight: "", height: "", head: "", note: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal onClose={onClose} title="Data Pertumbuhan">
      <Field label="Usia (bulan)" type="number" value={f.month} onChange={set("month")} placeholder="6" />
      <Field label="Berat Badan (kg)" type="number" step="0.1" value={f.weight} onChange={set("weight")} placeholder="7.2" />
      <Field label="Tinggi Badan (cm)" type="number" step="0.1" value={f.height} onChange={set("height")} placeholder="65.5" />
      <Field label="Lingkar Kepala (cm)" type="number" step="0.1" value={f.head} onChange={set("head")} placeholder="42.5" />
      <Field label="Catatan Dokter (opsional)" value={f.note} onChange={set("note")} placeholder="Normal, imunisasi PCV" />
      <button disabled={!f.month} onClick={() => onSave({ id: uid(), ...f, month: +f.month })}
        style={{ ...saveBtn, background: `linear-gradient(135deg,${C.sage},${C.sageDk})`, opacity: f.month ? 1 : 0.5 }}>
        <Check size={19} /> Simpan Data
      </button>
    </Modal>
  );
}

/* ─────────────────────────  SLEEP / ASI / DIAPER  ───────────────────────── */
function SleepTab({ sleep, setSleep }) {
  const [open, setOpen] = useState(false);
  const sorted = useMemo(() => [...sleep].sort((a, b) => b.date.localeCompare(a.date)), [sleep]);
  return (
    <div className="fade">
      <SectionTitle title="Tidur, ASI & Popok" sub={`${sleep.length} hari tercatat`} />
      <button onClick={() => setOpen(true)} style={{ ...saveBtn, marginTop: 0, marginBottom: 16,
        background: `linear-gradient(135deg,${C.lilac},#A98FBE)`, boxShadow: "0 8px 20px rgba(169,143,190,0.3)" }}>
        <Plus size={19} /> Tambah Log Harian
      </button>
      {sorted.length === 0 && <Empty text="Catat pola tidur, menyusui & popok si kecil di sini 🌙" />}
      {sorted.map((s) => (
        <Card key={s.id} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div className="fr" style={{ fontSize: 16, fontWeight: 600 }}>{fmtTanggal(s.date)}</div>
            <button onClick={() => setSleep(sleep.filter((x) => x.id !== s.id))}
              style={{ border: "none", background: "none", cursor: "pointer", color: C.plum2 }}>
              <Trash2 size={16} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <Mini ic={Moon} c={C.lilac} label="Tidur" v={s.sleepHours ? `${s.sleepHours} jam` : "-"} />
            <Mini ic={Milk} c={C.sageDk} label="ASI/Sufor" v={s.asi ? `${s.asi}x` : "-"} />
            <Mini ic={Clock} c={C.peach} label="Pompa ASI" v={s.pump ? `${s.pump} ml` : "-"} />
            <Mini ic={Baby} c={C.rose} label="Popok" v={`💧${s.wet || 0} · 💩${s.dirty || 0}`} />
          </div>
          {s.note && <div style={{ fontSize: 12, color: C.plum2, fontStyle: "italic", marginTop: 9 }}>📝 {s.note}</div>}
        </Card>
      ))}
      {open && <SleepForm onClose={() => setOpen(false)}
        onSave={(e) => { setSleep([e, ...sleep]); setOpen(false); }} />}
    </div>
  );
}
const Mini = ({ ic: Ic, c, label, v }) => (
  <div style={{ background: C.cream, borderRadius: 13, padding: "10px 12px", display: "flex", alignItems: "center", gap: 9 }}>
    <Ic size={17} color={c} />
    <div>
      <div style={{ fontSize: 10.5, color: C.plum2, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{v}</div>
    </div>
  </div>
);
function SleepForm({ onClose, onSave }) {
  const [f, setF] = useState({ date: todayISO(), sleepHours: "", asi: "", pump: "", wet: "", dirty: "", note: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal onClose={onClose} title="Log Tidur, ASI & Popok">
      <Field label="Tanggal" type="date" value={f.date} onChange={set("date")} />
      <Field label="🌙 Total Tidur (jam)" type="number" step="0.5" value={f.sleepHours} onChange={set("sleepHours")} placeholder="13" />
      <Field label="🍼 ASI / Sufor (berapa kali)" type="number" value={f.asi} onChange={set("asi")} placeholder="8" />
      <Field label="🥛 Pompa ASI (ml)" type="number" value={f.pump} onChange={set("pump")} placeholder="150" />
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="💧 Popok Basah" type="number" value={f.wet} onChange={set("wet")} placeholder="7" /></div>
        <div style={{ flex: 1 }}><Field label="💩 Popok Kotor" type="number" value={f.dirty} onChange={set("dirty")} placeholder="3" /></div>
      </div>
      <Field label="📝 Catatan" value={f.note} onChange={set("note")} placeholder="Tidur nyenyak" />
      <button onClick={() => onSave({ id: uid(), ...f })}
        style={{ ...saveBtn, background: `linear-gradient(135deg,${C.lilac},#A98FBE)` }}>
        <Check size={19} /> Simpan Log
      </button>
    </Modal>
  );
}

/* ─────────────────────────  PRIMITIVES  ───────────────────────── */
function SectionTitle({ title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h2 className="fr" style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{title}</h2>
      {sub && <p style={{ margin: "2px 0 0", fontSize: 13, color: C.plum2 }}>{sub}</p>}
    </div>
  );
}
function Empty({ text }) {
  return (
    <Card style={{ textAlign: "center", padding: "30px 20px", background: C.cream, border: `1.5px dashed ${C.line}` }}>
      <p style={{ margin: 0, fontSize: 13.5, color: C.plum2, lineHeight: 1.5 }}>{text}</p>
    </Card>
  );
}
function Modal({ children, onClose, title }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(74,51,64,0.4)",
      backdropFilter: "blur(3px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} className="rise"
        style={{ background: C.cream, width: "100%", maxWidth: 460, maxHeight: "92vh", overflowY: "auto",
          borderTopLeftRadius: 26, borderTopRightRadius: 26,
          padding: "20px 18px calc(40px + env(safe-area-inset-bottom, 0px))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="fr" style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>
          <button onClick={onClose} style={{ border: "none", background: C.white, borderRadius: 11, width: 36, height: 36,
            display: "grid", placeItems: "center", cursor: "pointer", color: C.plum }}>
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
const saveBtn = {
  width: "100%", border: "none", borderRadius: 15, background: `linear-gradient(135deg,${C.rose},${C.roseDk})`,
  color: "#fff", padding: "14px", fontSize: 15.5, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6,
  boxShadow: "0 8px 20px rgba(199,100,131,0.32)",
};
