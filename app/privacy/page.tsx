export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 bg-[#F7F3EC]">
      <div className="max-w-site mx-auto px-6 lg:px-10">
        <div className="max-w-[680px]">
          <p className="eyebrow text-[#2E5E44] mb-6">Legal</p>
          <h1 className="font-serif text-display-lg text-[#1F3D2B] mb-10">Privacy Policy</h1>

          {[
            {
              title: 'Who we are',
              body: 'Prosaria is a trading name of South Thames Trading Company Limited, registered in England and Wales. When you submit information through this website, that information is received by Nathan Powell.',
            },
            {
              title: 'What we collect',
              body: 'When you complete a lead magnet form or contact form on this site, we collect your name, email address and the answers you provide. We do not collect any other personal data automatically.',
            },
            {
              title: 'How we use it',
              body: 'The information you provide is used solely to respond to your enquiry or review your lead magnet submission. We do not add you to any marketing list without your explicit consent. We do not sell your data to anyone.',
            },
            {
              title: 'How we store it',
              body: 'Submissions are stored securely. We retain your information for as long as is necessary to respond to your enquiry and for a reasonable period thereafter for legitimate business purposes.',
            },
            {
              title: 'Your rights',
              body: 'You have the right to request access to the data we hold about you, to ask us to correct it, or to ask us to delete it. To exercise any of these rights, email nathan@prosaria.co.uk.',
            },
            {
              title: 'Cookies',
              body: 'This site uses minimal cookies for analytics purposes only. We do not use advertising cookies or track you across other websites.',
            },
            {
              title: 'Contact',
              body: 'For any privacy-related queries, contact nathan@prosaria.co.uk.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="mb-10">
              <h2 className="font-serif text-display-sm text-[#1F3D2B] mb-3">{title}</h2>
              <p className="text-body-md text-[#5C6B5F]">{body}</p>
            </div>
          ))}

          <p className="text-label text-[#7E8A7E] mt-12">Last updated: January 2025</p>
        </div>
      </div>
    </section>
  )
}
