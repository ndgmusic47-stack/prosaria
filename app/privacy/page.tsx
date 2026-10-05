export const metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <section className="marble-bg marble-bg-strong pt-40 pb-24">
      <div className="max-w-site mx-auto px-6 lg:px-10">
        <div className="max-w-[680px]">
          <p className="eyebrow text-[#123524] mb-6">Legal</p>
          <h1 className="font-serif text-display-lg text-[#0F2E1D] mb-10">Privacy Policy</h1>

          {[
            {
              title: 'Who we are',
              body: 'Prosaria is a trading name of South Thames Trading Company Limited, registered in England and Wales. When you submit information through this website, that information is received by Nathan Powell.',
            },
            {
              title: 'What we collect',
              body: 'The contact form on this site asks for your name, your email address and your message. That is the only personal data this website collects, and you only provide it if you choose to send us a message.',
            },
            {
              title: 'How we use it',
              body: 'Your details are used solely to read and respond to your enquiry. We do not add you to a marketing list, and we do not sell or share your data with third parties.',
            },
            {
              title: 'How we handle it',
              body: 'When you submit the form, its contents are sent to us by email at hello@prosaria.co.uk and held in that mailbox. We keep correspondence for as long as is reasonably necessary to deal with your enquiry and for a sensible period afterwards for ordinary business record-keeping.',
            },
            {
              title: 'Your rights',
              body: 'You have the right to ask what personal data we hold about you, to ask us to correct it, and to ask us to delete it. To exercise any of these rights, email hello@prosaria.co.uk and we will respond.',
            },
            {
              title: 'Cookies',
              body: 'This website does not set advertising or tracking cookies, and we do not run analytics that follow you across other websites.',
            },
            {
              title: 'Contact',
              body: 'For any privacy-related query, email hello@prosaria.co.uk.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="mb-10">
              <h2 className="font-serif text-display-sm text-[#0F2E1D] mb-3">{title}</h2>
              <p className="text-body-md text-[#4A574C]">{body}</p>
            </div>
          ))}

          <p className="text-label text-[#7E8A7E] mt-12">Last updated: October 2026</p>
        </div>
      </div>
    </section>
  )
}
