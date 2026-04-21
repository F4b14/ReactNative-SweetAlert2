# SimpleReactNativeAlerts

Simple, beautiful and customizable alert dialogs for React Native and Expo apps.

> Inspired by [SweetAlert2](https://sweetalert2.github.io/) — an independent React Native adaptation of its API. Not affiliated with or endorsed by the SweetAlert2 project.

---

## Installation

> **Note:** This package is not yet published to npm. You must install it manually by following the steps below.

### Manual installation

1. **Download or clone this repository** into your project (e.g. inside a `libs/` folder):

   ```bash
   git clone https://github.com/F4b14/SimpleReactNativeAlerts.git libs/simple-reactnative-alerts
   ```

2. **Add it as a local dependency** in your `package.json`:

   ```json
   "dependencies": {
     "simple-reactnative-alerts": "file:./libs/simple-reactnative-alerts"
   }
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

> No native modules required. Works with Expo and bare React Native projects out of the box.

---

## Setup

Wrap your root component with `SimpleAlertProvider`:

```jsx
import { SimpleAlertProvider } from 'simple-reactnative-alerts'

export default function App() {
  return (
    <SimpleAlertProvider>
      <YourApp />
    </SimpleAlertProvider>
  )
}
```

---

## Basic Usage

```jsx
import SimpleAlerts from 'simple-reactnative-alerts'

// Simple alert
await SimpleAlerts.fire('Hello!', 'This is a basic alert', 'success')

// Using options object
const result = await SimpleAlerts.fire({
  title: 'Are you sure?',
  text: 'This action cannot be undone.',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel',
})

if (result.isConfirmed) {
  // user pressed confirm
}
```

---

## Icons

Supported icon types: `success` | `error` | `warning` | `info` | `question`

```jsx
SimpleAlerts.fire({ title: 'Done!', icon: 'success' })
SimpleAlerts.fire({ title: 'Oops!', icon: 'error' })
SimpleAlerts.fire({ title: 'Careful!', icon: 'warning' })
SimpleAlerts.fire({ title: 'Did you know?', icon: 'info' })
SimpleAlerts.fire({ title: 'Are you sure?', icon: 'question' })
```

---

## Input Types

Collect input from the user directly inside the alert.

```jsx
// Text input
const { value } = await SimpleAlerts.fire({
  title: 'Enter your name',
  input: 'text',
  inputPlaceholder: 'Your name...',
  inputLabel: 'Name',
  showCancelButton: true,
})

// Password
await SimpleAlerts.fire({ title: 'Password', input: 'password' })

// Textarea
await SimpleAlerts.fire({ title: 'Comments', input: 'textarea' })

// Select dropdown
const { value } = await SimpleAlerts.fire({
  title: 'Pick a fruit',
  input: 'select',
  inputOptions: { apple: 'Apple', banana: 'Banana', orange: 'Orange' },
})

// Radio buttons
const { value } = await SimpleAlerts.fire({
  title: 'Choose one',
  input: 'radio',
  inputOptions: { yes: 'Yes', no: 'No' },
})

// Checkbox
const { value } = await SimpleAlerts.fire({
  title: 'I agree to terms',
  input: 'checkbox',
  inputValue: false,
})
```

### Input Validation

```jsx
const { value: email } = await SimpleAlerts.fire({
  title: 'Enter your email',
  input: 'email',
  inputValidator: (value) => {
    if (!value.includes('@')) return 'Please enter a valid email'
  },
})
```

---

## Confirm / Deny / Cancel

```jsx
const result = await SimpleAlerts.fire({
  title: 'Save changes?',
  showConfirmButton: true,
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: 'Discard',
})

if (result.isConfirmed) console.log('Saved')
else if (result.isDenied) console.log('Discarded')
else if (result.isDismissed) console.log('Cancelled')
```

---

## Auto-close Timer

```jsx
SimpleAlerts.fire({
  title: 'Auto-closing in 3s...',
  timer: 3000,
  timerProgressBar: true,
})
```

---

## Toast

```jsx
SimpleAlerts.fire({
  title: 'Saved!',
  icon: 'success',
  toast: true,
  timer: 2500,
  timerProgressBar: true,
  position: 'top',
})
```

---

## Position

Supported: `'top'` | `'top-start'` | `'top-end'` | `'center'` | `'bottom'`

```jsx
SimpleAlerts.fire({ title: 'Top alert', position: 'top' })
```

---

## Progress Steps

```jsx
// Step 1
await SimpleAlerts.fire({
  title: 'Step 1 of 3',
  progressSteps: ['1', '2', '3'],
  currentProgressStep: 0,
})

// Step 2
await SimpleAlerts.fire({
  title: 'Step 2 of 3',
  progressSteps: ['1', '2', '3'],
  currentProgressStep: 1,
})
```

---

## Image

```jsx
SimpleAlerts.fire({
  title: 'Custom Image',
  imageUrl: 'https://placekitten.com/200/200',
  imageWidth: 200,
  imageHeight: 200,
  imageAlt: 'A kitten',
})
```

---

## Async preConfirm

```jsx
const { value } = await SimpleAlerts.fire({
  title: 'Fetch data',
  showLoaderOnConfirm: true,
  preConfirm: async () => {
    const response = await fetch('https://api.example.com/data')
    return response.json()
  },
})
```

---

## Mixin (pre-set defaults)

```jsx
const Toast = SimpleAlerts.mixin({
  toast: true,
  timer: 3000,
  timerProgressBar: true,
  position: 'top',
  showConfirmButton: false,
})

Toast.fire({ title: 'Welcome back!', icon: 'success' })
```

---

## Programmatic Control

```jsx
// Close the current dialog
SimpleAlerts.close()

// Check if a dialog is open
const visible = await SimpleAlerts.isVisible()
```

---

## Custom Styles

```jsx
SimpleAlerts.fire({
  title: 'Styled Alert',
  customPopupStyle: { borderRadius: 20, backgroundColor: '#1e1e2e' },
  customTitleStyle: { color: '#cdd6f4', fontSize: 20 },
  customTextStyle: { color: '#a6adc8' },
  customConfirmButtonStyle: { backgroundColor: '#89b4fa' },
  customCancelButtonStyle: { backgroundColor: '#f38ba8' },
})
```

---

## DismissReason

```jsx
import { DismissReason } from 'simple-reactnative-alerts'

const result = await SimpleAlerts.fire({
  title: 'Dismissable',
  showCancelButton: true,
  allowOutsideClick: true,
  timer: 3000,
})

if (result.isDismissed) {
  switch (result.dismiss) {
    case DismissReason.cancel:   console.log('Cancel button'); break
    case DismissReason.backdrop: console.log('Outside click'); break
    case DismissReason.timer:    console.log('Timer expired'); break
    case DismissReason.esc:      console.log('Back button'); break
  }
}
```

---

## API Reference

### `SimpleAlerts.fire(options)` / `SimpleAlerts.fire(title, text?, icon?)`

Returns `Promise<AlertResult>`.

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Alert title |
| `text` | `string` | `''` | Body text |
| `icon` | `AlertIcon` | — | Icon type |
| `iconColor` | `string` | — | Custom icon color |
| `toast` | `boolean` | `false` | Show as toast |
| `position` | `AlertPosition` | `'center'` | Dialog position |
| `timer` | `number` | — | Auto-close delay (ms) |
| `timerProgressBar` | `boolean` | `false` | Show timer progress bar |
| `showConfirmButton` | `boolean` | `true` | Show confirm button |
| `showDenyButton` | `boolean` | `false` | Show deny button |
| `showCancelButton` | `boolean` | `false` | Show cancel button |
| `showCloseButton` | `boolean` | `false` | Show X close button |
| `confirmButtonText` | `string` | `'OK'` | Confirm button label |
| `confirmButtonColor` | `string` | `'#7066e0'` | Confirm button color |
| `denyButtonText` | `string` | `'No'` | Deny button label |
| `denyButtonColor` | `string` | `'#dc3545'` | Deny button color |
| `cancelButtonText` | `string` | `'Cancel'` | Cancel button label |
| `cancelButtonColor` | `string` | `'#6c757d'` | Cancel button color |
| `reverseButtons` | `boolean` | `false` | Reverse button order |
| `allowOutsideClick` | `boolean` | `true` | Dismiss on backdrop tap |
| `allowBackHandler` | `boolean` | `true` | Dismiss on Android back |
| `input` | `AlertInput` | — | Input type |
| `inputLabel` | `string` | `''` | Label above input |
| `inputPlaceholder` | `string` | `''` | Input placeholder |
| `inputValue` | `string\|number\|boolean` | `''` | Initial input value |
| `inputOptions` | `Record<string,string>` | `{}` | Options for select/radio |
| `inputAutoFocus` | `boolean` | `true` | Auto-focus input |
| `inputValidator` | `function` | — | Validation function |
| `validationMessage` | `string` | — | Static validation message |
| `returnInputValueOnDeny` | `boolean` | `false` | Pass input value to `preDeny` |
| `imageUrl` | `string` | — | Image URL |
| `imageWidth` | `number` | — | Image width |
| `imageHeight` | `number` | — | Image height |
| `imageAlt` | `string` | `''` | Image accessibility label |
| `footer` | `string` | `''` | Footer text |
| `width` | `number` | — | Dialog width |
| `padding` | `number` | — | Dialog padding |
| `background` | `string` | `'#fff'` | Background color |
| `color` | `string` | `'#545454'` | Text color |
| `progressSteps` | `string[]` | `[]` | Step labels array |
| `currentProgressStep` | `number` | — | Active step index |
| `preConfirm` | `function` | — | Async hook before confirm |
| `preDeny` | `function` | — | Async hook before deny |
| `showLoaderOnConfirm` | `boolean` | `false` | Spinner while preConfirm runs |
| `showLoaderOnDeny` | `boolean` | `false` | Spinner while preDeny runs |
| `willOpen` | `function` | — | Callback before open |
| `didOpen` | `function` | — | Callback after open |
| `willClose` | `function` | — | Callback before close |
| `didClose` | `function` | — | Callback after close |
| `customContainerStyle` | `ViewStyle` | — | Style for backdrop container |
| `customPopupStyle` | `ViewStyle` | — | Style for popup box |
| `customTitleStyle` | `TextStyle` | — | Style for title text |
| `customTextStyle` | `TextStyle` | — | Style for body text |
| `customConfirmButtonStyle` | `ViewStyle` | — | Style for confirm button |
| `customDenyButtonStyle` | `ViewStyle` | — | Style for deny button |
| `customCancelButtonStyle` | `ViewStyle` | — | Style for cancel button |

### `AlertResult`

```ts
{
  isConfirmed: boolean
  isDenied: boolean
  isDismissed: boolean
  value?: any          // returned by preConfirm or input value
  dismiss?: DismissReasonType
}
```

---

## TypeScript

Full TypeScript support is included out of the box via bundled `.d.ts` types.

```ts
import SimpleAlerts, { AlertOptions, AlertResult, DismissReason } from 'simple-reactnative-alerts'
```

---

## Development

### Clone and install

```bash
git clone https://github.com/F4b14/SimpleReactNativeAlerts.git
cd SimpleReactNativeAlerts
npm install
```

### Run the example app

The `example/` directory contains a full Expo app that demonstrates every feature.

```bash
# From the root of the repo (shortcut):
npm run example

# Or manually:
cd example
npm install
npx expo start
```

Then press:
- `a` to open on an Android emulator / device
- `i` to open on an iOS simulator (macOS only)
- `w` to open in the browser (Expo Go web)

### Project structure

```
simple-reactnative-alerts/
├── src/
│   ├── index.js                  # Public entry point
│   ├── index.d.ts                # TypeScript definitions
│   ├── SimpleAlerts.js           # SimpleAlerts object (fire / close / isVisible / mixin)
│   ├── SimpleAlertProvider.jsx   # Context provider — wrap your app root with this
│   ├── components/
│   │   ├── SimpleAlertModal.jsx  # Core modal/toast renderer
│   │   ├── Icon.jsx              # Animated icon (success/error/warning/info/question)
│   │   ├── InputField.jsx        # All input types
│   │   ├── ProgressSteps.jsx     # Multi-step progress indicator
│   │   └── TimerProgressBar.jsx  # Animated countdown bar
│   └── utils/
│       ├── DismissReason.js      # Dismiss reason constants
│       ├── EventEmitter.js       # Internal pub/sub bus
│       ├── params.js             # Default option values
│       └── Timer.js              # Pauseable setTimeout wrapper
└── example/
    ├── App.jsx                   # Expo entry — wraps app in SimpleAlertProvider
    └── src/
        └── ExampleScreen.jsx     # Interactive demo of all features
```

---

## License

MIT
