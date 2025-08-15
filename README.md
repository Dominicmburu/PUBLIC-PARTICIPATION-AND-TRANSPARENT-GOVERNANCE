# Nyeri County Digital Platform

A modern, responsive web application for citizen engagement and transparent governance in Nyeri County, Kenya.

## 🌟 Features

### For Citizens
- **Issue Reporting**: Report infrastructure and community issues with photos and GPS location
- **Policy Consultations**: Participate in county policy development through surveys and polls
- **Community Forums**: Engage in moderated discussions and virtual barazas
- **Real-time Tracking**: Monitor the status of reported issues and participation

### For Administrators
- **Dashboard Analytics**: Comprehensive overview of platform activity and citizen engagement
- **Issue Management**: Review, assign, and track resolution of citizen reports
- **Consultation Creation**: Launch policy consultations and analyze results
- **User Management**: Manage citizen accounts and platform access

## 🚀 Technology Stack

- **Frontend**: React 18, Bootstrap 5, React Router
- **Icons**: React Icons (Font Awesome)
- **Charts**: Chart.js, React-Chartjs-2
- **Maps**: Leaflet, React-Leaflet
- **Forms**: Formik, Yup validation
- **HTTP Client**: Axios

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with Kenya-inspired color scheme
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Dark Mode Ready**: Prepared for future dark mode implementation
- **Animations**: Smooth transitions and hover effects for enhanced user experience

## 📁 Project Structure

```
nyeri-county-platform/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── auth/            # Authentication components
│   │   ├── citizen/         # Citizen-specific components
│   │   ├── admin/           # Admin-specific components
│   │   └── shared/          # Reusable UI components
│   ├── pages/               # Main pages
│   ├── styles/              # CSS files
│   ├── utils/               # Utility functions
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd nyeri-county-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 👥 Demo Accounts

### Citizen Account
- **Email**: Any valid email
- **Password**: Any password
- **Role**: Citizen

### Administrator Account
- **Email**: admin@nyeri.gov.ke
- **Password**: admin123
- **Role**: Administrator

## 🎯 Key Components

### Authentication System
- Multi-step registration process
- Secure login with role-based access
- Password reset functionality
- Form validation and error handling

### Citizen Dashboard
- Overview of reported issues and their status
- Active consultations and participation metrics
- Quick action buttons for common tasks
- Recent activity timeline

### Issue Reporting
- Category-based issue classification
- Image upload with preview
- GPS location integration
- Priority level selection
- Real-time form validation

### Policy Consultations
- Multiple question types (multiple choice, rating, text)
- Progress tracking and deadline management
- Participation statistics
- Results visualization

### Admin Dashboard
- Platform usage analytics
- Issue management workflow
- User engagement metrics
- Quick access to administrative functions

## 🌍 Localization Support

The platform is built with localization in mind:
- English (primary language)
- Swahili support ready for implementation
- Kikuyu language support planned

## 📱 Mobile Responsiveness

- **Mobile-first design** approach
- **Touch-friendly** interface elements
- **Optimized performance** for mobile networks
- **Progressive Web App** capabilities ready

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- CSRF token support ready
- Secure authentication flow
- Role-based access control

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Analytics & Tracking

- User engagement metrics
- Issue resolution tracking
- Consultation participation rates
- Geographic distribution of issues
- Response time analytics

## 🎨 Color Scheme

- **Primary Blue**: #1e40af (County branding)
- **Success Green**: #22c55e (Kenya flag inspired)
- **Warning Orange**: #f59e0b
- **Danger Red**: #ef4444
- **Neutral Grays**: #f8fafc to #0f172a

## 📄 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Removes the single build dependency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions:
- **Email**: support@nyeri.go.ke
- **Phone**: +254 61 203 0001
- **Website**: https://nyeri.go.ke

## 🙏 Acknowledgments

- Nyeri County Government
- Dedan Kimathi University of Technology
- Citizens of Nyeri County
- Open source community

---

**Built with ❤️ for the people of Nyeri County**