"use client";

import abt from "@/assets/images/abt.svg";
import Image from "next/image";

const Privacy = () => {
  return (
    <>
      <section className="relative w-full py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-8">
            <div className="scroll-animate slide-in-left">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Fast Print Guys <span>Privacy Policy</span>
              </h1>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 float"></div>
              <Image
                src={abt}
                alt="About Fast Print Guys"
                className="relative w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6 text-justify leading-relaxed">
              <h2 className="text-2xl font-bold mb-4">
                Fast Print Guys Privacy Policy
              </h2>

              <h3 className="text-xl font-semibold">
                Types of Information We Collect:
              </h3>
              <p>
                1. <strong>Personal Information</strong> refers to data that can
                be used to identify or contact you, such as your name, address,
                telephone number, and email address, along with other non-public
                information that can be associated or linked with personally
                identifiable data.
              </p>
              <p>
                <strong>Anonymous Information</strong> refers to data that is
                not linked to your Personal Information and cannot be used on
                its own to identify individuals.
              </p>
              <p>
                Fast Print Guys collects both Personal and Anonymous Information
                in order to: (i) operate, maintain, and enhance our services;
                (ii) communicate with you about your account or transactions;
                (iii) inform you about updates to our services or policies; (iv)
                send promotions or offers; (v) personalize your experience on
                our platform; (vi) identify and investigate unlawful or
                prohibited activities; (vii) maintain and improve customer
                service and support operations; and (viii) fulfill other
                purposes outlined in this policy.
              </p>

              <h3 className="text-xl font-semibold">
                2. How We Collect Your Information
              </h3>
              <p>
                <strong>Information You Provide:</strong> You are not required
                to submit Personal Information to use our website. However,
                creating an account or using select features may require you to
                share contact and financial information, such as your credit
                card or bank details, which are used to process payments and
                manage your account.
              </p>
              <p>
                Additional data we may collect includes: location data,
                preferences, feedback, forum participation, device info,
                cookies, SMS alerts, and more.
              </p>

              <h3 className="text-xl font-semibold">
                Information Collected Automatically:
              </h3>
              <p>
                Our servers and third-party tools automatically collect
                technical data (browser type, IP, device info, geolocation). We
                use log files, cookies, pixel tags, and analytics to improve
                services. Users may manage cookies and Do Not Track settings in
                their browsers.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-justify leading-relaxed">
              <p>
                These vendors are contractually bound to use the data solely for
                service provision to Fast Print Guys.
              </p>

              <h3 className="text-xl font-semibold">
                3. How We Use and Share Information
              </h3>
              <p>
                Data may be used to create accounts, authenticate users,
                communicate order details, send promotions, and improve service.
                Testimonials and forum posts may be public. Anonymous data may
                be shared for analytics. Third-party vendors may process
                payments, logistics, and technical support.
              </p>

              <h3 className="text-xl font-semibold">
                4. Content Access Control
              </h3>
              <p>
                Your content remains private unless you choose otherwise.
                Employees or service providers may access content for quality
                and support purposes.
              </p>

              <h3 className="text-xl font-semibold">
                5. Keeping Your Information Updated
              </h3>
              <p>
                You can update your account details via your profile or by
                contacting support. Requests for data review, correction, or
                deletion can be made at{" "}
                <a
                  href="mailto:support@fastprintguys.com"
                  className="text-blue-600 underline"
                >
                  support@fastprintguys.com
                </a>
                .
              </p>

              <h3 className="text-xl font-semibold">6. Third-Party Links</h3>
              <p>
                External links are provided for convenience. We are not
                responsible for third-party privacy practices.
              </p>

              <h3 className="text-xl font-semibold">7. Your Choices</h3>
              <p>
                Users may opt out of promotional emails, manage cookie
                preferences, request data deletion, and update account settings.
              </p>

              <h3 className="text-xl font-semibold">8. Data Security</h3>
              <p>
                We use SSL encryption, secure servers, daily backups, and
                vulnerability assessments. No method is 100% secure, so users
                should use strong passwords and enable MFA.
              </p>

              <h3 className="text-xl font-semibold">
                9–12. Rights & Jurisdiction
              </h3>
              <p>
                California residents have CCPA rights. Children under 16 are
                restricted. Policy updates may occur, and by using our site, you
                agree to U.S. law.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Privacy;
