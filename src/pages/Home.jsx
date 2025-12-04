import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home({ user }) {
  // 🌿 IMAGE SLIDER DATA
  const sliderImages = [
    {
      image:
        "https://st4.depositphotos.com/25985398/39496/i/450/depositphotos_394965726-stock-photo-professional-women-lawyers-work-law.jpg",
      title: "Justice Should Never Be A Privilege",
      message:
        "Every voice matters. Every citizen deserves equal access to justice, support, and legal awareness.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=60",
      title: "Empowering Communities, One Case at a Time",
      message:
        "When citizens, lawyers and NGOs unite, justice becomes a reality — not a distant dream.",
    },
    {
      image:
        "https://previews.123rf.com/images/olivier26/olivier261810/olivier26181000018/111832907-legal-symbol-with-scales-of-justice-golden-sign-embossed-on-black-paper-background-3d-illustration.jpg",
      title: "Your Rights Matter. Your Story Matters.",
      message:
        "No one should fight alone. Together, we stand for fairness, dignity, and human rights.",
    },
    {
      image:
        "https://www.esade.edu/wp-content/uploads/2024/07/abogado-asesorando-pareja.jpg",
      title: "A Platform Built for Hope and Change",
      message:
        "Connecting citizens to legal support and social organizations who truly care.",
    },
  ];

  // 🌿 SLIDER STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🌿 AUTO SLIDER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // 🌿 UI STARTS HERE
  return (
    <div className="w-full">
      {/* 🌿 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT SIDE → TITLE + NAV LINKS */}
          <div className="flex items-center space-x-10">
            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-wide drop-shadow-sm hover:opacity-90 transition">
              LegalAid Connect
            </h1>

            {/* NAV LINKS */}
            <div className="hidden md:flex space-x-8 text-lg font-medium">
              <Link
                className="text-gray-700 hover:text-blue-700 transition"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-700 hover:text-blue-700 transition"
                to="/About"
              >
                About
              </Link>
              <Link
                className="text-gray-700 hover:text-blue-700 transition"
                to="/Services"
              >
                Services
              </Link>
              <Link
                className="text-gray-700 hover:text-blue-700 transition"
                to="/Contact"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE → LOGIN + REGISTER BUTTONS */}
          <div className="flex items-center space-x-4 ml-auto">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 border border-blue-600 text-blue-700 bg-white rounded-md shadow hover:bg-blue-50 transition font-semibold"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <Link
                to="/profile"
                className="px-5 py-2 bg-blue-100 text-blue-900 border border-blue-300 rounded-md shadow hover:bg-blue-200 transition"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🌿 HERO SECTION WITH AUTO SLIDER */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${sliderImages[currentSlide].image})`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold drop-shadow-lg leading-snug">
            {sliderImages[currentSlide].title}
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-xl">
            {sliderImages[currentSlide].message}
          </p>
        </div>
      </section>

      {/* 🌿 SOCIAL MESSAGE SECTION (Bright + Animated) */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 animate-fadeIn">
            Justice Is Everyone’s Right —{" "}
            <span className="text-blue-600">Not a Luxury</span>
          </h2>

          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed animate-fadeIn delay-200">
            Millions silently face injustice — wrongful arrests, domestic
            violence, exploitation and discrimination. Our mission is to bring
            citizens, lawyers and NGOs together to create a fairer, safer, more
            compassionate society.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp">
              <h3 className="text-2xl font-bold text-blue-700">
                ⚖️ Wrongful Arrests
              </h3>
              <p className="mt-4 text-gray-600">
                We help individuals who were unfairly detained or charged by
                connecting them with immediate legal support.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-green-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp delay-150">
              <h3 className="text-2xl font-bold text-green-700">
                💚 Domestic Violence
              </h3>
              <p className="mt-4 text-gray-600">
                Survivors deserve protection, guidance and justice. We connect
                them with NGOs and trusted legal experts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-red-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp delay-300">
              <h3 className="text-2xl font-bold text-red-700">
                🛑 Human Rights Abuse
              </h3>
              <p className="mt-4 text-gray-600">
                From discrimination to violence — we support communities
                fighting for their dignity and fundamental rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 SERVICE CARDS SECTION (Bright + Animated) */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-14 animate-fadeIn">
            How We Help Communities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Citizens */}
            <div className="bg-white rounded-3xl shadow-xl border border-blue-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-slideUp">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCA7R-zr5mHHCX6CdFFzGoC9dBIKnfVKi0dg&s"
                className="h-56 w-full object-cover rounded-t-3xl"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  For Citizens
                </h3>
                <p className="text-gray-700 mt-3">
                  We ensure every individual receives guidance and support in
                  their legal concerns.
                </p>
                <Link
                  className="mt-5 inline-block text-blue-700 font-semibold hover:underline"
                  to="/register"
                >
                  Get Support →
                </Link>
              </div>
            </div>

            {/* Lawyers */}
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-slideUp delay-200">
              <img
                src="https://www.lawpreptutorial.com/blog/wp-content/uploads/2024/05/karuna-nundy.jpg"
                className="h-56 w-full object-cover rounded-t-3xl"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  For Lawyers
                </h3>
                <p className="text-gray-700 mt-3">
                  Work on meaningful cases and help build a fairer justice
                  system through pro bono support.
                </p>
                <Link
                  className="mt-5 inline-block text-green-700 font-semibold hover:underline"
                  to="/register"
                >
                  Join as Lawyer →
                </Link>
              </div>
            </div>

            {/* NGOs */}
            <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-slideUp delay-300">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGeBlODmjwVUMF47IA4F0YDEuj7igdpnVTw&s"
                className="h-56 w-full object-cover rounded-t-3xl"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">For NGOs</h3>
                <p className="text-gray-700 mt-3">
                  Partner with us to promote awareness, rights education, and
                  legal empowerment.
                </p>
                <Link
                  className="mt-5 inline-block text-indigo-700 font-semibold hover:underline"
                  to="/register"
                >
                  Register NGO →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              LegalAid Connect 🌿
            </h2>
            <p className="mt-4 text-gray-400">
              We believe justice is a right, not a privilege. Our mission is to
              connect citizens, lawyers, and NGOs to make legal help accessible.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/services">
                  Our Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Get Help</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Connected
            </h3>
            <p className="text-gray-400 mb-4">
              Follow us for updates & awareness.
            </p>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-white">
                📘
              </a>
              <a href="#" className="hover:text-white">
                🐦
              </a>
              <a href="#" className="hover:text-white">
                📸
              </a>
              <a href="#" className="hover:text-white">
                🎥
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} LegalAid Connect. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
