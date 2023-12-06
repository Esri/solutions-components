---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

name: Enhancement
description: Request an enhancement or a new feature in a product.
labels: ["2-ENH"]
body:
  - type: textarea
    id: describe
    attributes:
      label: Describe requirements
      description: Description of what's missing and what you want to happen.
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives
      description: Describe any alternative solutions or features you've considered using instead.
    validations:
      required: false
  - type: textarea
    id: relevant
    attributes:
      label: Other Relevant Info
      description: Browser, OS, mobile, stack traces, related issues, suggestions/resources on how to fix, etc.
      placeholder: |
        Windows 10, Chrome 97
        `Uncaught TypeError: Cannot read property of undefined`
        ...
    validations:
      required: false
  - type: textarea
    id: impact
    attributes:
      label: Impact
      description: How does the issue effect the user? Can range from minor to blocking or prohibiting workflows. Helps prioritize work.
    validations:
      required: false
