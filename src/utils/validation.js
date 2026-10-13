
export const validators = {
  required(value, label = "This field") {
    return String(value ?? "").trim()
      ? ""
      : `${label} is required.`;
  },

  name(value, label = "Name") {
    const normalized = String(value ?? "").trim();

    if (!normalized) {
      return `${label} is required.`;
    }

    if (normalized.length < 2) {
      return `${label} must contain at least 2 characters.`;
    }

    if (normalized.length > 80) {
      return `${label} must contain 80 characters or fewer.`;
    }

    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u.test(normalized)) {
      return `Enter a valid ${label.toLowerCase()}.`;
    }

    return "";
  },

  age(value) {
    if (value === "" || value === null || value === undefined) {
      return "Age is required.";
    }

    const age = Number(value);

    if (!Number.isInteger(age) || age < 1 || age > 120) {
      return "Enter a whole-number age between 1 and 120.";
    }

    return "";
  },

  email(value) {
    const email = String(value ?? "").trim();

    if (!email) {
      return "Email address is required.";
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return "Enter a valid email address, such as you@example.com.";
    }

    return "";
  },

  phone(value) {
    const phone = String(value ?? "").trim();

    if (!phone) {
      return "Phone number is required.";
    }

    if (!/^[+()\-\s\d]{7,20}$/.test(phone)) {
      return "Enter a valid phone number, including your country code if needed.";
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {
      return "Phone number must contain 7 to 15 digits.";
    }

    return "";
  },

  selection(hasSelection) {
    return hasSelection
      ? ""
      : "Choose a flight, hotel, or car before continuing.";
  },

  gender(value) {
    const allowed = ["Female", "Male", "Other", "Prefer not to say"];

    return allowed.includes(value) ? "" : "Select a gender option.";
  }
};

export function validatePassenger(passenger, hasSelection = true) {
  const errors = {
    firstName: validators.name(passenger.firstName, "First name"),
    lastName: validators.name(passenger.lastName, "Last name"),
    age: validators.age(passenger.age),
    gender: validators.gender(passenger.gender),
    email: validators.email(passenger.email),
    phone: validators.phone(passenger.phone),
    selection: validators.selection(hasSelection)
  };

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message))
  );
}

export function isValidPassenger(passenger, hasSelection = true) {
  return Object.keys(validatePassenger(passenger, hasSelection)).length === 0;
}
