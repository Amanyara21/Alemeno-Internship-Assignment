# Form Renderer Application

## Overview

This React Native application dynamically renders a form based on XML data. The application can parse XML input to generate different form fields such as text inputs, email inputs, date pickers, radio buttons, and signature canvases. 

## Features

- **Dynamic Form Rendering**: Renders form fields based on the XML structure provided.
- **Text and Email Inputs**: Renders text and email input fields.
- **Date Picker**: Allows users to pick dates using a native date picker.
- **Radio Buttons**: Renders a group of radio buttons based on options provided in the XML.
- **Signature Canvas**: Provides a canvas for drawing signatures.
- **XML Input Handling**: Parses and loads form fields from XML input.

## Project Structure

- **FormScreen.js**: The main screen component that handles XML input, parses the XML, and manages the overall form logic.
- **HomeScreen.js**: Contain Two buttons to render predefined or user defined xml.