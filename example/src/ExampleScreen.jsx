import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swal, { DismissReason } from 'rn-sweetalert2'

function Button({ label, onPress, color = '#7066e0' }) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  )
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export default function ExampleScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>rn-sweetalert2 examples</Text>

      {/* ── Basic ── */}
      <Section title="Basic">
        <Button
          label="Simple fire()"
          onPress={() => Swal.fire('Hello!', 'This is a basic alert', 'success')}
        />
        <Button
          label="Title only"
          onPress={() => Swal.fire({ title: 'Just a title' })}
          color="#6c757d"
        />
      </Section>

      {/* ── Icons ── */}
      <Section title="Icons">
        {(['success', 'error', 'warning', 'info', 'question']).map((icon) => (
          <Button
            key={icon}
            label={icon}
            onPress={() => Swal.fire({ title: icon, icon })}
            color="#4a90d9"
          />
        ))}
      </Section>

      {/* ── Buttons ── */}
      <Section title="Buttons">
        <Button
          label="Confirm + Cancel"
          onPress={async () => {
            const result = await Swal.fire({
              title: 'Are you sure?',
              text: 'This action cannot be undone.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
            })
            if (result.isConfirmed) Swal.fire('Deleted!', '', 'success')
            else Swal.fire('Cancelled', '', 'info')
          }}
          color="#dc3545"
        />
        <Button
          label="Confirm + Deny + Cancel"
          onPress={async () => {
            const result = await Swal.fire({
              title: 'Save changes?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Save',
              denyButtonText: 'Discard',
            })
            if (result.isConfirmed) Swal.fire('Saved!', '', 'success')
            else if (result.isDenied) Swal.fire('Discarded', '', 'info')
          }}
          color="#fd7e14"
        />
        <Button
          label="Reversed buttons"
          onPress={() =>
            Swal.fire({
              title: 'Reversed',
              showCancelButton: true,
              reverseButtons: true,
            })
          }
          color="#6f42c1"
        />
      </Section>

      {/* ── Inputs ── */}
      <Section title="Inputs">
        <Button
          label="Text input"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'Enter your name',
              input: 'text',
              inputPlaceholder: 'Your name...',
              inputLabel: 'Name',
              showCancelButton: true,
            })
            if (value) Swal.fire(`Hello, ${value}!`, '', 'success')
          }}
          color="#20c997"
        />
        <Button
          label="Email + validation"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'Enter your email',
              input: 'email',
              inputPlaceholder: 'user@example.com',
              inputValidator: (v) => (!v.includes('@') ? 'Invalid email' : null),
              showCancelButton: true,
            })
            if (value) Swal.fire(`Email: ${value}`, '', 'success')
          }}
          color="#20c997"
        />
        <Button
          label="Password"
          onPress={() =>
            Swal.fire({ title: 'Enter password', input: 'password', showCancelButton: true })
          }
          color="#20c997"
        />
        <Button
          label="Textarea"
          onPress={() =>
            Swal.fire({ title: 'Leave a comment', input: 'textarea', showCancelButton: true })
          }
          color="#20c997"
        />
        <Button
          label="Select"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'Pick a fruit',
              input: 'select',
              inputOptions: { apple: 'Apple', banana: 'Banana', orange: 'Orange' },
              showCancelButton: true,
            })
            if (value) Swal.fire(`You picked: ${value}`, '', 'success')
          }}
          color="#20c997"
        />
        <Button
          label="Radio"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'Choose one',
              input: 'radio',
              inputOptions: { yes: 'Yes', no: 'No' },
              showCancelButton: true,
            })
            if (value) Swal.fire(`Answer: ${value}`, '', 'success')
          }}
          color="#20c997"
        />
        <Button
          label="Checkbox"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'I agree to terms',
              input: 'checkbox',
              inputValue: false,
              showCancelButton: true,
            })
            Swal.fire(value ? 'Agreed!' : 'Not agreed', '', value ? 'success' : 'info')
          }}
          color="#20c997"
        />
      </Section>

      {/* ── Timer ── */}
      <Section title="Timer">
        <Button
          label="Auto-close (3s)"
          onPress={() =>
            Swal.fire({ title: 'Closing in 3 seconds...', timer: 3000, timerProgressBar: true })
          }
          color="#0dcaf0"
        />
      </Section>

      {/* ── Toast ── */}
      <Section title="Toast">
        <Button
          label="Toast top"
          onPress={() =>
            Swal.fire({
              title: 'Saved!',
              icon: 'success',
              toast: true,
              timer: 2500,
              timerProgressBar: true,
              position: 'top',
              showConfirmButton: false,
            })
          }
          color="#198754"
        />
        <Button
          label="Toast bottom"
          onPress={() =>
            Swal.fire({
              title: 'Deleted!',
              icon: 'error',
              toast: true,
              timer: 2500,
              position: 'bottom',
              showConfirmButton: false,
            })
          }
          color="#dc3545"
        />
      </Section>

      {/* ── Image ── */}
      <Section title="Image">
        <Button
          label="With image"
          onPress={() =>
            Swal.fire({
              title: 'Custom Image',
              imageUrl: 'https://placecats.com/200/200',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'A cute cat',
            })
          }
          color="#e83e8c"
        />
      </Section>

      {/* ── Progress Steps ── */}
      <Section title="Progress Steps">
        <Button
          label="Step wizard"
          onPress={async () => {
            const steps = ['1', '2', '3']
            const titles = ['Step 1: Name', 'Step 2: Email', 'Step 3: Confirm']
            const inputs = ['text', 'email', undefined]
            const values = []

            for (let i = 0; i < steps.length; i++) {
              const result = await Swal.fire({
                title: titles[i],
                progressSteps: steps,
                currentProgressStep: i,
                input: inputs[i],
                showCancelButton: i > 0,
                confirmButtonText: i < steps.length - 1 ? 'Next' : 'Finish',
              })
              if (!result.isConfirmed) break
              values.push(result.value)
            }

            if (values.length === steps.length) {
              Swal.fire(`Done! Name: ${values[0]}, Email: ${values[1]}`, '', 'success')
            }
          }}
          color="#6f42c1"
        />
      </Section>

      {/* ── Async preConfirm ── */}
      <Section title="Async preConfirm">
        <Button
          label="Fetch on confirm"
          onPress={async () => {
            const { value } = await Swal.fire({
              title: 'Fetch a user',
              text: 'Press confirm to load data',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
                return res.json()
              },
            })
            if (value) Swal.fire(`Loaded: ${value.name}`, value.email, 'success')
          }}
          color="#fd7e14"
        />
      </Section>

      {/* ── DismissReason ── */}
      <Section title="DismissReason">
        <Button
          label="Check dismiss reason"
          onPress={async () => {
            const result = await Swal.fire({
              title: 'Dismiss me',
              text: 'Tap outside, cancel, or wait...',
              showCancelButton: true,
              timer: 5000,
            })
            if (result.isDismissed) {
              const reasons = {
                [DismissReason.cancel]: 'Cancel button',
                [DismissReason.backdrop]: 'Outside tap',
                [DismissReason.timer]: 'Timer expired',
                [DismissReason.esc]: 'Back button',
              }
              Swal.fire(`Dismissed by: ${reasons[result.dismiss] ?? result.dismiss}`)
            }
          }}
          color="#6c757d"
        />
      </Section>

      {/* ── Custom Styles ── */}
      <Section title="Custom Styles">
        <Button
          label="Dark theme"
          onPress={() =>
            Swal.fire({
              title: 'Dark Alert',
              text: 'Custom styled popup',
              icon: 'info',
              showCancelButton: true,
              background: '#1e1e2e',
              color: '#cdd6f4',
              customConfirmButtonStyle: { backgroundColor: '#89b4fa' },
              customCancelButtonStyle: { backgroundColor: '#f38ba8' },
              customPopupStyle: { borderRadius: 20 },
            })
          }
          color="#343a40"
        />
      </Section>

      {/* ── Mixin ── */}
      <Section title="Mixin">
        <Button
          label="Mixin toast"
          onPress={() => {
            const Toast = Swal.mixin({
              toast: true,
              timer: 3000,
              timerProgressBar: true,
              position: 'top',
              showConfirmButton: false,
            })
            Toast.fire({ title: 'Mixin Toast!', icon: 'success' })
          }}
          color="#198754"
        />
      </Section>

      {/* ── Queue ── */}
      <Section title="Queue (fire multiple)">
        <Button
          label="Fire 3 alerts in sequence"
          onPress={() => {
            Swal.fire({ title: 'First', icon: 'info' })
            Swal.fire({ title: 'Second', icon: 'warning' })
            Swal.fire({ title: 'Third', icon: 'success' })
          }}
          color="#4a90d9"
        />
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#212529',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
})
