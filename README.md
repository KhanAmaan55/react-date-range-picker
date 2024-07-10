# React Date Range Picker

A customizable, easy-to-use date range picker component for React applications.

## Features

- Select start and end dates in a single calendar view
- Displays two months at a time for easier date range selection
- Highlights the selected date range
- Customizable styles using SCSS
- Built with React and TypeScript for type safety
- Lightweight and performant

## Installation

You can install the package using npm:

```bash
npm install react-date-range-picker
```

Or using yarn:

```bash
yarn add react-date-range-picker
```

## Usage

Here's a basic example of how to use the Date Range Picker in your React application:

```jsx
import React from 'react';
import { DateRangePicker } from 'react-date-range-picker';
import 'react-date-range-picker/dist/style.css';

function App() {
  return (
    <div>
      <h1>Select a Date Range</h1>
      <DateRangePicker />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(range: { startDate: Date, endDate: Date }) => void` | - | Callback function that is called when the selected date range changes |
| `initialStartDate` | `Date` | `null` | Initial start date |
| `initialEndDate` | `Date` | `null` | Initial end date |

## Styling

The component comes with default styles, but you can customize it by overriding the CSS classes. The main classes you can target are:

- `.date-range-picker-container`: The outer container
- `.date-range-input`: The input field
- `.date-range-picker`: The picker modal
- `.month`: Each month container
- `.day`: Individual day cells

## Development

To set up the development environment:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Building

To build the component for production:

```bash
npm run build
```

This will generate the distribution files in the `dist` folder.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README provides:

1. A brief description of the component
2. Key features
3. Installation instructions
4. Basic usage example
5. Available props (you should update this based on the actual props your component accepts)
6. Information on styling
7. Development and build instructions
8. How to contribute
9. License information

Remember to keep your README up-to-date as you develop your component. You may want to add sections like:

- A screenshot or gif demonstrating the component in action
- More detailed API documentation
- Troubleshooting or FAQ section
- Information about browser compatibility
- Any known issues or limitations

Also, make sure to create and link to a LICENSE file if you mention it in the README.