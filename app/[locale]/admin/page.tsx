import { TrendingUp, ShoppingCart, Users, Package, ArrowUp, ArrowDown, Clock, CheckCircle2, Truck, XCircle, Eye } from "lucide-react";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

const kpis = [
    { label: "Revenus du mois", value: "1 248 500 FCFA", change: "+12.4%", up: true, icon: TrendingUp },
    { label: "Commandes totales", value: "324", change: "+8.2%", up: true, icon: ShoppingCart },
    { label: "Clients actifs", value: "189", change: "+5.1%", up: true, icon: Users },
    { label: "Produits en stock", value: "42", change: "-3", up: false, icon: Package },
];

const recentOrders = [
    { id: "#BF-0324", customer: "Marie Kamga", date: "21 Fév 2026", status: "Livré", total: "18 500" },
    { id: "#BF-0323", customer: "Jean-Paul Mbu", date: "21 Fév 2026", status: "En cours", total: "32 000" },
    { id: "#BF-0322", customer: "Rose Ndikum", date: "20 Fév 2026", status: "En attente", total: "8 750" },
    { id: "#BF-0321", customer: "Alain Fotso", date: "20 Fév 2026", status: "Livré", total: "45 200" },
    { id: "#BF-0320", customer: "Bernadette Elong", date: "19 Fév 2026", status: "Annulé", total: "12 000" },
    { id: "#BF-0319", customer: "Michel Tagne", date: "19 Fév 2026", status: "Livré", total: "27 000" },
    { id: "#BF-0318", customer: "Solange Biyong", date: "18 Fév 2026", status: "En cours", total: "19 500" },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
    "Livré": { color: "text-neon-green bg-neon-green/10 border-neon-green/30", icon: CheckCircle2 },
    "En cours": { color: "text-blue-400 bg-blue-400/10 border-blue-400/30", icon: Truck },
    "En attente": { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30", icon: Clock },
    "Annulé": { color: "text-neon-red bg-neon-red/10 border-neon-red/30", icon: XCircle },
};

const topProducts = [
    { emoji: "🥜", name: "Pâte d'Arachide 500g", sales: 87, revenue: "392 000 FCFA" },
    { emoji: "🌽", name: "Farine de Maïs 1kg", sales: 65, revenue: "227 500 FCFA" },
    { emoji: "🍅", name: "Concentré de Tomate", sales: 54, revenue: "162 000 FCFA" },
    { emoji: "🌿", name: "Nkui Premium", sales: 42, revenue: "294 000 FCFA" },
];

export default function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const barData = [40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 88, 100];
    const months = ["Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc", "Jan", "Fév"];

    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="container-max px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <span className="text-xs text-neon-red font-heading font-semibold uppercase tracking-widest">Administration</span>
                        <h1 className="font-heading font-black text-4xl lg:text-5xl text-foreground mt-1">
                            Tableau de <span className="neon-text-red">Bord</span>
                        </h1>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-xl border border-border bg-card">
                        <Clock className="w-4 h-4" />
                        Mis à jour le 21 Fév 2026
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {kpis.map(({ label, value, change, up, icon: Icon }) => (
                        <div key={label} className="p-6 rounded-2xl border border-border bg-card hover:border-neon-red/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-neon-red/10">
                                    <Icon className="w-5 h-5 text-neon-red" />
                                </div>
                                <span className={`flex items-center gap-0.5 text-xs font-heading font-bold px-2 py-1 rounded-full ${up ? "text-neon-green bg-neon-green/10" : "text-neon-red bg-neon-red/10"}`}>
                                    {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                    {change}
                                </span>
                            </div>
                            <p className="font-heading font-black text-xl text-foreground mb-1">{value}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Revenue chart */}
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading font-black text-foreground text-xl">Revenus mensuels</h2>
                            <span className="text-xs text-muted-foreground border border-border px-3 py-1 rounded-full">12 derniers mois</span>
                        </div>
                        {/* Bar chart visualisation */}
                        <div className="flex items-end gap-2 h-40">
                            {barData.map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full rounded-t-lg bg-neon-red/30 hover:bg-neon-red/60 transition-colors cursor-pointer"
                                        style={{ height: `${(h / 100) * 140}px` }}
                                        title={`${months[i]}: ${h}%`}
                                    />
                                    <span className="text-[9px] text-muted-foreground hidden sm:block">{months[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top products */}
                    <div className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="font-heading font-black text-foreground text-xl mb-6">Top produits</h2>
                        <div className="space-y-4">
                            {topProducts.map(({ emoji, name, sales, revenue }) => (
                                <div key={name} className="flex items-center gap-3">
                                    <span className="text-2xl">{emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-heading font-bold text-foreground text-xs truncate">{name}</p>
                                        <p className="text-[10px] text-muted-foreground">{sales} ventes · {revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orders table */}
                <div className="p-6 rounded-2xl border border-border bg-card overflow-x-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-heading font-black text-foreground text-xl">Commandes récentes</h2>
                        <span className="text-xs text-neon-red font-heading font-semibold uppercase tracking-widest cursor-pointer hover:underline">
                            Tout voir →
                        </span>
                    </div>

                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="text-left text-xs text-muted-foreground uppercase tracking-widest border-b border-border">
                                <th className="pb-3 pr-4 font-heading">N° Commande</th>
                                <th className="pb-3 pr-4 font-heading">Client</th>
                                <th className="pb-3 pr-4 font-heading">Date</th>
                                <th className="pb-3 pr-4 font-heading">Statut</th>
                                <th className="pb-3 pr-4 font-heading text-right">Total</th>
                                <th className="pb-3 font-heading text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentOrders.map(({ id, customer, date, status, total }) => {
                                const cfg = statusConfig[status] ?? statusConfig["En attente"];
                                const StatusIcon = cfg.icon;
                                return (
                                    <tr key={id} className="hover:bg-muted/30 transition-colors">
                                        <td className="py-4 pr-4">
                                            <span className="font-heading font-black text-neon-red text-sm">{id}</span>
                                        </td>
                                        <td className="py-4 pr-4 text-sm font-medium text-foreground">{customer}</td>
                                        <td className="py-4 pr-4 text-xs text-muted-foreground">{date}</td>
                                        <td className="py-4 pr-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-semibold border ${cfg.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-right font-heading font-black text-sm text-foreground">
                                            {total} <span className="text-[10px] font-normal text-muted-foreground">FCFA</span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-neon-red transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
