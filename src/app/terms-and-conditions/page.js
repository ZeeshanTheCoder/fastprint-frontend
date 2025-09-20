"use client";

import portfolioImg from "@/assets/images/img75.png";
import Image from "next/image";

const Terms = () => {
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
                Fast Print Guys <span>Terms and Conditions</span>
              </h1>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 float"></div>
              <Image
                src={portfolioImg}
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
              <p>
                Fast Print Guys
                <br />
                2828 W Parker Rd, Ste B103
                <br />
                Plano, TX 75075
                <br />
                REVISED: [06/21/2024]
              </p>
              <p className="font-bold">
                PLEASE NOTE THAT YOUR USE OF THIS WEBSITE, OR ANY TOOLS OR
                SERVICES ACCESSIBLE THROUGH THIS WEBSITE, CONSTITUTES YOUR
                ACCEPTANCE OF THIS MEMBERSHIP AGREEMENT AND ALL ITS TERMS.
              </p>

              <h3 className="text-xl font-semibold">Membership Agreement</h3>
              <p>
                Before using any platform, application, or service provided by
                Fast Print Guys (referred to as “Fast Print Guys,” “we,” “our,”
                “us,” or “the Site”), please carefully review this Membership
                Agreement and Terms and Conditions of Use (“Terms” or
                “Agreement”). These Terms govern your (“you” or “your”) access
                to and use of the websites, tools, and services provided by Fast
                Print Guys. Your use of the Site is expressly conditioned on
                your agreement to these Terms. If you do not agree with any part
                of these Terms, please do not use the Site. Violations of these
                Terms may result in suspension or termination of your access and
                any related privileges.
              </p>
              <p>
                Additional posted terms may apply to specific features or
                services (“Additional Terms”). These are incorporated by
                reference and take precedence in case of a conflict, except
                where Sections 16, 17, 18, and 19 of these Terms apply, which
                shall always prevail in any conflict.
              </p>
              <p>
                We reserve the right to update or modify these Terms at any
                time. Changes become effective immediately upon notice, which
                may be given via website updates or email. Continued use of the
                Site after such changes constitutes your acceptance of them. You
                are responsible for reviewing the most recent version of the
                Terms. We are not liable for changes in fees, services, or
                content.
              </p>

              <h3 className="text-xl font-semibold">1. Registration</h3>
              <p>By registering with Fast Print Guys, you confirm that:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>You are at least sixteen (16) years of age;</li>
                <li>
                  The information you provide is accurate, current, and
                  complete;
                </li>
                <li>You will keep your account information up to date.</li>
              </ul>
              <p>
                If you provide inaccurate or incomplete information, we reserve
                the right to suspend or terminate your account. Communications
                sent to the contact information you provide will be considered
                properly delivered.
              </p>
              <p>
                As part of registration, we may request your name, email,
                preferred payment currency, and language, along with a secure
                password. We reserve the right to reject registration details
                that are offensive, impersonate others, or infringe on
                intellectual property rights.
              </p>
              <p className="font-bold">
                YOU ARE RESPONSIBLE FOR MAINTAINING THE SECURITY OF YOUR ACCOUNT
                INFORMATION AND PASSWORD. Any activity conducted under your
                account is your responsibility.
              </p>

              <h3 className="text-xl font-semibold">2. Use of the Site</h3>
              <p>
                Subject to your compliance with these Terms, Fast Print Guys
                grants you a non-transferable, non-exclusive, limited right to
                access the Site and its content solely for your personal or
                business purposes. All Site content remains the property of Fast
                Print Guys or its licensors. Unauthorized reproduction,
                modification, or commercial exploitation is strictly prohibited.
              </p>
              <p>
                The Site may display advertisements as part of its
                functionality. From time to time, technical or maintenance
                issues may cause temporary interruptions.
              </p>
              <p className="font-bold">
                FAST PRINT GUYS MAKES NO GUARANTEES THAT THE SITE WILL BE
                UNINTERRUPTED OR ERROR-FREE.
              </p>
              <p>
                While using the Site, you agree to comply with all applicable
                laws and to respect the rights of others. Prohibited behavior
                includes but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Harassing, threatening, or violating the rights of others;
                </li>
                <li>Impersonating another person or entity;</li>
                <li>Hindering another user’s experience;</li>
                <li>Violating applicable laws and regulations;</li>
                <li>
                  Uploading content that is defamatory, offensive, or
                  infringing;
                </li>
                <li>
                  Posting or distributing spam, advertisements, or unauthorized
                  solicitations;
                </li>
                <li>Exploiting or harming minors in any way;</li>
                <li>Unauthorized access to other users’ accounts or data;</li>
                <li>
                  Using automated tools (e.g., bots, scrapers) to access or
                  harvest data;
                </li>
                <li>
                  Disrupting the operation of the Site through technical
                  interference.
                </li>
              </ul>
              <p className="font-bold">
                WE RESERVE THE RIGHT TO IMMEDIATELY SUSPEND OR TERMINATE YOUR
                ACCOUNT FOR ANY BREACH OF THESE TERMS, AT OUR SOLE DISCRETION.
              </p>

              <h3 className="text-xl font-semibold">3. Content</h3>
              <p>
                When you upload or submit any materials to the Fast Print Guys
                website (“Site”)—including text, images, graphics, videos,
                audio, data, files, or links—you retain full ownership of your
                content (“Content”). However, by using our services, you grant
                Fast Print Guys and our affiliates a worldwide, non-exclusive,
                royalty-free, assignable, and sub-licensable right to use,
                reproduce, distribute, and publicly display your Content solely
                in connection with providing our services. If you choose to
                limit distribution of your content, we will take commercially
                reasonable steps to enforce those restrictions but cannot
                guarantee complete enforcement in every instance.
              </p>
              <p>
                You acknowledge that while you own your content, the templates,
                layouts, or formatting tools used to arrange your content are
                the proprietary property of Fast Print Guys and may be used by
                us or others.
              </p>
              <p>
                Fast Print Guys may provide automatically generated sample
                language (e.g., copyright notices) based on your inputs. You are
                responsible for reviewing and confirming the accuracy and
                appropriateness of this language. We are not liable for
                inaccuracies or misuse of these templates.
              </p>
              <p>
                By submitting content, you affirm that: (a) you own or have
                rights to all submitted content, (b) it does not infringe on any
                third-party intellectual property rights or legal statutes, (c)
                you will provide Fast Print Guys evidence of rights upon
                request, (d) your content complies with any applicable content
                policy, (e) you have secured permission for the likeness of any
                individual included in the content (including parental/guardian
                consent for minors).
              </p>
              <p>
                Violation of this section may result in removal of content
                and/or termination of your account at our sole discretion.
              </p>
              <p>
                Fast Print Guys does not guarantee confidentiality for submitted
                content and is not responsible for unauthorized use or
                disclosure. We reserve the right to monitor, alter, block, or
                remove any content that violates these Terms or applicable laws.
              </p>
              <p>
                Fast Print Guys does not actively screen user content for sale,
                and responsibility for legality and appropriateness remains
                solely with the user. We may implement automated tools to remove
                flagged or reported content but are under no obligation to act
                on user reports.
              </p>
              <p className="font-bold">
                YOU ARE RESPONSIBLE FOR RETAINING BACKUPS OF YOUR CONTENT. FAST
                PRINT GUYS IS NOT RESPONSIBLE FOR LOST FILES DUE TO ACCOUNT
                CHANGES OR AUTOMATED REMOVAL PROCESSES.
              </p>
              <p>Fast Print Guys reserves the right to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Add identifying numbers or barcodes to the back cover of
                  printed products
                </li>
                <li>
                  Include legal notices or identifying elements on final pages
                </li>
                <li>
                  Remove content after retirement or inactivity, based on
                  current retention policies
                </li>
              </ul>

              <h4 className="text-lg font-semibold">
                Content Policy and Guidelines
              </h4>
              <p>
                Content uploaded or offered for sale through Fast Print Guys
                must comply with local, state, federal, and international laws.
                Prohibited content includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Pornographic or sexually explicit materials</li>
                <li>
                  Graphic violence or cruelty, including disturbing crime scene
                  images or animal abuse
                </li>
                <li>
                  Hate speech or content promoting discrimination, harassment,
                  or abuse
                </li>
                <li>
                  Illegal or criminal activity (e.g., how-to guides for criminal
                  conduct)
                </li>
                <li>Unauthorized use of Nazi symbolism where prohibited</li>
                <li>
                  Invasion of privacy (e.g., sharing confidential personal data)
                </li>
                <li>Unauthorized use of celebrity names or likenesses</li>
                <li>Duplicate or unoriginal public domain content</li>
              </ul>

              <h4 className="text-lg font-semibold">Content Retention</h4>
              <p>
                Fast Print Guys may delete user content under the following
                conditions:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Quarantined Content: Suspended from sale due to policy
                  violation may be removed at any time.
                </li>
                <li>
                  Retired Content: Content no longer available for sale may be
                  deleted after 12 months.
                </li>
                <li>
                  Draft Projects: Unpublished drafts older than 12 months may be
                  removed.
                </li>
                <li>
                  Previous Versions: Old versions of books not associated with
                  any sales may be deleted after 12 months.
                </li>
                <li>
                  Private Access Content: May be deleted 18 months after last
                  purchase or publication.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">
                4. User-Generated Content
              </h3>
              <p>
                Users may contribute content including descriptions, previews,
                reviews, comments, blog posts, and forum entries
                (“User-Generated Content”). Fast Print Guys is not responsible
                for this content, which may contain opinions, inaccuracies, or
                offensive material. Any views expressed are solely those of the
                users.
              </p>
              <p>
                We are not liable for errors, omissions, or consequences from
                reliance on User-Generated Content. Fast Print Guys may—but is
                not obligated to—monitor or remove user content that violates
                terms or laws.
              </p>
              <p>
                We may limit the number or size of user contributions or storage
                available, and remove content that is unlawful, promotional,
                copyrighted, or personally identifiable.
              </p>
              <p>
                Fast Print Guys, located at 2828 W Parker Rd, Ste B103, Plano,
                TX 75075, reserves the right to revise or remove user-generated
                content and enforce these policies at its sole discretion.
              </p>

              <h3 className="text-xl font-semibold">5. Purchases</h3>
              <p>
                To make a purchase on the Fast Print Guys website, you must
                accept these Terms and provide accurate, current, and complete
                information relevant to your purchase, including payment
                details. All data submitted will be handled in accordance with
                our Privacy Policy.
              </p>
              <p className="font-bold">
                YOU REPRESENT AND WARRANT THAT YOU HAVE THE LEGAL RIGHT TO USE
                ANY CREDIT CARD(S) OR OTHER PAYMENT METHODS USED TO INITIATE ANY
                TRANSACTION. You agree to pay all charges incurred by you or any
                user of your account or payment credentials, at the pricing
                displayed at the time the charges are incurred. You are
                responsible for paying all applicable taxes related to your
                purchases. Tax amounts cannot be refunded once the purchase is
                complete, except at our sole discretion.
              </p>
              <p>
                Products, pricing, availability, specifications (including but
                not limited to paper type and stock), images, and descriptions
                are subject to change without prior notice. We aim to display
                our product attributes accurately, but actual color and
                appearance may vary due to device screen differences. Inclusion
                of a product or service on the Site at a specific time does not
                guarantee availability.
              </p>
              <p>
                In case of paper shortages or supply chain issues, Fast Print
                Guys reserves the right to substitute paper stocks with
                alternatives that maintain the quality and timely delivery of
                your print products.
              </p>
              <p>
                You are responsible for complying with all relevant laws (local,
                state, federal, or international) regarding possession, use, and
                sale of any products purchased from us. By placing an order, you
                confirm your purchase and use is lawful.
              </p>
              <p>We reserve the right to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Limit quantities or discontinue any product or service at any
                  time.
                </li>
                <li>
                  Apply conditions to the use of promotional codes or offers.
                </li>
                <li>
                  Refuse service or purchases to any user at our discretion.
                </li>
              </ul>
              <p>
                Title and risk of loss pass to you once we deliver your order to
                the shipping carrier. We may ship partial orders at no extra
                cost to you. Charges may apply upon partial shipment.
              </p>

              <h3 className="text-xl font-semibold">6. Copyright</h3>
              <p>
                The Digital Millennium Copyright Act (“DMCA”) provides a process
                for copyright owners to report material they believe infringes
                their rights.
              </p>
              <p>
                By uploading content to Fast Print Guys, you authorize Fast
                Print Guys to act as your agent in submitting DMCA takedown
                notices or similar requests for content removal related to
                copyright infringement. While you are responsible for monitoring
                and enforcing your copyrights, Fast Print Guys reserves the
                right to issue takedown notices on your behalf at our
                discretion.
              </p>
              <p>
                If you believe content on our Site infringes your copyright, you
                or your agent may send a takedown request with the following
                details:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Your physical or electronic signature;</li>
                <li>
                  Identification of the copyrighted work allegedly infringed (or
                  a list);
                </li>
                <li>
                  Identification of the infringing material with sufficient
                  detail for us to locate it;
                </li>
                <li>
                  Your contact information (name, address, phone number, email);
                </li>
                <li>A good faith statement that the use is unauthorized;</li>
                <li>
                  A statement, under penalty of perjury, that the information is
                  accurate and you are authorized to act on behalf of the
                  copyright owner.
                </li>
              </ul>
              <p>
                If you believe your content was wrongly removed, the DMCA allows
                you to submit a counter-notice. Visit{" "}
                <a
                  href="http://www.copyright.gov"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.copyright.gov
                </a>{" "}
                for the most current legal requirements.
              </p>
              <p>Please send notices or counter-notices to:</p>
              <address className="not-italic">
                Fast Print Guys
                <br />
                ATTN: Copyright Compliance
                <br />
                2828 W Parker Rd, Ste B103
                <br />
                Plano, TX 75075
                <br />
                Email:{" "}
                <a
                  href="mailto:support@fastprintguys.com"
                  className="text-blue-600 underline"
                >
                  support@fastprintguys.com
                </a>
              </address>

              <h3 className="text-xl font-semibold">7. Term and Termination</h3>
              <p>
                These Terms remain effective until terminated as set forth
                herein. Fast Print Guys may, in its sole discretion, immediately
                terminate these Terms, and/or your access to and use of the Site
                or any portion thereof, at any time and for any reason,
                including if we believe that you have violated or acted
                inconsistently with the letter or spirit of these Terms.
              </p>
              <p>
                Upon termination of these Terms, your right to access and/or use
                the Site will immediately cease.
              </p>
              <p>
                You agree that any termination of your access to or use of the
                Site may occur without prior notice, and that Fast Print Guys
                may immediately deactivate or delete your password and username,
                and all related information and files associated with it
                (including all Content), and/or bar any further access to such
                information or files. Fast Print Guys shall not be liable to you
                or any third party for any termination of your access to the
                Site or to any such information or files and is not required to
                make such information or files available to you
                post-termination.
              </p>

              <h3 className="text-xl font-semibold">
                8. Third-Party Websites, Software, and Services
              </h3>
              <p>
                Fast Print Guys may direct you to websites, software, or
                services operated by third parties (“Third-Party Properties”).
                These operate under their own Terms, and Fast Print Guys has no
                control over their content or policies. We are not responsible
                for:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  the content and operation of such Third-Party Properties, or
                </li>
                <li>
                  the privacy or other practices of such Third-Party Properties.
                </li>
              </ul>
              <p>
                The inclusion of links or references to Third-Party Properties
                does not constitute endorsement by Fast Print Guys. Any use of
                Third-Party Properties is entirely at your own risk and subject
                to their terms and conditions.
              </p>
              <p>
                We reserve the right, at any time and at our sole discretion, to
                block links to our Site through technological or other means
                without prior notice.
              </p>

              <h3 className="text-xl font-semibold">9. Promotions</h3>
              <p>
                Any contests, sweepstakes, games, or promotions (“Promotions”)
                offered through the Site may be governed by additional terms
                that are separate from these Terms. Your participation
                constitutes acceptance of those specific Promotion rules, which
                will be linked from the Promotion.
              </p>
              <p>
                The following general terms apply to all Promotions, though Fast
                Print Guys may revise them at its discretion:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Promotional codes can only be used once.</li>
                <li>Limit one promotion per account.</li>
                <li>
                  Promotions apply only to purchases from Fast Print Guys.
                </li>
                <li>
                  Promotions cannot be applied to taxes or shipping charges.
                </li>
                <li>Offers may not combine.</li>
                <li>Offers have a defined expiration date.</li>
                <li>
                  Fast Print Guys reserves the right to modify or cancel any
                  promotion at any time.
                </li>
                <li>Offers hold no cash value and are not for resale.</li>
                <li>
                  Promotional value is non-refundable if a refund is granted.
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-justify leading-relaxed">
              <p>
                Fast Print Guys reserves the right to terminate accounts and
                withhold creator payments where it finds, at its sole
                discretion, abuse or fraud related to any promotion.
              </p>

              <h3 className="text-xl font-semibold">11. Returns</h3>
              <p>
                Due to our print-on-demand production process, Fast Print Guys
                does not accept returns for physical products. All refunds or
                replacements are issued at our sole discretion.
              </p>
              <p>
                If you receive a damaged book, we may replace it at our
                discretion upon review of photographic evidence.
              </p>
              <p>
                Creators are responsible for reviewing and approving the final
                layout, formatting, and content before publishing. Fast Print
                Guys does not inspect individual works prior to sale.
              </p>

              <h3 className="text-xl font-semibold">
                11. Retiring Content, Membership Termination, and Data Retention
              </h3>
              <p>
                You may retire (remove) your published Content from Fast Print
                Guys at any time. Retired Content becomes invisible to others
                and is unavailable for sale. It will be deleted after a defined
                retention period based on current policy.
              </p>
              <p>
                If the Content is listed in third-party distribution (e.g.,
                Global Distribution), it may continue to appear as “unavailable”
                or “out of stock” after retirement.
              </p>
              <p>
                All gross profits earned prior to removal will remain subject to
                these Terms and will be paid out accordingly.
              </p>
              <p>
                Draft Content can be deleted by the creator and will be purged
                after a specified retention period.
              </p>
              <p>
                You may terminate your Fast Print Guys account by contacting us
                directly or via your account settings. Your termination will
                take effect within 30 days of confirmation.
              </p>
              <p>
                We retain your personal data and files only as long as required
                to fulfill the purpose for which it was collected. Content will
                remain accessible based on type (quarantined, retired, etc.) for
                set durations before permanent deletion.
              </p>

              <h3 className="text-xl font-semibold">
                12. Content Restrictions
              </h3>
              <p>
                When you purchase content (free or paid) from Fast Print Guys,
                you agree to the following restrictions:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>You may resell physical printed copies of content.</li>
                <li>
                  You may not resell digital content or profit from
                  redistribution.
                </li>
                <li>
                  You may only copy, modify, or adapt content with express
                  permission from the content creator.
                </li>
                <li>Copyright remains with the original creator.</li>
                <li>
                  You may not sublicense, distribute, or transfer content or
                  related rights to any third party.
                </li>
                <li>
                  You must not remove or obscure any copyright or trademark
                  notices in the content.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">13. Privacy</h3>
              <p>
                Your use of Fast Print Guys services is subject to our Privacy
                Policy, which can be accessed at&nbsp;
                <a
                  href="https://fastprintguys.com/privacy-policy"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://fastprintguys.com/privacy-policy
                </a>
                . By using our Site or services, you acknowledge that you have
                read, understood, and agreed to our data practices outlined
                therein.
              </p>

              <h3 className="text-xl font-semibold">14. Indemnification</h3>
              <p>
                You agree to indemnify, defend, and hold harmless Fast Print
                Guys, its affiliates, partners, owners, staff, and agents from
                any and all claims, damages, losses, costs (including reasonable
                attorneys’ fees), and other expenses that arise directly or
                indirectly from (a) your breach of these Terms, (b) any Content
                submitted or uploaded by you, (c) your activity related to the
                Site, including purchases or unauthorized submissions, and/or
                (d) taxes or fees related to your use of Fast Print Guys
                services.
              </p>
              <p>
                If at any time you lose rights or receive a claim regarding
                content hosted through our Site, you must immediately retire or
                delete such content. We reserve the right to issue customer
                refunds and recover such amounts from you.
              </p>

              <h3 className="text-xl font-semibold">
                15. Disclaimer of Warranties
              </h3>
              <p className="font-bold">
                THE FAST PRINT GUYS SITE AND SERVICES ARE PROVIDED “AS IS” AND
                “AS AVAILABLE.” WE DO NOT GUARANTEE THAT THE SITE OR SERVICES
                WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER
                HARMFUL COMPONENTS. FAST PRINT GUYS DISCLAIMS ALL WARRANTIES,
                EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, OR TITLE.
              </p>
              <p className="font-bold">
                YOUR USE OF THE SITE AND SERVICES IS AT YOUR OWN RISK.
              </p>

              <h3 className="text-xl font-semibold">
                16. Limitation of Liability
              </h3>
              <p className="font-bold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FAST PRINT GUYS SHALL
                NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR
                CONSEQUENTIAL DAMAGES INCLUDING BUT NOT LIMITED TO LOSS OF DATA,
                PROFITS, OR BUSINESS. OUR TOTAL LIABILITY UNDER THESE TERMS
                SHALL NOT EXCEED $100.00.
              </p>
              <p>
                Some jurisdictions may not allow such exclusions or limitations,
                so these may not apply to you.
              </p>

              <h3 className="text-xl font-semibold">
                17. Intellectual Property
              </h3>
              <p>
                Fast Print Guys retains all intellectual property rights to the
                Site, its logo, and branded elements, including all text,
                design, graphics, layout, and service features unless otherwise
                stated. You may not use, reproduce, republish, or distribute any
                material from our Site without written consent. All third-party
                trademarks are the property of their respective owners.
              </p>

              <h3 className="text-xl font-semibold">
                18. Ideas, Suggestions, and Requests
              </h3>
              <p>
                If you submit any business ideas, suggestions, feedback, or
                requests to Fast Print Guys, you agree such submissions become
                the exclusive property of Fast Print Guys. You irrevocably
                assign any intellectual property rights related to those
                submissions. Do not send proprietary ideas without a prior
                written agreement from us.
              </p>

              <h3 className="text-xl font-semibold">
                19. Jurisdictional Issues
              </h3>
              <p>
                Fast Print Guys operates in the United States and complies with
                U.S. law. We do not guarantee availability or legal compliance
                of our Site outside the U.S. If you access or use our Site from
                another country, you do so at your own risk and are responsible
                for complying with all applicable local laws.
              </p>

              <h3 className="text-xl font-semibold">20. Miscellaneous</h3>
              <p>
                This Agreement shall be governed by and construed in accordance
                with the internal laws of the State of Texas, without regard to
                its conflict of law principles.
              </p>
              <p>
                By using the Site, you agree that any dispute that cannot be
                resolved through good-faith negotiation shall be submitted to
                arbitration in accordance with the rules of the American
                Arbitration Association. The arbitration shall take place in
                Collin County, Texas. A single arbitrator with experience in
                printing or publishing matters shall preside. The decision shall
                be binding, not subject to appeal, and enforceable in any court
                of competent jurisdiction. Dispute resolution shall be conducted
                on an individual basis only. In case of court proceedings, both
                you and Fast Print Guys waive any right to a jury trial.
              </p>
              <p>
                Sections 16 through 19, relating to indemnification, warranties,
                limitation of liability, and intellectual property, shall
                survive termination of this Agreement. Notwithstanding
                arbitration, you consent to the jurisdiction of courts in Collin
                County, Texas, and Fast Print Guys reserves the right to seek
                injunctive relief or other remedies as needed.
              </p>
              <p>
                Force majeure events beyond our reasonable control may delay
                performance, for which neither party will be liable.
              </p>
              <p>
                Nothing in this Agreement creates an agency, joint venture, or
                employee relationship between the parties. Business references
                do not imply legal partnerships.
              </p>
              <p>
                If any part of this Agreement is deemed unenforceable, the
                remainder shall remain in effect. A waiver of any breach is not
                a waiver of any subsequent breach.
              </p>
              <p>
                This is the entire agreement between you and Fast Print Guys and
                supersedes all prior agreements on this subject.
              </p>
              <p>
                You may not assign or sublicense this Agreement without our
                written consent. We may update or amend these Terms only in
                writing.
              </p>
              <p>
                Section headings are provided for convenience and do not define
                the content.
              </p>
              <p>
                If you have any questions, please contact:&nbsp;
                <a
                  href="mailto:legal@fastprintguys.com"
                  className="text-blue-600 underline"
                >
                  legal@fastprintguys.com
                </a>
              </p>

              <h3 className="text-xl font-semibold">21. Beta Services</h3>
              <p>
                From time to time, we may offer Beta Services—features not
                generally available to the public—either by invitation or
                designation (e.g., preview, limited release). Beta Services may
                have bugs or instability and may be changed or discontinued at
                any time. Pricing for Beta Services may vary and is subject to
                change. Beta Services are governed by this Agreement, including
                Sections 18 and 19.
              </p>

              <h3 className="text-xl font-semibold">
                22. Mobile Terms of Service
              </h3>
              <p>
                Fast Print Guys may offer SMS/Text messaging services (“Mobile
                Service”) for U.S. residents. Your participation constitutes
                your agreement to these terms. Message frequency may vary and
                standard carrier rates apply.
              </p>
              <p>
                By subscribing, you consent to receive recurring messages (e.g.,
                order updates, promotions) from Fast Print Guys to your mobile
                number, including via automated systems. Consent is not required
                for purchase. You may cancel at any time by texting STOP to +1
                (945) 284-4339. For assistance, text HELP to the same number or
                email&nbsp;
                <a
                  href="mailto:support@fastprintguys.com"
                  className="text-blue-600 underline"
                >
                  support@fastprintguys.com
                </a>
                .
              </p>
              <p>
                Message delivery is not guaranteed. You are responsible for
                ensuring your mobile number is current and valid. Fast Print
                Guys is not responsible for messages sent to outdated or
                reassigned numbers.
              </p>
              <p>Your data is treated according to our Privacy Policy.</p>

              <h3 className="text-xl font-semibold">
                Appendix A: ISBN Agreement
              </h3>
              <p>
                Fast Print Guys will be the source of bibliographic data for any
                books using our assigned ISBNs. We will submit data to U.S. ISBN
                databases and industry directories, designating Fast Print Guys
                as the publisher of record. Revenue you earn from sales under
                our ISBN meets the IRS definition of a royalty.
              </p>
              <p>
                U.S. creators must submit a valid W-9 form. If not, earnings
                will be subject to backup withholding at the current IRS rate.
              </p>
              <p>
                Non-U.S. creators must submit a W-8BEN form. If none is
                submitted, withholding will occur at default IRS rates. If a
                valid treaty exists, treaty rates apply. Taxes are reported to
                the IRS per federal requirements.
              </p>
              <p>
                You agree to provide tax documentation and understand earnings
                may be withheld without it. This clause is superseded only by
                documented treaty conflicts.
              </p>

              <h3 className="text-xl font-semibold">Bring Your Own ISBN</h3>
              <p>
                By assigning your ISBN to a title published through Fast Print
                Guys, you acknowledge that you have reviewed and agree to the
                U.S. ISBN Agency terms and conditions listed below:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  An ISBN will be assigned to this title and the publisher’s
                  name you provide will be listed as the publisher in all
                  bibliographic feeds.
                </li>
                <li>
                  Fast Print Guys will act as an agent providing distribution
                  services.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">
                Fast Print Guys ISBN (Free)
              </h3>
              <p>
                By assigning an ISBN provided by Fast Print Guys, you agree to
                the following terms:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  You grant Fast Print Guys the rights to act as the publisher
                  on your behalf to retailers and wholesalers globally.
                </li>
                <li>
                  Fast Print Guys will assign an ISBN to your title, and
                  FastPrintGuys.com will be listed as the publisher in all
                  bibliographic feeds.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">
                Appendix B: E-Book Listings Agreement
              </h3>
              <p>
                If you select e-book for your published project, these terms
                apply in addition to the main Terms and supplement Section 7.
              </p>
              <p>
                Global Distribution makes your print or eBook (“Content”)
                available to retail sites and catalogs (“Channels” or
                “Distributors”).
              </p>
              <p>
                Published Content that meets all distribution requirements is
                eligible for distribution to Channels you select during
                publishing. For each Channel you select, Fast Print Guys will be
                the exclusive provider of that Content to the Channel.
              </p>
              <p>
                You must ensure your Content and any revisions meet Fast Print
                Guys’ current distribution requirements. We reserve the right to
                update or change these requirements to comply with Distributor
                rules.
              </p>
              <p>
                You acknowledge that once your Content is approved for
                distribution, you cannot change the title, subtitle, author
                name, book size, binding type, or interior color. Any such
                change requires creating a new publication.
              </p>
              <p>
                Retiring your project will initiate automated removal from
                Global Distribution. Distributors may take up to 8 weeks to
                remove your Content. Some Distributors may continue to list
                retired Content as “unavailable” or “out of stock” indefinitely,
                and Fast Print Guys has no control over this.
              </p>
              <p>
                Please contact Fast Print Guys with any questions regarding
                channel rejections or listings.
              </p>

              <h3 className="text-xl font-semibold">
                What Fast Print Guys Does
              </h3>
              <p>
                We will provide your Content files and metadata to Channels with
                whom we have a relationship, at our discretion, provided your
                Content meets current distribution and Terms requirements, plus
                any Distributor guidelines.
              </p>
              <p>
                Distributors are not parties to the Fast Print Guys Terms or
                Global Distribution Agreement and have no obligation to accept
                your Content.
              </p>
              <p>
                Distributors may apply discounts to your Content’s list price at
                their discretion without notice.
              </p>
              <p>
                Distributors are not responsible for how your Content renders in
                print or electronic formats on different devices.
              </p>

              <h3 className="text-xl font-semibold">eBook Distribution</h3>
              <p>
                In addition to the Terms and Global Distribution Agreement, the
                following applies only to eBooks:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Before an eBook is accepted for Global Distribution, you agree
                  to pay a one-time retail distribution fee upon first
                  submission. This fee applies only to new eBooks, not
                  revisions.
                </li>
                <li>
                  Some distributors may offer eBooks on a subscription basis,
                  where users can access up to 20% of your Content before
                  purchase.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">Print Book Distribution</h3>
              <p>
                In addition to the Terms and Global Distribution Agreement, the
                following applies only to print books:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Before a print book is accepted for Global Distribution, you
                  must purchase and approve a proof copy.
                </li>
                <li>
                  Fast Print Guys and Distributors do not guarantee print
                  quality or exact match to your specifications.
                </li>
                <li>
                  Neither Fast Print Guys nor Distributors control or are
                  responsible for any third-party resellers of your Content.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">
                Suspension of Global Distribution
              </h3>
              <p>
                Fast Print Guys may suspend your access to Global Distribution
                immediately and without notice if we determine:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Your use poses a security risk, adversely impacts Fast Print
                  Guys or third parties, exposes us to liability, or involves
                  fraud.
                </li>
                <li>You breach these Terms.</li>
              </ul>

              <h3 className="text-xl font-semibold">Termination</h3>
              <p>
                You may terminate the Global Distribution Agreement by providing
                30 days’ notice and closing your account. Fast Print Guys may
                terminate it at any time without notice.
              </p>

              <h3 className="text-xl font-semibold">
                Appendix C: Fast Print Guys Direct
              </h3>
              <p>
                If you use Fast Print Guys Direct to sell your content, these
                terms apply in addition to the main Terms.
              </p>
              <p>
                Fast Print Guys Direct connects your eligible ecommerce platform
                to your Fast Print Guys account, enabling sales of your books
                via your online store.
              </p>
              <p>
                You are solely responsible for your store, products, and payment
                settings working correctly and for collecting payments from your
                customers.
              </p>
              <p>
                Fast Print Guys is not responsible for any third-party apps or
                plugins you use on your store or any disruptions they cause.
              </p>
              <p>
                We are also not responsible for ecommerce platform limitations
                or changes that affect the connection between your store and
                Fast Print Guys Direct.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
export default Terms;
