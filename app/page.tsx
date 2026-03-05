import Image from "next/image";

const trustPoints = [
  "Preschool - 8th Grade",
  "STEM, Fine Arts & Athletics",
  "Safe & Structured Campus",
  "Faith-Based Academic Excellence",
];

const valueColumns = [
  {
    title: "Christ-Centered Foundation",
    description:
      "Biblical values are integrated into daily learning, helping students develop strong character and faith.",
  },
  {
    title: "Strong Academics + STEM",
    description:
      "Hands-on learning, STEM enrichment, and personalized instruction prepare students for long-term success.",
  },
  {
    title: "Safe & Nurturing Environment",
    description:
      "A structured, caring campus where students feel secure, supported, and encouraged.",
  },
];

const programHighlights = [
  "STEM & Innovation Programs",
  "Fine Arts Program",
  "Athletic Program",
  "Community Service Initiatives",
  "Summer Camp Opportunities",
];

const testimonials = [
  {
    quote:
      "WOLCA has been an incredible blessing for our family. Our child has grown academically and spiritually in ways we never expected.",
    name: "Rachel M.",
    detail: "Parent of 3rd Grade Student",
    source: "Source: Parent Interview",
  },
  {
    quote:
      "The small class sizes made all the difference. Teachers know our son by name and challenge him in the right ways.",
    name: "David & Alyssa T.",
    detail: "Parent of 6th Grade Student",
    source: "Source: Google Review",
  },
  {
    quote:
      "We wanted a safe, structured, Christ-centered school. WOLCA gave us that and a caring community we trust deeply.",
    name: "Monica L.",
    detail: "Parent of K5 Student",
    source: "Source: Campus Tour Feedback",
  },
];

const tuitionHighlights = [
  "Grade-level tuition options for Preschool and K5-8th Grade",
  "Transparent enrollment and payment process",
  "Financial assistance options may be available",
];

const navItems = [
  { href: "#why", label: "Why WOLCA" },
  { href: "#programs", label: "Programs" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#tuition", label: "Tuition" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-muted text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-navy/95 backdrop-blur">
        <div className="content-wrap flex items-center justify-between py-4">
          <a href="#top" className="inline-flex items-center">
            <Image
              src="/images/logo.png"
              alt="Word of Life Christian Academy logo"
              width={1016}
              height={304}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </a>
          <nav aria-label="Primary navigation" className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-200 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#tour-form" className="btn-primary hidden sm:inline-flex">
            Schedule a Tour
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-brand-navy text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,178,51,0.25),transparent_45%)]" />
          <div className="content-wrap section-pad relative grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-slate-100 uppercase">
                Springfield Private Christian School
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                A Christ-Centered Education Where Students Thrive
              </h1>
              <p className="max-w-xl text-base text-slate-200 sm:text-lg">
                Serving Springfield families with small class sizes, strong
                academics, STEM programs, and a safe, nurturing Christian
                environment from Preschool through 8th Grade.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a href="#tour-form" className="btn-primary w-full sm:w-auto">
                  Schedule Your Private Tour
                </a>
                <a
                  href="/wolca-tuition-information.txt"
                  download
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  Download Tuition Information
                </a>
              </div>
              <ul className="grid gap-3 pt-4 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-slate-100"
                  >
                    <span aria-hidden="true" className="text-brand-gold">
                      &#10003;
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="card-surface overflow-hidden border-white/20 bg-white/10 backdrop-blur-sm">
                <Image
                  src="/wolca-hero.svg"
                  alt="Students learning together at Word of Life Christian Academy"
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="bg-white section-pad">
          <div className="content-wrap">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold tracking-wide text-brand-navy uppercase">
                Why Families Choose WOLCA
              </p>
              <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
                More Than a School - A Foundation for Life
              </h2>
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                At Word of Life Christian Academy, education goes beyond
                textbooks. We combine academic excellence with biblical truth to
                help students grow intellectually, spiritually, and socially.
                Our small class sizes ensure every child is known, supported,
                and challenged to reach their full potential.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {valueColumns.map((column, index) => (
                <article key={column.title} className="card-surface p-6">
                  <p className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                    0{index + 1}
                  </p>
                  <h3 className="text-xl font-bold text-brand-navy">
                    {column.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {column.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="section-pad bg-surface-muted">
          <div className="content-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wide text-brand-navy uppercase">
                Programs
              </p>
              <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
                Developing Confident, Capable Young Leaders
              </h2>
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                From our STEM initiatives to fine arts and athletics, students
                at WOLCA receive a balanced education that prepares them
                academically and personally.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {programHighlights.map((program) => (
                  <li
                    key={program}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy"
                  >
                    <span aria-hidden="true" className="text-brand-gold">
                      &#9679;
                    </span>
                    {program}
                  </li>
                ))}
              </ul>
              <a href="#tour-form" className="btn-primary mt-6">
                See It In Action - Schedule a Tour
              </a>
            </div>
            <div className="card-surface overflow-hidden">
              <Image
                src="/wolca-programs.svg"
                alt="Program highlights including STEM, fine arts, and athletics"
                width={960}
                height={920}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-white section-pad">
          <div className="content-wrap">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold tracking-wide text-brand-navy uppercase">
                Trusted by Springfield Families
              </p>
              <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
                What Springfield Families Are Saying
              </h2>
              <p className="text-base text-slate-700 sm:text-lg">
                Families consistently share how their children gain confidence,
                character, and academic strength at WOLCA.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="card-surface p-6">
                  <p className="text-sm leading-relaxed text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="font-semibold text-brand-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600">{testimonial.detail}</p>
                    <p className="mt-2 text-xs font-semibold tracking-wide text-brand-navy uppercase">
                      {testimonial.source}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tuition" className="section-pad bg-brand-navy text-white">
          <div className="content-wrap grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wide text-brand-gold uppercase">
                Tuition & Enrollment
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Investing in Your Child&apos;s Future
              </h2>
              <p className="max-w-xl text-base text-slate-200 sm:text-lg">
                We believe in transparency and partnership with families.
                Tuition varies by grade level, with options available for
                Preschool and K5-8th Grade. Financial assistance options may be
                available.
              </p>
              <ul className="space-y-3 pt-2">
                {tuitionHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-slate-100">
                    <span className="text-brand-gold" aria-hidden="true">
                      &#10003;
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <a href="#tour-form" className="btn-primary w-full sm:w-auto">
                  View Tuition & Schedule a Tour
                </a>
                <a
                  href="#testimonials"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  Read Family Success Stories
                </a>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/20 bg-brand-navy-strong/85 p-6 text-slate-100 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold tracking-wide text-brand-gold uppercase">
                Enrollment Snapshot
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                Limited seats in select grades
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Families are encouraged to schedule a private tour early to
                discuss grade availability and enrollment timelines.
              </p>
              <div className="mt-6 space-y-3 border-t border-white/20 pt-6 text-sm text-slate-100">
                <p>Preschool and K5-8th Grade admissions support</p>
                <p>Personalized enrollment guidance</p>
                <p>Faith-based academic roadmap discussion</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="tour-form" className="section-pad bg-surface-muted">
          <div className="content-wrap grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <p className="text-sm font-semibold tracking-wide text-brand-navy uppercase">
                Final Step
              </p>
              <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
                Experience the WOLCA Difference
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                Give your child a safe, Christ-centered education that builds
                faith, character, and academic excellence.
              </p>
              <a href="#tour-form" className="btn-primary">
                Schedule Your Private Tour Today
              </a>
            </div>
            <div className="card-surface p-6 sm:p-8">
              <h3 className="text-xl font-bold text-brand-navy">
                Request a Private Tour
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Submit your details and our admissions team will contact you.
              </p>
              <form className="mt-6 grid gap-4" action="#">
                <label className="grid gap-1 text-sm font-semibold text-brand-navy">
                  Parent Name
                  <input
                    required
                    type="text"
                    name="name"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-brand-navy">
                  Email Address
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-brand-navy">
                  Student Grade Interest
                  <select
                    name="grade"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
                    defaultValue="Preschool"
                  >
                    <option>Preschool</option>
                    <option>K5</option>
                    <option>1st Grade</option>
                    <option>2nd Grade</option>
                    <option>3rd Grade</option>
                    <option>4th Grade</option>
                    <option>5th Grade</option>
                    <option>6th Grade</option>
                    <option>7th Grade</option>
                    <option>8th Grade</option>
                  </select>
                </label>
                <button type="submit" className="btn-primary w-full">
                  Schedule Your Private Tour Today
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="content-wrap py-6 text-center text-sm text-slate-600">
          Word of Life Christian Academy - Springfield, MO
        </div>
      </footer>
    </div>
  );
}
