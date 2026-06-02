# To activate email notifications

1. Go to resend.com and sign up (free)
2. Add your domain prosaria.co.uk and verify it
3. Get your API key from the Resend dashboard
4. In Vercel: go to your project > Settings > Environment Variables
5. Add: RESEND_API_KEY = your_key_here
6. Redeploy

Until this is set up, form submissions are logged but no email is sent.
The forms still work and show results to the user.
