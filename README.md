# Phil's Bachelor Party Landing Page 🎉

A beautiful, modern landing page for Philip "Phil, Panda, Stupid Fat Panda" Anderson's bachelor party in Miami, January 16-19, 2026.

## Features

- 🔒 **Security Quiz Modal** - Agenda is hidden behind a security quiz with 3 questions
- 🎨 **Dynamic Image Grid Background** - Animated gradient grid that creates a vibrant, party-ready atmosphere
- ⏰ **Live Countdown Timer** - Real-time countdown to the big weekend
- 📅 **Complete Itinerary** - Day-by-day agenda with all the planned activities (unlocked after quiz)
- 😂 **Funny Jokes & Snippets** - Lighthearted content about Phil
- 📱 **Fully Responsive** - Looks great on all devices
- ✨ **Smooth Animations** - Engaging scroll effects and hover interactions

## Getting Started

Simply open `index.html` in your web browser. No build process or dependencies required!

### Local Development

1. Clone or download this repository
2. Open `index.html` in your preferred web browser
3. That's it! The page is ready to go.

## Customization

### Adding Real Images

To replace the gradient grid with actual photos:

1. Add your images to an `images/` folder
2. Modify the `createImageGrid()` function in `script.js` to load actual images:

```javascript
item.style.backgroundImage = `url('images/photo${i}.jpg')`;
item.style.backgroundSize = 'cover';
item.style.backgroundPosition = 'center';
```

### Updating Content

- **Itinerary**: Edit the agenda days in `index.html`
- **Jokes**: Modify the joke cards in the jokes section
- **Dates**: Update the target date in `script.js` (line 2)

### Configuring Quiz Answers

The security quiz has 3 questions. To set the correct answers, edit `script.js` and update the `correctAnswers` object (around line 105):

```javascript
const correctAnswers = {
    fiance: 'Bridget',      // Change to correct fiance name
    trouble: 'Cumming',      // Change to correct trouble answer
    roomNumber: '420'        // Change to correct room number (case-insensitive)
};
```

**Note**: Once someone completes the quiz successfully, it's stored in localStorage and they won't see it again unless they clear their browser data.

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Created for Phil's bachelor party - feel free to customize for your own events!

---

**See you in Miami! 🏖️🍹🎉**

