// Demo data (nakli). Baad mein ye Express + MongoDB API se aayega.
export const riskOf = (days) => (days >= 9 ? "critical" : days >= 8 ? "high" : "moderate");

export const RISK = {
  critical: { label: "Critical Churn", cls: "bg-rose-500/15 border-rose-500/20 text-rose-400" },
  high: { label: "High Risk", cls: "bg-amber-500/15 border-amber-500/20 text-amber-400" },
  moderate: { label: "Moderate Risk", cls: "bg-amber-500/15 border-amber-500/20 text-amber-400" },
};

export const initials = (name) => name.split(" ").map((w) => w[0]).join("");
export const stats = { target: 20 };
export const FEE = 4000; // monthly fee (PKR)

const risky = [
  ["Bilal Farooq", "0321-9923145", 12], ["Hamza Abbasi", "0300-8274192", 9],
  ["Mustafa Qureshi", "0315-7782190", 8], ["Zainab Merchant", "0333-2894101", 7],
  ["Ayesha Siddiqui", "0345-2109843", 6], ["Usman Sheikh", "0300-1112233", 11],
  ["Sana Malik", "0321-4445566", 10], ["Faizan Ali", "0333-7778899", 8],
  ["Hira Khan", "0345-1234567", 7], ["Danish Memon", "0300-9876543", 7],
  ["Maryam Raza", "0315-5551212", 6], ["Talha Baig", "0321-3332211", 6],
  ["Noor Fatima", "0333-6667788", 6], ["Saad Ahmed", "0345-8889900", 6],
];
const healthy = ["Ali Raza", "Ahmed Khan", "Sara Iqbal", "Omar Farooqi", "Kamran Shah", "Iqra Javed",
  "Bilquis Rizvi", "Junaid Hashmi", "Fatima Zahra", "Hassan Mirza", "Rida Anwar", "Shahzaib Lodhi",
  "Mehwish Tariq", "Adeel Chaudhry", "Laiba Siddiqui", "Zeeshan Butt", "Anum Qazi", "Rehan Soomro",
  "Komal Ansari", "Faraz Hussain", "Dua Naseem", "Imran Dar", "Sidra Bhatti", "Waqas Pervez", "Kiran Nadeem", "Yasir Rauf"];
const prefixes = ["0300", "0321", "0333", "0345", "0315"];
const phone = (i) => `${prefixes[i % 5]}-${String(1000000 + ((i + 3) * 1234567) % 9000000)}`;
const expiries = [3, 25, 12, 1, 18, 6, 30, 2, 9, 14, 5, 22, 40, 4];

export const seedMembers = [
  ...risky.map(([name, ph, days], i) => ({
    id: i, name, phone: ph, days, today: false, usual: 3 + (i % 3), week: days >= 9 ? 0 : 1,
    month: 3 + (i % 4), streak: 0, expiry: expiries[i],
  })),
  ...healthy.map((name, j) => {
    const i = risky.length + j;
    const days = j % 2 === 0 ? 0 : (j % 3) + 1;
    return {
      id: i, name, phone: phone(i), days, today: days === 0, usual: 3 + (j % 3), week: 2 + (j % 3),
      month: 6 + (j % 9), streak: 1 + (j % 9), expiry: j % 9 === 0 ? 2 + (j % 5) : 8 + ((j * 7) % 30),
    };
  }),
];

export const seedFollowups = [
  ...seedMembers.filter((m) => m.days >= 6).sort((a, b) => b.days - a.days).slice(0, 8)
    .map((m) => ({ memberId: m.id, status: "pending", note: "", next: "" })),
  ...seedMembers.filter((m) => m.days < 6).slice(0, 3)
    .map((m) => ({ memberId: m.id, status: "returned", note: "Call ke baad wapas aaya", next: "" })),
];
