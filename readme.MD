
---

# **HabiFy - Gamified Habit Tracker**
A full-stack habit tracking application designed to help users build better habits through gamification, community support, and smart notifications.

---

## **Features**
- **User Registration & Profile Setup**  
  Users can sign up, create personalized profiles, and set up the habits they want to work on.

- **Regular Habit Tracking**  
  Intuitive dashboard to log daily habits, view progress, and manage ongoing goals.

- **Gamification**  
  Unlock badges, earn points, build streaks, and level up to stay motivated and consistent.

- **Smart Reminders & Notifications**  
  Automated and personalized notifications to nudge users towards daily habit completion.

- **Community Engagement & Social Sharing**  
  Share achievements, join challenges, and cheer on friends for mutual accountability and fun.

---

## **Getting Started**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/HamiFy.git
   cd HamiFy
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root and define your environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the Development Server**
   ```bash
   client: npm run dev
   server: npm start 
   ```

---

## **Tech Stack**
- **Frontend**: React.js (with Bootstrap CSS for styling)  
- **Backend**: Node.js / Express  
- **Database**: MongoDB  
- **Authentication**: Clerk  
- **Notifications**: Mailjs / Cron jobs / Push notifications

---

## **Project Structure**
```
├── client/         # Frontend React application
├── server/         # Backend Node.js server
└── README.md
```

---

## **Deployment**
The application is deployed at: [habify-red.vercel.app](https://habify-red.vercel.app)

---

## **Contributing**
1. Fork the repository  
2. Create a new feature branch  
3. Commit your changes  
4. Push to your branch  
5. Open a pull request  

Let’s help people build habits, one streak at a time! 💪🔥

---