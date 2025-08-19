# Elite Catering Website

A modern, responsive catering service website built with vanilla HTML, CSS, and JavaScript. This application provides a complete catering business solution with customer-facing features and administrative tools.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse catering packages across multiple categories (Wedding, Corporate, Party, Indian, BBQ, Healthy)
- **Search & Filter**: Find specific catering options with real-time search and category filtering
- **Shopping Cart**: Add items, manage quantities, and calculate totals
- **User Authentication**: Register, login, and manage user profiles
- **Order Management**: Place orders and track order history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences

### Admin Features
- **Order Management**: View and update order statuses
- **Product Management**: Add, edit, and manage catering packages
- **Dashboard**: Overview of business operations
- **Status Tracking**: Update order statuses (Pending, Confirmed, Preparing, Ready, Delivered, Cancelled)

## 📁 Project Structure

```
├── index.html          # Main HTML file with complete page structure
├── style.css           # Comprehensive CSS with design system and responsive styles  
├── app.js              # JavaScript application logic and functionality
└── README.md           # Project documentation
```

## 🛠️ Setup Instructions

1. **Clone or Download**: Get the project files to your local machine

2. **No Build Process Required**: This is a vanilla JavaScript application with no dependencies

3. **Serve the Files**: 
   - **Simple Method**: Open `index.html` directly in your web browser
   - **Recommended Method**: Use a local web server to avoid CORS issues:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server package)
     npx http-server .
     
     # Using PHP
     php -S localhost:8000
     ```

4. **Access the Website**: Open your browser and navigate to `http://localhost:8000` (or the appropriate port)

## 🎯 Usage

### For Customers

1. **Browse Products**: 
   - View featured products on the homepage
   - Navigate to the menu section to see all available packages
   - Use category filters and search to find specific items

2. **Shopping Experience**:
   - Click "Add to Cart" on any product
   - Access cart via the shopping cart icon in navigation
   - Adjust quantities or remove items as needed

3. **Account Management**:
   - Click "Login" or "Register" in the navigation
   - Create an account to place orders and track history
   - Access order history through user profile

4. **Place Orders**:
   - Add items to cart and proceed to checkout
   - Fill in event details (date, time, guest count)
   - Provide contact information and submit order

### For Administrators

1. **Admin Access**:
   - Username: `admin@catering.com`
   - Password: `admin123`
   - Click "Admin Login" link in the login modal

2. **Manage Orders**:
   - View all customer orders in the admin panel
   - Update order statuses using dropdown menus
   - Monitor order progression from pending to delivered

3. **Product Management**:
   - Add new catering packages
   - Edit existing product details
   - Manage product availability

## 💾 Data Storage

The application uses **localStorage** for data persistence:
- **User accounts and authentication**
- **Shopping cart contents**
- **Order history**
- **Product catalog**
- **Admin settings**

**Note**: Data persists only on the same browser and device. For production use, integrate with a backend database.

## 🎨 Design System

### Theme Support
- **Automatic theme detection** based on system preferences
- **Manual theme switching** support via CSS custom properties
- **Comprehensive color palette** with semantic color tokens

### CSS Architecture
- **CSS Custom Properties** for consistent theming
- **Component-based styles** for maintainable code
- **Responsive breakpoints**: 480px, 768px, 1024px, 1280px
- **Modern CSS features**: Grid, Flexbox, custom properties

### Typography
- **Primary Font**: FKGroteskNeue (with fallbacks to system fonts)
- **Monospace Font**: Berkeley Mono (for code elements)
- **Responsive font scaling** across device sizes

## 🌐 Browser Compatibility

**Minimum Requirements**:
- **Chrome/Edge**: Version 88+
- **Firefox**: Version 85+
- **Safari**: Version 14+

**Features Used**:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript features
- localStorage API
- Modern DOM APIs

## 🔧 Customization

### Adding New Product Categories
1. Update the `categories` array in `app.js`:
   ```javascript
   categories: ["All", "Wedding", "Corporate", "Party", "Indian", "BBQ", "Healthy", "YourNewCategory"]
   ```

### Modifying Sample Products
Edit the `sampleProducts` array in `app.js` to add/modify catering packages.

### Styling Customizations
Modify CSS custom properties in `style.css` under the `:root` selector to change:
- Colors
- Typography
- Spacing
- Border radius
- Shadows

### Admin Credentials
**Security Note**: Change default admin credentials in production:
```javascript
adminCredentials: {
    username: "your-admin-email@domain.com",
    password: "your-secure-password"
}
```

## 🚦 Order Status Workflow

The application supports the following order statuses:
1. **Pending**: Order received, awaiting confirmation
2. **Confirmed**: Order confirmed and accepted
3. **Preparing**: Food preparation in progress
4. **Ready**: Order ready for pickup/delivery
5. **Delivered**: Order completed successfully
6. **Cancelled**: Order cancelled

## 📱 Mobile Experience

- **Touch-optimized interface**
- **Responsive navigation** with hamburger menu
- **Mobile-first design approach**
- **Optimized forms** for mobile input
- **Fast loading** with minimal dependencies

## 🔒 Security Considerations

**Current Implementation** (suitable for demos/prototypes):
- Client-side only authentication
- localStorage data persistence
- Hardcoded admin credentials

**Production Recommendations**:
- Implement server-side authentication
- Use secure database storage
- Add HTTPS and security headers
- Implement proper session management
- Add input validation and sanitization

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** following the existing code style
4. **Test thoroughly** across different browsers and devices
5. **Submit a pull request** with detailed description of changes

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex functionality
- Maintain responsive design principles
- Test in multiple browsers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- **localStorage limitations**: Data not shared across devices
- **No real-time updates**: Changes not synchronized across browser tabs
- **Client-side validation only**: Server-side validation needed for production

## 🔮 Future Enhancements

- **Backend Integration**: Database storage and API endpoints
- **Payment Processing**: Integration with payment gateways
- **Real-time Notifications**: Order status updates
- **Email Notifications**: Automated customer communications
- **Advanced Reporting**: Analytics and business insights
- **Multi-language Support**: Internationalization features
- **Image Upload**: Custom product image management

## 📞 Support

For questions, suggestions, or issues:
1. **Check existing issues** in the project repository
2. **Create a new issue** with detailed information
3. **Provide steps to reproduce** any bugs encountered

---

**Built with ❤️ for the catering industry**
