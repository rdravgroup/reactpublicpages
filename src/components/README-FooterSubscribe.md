FooterSubscribe component

Files added:
- src/components/FooterSubscribe.jsx
- src/components/FooterSubscribe.css

Usage:
1. Import and render the component inside your Footer (or wherever you want the subscription form):

   import FooterSubscribe from './components/FooterSubscribe';
   
   function Footer(){
     return (
       <footer>
         <FooterSubscribe apiUrl="https://localhost:7238/api/stayupdated/subscribe" />
       </footer>
     );
   }

2. The component performs client-side validation:
   - Email required
   - No commas in email
   - Email max length 33
   - Simple email format check
   - Name max length 50

3. The component sends POST JSON payload: { Email: "...", FirstName: "..." }
   - It expects the backend to return JSON with a `message` property.
   - For first-time subscription the backend should return a success message like:
     "Subscription received. A confirmation email has been sent."
   - For duplicate subscription the backend should return "Already subscribed" in `message` (component displays it).

4. Styling:
   - Basic styles are in src/components/FooterSubscribe.css. Adjust to match your theme.

5. Tests:
   - Start your React app and test with different emails:
     - New email => should show confirmation message.
     - Repeated email => should show "Already subscribed" message.

If you prefer a TypeScript (.tsx) version or to integrate into an existing form, paste your footer file and I will patch it directly.
