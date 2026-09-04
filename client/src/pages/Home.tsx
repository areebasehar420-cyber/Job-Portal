/* LumaHire Editorial Signal: left-anchored editorial layout, warm paper cards, and motion kept purposeful. */
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Filter,
  MapPin,
  Menu,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const jobs = [
  { id: 1, title: "Senior Product Designer", company: "Northstar Labs", location: "New York · Hybrid", salary: "$145k – $175k", type: "Full-time", exp: "5+ years", posted: "2d ago", color: "#E7E7FF", monogram: "N" },
  { id: 2, title: "Frontend Engineer", company: "Alto Systems", location: "Remote · US", salary: "$130k – $160k", type: "Full-time", exp: "3+ years", posted: "4d ago", color: "#E3F4ED", monogram: "A" },
  { id: 3, title: "Brand Marketing Lead", company: "Common Thread", location: "Austin · Hybrid", salary: "$110k – $138k", type: "Full-time", exp: "4+ years", posted: "1w ago", color: "#FFF0D9", monogram: "C" },
  { id: 4, title: "Customer Success Manager", company: "Morrow Health", location: "Boston · On-site", salary: "$92k – $118k", type: "Full-time", exp: "2+ years", posted: "1w ago", color: "#F2E4F7", monogram: "M" },
];

const categories = ["Design & Creative", "Engineering", "Marketing", "Product", "Customer Success", "Operations"];

function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="logo" aria-label="LumaHire home"><span className="logo-mark"><span /></span>{!compact && <span className="logo-word">Luma<span>Hire</span></span>}</Link>;
}

function Nav({ onMenu }: { onMenu: () => void }) {
  return <header className="site-header"><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/jobs">Find jobs</Link><Link href="/companies">Companies</Link><Link href="/resources">Career resources</Link></nav><div className="header-actions"><button className="text-button" onClick={() => toast("Login is ready for the next connection step.")}>Log in</button><button className="nav-cta" onClick={() => toast("Account creation is coming next.")}>Create account <ArrowRight size={15} /></button><button className="mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={22} /></button></div></div></header>;
}

function SearchPanel({ onSearch }: { onSearch: (query: string) => void }) {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  return <div className="search-panel"><div className="search-fields"><label><span><Search size={17} /> What are you looking for?</span><input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job title, skill or company" /></label><div className="field-divider" /><label><span><MapPin size={17} /> Where?</span><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, state or remote" /></label></div><button className="search-button" onClick={() => onSearch(role || "all")}>Find my next role <ArrowRight size={17} /></button></div>;
}

function JobCard({ job, saved, onSave }: { job: typeof jobs[number]; saved: boolean; onSave: () => void }) {
  return <article className="job-card"><div className="job-card-top"><div className="company-logo" style={{ background: job.color }}>{job.monogram}</div><button className={`save-button ${saved ? "saved" : ""}`} aria-label={saved ? "Remove saved job" : "Save job"} onClick={onSave}>{saved ? <Check size={17} /> : <Bookmark size={17} />}</button></div><div className="job-card-copy"><p className="eyebrow">{job.company}</p><h3>{job.title}</h3><p className="job-location"><MapPin size={14} /> {job.location}</p></div><div className="job-meta"><span>{job.salary}</span><span>{job.type}</span><span>{job.exp}</span></div><div className="job-card-footer"><span className="posted"><Clock3 size={14} /> {job.posted}</span><button className="apply-link" onClick={() => toast(`Application flow opened for ${job.title}.`)}>See the role <ArrowRight size={15} /></button></div></article>;
}

export default function Home() {
  const [location] = useLocation();
  const isJobs = location === "/jobs";
  const [saved, setSaved] = useState<number[]>([]);
  const [query, setQuery] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All roles");
  const filteredJobs = useMemo(() => query === "all" ? jobs : jobs.filter((job) => `${job.title} ${job.company}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const toggleSave = (id: number) => { setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); toast(saved.includes(id) ? "Removed from saved jobs." : "Saved for later."); };

  return <div className={`app-shell ${isJobs ? "jobs-page" : ""}`}><Nav onMenu={() => setMobileOpen(!mobileOpen)} />{mobileOpen && <div className="mobile-drawer"><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button><Link href="/">Home</Link><Link href="/jobs">Find jobs</Link><Link href="/companies">Companies</Link><Link href="/resources">Career resources</Link></div>}
    <main>
      <section className="hero"><div className="hero-texture" /><div className="container hero-grid"><div className="hero-copy"><div className="kicker"><span className="kicker-dot" /> THE BETTER WAY TO WORK</div><h1>{isJobs ? <>Browse work with<br /><em>room to grow.</em></> : <>Find work that<br /><em>fits your life.</em></>}</h1><p>{isJobs ? "A considered index of open roles from teams building what matters next." : "Thoughtful opportunities from teams that care about the work — and the people doing it."}</p><div className="hero-trust"><div className="avatar-stack"><span>J</span><span>A</span><span>M</span><span>+</span></div><span>Join 48,000+ people making their next move</span></div></div><div className="hero-aside"><div className="aside-line" /><p>Curated roles.<br />Real possibility.</p><Sparkles size={21} /></div></div><div className="container search-wrap"><SearchPanel onSearch={(value) => { setQuery(value); document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" }); }} /></div></section>
      <section className="container proof-strip"><div><strong>12,400+</strong><span>open roles</span></div><div><strong>2,800+</strong><span>companies hiring</span></div><div><strong>89%</strong><span>candidate satisfaction</span></div><div className="proof-note"><span className="green-dot" /> New roles added daily</div></section>
      <section className={`container category-section ${isJobs ? "jobs-hide-on-directory" : ""}`}><div className="section-heading"><div><p className="section-label">EXPLORE BY FOCUS</p><h2>Find your kind of work.</h2></div><Link href="/jobs" className="underlined-link">View all categories <ArrowRight size={16} /></Link></div><div className="category-list">{categories.map((category, index) => <button key={category} className={`category-chip ${activeCategory === category ? "active" : ""}`} onClick={() => { setActiveCategory(category); toast(`${category} roles selected.`); }}><span className={`category-icon icon-${index}`}><Compass size={18} /></span>{category}<ArrowRight size={15} /></button>)}</div></section>
      <section className="featured-section" id="featured"><div className="container"><div className="section-heading featured-heading"><div><p className="section-label">A FEW GOOD PLACES</p><h2>Roles worth a closer look.</h2></div><div className="sort-control"><span>Sort by</span><button onClick={() => toast("Sort options are ready for the next step.")}>Most relevant <ChevronDown size={15} /></button></div></div><div className="jobs-layout"><aside className={`filter-sidebar ${filterOpen ? "open" : ""}`}><div className="filter-head"><span>Filter roles</span><button onClick={() => setFilterOpen(false)}><X size={18} /></button></div>{["Job type", "Location", "Experience", "Work style", "Salary range"].map((item) => <button className="filter-row" key={item} onClick={() => toast(`${item} filter selected.`)}>{item}<ChevronDown size={16} /></button>)}<div className="filter-tip"><Sparkles size={16} /><p><strong>Not sure where to start?</strong> Try searching for a skill you enjoy using.</p></div></aside><div className="jobs-column"><div className="mobile-filter-row"><span>{filteredJobs.length} roles found</span><button onClick={() => setFilterOpen(true)}><Filter size={16} /> Filters</button></div>{filteredJobs.length ? filteredJobs.map((job) => <JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={() => toggleSave(job.id)} />) : <div className="empty-state"><Search size={24} /><h3>No roles found yet.</h3><p>Try a different job title or company.</p></div>}<button className="load-more" onClick={() => toast("More roles are coming soon.")}>Load more roles <ArrowRight size={16} /></button></div></div></div></section>
      <section className={`container steps-section ${isJobs ? "jobs-hide-on-directory" : ""}`}><div className="steps-intro"><p className="section-label">HOW IT WORKS</p><h2>A clearer path<br />to your next chapter.</h2><p>We make the search feel less like a chore and more like a step forward.</p></div><div className="step-list"><div className="step"><span>01</span><div><h3>Get specific</h3><p>Search by the work you want to do, the skills you have, or the life you want to build around it.</p></div></div><div className="step"><span>02</span><div><h3>Find your fit</h3><p>Explore honest details, thoughtful teams, and roles curated for more than just keywords.</p></div></div><div className="step"><span>03</span><div><h3>Make your move</h3><p>Save the good ones, apply with confidence, and take the next step on your terms.</p></div></div></div></section>
      <section className={`cta-section container ${isJobs ? "jobs-hide-on-directory" : ""}`}><div><div className="cta-mark"><Sparkles size={20} /></div><p className="section-label">FOR THOUGHTFUL TALENT</p><h2>Your next move<br /><em>starts here.</em></h2><p>Build a profile once. Let the right opportunities find you.</p></div><button onClick={() => toast("Profile setup is coming next.")}>Create your profile <ArrowRight size={17} /></button></section>
    </main><footer className="site-footer"><div className="container footer-inner"><div><Logo /><p>Work, with intention.</p></div><div className="footer-links"><div><strong>Explore</strong><Link href="/jobs">Find jobs</Link><Link href="/companies">Companies</Link></div><div><strong>For teams</strong><button onClick={() => toast("Employer tools are coming soon.")}>Post a job</button><button onClick={() => toast("Employer tools are coming soon.")}>Hiring resources</button></div><div><strong>Connect</strong><button onClick={() => toast("About LumaHire is coming soon.")}>About us</button><button onClick={() => toast("Contact is coming soon.")}>Contact</button></div></div></div><div className="container footer-bottom"><span>© 2026 LumaHire</span><span>Made for the next good thing.</span></div></footer>
  </div>;
}
